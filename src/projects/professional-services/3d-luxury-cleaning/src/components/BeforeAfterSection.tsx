import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import workspaceBefore from '../assets/images/workspace_before_dirty_1795009970689.jpg';
import workspaceAfter from '../assets/images/workspace_after_clean_1795009969461.jpg';
import kitchenBefore from '../assets/images/kitchen_before_1794945446590.jpg';
import kitchenAfter from '../assets/images/kitchen_after_1794945446390.jpg';
import glassBefore from '../assets/images/glass_before_1794945446992.jpg';
import glassAfter from '../assets/images/glass_after_1794945448175.jpg';

interface BeforeAfterSectionProps {
  onBookWorkspaceClean?: () => void;
}

const COMPARISONS = [
  {
    id: 'workspace',
    title: 'Executive Studio & Desk Detailing',
    desc: 'Cable routing, dust extraction from architectural louvers, streakless display glass, and sanitized keyboards.',
    before: workspaceBefore,
    after: workspaceAfter,
  },
  {
    id: 'kitchen',
    title: 'Gourmet Kitchen & Marble Countertop Reset',
    desc: 'Degreased vent hoods, steam-treated tile grout, and non-acidic botanical marble conditioning.',
    before: kitchenBefore,
    after: kitchenAfter,
  },
  {
    id: 'glass',
    title: 'Architectural Glazing & Shower Enclosures',
    desc: 'Hydrophobic nano-coating application and complete mineral calcium scale removal.',
    before: glassBefore,
    after: glassAfter,
  },
];

export const BeforeAfterSection: React.FC<BeforeAfterSectionProps> = ({
  onBookWorkspaceClean,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);

  const current = COMPARISONS[activeTab];

  return (
    <section id="before-after" className="relative py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200/60 text-sky-700 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Visual Evidence</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Micro-Precision Transformation
        </h2>
        <p className="mt-3 text-slate-600 text-base sm:text-lg">
          Slide horizontally to inspect the immaculate standard achieved by our specialized technicians.
        </p>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {COMPARISONS.map((c, i) => (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                setActiveTab(i);
                setSliderPos(50);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === i
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {c.title.split('&')[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200/90 bg-white p-4 sm:p-8 shadow-sm max-w-5xl mx-auto">
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden select-none bg-slate-900 shadow-inner">
          {/* After Image (Background) */}
          <img
            src={current.after}
            alt="After clean"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Before Image (Clipped Foreground) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPos}%` }}
          >
            <img
              src={current.before}
              alt="Before clean"
              className="absolute inset-0 w-full h-full object-cover max-w-none"
              style={{ width: '100%', minWidth: '100%' }}
            />
            <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
              Before
            </div>
          </div>

          <div className="absolute top-4 right-4 bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
            After Sanitization
          </div>

          {/* Slider Divider Line */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize flex items-center justify-center"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="w-8 h-8 rounded-full bg-white shadow-md border border-slate-300 flex items-center justify-center text-slate-700 text-xs font-bold">
              ↔
            </div>
          </div>

          {/* Range input for accessible drag / click */}
          <input
            type="range"
            min={0}
            max={100}
            value={sliderPos}
            onChange={(e) => setSliderPos(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
            aria-label="Before after comparison slider"
          />
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">{current.title}</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">{current.desc}</p>
          </div>

          {onBookWorkspaceClean && (
            <button
              type="button"
              onClick={onBookWorkspaceClean}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-all shadow-sm cursor-pointer whitespace-nowrap"
            >
              <span>Schedule Commercial Clean</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
