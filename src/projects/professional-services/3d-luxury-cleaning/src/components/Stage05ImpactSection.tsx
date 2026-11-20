import React, { useEffect, useRef, useState } from 'react';
import {
  Award,
  Building2,
  CheckCircle2,
  FileCheck2,
  Home,
  MapPin,
  ShieldCheck,
  Star,
  Users,
  Wind,
  type LucideIcon,
} from 'lucide-react';

interface MilestoneItem {
  id: string;
  label: string;
  value: number;
  unit: string;
  offsetClass: string;
  icon: LucideIcon;
}

const ARC_MILESTONES: MilestoneItem[] = [
  {
    id: 'districts',
    label: 'Districts Covered',
    value: 159,
    unit: 'zones',
    offsetClass: 'translate-x-7 sm:translate-x-8',
    icon: MapPin,
  },
  {
    id: 'suites',
    label: 'Active Suites',
    value: 638,
    unit: 'sites',
    offsetClass: 'translate-x-3',
    icon: Home,
  },
  {
    id: 'kits',
    label: 'Eco-HEPA Units',
    value: 3680,
    unit: 'kits',
    offsetClass: 'translate-x-1',
    icon: Wind,
  },
  {
    id: 'sqft',
    label: 'Sq Ft Restored',
    value: 35000,
    unit: 'k+',
    offsetClass: 'translate-x-0',
    icon: ShieldCheck,
  },
  {
    id: 'reviews',
    label: 'Verified Reviews',
    value: 25000,
    unit: '+',
    offsetClass: 'translate-x-1',
    icon: Star,
  },
  {
    id: 'clients',
    label: 'Partner Clients',
    value: 368,
    unit: 'orgs',
    offsetClass: 'translate-x-4',
    icon: Users,
  },
  {
    id: 'contracts',
    label: 'Enterprise Plans',
    value: 43,
    unit: 'active',
    offsetClass: 'translate-x-8 sm:translate-x-9',
    icon: FileCheck2,
  },
];

interface CapacityMetric {
  pct: number;
  title: string;
  figure: number;
  unit: string;
  sub: string;
  description: string;
}

const CAPACITY_METRICS: CapacityMetric[] = [
  {
    pct: 98,
    title: 'Quality SLA',
    figure: 680,
    unit: 'daily slots',
    sub: '9,109 passed audits',
    description:
      'Every service closes with a 48-point photographic inspection before sign-off.',
  },
  {
    pct: 96,
    title: 'Eco-Green Certified',
    figure: 5600,
    unit: 'homes',
    sub: '9,956 botanical cleans',
    description:
      'Plant-derived formulas and hospital-grade HEPA filtration with zero harsh VOCs.',
  },
  {
    pct: 98,
    title: 'Vetted W-2 Crews',
    figure: 8000,
    unit: 'hours',
    sub: '$5M insured & bonded',
    description:
      'Background-checked, salaried specialists trained in-house—never contractors.',
  },
  {
    pct: 96,
    title: 'On-Time Arrival',
    figure: 36000,
    unit: 'visits',
    sub: '15-min arrival window',
    description:
      'Live dispatch routing guarantees punctual team arrival backed by our 48h re-clean.',
  },
];

const NUMBER_FORMATTER = new Intl.NumberFormat('en-US');

interface AnimatedNumberProps {
  value: number;
  elapsedMs: number;
  duration?: number;
  delay?: number;
  suffix?: string;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  elapsedMs,
  duration = 1050,
  delay = 0,
  suffix = '',
}) => {
  const progress =
    elapsedMs <= delay
      ? 0
      : Math.min(1, (elapsedMs - delay) / Math.max(1, duration));
  const eased = 1 - Math.pow(1 - progress, 4);
  const display = progress >= 1 ? value : Math.round(value * eased);

  return (
    <>
      {NUMBER_FORMATTER.format(display)}
      {suffix}
    </>
  );
};

interface RingGaugeProps {
  pct: number;
  active: boolean;
  elapsedMs: number;
  delay?: number;
}

const RingGauge: React.FC<RingGaugeProps> = ({
  pct,
  active,
  elapsedMs,
  delay = 0,
}) => {
  const r = 32;
  const circ = 2 * Math.PI * r;
  const targetOffset = circ * (1 - pct / 100);

  return (
    <div className="relative w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 shrink-0 transition-transform duration-200 group-hover:scale-105">
      <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
        <circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke="#dbeafe"
          strokeWidth="6"
        />
        <circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke="#0284c7"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={active ? targetOffset : circ}
          style={{
            transition: `stroke-dashoffset 1050ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
          }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-display text-xs md:text-sm lg:text-base font-bold text-slate-900 tabular-nums">
        <AnimatedNumber
          value={pct}
          elapsedMs={elapsedMs}
          duration={1050}
          delay={delay}
          suffix="%"
        />
      </span>
    </div>
  );
};

export const Stage05ImpactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    if (mq.matches) {
      setHasEntered(true);
      setElapsedMs(3000);
      return;
    }

    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setHasEntered(true);
      return;
    }

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
      setHasEntered(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setHasEntered(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.05 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasEntered || reducedMotion) return;

    const totalMs = 1550;
    const startTime = performance.now();
    const intervalId = window.setInterval(() => {
      const elapsed = performance.now() - startTime;
      if (elapsed >= totalMs) {
        setElapsedMs(totalMs);
        window.clearInterval(intervalId);
      } else {
        setElapsedMs(elapsed);
      }
    }, 20);

    return () => window.clearInterval(intervalId);
  }, [hasEntered, reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="impact"
      className="relative scroll-mt-20 pt-8 pb-24 sm:pb-28 bg-transparent"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 mx-auto mb-7 max-w-2xl py-3 text-center">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-12 -inset-y-4 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.52)_0%,rgba(15,23,42,0.22)_54%,transparent_80%)]"
          />
          <div className="mb-2 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-white/75" aria-hidden="true" />
            <p className="text-xs font-semibold tracking-[0.18em] text-white drop-shadow-[0_2px_8px_rgba(2,6,23,0.9)]">
              COMPANY IMPACT &amp; TRUST
            </p>
            <span className="h-px w-8 bg-white/75" aria-hidden="true" />
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white drop-shadow-[0_2px_14px_rgba(2,6,23,0.9)] sm:text-4xl">
            Verified Operational Scale
          </h2>
          <p className="mt-2 text-sm font-medium text-white drop-shadow-[0_2px_10px_rgba(2,6,23,0.9)]">
            Explore our service coverage, operating standards, and customer results.
          </p>
        </div>
        {/* Consistent two-container layout on desktop; swipe cards on mobile. */}
        <div className="-mx-4 flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-12 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:gap-8">
          {/* CONTAINER 1 (Left · md:col-span-5): Diagonal-Chamfered White Scale & Footprint Card */}
          <div className="w-[88vw] max-w-[440px] shrink-0 snap-center md:col-span-5 md:w-auto md:max-w-none md:snap-none relative bg-white border border-sky-100 shadow-sm rounded-tl-[2.5rem] rounded-br-[2.5rem] lg:rounded-tl-[2.75rem] lg:rounded-br-[2.75rem] rounded-tr-xl rounded-bl-xl p-5 md:p-6 lg:p-7 flex flex-col justify-between overflow-hidden">
            <div>
              {/* Total Service Hubs Summary Strip separated by hairline rule */}
              <div className="mt-4 lg:mt-5 pb-4 lg:pb-5 border-b border-sky-100">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-2xl bg-sky-600 text-white shadow-xs shrink-0">
                      <Building2 className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-[11px] lg:text-xs font-medium text-slate-500 whitespace-nowrap">
                        Total Service Hubs
                      </p>
                      <p className="font-display text-2xl lg:text-3xl font-extrabold text-sky-700 tabular-nums leading-none mt-0.5">
                        <AnimatedNumber value={98} elapsedMs={elapsedMs} duration={1050} />
                      </p>
                    </div>
                  </div>

                  <div className="text-right text-[11px] lg:text-xs text-slate-500 space-y-0.5 tabular-nums shrink-0">
                    <p>
                      Residential{' '}
                      <span className="font-semibold text-slate-900">
                        <AnimatedNumber value={49} elapsedMs={elapsedMs} duration={1000} delay={60} />
                      </span>
                    </p>
                    <p>
                      Commercial{' '}
                      <span className="font-semibold text-slate-900">
                        <AnimatedNumber value={30} elapsedMs={elapsedMs} duration={1000} delay={120} />
                      </span>
                    </p>
                    <p>
                      Partners{' '}
                      <span className="font-semibold text-slate-900">
                        <AnimatedNumber value={19} elapsedMs={elapsedMs} duration={1000} delay={180} />
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Curved Orbital Milestone Track — Animated arc draw, traveling pulse & staggered nodes */}
            <div className="pt-5 flex-1 flex items-center">
              <div className="relative w-full">
                <svg
                  viewBox="0 0 120 400"
                  className="block absolute left-3 inset-y-1 h-[calc(100%-8px)] w-24 pointer-events-none"
                  fill="none"
                  aria-hidden="true"
                >
                  {/* Base Curved Orbital Path drawing smoothly top-to-bottom */}
                  <path
                    id="impact-orbital-arc-path"
                    d="M 60 6 Q 6 200 60 394"
                    stroke="#bae6fd"
                    strokeWidth="1.75"
                    pathLength={1}
                    strokeDasharray="1"
                    strokeDashoffset={hasEntered ? 0 : 1}
                    style={{
                      transition: 'stroke-dashoffset 1200ms cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  />

                  {/* Subtle Luminous Pulse gliding continuously along the orbital curve */}
                  {hasEntered && !reducedMotion && (
                    <circle r="3" fill="#0284c7" opacity="0.75">
                      <animateMotion
                        dur="4.8s"
                        repeatCount="indefinite"
                        path="M 60 6 Q 6 200 60 394"
                      />
                    </circle>
                  )}
                </svg>

                <div className="relative z-10 grid grid-cols-1 gap-3.5 md:gap-4 lg:gap-3.5">
                  {ARC_MILESTONES.map((item, idx) => {
                    const Icon = item.icon;
                    const delayMs = idx * 65;
                    return (
                      <div
                        key={item.id}
                        className={`flex items-center gap-3 group ${item.offsetClass}`}
                        style={{
                          opacity: hasEntered ? 1 : 0,
                          transform: hasEntered
                            ? 'translate3d(0, 0, 0)'
                            : 'translate3d(-10px, 8px, 0)',
                          transition: `opacity 480ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, transform 480ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms`,
                        }}
                      >
                        <div
                          className="orbital-node-float flex h-8 w-8 lg:h-9 lg:w-9 shrink-0 items-center justify-center rounded-full bg-sky-50 border border-sky-200 text-sky-600 transition-colors duration-200 group-hover:bg-sky-600 group-hover:text-white group-hover:border-sky-600"
                          style={{
                            animationDelay: `${idx * 0.55}s`,
                          }}
                        >
                          <Icon className="w-3.5 h-3.5 lg:w-4 lg:h-4" aria-hidden="true" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[11px] font-medium text-slate-500 truncate">
                            {item.label}
                          </p>
                          <p className="font-display text-sm lg:text-base font-bold text-slate-900 tabular-nums leading-tight">
                            <AnimatedNumber
                              value={item.value}
                              elapsedMs={elapsedMs}
                              duration={1000}
                              delay={delayMs + 50}
                            />
                            <span className="text-[11px] font-normal text-slate-500 ml-1">
                              {item.unit}
                            </span>
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* CONTAINER 2 (Right · md:col-span-7): Mirrored Ice-Blue Trust & Capacity Overview Container */}
          <div className="w-[88vw] max-w-[500px] shrink-0 snap-center md:col-span-7 md:w-auto md:max-w-none md:snap-none relative bg-gradient-to-br from-[#F7FBFF] via-white to-[#EAF3FF] border border-sky-200/80 shadow-sm rounded-tr-[2.5rem] rounded-bl-[2.5rem] lg:rounded-tr-[2.75rem] lg:rounded-bl-[2.75rem] rounded-tl-xl rounded-br-xl p-5 md:p-6 lg:p-8 flex flex-col justify-between overflow-hidden">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  'radial-gradient(rgba(14, 165, 233, 0.13) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
              aria-hidden="true"
            />

            <div className="relative z-10 flex flex-col justify-between h-full">
              {/* Top Heading & Metadata */}
              <div className="flex flex-wrap items-end justify-between gap-2 pb-4 lg:pb-5 border-b border-sky-200/70">
                <div>
                  <p className="text-xs font-semibold tracking-wide text-sky-700 mb-1">
                    Capacity &amp; Guarantee Standards
                  </p>
                  <h3
                    className="font-display text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 leading-tight"
                    style={{ textWrap: 'balance' }}
                  >
                    Trust &amp; Capacity Overview
                  </h3>
                </div>
                <p className="text-[11px] lg:text-xs font-medium text-slate-500">
                  Verified Standards <span aria-hidden="true">·</span> Audited Monthly
                </p>
              </div>

              {/* Spacious 2x2 Circular Gauge Grid — Animated rings & counters */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-5 md:gap-x-6 lg:gap-x-8 lg:gap-y-7 py-5 lg:py-7">
                {CAPACITY_METRICS.map((item, idx) => {
                  const delayMs = 80 + idx * 90;
                  return (
                    <div
                      key={item.title}
                      className="group flex flex-col sm:flex-row md:flex-col lg:flex-row items-start gap-2.5 sm:gap-3.5 lg:gap-4"
                      style={{
                        opacity: hasEntered ? 1 : 0,
                        transform: hasEntered
                          ? 'translate3d(0, 0, 0)'
                          : 'translate3d(0, 12px, 0)',
                        transition: `opacity 480ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, transform 480ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms`,
                      }}
                    >
                      <RingGauge
                        pct={item.pct}
                        active={hasEntered}
                        elapsedMs={elapsedMs}
                        delay={delayMs}
                      />
                      <div className="min-w-0">
                        <p className="text-[11px] lg:text-xs font-semibold text-slate-500">
                          {item.title}
                        </p>
                        <p className="font-display text-base sm:text-lg lg:text-xl font-bold text-sky-700 tabular-nums leading-snug mt-0.5">
                          <AnimatedNumber
                            value={item.figure}
                            elapsedMs={elapsedMs}
                            duration={1050}
                            delay={delayMs + 60}
                          />{' '}
                          <span className="text-[11px] lg:text-xs font-medium text-slate-500">
                            {item.unit}
                          </span>
                        </p>
                        <p className="text-[11px] lg:text-xs font-medium text-emerald-700 mt-0.5">
                          {item.sub}
                        </p>
                        <p className="text-[11px] lg:text-xs text-slate-600 leading-relaxed mt-1 lg:mt-1.5">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Clean Hairline Bottom Trust Assurances */}
              <div className="pt-4 lg:pt-5 border-t border-sky-200/70 flex flex-wrap items-center justify-between gap-3 text-[11px] lg:text-xs text-slate-700">
                <span className="inline-flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" aria-hidden="true" />
                  <span>100% Background-Vetted W-2 Teams</span>
                </span>
                <span className="inline-flex items-center gap-2 font-medium">
                  <Award className="w-4 h-4 text-amber-500 shrink-0" aria-hidden="true" />
                  <span>$5M Insured &amp; 48h Re-Clean Guarantee</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
