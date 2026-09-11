import React from 'react';
import {
  Shield,
  Award,
  Globe2,
  Lock,
  ArrowRight,
  Compass,
  CheckCircle2,
  Building2,
  Anchor,
  PhoneCall,
} from 'lucide-react';

interface AboutPageProps {
  onNavigateHome: () => void;
  onOpenContact: () => void;
  onOpenConsultation: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigateHome,
  onOpenContact,
  onOpenConsultation,
}) => {
  const milestones = [
    {
      year: '1999',
      title: 'Genesis on Lake Geneva',
      desc: 'Founded as an independent private advisory boutique assisting Swiss private banking lineages and European family offices with off-market châteaux transfers.',
    },
    {
      year: '2008',
      title: 'Mediterranean Maritime Expansion',
      desc: 'Established the Southern Europe Bureau, curating cliffside estates in Cap d’Antibes, Saint-Tropez, and the Cyclades with deep-water mega-yacht moorings.',
    },
    {
      year: '2016',
      title: 'Aspen & Caribbean Island Division',
      desc: 'Launched dedicated high-altitude chalet representation in Colorado and private cay acquisitions across St. Barthélemy and the British Virgin Islands.',
    },
    {
      year: 'Present',
      title: 'Carbon-Neutral & Trophy Architectural Icons',
      desc: 'Pioneering museum-grade modernist sanctuaries, private islands with renewable microgrids, and encrypted sovereign-tier asset transfers.',
    },
  ];

  const pillars = [
    {
      icon: <Lock className="w-5 h-5 text-[#d8b88a]" />,
      title: 'Institutional Discretion',
      desc: 'Over 90% of our ultra-prime asset transfers occur off-market under bilateral Non-Disclosure Agreements, safeguarding buyer anonymity and family privacy.',
    },
    {
      icon: <Award className="w-5 h-5 text-[#d8b88a]" />,
      title: 'Architectural Pedigree',
      desc: 'Every estate in our portfolio is vetted for architectural significance, geological resilience, pure view corridors, and uncompromising construction craft.',
    },
    {
      icon: <Globe2 className="w-5 h-5 text-[#d8b88a]" />,
      title: 'Cross-Border Advisory',
      desc: 'Seamless multi-jurisdictional guidance spanning international tax structuring, maritime berth concessions, helicopter easements, and private staff transition.',
    },
    {
      icon: <Anchor className="w-5 h-5 text-[#d8b88a]" />,
      title: 'Bespoke Lifestyle Assets',
      desc: 'Beyond prime residences, our partners negotiate contiguous buffer parcels, private island conservation covenants, and historic vineyard rights.',
    },
  ];

  const offices = [
    { city: 'Geneva', country: 'Switzerland', role: 'European Alpine & Historic Estates', address: 'Rue du Rhône 42' },
    { city: 'London', country: 'United Kingdom', role: 'Mayfair & Sovereign Family Advisory', address: '14 Berkeley Square' },
    { city: 'New York', country: 'United States', role: 'North American Trophy Metros & Ranches', address: '767 Fifth Avenue' },
    { city: 'St. Barts', country: 'French West Indies', role: 'Caribbean Maritime & Private Cays', address: 'Gustavia Harbor' },
    { city: 'Singapore', country: 'Southeast Asia', role: 'Asia-Pacific Island Sanctuaries', address: 'Marina Bay Financial Tower' },
  ];

  return (
    <div className="pt-28 pb-20 min-h-screen bg-[#0b0c0e] text-[#e8e6e3]">
      {/* Top Breadcrumb & Tag */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-8">
        <div className="flex items-center space-x-2 text-xs text-[#8e95a5]">
          <button
            onClick={onNavigateHome}
            className="hover:text-[#d8b88a] transition-colors"
          >
            HOME
          </button>
          <span>/</span>
          <span className="text-[#d8b88a] font-medium tracking-wider">ABOUT AURELIA</span>
        </div>
      </div>

      {/* Hero Header Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-16 border-b border-[#1c1f2a]">
        <div className="max-w-3xl space-y-4">
          <div className="text-[#d8b88a] text-[11px] tracking-[0.2em] uppercase font-semibold">
            <span>Heritage & Provenance</span>
          </div>

          <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-tight tracking-tight">
            Custodians of the World’s Most Extraordinary Residences
          </h1>

          <p className="text-base sm:text-lg text-[#9da3b4] font-light leading-relaxed pt-2">
            Founded with an unyielding commitment to discretion, architectural excellence, and institutional trust, Aurelia Estates orchestrates high-value residential and maritime transfers for family offices, sovereign lineages, and private collectors.
          </p>
        </div>

        {/* High-Level Metric Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-12 pt-8 border-t border-[#1c1f2a]">
          <div className="p-5 rounded-lg bg-[#12141c] border border-[#222634]">
            <p className="font-serif-luxury text-3xl sm:text-4xl text-[#d8b88a] font-medium">$6.2B+</p>
            <p className="text-xs text-[#8e95a5] mt-1 tracking-wider uppercase font-medium">Cumulative Volume</p>
            <p className="text-[11px] text-[#616777] mt-1">Transacted across global trophy markets</p>
          </div>

          <div className="p-5 rounded-lg bg-[#12141c] border border-[#222634]">
            <p className="font-serif-luxury text-3xl sm:text-4xl text-white font-medium">90%</p>
            <p className="text-xs text-[#8e95a5] mt-1 tracking-wider uppercase font-medium">Off-Market Trades</p>
            <p className="text-[11px] text-[#616777] mt-1">Completed under bilateral confidential NDAs</p>
          </div>

          <div className="p-5 rounded-lg bg-[#12141c] border border-[#222634]">
            <p className="font-serif-luxury text-3xl sm:text-4xl text-[#d8b88a] font-medium">34</p>
            <p className="text-xs text-[#8e95a5] mt-1 tracking-wider uppercase font-medium">Prime Jurisdictions</p>
            <p className="text-[11px] text-[#616777] mt-1">Across Europe, the Americas, and Asia-Pacific</p>
          </div>

          <div className="p-5 rounded-lg bg-[#12141c] border border-[#222634]">
            <p className="font-serif-luxury text-3xl sm:text-4xl text-white font-medium">26 Yrs</p>
            <p className="text-xs text-[#8e95a5] mt-1 tracking-wider uppercase font-medium">Private Advisory</p>
            <p className="text-[11px] text-[#616777] mt-1">Sovereign & family office trust since 1999</p>
          </div>
        </div>
      </section>

      {/* Story & Philosophy Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold tracking-[0.2em] text-[#c5a880] uppercase">
              <Compass className="w-3.5 h-3.5" />
              <span>Our Philosophy</span>
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-white font-light">
              Real Estate as Living Heritage & Enduring Capital
            </h2>

            <p className="text-sm sm:text-base text-[#9da3b4] font-light leading-relaxed">
              We do not treat prime real estate as mere square footage. A true trophy residence is a synthesis of natural topography, cultural lineage, and irreplaceable vantage points—from the volcanic amphitheater of Santorini’s caldera to the private deep-water moorings of Cap d’Antibes.
            </p>

            <p className="text-sm sm:text-base text-[#9da3b4] font-light leading-relaxed">
              Our partners represent an uncompromising standard of advisory. We work with a deliberately limited roster of clients at any given time, ensuring an intimate, private-bank caliber engagement that safeguards personal privacy at every step.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onOpenConsultation}
                className="px-6 py-3 bg-[#c5a880] hover:bg-[#d8b88a] text-black font-semibold text-xs tracking-wider rounded transition-all flex items-center justify-center space-x-2 shadow-lg"
              >
                <span>BOOK PRIVATE CONSULTATION</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenContact}
                className="px-6 py-3 bg-[#171922] hover:bg-[#202330] text-white border border-[#2d3242] hover:border-[#c5a880]/50 font-medium text-xs tracking-wider rounded transition-all flex items-center justify-center"
              >
                <span>VISIT CONTACT DESK</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-xl overflow-hidden border border-[#252937] shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
                alt="Aurelia Estates Architectural Philosophy"
                className="w-full h-[440px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-8">
                <span className="text-[10px] font-semibold tracking-[0.25em] text-[#d8b88a] uppercase">Curated Excellence</span>
                <h3 className="font-serif-luxury text-2xl text-white mt-1">Every Residence Tells a Generational Story</h3>
                <p className="text-xs text-[#b8bcc8] mt-2 font-light max-w-md">
                  Vetting only properties that satisfy our stringent benchmarks for security, architectural integrity, and long-term liquidity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Pillars Grid */}
      <section className="bg-[#0e1015] border-y border-[#1c1f2a] py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <p className="text-xs font-semibold tracking-[0.25em] text-[#c5a880] uppercase">The Aurelia Standard</p>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-white font-light">
              Four Pillars of Private Asset Representation
            </h2>
            <p className="text-sm text-[#8e95a5] font-light">
              How our practice differs fundamentally from conventional brokerage operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg bg-[#12141c] border border-[#222634] hover:border-[#c5a880]/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#c5a880]/10 flex items-center justify-center mb-4">
                    {pillar.icon}
                  </div>
                  <h3 className="font-serif-luxury text-lg text-white font-normal mb-2">{pillar.title}</h3>
                  <p className="text-xs text-[#8e95a5] leading-relaxed font-light">{pillar.desc}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#1c1f2a] flex items-center text-[10.5px] font-semibold tracking-wider text-[#d8b88a]">
                  <span>VERIFIED PROTOCOL</span>
                  <CheckCircle2 className="w-3.5 h-3.5 ml-1.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <p className="text-xs font-semibold tracking-[0.25em] text-[#c5a880] uppercase">Historical Trajectory</p>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-white font-light">
            Twenty-Six Years of Trophy Acquisitions
          </h2>
          <p className="text-sm text-[#8e95a5] font-light">
            A continuous legacy of confidential representation across prime global enclaves.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className="relative p-6 rounded-lg bg-[#12141c] border border-[#202432] space-y-3"
            >
              <span className="font-display-luxury text-3xl font-medium text-[#c5a880] block">
                {m.year}
              </span>
              <h3 className="font-serif-luxury text-lg text-white font-normal">{m.title}</h3>
              <p className="text-xs text-[#8e95a5] leading-relaxed font-light">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Global Advisory Salons */}
      <section className="bg-[#0e1015] border-t border-[#1c1f2a] py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
            <div className="space-y-2">
              <p className="text-xs font-semibold tracking-[0.25em] text-[#c5a880] uppercase">Global Presence</p>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl text-white font-light">
                Private Advisory Salons
              </h2>
            </div>
            <button
              onClick={onOpenContact}
              className="text-xs tracking-wider text-[#d8b88a] hover:text-white transition-colors flex items-center space-x-1.5"
            >
              <span>VIEW FULL CONTACT DETAILS & SALONS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {offices.map((office, idx) => (
              <div
                key={idx}
                className="p-5 rounded-lg bg-[#12141c] border border-[#222634] hover:border-[#c5a880]/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white tracking-wide">{office.city}</span>
                  <Building2 className="w-4 h-4 text-[#d8b88a]" />
                </div>
                <p className="text-[11px] text-[#c5a880] font-medium">{office.country}</p>
                <p className="text-[11px] text-[#8e95a5] mt-2 font-light">{office.role}</p>
                <p className="text-[10px] text-[#616777] mt-1">{office.address}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Conversion Banner */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pt-16">
        <div className="relative rounded-2xl overflow-hidden p-8 sm:p-12 bg-gradient-to-r from-[#171a23] via-[#12141c] to-[#1a1e2a] border border-[#282d3e] text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/30 text-[#d8b88a] text-[10px] tracking-[0.2em] uppercase font-semibold">
            <Shield className="w-3 h-3" />
            <span>Institutional Confidentiality</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-white font-light max-w-xl mx-auto">
            Experience Advisory Tailored to Generational Wealth
          </h2>

          <p className="text-xs sm:text-sm text-[#9da3b4] font-light max-w-lg mx-auto leading-relaxed">
            Whether acquiring a coastal sanctuary or commissioning private representation for a trophy asset, connect with our Senior Partners today.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onOpenConsultation}
              className="px-6 py-3 bg-[#c5a880] hover:bg-[#d8b88a] text-black font-semibold text-xs tracking-wider rounded transition-all flex items-center space-x-2 shadow-lg"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>REQUEST SENIOR ADVISORY BRIEFING</span>
            </button>
            <button
              onClick={onNavigateHome}
              className="px-6 py-3 bg-[#1d202b] hover:bg-[#252a39] text-white border border-[#303648] font-medium text-xs tracking-wider rounded transition-all"
            >
              EXPLORE THE PORTFOLIO
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
