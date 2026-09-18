import React from 'react';
import { X, CheckCircle2, ShieldCheck, Tag, ArrowRight } from 'lucide-react';
import type { ServiceItem, GalleryProject } from '../types';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onOpenQuote: (serviceId: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ service, onClose, onOpenQuote }) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in">
      <div
        id="service-detail-modal"
        className="relative w-full max-w-2xl bg-[#0B131E] border border-white/15 rounded-3xl overflow-hidden shadow-2xl text-white my-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors border border-white/20 cursor-pointer"
          aria-label="Close service modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image */}
        <div className="relative h-60 w-full overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B131E] via-[#0B131E]/40 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#D28A5B] px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10">
              {service.category} Remodeling
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white mt-1.5">
              {service.title}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <p className="text-sm text-slate-300 leading-relaxed font-light">
            {service.description}
          </p>

          {/* Key Features */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Key Standards &amp; Features
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#C07848] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Materials & Warranty */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-white/10">
            {service.materials && (
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#D28A5B]">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Specified Materials</span>
                </div>
                <p className="text-[11px] text-slate-300 font-light">
                  {service.materials.join(', ')}
                </p>
              </div>
            )}

            {service.warranty && (
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#D28A5B]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Firmans Warranty</span>
                </div>
                <p className="text-[11px] text-slate-300 font-light">
                  {service.warranty}
                </p>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
            <div className="text-xs text-slate-400 text-center sm:text-left">
              Typical Range: <span className="font-bold text-white">{service.priceRange || 'Custom Quote'}</span>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenQuote(service.id);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C07848] hover:bg-[#D28A5B] text-white font-semibold px-6 py-2.5 rounded-full text-xs transition-all shadow-md cursor-pointer"
            >
              <span>Request Quote for {service.title}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ProjectDetailModalProps {
  project: GalleryProject | null;
  onClose: () => void;
  onOpenQuote: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose, onOpenQuote }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in">
      <div
        id="project-detail-modal"
        className="relative w-full max-w-2xl bg-[#0B131E] border border-white/15 rounded-3xl overflow-hidden shadow-2xl text-white my-8"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors border border-white/20 cursor-pointer"
          aria-label="Close project modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative h-64 w-full overflow-hidden">
          <img
            src={project.afterImage}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B131E] via-[#0B131E]/40 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#D28A5B] px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10">
              Completed Project • {project.duration}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white mt-1.5">
              {project.title}
            </h3>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <p className="text-sm text-slate-300 leading-relaxed font-light">
            {project.description}
          </p>

          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Project Execution Scope
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.scope.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C07848] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
            <div className="text-xs text-slate-400">
              Disciplines: {project.tags.join(', ')}
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenQuote();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C07848] hover:bg-[#D28A5B] text-white font-semibold px-6 py-2.5 rounded-full text-xs transition-all shadow-md cursor-pointer"
            >
              <span>Consult on Similar Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
