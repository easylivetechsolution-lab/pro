import React from 'react';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { HeroImpact3DStrip } from './HeroImpact3DStrip';

interface HeroSectionProps {
  onStartQuote: () => void;
  onOpenConcierge: (prefill?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartQuote,
  onOpenConcierge,
}) => {
  return (
    <section
      id="top"
      className="relative w-full overflow-x-clip rounded-none shadow-none bg-transparent"
    >
      {/* Top Header Video Stage */}
      <div className="relative w-full min-h-[520px] lg:aspect-video lg:max-h-[820px] flex items-center overflow-hidden">
        {/* Full-bleed video layer with only the very last bottom strip feathered transparent */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none"
          style={{
            maskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)',
          }}
        >
          <video
            src="/assets/aistudio/gemini_generated_video_b5e0d7a3_8dd040ee.mp4"
            autoPlay
            muted
            loop
            playsInline
            aria-label="AetherClean specialist polishing panoramic glass window"
            className="w-full h-full object-cover object-center scale-[1.09]"
          />

          {/* Measured directional scrim for crisp WCAG AA legibility over left sky */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/28 to-transparent"
          />
        </div>

        {/* Clean Foreground Headline & Primary Actions over the video */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-24 pb-24 sm:pb-28 lg:pb-32">
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-wide text-sky-200 mb-3">
              San Francisco Bay Area · Residential &amp; Commercial Precision
            </p>

            <h1
              className="font-display font-bold tracking-tight text-white leading-[1.06] mb-4"
              style={{ fontSize: 'clamp(2.25rem, 4.1vw, 3.65rem)', textWrap: 'balance' }}
            >
              Spotless spaces, engineered around your schedule.
            </h1>

            <p className="text-sm md:text-base text-slate-100/95 leading-relaxed max-w-lg mb-7">
              Streak-free optical glass care and hospital-grade botanical sanitization by vetted W-2
              teams—paired with instant AI quoting and live automated dispatch.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onStartQuote}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                <span>Get Instant Quote</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => onOpenConcierge('Can you check open arrival windows this week?')}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-900 bg-white/95 hover:bg-white rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <MessageSquare className="w-4 h-4 text-sky-600" aria-hidden="true" />
                <span>Ask AI Concierge</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Single seamless light-white wash behind the impact cards with zero hard line */}
      <div className="relative z-20 flow-root pb-10 sm:pb-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-16 bottom-0 bg-gradient-to-b from-transparent via-white/55 to-transparent"
        />
        <HeroImpact3DStrip />
      </div>
    </section>
  );
};
