export type ServiceType = 'home' | 'office' | 'deep' | 'move-out';

export type CleaningFrequency = 'one-time' | 'monthly' | 'bi-weekly' | 'weekly';

export type AddOnId = 'inside-oven' | 'inside-fridge' | 'interior-windows' | 'steam-sanitize';

export type LeadStatus = 'New' | 'Quoted' | 'Follow-Up Sent' | 'Converted' | 'Archived';

export type BookingStatus = 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';

export interface QuoteInput {
  serviceType: ServiceType;
  sqft: number;
  rooms: number;
  frequency: CleaningFrequency;
  addOns: AddOnId[];
  referralCode?: string;
}

export interface QuoteBreakdown {
  serviceType: ServiceType;
  serviceLabel: string;
  basePrice: number;
  sizeAdjustment: number;
  roomsAdjustment: number;
  addOnsTotal: number;
  subtotal: number;
  frequencyDiscount: number;
  referralDiscount: number;
  finalPrice: number;
  estimatedHours: number;
  crewSize: number;
  appliedReferralCode?: string;
  referralValid?: boolean;
}

export interface FollowUpStep {
  id: string;
  channel: 'Email' | 'SMS';
  timing: string;
  subject: string;
  body: string;
  status: 'Pending' | 'Sent' | 'Scheduled';
  sentAt?: string;
}

export interface LeadRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  serviceType: ServiceType;
  sqft: number;
  rooms: number;
  frequency: CleaningFrequency;
  addOns: AddOnId[];
  preferredDate: string;
  preferredWindow: string;
  notes: string;
  estimatedPrice: number;
  referralCodeUsed?: string;
  status: LeadStatus;
  source: 'Quote Form' | 'AI Concierge' | 'Pricing Tier';
  aiSummary?: string;
  followUps: FollowUpStep[];
  createdAt: string;
  updatedAt: string;
}

export interface BookingRecord {
  id: string;
  leadId?: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  address: string;
  serviceType: ServiceType;
  sqft: number;
  frequency: CleaningFrequency;
  scheduledDate: string;
  timeWindow: string;
  crewAssigned: string;
  totalPrice: number;
  discountApplied: number;
  status: BookingStatus;
  createdAt: string;
}

export interface CustomerRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  referralCode: string;
  referralsCount: number;
  referralCredits: number;
  totalSpent: number;
  bookingsCount: number;
  joinedAt: string;
  lastCleanAt?: string;
}

export interface ReferralValidationResult {
  valid: boolean;
  code: string;
  discountAmount: number;
  referrerName?: string;
  message: string;
}

export interface TrafficPoint {
  date: string;
  label: string;
  visits: number;
  uniqueVisitors: number;
  conversions: number;
  bounceRate: number;
  revenue: number;
}

export interface LeadSourceStat {
  source: string;
  leads: number;
  share: number;
  color: string;
}

export interface CrmNotification {
  id: string;
  type: 'booking' | 'lead' | 'referral' | 'followup';
  title: string;
  detail: string;
  createdAt: string;
  read: boolean;
  leadId?: string;
  bookingId?: string;
}

export interface CampaignPlan {
  id: string;
  title: string;
  channel: 'Google Local Ads' | 'Email Drip' | 'Referral Push' | 'Neighborhood Direct';
  targetStartDate: string;
  targetEndDate: string;
  expectedLiftPct: number;
  budget: number;
  status: 'Planned' | 'Active' | 'Completed';
  notes: string;
}

export interface EmailAutomationRule {
  id: string;
  name: string;
  trigger: string;
  channel: 'Email' | 'SMS';
  enabled: boolean;
  sentCount: number;
  openRatePct: number;
  subjectTemplate: string;
}

export interface AnalyticsSummary {
  totalVisits: number;
  uniqueVisitors: number;
  conversionRate: number;
  bounceRate: number;
  avgCustomerRating: number;
  completedProjects: number;
  totalRevenue: number;
  leadGrowthPct: number;
  bookingGrowthPct: number;
  revenueGrowthPct: number;
  referralGrowthPct: number;
  dailySeries: TrafficPoint[];
  leadSources: LeadSourceStat[];
  peakLeadWindow: {
    startDate: string;
    endDate: string;
    label: string;
    expectedLiftPct: number;
    reason: string;
  };
}

export interface CrmSnapshot {
  leads: LeadRecord[];
  bookings: BookingRecord[];
  customers: CustomerRecord[];
  notifications: CrmNotification[];
  campaigns: CampaignPlan[];
  automationRules: EmailAutomationRule[];
  analytics: AnalyticsSummary;
  metrics: {
    pipelineValue: number;
    confirmedRevenue: number;
    totalLeads: number;
    activeBookings: number;
    conversionRate: number;
    followUpsSent: number;
    referralCreditsIssued: number;
    totalReferrals: number;
    unreadNotifications: number;
  };
}

export interface AiActionResult {
  type: 'quote' | 'lead_created' | 'booking_created' | 'referral_created' | 'referral_validated' | 'availability';
  title: string;
  data: Record<string, unknown>;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  actions?: AiActionResult[];
  timestamp: string;
}
