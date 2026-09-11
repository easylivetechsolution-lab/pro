import React, { useState } from 'react';
import { Bed, Bath, Maximize2, MapPin, ArrowRight, Heart, Eye } from 'lucide-react';
import type { Property, Currency } from '../types';
import { CURRENCY_RATES } from '../data/estatesData';

interface FeaturedPropertiesProps {
  properties: Property[];
  currentCurrency: Currency;
  onSelectProperty: (property: Property) => void;
  onOpenConsultationWithProperty?: (property: Property) => void;
}

export const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({
  properties,
  currentCurrency,
  onSelectProperty,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const formatPrice = (priceUSD: number) => {
    const rateInfo = CURRENCY_RATES[currentCurrency] || CURRENCY_RATES['USD'];
    const converted = Math.round(priceUSD * rateInfo.rate);
    return `${rateInfo.symbol}${converted.toLocaleString()}`;
  };

  const toggleFavorite = (e: React.MouseEvent, propId: string) => {
    e.stopPropagation();
    setFavorites((prev) => ({
      ...prev,
      [propId]: !prev[propId],
    }));
  };

  const filteredProperties = properties.filter((item) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'CLIFF') return item.type === 'Cliff Estate';
    if (activeFilter === 'VILLA') return item.type === 'Villa' || item.type === 'Waterfront';
    if (activeFilter === 'ALPINE') return item.type === 'Alpine Chalet';
    return true;
  });

  return (
    <section id="properties" className="py-24 bg-[#0d0e12] border-t border-[#1a1c24] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header matching screenshot */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <span className="w-8 h-[2px] bg-[#c5a880]" />
              <span className="text-[11px] font-semibold tracking-[0.25em] text-[#c5a880] uppercase">
                FEATURED PROPERTIES
              </span>
            </div>
            <h2 className="font-serif-luxury text-3xl md:text-5xl text-white font-normal tracking-tight">
              Extraordinary Homes Around the World
            </h2>
          </div>

          <div className="flex items-center space-x-6">
            {/* Category Filter Tabs */}
            <div className="hidden md:flex items-center space-x-1 bg-[#14161c] p-1 rounded border border-[#242833]">
              {[
                { id: 'ALL', label: 'All' },
                { id: 'CLIFF', label: 'Cliff Estates' },
                { id: 'VILLA', label: 'Villas' },
                { id: 'ALPINE', label: 'Alpine Chalets' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-3.5 py-1.5 text-xs tracking-wider rounded transition-colors ${
                    activeFilter === tab.id
                      ? 'bg-[#c5a880] text-black font-semibold'
                      : 'text-[#9ca3af] hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setActiveFilter('ALL')}
              className="inline-flex items-center space-x-2 text-xs font-semibold tracking-[0.2em] text-[#c7cbd4] hover:text-[#d8b88a] transition-colors group shrink-0"
            >
              <span>VIEW ALL PROPERTIES</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Property Cards Grid - 3 columns matching screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.slice(0, 6).map((property) => (
            <div
              key={property.id}
              id={`property-card-${property.id}`}
              onClick={() => onSelectProperty(property)}
              className="group cursor-pointer bg-[#13151b] rounded-lg overflow-hidden border border-[#222631] hover:border-[#c5a880]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-black/60 flex flex-col"
            >
              {/* Image Container with Badges */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#1a1d26]">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                {/* Status Badge top-left */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-[10px] font-semibold tracking-[0.2em] uppercase bg-black/60 backdrop-blur-md text-white border border-white/10 rounded">
                    {property.status}
                  </span>
                </div>

                {/* Quick actions top-right */}
                <div className="absolute top-4 right-4 flex items-center space-x-2">
                  <button
                    onClick={(e) => toggleFavorite(e, property.id)}
                    className="p-2 rounded-full bg-black/50 backdrop-blur-md text-white hover:text-red-400 border border-white/10 transition-colors"
                    aria-label="Save to favorites"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        favorites[property.id] ? 'fill-red-500 text-red-500' : ''
                      }`}
                    />
                  </button>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/10">
                    <Eye className="w-3.5 h-3.5 text-[#c5a880]" />
                  </div>
                </div>

                {/* Title and location inside image overlay at bottom */}
                <div className="absolute bottom-4 left-4 right-4 space-y-1">
                  <h3 className="font-serif-luxury text-2xl text-white font-medium drop-shadow-sm group-hover:text-[#d8b88a] transition-colors">
                    {property.title}
                  </h3>
                  <div className="flex items-center space-x-1.5 text-xs text-[#d1d5db]">
                    <MapPin className="w-3.5 h-3.5 text-[#c5a880]" />
                    <span>{property.location}</span>
                  </div>
                  <div className="pt-1 text-lg font-semibold text-white tracking-wide">
                    {formatPrice(property.price)}
                  </div>
                </div>
              </div>

              {/* Stats Bar at bottom matching screenshot */}
              <div className="py-3.5 px-4 bg-[#0e1015] border-t border-[#1e222c] grid grid-cols-3 text-center divide-x divide-[#1e222c] text-xs text-[#9aa0ae]">
                <div className="flex items-center justify-center space-x-1.5">
                  <Bed className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span className="font-medium text-[#e2e5eb]">{property.beds} Beds</span>
                </div>
                <div className="flex items-center justify-center space-x-1.5">
                  <Bath className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span className="font-medium text-[#e2e5eb]">{property.baths} Baths</span>
                </div>
                <div className="flex items-center justify-center space-x-1.5">
                  <Maximize2 className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span className="font-medium text-[#e2e5eb]">{property.sqFt.toLocaleString()} Sq Ft</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
