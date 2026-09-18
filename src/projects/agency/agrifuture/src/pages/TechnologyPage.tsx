import React, { useState } from 'react';
import {
  ArrowRight,
  Cpu,
  Radio,
  Satellite,
  Waves,
  Zap,
  ShieldCheck,
  Activity,
  Layers,
  Sparkles,
  Gauge,
  Smartphone,
  Eye,
} from 'lucide-react';

interface TechnologyPageProps {
  onInspectBatch: (batchId: string) => void;
  onPartnerClick: () => void;
}

export const TechnologyPage: React.FC<TechnologyPageProps> = ({
  onInspectBatch,
  onPartnerClick,
}) => {
  const [activeTechTab, setActiveTechTab] = useState<'drone' | 'subsurface' | 'satellite' | 'ai'>('drone');

  const techModules = [
    {
      id: 'drone',
      title: 'Autonomous AgriDrone Fleet',
      tag: 'AERIAL SPECTRAL MAPPING',
      icon: '/icons/farm/drone.svg',
      summary: 'Autonomous quadcopters fly automated dawn sorties across each sector, scanning for moisture stress, nitrogen deficits, and early fungal pressure.',
      specs: [
        { label: 'Camera Sensor', val: 'Multispectral 5-Band + Thermal FLIR' },
        { label: 'Spatial Resolution', val: '1.2 cm / pixel ground sample' },
        { label: 'Daily Coverage', val: '1,800 Hectares per Squadron' },
        { label: 'Autonomous Fleet', val: 'Solar Self-Docking Recharging Pods' },
      ],
      image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'subsurface',
      title: 'Subsurface Precision Drip & Micro-Fertigation',
      tag: 'ROOT-ZONE EFFICIENCY',
      icon: '/icons/farm/irrigation.svg',
      summary: 'Buried 25cm to 40cm below ground, our drip lines deliver water, mycorrhizal tea, and organic minerals directly to active root capillaries with zero evaporative loss.',
      specs: [
        { label: 'Water Savings', val: '38.4% compared to overhead sprinklers' },
        { label: 'Soil Sensors', val: 'Capacitive moisture at 15cm, 30cm, 60cm' },
        { label: 'Nutrient Injection', val: 'Dynamic electrochemical PID dosing' },
        { label: 'Runoff Reduction', val: 'Zero surface evaporation & zero chemical leaching' },
      ],
      image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'satellite',
      title: 'Sentinel Radar & Geospatial AI',
      tag: 'SYNTHETIC APERTURE RADAR',
      icon: '/icons/farm/weather.svg',
      summary: 'Weekly optical and radar satellite passes compute NDVI, NDRE, and canopy surface roughness across all 18,400 hectares regardless of cloud cover.',
      specs: [
        { label: 'Constellation', val: 'Sentinel-2 & High-Res PlanetScope' },
        { label: 'Vigor Indices', val: 'NDVI (Chlorophyll), NDRE, EVI, NDWI (Water)' },
        { label: 'Forecast Engine', val: 'Machine Learning Yield Model (98.4% Acc.)' },
        { label: 'Historical Baseline', val: '15-Year Climate & Terroir Correlation' },
      ],
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'ai',
      title: 'AgriOS AI Agronomy Engine',
      tag: 'REAL-TIME ORCHESTRATION',
      icon: '/icons/farm/crop-health.svg',
      summary: 'Ingests millions of telemetry data points per hour from soil probes, drone flights, weather stations, and brix sensors to guide harvesting teams.',
      specs: [
        { label: 'Harvest Window Model', val: 'Predicts peak brix window 72hr in advance' },
        { label: 'Pest Anomaly Alert', val: 'Computer vision alerts on micro-foliar changes' },
        { label: 'Cold-Chain Dispatch', val: 'Dynamically routes harvest trucks to coolest routes' },
        { label: 'Blockchain Verification', val: 'Immutable cryptographic batch records' },
      ],
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const selectedModule = techModules.find((m) => m.id === activeTechTab) || techModules[0];

  return (
    <div className="pt-24 pb-20 bg-[#061810] text-white min-h-screen">
      {/* 1. Hero Banner */}
      <section className="relative py-16 sm:py-24 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <span className="text-[#34d399] text-xs sm:text-sm font-semibold tracking-widest uppercase block">
              PRECISION AGRICULTURE OS
            </span>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white font-serif leading-[1.1]">
              Technology Serving Nature, <br />
              <span className="text-[#dfc599]">Never Overriding It.</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed pt-2">
              We leverage satellite radar, autonomous multispectral drone squadrons, in-ground electrochemical telemetry, and AI forecasting to nurture living biology with surgical accuracy.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Interactive Technology Explorer Tabs */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none border-b border-white/10">
          {techModules.map((mod) => (
            <button
              key={mod.id}
              onClick={() => setActiveTechTab(mod.id as any)}
              className={`px-5 py-3 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 flex items-center gap-2.5 whitespace-nowrap cursor-pointer ${
                activeTechTab === mod.id
                  ? 'bg-[#dfc599] text-[#091f13] shadow-lg font-bold scale-105'
                  : 'bg-[#082216] text-gray-300 hover:bg-[#0c2f1f] hover:text-white border border-white/10'
              }`}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <img src={mod.icon} alt={mod.title} className="w-full h-full object-contain" />
              </div>
              <span>{mod.title}</span>
            </button>
          ))}
        </div>

        {/* Active Module Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 sm:p-12 rounded-3xl bg-[#071f14] border border-[#dfc599]/30 shadow-2xl">
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-emerald-400 tracking-wider uppercase">
                {selectedModule.tag}
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-white font-serif">
                {selectedModule.title}
              </h2>
            </div>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              {selectedModule.summary}
            </p>

            {/* Specifications Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
              {selectedModule.specs.map((spec, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-[#05180f] border border-white/10">
                  <div className="text-[11px] font-mono text-[#dfc599] uppercase">{spec.label}</div>
                  <div className="text-sm font-bold text-white mt-1">{spec.val}</div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => onInspectBatch('AF-24157')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#dfc599] hover:bg-[#e8d5b2] text-[#091f13] text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer"
              >
                <span>Inspect Live Batch Telemetry</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-[#dfc599]/30 shadow-2xl group">
              <img
                src={selectedModule.image}
                alt={selectedModule.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-emerald-300 bg-black/60 backdrop-blur-sm p-3 rounded-xl border border-white/10">
                <span>SYSTEM STATUS: OPERATIONAL</span>
                <span className="text-[#dfc599]">PING: 14ms</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The 4-Tier Tech Stack */}
      <section className="py-16 bg-[#04120a] border-t border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-[#34d399] text-xs sm:text-sm font-semibold tracking-widest uppercase block">
              SYSTEM ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif">
              End-to-End Farm Intelligence Pipeline
            </h2>
            <p className="text-gray-300 text-sm">
              From subterranean microbial probes to continental freight routing, our connected ecosystem ensures precision at every layer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#071f14] border border-white/10 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#0a271c] text-[#dfc599] flex items-center justify-center font-mono font-bold text-sm">
                01
              </div>
              <h3 className="text-lg font-bold text-white font-serif">In-Ground Telemetry</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Over 12,000 wireless capacitive probes measure volumetric moisture, pH, EC (electro-conductivity), and temperature at multi-depth intervals.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#071f14] border border-white/10 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#0a271c] text-[#dfc599] flex items-center justify-center font-mono font-bold text-sm">
                02
              </div>
              <h3 className="text-lg font-bold text-white font-serif">Aerial & Satellite</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Autonomous drone swarms conduct dawn multispectral flights while weekly Sentinel-2 radar scans track vegetative vigor across all parcels.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#071f14] border border-white/10 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#0a271c] text-[#dfc599] flex items-center justify-center font-mono font-bold text-sm">
                03
              </div>
              <h3 className="text-lg font-bold text-white font-serif">Agronomy Cloud AI</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Correlates weather forecasts with historical brix curves to trigger precision pulsed drip irrigation and schedule exact harvest windows.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#071f14] border border-white/10 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#0a271c] text-[#dfc599] flex items-center justify-center font-mono font-bold text-sm">
                04
              </div>
              <h3 className="text-lg font-bold text-white font-serif">QR Traceability</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Each harvested pallet receives an encrypted digital passport logging water consumption, harvest hour, temperature telemetry, and lab test results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#092618] via-[#0b3320] to-[#092618] border border-[#dfc599]/40 shadow-2xl space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif">
            Experience the AgriFuture Operating System
          </h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto">
            Are you an agricultural institution, agritech developer, or enterprise procurement director? Request a live tech demonstration.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onPartnerClick}
              className="px-6 py-3 rounded-full bg-[#dfc599] hover:bg-[#e8d5b2] text-[#081e13] font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg cursor-pointer"
            >
              Request Tech Demonstration
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
