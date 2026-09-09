import React, { useState } from 'react';
import { Play, Sparkles, X, ArrowRight } from 'lucide-react';
import { TrilinkLogo } from './TrilinkLogo';

export const SessionsBanner: React.FC = () => {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-[#0A2333] to-[#044438] text-white p-8 sm:p-12 lg:p-16 shadow-2xl border border-slate-800">
          {/* Subtle decorative elements */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-emerald-300">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Trilink Sessions 2026 · On Demand</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                Building the economic infrastructure for AI.
              </h2>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                Watch the flagship keynote on the next generation of financial infrastructure—including autonomous agent commerce, stablecoin orchestration, and global real-time ledger intelligence.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPlayingVideo(true)}
                  className="group inline-flex items-center px-6 py-3.5 rounded-full bg-[#00E599] hover:bg-[#00D48D] text-slate-950 font-bold text-sm shadow-lg hover:shadow-xl transition-all"
                >
                  <Play className="w-4 h-4 mr-2 fill-slate-950" />
                  <span>Watch keynote</span>
                  <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                </button>

                <a
                  href="#developers"
                  className="inline-flex items-center px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all backdrop-blur-sm"
                >
                  Explore AI releases
                </a>
              </div>
            </div>

            {/* Right Badge / Keynote Card preview */}
            <div className="lg:col-span-4 flex justify-center">
              <div
                onClick={() => setIsPlayingVideo(true)}
                className="relative cursor-pointer group rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-slate-900/80 backdrop-blur-md p-5 text-center max-w-sm w-full hover:border-emerald-400/60 transition-all duration-300"
              >
                <div className="h-44 rounded-xl bg-gradient-to-tr from-emerald-900/60 via-slate-800 to-cyan-900/40 flex items-center justify-center relative overflow-hidden group-hover:scale-[1.02] transition-transform">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:bg-[#00E599] transition-all">
                      <Play className="w-6 h-6 text-white group-hover:text-slate-950 fill-current ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between text-[11px] font-mono font-medium text-slate-300 bg-slate-950/60 px-2 py-1 rounded backdrop-blur-sm">
                    <span>Keynote · 48m</span>
                    <span className="text-emerald-400">4K Ultra HD</span>
                  </div>
                </div>

                <div className="mt-4 text-left">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">Opening Keynote</div>
                  <div className="text-sm font-bold text-white mt-0.5">The Agentic Economy & Universal Ledger</div>
                  <div className="text-xs text-slate-400 mt-1">With Trilink leadership and special guests</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal Simulation */}
      {isPlayingVideo && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-lg flex items-center justify-center p-4">
          <div className="relative bg-slate-900 rounded-3xl max-w-4xl w-full p-6 text-white border border-slate-800 shadow-2xl">
            <button
              onClick={() => setIsPlayingVideo(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-xl font-bold mb-4">Trilink Sessions 2026 Keynote</div>
            <div className="aspect-video w-full rounded-2xl bg-black flex flex-col items-center justify-center p-8 border border-slate-800">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-[#00E599] flex items-center justify-center mb-4">
                <Play className="w-8 h-8 fill-current ml-1" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Streaming Session: Building Economic Infrastructure for AI</h3>
              <p className="text-xs text-slate-400 max-w-md text-center">
                Now streaming keynote broadcast recording. Thank you for joining the global developer community.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
