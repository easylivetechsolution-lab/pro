import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  ShoppingBag, 
  Check, 
  Layers, 
  ShieldCheck, 
  Scissors, 
  FlaskConical, 
  Building2, 
  Package, 
  ChevronDown,
  ArrowRight
} from 'lucide-react';
import type { Product } from '../types';
import { PRODUCTS } from '../data/mockData';

interface ProductCatalogProps {
  onAddToRfq: (product: Product, quantity?: number) => void;
  onOpenRfq: () => void;
  onViewProductDetails: (product: Product) => void;
  onRequestPricing?: (product: Product) => void;
  onViewAllProducts?: () => void;
  rfqCount: number;
  initialCategory?: string;
  initialSearchQuery?: string;
  limit?: number;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onAddToRfq,
  onOpenRfq,
  onViewProductDetails,
  onRequestPricing,
  onViewAllProducts,
  rfqCount,
  initialCategory = 'all',
  initialSearchQuery = '',
  limit
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Categories', icon: Layers },
    { id: 'consumables', label: 'Medical Consumables', icon: Package },
    { id: 'ppe', label: 'PPE & Protective Gear', icon: ShieldCheck },
    { id: 'surgical', label: 'Surgical Tools & Equipment', icon: Scissors },
    { id: 'diagnostics', label: 'Diagnostics & Lab Supplies', icon: FlaskConical },
    { id: 'furniture', label: 'Hospital Furniture & Equipment', icon: Building2 },
  ];

  // Filter products
  const unfilteredCount = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = 
        !searchQuery.trim() ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.compliance.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    }).length;
  }, [selectedCategory, searchQuery]);

  const filteredProducts = useMemo(() => {
    const filtered = PRODUCTS.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = 
        !searchQuery.trim() ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.compliance.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
    return limit ? filtered.slice(0, limit) : filtered;
  }, [selectedCategory, searchQuery, limit]);

  const handleAddWithFeedback = (product: Product) => {
    onAddToRfq(product);
    setAddedAnimationId(product.id);
    setTimeout(() => {
      setAddedAnimationId(null);
    }, 1500);
  };

  return (
    <section id="product-catalog" className="py-12 sm:py-16 bg-[#f8fafc] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Left-aligned as in reference screenshot */}
        <div className="mb-6 sm:mb-8 max-w-3xl">
          <span className="text-xs font-bold tracking-widest text-[#0284c7] uppercase">
            PRODUCT CATALOG / RFQ HUB
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-extrabold text-[#0b1b33] tracking-tight mt-1 mb-2 leading-tight">
            Find Products. Request a Quote.
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-2xl">
            Browse our catalog of certified medical supplies and request institutional pricing through our RFQ system.
          </p>
        </div>

        {/* 2-Column Layout matching reference image */}
        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-7">
          
          {/* Left Column: Category Sidebar */}
          <div className="w-full lg:w-60 xl:w-64 shrink-0 space-y-2.5">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const IconComponent = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-[#071a33] text-white border-[#0c284d] shadow-sm'
                      : 'bg-white text-slate-700 hover:text-[#0284c7] hover:bg-slate-50 border-slate-200 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected 
                        ? 'bg-sky-500/20 text-[#00d2ff]' 
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold truncate">
                      {cat.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Top Bar + 4-Column Product Grid */}
          <div className="flex-1 min-w-0 w-full space-y-5">
            
            {/* Top Action Bar matching reference screenshot */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              
              {/* Integrated Search Input + Category Dropdown + Search Button */}
              <div className="flex-1 flex flex-col sm:flex-row items-stretch bg-white border border-slate-200 rounded-xl p-1 shadow-2xs">
                {/* Search Icon & Input */}
                <div className="relative flex-1 flex items-center px-3 min-h-[40px]">
                  <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2.5" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none bg-transparent"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="text-xs text-slate-400 hover:text-slate-600 px-1 font-bold"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* Vertical Divider */}
                <div className="hidden sm:block w-[1px] bg-slate-200 my-1.5" />

                {/* Category Dropdown */}
                <div className="relative flex items-center px-3 border-t sm:border-t-0 border-slate-100 min-w-[140px] sm:min-w-[155px]">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full text-xs sm:text-sm font-medium text-slate-700 bg-transparent appearance-none focus:outline-none pr-6 cursor-pointer py-2 sm:py-0"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 pointer-events-none" />
                </div>

                {/* Search Button */}
                <button
                  onClick={() => {}}
                  className="bg-[#071a33] hover:bg-[#0c284d] text-white text-xs sm:text-sm font-semibold px-5 py-2 rounded-lg transition-colors shrink-0 m-0.5 shadow-xs"
                >
                  Search
                </button>
              </div>

              {/* Right Tools: RFQ Basket + Building Icon matching screenshot */}
              <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
                <button
                  onClick={onOpenRfq}
                  className="flex items-center gap-2 px-3.5 sm:px-4 py-2.5 bg-white hover:bg-sky-50 text-[#0284c7] font-semibold text-xs sm:text-sm rounded-xl border border-[#0284c7] transition-all shadow-2xs"
                >
                  <ShoppingBag className="w-4 h-4 text-[#0284c7]" />
                  <span>RFQ Basket ({rfqCount})</span>
                </button>

                <button
                  onClick={onOpenRfq}
                  title="Institutional Catalog"
                  className="p-2.5 bg-white hover:bg-sky-50 text-[#0284c7] rounded-xl border border-[#0284c7] transition-all shadow-2xs flex items-center justify-center"
                >
                  <Building2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Product Cards Grid: 4 columns matching screenshot */}
            {filteredProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                  {filteredProducts.map((prod) => {
                  const isJustAdded = addedAnimationId === prod.id;
                  return (
                    <motion.div
                      key={prod.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between group"
                    >
                      <div>
                        {/* Top Image Container */}
                        <div className="relative h-44 w-full bg-white flex items-center justify-center p-3 overflow-hidden border-b border-slate-100">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>

                        {/* Card Body */}
                        <div className="p-4 pb-2">
                          <h3 className="font-bold text-sm text-[#0b1b33] mb-2 leading-snug line-clamp-2 min-h-[38px] group-hover:text-[#0284c7] transition-colors">
                            {prod.name}
                          </h3>

                          {/* Specs matching reference layout */}
                          <div className="space-y-1 text-xs text-slate-500 mb-2.5">
                            <p className="leading-tight">
                              <span className="text-slate-400">MOQ:</span>{' '}
                              <span className="font-medium text-slate-700">{prod.moq}</span>
                            </p>
                            <p className="leading-tight truncate" title={prod.packaging}>
                              <span className="text-slate-400">Packaging:</span>{' '}
                              <span className="font-medium text-slate-700">{prod.packaging}</span>
                            </p>
                            <p className="leading-tight">
                              <span className="text-slate-400">Compliance:</span>{' '}
                              <span className="font-medium text-slate-700">{prod.compliance.join(', ')}</span>
                            </p>
                          </div>

                          {/* Request Pricing Link matching reference screenshot */}
                          <div className="pt-1 mb-2">
                            <button
                              type="button"
                              onClick={() => onRequestPricing ? onRequestPricing(prod) : handleAddWithFeedback(prod)}
                              className="text-xs font-bold text-[#0284c7] hover:text-[#0369a1] inline-flex items-center relative pb-0.5 group/link cursor-pointer"
                            >
                              <span>Request Pricing</span>
                              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#0284c7] group-hover/link:bg-[#0369a1] transition-colors" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Action Buttons matching screenshot */}
                      <div className="p-4 pt-1 flex items-center gap-2 border-t border-slate-50">
                        <button
                          onClick={() => handleAddWithFeedback(prod)}
                          className={`flex-1 py-2 px-2 text-[11px] font-semibold rounded-lg text-center transition-all truncate ${
                            isJustAdded
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-[#071a33] hover:bg-[#0c284d] text-white shadow-xs'
                          }`}
                        >
                          {isJustAdded ? (
                            <span className="flex items-center justify-center gap-1">
                              <Check className="w-3 h-3" />
                              <span>Added</span>
                            </span>
                          ) : (
                            'Add to Quote Basket'
                          )}
                        </button>

                        <button
                          onClick={() => onViewProductDetails(prod)}
                          className="py-2 px-2.5 bg-white hover:bg-slate-50 text-slate-700 text-[11px] font-semibold rounded-lg border border-slate-200 text-center transition-all whitespace-nowrap shadow-2xs"
                        >
                          View Details
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

                {limit && unfilteredCount > limit && (
                  <div className="pt-6 text-center">
                    <button
                      onClick={onViewAllProducts}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#071a33] hover:bg-[#0c284d] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer"
                    >
                      <span>Explore All Products ({unfilteredCount})</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-xl p-10 text-center border border-slate-200">
                <Layers className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <h3 className="text-base font-bold text-[#0b1b33] mb-1">
                  No medical products found
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  We couldn't find items matching "{searchQuery}". Try searching for PPE, masks, or tests.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="px-3.5 py-1.5 bg-[#0284c7] text-white text-xs font-semibold rounded-lg shadow-xs"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

