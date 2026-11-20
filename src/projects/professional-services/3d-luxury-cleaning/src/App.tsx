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
import {
  ReferralProgramSection,
  ServiceFAQSection,
  ServiceStandardsSection,
  TransparentPricingSection,
  WhoWeAreSection,
} from './components/GrowthSections';
import { Navbar } from './components/Navbar';
import { ProcessTimeline } from './components/ProcessTimeline';
import { Stage05ImpactSection } from './components/Stage05ImpactSection';
import { SiteFooter } from './components/SiteFooter';
import { StoryWorldCanvas } from './components/StoryWorldCanvas';
import { crmDemoSnapshot } from './lib/crmDemoSnapshot';
import type { CrmSnapshot, QuoteInput } from './types/cleaning';

export default function App() {
  const [activeView, setActiveView] = useState<'landing' | 'crm'>('landing');
  const [heroVideoReady, setHeroVideoReady] = useState(false);
  const [crmInitialSection, setCrmInitialSection] = useState<CrmSection>('overview');
  const [conciergeOpen, setConciergeOpen] = useState(false);
  const [conciergePrefill, setConciergePrefill] = useState<string | undefined>(undefined);
  const storyProgressRef = useRef(0);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const previousStyles = {
      htmlOverflowX: html.style.overflowX,
      bodyOverflowX: body.style.overflowX,
      htmlOverscroll: html.style.overscrollBehavior,
      bodyOverscroll: body.style.overscrollBehavior,
    };

    // Keep mobile rubber-band and sideways overscroll from exposing the fixed story backdrop.
    html.style.overflowX = 'clip';
    body.style.overflowX = 'clip';
    html.style.overscrollBehavior = 'none';
    body.style.overscrollBehavior = 'none';

    return () => {
      html.style.overflowX = previousStyles.htmlOverflowX;
      body.style.overflowX = previousStyles.bodyOverflowX;
      html.style.overscrollBehavior = previousStyles.htmlOverscroll;
      body.style.overscrollBehavior = previousStyles.bodyOverscroll;
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const entryRules = [
      { selector: '#process .col-span-5.sticky', direction: 'left' },
      { selector: '#process .col-span-7.relative', direction: 'left' },
      { selector: '#quote', direction: 'right' },
      { selector: '#before-after', direction: 'right' },
      { selector: '#referrals', direction: 'left' },
      { selector: '#pricing', direction: 'right' },
      { selector: '#who-we-are', direction: 'left' },
      { selector: '#faq', direction: 'right' },
      { selector: '#standards', direction: 'bottom' },
    ] as const;
    const targets = entryRules.flatMap(({ selector, direction }) => {
      const target = document.querySelector<HTMLElement>(selector);
      if (!target) return [];
      target.dataset.scrollEnter = direction;
      return [target];
    });

    if (!targets.length || typeof IntersectionObserver === 'undefined') {
      targets.forEach((target) => delete target.dataset.scrollEnter);
      return;
    }

    const timers = new Set<number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          target.classList.add('scroll-entered');
          observer.unobserve(target);
          const timer = window.setTimeout(() => {
            target.classList.remove('scroll-entered');
            delete target.dataset.scrollEnter;
            timers.delete(timer);
          }, 760);
          timers.add(timer);
        });
      },
      { threshold: 0.01, rootMargin: '0px 0px -6% 0px' },
    );

    targets.forEach((target) => observer.observe(target));
    return () => {
      observer.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
      targets.forEach((target) => {
        target.classList.remove('scroll-entered');
        delete target.dataset.scrollEnter;
      });
    };
  }, [activeView]);

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

  const [crmSnapshot, setCrmSnapshot] = useState<CrmSnapshot>(crmDemoSnapshot);
  const resetCrmDemo = useCallback(() => setCrmSnapshot({ ...crmDemoSnapshot }), []);

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
      setHeroVideoReady(false);
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
    handleNavigateView('landing', 'quote');
  };

  const handleSelectSolution = (preset: SolutionPreset) => {
    const nextSqft = preset.sqft ?? quoteConfig.sqft;
    const nextRooms = preset.rooms ?? quoteConfig.rooms;
    const nextAddOns = preset.addOns ?? quoteConfig.addOns;
    setQuoteConfig((prev) => ({
      ...prev,
      serviceType: preset.serviceType,
      sqft: nextSqft,
      rooms: nextRooms,
      addOns: nextAddOns,
      frequency: preset.frequency ?? prev.frequency,
    }));
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
          loading={false}
          error={null}
          initialSection={crmInitialSection}
          onRefresh={resetCrmDemo}
          onSnapshotChange={setCrmSnapshot}
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
        backgroundReady={heroVideoReady}
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
            onVideoReady={() => setHeroVideoReady(true)}
          />

          <ComprehensiveSolutionsSection onSelectSolution={handleSelectSolution} />

          <ProcessTimeline />

          <BookingQuoteSection
            quoteConfig={quoteConfig}
            onUpdateQuote={handleUpdateQuote}
            onOpenConcierge={handleOpenConcierge}
            onOpenCrm={() => handleOpenCrm('overview')}
            onDataMutated={resetCrmDemo}
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

          <ReferralProgramSection
            onApplyCode={(code) => {
              setQuoteConfig((prev) => ({ ...prev, referralCode: code }));
              handleNavigateView('landing', 'quote');
            }}
          />

          <TransparentPricingSection onSelectPlan={handleSelectSolution} />

          <WhoWeAreSection />

          <ServiceFAQSection onAskConcierge={() => handleOpenConcierge('I have a question about AetherClean services, coverage, or scheduling.')} />

          <ServiceStandardsSection />
        </main>

        <SiteFooter onNavigate={(sectionId) => handleNavigateView('landing', sectionId)} />
      </div>

      <AiConciergeDrawer
        open={conciergeOpen}
        prefillMessage={conciergePrefill}
        onOpen={() => setConciergeOpen(true)}
        onClose={() => setConciergeOpen(false)}
        onApplyQuote={(patch) => {
          setQuoteConfig((prev) => ({ ...prev, ...patch }));
        }}
        onDataMutated={resetCrmDemo}
      />
    </div>
  );
}
