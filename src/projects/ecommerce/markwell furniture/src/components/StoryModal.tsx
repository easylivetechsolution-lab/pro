import React, { useState } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  TreePine, 
  Award, 
  Clock 
} from 'lucide-react';

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StoryModal: React.FC<StoryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#12151c] border border-white/15 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl z-10 overflow-hidden max-h-[90vh] overflow-y-auto no-scrollbar">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-black/60 hover:bg-white/15 text-zinc-300 hover:text-white transition-colors cursor-pointer z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Player Presentation */}
        <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden bg-black mb-6 border border-white/10 group">
          <img
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85"
            alt="Master craftsman hand-planing sustainable walnut lumber"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

          {/* Central Play/Pause Overlay */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute inset-0 flex items-center justify-center cursor-pointer group"
          >
            <div className="w-16 h-16 rounded-full bg-[#f3ba77]/90 hover:bg-[#e29d52] flex items-center justify-center text-black shadow-2xl transition-transform transform group-hover:scale-110">
              {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
            </div>
          </button>

          {/* Video Status Badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white border border-white/10">
            <span>Short Documentary: "The Art of the Modern Sanctuary"</span>
          </div>

          {/* Bottom Video Controls Bar */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-zinc-300 bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[#f3ba77]">01:42 / 03:15</span>
              <span className="text-zinc-500">|</span>
              <span className="hidden sm:inline">Chapter 2: Master Joinery & Ergonomic Kinetics</span>
            </div>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1 text-zinc-400 hover:text-white transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Brand Story Narrative */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-4 h-4 text-[#f3ba77]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#f3ba77]">
                Heritage & Innovation
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Crafting Workspaces that Elevate the Human Spirit
            </h3>
          </div>

          <p className="text-sm text-zinc-300 leading-relaxed">
            MarkWell began with a single conviction: the spaces where we build the future should never compromise human biology. Too many modern professionals sacrifice spinal wellness, posture, and mental clarity on mass-manufactured, throwaway office gear.
          </p>

          {/* 3 Milestones / Core Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-[#171c26] p-4 rounded-2xl border border-white/5">
              <TreePine className="w-6 h-6 text-[#f3ba77] mb-2" />
              <h4 className="text-sm font-bold text-white mb-1">100% Certified Hardwoods</h4>
              <p className="text-xs text-zinc-400">Harvested from certified regenerative forests in North America and Bavaria.</p>
            </div>

            <div className="bg-[#171c26] p-4 rounded-2xl border border-white/5">
              <Award className="w-6 h-6 text-[#f3ba77] mb-2" />
              <h4 className="text-sm font-bold text-white mb-1">Orthopedic Biomechanics</h4>
              <p className="text-xs text-zinc-400">Co-developed with clinical physiotherapists and ergonomic researchers.</p>
            </div>

            <div className="bg-[#171c26] p-4 rounded-2xl border border-white/5">
              <Clock className="w-6 h-6 text-[#f3ba77] mb-2" />
              <h4 className="text-sm font-bold text-white mb-1">Generational Longevity</h4>
              <p className="text-xs text-zinc-400">Tested to exceed 200,000 stress cycles with a 10-year comprehensive warranty.</p>
            </div>
          </div>

          {/* Master Artisan Quote */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
              alt="Marcus Sterling"
              className="w-12 h-12 rounded-full object-cover border-2 border-[#f3ba77] shrink-0"
            />
            <div>
              <p className="text-xs sm:text-sm text-zinc-200 italic">
                “When an artisan cuts into a centuries-old walnut log, you respect the grain. That respect translates directly into the peace and focus you feel when sitting at the finished desk.”
              </p>
              <span className="text-[11px] font-bold text-[#f3ba77] uppercase tracking-wider block mt-1">
                Marcus Sterling — Chief Master Artisan, MarkWell Studios
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
