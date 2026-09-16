import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { BLOG_POSTS } from '../data';
import type { BlogPost } from '../types';

interface BlogSectionProps {
  onReadPost: (post: BlogPost) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onReadPost }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -460 : 460;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Automatic sliding effect: advances horizontally every 3.5 seconds when not hovered
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        const maxScroll = scrollWidth - clientWidth;

        if (scrollLeft >= maxScroll - 20) {
          // Smoothly reset to beginning
          scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Scroll forward by one card + gap
          scrollContainerRef.current.scrollBy({ left: 440, behavior: 'smooth' });
        }
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [isHovered]);

  // Find individual posts for specific placement matching the reference layout
  const ergoPost = BLOG_POSTS.find((p) => p.id === 'blog-1') || BLOG_POSTS[0];
  const collabPost = BLOG_POSTS.find((p) => p.id === 'blog-collab') || BLOG_POSTS[1];
  const craftPost = BLOG_POSTS.find((p) => p.id === 'blog-2') || BLOG_POSTS[2];
  const remotePost = BLOG_POSTS.find((p) => p.id === 'blog-3') || BLOG_POSTS[3];

  return (
    <section id="blog" className="py-14 sm:py-18 lg:py-20 bg-white border-b border-stone-200/70 relative select-none">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-8 lg:gap-10">
          
          {/* Left Column: Heading & Subtitle */}
          <div className="lg:w-[300px] xl:w-[340px] shrink-0 flex flex-col justify-center">
            <span className="text-[11px] font-semibold tracking-wider text-amber-800 uppercase mb-2 block">
              Editorial Insights
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-serif text-stone-900 tracking-normal leading-[1.2]">
              From Our Blog &amp; Insights
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2.5 leading-relaxed">
              Tips, trends and ideas for better workspaces. Discover research-backed ergonomic strategies and craft stories.
            </p>

            {/* Carousel navigation chevrons & indicator */}
            <div className="flex items-center gap-3 mt-6">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => scroll('left')}
                  className="w-9 h-9 rounded-full border border-stone-300/80 bg-white hover:bg-stone-100 flex items-center justify-center text-stone-700 hover:text-stone-950 transition-colors shadow-2xs cursor-pointer"
                  aria-label="Previous blog articles"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scroll('right')}
                  className="w-9 h-9 rounded-full border border-stone-300/80 bg-white hover:bg-stone-100 flex items-center justify-center text-stone-700 hover:text-stone-950 transition-colors shadow-2xs cursor-pointer"
                  aria-label="Next blog articles"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => onReadPost(ergoPost)}
                className="ml-auto text-xs font-semibold text-stone-700 hover:text-stone-950 underline underline-offset-4 cursor-pointer"
              >
                View all
              </button>
            </div>
          </div>

          {/* Right Area: Horizontal Row of Cards with increased height and auto-sliding */}
          <div 
            ref={scrollContainerRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex-1 flex items-center gap-5 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth py-2"
          >
            
            {/* Card 1: The Benefits of Ergonomic Furniture */}
            <article 
              onClick={() => onReadPost(ergoPost)}
              className="min-w-[360px] sm:min-w-[430px] lg:min-w-[460px] h-[195px] sm:h-[215px] lg:h-[225px] bg-white hover:bg-stone-50/90 rounded-2xl border border-stone-200/90 p-4 sm:p-4.5 flex items-center gap-4 sm:gap-5 transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer group shrink-0"
            >
              <div className="w-32 sm:w-44 lg:w-48 h-full rounded-xl overflow-hidden bg-stone-200 shrink-0">
                <img
                  src={ergoPost.image}
                  alt={ergoPost.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex-1 min-w-0 h-full flex flex-col justify-between py-1">
                <div>
                  <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-amber-800 uppercase block mb-1">
                    {ergoPost.category}
                  </span>
                  <h3 className="text-xs sm:text-sm lg:text-[15px] font-bold text-stone-900 group-hover:text-amber-900 transition-colors line-clamp-2 leading-snug">
                    {ergoPost.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-stone-500 line-clamp-2 mt-1.5 leading-relaxed">
                    {ergoPost.snippet}
                  </p>
                </div>
                <div className="mt-2">
                  <span className="inline-flex items-center gap-1.5 bg-stone-100 group-hover:bg-[#dfb880]/20 text-stone-800 group-hover:text-amber-950 text-[11px] sm:text-xs font-medium px-3.5 py-1.5 rounded-lg transition-colors">
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </article>

            {/* Feature Image Card: Two colleagues collaborating at conference table */}
            <div 
              onClick={() => onReadPost(collabPost)}
              className="w-64 sm:w-76 lg:w-88 h-[195px] sm:h-[215px] lg:h-[225px] rounded-2xl overflow-hidden relative group cursor-pointer border border-stone-200/90 shrink-0 shadow-xs bg-stone-100"
            >
              <img
                src={collabPost.image}
                alt={collabPost.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
              <div className="absolute bottom-3 left-3.5 right-3.5">
                <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-amber-200 uppercase block mb-1">
                  Workplace Trends
                </span>
                <p className="text-xs sm:text-sm font-semibold text-white truncate drop-shadow-xs">
                  {collabPost.title}
                </p>
                <p className="text-[11px] text-stone-300 line-clamp-1 mt-0.5 opacity-90">
                  {collabPost.snippet}
                </p>
              </div>
            </div>

            {/* Card 3: How Handcrafted Furniture Adds Value to Your Workspace */}
            <article 
              onClick={() => onReadPost(craftPost)}
              className="min-w-[360px] sm:min-w-[430px] lg:min-w-[460px] h-[195px] sm:h-[215px] lg:h-[225px] bg-white hover:bg-stone-50/90 rounded-2xl border border-stone-200/90 p-4 sm:p-4.5 flex items-center gap-4 sm:gap-5 transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer group shrink-0"
            >
              <div className="w-32 sm:w-44 lg:w-48 h-full rounded-xl overflow-hidden bg-stone-200 shrink-0">
                <img
                  src={craftPost.image}
                  alt={craftPost.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex-1 min-w-0 h-full flex flex-col justify-between py-1">
                <div>
                  <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-amber-800 uppercase block mb-1">
                    {craftPost.category}
                  </span>
                  <h3 className="text-xs sm:text-sm lg:text-[15px] font-bold text-stone-900 group-hover:text-amber-900 transition-colors line-clamp-2 leading-snug">
                    {craftPost.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-stone-500 line-clamp-2 mt-1.5 leading-relaxed">
                    {craftPost.snippet}
                  </p>
                </div>
                <div className="mt-2">
                  <span className="inline-flex items-center gap-1.5 bg-stone-100 group-hover:bg-[#dfb880]/20 text-stone-800 group-hover:text-amber-950 text-[11px] sm:text-xs font-medium px-3.5 py-1.5 rounded-lg transition-colors">
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </article>

            {/* Card 4: Choosing the Right Furniture for Remote Teams */}
            <article 
              onClick={() => onReadPost(remotePost)}
              className="min-w-[360px] sm:min-w-[430px] lg:min-w-[460px] h-[195px] sm:h-[215px] lg:h-[225px] bg-white hover:bg-stone-50/90 rounded-2xl border border-stone-200/90 p-4 sm:p-4.5 flex items-center gap-4 sm:gap-5 transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer group shrink-0"
            >
              <div className="w-32 sm:w-44 lg:w-48 h-full rounded-xl overflow-hidden bg-stone-200 shrink-0">
                <img
                  src={remotePost.image}
                  alt={remotePost.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex-1 min-w-0 h-full flex flex-col justify-between py-1">
                <div>
                  <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-amber-800 uppercase block mb-1">
                    {remotePost.category}
                  </span>
                  <h3 className="text-xs sm:text-sm lg:text-[15px] font-bold text-stone-900 group-hover:text-amber-900 transition-colors line-clamp-2 leading-snug">
                    {remotePost.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-stone-500 line-clamp-2 mt-1.5 leading-relaxed">
                    {remotePost.snippet}
                  </p>
                </div>
                <div className="mt-2">
                  <span className="inline-flex items-center gap-1.5 bg-stone-100 group-hover:bg-[#dfb880]/20 text-stone-800 group-hover:text-amber-950 text-[11px] sm:text-xs font-medium px-3.5 py-1.5 rounded-lg transition-colors">
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </article>

          </div>

        </div>

      </div>
    </section>
  );
};
