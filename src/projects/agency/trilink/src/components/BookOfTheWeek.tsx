import React from 'react';
import { BookOpen, Compass, ArrowRight, ExternalLink } from 'lucide-react';

export const BookOfTheWeek: React.FC = () => {
  return (
    <section id="book-of-the-week" className="py-20 bg-slate-50/70 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Book Cover Graphic illustration */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative group w-56 h-80 rounded-2xl bg-gradient-to-br from-amber-500 via-emerald-600 to-[#0A2333] p-6 text-white shadow-xl flex flex-col justify-between border-2 border-slate-100 transform transition-transform duration-300 hover:rotate-1 hover:scale-105">
                <div className="text-[10px] font-mono tracking-widest uppercase opacity-80">
                  Trilink Press Edition
                </div>
                <div>
                  <h4 className="text-xl font-serif font-black tracking-tight leading-tight">
                    The Beginning of Infinity
                  </h4>
                  <p className="text-xs opacity-90 mt-1 italic">Explanations that Transform the World</p>
                  <div className="mt-4 text-xs font-mono font-bold tracking-wider text-emerald-300">
                    David Deutsch
                  </div>
                </div>
                <div className="text-[9px] font-mono opacity-70 border-t border-white/20 pt-2 flex justify-between">
                  <span>FOUNDATIONS OF PROGRESS</span>
                  <span>VOL. I</span>
                </div>
              </div>
            </div>

            {/* Right: Book Details & In-house publications */}
            <div className="lg:col-span-8 space-y-6">
              <div>
                <span className="text-xs font-bold text-[#00A86B] uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full">
                  Book of the Week
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-3 tracking-tight">
                  The Beginning of Infinity
                </h3>
                <p className="text-sm font-semibold text-slate-500">By David Deutsch</p>
              </div>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Deutsch argues that all progress depends on a single thing: good explanations. A good explanation is one precise enough to be testable, and therefore replaceable when something better comes along. Once you have a culture that allows that process to happen, the growth of human knowledge has no necessary end—and we're only at its beginning.
              </p>

              <div className="pt-4 border-t border-slate-100">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  For more ideas on economic progress, explore our in-house publications:
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="#press"
                    className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition-colors text-xs font-bold text-slate-800"
                  >
                    <BookOpen className="w-4 h-4 text-emerald-600" />
                    <span>Trilink Press</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 text-slate-400" />
                  </a>

                  <a
                    href="#progress"
                    className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-colors text-xs font-bold text-slate-800"
                  >
                    <Compass className="w-4 h-4 text-blue-600" />
                    <span>Works in Progress</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 text-slate-400" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
