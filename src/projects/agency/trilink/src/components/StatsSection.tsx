import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Sunrise, Sunset as SunsetIcon, Clock, Sparkles } from 'lucide-react';

type TimeOfDay = 'predawn' | 'sunrise' | 'daytime' | 'dusk' | 'sunset' | 'night';

export const StatsSection: React.FC = () => {
  const [activeStatIndex, setActiveStatIndex] = useState(0);
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('sunset');
  const [timeMenuOpen, setTimeMenuOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const stats = [
    {
      value: '135+',
      description: 'currencies and payment methods supported',
      detail: 'From credit cards and digital wallets to instant bank transfers, stablecoins, and regional QR codes.',
    },
    {
      value: '$1.9T',
      description: 'in payments volume processed in 2025',
      detail: 'Processing transactions seamlessly for ambitious startups to 50% of the Fortune 100.',
    },
    {
      value: '99.999%',
      description: 'historical uptime for Trilink services',
      detail: 'Engineered for relentless fault-tolerance across multi-region active-active cloud clusters.',
    },
    {
      value: '200M+',
      description: 'active subscriptions managed on Trilink Billing',
      detail: 'Automating recurring revenue, metered usage, self-serve portals, and revenue recovery at scale.',
    },
  ];

  const timeThemes: Record<
    TimeOfDay,
    { label: string; bgClass: string; icon: React.ReactNode; glowColor: string }
  > = {
    predawn: {
      label: 'Pre-dawn',
      bgClass: 'from-[#030914] via-[#0A1832] to-[#12284C]',
      icon: <Moon className="w-4 h-4" />,
      glowColor: '#38BDF8',
    },
    sunrise: {
      label: 'Sunrise',
      bgClass: 'from-[#0B1A2F] via-[#1E3A5F] to-[#D97706]/30',
      icon: <Sunrise className="w-4 h-4" />,
      glowColor: '#F59E0B',
    },
    daytime: {
      label: 'Daytime',
      bgClass: 'from-[#0B2A3D] via-[#0D4D5A] to-[#059669]/40',
      icon: <Sun className="w-4 h-4" />,
      glowColor: '#10B981',
    },
    dusk: {
      label: 'Dusk',
      bgClass: 'from-[#111827] via-[#2E1065] to-[#701A75]/40',
      icon: <SunsetIcon className="w-4 h-4" />,
      glowColor: '#C026D3',
    },
    sunset: {
      label: 'Sunset',
      bgClass: 'from-[#051124] via-[#082830] to-[#0E4839]',
      icon: <SunsetIcon className="w-4 h-4" />,
      glowColor: '#00E599',
    },
    night: {
      label: 'Night',
      bgClass: 'from-[#020617] via-[#0B1120] to-[#041E26]',
      icon: <Moon className="w-4 h-4" />,
      glowColor: '#00D2FF',
    },
  };

  // Canvas particle starfield & global traffic arcs
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes representing transactions
    interface Particle {
      x: number;
      y: number;
      radius: number;
      speed: number;
      opacity: number;
      pulse: number;
    }

    const particles: Particle[] = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 1,
      speed: Math.random() * 0.4 + 0.2,
      opacity: Math.random() * 0.7 + 0.3,
      pulse: Math.random() * Math.PI * 2,
    }));

    let frame = 0;
    const render = () => {
      frame += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Draw particle nodes
      particles.forEach((p, i) => {
        p.pulse += 0.03;
        const currentRadius = p.radius + Math.sin(p.pulse) * 0.8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, currentRadius), 0, Math.PI * 2);
        ctx.fillStyle = timeThemes[timeOfDay].glowColor;
        ctx.globalAlpha = p.opacity * (0.6 + Math.sin(p.pulse) * 0.3);
        ctx.fill();

        // Connect nearby nodes with transaction arcs
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            // subtle curved arc
            const midX = (p.x + p2.x) / 2;
            const midY = (p.y + p2.y) / 2 - 15 * Math.sin(frame + i);
            ctx.quadraticCurveTo(midX, midY, p2.x, p2.y);
            ctx.strokeStyle = timeThemes[timeOfDay].glowColor;
            ctx.globalAlpha = (1 - dist / 120) * 0.25;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });
      ctx.globalAlpha = 1;

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [timeOfDay]);

  return (
    <section className="py-24 relative overflow-hidden bg-slate-950 text-white transition-all duration-700">
      {/* Dynamic Background Atmosphere according to Time of Day */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${timeThemes[timeOfDay].bgClass} opacity-90 transition-all duration-1000`}
      />

      {/* Canvas Traffic Mesh */}
      <div className="absolute inset-0 pointer-events-none opacity-80" aria-hidden="true">
        <canvas ref={canvasRef} className="w-full h-full object-cover" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title with Time of Day Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Reliability at Planetary Scale</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              The backbone of global commerce.
            </h2>
          </div>

          {/* Time of Day Control Trigger */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setTimeMenuOpen(!timeMenuOpen)}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-xs font-semibold text-slate-200 backdrop-blur-md transition-all shadow-sm"
              aria-expanded={timeMenuOpen}
            >
              <span className="text-emerald-400">{timeThemes[timeOfDay].icon}</span>
              <span>Time: {timeThemes[timeOfDay].label}</span>
              <Clock className="w-3.5 h-3.5 opacity-60 ml-1" />
            </button>

            {/* Time of Day Dropdown */}
            {timeMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-44 bg-slate-900 border border-slate-700 rounded-2xl p-1.5 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                {(Object.keys(timeThemes) as TimeOfDay[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => {
                      setTimeOfDay(key);
                      setTimeMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                      timeOfDay === key
                        ? 'bg-[#00E599] text-slate-950 font-bold'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>{timeThemes[key].icon}</span>
                    <span>{timeThemes[key].label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 4 Hero Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const isActive = activeStatIndex === idx;
            return (
              <div
                key={idx}
                onMouseEnter={() => setActiveStatIndex(idx)}
                onClick={() => setActiveStatIndex(idx)}
                className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 cursor-pointer backdrop-blur-sm relative overflow-hidden ${
                  isActive
                    ? 'bg-white/10 border-emerald-400/80 shadow-xl scale-[1.02]'
                    : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20'
                }`}
              >
                {/* Glow accent */}
                {isActive && (
                  <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#00E599]/20 rounded-full blur-2xl pointer-events-none" />
                )}

                <div className="text-4xl sm:text-5xl font-mono font-black tracking-tight text-white mb-3">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base font-semibold text-slate-200 leading-snug mb-2">
                  {stat.description}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {stat.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
