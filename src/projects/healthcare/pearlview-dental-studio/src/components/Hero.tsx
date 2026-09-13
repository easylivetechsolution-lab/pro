import React from 'react';
import { ArrowRight, Star, CheckCircle2, Scan, Compass } from 'lucide-react';
import { motion } from 'motion/react';
import { CLINIC_INFO } from '../data/dentalData';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenQuiz: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenQuiz }) => {
  return (
    <section id="hero-section" className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Subtle luxury ambient glow backgrounds */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#EAD8B7]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-24 w-96 h-96 bg-[#0E282E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Hero Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Tagline Eyebrow Pill - Balanced White Container with Elegant Shadow */}
            <div className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-white border border-zinc-200 shadow-sm text-[#0E282E] text-xs sm:text-[13px] font-bold tracking-wider uppercase mb-5.5">
              <span>Austin’s Sanctuary for Radiant Smiles & Anxiety-Free Care</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-serif font-medium tracking-tight text-[#0E282E] leading-[1.15] mb-6">
              A smile you love to share, <br className="hidden sm:inline" />
              <span className="italic font-normal text-[#1E434B]">care you actually look forward to.</span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-zinc-600 font-normal leading-relaxed max-w-2xl mb-8">
              {CLINIC_INFO.subtagline}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <button
                id="hero-book-btn"
                onClick={onOpenBooking}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-4 text-sm font-semibold tracking-wide uppercase text-white bg-[#0E282E] hover:bg-[#153B44] active:scale-[0.98] rounded-full shadow-lg shadow-[#0E282E]/20 transition-all duration-200 cursor-pointer"
              >
                <span>Book an appointment</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5" />
              </button>

              <button
                type="button"
                onClick={onOpenQuiz}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium text-[#0E282E] bg-white border border-zinc-300 hover:border-zinc-400 hover:bg-zinc-50 rounded-full transition-all duration-200 cursor-pointer"
              >
                <span>Smile Assessment Quiz</span>
                <Compass className="w-4 h-4 text-zinc-500" />
              </button>
            </div>

            {/* Social Proof & Trust Credentials */}
            <div className="w-full pt-6 border-t border-zinc-200/80 flex flex-wrap items-center gap-6 sm:gap-8">
              {/* Star Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center text-[#D4AF37] gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <div className="text-xs text-zinc-700 font-medium">
                  <span className="font-bold text-zinc-900 mr-1">5.0</span>
                  <span>({CLINIC_INFO.reviewsCount} patient reviews)</span>
                </div>
              </div>

              {/* Accepting New Patients Badge */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0E282E]/5 border border-[#0E282E]/15 text-[#0E282E] text-xs font-semibold">
                <span>Accepting new patients</span>
              </div>
            </div>
          </motion.div>

          {/* Right Hero Visual Column with Floating Luxury Accents */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Photo Container with Arch/Rounded aesthetic */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-zinc-100 aspect-4/5 group">
                <img
                  src="https://images.unsplash.com/photo-1629909615184-74f495363b67?q=80&w=1000&auto=format&fit=crop"
                  alt="Delighted patient smiling after dental treatment at PearlView Dental Studio"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />
                
                {/* Subtle gradient overlay at base */}
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 text-white p-3 rounded-xl bg-black/30 backdrop-blur-md border border-white/20">
                  <p className="text-xs font-medium tracking-wide">
                    &ldquo;Best dental experience of my life. Calm, caring, and stunning results.&rdquo;
                  </p>
                  <p className="text-[11px] text-[#EAD8B7] mt-1 font-semibold">
                    &mdash; Sarah Jenkins &bull; Austin, TX
                  </p>
                </div>
              </div>

              {/* Top Floating Badge: Advanced Digital Technology */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
                className="absolute -top-4 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-4 shadow-xl border border-zinc-100 flex items-center gap-3 z-20"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0E282E] text-[#D4AF37] flex items-center justify-center flex-shrink-0">
                  <Scan className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-900">iTero® 5D Scans</p>
                  <p className="text-[11px] text-zinc-500">Zero messy impressions</p>
                </div>
              </motion.div>

              {/* Bottom Floating Badge: Luxury Comfort Suite */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-6 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-4 shadow-xl border border-zinc-100 flex items-center gap-3 z-20"
              >
                <div className="w-10 h-10 rounded-xl bg-[#E8EFF0] text-[#0E282E] flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-[#0E282E]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-900">Heated Massage Chairs</p>
                  <p className="text-[11px] text-zinc-500">Spa-like relaxation suites</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
