import React, { useState, useRef } from 'react';
import { 
  Heart, 
  Star, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight,
  Camera
} from 'lucide-react';
import type { Product } from '../types';
import { FEATURED_PRODUCTS } from '../data';

interface FeaturedProductsProps {
  onAddToCart: (product: Product, selectedColor?: string) => void;
  onToggleWishlist: (productId: string) => void;
  wishlist: string[];
  onQuickView: (product: Product) => void;
  selectedCategoryFilter?: string;
  onCategoryChange: (category: string) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  onAddToCart,
  onToggleWishlist,
  wishlist,
  onQuickView,
  selectedCategoryFilter,
  onCategoryChange,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeImageIndices, setActiveImageIndices] = useState<Record<string, number>>({});

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -260, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 260, behavior: 'smooth' });
    }
  };

  const handleNextCardImage = (e: React.MouseEvent, productId: string, totalImages: number) => {
    e.stopPropagation();
    setActiveImageIndices(prev => ({
      ...prev,
      [productId]: ((prev[productId] || 0) + 1) % totalImages,
    }));
  };

  const handlePrevCardImage = (e: React.MouseEvent, productId: string, totalImages: number) => {
    e.stopPropagation();
    setActiveImageIndices(prev => ({
      ...prev,
      [productId]: ((prev[productId] || 0) - 1 + totalImages) % totalImages,
    }));
  };

  const displayedProducts = FEATURED_PRODUCTS.filter((product) => {
    if (!selectedCategoryFilter || selectedCategoryFilter === 'all') return true;
    if (selectedCategoryFilter === 'handcrafted-furniture' || selectedCategoryFilter === 'handcrafted') {
      return product.category === 'handcrafted';
    }
    if (selectedCategoryFilter === 'office-desks') {
      return product.category === 'desks';
    }
    if (selectedCategoryFilter === 'ergonomic-chairs') {
      return product.category === 'chairs';
    }
    if (selectedCategoryFilter === 'conference-meeting') {
      return product.category === 'conference';
    }
    if (selectedCategoryFilter === 'storage-filing') {
      return product.category === 'storage';
    }
    return true;
  });

  return (
    <section id="featured-products" className="py-8 sm:py-10 lg:py-12 bg-[#faf9f6] border-b border-stone-200/70 relative select-none">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8 relative">
          
          {/* Left Info Block matching reference */}
          <div className="w-full lg:w-[260px] xl:w-[280px] shrink-0 flex flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-serif font-bold text-stone-900 tracking-tight leading-tight">
              Featured Products
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm mt-1.5 leading-relaxed">
              Discover our most popular office, ergonomic and handcrafted furniture pieces.
            </p>

            {selectedCategoryFilter && selectedCategoryFilter !== 'all' && (
              <div className="mt-2.5 flex items-center gap-1.5">
                <span className="text-xs font-semibold text-amber-900 bg-amber-100/80 px-2.5 py-0.5 rounded-full capitalize">
                  {selectedCategoryFilter.replace(/-/g, ' ')}
                </span>
                <button
                  onClick={() => onCategoryChange('all')}
                  className="text-xs text-stone-400 hover:text-stone-700 underline cursor-pointer"
                >
                  Clear
                </button>
              </div>
            )}

            {/* Subtle accent separator line */}
            <div className="w-8 h-[2px] bg-stone-300 mt-3 mb-2.5" />

            <button
              onClick={() => onCategoryChange('all')}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-900 hover:text-stone-600 transition-colors group cursor-pointer w-fit"
            >
              <span className="border-b border-stone-900 group-hover:border-stone-600 pb-0.5">
                View All Products ({FEATURED_PRODUCTS.length})
              </span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Carousel with Left (<) and Right (>) Navigation Buttons */}
          <div className="flex-1 relative flex items-center min-w-0">
            
            {/* Left Nav Arrow Button */}
            <button
              onClick={scrollLeft}
              className="absolute -left-3 sm:-left-4 z-20 w-9 h-9 rounded-full bg-white/95 backdrop-blur-xs border border-stone-200/90 shadow-[0_2px_10px_rgba(0,0,0,0.1)] hover:shadow-md hover:border-stone-400 flex items-center justify-center text-stone-700 hover:text-stone-950 transition-all cursor-pointer"
              aria-label="Previous products"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Horizontal Product Cards Container */}
            <div
              ref={scrollContainerRef}
              className="flex-1 flex gap-3.5 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth py-2 px-1 snap-x snap-mandatory"
            >
              {displayedProducts.map((product) => {
                const isWishlisted = wishlist.includes(product.id);
                const gallery = product.images && product.images.length > 0 
                  ? product.images 
                  : [product.image, ...(product.secondaryImage ? [product.secondaryImage] : [])];
                const activeIndex = activeImageIndices[product.id] || 0;
                const currentImg = gallery[activeIndex] || product.image;

                return (
                  <div
                    key={product.id}
                    className="w-[230px] sm:w-[250px] lg:w-[270px] shrink-0 bg-white rounded-xl border border-stone-200/85 p-3.5 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-stone-300 transition-all duration-300 group snap-start relative"
                  >
                    {/* Image Area with Multi-Angle Carousel and Badges */}
                    <div 
                      onClick={() => onQuickView(product)}
                      className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-[#f4f2ee] flex items-center justify-center cursor-pointer mb-2.5 group/imageContainer"
                    >
                      {product.isSale && (
                        <span className="absolute top-2 right-2 z-10 bg-stone-700/85 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-xs">
                          Sale
                        </span>
                      )}

                      {/* Photo count indicator pill */}
                      {gallery.length > 1 && (
                        <span className="absolute top-2 left-2 z-10 bg-black/50 backdrop-blur-xs text-white text-[9px] font-medium px-1.5 py-0.5 rounded flex items-center gap-1 opacity-0 group-hover/imageContainer:opacity-100 transition-opacity">
                          <Camera className="w-2.5 h-2.5" />
                          <span>{activeIndex + 1}/{gallery.length}</span>
                        </span>
                      )}
                      
                      <img
                        src={currentImg}
                        alt={`${product.name} angle ${activeIndex + 1}`}
                        className={`w-full h-full ${
                          product.id === 'ww-mesh-chair-01' && activeIndex < 4 ? 'object-contain p-2' : 'object-cover'
                        } transition-all duration-300 group-hover:scale-105`}
                        loading="lazy"
                      />

                      {/* Mini Prev/Next Arrow buttons on hover */}
                      {gallery.length > 1 && (
                        <>
                          <button
                            onClick={(e) => handlePrevCardImage(e, product.id, gallery.length)}
                            className="absolute left-1.5 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white/90 hover:bg-white text-stone-800 flex items-center justify-center shadow-md opacity-0 group-hover/imageContainer:opacity-100 transition-all duration-200 hover:scale-110"
                            aria-label="Previous image"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => handleNextCardImage(e, product.id, gallery.length)}
                            className="absolute right-1.5 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white/90 hover:bg-white text-stone-800 flex items-center justify-center shadow-md opacity-0 group-hover/imageContainer:opacity-100 transition-all duration-200 hover:scale-110"
                            aria-label="Next image"
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                    </div>

                    {/* Product Meta */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        {/* Title */}
                        <h3 
                          onClick={() => onQuickView(product)}
                          className="text-xs sm:text-[13px] font-semibold text-stone-900 group-hover:text-stone-700 transition-colors cursor-pointer truncate leading-snug"
                          title={product.name}
                        >
                          {product.name}
                        </h3>

                        {/* Price */}
                        <div className="mt-1 flex items-baseline gap-1.5">
                          <span className="text-xs sm:text-sm font-bold text-stone-900">
                            ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        </div>

                        {/* Rating & Review Count */}
                        <div className="flex items-center gap-1 mt-1">
                          <div className="flex text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className="w-2.5 h-2.5 fill-amber-400 text-amber-400" 
                              />
                            ))}
                          </div>
                          <span className="text-[11px] text-stone-400 font-mono">
                            ({product.reviewCount})
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons: Add to Cart + Heart */}
                      <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onAddToCart(product)}
                          className="flex-1 py-1.5 px-3 rounded-full bg-[#0d1b19] hover:bg-[#19322e] text-white text-xs font-semibold text-center transition-colors cursor-pointer shadow-xs active:scale-[0.98]"
                        >
                          Add to Cart
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleWishlist(product.id);
                          }}
                          className={`w-7 h-7 rounded-full border flex items-center justify-center transition-colors shrink-0 cursor-pointer ${
                            isWishlisted
                              ? 'border-rose-300 bg-rose-50 text-rose-500'
                              : 'border-stone-200 hover:border-stone-400 text-stone-400 hover:text-stone-600 bg-white'
                          }`}
                          title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                          aria-label="Wishlist"
                        >
                          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Right Nav Arrow Button */}
            <button
              onClick={scrollRight}
              className="absolute -right-3 sm:-right-4 z-20 w-9 h-9 rounded-full bg-white/95 backdrop-blur-xs border border-stone-200/90 shadow-[0_2px_10px_rgba(0,0,0,0.1)] hover:shadow-md hover:border-stone-400 flex items-center justify-center text-stone-700 hover:text-stone-950 transition-all cursor-pointer"
              aria-label="Next products"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
