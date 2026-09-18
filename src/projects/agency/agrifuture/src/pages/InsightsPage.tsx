import React, { useState } from 'react';
import {
  Search,
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  Tag,
  Share2,
  Mail,
  CheckCircle2,
} from 'lucide-react';
import { FIELD_STORIES } from '../data';
import { StoryArticle } from '../types';

interface InsightsPageProps {
  onOpenArticle: (article: StoryArticle) => void;
}

export const InsightsPage: React.FC<InsightsPageProps> = ({ onOpenArticle }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [subscribed, setSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  const tags = [
    { id: 'all', label: 'All Insights' },
    { id: 'soil', label: 'Living Soil Science' },
    { id: 'tech', label: 'Autonomous Ag & IoT' },
    { id: 'logistics', label: 'Cold-Chain Logistics' },
    { id: 'market', label: 'Global Harvest Markets' },
  ];

  // Extended articles pool based on FIELD_STORIES
  const additionalArticles: StoryArticle[] = [
    {
      id: 'story-extra-01',
      title: 'Subsurface Mycorrhizae: How Fungi Sequestrate 4.2 Tons of Soil Carbon Per Hectare',
      category: 'soil',
      readTime: '6 min read',
      date: 'Sep 12, 2026',
      imageUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80',
      excerpt: 'A 5-year empirical study across our Green Valley estate showing how living fungal networks dramatically boost drought resilience.',
      content: `Over five consecutive harvest seasons across our Green Valley parcel, we conducted double-blind soil microbiology audits comparing traditional tillage blocks with undisturbed regenerative mycorrhizal blocks.\n\nThe findings were unambiguous: plots inoculated with diverse Glomus fungi sequestered an average of 4.2 tons of active organic carbon per hectare per year. Furthermore, water holding capacity surged by 38%, preserving vegetative turgor even during peak summer heatwaves.`,
    },
    {
      id: 'story-extra-02',
      title: 'Autonomous Drone Sorties: Detecting Foliar Thermal Stress 72 Hours Ahead of Visual Symptoms',
      category: 'tech',
      readTime: '5 min read',
      date: 'Aug 28, 2026',
      imageUrl: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80',
      excerpt: 'How FLIR longwave infrared camera payloads allow our cultivators to remediate micro-irrigation line pressure before plants experience drought damage.',
      content: `By calculating the difference between ambient canopy temperature and leaf stomatal cooling, our autonomous quadcopters detect transpiration failure three days before human scouting can see leaf wilt.\n\nThis early detection closed our fruit loss rate to under 0.2% across our 4,200 hectare Coastal Orchards parcel.`,
    },
    {
      id: 'story-extra-03',
      title: 'The Continental Cold-Chain Corridor: Moving Pristine Berries Across Oceans with IoT Precision',
      category: 'logistics',
      readTime: '7 min read',
      date: 'Aug 14, 2026',
      imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
      excerpt: 'Inside our nitrogen-flushed, real-time temperature monitored air & sea freight containers delivering pristine shelf life in 42 countries.',
      content: `Berries have zero tolerance for thermal cycling. Even a 2-degree fluctuation during transit triggers cellular respiration breakdown and mold sporulation.\n\nOur unbroken cold chain utilizes solar reefer containers equipped with satellite transponders, logging temperature, relative humidity, and ethylene levels every 90 seconds.`,
    },
  ];

  const allArticles = [...FIELD_STORIES, ...additionalArticles];

  const filteredArticles = allArticles.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTag =
      selectedTag === 'all' ||
      art.category.toLowerCase().includes(selectedTag.toLowerCase());

    return matchesSearch && matchesTag;
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
    }
  };

  return (
    <div className="pt-24 pb-20 bg-[#061810] text-white min-h-screen">
      {/* 1. Hero Banner */}
      <section className="relative py-16 sm:py-24 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <span className="text-[#34d399] text-xs sm:text-sm font-semibold tracking-widest uppercase block">
              AGRONOMY INTELLIGENCE JOURNAL
            </span>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white font-serif leading-[1.1]">
              Field Notes, Research & <br />
              <span className="text-[#dfc599]">Agricultural Science.</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed pt-2">
              Explore scientific whitepapers, soil biology breakthroughs, and global cold-chain innovations published directly by our master cultivators and agronomists.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Controls & Search */}
      <section className="py-8 bg-[#04120b] border-b border-white/10 sticky top-16 z-30 backdrop-blur-md bg-[#04120b]/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search articles, research, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full bg-[#082216] border border-white/15 focus:border-[#dfc599] text-sm text-white placeholder-gray-400 focus:outline-none transition-colors"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => setSelectedTag(tag.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    selectedTag === tag.id
                      ? 'bg-[#dfc599] text-[#091f13] shadow-md font-bold'
                      : 'bg-[#082216] text-gray-300 hover:bg-[#0c2f1f] hover:text-white border border-white/10'
                  }`}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Story Showcase */}
      {filteredArticles.length > 0 && (
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            onClick={() => onOpenArticle(filteredArticles[0])}
            className="group rounded-3xl overflow-hidden bg-[#071f14] border border-[#dfc599]/30 hover:border-[#dfc599] transition-all duration-300 cursor-pointer shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-7 aspect-[16/10] overflow-hidden">
              <img
                src={filteredArticles[0].imageUrl}
                alt={filteredArticles[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="lg:col-span-5 p-6 lg:p-8 space-y-4">
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="px-2.5 py-1 rounded bg-[#dfc599] text-[#091f13] font-bold uppercase">
                  FEATURED RESEARCH
                </span>
                <span className="text-emerald-400">{filteredArticles[0].readTime}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif leading-tight group-hover:text-[#dfc599] transition-colors">
                {filteredArticles[0].title}
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                {filteredArticles[0].excerpt}
              </p>
              <div className="pt-2 flex items-center justify-between text-xs text-gray-400 border-t border-white/10">
                <span>By AgriFuture Agronomy Desk</span>
                <span className="text-[#dfc599] font-semibold flex items-center gap-1">
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. Articles Grid */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-xl font-bold text-white font-serif mb-8 flex items-center gap-2">
          <span>Recent Field Dispatches</span>
          <span className="text-xs font-mono text-gray-400">({filteredArticles.length} publications)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.slice(1).map((article) => (
            <div
              key={article.id}
              onClick={() => onOpenArticle(article)}
              className="group rounded-2xl overflow-hidden bg-[#071f14] border border-white/10 hover:border-[#dfc599]/60 transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-black/60 backdrop-blur-md text-emerald-300 border border-white/10 uppercase">
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {article.date}</span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {article.readTime}</span>
                  </div>
                  <h4 className="text-lg font-bold text-white font-serif group-hover:text-[#dfc599] transition-colors leading-snug">
                    {article.title}
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-gray-400 font-medium truncate max-w-[180px]">Research Desk</span>
                  <span className="text-[#dfc599] font-semibold flex items-center gap-1">
                    Read <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Newsletter Subscription Block */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#092518] border border-[#dfc599]/30 text-center space-y-5 shadow-2xl">
          <Mail className="w-10 h-10 text-[#dfc599] mx-auto" />
          <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif">
            Subscribe to the AgriFuture Field Dispatch
          </h3>
          <p className="text-sm text-gray-300 max-w-lg mx-auto">
            Receive monthly soil microbiology whitepapers, seasonal brix reports, and global agricultural logistics forecasts directly to your inbox.
          </p>

          {subscribed ? (
            <div className="p-4 rounded-xl bg-emerald-900/40 border border-emerald-500/40 text-emerald-300 text-sm flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>Thank you! You are now subscribed to our monthly agronomy dispatches.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter professional email address..."
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full px-5 py-3 rounded-full bg-[#05180f] border border-white/20 focus:border-[#dfc599] text-sm text-white placeholder-gray-400 focus:outline-none"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#dfc599] hover:bg-[#e8d5b2] text-[#091f13] text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors shadow-md cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
