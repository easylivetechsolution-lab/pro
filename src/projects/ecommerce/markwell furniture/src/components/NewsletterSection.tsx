import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import newsletterBgImg from '../assets/images/newsletter_crisp_bg_1789412329503.jpg';

interface NewsletterSectionProps {
  onViewAllArticles?: () => void;
}

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({ onViewAllArticles }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setIsSubmitted(true);
  };

  const handleScrollToBlog = () => {
    if (onViewAllArticles) {
      onViewAllArticles();
    } else {
      const blogElement = document.getElementById('blog');
      if (blogElement) {
        blogElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section 
      id="newsletter" 
      className="relative overflow-hidden py-8 sm:py-10 lg:py-12 min-h-[140px] sm:min-h-[160px] lg:min-h-[175px] flex items-center border-t border-b border-stone-800/60"
    >
      {/* Crisp panoramic atmospheric background matching the screenshot */}
      <div className="absolute inset-0 z-0">
        <img
          src={newsletterBgImg}
          alt="Workspace atmosphere background"
          className="w-full h-full object-cover object-center"
        />
        {/* Clear soft gradient to preserve crisp details of greenery and cognac leather armchair */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/40" />
      </div>

      <div className="max-w-[1560px] w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
          
          {/* Left Side: Optional View All link, Circular Icon, and Heading matching reference */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 lg:gap-7 w-full lg:w-auto">
            
            {/* View All Articles link (visible on desktop to match the layout) */}
            <button
              onClick={handleScrollToBlog}
              className="hidden 2xl:inline-flex items-center gap-1.5 text-xs font-semibold text-[#f0cb9e] hover:text-white transition-colors cursor-pointer mr-2 shrink-0 group drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>

            {/* Circular Golden Ring Envelope Badge */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-[#dcb07a] bg-black/50 backdrop-blur-sm flex items-center justify-center shrink-0 shadow-2xl ring-4 ring-[#dcb07a]/20">
              <Mail className="w-6 h-6 sm:w-7 sm:h-7 text-[#f5cca0]" />
            </div>

            {/* Typography */}
            <div className="max-w-2xl">
              <h3 className="text-xl sm:text-2xl lg:text-[28px] font-semibold text-white tracking-tight leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                Get Exclusive Offers &amp; Workspace Inspiration
              </h3>
              <p className="text-xs sm:text-sm text-stone-200 mt-1.5 leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]">
                Join our newsletter and be the first to know about new products, special deals and design tips.
              </p>
            </div>
          </div>

          {/* Right Side: Translucent Frosted Glass Subscription Pill */}
          <div className="w-full lg:w-auto lg:min-w-[420px] xl:min-w-[460px]">
            {isSubmitted ? (
              <div className="bg-white/20 backdrop-blur-md border border-[#dcb07a]/40 rounded-xl sm:rounded-2xl p-4 text-white flex items-center gap-3 shadow-xl">
                <CheckCircle2 className="w-5 h-5 text-[#dcb07a] shrink-0" />
                <div className="text-xs sm:text-sm">
                  <span className="font-semibold text-white block">Welcome to MarkWell!</span>
                  <span className="text-stone-300">Your 10% welcome voucher has been sent to your email.</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative">
                <div className="bg-white/20 hover:bg-white/25 backdrop-blur-md border border-white/25 focus-within:border-[#dcb07a] focus-within:ring-2 focus-within:ring-[#dcb07a]/30 rounded-xl sm:rounded-2xl p-1.5 flex items-center shadow-2xl transition-all duration-200">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full bg-transparent px-3.5 sm:px-4 py-2 text-xs sm:text-sm text-white placeholder:text-stone-300/80 outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-[#dcb07a] hover:bg-[#e6bd8b] text-stone-950 font-semibold text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl flex items-center gap-1.5 transition-all duration-200 shadow-md cursor-pointer shrink-0 whitespace-nowrap active:scale-[0.98]"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="flex items-center justify-between text-[11px] text-stone-400 mt-2 px-1">
                  <span>Zero spam. Unsubscribe anytime.</span>
                  <span className="text-[#dcb07a]/90 font-medium">10% off your first order</span>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
