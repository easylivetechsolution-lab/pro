import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { CATEGORIES } from '../data';
import type { Category } from '../types';

interface CategorySectionProps {
  onSelectCategory: (categoryId: string) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ onSelectCategory }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Reliable fallback image
  const fallbackImage = 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80';

  // Triple set of categories for seamless circular scrolling
  const displayCategories = [...CATEGORIES, ...CATEGORIES, ...CATEGORIES];

  // Scroll by step (for control keys < and >)
  const scrollStep = useCallback((direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = 240; // width of card + gap
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    
    // Check seamless boundary before moving
    const oneSetWidth = container.scrollWidth / 3;
    if (direction === 'right' && container.scrollLeft >= oneSetWidth * 2) {
      container.scrollLeft -= oneSetWidth;
    } else if (direction === 'left' && container.scrollLeft <= 20) {
      container.scrollLeft += oneSetWidth;
    }

    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  }, []);

  // Initialize scroll position in the middle set for bidirectional infinite scrolling
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const oneSetWidth = container.scrollWidth / 3;
      container.scrollLeft = oneSetWidth;
    }
  }, []);

  // Smooth periodic auto-advance that glides to the next product without feeling sluggish or "dragging"
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      // Pause when hovered or actively dragging with mouse/hand
      if (isHovered || isMouseDown) return;

      const oneSetWidth = container.scrollWidth / 3;
      if (container.scrollLeft >= oneSetWidth * 2) {
        container.scrollLeft = oneSetWidth;
      }

      container.scrollBy({
        left: 235,
        behavior: 'smooth',
      });
    }, 3200);

    return () => clearInterval(interval);
  }, [isHovered, isMouseDown]);

  // Handle loop boundary check on manual scroll
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const oneSetWidth = container.scrollWidth / 3;
    if (container.scrollLeft >= oneSetWidth * 2.1) {
      container.scrollLeft -= oneSetWidth;
    } else if (container.scrollLeft <= 10) {
      container.scrollLeft += oneSetWidth;
    }
  };

  // Mouse Drag Handlers (Control with mouse)
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setIsMouseDown(true);
    setHasMoved(false);
    setStartX(e.pageX - container.offsetLeft);
    setScrollStart(container.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown) return;
    const container = scrollContainerRef.current;
    if (!container) return;

    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.35; // Responsive drag sensitivity
    if (Math.abs(walk) > 4) {
      setHasMoved(true);
    }
    container.scrollLeft = scrollStart - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsMouseDown(false);
  };

  const handleCardClick = (catId: string) => {
    // Only navigate if user did not drag
    if (!hasMoved) {
      onSelectCategory(catId);
    }
  };

  return (
    <section 
      id="categories" 
      className="py-12 sm:py-16 bg-[#faf8f5] text-[#161c24] relative overflow-hidden border-b border-stone-200/70 select-none"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="max-w-2xl">
            {/* Eyebrow in warm gold to match brand color flow */}
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c47f30]" />
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.24em] text-[#c47f30] uppercase font-sans">
                SHOP BY CATEGORY
              </span>
            </div>

            {/* Display Editorial Serif Title */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-normal text-[#121820] tracking-tight leading-tight mb-2">
              Explore Our Collections
            </h2>

            {/* Subtitle */}
            <p className="text-zinc-500 text-xs sm:text-[13px] font-normal leading-relaxed">
              From ergonomic chairs to handcrafted tables and architectural wardrobes, find the perfect pieces for your workspace or team.
            </p>
          </div>

          {/* Right Header Controls: Left/Right Control Keys + View All Categories */}
          <div className="flex items-center gap-3.5 self-start md:self-end shrink-0">
            {/* Navigation Control Keys (< and > buttons) */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollStep('left')}
                aria-label="Scroll left"
                title="Previous categories"
                className="w-9 h-9 rounded-full border border-stone-300/90 bg-white/90 hover:bg-white hover:border-stone-500 hover:text-black flex items-center justify-center text-stone-700 transition-all shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollStep('right')}
                aria-label="Scroll right"
                title="Next categories"
                className="w-9 h-9 rounded-full border border-stone-300/90 bg-white/90 hover:bg-white hover:border-stone-500 hover:text-black flex items-center justify-center text-stone-700 transition-all shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* View All Categories Link */}
            <button
              onClick={() => onSelectCategory('all')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-medium text-stone-800 hover:text-[#c47f30] group cursor-pointer transition-colors whitespace-nowrap ml-1"
            >
              <span>View All Categories</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1 text-[#c47f30]" />
            </button>
          </div>
        </div>

        {/* Layout: Fixed First Image on Left + Interactive Sliding Track on Right */}
        <div className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-5">
          
          {/* 1. FIRST IMAGE (Stays permanently fixed in place, increased width) */}
          <div 
            className="w-full lg:w-[380px] xl:w-[440px] 2xl:w-[480px] shrink-0 rounded-2xl overflow-hidden relative border border-stone-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.03)] group bg-stone-100 min-h-[230px] sm:min-h-[255px] lg:min-h-[270px] flex flex-col justify-between p-5 sm:p-6"
          >
            {/* Background Studio/Interior Photo featuring workspace furniture */}
            <img
              src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80"
              alt="Workspace Environment"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80';
              }}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Soft Ambient Gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-stone-900/60 via-stone-900/25 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-transparent to-stone-900/30 pointer-events-none" />

            {/* Top Pill Badge */}
            <div className="relative z-10 flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-white/50 text-[#1a1e24] shadow-xs">
              <span className="text-[11px] font-semibold tracking-wider uppercase">Curated Living & Work</span>
            </div>

            {/* Bottom Content within the fixed first image */}
            <div className="relative z-10 max-w-xs">
              <span className="text-[11px] uppercase tracking-widest text-[#f0ba78] font-bold block mb-1">
                2026 Collection
              </span>
              <h3 className="text-lg sm:text-xl font-serif text-white leading-snug drop-shadow-xs mb-2">
                Tables, Chairs & Wardrobes Built to Last
              </h3>
              <button
                onClick={() => onSelectCategory('all')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/90 hover:text-white group/btn transition-colors cursor-pointer"
              >
                <span className="underline underline-offset-4 decoration-[#c47f30]">Discover the Collection</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1 text-[#f0ba78]" />
              </button>
            </div>
          </div>

          {/* 2. INTERACTIVE CATEGORY CARDS TRACK (Supports Mouse Drag + Touch Swipe + Auto-Advance) */}
          <div 
            className="flex-1 min-w-0 relative overflow-hidden rounded-2xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              handleMouseUpOrLeave();
            }}
          >
            {/* Soft Fading Vignette Overlays */}
            <div className="absolute left-0 inset-y-0 w-8 sm:w-12 bg-gradient-to-r from-[#faf8f5] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 inset-y-0 w-12 sm:w-16 bg-gradient-to-l from-[#faf8f5] to-transparent z-10 pointer-events-none" />

            {/* Scroll Container with Touch / Mouse Drag support */}
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUpOrLeave}
              className={`flex gap-4 sm:gap-4.5 overflow-x-auto no-scrollbar py-1 scroll-smooth items-stretch h-full ${
                isMouseDown ? 'cursor-grabbing select-none' : 'cursor-grab'
              }`}
              style={{
                WebkitOverflowScrolling: 'touch',
                touchAction: 'pan-x',
              }}
            >
              {displayCategories.map((cat: Category, index: number) => (
                <div
                  key={`${cat.id}-${index}`}
                  onClick={() => handleCardClick(cat.id)}
                  className="w-48 sm:w-52 lg:w-56 shrink-0 bg-white rounded-2xl border border-stone-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:border-stone-300 transition-all duration-300 hover:-translate-y-1 flex flex-col group overflow-hidden"
                >
                  {/* Category Image (Chairs, Tables, Wardrobes) */}
                  <div className="w-full h-32 sm:h-36 bg-stone-100 overflow-hidden relative shrink-0">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      draggable={false}
                      onError={(e) => {
                        e.currentTarget.src = fallbackImage;
                      }}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 pointer-events-none"
                      loading="lazy"
                    />
                  </div>

                  {/* Card Bottom Details */}
                  <div className="p-3.5 sm:p-4 bg-white flex flex-col justify-between flex-1 pointer-events-none">
                    <div>
                      <h3 className="text-xs sm:text-[13px] font-semibold text-stone-900 group-hover:text-[#c47f30] transition-colors leading-tight">
                        {cat.title}
                      </h3>
                      <p className="text-[11px] text-stone-400 font-normal line-clamp-1 mt-1">
                        {cat.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between text-[11px] sm:text-xs text-stone-400 group-hover:text-stone-900 font-medium mt-3 pt-2 border-t border-stone-100 transition-colors">
                      <span className="text-[#c47f30] font-semibold group-hover:underline">Shop Now</span>
                      <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1 text-[#c47f30]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
