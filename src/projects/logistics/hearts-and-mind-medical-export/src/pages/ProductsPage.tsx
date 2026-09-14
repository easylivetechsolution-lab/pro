import React from 'react';
import { motion } from 'motion/react';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  FileCheck2, 
  ShieldCheck, 
  ChevronRight, 
  FolderLock, 
  ArrowRight,
  PackageCheck,
  Building,
  CheckCircle2
} from 'lucide-react';
import { ProductCatalog } from '../components/ProductCatalog';
import type { Product } from '../types';

interface ProductsPageProps {
  initialCategory?: string;
  initialSearchQuery?: string;
  rfqCount: number;
  onAddToRfq: (product: Product, quantity?: number) => void;
  onOpenRfq: () => void;
  onViewProductDetails: (product: Product) => void;
  onRequestPricing: (product: Product) => void;
  onOpenVault: () => void;
  onNavigate: (page: string) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  initialCategory = 'all',
  initialSearchQuery = '',
  rfqCount,
  onAddToRfq,
  onOpenRfq,
  onViewProductDetails,
  onRequestPricing,
  onOpenVault,
  onNavigate
}) => {
  return (
    <div className="w-full bg-[#f8fafc] text-slate-800">
      {/* Page Header Banner */}
      <section className="bg-[#071324] text-white py-12 sm:py-16 relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-r from-[#040d1a] via-[#071933] to-[#0a254c] opacity-90" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
            <button 
              onClick={() => onNavigate('home')} 
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-cyan-400 font-semibold">Products & Supplies</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <span className="text-cyan-400 text-xs sm:text-sm font-extrabold tracking-widest uppercase mb-2 inline-block">
                Hospital Grade • Laboratory Assays • Surgical Instruments
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
                Medical Supplies & Institutional Catalog
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                Direct manufacturing allocations with validated FDA 510(k), CE Mark, and ISO 13485 certification. Select wholesale quantities, request instant tiered pricing, or compile a complete RFQ basket.
              </p>
            </div>

            {/* Quick RFQ Basket Shortcut */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={onOpenRfq}
                className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2.5 shadow-lg shadow-cyan-950/40 transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-slate-950" />
                <span>View RFQ Basket</span>
                <span className="bg-slate-950 text-white text-xs px-2 py-0.5 rounded-full font-black">
                  {rfqCount}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog View */}
      <div className="py-4">
        <ProductCatalog
          initialCategory={initialCategory}
          initialSearchQuery={initialSearchQuery}
          rfqCount={rfqCount}
          onAddToRfq={onAddToRfq}
          onOpenRfq={onOpenRfq}
          onViewProductDetails={onViewProductDetails}
          onRequestPricing={onRequestPricing}
        />
      </div>

      {/* Document Vault Access Strip */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#0b1b33] to-[#122849] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-400/30 flex items-center justify-center shrink-0">
                <FolderLock className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Need Technical Data Sheets & Certificates for Tender Bids?
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Instant access to FDA 510(k), ISO 13485:2016, CE Declarations of Conformity, and Material Safety Data Sheets (MSDS).
                </p>
              </div>
            </div>

            <button
              onClick={onOpenVault}
              className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <span>Open Document Vault</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
