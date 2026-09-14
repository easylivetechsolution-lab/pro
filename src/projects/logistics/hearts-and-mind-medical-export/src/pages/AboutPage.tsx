import React from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Target, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Users2,
  Anchor,
  Truck,
  Globe2,
  FileCheck2,
  ChevronRight,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { TrustBar } from '../components/TrustBar';
import chaseFounderImg from '../assets/images/chase.jpg';

interface AboutPageProps {
  onOpenPortal: (mode: 'buyer' | 'manufacturer') => void;
  onNavigate: (page: string) => void;
  onOpenVault?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onOpenPortal,
  onNavigate,
}) => {
  return (
    <div className="w-full bg-[#f8fafc] text-slate-800">
      {/* Page Header Banner */}
      <section className="bg-[#071324] text-white py-14 sm:py-18 relative overflow-hidden border-b border-slate-800">
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
            <span className="text-cyan-400 font-semibold">About Us</span>
          </div>

          <div className="max-w-3xl">
            <span className="text-cyan-400 text-xs sm:text-sm font-extrabold tracking-widest uppercase mb-2 inline-block">
              Corporate Overview & Leadership
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Pioneering Reliable Global Healthcare Supply Chains
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Hearts and Mind Medical Export LLC bridges verified medical manufacturers with healthcare systems, government tenders, and institutional buyers across six continents.
            </p>
          </div>
        </div>
      </section>

      {/* Main Founder & Executive Narrative Section */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Founder Bio & Company Story */}
            <div className="lg:col-span-6">
              <span className="text-xs font-bold tracking-widest text-[#0284c7] uppercase">
                EXECUTIVE LEADERSHIP
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0b1b33] tracking-tight mt-1 mb-6 leading-tight">
                Hearts and Mind Medical Export LLC
              </h2>

              <div className="space-y-4 text-sm text-slate-600 leading-relaxed mb-8">
                <p>
                  Founded by <strong>Chase Guidroz</strong>, Hearts and Mind Medical Export LLC was created to eliminate the opacity, counterfeit risks, and catastrophic delivery bottlenecks that frequently disrupt institutional healthcare procurement.
                </p>
                <p>
                  With deep experience in international trade law, multimodal logistics, and biomedical supply chain integrity, our organization has established direct manufacturing allocations with ISO 13485 and FDA-cleared facilities worldwide.
                </p>
                <p>
                  We don&apos;t just broker goods — we engineer seamless, end-to-end export pipelines with verified factory inspections, stringent quality control, and pre-cleared customs documentation under ICC Incoterms 2020.
                </p>
              </div>

              {/* Mission & Vision Card */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 mb-8 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-sky-100 text-[#0284c7] shrink-0">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs uppercase tracking-wider text-[#0b1b33] mb-1">
                      Our Mission
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      To make global healthcare supply chains more accessible, reliable, and efficient — one transparent partnership at a time.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pt-3 border-t border-slate-200/80">
                  <div className="p-3 rounded-xl bg-emerald-100 text-emerald-700 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs uppercase tracking-wider text-[#0b1b33] mb-1">
                      Our Core Commitment
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Zero tolerance for substandard medical goods. 100% batch traceability with lot certificates and international regulatory compliance.
                    </p>
                  </div>
                </div>
              </div>

              {/* Founder Signature */}
              <div className="pt-2 flex items-center justify-between">
                <div>
                  <div className="font-['Alex_Brush',cursive] text-4xl text-[#0b1b33] select-none tracking-wide">
                    Chase Guidroz
                  </div>
                  <div className="text-xs font-bold tracking-wider text-slate-500 uppercase mt-1">
                    Founder & Chief Executive Officer
                  </div>
                </div>

                <div className="hidden sm:block">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-50 text-[#0284c7] text-xs font-semibold border border-sky-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0284c7]" />
                    Verified Global Exporter
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Founder Real Photo & Portal Gateways */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              {/* Executive Portrait Frame */}
              <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-slate-900 relative group">
                <div className="h-80 sm:h-96 w-full overflow-hidden">
                  <img
                    src={chaseFounderImg}
                    alt="Chase Guidroz, Founder and CEO of Hearts and Mind Medical Export LLC"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0b1b33] via-[#0b1b33]/85 to-transparent p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">Chase Guidroz</h3>
                      <p className="text-xs text-cyan-300 font-medium">Founder & CEO, Hearts and Mind Medical Export LLC</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold tracking-wider bg-white/10 px-2.5 py-1 rounded-full text-slate-200 backdrop-blur-sm">
                        Executive Desk
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Portal Gateways */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-sky-300 transition-all flex flex-col justify-between shadow-2xs">
                  <div>
                    <div className="w-9 h-9 rounded-lg bg-sky-100 text-[#0284c7] flex items-center justify-center mb-3">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-sm text-[#0b1b33] mb-1">
                      Manufacturer Portal
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">
                      For certified medical manufacturers seeking vetted international distribution and export regulatory compliance.
                    </p>
                  </div>
                  <button
                    onClick={() => onOpenPortal('manufacturer')}
                    className="w-full py-2.5 px-3 bg-[#0b1b33] hover:bg-[#122849] text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Apply as Manufacturer</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-sky-300 transition-all flex flex-col justify-between shadow-2xs">
                  <div>
                    <div className="w-9 h-9 rounded-lg bg-sky-100 text-[#0284c7] flex items-center justify-center mb-3">
                      <Users2 className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-sm text-[#0b1b33] mb-1">
                      Institutional Buyer Portal
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">
                      For hospital chains, national health ministries, regional distributors, and emergency relief organizations.
                    </p>
                  </div>
                  <button
                    onClick={() => onOpenPortal('buyer')}
                    className="w-full py-2.5 px-3 bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Buyer Registration</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Global Partner & Regulatory Network */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold tracking-widest text-[#0284c7] uppercase">
              STANDARDS & ACCREDITATIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b1b33] tracking-tight mt-1 mb-3">
              Certified Global Compliance Network
            </h2>
            <p className="text-sm text-slate-600">
              Every shipment leaving our partner manufacturing plants undergoes exhaustive multi-point regulatory validation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-800 font-black text-sm flex items-center justify-center mb-4 border border-blue-100">
                FDA
              </div>
              <h3 className="text-base font-bold text-[#0b1b33] mb-1">U.S. FDA 510(k)</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-3">
                Pre-market notifications, Device Master Files (DMF), and active cGMP compliance audits.
              </p>
              <div className="text-[11px] font-semibold text-[#0284c7]">Direct Customs Clearance</div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-[#0284c7] font-black text-sm flex items-center justify-center mb-4 border border-sky-100">
                ISO
              </div>
              <h3 className="text-base font-bold text-[#0b1b33] mb-1">ISO 13485:2016</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-3">
                Comprehensive quality management system specific to medical devices and clinical disposables.
              </p>
              <div className="text-[11px] font-semibold text-[#0284c7]">TÜV / SGS Audited</div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 font-black text-sm flex items-center justify-center mb-4 border border-indigo-100">
                CE
              </div>
              <h3 className="text-base font-bold text-[#0b1b33] mb-1">CE Mark (MDR)</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-3">
                Full European Medical Device Regulation conformity assessments and Notified Body approvals.
              </p>
              <div className="text-[11px] font-semibold text-[#0284c7]">EU Free Trade Distribution</div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 font-black text-sm flex items-center justify-center mb-4 border border-emerald-100">
                WHO
              </div>
              <h3 className="text-base font-bold text-[#0b1b33] mb-1">WHO Prequalified</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-3">
                Diagnostic assays, PPE, and consumables qualified for UN, UNICEF, and Red Cross emergency procurement.
              </p>
              <div className="text-[11px] font-semibold text-[#0284c7]">Global Relief Ready</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Metrics Bar */}
      <TrustBar />

      {/* Bottom Cross-Page Call to Action */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#0b1b33] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="max-w-xl">
              <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase mb-2 inline-block">
                Start Your Procurement
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
                Ready to source verified medical supplies?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Review our certified catalog or submit an institutional request for quote with exact destination port delivery terms.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => onNavigate('products')}
                className="px-6 py-3 bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md cursor-pointer"
              >
                Browse Products Catalog
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-slate-600 font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer"
              >
                Request a Quote
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
