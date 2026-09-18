import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Sparkles, HeartHandshake, ShieldCheck, Sprout } from 'lucide-react';

interface OurStoryProps {
  onReadMore: () => void;
}

export const OurStory: React.FC<OurStoryProps> = ({ onReadMore }) => {
  const [activeTab, setActiveTab] = useState<'soil' | 'roots'>('soil');

  return (
    <section id="story" className="py-20 lg:py-28 bg-[#f5f3eb] text-[#1a2e22] relative overflow-hidden">
      {/* Decorative Subtle Agricultural Watermark / Grid */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#c39953]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Mission Text */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[#15803d] text-xs sm:text-sm font-bold uppercase tracking-widest block">
              OUR STORY
            </span>

            <h2
              id="story-main-heading"
              className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0a2316] leading-tight"
            >
              The Land Is Our Foundation
            </h2>

            <p className="text-base sm:text-lg text-[#3b4e42] leading-relaxed font-normal">
              We believe that healthy soil, clean water and thriving biodiversity are the
              cornerstones of a sustainable food system. Our journey began with a simple mission:
              to farm responsibly and create lasting value for generations to come.
            </p>

            <div className="pt-2 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-[#22c55e]/15 flex items-center justify-center flex-shrink-0 mt-0.5 p-1 border border-[#22c55e]/25">
                  <img
                    src="/icons/story/stewardship.svg"
                    alt="Generational Stewardship Icon"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-sm text-[#3b4e42]">
                  <strong className="font-semibold text-[#0a2316]">Generational Stewardship:</strong>{' '}
                  Cultivating biological fertility rather than consuming finite inputs.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-[#c39953]/15 flex items-center justify-center flex-shrink-0 mt-0.5 p-1 border border-[#c39953]/30">
                  <img
                    src="/icons/story/certified.svg"
                    alt="Certified Purity Icon"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-sm text-[#3b4e42]">
                  <strong className="font-semibold text-[#0a2316]">Certified Purity:</strong>{' '}
                  Full transparency across soil tests, microbiology, and water conservation.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <button
                id="story-learn-more-btn"
                onClick={onReadMore}
                className="px-6 py-3 rounded-full bg-[#0d281a] hover:bg-[#133827] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 group"
              >
                <span>Our Story</span>
                <ArrowRight className="w-4 h-4 text-[#c39953] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Two High-End Photo Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Card 1: Healthy Soil Stronger Tomorrow */}
            <div
              id="story-card-soil"
              onClick={() => setActiveTab('soil')}
              className="group relative rounded-2xl overflow-hidden shadow-xl bg-white border border-[#c39953]/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80"
                  alt="Farmer hands cupping rich dark organic soil with a green seedling"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                {/* Card Overlay Text */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-1">
                  <span className="text-[11px] font-semibold text-[#34d399] tracking-wider uppercase">
                    BIOLOGICAL REGENERATION
                  </span>
                  <h3 className="text-xl font-bold leading-tight font-serif">
                    Healthy Soil
                    <br />
                    Stronger Tomorrow
                  </h3>
                  <p className="text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-1">
                    Enriched with diverse beneficial fungi and organic compost tea.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Nurturing Nature's Balance */}
            <div
              id="story-card-roots"
              onClick={() => setActiveTab('roots')}
              className="group relative rounded-2xl overflow-hidden shadow-xl bg-white border border-[#c39953]/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl cursor-pointer sm:translate-y-6"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"
                  alt="Deep root network beneath lush green crops"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                {/* Card Overlay Text */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-1">
                  <span className="text-[11px] font-semibold text-[#d8b06d] tracking-wider uppercase">
                    ECOSYSTEM EQUILIBRIUM
                  </span>
                  <h3 className="text-xl font-bold leading-tight font-serif">
                    Nurturing
                    <br />
                    Nature's Balance
                  </h3>
                  <p className="text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-1">
                    Multi-species pollinator hedgerows and native cover crops.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
