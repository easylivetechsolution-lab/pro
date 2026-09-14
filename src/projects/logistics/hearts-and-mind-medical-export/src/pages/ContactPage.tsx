import React from 'react';
import { motion } from 'motion/react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  FileText, 
  ChevronRight, 
  Building2, 
  Globe2, 
  HelpCircle,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { QuoteFormSection } from '../components/QuoteFormSection';
import type { RFQItem } from '../types';

interface ContactPageProps {
  prefilledIncoterm?: string;
  rfqItems: RFQItem[];
  onSubmitSuccess: (quoteRef: string) => void;
  onNavigate: (page: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  prefilledIncoterm,
  rfqItems,
  onSubmitSuccess,
  onNavigate
}) => {
  return (
    <div className="w-full bg-[#f8fafc] text-slate-800">
      {/* Page Header Banner */}
      <section className="bg-[#071324] text-white py-12 sm:py-16 relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-r from-[#040d1a] via-[#071933] to-[#0a254c] opacity-90" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

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
            <span className="text-cyan-400 font-semibold">Contact & Request a Quote</span>
          </div>

          <div className="max-w-3xl">
            <span className="text-cyan-400 text-xs sm:text-sm font-extrabold tracking-widest uppercase mb-2 inline-block">
              Direct Trade Desk • Pro-Forma Quotations • Hospital Tenders
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
              Request an Institutional Quote
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Connect directly with our export logistics specialists. Receive tailored CIF/CPT commercial proposals, factory certification dossiers, and guaranteed production scheduling.
            </p>
          </div>
        </div>
      </section>

      {/* Direct Contact Cards Row */}
      <section className="py-10 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Phone Support */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-[#0284c7] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  24/7 Trade Hotline
                </h3>
                <div className="text-base font-extrabold text-[#0b1b33]">
                  +1 (504) 555-0187
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Immediate triage for emergency medical procurement and tender queries.
                </p>
              </div>
            </div>

            {/* Email Support */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-[#0284c7] flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Direct Inquiries
                </h3>
                <a 
                  href="mailto:info@heartsmindmedicalexport.com"
                  className="text-sm font-extrabold text-[#0284c7] hover:underline break-all"
                >
                  info@heartsmindmedicalexport.com
                </a>
                <p className="text-xs text-slate-500 mt-1">
                  Formal RFQ submissions, tender document packages, and vendor onboarding.
                </p>
              </div>
            </div>

            {/* Operational Headquarters */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-[#0284c7] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Corporate Logistics Desk
                </h3>
                <div className="text-sm font-bold text-[#0b1b33]">
                  Hearts and Mind Medical Export LLC
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Operating with direct dispatch channels via Port of Houston, New Orleans & Miami.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Quote Form Section */}
      <QuoteFormSection
        prefilledIncoterm={prefilledIncoterm}
        rfqItems={rfqItems}
        onSubmitSuccess={onSubmitSuccess}
      />

      {/* Frequently Asked Questions */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold tracking-widest text-[#0284c7] uppercase">
              PROCUREMENT FAQ
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b1b33] tracking-tight mt-1">
              Common Questions for Institutional Buyers
            </h2>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="text-sm font-bold text-[#0b1b33] mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0284c7] shrink-0" />
                <span>What are standard payment terms for bulk export shipments?</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed pl-6">
                We accommodate Irrevocable Letters of Credit (LC at sight via tier-1 international banks), Escrow arrangements, and Telegraphic Transfer (TT: 30% advance deposit against pro-forma, 70% upon bill of lading issuance and pre-shipment inspection certificate).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="text-sm font-bold text-[#0b1b33] mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0284c7] shrink-0" />
                <span>Can third-party inspection agencies (SGS / Bureau Veritas) inspect our order?</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed pl-6">
                Yes, 100%. We routinely facilitate pre-shipment inspection (PSI), container loading supervision (CLS), and factory audits conducted by SGS, Bureau Veritas, or TÜV SÜD prior to dispatch.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="text-sm font-bold text-[#0b1b33] mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0284c7] shrink-0" />
                <span>What certifications accompany each consignment?</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed pl-6">
                Every shipment includes Certificate of Analysis (CoA), Lot/Batch Release Certificates, FDA 510(k) copy or CE MDR Declaration of Conformity, Commercial Invoice, Packing List, Certificate of Origin, and Air Waybill or Ocean Bill of Lading.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
