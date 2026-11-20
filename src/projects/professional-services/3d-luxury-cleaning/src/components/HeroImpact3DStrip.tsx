import React, { useEffect, useRef, useState } from 'react';
import { Star } from 'lucide-react';
import { mountHeroImpactScene } from '../lib/heroImpactScene';

const AVATARS = [
  {
    src: '/aether-clean/src/assets/images/client_avatar_one_1794998020316.jpg',
    alt: 'Verified client Elena',
    delay: '0s',
  },
  {
    src: '/aether-clean/src/assets/images/client_avatar_two_1794998020186.jpg',
    alt: 'Verified client Marcus',
    delay: '0.35s',
  },
  {
    src: '/aether-clean/src/assets/images/client_avatar_three_1794998021306.jpg',
    alt: 'Verified client Claire',
    delay: '0.7s',
  },
  {
    src: '/aether-clean/src/assets/images/client_avatar_four_1794998021618.jpg',
    alt: 'Verified client David',
    delay: '1.05s',
  },
];

export const HeroImpact3DStrip: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const globeSlotRef = useRef<HTMLDivElement | null>(null);
  const starsSlotRef = useRef<HTMLDivElement | null>(null);
  const [webglFallback, setWebglFallback] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const globeSlot = globeSlotRef.current;
    const starsSlot = starsSlotRef.current;
    if (!container || !globeSlot || !starsSlot) return;

    const controller = mountHeroImpactScene(
      { container, globeSlot, starsSlot },
      () => setWebglFallback(true),
    );
    return () => {
      controller.dispose();
    };
  }, []);

  return (
    <div className="relative z-20 -mt-10 sm:-mt-14 lg:-mt-16 mx-auto w-full max-w-7xl px-4 sm:px-6">
      <div
        ref={containerRef}
        className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-stretch"
      >
        {/* CARD 1: 80+ WORLDWIDE + Animated Three.js Global Network Earth */}
        <div className="sm:col-span-2 lg:col-span-6 relative rounded-2xl">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[1] rounded-2xl border border-sky-200/80 bg-gradient-to-br from-sky-50 via-white to-blue-50/95 shadow-[0_18px_44px_rgba(15,23,42,0.12)] overflow-hidden"
          >
            {/* Subtle animated glass shimmer highlight */}
            <div className="hero-glass-shimmer absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-sky-200/35 to-transparent" />
          </div>

          <div className="relative z-10 grid grid-cols-12 items-center gap-3 sm:gap-4 p-4 sm:p-5 h-full">
            {/* Left transparent viewport slot aligned with Three.js 3D Globe */}
            <div className="col-span-5 flex items-center justify-center">
              <div
                ref={globeSlotRef}
                aria-label="Interactive 3D rotating Earth showing global cleaning coverage"
                className="w-full aspect-square max-h-[178px] sm:max-h-[196px]"
              />
            </div>

            {/* Right crisp white inner card */}
            <div className="col-span-7">
              <div className="rounded-xl sm:rounded-2xl bg-white border border-sky-100 p-4 sm:p-5 shadow-md">
                <p className="font-display text-2xl sm:text-[28px] font-extrabold tracking-tight text-slate-900 leading-none tabular-nums">
                  80+ WORLDWIDE
                </p>
                <p className="mt-2.5 text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                  A cleaning company specializing in large facilities and expansive windows
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 2: 5 Animated 3D Metallic Gold Stars + 4.9 Average Rating + 4 Floating Client Avatars */}
        <div className="lg:col-span-3 relative rounded-2xl">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[1] rounded-2xl border border-slate-800/80 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 shadow-[0_18px_44px_rgba(15,23,42,0.18)] overflow-hidden"
          >
            <div className="hero-glass-shimmer-slow absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-amber-200/15 to-transparent" />
          </div>

          <div className="relative z-10 flex h-full flex-col items-center justify-between px-5 py-5 text-center">
            {/* Transparent viewport slot aligned with 5 3D Beveled Gold Stars */}
            <div ref={starsSlotRef} className="w-full h-14 sm:h-16 flex items-center justify-center">
              {webglFallback && (
                <div className="flex items-center justify-center gap-1.5" aria-hidden="true">
                  {[0, 1, 2, 3, 4].map((idx) => (
                    <Star
                      key={idx}
                      className="w-5 h-5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="my-2">
              <p className="font-display text-lg sm:text-[19px] font-semibold text-white tracking-tight tabular-nums">
                4.9 Average Rating
              </p>
            </div>

            {/* 4 Live Animated Floating Circular Portraits */}
            <div className="mt-2 flex items-center justify-center -space-x-2.5">
              {AVATARS.map((avatar) => (
                <div
                  key={avatar.alt}
                  style={{ animationDelay: avatar.delay }}
                  className="hero-avatar-bob relative h-11 w-11 sm:h-12 sm:w-12 rounded-full overflow-hidden ring-2 ring-white/90 shadow-md bg-slate-200"
                >
                  <img
                    src={avatar.src}
                    alt={avatar.alt}
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CARD 3: IMPACT IN NUMBERS — 8000+ Completed Projects | 100% Client's Satisfaction */}
        <div className="lg:col-span-3 relative rounded-2xl">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[1] rounded-2xl border border-slate-800/80 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 shadow-[0_18px_44px_rgba(15,23,42,0.18)] overflow-hidden"
          >
            <div className="hero-glass-shimmer-slow absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-sky-200/15 to-transparent" />
          </div>

          <div className="relative z-10 flex h-full flex-col justify-between px-5 py-5">
            <p className="text-[11px] sm:text-xs font-bold tracking-[0.12em] text-white/95 uppercase">
              IMPACT IN NUMBERS
            </p>

            <div className="my-auto pt-4 grid grid-cols-2 divide-x divide-white/20 items-start">
              <div className="pr-3">
                <p className="font-display text-2xl sm:text-[28px] lg:text-[30px] font-extrabold tracking-tight text-white leading-none tabular-nums">
                  8,000+
                </p>
                <p className="mt-2 text-xs text-slate-200/95 leading-snug">
                  Completed Projects
                </p>
              </div>

              <div className="pl-4">
                <p className="font-display text-2xl sm:text-[28px] lg:text-[30px] font-extrabold tracking-tight text-white leading-none tabular-nums">
                  100%
                </p>
                <p className="mt-2 text-xs text-slate-200/95 leading-snug">
                  Client&apos;s Satisfaction
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
