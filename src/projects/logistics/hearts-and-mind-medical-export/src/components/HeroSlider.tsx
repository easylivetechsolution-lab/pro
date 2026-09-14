import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { HERO_SLIDES } from '../data/mockData';

interface HeroSliderProps {
  onRequestQuote: () => void;
  onViewCatalog: () => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  onRequestQuote,
  onViewCatalog
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Pre-load all 4 hero images for instant switching with zero flicker
  useEffect(() => {
    HERO_SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  // Strictly advance 1 -> 2 -> 3 -> 4 -> 1 smoothly every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative w-full min-h-[580px] sm:min-h-[620px] lg:min-h-[660px] flex flex-col justify-between overflow-hidden bg-[#071324] text-white">
      {/* 4 Background Images with Smooth Cross-Fade and Darkened Overlay */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          className="absolute inset-0 z-0"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center filter brightness-[1.05] contrast-[1.02]"
            loading="eager"
          />
          {/* Lighter base overlay for clarity */}
          <div className="absolute inset-0 bg-[#040d1a]/15 pointer-events-none" />
          {/* High-contrast directional gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#040d1a]/75 via-[#040d1a]/40 to-transparent w-full md:w-[70%] lg:w-[60%] pointer-events-none" />
          {/* Top & Bottom Vignettes */}
          <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#061224]/50 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#071324]/80 via-[#071324]/40 to-transparent pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* Soaring Cargo Aircraft in the Golden Sunset Sky */}
      <div className="absolute top-10 sm:top-14 right-8 sm:right-16 lg:right-24 z-10 pointer-events-none">
        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="flex flex-col items-end opacity-90 hover:opacity-100 transition-opacity"
        >
          {/* Jetliner SVG silhouette soaring in sky */}
          <div className="relative flex items-center justify-center">
            <svg 
              className="w-14 h-14 sm:w-16 sm:h-16 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] transform -rotate-[15deg]" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M22 16v-2l-8.5-5V3.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V9L2 14v2l8.5-2.5V19L8 20.5V22l4-1 4 1v-1.5L13.5 19v-5.5L22 16z"/>
            </svg>
            <div className="absolute right-12 top-7 w-20 h-0.5 bg-gradient-to-l from-white/60 to-transparent rounded-full blur-[0.5px]" />
          </div>
        </motion.div>
      </div>

      {/* Top Header Tagline */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 w-full flex justify-end">
        <div className="text-right">
          <span className="text-[11px] sm:text-xs md:text-sm font-bold tracking-widest text-slate-200 uppercase drop-shadow-md">
            GLOBAL MEDICAL SUPPLY DISTRIBUTION & LOGISTICS
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 w-full">
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Eyebrow / Brand Header in Cyan (No dots) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`badge-${slide.id}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="inline-flex items-center text-cyan-400 text-xs sm:text-sm font-extrabold tracking-widest uppercase mb-4"
            >
              <span>{slide.badge}</span>
            </motion.div>
          </AnimatePresence>

          {/* Headline (Crisp, High Contrast, Large Display Typography) */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={`title-${slide.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-white leading-[1.14] mb-5 drop-shadow-md"
            >
              {slide.title}
            </motion.h1>
          </AnimatePresence>

          {/* Subtitle / Paragraph */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`sub-${slide.id}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, delay: 0.16 }}
              className="text-sm sm:text-base md:text-lg text-slate-200 font-normal leading-relaxed mb-8 max-w-2xl drop-shadow-sm text-balance"
            >
              {slide.subtitle}
            </motion.p>
          </AnimatePresence>

          {/* CTAs (Side by Side) */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              id="hero-request-quote-button"
              onClick={onRequestQuote}
              className="px-6 sm:px-7 py-3.5 bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-sm sm:text-base rounded-lg shadow-lg shadow-sky-600/30 flex items-center gap-2.5 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-view-catalog-button"
              onClick={onViewCatalog}
              className="px-6 sm:px-7 py-3.5 bg-[#0b1b33]/80 hover:bg-[#122849] text-white border border-slate-600 hover:border-slate-400 font-semibold text-sm sm:text-base rounded-lg backdrop-blur-sm transition-all cursor-pointer"
            >
              View Supply Catalog
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
