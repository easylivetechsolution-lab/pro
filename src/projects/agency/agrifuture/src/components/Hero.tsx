import React from 'react';
import { ArrowRight, Play, CloudSun, Compass } from 'lucide-react';
import { HERO_STATS } from '../data';

interface HeroProps {
  onExploreClick: () => void;
  onPartnerClick: () => void;
  onWatchStoryClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onPartnerClick,
  onWatchStoryClick,
}) => {
  return (
    <section
      id="home"
      className="relative isolate min-h-[92vh] lg:min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-8 sm:pb-12 overflow-hidden"
    >
      {/* Crystal Clear Panoramic Aerial Farm Estate Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/hero-estate.jpg"
          alt="Expansive sustainable agricultural estate with modern greenhouse facilities and reflecting pond at golden hour"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-[center_35%] brightness-[1.03] contrast-[1.02]"
        />
        {/* Natural gradient overlays for perfect text legibility on the left while preserving landscape brightness */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 via-45% to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#041009]/80 via-transparent to-black/35" />
      </div>

      {/* Top Bar: Weather & GPS Coordinates Capsule */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex justify-end mb-4">
        <div
          id="hero-weather-coordinates-badge"
          className="flex items-center gap-3.5 sm:gap-4 px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl bg-[#171c14]/75 backdrop-blur-md border border-[#c39953]/35 text-white shadow-2xl"
        >
          {/* Weather Info */}
          <div className="flex items-center gap-2.5">
            <CloudSun className="w-6 h-6 text-[#dfc599] flex-shrink-0" />
            <div className="leading-tight">
              <div className="font-bold text-sm sm:text-base text-white tracking-tight">24°C</div>
              <div className="text-[10px] sm:text-[11px] text-[#dfc599] font-medium">Partly Cloudy</div>
            </div>
          </div>

          {/* Thin Vertical Divider */}
          <div className="h-7 w-px bg-white/20" />

          {/* Location Coordinates */}
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#dfc599] flex-shrink-0" />
            <div className="leading-tight font-mono text-[10px] sm:text-[11px]">
              <div className="text-gray-200">12.5118° N</div>
              <div className="text-gray-300">77.1849° E</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content: Left-Aligned Editorial Typography & CTAs */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-auto py-6 sm:py-10">
        <div className="max-w-2xl space-y-5 sm:space-y-6">
          {/* Eyebrow */}
          <div
            id="hero-eyebrow"
            className="text-xs sm:text-[13px] font-semibold tracking-[0.22em] text-[#e0ded6] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          >
            SUSTAINABLE AGRICULTURE • GLOBAL IMPACT
          </div>

          {/* Main Display Headline */}
          <h1
            id="hero-main-title"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-white tracking-tight leading-[0.98] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            GROWING
            <br />
            WHAT'S NEXT.
          </h1>

          {/* Descriptive Subtitle Paragraph */}
          <p
            id="hero-subtitle"
            className="text-sm sm:text-base md:text-[17px] text-[#eae7dc] font-normal leading-relaxed max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
          >
            We cultivate premium crops, livestock and natural resources using innovation,
            sustainability and a deep respect for the land. From our farms to global markets,
            we're building a healthier, more food-secure future.
          </p>

          {/* Action Buttons */}
          <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              id="hero-explore-button"
              onClick={onExploreClick}
              className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#ebd8b7] hover:bg-[#dfc599] text-[#13271b] font-semibold text-xs sm:text-sm tracking-wide transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>Explore Our Agriculture</span>
              <ArrowRight className="w-4 h-4 text-[#13271b]" />
            </button>

            <button
              id="hero-partner-button"
              onClick={onPartnerClick}
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-transparent hover:bg-white/10 border border-[#ebd8b7]/70 hover:border-[#ebd8b7] text-white hover:text-[#ebd8b7] font-semibold text-xs sm:text-sm tracking-wide transition-all duration-200 shadow-lg cursor-pointer"
            >
              <span>Partner With Us</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Row: "Scroll to Explore" on Left & "Watch Our Story" on Right */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-4 flex items-center justify-between">
        {/* Bottom Left Scroll Indicator */}
        <a
          id="hero-scroll-indicator"
          href="#stats-banner"
          className="inline-flex items-center gap-2 text-[#cfccc2] hover:text-white transition-colors group cursor-pointer select-none"
        >
          <span className="text-[#ebd8b7] text-base leading-none font-bold group-hover:translate-y-0.5 transition-transform">
            ↓
          </span>
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] uppercase">
            SCROLL TO EXPLORE
          </span>
        </a>

        {/* Bottom Right Watch Story Play Action */}
        <button
          id="hero-watch-story-button"
          onClick={onWatchStoryClick}
          className="inline-flex items-center gap-3 text-white hover:text-[#ebd8b7] transition-colors group cursor-pointer"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/60 flex items-center justify-center bg-black/40 backdrop-blur-sm group-hover:border-[#ebd8b7] group-hover:scale-105 transition-all shadow-md">
            <Play className="w-3.5 h-3.5 fill-current ml-0.5 text-white group-hover:text-[#ebd8b7]" />
          </div>
          <span className="text-xs sm:text-sm font-medium tracking-wide">
            Watch Our Story
          </span>
        </button>
      </div>

      {/* Stats Row Banner Anchored Immediately Below Hero Fold */}
      <div id="stats-banner" className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative z-10">
        <div className="rounded-2xl bg-[#082015]/95 border border-[#22c55e]/20 p-6 shadow-2xl backdrop-blur-md">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {HERO_STATS.map((stat, idx) => (
              <div
                key={stat.label}
                id={`stat-card-${idx}`}
                className={`flex flex-col items-start ${idx !== 0 ? 'md:pl-6' : ''} ${
                  idx > 0 ? 'pt-4 md:pt-0' : ''
                }`}
              >
                <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-baseline gap-1">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#e5d2b0]">
                    {stat.value}
                  </span>
                </span>
                <span className="text-xs sm:text-sm font-semibold text-emerald-400 mt-1">
                  {stat.label}
                </span>
                <span className="text-[11px] text-gray-400 mt-0.5 leading-snug">
                  {stat.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
