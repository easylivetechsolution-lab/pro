import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Play, Home, Star, Award, ChevronLeft, ChevronRight } from 'lucide-react';

import heroEstateImg from '../assets/images/hero_estate_twilight_1789529027867.jpg';
import heroInteriorImg from '../assets/images/hero_interior_living_1789529043057.jpg';
import heroBathImg from '../assets/images/hero_luxury_bath_1789529057200.jpg';
import heroTurfImg from '../assets/images/hero_resort_turf_1789529071624.jpg';
import { SignatureCallout } from './SignatureCallout';

interface HeroProps {
  onOpenQuote: () => void;
  onOpenVideo: () => void;
}

interface Slide {
  id: number;
  image: string;
  label: string;
  category: string;
}

const HERO_SLIDES: Slide[] = [
  {
    id: 0,
    image: heroEstateImg,
    label: 'Modern Craftsman Estate at Twilight',
    category: 'Full Exterior & Masonry Transformation',
  },
  {
    id: 1,
    image: heroInteriorImg,
    label: 'Open-Concept Living & Gourmet Kitchen',
    category: 'Luxury Interior Remodel',
  },
  {
    id: 2,
    image: heroBathImg,
    label: 'Primary Spa En-Suite & Master Bath',
    category: 'Curbless Marble & Glazing',
  },
  {
    id: 3,
    image: heroTurfImg,
    label: 'Resort Backyard, Turf & Outdoor Living',
    category: 'Synthetic Turf & Pool Pavilion',
  },
];

export const Hero: React.FC<HeroProps> = ({ onOpenQuote, onOpenVideo }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Automatic slide rotation every 5.5 seconds
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, currentSlide]);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  return (
    <section
      id="home"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative min-h-[92vh] sm:min-h-screen pt-24 sm:pt-28 pb-8 sm:pb-12 flex flex-col justify-between overflow-hidden bg-[#0B131E] select-none"
    >
      {/* 4 Automatic Sliding Hero Images */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.label}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover object-center brightness-[1.12] contrast-[1.05] saturate-[1.05] transition-transform duration-[7000ms] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
              />
            </div>
          );
        })}

        {/* Localized illumination gradients */}
        <div className="absolute inset-y-0 left-0 w-full sm:w-[58%] lg:w-[48%] z-10 bg-gradient-to-r from-[#0B131E]/90 via-[#0B131E]/50 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-24 z-10 bg-gradient-to-b from-[#0B131E]/60 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full sm:w-[56%] lg:w-[48%] h-28 z-10 bg-gradient-to-t from-[#0B131E]/85 to-transparent pointer-events-none" />
      </div>

      {/* Slide Navigation Arrow Controls (Sides) */}
      <div className="absolute inset-y-0 left-3 right-3 sm:left-6 sm:right-6 z-20 hidden sm:flex items-center justify-between pointer-events-none">
        <button
          onClick={handlePrevSlide}
          className="pointer-events-auto w-10 h-10 rounded-full bg-black/40 hover:bg-[#C07848] text-white hover:text-white border border-white/20 hover:border-[#C07848] backdrop-blur-md flex items-center justify-center transition-all duration-200 shadow-lg cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNextSlide}
          className="pointer-events-auto w-10 h-10 rounded-full bg-black/40 hover:bg-[#C07848] text-white hover:text-white border border-white/20 hover:border-[#C07848] backdrop-blur-md flex items-center justify-center transition-all duration-200 shadow-lg cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Main Hero Content Area */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-12 lg:pt-16 w-full">
        <div className="max-w-2xl sm:max-w-3xl space-y-5 sm:space-y-6">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2">
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase text-[#D28A5B] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              FIRMANS HOME EXTERIOR &amp; INTERIOR REMODELING
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-[70px] font-bold tracking-tight text-white leading-[1.06] drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
            Architectural Precision <br />
            Exterior &amp; Interior <br />
            <span
              style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }}
              className="font-normal italic text-[#D28A5B] drop-shadow-[0_2px_24px_rgba(192,120,72,0.5)] tracking-normal pr-2"
            >
              Transformations
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-[17px] text-slate-100 max-w-xl font-normal leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            From structural rooflines and custom fenestration to turnkey interior renovations, Firmans Home Exterior &amp; Interior Remodeling creates enduring spaces with master craftsmanship and fixed-fee peace of mind.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
            {/* Primary Button */}
            <button
              id="hero-get-quote-btn"
              onClick={onOpenQuote}
              className="group inline-flex items-center justify-center gap-2.5 bg-[#C07848] hover:bg-[#D28A5B] text-white font-semibold px-7 sm:px-8 py-3.5 rounded-full text-sm sm:text-base tracking-wide shadow-xl shadow-[#C07848]/25 transition-all duration-200 cursor-pointer"
            >
              <span>Request Consultation</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <span className="text-slate-400 text-sm font-light select-none px-1">
              or
            </span>

            {/* Watch Story Button */}
            <button
              id="hero-watch-story-btn"
              onClick={onOpenVideo}
              className="inline-flex items-center gap-3 text-white hover:text-[#D28A5B] group px-1 py-1 transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full border border-white/40 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-[#C07848] group-hover:text-white group-hover:border-[#C07848] group-hover:scale-105 transition-all duration-200">
                <Play className="w-4 h-4 ml-0.5 fill-current" />
              </div>
              <span className="text-sm font-medium tracking-wide text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                Watch Firmans Film
              </span>
            </button>
          </div>

          {/* Slide Indicator Bar */}
          <div className="pt-1 flex items-center gap-3">
            <div className="flex items-center gap-2.5 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#D28A5B]">
                {HERO_SLIDES[currentSlide].category}
              </span>
              <span className="text-white/30 text-xs">|</span>
              <div className="flex items-center gap-1.5">
                {HERO_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === currentSlide
                        ? 'w-5 bg-[#C07848]'
                        : 'w-1.5 bg-white/40 hover:bg-white/70'
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Trust Badges on the LEFT, Signature on RIGHT */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-12 sm:mt-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-2">
          {/* Trust Badges */}
          <div
            id="hero-trust-bar"
            className="flex flex-wrap items-center gap-6 sm:gap-10 divide-y sm:divide-y-0 sm:divide-x divide-white/20"
          >
            {/* Badge 1 */}
            <div className="flex items-center gap-3.5 pt-2 sm:pt-0">
              <div className="w-11 h-11 rounded-full border border-[#C07848]/60 bg-[#0B131E]/80 flex items-center justify-center text-[#C07848] shrink-0 shadow-lg">
                <Home className="w-5 h-5 stroke-[1.8]" />
              </div>
              <div>
                <div className="text-lg sm:text-xl font-bold text-white tracking-tight leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  420+
                </div>
                <div className="text-xs text-slate-300 font-medium mt-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                  Homes Transformed
                </div>
              </div>
            </div>

            {/* Badge 2 */}
            <div className="flex items-center gap-3.5 pt-2 sm:pt-0 pl-0 sm:pl-10">
              <div className="w-11 h-11 rounded-full border border-[#C07848]/60 bg-[#0B131E]/80 flex items-center justify-center text-[#C07848] shrink-0 shadow-lg">
                <Star className="w-5 h-5 fill-[#C07848] stroke-[1.5]" />
              </div>
              <div>
                <div className="text-lg sm:text-xl font-bold text-white tracking-tight leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  5-Star
                </div>
                <div className="text-xs text-slate-300 font-medium mt-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                  Client Rating
                </div>
              </div>
            </div>

            {/* Badge 3 */}
            <div className="flex items-center gap-3.5 pt-2 sm:pt-0 pl-0 sm:pl-10">
              <div className="w-11 h-11 rounded-full border border-[#C07848]/60 bg-[#0B131E]/80 flex items-center justify-center text-[#C07848] shrink-0 shadow-lg">
                <Award className="w-5 h-5 stroke-[1.8]" />
              </div>
              <div>
                <div className="text-lg sm:text-xl font-bold text-white tracking-tight leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  18+ Years
                </div>
                <div className="text-xs text-slate-300 font-medium mt-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                  Architectural Practice
                </div>
              </div>
            </div>
          </div>

          {/* Signature */}
          <div className="flex justify-end self-end lg:pr-2 select-none pb-1 sm:pb-2">
            <SignatureCallout />
          </div>
        </div>
      </div>
    </section>
  );
};
