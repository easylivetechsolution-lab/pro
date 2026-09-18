import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/remodelingData';

export const TestimonialsSection: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    setStartIndex((prev) => (prev > 0 ? prev - 1 : TESTIMONIALS.length - 3));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 3 < TESTIMONIALS.length ? prev + 1 : 0));
  };

  const visibleTestimonials = TESTIMONIALS.slice(startIndex, startIndex + 3);
  // In case visible is fewer than 3, loop around
  const displayItems = visibleTestimonials.length < 3
    ? [...visibleTestimonials, ...TESTIMONIALS.slice(0, 3 - visibleTestimonials.length)]
    : visibleTestimonials;

  return (
    <section id="reviews" className="py-24 sm:py-32 bg-[#F6F5F2] text-slate-900 relative overflow-hidden">
      {/* Subtle organic texture / warm backdrop */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-slate-500">
            TESTIMONIALS
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 font-serif">
            What Our Clients Say
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            We take pride in every project and our clients' satisfaction means everything.
          </p>
        </div>

        {/* Testimonials Carousel Container with side arrows matching screenshot */}
        <div className="relative">
          {/* Left arrow */}
          <button
            id="testimonial-prev-btn"
            onClick={handlePrev}
            className="hidden sm:flex absolute left-[-20px] lg:left-[-30px] top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-md border border-slate-200 hover:bg-[#e5a93c] hover:text-slate-950 hover:border-[#e5a93c] items-center justify-center text-slate-700 transition-all duration-200"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right arrow */}
          <button
            id="testimonial-next-btn"
            onClick={handleNext}
            className="hidden sm:flex absolute right-[-20px] lg:right-[-30px] top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-md border border-slate-200 hover:bg-[#e5a93c] hover:text-slate-950 hover:border-[#e5a93c] items-center justify-center text-slate-700 transition-all duration-200"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Cards Grid (3 cards matching the screenshot) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {displayItems.map((item) => (
              <div
                key={item.id}
                id={`testimonial-card-${item.id}`}
                className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-xl border border-slate-200/80 transition-all duration-300 flex flex-col justify-between relative group"
              >
                <div>
                  {/* Top Row: Avatar & Stars */}
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-13 h-13 rounded-full object-cover border-2 border-[#e5a93c]"
                    />
                    <div className="space-y-1">
                      {/* 5 Golden Stars */}
                      <div className="flex items-center gap-1 text-[#e5a93c]">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        Verified Homeowner
                      </span>
                    </div>
                  </div>

                  {/* Quote */}
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                    "{item.quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 tracking-wide">
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium">{item.role}</p>
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {item.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
