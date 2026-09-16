import React from 'react';
import { 
  ShieldCheck, 
  Leaf, 
  Layers, 
  Globe, 
  Headphones
} from 'lucide-react';

export const TrustBar: React.FC = () => {
  return (
    <section className="bg-[#090b0e] border-y border-white/10 py-7 relative overflow-hidden select-none">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Horizontal Trust Feature Strip + Quote matching bottom strip of reference */}
        <div className="flex flex-col xl:flex-row items-center justify-between gap-6 xl:gap-8">
          
          {/* 5 Key Value Propositions */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6 lg:gap-8 w-full xl:w-auto flex-1 items-center">
            
            {/* 1. Premium Quality Materials */}
            <div className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#f3ba77] group-hover:border-[#f3ba77] group-hover:scale-105 transition-all shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white tracking-tight leading-tight">
                  Premium Quality
                </h4>
                <p className="text-[11px] text-zinc-400 leading-tight">Materials</p>
              </div>
            </div>

            {/* 2. Sustainable & Eco-Friendly */}
            <div className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#f3ba77] group-hover:border-[#f3ba77] group-hover:scale-105 transition-all shrink-0">
                <Leaf className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white tracking-tight leading-tight">
                  Sustainable
                </h4>
                <p className="text-[11px] text-zinc-400 leading-tight">& Eco-Friendly</p>
              </div>
            </div>

            {/* 3. Custom Design & Manufacturing */}
            <div className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#f3ba77] group-hover:border-[#f3ba77] group-hover:scale-105 transition-all shrink-0">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white tracking-tight leading-tight">
                  Custom Design
                </h4>
                <p className="text-[11px] text-zinc-400 leading-tight">& Manufacturing</p>
              </div>
            </div>

            {/* 4. Global Shipping & Logistics */}
            <div className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#f3ba77] group-hover:border-[#f3ba77] group-hover:scale-105 transition-all shrink-0">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white tracking-tight leading-tight">
                  Global Shipping
                </h4>
                <p className="text-[11px] text-zinc-400 leading-tight">& Logistics</p>
              </div>
            </div>

            {/* 5. Dedicated Customer Support */}
            <div className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#f3ba77] group-hover:border-[#f3ba77] group-hover:scale-105 transition-all shrink-0">
                <Headphones className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white tracking-tight leading-tight">
                  Dedicated
                </h4>
                <p className="text-[11px] text-zinc-400 leading-tight">Customer Support</p>
              </div>
            </div>

          </div>

          {/* Divider between badges and quote on large screens */}
          <div className="hidden xl:block w-px h-10 bg-white/10 shrink-0" />

          {/* Right Brand Quote Statement matching bottom-right of reference */}
          <div className="flex items-start gap-3 max-w-md xl:max-w-xs shrink-0 self-start xl:self-center pt-3 xl:pt-0 border-t border-white/10 xl:border-t-0 w-full xl:w-auto">
            <span className="text-3xl font-serif text-[#f3ba77] leading-none select-none shrink-0">“</span>
            <div>
              <blockquote className="text-xs sm:text-[13px] font-normal text-zinc-300 italic font-serif leading-relaxed">
                "We don't just sell furniture, we build better workspaces and healthier teams."
              </blockquote>
              <cite className="block text-[10px] uppercase tracking-widest text-[#f3ba77] font-sans font-bold not-italic mt-1">
                — MarkWell Furniture Solutions
              </cite>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
