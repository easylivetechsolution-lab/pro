import React from 'react';
import { ArrowRight, Compass, ShieldCheck, Award } from 'lucide-react';

interface CtaBannerProps {
  onOpenQuote: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOpenQuote }) => {
  return (
    <section id="contact" className="relative py-20 sm:py-28 bg-[#0B131E] text-white overflow-hidden">
      {/* Background Architectural Living Space with Warm Ambient Lighting */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85"
          alt="Warm luxury modern architectural estate"
          className="w-full h-full object-cover object-center brightness-95 contrast-[1.05] saturate-[1.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B131E]/95 via-[#0B131E]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B131E] via-transparent to-black/25" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & CTA */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-[#C07848]">
              START YOUR PROJECT
            </span>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-serif leading-[1.15]">
              Let's Create Enduring <br />
              <span className="text-[#D28A5B]">Spaces Together</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-light leading-relaxed">
              Contact Firmans Home Exterior &amp; Interior Remodeling today to schedule your complimentary on-site architectural evaluation, layout review, and itemized pricing proposal.
            </p>

            <div className="pt-2">
              <button
                id="cta-get-quote-btn"
                onClick={onOpenQuote}
                className="group inline-flex items-center gap-2.5 bg-[#C07848] hover:bg-[#D28A5B] text-white font-semibold px-8 py-3.5 rounded-full text-sm sm:text-base tracking-wide shadow-xl shadow-[#C07848]/25 transition-all duration-200 cursor-pointer"
              >
                <span>Request Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: 3 Key Trust Badges */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-4 text-center">
            {/* Badge 1 */}
            <div className="flex flex-col items-center space-y-3 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="w-14 h-14 rounded-2xl bg-[#C07848]/15 border border-[#C07848]/40 flex items-center justify-center text-[#C07848]">
                <Compass className="w-6 h-6 stroke-[1.8]" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-white tracking-wide leading-snug">
                On-Site Review <br />&amp; CAD Layout
              </h4>
            </div>

            {/* Badge 2 */}
            <div className="flex flex-col items-center space-y-3 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="w-14 h-14 rounded-2xl bg-[#C07848]/15 border border-[#C07848]/40 flex items-center justify-center text-[#C07848]">
                <ShieldCheck className="w-6 h-6 stroke-[1.8]" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-white tracking-wide leading-snug">
                Fully Licensed <br />&amp; Insured
              </h4>
            </div>

            {/* Badge 3 */}
            <div className="flex flex-col items-center space-y-3 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="w-14 h-14 rounded-2xl bg-[#C07848]/15 border border-[#C07848]/40 flex items-center justify-center text-[#C07848]">
                <Award className="w-6 h-6 stroke-[1.8]" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-white tracking-wide leading-snug">
                Milestone &amp; Price <br />Guarantee
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
