import 'dotenv/config';
import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import {
  convertLeadToBooking,
  createCampaignPlan,
  createLeadRecord,
  crmEvents,
  getCrmSnapshot,
  getOrCreateReferralCustomer,
  markNotificationsRead,
  toggleAutomationRule,
  trackWebsiteEvent,
  updateBookingStatus,
  updateCampaignStatus,
  updateLeadRecord,
  validateReferralCode,
} from './server/store.ts';
import {
  chatWithConcierge,
  generateFollowUpSequence,
  parseSmartEstimate,
  runCrmCopilot,
} from './server/ai.ts';
import { calculateQuote } from './src/lib/pricing.ts';
import type {
  AddOnId,
  BookingStatus,
  CampaignPlan,
  CleaningFrequency,
  LeadStatus,
  ServiceType,
} from './src/types/cleaning.ts';

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, service: 'aetherclean-server' });
  });

  // Live SSE stream for real-time CRM & 3D analytics synchronization
  app.get('/api/crm/stream', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders?.();

    const sendSnapshot = () => {
      try {
        const snapshot = getCrmSnapshot();
        res.write(`data: ${JSON.stringify(snapshot)}\n\n`);
      } catch {
        // ignore serialization transient
      }
    };

    sendSnapshot();
    const onUpdate = () => sendSnapshot();
    crmEvents.on('update', onUpdate);

    const heartbeat = setInterval(() => {
      res.write(': keep-alive\n\n');
    }, 20000);

    req.on('close', () => {
      clearInterval(heartbeat);
      crmEvents.off('update', onUpdate);
    });
  });

  // CRM snapshot
  app.get('/api/crm', (_req, res) => {
    try {
      res.json(getCrmSnapshot());
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to load CRM data' });
    }
  });

  // Website live telemetry & conversion tracking
  app.post('/api/analytics/track', (req, res) => {
    const { event, source, revenueDelta } = req.body as {
      event?: 'pageview' | 'quote_interaction' | 'conversion' | 'bounce';
      source?: string;
      revenueDelta?: number;
    };
    if (!event) {
      res.status(400).json({ error: 'Event is required.' });
      return;
    }
    trackWebsiteEvent({ event, source, revenueDelta });
    res.json({ ok: true });
  });

  // Notifications mark read
  app.post('/api/notifications/read', (req, res) => {
    const { id } = req.body as { id?: string };
    const updated = markNotificationsRead(id);
    res.json({ notifications: updated });
  });

  // Lead generation campaigns
  app.post('/api/campaigns', (req, res) => {
    const body = req.body as Partial<Omit<CampaignPlan, 'id'>>;
    if (!body.title?.trim() || !body.targetStartDate || !body.targetEndDate) {
      res.status(400).json({ error: 'Campaign title and target dates are required.' });
      return;
    }
    const created = createCampaignPlan({
      title: body.title.trim(),
      channel: body.channel || 'Google Local Ads',
      targetStartDate: body.targetStartDate,
      targetEndDate: body.targetEndDate,
      expectedLiftPct: Number(body.expectedLiftPct) || 35,
      budget: Number(body.budget) || 600,
      status: body.status || 'Planned',
      notes: body.notes?.trim() || 'Targeted peak-conversion window.',
    });
    res.status(201).json(created);
  });

  app.patch('/api/campaigns/:id', (req, res) => {
    const { status } = req.body as { status?: CampaignPlan['status'] };
    if (!status) {
      res.status(400).json({ error: 'Status is required.' });
      return;
    }
    const updated = updateCampaignStatus(req.params.id, status);
    if (!updated) {
      res.status(404).json({ error: 'Campaign not found' });
      return;
    }
    res.json(updated);
  });

  // Email automation rule toggle/update
  app.patch('/api/automations/:id', (req, res) => {
    const { enabled, subjectTemplate } = req.body as {
      enabled?: boolean;
      subjectTemplate?: string;
    };
    const updated = toggleAutomationRule(req.params.id, { enabled, subjectTemplate });
    if (!updated) {
      res.status(404).json({ error: 'Automation rule not found' });
      return;
    }
    res.json(updated);
  });

  // Create Lead + Trigger AI Automated Follow-up Sequence
  app.post('/api/leads', async (req, res) => {
    try {
      const body = req.body as {
        name?: string;
        email?: string;
        phone?: string;
        address?: string;
        serviceType?: ServiceType;
        sqft?: number;
        rooms?: number;
        frequency?: CleaningFrequency;
        addOns?: AddOnId[];
        preferredDate?: string;
        preferredWindow?: string;
        notes?: string;
        referralCodeUsed?: string;
        source?: 'Quote Form' | 'AI Concierge' | 'Pricing Tier';
      };

      if (!body.name?.trim() || !body.email?.trim()) {
        res.status(400).json({ error: 'Name and email are required.' });
        return;
      }

      const serviceType = body.serviceType || 'home';
      const sqft = Number(body.sqft) || 1600;
      const rooms = Number(body.rooms) || 3;
      const frequency = body.frequency || 'one-time';
      const addOns = Array.isArray(body.addOns) ? body.addOns : [];
      const refValid = body.referralCodeUsed ? validateReferralCode(body.referralCodeUsed).valid : false;
      const quote = calculateQuote({ serviceType, sqft, rooms, frequency, addOns, referralCode: body.referralCodeUsed }, refValid);

      let followUps: Awaited<ReturnType<typeof generateFollowUpSequence>> = [];
      let aiWarning: string | undefined;

      try {
        followUps = await generateFollowUpSequence({
          name: body.name,
          address: body.address || 'San Francisco Bay Area',
          serviceType,
          sqft,
          estimatedPrice: quote.finalPrice,
          frequency,
          referralCodeUsed: refValid ? body.referralCodeUsed : undefined,
          notes: body.notes,
        });
      } catch (err) {
        aiWarning = err instanceof Error ? err.message : 'AI follow-up generation deferred.';
      }

      const result = createLeadRecord({
        name: body.name,
        email: body.email,
        phone: body.phone,
        address: body.address,
        serviceType,
        sqft,
        rooms,
        frequency,
        addOns,
        preferredDate: body.preferredDate,
        preferredWindow: body.preferredWindow,
        notes: body.notes,
        referralCodeUsed: body.referralCodeUsed,
        source: body.source || 'Quote Form',
        aiSummary: followUps.length > 0 ? 'AI automated confirmation & 24h follow-up generated.' : undefined,
        followUps,
      });

      res.status(201).json({ ...result, quote, aiWarning });
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to create lead' });
    }
  });

  // Update Lead Status
  app.patch('/api/leads/:id', (req, res) => {
    const id = req.params.id;
    const { status } = req.body as { status?: LeadStatus };
    const updated = updateLeadRecord(id, { status });
    if (!updated) {
      res.status(404).json({ error: 'Lead not found' });
      return;
    }
    res.json(updated);
  });

  // Generate or Send AI Follow-Up for a Lead
  app.post('/api/leads/:id/followup', async (req, res) => {
    try {
      const id = req.params.id;
      const snapshot = getCrmSnapshot();
      const lead = snapshot.leads.find((l) => l.id === id);
      if (!lead) {
        res.status(404).json({ error: 'Lead not found' });
        return;
      }

      const action = (req.body as { action?: 'generate' | 'mark_sent'; followUpId?: string }).action || 'generate';

      if (action === 'mark_sent') {
        const followUpId = (req.body as { followUpId?: string }).followUpId;
        const nextFollowUps = lead.followUps.map((f) =>
          !followUpId || f.id === followUpId
            ? { ...f, status: 'Sent' as const, sentAt: new Date().toISOString() }
            : f,
        );
        const updated = updateLeadRecord(id, {
          followUps: nextFollowUps,
          status: lead.status === 'New' || lead.status === 'Quoted' ? 'Follow-Up Sent' : lead.status,
        });
        res.json(updated);
        return;
      }

      const generated = await generateFollowUpSequence({
        name: lead.name,
        address: lead.address,
        serviceType: lead.serviceType,
        sqft: lead.sqft,
        estimatedPrice: lead.estimatedPrice,
        frequency: lead.frequency,
        referralCodeUsed: lead.referralCodeUsed,
        notes: lead.notes,
      });

      const updated = updateLeadRecord(id, {
        followUps: generated,
        status: lead.status === 'New' || lead.status === 'Quoted' ? 'Follow-Up Sent' : lead.status,
      });
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to generate AI follow-up' });
    }
  });

  // Convert Lead to Booking
  app.post('/api/leads/:id/convert', (req, res) => {
    const booking = convertLeadToBooking(req.params.id);
    if (!booking) {
      res.status(404).json({ error: 'Lead not found' });
      return;
    }
    res.status(201).json(booking);
  });

  // Update Booking Status
  app.patch('/api/bookings/:id', (req, res) => {
    const { status } = req.body as { status?: BookingStatus };
    if (!status) {
      res.status(400).json({ error: 'Status is required' });
      return;
    }
    const updated = updateBookingStatus(req.params.id, status);
    if (!updated) {
      res.status(404).json({ error: 'Booking not found' });
      return;
    }
    res.json(updated);
  });

  // Validate Referral Code
  app.post('/api/referrals/validate', (req, res) => {
    const { code } = req.body as { code?: string };
    res.json(validateReferralCode(code || ''));
  });

  // Generate or retrieve personal referral code
  app.post('/api/referrals/generate', (req, res) => {
    const { name, email, phone, address } = req.body as {
      name?: string;
      email?: string;
      phone?: string;
      address?: string;
    };
    if (!name?.trim() || !email?.trim()) {
      res.status(400).json({ error: 'Name and email are required to issue a referral code.' });
      return;
    }
    const customer = getOrCreateReferralCustomer({ name, email, phone, address });
    res.status(201).json(customer);
  });

  // AI Smart Scope Estimator
  app.post('/api/ai/smart-estimate', async (req, res) => {
    try {
      const { description } = req.body as { description?: string };
      if (!description?.trim()) {
        res.status(400).json({ error: 'Please describe your space first.' });
        return;
      }
      const estimate = await parseSmartEstimate(description);
      const quote = calculateQuote({
        serviceType: estimate.serviceType,
        sqft: estimate.sqft,
        rooms: estimate.rooms,
        frequency: estimate.frequency,
        addOns: estimate.addOns,
      });
      res.json({ estimate, quote });
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : 'AI estimator failed' });
    }
  });

  // AI Concierge Chat (Function Calling)
  app.post('/api/ai/chat', async (req, res) => {
    try {
      const { message, history } = req.body as {
        message?: string;
        history?: Array<{ role: 'user' | 'assistant'; text: string }>;
      };
      if (!message?.trim()) {
        res.status(400).json({ error: 'Message is required.' });
        return;
      }
      const result = await chatWithConcierge({
        message,
        history: Array.isArray(history) ? history : [],
      });
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : 'AI assistant error' });
    }
  });

  // AI CRM Copilot
  app.post('/api/ai/crm-copilot', async (req, res) => {
    try {
      const { prompt } = req.body as { prompt?: string };
      if (!prompt?.trim()) {
        res.status(400).json({ error: 'Prompt is required.' });
        return;
      }
      const analysis = await runCrmCopilot(prompt);
      res.json({ analysis });
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : 'CRM copilot error' });
    }
  });

  // Vite middleware or production static files
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  const port = Number(process.env.PORT) || 3000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`AetherClean server listening on http://0.0.0.0:${port}`);
  });
}

startServer();
