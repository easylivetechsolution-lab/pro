import React from 'react';
import { X, Calendar, Clock, User, Share2, BookOpen } from 'lucide-react';
import type { BlogPost } from '../types';

interface BlogModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export const BlogModal: React.FC<BlogModalProps> = ({ post, onClose }) => {
  if (!post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#12151d] border border-white/15 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl z-10 overflow-hidden max-h-[90vh] overflow-y-auto no-scrollbar">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero image */}
        <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden mb-6 relative">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#f3ba77]">
            {post.category}
          </div>
        </div>

        {/* Article Meta */}
        <div className="flex items-center gap-4 text-xs text-zinc-400 mb-3">
          <span className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#f3ba77]" />
            {post.author}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {post.date}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {post.readTime}
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
          {post.title}
        </h2>

        {/* Content */}
        <div className="space-y-4 text-sm sm:text-base text-zinc-300 leading-relaxed pt-2 border-t border-white/10 font-normal">
          {post.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* Footer info & CTA */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#e29d52]/20 flex items-center justify-center text-[#f3ba77] font-bold text-xs">
              MW
            </div>
            <div>
              <h5 className="text-xs font-bold text-white">MarkWell Editorial Bureau</h5>
              <p className="text-[11px] text-zinc-500">Curating ergonomic science & architectural craftsmanship</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-white/10 hover:bg-[#e29d52] hover:text-black text-white text-xs font-bold transition-all"
          >
            Close Article
          </button>
        </div>

      </div>
    </div>
  );
};
