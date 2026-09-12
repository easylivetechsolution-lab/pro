import React, { useState } from 'react';
import { 
  Award, ShieldCheck, Smile, HeartPulse, Check, ArrowRight, 
  Clock, Calendar, ChevronRight, CheckCircle2, RotateCw, Filter
} from 'lucide-react';
import { SERVICES_DATA, CLINIC_INFO } from '../data/dentalData';
import { type ServiceItem } from '../types';

interface ServicesPageProps {
  onOpenBooking: (serviceId?: string) => void;
  onOpenQuiz: () => void;
  onNavigate: (page: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenBooking, onOpenQuiz, onNavigate }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<ServiceItem | null>(null);

  // Full extended services list
  const allServices: ServiceItem[] = [
    ...SERVICES_DATA,
    {
      id: 'hygiene',
      title: 'Guided Biofilm Therapy & Wellness Hygiene',
      category: 'preventive',
      shortDesc: 'Gentle, spa-like teeth cleaning utilizing warm water and non-abrasive erythritol powder.',
      fullDesc: 'The Swiss EMS Airflow protocol eliminates harmful bacteria and surface stains from enamel, veneers, and dental implants without cold water sensitivity or scraping instruments.',
      image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=800&auto=format&fit=crop',
      iconName: 'ShieldCheck',
      timeline: '45 - 60 minutes',
      recovery: 'Immediate',
      pricing: '$140 or 100% Insured',
      features: [
        'Heated 37°C water eliminates cold sensitivity',
        'Completely safe on delicate porcelain and composite veneers',
        'Deep subgingival biofilm elimination',
        'Includes oral cancer screening and digital gum health mapping'
      ]
    },
    {
      id: 'emergency-care',
      title: 'Same-Day Emergency Dental Care',
      category: 'general',
      shortDesc: 'Immediate relief for sudden toothaches, broken restorations, or oral trauma.',
      fullDesc: 'We reserve daily priority appointments for dental emergencies. Experience rapid digital triage, immediate pain alleviation, and gentle restorative stabilization on the spot.',
      image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?q=80&w=800&auto=format&fit=crop',
      iconName: 'HeartPulse',
      timeline: 'Immediate same-day triage',
      recovery: 'Immediate to 24 hours',
      pricing: 'Urgent triage from $95',
      features: [
        'Guaranteed same-day triage availability',
        'Instant digital nerve and root CBCT scans',
        'Immediate local anesthesia & tooth stabilization',
        'Direct coordination with your dental insurance'
      ]
    },
    {
      id: 'tmj',
      title: 'TMJ Therapy & Custom Nightguards',
      category: 'general',
      shortDesc: 'Relieve chronic jaw pain, morning headaches, and tooth grinding with precision digital orthotics.',
      fullDesc: 'Using our digital iTero 5D bite simulator, we analyze occlusion forces and 3D print ultra-thin, crystal-clear nightguards that protect porcelain restorations and decompress the temporomandibular joint.',
      image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop',
      iconName: 'Smile',
      timeline: '1 digital scan + 1 fitting',
      recovery: 'Immediate relief',
      pricing: 'From $480',
      features: [
        'Digitally 3D printed for featherweight, snug comfort',
        'Prevents costly chipping of natural teeth and veneers',
        'Decompresses TMJ muscles to eliminate tension headaches',
        'Durable medical-grade hypoallergenic resin'
      ]
    }
  ];

  const filteredServices = allServices.filter((s) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'cosmetic') return s.category === 'cosmetic';
    if (selectedFilter === 'restorative') return s.category === 'restorative';
    if (selectedFilter === 'ortho') return s.category === 'ortho';
    if (selectedFilter === 'preventive') return s.category === 'preventive' || s.category === 'general';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-zinc-900 pt-6 pb-24">
      {/* Top Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
          <button 
            onClick={() => onNavigate('home')}
            className="hover:text-[#0E282E] transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-[#0E282E] font-semibold">Services</span>
        </div>
      </div>

      {/* Page Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="rounded-3xl bg-[#0E282E] text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl">
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute left-1/4 bottom-0 w-80 h-80 bg-[#16363D]/40 rounded-full blur-2xl pointer-events-none" />

          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#EAD8B7] text-xs font-semibold uppercase tracking-widest mb-6">
              <Award className="w-3.5 h-3.5" />
              <span>Full Clinical Service Menu</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal text-white tracking-tight mb-6 leading-tight">
              Bespoke Dental Treatments Crafted for Longevity
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-light mb-8">
              From individual cosmetic transformations to full restorative mouth rehabilitations, every treatment at PearlView Dental Studio is tailored to your unique facial aesthetics and oral biology.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenBooking()}
                className="px-8 py-4 bg-[#EAD8B7] hover:bg-white text-[#0E282E] font-semibold text-xs sm:text-sm tracking-wider uppercase rounded-full shadow-lg transition-all duration-200 cursor-pointer"
              >
                Reserve Treatment Consultation
              </button>
              <button
                onClick={onOpenQuiz}
                className="px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm rounded-full transition-colors border border-white/15 cursor-pointer flex items-center gap-2"
              >
                <span>Take Virtual Smile Quiz</span>
                <Smile className="w-4 h-4 text-[#D4AF37]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#0E282E]" />
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-700">Filter Treatments:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Services' },
              { id: 'cosmetic', label: 'Cosmetic Design' },
              { id: 'restorative', label: 'Restorative & Implants' },
              { id: 'ortho', label: 'Invisalign®' },
              { id: 'preventive', label: 'Wellness & Sedation' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedFilter === f.id
                    ? 'bg-[#0E282E] text-white shadow-xs'
                    : 'bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-zinc-300'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl border border-zinc-200/90 shadow-2xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col group"
            >
              {/* Image Banner */}
              <div className="relative h-56 w-full overflow-hidden bg-zinc-100">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full text-[11px] font-bold text-[#0E282E] shadow-xs">
                  {service.timeline}
                </div>
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-xs px-3 py-1 rounded-full text-[11px] font-medium text-white border border-white/20">
                  {service.pricing}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#0E282E] mb-2 group-hover:text-[#184650] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>

                  <div className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-zinc-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="text-[11px] leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedServiceDetail(service)}
                    className="text-xs font-semibold text-[#0E282E] hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>Full Specs</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onOpenBooking(service.id)}
                    className="px-4 py-2 bg-[#0E282E] hover:bg-[#153B44] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    Reserve Visit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal if selected */}
      {selectedServiceDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-zinc-200 relative overflow-hidden">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#5B7980]">
                  Clinical Overview
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#0E282E] mt-1">
                  {selectedServiceDetail.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedServiceDetail(null)}
                className="w-8 h-8 rounded-full bg-zinc-100 text-zinc-500 hover:text-zinc-900 flex items-center justify-center cursor-pointer"
              >
                &times;
              </button>
            </div>

            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6">
              {selectedServiceDetail.fullDesc}
            </p>

            <div className="grid grid-cols-2 gap-3 p-3.5 bg-[#FAF9F6] rounded-2xl border border-zinc-200 mb-6 text-xs">
              <div>
                <span className="text-zinc-400 block text-[10px] uppercase font-bold">Estimated Visits</span>
                <span className="font-semibold text-zinc-900">{selectedServiceDetail.timeline}</span>
              </div>
              <div>
                <span className="text-zinc-400 block text-[10px] uppercase font-bold">Standard Pricing</span>
                <span className="font-semibold text-zinc-900">{selectedServiceDetail.pricing}</span>
              </div>
            </div>

            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 mb-3">
              Included In Every Treatment:
            </h4>
            <ul className="space-y-2 mb-8 text-xs text-zinc-700">
              {selectedServiceDetail.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <div className="flex gap-3">
              <button
                onClick={() => setSelectedServiceDetail(null)}
                className="flex-1 py-3 border border-zinc-300 text-zinc-700 text-xs font-semibold rounded-xl hover:bg-zinc-50 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const sId = selectedServiceDetail.id;
                  setSelectedServiceDetail(null);
                  onOpenBooking(sId);
                }}
                className="flex-1 py-3 bg-[#0E282E] hover:bg-[#153B44] text-white text-xs font-semibold uppercase tracking-wider rounded-xl shadow-md cursor-pointer"
              >
                Book This Service
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4-Step Patient Journey Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-zinc-200/90 shadow-sm p-8 sm:p-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-bold tracking-widest text-[#5B7980] block mb-2">
              The PearlView Protocol
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#0E282E]">
              What to Expect: Your Treatment Journey
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-2">
              Every procedure follows our calm, predictable 4-step protocol designed for zero surprises and enduring clinical results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-zinc-200">
              <span className="text-xs font-bold text-[#D4AF37] block mb-1">Step 01</span>
              <h3 className="text-base font-serif font-semibold text-[#0E282E] mb-2">3D Digital Mapping</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                High-definition iTero 5D scans and diagnostic photos. No messy impression trays.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-zinc-200">
              <span className="text-xs font-bold text-[#D4AF37] block mb-1">Step 02</span>
              <h3 className="text-base font-serif font-semibold text-[#0E282E] mb-2">Virtual Smile Preview</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Review your simulated post-treatment smile together with Dr. Chen on 4K chairside screens.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-zinc-200">
              <span className="text-xs font-bold text-[#D4AF37] block mb-1">Step 03</span>
              <h3 className="text-base font-serif font-semibold text-[#0E282E] mb-2">Micro-Gentle Care</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Precision laser and CAD/CAM fabrication with heated chairs and noise-canceling headphones.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-zinc-200">
              <span className="text-xs font-bold text-[#D4AF37] block mb-1">Step 04</span>
              <h3 className="text-base font-serif font-semibold text-[#0E282E] mb-2">Guaranteed Longevity</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Multi-year clinical warranties, custom protective guards, and seamless ongoing wellness checkups.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
