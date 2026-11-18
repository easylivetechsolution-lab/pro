import React from 'react';
import { Award, CheckCircle, Droplets, HeartHandshake, Shield, Sparkles, Wind } from 'lucide-react';

export const Stage05ImpactSection: React.FC = () => {
  const pillars = [
    {
      icon: Wind,
      title: 'HEPA H13 Filtration',
      desc: 'Four-stage cyclonic vacuuming trapping 99.97% of airborne micro-dust down to 0.3 microns.',
    },
    {
      icon: Droplets,
      title: 'Botanical Chemistry',
      desc: 'EPA Safer Choice certified botanical formulations leaving zero endocrine-disrupting residue.',
    },
    {
      icon: Shield,
      title: 'Microfiber Color Zoning',
      desc: 'Strict 4-zone textile protocol guaranteeing zero cross-contamination between sanitization areas.',
    },
    {
      icon: HeartHandshake,
      title: 'Vetted Specialists',
      desc: 'Full criminal background checks, in-depth architectural training, and $5,000,000 umbrella liability.',
    },
  ];

  return (
    <section id="impact" className="relative py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="rounded-3xl border border-sky-100 bg-gradient-to-br from-white via-sky-50/30 to-white p-8 sm:p-14 shadow-sm">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/70 text-sky-800 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Hospital-Grade Quality Control</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            The Science of Pure Architectural Living
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            We don't merely wipe surfaces—we restore indoor air quality, eliminate bacterial bio-films, and safeguard luxury natural finishes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/90 border border-slate-200/80 hover:border-sky-300 transition-all shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display text-base font-bold text-slate-900 mb-2">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 pt-8 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <div className="font-display text-2xl font-bold text-slate-900">48-Hour</div>
            <div className="text-xs text-slate-500 mt-0.5">Spotless Re-clean Guarantee</div>
          </div>
          <div>
            <div className="font-display text-2xl font-bold text-slate-900">100%</div>
            <div className="text-xs text-slate-500 mt-0.5">Eco-Friendly &amp; Non-Toxic</div>
          </div>
          <div>
            <div className="font-display text-2xl font-bold text-slate-900">&lt; 15 min</div>
            <div className="text-xs text-slate-500 mt-0.5">Emergency Dispatch Window</div>
          </div>
          <div>
            <div className="font-display text-2xl font-bold text-slate-900">12,000+</div>
            <div className="text-xs text-slate-500 mt-0.5">Rooms Sanitized to Date</div>
          </div>
        </div>
      </div>
    </section>
  );
};
