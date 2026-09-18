import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Sparkles, Scale, Calendar } from 'lucide-react';
import { FEATURED_PRODUCTS } from '../data';
import { ProductItem } from '../types';

interface HarvestShowcaseProps {
  onRequestWholesale: (product?: ProductItem) => void;
  onSelectProduct: (product: ProductItem) => void;
}

export const HarvestShowcase: React.FC<HarvestShowcaseProps> = ({
  onRequestWholesale,
  onSelectProduct,
}) => {
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % FEATURED_PRODUCTS.length);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + FEATURED_PRODUCTS.length) % FEATURED_PRODUCTS.length);
  };

  return (
    <section id="showcase" className="py-20 lg:py-28 bg-[#04110a] text-white relative overflow-hidden border-t border-[#c39953]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <h2
              id="showcase-heading"
              className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight font-serif"
            >
              Harvest Showcase
            </h2>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Premium quality. Exceptional value. Ready for global markets with strict cold-chain
              guarantees and phytosanitary certification.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="request-wholesale-btn"
              onClick={() => onRequestWholesale()}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#d8b06d] to-[#c39953] hover:from-[#e3c185] hover:to-[#cca35c] text-[#041009] text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-lg flex items-center gap-2"
            >
              <span>Request Wholesale Pricing</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Carousel Navigation Arrows */}
            <div className="flex items-center gap-1.5 ml-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-[#0d281a] hover:bg-[#133827] border border-white/10 flex items-center justify-center text-white transition-colors"
                aria-label="Previous Products"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-[#0d281a] hover:bg-[#133827] border border-white/10 flex items-center justify-center text-white transition-colors"
                aria-label="Next Products"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Product Cards Row (Matches image items: Wheat, Fresh Tomatoes, Avocados, Beef Cattle, Organic Herbs) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {FEATURED_PRODUCTS.map((product) => (
            <div
              key={product.id}
              id={`showcase-product-${product.id}`}
              onClick={() => onSelectProduct(product)}
              className="group relative rounded-2xl overflow-hidden bg-[#092217] border border-[#22c55e]/20 hover:border-[#c39953] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer flex flex-col justify-between"
            >
              {/* Product Photo */}
              <div className="relative aspect-square overflow-hidden bg-[#061810]">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80';
                  }}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#092217] via-transparent to-transparent" />

                <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono font-medium text-white border border-white/15">
                  {product.category}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-1 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-[#d8b06d] transition-colors truncate font-serif">
                    {product.name}
                  </h3>
                  <p className="text-xs text-emerald-400 truncate">
                    {product.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400">
                  <span>{product.originEstate.split(' ')[0]}</span>
                  <span className="text-[#d8b06d] font-semibold group-hover:underline">Inquire →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
