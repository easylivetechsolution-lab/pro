import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { FAQS_DATA } from '../data/dentalData';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<string>('All');

  const categories = ['All', 'Cosmetic', 'Insurance', 'General', 'Appointments'];

  const filteredFaqs = FAQS_DATA.filter((faq) => {
    if (activeTab === 'All') return true;
    return faq.category === activeTab;
  });

  const toggleFaq = (index: number) => {
    setOpenIdx(openIdx === index ? null : index);
  };

  return (
    <section id="faqs" className="py-20 lg:py-28 bg-[#FAF9F6] border-b border-zinc-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#5B7980] mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#0E282E] tracking-tight">
            Have Questions? We're Here to Help.
          </h2>
          <p className="mt-3 text-sm text-zinc-600">
            Find immediate answers regarding treatments, insurance coverage, technology, and what to anticipate during your visits.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveTab(cat);
                  setOpenIdx(0);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  activeTab === cat
                    ? 'bg-[#0E282E] text-white shadow-xs'
                    : 'bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIdx === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-zinc-200/80 shadow-2xs overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-hidden cursor-pointer"
                >
                  <span className="font-serif text-base sm:text-lg font-semibold text-[#0E282E]">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-[#FAF9F6] border border-zinc-200 flex items-center justify-center text-[#0E282E] flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#0E282E] text-white' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-zinc-600 leading-relaxed border-t border-zinc-100 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                    <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-[#0E282E]">
                      <span>Still have a question? Contact concierge &rarr;</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
