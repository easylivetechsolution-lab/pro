import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { FIELD_STORIES } from '../data';
import { StoryArticle } from '../types';

interface FieldStoriesProps {
  onOpenArticle: (article: StoryArticle) => void;
  onViewAllStories: () => void;
  onVisitJournal: () => void;
}

export const FieldStories: React.FC<FieldStoriesProps> = ({
  onOpenArticle,
  onViewAllStories,
  onVisitJournal,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setNewsletterEmail('');
    }
  };

  return (
    <section id="insights" className="py-20 lg:py-28 bg-[#f5f4ec] text-[#12281c] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Field Stories */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-3">
                <h2
                  id="field-stories-heading"
                  className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0a2316] font-serif leading-tight"
                >
                  Real Farms. Real Impact.
                </h2>

                <p className="text-base sm:text-lg text-[#2a3c31] leading-relaxed">
                  See how we're making a difference, one harvest at a time.
                </p>
              </div>

              <button
                onClick={onViewAllStories}
                className="text-xs sm:text-sm font-semibold text-[#166534] hover:text-[#0f3422] flex items-center gap-1 group whitespace-nowrap"
              >
                <span>View All Stories</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Story Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {FIELD_STORIES.map((story) => (
                <div
                  key={story.id}
                  onClick={() => onOpenArticle(story)}
                  className="group rounded-2xl bg-white border border-[#22c55e]/20 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                    <img
                      src={story.imageUrl}
                      alt={story.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-semibold text-white border border-white/10">
                      {story.category}
                    </div>
                  </div>

                  <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-bold text-[#0a2316] group-hover:text-[#166534] transition-colors font-serif leading-snug">
                        {story.title}
                      </h3>
                      <p className="text-xs text-[#4b5563] line-clamp-2 mt-1.5 leading-relaxed">
                        {story.excerpt}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-[#166534] font-semibold">
                      <span className="text-gray-400 font-normal text-[11px]">{story.readTime}</span>
                      <span className="flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        Read Story <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Agriculture Intelligence Journal & Newsletter */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <h2
                id="journal-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0a2316] font-serif leading-tight"
              >
                Agriculture Intelligence
              </h2>

              <p className="text-base sm:text-lg text-[#2a3c31] leading-relaxed">
                Insights, trends and stories for a more sustainable food future delivered directly
                from our agronomists.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#22c55e]/25 shadow-lg space-y-5">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-inner">
                <img
                  src="https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80"
                  alt="Precision agricultural researchers examining high yield crops"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#d8b06d] uppercase tracking-widest">
                      SPECIAL REPORT • Q3 2026
                    </span>
                    <h4 className="text-sm font-bold text-white font-serif">
                      Microbiome Resilience in Modern Arid Climates
                    </h4>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs text-[#4b5563] leading-relaxed">
                  Join 4,200+ food distributors, agronomists, and commodity buyers who read our monthly field intelligence briefing.
                </p>

                <form onSubmit={handleSubscribe} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      required
                      placeholder="Enter business email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-xl bg-[#0d281a] hover:bg-[#133827] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
                    >
                      Subscribe
                    </button>
                  </div>
                  {subscribed && (
                    <p className="text-xs text-emerald-700 flex items-center gap-1.5 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />
                      Thank you for subscribing to Agriculture Intelligence.
                    </p>
                  )}
                </form>

                <div className="pt-2">
                  <button
                    onClick={onVisitJournal}
                    className="w-full py-2.5 rounded-xl border border-gray-300 hover:border-[#22c55e] text-xs font-semibold text-[#0a2316] hover:text-[#166534] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Visit Our Full Journal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
