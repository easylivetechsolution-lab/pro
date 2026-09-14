import React from 'react';
import { motion } from 'motion/react';
import { 
  Anchor, 
  Plane, 
  Truck, 
  ShieldCheck, 
  FileCheck2, 
  ChevronRight, 
  FolderLock, 
  ArrowRight,
  Scale,
  Compass,
  Building2
} from 'lucide-react';
import { IncotermsAndLogistics } from '../components/IncotermsAndLogistics';
import { TradeToolsSimulator } from '../components/TradeToolsSimulator';

interface TradeShippingPageProps {
  onOpenVault: () => void;
  onRequestQuoteWithIncoterm: (incoterm: string) => void;
  onNavigate: (page: string) => void;
}

export const TradeShippingPage: React.FC<TradeShippingPageProps> = ({
  onOpenVault,
  onRequestQuoteWithIncoterm,
  onNavigate
}) => {
  return (
    <div className="w-full bg-[#f8fafc] text-slate-800">
      {/* Page Header Banner */}
      <section className="bg-[#071324] text-white py-12 sm:py-16 relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-r from-[#040d1a] via-[#071933] to-[#0a254c] opacity-90" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
            <button 
              onClick={() => onNavigate('home')} 
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-cyan-400 font-semibold">Trade & Shipping</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <span className="text-cyan-400 text-xs sm:text-sm font-extrabold tracking-widest uppercase mb-2 inline-block">
                ICC Incoterms 2020 • Multimodal Freight • Port Demarcation
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
                Global Logistics & Trade Shipping
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                Inspect legal transfer-of-risk milestones, simulate container volume requirements, and configure landed delivery contracts (CPT, CIF, FOB, DAP) for international healthcare procurement.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => onRequestQuoteWithIncoterm('CPT')}
                className="px-5 py-3 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Request CPT Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Incoterms & Multimodal Logistics Matrix */}
      <IncotermsAndLogistics
        onOpenVault={onOpenVault}
        onRequestQuoteWithIncoterm={onRequestQuoteWithIncoterm}
      />

      {/* 2. Interactive Trade Duty & Shipment Scale (With 3D Overview & Legal Matrix) */}
      <TradeToolsSimulator
        onRequestQuoteWithIncoterm={onRequestQuoteWithIncoterm}
      />

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
                  Access Export Licenses, Bills of Lading & Insurance Documentation
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Pre-cleared maritime templates, commercial invoices, EUR.1 / USMCA origin certificates, and phytosanitary seals.
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
