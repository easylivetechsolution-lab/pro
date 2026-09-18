import React from 'react';
import { X, Play, Award, CheckCircle, Compass } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuote: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, onOpenQuote }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in">
      <div
        id="story-video-modal"
        className="relative w-full max-w-3xl bg-[#0B131E] border border-white/15 rounded-3xl overflow-hidden shadow-2xl text-white my-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors border border-white/20 cursor-pointer"
          aria-label="Close story modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Canvas / Showcase Player */}
        <div className="relative aspect-video w-full bg-slate-950 overflow-hidden group">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85"
            alt="Master craftsmanship showcase preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/50" />

          {/* Centered Play Button & Branding */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#C07848] text-white flex items-center justify-center shadow-lg shadow-[#C07848]/40 cursor-pointer hover:scale-105 active:scale-95 transition-all">
              <Play className="w-7 h-7 sm:w-8 sm:h-8 ml-1 fill-current" />
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D28A5B] mt-4">
              FIRMANS ARCHITECTURAL FILM
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-white mt-1">
              The Architecture of Transformation
            </h3>
            <p className="text-xs text-slate-300 max-w-md mt-1 font-light">
              Watch how our team takes properties from blueprint conceptualization through master masonry, custom glass, and turnkey interior finishes.
            </p>
          </div>
        </div>

        {/* Video Metadata / Highlights */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
              <Award className="w-5 h-5 text-[#C07848] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">AIA Affiliated</h4>
                <p className="text-[11px] text-slate-400 mt-0.5 font-light">Licensed architectural design</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#C07848] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Master Builders</h4>
                <p className="text-[11px] text-slate-400 mt-0.5 font-light">Certified in-house trades</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
              <Compass className="w-5 h-5 text-[#C07848] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">CAD Blueprints</h4>
                <p className="text-[11px] text-slate-400 mt-0.5 font-light">Structural drafting &amp; permits</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-white/10">
            <div className="text-xs text-slate-400 text-center sm:text-left font-light">
              Ready to initiate your home's transformation journey?
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenQuote();
              }}
              className="bg-[#C07848] text-white font-semibold px-6 py-2.5 rounded-full text-xs hover:bg-[#D28A5B] transition-all cursor-pointer shadow-md"
            >
              Request Free Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
