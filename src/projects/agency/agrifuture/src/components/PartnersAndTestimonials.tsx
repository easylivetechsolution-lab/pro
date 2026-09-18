import React from 'react';
import { Quote, ShieldCheck, Award, Building2, Globe2, Sparkles } from 'lucide-react';
import { PARTNERS } from '../data';

export const PartnersAndTestimonials: React.FC = () => {
  return (
    <section className="py-16 bg-[#05160e] text-white border-t border-[#c39953]/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Testimonial */}
          <div className="lg:col-span-5 space-y-3">
            <div className="inline-flex items-center gap-2 text-[#34d399] text-xs font-semibold uppercase tracking-wider">
              <span>TESTIMONIALS</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">
              Trusted by Global Partners
            </h3>

            <div className="relative pl-6 border-l-2 border-[#c39953] space-y-2">
              <p className="text-sm sm:text-base text-gray-300 italic leading-relaxed">
                "Their commitment to quality and sustainability has made them an invaluable partner in our supply chain."
              </p>
              <span className="block text-xs font-semibold text-[#d8b06d] tracking-wider uppercase">
                — Global Food Distributor
              </span>
            </div>
          </div>

          {/* Right Column: Partners Logo Carousel / Grid */}
          <div className="lg:col-span-7">
            <div className="space-y-4">
              <span className="text-[11px] font-mono tracking-widest text-gray-400 uppercase block text-center lg:text-left">
                OUR VERIFIED PARTNERS & CONSORTIUMS
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {PARTNERS.map((partner) => (
                  <div
                    key={partner.name}
                    className="p-4 rounded-xl bg-[#092217] border border-[#22c55e]/20 hover:border-[#c39953]/60 transition-all text-center flex flex-col items-center justify-center gap-2 group cursor-pointer"
                  >
                    <Building2 className="w-5 h-5 text-emerald-400 group-hover:text-[#d8b06d] transition-colors" />
                    <span className="text-xs font-bold text-white group-hover:text-[#d8b06d] transition-colors">
                      {partner.name.split(' ')[0]}
                    </span>
                    <span className="text-[9px] text-gray-400 line-clamp-1">
                      {partner.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
