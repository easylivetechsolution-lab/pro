import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  Check,
  ClipboardCheck,
  Clock3,
  Gift,
  GlassWater,
  Leaf,
  ShieldCheck,
  Users,
  Wind,
  type LucideIcon,
} from 'lucide-react';
import { calculateQuote, FREQUENCY_DISCOUNTS } from '../lib/pricing';
import type { CleaningFrequency, QuoteInput, ServiceType } from '../types/cleaning';
import type { SolutionPreset } from './ComprehensiveSolutionsSection';
import teamAtWorkImage from '../assets/images/how_it_works_clean_1794945445424.jpg';

const SectionHeading = ({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) => (
  <div className="relative z-10 mx-auto mb-7 max-w-3xl py-3 text-center">
    <div aria-hidden="true" className="pointer-events-none absolute -inset-x-12 -inset-y-4 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.54)_0%,rgba(15,23,42,0.22)_54%,transparent_80%)]" />
    <div className="mb-2 flex items-center justify-center gap-3">
      <span className="h-px w-8 bg-white/75" aria-hidden="true" />
      <p className="text-xs font-semibold tracking-[0.18em] text-white drop-shadow-[0_2px_8px_rgba(2,6,23,0.9)]">{eyebrow}</p>
      <span className="h-px w-8 bg-white/75" aria-hidden="true" />
    </div>
    <h2 className="font-display text-3xl font-bold tracking-tight text-white drop-shadow-[0_2px_14px_rgba(2,6,23,0.9)] sm:text-4xl">{title}</h2>
    <p className="mt-2 text-sm font-medium text-white drop-shadow-[0_2px_10px_rgba(2,6,23,0.9)]">{subtitle}</p>
  </div>
);

export const ReferralProgramSection: React.FC<{ onApplyCode: (code: string) => void }> = ({ onApplyCode }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [applyCode, setApplyCode] = useState('PURE-ELENA35');
  const [notice, setNotice] = useState('');

  const createCode = (event: React.FormEvent) => {
    event.preventDefault();
    const nameToken = name.replace(/[^a-z0-9]/gi, '').slice(0, 8).toUpperCase();
    if (!nameToken || !email.includes('@')) {
      setNotice('Add your name and a valid email to create a referral code.');
      return;
    }
    const nextCode = `PURE-${nameToken}35`;
    setCode(nextCode);
    setApplyCode(nextCode);
    setNotice('Your demo referral code is ready to use.');
  };

  return (
    <section id="referrals" className="relative scroll-mt-24 py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="A LITTLE THANK-YOU" title="Good work is better shared." subtitle="Give a neighbor $35 toward their first clean. We’ll add $35 to your next visit, too." />
        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-8 lg:overflow-visible lg:pb-0">
          <div className="min-w-[80vw] max-w-[400px] snap-center rounded-[2rem] border border-sky-200/70 bg-[#0B1730]/95 p-5 text-white shadow-[0_24px_70px_rgba(2,6,23,0.3)] backdrop-blur-xl sm:min-w-[68vw] sm:p-7 lg:min-w-0 lg:w-[92%] lg:max-w-none lg:justify-self-center lg:snap-none lg:p-8">
            <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white"><Gift className="h-4 w-4" /> Give $35, get $35</p>
            <h3 className="mt-4 max-w-xl font-display text-2xl font-bold leading-tight sm:text-3xl">Share AetherClean with a neighbor or office manager.</h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-300">Friends save $35 on their first residential or commercial booking. Your credit has no referral limit and can be applied to a future visit.</p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <input aria-label="Referral code to apply" value={applyCode} onChange={(event) => setApplyCode(event.target.value.toUpperCase())} className="min-w-0 flex-1 rounded-xl border border-slate-600 bg-slate-950/50 px-4 py-3 text-sm font-semibold tracking-wide text-white outline-none placeholder:text-slate-500 focus:border-sky-400" />
              <button type="button" onClick={() => { onApplyCode(applyCode); }} className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300">
                Apply $35 to Quote <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            {notice && <p role="status" className="mt-3 text-xs text-sky-200">{notice}</p>}
            <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40">
              <img
                src="/assets/aistudio/proclean-card.jpg"
                alt="AetherClean specialist deep-cleaning a surface with professional equipment"
                width="1440"
                height="826"
                loading="lazy"
                decoding="async"
                className="h-32 w-full object-cover object-center sm:h-40"
              />
            </div>
          </div>

          <form onSubmit={createCode} className="min-w-[84vw] max-w-[440px] snap-center rounded-2xl border border-slate-700 bg-slate-900/95 p-5 text-white shadow-[0_24px_70px_rgba(2,6,23,0.3)] backdrop-blur-xl sm:min-w-[72vw] sm:p-6 lg:min-w-0 lg:max-w-none lg:snap-none">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/15 text-sky-300"><Users className="h-5 w-5" /></span>
              <div><h4 className="text-sm font-bold text-white">Create your personal referral code</h4><p className="mt-0.5 text-xs text-slate-400">A simple way to share your $35 credit.</p></div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <input aria-label="Your full name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Your full name" className="min-w-0 rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-sky-400" />
              <input aria-label="Your email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@company.com" className="min-w-0 rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-sky-400" />
            </div>
            <button type="submit" className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-900 transition hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300">
              {code ? `Your code: ${code}` : 'Create My $35 Referral Link'} <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const PLAN_DETAILS: Array<{
  id: ServiceType;
  name: string;
  eyebrow: string;
  description: string;
  sqft: number;
  rooms: number;
  addOns: QuoteInput['addOns'];
  features: string[];
}> = [
  { id: 'home', name: 'Essential Home', eyebrow: 'RECURRING SANCTUARY', description: 'Thoughtful upkeep for apartments, lofts, and busy family homes.', sqft: 1300, rooms: 5, addOns: [], features: ['Botanical, low-residue surface care', 'HEPA-14 allergen and fine-dust extraction', 'Color-zoned kitchen, bath, and bedroom cloths', 'A consistent, vetted W-2 crew'] },
  { id: 'deep', name: 'Executive Deep Clean', eyebrow: 'MOST POPULAR RESET', description: 'A detailed top-to-bottom reset for kitchens, grout, trim, and glass.', sqft: 2200, rooms: 6, addOns: ['steam-sanitize'], features: ['212°F dry-vapor tile and grout treatment', 'Hand-wiped baseboards, vents, and cabinet fronts', 'HEPA-14 air and upholstery dust capture', '48-hour spotless re-clean guarantee'] },
  { id: 'office', name: 'Commercial Suite', eyebrow: 'OFFICES & STUDIOS', description: 'After-hours care for offices, glass partitions, and shared spaces.', sqft: 3200, rooms: 6, addOns: ['interior-windows'], features: ['Streak-free glass and partition detailing', 'pH-neutral desk and monitor-safe care', 'Flexible evening and weekend arrival windows', '$5M commercial liability coverage'] },
];

const PRICING_FREQUENCIES: CleaningFrequency[] = ['one-time', 'monthly', 'bi-weekly', 'weekly'];

export const TransparentPricingSection: React.FC<{ onSelectPlan: (preset: SolutionPreset) => void }> = ({ onSelectPlan }) => {
  const [frequency, setFrequency] = useState<CleaningFrequency>('bi-weekly');
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
      if (!entry.isIntersecting) {
        setUserPaused(false);
        setIsHovered(false);
        setHasFocus(false);
      }
    }, { threshold: 0.25 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (!isInView || isHovered || hasFocus || userPaused || prefersReducedMotion) return;
    const intervalId = window.setInterval(() => {
      setFrequency((current) => {
        const currentIndex = PRICING_FREQUENCIES.indexOf(current);
        return PRICING_FREQUENCIES[(currentIndex + 1) % PRICING_FREQUENCIES.length];
      });
    }, 1500);
    return () => window.clearInterval(intervalId);
  }, [isInView, isHovered, hasFocus, userPaused, prefersReducedMotion]);

  const quotes = useMemo(() => PLAN_DETAILS.map((plan) => calculateQuote({
    serviceType: plan.id,
    sqft: plan.sqft,
    rooms: plan.rooms,
    frequency,
    addOns: plan.addOns,
  })), [frequency]);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      onFocusCapture={() => setHasFocus(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHasFocus(false);
      }}
      className="relative scroll-mt-24 py-10 sm:py-14"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="CLEAR, UPFRONT PRICING" title="A predictable clean, with no surprises." subtitle="Choose a starting plan. Your live quote adjusts to your space, schedule, and add-ons." />
        <div className="mb-10 flex justify-center">
          <div role="group" aria-label="Cleaning frequency" className="inline-flex max-w-full flex-wrap justify-center gap-1 rounded-2xl border border-white/70 bg-white/90 p-1.5 shadow-lg backdrop-blur-xl">
            {PRICING_FREQUENCIES.map((option) => (
              <button key={option} type="button" aria-pressed={frequency === option} onClick={() => { setUserPaused(true); setFrequency(option); }} className={`rounded-xl px-3 py-2 text-xs font-bold capitalize transition sm:px-4 ${frequency === option ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-600 hover:bg-sky-50 hover:text-sky-800'}`}>
                {option === 'bi-weekly' ? 'Bi-Weekly' : option === 'one-time' ? 'One-Time' : option}
                {FREQUENCY_DISCOUNTS[option].rate > 0 && <span className="ml-1.5 text-[10px] opacity-75">Save {Math.round(FREQUENCY_DISCOUNTS[option].rate * 100)}%</span>}
              </button>
            ))}
          </div>
        </div>
        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pt-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:pt-0 lg:pb-0">
          {PLAN_DETAILS.map((plan, index) => {
            const quote = quotes[index];
            const preset: SolutionPreset = { serviceType: plan.id, sqft: plan.sqft, rooms: plan.rooms, addOns: plan.addOns, frequency };
            return (
              <article key={plan.id} className={`relative flex w-[84vw] max-w-[390px] shrink-0 snap-center flex-col rounded-3xl border bg-white/95 p-5 shadow-[0_18px_48px_rgba(15,23,42,0.13)] backdrop-blur-xl sm:w-[72vw] sm:p-6 lg:w-auto lg:max-w-none lg:snap-none ${index === 1 ? 'border-sky-400 ring-1 ring-sky-300 lg:-translate-y-1' : 'border-white/80'}`}>
                {index === 1 && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-sky-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow">Most popular</span>}
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[10px] font-bold tracking-[0.16em] text-sky-700">{plan.eyebrow}</p>
                  <span className="text-[11px] font-medium text-slate-400">{plan.sqft.toLocaleString()} sq ft</span>
                </div>
                <h3 className="mt-3 font-display text-xl font-bold text-slate-900">{plan.name}</h3>
                <p className="mt-2 min-h-10 text-xs leading-relaxed text-slate-600">{plan.description}</p>
                <div className="mt-5 flex items-end gap-2 border-y border-slate-100 py-4">
                  <span className="font-display text-4xl font-bold tracking-tight text-slate-900">${quote.finalPrice}</span>
                  <span className="pb-1 text-xs text-slate-500">/ visit · {FREQUENCY_DISCOUNTS[frequency].label}</span>
                </div>
                <div className="mt-4 flex items-center gap-4 text-[11px] font-medium text-slate-500">
                  <span className="inline-flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-sky-600" />{quote.crewSize} W-2 specialists</span>
                  <span className="inline-flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5 text-sky-600" />~{quote.estimatedHours} hrs</span>
                </div>
                <ul className="mt-5 flex-1 space-y-3">
                  {plan.features.map((feature) => <li key={feature} className="flex gap-2.5 text-xs leading-relaxed text-slate-600"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-600" />{feature}</li>)}
                </ul>
                <button type="button" onClick={() => onSelectPlan(preset)} className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${index === 1 ? 'bg-sky-600 text-white hover:bg-sky-500' : 'border border-sky-200 bg-sky-50 text-sky-800 hover:bg-sky-100'}`}>
                  Configure {plan.name} <ArrowRight className="h-4 w-4" />
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

type WhoWeAreValueId = 'people' | 'method' | 'care';

const WHO_WE_ARE_VALUES: Array<{
  id: WhoWeAreValueId;
  label: string;
  icon: LucideIcon;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
}> = [
  {
    id: 'people',
    label: 'Our people',
    icon: Users,
    title: 'People first, every time.',
    description: 'Our vetted W-2 specialists bring care, consistency, and respect into the homes and workplaces we serve.',
    metric: 'W-2',
    metricLabel: 'trained, directly employed specialists',
  },
  {
    id: 'method',
    label: 'Our method',
    icon: ClipboardCheck,
    title: 'A method for the small things.',
    description: 'A room-by-room quality checklist keeps the finish consistent, from the first visit through every recurring clean.',
    metric: '54-point',
    metricLabel: 'documented room-by-room checklist',
  },
  {
    id: 'care',
    label: 'Our care',
    icon: Leaf,
    title: 'A powerful clean, thoughtfully done.',
    description: 'HEPA-14 equipment and botanical, low-residue products support a considered approach to the spaces people use every day.',
    metric: 'HEPA-14',
    metricLabel: 'fine-particle capture standard',
  },
];

export const WhoWeAreSection: React.FC = () => {
  const [activeValueId, setActiveValueId] = useState<WhoWeAreValueId>('people');
  const activeValue = WHO_WE_ARE_VALUES.find((value) => value.id === activeValueId) ?? WHO_WE_ARE_VALUES[0];
  const ActiveIcon = activeValue.icon;

  return (
    <section id="who-we-are" className="relative scroll-mt-24 py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="WHO WE ARE" title="Thoughtful people. A higher standard of care." subtitle="We bring precision, respect, and consistency to the places where life and work happen." />
        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0 lg:grid lg:grid-cols-2 lg:items-stretch lg:gap-6 lg:overflow-visible lg:pb-0">
          <figure className="relative aspect-[4/5] w-[84vw] max-w-[480px] shrink-0 snap-center overflow-hidden rounded-[2rem] border border-white/75 bg-slate-200 shadow-[0_24px_65px_rgba(15,23,42,0.2)] sm:aspect-[5/4] sm:w-[72vw] lg:aspect-auto lg:min-h-[520px] lg:w-auto lg:max-w-none lg:snap-none">
            <img src={teamAtWorkImage} alt="AetherClean specialist carefully wiping a bright marble kitchen island" className="absolute inset-0 h-full w-full object-cover object-[62%_center]" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-slate-950/10" aria-hidden="true" />
            <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/35 bg-slate-950/45 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-white backdrop-blur-md sm:left-6 sm:top-6">
              <ShieldCheck className="h-6 w-6 text-sky-300" /> Bay Area care, by design
            </div>
            <figcaption className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 sm:inset-x-7 sm:bottom-7">
              <div className="max-w-xs text-white">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-sky-200">The people behind the polish</p>
                <p className="mt-2 font-display text-xl font-bold leading-tight sm:text-2xl">Considerate in every room.</p>
              </div>
              <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/50 bg-white/15 text-white backdrop-blur-md sm:flex">
                <ActiveIcon className="h-6 w-6" aria-hidden="true" />
              </div>
            </figcaption>
          </figure>

          <div className="w-[84vw] max-w-[480px] shrink-0 snap-center rounded-[2rem] border border-white/80 bg-white/95 p-5 shadow-[0_24px_65px_rgba(15,23,42,0.14)] backdrop-blur-xl sm:w-[72vw] sm:p-7 lg:w-auto lg:max-w-none lg:snap-none lg:p-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-sky-700">Care you can count on</p>
            <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">Good cleaning is personal.</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">AetherClean pairs a carefully trained local team with a repeatable process, so your space receives the same thoughtful attention on every visit.</p>

            <div role="tablist" aria-label="What defines AetherClean" className="mt-6 grid grid-cols-3 gap-2 rounded-2xl border border-sky-100 bg-sky-50/70 p-1.5">
              {WHO_WE_ARE_VALUES.map((value) => {
                const Icon = value.icon;
                const selected = activeValue.id === value.id;
                return <button key={value.id} type="button" role="tab" id={`who-tab-${value.id}`} aria-selected={selected} aria-controls="who-value-panel" onClick={() => setActiveValueId(value.id)} className={`flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-[10px] font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 sm:flex-row sm:text-xs ${selected ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-600 hover:bg-white hover:text-sky-800'}`}>
                  <Icon className="h-4 w-4" aria-hidden="true" />{value.label}
                </button>;
              })}
            </div>

            <div id="who-value-panel" role="tabpanel" aria-labelledby={`who-tab-${activeValue.id}`} aria-live="polite" className="mt-4 rounded-2xl border border-sky-100 bg-gradient-to-br from-white to-sky-50/80 p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-600 text-white shadow-sm"><ActiveIcon className="h-5 w-5" aria-hidden="true" /></span>
                <div className="min-w-0">
                  <h4 className="font-display text-base font-bold text-slate-900">{activeValue.title}</h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600 sm:text-sm">{activeValue.description}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3 border-t border-sky-100 pt-4">
                <span className="font-display text-2xl font-extrabold tracking-tight text-sky-700">{activeValue.metric}</span>
                <span className="text-[11px] font-medium leading-snug text-slate-500">{activeValue.metricLabel}</span>
              </div>
            </div>

            <div className="mt-5 flex items-start gap-2 border-t border-slate-100 pt-4 text-xs leading-relaxed text-slate-500">
              <Wind className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
              Local service shaped around your schedule, surfaces, and standards.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQS = [
  { question: 'Are AetherClean specialists employees or independent contractors?', answer: 'Every specialist is a background-checked, insured W-2 employee. Teams are trained in stone care, glass detailing, HEPA-14 extraction, and our room-by-room quality checklist.' },
  { question: 'Do I need to provide cleaning supplies or equipment?', answer: 'No. Our crew arrives with HEPA-filtered equipment, color-zoned microfiber, and low-residue botanical products selected for the surfaces in your space.' },
  { question: 'How does the 48-hour spotless re-clean guarantee work?', answer: 'If a covered area needs another pass, let us know within 48 hours and we will arrange a return visit to make it right.' },
  { question: 'Can you service commercial offices after hours?', answer: 'Yes. We offer evening and weekend arrival windows for offices, studios, and medical suites. Commercial service includes proof of insurance on request.' },
  { question: 'What is the rescheduling or pause policy for recurring plans?', answer: 'You can adjust or pause a recurring schedule before your next visit. Your concierge can help find another arrival window when plans change.' },
  { question: 'Do I need to be home during the appointment?', answer: 'No. Share your preferred access instructions when you book. The crew confirms arrival and sends a completion update after the quality check.' },
];

export const ServiceFAQSection: React.FC<{ onAskConcierge: () => void }> = ({ onAskConcierge }) => (
  <section id="faq" className="relative scroll-mt-24 py-10 sm:py-14">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="GOOD TO KNOW" title="Clear answers before we arrive." subtitle="A thoughtful service should feel straightforward before, during, and after the clean." />
      <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:grid lg:grid-cols-[0.78fr_1.42fr] lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0">
        <aside className="w-[84vw] max-w-[390px] shrink-0 snap-center rounded-3xl border border-white/80 bg-white/95 p-6 shadow-xl backdrop-blur-xl sm:w-[72vw] sm:p-7 lg:w-auto lg:max-w-none lg:snap-none">
          <p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-sky-700"><BadgeCheck className="h-6 w-6" /> Bay Area coverage</p>
          <h3 className="mt-3 font-display text-2xl font-bold text-slate-900">Local teams. Consistent standards.</h3>
          <div className="mt-5 grid grid-cols-2 gap-y-2 text-sm text-slate-600">
            {['San Francisco', 'Palo Alto', 'Menlo Park', 'Burlingame', 'Marin County', 'Berkeley', 'Oakland Hills', 'Mountain View'].map((place) => <span key={place}>{place}</span>)}
          </div>
          <div className="mt-6 space-y-4 border-t border-slate-200 pt-5 text-xs font-medium leading-relaxed text-slate-600">
            <p className="flex items-start gap-3"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" /> <span>$5M insured · bonded W-2 teams</span></p>
            <p className="flex items-start gap-3"><ClipboardCheck className="mt-0.5 h-5 w-5 shrink-0 text-sky-600" /> <span>48-hour re-clean guarantee</span></p>
          </div>
          <button type="button" onClick={onAskConcierge} className="mt-6 inline-flex items-center gap-2 rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm font-bold text-sky-800 transition hover:bg-sky-100">Ask a custom question <ArrowRight className="h-4 w-4" /></button>
        </aside>
        <div className="h-[min(460px,68vh)] w-[84vw] max-w-[480px] shrink-0 snap-center overflow-y-auto overscroll-y-contain overscroll-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden rounded-3xl border border-white/80 bg-white/95 px-5 shadow-xl backdrop-blur-xl sm:w-[72vw] sm:px-7 lg:h-auto lg:w-auto lg:max-w-none lg:snap-none lg:overflow-visible lg:rounded-3xl">
          <p className="sticky top-0 z-10 -mx-5 border-b border-sky-100 bg-white/95 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-sky-700 backdrop-blur-xl sm:-mx-7 sm:px-7 lg:hidden">
            Service questions · Scroll for more
          </p>
          {FAQS.map((item, index) => <details key={item.question} open={index === 0} className="group border-b border-sky-100 py-4 last:border-b-0 sm:py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-slate-900 marker:hidden [&::-webkit-details-marker]:hidden">
              {item.question}<span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-700 transition group-open:rotate-45"><span className="text-lg font-normal leading-none">+</span></span>
            </summary>
            <p className="max-w-3xl pt-3 pr-10 text-sm leading-relaxed text-slate-600">{item.answer}</p>
          </details>)}
        </div>
      </div>
    </div>
  </section>
);

const SERVICE_STANDARDS = [
  { icon: Wind, eyebrow: '99.995% PARTICULATE CAPTURE', label: 'HEPA-14 Botanical Air Unit' },
  { icon: GlassWater, eyebrow: 'STREAK-FREE OPTICAL FINISH', label: 'Acoustic Glass Partitions' },
  { icon: ShieldCheck, eyebrow: 'pH-NEUTRAL SURFACE CARE', label: 'White Oak Workstations' },
  { icon: ClipboardCheck, eyebrow: '212°F DRY-VAPOR EXTRACTION', label: 'Honed Limestone & Grout' },
];

export const ServiceStandardsSection: React.FC = () => (
  <section id="standards" className="relative scroll-mt-24 pb-10 pt-8 sm:pb-14 sm:pt-10">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="THE AETHERCLEAN STANDARD" title="Precision you can feel in every finish." subtitle="Purpose-built equipment and surface-specific care, selected for the spaces we clean." />
      <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0 xl:grid xl:grid-cols-4 xl:gap-3 xl:overflow-visible xl:pb-0">
        {SERVICE_STANDARDS.map(({ icon: Icon, eyebrow, label }) => <div key={label} className="w-[78vw] max-w-[330px] shrink-0 snap-center rounded-2xl border border-sky-200/90 bg-white/95 p-4 shadow-[0_12px_32px_rgba(15,23,42,0.12)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-sky-400 xl:w-auto xl:max-w-none xl:snap-none">
          <div className="flex items-center gap-3">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-700"><Icon className="h-7 w-7" /></span>
            <div><p className="text-[9px] font-bold tracking-[0.12em] text-sky-700">{eyebrow}</p><p className="mt-1 text-xs font-bold text-slate-900">{label}</p></div>
          </div>
        </div>)}
      </div>
    </div>
  </section>
);
