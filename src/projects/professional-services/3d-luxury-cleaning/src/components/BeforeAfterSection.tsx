import React, { useCallback, useRef, useState } from 'react';
import {
  ArrowLeftRight,
  ArrowRight,
  CheckCircle2,
  Columns2,
  Eye,
  Sparkles,
} from 'lucide-react';
import beforeWorkspaceImg from '../assets/images/workspace_before_dirty_1795009970689.jpg';
import afterWorkspaceImg from '../assets/images/workspace_after_exact_1795009998227.jpg';

type CompareMode = 'split' | 'before' | 'after' | 'side-by-side';

interface BeforeAfterSectionProps {
  onBookWorkspaceClean: () => void;
}

const TRANSFORMATION_POINTS = [
  {
    index: '01',
    title: 'Streak-Free Glass & Displays',
    detail:
      'Removed handprints, oils, and dust across floor-to-ceiling partitions and workstation screens using zero-residue botanical mist.',
  },
  {
    index: '02',
    title: 'Full Surface & Waste Reset',
    detail:
      'Cleared takeout clutter, organized cables, sanitized light-oak worktops, and disinfected ergonomic chair armrests and high-touch points.',
  },
  {
    index: '03',
    title: 'HEPA Extraction & Floor Finish',
    detail:
      'Deep HEPA debris extraction and matte floor buffing completed by 3 W-2 specialists in 110 minutes with zero synthetic fragrance.',
  },
];

export const BeforeAfterSection: React.FC<BeforeAfterSectionProps> = ({
  onBookWorkspaceClean,
}) => {
  const [mode, setMode] = useState<CompareMode>('split');
  const [splitPct, setSplitPct] = useState<number>(52);
  const [beforeFailed, setBeforeFailed] = useState(false);
  const [afterFailed, setAfterFailed] = useState(false);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = sliderRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0) return;
    const raw = ((clientX - rect.left) / rect.width) * 100;
    setSplitPct(Math.max(4, Math.min(96, Math.round(raw * 10) / 10)));
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    updateFromClientX(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSplitPct((prev) => Math.max(4, prev - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSplitPct((prev) => Math.min(96, prev + 5));
    }
  };

  const effectivePct = mode === 'before' ? 100 : mode === 'after' ? 0 : splitPct;

  const renderFallback = (kind: 'Before' | 'After') => (
    <div
      className={`w-full h-full flex flex-col items-center justify-center p-6 text-center ${
        kind === 'Before'
          ? 'bg-gradient-to-br from-slate-200 to-slate-300 text-slate-700'
          : 'bg-gradient-to-br from-sky-50 to-white text-sky-900'
      }`}
    >
      <Sparkles className="w-8 h-8 mb-2 opacity-70" aria-hidden="true" />
      <p className="font-display font-semibold text-sm">
        {kind} Workspace View
      </p>
    </div>
  );

  return (
    <section
      id="before-after"
      className="relative scroll-mt-20 pt-4 pb-24 sm:pb-28 bg-transparent"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-sky-100 bg-white shadow-sm p-5 sm:p-7 lg:p-9">
          {/* Header & View Switcher */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-sky-100">
            <div>
              <p className="text-xs font-semibold tracking-wide text-sky-700 mb-1">
                Stage 06 · Before &amp; After Transformation
              </p>
              <h2
                className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 leading-tight"
                style={{ textWrap: 'balance' }}
              >
                SoMa Office Turnaround — Slide to Compare
              </h2>
              <p className="text-sm text-slate-600 mt-1.5">
                3,200 sq ft Tech Studio <span aria-hidden="true">·</span> 3 W-2 Specialists{' '}
                <span aria-hidden="true">·</span> 110 min Deep Sanitization
              </p>
            </div>

            {/* Interactive Mode Selector */}
            <div
              role="group"
              aria-label="Comparison view mode"
              className="inline-flex items-center gap-1 p-1 rounded-xl bg-slate-100 border border-slate-200/70 self-start lg:self-auto"
            >
              <button
                type="button"
                onClick={() => setMode('split')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  mode === 'split'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ArrowLeftRight className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Split Slider</span>
              </button>
              <button
                type="button"
                onClick={() => setMode('before')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  mode === 'before'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Before</span>
              </button>
              <button
                type="button"
                onClick={() => setMode('after')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  mode === 'after'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                <span>After</span>
              </button>
              <button
                type="button"
                onClick={() => setMode('side-by-side')}
                className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  mode === 'side-by-side'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Columns2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Side by Side</span>
              </button>
            </div>
          </div>

          {/* Interactive Comparison Stage */}
          <div className="mt-6">
            {mode === 'side-by-side' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                <figure className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                  {beforeFailed ? (
                    renderFallback('Before')
                  ) : (
                    <img
                      src={beforeWorkspaceImg}
                      alt="Bay Area glass-walled office workspace before cleaning with cluttered oak desk, stained cups, and smudged glass"
                      referrerPolicy="no-referrer"
                      onError={() => setBeforeFailed(true)}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <figcaption className="absolute left-3 top-3 rounded-lg bg-slate-950/80 backdrop-blur-xs px-3 py-1 text-xs font-semibold text-white">
                    Before · High-Traffic Mess
                  </figcaption>
                </figure>

                <figure className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-sky-200 bg-sky-50">
                  {afterFailed ? (
                    renderFallback('After')
                  ) : (
                    <img
                      src={afterWorkspaceImg}
                      alt="Exact same Bay Area glass-walled office workspace after AetherClean deep sanitization with spotless oak table and crystal-clear glass"
                      referrerPolicy="no-referrer"
                      onError={() => setAfterFailed(true)}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <figcaption className="absolute right-3 top-3 rounded-lg bg-white/95 backdrop-blur-xs px-3 py-1 text-xs font-semibold text-sky-800 shadow-xs">
                    After · AetherClean Sanitized
                  </figcaption>
                </figure>
              </div>
            ) : (
              <div
                ref={sliderRef}
                role="slider"
                tabIndex={0}
                aria-label="Before and after cleaning comparison slider"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(effectivePct)}
                onPointerDown={mode === 'split' ? handlePointerDown : undefined}
                onPointerMove={mode === 'split' ? handlePointerMove : undefined}
                onPointerUp={mode === 'split' ? handlePointerUp : undefined}
                onKeyDown={mode === 'split' ? handleKeyDown : undefined}
                className={`relative w-full aspect-[16/9] max-h-[560px] rounded-2xl overflow-hidden border border-sky-200/80 select-none touch-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                  mode === 'split' ? 'cursor-ew-resize' : 'cursor-default'
                }`}
              >
                {/* Base Layer: Spotless AFTER Workspace */}
                {afterFailed ? (
                  renderFallback('After')
                ) : (
                  <img
                    src={afterWorkspaceImg}
                    alt="Bay Area glass-walled office workspace after AetherClean deep sanitization with spotless oak desk and streak-free partitions"
                    referrerPolicy="no-referrer"
                    draggable={false}
                    onError={() => setAfterFailed(true)}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  />
                )}

                {/* Clipped Foreground Layer: Dirty BEFORE Workspace */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    clipPath: `inset(0 ${100 - effectivePct}% 0 0)`,
                    transition:
                      mode === 'split'
                        ? undefined
                        : 'clip-path 320ms cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  {beforeFailed ? (
                    renderFallback('Before')
                  ) : (
                    <img
                      src={beforeWorkspaceImg}
                      alt="Same Bay Area office workspace before cleaning showing coffee cups, food boxes, cluttered desk, and dirty glass"
                      referrerPolicy="no-referrer"
                      draggable={false}
                      onError={() => setBeforeFailed(true)}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Corner Context Labels */}
                {effectivePct > 14 && (
                  <span className="pointer-events-none absolute left-3 sm:left-4 top-3 sm:top-4 rounded-lg bg-slate-950/80 backdrop-blur-xs px-3 py-1 text-xs font-semibold text-white shadow-xs">
                    Before · Dirty Workspace
                  </span>
                )}
                {effectivePct < 86 && (
                  <span className="pointer-events-none absolute right-3 sm:right-4 top-3 sm:top-4 rounded-lg bg-white/95 backdrop-blur-xs px-3 py-1 text-xs font-semibold text-sky-800 shadow-xs">
                    After · Spotless &amp; Sanitized
                  </span>
                )}

                {/* Draggable Vertical Split Line + Tactile Grip Handle */}
                {mode === 'split' && (
                  <div
                    className="pointer-events-none absolute inset-y-0"
                    style={{ left: `${effectivePct}%` }}
                  >
                    <div className="absolute inset-y-0 -translate-x-1/2 w-0.5 bg-white shadow-[0_0_12px_rgba(2,6,23,0.45)]" />
                    <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-sky-600 text-white ring-4 ring-white shadow-lg">
                      <ArrowLeftRight className="w-4 h-4" aria-hidden="true" />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 3-Column Hairline-Divided Sanitization Scope + Action Row */}
          <div className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-sky-100">
            {TRANSFORMATION_POINTS.map((point) => (
              <div key={point.index}>
                <p className="text-xs font-semibold text-sky-700 font-mono tabular-nums">
                  {point.index}. {point.title}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1.5">
                  {point.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Assurance & Commercial Quote CTA */}
          <div className="mt-6 pt-5 border-t border-sky-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-slate-600">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                <span>48-Point Photographic Sign-Off</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-sky-600" aria-hidden="true" />
                <span>Zero-VOC Botanical Formulas</span>
              </span>
            </div>

            <button
              type="button"
              onClick={onBookWorkspaceClean}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-sky-600 rounded-xl hover:bg-sky-500 active:scale-[0.99] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
            >
              <span>Book Workspace Clean</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
