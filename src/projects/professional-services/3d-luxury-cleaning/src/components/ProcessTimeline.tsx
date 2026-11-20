import React, { useEffect, useRef, useState } from 'react';
import { CalendarCheck2, ClipboardCheck, ShieldCheck } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    title: 'Book in 60 seconds',
    description:
      'Pick a protocol or describe your home to our AI estimator. Lock in transparent pricing, arrival windows, and referral credits with instant confirmation.',
    detail: 'Automated SMS & email calendar hold sent immediately.',
    image: '/aether-clean/src/assets/images/how_it_works_book_1794945444045.jpg',
    imageAlt: 'Client booking a cleaning schedule on a tablet in a sunlit modern apartment',
    icon: CalendarCheck2,
  },
  {
    number: '02',
    title: 'We clean with precision',
    description:
      'A background-vetted W-2 crew arrives on time with HEPA vacuums, microfiber color-zoned cloths, and hospital-grade botanical solutions safe for kids and pets.',
    detail: '54-point room-by-room architectural checklist.',
    image: '/aether-clean/src/assets/images/how_it_works_clean_1794945445424.jpg',
    imageAlt: 'AetherClean specialist wiping a white marble kitchen island with a fresh microfiber cloth',
    icon: ClipboardCheck,
  },
  {
    number: '03',
    title: 'You relax, guaranteed',
    description:
      'Walk into sunlit clarity. Receive automated inspection summaries, earn $35 referral rewards for every friend you invite, backed by our 48-hour re-clean pledge.',
    detail: 'Zero contracts. Pause or adjust frequency anytime.',
    image: '/aether-clean/src/assets/images/how_it_works_relax_1794945446366.jpg',
    imageAlt: 'Spotless sunlit living room with gleaming oak floors after cleaning',
    icon: ShieldCheck,
  },
];

export const ProcessTimeline: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0.18);

  useEffect(() => {
    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 800;
        const raw = (vh * 0.65 - rect.top) / Math.max(rect.height * 0.72, 1);
        const clamped = Math.max(0.08, Math.min(1, raw));
        setProgress(clamped);
        if (clamped < 0.38) setActiveStep(0);
        else if (clamped < 0.72) setActiveStep(1);
        else setActiveStep(2);
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const currentStep = STEPS[activeStep] ?? STEPS[0];

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-16 sm:py-24 bg-transparent"
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-6">
        <div className="grid grid-cols-12 gap-3 sm:gap-6 lg:gap-12 items-start">
          {/* Sticky left overview + Real High-Resolution Step Photography */}
          <div className="col-span-5 sticky top-16 sm:top-20 lg:top-24 rounded-xl sm:rounded-2xl border border-sky-100/90 bg-white/92 p-3 sm:p-5 lg:p-6 shadow-sm min-w-0">
            <p className="text-[10px] sm:text-xs font-semibold tracking-wide text-sky-700 mb-1.5 sm:mb-2">
              How It Works
            </p>
            <h2
              className="font-display text-sm sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 mb-2 sm:mb-3 leading-tight"
              style={{ textWrap: 'balance' }}
            >
              Three frictionless steps from quote to gleaming space.
            </h2>
            <p className="text-[11px] sm:text-sm text-slate-600 leading-relaxed mb-3 sm:mb-6">
              Every stage is coordinated automatically—so you spend zero time coordinating keys,
              supplies, or follow-ups.
            </p>

            {/* Real Editorial Photo Frame synced to active step */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl sm:rounded-2xl border border-sky-200 bg-white shadow-sm">
              {STEPS.map((s, idx) => (
                <img
                  key={s.number}
                  src={s.image}
                  alt={s.imageAlt}
                  referrerPolicy="no-referrer"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                    activeStep === idx ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                />
              ))}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/35 to-transparent p-2.5 sm:p-5 text-white">
                <span className="font-mono text-[9px] sm:text-[11px] font-semibold text-sky-200">
                  Step {currentStep.number}
                </span>
                <p className="font-display text-xs sm:text-base font-bold leading-snug">
                  {currentStep.title}
                </p>
              </div>
            </div>

          </div>

          {/* Right 3-Step Scroll Timeline */}
          <div className="col-span-7 relative pl-5 sm:pl-8 md:pl-10 min-w-0">
            <div
              aria-hidden="true"
              className="absolute left-1.5 sm:left-3 md:left-4 top-3 bottom-3 w-0.5 bg-sky-200/80 rounded-full overflow-hidden"
            >
              <div
                className="w-full h-full bg-sky-600 origin-top transition-transform duration-150"
                style={{ transform: `scaleY(${progress})` }}
              />
            </div>

            <div className="space-y-4 sm:space-y-8">
              {STEPS.map((step, idx) => {
                const Icon = step.icon;
                const isActive = idx <= activeStep;
                return (
                  <div
                    key={step.number}
                    onMouseEnter={() => setActiveStep(idx)}
                    className={`relative rounded-xl sm:rounded-2xl border p-2.5 sm:p-5 lg:p-6 transition-all duration-200 ${
                      isActive
                        ? 'bg-white/95 border-sky-300 shadow-sm'
                        : 'bg-white/80 border-slate-200/80'
                    }`}
                  >
                    <div
                      aria-hidden="true"
                      className={`absolute -left-[21px] sm:-left-[31px] md:-left-[35px] top-4 sm:top-8 flex h-4 w-4 sm:h-6 sm:w-6 items-center justify-center rounded-full border-2 text-[9px] sm:text-[11px] font-mono font-bold transition-colors ${
                        isActive
                          ? 'bg-sky-600 border-sky-600 text-white'
                          : 'bg-white border-sky-300 text-sky-700'
                      }`}
                    >
                      {idx + 1}
                    </div>

                    <div className="grid grid-cols-12 gap-2.5 sm:gap-5 items-center">
                      <div className="col-span-4 aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden border border-sky-100 bg-sky-50">
                        <img
                          src={step.image}
                          alt={step.imageAlt}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="col-span-8 min-w-0">
                        <div className="flex items-center gap-2 sm:gap-2.5 mb-1.5 sm:mb-2">
                          <div className="flex h-6 w-6 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-md sm:rounded-lg bg-sky-50 border border-sky-100">
                            <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-600" aria-hidden="true" />
                          </div>
                          <div className="min-w-0">
                            <span className="font-mono text-[9px] sm:text-[11px] text-sky-700 font-medium block">
                              Step {step.number}
                            </span>
                            <h3 className="font-display text-xs sm:text-lg font-bold text-slate-900 leading-snug">
                              {step.title}
                            </h3>
                          </div>
                        </div>

                        <p className="text-[11px] sm:text-sm text-slate-600 leading-relaxed mb-1.5 sm:mb-2.5">
                          {step.description}
                        </p>
                        <p className="text-[10px] sm:text-xs font-medium text-slate-500">
                          {step.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
