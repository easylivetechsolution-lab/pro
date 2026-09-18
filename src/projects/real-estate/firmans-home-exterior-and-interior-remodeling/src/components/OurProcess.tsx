import React from 'react';
import { ArrowRight } from 'lucide-react';
import cutawayEstateImg from '../assets/images/architectural_cutaway_estate_1789529138902.jpg';

interface OurProcessProps {
  onOpenQuote: () => void;
}

export const OurProcess: React.FC<OurProcessProps> = ({ onOpenQuote }) => {
  const steps = [
    {
      number: '01',
      title: 'Architectural Consultation',
      desc: 'On-site structural evaluation and comprehensive vision alignment.',
    },
    {
      number: '02',
      title: 'CAD Drafting & Permitting',
      desc: '3D spatial plans, engineering specifications, and municipal approvals.',
    },
    {
      number: '03',
      title: 'Precision Construction',
      desc: 'Master tradespeople guided daily by on-site project superintendents.',
    },
    {
      number: '04',
      title: 'Zero-Defect Handover',
      desc: 'Detailed walkthrough, final touch-ups, and warranty registration.',
    },
  ];

  return (
    <section id="process" className="py-24 sm:py-32 bg-white text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: 4 Process Steps */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-[#C07848]">
                METHODOLOGY
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 font-serif leading-tight">
                Architectural Discipline <br />
                <span className="text-[#C07848]">From Inception to Finish</span>
              </h2>
              <p className="text-base text-slate-600 font-light leading-relaxed">
                A predictable, transparent remodeling journey with single-point accountability.
              </p>
            </div>

            {/* The 4 steps */}
            <div className="space-y-6 pt-2">
              {steps.map((step) => (
                <div key={step.number} className="flex items-start gap-5 group">
                  {/* Step Number Badge */}
                  <div className="w-12 h-12 rounded-full bg-[#C07848]/10 border border-[#C07848]/40 flex items-center justify-center text-[#C07848] font-bold text-sm shrink-0 group-hover:bg-[#C07848] group-hover:text-white transition-all duration-200">
                    {step.number}
                  </div>

                  {/* Title & Description */}
                  <div className="pt-0.5">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#C07848] transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed font-light">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Consultation Button */}
            <div className="pt-4">
              <button
                id="process-get-started-btn"
                onClick={onOpenQuote}
                className="inline-flex items-center gap-2.5 bg-[#C07848] hover:bg-[#D28A5B] text-white font-semibold px-8 py-3.5 rounded-full text-sm tracking-wide shadow-md shadow-[#C07848]/20 transition-all duration-200 cursor-pointer"
              >
                <span>Initiate Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Architectural Blueprint Full Container without Dark Edges */}
          <div className="lg:col-span-7">
            <div className="relative w-full aspect-[16/11] sm:aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-100 group">
              <img
                src={cutawayEstateImg}
                alt="Architectural design cross-section cutaway visualization"
                className="w-full h-full object-cover select-none"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
