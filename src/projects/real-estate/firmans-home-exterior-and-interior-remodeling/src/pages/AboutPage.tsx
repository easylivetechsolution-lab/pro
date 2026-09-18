import React from 'react';
import {
  ShieldCheck,
  Award,
  Users,
  Clock,
  Compass,
  Building,
  CheckCircle2,
  ArrowRight,
  Hammer
} from 'lucide-react';
import cutawayEstateImg from '../assets/images/architectural_cutaway_estate_1789529138902.jpg';

interface AboutPageProps {
  onOpenQuote: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenQuote }) => {
  const leadership = [
    {
      name: 'David Firman',
      role: 'Founder & Principal Master Builder',
      experience: '24 Years Master Carpentry & Structural Engineering',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      bio: 'David founded Firmans with a singular mission: bridge the gap between high-end architectural studio design and field construction execution.'
    },
    {
      name: 'Elena Rostova, AIA',
      role: 'Lead Architectural Designer',
      experience: '16 Years Residential Architecture & Space Planning',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      bio: 'Elena oversees all CAD drafting, structural permit filings, and custom material palettes, ensuring every client residence achieves timeless balance.'
    },
    {
      name: 'Marcus Vance',
      role: 'General Field Superintendent',
      experience: '18 Years Commercial & Luxury Residential Management',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      bio: 'Marcus directs daily trade operations, municipal building code inspections, and sub-contractor craftsmanship to ensure zero-defect handovers.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B131E] text-slate-100 pt-28 pb-24">
      {/* Hero Header */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#182335] border border-white/10 text-xs font-semibold uppercase tracking-[0.22em] text-[#C07848] mb-5">
          <span>The Firmans Standard</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-white mb-6 max-w-4xl mx-auto leading-[1.12]">
          Built on Architectural Precision and Enduring Craft
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
          We don't simply remodel homes — we preserve structural integrity, elevate everyday living spaces, and protect your most valuable investment.
        </p>
      </section>

      {/* Story & Image Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C07848]">
              OUR PHILOSOPHY
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-snug">
              Every detail matters, because your home is your sanctuary.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
              Established with the goal of bringing uncompromising architectural standards to residential remodeling, Firmans Home Exterior &amp; Interior Remodeling operates as a unified design-build firm.
            </p>
            <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
              By combining in-house architectural drafting, licensed master builders, and direct manufacturer supply partnerships, we eliminate the finger-pointing and unexpected change orders typical in traditional contracting.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-[#121C2B] border border-white/10">
                <span className="block text-2xl sm:text-3xl font-serif font-bold text-[#C07848]">
                  420+
                </span>
                <span className="text-xs text-slate-400 mt-1 block">
                  Completed Fine Renovations
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-[#121C2B] border border-white/10">
                <span className="block text-2xl sm:text-3xl font-serif font-bold text-[#C07848]">
                  18+
                </span>
                <span className="text-xs text-slate-400 mt-1 block">
                  Years of Continuous Service
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-[4/3]">
              <img
                src={cutawayEstateImg}
                alt="Firmans architectural design philosophy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B131E]/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#0F172A]/90 backdrop-blur-md border border-white/10 text-xs text-slate-200">
                <span className="font-semibold text-white block mb-0.5">
                  Design-Build Integration
                </span>
                Seamless harmony between exterior structural lines and refined interior finishes.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 4 Firmans Pillars */}
      <section className="bg-[#101927] py-20 border-y border-white/10 mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C07848]">
              CORE PILLARS
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              The Firmans Commitment
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-2xl bg-[#142031] border border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#C07848]/15 border border-[#C07848]/40 flex items-center justify-center text-[#C07848]">
                <Hammer className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Expert Craftsmanship</h3>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Our tradespeople carry master certifications in roofing, glazing, masonry, and finish cabinetry.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#142031] border border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#C07848]/15 border border-[#C07848]/40 flex items-center justify-center text-[#C07848]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Premium Materials</h3>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Direct partnerships with Owens Corning, Milgard, and Cambria ensure commercial-grade endurance.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#142031] border border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#C07848]/15 border border-[#C07848]/40 flex items-center justify-center text-[#C07848]">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">On-Time Completion</h3>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Rigorous milestone scheduling and dedicated on-site superintendents keep your project on schedule.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#142031] border border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#C07848]/15 border border-[#C07848]/40 flex items-center justify-center text-[#C07848]">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Transparent Pricing</h3>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Comprehensive, line-item budgets with zero surprise add-ons. You approve every material upfront.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C07848]">
            OUR LEADERSHIP
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            Architects, Builders, &amp; Craftsmen
          </h2>
          <p className="text-sm text-slate-300 font-light">
            Every Firmans project is supervised directly by licensed master practitioners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {leadership.map((leader, idx) => (
            <div
              key={idx}
              className="bg-[#121C2B] rounded-2xl overflow-hidden border border-white/10 shadow-xl flex flex-col"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-6 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-serif font-bold text-white">
                    {leader.name}
                  </h3>
                  <span className="text-xs font-semibold text-[#C07848] block mb-1">
                    {leader.role}
                  </span>
                  <span className="text-[11px] text-slate-400 block mb-3">
                    {leader.experience}
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    {leader.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#121C2B] border border-white/10 text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Ready to Begin Your Architectural Transformation?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-light leading-relaxed">
            Contact Firmans today to discuss your vision with our principal architect and schedule your preliminary on-site evaluation.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenQuote}
              className="inline-flex items-center gap-2 bg-[#C07848] hover:bg-[#D28A5B] text-white font-semibold px-8 py-3.5 rounded-full text-sm tracking-wide shadow-lg shadow-[#C07848]/25 transition-all cursor-pointer"
            >
              <span>Schedule Initial Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
