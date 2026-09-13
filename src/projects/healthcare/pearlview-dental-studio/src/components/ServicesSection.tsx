import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Smile, HeartPulse, RotateCw, ArrowRight, Check, Clock, Calendar, Award, Pause, Play } from 'lucide-react';
import { SERVICES_DATA } from '../data/dentalData';
import { type ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectService: (serviceId: string) => void;
  onNavigate?: (page: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService, onNavigate }) => {
  const [manualFlipped, setManualFlipped] = useState<Record<string, boolean>>({});
  const [autoFlipSide, setAutoFlipSide] = useState<boolean>(false);
  const [isAutoFlipEnabled, setIsAutoFlipEnabled] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'cosmetic' | 'restorative' | 'ortho'>('all');
  const [progress, setProgress] = useState<number>(0);

  // 4-second automatic flip timer
  useEffect(() => {
    if (!isAutoFlipEnabled || isHovered) return;

    const intervalStep = 100; // update progress bar every 100ms
    const totalDuration = 4000;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += intervalStep;
      setProgress((elapsed / totalDuration) * 100);

      if (elapsed >= totalDuration) {
        elapsed = 0;
        setProgress(0);
        setAutoFlipSide((prev) => !prev);
      }
    }, intervalStep);

    return () => clearInterval(timer);
  }, [isAutoFlipEnabled, isHovered]);

  // Whenever user hovers, flip back to main view (not procedure details) and pause auto-flip
  const handleMouseEnter = () => {
    setIsHovered(true);
    setAutoFlipSide(false);
    setManualFlipped({});
    setProgress(0);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setProgress(0);
  };

  const toggleFlip = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setManualFlipped((prev) => ({
      ...prev,
      [id]: prev[id] !== undefined ? !prev[id] : !autoFlipSide,
    }));
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smile':
        return <Smile className="w-5 h-5 text-[#0E282E]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#0E282E]" />;
      case 'Award':
        return <Award className="w-5 h-5 text-[#0E282E]" />;
      case 'HeartPulse':
      default:
        return <HeartPulse className="w-5 h-5 text-[#0E282E]" />;
    }
  };

  const filteredServices = SERVICES_DATA.filter((service) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'cosmetic') return service.id === 'cosmetic' || service.id === 'invisalign';
    if (activeFilter === 'restorative') return service.id === 'implants' || service.id === 'restorative';
    if (activeFilter === 'ortho') return service.id === 'invisalign';
    return true;
  });

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#FAF9F6] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#5B7980] mb-2">
              <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Our Services</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#0E282E] tracking-tight">
              Comprehensive Dental Care
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-600 max-w-xl">
              From smile makeovers to routine checkups, explore our full range of treatments.
            </p>
          </div>

            {/* Controls: Filter only */}
            <div className="flex flex-col items-start md:items-end gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex p-1 bg-white border border-zinc-200 rounded-full shadow-2xs">
                  {(['all', 'cosmetic', 'restorative', 'ortho'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveFilter(tab)}
                      className={`px-3.5 py-1.5 text-xs font-semibold rounded-full capitalize transition-all cursor-pointer ${
                        activeFilter === tab
                          ? 'bg-[#0E282E] text-white shadow-xs'
                          : 'text-zinc-600 hover:text-zinc-900'
                      }`}
                    >
                      {tab === 'ortho' ? 'Aligners' : tab}
                    </button>
                  ))}
                </div>

                {onNavigate && (
                  <button
                    onClick={() => onNavigate('services')}
                    className="px-3.5 py-1.5 text-xs font-semibold rounded-full bg-white text-[#0E282E] border border-zinc-300 hover:bg-zinc-50 cursor-pointer shadow-2xs"
                  >
                    View All Services Page &rarr;
                  </button>
                )}
              </div>
            </div>
        </div>

        {/* 3D Flip Card Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {filteredServices.map((service: ServiceItem) => {
            // Determine if card is flipped: manual override if clicked, else follows 4-second autoFlipSide
            const isFlipped = manualFlipped[service.id] !== undefined
              ? manualFlipped[service.id]
              : autoFlipSide;

            return (
              <div
                key={service.id}
                className="perspective-1000 min-h-[470px] h-[490px] cursor-pointer group select-none"
                onClick={() => toggleFlip(service.id)}
                onMouseEnter={handleMouseEnter}
              >
                <div
                  className={`relative w-full h-full duration-700 transform-style-3d transition-transform ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* FRONT OF THE CARD */}
                  <div className="absolute inset-0 w-full h-full bg-white rounded-2xl border border-zinc-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden backface-hidden">
                    {/* Top Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] border border-zinc-200/80 flex items-center justify-center group-hover:scale-105 transition-transform">
                          {getIcon(service.iconName)}
                        </div>

                        <div className="flex items-center justify-end">
                          <button
                            type="button"
                            onClick={(e) => toggleFlip(service.id, e)}
                            className="flex items-center gap-1 text-[11px] font-medium text-zinc-500 hover:text-[#0E282E] bg-zinc-50 px-2.5 py-1 rounded-full border border-zinc-200 transition-colors"
                            title="Flip card for procedure details"
                          >
                            <RotateCw className="w-3 h-3 text-[#D4AF37]" />
                            <span>Flip</span>
                          </button>
                        </div>
                      </div>

                      <h3 className="text-xl font-serif font-semibold text-[#0E282E] mb-2">
                        {service.title}
                      </h3>

                      <p className="text-xs text-zinc-600 line-clamp-3 leading-relaxed mb-4">
                        {service.shortDesc}
                      </p>

                      <div className="mt-auto pt-2 flex items-center justify-between text-xs">
                        <span className="font-semibold text-[#0E282E] group-hover:text-[#1E434B] flex items-center gap-1">
                          Procedure specs &rarr;
                        </span>
                        <span className="text-[11px] font-medium text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-md">
                          {service.pricing}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Image Thumbnail */}
                    <div className="relative h-44 w-full overflow-hidden bg-zinc-100 border-t border-zinc-100">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-xs text-[10px] font-bold text-[#0E282E] shadow-xs">
                        {service.timeline}
                      </div>
                    </div>
                  </div>

                  {/* BACK OF THE CARD (FLIPPED 3D) */}
                  <div className="absolute inset-0 w-full h-full bg-[#0E282E] text-white rounded-2xl p-6 border border-[#1A3E46] shadow-xl flex flex-col justify-between backface-hidden rotate-y-180">
                    <div>
                      {/* Back Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                        <span className="text-[10px] tracking-widest uppercase font-semibold text-[#EAD8B7]">
                          Procedure Details
                        </span>
                        <button
                          type="button"
                          onClick={(e) => toggleFlip(service.id, e)}
                          className="flex items-center gap-1 text-[11px] text-zinc-300 hover:text-white bg-white/10 px-2 py-0.5 rounded-full"
                        >
                          <RotateCw className="w-3 h-3" />
                          <span>Flip back</span>
                        </button>
                      </div>

                      <h4 className="text-lg font-serif font-medium text-white mb-2">
                        {service.title}
                      </h4>

                      <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                        {service.fullDesc}
                      </p>

                      {/* Specs */}
                      <div className="grid grid-cols-2 gap-2 mb-4 p-2.5 rounded-xl bg-white/5 border border-white/10 text-[11px]">
                        <div className="flex items-center gap-1.5 text-zinc-300">
                          <Clock className="w-3 h-3 text-[#EAD8B7]" />
                          <span>{service.timeline}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-zinc-300">
                          <Calendar className="w-3 h-3 text-[#EAD8B7]" />
                          <span>{service.pricing}</span>
                        </div>
                      </div>

                      {/* Key Features */}
                      <ul className="space-y-1.5 mb-4">
                        {service.features.slice(0, 3).map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 text-xs text-zinc-200">
                            <Check className="w-3.5 h-3.5 text-[#EAD8B7] flex-shrink-0 mt-0.5" />
                            <span className="text-[11px] leading-tight">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Back CTA Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectService(service.id);
                      }}
                      className="w-full py-2.5 px-4 bg-[#EAD8B7] hover:bg-white text-[#0E282E] font-semibold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Reserve Appointment</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Explore all banner */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-zinc-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FAF9F6] border border-zinc-200 flex items-center justify-center text-[#0E282E]">
              <Award className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#0E282E]">Looking for a bespoke treatment plan?</p>
              <p className="text-xs text-zinc-500">We create comprehensive digital smile design simulations for every new patient.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {onNavigate && (
              <button
                onClick={() => onNavigate('services')}
                className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0E282E] bg-white hover:bg-zinc-100 border border-zinc-300 rounded-full transition-colors cursor-pointer"
              >
                All Services & Guide
              </button>
            )}
            <button
              onClick={() => onSelectService('consultation')}
              className="whitespace-nowrap px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#0E282E] hover:bg-[#153B44] rounded-full transition-colors cursor-pointer shadow-xs"
            >
              Request Smile Consultation &rarr;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
