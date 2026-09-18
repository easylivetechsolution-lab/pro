import React, { useState } from 'react';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Layers,
  Wrench,
  Home,
  Check,
  FileText
} from 'lucide-react';
import { SERVICES_DATA } from '../data/remodelingData';
import type { ServiceItem } from '../types';

interface ServicesPageProps {
  onOpenQuote: (serviceId?: string) => void;
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenQuote, onSelectService }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'exterior' | 'interior' | 'outdoor'>('all');

  const filteredServices = selectedCategory === 'all'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#0B131E] text-slate-100 pt-28 pb-24">
      {/* Page Header */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#182335] border border-white/10 text-xs font-semibold uppercase tracking-[0.22em] text-[#C07848] mb-5">
          <span>Firmans Home Exterior &amp; Interior Trades</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-white mb-6 max-w-4xl mx-auto leading-[1.12]">
          Precision Remodeling Across Every Trade
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
          From structural rooflines and panoramic glazing to turnkey interior transformations and resort-style grounds, Firmans Home Exterior &amp; Interior Remodeling delivers uncompromised architectural quality.
        </p>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mt-10">
          {[
            { id: 'all', label: 'All Disciplines' },
            { id: 'exterior', label: 'Exterior Architecture' },
            { id: 'interior', label: 'Interior Living' },
            { id: 'outdoor', label: 'Outdoor Environments' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#C07848] text-white shadow-lg shadow-[#C07848]/20 font-semibold'
                  : 'bg-[#141E2D] hover:bg-[#1C2A3E] text-slate-300 border border-white/10 hover:border-white/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredServices.map((service, index) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              className="group bg-[#121C2B] rounded-2xl overflow-hidden border border-white/10 hover:border-[#C07848]/60 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              {/* Media Header */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121C2B] via-transparent to-black/20" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-md bg-[#0F172A]/85 backdrop-blur-md border border-white/15 text-[11px] font-semibold uppercase tracking-wider text-[#C07848]">
                    {service.category}
                  </span>
                </div>

                {/* Price Guide Badge */}
                <div className="absolute bottom-4 right-4">
                  <span className="px-3 py-1 rounded-md bg-[#0F172A]/90 backdrop-blur-md border border-white/15 text-xs font-semibold text-white">
                    {service.priceRange}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-serif font-bold text-white tracking-wide">
                      {service.title}
                    </h3>
                    <span className="text-xs font-mono text-slate-400">
                      0{index + 1}
                    </span>
                  </div>

                  <p className="text-sm text-[#D28A5B] font-medium">
                    {service.tagline}
                  </p>

                  <p className="text-sm text-slate-300 leading-relaxed font-light">
                    {service.description}
                  </p>
                </div>

                {/* Scope & Features Checklist */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                    Scope &amp; Engineering Standards:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                        <Check className="w-3.5 h-3.5 text-[#C07848] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Materials & Warranty Bar */}
                <div className="p-3.5 rounded-xl bg-[#182335]/70 border border-white/5 space-y-1.5 text-xs text-slate-300">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Standard Warranty:</span>
                    <span className="font-semibold text-white flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#C07848]" />
                      {service.warranty}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => onOpenQuote(service.id)}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#C07848] hover:bg-[#D28A5B] text-white font-semibold py-2.5 px-4 rounded-xl text-xs sm:text-sm tracking-wide shadow-md shadow-[#C07848]/20 transition-all cursor-pointer"
                  >
                    <span>Request Estimate</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onSelectService(service)}
                    className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-white/15 hover:border-white/30 text-xs sm:text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
                  >
                    Specifications
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Firmans Standards Guarantee Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="rounded-3xl bg-gradient-to-r from-[#141F30] via-[#1A283D] to-[#141F30] border border-white/10 p-8 sm:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#C07848]/15 border border-[#C07848]/40 flex items-center justify-center text-[#C07848]">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white tracking-wide">
                Permit &amp; Code Compliance
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                Firmans manages all municipal permit filings, HOA architectural submittals, and engineering sign-offs from start to finish.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#C07848]/15 border border-[#C07848]/40 flex items-center justify-center text-[#C07848]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white tracking-wide">
                Manufacturer Certified
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                Direct factory-certified installations with extended non-prorated manufacturer warranties on all roofing, glazing, and surfaces.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#C07848]/15 border border-[#C07848]/40 flex items-center justify-center text-[#C07848]">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white tracking-wide">
                Fixed-Timeline Guarantee
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                Every trade contract includes defined milestone target dates with dedicated on-site project superintendents.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
