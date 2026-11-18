import { FunctionDeclaration, GoogleGenAI, Type, type Content } from '@google/genai';
import type {
  AddOnId,
  AiActionResult,
  CleaningFrequency,
  FollowUpStep,
  LeadRecord,
  ServiceType,
} from '../src/types/cleaning.ts';
import { ADD_ON_CATALOG, calculateQuote, SERVICE_CATALOG } from '../src/lib/pricing.ts';
import {
  createDirectBooking,
  createLeadRecord,
  getCrmSnapshot,
  getOrCreateReferralCustomer,
  validateReferralCode,
} from './store.ts';

function getAiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in environment secrets.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const SERVICE_CONTEXT_PROMPT = `You are the AetherClean AI Concierge — the intelligent assistant for AetherClean, a premium residential and commercial cleaning company serving the San Francisco Bay Area (San Francisco, Marin, Silicon Valley, East Bay, Peninsula, Napa).

Core facts:
- Services:
  1. Home Cleaning (id: "home", starting at $149): Eco-certified botanical solutions, HEPA dust extraction, 2-specialist crew.
  2. Office & Commercial (id: "office", starting at $219): After-hours & weekend availability, glass partition & conference care, $5M commercial liability COI.
  3. Deep Sanitization (id: "deep", starting at $259): Baseboards, grout, vents, cabinet exteriors, descaling.
  4. Move-Out Turnover (id: "move-out", starting at $319): Empty residence inspection-ready turnover including inside cabinets/closets.
- Add-ons: Inside Oven ($45, id: "inside-oven"), Inside Fridge ($40, id: "inside-fridge"), Interior Glass & Tracks ($65, id: "interior-windows"), 212°F Steam Tile & Grout ($75, id: "steam-sanitize").
- Frequency discounts: Weekly (-20%), Bi-Weekly (-15%), Monthly (-10%), One-Time (0%).
- Referral program: Friends get $35 off their first clean with a valid PURE-XXXX referral code, and the referrer earns $35 credit automatically.
- Guarantees: 100% background-vetted W-2 specialists, hospital-grade pet-safe botanical products, 48-hour spotless re-clean guarantee, $5M insured & bonded.

Capabilities:
You have real tools to calculate exact quotes, check open appointment slots, capture leads or confirm bookings directly into the CRM, validate referral codes, and generate personal referral codes for customers.
Whenever a user asks for a price estimate, wants to book, wants to check availability, or wants a referral code, USE YOUR TOOLS so the website UI updates in real time. Be warm, concise, and concrete — never invent fake prices outside tool outputs.`;

const calculateQuoteTool: FunctionDeclaration = {
  name: 'calculate_instant_quote',
  description: 'Calculate exact transparent pricing, estimated crew size, and hours for a cleaning service.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      serviceType: {
        type: Type.STRING,
        description: 'Must be one of: home, office, deep, move-out',
      },
      sqft: {
        type: Type.NUMBER,
        description: 'Approximate square footage of the space (500 to 8000).',
      },
      rooms: {
        type: Type.NUMBER,
        description: 'Number of bedrooms + bathrooms or office zones (1 to 16).',
      },
      frequency: {
        type: Type.STRING,
        description: 'Must be one of: one-time, monthly, bi-weekly, weekly',
      },
      addOns: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: 'Optional add-on IDs from: inside-oven, inside-fridge, interior-windows, steam-sanitize',
      },
      referralCode: {
        type: Type.STRING,
        description: 'Optional referral code such as PURE-ELENA35',
      },
    },
    required: ['serviceType', 'sqft', 'rooms', 'frequency'],
  },
};

const checkAvailabilityTool: FunctionDeclaration = {
  name: 'check_availability',
  description: 'Check open cleaning crew arrival windows for a requested date or upcoming week.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      preferredDate: {
        type: Type.STRING,
        description: 'Optional YYYY-MM-DD date or relative day description.',
      },
      serviceType: {
        type: Type.STRING,
        description: 'Service type: home, office, deep, or move-out',
      },
    },
  },
};

const captureLeadOrBookingTool: FunctionDeclaration = {
  name: 'capture_lead_or_booking',
  description:
    'Save a new customer quote lead or confirm an active booking directly into the AetherClean CRM database.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      mode: {
        type: Type.STRING,
        description: 'Use "booking" if user confirms a date/time and wants to book, or "lead" for quote follow-up.',
      },
      name: { type: Type.STRING, description: 'Customer full name' },
      email: { type: Type.STRING, description: 'Customer email address' },
      phone: { type: Type.STRING, description: 'Customer phone number if provided' },
      address: { type: Type.STRING, description: 'Property street address or neighborhood' },
      serviceType: { type: Type.STRING, description: 'home, office, deep, or move-out' },
      sqft: { type: Type.NUMBER, description: 'Square footage' },
      rooms: { type: Type.NUMBER, description: 'Number of rooms/zones' },
      frequency: { type: Type.STRING, description: 'one-time, monthly, bi-weekly, or weekly' },
      addOns: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: 'Add-on IDs',
      },
      scheduledDate: { type: Type.STRING, description: 'YYYY-MM-DD preferred date' },
      timeWindow: { type: Type.STRING, description: 'Arrival window e.g. 09:00 AM - 12:00 PM' },
      referralCode: { type: Type.STRING, description: 'Referral code if provided' },
      notes: { type: Type.STRING, description: 'Special instructions (pets, glass, gate code)' },
    },
    required: ['mode', 'name', 'email', 'serviceType'],
  },
};

const referralTool: FunctionDeclaration = {
  name: 'manage_referral_code',
  description: 'Validate an existing friend referral code OR create/retrieve a personal referral code for a customer.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      action: {
        type: Type.STRING,
        description: '"validate" to check a code, or "generate" to create/get a customer personal referral code.',
      },
      code: { type: Type.STRING, description: 'Referral code to validate' },
      name: { type: Type.STRING, description: 'Customer full name when generating a code' },
      email: { type: Type.STRING, description: 'Customer email when generating a code' },
    },
    required: ['action'],
  },
};

function normalizeServiceType(val: unknown): ServiceType {
  const s = String(val || 'home').toLowerCase();
  if (s === 'office' || s === 'deep' || s === 'move-out' || s === 'home') return s;
  if (s.includes('office') || s.includes('commercial')) return 'office';
  if (s.includes('deep')) return 'deep';
  if (s.includes('move')) return 'move-out';
  return 'home';
}

function normalizeFrequency(val: unknown): CleaningFrequency {
  const s = String(val || 'one-time').toLowerCase();
  if (s === 'weekly' || s === 'bi-weekly' || s === 'monthly' || s === 'one-time') return s;
  if (s.includes('bi')) return 'bi-weekly';
  if (s.includes('week')) return 'weekly';
  if (s.includes('month')) return 'monthly';
  return 'one-time';
}

function normalizeAddOns(val: unknown): AddOnId[] {
  if (!Array.isArray(val)) return [];
  const validIds = new Set(ADD_ON_CATALOG.map((a) => a.id));
  return val.map((x) => String(x) as AddOnId).filter((id) => validIds.has(id));
}

export async function generateFollowUpSequence(lead: {
  name: string;
  address: string;
  serviceType: ServiceType;
  sqft: number;
  estimatedPrice: number;
  frequency: CleaningFrequency;
  referralCodeUsed?: string;
  notes?: string;
}): Promise<FollowUpStep[]> {
  const ai = getAiClient();
  const serviceInfo = SERVICE_CATALOG.find((s) => s.id === lead.serviceType) ?? SERVICE_CATALOG[0];

  const response = await ai.models.generateContent({
    model: 'gemini-4-hydrogen',
    contents: `Create a 2-step automated follow-up sequence (1 Email instant confirmation + 1 SMS 24-hour check-in) for this cleaning lead:
- Client: ${lead.name}
- Address: ${lead.address}
- Service: ${serviceInfo.title} (${lead.sqft} sq ft, ${lead.frequency})
- Quoted Price: $${lead.estimatedPrice}
- Referral Code Applied: ${lead.referralCodeUsed || 'None'}
- Client Notes: ${lead.notes || 'None'}

Make it warm, concise, and concrete. Reference their property details naturally.`,
    config: {
      systemInstruction:
        'You write concise, high-converting luxury concierge follow-up messages for AetherClean. Avoid hype or clichés.',
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            channel: { type: Type.STRING, description: 'Email or SMS' },
            timing: { type: Type.STRING, description: 'e.g., Instant Confirmation or 24-Hour Check-In' },
            subject: { type: Type.STRING },
            body: { type: Type.STRING },
          },
          required: ['channel', 'timing', 'subject', 'body'],
        },
      },
    },
  });

  const parsed = JSON.parse(response.text || '[]') as Array<{
    channel: string;
    timing: string;
    subject: string;
    body: string;
  }>;

  return parsed.slice(0, 3).map((item, idx) => ({
    id: `fu-${Date.now()}-${idx}`,
    channel: item.channel === 'SMS' ? 'SMS' : 'Email',
    timing: item.timing,
    subject: item.subject,
    body: item.body,
    status: idx === 0 ? 'Sent' : 'Scheduled',
    sentAt: idx === 0 ? new Date().toISOString() : undefined,
  }));
}

export async function parseSmartEstimate(description: string): Promise<{
  serviceType: ServiceType;
  sqft: number;
  rooms: number;
  frequency: CleaningFrequency;
  addOns: AddOnId[];
  rationale: string;
}> {
  const ai = getAiClient();
  const response = await ai.models.generateContent({
    model: 'gemini-4-hydrogen',
    contents: `Analyze this customer's cleaning description and extract the optimal quote parameters:
"${description}"`,
    config: {
      systemInstruction: `Map the customer request to AetherClean's catalog:
- serviceType: "home" | "office" | "deep" | "move-out"
- sqft: integer between 500 and 8000 (estimate sensibly from bedroom/office count if omitted)
- rooms: integer between 1 and 16
- frequency: "one-time" | "monthly" | "bi-weekly" | "weekly"
- addOns: subset of ["inside-oven", "inside-fridge", "interior-windows", "steam-sanitize"]
- rationale: 1 clear sentence explaining why this scope fits their space.`,
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          serviceType: { type: Type.STRING },
          sqft: { type: Type.INTEGER },
          rooms: { type: Type.INTEGER },
          frequency: { type: Type.STRING },
          addOns: { type: Type.ARRAY, items: { type: Type.STRING } },
          rationale: { type: Type.STRING },
        },
        required: ['serviceType', 'sqft', 'rooms', 'frequency', 'addOns', 'rationale'],
      },
    },
  });

  const raw = JSON.parse(response.text || '{}');
  return {
    serviceType: normalizeServiceType(raw.serviceType),
    sqft: Math.max(500, Math.min(8000, Number(raw.sqft) || 1800)),
    rooms: Math.max(1, Math.min(16, Number(raw.rooms) || 4)),
    frequency: normalizeFrequency(raw.frequency),
    addOns: normalizeAddOns(raw.addOns),
    rationale: String(raw.rationale || 'Configured based on your space details.'),
  };
}

export async function chatWithConcierge(params: {
  message: string;
  history: Array<{ role: 'user' | 'assistant'; text: string }>;
}): Promise<{ reply: string; actions: AiActionResult[] }> {
  const ai = getAiClient();
  const tools = [
    {
      functionDeclarations: [
        calculateQuoteTool,
        checkAvailabilityTool,
        captureLeadOrBookingTool,
        referralTool,
      ],
    },
  ];

  const contents: Content[] = params.history.slice(-8).map((item) => ({
    role: item.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: item.text }],
  }));
  contents.push({ role: 'user', parts: [{ text: params.message }] });

  const actions: AiActionResult[] = [];
  let currentContents: Content[] = contents;

  for (let turn = 0; turn < 3; turn++) {
    const response = await ai.models.generateContent({
      model: 'gemini-4-hydrogen',
      contents: currentContents,
      config: {
        systemInstruction: SERVICE_CONTEXT_PROMPT,
        tools,
      },
    });

    const candidateContent = response.candidates?.[0]?.content;
    const functionCalls = response.functionCalls;

    if (!functionCalls || functionCalls.length === 0) {
      return {
        reply: response.text || 'I am happy to help you with pricing, scheduling, or service details.',
        actions,
      };
    }

    if (candidateContent) {
      currentContents = [...currentContents, candidateContent];
    }

    const functionResponses = [];

    for (const call of functionCalls) {
      const args = (call.args || {}) as Record<string, unknown>;
      let toolResult: Record<string, unknown> = {};

      if (call.name === 'calculate_instant_quote') {
        const serviceType = normalizeServiceType(args.serviceType);
        const sqft = Number(args.sqft) || 1800;
        const rooms = Number(args.rooms) || 4;
        const frequency = normalizeFrequency(args.frequency);
        const addOns = normalizeAddOns(args.addOns);
        const referralCode = args.referralCode ? String(args.referralCode) : undefined;
        const refCheck = referralCode ? validateReferralCode(referralCode) : null;
        const quote = calculateQuote(
          { serviceType, sqft, rooms, frequency, addOns, referralCode },
          Boolean(refCheck?.valid),
        );
        toolResult = { quote, referralStatus: refCheck };
        actions.push({
          type: 'quote',
          title: `${quote.serviceLabel} — $${quote.finalPrice}`,
          data: { ...quote, sqft, rooms, frequency, addOns },
        });
      } else if (call.name === 'check_availability') {
        const baseDate = args.preferredDate ? String(args.preferredDate) : '';
        const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
        const day2 = new Date(Date.now() + 2 * 86400000).toISOString().slice(0, 10);
        const day3 = new Date(Date.now() + 3 * 86400000).toISOString().slice(0, 10);
        const slots = [
          { date: baseDate.match(/^\d{4}-\d{2}-\d{2}$/) ? baseDate : tomorrow, window: '09:00 AM - 12:00 PM', crew: 'Team Alpha' },
          { date: day2, window: '01:00 PM - 04:00 PM', crew: 'Team Lumina' },
          { date: day3, window: '09:00 AM - 12:00 PM', crew: 'Team Alpha' },
        ];
        toolResult = { availableSlots: slots };
        actions.push({
          type: 'availability',
          title: 'Open Arrival Windows',
          data: { slots },
        });
      } else if (call.name === 'capture_lead_or_booking') {
        const mode = String(args.mode || 'lead').toLowerCase();
        const serviceType = normalizeServiceType(args.serviceType);
        const sqft = Number(args.sqft) || 1800;
        const rooms = Number(args.rooms) || 4;
        const frequency = normalizeFrequency(args.frequency);
        const addOns = normalizeAddOns(args.addOns);
        const scheduledDate =
          String(args.scheduledDate || '').match(/^\d{4}-\d{2}-\d{2}$/)
            ? String(args.scheduledDate)
            : new Date(Date.now() + 2 * 86400000).toISOString().slice(0, 10);
        const timeWindow = String(args.timeWindow || '09:00 AM - 12:00 PM');

        if (mode === 'booking') {
          const result = createDirectBooking({
            name: String(args.name || 'Guest Client'),
            email: String(args.email || 'guest@example.com'),
            phone: args.phone ? String(args.phone) : undefined,
            address: String(args.address || 'San Francisco Bay Area'),
            serviceType,
            sqft,
            rooms,
            frequency,
            addOns,
            scheduledDate,
            timeWindow,
            referralCode: args.referralCode ? String(args.referralCode) : undefined,
            notes: args.notes ? String(args.notes) : undefined,
          });
          toolResult = {
            bookingId: result.booking.id,
            totalPrice: result.booking.totalPrice,
            scheduledDate: result.booking.scheduledDate,
            timeWindow: result.booking.timeWindow,
            personalReferralCode: result.customer.referralCode,
          };
          actions.push({
            type: 'booking_created',
            title: `Booking Confirmed (${result.booking.id})`,
            data: result.booking as unknown as Record<string, unknown>,
          });
        } else {
          const followUps = await generateFollowUpSequence({
            name: String(args.name || 'Guest Client'),
            address: String(args.address || 'San Francisco Bay Area'),
            serviceType,
            sqft,
            estimatedPrice: calculateQuote({ serviceType, sqft, rooms, frequency, addOns }).finalPrice,
            frequency,
            referralCodeUsed: args.referralCode ? String(args.referralCode) : undefined,
            notes: args.notes ? String(args.notes) : undefined,
          }).catch(() => []);

          const result = createLeadRecord({
            name: String(args.name || 'Guest Client'),
            email: String(args.email || 'guest@example.com'),
            phone: args.phone ? String(args.phone) : undefined,
            address: args.address ? String(args.address) : undefined,
            serviceType,
            sqft,
            rooms,
            frequency,
            addOns,
            preferredDate: scheduledDate,
            preferredWindow: timeWindow,
            referralCodeUsed: args.referralCode ? String(args.referralCode) : undefined,
            notes: args.notes ? String(args.notes) : undefined,
            source: 'AI Concierge',
            aiSummary: 'Captured via AI Concierge conversation with automated follow-up.',
            followUps,
          });
          toolResult = {
            leadId: result.lead.id,
            estimatedPrice: result.lead.estimatedPrice,
            personalReferralCode: result.customer.referralCode,
          };
          actions.push({
            type: 'lead_created',
            title: `Quote Saved to CRM (${result.lead.id})`,
            data: result.lead as unknown as Record<string, unknown>,
          });
        }
      } else if (call.name === 'manage_referral_code') {
        const action = String(args.action || 'validate').toLowerCase();
        if (action === 'generate') {
          const customer = getOrCreateReferralCustomer({
            name: String(args.name || 'Valued Client'),
            email: String(args.email || `client.${Date.now()}@aetherclean.co`),
          });
          toolResult = {
            referralCode: customer.referralCode,
            customerName: customer.name,
            rewardPerReferral: 35,
          };
          actions.push({
            type: 'referral_created',
            title: `Personal Code: ${customer.referralCode}`,
            data: { code: customer.referralCode, name: customer.name },
          });
        } else {
          const validation = validateReferralCode(String(args.code || ''));
          toolResult = validation as unknown as Record<string, unknown>;
          actions.push({
            type: 'referral_validated',
            title: validation.valid ? `Code Applied (-$35)` : `Code Not Found`,
            data: validation as unknown as Record<string, unknown>,
          });
        }
      }

      functionResponses.push({
        functionResponse: {
          id: call.id,
          name: call.name,
          response: toolResult,
        },
      });
    }

    currentContents = [
      ...currentContents,
      {
        role: 'user',
        parts: functionResponses,
      },
    ];
  }

  return {
    reply: 'Your request has been processed. How else can I assist with your cleaning plan?',
    actions,
  };
}

export async function runCrmCopilot(prompt: string): Promise<string> {
  const ai = getAiClient();
  const snapshot = getCrmSnapshot();

  const compactContext = {
    metrics: snapshot.metrics,
    leads: snapshot.leads.slice(0, 12).map((l: LeadRecord) => ({
      id: l.id,
      name: l.name,
      serviceType: l.serviceType,
      sqft: l.sqft,
      frequency: l.frequency,
      estimatedPrice: l.estimatedPrice,
      status: l.status,
      referralCodeUsed: l.referralCodeUsed,
      notes: l.notes,
      followUpCount: l.followUps.length,
    })),
    bookings: snapshot.bookings.slice(0, 10),
    topCustomers: snapshot.customers.slice(0, 8),
  };

  const response = await ai.models.generateContent({
    model: 'gemini-4-hydrogen',
    contents: `CRM Snapshot:\n${JSON.stringify(compactContext, null, 2)}\n\nOperator Question: ${prompt}`,
    config: {
      systemInstruction:
        'You are the AetherClean Operations & Revenue Copilot. Give concise, actionable, tabular/bulleted guidance grounded strictly in the CRM snapshot numbers provided. Never fabricate records.',
    },
  });

  return response.text || 'No analysis returned.';
}
