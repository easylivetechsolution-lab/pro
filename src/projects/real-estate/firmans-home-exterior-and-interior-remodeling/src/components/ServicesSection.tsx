import React, { useState } from 'react';
import { ArrowRight, Home, LayoutGrid, Paintbrush, Droplets, Flower2, Layers, PaintBucket, Wrench } from 'lucide-react';
import { SERVICES_DATA } from '../data/remodelingData';
import type { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
  onNavigate?: (route: 'home' | 'services' | 'gallery' | 'about' | 'contact') => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService, onNavigate }) => {
  const [filter, setFilter] = useState<'all' | 'exterior' | 'interior' | 'outdoor'>('all');

  const filteredServices = filter === 'all'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.category === filter);

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home':
        return <Home className="w-5 h-5" />;
      case 'LayoutGrid':
        return <LayoutGrid className="w-5 h-5" />;
      case 'Paintbrush':
        return <Paintbrush className="w-5 h-5" />;
      case 'Droplets':
        return <Droplets className="w-5 h-5" />;
      case 'Flower2':
        return <Flower2 className="w-5 h-5" />;
      case 'Layers':
        return <Layers className="w-5 h-5" />;
      case 'RollerCoaster':
        return <PaintBucket className="w-5 h-5" />;
      case 'Wrench':
      default:
        return <Wrench className="w-5 h-5" />;
    }
  };

  return (
    <section id="services" className="py-24 sm:py-32 bg-[#F8FAFC] text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-slate-200 shadow-xs text-xs font-semibold tracking-[0.2em] uppercase text-[#C07848]">
            <span>FIRMANS TRADES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 font-serif">
            Integrated Remodeling Solutions
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed">
            Coordinated architectural execution across building envelopes, luxury interiors, and bespoke grounds.
          </p>

          {/* Quick Category Filter Pills */}
          <div className="flex items-center justify-center gap-2 pt-2 flex-wrap">
            {[
              { id: 'all', label: 'All Disciplines' },
              { id: 'exterior', label: 'Exterior' },
              { id: 'interior', label: 'Interior' },
              { id: 'outdoor', label: 'Outdoor Living' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200 cursor-pointer ${
                  filter === tab.id
                    ? 'bg-[#1E293B] text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 8-Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              onClick={() => onSelectService(service)}
              className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-[#C07848]/60 transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={service.image}
                  alt={service.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80';
                  }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-black/10 to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-300" />

                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase backdrop-blur-md bg-black/60 text-white/95 border border-white/15 shadow-xs">
                    {service.category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-800 group-hover:bg-[#C07848]/10 group-hover:border-[#C07848] group-hover:text-[#C07848] transition-all duration-300">
                      {renderIcon(service.iconName)}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#C07848] transition-colors leading-snug">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                    {service.tagline}
                  </p>
                </div>

                {/* Bottom Action Row */}
                <div className="pt-3 flex items-center justify-between border-t border-slate-100">
                  <span className="text-[11px] font-medium text-slate-400 group-hover:text-slate-600 transition-colors">
                    {service.warranty ? `${service.warranty.split(' ')[0]} Warranty` : 'Warranty Included'}
                  </span>
                  
                  <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-[#C07848] group-hover:text-white group-hover:border-[#C07848] transition-all duration-300">
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Services Page Navigation */}
        {onNavigate && (
          <div className="mt-14 text-center">
            <button
              onClick={() => {
                onNavigate('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1E293B] hover:bg-[#C07848] text-white font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-md cursor-pointer"
            >
              <span>Explore All Trade Specifications &amp; Pricing</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
