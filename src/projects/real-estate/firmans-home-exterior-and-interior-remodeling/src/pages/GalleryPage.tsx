import React, { useState } from 'react';
import { Sliders, ArrowRight, CheckCircle2, Calendar, MapPin, Layers } from 'lucide-react';
import { GALLERY_PROJECTS } from '../data/remodelingData';
import type { GalleryProject } from '../types';

interface GalleryPageProps {
  onSelectProject: (project: GalleryProject) => void;
  onOpenQuote: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onSelectProject, onOpenQuote }) => {
  const [filter, setFilter] = useState<'All' | 'Exterior' | 'Interior' | 'Outdoor'>('All');
  const [sliderPositions, setSliderPositions] = useState<Record<string, number>>({
    'exterior-makeover': 50,
    'modern-kitchen': 50,
    'spa-bathroom': 50,
    'backyard-turf': 50,
  });

  const filteredProjects = filter === 'All'
    ? GALLERY_PROJECTS
    : GALLERY_PROJECTS.filter((p) => p.category === filter);

  const handleSliderChange = (projectId: string, value: number) => {
    setSliderPositions((prev) => ({
      ...prev,
      [projectId]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-[#0B131E] text-slate-100 pt-28 pb-24">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#182335] border border-white/10 text-xs font-semibold uppercase tracking-[0.22em] text-[#C07848] mb-5">
          <span>Firmans Showcase</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-white mb-6 max-w-4xl mx-auto leading-[1.12]">
          Real Projects. Verified Transformations.
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
          Inspect our documented before-and-after case studies. Slide between original conditions and completed architectural renovations.
        </p>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mt-10">
          {(['All', 'Exterior', 'Interior', 'Outdoor'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                filter === cat
                  ? 'bg-[#C07848] text-white shadow-lg shadow-[#C07848]/20 font-semibold'
                  : 'bg-[#141E2D] hover:bg-[#1C2A3E] text-slate-300 border border-white/10 hover:border-white/20'
              }`}
            >
              {cat === 'All' ? 'All Transformations' : cat}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {filteredProjects.map((project) => {
            const sliderPos = sliderPositions[project.id] ?? 50;

            return (
              <div
                key={project.id}
                id={`gallery-card-${project.id}`}
                className="bg-[#121C2B] rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col justify-between"
              >
                {/* Before / After Comparison Slider Container */}
                <div className="relative aspect-[16/11] w-full overflow-hidden select-none bg-slate-900">
                  {/* After Image (Full Base) */}
                  <img
                    src={project.afterImage}
                    alt={`${project.title} Completed Transformation`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Before Image (Clipped) */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                  >
                    <img
                      src={project.beforeImage}
                      alt={`${project.title} Prior Condition`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>

                  {/* Divider Line */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.8)] z-10 pointer-events-none"
                    style={{ left: `${sliderPos}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#C07848] text-white flex items-center justify-center shadow-lg pointer-events-none">
                      <Sliders className="w-3.5 h-3.5 rotate-90" />
                    </div>
                  </div>

                  {/* Slider Control Input */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderPos}
                    onChange={(e) => handleSliderChange(project.id, Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                    aria-label="Before and after transformation slider"
                  />

                  {/* Badges */}
                  <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded bg-[#0F172A]/85 backdrop-blur-md text-white border border-white/20">
                      Before
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 z-10 pointer-events-none">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded bg-[#C07848] text-white font-semibold shadow-md">
                      After
                    </span>
                  </div>
                </div>

                {/* Project Metadata & Scope */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-[#D28A5B] font-semibold bg-[#182335] px-3 py-1 rounded-full border border-white/10">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{project.duration} Duration</span>
                      </div>
                    </div>

                    <p className="text-xs text-[#C07848] font-semibold uppercase tracking-wider">
                      {project.tags.join(' • ')}
                    </p>

                    <p className="text-sm text-slate-300 font-light leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Key Scope Milestones */}
                  <div className="pt-4 border-t border-white/10 space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                      Remodeling Scope:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
                      {project.scope.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C07848] shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action */}
                  <div className="pt-2">
                    <button
                      onClick={() => onSelectProject(project)}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#182335] hover:bg-[#C07848] text-slate-200 hover:text-white font-medium text-xs sm:text-sm border border-white/10 hover:border-transparent transition-all cursor-pointer"
                    >
                      <span>View Project Specifications &amp; Blueprint</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#121C2B] border border-white/10 text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Have a Specific Home Remodel in Mind?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-light leading-relaxed">
            Our architectural team provides complimentary on-site structural inspections, 3D drafting layouts, and itemized transparent pricing.
          </p>
          <div className="pt-3">
            <button
              onClick={onOpenQuote}
              className="inline-flex items-center gap-2 bg-[#C07848] hover:bg-[#D28A5B] text-white font-semibold px-8 py-3.5 rounded-full text-sm tracking-wide shadow-lg shadow-[#C07848]/25 transition-all cursor-pointer"
            >
              <span>Schedule Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
