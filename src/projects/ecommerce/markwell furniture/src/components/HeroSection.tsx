import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Play, 
  Building2, 
  Truck, 
  ArrowDown, 
  ChevronLeft, 
  ChevronRight,
  Tag,
  Sliders,
  Pause,
  PlayCircle
} from 'lucide-react';
import type { Product } from '../types';
import heroExecutiveImg from '../assets/images/hero_executive_office_1789330679740.jpg';

interface HeroSectionProps {
  onExploreClick: () => void;
  onWatchStory: () => void;
  onViewProduct: (product: Product) => void;
  featuredProduct: Product;
}

const HERO_SLIDES = [
  {
    id: 1,
    title: 'Work Better.\nLive Healthier.',
    eyebrow: 'PREMIUM FURNITURE FOR MODERN WORKSPACES',
    description: 'Premium office, ergonomic and handcrafted furniture for businesses, teams and modern homes.',
    bgImage: heroExecutiveImg,
    tag: 'Executive Suite',
    featuredBadge: 'Best Selling',
    featuredTitle: 'Executive Desk',
    featuredSubtitle: 'Modern / Durable / Elegant',
  },
  {
    id: 2,
    title: 'Precision Ergonomics.\nUnmatched Focus.',
    eyebrow: 'SCIENTIFICALLY DESIGNED POSTURE SUPPORT',
    description: 'Dynamic reactive lumbar mechanics and aerospace-grade mesh engineered to eliminate fatigue.',
    bgImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2400&q=90',
    tag: 'Ergonomic Studio',
    featuredBadge: 'Most Ergonomic',
    featuredTitle: 'AeroFlow Pro Chair',
    featuredSubtitle: 'Dynamic Lumbar / 4D Armrests',
  },
  {
    id: 3,
    title: 'Handcrafted Heritage.\nBuilt for Generations.',
    eyebrow: 'MASTER ARTISAN WOODWORKING',
    description: 'Individually sculpted from FSC-certified sustainable hardwoods and full-grain Italian leather.',
    bgImage: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=2400&q=90',
    tag: 'Nordic Artisan',
    featuredBadge: 'Handcrafted Choice',
    featuredTitle: 'Redwood Lounge Chair',
    featuredSubtitle: 'Steam-Bent Cherry / Tuscan Leather',
  },
  {
    id: 4,
    title: 'Collaborative Vision.\nArchitectural Harmony.',
    eyebrow: 'COMMERCIAL ENTERPRISE SOLUTIONS',
    description: 'Integrated power hubs, acoustic materials, and scalable configurations for fast-growing teams.',
    bgImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=2400&q=90',
    tag: 'Enterprise Boardroom',
    featuredBadge: 'Architectural Choice',
    featuredTitle: 'Live-Edge Oak Table',
    featuredSubtitle: 'Pop-Up AC & USB-C / 10-Seater',
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onWatchStory,
  onViewProduct,
  featuredProduct,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slide = HERO_SLIDES[currentSlideIndex];

  // Automatic slide advance every 4.5 seconds
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused, currentSlideIndex]);

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  return (
    <section 
      id="hero"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative min-h-screen flex items-center justify-center pt-20 sm:pt-24 pb-16 overflow-hidden select-none"
    >
      {/* Dynamic Background Image - Clear, Bright, High-Definition Sunlit Space */}
      {HERO_SLIDES.map((s, idx) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlideIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          }`}
          style={{
            backgroundImage: `url(${s.bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 45%',
            filter: 'brightness(1.04) contrast(1.02)',
          }}
        />
      ))}

      {/* Localized Left Shading: keeps the left text razor sharp while leaving the center desk, chair, windows, and skyline clear and bright */}
      <div className="absolute inset-y-0 left-0 w-full lg:w-[56%] bg-gradient-to-r from-black/85 via-black/55 to-transparent z-10 pointer-events-none" />
      
      {/* Mobile/Tablet vertical gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent lg:hidden z-10 pointer-events-none" />

      {/* Top subtle navbar shadow */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/70 via-black/25 to-transparent z-10 pointer-events-none" />

      {/* Bottom subtle edge blend */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#090b0e] via-[#090b0e]/50 to-transparent z-10 pointer-events-none" />

      {/* Left Scroll Down Indicator matching screenshot */}
      <div 
        onClick={onExploreClick}
        className="hidden xl:flex absolute left-8 bottom-12 z-20 items-center gap-3 text-zinc-300 hover:text-[#f3ba77] transition-colors cursor-pointer text-[11px] font-medium tracking-[0.2em] uppercase [writing-mode:vertical-lr]"
      >
        <span>Scroll Down</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-8 flex flex-col justify-center max-w-3xl">
            
            {/* Eyebrow matching screenshot */}
            <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.22em] text-[#e2a466] uppercase font-sans">
                {slide.eyebrow}
              </span>
            </div>

            {/* Display Headline matching screenshot */}
            <h1 className="text-4xl sm:text-6xl xl:text-[68px] font-bold tracking-tight text-white leading-[1.08] mb-5 font-sans">
              {slide.title.split('\n').map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>

            {/* Subtitle matching screenshot */}
            <p className="text-base sm:text-lg text-zinc-200/90 font-normal leading-relaxed mb-8 max-w-xl">
              {slide.description}
            </p>

            {/* 3 Feature Badges matching screenshot: Icon in square box + 2 lines of text */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-9 max-w-2xl">
              
              {/* Badge 1: B2B & Wholesale */}
              <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/15 px-3.5 py-2.5 rounded-xl">
                <div className="w-8 h-8 rounded-lg border border-white/20 flex items-center justify-center shrink-0 text-[#e2a466]">
                  <Tag className="w-4 h-4" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-xs font-semibold text-white">B2B & Wholesale</span>
                  <span className="text-[11px] text-zinc-400">Pricing</span>
                </div>
              </div>

              {/* Badge 2: Custom Solutions */}
              <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/15 px-3.5 py-2.5 rounded-xl">
                <div className="w-8 h-8 rounded-lg border border-white/20 flex items-center justify-center shrink-0 text-[#e2a466]">
                  <Sliders className="w-4 h-4" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-xs font-semibold text-white">Custom Solutions</span>
                  <span className="text-[11px] text-zinc-400">for Your Workspace</span>
                </div>
              </div>

              {/* Badge 3: Fast Global Shipping */}
              <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/15 px-3.5 py-2.5 rounded-xl">
                <div className="w-8 h-8 rounded-lg border border-white/20 flex items-center justify-center shrink-0 text-[#e2a466]">
                  <Truck className="w-4 h-4" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-xs font-semibold text-white">Fast Global</span>
                  <span className="text-[11px] text-zinc-400">Shipping</span>
                </div>
              </div>

            </div>

            {/* CTA Buttons matching screenshot */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-5">
              {/* Primary Filled Warm Gold Button */}
              <button
                id="hero-explore-collection-btn"
                onClick={onExploreClick}
                className="group inline-flex items-center gap-2.5 bg-[#e2a466] hover:bg-[#efb57b] text-[#0f1115] font-semibold text-sm sm:text-base px-7 py-3 rounded-full shadow-lg shadow-black/30 transition-all duration-200 cursor-pointer"
              >
                <span>Explore Our Collection</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              {/* Secondary Button: Circle Outlined Play + Watch Our Story */}
              <button
                id="hero-watch-story-btn"
                onClick={onWatchStory}
                className="group inline-flex items-center gap-3 text-white font-medium text-sm sm:text-base px-2 py-2 cursor-pointer hover:text-[#e2a466] transition-colors"
              >
                <div className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center group-hover:border-[#e2a466] transition-colors">
                  <Play className="w-3.5 h-3.5 fill-white group-hover:fill-[#e2a466] transition-colors ml-0.5" />
                </div>
                <span>Watch Our Story</span>
              </button>
            </div>

          </div>

          {/* Right Hero Column: Floating Best Selling Capsule Card matching screenshot */}
          <div className="lg:col-span-4 flex items-center justify-center lg:justify-end mt-4 lg:mt-0">
            <div className="relative flex items-center">
              
              {/* Floating Dark Glass Card */}
              <div 
                onClick={() => onViewProduct(featuredProduct)}
                className="w-72 sm:w-80 bg-black/60 hover:bg-black/75 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl transition-all duration-300 cursor-pointer group"
              >
                <span className="text-xs font-medium text-zinc-300 block mb-1">
                  {slide.featuredBadge}
                </span>

                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#e2a466] transition-colors">
                  {slide.featuredTitle}
                </h3>

                <p className="text-xs text-zinc-400 mb-6 font-normal">
                  {slide.featuredSubtitle}
                </p>

                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewProduct(featuredProduct);
                  }}
                  className="inline-flex items-center gap-2 bg-[#e2a466] hover:bg-[#efb57b] text-black text-xs font-semibold px-5 py-2.5 rounded-full transition-colors cursor-pointer"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Right Carousel Next Button attached to card matching screenshot */}
              <button
                onClick={nextSlide}
                className="w-10 h-10 -ml-5 bg-black/70 hover:bg-black border border-white/25 hover:border-[#e2a466] text-white rounded-full flex items-center justify-center shadow-xl transition-all duration-200 cursor-pointer z-30 shrink-0"
                title="Next Slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom Right Slide Pagination matching screenshot: "— 01 ──── | 04 —>" */}
      <div className="absolute right-6 sm:right-12 bottom-8 z-20 flex items-center gap-4 bg-black/45 backdrop-blur-md border border-white/15 px-4 py-2 rounded-full">
        <button
          onClick={prevSlide}
          className="p-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          title="Previous Slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 font-mono text-xs text-zinc-300">
          <span>— 0{slide.id}</span>
          <div className="w-12 sm:w-16 h-[2px] bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#e2a466] transition-all duration-300"
              style={{ width: `${(slide.id / HERO_SLIDES.length) * 100}%` }}
            />
          </div>
          <span>| 0{HERO_SLIDES.length} —</span>
        </div>

        <button
          onClick={nextSlide}
          className="p-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          title="Next Slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </section>
  );
};
