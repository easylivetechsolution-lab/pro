import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Globe2, 
  Building2, 
  Landmark, 
  Users, 
  CheckCircle2, 
  Info,
  ChevronDown
} from 'lucide-react';
import { TRUST_METRICS } from '../data/mockData';

export const TrustBar: React.FC = () => {
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const icons = [
    <ShieldCheck className="w-5 h-5 text-cyan-400" />,
    <Globe2 className="w-5 h-5 text-cyan-400" />,
    <Building2 className="w-5 h-5 text-cyan-400" />,
    <Landmark className="w-5 h-5 text-cyan-400" />,
    <Users className="w-5 h-5 text-cyan-400" />,
  ];

  return (
    <section className="bg-[#0b1b33] text-white py-6 border-y border-slate-800 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/80">
          {TRUST_METRICS.map((metric, index) => {
            const isSelected = activeItem === index;
            return (
              <div 
                key={metric.title}
                onClick={() => setActiveItem(isSelected ? null : index)}
                className={`flex flex-col pt-3 sm:pt-0 sm:px-3 cursor-pointer group transition-colors rounded-lg p-2 ${
                  isSelected ? 'bg-white/5' : 'hover:bg-white/[0.02]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-sky-950/60 border border-sky-500/20 flex items-center justify-center shrink-0 group-hover:border-cyan-400/40 group-hover:scale-105 transition-all">
                    {icons[index]}
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white tracking-tight leading-snug group-hover:text-cyan-300 transition-colors">
                      {metric.title}
                    </h2>
                    <p className="text-xs text-slate-400 leading-tight">
                      {metric.description}
                    </p>
                  </div>
                </div>

                {/* Micro Expandable Detail on Click */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2.5 pt-2 border-t border-slate-700/80 text-xs text-white font-medium leading-relaxed overflow-hidden"
                    >
                      <p className="text-white">{metric.detail}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
