import React from 'react';
import { ArrowRight, Award } from 'lucide-react';

interface CallToActionProps {
  onOpenBooking: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({ onOpenBooking }) => {
  return (
    <section id="cta-banner" className="relative py-20 lg:py-28 bg-[#0D2428] text-white overflow-hidden">
      {/* Decorative luxury radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#1B434B]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#EAD8B7] text-xs font-semibold tracking-widest uppercase mb-6">
          <Award className="w-3.5 h-3.5" />
          <span>Your Best Smile Awaits</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal text-white tracking-tight mb-5 leading-tight">
          Book Your Appointment Today
        </h2>

        <p className="text-base sm:text-lg text-zinc-300 max-w-xl mx-auto leading-relaxed mb-10 font-light">
          Take the first step toward a healthier, brighter, and effortlessly confident smile with Austin's leading cosmetic team.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="footer-cta-book-btn"
            onClick={onOpenBooking}
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#0E282E] bg-[#EAD8B7] hover:bg-white active:scale-98 rounded-full shadow-xl transition-all duration-200 cursor-pointer"
          >
            <span>Book an Appointment</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>

          <a
            href="tel:(512)595-0187"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 text-xs sm:text-sm font-medium text-zinc-200 hover:text-white border border-white/20 hover:border-white/40 rounded-full transition-all"
          >
            <span>Speak with Concierge Desk</span>
          </a>
        </div>
      </div>
    </section>
  );
};
