import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Sliders, ExternalLink, ArrowRight, Clock } from 'lucide-react';
import { GALLERY_PROJECTS } from '../data/remodelingData';
import type { GalleryProject } from '../types';

interface GallerySectionProps {
  onSelectProject: (project: GalleryProject) => void;
  onNavigate?: (route: 'home' | 'services' | 'gallery' | 'about' | 'contact') => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onSelectProject, onNavigate }) => {
  const [activeBeforeAfter, setActiveBeforeAfter] = useState<Record<string, number>>({
    'exterior-makeover': 50,
    'modern-kitchen': 50,
    'spa-bathroom': 50,
    'backyard-turf': 50,
  });

  const [filter, setFilter] = useState<'All' | 'Exterior' | 'Interior' | 'Outdoor'>('All');
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredProjects = filter === 'All'
    ? GALLERY_PROJECTS
    : GALLERY_PROJECTS.filter((p) => p.category === filter);

  const handleSliderChange = (projectId: string, value: number) => {
    setActiveBeforeAfter((prev) => ({
      ...prev,
      [projectId]: value,
    }));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredProjects.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < filteredProjects.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="gallery" className="py-24 sm:py-32 bg-[#0B131E] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-[#C07848]">
              DOCUMENTED TRANSFORMATIONS
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-serif">
              Real Projects. Verified Craftsmanship.
            </h2>
            <p className="text-base text-slate-300 font-light leading-relaxed">
              Slide to compare original property conditions with completed Firmans architectural renovations.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3">
            <button
              id="gallery-prev-btn"
              onClick={handlePrev}
              className="w-11 h-11 rounded-full border border-white/15 bg-white/5 hover:bg-[#C07848] hover:text-white hover:border-[#C07848] flex items-center justify-center text-white transition-all duration-200 cursor-pointer"
              aria-label="Previous projects"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              id="gallery-next-btn"
              onClick={handleNext}
              className="w-11 h-11 rounded-full border border-white/15 bg-white/5 hover:bg-[#C07848] hover:text-white hover:border-[#C07848] flex items-center justify-center text-white transition-all duration-200 cursor-pointer"
              aria-label="Next projects"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProjects.map((project) => {
            const sliderPos = activeBeforeAfter[project.id] ?? 50;

            return (
              <div
                key={project.id}
                id={`gallery-project-${project.id}`}
                className="group bg-[#121C2B] rounded-2xl overflow-hidden border border-white/10 hover:border-[#C07848]/60 transition-all duration-300 shadow-xl flex flex-col justify-between"
              >
                {/* Interactive Before/After Split Viewer */}
                <div className="relative aspect-[4/3] w-full overflow-hidden select-none bg-slate-900">
                  {/* After Image */}
                  <img
                    src={project.afterImage}
                    alt={`${project.title} After`}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />

                  {/* Before Image */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                  >
                    <img
                      src={project.beforeImage}
                      alt={`${project.title} Before`}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80';
                      }}
                    />
                  </div>

                  {/* Vertical Divider Line */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.8)] z-10 pointer-events-none"
                    style={{ left: `${sliderPos}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#C07848] text-white flex items-center justify-center shadow-lg pointer-events-none">
                      <Sliders className="w-3 h-3 rotate-90" />
                    </div>
                  </div>

                  {/* Interactive Slider Input */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderPos}
                    onChange={(e) => handleSliderChange(project.id, Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                    aria-label="Before and after comparison slider"
                  />

                  {/* Before / After Badges */}
                  <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-white border border-white/20">
                      Before
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 z-10 pointer-events-none">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#C07848] text-white font-semibold shadow-md">
                      After
                    </span>
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3
                      onClick={() => onSelectProject(project)}
                      className="text-base font-bold text-white group-hover:text-[#D28A5B] transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <span>{project.title}</span>
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#C07848]" />
                    </h3>

                    <p className="text-xs text-slate-400 mt-2 font-medium tracking-wide">
                      {project.tags.join(' • ')}
                    </p>
                  </div>

                  {/* Quick details footer */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="inline-flex items-center gap-1.5 text-[#C07848]">
                      <Clock className="w-3 h-3" />
                      {project.duration}
                    </span>
                    <button
                      onClick={() => onSelectProject(project)}
                      className="hover:text-white transition-colors underline underline-offset-2 cursor-pointer"
                    >
                      View Specifications
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View Full Gallery Page Link */}
        {onNavigate && (
          <div className="mt-14 text-center">
            <button
              onClick={() => {
                onNavigate('gallery');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#182335] hover:bg-[#C07848] text-white font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-md border border-white/10 hover:border-transparent cursor-pointer"
            >
              <span>Explore Complete Firmans Portfolio &amp; Case Studies</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
