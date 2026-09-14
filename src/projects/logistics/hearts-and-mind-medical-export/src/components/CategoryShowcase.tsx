import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Search, 
  Syringe, 
  ShieldAlert, 
  Scissors, 
  TestTube,
  Sparkles
} from 'lucide-react';
import { CATEGORY_CARDS } from '../data/mockData';

interface CategoryShowcaseProps {
  onSelectCategory: (category: string) => void;
  onSearch: (query: string) => void;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
  onSelectCategory,
  onSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
      const catalogEl = document.getElementById('product-catalog');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'consumables':
        return <Syringe className="w-5 h-5 text-[#0284c7]" />;
      case 'ppe':
        return <ShieldAlert className="w-5 h-5 text-[#0284c7]" />;
      case 'surgical':
        return <Scissors className="w-5 h-5 text-[#0284c7]" />;
      case 'diagnostics':
        return <TestTube className="w-5 h-5 text-[#0284c7]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#0284c7]" />;
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section with Integrated Search */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#0284c7] uppercase">
              OUR PRODUCTS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0b1b33] tracking-tight mt-1 mb-2">
              Medical Supplies & Consumables
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl">
              High-quality, certified medical products sourced from audited manufacturers and delivered worldwide.
            </p>
          </div>

          {/* Search bar matching screenshot */}
          <form 
            onSubmit={handleSearchSubmit}
            className="flex items-center w-full lg:w-auto min-w-[320px] sm:min-w-[420px]"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for products (e.g., surgical masks, gloves...)"
                className="w-full pl-4 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:border-transparent text-slate-800 placeholder-slate-400"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#0b1b33] hover:bg-[#132849] text-white font-semibold text-sm rounded-r-lg transition-colors shrink-0"
            >
              Search
            </button>
          </form>
        </div>

        {/* 4 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORY_CARDS.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Product photo container */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    {getCategoryIcon(cat.id)}
                    <h3 className="font-bold text-base text-[#0b1b33] group-hover:text-[#0284c7] transition-colors">
                      {cat.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed min-h-[36px]">
                    {cat.description}
                  </p>
                </div>
              </div>

              {/* Browse Button matching reference image */}
              <div className="px-5 pb-5 pt-0">
                <button
                  onClick={() => onSelectCategory(cat.id)}
                  className="w-full py-2.5 px-4 bg-[#0b1b33] hover:bg-[#0284c7] text-white font-semibold text-xs rounded-lg flex items-center justify-center gap-2 transition-all group/btn shadow-sm"
                >
                  <span>Browse Category</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
