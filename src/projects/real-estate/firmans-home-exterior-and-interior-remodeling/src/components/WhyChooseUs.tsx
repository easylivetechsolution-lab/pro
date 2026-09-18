import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, X } from 'lucide-react';
import { HOTSPOTS_DATA } from '../data/remodelingData';
import modernCutawayHouseImg from '../assets/images/modern_cutaway_house_1789532920571.jpg';
import luxuryRealHouseCutawayImg from '../assets/images/luxury_real_house_cutaway_1789534094560.jpg';

interface WhyChooseUsProps {
  onOpenQuote: () => void;
}

interface CalloutConfig {
  id: string;
  label: string;
  box: { left: string; top: string };
  svgPath: string;
  targetTick: { x: number; y: number };
}

const CALLOUT_ITEMS: CalloutConfig[] = [
  {
    id: 'roofing',
    label: 'Roofing',
    box: { left: '16%', top: '11%' },
    svgPath: 'M 215 80 H 315 V 155',
    targetTick: { x: 315, y: 155 }
  },
  {
    id: 'windows-doors',
    label: 'Windows & Doors',
    box: { left: '50%', top: '11%' },
    svgPath: 'M 520 95 V 205',
    targetTick: { x: 520, y: 205 }
  },
  {
    id: 'exterior-painting',
    label: 'Exterior Painting',
    box: { left: '84%', top: '12%' },
    svgPath: 'M 795 88 H 745 V 170',
    targetTick: { x: 745, y: 170 }
  },
  {
    id: 'gutters',
    label: 'Gutters',
    box: { left: '88%', top: '24%' },
    svgPath: 'M 830 156 H 798 V 230',
    targetTick: { x: 798, y: 230 }
  },
  {
    id: 'turf-grass',
    label: 'Turf / Artificial Grass',
    box: { left: '15%', top: '88%' },
    svgPath: 'M 225 528 H 255 V 438',
    targetTick: { x: 255, y: 438 }
  },
  {
    id: 'flooring',
    label: 'Flooring',
    box: { left: '38%', top: '88%' },
    svgPath: 'M 435 528 H 468 V 412',
    targetTick: { x: 468, y: 412 }
  },
  {
    id: 'interior-painting',
    label: 'Interior Painting',
    box: { left: '62%', top: '90%' },
    svgPath: 'M 565 540 H 545 V 360',
    targetTick: { x: 545, y: 360 }
  },
  {
    id: 'remodeling',
    label: 'Remodeling',
    box: { left: '86%', top: '90%' },
    svgPath: 'M 810 540 H 785 V 432',
    targetTick: { x: 785, y: 432 }
  }
];

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenQuote }) => {
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>('roofing');
  const [hoveredHotspotId, setHoveredHotspotId] = useState<string | null>(null);

  const activeHotspot = HOTSPOTS_DATA.find((s) => s.id === activeHotspotId) || HOTSPOTS_DATA[0];

  return (
    <section id="why-us" className="py-20 sm:py-28 lg:py-32 bg-[#0B131E] text-white relative overflow-hidden">
      {/* Subtle architectural ambient light */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-slate-800/20 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#C07848]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
          
          {/* Left Column: Text & 4 Architectural Pillars */}
          <div className="lg:col-span-4 xl:col-span-4 space-y-8">
            <div className="space-y-4">
              <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-[#C07848]">
                THE FIRMANS STANDARD
              </span>
              
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-normal tracking-tight text-white font-serif leading-[1.12]">
                Architectural Integrity <br />
                Across Every Plane
              </h2>
              
              <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-lg">
                We coordinate all trades under one cohesive architectural framework — ensuring every structural envelope and interior finish performs flawlessly for decades.
              </p>
            </div>

            {/* 4 Pillars in 2x2 Grid with Clean Architectural Line Icons */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-7 pt-2">
              {/* Pillar 1: Expert Craftsmanship */}
              <div className="space-y-2">
                <div className="w-8 h-8 flex items-center text-[#C07848]">
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M8 3L18 13L15 16L5 6L8 3Z" />
                    <path d="M11.5 12.5L6.5 17.5L3.5 20.5" />
                    <path d="M2.5 19.5L4.5 21.5" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white tracking-wide">
                    Master Craftsmanship
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5 leading-snug">
                    Certified Trade Specialists
                  </p>
                </div>
              </div>

              {/* Pillar 2: Premium Materials */}
              <div className="space-y-2">
                <div className="w-8 h-8 flex items-center text-[#C07848]">
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="2.5" />
                    <path d="M12 4.5C13.2 4.5 14 5.8 14 7C15.2 7 16.5 7.8 16.5 9C17.7 9 18.5 10.2 18.5 11.5C18.5 12.8 17.7 14 16.5 14C16.5 15.2 15.2 16 14 16C14 17.2 13.2 18.5 12 18.5C10.8 18.5 10 17.2 10 16C8.8 16 7.5 15.2 7.5 14C6.3 14 5.5 12.8 5.5 11.5C5.5 10.2 6.3 9 7.5 9C7.5 7.8 8.8 7 10 7C10 5.8 10.8 4.5 12 4.5Z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white tracking-wide">
                    Architectural Grade
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5 leading-snug">
                    Direct Factory Specs
                  </p>
                </div>
              </div>

              {/* Pillar 3: On-Time Completion */}
              <div className="space-y-2">
                <div className="w-8 h-8 flex items-center text-[#C07848]">
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="7" />
                    <path d="M12 8.5V12L14.5 13.5" />
                    <path d="M4.5 12A7.5 7.5 0 0 1 18.5 7.5" />
                    <polyline points="18.5 4 18.5 7.5 15 7.5" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white tracking-wide">
                    Milestone Discipline
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5 leading-snug">
                    Dedicated Site Managers
                  </p>
                </div>
              </div>

              {/* Pillar 4: Transparent Pricing */}
              <div className="space-y-2">
                <div className="w-8 h-8 flex items-center text-[#C07848]">
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="7.5" r="3.5" />
                    <path d="M6 18.5C6 15.5 8.5 13.5 12 13.5C13.2 13.5 14.3 13.8 15.2 14.3" />
                    <circle cx="18" cy="17.5" r="3.5" />
                    <path d="M18 16V19M16.5 17.5H19.5" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white tracking-wide">
                    Fixed-Fee Contracts
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5 leading-snug">
                    Zero Surprise Add-ons
                  </p>
                </div>
              </div>
            </div>

            {/* Request Trade Consultation Button */}
            <div className="pt-3">
              <button
                id="why-us-learn-more-btn"
                onClick={onOpenQuote}
                className="inline-flex items-center gap-2.5 bg-[#C07848] hover:bg-[#D28A5B] text-white font-semibold px-7 py-3 rounded-full text-sm tracking-wide shadow-lg shadow-[#C07848]/20 transition-all cursor-pointer"
              >
                <span>Request Architectural Review</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Architectural Cutaway House with 8 Accurate Labels & SVG Leader Lines */}
          <div className="lg:col-span-8 xl:col-span-8 relative">
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] rounded-3xl overflow-hidden bg-[#0F172A] border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)]">
              
              {/* Cutaway House Visual */}
              <img
                src={modernCutawayHouseImg}
                alt="Architectural modern residence cross-section cutaway"
                className="w-full h-full object-cover select-none"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = luxuryRealHouseCutawayImg;
                }}
              />

              {/* Atmospheric vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B131E]/80 via-transparent to-black/25 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B131E]/45 via-transparent to-[#0B131E]/35 pointer-events-none" />

              {/* SVG Leader Lines connecting Callout Cards to the house features - NO pulsating dots */}
              <svg
                viewBox="0 0 1000 600"
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
                preserveAspectRatio="none"
              >
                {CALLOUT_ITEMS.map((item) => {
                  const isHighlighted = activeHotspotId === item.id || hoveredHotspotId === item.id;
                  return (
                    <g key={`leader-line-${item.id}`}>
                      {/* Connection Path */}
                      <path
                        d={item.svgPath}
                        fill="none"
                        stroke={isHighlighted ? '#C07848' : 'rgba(255,255,255,0.35)'}
                        strokeWidth={isHighlighted ? '2' : '1.2'}
                        strokeDasharray={isHighlighted ? 'none' : '4 3'}
                        className="transition-colors duration-300"
                      />

                      {/* Clean Crosshair Tick at Target (No pulsating dot) */}
                      <line
                        x1={item.targetTick.x - 4}
                        y1={item.targetTick.y}
                        x2={item.targetTick.x + 4}
                        y2={item.targetTick.y}
                        stroke={isHighlighted ? '#C07848' : 'rgba(255,255,255,0.7)'}
                        strokeWidth="1.5"
                      />
                      <line
                        x1={item.targetTick.x}
                        y1={item.targetTick.y - 4}
                        x2={item.targetTick.x}
                        y2={item.targetTick.y + 4}
                        stroke={isHighlighted ? '#C07848' : 'rgba(255,255,255,0.7)'}
                        strokeWidth="1.5"
                      />
                    </g>
                  );
                })}
              </svg>

              {/* 8 Floating Callout Badges with Clean Minimalist Styling (No dots) */}
              {CALLOUT_ITEMS.map((item) => {
                const isHighlighted = activeHotspotId === item.id || hoveredHotspotId === item.id;
                const isSelected = activeHotspotId === item.id;

                return (
                  <button
                    key={item.id}
                    id={`callout-btn-${item.id}`}
                    onClick={() => setActiveHotspotId(item.id)}
                    onMouseEnter={() => setHoveredHotspotId(item.id)}
                    onMouseLeave={() => setHoveredHotspotId(null)}
                    style={{
                      left: item.box.left,
                      top: item.box.top,
                      transform: 'translate(-50%, -50%)',
                    }}
                    className="absolute z-20 group transition-all duration-200 focus:outline-none cursor-pointer"
                  >
                    <div
                      className={`px-3.5 py-1.5 sm:py-2 rounded-lg text-xs sm:text-[13px] font-medium tracking-wide transition-all duration-200 whitespace-nowrap shadow-lg flex items-center ${
                        isSelected
                          ? 'bg-[#C07848] text-white font-bold border border-[#C07848] shadow-lg shadow-[#C07848]/30 scale-105'
                          : isHighlighted
                          ? 'bg-[#121C2B]/90 text-white border border-[#C07848]'
                          : 'bg-[#0F172A]/80 hover:bg-[#121C2B]/90 text-slate-200 border border-white/20 hover:border-white/40'
                      } backdrop-blur-md`}
                    >
                      <span>{item.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Interactive Spotlight Detail Card for the currently selected feature */}
            {activeHotspot && (
              <div
                id="active-feature-spotlight"
                className="mt-4 p-4 sm:p-5 rounded-2xl bg-[#121C2B]/95 backdrop-blur-xl border border-white/10 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={activeHotspot.image}
                      alt={activeHotspot.title}
                      className="w-14 h-14 rounded-xl object-cover border border-white/20 shrink-0 shadow-md"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=80';
                      }}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#C07848]">
                          {activeHotspot.category} Precision Remodeling
                        </span>
                        <span className="text-white/40">•</span>
                        <span className="text-xs text-slate-400">Architectural Detail</span>
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-white tracking-wide">
                        {activeHotspot.title}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={onOpenQuote}
                      className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold px-4 py-2 rounded-full bg-[#C07848] text-white hover:bg-[#D28A5B] shadow-md shadow-[#C07848]/20 transition-all cursor-pointer"
                    >
                      <span>Request Estimate</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setActiveHotspotId(null)}
                      className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                      aria-label="Close detail"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 mt-2.5 leading-relaxed font-light">
                  {activeHotspot.description}
                </p>

                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/10 flex-wrap">
                  {activeHotspot.features.map((feat, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C07848]" />
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
