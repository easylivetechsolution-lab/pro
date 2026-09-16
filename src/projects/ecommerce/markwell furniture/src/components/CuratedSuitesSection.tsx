import React, { useState } from 'react';
import { 
  Check, 
  ArrowRight, 
  Plus, 
  ShoppingBag, 
  ShieldCheck, 
  Truck,
  Layers
} from 'lucide-react';
import type { Product } from '../types';

// Curated Suite Definitions with relatable products
interface SuiteProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  spec: string;
}

interface WorkspaceSuite {
  id: string;
  name: string;
  tagline: string;
  description: string;
  badge: string;
  savings: number;
  totalPrice: number;
  originalTotal: number;
  heroImage: string;
  items: SuiteProduct[];
}

const WORKSPACE_SUITES: WorkspaceSuite[] = [
  {
    id: 'suite-executive',
    name: 'The C-Suite Executive Sanctuary',
    tagline: 'Solid French Walnut & Top-Grain Aniline Leather',
    description: 'Designed for senior leadership. Pairs a monumental executive desk with an all-day lumbar leather chair and a fluted storage credenza.',
    badge: 'Most Popular Bundle',
    savings: 560,
    totalPrice: 4290,
    originalTotal: 4850,
    heroImage: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
    items: [
      {
        id: 'ww-exec-desk-01',
        name: 'The Chancellor Monumental Executive Desk',
        category: 'Executive Desk (72" × 34")',
        price: 2650,
        image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=600&q=80',
        spec: 'Solid French Black Walnut • Integrated Cable Conduit',
      },
      {
        id: 'ww-chair-exec-01',
        name: 'The Sovereign High-Back Leather Task Chair',
        category: 'Ergonomic Seating',
        price: 1150,
        image: 'https://images.unsplash.com/photo-1580481077197-048737ff93c4?auto=format&fit=crop&w=600&q=80',
        spec: 'Tuscan Full-Grain Leather • 4D Synchro-Tilt Mechanism',
      },
      {
        id: 'ww-credenza-01',
        name: 'Fluted Smoked Oak Architectural Credenza',
        category: 'Storage & Display (60")',
        price: 1050,
        image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80',
        spec: 'Soft-Close Tambour Slats • File Drawer Organizer',
      },
    ],
  },
  {
    id: 'suite-ergonomic',
    name: 'The Active Performance Ergonomic Pod',
    tagline: 'Dual-Motor Standing Desk & 3D Bionic Task Mesh',
    description: 'Optimized for high-output engineering and creative work. Promotes seamless transitions between sitting and standing postures.',
    badge: 'Ergonomic Certified',
    savings: 390,
    totalPrice: 2480,
    originalTotal: 2870,
    heroImage: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80',
    items: [
      {
        id: 'ww-standing-desk-01',
        name: 'Apex Dual-Motor Electric Standing Desk',
        category: 'Sit-Stand Desk (60" × 30")',
        price: 1390,
        image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=600&q=80',
        spec: 'Solid White Oak Top • 4 Memory Heights • Whisper Quiet',
      },
      {
        id: 'ww-mesh-chair-01',
        name: 'ErgoPro 3D Bionic Lumbar Mesh Chair',
        category: 'Ergonomic Chair',
        price: 920,
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80',
        spec: 'Dynamic Self-Adjusting Spine • Breathable Aeromesh',
      },
      {
        id: 'ww-monitor-arm-01',
        name: 'Dual Articulating Aluminum Monitor Arm',
        category: 'Ergonomic Accessory',
        price: 560,
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80',
        spec: 'Gas-Spring Counterbalance • Integrated USB Hub',
      },
    ],
  },
  {
    id: 'suite-creative',
    name: 'The Modernist Studio Atelier',
    tagline: 'Minimalist Alpine Oak, Floating Storage & Brass Accents',
    description: 'Clean geometry and warm tactile natural materials designed to clear visual clutter and elevate design thinking.',
    badge: 'Designer Choice',
    savings: 420,
    totalPrice: 3190,
    originalTotal: 3610,
    heroImage: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
    items: [
      {
        id: 'ww-desk-atelier-01',
        name: 'Atelier Solid Oak Writing Desk with Drawer',
        category: 'Studio Desk (64" × 28")',
        price: 1750,
        image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=600&q=80',
        spec: 'FSC European Alpine Oak • Felt-Lined Tool Drawer',
      },
      {
        id: 'ww-chair-cantilever-01',
        name: 'Bauhaus Cantilever Leather Swivel Chair',
        category: 'Architectural Seating',
        price: 980,
        image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&q=80',
        spec: 'Tubular Mirror Chrome • Cognac Saddle Leather',
      },
      {
        id: 'ww-valet-lamp-01',
        name: 'Architect Solid Brass Task Lamp & Valet',
        category: 'Lighting & Organization',
        price: 880,
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80',
        spec: '95+ CRI Color-True LED • Qi Wireless Charging Pad',
      },
    ],
  },
];

interface CuratedSuitesSectionProps {
  onAddToCart?: (product: Product) => void;
}

export const CuratedSuitesSection: React.FC<CuratedSuitesSectionProps> = ({ onAddToCart }) => {
  const [activeSuiteId, setActiveSuiteId] = useState('suite-executive');
  const [addedSuite, setAddedSuite] = useState(false);

  const activeSuite = WORKSPACE_SUITES.find((s) => s.id === activeSuiteId) || WORKSPACE_SUITES[0];

  const handleAddSuiteToCart = () => {
    if (!onAddToCart) return;

    // Add each product in the suite to cart
    activeSuite.items.forEach((item) => {
      const prod: Product = {
        id: item.id,
        name: item.name,
        price: item.price,
        rating: 5.0,
        reviewCount: 28,
        category: 'desks',
        image: item.image,
        description: `Part of ${activeSuite.name}. ${item.spec}`,
        features: [item.category, item.spec, 'Part of Curated Suite Bundle'],
        colors: [{ name: 'Standard Finish', hex: '#3d2b1f' }],
      };
      onAddToCart(prod);
    });

    setAddedSuite(true);
    setTimeout(() => setAddedSuite(false), 2500);
  };

  return (
    <section id="curated-suites" className="bg-[#f6f2ec] border-t border-b border-[#ded7cc] py-10 sm:py-12 lg:py-14 relative overflow-hidden select-none">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Suite Selector Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6">
          <div>
            <span className="text-[11px] font-bold tracking-[0.24em] text-[#9b5814] uppercase font-sans block mb-1">
              CURATED WORKSPACE PACKAGES
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 tracking-tight leading-snug">
              Complete Coordinated Suites, Built to Harmonize
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1.5 leading-relaxed max-w-xl">
              Eliminate guesswork. Each suite coordinates desktop, ergonomic seating, and architectural storage with bundle savings up to $560.
            </p>
          </div>

          {/* Suite Selector Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-white p-1 rounded-2xl border border-[#ded7cc] shadow-xs">
            {WORKSPACE_SUITES.map((suite) => {
              const isSelected = suite.id === activeSuite.id;
              return (
                <button
                  key={suite.id}
                  onClick={() => setActiveSuiteId(suite.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <span>{suite.name.split(' ')[1]} Suite</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* The Coordinated Suite Box */}
        <div className="bg-white rounded-3xl border border-[#ded7cc] shadow-sm p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left: Suite Overview & Pricing Card */}
            <div className="lg:col-span-4 flex flex-col justify-between h-full">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 text-amber-950 text-[11px] font-semibold mb-3">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-800" />
                  <span>{activeSuite.badge}</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 leading-snug">
                  {activeSuite.name}
                </h3>
                <p className="text-xs sm:text-[13px] text-[#9b5814] font-medium mt-1">
                  {activeSuite.tagline}
                </p>
                <p className="text-xs text-stone-600 mt-2.5 leading-relaxed">
                  {activeSuite.description}
                </p>

                {/* Price & Bundle Discount */}
                <div className="mt-6 pt-5 border-t border-stone-100">
                  <span className="text-[11px] text-stone-500 block mb-1">Complete 3-Piece Package:</span>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-3xl font-serif font-bold text-stone-900">
                      ${activeSuite.totalPrice.toLocaleString()}
                    </span>
                    <span className="text-sm text-stone-400 line-through">
                      ${activeSuite.originalTotal.toLocaleString()}
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100/90 px-2.5 py-0.5 rounded-full">
                      Save ${activeSuite.savings}
                    </span>
                  </div>
                </div>

                {/* Assurance notes */}
                <div className="mt-5 space-y-2 text-[11px] text-stone-500">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Free White-Glove Room Delivery &amp; Unboxing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>30-Day Risk-Free Executive Trial in your space</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>10-Year Commercial Structural Warranty</span>
                  </div>
                </div>
              </div>

              {/* Add Complete Suite CTA Button */}
              <div className="mt-7">
                <button
                  onClick={handleAddSuiteToCart}
                  className={`w-full py-3 px-5 rounded-xl font-bold text-xs sm:text-[13px] uppercase tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                    addedSuite
                      ? 'bg-emerald-700 text-white'
                      : 'bg-stone-900 hover:bg-[#9b5814] text-white'
                  }`}
                >
                  {addedSuite ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>All 3 Items Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add Complete Suite (Save ${activeSuite.savings})</span>
                    </>
                  )}
                </button>
              </div>

            </div>

            {/* Right: The 3 Coordinated Product Items Display */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {activeSuite.items.map((item, idx) => (
                  <div 
                    key={item.id}
                    className="bg-[#faf8f5] border border-stone-200/90 rounded-2xl p-3.5 flex flex-col justify-between hover:shadow-md transition-shadow group"
                  >
                    <div>
                      {/* Item Thumbnail */}
                      <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-stone-200 mb-3 relative">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[9px] font-mono">
                          Item {idx + 1} of 3
                        </span>
                      </div>

                      <span className="text-[10px] uppercase tracking-wider text-[#9b5814] font-bold block mb-0.5">
                        {item.category}
                      </span>
                      <h4 className="text-xs sm:text-[13px] font-semibold text-stone-900 line-clamp-2 leading-snug">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-stone-500 mt-1 line-clamp-2">
                        {item.spec}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-stone-200/70 flex items-center justify-between">
                      <span className="text-xs font-serif font-bold text-stone-900">
                        ${item.price.toLocaleString()}
                      </span>
                      <button
                        onClick={() => {
                          if (onAddToCart) {
                            const prod: Product = {
                              id: item.id,
                              name: item.name,
                              price: item.price,
                              rating: 5.0,
                              reviewCount: 22,
                              category: 'desks',
                              image: item.image,
                              description: item.spec,
                              features: [item.category, item.spec],
                              colors: [{ name: 'Default', hex: '#3d2b1f' }],
                            };
                            onAddToCart(prod);
                          }
                        }}
                        className="text-[11px] font-medium text-stone-600 hover:text-stone-900 underline cursor-pointer"
                      >
                        Add single item
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coordinated Finish Note */}
              <div className="mt-4 p-3 bg-stone-50 rounded-xl border border-stone-200/80 flex items-center justify-between text-xs text-stone-600">
                <span>All suite components are grain-matched and color-calibrated at our European atelier before dispatch.</span>
                <span className="font-semibold text-stone-900 hidden sm:inline">Guaranteed Harmony</span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
