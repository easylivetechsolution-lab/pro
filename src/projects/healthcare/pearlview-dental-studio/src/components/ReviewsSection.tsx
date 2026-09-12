import React, { useState } from 'react';
import { Star, Quote, CheckCircle, MessageSquarePlus } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/dentalData';

interface ReviewsSectionProps {
  onNavigate?: (page: string) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ onNavigate }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [showAddReview, setShowAddReview] = useState<boolean>(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewText, setNewReviewText] = useState('');
  const [submittedReview, setSubmittedReview] = useState(false);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewText.trim()) return;
    setSubmittedReview(true);
    setTimeout(() => {
      setShowAddReview(false);
      setSubmittedReview(false);
      setNewReviewAuthor('');
      setNewReviewText('');
    }, 2000);
  };

  return (
    <section id="reviews" className="py-20 lg:py-28 bg-[#FAF9F6] border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#5B7980] mb-2">
              <span>Patient Reviews</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#0E282E] tracking-tight">
              What Our Patients Say
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {onNavigate && (
              <button
                onClick={() => onNavigate('patient-stories')}
                className="px-4 py-2 text-xs font-semibold text-[#0E282E] bg-white border border-zinc-200 hover:border-zinc-300 rounded-full transition-colors cursor-pointer shadow-2xs"
              >
                Full Patient Stories & Case Studies &rarr;
              </button>
            )}

            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-zinc-200 shadow-2xs">
              <span className="text-xs font-bold text-zinc-800">5.0</span>
              <div className="flex text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-[11px] text-zinc-500 font-medium">Google Reviews</span>
            </div>

            <button
              onClick={() => setShowAddReview(!showAddReview)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#0E282E] bg-white border border-zinc-200 hover:border-zinc-300 rounded-full transition-colors cursor-pointer"
            >
              <MessageSquarePlus className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Share Experience</span>
            </button>
          </div>
        </div>

        {/* Optional Review Modal Form */}
        {showAddReview && (
          <div className="mb-8 p-6 rounded-2xl bg-white border border-zinc-300 shadow-md animate-in fade-in duration-200 max-w-xl">
            <h4 className="text-sm font-bold text-[#0E282E] mb-2">Write a Patient Review</h4>
            {submittedReview ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Thank you! Your testimonial has been submitted to the practice team.</span>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Your Name (e.g. Jessica M.)"
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-zinc-200 rounded-lg focus:outline-hidden focus:border-[#0E282E]"
                  required
                />
                <textarea
                  placeholder="Share details of your experience..."
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 text-xs border border-zinc-200 rounded-lg focus:outline-hidden focus:border-[#0E282E]"
                  required
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddReview(false)}
                    className="px-3 py-1.5 text-xs text-zinc-500 hover:text-zinc-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs font-semibold text-white bg-[#0E282E] rounded-lg hover:bg-[#153B44]"
                  >
                    Post Review
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Testimonials Grid (matching 4-card structure from screenshot) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS_DATA.map((t, idx) => {
            const isFeaturedCard = idx === 0;
            return (
              <div
                key={t.id}
                className={`rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:translate-y-[-2px] ${
                  isFeaturedCard
                    ? 'bg-white border-2 border-[#0E282E]/20 shadow-md'
                    : 'bg-white border border-zinc-200/90 shadow-2xs hover:shadow-sm'
                }`}
              >
                <div>
                  {/* Big quotation icon on card 1 or subtle star bar */}
                  {isFeaturedCard ? (
                    <Quote className="w-8 h-8 text-[#0E282E]/30 mb-3" />
                  ) : (
                    <div className="flex text-[#D4AF37] gap-0.5 mb-4">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  )}

                  <p
                    className={`text-zinc-700 leading-relaxed ${
                      isFeaturedCard
                        ? 'font-serif text-base sm:text-lg text-[#0E282E] font-medium'
                        : 'text-xs sm:text-sm'
                    }`}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                {/* Patient Author Signature Info */}
                <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#E8EFF0] text-[#0E282E] font-bold text-xs flex items-center justify-center flex-shrink-0">
                      {t.initial}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900">{t.name}</h4>
                      {isFeaturedCard && (
                        <div className="flex text-[#D4AF37] gap-0.5 mt-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-2.5 h-2.5 fill-current" />
                          ))}
                        </div>
                      )}
                      <p className="text-[10px] text-zinc-400">{t.service}</p>
                    </div>
                  </div>

                  {/* Google Tag */}
                  <div className="flex items-center gap-1 text-[11px] text-zinc-400 font-medium">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span>Google</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
