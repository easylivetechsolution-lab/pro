import React from 'react';
import { ArrowRight, CheckCircle2, Sparkles, Building2, Home, RefreshCw, Box } from 'lucide-react';
import type { AddOnId, ServiceType } from '../types/cleaning';
import { SERVICE_CATALOG } from '../lib/pricing';

export interface SolutionPreset {
  serviceType: ServiceType;
  sqft?: number;
  addOns?: AddOnId[];
}

interface ComprehensiveSolutionsSectionProps {
  onSelectSolution: (preset: SolutionPreset) => void;
}

const SERVICE_ICONS: Record<ServiceType, React.FC<{ className?: string }>> = {
  home: Home,
  office: Building2,
  deep: Sparkles,
  'move-out': Box,
};

export const ComprehensiveSolutionsSection: React.FC<ComprehensiveSolutionsSectionProps> = ({
  onSelectSolution,
}) => {
  return (
    <section id="solutions" className="relative py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200/60 text-sky-700 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Architectural Services</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Precision Sanitization Tailored to Every Space
        </h2>
        <p className="mt-3 text-slate-600 text-base sm:text-lg">
          Zero toxic residues. Medical-grade HEPA extraction. Specialized microfiber color-coding to guarantee cross-contamination prevention.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SERVICE_CATALOG.map((service) => {
          const Icon = SERVICE_ICONS[service.id] || Sparkles;

          return (
            <div
              key={service.id}
              className="relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white/90 backdrop-blur-sm p-6 hover:shadow-xl hover:border-sky-300 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-sky-600 bg-sky-50 px-2 py-1 rounded-md">
                    {service.index}
                  </span>
                  <div className="p-2.5 rounded-xl bg-slate-50 text-slate-700 group-hover:bg-sky-50 group-hover:text-sky-600 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="font-display text-xl font-bold text-slate-900 mb-1">
                  {service.title}
                </h3>
                <div className="text-xs font-medium text-sky-700 mb-3">{service.tagline}</div>
                <p className="text-xs text-slate-500 leading-relaxed mb-5">
                  {service.description}
                </p>

                <div className="space-y-2 mb-6">
                  {service.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">From</span>
                  <div className="font-display text-2xl font-extrabold text-slate-900">
                    ${service.startingPrice}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onSelectSolution({
                      serviceType: service.id,
                      sqft: service.id === 'office' ? 2800 : 1800,
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-sky-600 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Configure
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
