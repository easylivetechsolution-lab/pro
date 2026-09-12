import React, { useState } from 'react';
import { ArrowRight, Cpu, X, Check } from 'lucide-react';
import { TECH_DATA } from '../data/dentalData';
import { type TechItem } from '../types';

interface TechnologySectionProps {
  onOpenBooking: () => void;
  onNavigate?: (page: string) => void;
}

export const TechnologySection: React.FC<TechnologySectionProps> = ({ onOpenBooking, onNavigate }) => {
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(null);

  return (
    <section id="technology" className="py-20 lg:py-28 bg-white border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#5B7980] mb-2">
              <Cpu className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Our Technology</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#0E282E] tracking-tight">
              Advanced Technology. Better Results.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-600 max-w-xl">
              We invest in world-class digital dental equipment to make every appointment exponentially faster, gentler, and hyper-precise.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {onNavigate && (
              <button
                onClick={() => onNavigate('technology')}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#0E282E] hover:bg-[#153B44] rounded-full transition-colors cursor-pointer shadow-xs"
              >
                <span>Full Technology Suite &rarr;</span>
              </button>
            )}
            <button
              onClick={onOpenBooking}
              className="w-fit inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0E282E] bg-[#FAF9F6] hover:bg-zinc-100 border border-zinc-300 rounded-full transition-colors cursor-pointer"
            >
              <span>Book Tech Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TECH_DATA.map((tech) => (
            <div
              key={tech.id}
              onClick={() => setSelectedTech(tech)}
              className="group cursor-pointer rounded-2xl bg-white border border-zinc-200/90 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Image Preview */}
              <div className="h-44 w-full overflow-hidden bg-zinc-100 relative">
                <img
                  src={tech.image}
                  alt={tech.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-2 left-2 text-[10px] font-semibold text-white bg-black/50 px-2 py-0.5 rounded-sm backdrop-blur-xs">
                  Click to inspect specs
                </span>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#0E282E] mb-1">
                    {tech.name}
                  </h3>
                  <p className="text-xs text-zinc-500 font-medium mb-3">
                    {tech.tagline}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-semibold text-[#0E282E]">
                  <span className="text-[11px] text-[#5B7980]">View comfort benefits</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tech Detail Modal */}
        {selectedTech && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-zinc-200">
              <div className="relative h-48 w-full bg-zinc-100">
                <img
                  src={selectedTech.image}
                  alt={selectedTech.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedTech(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 sm:p-8">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FAF9F6] border border-zinc-200 text-[#0E282E] text-[11px] font-bold uppercase tracking-wider mb-2">
                  Clinical Specification
                </div>
                <h3 className="text-2xl font-serif text-[#0E282E] font-bold mb-1">
                  {selectedTech.name}
                </h3>
                <p className="text-xs text-[#5B7980] font-semibold mb-4">
                  {selectedTech.tagline}
                </p>

                <p className="text-sm text-zinc-600 leading-relaxed mb-6">
                  {selectedTech.description}
                </p>

                <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-zinc-200 mb-6 flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-zinc-900 block">Patient Comfort Guarantee:</span>
                    <span className="text-xs text-zinc-600">{selectedTech.comfortBenefit}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedTech(null)}
                    className="flex-1 py-2.5 text-xs font-medium text-zinc-600 hover:text-zinc-900 border border-zinc-200 rounded-xl"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setSelectedTech(null);
                      onOpenBooking();
                    }}
                    className="flex-1 py-2.5 text-xs font-semibold text-white bg-[#0E282E] rounded-xl hover:bg-[#153B44]"
                  >
                    Experience In Person
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
