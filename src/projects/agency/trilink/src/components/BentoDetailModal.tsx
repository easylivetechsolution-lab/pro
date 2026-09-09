import React from 'react';
import { X, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';

export type BentoModalData = {
  id: string;
  badge: string;
  title: string;
  description: string;
  features: { title: string; desc: string }[];
  quote?: {
    text: string;
    author: string;
    role: string;
    company: string;
  };
  productCards: {
    title: string;
    desc: string;
    linkText: string;
  }[];
}

interface BentoDetailModalProps {
  data: BentoModalData | null;
  onClose: () => void;
}

export const BentoDetailModal: React.FC<BentoDetailModalProps> = ({ data, onClose }) => {
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 p-6 sm:p-10 text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-8 pr-12">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#00A86B] bg-emerald-50 px-3 py-1 rounded-full mb-3">
            {data.badge}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight leading-snug">
            {data.title}
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* Key Features */}
        <div className="mb-8">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
            Capabilities & Architecture
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.features.map((feat, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100/80">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-[#00D492] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{feat.title}</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-normal">{feat.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Quote if available */}
        {data.quote && (
          <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-[#0A2333] text-white">
            <p className="text-base font-medium italic text-slate-100 mb-4">
              "{data.quote.text}"
            </p>
            <div className="text-xs font-semibold text-emerald-400">
              {data.quote.author}
              <span className="text-slate-400 font-normal ml-1">
                — {data.quote.role}
              </span>
            </div>
          </div>
        )}

        {/* Get started with solutions */}
        <div className="border-t border-slate-100 pt-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
            Get started with Trilink tools
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {data.productCards.map((card, i) => (
              <div key={i} className="p-4 rounded-xl border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/30 transition-all group flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#00A86B]">
                    {card.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-3">
                    {card.desc}
                  </p>
                </div>
                <div className="mt-4 text-xs font-bold text-[#00A86B] flex items-center group-hover:underline">
                  <span>{card.linkText}</span>
                  <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="text-sm font-semibold text-slate-500 hover:text-slate-800"
          >
            Close
          </button>

          <div className="flex items-center space-x-3">
            <a
              href="#pricing-section"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full"
            >
              See pricing
            </a>
            <button
              onClick={onClose}
              className="px-5 py-2 text-sm font-bold text-slate-950 bg-[#00E599] hover:bg-[#00D48D] rounded-full shadow-sm"
            >
              Start integration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

