import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Image } from 'lucide-react';
import beforeWorkspaceImg from '../assets/images/workspace_before_dirty_1795009970689.jpg';
import afterWorkspaceImg from '../assets/images/workspace_after_exact_1795009998227.jpg';

interface BeforeAfterSectionProps {
  onBookWorkspaceClean: () => void;
}

const TRANSFORMATION_POINTS = [
  {
    index: '01',
    title: 'Streak-Free Glass & Displays',
    detail:
      'Lifted handprints, oils, and dust from glass partitions and workstation displays with a zero-residue botanical mist.',
  },
  {
    index: '02',
    title: 'Full Surface & Waste Reset',
    detail:
      'Cleared desk clutter, sanitized oak worktops, and disinfected chair armrests and high-touch surfaces.',
  },
  {
    index: '03',
    title: 'HEPA Extraction & Floor Finish',
    detail:
      'HEPA-extracted floor debris and refreshed the matte finish, leaving the studio clean and fragrance free.',
  },
];

export const BeforeAfterSection: React.FC<BeforeAfterSectionProps> = ({
  onBookWorkspaceClean,
}) => {
  const [beforeFailed, setBeforeFailed] = useState(false);
  const [afterFailed, setAfterFailed] = useState(false);

  const renderFallback = (kind: 'Before' | 'After') => (
    <div
      className={`w-full h-full flex flex-col items-center justify-center p-6 text-center ${
        kind === 'Before'
          ? 'bg-gradient-to-br from-slate-200 to-slate-300 text-slate-700'
          : 'bg-gradient-to-br from-sky-50 to-white text-sky-900'
      }`}
    >
      <Image className="w-8 h-8 mb-2 opacity-70" aria-hidden="true" />
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
        <div className="relative z-10 mx-auto mb-7 max-w-2xl py-3 text-center">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-12 -inset-y-4 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.52)_0%,rgba(15,23,42,0.22)_54%,transparent_80%)]"
          />
          <div className="mb-2 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-white/75" aria-hidden="true" />
            <p className="text-xs font-semibold tracking-[0.18em] text-white drop-shadow-[0_2px_8px_rgba(2,6,23,0.9)]">
              BEFORE &amp; AFTER TRANSFORMATION
            </p>
            <span className="h-px w-8 bg-white/75" aria-hidden="true" />
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white drop-shadow-[0_2px_14px_rgba(2,6,23,0.9)] sm:text-4xl">
            The Transformation
          </h2>
          <p className="mt-2 text-sm font-medium text-white drop-shadow-[0_2px_10px_rgba(2,6,23,0.9)]">
            Compare the workspace before and after its precision clean.
          </p>
        </div>
        <div className="rounded-3xl border border-sky-100 bg-white shadow-sm p-5 sm:p-7 lg:p-9">
          <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-7 sm:px-7 md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0">
            <figure className="relative aspect-[16/9] w-[84vw] max-w-[440px] shrink-0 snap-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 md:w-auto md:max-w-none md:snap-none">
              {beforeFailed ? (
                renderFallback('Before')
              ) : (
                <img
                  src={beforeWorkspaceImg}
                  alt="Bay Area glass-walled office workspace before cleaning with cluttered oak desk, stained cups, and smudged glass"
                  referrerPolicy="no-referrer"
                  onError={() => setBeforeFailed(true)}
                  className="h-full w-full object-cover"
                />
              )}
              <figcaption className="absolute left-3 top-3 rounded-lg bg-slate-950/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur-xs">
                Before
              </figcaption>
            </figure>

            <figure className="relative aspect-[16/9] w-[84vw] max-w-[440px] shrink-0 snap-center overflow-hidden rounded-2xl border border-sky-200 bg-sky-50 md:w-auto md:max-w-none md:snap-none">
              {afterFailed ? (
                renderFallback('After')
              ) : (
                <img
                  src={afterWorkspaceImg}
                  alt="Exact same Bay Area glass-walled office workspace after AetherClean deep sanitization with spotless oak table and crystal-clear glass"
                  referrerPolicy="no-referrer"
                  onError={() => setAfterFailed(true)}
                  className="h-full w-full object-cover"
                />
              )}
              <figcaption className="absolute right-3 top-3 rounded-lg bg-slate-950/80 px-3 py-1 text-xs font-semibold text-white shadow-xs backdrop-blur-xs">
                After
              </figcaption>
            </figure>
          </div>

          <div className="-mx-5 mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto border-t border-sky-100 px-5 pt-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-7 sm:px-7 md:mx-0 md:mt-7 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pt-6 md:pb-0">
            {TRANSFORMATION_POINTS.map((point) => (
              <div key={point.index} className="w-[78vw] max-w-[340px] shrink-0 snap-center rounded-xl border border-sky-100 bg-sky-50/70 p-4 md:w-auto md:max-w-none md:snap-none md:rounded-none md:border-0 md:bg-transparent md:p-0">
                <p className="font-mono text-xs font-semibold tabular-nums text-sky-700">
                  {point.index}. {point.title}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600 sm:text-sm">
                  {point.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-sky-100 pt-5">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-slate-600">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                <span>48-Point Photographic Sign-Off</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-sky-600" aria-hidden="true" />
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
