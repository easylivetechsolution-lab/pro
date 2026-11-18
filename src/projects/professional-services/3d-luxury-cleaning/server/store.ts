import { EventEmitter } from 'events';
import fs from 'fs';
import path from 'path';
import type {
  AddOnId,
  AnalyticsSummary,
  BookingRecord,
  BookingStatus,
  CampaignPlan,
  CleaningFrequency,
  CrmNotification,
  CrmSnapshot,
  CustomerRecord,
  EmailAutomationRule,
  FollowUpStep,
  LeadRecord,
  LeadStatus,
  ReferralValidationResult,
  ServiceType,
  TrafficPoint,
} from '../src/types/cleaning.ts';
import { calculateQuote } from '../src/lib/pricing.ts';

export const crmEvents = new EventEmitter();
crmEvents.setMaxListeners(50);

interface StoreData {
  leads: LeadRecord[];
  bookings: BookingRecord[];
  customers: CustomerRecord[];
  notifications: CrmNotification[];
  campaigns: CampaignPlan[];
  automationRules: EmailAutomationRule[];
  analyticsDaily: TrafficPoint[];
  trafficSources: Record<string, number>;
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const STORE_PATH = path.join(DATA_DIR, 'crm-store.json');

function buildInitialDailyAnalytics(): TrafficPoint[] {
  const points: TrafficPoint[] = [];
  const base = new Date();
  const baseVisits = [
    1240, 1320, 1180, 1410, 1520, 1690, 1580, 1490, 1610, 1740,
    1820, 1650, 1590, 1780, 1910, 2040, 1980, 1870, 2120, 2290,
    2180, 2360, 2450, 2210, 2140, 2490, 2680, 2810, 2640, 2890,
  ];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(base);
    d.setDate(base.getDate() - i);
    const isoDate = d.toISOString().slice(0, 10);
    const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const idx = 29 - i;
    const visits = baseVisits[idx] ?? 1600;
    const uniqueVisitors = Math.round(visits * 0.68);
    const convRate = 0.058 + (idx % 5) * 0.004 + (d.getDay() === 4 || d.getDay() === 5 ? 0.011 : 0);
    const conversions = Math.round(visits * convRate);
    const bounceRate = Number((35.2 - idx * 0.11 + (idx % 3) * 0.4).toFixed(1));
    const revenue = conversions * 11 + 850;
    points.push({
      date: isoDate,
      label,
      visits,
      uniqueVisitors,
      conversions,
      bounceRate: Math.max(24, Math.min(45, bounceRate)),
      revenue,
    });
  }
  return points;
}

function createDefaultOperationalData(): Pick<
  StoreData,
  'notifications' | 'campaigns' | 'automationRules' | 'analyticsDaily' | 'trafficSources'
> {
  const now = Date.now();
  const iso = (hoursOffset: number) => new Date(now + hoursOffset * 3600000).toISOString();
  const dateOnly = (daysOffset: number) => new Date(now + daysOffset * 86400000).toISOString().slice(0, 10);

  return {
    notifications: [
      {
        id: 'notif-1',
        type: 'booking',
        title: 'Commercial Clean In Progress · Marcus Vance',
        detail: '540 Howard St, SoMa · Commercial Unit B checked in on site ($318).',
        createdAt: iso(-1),
        read: false,
        bookingId: 'book-302',
      },
      {
        id: 'notif-2',
        type: 'lead',
        title: 'Urgent Move-Out Quote Request · Claire Montgomery',
        detail: '882 Spruce St, Berkeley · Full appliance & 212°F steam package ($571).',
        createdAt: iso(-2),
        read: false,
        leadId: 'lead-203',
      },
      {
        id: 'notif-3',
        type: 'referral',
        title: 'Referral Credit Unlocked · Elena Rostova',
        detail: 'PURE-ELENA35 applied by Hannah Lindqvist (+$35 credit issued).',
        createdAt: iso(-8),
        read: true,
        leadId: 'lead-201',
      },
    ],
    campaigns: [
      {
        id: 'camp-1',
        title: 'Peak Thu–Sat Eco Home Surge',
        channel: 'Google Local Ads',
        targetStartDate: dateOnly(2),
        targetEndDate: dateOnly(8),
        expectedLiftPct: 42,
        budget: 950,
        status: 'Active',
        notes: 'Targets San Francisco & Marin homeowners browsing Instant Quote between Thu–Sat mornings.',
      },
      {
        id: 'camp-2',
        title: 'Client Referral +$35 Autumn Push',
        channel: 'Referral Push',
        targetStartDate: dateOnly(4),
        targetEndDate: dateOnly(11),
        expectedLiftPct: 28,
        budget: 450,
        status: 'Planned',
        notes: 'Triggers automated share-link emails 48h after 5-star residential inspections.',
      },
      {
        id: 'camp-3',
        title: 'SoMa & Financial District Office Outreach',
        channel: 'Email Drip',
        targetStartDate: dateOnly(9),
        targetEndDate: dateOnly(15),
        expectedLiftPct: 31,
        budget: 620,
        status: 'Planned',
        notes: 'Multi-touch proposal sequence highlighting $5M COI & after-hours glass care.',
      },
    ],
    automationRules: [
      {
        id: 'auto-1',
        name: 'Instant Quote Confirmation',
        trigger: 'When website quote form or AI Concierge captures enquiry',
        channel: 'Email',
        enabled: true,
        sentCount: 148,
        openRatePct: 84.2,
        subjectTemplate: 'Your AetherClean Custom Quote & Crew Availability',
      },
      {
        id: 'auto-2',
        name: '24-Hour Warm Lead Check-In',
        trigger: '24h after quote sent without booking conversion',
        channel: 'SMS',
        enabled: true,
        sentCount: 92,
        openRatePct: 91.5,
        subjectTemplate: 'Quick check-in on holding your arrival window',
      },
      {
        id: 'auto-3',
        name: 'Dispatch & Arrival Notification',
        trigger: 'Immediately when booking confirms or crew departs',
        channel: 'Email',
        enabled: true,
        sentCount: 214,
        openRatePct: 96.4,
        subjectTemplate: 'Your AetherClean W-2 Specialists Are Scheduled',
      },
      {
        id: 'auto-4',
        name: 'Post-Clean Referral Reward Prompt',
        trigger: '48h after completed clean inspection',
        channel: 'Email',
        enabled: true,
        sentCount: 67,
        openRatePct: 72.8,
        subjectTemplate: 'Share $35 off & earn $35 credit for your next clean',
      },
    ],
    analyticsDaily: buildInitialDailyAnalytics(),
    trafficSources: {
      'Organic Search': 480,
      'Quote Form': 351,
      'AI Concierge': 229,
      Referral: 115,
      'Pricing Tier': 73,
    },
  };
}

function createSeedData(): StoreData {
  const now = Date.now();
  const iso = (daysOffset: number) => new Date(now + daysOffset * 86400000).toISOString();
  const dateOnly = (daysOffset: number) => new Date(now + daysOffset * 86400000).toISOString().slice(0, 10);

  const customers: CustomerRecord[] = [
    {
      id: 'cust-101',
      name: 'Elena Rostova',
      email: 'elena.rostova@pacificridge.co',
      phone: '(415) 612-8840',
      address: '2480 Broadway St, Pacific Heights, SF',
      referralCode: 'PURE-ELENA35',
      referralsCount: 3,
      referralCredits: 105,
      totalSpent: 1374,
      bookingsCount: 6,
      joinedAt: iso(-94),
      lastCleanAt: iso(-6),
    },
    {
      id: 'cust-102',
      name: 'Marcus Vance',
      email: 'mvance@northstarlabs.io',
      phone: '(650) 449-1920',
      address: '540 Howard St, Suite 400, SoMa, SF',
      referralCode: 'PURE-VANCE35',
      referralsCount: 1,
      referralCredits: 35,
      totalSpent: 1980,
      bookingsCount: 8,
      joinedAt: iso(-62),
      lastCleanAt: iso(-3),
    },
    {
      id: 'cust-103',
      name: 'Priya Nair',
      email: 'priya.nair@marinatelier.com',
      phone: '(415) 782-3319',
      address: '114 Laurel Grove Ave, Ross, CA',
      referralCode: 'PURE-PRIYA35',
      referralsCount: 2,
      referralCredits: 70,
      totalSpent: 846,
      bookingsCount: 3,
      joinedAt: iso(-41),
      lastCleanAt: iso(-12),
    },
  ];

  const leads: LeadRecord[] = [
    {
      id: 'lead-201',
      name: 'Hannah Lindqvist',
      email: 'hannah.l@presidiohomes.com',
      phone: '(415) 904-1182',
      address: '3122 Washington St, San Francisco',
      serviceType: 'deep',
      sqft: 2450,
      rooms: 5,
      frequency: 'bi-weekly',
      addOns: ['interior-windows', 'inside-oven'],
      preferredDate: dateOnly(3),
      preferredWindow: '09:00 AM - 12:00 PM',
      notes: 'Floor-to-ceiling south windows and marble island. Two golden retrievers.',
      estimatedPrice: 368,
      referralCodeUsed: 'PURE-ELENA35',
      status: 'Follow-Up Sent',
      source: 'Quote Form',
      aiSummary: 'High-value recurring prospect referred by Elena Rostova. Pet-safe botanical formula priority.',
      followUps: [
        {
          id: 'fu-1',
          channel: 'Email',
          timing: 'Instant Confirmation',
          subject: 'Your AetherClean Deep Sanitization Quote ($368) + $35 Referral Credit',
          body: 'Hi Hannah, thank you for requesting your quote for 3122 Washington St. Your $35 credit from PURE-ELENA35 is locked in, and our pet-safe HEPA + glass crew has Friday 9:00 AM open.',
          status: 'Sent',
          sentAt: iso(-1),
        },
        {
          id: 'fu-2',
          channel: 'SMS',
          timing: '24-Hour Check-In',
          subject: 'Confirm Friday 9 AM window?',
          body: 'Hi Hannah — AetherClean Concierge here. Would you like us to hold the 9:00 AM slot for your Washington St deep clean & interior glass detailing?',
          status: 'Scheduled',
        },
      ],
      createdAt: iso(-1),
      updatedAt: iso(-1),
    },
    {
      id: 'lead-202',
      name: 'Devon Brooks',
      email: 'dbrooks@atelierventures.vc',
      phone: '(415) 338-7741',
      address: '101 California St, Floor 18, SF',
      serviceType: 'office',
      sqft: 3400,
      rooms: 7,
      frequency: 'weekly',
      addOns: ['interior-windows', 'steam-sanitize'],
      preferredDate: dateOnly(5),
      preferredWindow: '06:00 PM - 09:00 PM',
      notes: 'Executive boardroom glass walls and espresso bar after-hours care.',
      estimatedPrice: 446,
      status: 'Quoted',
      source: 'AI Concierge',
      aiSummary: 'Commercial weekly recurring account ($1,784/mo potential). Requires after-hours keycard clearance.',
      followUps: [
        {
          id: 'fu-3',
          channel: 'Email',
          timing: 'Instant Confirmation',
          subject: 'After-Hours Commercial Suite Proposal — 101 California St',
          body: 'Hi Devon, our commercial team prepared your weekly after-hours schedule at $446/visit including glass partition polishing and $5M COI documentation.',
          status: 'Pending',
        },
      ],
      createdAt: iso(0),
      updatedAt: iso(0),
    },
    {
      id: 'lead-203',
      name: 'Claire Montgomery',
      email: 'claire.montgomery@gmail.com',
      phone: '(510) 689-4022',
      address: '882 Spruce St, Berkeley',
      serviceType: 'move-out',
      sqft: 1950,
      rooms: 4,
      frequency: 'one-time',
      addOns: ['inside-oven', 'inside-fridge', 'steam-sanitize'],
      preferredDate: dateOnly(2),
      preferredWindow: '01:00 PM - 05:00 PM',
      notes: 'Escrow closing inspection Thursday morning; empty property.',
      estimatedPrice: 571,
      status: 'New',
      source: 'Pricing Tier',
      aiSummary: 'Urgent closing-day turnover; full appliance & steam package selected.',
      followUps: [],
      createdAt: iso(0),
      updatedAt: iso(0),
    },
  ];

  const bookings: BookingRecord[] = [
    {
      id: 'book-301',
      customerId: 'cust-101',
      customerName: 'Elena Rostova',
      customerEmail: 'elena.rostova@pacificridge.co',
      address: '2480 Broadway St, Pacific Heights, SF',
      serviceType: 'home',
      sqft: 2200,
      frequency: 'bi-weekly',
      scheduledDate: dateOnly(1),
      timeWindow: '09:00 AM - 12:00 PM',
      crewAssigned: 'Team Alpha (2 Specialists)',
      totalPrice: 229,
      discountApplied: 40,
      status: 'Scheduled',
      createdAt: iso(-5),
    },
    {
      id: 'book-302',
      customerId: 'cust-102',
      customerName: 'Marcus Vance',
      customerEmail: 'mvance@northstarlabs.io',
      address: '540 Howard St, Suite 400, SoMa, SF',
      serviceType: 'office',
      sqft: 2800,
      frequency: 'weekly',
      scheduledDate: dateOnly(0),
      timeWindow: '06:30 PM - 09:30 PM',
      crewAssigned: 'Commercial Unit B (3 Specialists)',
      totalPrice: 318,
      discountApplied: 79,
      status: 'In Progress',
      createdAt: iso(-7),
    },
    {
      id: 'book-303',
      customerId: 'cust-103',
      customerName: 'Priya Nair',
      customerEmail: 'priya.nair@marinatelier.com',
      address: '114 Laurel Grove Ave, Ross, CA',
      serviceType: 'deep',
      sqft: 2600,
      frequency: 'monthly',
      scheduledDate: dateOnly(-4),
      timeWindow: '10:00 AM - 02:30 PM',
      crewAssigned: 'Team Lumina (3 Specialists)',
      totalPrice: 356,
      discountApplied: 39,
      status: 'Completed',
      createdAt: iso(-14),
    },
  ];

  return {
    leads,
    bookings,
    customers,
    ...createDefaultOperationalData(),
  };
}

function readStore(): StoreData {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(STORE_PATH)) {
      const seed = createSeedData();
      fs.writeFileSync(STORE_PATH, JSON.stringify(seed, null, 2), 'utf-8');
      return seed;
    }
    const raw = fs.readFileSync(STORE_PATH, 'utf-8');
    const parsed = JSON.parse(raw) as Partial<StoreData>;
    const defaults = createDefaultOperationalData();
    return {
      leads: Array.isArray(parsed.leads) ? parsed.leads : [],
      bookings: Array.isArray(parsed.bookings) ? parsed.bookings : [],
      customers: Array.isArray(parsed.customers) ? parsed.customers : [],
      notifications:
        Array.isArray(parsed.notifications) && parsed.notifications.length > 0
          ? parsed.notifications
          : defaults.notifications,
      campaigns:
        Array.isArray(parsed.campaigns) && parsed.campaigns.length > 0
          ? parsed.campaigns
          : defaults.campaigns,
      automationRules:
        Array.isArray(parsed.automationRules) && parsed.automationRules.length > 0
          ? parsed.automationRules
          : defaults.automationRules,
      analyticsDaily:
        Array.isArray(parsed.analyticsDaily) && parsed.analyticsDaily.length > 0
          ? parsed.analyticsDaily
          : defaults.analyticsDaily,
      trafficSources:
        parsed.trafficSources && Object.keys(parsed.trafficSources).length > 0
          ? parsed.trafficSources
          : defaults.trafficSources,
    };
  } catch {
    return createSeedData();
  }
}

function writeStore(data: StoreData): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(STORE_PATH, JSON.stringify(data, null, 2), 'utf-8');
  crmEvents.emit('update');
}

function pushNotification(
  store: StoreData,
  notif: Omit<CrmNotification, 'id' | 'createdAt' | 'read'>,
): void {
  store.notifications.unshift({
    id: `notif-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 90 + 10)}`,
    createdAt: new Date().toISOString(),
    read: false,
    ...notif,
  });
  store.notifications = store.notifications.slice(0, 30);
}

function ensureTodayTrafficBucket(store: StoreData): TrafficPoint {
  const todayIso = new Date().toISOString().slice(0, 10);
  let today = store.analyticsDaily.find((p) => p.date === todayIso);
  if (!today) {
    const d = new Date();
    today = {
      date: todayIso,
      label: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      visits: 2420,
      uniqueVisitors: 1645,
      conversions: 162,
      bounceRate: 31.8,
      revenue: 2630,
    };
    store.analyticsDaily.push(today);
    if (store.analyticsDaily.length > 90) {
      store.analyticsDaily = store.analyticsDaily.slice(-90);
    }
  }
  return today;
}

export function trackWebsiteEvent(params: {
  event: 'pageview' | 'quote_interaction' | 'conversion' | 'bounce';
  source?: string;
  revenueDelta?: number;
}): void {
  const store = readStore();
  const today = ensureTodayTrafficBucket(store);

  if (params.event === 'pageview') {
    today.visits += 1;
    today.uniqueVisitors += 1;
  } else if (params.event === 'quote_interaction') {
    today.visits += 1;
  } else if (params.event === 'conversion') {
    today.conversions += 1;
    if (params.revenueDelta && params.revenueDelta > 0) {
      today.revenue += params.revenueDelta;
    }
  } else if (params.event === 'bounce') {
    today.bounceRate = Number(Math.min(48, today.bounceRate + 0.1).toFixed(1));
  }

  if (params.source) {
    const key = params.source;
    store.trafficSources[key] = (store.trafficSources[key] ?? 0) + 1;
  }

  writeStore(store);
}

export function generateReferralCodeFromName(name: string): string {
  const clean = name
    .trim()
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
    .slice(0, 6) || 'GUEST';
  const suffix = Math.floor(10 + Math.random() * 89);
  return `PURE-${clean}${suffix}`;
}

function buildAnalyticsSummary(store: StoreData): AnalyticsSummary {
  const series = store.analyticsDaily;
  const totalVisits = series.reduce((sum, d) => sum + d.visits, 0);
  const uniqueVisitors = series.reduce((sum, d) => sum + d.uniqueVisitors, 0);
  const totalConversions = series.reduce((sum, d) => sum + d.conversions, 0);
  const conversionRate =
    totalVisits > 0 ? Number(((totalConversions / totalVisits) * 100).toFixed(1)) : 6.4;
  const avgBounce =
    series.length > 0
      ? Number((series.reduce((sum, d) => sum + d.bounceRate, 0) / series.length).toFixed(1))
      : 32.4;

  const liveConfirmed = store.bookings
    .filter((b) => b.status !== 'Cancelled')
    .reduce((sum, b) => sum + b.totalPrice, 0);
  const historicalSeriesRev = series.reduce((sum, d) => sum + d.revenue, 0);
  const totalRevenue = historicalSeriesRev + liveConfirmed;
  const completedProjects = 238 + store.bookings.filter((b) => b.status === 'Completed').length;

  const sourcePalette: Record<string, string> = {
    'Organic Search': '#0284c7',
    'Quote Form': '#10b981',
    'AI Concierge': '#6366f1',
    Referral: '#f59e0b',
    'Pricing Tier': '#64748b',
  };

  const mergedSources: Record<string, number> = { ...store.trafficSources };
  for (const lead of store.leads) {
    mergedSources[lead.source] = (mergedSources[lead.source] ?? 0) + 1;
  }
  const sourceTotal = Math.max(
    1,
    Object.values(mergedSources).reduce((sum, n) => sum + n, 0),
  );
  const leadSources = Object.entries(mergedSources)
    .map(([source, leadsCount]) => ({
      source,
      leads: leadsCount,
      share: Number(((leadsCount / sourceTotal) * 100).toFixed(1)),
      color: sourcePalette[source] ?? '#0ea5e9',
    }))
    .sort((a, b) => b.leads - a.leads);

  const now = new Date();
  const daysUntilThu = (4 - now.getDay() + 7) % 7 || 2;
  const peakStart = new Date(now);
  peakStart.setDate(now.getDate() + daysUntilThu);
  const peakEnd = new Date(peakStart);
  peakEnd.setDate(peakStart.getDate() + 6);
  const peakLabel = `${peakStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${peakEnd.toLocaleDateString('en-US', { day: 'numeric' })}`;

  return {
    totalVisits,
    uniqueVisitors,
    conversionRate,
    bounceRate: avgBounce,
    avgCustomerRating: 4.9,
    completedProjects,
    totalRevenue,
    leadGrowthPct: 12.5,
    bookingGrowthPct: 18.2,
    revenueGrowthPct: 22.1,
    referralGrowthPct: 35.4,
    dailySeries: series,
    leadSources,
    peakLeadWindow: {
      startDate: peakStart.toISOString().slice(0, 10),
      endDate: peakEnd.toISOString().slice(0, 10),
      label: peakLabel,
      expectedLiftPct: 42,
      reason: 'Thu–Sat Bay Area homeowners convert 42% higher on recurring plans.',
    },
  };
}

export function getCrmSnapshot(): CrmSnapshot {
  const store = readStore();
  const pipelineValue = store.leads
    .filter((l) => l.status !== 'Archived' && l.status !== 'Converted')
    .reduce((sum, l) => sum + l.estimatedPrice, 0);
  const confirmedRevenue = store.bookings
    .filter((b) => b.status !== 'Cancelled')
    .reduce((sum, b) => sum + b.totalPrice, 0);
  const totalLeads = store.leads.length;
  const convertedCount = store.leads.filter((l) => l.status === 'Converted').length;
  const activeBookings = store.bookings.filter((b) => b.status === 'Scheduled' || b.status === 'In Progress').length;
  const followUpsSent = store.leads.reduce(
    (sum, l) => sum + l.followUps.filter((f) => f.status === 'Sent').length,
    0,
  );
  const referralCreditsIssued = store.customers.reduce((sum, c) => sum + c.referralCredits, 0);
  const totalReferrals = store.customers.reduce((sum, c) => sum + c.referralsCount, 0);
  const unreadNotifications = store.notifications.filter((n) => !n.read).length;

  return {
    leads: [...store.leads].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    bookings: [...store.bookings].sort((a, b) => b.scheduledDate.localeCompare(a.scheduledDate)),
    customers: [...store.customers].sort((a, b) => b.totalSpent - a.totalSpent),
    notifications: [...store.notifications].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    campaigns: [...store.campaigns].sort((a, b) => a.targetStartDate.localeCompare(b.targetStartDate)),
    automationRules: store.automationRules,
    analytics: buildAnalyticsSummary(store),
    metrics: {
      pipelineValue,
      confirmedRevenue,
      totalLeads,
      activeBookings,
      conversionRate: totalLeads > 0 ? Math.round((convertedCount / totalLeads) * 100) : 0,
      followUpsSent,
      referralCreditsIssued,
      totalReferrals,
      unreadNotifications,
    },
  };
}

export function validateReferralCode(code: string): ReferralValidationResult {
  const normalized = code.trim().toUpperCase();
  if (!normalized) {
    return {
      valid: false,
      code: '',
      discountAmount: 0,
      message: 'Please enter a referral code.',
    };
  }
  const store = readStore();
  const owner = store.customers.find((c) => c.referralCode.toUpperCase() === normalized);
  if (!owner) {
    return {
      valid: false,
      code: normalized,
      discountAmount: 0,
      message: `Code "${normalized}" was not found. Ask a friend for their PURE-XXXX code.`,
    };
  }
  return {
    valid: true,
    code: owner.referralCode,
    discountAmount: 35,
    referrerName: owner.name,
    message: `$35 referral credit unlocked via ${owner.name}.`,
  };
}

export function getOrCreateReferralCustomer(params: {
  name: string;
  email: string;
  phone?: string;
  address?: string;
}): CustomerRecord {
  const store = readStore();
  const existing = store.customers.find(
    (c) => c.email.toLowerCase() === params.email.trim().toLowerCase(),
  );
  if (existing) {
    return existing;
  }

  let code = generateReferralCodeFromName(params.name);
  while (store.customers.some((c) => c.referralCode === code)) {
    code = generateReferralCodeFromName(params.name);
  }

  const newCustomer: CustomerRecord = {
    id: `cust-${Date.now().toString().slice(-5)}`,
    name: params.name.trim(),
    email: params.email.trim(),
    phone: params.phone?.trim() || 'Not provided',
    address: params.address?.trim() || 'San Francisco Bay Area',
    referralCode: code,
    referralsCount: 0,
    referralCredits: 0,
    totalSpent: 0,
    bookingsCount: 0,
    joinedAt: new Date().toISOString(),
  };

  store.customers.unshift(newCustomer);
  pushNotification(store, {
    type: 'referral',
    title: `Referral Link Created · ${newCustomer.name}`,
    detail: `Issued partner code ${code} ($35 client credit + 15% commission).`,
  });
  writeStore(store);
  return newCustomer;
}

export function createLeadRecord(input: {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  serviceType: ServiceType;
  sqft: number;
  rooms: number;
  frequency: CleaningFrequency;
  addOns: AddOnId[];
  preferredDate?: string;
  preferredWindow?: string;
  notes?: string;
  referralCodeUsed?: string;
  source?: LeadRecord['source'];
  aiSummary?: string;
  followUps?: FollowUpStep[];
}): { lead: LeadRecord; customer: CustomerRecord } {
  const store = readStore();
  const refCheck = input.referralCodeUsed ? validateReferralCode(input.referralCodeUsed) : null;
  const quote = calculateQuote(
    {
      serviceType: input.serviceType,
      sqft: input.sqft,
      rooms: input.rooms,
      frequency: input.frequency,
      addOns: input.addOns,
      referralCode: input.referralCodeUsed,
    },
    Boolean(refCheck?.valid),
  );

  // Reward referrer if valid
  if (refCheck?.valid) {
    const referrer = store.customers.find((c) => c.referralCode === refCheck.code);
    if (referrer) {
      referrer.referralsCount += 1;
      referrer.referralCredits += 35;
      store.trafficSources.Referral = (store.trafficSources.Referral ?? 0) + 1;
      pushNotification(store, {
        type: 'referral',
        title: `Referral Signup Credited · ${referrer.name}`,
        detail: `${input.name.trim()} used ${refCheck.code} (+$35 reward earned).`,
      });
    }
  }

  let customer = store.customers.find(
    (c) => c.email.toLowerCase() === input.email.trim().toLowerCase(),
  );
  if (!customer) {
    let code = generateReferralCodeFromName(input.name);
    while (store.customers.some((c) => c.referralCode === code)) {
      code = generateReferralCodeFromName(input.name);
    }
    customer = {
      id: `cust-${Date.now().toString().slice(-5)}`,
      name: input.name.trim(),
      email: input.email.trim(),
      phone: input.phone?.trim() || 'Not provided',
      address: input.address?.trim() || 'Bay Area Residence',
      referralCode: code,
      referralsCount: 0,
      referralCredits: 0,
      totalSpent: 0,
      bookingsCount: 0,
      joinedAt: new Date().toISOString(),
    };
    store.customers.unshift(customer);
  }

  const nowIso = new Date().toISOString();
  const lead: LeadRecord = {
    id: `lead-${Date.now().toString().slice(-5)}`,
    name: input.name.trim(),
    email: input.email.trim(),
    phone: input.phone?.trim() || 'Not provided',
    address: input.address?.trim() || 'Bay Area Residence',
    serviceType: input.serviceType,
    sqft: input.sqft,
    rooms: input.rooms,
    frequency: input.frequency,
    addOns: input.addOns,
    preferredDate: input.preferredDate || new Date(Date.now() + 2 * 86400000).toISOString().slice(0, 10),
    preferredWindow: input.preferredWindow || '09:00 AM - 12:00 PM',
    notes: input.notes?.trim() || '',
    estimatedPrice: quote.finalPrice,
    referralCodeUsed: refCheck?.valid ? refCheck.code : undefined,
    status: input.followUps && input.followUps.length > 0 ? 'Follow-Up Sent' : 'Quoted',
    source: input.source || 'Quote Form',
    aiSummary: input.aiSummary,
    followUps: input.followUps || [],
    createdAt: nowIso,
    updatedAt: nowIso,
  };

  store.leads.unshift(lead);

  // Increment live website source & daily conversion analytics
  const today = ensureTodayTrafficBucket(store);
  today.conversions += 1;
  store.trafficSources[lead.source] = (store.trafficSources[lead.source] ?? 0) + 1;

  if (lead.followUps.some((f) => f.status === 'Sent') && store.automationRules[0]) {
    store.automationRules[0].sentCount += 1;
  }

  pushNotification(store, {
    type: 'lead',
    title: `New Quote Enquiry · ${lead.name} ($${lead.estimatedPrice})`,
    detail: `${lead.address} · ${lead.sqft.toLocaleString()} sq ft via ${lead.source}.`,
    leadId: lead.id,
  });

  writeStore(store);
  return { lead, customer };
}

export function updateLeadRecord(
  id: string,
  patch: Partial<Pick<LeadRecord, 'status' | 'followUps' | 'aiSummary'>>,
): LeadRecord | null {
  const store = readStore();
  const lead = store.leads.find((l) => l.id === id);
  if (!lead) return null;

  if (patch.status) lead.status = patch.status;
  if (patch.followUps) lead.followUps = patch.followUps;
  if (patch.aiSummary !== undefined) lead.aiSummary = patch.aiSummary;
  lead.updatedAt = new Date().toISOString();

  writeStore(store);
  return lead;
}

export function convertLeadToBooking(leadId: string): BookingRecord | null {
  const store = readStore();
  const lead = store.leads.find((l) => l.id === leadId);
  if (!lead) return null;

  let customer = store.customers.find((c) => c.email.toLowerCase() === lead.email.toLowerCase());
  if (!customer) {
    customer = {
      id: `cust-${Date.now().toString().slice(-5)}`,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      address: lead.address,
      referralCode: generateReferralCodeFromName(lead.name),
      referralsCount: 0,
      referralCredits: 0,
      totalSpent: 0,
      bookingsCount: 0,
      joinedAt: new Date().toISOString(),
    };
    store.customers.unshift(customer);
  }

  const crewAssigned =
    lead.sqft >= 2800 || lead.serviceType === 'office'
      ? 'Team Lumina (3 Specialists)'
      : 'Team Alpha (2 Specialists)';

  const booking: BookingRecord = {
    id: `book-${Date.now().toString().slice(-5)}`,
    leadId: lead.id,
    customerId: customer.id,
    customerName: lead.name,
    customerEmail: lead.email,
    address: lead.address,
    serviceType: lead.serviceType,
    sqft: lead.sqft,
    frequency: lead.frequency,
    scheduledDate: lead.preferredDate,
    timeWindow: lead.preferredWindow,
    crewAssigned,
    totalPrice: lead.estimatedPrice,
    discountApplied: lead.referralCodeUsed ? 35 : 0,
    status: 'Scheduled',
    createdAt: new Date().toISOString(),
  };

  lead.status = 'Converted';
  lead.updatedAt = new Date().toISOString();
  customer.bookingsCount += 1;
  customer.totalSpent += booking.totalPrice;
  customer.lastCleanAt = new Date().toISOString();

  store.bookings.unshift(booking);

  const today = ensureTodayTrafficBucket(store);
  today.revenue += booking.totalPrice;
  if (store.automationRules[2]) {
    store.automationRules[2].sentCount += 1;
  }

  pushNotification(store, {
    type: 'booking',
    title: `Booking Confirmed & Dispatched · ${booking.customerName}`,
    detail: `${booking.scheduledDate} (${booking.timeWindow}) · ${crewAssigned} · $${booking.totalPrice}.`,
    bookingId: booking.id,
  });

  writeStore(store);
  return booking;
}

export function createDirectBooking(input: {
  name: string;
  email: string;
  phone?: string;
  address: string;
  serviceType: ServiceType;
  sqft: number;
  rooms: number;
  frequency: CleaningFrequency;
  addOns: AddOnId[];
  scheduledDate: string;
  timeWindow: string;
  referralCode?: string;
  notes?: string;
}): { booking: BookingRecord; customer: CustomerRecord; lead: LeadRecord } {
  const { lead, customer } = createLeadRecord({
    ...input,
    preferredDate: input.scheduledDate,
    preferredWindow: input.timeWindow,
    referralCodeUsed: input.referralCode,
    source: 'AI Concierge',
    aiSummary: 'Confirmed directly via AI Website Concierge.',
  });
  const booking = convertLeadToBooking(lead.id)!;
  return { booking, customer, lead };
}

export function updateBookingStatus(id: string, status: BookingStatus): BookingRecord | null {
  const store = readStore();
  const booking = store.bookings.find((b) => b.id === id);
  if (!booking) return null;
  booking.status = status;
  if (status === 'Completed' && store.automationRules[3]) {
    store.automationRules[3].sentCount += 1;
    pushNotification(store, {
      type: 'followup',
      title: `Post-Clean Referral Prompt Queued · ${booking.customerName}`,
      detail: `48-hour spotless inspection & referral share link ready for ${booking.customerEmail}.`,
      bookingId: booking.id,
    });
  }
  writeStore(store);
  return booking;
}

export function markNotificationsRead(notificationId?: string): CrmNotification[] {
  const store = readStore();
  store.notifications = store.notifications.map((n) =>
    !notificationId || n.id === notificationId ? { ...n, read: true } : n,
  );
  writeStore(store);
  return store.notifications;
}

export function createCampaignPlan(input: Omit<CampaignPlan, 'id'>): CampaignPlan {
  const store = readStore();
  const campaign: CampaignPlan = {
    id: `camp-${Date.now().toString().slice(-5)}`,
    ...input,
  };
  store.campaigns.unshift(campaign);
  pushNotification(store, {
    type: 'lead',
    title: `Campaign Scheduled · ${campaign.title}`,
    detail: `${campaign.channel} targeting ${campaign.targetStartDate} to ${campaign.targetEndDate} (+${campaign.expectedLiftPct}% est. lift).`,
  });
  writeStore(store);
  return campaign;
}

export function updateCampaignStatus(
  id: string,
  status: CampaignPlan['status'],
): CampaignPlan | null {
  const store = readStore();
  const camp = store.campaigns.find((c) => c.id === id);
  if (!camp) return null;
  camp.status = status;
  writeStore(store);
  return camp;
}

export function toggleAutomationRule(
  id: string,
  patch: Partial<Pick<EmailAutomationRule, 'enabled' | 'subjectTemplate'>>,
): EmailAutomationRule | null {
  const store = readStore();
  const rule = store.automationRules.find((r) => r.id === id);
  if (!rule) return null;
  if (typeof patch.enabled === 'boolean') rule.enabled = patch.enabled;
  if (patch.subjectTemplate !== undefined) rule.subjectTemplate = patch.subjectTemplate;
  writeStore(store);
  return rule;
}
