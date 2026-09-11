import React from 'react';
import { ArrowRight, ShieldCheck, KeyRound, FileLock2 } from 'lucide-react';

interface PrivateCollectionProps {
  onDiscoverClick: () => void;
}

export const PrivateCollection: React.FC<PrivateCollectionProps> = ({ onDiscoverClick }) => {
  return (
    <section id="private-collection" className="py-20 md:py-28 bg-[#0b0c0e] relative overflow-hidden border-t border-[#1c1f28]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text Block matching screenshot */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center space-x-3">
              <span className="w-8 h-[2px] bg-[#c5a880]" />
              <span className="text-[11px] font-semibold tracking-[0.25em] text-[#c5a880] uppercase">
                PRIVATE COLLECTION
              </span>
            </div>

            <h2 className="font-serif-luxury text-4xl md:text-5xl lg:text-6xl text-white font-normal leading-tight tracking-tight">
              Off-Market Homes
            </h2>

            <p className="text-[#a4abb8] text-base leading-relaxed font-light">
              Access to exclusive properties not publicly listed. Our private collection features rare and extraordinary homes reserved for qualified buyers. Discretion, trust and unmatched access define the AURELIA ESTATES experience.
            </p>

            {/* Exclusive Guarantee Badges */}
            <div className="grid grid-cols-2 gap-4 py-3 border-y border-[#1e222c]">
              <div className="flex items-center space-x-2.5 text-xs text-[#c5c9d4]">
                <ShieldCheck className="w-4 h-4 text-[#c5a880] shrink-0" />
                <span>Strict Non-Disclosure Protocols</span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs text-[#c5c9d4]">
                <KeyRound className="w-4 h-4 text-[#c5a880] shrink-0" />
                <span>Direct Principal Access</span>
              </div>
            </div>

            <div>
              <button
                id="discover-private-collection-btn"
                onClick={onDiscoverClick}
                className="inline-flex items-center space-x-3 px-7 py-4 bg-[#c5a880] hover:bg-[#d8b88a] text-[#0d0e12] font-semibold text-xs md:text-sm tracking-[0.18em] rounded transition-all active:scale-[0.98] shadow-lg group"
              >
                <span>DISCOVER THE PRIVATE COLLECTION</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Image Block matching screenshot */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-lg overflow-hidden border border-[#232733] shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85"
                alt="Exclusive off-market luxury villa interior overlooking ocean sunset"
                className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Discreet badge */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between p-4 bg-black/70 backdrop-blur-md border border-white/10 rounded-md">
                <div className="flex items-center space-x-3">
                  <FileLock2 className="w-5 h-5 text-[#c5a880]" />
                  <div>
                    <p className="text-xs font-semibold text-white tracking-wider">CONFIDENTIAL ASSET REGISTRY</p>
                    <p className="text-[11px] text-[#9ca3af]">18 Global Off-Market Residences Currently Available</p>
                  </div>
                </div>
                <span className="text-[10px] uppercase px-2.5 py-1 bg-[#c5a880]/20 text-[#d8b88a] font-medium tracking-wider rounded border border-[#c5a880]/30">
                  Qualified Only
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
