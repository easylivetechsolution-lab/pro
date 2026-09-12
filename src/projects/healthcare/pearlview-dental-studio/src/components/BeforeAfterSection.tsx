import React, { useState, useRef } from 'react';
import { ArrowRight, MoveHorizontal, Award, CheckCircle, SlidersHorizontal, Eye } from 'lucide-react';
import { TRANSFORMATIONS_DATA } from '../data/dentalData';

interface BeforeAfterSectionProps {
  onOpenBooking: () => void;
}

export const BeforeAfterSection: React.FC<BeforeAfterSectionProps> = ({ onOpenBooking }) => {
  const [selectedCaseIndex, setSelectedCaseIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const [viewMode, setViewMode] = useState<'slider' | 'side-by-side'>('slider');
  const containerRef = useRef<HTMLDivElement>(null);

  const currentCase = TRANSFORMATIONS_DATA[selectedCaseIndex];

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPos(percentage);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    handlePointerMove(e);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <section id="results" className="py-20 lg:py-28 bg-white border-y border-zinc-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#5B7980] mb-2">
              <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Real Patient Results</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#0E282E] tracking-tight">
              Transformations That Speak for Themselves
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-600 max-w-xl">
              See the transformative difference personalized, precision care makes. Real Austin patients with genuine lasting confidence.
            </p>
          </div>

          {/* View Mode and Booking CTA */}
          <div className="flex items-center gap-3">
            <div className="inline-flex p-1 bg-zinc-100 rounded-lg text-xs font-medium border border-zinc-200">
              <button
                onClick={() => setViewMode('slider')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                  viewMode === 'slider' ? 'bg-white shadow-2xs text-[#0E282E] font-semibold' : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Interactive Slider</span>
              </button>
              <button
                onClick={() => setViewMode('side-by-side')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                  viewMode === 'side-by-side' ? 'bg-white shadow-2xs text-[#0E282E] font-semibold' : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Side by Side</span>
              </button>
            </div>

            <button
              onClick={onOpenBooking}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#0E282E] hover:bg-[#153B44] rounded-full transition-colors"
            >
              <span>Book consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Case selector pills */}
        <div className="flex flex-wrap gap-2.5 mb-8 pb-2 border-b border-zinc-100">
          {TRANSFORMATIONS_DATA.map((item, index) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedCaseIndex(index);
                setSliderPos(50);
              }}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                selectedCaseIndex === index
                  ? 'bg-[#0E282E] text-[#FAF9F6] shadow-sm scale-102'
                  : 'bg-[#FAF9F6] text-zinc-600 hover:bg-zinc-100 border border-zinc-200'
              }`}
            >
              <span>{item.title}</span>
              <span className="ml-2 text-[10px] opacity-75">({item.duration})</span>
            </button>
          ))}
        </div>

        {/* Transformation Showcase Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF9F6] rounded-3xl p-4 sm:p-8 border border-zinc-200/90 shadow-sm">
          {/* Interactive Visual Comparison (7 cols) */}
          <div className="lg:col-span-8">
            {viewMode === 'slider' ? (
              <div
                ref={containerRef}
                onPointerMove={handlePointerMove}
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
                className="relative w-full h-[320px] sm:h-[420px] rounded-2xl overflow-hidden shadow-lg select-none cursor-ew-resize touch-none border border-zinc-200"
              >
                {/* AFTER IMAGE (Background) */}
                <img
                  src={currentCase.afterImage}
                  alt={`${currentCase.title} After Result`}
                  className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
                />
                <span className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-[#0E282E]/80 backdrop-blur-xs text-white text-[11px] font-bold tracking-wider uppercase border border-white/20">
                  After Result
                </span>

                {/* BEFORE IMAGE (Clipped overlay) */}
                <div
                  className="absolute inset-0 overflow-hidden pointer-events-none"
                  style={{ width: `${sliderPos}%` }}
                >
                  <img
                    src={currentCase.beforeImage}
                    alt={`${currentCase.title} Before`}
                    className="absolute inset-0 w-full h-full object-cover object-center max-w-none"
                    style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
                  />
                  <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/70 backdrop-blur-xs text-white text-[11px] font-bold tracking-wider uppercase border border-white/20">
                    Before Care
                  </span>
                </div>

                {/* SLIDER DIVIDER LINE & HANDLE */}
                <div
                  className="absolute top-0 bottom-0 z-20 pointer-events-none transition-transform"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="h-full w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] relative">
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-[#0E282E] shadow-xl border-2 border-[#0E282E] flex items-center justify-center pointer-events-auto">
                      <MoveHorizontal className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Drag hint overlay at bottom */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium tracking-wide pointer-events-none">
                  Drag or scrub to compare Before & After
                </div>
              </div>
            ) : (
              /* Side-by-side view */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative rounded-2xl overflow-hidden h-[300px] border border-zinc-200 shadow-xs">
                  <img
                    src={currentCase.beforeImage}
                    alt="Before"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 text-white text-xs font-semibold uppercase">
                    Before
                  </span>
                </div>
                <div className="relative rounded-2xl overflow-hidden h-[300px] border border-zinc-200 shadow-xs">
                  <img
                    src={currentCase.afterImage}
                    alt="After"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#0E282E] text-white text-xs font-semibold uppercase">
                    After
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Case Narrative & Clinical Details (5 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-zinc-200 text-[#0E282E] text-xs font-semibold uppercase tracking-wider mb-3 w-fit">
              <span>{currentCase.category} Treatment</span>
            </div>

            <h3 className="text-2xl font-serif text-[#0E282E] mb-2 font-semibold">
              {currentCase.title}
            </h3>

            <div className="flex items-center gap-4 text-xs text-zinc-500 font-medium mb-4">
              <span>Timeline: <strong className="text-zinc-800">{currentCase.duration}</strong></span>
              <span>&bull;</span>
              <span>Patient: <strong className="text-zinc-800">{currentCase.patientAge}</strong></span>
            </div>

            <p className="text-sm text-zinc-600 leading-relaxed mb-6">
              {currentCase.description}
            </p>

            {/* Key Clinical Improvements */}
            <div className="space-y-2.5 mb-6">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Clinical Outcomes
              </p>
              {currentCase.details.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-zinc-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>

            <button
              onClick={onOpenBooking}
              className="w-full py-3 px-5 text-xs font-semibold uppercase tracking-wider text-white bg-[#0E282E] hover:bg-[#153B44] rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Schedule Smile Assessment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2-Card Preview Grid (Matching screenshot layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Card 1: Teeth Whitening */}
          <div
            onClick={() => setSelectedCaseIndex(0)}
            className="group cursor-pointer p-4 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs hover:shadow-md transition-all"
          >
            <div className="grid grid-cols-2 gap-2 h-44 rounded-xl overflow-hidden mb-3 relative">
              <img
                src={TRANSFORMATIONS_DATA[0].beforeImage}
                alt="Whitening Before"
                className="w-full h-full object-cover"
              />
              <img
                src={TRANSFORMATIONS_DATA[0].afterImage}
                alt="Whitening After"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-sm bg-black/70 text-white text-[10px] font-bold">Before</span>
              <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-sm bg-[#0E282E]/90 text-white text-[10px] font-bold">After</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-serif text-base font-semibold text-[#0E282E]">Teeth Whitening</h4>
                <p className="text-xs text-zinc-500">1 week &bull; Brighter, more confident smile.</p>
              </div>
              <span className="text-xs font-semibold text-[#0E282E] group-hover:translate-x-1 transition-transform">&rarr;</span>
            </div>
          </div>

          {/* Card 2: Invisalign */}
          <div
            onClick={() => setSelectedCaseIndex(1)}
            className="group cursor-pointer p-4 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs hover:shadow-md transition-all"
          >
            <div className="grid grid-cols-2 gap-2 h-44 rounded-xl overflow-hidden mb-3 relative">
              <img
                src={TRANSFORMATIONS_DATA[1].beforeImage}
                alt="Invisalign Before"
                className="w-full h-full object-cover"
              />
              <img
                src={TRANSFORMATIONS_DATA[1].afterImage}
                alt="Invisalign After"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-sm bg-black/70 text-white text-[10px] font-bold">Before</span>
              <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-sm bg-[#0E282E]/90 text-white text-[10px] font-bold">After</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-serif text-base font-semibold text-[#0E282E]">Invisalign® Clear Alignment</h4>
                <p className="text-xs text-zinc-500">8 months &bull; Straighter teeth, balanced harmony.</p>
              </div>
              <span className="text-xs font-semibold text-[#0E282E] group-hover:translate-x-1 transition-transform">&rarr;</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
