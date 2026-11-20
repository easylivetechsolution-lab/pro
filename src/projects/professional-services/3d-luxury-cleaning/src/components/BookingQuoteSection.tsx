import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Loader2,
  MapPin,
  MessageSquare,
  Minus,
  Phone,
  Plus,
  ShieldCheck,
  Tag,
} from 'lucide-react';
import {
  ADD_ON_CATALOG,
  FREQUENCY_DISCOUNTS,
  SERVICE_CATALOG,
  calculateQuote,
} from '../lib/pricing';
import type {
  AddOnId,
  BookingRecord,
  CleaningFrequency,
  QuoteInput,
  ReferralValidationResult,
  ServiceType,
} from '../types/cleaning';

interface BookingQuoteSectionProps {
  quoteConfig: QuoteInput;
  onUpdateQuote: (patch: Partial<QuoteInput>) => void;
  onOpenConcierge: (prefill?: string) => void;
  onOpenCrm: () => void;
  onDataMutated: () => void;
}

type BookingStep = 1 | 2 | 3;

interface RoomCounts {
  bedrooms: number;
  bathrooms: number;
  kitchens: number;
  livingRooms: number;
}

const SERVICE_OPTIONS: {
  id: ServiceType;
  label: string;
  subtitle: string;
  defaultFreq: CleaningFrequency;
}[] = [
  {
    id: 'home',
    label: 'Regular Clean',
    subtitle: 'Weekly, bi-weekly, or monthly care',
    defaultFreq: 'bi-weekly',
  },
  {
    id: 'deep',
    label: 'Once-Off Clean',
    subtitle: 'Intensive deep sanitization',
    defaultFreq: 'one-time',
  },
  {
    id: 'move-out',
    label: 'Vacate / Bond Clean',
    subtitle: 'Inspection-ready turnover',
    defaultFreq: 'one-time',
  },
  {
    id: 'office',
    label: 'Office & Commercial',
    subtitle: 'Workspaces & glass partitions',
    defaultFreq: 'weekly',
  },
];

const QUICK_ADDRESSES = [
  '2140 Pacific Ave, San Francisco, CA',
  '580 Howard St, SoMa, San Francisco, CA',
  '420 University Ave, Palo Alto, CA',
];

const TIME_WINDOWS = [
  { id: '08:00 AM - 10:00 AM', label: '08:00 AM – 10:00 AM', note: 'Early dispatch · 2 crews open' },
  { id: '10:30 AM - 12:30 PM', label: '10:30 AM – 12:30 PM', note: 'Mid-morning · 3 crews open' },
  { id: '01:30 PM - 03:30 PM', label: '01:30 PM – 03:30 PM', note: 'Afternoon · 2 crews open' },
  { id: '04:00 PM - 06:00 PM', label: '04:00 PM – 06:00 PM', note: 'Late day / commercial · Open' },
];

function buildUpcomingDays(count = 6) {
  const days: { iso: string; dayName: string; dateLabel: string }[] = [];
  const now = new Date();
  for (let i = 1; i <= count; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    const iso = d.toISOString().split('T')[0];
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    const dateLabel = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    days.push({ iso, dayName, dateLabel });
  }
  return days;
}

function formatCountLabel(count: number, singular: string, plural: string): string {
  return `${count} ${count === 1 ? singular : plural}`;
}

export const BookingQuoteSection: React.FC<BookingQuoteSectionProps> = ({
  quoteConfig,
  onUpdateQuote,
  onOpenConcierge,
  onOpenCrm,
  onDataMutated,
}) => {
  const upcomingDays = useMemo(() => buildUpcomingDays(6), []);

  const [step, setStep] = useState<BookingStep>(1);
  const [address, setAddress] = useState('2140 Pacific Ave, San Francisco, CA');
  const [rooms, setRooms] = useState<RoomCounts>({
    bedrooms: 2,
    bathrooms: 2,
    kitchens: 1,
    livingRooms: 1,
  });

  const [referralInput, setReferralInput] = useState(quoteConfig.referralCode || '');
  const [referralResult, setReferralResult] = useState<ReferralValidationResult | null>(null);
  const [referralChecking, setReferralChecking] = useState(false);

  useEffect(() => {
    const code = quoteConfig.referralCode?.trim().toUpperCase() || '';
    if (!code) return;
    setReferralInput(code);
    if (/^PURE-[A-Z0-9]{2,}35$/.test(code)) {
      setReferralResult({
        valid: true,
        code,
        discountAmount: 35,
        referrerName: 'AetherClean neighbor',
        message: '$35 demo referral credit applied.',
      });
    }
  }, [quoteConfig.referralCode]);

  const [selectedDate, setSelectedDate] = useState(upcomingDays[1]?.iso || upcomingDays[0]?.iso || '');
  const [selectedWindow, setSelectedWindow] = useState(TIME_WINDOWS[0].id);

  const [bookingMode, setBookingMode] = useState<'instant' | 'quote'>('instant');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<{
    booking?: BookingRecord;
    leadId?: string;
    finalPrice: number;
    mode: 'instant' | 'quote';
  } | null>(null);

  const referralValid = Boolean(referralResult?.valid);
  const quote = useMemo(
    () => calculateQuote(quoteConfig, referralValid),
    [quoteConfig, referralValid],
  );

  const activeServiceCatalog = useMemo(
    () => SERVICE_CATALOG.find((s) => s.id === quoteConfig.serviceType) ?? SERVICE_CATALOG[0],
    [quoteConfig.serviceType],
  );

  const handleRoomChange = (key: keyof RoomCounts, delta: number) => {
    setRooms((prev) => {
      const nextVal = Math.max(0, Math.min(10, prev[key] + delta));
      const next = { ...prev, [key]: nextVal };
      const totalRooms = Math.max(
        1,
        next.bedrooms + next.bathrooms + next.kitchens + next.livingRooms,
      );
      const estimatedSqft = Math.max(
        650,
        Math.min(
          8000,
          450 +
            next.bedrooms * 260 +
            next.bathrooms * 130 +
            next.kitchens * 220 +
            next.livingRooms * 280,
        ),
      );
      onUpdateQuote({ rooms: totalRooms, sqft: estimatedSqft });
      return next;
    });
  };

  const handleServiceSelect = (opt: (typeof SERVICE_OPTIONS)[number]) => {
    const keepRecurring =
      (opt.id === 'home' || opt.id === 'office') && quoteConfig.frequency !== 'one-time';
    onUpdateQuote({
      serviceType: opt.id,
      frequency: keepRecurring ? quoteConfig.frequency : opt.defaultFreq,
    });
  };

  const handleToggleAddOn = (id: AddOnId) => {
    const exists = quoteConfig.addOns.includes(id);
    const next = exists
      ? quoteConfig.addOns.filter((a) => a !== id)
      : [...quoteConfig.addOns, id];
    onUpdateQuote({ addOns: next });
  };

  const handleValidateReferral = async () => {
    const clean = referralInput.trim().toUpperCase();
    if (!clean) {
      setReferralResult(null);
      onUpdateQuote({ referralCode: '' });
      return;
    }
    setReferralChecking(true);
    const valid = /^PURE-[A-Z0-9]{2,}35$/.test(clean);
    setReferralResult({
      valid,
      code: clean,
      discountAmount: valid ? 35 : 0,
      referrerName: valid ? 'AetherClean neighbor' : undefined,
      message: valid ? '$35 demo referral credit applied.' : 'Use a valid AetherClean demo referral code.',
    });
    onUpdateQuote({ referralCode: valid ? clean : '' });
    setReferralChecking(false);
  };

  const handlePrimaryCta = () => {
    setSubmitError(null);
    if (confirmedBooking) return;
    if (step === 1) {
      if (!address.trim()) {
        setSubmitError('Please enter your job address before choosing an arrival time.');
        return;
      }
      setStep(2);
      return;
    }
    if (step === 2) {
      setStep(3);
      return;
    }
    void handleSubmitBooking();
  };

  const handleSubmitBooking = async () => {
    setSubmitError(null);
    if (!name.trim()) {
      setSubmitError('Please enter your full name.');
      return;
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!emailOk) {
      setSubmitError('Please enter a valid email address for confirmation.');
      return;
    }

    setSubmitting(true);
    try {
      const roomSummary = `${formatCountLabel(rooms.bedrooms, 'bedroom', 'bedrooms')}, ${formatCountLabel(rooms.bathrooms, 'bathroom', 'bathrooms')}, ${formatCountLabel(rooms.kitchens, 'kitchen', 'kitchens')}, ${formatCountLabel(rooms.livingRooms, 'living room', 'living rooms')}`;
      const combinedNotes = [roomSummary, notes.trim()].filter(Boolean).join(' · ');

      const leadRes = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          address: address.trim(),
          serviceType: quoteConfig.serviceType,
          sqft: quoteConfig.sqft,
          rooms: quoteConfig.rooms,
          frequency: quoteConfig.frequency,
          addOns: quoteConfig.addOns,
          preferredDate: selectedDate,
          preferredWindow: selectedWindow,
          notes: combinedNotes,
          referralCodeUsed: referralValid ? referralInput.trim().toUpperCase() : undefined,
          source: 'Quote Form',
        }),
      });

      const leadData = await leadRes.json();
      if (!leadRes.ok) {
        throw new Error(leadData.error || 'Could not submit booking request.');
      }

      const leadId = leadData.lead?.id as string | undefined;
      let bookingRecord: BookingRecord | undefined;

      if (bookingMode === 'instant' && leadId) {
        const bookRes = await fetch(`/api/leads/${leadId}/convert`, {
          method: 'POST',
        });
        if (bookRes.ok) {
          bookingRecord = (await bookRes.json()) as BookingRecord;
        }
      }

      setConfirmedBooking({
        booking: bookingRecord,
        leadId,
        finalPrice: quote.finalPrice,
        mode: bookingMode,
      });
      onDataMutated();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong while booking.');
    } finally {
      setSubmitting(false);
    }
  };

  const resetConfirmation = () => {
    setConfirmedBooking(null);
    setSubmitError(null);
    setStep(1);
  };

  const stepperItems: {
    key: keyof RoomCounts;
    singular: string;
    plural: string;
  }[] = [
    { key: 'bedrooms', singular: 'Bedroom', plural: 'Bedrooms' },
    { key: 'bathrooms', singular: 'Bathroom', plural: 'Bathrooms' },
    { key: 'kitchens', singular: 'Kitchen', plural: 'Kitchens' },
    { key: 'livingRooms', singular: 'Living room', plural: 'Living rooms' },
  ];

  const primaryCtaLabel =
    step === 1
      ? 'Select a time'
      : step === 2
        ? 'Continue to details'
        : bookingMode === 'instant'
          ? `Confirm booking · $${quote.finalPrice}`
          : `Lock quote · $${quote.finalPrice}`;

  return (
    <section
      id="quote"
      className="relative pt-10 pb-24 sm:pt-14 sm:pb-28 bg-transparent"
    >
      <div className="mx-auto w-[80%] max-w-[51.2rem] px-4 sm:px-6">
        <div className="relative z-10 mx-auto mb-7 max-w-2xl py-3 text-center">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-12 -inset-y-4 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.52)_0%,rgba(15,23,42,0.22)_54%,transparent_80%)]"
          />
          <div className="mb-2 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-white/75" aria-hidden="true" />
            <p className="text-xs font-semibold tracking-[0.18em] text-white drop-shadow-[0_2px_8px_rgba(2,6,23,0.9)]">
              INSTANT BOOKING &amp; LIVE QUOTE
            </p>
            <span className="h-px w-8 bg-white/75" aria-hidden="true" />
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white drop-shadow-[0_2px_14px_rgba(2,6,23,0.9)] sm:text-4xl">
            Book Your Clean
          </h2>
          <p className="mt-2 text-sm font-medium text-white drop-shadow-[0_2px_10px_rgba(2,6,23,0.9)]">
            Choose your service, select a time, and see your estimate update as you go.
          </p>
        </div>
        {/* Single Unified Two-Column Architectural Booking Sheet (~20% tighter footprint) */}
        <div className="rounded-2xl border border-sky-100/90 bg-white/95 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* LEFT WORKSPACE (lg:col-span-8) */}
          <div className="lg:col-span-8 p-5 sm:p-6 lg:p-7">
            {confirmedBooking ? (
              <div className="py-2">
                <div className="flex items-start gap-3.5 mb-6">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700">
                    <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-wide text-emerald-700">
                      {confirmedBooking.mode === 'instant'
                        ? 'Booking Confirmed & Dispatched'
                        : 'Instant Quote Saved'}
                    </p>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-0.5">
                      {confirmedBooking.mode === 'instant'
                        ? `We are scheduled for ${selectedDate}`
                        : `Quote locked for ${name}`}
                    </h2>
                    <p className="text-sm text-slate-600 mt-1">
                      Confirmation and arrival details are queued for{' '}
                      <span className="font-medium text-slate-900">{email}</span> and synced live
                      into the dispatch CRM.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 py-6 border-y border-sky-100 text-sm">
                  <div>
                    <p className="text-xs text-slate-500">Service &amp; Schedule</p>
                    <p className="font-semibold text-slate-900 mt-0.5">
                      {activeServiceCatalog.title} · {FREQUENCY_DISCOUNTS[quoteConfig.frequency].label}
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      {selectedDate} · {selectedWindow}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Property &amp; Assigned Crew</p>
                    <p className="font-semibold text-slate-900 mt-0.5">{address}</p>
                    <p className="text-xs text-slate-600 mt-1">
                      {confirmedBooking.booking?.crewAssigned ??
                        `${quote.crewSize} W-2 Specialists (~${quote.estimatedHours} hrs)`}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Reference ID</p>
                    <p className="font-mono text-sm font-semibold text-slate-900 mt-0.5 tabular-nums">
                      {confirmedBooking.booking?.id ?? confirmedBooking.leadId ?? 'AC-LIVE'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Confirmed Total</p>
                    <p className="font-display text-xl font-bold text-sky-700 mt-0.5 tabular-nums">
                      ${confirmedBooking.finalPrice}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={onOpenCrm}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>View in Live CRM</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={resetConfirmation}
                    className="px-4 py-2.5 text-sm font-medium text-slate-700 hover:text-sky-700 border border-slate-200 hover:border-sky-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    Book another clean
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Top Header & Minimal Typographic Step Nav */}
                <div className={`flex flex-wrap items-center gap-3 pb-3.5 mb-5 border-b border-sky-100 ${step === 1 ? 'justify-end' : 'justify-between'}`}>
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitError(null);
                        setStep((prev) => (prev === 3 ? 2 : 1));
                      }}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-sky-700 hover:text-sky-600 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>
                        {step === 2 ? 'Back to Service Selection' : 'Back to Time Selection'}
                      </span>
                    </button>
                  ) : null}

                  <div className="flex items-center gap-4 text-xs font-semibold">
                    {(
                      [
                        { id: 1, label: '01. Scope' },
                        { id: 2, label: '02. Time' },
                        { id: 3, label: '03. Book' },
                      ] as const
                    ).map((tab) => {
                      const active = step === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => {
                            setSubmitError(null);
                            setStep(tab.id);
                          }}
                          className={`pb-1 border-b-2 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                            active
                              ? 'border-sky-600 text-sky-700'
                              : 'border-transparent text-slate-400 hover:text-slate-700'
                          }`}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {step === 1 && (
                  <div className="space-y-5">
                    <div>
                      <h2
                        className="font-display text-xl sm:text-2xl font-bold tracking-tight text-slate-900 leading-tight"
                        style={{ textWrap: 'balance' }}
                      >
                        Tell us about your job
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1">
                        Configure your address, protocol, and room counts below to lock in a live
                        Bay Area estimate.
                      </p>
                    </div>

                    {/* Job Address */}
                    <div>
                      <label
                        htmlFor="booking-address"
                        className="block text-xs sm:text-sm font-semibold text-slate-900 mb-1.5"
                      >
                        Job Address
                      </label>
                      <div className="relative">
                        <MapPin
                          className="w-4 h-4 text-sky-600 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                          aria-hidden="true"
                        />
                        <input
                          id="booking-address"
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Enter your job address"
                          className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-shadow"
                        />
                      </div>
                      <div className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-500">
                        <span>Popular areas:</span>
                        {QUICK_ADDRESSES.map((sample, idx) => (
                          <React.Fragment key={sample}>
                            {idx > 0 && <span aria-hidden="true">·</span>}
                            <button
                              type="button"
                              onClick={() => setAddress(sample)}
                              className="text-sky-700 hover:text-sky-600 hover:underline cursor-pointer"
                            >
                              {sample.split(',')[1]?.trim() || sample}
                            </button>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    {/* Service Kind */}
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-slate-900 mb-2">
                        What kind of cleaning service would you like?
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                        {SERVICE_OPTIONS.map((opt) => {
                          const selected = quoteConfig.serviceType === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => handleServiceSelect(opt)}
                              aria-pressed={selected}
                              className={`text-left rounded-xl border p-2.5 sm:p-3 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                                selected
                                  ? 'border-sky-500 bg-sky-50/75'
                                  : 'border-slate-200 bg-white hover:border-sky-300'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-1.5 mb-0.5">
                                <span
                                  className={`text-xs sm:text-[13px] font-semibold leading-tight ${
                                    selected ? 'text-sky-800' : 'text-slate-900'
                                  }`}
                                >
                                  {opt.label}
                                </span>
                                {selected && (
                                  <Check className="w-3.5 h-3.5 text-sky-600 shrink-0" aria-hidden="true" />
                                )}
                              </div>
                              <p className="text-[11px] text-slate-500 leading-snug">{opt.subtitle}</p>
                            </button>
                          );
                        })}
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-1.5">
                        <span className="text-xs font-medium text-slate-500 mr-1">Frequency:</span>
                        {(Object.keys(FREQUENCY_DISCOUNTS) as CleaningFrequency[]).map((freq) => {
                          const active = quoteConfig.frequency === freq;
                          return (
                            <button
                              key={freq}
                              type="button"
                              onClick={() => onUpdateQuote({ frequency: freq })}
                              className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                                active
                                  ? 'bg-sky-600 border-sky-600 text-white'
                                  : 'bg-white border-slate-200 text-slate-700 hover:border-sky-300'
                              }`}
                            >
                              {FREQUENCY_DISCOUNTS[freq].label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Place Rooms Stepper Grid */}
                    <div>
                      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                        <p className="text-xs sm:text-sm font-semibold text-slate-900">
                          Tell us about your place
                        </p>
                        <span className="text-xs text-slate-500 tabular-nums">
                          {quoteConfig.sqft.toLocaleString()} sq ft · {quoteConfig.rooms} areas
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {stepperItems.map((item) => {
                          const val = rooms[item.key];
                          return (
                            <div
                              key={item.key}
                              className="flex items-stretch overflow-hidden rounded-xl border border-sky-200/90 bg-white hover:border-sky-300 transition-colors"
                            >
                              <button
                                type="button"
                                onClick={() => handleRoomChange(item.key, -1)}
                                disabled={val <= 0}
                                aria-label={`Decrease ${item.plural}`}
                                className="flex min-h-[40px] w-10 items-center justify-center border-r border-sky-100 text-sky-700 hover:bg-sky-50 active:bg-sky-100 disabled:opacity-35 disabled:pointer-events-none transition-colors cursor-pointer"
                              >
                                <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                              </button>

                              <div className="flex flex-1 items-center justify-center px-2.5 text-xs sm:text-sm font-medium text-sky-800 tabular-nums">
                                {formatCountLabel(val, item.singular, item.plural)}
                              </div>

                              <button
                                type="button"
                                onClick={() => handleRoomChange(item.key, 1)}
                                disabled={val >= 10}
                                aria-label={`Increase ${item.plural}`}
                                className="flex min-h-[40px] w-10 items-center justify-center border-l border-sky-100 text-sky-700 hover:bg-sky-50 active:bg-sky-100 disabled:opacity-35 disabled:pointer-events-none transition-colors cursor-pointer"
                              >
                                <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                              </button>
                            </div>
                          );
                        })}
                      </div>

                      {/* Unboxed clean Square Footage Range */}
                      <div className="mt-3 pt-1">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <label htmlFor="sqft-range" className="font-medium text-slate-600">
                            Fine-tune Property Size
                          </label>
                          <span className="font-semibold text-sky-700 tabular-nums">
                            {quoteConfig.sqft.toLocaleString()} sq ft
                          </span>
                        </div>
                        <input
                          id="sqft-range"
                          type="range"
                          min={500}
                          max={6000}
                          step={100}
                          value={quoteConfig.sqft}
                          onChange={(e) => onUpdateQuote({ sqft: Number(e.target.value) })}
                          className="w-full accent-sky-600 cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Hairline-separated Add-Ons & Referral */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-4 border-t border-sky-100">
                      <div className="md:col-span-8">
                        <p className="text-xs font-semibold text-slate-700 mb-2">
                          Optional Precision Add-Ons
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {ADD_ON_CATALOG.map((addon) => {
                            const active = quoteConfig.addOns.includes(addon.id);
                            return (
                              <button
                                key={addon.id}
                                type="button"
                                onClick={() => handleToggleAddOn(addon.id)}
                                aria-pressed={active}
                                className={`flex items-center justify-between gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] leading-tight transition-colors cursor-pointer ${
                                  active
                                    ? 'border-sky-500 bg-sky-50 text-sky-900 font-semibold'
                                    : 'border-slate-200 bg-white text-slate-700 hover:border-sky-200'
                                }`}
                              >
                                <span className="text-left">{addon.label}</span>
                                <span className="tabular-nums text-sky-700 shrink-0 font-medium">
                                  +${addon.price}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="md:col-span-4">
                        <label
                          htmlFor="referral-code-input"
                          className="block text-xs font-semibold text-slate-700 mb-2"
                        >
                          Referral Credit (-$35)
                        </label>
                        <div className="flex gap-1.5">
                          <div className="relative flex-1 min-w-0">
                            <Tag
                              className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                              aria-hidden="true"
                            />
                            <input
                              id="referral-code-input"
                              type="text"
                              value={referralInput}
                              onChange={(e) => setReferralInput(e.target.value.toUpperCase())}
                              placeholder="e.g. ELENA35"
                              className="w-full rounded-lg border border-slate-200 bg-white pl-8 pr-2 py-1.5 text-xs font-mono uppercase text-slate-900 placeholder:normal-case placeholder:font-sans placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={handleValidateReferral}
                            disabled={referralChecking}
                            className="px-3 py-1.5 text-xs font-semibold text-sky-700 bg-sky-50 border border-sky-200 hover:bg-sky-100 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
                          >
                            {referralChecking ? '...' : 'Apply'}
                          </button>
                        </div>
                        {referralResult && (
                          <p
                            className={`mt-1.5 text-xs ${
                              referralResult.valid ? 'text-emerald-700' : 'text-rose-700'
                            }`}
                          >
                            {referralResult.valid
                              ? `Applied: -$${referralResult.discountAmount} credit (${referralResult.referrerName})`
                              : referralResult.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-5">
                    <div>
                      <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-slate-900 leading-tight">
                        Choose your date &amp; arrival window
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1">
                        Live W-2 crew availability for{' '}
                        <span className="font-medium text-slate-900">{address}</span>.
                      </p>
                    </div>

                    <div>
                      <p className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-900 mb-2.5">
                        <Calendar className="w-4 h-4 text-sky-600" aria-hidden="true" />
                        <span>Preferred Service Date</span>
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                        {upcomingDays.map((day) => {
                          const active = selectedDate === day.iso;
                          return (
                            <button
                              key={day.iso}
                              type="button"
                              onClick={() => setSelectedDate(day.iso)}
                              aria-pressed={active}
                              className={`rounded-xl border px-2.5 py-2.5 text-center transition-all cursor-pointer ${
                                active
                                  ? 'border-sky-600 bg-sky-600 text-white'
                                  : 'border-slate-200 bg-white text-slate-800 hover:border-sky-300'
                              }`}
                            >
                              <p
                                className={`text-[10px] font-semibold uppercase ${
                                  active ? 'text-sky-100' : 'text-slate-500'
                                }`}
                              >
                                {day.dayName}
                              </p>
                              <p className="font-display text-xs sm:text-sm font-bold mt-0.5 tabular-nums">
                                {day.dateLabel}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <p className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-900 mb-2.5">
                        <Clock className="w-4 h-4 text-sky-600" aria-hidden="true" />
                        <span>Arrival Window</span>
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {TIME_WINDOWS.map((win) => {
                          const active = selectedWindow === win.id;
                          return (
                            <button
                              key={win.id}
                              type="button"
                              onClick={() => setSelectedWindow(win.id)}
                              aria-pressed={active}
                              className={`flex items-center justify-between gap-2.5 rounded-xl border p-3 text-left transition-all cursor-pointer ${
                                active
                                  ? 'border-sky-500 bg-sky-50/75'
                                  : 'border-slate-200 bg-white hover:border-sky-300'
                              }`}
                            >
                              <div>
                                <p
                                  className={`text-xs sm:text-sm font-semibold tabular-nums ${
                                    active ? 'text-sky-900' : 'text-slate-900'
                                  }`}
                                >
                                  {win.label}
                                </p>
                                <p className="text-[11px] text-slate-500 mt-0.5">{win.note}</p>
                              </div>
                              {active && (
                                <Check className="w-4 h-4 text-sky-600 shrink-0" aria-hidden="true" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-5">
                    <div>
                      <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-slate-900 leading-tight">
                        Your contact &amp; dispatch details
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1">
                        Booking for <span className="font-medium text-slate-900">{selectedDate}</span>{' '}
                        ({selectedWindow}) at <span className="font-medium text-slate-900">{address}</span>.
                      </p>
                    </div>

                    <div className="inline-flex gap-2 border-b border-slate-200 pb-3">
                      <button
                        type="button"
                        onClick={() => setBookingMode('instant')}
                        className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                          bookingMode === 'instant'
                            ? 'bg-sky-600 border-sky-600 text-white'
                            : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Confirm Instant Booking
                      </button>
                      <button
                        type="button"
                        onClick={() => setBookingMode('quote')}
                        className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                          bookingMode === 'quote'
                            ? 'bg-sky-600 border-sky-600 text-white'
                            : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Save Quote Only
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="booking-name"
                          className="block text-xs font-semibold text-slate-700 mb-1.5"
                        >
                          Full Name
                        </label>
                        <input
                          id="booking-name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Jordan Vance"
                          className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="booking-email"
                          className="block text-xs font-semibold text-slate-700 mb-1.5"
                        >
                          Email Address
                        </label>
                        <input
                          id="booking-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="jordan@example.com"
                          className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="booking-phone"
                          className="block text-xs font-semibold text-slate-700 mb-1.5"
                        >
                          Mobile Phone (SMS updates)
                        </label>
                        <input
                          id="booking-phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="(415) 555-0194"
                          className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="booking-notes"
                          className="block text-xs font-semibold text-slate-700 mb-1.5"
                        >
                          Access / Surface Notes (optional)
                        </label>
                        <input
                          id="booking-notes"
                          type="text"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Gate code, marble counters, pets..."
                          className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {submitError && (
                  <p role="alert" className="mt-5 text-xs font-medium text-rose-700">
                    {submitError}
                  </p>
                )}
              </>
            )}
          </div>

          {/* RIGHT SUMMARY & SUPPORT RAIL (Unified inside the same compact sheet) */}
          <aside className="lg:col-span-4 bg-sky-50/35 border-t lg:border-t-0 lg:border-l border-sky-100 p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold tracking-wide text-sky-700 mb-0.5">
                {activeServiceCatalog.title}
              </p>
              <h3 className="font-display text-lg font-bold text-slate-900 leading-snug">
                Cleaning Service
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                {activeServiceCatalog.tagline}. Backed by vetted W-2 specialists and botanical care.
              </p>

              {/* Live Quote Breakdown */}
              <div className="mt-4 pt-3.5 border-t border-sky-100 space-y-2 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span>
                    Base &amp; space ({quoteConfig.sqft.toLocaleString()} sq ft)
                  </span>
                  <span className="font-semibold text-slate-900 tabular-nums">
                    ${quote.basePrice + quote.sizeAdjustment + quote.roomsAdjustment}
                  </span>
                </div>

                {quote.addOnsTotal > 0 && (
                  <div className="flex items-center justify-between">
                    <span>Precision add-ons ({quoteConfig.addOns.length})</span>
                    <span className="font-semibold text-slate-900 tabular-nums">
                      +${quote.addOnsTotal}
                    </span>
                  </div>
                )}

                {quote.frequencyDiscount > 0 && (
                  <div className="flex items-center justify-between text-emerald-700 font-medium">
                    <span>{FREQUENCY_DISCOUNTS[quoteConfig.frequency].label}</span>
                    <span className="tabular-nums">-${quote.frequencyDiscount}</span>
                  </div>
                )}

                {quote.referralDiscount > 0 && (
                  <div className="flex items-center justify-between text-emerald-700 font-medium">
                    <span>Referral credit ({quote.appliedReferralCode})</span>
                    <span className="tabular-nums">-${quote.referralDiscount}</span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-sky-100/80 text-slate-500">
                  <span>Estimated dispatch</span>
                  <span className="tabular-nums">
                    {quote.crewSize} specialists · ~{quote.estimatedHours} hrs
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-sky-100 flex items-baseline justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Estimated Total
                </span>
                <span className="font-display text-2xl font-extrabold text-slate-900 tabular-nums">
                  ${quote.finalPrice}
                </span>
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  onClick={confirmedBooking ? resetConfirmation : handlePrimaryCta}
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 sm:py-3 px-4 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 active:scale-[0.99] rounded-xl shadow-xs transition-all cursor-pointer disabled:opacity-60 whitespace-nowrap"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
                  <span>{confirmedBooking ? 'Book another service' : primaryCtaLabel}</span>
                  {!submitting && !confirmedBooking && (
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  )}
                </button>

                <p className="mt-2.5 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-600 shrink-0" aria-hidden="true" />
                  <span>48-hour spotless guarantee · No contracts</span>
                </p>
              </div>
            </div>

            {/* Integrated Need Help Dispatch Support */}
            <div className="mt-5 pt-4 border-t border-sky-100">
              <h4 className="font-display text-sm font-bold text-slate-900">Need Help?</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Questions about square footage, stone surfaces, or after-hours scheduling?
              </p>

              <div className="mt-3 space-y-2">
                <a
                  href="tel:+14158904310"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-sky-700 hover:text-sky-600 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span className="tabular-nums">(415) 890-4310</span>
                </a>

                <button
                  type="button"
                  onClick={() =>
                    onOpenConcierge(
                      `Help me finalize a ${activeServiceCatalog.title} quote for ${address || 'my Bay Area space'} (${formatCountLabel(rooms.bedrooms, 'bedroom', 'bedrooms')}, ${formatCountLabel(rooms.bathrooms, 'bathroom', 'bathrooms')}, ~${quoteConfig.sqft} sq ft).`,
                    )
                  }
                  className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-800 bg-white hover:bg-sky-50 hover:text-sky-800 border border-sky-200/80 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-sky-600" aria-hidden="true" />
                  <span>Ask AI Concierge with this Scope</span>
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
