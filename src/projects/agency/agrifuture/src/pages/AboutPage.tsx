import React, { useState } from 'react';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Compass,
  Award,
  Globe2,
  HeartHandshake,
  Calendar,
} from 'lucide-react';
import { FARM_ESTATES, TEAM_MEMBERS } from '../data';
import { FarmEstate } from '../types';

interface AboutPageProps {
  onNavigate: (page: string) => void;
  onSelectEstate: (estate: FarmEstate) => void;
  onPartnerClick: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigate,
  onSelectEstate,
  onPartnerClick,
}) => {
  const [activeHeritageYear, setActiveHeritageYear] = useState(0);

  const heritageTimeline = [
    {
      year: '1984',
      title: 'First Seeds in Green Valley',
      description:
        'Founded with 120 hectares of heritage citrus and heirloom vegetables, prioritizing natural cover crops before regenerative agriculture was named.',
      image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    },
    {
      year: '1998',
      title: 'Living Soil & Mycorrhizal Transition',
      description:
        'Complete cessation of synthetic inputs across all parcels. Introduced custom biodynamic compost teas and living soil mycorrhizal inoculation.',
      image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80',
    },
    {
      year: '2012',
      title: 'Subsurface Precision Grid',
      description:
        'Engineered pulsed sub-root fertigation and solar micro-stations, conserving 38% more freshwater while boosting brix levels by 2.4 degrees.',
      image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80',
    },
    {
      year: '2026',
      title: 'Global Regenerative Ag Network',
      description:
        'Now spanning 18,400+ certified hectares across 4 prime microclimates, exporting to 42 countries with end-to-end QR lot-level traceability.',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const corePillars = [
    {
      title: 'Living Soil First',
      description:
        'Healthy soil is not a passive sponge; it is a bio-active cosmos. We feed fungal mycorrhizae and earthworms to build drought-resilient humus.',
      icon: '/icons/story/stewardship.svg',
      stat: '4.8% Avg. Organic Matter',
    },
    {
      title: 'Certified Purity',
      description:
        'Zero synthetic pesticides, zero persistent glyphosates, zero petrochemical nitrogen. Every lot undergoes multi-residue chromatography screening.',
      icon: '/icons/story/certified.svg',
      stat: '0.00% Chemical Residues',
    },
    {
      title: 'Conserved Freshwater',
      description:
        'Precision subsurface drip grids and infrared canopy transpiration sensors ensure every single liter of water is utilized at peak root efficiency.',
      icon: '/icons/farm/irrigation.svg',
      stat: '38% Water Savings vs Regional Norm',
    },
    {
      title: 'Global Cold-Chain Velocity',
      description:
        'Chilled at farm pack-houses within 45 minutes of harvest, tracked via IoT sensors with unbroken temperature integrity to 42 countries.',
      icon: '/icons/story/award.svg',
      stat: '< 24hr Field to International Port',
    },
  ];

  return (
    <div className="pt-24 pb-20 bg-[#061810] text-white min-h-screen">
      {/* 1. Hero Banner */}
      <section className="relative py-16 sm:py-24 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <span className="text-[#34d399] text-xs sm:text-sm font-semibold tracking-widest uppercase block">
              ABOUT AGRIFUTURE
            </span>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white font-serif leading-[1.1]">
              The Land Is Our Foundation, <br />
              <span className="text-[#dfc599]">The Future Is Our Promise.</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed pt-2">
              For over four decades, AgriFuture has championed biological fertility, precision irrigation, and radical transparency. We operate 18,400+ certified hectares of living soil, cultivating premium crops that nourish communities worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Key Stats Strip */}
      <section className="py-8 bg-[#04120b] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="p-3">
              <div className="text-3xl sm:text-4xl font-bold text-[#dfc599] font-serif">18,400+</div>
              <div className="text-xs sm:text-sm text-gray-300 uppercase tracking-wider mt-1">Hectares Managed</div>
            </div>
            <div className="p-3">
              <div className="text-3xl sm:text-4xl font-bold text-[#34d399] font-serif">42</div>
              <div className="text-xs sm:text-sm text-gray-300 uppercase tracking-wider mt-1">Export Destination Ports</div>
            </div>
            <div className="p-3">
              <div className="text-3xl sm:text-4xl font-bold text-white font-serif">100%</div>
              <div className="text-xs sm:text-sm text-gray-300 uppercase tracking-wider mt-1">Traceable to Harvest Plot</div>
            </div>
            <div className="p-3">
              <div className="text-3xl sm:text-4xl font-bold text-[#facc15] font-serif">40+ Yrs</div>
              <div className="text-xs sm:text-sm text-gray-300 uppercase tracking-wider mt-1">Generational Stewardship</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Heritage & Founding Story */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[#34d399] text-xs sm:text-sm font-semibold tracking-widest uppercase block">
              OUR HERITAGE
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif leading-tight">
              Four Decades of Cultivating Soil Biology
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              When industrial agriculture mandated high-input chemical sprays in the 1980s, our founders chose a divergent path: investing in the subterranean microbiome. By nourishing mycorrhizae and fostering indigenous nitrogen-fixing cover crops, AgriFuture created resilient soils that hold water like a sponge and yield crops with exceptional brix, aroma, and nutrient density.
            </p>

            {/* Timeline Year Selectors */}
            <div className="flex flex-wrap gap-2 pt-2">
              {heritageTimeline.map((item, idx) => (
                <button
                  key={item.year}
                  onClick={() => setActiveHeritageYear(idx)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                    activeHeritageYear === idx
                      ? 'bg-[#dfc599] text-[#091f13] shadow-lg font-bold scale-105'
                      : 'bg-[#0b291a] text-gray-300 hover:bg-[#133c27] hover:text-white border border-white/10'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.year}</span>
                </button>
              ))}
            </div>

            {/* Selected Heritage Card */}
            <div className="p-6 rounded-2xl bg-[#092518] border border-[#dfc599]/30 shadow-xl space-y-2">
              <h3 className="text-lg font-bold text-[#dfc599] font-serif">
                {heritageTimeline[activeHeritageYear].title}
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                {heritageTimeline[activeHeritageYear].description}
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#dfc599]/20 aspect-[4/3] group">
              <img
                src={heritageTimeline[activeHeritageYear].image}
                alt={heritageTimeline[activeHeritageYear].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs font-mono text-emerald-400">ARCHIVE RECORD // {heritageTimeline[activeHeritageYear].year}</span>
                <p className="text-white font-serif font-bold text-lg">{heritageTimeline[activeHeritageYear].title}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Pillars of AgriFuture */}
      <section className="py-20 bg-[#04120a] border-t border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-[#34d399] text-xs sm:text-sm font-semibold tracking-widest uppercase block">
              CORE PHILOSOPHY
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif">
              The Four Pillars of Regenerative Agriculture
            </h2>
            <p className="text-gray-300 text-sm">
              We never compromise on environmental integrity or product quality. Every acre is farmed by nature's rules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {corePillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#071f14] border border-white/10 hover:border-[#dfc599]/50 transition-all duration-300 flex flex-col justify-between group shadow-lg"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-[#04120a] border border-[#22c55e]/30 flex items-center justify-center p-2">
                    <img src={pillar.icon} alt={pillar.title} className="w-full h-full object-contain" />
                  </div>
                  <h3 className="text-lg font-bold text-white font-serif group-hover:text-[#dfc599] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
                <div className="pt-6 border-t border-white/10 mt-6">
                  <span className="text-xs font-mono text-[#34d399] block">{pillar.stat}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Our Estates Preview */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <span className="text-[#34d399] text-xs sm:text-sm font-semibold tracking-widest uppercase block">
              REGIONAL TERROIRS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif">
              Our 4 Regional Farm Estates
            </h2>
            <p className="text-gray-300 text-sm max-w-xl">
              Spanning diverse microclimates from maritime coastal fogs to high-altitude volcanic soils.
            </p>
          </div>
          <button
            onClick={() => onNavigate('products')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#dfc599] hover:bg-[#e8d5b2] text-[#091f13] text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer"
          >
            <span>Explore Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FARM_ESTATES.map((estate) => (
            <div
              key={estate.id}
              onClick={() => onSelectEstate(estate)}
              className="group rounded-2xl overflow-hidden bg-[#092216] border border-white/10 hover:border-[#dfc599]/60 transition-all duration-300 cursor-pointer flex flex-col shadow-xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={estate.imageUrl}
                  alt={estate.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs font-mono text-emerald-300 bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">
                  {estate.acres.toLocaleString()} Acres
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-lg font-bold text-white font-serif group-hover:text-[#dfc599] transition-colors">
                    {estate.name}
                  </h3>
                  <p className="text-xs text-emerald-400 font-medium">{estate.location}</p>
                  <p className="text-xs text-gray-300 line-clamp-2 mt-2 leading-relaxed">
                    Crops: {estate.crops.join(', ')} &bull; Climate: {estate.climate}
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-300">
                  <span>Soil: {estate.soilType.split(',')[0]}</span>
                  <span className="text-[#dfc599] group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold">
                    Inspect <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Agronomy Leadership Team */}
      <section className="py-20 bg-[#04120a] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-[#34d399] text-xs sm:text-sm font-semibold tracking-widest uppercase block">
              OUR LEADERSHIP
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif">
              Master Agronomists & Cultivators
            </h2>
            <p className="text-gray-300 text-sm">
              Combining centuries of generational field wisdom with advanced microbial ecology and satellite telemetry.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((member, idx) => (
              <div
                key={idx}
                className="rounded-2xl overflow-hidden bg-[#071f14] border border-white/10 p-5 space-y-4 text-center group hover:border-[#dfc599]/40 transition-all duration-300 shadow-lg"
              >
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-[#dfc599]/40 group-hover:border-[#34d399] transition-colors">
                  <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white font-serif">{member.name}</h3>
                  <p className="text-xs text-[#dfc599] font-medium">{member.role}</p>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed line-clamp-3">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Bottom CTA */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#092618] via-[#0b3320] to-[#092618] border border-[#dfc599]/40 shadow-2xl space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif">
            Partner With AgriFuture
          </h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto">
            Whether you are a global wholesale distributor, food retailer, or agronomy researcher, we invite you to experience the difference of truly regenerative agriculture.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onPartnerClick}
              className="px-6 py-3 rounded-full bg-[#dfc599] hover:bg-[#e8d5b2] text-[#081e13] font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg cursor-pointer"
            >
              Wholesale & Partner Inquiry
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 rounded-full bg-[#05180f] hover:bg-[#082215] text-white border border-white/20 hover:border-white/40 font-semibold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer"
            >
              Contact Global Offices
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
