import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import type { AddOnId, CleaningFrequency, ServiceType } from '../types/cleaning';

gsap.registerPlugin(ScrollTrigger);

export interface SolutionPreset {
  serviceType: ServiceType;
  sqft?: number;
  rooms?: number;
  addOns?: AddOnId[];
  frequency?: CleaningFrequency;
}

interface ComprehensiveSolutionsSectionProps {
  onSelectSolution: (preset: SolutionPreset) => void;
}

interface SolutionCardItem {
  id: string;
  title: string;
  description: string;
  preset: SolutionPreset;
  renderIcon: () => React.ReactNode;
}

const SOLUTION_CARDS: SolutionCardItem[] = [
  {
    id: 'office-cleaning',
    title: 'Office Cleaning',
    description: 'A healthier, more productive workspace.',
    preset: { serviceType: 'office', sqft: 2200, addOns: [] },
    renderIcon: () => (
      <svg viewBox="0 0 64 64" fill="none" className="w-11 h-11" aria-hidden="true">
        <rect x="14" y="12" width="24" height="42" rx="2.5" stroke="#0284c7" strokeWidth="2.3" fill="rgba(14,165,233,0.12)" />
        <rect x="38" y="24" width="14" height="30" rx="2" stroke="#0369a1" strokeWidth="2.1" fill="rgba(2,132,199,0.08)" />
        <path d="M20 20h4m6 0h4M20 28h4m6 0h4M20 36h4m6 0h4M43 31h4m-4 7h4m-4 7h4" stroke="#0284c7" strokeWidth="2.1" strokeLinecap="round" />
        <path d="M23 54V45h6v9" stroke="#0369a1" strokeWidth="2.1" strokeLinejoin="round" />
        <path d="M10 54h44" stroke="#0284c7" strokeWidth="2.1" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'commercial-cleaning',
    title: 'Commercial Cleaning',
    description: 'Professional care for large spaces.',
    preset: { serviceType: 'office', sqft: 4500, addOns: ['steam-sanitize'] },
    renderIcon: () => (
      <svg viewBox="0 0 64 64" fill="none" className="w-11 h-11" aria-hidden="true">
        <path d="M12 54V24l14-7v37" stroke="#0284c7" strokeWidth="2.3" strokeLinejoin="round" fill="rgba(14,165,233,0.12)" />
        <path d="M26 54V12l24 8v34" stroke="#0369a1" strokeWidth="2.3" strokeLinejoin="round" fill="rgba(2,132,199,0.08)" />
        <path d="M17 30h4m-4 7h4m-4 7h4M32 24h5m6 0h3M32 32h5m6 0h3M32 40h5m6 0h3" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
        <path d="M35 54v-7h6v7M8 54h48" stroke="#0369a1" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'deep-cleaning',
    title: 'Deep Cleaning',
    description: 'A spotless clean, from top to bottom.',
    preset: { serviceType: 'deep', addOns: ['steam-sanitize'] },
    renderIcon: () => (
      <svg viewBox="0 0 64 64" fill="none" className="w-11 h-11" aria-hidden="true">
        <path d="M16 44c0-7.5 5.5-13 12.5-13S41 36.5 41 44v4H16v-4Z" stroke="#0284c7" strokeWidth="2.3" fill="rgba(14,165,233,0.14)" />
        <circle cx="21" cy="48" r="5" stroke="#0369a1" strokeWidth="2.1" fill="#e0f2fe" />
        <circle cx="38" cy="49" r="3.5" stroke="#0369a1" strokeWidth="2" fill="#e0f2fe" />
        <path d="M29 31V18c0-4 3.5-7 7.5-7S44 14 44 18v27" stroke="#0284c7" strokeWidth="2.3" strokeLinecap="round" />
        <path d="M44 45h8l2 5H42l2-5Z" stroke="#0369a1" strokeWidth="2.1" strokeLinejoin="round" fill="rgba(14,165,233,0.16)" />
      </svg>
    ),
  },
  {
    id: 'floor-care',
    title: 'Floor Care',
    description: 'Shine that lasts.',
    preset: { serviceType: 'deep', addOns: ['steam-sanitize'] },
    renderIcon: () => (
      <svg viewBox="0 0 64 64" fill="none" className="w-11 h-11" aria-hidden="true">
        <path d="M28 15h10M33 15v24" stroke="#0369a1" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M23 39h20l4 8H19l4-8Z" stroke="#0284c7" strokeWidth="2.3" strokeLinejoin="round" fill="rgba(14,165,233,0.14)" />
        <ellipse cx="33" cy="50" rx="16" ry="3.8" stroke="#0284c7" strokeWidth="2.1" fill="rgba(14,165,233,0.1)" />
        <circle cx="20" cy="47" r="3" stroke="#0369a1" strokeWidth="2" fill="#e0f2fe" />
      </svg>
    ),
  },
  {
    id: 'window-cleaning',
    title: 'Window Cleaning',
    description: 'Crystal clear results.',
    preset: { serviceType: 'home', addOns: ['interior-windows'] },
    renderIcon: () => (
      <svg viewBox="0 0 64 64" fill="none" className="w-11 h-11" aria-hidden="true">
        <rect x="13" y="13" width="38" height="7" rx="2.5" stroke="#0284c7" strokeWidth="2.2" fill="rgba(14,165,233,0.16)" />
        <path d="M15 20h34v4H15v-4Z" stroke="#0369a1" strokeWidth="2" fill="rgba(2,132,199,0.1)" />
        <path d="M28 24h8v7l-1.5 20c-.15 1.7-1 3-2.5 3s-2.35-1.3-2.5-3L28 31v-7Z" stroke="#0284c7" strokeWidth="2.2" strokeLinejoin="round" fill="rgba(14,165,233,0.12)" />
        <circle cx="32" cy="48" r="1.4" fill="#0369a1" />
      </svg>
    ),
  },
];

const TiltSolutionCard: React.FC<{
  item: SolutionCardItem;
  onSelect: () => void;
}> = ({ item, onSelect }) => {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, active: false });

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({
      rx: Number(((0.5 - py) * 10).toFixed(2)),
      ry: Number(((px - 0.5) * 11).toFixed(2)),
      gx: Math.round(px * 100),
      gy: Math.round(py * 100),
      active: true,
    });
  };

  const handlePointerLeave = () => {
    setTilt({ rx: 0, ry: 0, gx: 50, gy: 50, active: false });
  };

  return (
    <div style={{ perspective: '1000px' }} className="w-full h-full">
      <button
        type="button"
        onClick={onSelect}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(${tilt.active ? '8px' : '0px'})`,
        }}
        className="group relative flex h-full w-full flex-col items-center justify-between text-center rounded-2xl border border-sky-100/90 hover:border-sky-300 bg-white/94 hover:bg-white px-5 py-7 shadow-sm hover:shadow-md transition-all duration-200 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-200"
          style={{
            opacity: tilt.active ? 1 : 0,
            background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(186, 230, 253, 0.3), transparent 65%)`,
          }}
        />

        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-sky-50 border border-sky-100 transition-transform duration-200 group-hover:-translate-y-1">
            {item.renderIcon()}
          </div>

          <h3 className="font-display text-base md:text-[17px] font-bold tracking-tight text-slate-900 mb-2">
            {item.title}
          </h3>

          <p className="text-xs text-slate-600 leading-relaxed max-w-[180px] mb-5">
            {item.description}
          </p>
        </div>

        <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-sky-200 text-sky-700 group-hover:bg-sky-600 group-hover:border-sky-600 group-hover:text-white transition-all duration-200 group-hover:scale-110">
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </span>
      </button>
    </div>
  );
};

export const ComprehensiveSolutionsSection: React.FC<ComprehensiveSolutionsSectionProps> = ({
  onSelectSolution,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const entireDrawerRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleSliderScroll = () => {
    const el = sliderRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      setActiveSlide(0);
      return;
    }
    const ratio = el.scrollLeft / maxScroll;
    const idx = Math.round(ratio * (SOLUTION_CARDS.length - 1));
    setActiveSlide(Math.max(0, Math.min(SOLUTION_CARDS.length - 1, idx)));
  };

  const scrollToSlide = (targetIdx: number) => {
    const el = sliderRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(SOLUTION_CARDS.length - 1, targetIdx));
    const slideEl = el.children[clamped] as HTMLElement | undefined;
    if (slideEl) {
      el.scrollTo({
        left: slideEl.offsetLeft,
        behavior: 'smooth',
      });
    }
    setActiveSlide(clamped);
  };

  useEffect(() => {
    const section = sectionRef.current;
    const container = entireDrawerRef.current;
    if (!section || !container) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Animate the ENTIRE Our Services section from right to left on scroll
      gsap.from(container, {
        x: 160,
        opacity: 0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 92%',
          end: 'top 42%',
          scrub: 0.65,
        },
      });

      if (lineRef.current) {
        gsap.from(lineRef.current, {
          scaleX: 0,
          transformOrigin: 'right center',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 88%',
            end: 'top 44%',
            scrub: 0.65,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="solutions"
      ref={sectionRef}
      className="relative pt-10 pb-20 md:pt-14 md:pb-24 bg-transparent overflow-x-clip"
    >
      <div ref={entireDrawerRef} className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <div className="relative text-center max-w-2xl mx-auto mb-8 py-3">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-12 -inset-y-4 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.52)_0%,rgba(15,23,42,0.22)_54%,transparent_80%)]"
          />
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="h-px w-8 bg-white/75" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-[0.18em] text-white drop-shadow-[0_2px_8px_rgba(2,6,23,0.9)]">
              OUR SERVICES
            </span>
            <span className="h-px w-8 bg-white/75" aria-hidden="true" />
          </div>

          <h2
            className="font-display text-3xl md:text-4xl font-bold tracking-tight text-white mb-2 drop-shadow-[0_2px_14px_rgba(2,6,23,0.9)]"
            style={{ textWrap: 'balance' }}
          >
            Comprehensive Cleaning Solutions
          </h2>

          <p className="text-sm font-medium text-white/95 drop-shadow-[0_2px_10px_rgba(2,6,23,0.9)]">
            From offices to commercial spaces, we&apos;ve got you covered.
          </p>
        </div>

        <div
          ref={lineRef}
          aria-hidden="true"
          className="h-px w-full mb-8 bg-gradient-to-l from-sky-400/80 via-white/70 to-transparent"
        />

        <div
          ref={sliderRef}
          onScroll={handleSliderScroll}
          className="relative flex flex-nowrap items-stretch gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-5 lg:gap-4 lg:overflow-visible lg:snap-none lg:pb-0"
        >
          {SOLUTION_CARDS.map((card) => (
            <div
              key={card.id}
              className="shrink-0 snap-start w-[72%] sm:w-[42%] md:w-[31%] lg:w-auto flex"
            >
              <TiltSolutionCard
                item={card}
                onSelect={() => onSelectSolution(card.preset)}
              />
            </div>
          ))}
        </div>

        {/* Minimal slide controls shown only when viewport narrows into slide mode */}
        <div className="mt-5 flex items-center justify-center gap-3 lg:hidden">
          <button
            type="button"
            onClick={() => scrollToSlide(activeSlide - 1)}
            disabled={activeSlide === 0}
            aria-label="Previous service"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-sky-100/90 bg-white/95 text-sky-700 shadow-sm transition-colors hover:bg-sky-600 hover:border-sky-600 hover:text-white disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          </button>

          <div className="flex items-center gap-1.5" role="tablist" aria-label="Service slides">
            {SOLUTION_CARDS.map((card, idx) => (
              <button
                key={card.id}
                type="button"
                role="tab"
                aria-selected={activeSlide === idx}
                aria-label={`Show ${card.title}`}
                onClick={() => scrollToSlide(idx)}
                className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                  activeSlide === idx
                    ? 'w-6 bg-white shadow-sm'
                    : 'w-2 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollToSlide(activeSlide + 1)}
            disabled={activeSlide >= SOLUTION_CARDS.length - 1}
            aria-label="Next service"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-sky-100/90 bg-white/95 text-sky-700 shadow-sm transition-colors hover:bg-sky-600 hover:border-sky-600 hover:text-white disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
};
