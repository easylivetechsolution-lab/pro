import React, { useState } from 'react';
import { MapPin, Home, DollarSign, Search, ArrowRight } from 'lucide-react';
import type { Currency } from '../types';

interface HeroProps {
  onSearchSubmit: (filters: { location: string; type: string; priceRange: string }) => void;
  onExploreClick: () => void;
  onPrivateViewingClick: () => void;
  currentCurrency: Currency;
}

export const Hero: React.FC<HeroProps> = ({
  onSearchSubmit,
  onExploreClick,
  onPrivateViewingClick,
}) => {
  const [selectedLocation, setSelectedLocation] = useState('Any location');
  const [selectedType, setSelectedType] = useState('Any type');
  const [selectedPrice, setSelectedPrice] = useState('Any price');

  const locationOptions = [
    'Any location',
    'Santorini, Greece',
    'Bali, Indonesia',
    'Aspen, Colorado, USA',
    'Cap d\'Antibes, France',
    'Gustavia, St. Barts',
    'St. Moritz, Switzerland',
  ];

  const typeOptions = [
    'Any type',
    'Cliff Estate',
    'Villa',
    'Alpine Chalet',
    'Penthouse',
    'Waterfront',
  ];

  const priceOptions = [
    'Any price',
    'Under $10,000,000',
    '$10,000,000 - $20,000,000',
    '$20,000,000+',
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit({
      location: selectedLocation,
      type: selectedType,
      priceRange: selectedPrice,
    });
  };

  return (
    <section id="hero-section" className="relative min-h-[92vh] md:min-h-screen flex flex-col justify-between pt-28 md:pt-32 pb-12 overflow-hidden">
      {/* Background Image with Cinematic Overlay matching screenshot */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=2400&q=88"
          alt="Luxury coastal estate infinity pool sunset"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        {/* Subtle gradient scrims matching the screenshot's rich sunset tones */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e12] via-transparent to-black/60" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/20 to-black/60" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full my-auto">
        <div className="max-w-3xl space-y-5 pt-8 md:pt-14">
          {/* Eyebrow with gold horizontal accent line */}
          <div className="flex items-center space-x-3">
            <span className="w-10 h-[2px] bg-[#c5a880]" />
            <span className="text-[11px] md:text-xs font-semibold tracking-[0.28em] text-[#d8b88a] uppercase">
              LUXURY REAL ESTATE WORLDWIDE
            </span>
          </div>

          {/* Majestic Hero Headline */}
          <h1 className="font-serif-luxury text-5xl sm:text-6xl md:text-7xl lg:text-[84px] font-normal leading-[1.04] tracking-tight text-white drop-shadow-md">
            LIVE BEYOND <br className="hidden sm:inline" />
            EXPECTATION
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-[#d4d7e0] font-light tracking-wide max-w-xl">
            Exceptional homes. Remarkable places.
          </p>

          {/* Action CTAs */}
          <div className="pt-3 flex flex-wrap items-center gap-4">
            <button
              id="hero-explore-btn"
              onClick={onExploreClick}
              className="inline-flex items-center gap-2.5 px-6 md:px-7 py-3.5 bg-[#c5a880] hover:bg-[#d8b88a] text-[#0f1015] text-xs md:text-sm font-semibold tracking-[0.15em] rounded transition-all transform active:scale-95 shadow-lg group"
            >
              <span>EXPLORE PROPERTIES</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              id="hero-private-viewing-btn"
              onClick={onPrivateViewingClick}
              className="inline-flex items-center gap-2.5 px-6 md:px-7 py-3.5 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white border border-white/20 hover:border-white/40 text-xs md:text-sm font-medium tracking-[0.15em] rounded transition-all transform active:scale-95 group"
            >
              <span>PRIVATE VIEWING</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Filter Bar - Exact match to screenshot docked at base of hero */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full mt-10 md:mt-16">
        <form
          id="hero-filter-bar"
          onSubmit={handleSearch}
          className="bg-[#12141a]/95 backdrop-blur-md border border-[#272b36] rounded-md shadow-2xl p-2 md:p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-0 items-center divide-y sm:divide-y-0 sm:divide-x divide-[#242833]"
        >
          {/* Location Field */}
          <div className="px-4 py-2.5 flex items-center space-x-3.5 group">
            <MapPin className="w-5 h-5 text-[#c5a880] shrink-0" />
            <div className="flex-1 min-w-0">
              <label htmlFor="filter-location-select" className="block text-[10px] font-medium tracking-wider text-[#8b91a0] uppercase">
                Location
              </label>
              <select
                id="filter-location-select"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full bg-transparent text-sm text-white font-medium focus:outline-none cursor-pointer tracking-wide appearance-none truncate"
              >
                {locationOptions.map((opt) => (
                  <option key={opt} value={opt} className="bg-[#14161c] text-white">
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Property Type Field */}
          <div className="px-4 py-2.5 flex items-center space-x-3.5 group">
            <Home className="w-5 h-5 text-[#c5a880] shrink-0" />
            <div className="flex-1 min-w-0">
              <label htmlFor="filter-type-select" className="block text-[10px] font-medium tracking-wider text-[#8b91a0] uppercase">
                Property Type
              </label>
              <select
                id="filter-type-select"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-transparent text-sm text-white font-medium focus:outline-none cursor-pointer tracking-wide appearance-none truncate"
              >
                {typeOptions.map((opt) => (
                  <option key={opt} value={opt} className="bg-[#14161c] text-white">
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Price Range Field */}
          <div className="px-4 py-2.5 flex items-center space-x-3.5 group">
            <DollarSign className="w-5 h-5 text-[#c5a880] shrink-0" />
            <div className="flex-1 min-w-0">
              <label htmlFor="filter-price-select" className="block text-[10px] font-medium tracking-wider text-[#8b91a0] uppercase">
                Price
              </label>
              <select
                id="filter-price-select"
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="w-full bg-transparent text-sm text-white font-medium focus:outline-none cursor-pointer tracking-wide appearance-none truncate"
              >
                {priceOptions.map((opt) => (
                  <option key={opt} value={opt} className="bg-[#14161c] text-white">
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="p-1 md:pl-3">
            <button
              id="hero-filter-search-submit"
              type="submit"
              className="w-full h-full min-h-[46px] flex items-center justify-center space-x-2 bg-[#c5a880] hover:bg-[#d8b88a] text-[#0e1015] font-semibold text-xs tracking-[0.2em] rounded transition-all active:scale-[0.98]"
            >
              <Search className="w-4 h-4" />
              <span>SEARCH</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
