import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Rotate3d,
  ZoomIn,
  ZoomOut,
  Compass,
  CheckCircle2,
  ArrowRight,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Shield,
  Clock,
  Sparkles,
  Info
} from 'lucide-react';
import { HOTSPOTS_DATA } from '../data/remodelingData';
import type { Hotspot } from '../types';

// Real Architectural Estate Photography
import cutawayHouseImg from '../assets/images/luxury_real_house_cutaway_1789534094560.jpg';
import angleHouseImg from '../assets/images/luxury_real_house_angle_1789534109776.jpg';
import patioHouseImg from '../assets/images/luxury_real_house_patio_1789534123209.jpg';
import roofHouseImg from '../assets/images/luxury_real_house_roof_1789534136085.jpg';

interface InteractiveHouse3DProps {
  activeHotspotId: string | null;
  onSelectHotspot: (id: string) => void;
  onOpenQuote: () => void;
}

interface HouseViewAngle {
  id: string;
  name: string;
  angleLabel: string;
  image: string;
  description: string;
  // Hotspot anchor pins specifically positioned for this perspective
  pins: {
    id: string;
    label: string;
    // Percentage coordinates (0-100%) on the real house image
    targetX: number; // Anchor dot on the real house feature
    targetY: number;
    badgeX: number;  // Floating pill label position
    badgeY: number;
    linePath?: string; // Optional custom SVG leader line path
  }[];
}

const HOUSE_VIEWS: HouseViewAngle[] = [
  {
    id: 'cutaway',
    name: 'Interior & Exterior Cutaway',
    angleLabel: '0° Cutaway Elevation',
    image: cutawayHouseImg,
    description: 'Complete cross-section revealing interior finishes, structural roofing, and outdoor living integration.',
    pins: [
      {
        id: 'roofing',
        label: 'Roofing',
        targetX: 34,
        targetY: 18,
        badgeX: 18,
        badgeY: 12
      },
      {
        id: 'windows-doors',
        label: 'Windows & Doors',
        targetX: 58,
        targetY: 34,
        badgeX: 54,
        badgeY: 14
      },
      {
        id: 'gutters',
        label: 'Gutters',
        targetX: 82,
        targetY: 28,
        badgeX: 86,
        badgeY: 20
      },
      {
        id: 'exterior-painting',
        label: 'Exterior Painting',
        targetX: 80,
        targetY: 42,
        badgeX: 85,
        badgeY: 44
      },
      {
        id: 'interior-painting',
        label: 'Interior Painting',
        targetX: 47,
        targetY: 48,
        badgeX: 30,
        badgeY: 46
      },
      {
        id: 'flooring',
        label: 'Flooring',
        targetX: 43,
        targetY: 74,
        badgeX: 35,
        badgeY: 88
      },
      {
        id: 'turf-grass',
        label: 'Turf / Artificial Grass',
        targetX: 16,
        targetY: 80,
        badgeX: 12,
        badgeY: 88
      },
      {
        id: 'remodeling',
        label: 'Remodeling',
        targetX: 78,
        targetY: 76,
        badgeX: 82,
        badgeY: 88
      }
    ]
  },
  {
    id: 'angle',
    name: '3/4 Architectural Facade',
    angleLabel: '65° Side-Front Perspective',
    image: angleHouseImg,
    description: 'Exterior view highlighting dimensional rooflines, seamless gutter troughs, and custom siding finish.',
    pins: [
      {
        id: 'roofing',
        label: 'Roofing',
        targetX: 48,
        targetY: 22,
        badgeX: 32,
        badgeY: 14
      },
      {
        id: 'gutters',
        label: 'Gutters',
        targetX: 74,
        targetY: 30,
        badgeX: 82,
        badgeY: 22
      },
      {
        id: 'exterior-painting',
        label: 'Exterior Painting',
        targetX: 38,
        targetY: 48,
        badgeX: 20,
        badgeY: 44
      },
      {
        id: 'windows-doors',
        label: 'Windows & Doors',
        targetX: 62,
        targetY: 46,
        badgeX: 72,
        badgeY: 42
      },
      {
        id: 'turf-grass',
        label: 'Turf / Artificial Grass',
        targetX: 28,
        targetY: 82,
        badgeX: 20,
        badgeY: 88
      },
      {
        id: 'remodeling',
        label: 'Remodeling',
        targetX: 75,
        targetY: 78,
        badgeX: 80,
        badgeY: 88
      }
    ]
  },
  {
    id: 'patio',
    name: 'Outdoor Living & Turf Deck',
    angleLabel: '140° Patio & Terrace',
    image: patioHouseImg,
    description: 'Resort-style outdoor living space featuring synthetic turf putting green, patio deck, and sliding glass wall.',
    pins: [
      {
        id: 'turf-grass',
        label: 'Turf / Artificial Grass',
        targetX: 30,
        targetY: 76,
        badgeX: 20,
        badgeY: 88
      },
      {
        id: 'remodeling',
        label: 'Remodeling',
        targetX: 68,
        targetY: 72,
        badgeX: 78,
        badgeY: 86
      },
      {
        id: 'windows-doors',
        label: 'Windows & Doors',
        targetX: 48,
        targetY: 42,
        badgeX: 42,
        badgeY: 22
      },
      {
        id: 'exterior-painting',
        label: 'Exterior Painting',
        targetX: 82,
        targetY: 38,
        badgeX: 82,
        badgeY: 24
      },
      {
        id: 'gutters',
        label: 'Gutters',
        targetX: 35,
        targetY: 22,
        badgeX: 20,
        badgeY: 14
      },
      {
        id: 'roofing',
        label: 'Roofing',
        targetX: 62,
        targetY: 18,
        badgeX: 70,
        badgeY: 12
      }
    ]
  },
  {
    id: 'roof',
    name: 'Elevated Roofline & Gutters',
    angleLabel: '220° Drone Aerial Elevation',
    image: roofHouseImg,
    description: 'High-detail aerial inspection of architectural composite shingles, ridge caps, and seamless eave gutters.',
    pins: [
      {
        id: 'roofing',
        label: 'Roofing',
        targetX: 46,
        targetY: 34,
        badgeX: 30,
        badgeY: 18
      },
      {
        id: 'gutters',
        label: 'Gutters',
        targetX: 76,
        targetY: 42,
        badgeX: 82,
        badgeY: 32
      },
      {
        id: 'exterior-painting',
        label: 'Exterior Painting',
        targetX: 24,
        targetY: 52,
        badgeX: 18,
        badgeY: 44
      },
      {
        id: 'windows-doors',
        label: 'Windows & Doors',
        targetX: 58,
        targetY: 58,
        badgeX: 70,
        badgeY: 62
      },
      {
        id: 'turf-grass',
        label: 'Turf / Artificial Grass',
        targetX: 22,
        targetY: 84,
        badgeX: 20,
        badgeY: 90
      },
      {
        id: 'remodeling',
        label: 'Remodeling',
        targetX: 78,
        targetY: 82,
        badgeX: 80,
        badgeY: 90
      }
    ]
  }
];

export const InteractiveHouse3D: React.FC<InteractiveHouse3DProps> = ({
  activeHotspotId,
  onSelectHotspot,
  onOpenQuote
}) => {
  const [currentViewIndex, setCurrentViewIndex] = useState<number>(0);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(false);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [hoveredPinId, setHoveredPinId] = useState<string | null>(null);

  // 3D Parallax Tilt state
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Drag to rotate state
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const dragDistanceRef = useRef<number>(0);

  const currentView = HOUSE_VIEWS[currentViewIndex];
  const activeHotspot = HOTSPOTS_DATA.find((h) => h.id === activeHotspotId) || HOTSPOTS_DATA[0];

  // Auto-tour rotation timer
  useEffect(() => {
    if (!isAutoRotating) return;
    const interval = setInterval(() => {
      setCurrentViewIndex((prev) => (prev + 1) % HOUSE_VIEWS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoRotating]);

  // Handle Drag / Swipe to rotate between angles
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragDistanceRef.current = 0;
    setIsAutoRotating(false);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    // Calculate subtle 3D tilt
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: normY * -8, y: normX * 12 });

    if (!isDraggingRef.current) return;

    const deltaX = e.clientX - dragStartXRef.current;
    dragDistanceRef.current = deltaX;

    // Threshold to switch view
    if (Math.abs(deltaX) > 85) {
      if (deltaX > 0) {
        // Drag right -> previous angle
        setCurrentViewIndex((prev) => (prev === 0 ? HOUSE_VIEWS.length - 1 : prev - 1));
      } else {
        // Drag left -> next angle
        setCurrentViewIndex((prev) => (prev + 1) % HOUSE_VIEWS.length);
      }
      dragStartXRef.current = e.clientX;
      dragDistanceRef.current = 0;
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    setTilt({ x: 0, y: 0 });
  };

  const handlePointerLeave = () => {
    if (!isDraggingRef.current) {
      setTilt({ x: 0, y: 0 });
    }
  };

  const handlePrev = () => {
    setIsAutoRotating(false);
    setCurrentViewIndex((prev) => (prev === 0 ? HOUSE_VIEWS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsAutoRotating(false);
    setCurrentViewIndex((prev) => (prev + 1) % HOUSE_VIEWS.length);
  };

  // When a user selects a hotspot from anywhere, if it's not in the current view, ensure it's visible
  const handlePinClick = (pinId: string) => {
    onSelectHotspot(pinId);
    // If the active pin is flooring or interior and not on cutaway, switch to cutaway view
    if ((pinId === 'flooring' || pinId === 'interior-painting') && currentViewIndex !== 0) {
      setCurrentViewIndex(0);
    }
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-b from-[#08101C] via-[#060D17] to-[#040910] border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)]">
      
      {/* Top Header Control Bar */}
      <div className="p-3.5 sm:p-4 border-b border-white/10 flex items-center justify-between gap-3 bg-[#08111D]/90 backdrop-blur-md z-30 relative">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#E5A93C]/15 border border-[#E5A93C]/30 flex items-center justify-center text-[#E5A93C]">
            <Rotate3d className="w-4 h-4 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white tracking-wide">
                Real Architectural Estate
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#E5A93C] text-slate-950">
                360° Rotatable
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              {currentView.description}
            </p>
          </div>
        </div>

        {/* View Angle Switcher Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-full bg-black/60 border border-white/10 text-xs">
          {HOUSE_VIEWS.map((view, idx) => (
            <button
              key={view.id}
              onClick={() => {
                setIsAutoRotating(false);
                setCurrentViewIndex(idx);
              }}
              className={`px-3 py-1 rounded-full font-medium transition-all ${
                currentViewIndex === idx
                  ? 'bg-[#E5A93C] text-slate-950 font-bold shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="hidden md:inline">{view.name}</span>
              <span className="md:hidden">Angle {idx + 1}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Stage with 3D Parallax & Swipe/Drag */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] cursor-grab active:cursor-grabbing select-none touch-none overflow-hidden bg-black"
        style={{ perspective: '1200px' }}
      >
        {/* 3D Rotated Canvas Container with Real House Photography */}
        <div
          className="relative w-full h-full transition-transform duration-200 ease-out"
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isZoomed ? 1.25 : 1})`,
            transformOrigin: 'center center'
          }}
        >
          {/* Real House Architectural Photograph */}
          <img
            src={currentView.image}
            alt={currentView.name}
            className="w-full h-full object-cover transition-opacity duration-500 select-none pointer-events-none"
            loading="eager"
          />

          {/* Vignette gradients for cinematic luxury atmosphere */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#060D17]/85 via-transparent to-black/25 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060D17]/40 via-transparent to-[#060D17]/30 pointer-events-none" />

          {/* SVG Leader Lines for Accurate Pinpointing */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
          >
            <defs>
              <filter id="goldPinGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {currentView.pins.map((pin) => {
              const isSelected = activeHotspotId === pin.id;
              const isHovered = hoveredPinId === pin.id;
              const isActive = isSelected || isHovered;

              return (
                <g key={`leader-${pin.id}`}>
                  {/* Connector Line from Badge to Target Dot on House */}
                  <line
                    x1={pin.badgeX}
                    y1={pin.badgeY}
                    x2={pin.targetX}
                    y2={pin.targetY}
                    stroke={isActive ? '#E5A93C' : 'rgba(255,255,255,0.4)'}
                    strokeWidth={isActive ? '0.5' : '0.25'}
                    strokeDasharray={isActive ? 'none' : '0.8 0.8'}
                    filter={isActive ? 'url(#goldPinGlow)' : undefined}
                    className="transition-colors duration-300"
                  />

                  {/* Anchor Dot on the EXACT Real House Feature */}
                  <circle
                    cx={pin.targetX}
                    cy={pin.targetY}
                    r={isActive ? '1.2' : '0.9'}
                    fill={isActive ? '#E5A93C' : '#FFFFFF'}
                    stroke={isActive ? '#FFFFFF' : '#000000'}
                    strokeWidth="0.3"
                    className="transition-all duration-300"
                  />

                  {/* Pulsing Target Ring when Selected */}
                  {isActive && (
                    <circle
                      cx={pin.targetX}
                      cy={pin.targetY}
                      r="2.4"
                      fill="none"
                      stroke="#E5A93C"
                      strokeWidth="0.4"
                      opacity="0.8"
                      className="animate-ping origin-center"
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* Interactive Floating Badges with Exact Positioning */}
          {currentView.pins.map((pin) => {
            const isSelected = activeHotspotId === pin.id;
            const isHovered = hoveredPinId === pin.id;
            const isActive = isSelected || isHovered;

            return (
              <div
                key={`badge-${pin.id}`}
                style={{
                  left: `${pin.badgeX}%`,
                  top: `${pin.badgeY}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                className="absolute z-20 pointer-events-auto"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePinClick(pin.id);
                  }}
                  onMouseEnter={() => setHoveredPinId(pin.id)}
                  onMouseLeave={() => setHoveredPinId(null)}
                  className={`group flex items-center gap-1.5 focus:outline-none transition-all duration-200 cursor-pointer ${
                    isActive ? 'scale-110 z-30' : 'hover:scale-105'
                  }`}
                >
                  {/* Floating Glass Tag */}
                  <div
                    className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold backdrop-blur-md border transition-all whitespace-nowrap shadow-lg flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#E5A93C] text-slate-950 font-bold border-[#E5A93C] shadow-[0_4px_20px_rgba(229,169,60,0.5)]'
                        : isHovered
                        ? 'bg-black/90 text-white border-[#E5A93C] shadow-md'
                        : 'bg-black/75 text-white/90 border-white/20 hover:border-white/40'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isSelected ? 'bg-slate-950' : 'bg-[#E5A93C]'
                      }`}
                    />
                    <span>{pin.label}</span>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* Swipe Left / Right Navigation Overlay Arrows */}
        <button
          onClick={handlePrev}
          aria-label="Previous house angle"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-[#E5A93C] hover:text-slate-950 hover:border-[#E5A93C] flex items-center justify-center transition-all z-20 shadow-lg cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next house angle"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-[#E5A93C] hover:text-slate-950 hover:border-[#E5A93C] flex items-center justify-center transition-all z-20 shadow-lg cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Bottom Floating Indicator: Swipe / Drag Status & Controls */}
        <div className="absolute bottom-4 inset-x-4 flex items-center justify-between pointer-events-none z-20 gap-2">
          {/* Drag instruction pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-white text-xs font-medium shadow-lg pointer-events-auto">
            <Rotate3d className="w-3.5 h-3.5 text-[#E5A93C]" />
            <span>Swipe or Drag to Rotate Views ({currentView.angleLabel})</span>
          </div>

          {/* Quick Floating Controls (Zoom & Auto-Tour) */}
          <div className="flex items-center gap-1.5 pointer-events-auto">
            <button
              onClick={() => setIsZoomed((prev) => !prev)}
              aria-label="Toggle zoom"
              className={`px-3 py-1.5 rounded-full backdrop-blur-md border text-xs font-medium flex items-center gap-1.5 transition-all shadow-md cursor-pointer ${
                isZoomed
                  ? 'bg-[#E5A93C] text-slate-950 border-[#E5A93C]'
                  : 'bg-black/70 text-slate-200 border-white/20 hover:text-white'
              }`}
            >
              {isZoomed ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isZoomed ? 'Reset View' : 'Inspect Zoom'}</span>
            </button>

            <button
              onClick={() => setIsAutoRotating((prev) => !prev)}
              aria-label="Toggle auto-tour"
              className={`px-3 py-1.5 rounded-full backdrop-blur-md border text-xs font-medium flex items-center gap-1.5 transition-all shadow-md cursor-pointer ${
                isAutoRotating
                  ? 'bg-[#E5A93C] text-slate-950 border-[#E5A93C]'
                  : 'bg-black/70 text-slate-200 border-white/20 hover:text-white'
              }`}
            >
              <Compass className={`w-3.5 h-3.5 ${isAutoRotating ? 'animate-spin-slow' : ''}`} />
              <span className="hidden sm:inline">{isAutoRotating ? 'Pause Tour' : 'Auto Tour'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel of all 8 Remodeling Categories */}
      <div className="p-3 sm:p-4 border-t border-white/10 bg-[#070E18]/90 backdrop-blur-md">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 shrink-0 mr-1 hidden sm:inline">
            Direct Trade Inspection:
          </span>
          {HOTSPOTS_DATA.map((h) => {
            const isSelected = activeHotspotId === h.id;
            return (
              <button
                key={h.id}
                onClick={() => handlePinClick(h.id)}
                className={`text-xs px-3.5 py-1.5 rounded-full transition-all shrink-0 font-medium cursor-pointer ${
                  isSelected
                    ? 'bg-[#E5A93C] text-slate-950 font-bold shadow-md shadow-[#E5A93C]/25 scale-105'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 hover:border-white/25'
                }`}
              >
                {h.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Trade Inspection Spotlight Card */}
      {activeHotspot && (
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#0A131F] to-[#08101A] border-t border-[#E5A93C]/30 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={activeHotspot.image}
                alt={activeHotspot.title}
                className="w-16 h-16 rounded-xl object-cover border border-white/20 shrink-0 shadow-md"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=80';
                }}
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#E5A93C]">
                    {activeHotspot.category} Precision Remodeling
                  </span>
                  <span className="text-white/30">•</span>
                  <span className="text-xs text-slate-400">Architectural Standard</span>
                </div>
                <h4 className="text-lg font-bold text-white tracking-wide mt-0.5">
                  {activeHotspot.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                  {activeHotspot.description}
                </p>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end gap-3 w-full sm:w-auto shrink-0 justify-between sm:justify-center pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
              <button
                onClick={onOpenQuote}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#E5A93C] hover:bg-[#F3C363] text-slate-950 font-bold text-xs tracking-wide shadow-lg shadow-[#E5A93C]/25 hover:shadow-[#E5A93C]/40 transition-all cursor-pointer"
              >
                <span>Get Free Estimate</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 mt-3.5 pt-3 border-t border-white/10 flex-wrap">
            {activeHotspot.features.map((feat, idx) => (
              <span key={idx} className="inline-flex items-center gap-1.5 text-xs text-slate-300 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#E5A93C] shrink-0" />
                {feat}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
