import React, { useState } from 'react';
import { Check, Award, Coffee, Headphones, HeartHandshake, Shield, Clock } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const [activeAmenity, setActiveAmenity] = useState<number>(0);

  const keyPoints = [
    {
      title: 'State-of-the-art technology',
      desc: '3D digital imaging, intraoral laser scanners, and same-day restorations for gentler, faster precision.'
    },
    {
      title: 'Relaxing, modern office',
      desc: 'Architecturally designed calming atmosphere with natural oak, warm ambient lighting, and bespoke lounge spaces.'
    },
    {
      title: 'Personalized, judgment-free care',
      desc: 'We listen attentively to your history and priorities. No lecturing, no pressure — only transparent, compassionate care.'
    },
    {
      title: 'Convenient location & flexible scheduling',
      desc: 'Prime downtown Austin wellness district with private reserved parking and early morning & weekend availability.'
    }
  ];

  const amenities = [
    {
      icon: Headphones,
      title: 'Sensory Comfort Suite',
      detail: 'Bose noise-canceling headphones, curated Spotify playlists, ceiling streaming displays with Netflix.'
    },
    {
      icon: Coffee,
      title: 'Artisanal Beverage Bar',
      detail: 'Complimentary flat whites, organic herbal teas, cold-pressed juices, and alkaline mineral waters.'
    },
    {
      icon: HeartHandshake,
      title: 'Zero-Pressure Consultations',
      detail: 'Sit together in our private conference lounge before ever entering a treatment chair.'
    },
    {
      icon: Shield,
      title: 'Biocompatible Materials',
      detail: 'Mercury-free, BPA-free, and holistic restorative ceramics that blend in harmony with your natural biology.'
    }
  ];

  return (
    <section id="why-us" className="py-20 lg:py-28 bg-white border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Modern Clinic Interior Photo */}
          <div className="lg:col-span-6">
            <div className="relative">
              {/* Main Photo with aesthetic curved border */}
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FAF9F6] aspect-4/3 relative group">
                <img
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop"
                  alt="PearlView Dental Studio modern luxury lounge and reception"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md shadow-lg border border-white/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#0E282E] text-[#D4AF37] flex items-center justify-center">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#0E282E]">Architectural Wellness Design</p>
                      <p className="text-[11px] text-zinc-500">Austin Design Excellence Award Nominee</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Quiet Zone
                  </span>
                </div>
              </div>

              {/* Decorative accent element */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#EAD8B7]/30 rounded-full blur-2xl -z-10" />
            </div>
          </div>

          {/* Right Column: Narrative & Key Differentiators */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#5B7980] mb-2">
              <span>Why Patients Choose Us</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif text-[#0E282E] tracking-tight mb-4 font-semibold">
              More Than a Dental Visit
            </h2>

            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed mb-8">
              We combine cutting-edge dental technology, an empathetic master clinician team, and an unhurried, hospitality-focused approach to deliver an extraordinary patient experience.
            </p>

            {/* Checklist items from screenshot */}
            <div className="space-y-4 mb-8">
              {keyPoints.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3.5 group">
                  <div className="w-6 h-6 rounded-full bg-[#E8EFF0] text-[#0E282E] flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#0E282E] group-hover:text-white transition-colors duration-200">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900 font-sans">
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-600 leading-relaxed mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Luxury Amenities Selector */}
            <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-zinc-200/90">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Concierge Amenities
                </span>
                <span className="text-[11px] text-[#5B7980] font-medium">Included with every visit</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                {amenities.map((am, idx) => {
                  const Icon = am.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveAmenity(idx)}
                      className={`p-2 rounded-xl text-center flex flex-col items-center gap-1 transition-all cursor-pointer ${
                        activeAmenity === idx
                          ? 'bg-[#0E282E] text-white shadow-xs'
                          : 'bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-[10px] font-semibold truncate w-full">{am.title.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>

              <p className="text-xs text-zinc-600 italic bg-white p-2.5 rounded-lg border border-zinc-200/60">
                &ldquo;{amenities[activeAmenity].detail}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
