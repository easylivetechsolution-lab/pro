import React from 'react';
import { ShieldCheck, Sparkles, Clock, Award } from 'lucide-react';

export const HeroImpact3DStrip: React.FC = () => {
  const metrics = [
    {
      icon: Sparkles,
      value: '99.8%',
      label: 'Pathogen Eradication',
      sub: 'Botanical hospital-grade EPA formulas',
      accent: 'text-sky-600',
      bg: 'bg-sky-50 border-sky-100',
    },
    {
      icon: Clock,
      value: '< 60s',
      label: 'Instant AI Quoting',
      sub: 'Real-time room & sqft cost precision',
      accent: 'text-emerald-600',
      bg: 'bg-emerald-50 border-emerald-100',
    },
    {
      icon: Award,
      value: '4.98 ★',
      label: 'Luxury Client Rating',
      sub: '500+ penthouses & executive suites',
      accent: 'text-amber-600',
      bg: 'bg-amber-50 border-amber-100',
    },
    {
      icon: ShieldCheck,
      value: '$5M',
      label: 'Bonded & Insured',
      sub: 'Comprehensive liability & crew vetting',
      accent: 'text-indigo-600',
      bg: 'bg-indigo-50 border-indigo-100',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div
              key={idx}
              className={`rounded-2xl border p-4 sm:p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 bg-white/95 backdrop-blur-sm ${m.bg}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`p-1.5 rounded-lg bg-white shadow-xs ${m.accent}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {m.value}
                </span>
              </div>
              <div className="text-xs font-semibold text-slate-800">{m.label}</div>
              <div className="text-[11px] text-slate-500 mt-0.5 leading-tight">{m.sub}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
