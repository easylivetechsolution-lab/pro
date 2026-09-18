import React, { useState } from 'react';
import {
  Search,
  Filter,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  ThermometerSnowflake,
  PackageCheck,
  Info,
} from 'lucide-react';
import { FEATURED_PRODUCTS } from '../data';
import { ProductItem } from '../types';

interface ProductsPageProps {
  onRequestWholesale: (product: ProductItem) => void;
  onInspectBatch: (batchId: string) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  onRequestWholesale,
  onInspectBatch,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'Fruits', label: 'Citrus & Tree Fruits' },
    { id: 'Vegetables', label: 'Heirloom Vegetables' },
    { id: 'Grains', label: 'Ancient Grains & Pulses' },
    { id: 'Specialty Crops', label: 'Specialty Crops' },
  ];

  const filteredProducts = FEATURED_PRODUCTS.filter((prod) => {
    const matchesSearch =
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.originEstate.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' ||
      prod.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const seasonalMatrix = [
    { crop: 'Sunburst Cara Cara Oranges', peak: 'Nov – Mar', brix: '13.5°+', temp: '4°C – 6°C', packaging: '15kg Corrugated Carton' },
    { crop: 'Hass Estate Butter Avocados', peak: 'Year-Round', brix: '24% Dry Matter', temp: '5°C – 7°C', packaging: '4kg / 10kg Single Layer' },
    { crop: 'Crimson Ruby Strawberries', peak: 'Feb – Jul', brix: '11.8°+', temp: '0°C – 2°C', packaging: '250g Clamshell / 2kg Flat' },
    { crop: 'Heirloom Obsidian Tomatoes', peak: 'May – Oct', brix: '8.4°+', temp: '10°C – 12°C', packaging: '5kg Wooden Crates' },
    { crop: 'Golden Durum Heritage Grain', peak: 'Aug – Nov', brix: '15.2% Protein', temp: 'Dry Ambient', packaging: '25kg / 1,000kg Big Bags' },
  ];

  return (
    <div className="pt-24 pb-20 bg-[#061810] text-white min-h-screen">
      {/* 1. Hero Banner */}
      <section className="relative py-16 sm:py-24 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <span className="text-[#34d399] text-xs sm:text-sm font-semibold tracking-widest uppercase block">
              HARVEST PORTFOLIO
            </span>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white font-serif leading-[1.1]">
              Regenerative Harvests, <br />
              <span className="text-[#dfc599]">Uncompromised Flavor & Purity.</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed pt-2">
              Every crop is nurtured in living soil, harvested at physiological peak brix, and dispatched within 24 hours under temperature-controlled continuous cold chains to international wholesale partners.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Controls & Search Bar */}
      <section className="py-8 bg-[#04120b] border-b border-white/10 sticky top-16 z-30 backdrop-blur-md bg-[#04120b]/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search crops, variety, estate..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full bg-[#082216] border border-white/15 focus:border-[#dfc599] text-sm text-white placeholder-gray-400 focus:outline-none transition-colors"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#dfc599] text-[#091f13] shadow-md font-bold'
                      : 'bg-[#082216] text-gray-300 hover:bg-[#0c2f1f] hover:text-white border border-white/10'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Products Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 text-sm text-gray-300">
          <span>Showing <strong className="text-white">{filteredProducts.length}</strong> premium harvest varieties</span>
          <span className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> 100% GLOBALG.A.P & USDA ORGANIC
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-[#071f14] rounded-3xl border border-white/10 space-y-3">
            <Info className="w-10 h-10 text-gray-400 mx-auto" />
            <h3 className="text-lg font-bold text-white font-serif">No crops found matching criteria</h3>
            <p className="text-sm text-gray-300">Try adjusting your search keywords or clearing the category filter.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-2 px-5 py-2 rounded-full bg-[#dfc599] text-[#091f13] text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group rounded-3xl overflow-hidden bg-[#071f14] border border-white/10 hover:border-[#dfc599]/60 transition-all duration-300 flex flex-col justify-between shadow-xl"
              >
                {/* Product Image Box */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#04120a]">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  
                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-black/60 backdrop-blur-md text-white border border-white/10">
                      {product.category}
                    </span>
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#dfc599] text-[#091f13] shadow-md">
                      Yield: {product.yieldPerAcre}
                    </span>
                  </div>

                  {/* Bottom Image Estate Tag */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-emerald-300">
                    <span className="font-mono">{product.originEstate}</span>
                    <span className="text-gray-300 text-[11px] font-medium">{product.harvestSeason}</span>
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white font-serif group-hover:text-[#dfc599] transition-colors">
                        {product.name}
                      </h3>
                    </div>
                    <p className="text-xs text-emerald-400 font-medium">{product.subtitle}</p>
                    <p className="text-sm text-gray-300 leading-relaxed line-clamp-3">
                      {product.description}
                    </p>
                  </div>

                  {/* Certifications Strip */}
                  <div className="pt-2 border-t border-white/10 flex flex-wrap gap-1.5">
                    {product.certifications.map((cert) => (
                      <span
                        key={cert}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0b2b1c] text-emerald-300 border border-[#22c55e]/20"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>

                  {/* Card Actions */}
                  <div className="pt-4 flex items-center justify-between gap-3">
                    <button
                      onClick={() => onRequestWholesale(product)}
                      className="flex-1 py-2.5 px-4 rounded-full bg-[#dfc599] hover:bg-[#e8d5b2] text-[#091f13] font-bold text-xs uppercase tracking-wider transition-all duration-200 text-center shadow-md cursor-pointer"
                    >
                      Request Wholesale Specs
                    </button>
                    <button
                      onClick={() => onInspectBatch('AF-24157')}
                      className="p-2.5 rounded-full bg-[#092b1b] hover:bg-[#103a25] text-emerald-300 border border-[#22c55e]/30 transition-colors cursor-pointer"
                      title="Inspect Batch Telemetry"
                    >
                      <Sparkles className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. Seasonal Ripeness & Export Specs Table */}
      <section className="py-16 bg-[#04120a] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-[#34d399] text-xs sm:text-sm font-semibold tracking-widest uppercase block">
              COMMERCIAL EXPORT SPECIFICATIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif">
              Harvest Calendar & Cold-Chain Standards
            </h2>
            <p className="text-gray-300 text-sm">
              Standardized packaging and unbroken cold-chain protocols for international container air & sea freight.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#071f14] shadow-2xl">
            <table className="w-full text-left text-sm text-gray-300">
              <thead className="bg-[#05180f] text-xs font-mono uppercase text-[#dfc599] border-b border-white/10">
                <tr>
                  <th className="py-4 px-6">Crop Variety</th>
                  <th className="py-4 px-6">Peak Season Window</th>
                  <th className="py-4 px-6">Sugar / Maturity Metric</th>
                  <th className="py-4 px-6">Optimum Holding Temp</th>
                  <th className="py-4 px-6">Export Packaging Format</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {seasonalMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#0c2f1f]/50 transition-colors">
                    <td className="py-4 px-6 font-bold text-white font-serif">{row.crop}</td>
                    <td className="py-4 px-6 font-mono text-emerald-400">{row.peak}</td>
                    <td className="py-4 px-6">{row.brix}</td>
                    <td className="py-4 px-6 font-mono flex items-center gap-1.5 pt-4">
                      <ThermometerSnowflake className="w-3.5 h-3.5 text-sky-400" />
                      {row.temp}
                    </td>
                    <td className="py-4 px-6">{row.packaging}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};
