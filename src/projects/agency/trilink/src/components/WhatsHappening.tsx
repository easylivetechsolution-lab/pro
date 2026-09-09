import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, ExternalLink } from 'lucide-react';

interface EventItem {
  id: string;
  title: string;
  description: string;
  ctaText: string;
  image: string;
  badge?: string;
  link: string;
}

export const WhatsHappening: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const items: EventItem[] = [
    {
      id: 'annual-letter',
      title: 'Businesses on Trilink generated $1.9T in 2025.',
      description:
        'Our annual letter explores the trends defining the internet economy—including steeper growth for newer businesses, faster international expansion, stablecoin progress, agentic commerce, and more.',
      ctaText: 'Read the letter',
      image: 'https://images.stripeassets.com/fzn2n1nzq965/yqIFyZRGU5zDwdUsWtUyM/25b9f23c748c4d54079a09016fde59d8/annual-letter-mobile.png?w=672&q=90',
      badge: 'Annual Update',
      link: '#annual-letter',
    },
    {
      id: 'bfcm',
      title: '150K+ users have their best day ever on Trilink.',
      description:
        'From Black Friday through Cyber Monday 2025, Trilink processed more than $40B for businesses while maintaining a 99.9999% uptime.',
      ctaText: 'See the numbers',
      image: 'https://images.stripeassets.com/fzn2n1nzq965/6yE6G454SGCJnJgEYsS2MB/70b405a1dce904bc0c6f2698223fb966/the-happenings-bfcm-mobile.png?w=672&q=90',
      badge: 'Performance',
      link: '#bfcm',
    },
    {
      id: 'tidemark',
      title: 'Tidemark’s vertical and SMB SaaS benchmark report.',
      description:
        'Learn what’s driving growth in vertical SaaS in 2025—going multiproduct, embedding fintech, and integrating AI into the core of their products.',
      ctaText: 'Get the data',
      image: 'https://images.stripeassets.com/fzn2n1nzq965/33xcv8eCmXzMzWXicVQ4cF/83d91fa419ff8d1b9466739b4ecdcb1d/the-happenings-tidemark-mobile.png?w=672&q=90',
      badge: 'Research Report',
      link: '#tidemark',
    },
    {
      id: 'shopify-interview',
      title: 'Shopify leadership sits down with Trilink founders.',
      description:
        'Hear them discuss the choices that shaped modern online commerce, the future of multi-channel checkout, and advice for founders.',
      ctaText: 'Watch conversation',
      image: 'https://images.stripeassets.com/fzn2n1nzq965/t03tXrgvnHUPGwxYUgSxN/bd8da003434c9e9fb72c719b9edb429b/the-happenings-cheeky-pint-mobile.png?w=672&q=90',
      badge: 'Video Podcast',
      link: '#video',
    },
    {
      id: 'app-stores',
      title: 'New tools to process payments outside app stores.',
      description:
        'New global regulations mean new monetization opportunities. Learn how Trilink helps you process direct web checkouts outside mobile app stores.',
      ctaText: 'Learn how',
      image: 'https://images.stripeassets.com/fzn2n1nzq965/Pd2JQ7FZ1pYMIMGDwvMdV/13e7e021ca23d042da8ac07be829f7ef/the-happenings-payment-processing-mobile.png?w=672&q=90',
      badge: 'Regulatory Guide',
      link: '#app-stores',
    },
    {
      id: 'crypto-partnership',
      title: 'Global crypto networks partner with Trilink for instant rails.',
      description:
        'Learn how stablecoin checkout taps into a new global customer base by allowing buyers to settle with digital dollars directly at checkout.',
      ctaText: 'View announcement',
      image: 'https://images.stripeassets.com/fzn2n1nzq965/4LaZVLqDqGf9091wqUAmFp/fbe9fc307e1336b69bcd9be4ec5c4752/the-happenings-crypto-mobile.png?w=672&q=90',
      badge: 'Partnership',
      link: '#crypto',
    },
    {
      id: 'agentic-ai',
      title: 'Make your products shoppable through AI platforms.',
      description:
        'Discover how the Agentic Commerce Protocol (ACP) empowers online stores to accept purchases from autonomous agents without redesigning stacks.',
      ctaText: 'Read documentation',
      image: 'https://images.stripeassets.com/fzn2n1nzq965/1k7ckFceNFlxqF47hWJUlM/eaa4d8b3f8e4b76ba3dd7df7da88e099/the-happenings-agentic-mobile.png?w=672&q=90',
      badge: 'Agentic Commerce',
      link: '#agentic',
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(items.length - 2, prev + 1));
  };

  return (
    <section id="whats-happening" className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Title with Carousel Arrows */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
              What’s happening
            </h2>
            <p className="text-slate-600 text-lg mt-1 font-normal">
              See the latest news, updates, and research from Trilink.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="p-2.5 rounded-full border border-slate-200 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-slate-800 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= items.length - 2}
              className="p-2.5 rounded-full border border-slate-200 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-slate-800 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Window */}
        <div className="overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 50}%)` }}
          >
            {items.map((item) => (
              <div
                key={item.id}
                className="w-full sm:w-[calc(50%-12px)] shrink-0 rounded-3xl border border-slate-200/90 overflow-hidden bg-white shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="h-60 overflow-hidden bg-slate-100 relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {item.badge && (
                      <span className="absolute top-4 left-4 text-[11px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-slate-900 shadow-xs">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <div className="p-6 sm:p-8 space-y-3">
                    <h3 className="text-xl font-bold text-slate-950 group-hover:text-[#00A86B] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 sm:p-8 pt-0">
                  <a
                    href={item.link}
                    className="inline-flex items-center text-sm font-bold text-[#00A86B] group-hover:underline"
                  >
                    <span>{item.ctaText}</span>
                    <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
