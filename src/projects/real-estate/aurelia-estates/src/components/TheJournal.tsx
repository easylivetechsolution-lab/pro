import React from 'react';
import { ArrowRight, Clock, BookOpen } from 'lucide-react';
import type { JournalArticle } from '../types';

interface TheJournalProps {
  articles: JournalArticle[];
  onSelectArticle: (article: JournalArticle) => void;
}

export const TheJournal: React.FC<TheJournalProps> = ({ articles, onSelectArticle }) => {
  return (
    <section id="journal" className="py-24 bg-[#090a0d] border-t border-[#1a1c24] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header matching screenshot */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <span className="w-8 h-[2px] bg-[#c5a880]" />
              <span className="text-[11px] font-semibold tracking-[0.25em] text-[#c5a880] uppercase">
                MARKET INSIGHTS
              </span>
            </div>
            <h2 className="font-serif-luxury text-3xl md:text-5xl text-white font-normal tracking-tight">
              The Journal
            </h2>
            <p className="text-sm md:text-base text-[#9fa6b5] max-w-xl font-light">
              Market trends, destination guides, and expert insights for the modern property buyer.
            </p>
          </div>

          <div>
            <button
              onClick={() => onSelectArticle(articles[0])}
              className="inline-flex items-center space-x-2 text-xs font-semibold tracking-[0.2em] text-[#c7cbd4] hover:text-[#d8b88a] transition-colors group"
            >
              <span>EXPLORE THE JOURNAL</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* 3 Articles Grid matching screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article
              key={article.id}
              id={`journal-card-${article.id}`}
              onClick={() => onSelectArticle(article)}
              className="group cursor-pointer flex flex-col space-y-4"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden bg-[#161820] border border-[#222633] group-hover:border-[#c5a880]/50 transition-colors">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full bg-black/60 backdrop-blur-md text-[#c5a880]">
                  <BookOpen className="w-4 h-4" />
                </div>
              </div>

              {/* Text Meta matching screenshot */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[10.5px] font-semibold tracking-[0.2em] text-[#c5a880] uppercase">
                  <span>{article.category}</span>
                  <span className="text-[#737989] font-normal flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                  </span>
                </div>

                <h3 className="font-serif-luxury text-xl md:text-2xl text-white font-medium leading-snug group-hover:text-[#d8b88a] transition-colors">
                  {article.title}
                </h3>

                <p className="text-xs text-[#8f96a5] font-light line-clamp-2 leading-relaxed">
                  {article.excerpt}
                </p>

                <p className="text-[11px] font-medium tracking-wider text-[#636875] pt-1 uppercase">
                  {article.date}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
