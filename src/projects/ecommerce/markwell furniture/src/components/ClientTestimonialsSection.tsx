import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Quote, 
  CheckCircle2, 
  Building2, 
  Briefcase, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Calendar, 
  Award,
  Layers,
  X
} from 'lucide-react';
import boardroomImg from '../assets/images/boardroom_conference_wide_1789339388609.jpg';
import execDeskImg from '../assets/images/exec_desk_shot_1789337899461.jpg';
import confTableImg from '../assets/images/conf_table_shot_1789337885116.jpg';
import warehouseImg from '../assets/images/warehouse_logistics_1789336824286.jpg';

interface ClientCaseStudy {
  id: string;
  category: 'all' | 'architecture' | 'executive' | 'tech';
  author: string;
  role: string;
  company: string;
  location: string;
  avatar: string;
  rating: number;
  date: string;
  verifiedOrder: string;
  headline: string;
  quote: string;
  fullStory: string;
  projectPhoto: string;
  metrics: { label: string; value: string }[];
  highlight: string;
}

const CLIENT_TESTIMONIALS: ClientCaseStudy[] = [
  {
    id: 'client-1',
    category: 'architecture',
    author: 'Elena Rostova',
    role: 'Managing Director & Lead Architect',
    company: 'Vanguard Architecture',
    location: 'Zurich, Switzerland',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=240&q=80',
    rating: 5,
    date: 'August 2026',
    verifiedOrder: 'Custom Live-Edge European Oak Boardroom Table & 28 Executive Leather Chairs',
    headline: 'The live-edge oak table stopped our international clients in their tracks.',
    quote: 'The craftsmanship on our boardroom table is second to none. Clients frequently comment on the live-edge European oak before meetings even begin. MarkWell delivered custom architectural joinery on time and on budget with zero margin of error.',
    fullStory: 'Vanguard Architecture needed an iconic centerpiece for their new flagship design studio in Zurich. Standard commercial tables felt generic and hollow. MarkWell hand-selected a single continuous 18-foot slab of European white oak with a natural butterfly key tenon joint. Integrated wire management ports were concealed flush beneath magnetized wood access panels, maintaining pure architectural minimalism.',
    projectPhoto: confTableImg,
    metrics: [
      { label: 'Workstations Furnished', value: '28' },
      { label: 'Delivery Lead Time', value: '18 Days' },
      { label: 'Craft Warranty', value: '10 Years' }
    ],
    highlight: 'Zero tolerance defects on an 18-foot single slab'
  },
  {
    id: 'client-2',
    category: 'tech',
    author: 'James Carter',
    role: 'VP of Workplace & People Operations',
    company: 'TechGlobal Systems',
    location: 'London & New York',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80',
    rating: 5,
    date: 'July 2026',
    verifiedOrder: '240 Ergonomic Mesh Task Chairs & Dual-Motor Motorized Desks',
    headline: 'Our engineers reported a 42% reduction in afternoon fatigue within 3 weeks.',
    quote: 'MarkWell transformed our multi-floor tech hub. The ergonomic chairs and motorized desks have made a massive, measurable difference in our engineering team’s comfort and daily output. In 24 months across 240 workstations, we have had zero repair tickets.',
    fullStory: 'With engineers spending 10+ hours in deep code focus, TechGlobal was dealing with soaring physical therapy claims and complaints regarding standard office seating. MarkWell deployed a trial pod of 10 chairs, followed by a full 240-unit company-wide phased rollout across two continents, handled seamlessly with white-glove assembly and zero disruption to daily sprints.',
    projectPhoto: boardroomImg,
    metrics: [
      { label: 'Seats Deployed', value: '240' },
      { label: 'Service Tickets in 2 yrs', value: '0' },
      { label: 'Fatigue Reduction', value: '42%' }
    ],
    highlight: 'Deployed across 2 continents with white-glove setup'
  },
  {
    id: 'client-3',
    category: 'executive',
    author: 'Marcus Vance',
    role: 'Senior Managing Partner',
    company: 'Apex Capital Partners',
    location: 'Chicago, IL',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80',
    rating: 5,
    date: 'June 2026',
    verifiedOrder: 'Solid Quartersawn Walnut Executive Desks & Fluted Credenzas',
    headline: 'Subtle executive prestige without the gaudy corporate ostentation.',
    quote: 'From bulk procurement to white-glove assembly across three regional branches, the dedicated account management team made outfitting our financial suites completely frictionless. The hand-rubbed walnut finish feels substantial and timeless.',
    fullStory: 'Apex Capital required private partner suites that communicated generational financial stability to ultra-high-net-worth clients. MarkWell customized our signature Executive Desks with hidden biometric lock drawers and soft-close acoustic fluted credenzas. Each partner chose their custom leather desk blotter inlay.',
    projectPhoto: execDeskImg,
    metrics: [
      { label: 'Executive Suites', value: '18' },
      { label: 'Regional Branches', value: '3' },
      { label: 'Client Satisfaction', value: '100%' }
    ],
    highlight: 'Custom biometric drawers & quartersawn walnut'
  },
  {
    id: 'client-4',
    category: 'architecture',
    author: 'Sophia Lin',
    role: 'Principal Creative Director',
    company: 'Kroma Design Studio',
    location: 'San Francisco, CA',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80',
    rating: 5,
    date: 'May 2026',
    verifiedOrder: 'Handcrafted Redwood Lounge Chairs & Modular Tambour Storage Credenzas',
    headline: 'Our studio is now featured in three international design magazines.',
    quote: 'Investing in MarkWell standing desks and handcrafted lounge seating completely transformed our design studio aesthetics. The biophilic wood grain textures and warm leather touchpoints create an environment where creativity thrives naturally.',
    fullStory: 'Kroma wanted an open collaborative space that bridged warm Scandinavian warmth with Silicon Valley tech agility. MarkWell supplied custom-dimensioned communal oak worktables with hidden power distribution, flanked by heirloom saddle leather lounge chairs for client critiques.',
    projectPhoto: warehouseImg,
    metrics: [
      { label: 'Creative Studio Seats', value: '54' },
      { label: 'Press Features', value: '3' },
      { label: 'Zero-VOC Certified', value: '100%' }
    ],
    highlight: 'Featured in Architectural Digest & Frame Magazine'
  }
];

interface ClientTestimonialsSectionProps {
  onOpenB2B?: () => void;
}

export const ClientTestimonialsSection: React.FC<ClientTestimonialsSectionProps> = ({
  onOpenB2B
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'architecture' | 'executive' | 'tech'>('all');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<ClientCaseStudy | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const filteredClients = activeCategory === 'all' 
    ? CLIENT_TESTIMONIALS 
    : CLIENT_TESTIMONIALS.filter(c => c.category === activeCategory);

  const activeClient = filteredClients[carouselIndex % filteredClients.length] || filteredClients[0];

  const handleNext = () => {
    setCarouselIndex((prev) => (prev + 1) % filteredClients.length);
  };

  const handlePrev = () => {
    setCarouselIndex((prev) => (prev - 1 + filteredClients.length) % filteredClients.length);
  };

  return (
    <section id="testimonials" className="w-full py-16 sm:py-20 bg-[#0e1118] relative overflow-hidden select-none border-t border-stone-800/80">
      
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#e2b47f]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider text-[#e2b47f] mb-3">
              <Award className="w-3.5 h-3.5" />
              Verified Client Stories
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Clients Who Loved Our Work
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-2xl leading-relaxed">
              From boutique architecture ateliers to multi-floor international technology headquarters, see how our precision craftsmanship transforms daily productivity.
            </p>
          </div>

          {/* Metric Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 shrink-0">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 sm:p-4 text-center">
              <div className="flex items-center justify-center gap-1 text-[#e2b47f] font-bold text-lg sm:text-xl">
                <span>4.98</span>
                <Star className="w-4 h-4 fill-[#e2b47f] text-[#e2b47f]" />
              </div>
              <p className="text-[11px] text-zinc-400 mt-0.5 font-medium">1,850+ Client Reviews</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 sm:p-4 text-center">
              <p className="text-white font-bold text-lg sm:text-xl">99.4%</p>
              <p className="text-[11px] text-zinc-400 mt-0.5 font-medium">B2B Reorder Rate</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 sm:p-4 text-center">
              <p className="text-white font-bold text-lg sm:text-xl">10-Year</p>
              <p className="text-[11px] text-zinc-400 mt-0.5 font-medium">Full Craft Warranty</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 sm:p-4 text-center">
              <p className="text-white font-bold text-lg sm:text-xl">14 Days</p>
              <p className="text-[11px] text-zinc-400 mt-0.5 font-medium">Average Delivery</p>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            {[
              { id: 'all', label: 'All Client Work' },
              { id: 'architecture', label: 'Architecture & Design' },
              { id: 'executive', label: 'Executive & Finance' },
              { id: 'tech', label: 'Tech Campuses' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveCategory(tab.id as any);
                  setCarouselIndex(0);
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === tab.id
                    ? 'bg-[#e2b47f] text-black shadow-lg shadow-[#e2b47f]/20'
                    : 'bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Previous client testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs text-zinc-400 px-1 font-semibold">
              {(carouselIndex % filteredClients.length) + 1} / {filteredClients.length}
            </span>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Next client testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Featured Premium Showcase Card */}
        <div className="bg-[#151922] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative grid grid-cols-1 lg:grid-cols-12 items-stretch transition-all duration-300">
          
          {/* Left: Client Narrative & Quote */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between relative z-10">
            <div>
              {/* Top Row: Star Rating & Verified Order Badge */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(activeClient.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#e2b47f] text-[#e2b47f]" />
                  ))}
                  <span className="text-xs font-bold text-zinc-300 ml-1.5">5.0 Verified Client</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified Corporate Setup
                </div>
              </div>

              {/* Bold Quote Headline */}
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight">
                "{activeClient.headline}"
              </h3>

              {/* Full Testimonial Text */}
              <p className="text-sm sm:text-base text-zinc-300 mt-4 leading-relaxed italic">
                "{activeClient.quote}"
              </p>

              {/* Verified Products Ordered Pill */}
              <div className="mt-6 p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                <Briefcase className="w-4 h-4 text-[#e2b47f] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#e2b47f]">
                    Scope of Commission
                  </span>
                  <p className="text-xs text-zinc-200 mt-0.5 font-medium">
                    {activeClient.verifiedOrder}
                  </p>
                </div>
              </div>

              {/* Key Metrics Snapshot */}
              <div className="grid grid-cols-3 gap-3 mt-6">
                {activeClient.metrics.map((m, idx) => (
                  <div key={idx} className="border-l-2 border-[#e2b47f]/40 pl-3">
                    <p className="text-lg font-bold text-white">{m.value}</p>
                    <p className="text-[10px] text-zinc-400 uppercase tracking-wide">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom: Client Profile + Read Case Study CTA */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <img
                  src={activeClient.avatar}
                  alt={activeClient.author}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#e2b47f]"
                />
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    {activeClient.author}
                    <span className="text-zinc-500 font-normal">/</span>
                    <span className="text-xs text-zinc-300 font-normal">{activeClient.location}</span>
                  </h4>
                  <p className="text-xs text-zinc-400">
                    {activeClient.role}, <strong className="text-white font-semibold">{activeClient.company}</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedCaseStudy(activeClient)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white flex items-center gap-1.5 transition-colors cursor-pointer border border-white/10"
                >
                  Full Case Study <ArrowRight className="w-3.5 h-3.5" />
                </button>
                {onOpenB2B && (
                  <button
                    onClick={onOpenB2B}
                    className="px-4 py-2 rounded-xl bg-[#e2b47f] hover:bg-[#d4a26d] text-xs font-bold text-black flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
                  >
                    Start Project
                  </button>
                )}
              </div>
            </div>

          </div>

          {/* Right: Finished Project Installation Photo */}
          <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full overflow-hidden group">
            <img
              src={activeClient.projectPhoto}
              alt={`${activeClient.company} Installation`}
              className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            
            {/* Corner Badge */}
            <div className="absolute top-4 right-4 z-10">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-black/70 backdrop-blur-md text-[#e2b47f] border border-[#e2b47f]/40">
                {activeClient.company}
              </span>
            </div>

            {/* Bottom Caption on photo */}
            <div className="absolute bottom-5 left-5 right-5 z-10">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Installation Highlight
              </span>
              <p className="text-xs sm:text-sm font-semibold text-white mt-0.5">
                {activeClient.highlight}
              </p>
            </div>
          </div>

        </div>

        {/* 3 Secondary Client Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {CLIENT_TESTIMONIALS.filter(c => c.id !== activeClient.id).slice(0, 3).map((client) => (
            <div
              key={client.id}
              onClick={() => {
                const idx = filteredClients.findIndex(item => item.id === client.id);
                if (idx !== -1) setCarouselIndex(idx);
              }}
              className="bg-[#12151c] hover:bg-[#171b24] border border-white/10 hover:border-[#e2b47f]/40 rounded-2xl p-6 transition-all duration-200 cursor-pointer flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#e2b47f] text-[#e2b47f]" />
                    ))}
                  </div>
                  <span className="text-[10px] font-semibold text-zinc-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                    {client.location}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 line-clamp-3 leading-relaxed group-hover:text-white transition-colors">
                  "{client.quote}"
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={client.avatar}
                    alt={client.author}
                    className="w-8 h-8 rounded-full object-cover border border-white/20"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-white group-hover:text-[#e2b47f] transition-colors">
                      {client.author}
                    </h5>
                    <p className="text-[10px] text-zinc-400">{client.company}</p>
                  </div>
                </div>

                <span className="text-[11px] font-bold text-zinc-400 group-hover:text-white flex items-center gap-1">
                  View <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Full Case Study Modal */}
      {selectedCaseStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-[#12151c] border border-white/15 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-[#171a23]">
              <div className="flex items-center gap-3">
                <img
                  src={selectedCaseStudy.avatar}
                  alt={selectedCaseStudy.author}
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#e2b47f]"
                />
                <div>
                  <h3 className="text-base font-bold text-white">
                    {selectedCaseStudy.company} Case Study
                  </h3>
                  <p className="text-xs text-zinc-400">
                    {selectedCaseStudy.author} / {selectedCaseStudy.role}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedCaseStudy(null)}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close Case Study"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-5">
              <div className="relative h-56 rounded-2xl overflow-hidden border border-white/10">
                <img
                  src={selectedCaseStudy.projectPhoto}
                  alt={selectedCaseStudy.company}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <p className="text-xs text-[#e2b47f] font-bold uppercase tracking-wider">Project Result</p>
                  <p className="text-sm font-semibold text-white mt-0.5">{selectedCaseStudy.highlight}</p>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold text-white">
                  "{selectedCaseStudy.headline}"
                </h4>
                <p className="text-xs sm:text-sm text-zinc-300 mt-2.5 leading-relaxed">
                  {selectedCaseStudy.fullStory}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                {selectedCaseStudy.metrics.map((m, idx) => (
                  <div key={idx} className="text-center">
                    <p className="text-base sm:text-lg font-bold text-[#e2b47f]">{m.value}</p>
                    <p className="text-[10px] text-zinc-400 uppercase tracking-wide">{m.label}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-[#171b24] border border-white/10">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  Commission Scope
                </span>
                <p className="text-xs text-zinc-200 mt-1 font-medium">
                  {selectedCaseStudy.verifiedOrder}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-white/10 bg-[#171a23] flex items-center justify-between">
              <span className="text-xs text-zinc-400">
                Commissioned in {selectedCaseStudy.date}
              </span>
              <div className="flex items-center gap-2">
                {onOpenB2B && (
                  <button
                    onClick={() => {
                      setSelectedCaseStudy(null);
                      onOpenB2B();
                    }}
                    className="px-4 py-2 rounded-xl bg-[#e2b47f] hover:bg-[#d4a26d] text-xs font-bold text-black transition-colors cursor-pointer"
                  >
                    Request Similar Setup
                  </button>
                )}
                <button
                  onClick={() => setSelectedCaseStudy(null)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
