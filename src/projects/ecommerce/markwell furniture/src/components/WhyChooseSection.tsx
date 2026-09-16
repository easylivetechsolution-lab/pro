import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Headphones, 
  Leaf, 
  Sliders,
  ArrowRight, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';
import { TESTIMONIALS } from '../data';
import boardroomImg from '../assets/images/boardroom_conference_wide_1789339388609.jpg';

interface WhyChooseSectionProps {
  onLearnMore: () => void;
}

export const WhyChooseSection: React.FC<WhyChooseSectionProps> = ({ onLearnMore }) => {
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  const [isTestimonialHovered, setIsTestimonialHovered] = useState(false);

  const nextTestimonial = () => {
    setActiveTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonialIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  // Auto-play slide movement every 4.5 seconds when not hovered
  useEffect(() => {
    if (isTestimonialHovered) return;
    const timer = setInterval(() => {
      setActiveTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isTestimonialHovered]);

  const currentTestimonial = TESTIMONIALS[activeTestimonialIndex];

  return (
    <section id="why-choose" className="w-full bg-[#081316] relative overflow-hidden select-none border-y border-stone-800/40">
      {/* Background Boardroom Photo & Seamless Gradients */}
      <div className="absolute inset-0 z-0">
        <img
          src={boardroomImg}
          alt="Modern Executive Boardroom"
          className="w-full h-full object-cover object-center"
        />
        {/* Left Dark Gradient Overlay for Crisp Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#081316] via-[#081316] via-35% md:via-[#081316]/95 md:via-42% to-[#081316]/25" />
        
        {/* Right Light Gradient Fade matching mockup */}
        <div className="absolute right-0 top-0 bottom-0 w-full sm:w-1/2 lg:w-2/5 bg-gradient-to-l from-white/95 via-white/70 to-transparent pointer-events-none hidden md:block" />
        <div className="absolute inset-0 bg-black/20 md:hidden" />
      </div>

      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-10 sm:py-12 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* Left Column: Why Choose MarkWell? and 2x2 Feature Pillars */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center">
            {/* Header */}
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-serif text-[#dfb880] tracking-normal leading-tight">
              Why Choose MarkWell?
            </h2>
            
            {/* Subtitle */}
            <p className="text-xs sm:text-[13px] text-stone-300 leading-relaxed mt-2.5 mb-7 max-w-lg">
              We're more than just a furniture supplier — we're your long-term partner in creating better workspaces.
            </p>

            {/* 4 Value Pillars in 2x2 Grid matching screenshot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-5 mb-7 max-w-xl">
              
              {/* Pillar 1: Premium Quality (Col 1, Row 1) */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full border border-[#dfb880]/60 flex items-center justify-center text-[#dfb880] shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-[13px] font-semibold text-white">
                    Premium Quality
                  </h4>
                  <p className="text-[11px] sm:text-xs text-stone-400 mt-0.5 leading-snug">
                    Trusted brands & craftsmanship
                  </p>
                </div>
              </div>

              {/* Pillar 2: Expert Support (Col 2, Row 1) */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full border border-[#dfb880]/60 flex items-center justify-center text-[#dfb880] shrink-0 mt-0.5">
                  <Headphones className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-[13px] font-semibold text-white">
                    Expert Support
                  </h4>
                  <p className="text-[11px] sm:text-xs text-stone-400 mt-0.5 leading-snug">
                    From selection to delivery.
                  </p>
                </div>
              </div>

              {/* Pillar 3: Flexible Solutions (Col 1, Row 2) */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full border border-[#dfb880]/60 flex items-center justify-center text-[#dfb880] shrink-0 mt-0.5">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-[13px] font-semibold text-white">
                    Flexible Solutions
                  </h4>
                  <p className="text-[11px] sm:text-xs text-stone-400 mt-0.5 leading-snug">
                    Scale, customize, and adapt
                  </p>
                </div>
              </div>

              {/* Pillar 4: Sustainability Focus (Col 2, Row 2) */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full border border-[#dfb880]/60 flex items-center justify-center text-[#dfb880] shrink-0 mt-0.5">
                  <Leaf className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-[13px] font-semibold text-white">
                    Sustainability Focus
                  </h4>
                  <p className="text-[11px] sm:text-xs text-stone-400 mt-0.5 leading-snug">
                    Better for your business and the planet.
                  </p>
                </div>
              </div>

            </div>

            {/* Learn More Button */}
            <div>
              <button
                onClick={onLearnMore}
                className="inline-flex items-center gap-2 bg-[#dfb880] hover:bg-[#d4a86b] text-stone-950 font-semibold text-xs sm:text-[13px] px-5 py-2.5 rounded-lg transition-colors shadow-sm cursor-pointer"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Center Space: Allows the conference room table, chairs, and potted greenery to be admired */}
          <div className="hidden lg:block lg:col-span-1 xl:col-span-1" />

          {/* Right Column: Floating White Testimonial Card matching screenshot */}
          <div className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end">
            <div 
              onMouseEnter={() => setIsTestimonialHovered(true)}
              onMouseLeave={() => setIsTestimonialHovered(false)}
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-stone-150/80 max-w-[430px] w-full flex flex-col justify-between transition-shadow duration-300 hover:shadow-2xl"
            >
              
              {/* Top: Avatar & Quote text */}
              <div className="flex items-start gap-4">
                <img
                  src={currentTestimonial.avatar}
                  alt={currentTestimonial.author}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover ring-2 ring-stone-100 shrink-0 shadow-sm"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-stone-800 text-xs sm:text-[13px] leading-relaxed font-normal">
                    <span className="text-[#dfb880] font-serif font-bold text-base sm:text-lg mr-1 inline-block select-none">
                      “
                    </span>
                    {currentTestimonial.quote}
                  </p>
                </div>
              </div>

              {/* Middle: Author Details with Navigation Arrows */}
              <div className="mt-5 pt-3 flex items-center justify-between">
                <button
                  onClick={prevTestimonial}
                  className="text-stone-400 hover:text-stone-700 p-1 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="text-center px-2">
                  <h4 className="text-xs sm:text-[13px] font-bold text-stone-900 leading-tight">
                    {currentTestimonial.author}
                  </h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    {currentTestimonial.role}, {currentTestimonial.company}
                  </p>
                </div>

                <button
                  onClick={nextTestimonial}
                  className="text-stone-400 hover:text-stone-700 p-1 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Bottom: Pagination Bar Indicators */}
              <div className="flex items-center justify-center gap-2 mt-3">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestimonialIndex(idx)}
                    className={`h-1 transition-all duration-200 cursor-pointer rounded-xs ${
                      activeTestimonialIndex === idx 
                        ? 'w-7 bg-stone-900' 
                        : 'w-4 bg-stone-300 hover:bg-stone-400'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

