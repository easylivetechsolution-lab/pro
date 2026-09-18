import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight, Check, Sparkles } from 'lucide-react';
import { PRODUCT_CATEGORIES } from '../data';

interface CropProductsProps {
  onSelectCategory: (categoryId: string) => void;
  onViewAllProducts: () => void;
}

export const CropProducts: React.FC<CropProductsProps> = ({
  onSelectCategory,
  onViewAllProducts,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="products" className="py-20 lg:py-28 bg-[#071911] text-white relative overflow-hidden">
      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:32px_32px] opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[#34d399] text-xs sm:text-sm font-semibold uppercase tracking-widest block">
              WHAT WE GROW
            </span>

            <h2
              id="crop-products-heading"
              className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight font-serif"
            >
              Premium Crops & Products
            </h2>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              From field to table, we grow a diverse range of high-quality crops and products,
              carefully nurtured for exceptional taste, nutrition and global demand.
            </p>
          </div>

          <div>
            <button
              id="view-all-products-btn"
              onClick={onViewAllProducts}
              className="px-5 py-2.5 rounded-full bg-[#0d281a] hover:bg-[#133827] border border-[#c39953]/40 hover:border-[#c39953] text-[#d8b06d] hover:text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 group whitespace-nowrap"
            >
              <span>View All Products</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* 6 Grid Cards as depicted in the image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {PRODUCT_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              id={`crop-card-${cat.id}`}
              onMouseEnter={() => setHoveredId(cat.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => onSelectCategory(cat.id)}
              className="group relative rounded-2xl overflow-hidden bg-[#0c261b] border border-[#22c55e]/20 hover:border-[#c39953] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald-950/80 cursor-pointer flex flex-col justify-between"
            >
              {/* Product Image with rounded capsule top framing */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80';
                  }}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c261b] via-[#0c261b]/30 to-transparent" />

                {/* Subtle top pill badge */}
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-medium text-white border border-white/15">
                  {cat.count}
                </div>
              </div>

              {/* Bottom Card Content */}
              <div className="p-4 pt-2 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white group-hover:text-[#d8b06d] transition-colors">
                    {cat.name}
                  </h3>
                  <div className="w-6 h-6 rounded-full bg-[#133827] group-hover:bg-[#c39953] text-[#34d399] group-hover:text-[#041009] flex items-center justify-center transition-all duration-300">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                <p className="text-[11px] text-gray-400 line-clamp-1 leading-snug">
                  {cat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
