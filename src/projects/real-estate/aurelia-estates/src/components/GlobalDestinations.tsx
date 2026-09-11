import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import type { Destination } from '../types';

interface GlobalDestinationsProps {
  destinations: Destination[];
  onSelectDestination: (destination: Destination) => void;
}

export const GlobalDestinations: React.FC<GlobalDestinationsProps> = ({
  destinations,
  onSelectDestination,
}) => {
  return (
    <section id="destinations" className="py-24 bg-[#0d0e12] border-t border-[#1c1f28] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header matching screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center space-x-3">
              <span className="w-8 h-[2px] bg-[#c5a880]" />
              <span className="text-[11px] font-semibold tracking-[0.25em] text-[#c5a880] uppercase">
                GLOBAL DESTINATIONS
              </span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-normal tracking-tight">
              Iconic Places. <br className="hidden sm:inline" />
              Timeless Value.
            </h2>
            <p className="text-[#9fa6b5] text-base md:text-lg font-light max-w-2xl leading-relaxed">
              From coastal retreats to vibrant cities and mountain sanctuaries, we help you find the perfect place — wherever your journey leads.
            </p>
          </div>

          <div className="lg:col-span-4 lg:text-right">
            <button
              onClick={() => onSelectDestination(destinations[0])}
              className="inline-flex items-center space-x-2 text-xs font-semibold tracking-[0.2em] text-[#c7cbd4] hover:text-[#d8b88a] transition-colors group"
            >
              <span>EXPLORE DESTINATIONS</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* 4 Cards Grid - Exact match to screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest) => (
            <div
              key={dest.id}
              id={`destination-card-${dest.id}`}
              onClick={() => onSelectDestination(dest)}
              className="group cursor-pointer relative aspect-[3/4] rounded-lg overflow-hidden border border-[#232733] hover:border-[#c5a880]/50 transition-all duration-500 shadow-xl"
            >
              {/* Background Image */}
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-300 group-hover:opacity-85" />

              {/* Tag / Properties count badge */}
              <div className="absolute top-4 left-4">
                <span className="px-2.5 py-1 text-[9.5px] font-semibold tracking-wider uppercase bg-black/60 backdrop-blur-md text-[#d8b88a] border border-white/10 rounded flex items-center gap-1">
                  <Compass className="w-3 h-3" />
                  <span>{dest.propertiesCount} Estates</span>
                </span>
              </div>

              {/* Bottom Label matching screenshot */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                <div>
                  <h3 className="font-sans text-xs md:text-sm font-semibold tracking-[0.25em] text-white uppercase group-hover:text-[#d8b88a] transition-colors">
                    {dest.name}
                  </h3>
                  <p className="text-[11px] text-[#9ca3af] line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {dest.subtitle}
                  </p>
                </div>
                <div className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#c5a880] group-hover:text-black transition-all">
                  <ArrowRight className="w-3.5 h-3.5 -rotate-45 group-hover:rotate-0 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
