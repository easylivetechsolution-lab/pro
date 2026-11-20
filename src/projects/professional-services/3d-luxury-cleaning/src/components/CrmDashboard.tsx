import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  Calendar as CalendarIcon,
  CalendarCheck2,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Copy,
  DollarSign,
  Gift,
  LayoutDashboard,
  Loader2,
  Mail,
  MailCheck,
  Menu,
  MessageSquareText,
  Plus,
  RefreshCw,
  Rocket,
  Search,
  Star,
  Users,
  X,
} from 'lucide-react';
import type {
  BookingStatus,
  CampaignPlan,
  CrmSnapshot,
  LeadRecord,
  LeadStatus,
  ServiceType,
} from '../types/cleaning';
import { SERVICE_CATALOG } from '../lib/pricing';
import {
  LeadSourcesDonut,
  Sparkline,
  WebsiteTrafficChart,
} from './CrmCharts';

export type CrmSection =
  | 'overview'
  | 'leads'
  | 'bookings'
  | 'calendar'
  | 'automations'
  | 'analytics'
  | 'referrals'
  | 'revenue';

interface CrmDashboardProps {
  snapshot: CrmSnapshot | null;
  loading: boolean;
  error: string | null;
  initialSection?: CrmSection;
  onRefresh: () => void;
  onSnapshotChange: React.Dispatch<React.SetStateAction<CrmSnapshot>>;
  onBackToSite: () => void;
}

const SERVICE_THUMBNAILS: Record<ServiceType, string> = {
  home: '/aether-clean/src/assets/images/how_it_works_relax_1794945446366.jpg',
  office: '/aether-clean/src/assets/images/glass_after_1794945448175.jpg',
  deep: '/aether-clean/src/assets/images/how_it_works_clean_1794945445424.jpg',
  'move-out': '/aether-clean/src/assets/images/kitchen_after_1794945446390.jpg',
};

const AVATARS = [
  '/aether-clean/src/assets/images/client_avatar_one_1794998020316.jpg',
  '/aether-clean/src/assets/images/client_avatar_two_1794998020186.jpg',
  '/aether-clean/src/assets/images/client_avatar_three_1794998021306.jpg',
  '/aether-clean/src/assets/images/client_avatar_four_1794998021618.jpg',
];

const NAV_ITEMS: {
  id: CrmSection;
  label: string;
  icon: React.FC<{ className?: string }>;
}[] = [
  { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'leads', label: 'Leads & CRM', icon: Users },
  { id: 'bookings', label: 'Bookings', icon: CalendarCheck2 },
  { id: 'calendar', label: 'Calendar & Planner', icon: CalendarIcon },
  { id: 'automations', label: 'Email Automations', icon: MailCheck },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'referrals', label: 'Referrals', icon: Gift },
  { id: 'revenue', label: 'Revenue', icon: DollarSign },
];

export const CrmDashboard: React.FC<CrmDashboardProps> = ({
  snapshot,
  loading,
  error,
  initialSection = 'overview',
  onRefresh,
  onSnapshotChange,
  onBackToSite,
}) => {
  const [section, setSection] = useState<CrmSection>(initialSection);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [rangeDays, setRangeDays] = useState<7 | 30 | 90>(30);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const [leadStatusFilter, setLeadStatusFilter] = useState<'All' | LeadStatus>('All');
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const [copilotPrompt, setCopilotPrompt] = useState('');
  const [copilotResponse, setCopilotResponse] = useState<string | null>(null);
  const [copilotLoading, setCopilotLoading] = useState(false);
  const [addingQuickLead, setAddingQuickLead] = useState(false);

  // Calendar & Campaign Planner state
  const now = useMemo(() => new Date(), []);
  const [calYear, setCalYear] = useState(now.getFullYear());
  const [calMonth, setCalMonth] = useState(now.getMonth());
  const [selectedCalDate, setSelectedCalDate] = useState(now.toISOString().slice(0, 10));
  const [showCampaignForm, setShowCampaignForm] = useState(false);
  const [campTitle, setCampTitle] = useState('');
  const [campChannel, setCampChannel] = useState<CampaignPlan['channel']>('Google Local Ads');
  const [campStart, setCampStart] = useState(
    snapshot?.analytics.peakLeadWindow.startDate || now.toISOString().slice(0, 10),
  );
  const [campEnd, setCampEnd] = useState(
    snapshot?.analytics.peakLeadWindow.endDate ||
      new Date(now.getTime() + 6 * 86400000).toISOString().slice(0, 10),
  );
  const [campLift, setCampLift] = useState(38);
  const [campBudget, setCampBudget] = useState(750);
  const [campNotes, setCampNotes] = useState('');
  const [campSubmitting, setCampSubmitting] = useState(false);

  // Referral Generator state
  const [refName, setRefName] = useState('');
  const [refEmail, setRefEmail] = useState('');
  const [refCreating, setRefCreating] = useState(false);
  const [refFeedback, setRefFeedback] = useState<string | null>(null);

  useEffect(() => {
    setSection(initialSection);
  }, [initialSection]);

  useEffect(() => {
    if (snapshot?.analytics.peakLeadWindow) {
      setCampStart(snapshot.analytics.peakLeadWindow.startDate);
      setCampEnd(snapshot.analytics.peakLeadWindow.endDate);
    }
  }, [snapshot?.analytics.peakLeadWindow]);

  const leads = snapshot?.leads ?? [];
  const bookings = snapshot?.bookings ?? [];
  const customers = snapshot?.customers ?? [];
  const notifications = snapshot?.notifications ?? [];
  const campaigns = snapshot?.campaigns ?? [];
  const automationRules = snapshot?.automationRules ?? [];
  const analytics = snapshot?.analytics;

  const filteredSeries = useMemo(() => {
    const raw = analytics?.dailySeries ?? [];
    if (rangeDays === 7) return raw.slice(-7);
    if (rangeDays === 30) return raw.slice(-30);
    return raw;
  }, [analytics, rangeDays]);

  const rangedAnalytics = useMemo(() => {
    const visits = filteredSeries.reduce((s, p) => s + p.visits, 0);
    const unique = filteredSeries.reduce((s, p) => s + p.uniqueVisitors, 0);
    const convs = filteredSeries.reduce((s, p) => s + p.conversions, 0);
    const rev =
      filteredSeries.reduce((s, p) => s + p.revenue, 0) +
      (snapshot?.metrics.confirmedRevenue ?? 0);
    const convRate = visits > 0 ? Number(((convs / visits) * 100).toFixed(1)) : 6.4;
    const bounce =
      filteredSeries.length > 0
        ? Number(
            (
              filteredSeries.reduce((s, p) => s + p.bounceRate, 0) / filteredSeries.length
            ).toFixed(1),
          )
        : 32.4;
    return { visits, unique, convs, rev, convRate, bounce };
  }, [filteredSeries, snapshot?.metrics.confirmedRevenue]);

  const filteredLeads = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return leads.filter((l) => {
      if (leadStatusFilter !== 'All' && l.status !== leadStatusFilter) return false;
      if (!q) return true;
      return (
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.address.toLowerCase().includes(q) ||
        l.serviceType.toLowerCase().includes(q) ||
        (l.referralCodeUsed ?? '').toLowerCase().includes(q)
      );
    });
  }, [leads, searchQuery, leadStatusFilter]);

  const filteredBookings = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return bookings.filter((b) => {
      if (!q) return true;
      return (
        b.customerName.toLowerCase().includes(q) ||
        b.address.toLowerCase().includes(q) ||
        b.crewAssigned.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q)
      );
    });
  }, [bookings, searchQuery]);

  const filteredCustomers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return customers.filter((c) => {
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.referralCode.toLowerCase().includes(q)
      );
    });
  }, [customers, searchQuery]);

  const selectedLead: LeadRecord | null = useMemo(() => {
    if (!selectedLeadId) return filteredLeads[0] || null;
    return leads.find((l) => l.id === selectedLeadId) || filteredLeads[0] || null;
  }, [selectedLeadId, leads, filteredLeads]);

  const pipelineCounts = useMemo(() => {
    const counts = {
      New: 0,
      Quoted: 0,
      FollowUp: 0,
      Converted: 0,
      Completed: bookings.filter((b) => b.status === 'Completed').length,
    };
    for (const l of leads) {
      if (l.status === 'New') counts.New += 1;
      else if (l.status === 'Quoted') counts.Quoted += 1;
      else if (l.status === 'Follow-Up Sent') counts.FollowUp += 1;
      else if (l.status === 'Converted') counts.Converted += 1;
    }
    return counts;
  }, [leads, bookings]);

  const serviceRevenueBreakdown = useMemo(() => {
    return SERVICE_CATALOG.map((svc) => {
      const bookedItems = bookings.filter(
        (b) => b.serviceType === svc.id && b.status !== 'Cancelled',
      );
      const leadItems = leads.filter(
        (l) => l.serviceType === svc.id && l.status !== 'Archived' && l.status !== 'Converted',
      );
      return {
        id: svc.id,
        title: svc.title,
        bookedRevenue: bookedItems.reduce((s, b) => s + b.totalPrice, 0),
        pipelineValue: leadItems.reduce((s, l) => s + l.estimatedPrice, 0),
        jobsCount: bookedItems.length,
      };
    });
  }, [bookings, leads]);

  const calendarDays = useMemo(() => {
    const first = new Date(calYear, calMonth, 1);
    const startWeekday = first.getDay();
    const totalDays = new Date(calYear, calMonth + 1, 0).getDate();
    const cells: Array<{ iso: string | null; day: number | null }> = [];
    for (let i = 0; i < startWeekday; i++) {
      cells.push({ iso: null, day: null });
    }
    for (let d = 1; d <= totalDays; d++) {
      const iso = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      cells.push({ iso, day: d });
    }
    return cells;
  }, [calYear, calMonth]);

  const serviceTitle = (id: string) =>
    SERVICE_CATALOG.find((s) => s.id === id)?.title || id;

  const handleCopyText = async (code: string, textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2200);
    } catch {
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2200);
    }
  };

  const handleUpdateLeadStatus = async (leadId: string, status: LeadStatus) => {
    setBusyId(leadId);
    try {
      onSnapshotChange((current) => {
        const leads = current.leads.map((lead) => lead.id === leadId
          ? { ...lead, status, updatedAt: new Date().toISOString() }
          : lead);
        return {
          ...current,
          leads,
          metrics: {
            ...current.metrics,
            pipelineValue: leads.filter((lead) => lead.status !== 'Converted' && lead.status !== 'Archived')
              .reduce((total, lead) => total + lead.estimatedPrice, 0),
          },
        };
      });
    } finally {
      setBusyId(null);
    }
  };

  const handleFollowUpAction = async (
    leadId: string,
    action: 'generate' | 'mark_sent',
    followUpId?: string,
  ) => {
    setBusyId(leadId);
    try {
      onSnapshotChange((current) => ({
        ...current,
        leads: current.leads.map((lead) => {
          if (lead.id !== leadId) return lead;
          const now = new Date().toISOString();
          if (action === 'mark_sent') {
            return {
              ...lead,
              updatedAt: now,
              followUps: lead.followUps.map((step) => step.id === followUpId
                ? { ...step, status: 'Sent' as const, sentAt: now }
                : step),
            };
          }
          return {
            ...lead,
            status: 'Follow-Up Sent' as const,
            updatedAt: now,
            followUps: [...lead.followUps, {
              id: `demo-followup-${Date.now()}`,
              channel: 'Email' as const,
              timing: 'Instant Confirmation',
              subject: `Your AetherClean proposal for ${lead.address}`,
              body: `AetherClean is ready to help with your ${serviceTitle(lead.serviceType)} service.`,
              status: 'Sent' as const,
              sentAt: now,
            }],
          };
        }),
      }));
    } finally {
      setBusyId(null);
    }
  };

  const handleConvertLead = async (leadId: string) => {
    setBusyId(leadId);
    try {
      onSnapshotChange((current) => ({
        ...current,
        leads: current.leads.map((lead) => lead.id === leadId
          ? { ...lead, status: 'Converted' as const, updatedAt: new Date().toISOString() }
          : lead),
      }));
      setSection('bookings');
    } finally {
      setBusyId(null);
    }
  };

  const handleBookingStatusChange = async (bookingId: string, status: BookingStatus) => {
    onSnapshotChange((current) => {
      const bookings = current.bookings.map((booking) => booking.id === bookingId ? { ...booking, status } : booking);
      return {
        ...current,
        bookings,
        metrics: {
          ...current.metrics,
          activeBookings: bookings.filter((booking) => booking.status === 'Scheduled' || booking.status === 'In Progress').length,
        },
      };
    });
  };

  const handleMarkNotificationsRead = async (id?: string) => {
    onSnapshotChange((current) => {
      const notifications = current.notifications.map((notification) => !id || notification.id === id
        ? { ...notification, read: true }
        : notification);
      return {
        ...current,
        notifications,
        metrics: { ...current.metrics, unreadNotifications: notifications.filter((item) => !item.read).length },
      };
    });
  };

  const handleToggleAutomation = async (ruleId: string, enabled: boolean) => {
    setBusyId(ruleId);
    try {
      onSnapshotChange((current) => ({
        ...current,
        automationRules: current.automationRules.map((rule) => rule.id === ruleId ? { ...rule, enabled } : rule),
      }));
    } finally {
      setBusyId(null);
    }
  };

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!campTitle.trim()) return;
    setCampSubmitting(true);
    try {
      onSnapshotChange((current) => ({
        ...current,
        campaigns: [...current.campaigns, {
          id: `demo-campaign-${Date.now()}`,
          title: campTitle.trim(),
          channel: campChannel,
          targetStartDate: campStart,
          targetEndDate: campEnd,
          expectedLiftPct: campLift,
          budget: campBudget,
          status: 'Planned',
          notes: campNotes.trim() || 'Scheduled around high-converting Bay Area booking days.',
        }],
      }));
      setCampTitle('');
      setCampNotes('');
      setShowCampaignForm(false);
    } finally {
      setCampSubmitting(false);
    }
  };

  const handleCampaignStatus = async (id: string, status: CampaignPlan['status']) => {
    onSnapshotChange((current) => ({
      ...current,
      campaigns: current.campaigns.map((campaign) => campaign.id === id ? { ...campaign, status } : campaign),
    }));
  };

  const handleGenerateReferralPartner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!refName.trim() || !refEmail.trim()) return;
    setRefCreating(true);
    setRefFeedback(null);
    try {
      const name = refName.trim();
      const referralCode = `AETHER-${name.replace(/[^a-z0-9]/gi, '').slice(0, 6).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
      onSnapshotChange((current) => ({
        ...current,
        customers: [...current.customers, {
          id: `demo-customer-${Date.now()}`,
          name,
          email: refEmail.trim(),
          phone: 'Not provided',
          address: 'San Francisco Bay Area',
          referralCode,
          referralsCount: 0,
          referralCredits: 0,
          totalSpent: 0,
          bookingsCount: 0,
          joinedAt: new Date().toISOString(),
        }],
      }));
      setRefFeedback(`Issued demo partner link for ${name}: ${referralCode}`);
      setRefName('');
      setRefEmail('');
    } finally {
      setRefCreating(false);
    }
  };

  const handleRunCopilot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!copilotPrompt.trim()) return;
    setCopilotLoading(true);
    try {
      setCopilotResponse(`Demo insight: ${snapshot?.metrics.totalLeads ?? 0} leads and ${snapshot?.metrics.activeBookings ?? 0} active bookings are currently in this workspace. Review high-value follow-ups to prioritize the next conversion.`);
    } finally {
      setCopilotLoading(false);
    }
  };

  const handleQuickAddLead = async () => {
    setAddingQuickLead(true);
    const services: ServiceType[] = ['home', 'office', 'deep', 'move-out'];
    const serviceType = services[Math.floor(Math.random() * services.length)];
    const names = ['Liam Thornton', 'Sofia Alvarez', 'Noah Castellano', 'Maya Okafor'];
    const pick = names[Math.floor(Math.random() * names.length)];
    const slug = pick.toLowerCase().replace(/\s+/g, '.');
    const now = new Date().toISOString();
    const sqft = 1800 + Math.floor(Math.random() * 1400);
    const lead: LeadRecord = {
      id: `demo-lead-${Date.now()}`,
      name: pick,
      email: `${slug}@bayclients.co`,
      phone: 'Not provided',
      address: 'Marina District, San Francisco',
      serviceType,
      sqft,
      rooms: 4,
      frequency: 'bi-weekly',
      addOns: ['interior-windows'],
      preferredDate: new Date(Date.now() + 86400000 * 3).toISOString().slice(0, 10),
      preferredWindow: '09:00 AM - 12:00 PM',
      notes: 'Live website quote intake captured in CRM.',
      estimatedPrice: 285,
      status: 'New',
      source: 'Quote Form',
      followUps: [],
      createdAt: now,
      updatedAt: now,
    };
    onSnapshotChange((current) => ({
      ...current,
      leads: [lead, ...current.leads],
      metrics: {
        ...current.metrics,
        totalLeads: current.metrics.totalLeads + 1,
        pipelineValue: current.metrics.pipelineValue + lead.estimatedPrice,
      },
    }));
    setAddingQuickLead(false);
  };

  const unreadCount = snapshot?.metrics.unreadNotifications ?? 0;
  const activeNavLabel = NAV_ITEMS.find((n) => n.id === section)?.label ?? 'Dashboard';
  const topReferrer = customers[0];
  const monthLabel = new Date(calYear, calMonth, 1).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const renderSidebarContent = () => (
    <div className="flex h-full flex-col justify-between bg-[#0B1730] text-slate-200 px-4 py-5">
      <div>
        {/* Brand inside CRM Sidebar */}
        <div className="px-2.5 pb-5 mb-4 border-b border-slate-800/80">
          <div className="font-display text-lg font-bold tracking-tight text-white">
            AetherClean
          </div>
          <p className="text-[11px] text-sky-300/85 mt-0.5">
            Operations &amp; Growth CRM
          </p>
        </div>

        {/* Navigation Links */}
        <nav aria-label="CRM sections" className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = section === item.id;
            const badge =
              item.id === 'leads'
                ? leads.length
                : item.id === 'bookings'
                  ? snapshot?.metrics.activeBookings ?? 0
                  : null;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setSection(item.id);
                  setMobileNavOpen(false);
                }}
                className={`w-full flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  active
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'text-slate-300 hover:bg-white/6 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-2.5 min-w-0">
                  <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span className="truncate">{item.label}</span>
                </span>
                {badge !== null && (
                  <span
                    className={`font-mono text-[10px] px-1.5 py-0.5 rounded-md tabular-nums ${
                      active ? 'bg-sky-500/50 text-white' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Bottom Live Status & Back to Website */}
      <div className="pt-4 mt-6 border-t border-slate-800/80 space-y-2.5">
        <div className="px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-800/80">
          <p className="text-[11px] font-medium text-slate-400">Workspace Mode</p>
          <p className="text-xs font-semibold text-white mt-0.5 flex items-center gap-1.5">
            <span
              className="h-2 w-2 rounded-full bg-sky-400"
              aria-hidden="true"
            />
            <span>Demo Data</span>
          </p>
        </div>

        <button
          type="button"
          onClick={onBackToSite}
          className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-slate-700/80 bg-slate-900/60 hover:bg-slate-800 text-xs font-semibold text-slate-100 transition-colors cursor-pointer whitespace-nowrap"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Return to Website</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-[#F4F8FD] text-slate-900">
      {/* Desktop Dark Navy Sidebar */}
      <aside className="hidden lg:block w-[252px] shrink-0 sticky top-0 h-screen overflow-y-auto border-r border-slate-800">
        {renderSidebarContent()}
      </aside>

      {/* Mobile Slide-Over Sidebar */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs"
            onClick={() => setMobileNavOpen(false)}
          />
          <div className="relative w-[264px] max-w-[82vw] h-full shadow-xl">
            <button
              type="button"
              onClick={() => setMobileNavOpen(false)}
              aria-label="Close CRM navigation"
              className="absolute right-3 top-4 z-10 p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            {renderSidebarContent()}
          </div>
        </div>
      )}

      {/* Right Main White / Sky-Blue SaaS Workspace */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Command Bar */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xs border-b border-slate-200/90 px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                onClick={() => setMobileNavOpen(true)}
                aria-label="Open CRM menu"
                className="lg:hidden p-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                <Menu className="w-4 h-4" />
              </button>
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-slate-500 truncate">
                  AetherClean Workspace / <span className="text-sky-700">{activeNavLabel}</span>
                </p>
                <h1 className="font-display text-lg sm:text-xl font-bold tracking-tight text-slate-900 truncate">
                  {section === 'overview'
                    ? 'Operations, Analytics & Growth Dashboard'
                    : activeNavLabel}
                </h1>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              {/* Search across leads, bookings, clients */}
              <div className="relative hidden md:block">
                <Search
                  className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search leads, bookings, codes..."
                  className="w-56 xl:w-64 rounded-xl border border-slate-200 bg-slate-50/70 pl-8 pr-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-sky-500 focus:outline-none"
                />
              </div>

              {/* Date Range Selector */}
              <select
                aria-label="Analytics timeframe"
                value={rangeDays}
                onChange={(e) => setRangeDays(Number(e.target.value) as 7 | 30 | 90)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 focus:border-sky-500 focus:outline-none cursor-pointer"
              >
                <option value={7}>Last 7 Days</option>
                <option value={30}>Last 30 Days</option>
                <option value={90}>Last 90 Days</option>
              </select>

              {/* Notification Center Bell */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setNotificationsOpen((v) => !v)}
                  aria-label="Booking & Lead Notifications"
                  className="relative flex items-center justify-center h-9 w-9 rounded-xl border border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:text-sky-700 transition-colors cursor-pointer"
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-sky-600 px-1 text-[10px] font-bold text-white tabular-nums">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-slate-200 bg-white shadow-lg p-4 z-50">
                    <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-100">
                      <div>
                        <p className="text-xs font-bold text-slate-900">
                          Dispatch &amp; Website Notifications
                        </p>
                        <p className="text-[11px] text-slate-500 tabular-nums">
                          {unreadCount} unread alerts
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleMarkNotificationsRead()}
                        className="text-[11px] font-semibold text-sky-700 hover:underline cursor-pointer"
                      >
                        Mark all read
                      </button>
                    </div>
                    <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                      {notifications.length === 0 ? (
                        <p className="py-6 text-center text-xs text-slate-500">
                          All caught up on dispatches &amp; leads.
                        </p>
                      ) : (
                        notifications.slice(0, 8).map((n) => (
                          <button
                            key={n.id}
                            type="button"
                            onClick={() => {
                              handleMarkNotificationsRead(n.id);
                              if (n.bookingId) setSection('bookings');
                              else if (n.leadId) {
                                setSelectedLeadId(n.leadId);
                                setSection('leads');
                              }
                              setNotificationsOpen(false);
                            }}
                            className={`w-full text-left py-2.5 px-2 rounded-lg transition-colors cursor-pointer ${
                              n.read ? 'hover:bg-slate-50' : 'bg-sky-50/70 hover:bg-sky-50'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-semibold text-slate-900">
                                {n.title}
                              </span>
                              {!n.read && (
                                <span className="text-[10px] font-semibold text-sky-700 shrink-0">
                                  New
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-2">
                              {n.detail}
                            </p>
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              <button
                type="button"
                disabled={addingQuickLead}
                onClick={handleQuickAddLead}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-sky-600 text-white text-xs font-semibold hover:bg-sky-500 disabled:opacity-50 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                {addingQuickLead ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Plus className="w-3.5 h-3.5" />
                )}
                <span>Add Live Lead</span>
              </button>

              <button
                type="button"
                onClick={onRefresh}
                aria-label="Refresh CRM data"
                className="inline-flex items-center justify-center h-9 w-9 rounded-xl border border-slate-200 bg-white text-slate-700 hover:border-sky-300 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </header>

        {/* Main Workspace Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1440px] w-full mx-auto space-y-6">
          {error && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-medium text-rose-700">
              {error}
            </div>
          )}

          {/* ================= OVERVIEW DASHBOARD TAB ================= */}
          {section === 'overview' && (
            <>
              {/* 5-Card Top KPI Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
                <div className="rounded-2xl border border-slate-200/90 bg-white p-4">
                  <span className="text-xs font-medium text-slate-500 block whitespace-nowrap">
                    Total Leads
                  </span>
                  <div className="flex items-end justify-between gap-2 mt-1">
                    <p className="font-display text-2xl font-bold text-slate-900 tabular-nums">
                      {snapshot?.metrics.totalLeads ?? 0}
                    </p>
                    <Sparkline
                      values={filteredSeries.slice(-8).map((p) => p.conversions)}
                      color="#0284c7"
                    />
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 mt-1.5 tabular-nums">
                    <ArrowUpRight className="w-3 h-3" />+
                    {analytics?.leadGrowthPct ?? 12.5}% · $
                    {(snapshot?.metrics.pipelineValue ?? 0).toLocaleString()} open
                  </span>
                </div>

                <div className="rounded-2xl border border-slate-200/90 bg-white p-4">
                  <span className="text-xs font-medium text-slate-500 block whitespace-nowrap">
                    Bookings
                  </span>
                  <div className="flex items-end justify-between gap-2 mt-1">
                    <p className="font-display text-2xl font-bold text-slate-900 tabular-nums">
                      {bookings.length}
                    </p>
                    <Sparkline
                      values={[14, 17, 15, 19, 22, 24, 23, 28]}
                      color="#10b981"
                    />
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 mt-1.5 tabular-nums">
                    <ArrowUpRight className="w-3 h-3" />+
                    {analytics?.bookingGrowthPct ?? 18.2}% ·{' '}
                    {snapshot?.metrics.activeBookings ?? 0} upcoming
                  </span>
                </div>

                <div className="rounded-2xl border border-slate-200/90 bg-white p-4">
                  <span className="text-xs font-medium text-slate-500 block whitespace-nowrap">
                    Total Revenue
                  </span>
                  <div className="flex items-end justify-between gap-2 mt-1">
                    <p className="font-display text-2xl font-bold text-slate-900 tabular-nums">
                      ${rangedAnalytics.rev.toLocaleString()}
                    </p>
                    <Sparkline
                      values={filteredSeries.slice(-8).map((p) => p.revenue)}
                      color="#f59e0b"
                    />
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 mt-1.5 tabular-nums">
                    <ArrowUpRight className="w-3 h-3" />+
                    {analytics?.revenueGrowthPct ?? 22.1}% ·{' '}
                    {analytics?.completedProjects ?? 238} completed
                  </span>
                </div>

                <div className="rounded-2xl border border-slate-200/90 bg-white p-4">
                  <span className="text-xs font-medium text-slate-500 block whitespace-nowrap">
                    Referral Signups
                  </span>
                  <div className="flex items-end justify-between gap-2 mt-1">
                    <p className="font-display text-2xl font-bold text-slate-900 tabular-nums">
                      {snapshot?.metrics.totalReferrals ?? 0}
                    </p>
                    <Sparkline values={[2, 4, 3, 5, 6, 8, 9, 12]} color="#6366f1" />
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-sky-700 mt-1.5 tabular-nums">
                    <ArrowUpRight className="w-3 h-3" />
                    ${(snapshot?.metrics.referralCreditsIssued ?? 0).toLocaleString()} credits issued
                  </span>
                </div>

                <div className="rounded-2xl border border-slate-200/90 bg-white p-4 sm:col-span-2 xl:col-span-1">
                  <span className="text-xs font-medium text-slate-500 block whitespace-nowrap">
                    Customer Rating
                  </span>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="font-display text-2xl font-bold text-slate-900 tabular-nums">
                      {analytics?.avgCustomerRating ?? 4.9}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">/ 5.0</span>
                  </div>
                  <div className="flex items-center gap-0.5 mt-2" aria-label="4.9 out of 5 stars">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                        aria-hidden="true"
                      />
                    ))}
                    <span className="ml-1.5 text-[11px] text-slate-500 tabular-nums">
                      48h spotless pledge
                    </span>
                  </div>
                </div>
              </div>

              {/* Website Analytics & Leads by Source */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                <section className="lg:col-span-8 rounded-2xl border border-slate-200/90 bg-white p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <div>
                        <h2 className="font-display text-base font-bold text-slate-900">
                          Website Analytics &amp; Conversions
                        </h2>
                        <p className="text-xs text-slate-500">
                          Live website traffic, quote interactions, and conversion performance
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSection('analytics')}
                        className="text-xs font-semibold text-sky-700 hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>Full Analytics &amp; 3D</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pb-4 mb-4 border-b border-slate-100">
                      <div>
                        <span className="text-[11px] text-slate-500 block">Total Visits</span>
                        <span className="font-display text-lg font-bold text-slate-900 tabular-nums">
                          {rangedAnalytics.visits.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-500 block">Unique Visitors</span>
                        <span className="font-display text-lg font-bold text-slate-900 tabular-nums">
                          {rangedAnalytics.unique.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-500 block">Conversion Rate</span>
                        <span className="font-display text-lg font-bold text-emerald-700 tabular-nums">
                          {rangedAnalytics.convRate}%
                        </span>
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-500 block">Bounce Rate</span>
                        <span className="font-display text-lg font-bold text-slate-900 tabular-nums">
                          {rangedAnalytics.bounce}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <WebsiteTrafficChart series={filteredSeries} />
                </section>

                <section className="lg:col-span-4 rounded-2xl border border-slate-200/90 bg-white p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div>
                        <h2 className="font-display text-base font-bold text-slate-900">
                          Leads by Source
                        </h2>
                        <p className="text-xs text-slate-500">Website channel attribution</p>
                      </div>
                    </div>
                    <LeadSourcesDonut
                      sources={analytics?.leadSources ?? []}
                      totalLeads={
                        (analytics?.leadSources ?? []).reduce((s, item) => s + item.leads, 0)
                      }
                    />
                  </div>

                  <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500">Automated Sequences Sent</span>
                    <span className="font-mono font-semibold text-sky-700 tabular-nums">
                      {snapshot?.metrics.followUpsSent ?? 0} dispatched
                    </span>
                  </div>
                </section>
              </div>

              {/* CRM Pipeline + Upcoming Cleaning Schedule */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                <section className="lg:col-span-7 rounded-2xl border border-slate-200/90 bg-white p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div>
                        <h2 className="font-display text-base font-bold text-slate-900">
                          CRM Pipeline &amp; Contact Flow
                        </h2>
                        <p className="text-xs text-slate-500">
                          Click any stage to filter enquiries and follow-up workflows
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSection('leads')}
                        className="text-xs font-semibold text-sky-700 hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>View All</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Horizontal Segmented Stage Funnel */}
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {(
                        [
                          {
                            label: 'New',
                            count: pipelineCounts.New,
                            filter: 'New' as LeadStatus,
                            tone: 'bg-sky-600 text-white',
                          },
                          {
                            label: 'Quoted',
                            count: pipelineCounts.Quoted,
                            filter: 'Quoted' as LeadStatus,
                            tone: 'bg-sky-500 text-white',
                          },
                          {
                            label: 'Follow-Up',
                            count: pipelineCounts.FollowUp,
                            filter: 'Follow-Up Sent' as LeadStatus,
                            tone: 'bg-indigo-600 text-white',
                          },
                          {
                            label: 'Booked',
                            count: pipelineCounts.Converted,
                            filter: 'Converted' as LeadStatus,
                            tone: 'bg-emerald-600 text-white',
                          },
                          {
                            label: 'Completed',
                            count: pipelineCounts.Completed,
                            filter: 'Converted' as LeadStatus,
                            tone: 'bg-slate-800 text-white',
                          },
                        ] as const
                      ).map((stage) => (
                        <button
                          key={stage.label}
                          type="button"
                          onClick={() => {
                            if (stage.label === 'Completed') {
                              setSection('bookings');
                            } else {
                              setLeadStatusFilter(stage.filter);
                              setSection('leads');
                            }
                          }}
                          className={`rounded-xl px-3 py-3 text-left transition-transform hover:-translate-y-0.5 cursor-pointer ${stage.tone}`}
                        >
                          <span className="text-[11px] font-medium opacity-90 block">
                            {stage.label}
                          </span>
                          <span className="font-display text-xl font-bold tabular-nums mt-0.5 block">
                            {stage.count}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Recent Contacts Strip */}
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3.5 border-t border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="flex -space-x-2">
                          {AVATARS.map((src, i) => (
                            <img
                              key={src}
                              src={src}
                              alt={`Client portrait ${i + 1}`}
                              referrerPolicy="no-referrer"
                              className="h-8 w-8 rounded-full object-cover ring-2 ring-white"
                            />
                          ))}
                        </div>
                        <span className="text-xs text-slate-600 tabular-nums">
                          {customers.length} active client records ·{' '}
                          <strong className="text-emerald-700">
                            {snapshot?.metrics.conversionRate ?? 0}% pipeline conversion
                          </strong>
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSection('automations')}
                        className="text-xs font-semibold text-sky-700 hover:underline cursor-pointer"
                      >
                        Email Workflows →
                      </button>
                    </div>

                    {/* Recent Website Enquiries Quick Inspect List */}
                    <div className="mt-3 pt-3 border-t border-slate-100 divide-y divide-slate-100">
                      {leads.slice(0, 2).map((lead) => (
                        <button
                          key={lead.id}
                          type="button"
                          onClick={() => {
                            setSelectedLeadId(lead.id);
                            setSection('leads');
                          }}
                          className="w-full py-2 flex items-center justify-between gap-3 text-left text-xs hover:bg-slate-50 rounded-lg px-1.5 transition-colors cursor-pointer"
                        >
                          <div className="min-w-0">
                            <span className="font-semibold text-slate-900">{lead.name}</span>
                            <span className="text-slate-400 mx-1.5">·</span>
                            <span className="text-slate-500">
                              {serviceTitle(lead.serviceType)} ({lead.sqft.toLocaleString()} sq ft)
                            </span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0 tabular-nums">
                            <span className="font-mono font-semibold text-slate-900">
                              ${lead.estimatedPrice}
                            </span>
                            <span className="text-[11px] font-semibold text-sky-700">
                              {lead.status}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* AI Pipeline Copilot Strip */}
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <form onSubmit={handleRunCopilot} className="flex flex-col sm:flex-row gap-2">
                      <div className="relative flex-1">
                        <MessageSquareText className="w-3.5 h-3.5 text-sky-600 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          value={copilotPrompt}
                          onChange={(e) => setCopilotPrompt(e.target.value)}
                          placeholder="Ask AI CRM Copilot: 'Which leads should we follow up first today?'"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-9 pr-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-none"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={copilotLoading || !copilotPrompt.trim()}
                        className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 disabled:opacity-50 cursor-pointer whitespace-nowrap shrink-0"
                      >
                        {copilotLoading && <Loader2 className="w-3 h-3 animate-spin" />}
                        <span>Analyze Pipeline</span>
                      </button>
                    </form>
                    {copilotResponse && (
                      <div className="mt-2.5 rounded-xl border border-sky-100 bg-sky-50/60 p-3 text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">
                        {copilotResponse}
                      </div>
                    )}
                  </div>
                </section>

                {/* Upcoming Cleaning Appointments */}
                <section className="lg:col-span-5 rounded-2xl border border-slate-200/90 bg-white p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div>
                        <h2 className="font-display text-base font-bold text-slate-900">
                          Upcoming Schedule
                        </h2>
                        <p className="text-xs text-slate-500">Live crew dispatch queue</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSection('calendar')}
                        className="text-xs font-semibold text-sky-700 hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>View Calendar</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="divide-y divide-slate-100">
                      {bookings.slice(0, 4).map((b) => (
                        <div key={b.id} className="py-3 first:pt-0 last:pb-0 flex items-center gap-3">
                          <img
                            src={SERVICE_THUMBNAILS[b.serviceType] || SERVICE_THUMBNAILS.home}
                            alt={serviceTitle(b.serviceType)}
                            referrerPolicy="no-referrer"
                            className="h-11 w-14 rounded-lg object-cover border border-slate-200 shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold text-slate-900 truncate">
                              {serviceTitle(b.serviceType)} · {b.customerName}
                            </p>
                            <p className="text-[11px] text-slate-500 tabular-nums truncate mt-0.5">
                              {b.scheduledDate} · {b.timeWindow}
                            </p>
                          </div>
                          <span
                            className={`text-[11px] font-semibold px-2 py-1 rounded-lg shrink-0 ${
                              b.status === 'Completed'
                                ? 'bg-emerald-50 text-emerald-700'
                                : b.status === 'In Progress'
                                  ? 'bg-sky-50 text-sky-700'
                                  : 'bg-amber-50 text-amber-700'
                            }`}
                          >
                            {b.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500">Confirmed Dispatch Value</span>
                    <span className="font-mono font-bold text-slate-900 tabular-nums">
                      ${(snapshot?.metrics.confirmedRevenue ?? 0).toLocaleString()}
                    </span>
                  </div>
                </section>
              </div>

              {/* Referral Program + Lead Generation Planner */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                {/* Referral Program Summary */}
                <section className="lg:col-span-5 rounded-2xl border border-slate-200/90 bg-white p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <h2 className="font-display text-base font-bold text-slate-900">
                        Referral Program &amp; Commissions
                      </h2>
                      <button
                        type="button"
                        onClick={() => setSection('referrals')}
                        className="text-xs font-semibold text-sky-700 hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      Reward advocates with <strong className="text-slate-900">$35 credit</strong>{' '}
                      per referral and track <strong className="text-slate-900">15% partner commissions</strong>{' '}
                      across completed cleans.
                    </p>

                    <div className="grid grid-cols-2 gap-3 my-4 py-3.5 border-y border-slate-100">
                      <div>
                        <span className="text-[11px] text-slate-500 block">Total Referrals</span>
                        <span className="font-display text-xl font-bold text-slate-900 tabular-nums">
                          {snapshot?.metrics.totalReferrals ?? 0} signups
                        </span>
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-500 block">
                          Credits &amp; Rewards
                        </span>
                        <span className="font-display text-xl font-bold text-emerald-700 tabular-nums">
                          ${(snapshot?.metrics.referralCreditsIssued ?? 0).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {topReferrer && (
                    <div className="flex items-center justify-between gap-2 rounded-xl bg-slate-50 border border-slate-200/80 px-3 py-2.5">
                      <div className="min-w-0">
                        <span className="text-[10px] text-slate-500 block">
                          Top Partner Link ({topReferrer.name})
                        </span>
                        <span className="font-mono text-xs font-semibold text-sky-700 truncate block">
                          {topReferrer.referralCode}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopyText(
                            topReferrer.referralCode,
                            `${window.location.origin}/?ref=${topReferrer.referralCode}#quote`,
                          )
                        }
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold transition-colors cursor-pointer shrink-0"
                      >
                        {copiedCode === topReferrer.referralCode ? (
                          <Check className="w-3.5 h-3.5" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span>
                          {copiedCode === topReferrer.referralCode
                            ? 'Copied'
                            : 'Copy Referral Link'}
                        </span>
                      </button>
                    </div>
                  )}
                </section>

                {/* Lead Generation Planner & Peak-Day Calendar */}
                <section className="lg:col-span-7 rounded-2xl border border-slate-200/90 bg-white p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <div>
                      <h2 className="font-display text-base font-bold text-slate-900">
                        Lead Generation Planner
                      </h2>
                      <p className="text-xs text-slate-500">
                        Schedule campaigns around peak website conversion days
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setShowCampaignForm(true);
                        setSection('calendar');
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 text-white text-xs font-semibold hover:bg-sky-500 cursor-pointer"
                    >
                      <Rocket className="w-3.5 h-3.5" />
                      <span>Plan Campaign</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                    {/* Mini Month Grid */}
                    <div className="md:col-span-7">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-900">{monthLabel}</span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            aria-label="Previous month"
                            onClick={() => {
                              if (calMonth === 0) {
                                setCalMonth(11);
                                setCalYear((y) => y - 1);
                              } else setCalMonth((m) => m - 1);
                            }}
                            className="p-1 rounded hover:bg-slate-100 text-slate-600 cursor-pointer"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            aria-label="Next month"
                            onClick={() => {
                              if (calMonth === 11) {
                                setCalMonth(0);
                                setCalYear((y) => y + 1);
                              } else setCalMonth((m) => m + 1);
                            }}
                            className="p-1 rounded hover:bg-slate-100 text-slate-600 cursor-pointer"
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-slate-400 mb-1">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                          <div key={d}>{d}</div>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-1 text-center text-xs tabular-nums">
                        {calendarDays.map((cell, idx) => {
                          if (!cell.iso || !cell.day) {
                            return <div key={`e-${idx}`} className="h-7" />;
                          }
                          const isPeak =
                            analytics?.peakLeadWindow &&
                            cell.iso >= analytics.peakLeadWindow.startDate &&
                            cell.iso <= analytics.peakLeadWindow.endDate;
                          const hasBooking = bookings.some((b) => b.scheduledDate === cell.iso);
                          const isSelected = selectedCalDate === cell.iso;
                          return (
                            <button
                              key={cell.iso}
                              type="button"
                              onClick={() => {
                                setSelectedCalDate(cell.iso!);
                                setSection('calendar');
                              }}
                              className={`relative h-7 rounded-md font-medium transition-colors cursor-pointer ${
                                isSelected
                                  ? 'bg-sky-600 text-white font-bold'
                                  : isPeak
                                    ? 'bg-sky-50 text-sky-800 border border-sky-200'
                                    : 'text-slate-700 hover:bg-slate-100'
                              }`}
                            >
                              {cell.day}
                              {hasBooking && (
                                <span
                                  className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                                    isSelected ? 'bg-white' : 'bg-emerald-500'
                                  }`}
                                />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Best Window Recommendation Box */}
                    <div className="md:col-span-5 rounded-xl bg-sky-50/75 border border-sky-200/80 p-4">
                      <span className="text-[11px] font-semibold text-sky-700 block">
                        Best Time to Launch
                      </span>
                      <p className="font-display text-base font-bold text-slate-900 mt-1 tabular-nums">
                        {analytics?.peakLeadWindow.label ?? 'Upcoming Thu–Wed'}
                      </p>
                      <p className="font-display text-2xl font-extrabold text-emerald-700 mt-1 tabular-nums">
                        +{analytics?.peakLeadWindow.expectedLiftPct ?? 42}%
                        <span className="text-xs font-semibold text-slate-600 ml-1">
                          expected leads
                        </span>
                      </p>
                      <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
                        {analytics?.peakLeadWindow.reason}
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </>
          )}

          {/* ================= LEADS & CRM TAB ================= */}
          {section === 'leads' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white border border-slate-200">
                  {(['All', 'New', 'Quoted', 'Follow-Up Sent', 'Converted'] as const).map(
                    (st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setLeadStatusFilter(st)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                          leadStatusFilter === st
                            ? 'bg-sky-600 text-white'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {st}
                      </button>
                    ),
                  )}
                </div>

                <div className="relative md:hidden w-full sm:w-auto">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search leads..."
                    className="w-full sm:w-56 rounded-xl border border-slate-200 bg-white pl-8 pr-3 py-2 text-xs text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-7 rounded-2xl border border-slate-200/90 bg-white overflow-hidden">
                  {filteredLeads.length === 0 ? (
                    <div className="p-10 text-center text-sm text-slate-500">
                      No leads match this filter yet.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-semibold text-slate-500">
                            <th className="py-3 px-4">Prospect</th>
                            <th className="py-3 px-4">Service &amp; Scope</th>
                            <th className="py-3 px-4 text-right">Quote</th>
                            <th className="py-3 px-4">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-xs">
                          {filteredLeads.map((lead) => {
                            const isSelected = selectedLead?.id === lead.id;
                            return (
                              <tr
                                key={lead.id}
                                onClick={() => setSelectedLeadId(lead.id)}
                                className={`cursor-pointer transition-colors ${
                                  isSelected ? 'bg-sky-50/80' : 'hover:bg-slate-50'
                                }`}
                              >
                                <td className="py-3.5 px-4">
                                  <div className="font-semibold text-slate-900">{lead.name}</div>
                                  <div className="text-slate-500">{lead.email}</div>
                                </td>
                                <td className="py-3.5 px-4">
                                  <div className="font-medium text-slate-800">
                                    {serviceTitle(lead.serviceType)}
                                  </div>
                                  <div className="text-slate-500 font-mono tabular-nums">
                                    {lead.sqft.toLocaleString()} sq ft · {lead.frequency}
                                  </div>
                                </td>
                                <td className="py-3.5 px-4 text-right font-mono font-semibold text-slate-900 tabular-nums">
                                  ${lead.estimatedPrice}
                                </td>
                                <td className="py-3.5 px-4">
                                  <span
                                    className={`font-semibold ${
                                      lead.status === 'Converted'
                                        ? 'text-emerald-700'
                                        : lead.status === 'Follow-Up Sent'
                                          ? 'text-sky-700'
                                          : 'text-amber-700'
                                    }`}
                                  >
                                    {lead.status}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* Selected Lead Inspector & Automated AI Follow-Up Engine */}
                <div className="lg:col-span-5 rounded-2xl border border-slate-200/90 bg-white p-6 space-y-5">
                  {selectedLead ? (
                    <>
                      <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
                        <div>
                          <span className="font-mono text-[11px] text-slate-400">
                            {selectedLead.id} · {selectedLead.source}
                          </span>
                          <h2 className="font-display text-lg font-bold text-slate-900">
                            {selectedLead.name}
                          </h2>
                          <p className="text-xs text-slate-500">{selectedLead.address}</p>
                        </div>
                        <select
                          aria-label="Update lead status"
                          value={selectedLead.status}
                          disabled={busyId === selectedLead.id}
                          onChange={(e) =>
                            handleUpdateLeadStatus(selectedLead.id, e.target.value as LeadStatus)
                          }
                          className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-800 bg-white"
                        >
                          <option value="New">New</option>
                          <option value="Quoted">Quoted</option>
                          <option value="Follow-Up Sent">Follow-Up Sent</option>
                          <option value="Converted">Converted</option>
                          <option value="Archived">Archived</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="rounded-xl bg-slate-50 border border-slate-100 p-3">
                          <span className="text-slate-500 block">Requested Window</span>
                          <span className="font-semibold text-slate-900 tabular-nums">
                            {selectedLead.preferredDate} · {selectedLead.preferredWindow}
                          </span>
                        </div>
                        <div className="rounded-xl bg-slate-50 border border-slate-100 p-3">
                          <span className="text-slate-500 block">Referral Code Used</span>
                          <span className="font-mono font-semibold text-sky-700">
                            {selectedLead.referralCodeUsed || 'None'}
                          </span>
                        </div>
                      </div>

                      {selectedLead.notes && (
                        <div className="text-xs text-slate-700 bg-sky-50/70 border border-sky-100 rounded-xl p-3">
                          <span className="font-semibold text-slate-900">Notes: </span>
                          {selectedLead.notes}
                        </div>
                      )}

                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-display text-sm font-bold text-slate-900">
                            Automated Email &amp; SMS Sequence
                          </h3>
                          <button
                            type="button"
                            disabled={busyId === selectedLead.id}
                            onClick={() => handleFollowUpAction(selectedLead.id, 'generate')}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 hover:underline cursor-pointer"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>
                              {selectedLead.followUps.length > 0
                                ? 'Regenerate Drafts'
                                : 'Generate AI Follow-Up'}
                            </span>
                          </button>
                        </div>

                        {selectedLead.followUps.length === 0 ? (
                          <p className="text-xs text-slate-500">
                            No automated follow-ups drafted yet. Generate an instant quote
                            confirmation &amp; 24-hour check-in above.
                          </p>
                        ) : (
                          <div className="space-y-2.5">
                            {selectedLead.followUps.map((fu) => (
                              <div
                                key={fu.id}
                                className="rounded-xl border border-slate-200 p-3.5 text-xs space-y-1.5"
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <span className="font-semibold text-slate-900 flex items-center gap-1.5">
                                    <Mail className="w-3.5 h-3.5 text-sky-600" />
                                    {fu.channel} · {fu.timing}
                                  </span>
                                  <span
                                    className={`font-semibold ${
                                      fu.status === 'Sent' ? 'text-emerald-700' : 'text-amber-700'
                                    }`}
                                  >
                                    {fu.status}
                                  </span>
                                </div>
                                <div className="font-medium text-slate-800">{fu.subject}</div>
                                <p className="text-slate-600 leading-relaxed">{fu.body}</p>
                                {fu.status !== 'Sent' && (
                                  <button
                                    type="button"
                                    disabled={busyId === selectedLead.id}
                                    onClick={() =>
                                      handleFollowUpAction(selectedLead.id, 'mark_sent', fu.id)
                                    }
                                    className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-sky-700 hover:underline cursor-pointer"
                                  >
                                    <span>Dispatch Now</span>
                                    <ArrowRight className="w-3 h-3" />
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {selectedLead.status !== 'Converted' && (
                        <button
                          type="button"
                          disabled={busyId === selectedLead.id}
                          onClick={() => handleConvertLead(selectedLead.id)}
                          className="w-full py-2.5 px-4 rounded-xl bg-sky-600 text-white text-xs font-semibold hover:bg-sky-500 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Convert Lead to Confirmed Booking</span>
                        </button>
                      )}
                    </>
                  ) : (
                    <p className="text-xs text-slate-500">Select a lead to inspect details.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ================= BOOKINGS SCHEDULE TAB ================= */}
          {section === 'bookings' && (
            <div className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="font-display text-base font-bold text-slate-900">
                    Upcoming Cleaning Appointments ({filteredBookings.length})
                  </h2>
                  <p className="text-xs text-slate-500">
                    Dispatch crews and update completion status in real time
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSection('calendar')}
                  className="text-xs font-semibold text-sky-700 hover:underline cursor-pointer"
                >
                  Open Calendar View →
                </button>
              </div>
              {filteredBookings.length === 0 ? (
                <div className="p-10 text-center text-sm text-slate-500">
                  No bookings match this search. Convert a lead or book via Instant Quote.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-semibold text-slate-500">
                        <th className="py-3 px-4">Booking</th>
                        <th className="py-3 px-4">Client &amp; Location</th>
                        <th className="py-3 px-4">Schedule &amp; Crew</th>
                        <th className="py-3 px-4 text-right">Total</th>
                        <th className="py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {filteredBookings.map((b) => (
                        <tr key={b.id} className="hover:bg-slate-50">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2.5">
                              <img
                                src={SERVICE_THUMBNAILS[b.serviceType] || SERVICE_THUMBNAILS.home}
                                alt={serviceTitle(b.serviceType)}
                                referrerPolicy="no-referrer"
                                className="h-9 w-12 rounded-md object-cover border border-slate-200 shrink-0"
                              />
                              <div>
                                <div className="font-mono text-slate-600">{b.id}</div>
                                <div className="text-[11px] text-slate-500">
                                  {serviceTitle(b.serviceType)}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-slate-900">{b.customerName}</div>
                            <div className="text-slate-500">{b.address}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-medium text-slate-800 tabular-nums">
                              {b.scheduledDate} · {b.timeWindow}
                            </div>
                            <div className="text-slate-500">{b.crewAssigned}</div>
                          </td>
                          <td className="py-3.5 px-4 text-right font-mono font-semibold text-slate-900 tabular-nums">
                            ${b.totalPrice}
                          </td>
                          <td className="py-3.5 px-4">
                            <select
                              aria-label={`Status for booking ${b.id}`}
                              value={b.status}
                              onChange={(e) =>
                                handleBookingStatusChange(b.id, e.target.value as BookingStatus)
                              }
                              className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-800 bg-white"
                            >
                              <option value="Scheduled">Scheduled</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ================= CALENDAR & LEAD GENERATION PLANNER TAB ================= */}
          {section === 'calendar' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                {/* Interactive Full Calendar */}
                <section className="lg:col-span-7 rounded-2xl border border-slate-200/90 bg-white p-5">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div>
                      <h2 className="font-display text-base font-bold text-slate-900">
                        {monthLabel} Schedule &amp; Peak Windows
                      </h2>
                      <p className="text-xs text-slate-500">
                        Green dots show booked cleans; highlighted blue dates mark peak conversion windows
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          if (calMonth === 0) {
                            setCalMonth(11);
                            setCalYear((y) => y - 1);
                          } else setCalMonth((m) => m - 1);
                        }}
                        className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (calMonth === 11) {
                            setCalMonth(0);
                            setCalYear((y) => y + 1);
                          } else setCalMonth((m) => m + 1);
                        }}
                        className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-slate-400 mb-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                      <div key={d}>{d}</div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-2 tabular-nums">
                    {calendarDays.map((cell, idx) => {
                      if (!cell.iso || !cell.day) {
                        return <div key={`cal-${idx}`} className="h-16" />;
                      }
                      const dayBookings = bookings.filter((b) => b.scheduledDate === cell.iso);
                      const dayCampaigns = campaigns.filter(
                        (c) => cell.iso! >= c.targetStartDate && cell.iso! <= c.targetEndDate,
                      );
                      const isPeak =
                        analytics?.peakLeadWindow &&
                        cell.iso >= analytics.peakLeadWindow.startDate &&
                        cell.iso <= analytics.peakLeadWindow.endDate;
                      const active = selectedCalDate === cell.iso;
                      return (
                        <button
                          key={cell.iso}
                          type="button"
                          onClick={() => setSelectedCalDate(cell.iso!)}
                          className={`h-16 rounded-xl border p-2 flex flex-col justify-between text-left transition-all cursor-pointer ${
                            active
                              ? 'border-sky-600 bg-sky-600 text-white'
                              : isPeak
                                ? 'border-sky-200 bg-sky-50/70 text-slate-900 hover:border-sky-400'
                                : 'border-slate-200/80 bg-white text-slate-800 hover:border-sky-300'
                          }`}
                        >
                          <span className="text-xs font-bold">{cell.day}</span>
                          <div className="flex items-center gap-1 flex-wrap">
                            {dayBookings.length > 0 && (
                              <span
                                className={`text-[10px] font-semibold px-1.5 rounded ${
                                  active
                                    ? 'bg-white/20 text-white'
                                    : 'bg-emerald-100 text-emerald-800'
                                }`}
                              >
                                {dayBookings.length} job
                              </span>
                            )}
                            {dayCampaigns.length > 0 && (
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  active ? 'bg-amber-300' : 'bg-sky-600'
                                }`}
                              />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </section>

                {/* Right Day Agenda & New Campaign Form */}
                <section className="lg:col-span-5 space-y-5">
                  <div className="rounded-2xl border border-slate-200/90 bg-white p-5">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div>
                        <span className="text-[11px] font-semibold text-sky-700">
                          Selected Day Agenda
                        </span>
                        <h3 className="font-display text-base font-bold text-slate-900 tabular-nums">
                          {selectedCalDate}
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowCampaignForm((v) => !v)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 text-white text-xs font-semibold hover:bg-sky-500 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>New Campaign</span>
                      </button>
                    </div>

                    {showCampaignForm && (
                      <form
                        onSubmit={handleCreateCampaign}
                        className="mb-4 p-3.5 rounded-xl bg-sky-50/70 border border-sky-200 space-y-3 text-xs"
                      >
                        <p className="font-bold text-slate-900">
                          Schedule Lead Generation Campaign
                        </p>
                        <input
                          type="text"
                          value={campTitle}
                          onChange={(e) => setCampTitle(e.target.value)}
                          placeholder="Campaign title (e.g. Pacific Heights Spring Deep Clean)"
                          required
                          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <select
                            value={campChannel}
                            onChange={(e) =>
                              setCampChannel(e.target.value as CampaignPlan['channel'])
                            }
                            className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs"
                          >
                            <option value="Google Local Ads">Google Local Ads</option>
                            <option value="Email Drip">Email Drip</option>
                            <option value="Referral Push">Referral Push</option>
                            <option value="Neighborhood Direct">Neighborhood Direct</option>
                          </select>
                          <input
                            type="number"
                            min={5}
                            max={150}
                            value={campLift}
                            onChange={(e) => setCampLift(Number(e.target.value))}
                            placeholder="Est Lift %"
                            className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs tabular-nums"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="date"
                            value={campStart}
                            onChange={(e) => setCampStart(e.target.value)}
                            className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs tabular-nums"
                          />
                          <input
                            type="date"
                            value={campEnd}
                            onChange={(e) => setCampEnd(e.target.value)}
                            className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs tabular-nums"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="number"
                            min={100}
                            step={50}
                            value={campBudget}
                            onChange={(e) => setCampBudget(Number(e.target.value))}
                            placeholder="Budget ($)"
                            className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs tabular-nums"
                          />
                          <button
                            type="submit"
                            disabled={campSubmitting}
                            className="rounded-lg bg-slate-900 text-white font-semibold py-2 px-3 hover:bg-slate-800 cursor-pointer"
                          >
                            {campSubmitting ? 'Saving...' : 'Launch Schedule'}
                          </button>
                        </div>
                      </form>
                    )}

                    <div className="space-y-2.5 text-xs">
                      {bookings.filter((b) => b.scheduledDate === selectedCalDate).length === 0 ? (
                        <p className="text-slate-500 py-2">
                          No cleaning crews dispatched on {selectedCalDate}. Peak slot window is open for campaign targeting.
                        </p>
                      ) : (
                        bookings
                          .filter((b) => b.scheduledDate === selectedCalDate)
                          .map((b) => (
                            <div
                              key={b.id}
                              className="rounded-xl border border-slate-200 p-3 flex items-center justify-between gap-2"
                            >
                              <div>
                                <p className="font-semibold text-slate-900">
                                  {b.customerName} · {serviceTitle(b.serviceType)}
                                </p>
                                <p className="text-slate-500 tabular-nums">
                                  {b.timeWindow} · {b.crewAssigned}
                                </p>
                              </div>
                              <span className="font-mono font-semibold text-sky-700 tabular-nums">
                                ${b.totalPrice}
                              </span>
                            </div>
                          ))
                      )}
                    </div>
                  </div>

                  {/* Planned & Active Lead Generation Campaigns */}
                  <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3">
                    <h3 className="font-display text-sm font-bold text-slate-900">
                      Scheduled Lead-Generation Campaigns ({campaigns.length})
                    </h3>
                    <div className="space-y-2.5">
                      {campaigns.map((camp) => (
                        <div
                          key={camp.id}
                          className="rounded-xl border border-slate-200 p-3.5 text-xs space-y-1.5"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-semibold text-slate-900">{camp.title}</p>
                              <p className="text-slate-500 tabular-nums">
                                {camp.channel} · {camp.targetStartDate} to {camp.targetEndDate}
                              </p>
                            </div>
                            <select
                              aria-label={`Campaign status for ${camp.title}`}
                              value={camp.status}
                              onChange={(e) =>
                                handleCampaignStatus(
                                  camp.id,
                                  e.target.value as CampaignPlan['status'],
                                )
                              }
                              className="rounded-lg border border-slate-200 px-2 py-1 text-[11px] font-semibold text-slate-800 bg-white"
                            >
                              <option value="Planned">Planned</option>
                              <option value="Active">Active</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </div>
                          <div className="flex items-center justify-between text-[11px] pt-1">
                            <span className="text-emerald-700 font-semibold tabular-nums">
                              +{camp.expectedLiftPct}% expected leads
                            </span>
                            <span className="font-mono text-slate-600 tabular-nums">
                              Budget ${camp.budget}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            </div>
          )}

          {/* ================= EMAIL AUTOMATIONS TAB ================= */}
          {section === 'automations' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              <section className="lg:col-span-6 space-y-3">
                <div className="rounded-2xl border border-slate-200/90 bg-white p-5">
                  <h2 className="font-display text-base font-bold text-slate-900 mb-1">
                    Automated Email &amp; SMS Rules
                  </h2>
                  <p className="text-xs text-slate-500 mb-4">
                    Toggle real-time triggers for quote confirmations, 24h follow-ups, and post-clean referral rewards
                  </p>

                  <div className="divide-y divide-slate-100">
                    {automationRules.map((rule) => (
                      <div key={rule.id} className="py-4 first:pt-0 last:pb-0 space-y-2">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-slate-900">{rule.name}</span>
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-sky-50 text-sky-700">
                                {rule.channel}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5">{rule.trigger}</p>
                          </div>

                          <button
                            type="button"
                            disabled={busyId === rule.id}
                            onClick={() => handleToggleAutomation(rule.id, !rule.enabled)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 ${
                              rule.enabled
                                ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {rule.enabled ? 'Active' : 'Paused'}
                          </button>
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-slate-500 tabular-nums">
                          <span>Template: &ldquo;{rule.subjectTemplate}&rdquo;</span>
                          <span className="font-mono font-semibold text-slate-700 shrink-0 ml-2">
                            {rule.sentCount} sent · {rule.openRatePct}% open
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="lg:col-span-6 rounded-2xl border border-slate-200/90 bg-white p-5">
                <h2 className="font-display text-base font-bold text-slate-900 mb-1">
                  Queued &amp; Dispatched Lead Messages
                </h2>
                <p className="text-xs text-slate-500 mb-4">
                  Click &ldquo;Dispatch Now&rdquo; on any pending confirmation or follow-up message
                </p>

                <div className="space-y-3 max-h-[540px] overflow-y-auto pr-1">
                  {leads.flatMap((lead) =>
                    lead.followUps.map((fu) => (
                      <div
                        key={`${lead.id}-${fu.id}`}
                        className="rounded-xl border border-slate-200 p-3.5 text-xs space-y-1.5"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-semibold text-slate-900">
                            {lead.name} · {fu.channel} ({fu.timing})
                          </span>
                          <span
                            className={`font-semibold ${
                              fu.status === 'Sent' ? 'text-emerald-700' : 'text-amber-700'
                            }`}
                          >
                            {fu.status}
                          </span>
                        </div>
                        <p className="font-medium text-slate-800">{fu.subject}</p>
                        <p className="text-slate-600 leading-relaxed">{fu.body}</p>
                        {fu.status !== 'Sent' && (
                          <button
                            type="button"
                            onClick={() => handleFollowUpAction(lead.id, 'mark_sent', fu.id)}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-sky-700 hover:underline cursor-pointer pt-1"
                          >
                            <span>Dispatch Now</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    )),
                  )}
                </div>
              </section>
            </div>
          )}

          {/* ================= ANALYTICS & 3D TELEMETRY TAB ================= */}
          {section === 'analytics' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                <div className="lg:col-span-8 rounded-2xl border border-slate-200/90 bg-white p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="font-display text-base font-bold text-slate-900">
                        Website Traffic &amp; Conversion Performance ({rangeDays} Days)
                      </h2>
                      <p className="text-xs text-slate-500">
                        Tracked directly from landing visits, quote configurator interactions, and completed bookings
                      </p>
                    </div>
                  </div>
                  <WebsiteTrafficChart series={filteredSeries} height={260} />
                </div>

                <div className="lg:col-span-4 rounded-2xl border border-slate-200/90 bg-white p-5">
                  <h2 className="font-display text-base font-bold text-slate-900 mb-1">
                    Attribution Breakdown
                  </h2>
                  <p className="text-xs text-slate-500 mb-4">
                    Website &amp; referral acquisition share
                  </p>
                  <LeadSourcesDonut
                    sources={analytics?.leadSources ?? []}
                    totalLeads={
                      (analytics?.leadSources ?? []).reduce((s, item) => s + item.leads, 0)
                    }
                  />
                </div>
              </div>

            </div>
          )}

          {/* ================= REFERRALS TAB ================= */}
          {section === 'referrals' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                <form
                  onSubmit={handleGenerateReferralPartner}
                  className="lg:col-span-5 rounded-2xl border border-slate-200/90 bg-white p-5 space-y-4"
                >
                  <div>
                    <h2 className="font-display text-base font-bold text-slate-900">
                      Issue Referral Link &amp; Partner Code
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Every friend gets $35 off their first clean and referrer earns $35 credit + 15% commission tier
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    <input
                      type="text"
                      value={refName}
                      onChange={(e) => setRefName(e.target.value)}
                      placeholder="Customer or partner full name"
                      required
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-900"
                    />
                    <input
                      type="email"
                      value={refEmail}
                      onChange={(e) => setRefEmail(e.target.value)}
                      placeholder="Customer email address"
                      required
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-900"
                    />
                    <button
                      type="submit"
                      disabled={refCreating}
                      className="w-full py-2.5 px-4 rounded-xl bg-sky-600 text-white text-xs font-semibold hover:bg-sky-500 cursor-pointer"
                    >
                      {refCreating ? 'Generating...' : 'Generate Referral Link'}
                    </button>
                  </div>

                  {refFeedback && (
                    <p className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2">
                      {refFeedback}
                    </p>
                  )}
                </form>

                <div className="lg:col-span-7 rounded-2xl border border-slate-200/90 bg-white overflow-hidden">
                  <div className="px-5 py-4 border-b border-slate-100">
                    <h2 className="font-display text-base font-bold text-slate-900">
                      Customer &amp; Referral Commission Ledger ({filteredCustomers.length})
                    </h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-semibold text-slate-500">
                          <th className="py-3 px-4">Partner / Client</th>
                          <th className="py-3 px-4">Referral Code</th>
                          <th className="py-3 px-4 text-right">Signups</th>
                          <th className="py-3 px-4 text-right">Credits Earned</th>
                          <th className="py-3 px-4 text-right">Share Link</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs">
                        {filteredCustomers.map((c) => (
                          <tr key={c.id} className="hover:bg-slate-50">
                            <td className="py-3.5 px-4">
                              <div className="font-semibold text-slate-900">{c.name}</div>
                              <div className="text-slate-500">{c.email}</div>
                            </td>
                            <td className="py-3.5 px-4 font-mono font-semibold text-sky-700">
                              {c.referralCode}
                            </td>
                            <td className="py-3.5 px-4 text-right font-mono tabular-nums">
                              {c.referralsCount}
                            </td>
                            <td className="py-3.5 px-4 text-right font-mono font-semibold text-emerald-700 tabular-nums">
                              ${c.referralCredits}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <button
                                type="button"
                                onClick={() =>
                                  handleCopyText(
                                    c.referralCode,
                                    `${window.location.origin}/?ref=${c.referralCode}#quote`,
                                  )
                                }
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 hover:border-sky-300 text-[11px] font-semibold text-slate-700 cursor-pointer"
                              >
                                {copiedCode === c.referralCode ? (
                                  <Check className="w-3 h-3 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                                <span>{copiedCode === c.referralCode ? 'Copied' : 'Copy'}</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= REVENUE & COMPLETED PROJECTS TAB ================= */}
          {section === 'revenue' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-slate-200/90 bg-white p-5">
                  <span className="text-xs text-slate-500 block">
                    Total Business Revenue ({rangeDays}d)
                  </span>
                  <span className="font-display text-2xl font-bold text-slate-900 tabular-nums mt-1 block">
                    ${rangedAnalytics.rev.toLocaleString()}
                  </span>
                </div>
                <div className="rounded-2xl border border-slate-200/90 bg-white p-5">
                  <span className="text-xs text-slate-500 block">Confirmed Live Bookings</span>
                  <span className="font-display text-2xl font-bold text-emerald-700 tabular-nums mt-1 block">
                    ${(snapshot?.metrics.confirmedRevenue ?? 0).toLocaleString()}
                  </span>
                </div>
                <div className="rounded-2xl border border-slate-200/90 bg-white p-5">
                  <span className="text-xs text-slate-500 block">Completed Projects</span>
                  <span className="font-display text-2xl font-bold text-sky-700 tabular-nums mt-1 block">
                    {analytics?.completedProjects ?? 238}
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-4">
                <h2 className="font-display text-base font-bold text-slate-900">
                  Revenue &amp; Pipeline by Cleaning Protocol
                </h2>
                <div className="space-y-3">
                  {serviceRevenueBreakdown.map((item) => {
                    const total = Math.max(1, item.bookedRevenue + item.pipelineValue);
                    const pct = Math.min(100, Math.round((total / 1500) * 100));
                    return (
                      <div key={item.id} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-slate-800">
                            {item.title}{' '}
                            <span className="text-slate-400 font-normal">
                              ({item.jobsCount} bookings)
                            </span>
                          </span>
                          <span className="font-mono font-semibold text-slate-900 tabular-nums">
                            Booked ${item.bookedRevenue.toLocaleString()} · Open $
                            {item.pipelineValue.toLocaleString()}
                          </span>
                        </div>
                        <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-sky-600"
                            style={{ width: `${Math.max(8, pct)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
