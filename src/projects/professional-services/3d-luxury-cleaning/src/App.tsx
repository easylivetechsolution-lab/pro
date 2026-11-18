import { useCallback, useEffect, useRef, useState } from 'react';
import { AiConciergeDrawer } from './components/AiConciergeDrawer';
import { BeforeAfterSection } from './components/BeforeAfterSection';
import { BookingQuoteSection } from './components/BookingQuoteSection';
import {
  ComprehensiveSolutionsSection,
  type SolutionPreset,
} from './components/ComprehensiveSolutionsSection';
import { CrmDashboard, type CrmSection } from './components/CrmDashboard';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { ProcessTimeline } from './components/ProcessTimeline';
import { Stage05ImpactSection } from './components/Stage05ImpactSection';
import { StoryWorldCanvas } from './components/StoryWorldCanvas';
import type { CrmSnapshot, QuoteInput } from './types/cleaning';

export default function App() {
  const [activeView, setActiveView] = useState<'landing' | 'crm'>('landing');
  const [crmInitialSection, setCrmInitialSection] = useState<CrmSection>('overview');
  const [conciergeOpen, setConciergeOpen] = useState(false);
  const [conciergePrefill, setConciergePrefill] = useState<string | undefined>(undefined);
  const storyProgressRef = useRef(0);
  const trackedPageViewRef = useRef(false);

  const initialRefCode =
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search).get('ref')?.trim().toUpperCase() || ''
      : '';

  const [quoteConfig, setQuoteConfig] = useState<QuoteInput>({
    serviceType: 'home',
    sqft: 1800,
    rooms: 6,
    frequency: 'bi-weekly',
    addOns: [],
    referralCode: initialRefCode,
  });

  const [crmSnapshot, setCrmSnapshot] = useState<CrmSnapshot | null>(null);
  const [crmLoading, setCrmLoading] = useState(false);
  const [crmError, setCrmError] = useState<string | null>(null);
  const [liveConnected, setLiveConnected] = useState(false);

  const fetchCrm = useCallback(async () => {
    setCrmLoading(true);
    setCrmError(null);
    try {
      const res = await fetch('/api/crm');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load CRM');
      setCrmSnapshot(data as CrmSnapshot);
    } catch (err) {
      setCrmError(err instanceof Error ? err.message : 'Unable to fetch CRM');
    } finally {
      setCrmLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCrm();

    if (!trackedPageViewRef.current) {
      trackedPageViewRef.current = true;
      fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'pageview',
          source: initialRefCode ? 'Referral' : 'Organic Search',
        }),
      }).catch(() => {});
    }

    if (typeof EventSource === 'undefined') return;
    const source = new EventSource('/api/crm/stream');
    source.onopen = () => setLiveConnected(true);
    source.onmessage = (event) => {
      try {
        const next = JSON.parse(event.data) as CrmSnapshot;
        setCrmSnapshot(next);
        setLiveConnected(true);
      } catch {
        // ignore malformed frame
      }
    };
    source.onerror = () => {
      setLiveConnected(false);
    };

    return () => {
      source.close();
    };
  }, [fetchCrm, initialRefCode]);

  const scrollToElement = (id: string) => {
    setTimeout(() => {
      const target = document.getElementById(id);
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 40);
  };

  const handleNavigateView = (view: 'landing' | 'crm', sectionId?: string) => {
    setActiveView(view);
    if (view === 'landing' && sectionId) {
      scrollToElement(sectionId);
    } else if (view === 'crm') {
      fetchCrm();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenCrm = (section: CrmSection = 'overview') => {
    setCrmInitialSection(section);
    handleNavigateView('crm');
  };

  const handleOpenConcierge = (prefill?: string) => {
    setConciergePrefill(prefill);
    setConciergeOpen(true);
  };

  const handleStartQuote = () => {
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: 'quote_interaction', source: 'Quote Form' }),
    }).catch(() => {});
    handleNavigateView('landing', 'quote');
  };

  const handleSelectSolution = (preset: SolutionPreset) => {
    const nextSqft = preset.sqft ?? quoteConfig.sqft;
    const nextAddOns = preset.addOns ?? quoteConfig.addOns;
    setQuoteConfig((prev) => ({
      ...prev,
      serviceType: preset.serviceType,
      sqft: nextSqft,
      addOns: nextAddOns,
    }));
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: 'quote_interaction', source: 'Pricing Tier' }),
    }).catch(() => {});
    handleNavigateView('landing', 'quote');
  };

  const handleUpdateQuote = (patch: Partial<QuoteInput>) => {
    setQuoteConfig((prev) => ({ ...prev, ...patch }));
  };

  if (activeView === 'crm') {
    return (
      <div className="min-h-screen bg-[#F4F8FD] text-slate-900">
        <CrmDashboard
          snapshot={crmSnapshot}
          loading={crmLoading}
          liveConnected={liveConnected}
          error={crmError}
          initialSection={crmInitialSection}
          onRefresh={fetchCrm}
          onBackToSite={() => handleNavigateView('landing', 'top')}
        />
      </div>
    );
  }

  return (
    <div id="story-scroll-root" className="relative min-h-screen flex flex-col bg-transparent text-slate-900">
      {/* Three.js + React Three Fiber + GSAP ScrollTrigger 3D Architectural Environment */}
      <StoryWorldCanvas
        activeView={activeView}
        scrollProgressRef={storyProgressRef}
      />

      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar
          activeView={activeView}
          onNavigateView={handleNavigateView}
          onOpenQuote={handleStartQuote}
        />

        <main className="flex-1">
          <HeroSection
            onStartQuote={handleStartQuote}
            onOpenConcierge={handleOpenConcierge}
          />

          <ComprehensiveSolutionsSection onSelectSolution={handleSelectSolution} />

          <ProcessTimeline />

          <BookingQuoteSection
            quoteConfig={quoteConfig}
            onUpdateQuote={handleUpdateQuote}
            onOpenConcierge={handleOpenConcierge}
            onOpenCrm={() => handleOpenCrm('overview')}
            onDataMutated={fetchCrm}
          />

          <Stage05ImpactSection />

          <BeforeAfterSection
            onBookWorkspaceClean={() =>
              handleSelectSolution({
                serviceType: 'office',
                sqft: 3200,
                addOns: ['interior-windows', 'steam-sanitize'],
              })
            }
          />
        </main>

        <footer className="relative border-t border-sky-100/80 bg-white/90 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
            <div className="flex items-center gap-3">
              <span className="font-display text-base font-bold text-slate-900">
                AetherClean
              </span>
              <span aria-hidden="true">·</span>
              <span>San Francisco Bay Area Residential &amp; Commercial Sanitization</span>
            </div>
            <div className="flex flex-wrap items-center gap-5">
              <a
                href="#solutions"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigateView('landing', 'solutions');
                }}
                className="hover:text-sky-700 transition-colors"
              >
                Services
              </a>
              <a
                href="#quote"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigateView('landing', 'quote');
                }}
                className="hover:text-sky-700 transition-colors"
              >
                Instant Quote
              </a>
              <a
                href="#impact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigateView('landing', 'impact');
                }}
                className="hover:text-sky-700 transition-colors"
              >
                Impact &amp; Trust
              </a>
              <a
                href="#before-after"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigateView('landing', 'before-after');
                }}
                className="hover:text-sky-700 transition-colors"
              >
                Before &amp; After
              </a>
              <button
                type="button"
                onClick={() => handleOpenCrm('overview')}
                className="text-slate-500 hover:text-sky-700 transition-colors cursor-pointer"
              >
                Owner CRM
              </button>
            </div>
          </div>
        </footer>
      </div>

      <AiConciergeDrawer
        open={conciergeOpen}
        prefillMessage={conciergePrefill}
        onOpen={() => setConciergeOpen(true)}
        onClose={() => setConciergeOpen(false)}
        onApplyQuote={(patch) => {
          setQuoteConfig((prev) => ({ ...prev, ...patch }));
        }}
        onDataMutated={fetchCrm}
      />
    </div>
  );
}
