import React, { useState } from 'react';
import { 
  ArrowRight, 
  Layers, 
  Compass, 
  Check, 
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import type { Product } from '../types';

interface FurnitureStyleItem {
  id: string;
  name: string;
  categoryName: string;
  price: number;
  image: string;
}

interface DesignTrend {
  id: string;
  name: string;
  tagline: string;
  description: string;
  philosophy: string;
  heroImage: string;
  palette: { name: string; hex: string }[];
  keyMaterials: string[];
  furnitureItems: FurnitureStyleItem[];
}

const DESIGN_TRENDS: DesignTrend[] = [
  {
    id: 'japandi',
    name: 'Japandi Organic Harmony',
    tagline: 'Where Scandinavian Functionalism Meets Japanese Wabi-Sabi Grace',
    description: 'Low horizontal profiles, bleached white oak, hand-woven papercord, and soft organic curvature that calms visual noise and fosters deep mental focus.',
    philosophy: 'Simplicity without sterility. Workspaces should feel organically grown and deeply restful.',
    heroImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    palette: [
      { name: 'Pale Birch', hex: '#ede6db' },
      { name: 'Warm Washi', hex: '#d9cfbf' },
      { name: 'Kyoto Clay', hex: '#b38b6d' },
      { name: 'Bamboo Moss', hex: '#5b6b55' },
    ],
    keyMaterials: ['Alpine European White Oak', 'Hand-Twisted Danish Papercord', 'Organic Linseed Wax', 'Honed Sandstone'],
    furnitureItems: [
      {
        id: 'jp-1',
        name: 'Kyoto Low-Profile Executive Desk',
        categoryName: 'Office Desks',
        price: 2450,
        image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'jp-2',
        name: 'Nara Papercord Ergonomic Swivel',
        categoryName: 'Seating',
        price: 1180,
        image: 'https://images.unsplash.com/photo-1580481077197-048737ff93c4?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'jp-3',
        name: 'Tatami Fluted Oak Wall Credenza',
        categoryName: 'Storage & Display',
        price: 1850,
        image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80',
      },
    ],
  },
  {
    id: 'brutalist',
    name: 'Brutalist Executive Luxury',
    tagline: 'Monolithic Massing, Honed Dark Stone & Architectural Precision',
    description: 'Uncompromising geometric presence, continuous bookmatched dark marble, smoked bog oak, and matte gunmetal frameworks designed to command boardroom presence.',
    philosophy: 'Unapologetic permanence and structural honesty that anchors decisions with resolute gravity.',
    heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    palette: [
      { name: 'Smoked Basalt', hex: '#23262a' },
      { name: 'Gunmetal Steel', hex: '#444b54' },
      { name: 'Unlacquered Brass', hex: '#c9963f' },
      { name: 'Honed Limestone', hex: '#ccc5b8' },
    ],
    keyMaterials: ['Nero Marquina Marble', 'Smoked European Bog Oak', 'Aircraft Matte Titanium', 'Tempered Fluted Glass'],
    furnitureItems: [
      {
        id: 'br-1',
        name: 'Basalt Monolith Standing Desk',
        categoryName: 'Executive Desks',
        price: 3600,
        image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'br-2',
        name: 'Gunmetal Cantilever Leather Armchair',
        categoryName: 'Lounge Chairs',
        price: 1650,
        image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'br-3',
        name: 'Smoked Oak Architecture Tower',
        categoryName: 'Storage',
        price: 2890,
        image: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&w=600&q=80',
      },
    ],
  },
  {
    id: 'biophilic',
    name: 'Biophilic Warmth & Living Wood',
    tagline: 'Living Walnut Edges, Flora Wells & Circadian Lighting Balance',
    description: 'Brings living botanical life and tactile natural grain into executive environments. Lowers daily cortisol levels while accelerating creative breakthrough.',
    philosophy: 'Human physiology thrives when surrounded by natural fractals, living greens, and authentic warm wood.',
    heroImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
    palette: [
      { name: 'Forest Emerald', hex: '#243a29' },
      { name: 'American Walnut', hex: '#523723' },
      { name: 'Raw Terracotta', hex: '#c77848' },
      { name: 'Warm Cream', hex: '#f7f3ea' },
    ],
    keyMaterials: ['Live-Edge Black Walnut', 'Self-Watering Flora Wells', 'Recycled Wool Acoustic Felt', 'Natural Beeswax Polish'],
    furnitureItems: [
      {
        id: 'bio-1',
        name: 'Live-Edge Walnut Dual-Motor Desk',
        categoryName: 'Ergonomic Desks',
        price: 2850,
        image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'bio-2',
        name: 'Modular Integrated Planter Credenza',
        categoryName: 'Storage & Greenery',
        price: 1920,
        image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'bio-3',
        name: 'BioAcoustic Wool Felt Task Seat',
        categoryName: 'Ergonomic Seating',
        price: 1250,
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80',
      },
    ],
  },
  {
    id: 'midcentury',
    name: 'Mid-Century Architectural Redux',
    tagline: 'Cantilevered Chrome, Cognac Aniline Saddle Leather & Bent Plywood',
    description: 'Iconic mid-century geometric balance re-engineered with modern aircraft-grade aluminum and certified zero-strain spinal ergonomics.',
    philosophy: 'Great modernist design never ages; it simply demands tighter engineering and higher-grade materials.',
    heroImage: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
    palette: [
      { name: 'Cognac Saddle', hex: '#a6591f' },
      { name: 'Polished Chrome', hex: '#dce4ec' },
      { name: 'Bauhaus Black', hex: '#161719' },
      { name: 'Rich Teak', hex: '#734421' },
    ],
    keyMaterials: ['Steam-Curved Rosewood Plywood', 'Full-Grain Tuscan Saddle Aniline', 'Seamless Mirror Chrome Tubing', 'Solid Walnut Accents'],
    furnitureItems: [
      {
        id: 'mc-1',
        name: 'Metropolitan Cantilever Lounge',
        categoryName: 'Executive Seating',
        price: 1850,
        image: 'https://images.unsplash.com/photo-1580481077197-048737ff93c4?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'mc-2',
        name: 'Teak Slat Architectural Media Console',
        categoryName: 'Credenzas',
        price: 2100,
        image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'mc-3',
        name: 'Tubular Chrome Dual-Arm Desk Lamp',
        categoryName: 'Lighting & Valet',
        price: 380,
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80',
      },
    ],
  },
];

interface DesignTrendsSectionProps {
  onSelectProduct?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

export const DesignTrendsSection: React.FC<DesignTrendsSectionProps> = ({ onSelectProduct, onAddToCart }) => {
  const [activeTrendId, setActiveTrendId] = useState<string>('japandi');
  const [selectedStyleItem, setSelectedStyleItem] = useState<FurnitureStyleItem | null>(null);

  const activeTrend = DESIGN_TRENDS.find((t) => t.id === activeTrendId) || DESIGN_TRENDS[0];

  const handleAddStyleItem = (item: FurnitureStyleItem) => {
    if (onAddToCart) {
      const prod: Product = {
        id: item.id,
        name: item.name,
        price: item.price,
        rating: 4.9,
        reviewCount: 22,
        category: 'handcrafted',
        image: item.image,
        description: `Featured in our 2026 ${activeTrend.name} collection. Handcrafted heirloom craftsmanship.`,
        features: [item.categoryName, activeTrend.name, 'Handcrafted Heirloom Build'],
        colors: [{ name: 'Default Finish', hex: activeTrend.palette[0].hex }]
      };
      onAddToCart(prod);
    }
  };

  return (
    <section id="design-trends" className="py-16 sm:py-20 lg:py-24 bg-[#faf8f5] border-b border-stone-200/80 relative overflow-hidden select-none">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-bold tracking-[0.24em] text-[#b86d1f] uppercase font-sans">
                2026 DESIGN DIRECTIONS &amp; STYLES
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal text-stone-900 tracking-tight leading-tight">
              Furniture Styles of Form &amp; Substance
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm mt-2 leading-relaxed">
              Explore four defining spatial design movements. Switch styles below to inspect visual moodboards, palette harmonies, and curated furniture sets.
            </p>
          </div>

          {/* Style Selector Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-white/90 backdrop-blur-md p-1.5 rounded-2xl border border-stone-200/90 shadow-xs">
            {DESIGN_TRENDS.map((trend) => {
              const isSelected = trend.id === activeTrend.id;
              return (
                <button
                  key={trend.id}
                  onClick={() => setActiveTrendId(trend.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  {trend.name.split(' ')[0]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Trend Showcase Board */}
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* Left Col: Hero Atmospheric Space Photo */}
            <div className="lg:col-span-6 relative min-h-[380px] lg:min-h-[520px] overflow-hidden group">
              <img
                src={activeTrend.heroImage}
                alt={activeTrend.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              
              {/* Bottom Inset Manifesto */}
              <div className="absolute bottom-6 left-6 right-6 z-10 text-white">
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-semibold border border-white/20 mb-2 inline-block">
                  Design Manifesto
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-normal leading-snug">
                  "{activeTrend.philosophy}"
                </h3>
              </div>
            </div>

            {/* Right Col: Style Details, Palette & Curated Furniture Trio */}
            <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white">
              <div>
                
                {/* Title & Tagline */}
                <div className="flex items-center justify-between gap-4 mb-2">
                  <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 font-normal">
                    {activeTrend.name}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm font-medium text-[#b86d1f]">
                  {activeTrend.tagline}
                </p>
                <p className="text-xs sm:text-sm text-stone-600 mt-2.5 leading-relaxed">
                  {activeTrend.description}
                </p>

                {/* Color Palette Swatches */}
                <div className="mt-5 pt-4 border-t border-stone-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-2">
                    Curated Material Palette:
                  </span>
                  <div className="flex items-center gap-3">
                    {activeTrend.palette.map((color, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <div 
                          className="w-5 h-5 rounded-full border border-black/15 shadow-xs" 
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="text-[11px] text-stone-600 font-medium">{color.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Curated Furniture Trio */}
                <div className="mt-6 pt-5 border-t border-stone-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-3">
                    Iconic Furniture Pieces for this Aesthetic:
                  </span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {activeTrend.furnitureItems.map((item) => (
                      <div 
                        key={item.id}
                        className="p-2.5 rounded-xl border border-stone-200/80 hover:border-[#b86d1f] hover:shadow-sm transition-all group/item flex flex-col justify-between bg-[#faf8f5]"
                      >
                        <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-stone-200 mb-2">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover/item:scale-105 transition-transform" />
                        </div>
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-stone-400 block">{item.categoryName}</span>
                          <h5 className="text-xs font-semibold text-stone-900 truncate">{item.name}</h5>
                          <span className="text-xs font-serif text-[#b86d1f] font-semibold">${item.price.toLocaleString()}</span>
                        </div>
                        <button
                          onClick={() => handleAddStyleItem(item)}
                          className="mt-2 w-full py-1.5 rounded-lg bg-stone-900 hover:bg-[#b86d1f] text-white text-[10px] font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Add to Suite</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Bottom Architectural Callout */}
              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs text-stone-500">
                  Materials: {activeTrend.keyMaterials.slice(0, 3).join(', ')}
                </span>
                <span className="text-xs font-semibold text-stone-900 flex items-center gap-1">
                  <span>Explore Style Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#b86d1f]" />
                </span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
