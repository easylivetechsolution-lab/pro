import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Sparkles,
  Check,
  CreditCard,
  Lock,
  Smartphone,
  CheckCircle2,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { CustomerLogos } from './CustomerLogos';

interface HeroProps {
  onGetStarted?: () => void;
  onGoogleSignIn?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted, onGoogleSignIn }) => {
  // Live ticker for Global GDP running on Trilink
  const [tickerValue, setTickerValue] = useState('8.118604');
  const [emailInput, setEmailInput] = useState('');
  const [heroPaymentPaid, setHeroPaymentPaid] = useState(false);
  const [selectedPayTab, setSelectedPayTab] = useState<'card' | 'link' | 'apple'>('card');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerValue((prev) => {
        const num = parseFloat(prev);
        const increment = (Math.random() * 0.00000008);
        return (num + increment).toFixed(8);
      });
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  // Trilink Signature Dynamic Fluid Waves Animation on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 750);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    let step = 0;
    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      step += 0.006;
      ctx.clearRect(0, 0, width, height);

      // Create diagonal multi-layered wave ribbons for dynamic mesh
      const layers = [
        {
          color1: 'rgba(0, 229, 153, 0.45)', // Emerald
          color2: 'rgba(0, 210, 255, 0.35)', // Cyan
          color3: 'rgba(0, 114, 255, 0.1)',  // Azure
          speed: 1.0,
          frequency: 0.0018,
          amplitude: 140,
          yOffset: height * 0.35,
          slant: 0.28,
        },
        {
          color1: 'rgba(0, 210, 255, 0.4)',
          color2: 'rgba(5, 150, 105, 0.3)',
          color3: 'rgba(16, 185, 129, 0.1)',
          speed: 1.3,
          frequency: 0.0022,
          amplitude: 110,
          yOffset: height * 0.45,
          slant: 0.32,
        },
        {
          color1: 'rgba(0, 114, 255, 0.35)',
          color2: 'rgba(0, 229, 153, 0.3)',
          color3: 'rgba(2, 132, 199, 0.08)',
          speed: 0.8,
          frequency: 0.0015,
          amplitude: 160,
          yOffset: height * 0.55,
          slant: 0.25,
        },
        {
          color1: 'rgba(110, 231, 183, 0.5)',
          color2: 'rgba(56, 189, 248, 0.3)',
          color3: 'rgba(255, 255, 255, 0.05)',
          speed: 1.5,
          frequency: 0.0026,
          amplitude: 90,
          yOffset: height * 0.65,
          slant: 0.35,
        },
      ];

      layers.forEach((layer, i) => {
        ctx.save();
        ctx.beginPath();

        const grad = ctx.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0, layer.color1);
        grad.addColorStop(0.5, layer.color2);
        grad.addColorStop(1, layer.color3);

        ctx.fillStyle = grad;
        ctx.moveTo(0, height);

        for (let x = 0; x <= width; x += 15) {
          const mouseDist = Math.hypot(x - mouseX, layer.yOffset - mouseY);
          const mouseWarp = Math.max(0, 60 - mouseDist * 0.15) * Math.sin(step * 3 + i);
          const y =
            layer.yOffset +
            (x - width * 0.5) * layer.slant +
            Math.sin(x * layer.frequency + step * layer.speed + i) * layer.amplitude +
            Math.cos(x * layer.frequency * 1.5 - step * 0.8) * 35 +
            mouseWarp;

          if (x === 0) {
            ctx.lineTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-white">
      {/* Background Animated Gradient Waves & Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-32 -left-40 w-[600px] h-[600px] bg-emerald-200/40 rounded-full blur-3xl" />
        <div className="absolute top-10 right-0 w-[700px] h-[700px] bg-cyan-200/35 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-3xl" />

        {/* Dynamic Canvas Waves */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover opacity-75 mix-blend-multiply"
        />

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* ========================================================================= */}
          {/* LEFT COLUMN: HERO HEADLINE, TICKER & SIGNUP INPUT                         */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7">
            {/* Live GDP Ticker */}
            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-600 mb-6">
              <span>Trilink’s share of Global GDP:</span>
              <span className="font-mono font-bold text-slate-900 tabular-nums">
                {tickerValue}%
              </span>
            </div>

            {/* Main Hero Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-950 leading-[1.08] mb-6">
              Financial infrastructure to grow your revenue.
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed mb-10 max-w-xl">
              Join millions of companies of all sizes—from startups to Fortune 500s—who use Trilink to accept payments, send payouts, and manage their businesses online.
            </p>

            {/* Quick Email Signup + Start now button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-lg mb-4 mt-6">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your work email"
                  className="w-full px-4 py-3.5 rounded-full bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm sm:text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00E599] focus:border-transparent"
                />
              </div>

              <button
                type="button"
                onClick={onGetStarted}
                className="group inline-flex items-center justify-center px-6 py-3.5 text-sm sm:text-base font-bold text-slate-950 bg-[#00E599] hover:bg-[#00D48D] transition-all rounded-full shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] shrink-0"
              >
                <span>Start now</span>
                <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Google sign up & secondary links */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm sm:text-base font-medium text-slate-700 mb-2">
              <button
                type="button"
                onClick={onGoogleSignIn}
                className="inline-flex items-center space-x-2 text-slate-700 hover:text-slate-950 transition-colors group cursor-pointer"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z" />
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24Z" />
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15Z" />
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z" />
                </svg>
                <span className="font-semibold text-slate-700 group-hover:text-slate-950">Sign up with Google</span>
              </button>

              <span className="text-slate-300">·</span>

              <a
                href="#modular-solutions"
                className="text-slate-700 hover:text-slate-950 hover:underline flex items-center font-medium text-sm sm:text-base group"
              >
                <span>Contact sales</span>
                <ArrowRight className="w-4 h-4 ml-1 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-0.5 transition-all" />
              </a>
            </div>
          </div>

          {/* ========================================================================= */}
                    {/* RIGHT COLUMN: TRILINK TILTED PAYMENT CHECKOUT & CARD MOCKUP */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 relative">
            {/* Ambient background glow */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-500/20 via-cyan-400/20 to-blue-500/20 rounded-3xl blur-2xl -z-10" />

            {/* Main Interactive Checkout Preview Window */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl p-6 relative overflow-hidden backdrop-blur-sm ring-1 ring-black/5">
              {/* Checkout Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-xl bg-slate-950 text-[#00E599] font-mono font-bold text-xs flex items-center justify-center">
                    TL
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Rocketer Coffee & Beans</div>
                    <div className="text-[10px] text-slate-500">Secured with 256-bit encryption</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono font-extrabold text-slate-950">$54.00</div>
                  <div className="text-[10px] text-emerald-600 font-semibold">Free shipping</div>
                </div>
              </div>

              {/* Express Checkout Pills */}
              <div className="mt-4 space-y-2">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Express Checkout
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedPayTab('link')}
                    className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
                      selectedPayTab === 'link'
                        ? 'bg-[#00E599] text-slate-950 ring-2 ring-emerald-400'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    }`}
                  >
                    <span>Trilink Link 1-Click</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPayTab('apple')}
                    className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
                      selectedPayTab === 'apple'
                        ? 'bg-slate-800 text-white ring-2 ring-slate-400'
                        : 'bg-black hover:bg-slate-900 text-white'
                    }`}
                  >
                    <span>Apple Pay</span>
                  </button>
                </div>
              </div>

              {/* Card Form */}
              <div className="mt-4 space-y-3 text-xs">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Or pay with card
                </div>

                <div className="space-y-2">
                  <div className="relative">
                    <input
                      type="text"
                      readOnly
                      value="4242 •••• •••• 4242"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono text-xs text-slate-800 focus:outline-none"
                    />
                    <div className="absolute right-3 top-2.5 flex items-center space-x-1">
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1 rounded">VISA</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      readOnly
                      value="12 / 28"
                      className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-mono text-xs text-slate-800 focus:outline-none"
                    />
                    <input
                      type="text"
                      readOnly
                      value="•••"
                      className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-mono text-xs text-slate-800 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setHeroPaymentPaid(true);
                    setTimeout(() => setHeroPaymentPaid(false), 2500);
                  }}
                  className={`w-full py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center space-x-2 ${
                    heroPaymentPaid
                      ? 'bg-emerald-500 text-white shadow-md'
                      : 'bg-[#0a2540] hover:bg-[#06182a] text-white shadow-md'
                  }`}
                >
                  {heroPaymentPaid ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-[#00E599]" />
                      <span>Payment Approved in 180ms</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5 text-[#00E599]" />
                      <span>Pay $54.00</span>
                    </>
                  )}
                </button>
              </div>

              {/* Floating Issuing Card Overlay */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <div className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#00A86B]" />
                  <span>Trilink Radar Fraud Protection</span>
                </div>
                <span className="font-mono text-emerald-600 font-bold">0.00% Fraud Risk</span>
              </div>
            </div>

            {/* Floating Card Badge 1: Tap to Pay Notification */}
            <div className="hidden sm:flex absolute -bottom-5 -left-6 bg-slate-950 text-white rounded-2xl p-3 shadow-2xl border border-slate-800 items-center space-x-3 text-xs animate-in fade-in slide-in-from-left-4 duration-300">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-[#00E599] flex items-center justify-center shrink-0">
                <Smartphone className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold flex items-center">
                  <span>Tap to Pay approved</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">$14.20 · Contactless terminal</div>
              </div>
            </div>

            {/* Floating Card Badge 2: Instant Payout */}
            <div className="hidden sm:flex absolute -top-5 -right-6 bg-white rounded-2xl p-3 shadow-xl border border-slate-200/80 items-center space-x-2.5 text-xs text-slate-900 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <div className="font-bold text-[11px]">Instant Payout sent</div>
                <div className="text-[10px] font-mono text-slate-500">+$8,450.00 to JPMorgan Chase</div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Logo Carousel */}
        <div className="mt-20 pt-10 border-t border-slate-200/60">
          <CustomerLogos />
        </div>
      </div>
    </section>
  );
};

