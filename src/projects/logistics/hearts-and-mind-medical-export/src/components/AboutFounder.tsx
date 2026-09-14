import React from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Target, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  CheckCircle, 
  ExternalLink,
  Users2,
  Anchor,
  Truck
} from 'lucide-react';
import chaseFounderImg from '../assets/images/chase.jpg';

interface AboutFounderProps {
  onOpenPortal: (mode: 'buyer' | 'manufacturer') => void;
}

export const AboutFounder: React.FC<AboutFounderProps> = ({ onOpenPortal }) => {
  return (
    <section id="about-section" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Founder & Corporate Narrative matching screenshot */}
          <div className="lg:col-span-4">
            <span className="text-xs font-bold tracking-widest text-[#0284c7] uppercase">
              ABOUT US
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b1b33] tracking-tight mt-1 mb-4 leading-tight">
              Hearts and Mind Medical Export LLC
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Founded by <strong>Chase Guidroz</strong>, Hearts and Mind Medical Export LLC is a global B2B platform connecting certified manufacturers with hospitals, distributors, government agencies and institutional buyers worldwide. We specialize in sourcing high-quality medical supplies and managing the logistics and trade processes that keep healthcare systems running.
            </p>

            {/* Our Mission Box matching screenshot */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mb-6 flex items-start gap-3.5">
              <div className="p-2.5 rounded-lg bg-sky-100 text-[#0284c7] shrink-0">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-xs uppercase tracking-wider text-[#0b1b33] mb-1">
                  Our Mission
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  To make global healthcare supply chains more accessible, reliable and efficient — one partnership at a time.
                </p>
              </div>
            </div>

            {/* Founder Signature matching screenshot */}
            <div className="pt-2">
              <div className="font-['Alex_Brush',cursive] text-4xl text-[#0b1b33] select-none tracking-wide">
                Chase Guidroz
              </div>
              <div className="text-xs font-bold tracking-wider text-slate-500 uppercase mt-1">
                Founder & CEO
              </div>
            </div>
          </div>

          {/* Middle Column: Visual & Two Portal Action Boxes matching screenshot */}
          <div className="lg:col-span-5">
            {/* Founder photo */}
            <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200 mb-6 bg-slate-100 relative group">
              <div className="h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
                <img
                  src={chaseFounderImg}
                  alt="Chase Guidroz, Founder & CEO of Hearts and Mind Medical Export LLC"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0b1b33] via-[#0b1b33]/80 to-transparent p-4 text-white">
                <div className="text-xs font-bold text-white tracking-wide">Chase Guidroz</div>
                <div className="text-[11px] text-cyan-300 font-medium">Founder & CEO, Hearts and Mind Medical Export LLC</div>
              </div>
            </div>

            {/* 2 Portal Action Boxes matching screenshot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Manufacturer Portal */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-sky-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-sky-100 text-[#0284c7] flex items-center justify-center mb-2">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-xs text-[#0b1b33] mb-1">
                    Manufacturer Portal
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed mb-4">
                    For certified manufacturers seeking global distribution & export compliance.
                  </p>
                </div>
                <button
                  onClick={() => onOpenPortal('manufacturer')}
                  className="w-full py-2 px-3 bg-[#0b1b33] hover:bg-[#122849] text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Institutional Buyer Portal */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-sky-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-sky-100 text-[#0284c7] flex items-center justify-center mb-2">
                    <Users2 className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-xs text-[#0b1b33] mb-1">
                    Institutional Buyer Portal
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed mb-4">
                    For hospitals, distributors, government & institutional buyers.
                  </p>
                </div>
                <button
                  onClick={() => onOpenPortal('buyer')}
                  className="w-full py-2 px-3 bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Our Partner Network matching screenshot */}
          <div className="lg:col-span-3 bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <h3 className="font-bold text-xs uppercase tracking-wider text-[#0b1b33] mb-5">
              Our Partner Network
            </h3>

            <div className="space-y-4">
              {/* WHO */}
              <div className="flex items-center gap-3 p-2.5 rounded-lg bg-white border border-slate-200">
                <div className="w-10 h-10 rounded-full bg-sky-50 text-[#0284c7] font-black text-xs flex items-center justify-center border border-sky-100 shrink-0">
                  WHO
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0b1b33]">World Health Organization</div>
                  <div className="text-[10px] text-slate-500">Prequalified standards</div>
                </div>
              </div>

              {/* FDA */}
              <div className="flex items-center gap-3 p-2.5 rounded-lg bg-white border border-slate-200">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-800 font-black text-xs flex items-center justify-center border border-blue-100 shrink-0">
                  FDA
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0b1b33]">U.S. FDA 510(k)</div>
                  <div className="text-[10px] text-slate-500">Device clearance & cGMP</div>
                </div>
              </div>

              {/* Ocean Cargo */}
              <div className="flex items-start gap-3 p-2.5 rounded-lg bg-white border border-slate-200">
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Anchor className="w-4 h-4 text-[#0284c7]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0b1b33]">Ocean Cargo</div>
                  <div className="text-[10px] text-slate-500">Cost-effective for large volumes</div>
                </div>
              </div>

              {/* Truck & Rail */}
              <div className="flex items-start gap-3 p-2.5 rounded-lg bg-white border border-slate-200">
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Truck className="w-4 h-4 text-[#0284c7]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0b1b33]">Truck & Rail</div>
                  <div className="text-[10px] text-slate-500">Flexible multimodal solutions</div>
                </div>
              </div>

              {/* Trusted, Certified, Global */}
              <div className="flex items-start gap-3 p-2.5 rounded-lg bg-white border border-slate-200">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0b1b33]">Trusted, Certified, Global.</div>
                  <div className="text-[10px] text-slate-500">
                    Export validation, documentation, customs clearance & international standards (FDA, ISO, CE, WHO).
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
