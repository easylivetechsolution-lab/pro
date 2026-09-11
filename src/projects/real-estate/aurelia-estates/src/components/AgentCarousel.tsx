import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  Mail,
  MessageSquare,
  Award,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Check,
  Copy,
  Info,
} from 'lucide-react';
import type { Agent } from '../types';

interface AgentCarouselProps {
  agents: Agent[];
  onSelectAgent: (agent: Agent) => void;
}

// Timing constants: exactly 6 seconds per phase
const SPIN_CYCLE_DURATION = 6000; // 6 seconds in 3D spinning
const SLIDE_CYCLE_DURATION = 6000; // 6 seconds in sliding track
const MORPH_TRANSITION_DURATION = 1000; // 1.0s stylish blend transition
const AUTO_SLIDE_INTERVAL = 2000; // Auto-advance card during sliding track

export const AgentCarousel: React.FC<AgentCarouselProps> = ({ agents, onSelectAgent }) => {
  const [viewMode, setViewMode] = useState<'spinning' | 'sliding'>('spinning');
  const [isMorphing, setIsMorphing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [copiedInfo, setCopiedInfo] = useState<string | null>(null);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  // Drag / Swipe State
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const startTimeRef = useRef(0);
  const hasMovedRef = useRef(false);
  const currentDragOffsetRef = useRef(0);

  // References to keep animation loop & timers isolated from state re-renders
  const rotationAngleRef = useRef(0);
  rotationAngleRef.current = rotationAngle;
  const currentIndexRef = useRef(0);
  currentIndexRef.current = currentIndex;
  const viewModeRef = useRef<'spinning' | 'sliding'>('spinning');
  viewModeRef.current = viewMode;

  const animationRef = useRef<number | null>(null);
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const cycleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const slideTimerRef = useRef<NodeJS.Timeout | null>(null);

  const isHoveredRef = useRef(isHovered);
  isHoveredRef.current = isHovered;
  const isDraggingRef = useRef(isDragging);
  isDraggingRef.current = isDragging;

  const numAgents = agents.length;
  const angleStep = 360 / numAgents;
  const cylinderRadius = 430; // Radius in pixels for 3D translateZ

  // 1. 3D SPINNING ANIMATION LOOP
  // Stops completely when hovered, dragging, or morphing!
  useEffect(() => {
    if (viewMode !== 'spinning' || isHovered || isDragging || isMorphing) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      return;
    }

    lastTimeRef.current = performance.now();
    const speedDegPerFrame = 0.32; // Smooth stately pace

    const animate = (time: number) => {
      if (isHoveredRef.current || isDraggingRef.current) return;
      const delta = Math.min((time - lastTimeRef.current) / 16.67, 3);
      lastTimeRef.current = time;
      setRotationAngle((prev) => {
        const next = (prev - speedDegPerFrame * delta) % 360;
        rotationAngleRef.current = next;
        return next;
      });
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [viewMode, isHovered, isDragging, isMorphing]);

  // 2. SLIDING TRACK AUTO-ADVANCE
  // Smoothly advances cards in sliding mode unless hovered, dragging, or morphing
  useEffect(() => {
    if (viewMode !== 'sliding' || isHovered || isDragging || isMorphing) {
      if (slideTimerRef.current) clearInterval(slideTimerRef.current);
      return;
    }

    slideTimerRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % numAgents;
        currentIndexRef.current = next;
        return next;
      });
    }, AUTO_SLIDE_INTERVAL);

    return () => {
      if (slideTimerRef.current) clearInterval(slideTimerRef.current);
    };
  }, [viewMode, isHovered, isDragging, isMorphing, numAgents]);

  // 3. AUTOMATIC MORPH CYCLE:
  // Alternates between 3D Spinning (6s) and Sliding Track (6s) with a deep yellow optical spark!
  // Dependencies ONLY include viewMode, isHovered, isDragging, so timer runs uninterrupted for 6 seconds.
  useEffect(() => {
    if (isHovered || isDragging) {
      if (cycleTimerRef.current) clearTimeout(cycleTimerRef.current);
      return;
    }

    const currentDuration = viewMode === 'spinning' ? SPIN_CYCLE_DURATION : SLIDE_CYCLE_DURATION;

    cycleTimerRef.current = setTimeout(() => {
      setIsMorphing(true);

      if (viewModeRef.current === 'spinning') {
        // Calculate front-most agent so sliding track starts seamlessly on that agent
        const currentRot = rotationAngleRef.current;
        const frontIndex = Math.round(((-currentRot % 360 + 360) % 360) / angleStep) % numAgents;
        setCurrentIndex(frontIndex);
        currentIndexRef.current = frontIndex;

        // Stylish blend transition into sliding track
        setTimeout(() => {
          setViewMode('sliding');
          setIsMorphing(false);
        }, MORPH_TRANSITION_DURATION);
      } else {
        // Morph back from sliding track to 3D spinning
        // Align rotation angle so current agent will be right at the front of the cylinder
        const targetAngle = -currentIndexRef.current * angleStep;
        rotationAngleRef.current = targetAngle;
        setRotationAngle(targetAngle);

        // Stylish blend transition into 3D spinning
        setTimeout(() => {
          setViewMode('spinning');
          setIsMorphing(false);
        }, MORPH_TRANSITION_DURATION);
      }
    }, currentDuration);

    return () => {
      if (cycleTimerRef.current) clearTimeout(cycleTimerRef.current);
    };
  }, [viewMode, isHovered, isDragging, numAgents, angleStep]);

  // 4. SWIPE & DRAG HANDLERS (Silky smooth on Touch and Mouse)
  const handleDragStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    startXRef.current = clientX;
    startYRef.current = clientY;
    startTimeRef.current = Date.now();
    hasMovedRef.current = false;
    currentDragOffsetRef.current = 0;
    setDragOffset(0);
  };

  const handleDragMove = (clientX: number, clientY: number, e?: TouchEvent | MouseEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = clientX - startXRef.current;
    const deltaY = clientY - startYRef.current;

    // Detect gesture intent
    if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
      hasMovedRef.current = true;
    }

    if (e && Math.abs(deltaX) > Math.abs(deltaY) && e.cancelable) {
      // Prevent vertical page scroll during deliberate horizontal swipe
      e.preventDefault();
    }

    currentDragOffsetRef.current = deltaX;
    setDragOffset(deltaX);

    if (viewModeRef.current === 'spinning') {
      // In 3D orbit: direct rotational responsiveness
      const rotationDelta = deltaX * 0.35;
      setRotationAngle((prev) => {
        const next = prev + rotationDelta;
        rotationAngleRef.current = next;
        return next;
      });
      startXRef.current = clientX;
    }
  };

  const handleDragEnd = () => {
    if (!isDraggingRef.current) return;
    const deltaX = currentDragOffsetRef.current;
    const duration = Math.max(Date.now() - startTimeRef.current, 50);
    const velocity = deltaX / duration;

    setIsDragging(false);

    if (viewModeRef.current === 'sliding') {
      // Responsive threshold: 30px swipe or velocity flick
      if (deltaX < -30 || velocity < -0.2) {
        setCurrentIndex((prev) => {
          const next = (prev + 1) % numAgents;
          currentIndexRef.current = next;
          return next;
        });
      } else if (deltaX > 30 || velocity > 0.2) {
        setCurrentIndex((prev) => {
          const next = (prev - 1 + numAgents) % numAgents;
          currentIndexRef.current = next;
          return next;
        });
      }
    }

    setDragOffset(0);
    currentDragOffsetRef.current = 0;

    // Prevent immediate button click after dragging
    setTimeout(() => {
      hasMovedRef.current = false;
    }, 120);
  };

  // Touch event bindings on carousel container with non-passive touchmove for gesture locking
  useEffect(() => {
    const el = carouselContainerRef.current;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        handleDragStart(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        handleDragMove(e.touches[0].clientX, e.touches[0].clientY, e);
      }
    };

    const onTouchEnd = () => {
      handleDragEnd();
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('touchcancel', onTouchEnd);

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchEnd);
    };
  }, [numAgents]);

  // Mouse drag event bindings
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    handleDragStart(e.clientX, e.clientY);
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (isDraggingRef.current) {
        handleDragMove(e.clientX, e.clientY);
      }
    };

    const onMouseUp = () => {
      if (isDraggingRef.current) {
        handleDragEnd();
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [numAgents]);

  // Navigation Arrows
  const spinNext = () => {
    if (viewMode === 'spinning') {
      setRotationAngle((prev) => {
        const next = prev - angleStep;
        rotationAngleRef.current = next;
        return next;
      });
    } else {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % numAgents;
        currentIndexRef.current = next;
        return next;
      });
    }
  };

  const spinPrev = () => {
    if (viewMode === 'spinning') {
      setRotationAngle((prev) => {
        const next = prev + angleStep;
        rotationAngleRef.current = next;
        return next;
      });
    } else {
      setCurrentIndex((prev) => {
        const next = (prev - 1 + numAgents) % numAgents;
        currentIndexRef.current = next;
        return next;
      });
    }
  };

  const jumpToAgent = (index: number) => {
    setCurrentIndex(index);
    currentIndexRef.current = index;
    if (viewMode === 'spinning') {
      const targetAngle = -index * angleStep;
      rotationAngleRef.current = targetAngle;
      setRotationAngle(targetAngle);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedInfo(`${label} copied!`);
    setTimeout(() => setCopiedInfo(null), 2500);
  };

  const toggleFlip = (agentId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasMovedRef.current) return;
    setFlippedCards((prev) => ({
      ...prev,
      [agentId]: !prev[agentId],
    }));
  };

  // Active front agent index for pagination dots
  const activeAgentIndex =
    viewMode === 'spinning'
      ? Math.round(((-rotationAngle % 360 + 360) % 360) / angleStep) % numAgents
      : currentIndex;

  return (
    <section
      id="agents"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="py-24 md:py-32 bg-[#090a0d] relative overflow-hidden border-t border-[#1a1c24] select-none"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <span className="w-8 h-[2px] bg-[#c5a880]" />
              <span className="text-[11px] font-semibold tracking-[0.25em] text-[#c5a880] uppercase">
                GLOBAL PRIVATE CLIENT ADVISORS
              </span>
            </div>
            <h2 className="font-serif-luxury text-3xl md:text-5xl lg:text-6xl text-white font-normal tracking-tight">
              Meet Our Company Agents
            </h2>
            <p className="text-sm md:text-base text-[#9aa1b0] max-w-xl font-light">
              Distinguished advisors managing high-net-worth acquisitions across the world’s most coveted postcodes. Direct contact details and confidential consultations.
            </p>
          </div>

          {/* Minimalist Navigation Step Controls (Mode status badges and text hidden as requested) */}
          <div className="flex items-center space-x-2">
            <button
              id="carousel-prev-btn"
              onClick={spinPrev}
              className="p-3 rounded-full bg-[#151720] hover:bg-[#20232e] active:scale-95 text-white border border-[#272b38] hover:border-[#c5a880]/50 transition-all shadow-md"
              aria-label="Previous Agent"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              id="carousel-next-btn"
              onClick={spinNext}
              className="p-3 rounded-full bg-[#151720] hover:bg-[#20232e] active:scale-95 text-white border border-[#272b38] hover:border-[#c5a880]/50 transition-all shadow-md"
              aria-label="Next Agent"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Copy Notification Toast */}
        {copiedInfo && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#c5a880] text-black px-4 py-2.5 rounded-md shadow-2xl flex items-center space-x-2 font-medium text-xs tracking-wider animate-fade-in">
            <Check className="w-4 h-4" />
            <span>{copiedInfo}</span>
          </div>
        )}

        {/* --- INTERACTIVE CAROUSEL STAGE --- */}
        <div
          ref={carouselContainerRef}
          onMouseDown={handleMouseDown}
          className="relative w-full h-[600px] md:h-[640px] flex items-center justify-center cursor-grab active:cursor-grabbing perspective-1400 overflow-hidden py-10 touch-pan-y"
          style={{ touchAction: 'pan-y' }}
        >
          {/* Deep Yellow Optical Spark Flare (Ignites precisely during the 1-second perspective blend) */}
          {isMorphing && (
            <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center overflow-hidden">
              <div className="relative w-0 h-0 flex items-center justify-center">
                {/* Concentrated amber core glow */}
                <div className="absolute w-24 h-24 rounded-full bg-gradient-to-r from-[#d97706]/30 via-[#f59e0b]/40 to-[#eab308]/30 blur-lg animate-pulse" />

                {/* Needle-sharp deep yellow horizontal laser ray */}
                <div className="absolute h-[1.5px] w-[340px] md:w-[480px] bg-gradient-to-r from-transparent via-[#f59e0b] to-transparent shadow-[0_0_14px_#eab308] animate-spark-ray-h" />

                {/* Fine vertical needle ray */}
                <div className="absolute w-[1.5px] h-[150px] md:h-[200px] bg-gradient-to-b from-transparent via-[#fbbf24] to-transparent shadow-[0_0_12px_#f59e0b] animate-spark-ray-v" />

                {/* Diamond Starlight Center Spark */}
                <div className="absolute w-7 h-7 bg-gradient-to-tr from-[#d97706] via-[#fbbf24] to-[#fef08a] rotate-45 rounded-[2px] shadow-[0_0_24px_#eab308] animate-optical-spark" />
                <div className="absolute w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_8px_#ffffff]" />

                {/* Starlight Micro Embers */}
                <div className="absolute -top-16 -left-32 w-1.5 h-1.5 rounded-full bg-[#fde047] shadow-[0_0_8px_#facc15] animate-ping" />
                <div className="absolute -bottom-14 -right-28 w-1.5 h-1.5 rounded-full bg-[#fbbf24] shadow-[0_0_8px_#f59e0b] animate-ping" />
                <div className="absolute -top-20 right-28 w-1 h-1 rounded-full bg-[#fef08a] shadow-[0_0_6px_#fde047] animate-pulse" />
                <div className="absolute bottom-20 -left-24 w-1.5 h-1.5 rounded-full bg-[#eab308] shadow-[0_0_8px_#ca8a04] animate-ping" />
              </div>
            </div>
          )}

          {/* Stage Container */}
          <div
            className={`relative w-[310px] md:w-[350px] h-[510px] transform-style-3d transition-transform ease-out ${
              isMorphing
                ? 'duration-1000'
                : isDragging
                ? 'duration-0'
                : viewMode === 'sliding'
                ? 'duration-500'
                : 'duration-150'
            }`}
            style={{
              transform:
                viewMode === 'spinning'
                  ? `translateZ(-${cylinderRadius}px) rotateY(${rotationAngle}deg)`
                  : `translateZ(0px) rotateY(0deg)`,
            }}
          >
            {agents.map((agent, i) => {
              const itemAngle = i * angleStep;
              // Relative circular angle for 3D orbit
              const currentRelAngle = ((rotationAngle + itemAngle) % 360 + 360) % 360;
              const isFrontInSpinning = currentRelAngle > 330 || currentRelAngle < 30;

              // Sliding mode calculations (relative circular offset to currentIndex)
              let relIndex = i - currentIndex;
              if (relIndex > numAgents / 2) relIndex -= numAgents;
              if (relIndex < -numAgents / 2) relIndex += numAgents;

              const isFrontInSliding = relIndex === 0;
              const isFront = viewMode === 'spinning' ? isFrontInSpinning : isFrontInSliding;
              const isFlipped = flippedCards[agent.id];

              // Card spacing for sliding gallery track
              const cardSpacing = 370;
              const slidingX = relIndex * cardSpacing + (viewMode === 'sliding' ? dragOffset : 0);

              const cardTransform =
                viewMode === 'spinning'
                  ? `rotateY(${itemAngle}deg) translateZ(${cylinderRadius}px)`
                  : `translateX(${slidingX}px) translateZ(${isFrontInSliding ? '40px' : '-20px'}) scale(${
                      isFrontInSliding ? 1 : 0.92
                    })`;

              return (
                <div
                  key={agent.id}
                  id={`agent-card-${agent.id}`}
                  className={`absolute inset-0 transform-style-3d ease-out ${
                    isDragging
                      ? 'duration-0'
                      : isMorphing
                      ? 'transition-all duration-1000'
                      : 'transition-all duration-700'
                  } ${
                    viewMode === 'sliding' && Math.abs(relIndex) > 2
                      ? 'opacity-0 pointer-events-none'
                      : 'opacity-100'
                  }`}
                  style={{
                    transform: cardTransform,
                    zIndex: isFront ? 30 : 10 - Math.abs(relIndex),
                  }}
                  onClick={() => {
                    if (hasMovedRef.current) return;
                    if (viewMode === 'sliding' && relIndex !== 0) {
                      setCurrentIndex(i);
                      currentIndexRef.current = i;
                    }
                  }}
                >
                  {/* The Card with Flip Support & Direct Contact Details */}
                  <div
                    className={`relative w-full h-full rounded-2xl bg-[#13151c] border transition-all duration-500 shadow-2xl overflow-hidden flex flex-col justify-between ${
                      isFront
                        ? isMorphing
                          ? 'border-[#f59e0b] shadow-[0_0_28px_rgba(245,158,11,0.45)] ring-1 ring-[#fbbf24]/70'
                          : 'border-[#c5a880] shadow-[#c5a880]/20 ring-1 ring-[#c5a880]/50'
                        : 'border-[#232733] opacity-65 hover:opacity-95 hover:border-[#383e50]'
                    }`}
                  >
                    {!isFlipped ? (
                      /* FRONT OF CARD */
                      <>
                        {/* Card Header & Photo */}
                        <div className="relative h-[235px] w-full overflow-hidden bg-[#1c1f28]">
                          <img
                            src={agent.photo}
                            alt={agent.name}
                            className="w-full h-full object-cover object-top filter contrast-[1.05]"
                            referrerPolicy="no-referrer"
                            draggable={false}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#13151c] via-black/20 to-transparent" />

                          {/* Specialty Jurisdiction Badge */}
                          <div className="absolute top-3.5 left-3.5">
                            <span className="px-2.5 py-1 text-[9.5px] font-semibold tracking-wider uppercase bg-black/75 backdrop-blur-md text-[#d8b88a] border border-[#c5a880]/40 rounded-full shadow">
                              {agent.specialty.split('&')[0]}
                            </span>
                          </div>

                          {/* Flip Info button */}
                          <button
                            onClick={(e) => toggleFlip(agent.id, e)}
                            className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-black/60 hover:bg-[#c5a880] hover:text-black backdrop-blur-md text-[#c5c9d4] border border-white/10 transition-all shadow"
                            title="View bio and notable sales records"
                          >
                            <Info className="w-3.5 h-3.5" />
                          </button>

                          {/* Experience / Volume Chip */}
                          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-[#e5e7eb] px-3 py-1.5 bg-black/75 backdrop-blur-md border border-white/10 rounded-lg">
                            <span className="flex items-center gap-1.5">
                              <Award className="w-3.5 h-3.5 text-[#c5a880]" />
                              <span>{agent.experienceYears} Yrs Experience</span>
                            </span>
                            <span className="text-[#d8b88a] font-semibold tracking-wide">
                              {agent.totalVolume} Sold
                            </span>
                          </div>
                        </div>

                        {/* Agent Details & Contact Coordinates */}
                        <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                          <div>
                            <div className="flex items-center justify-between">
                              <h3 className="font-serif-luxury text-2xl text-white font-medium">
                                {agent.name}
                              </h3>
                              <span className="text-[10px] text-[#c5a880] uppercase tracking-wider font-semibold">
                                {agent.region.split('&')[0]}
                              </span>
                            </div>
                            <p className="text-xs text-[#a1a7b5] line-clamp-1 mt-0.5">
                              {agent.role}
                            </p>
                          </div>

                          {/* Contact Details with Quick Copy Actions */}
                          <div className="space-y-2 bg-[#0c0d11] p-3 rounded-xl border border-[#1e222c]">
                            {/* Phone */}
                            <div className="flex items-center justify-between text-xs">
                              <a
                                href={`tel:${agent.phone.replace(/\s+/g, '')}`}
                                onClick={(e) => {
                                  if (hasMovedRef.current) e.preventDefault();
                                  e.stopPropagation();
                                }}
                                className="flex items-center space-x-2 text-[#d1d5db] hover:text-[#d8b88a] transition-colors"
                              >
                                <Phone className="w-3.5 h-3.5 text-[#c5a880] shrink-0" />
                                <span className="font-mono text-[11.5px]">{agent.phone}</span>
                              </a>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  copyToClipboard(agent.phone, 'Phone number');
                                }}
                                className="text-[#717786] hover:text-white p-1 transition-colors"
                                title="Copy phone"
                              >
                                <Copy className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Email */}
                            <div className="flex items-center justify-between text-xs">
                              <a
                                href={`mailto:${agent.email}`}
                                onClick={(e) => {
                                  if (hasMovedRef.current) e.preventDefault();
                                  e.stopPropagation();
                                }}
                                className="flex items-center space-x-2 text-[#d1d5db] hover:text-[#d8b88a] transition-colors truncate max-w-[190px]"
                              >
                                <Mail className="w-3.5 h-3.5 text-[#c5a880] shrink-0" />
                                <span className="text-[11px] truncate">{agent.email}</span>
                              </a>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  copyToClipboard(agent.email, 'Email address');
                                }}
                                className="text-[#717786] hover:text-white p-1 transition-colors"
                                title="Copy email"
                              >
                                <Copy className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center space-x-2 pt-1">
                            <button
                              onClick={(e) => {
                                if (hasMovedRef.current) return;
                                e.stopPropagation();
                                onSelectAgent(agent);
                              }}
                              className="flex-1 py-2.5 px-3 bg-[#c5a880] hover:bg-[#d8b88a] active:scale-95 text-[#0d0e12] font-semibold text-xs tracking-wider rounded-lg transition-all flex items-center justify-center space-x-1.5 shadow"
                            >
                              <Calendar className="w-3.5 h-3.5" />
                              <span>CONSULT AGENT</span>
                            </button>

                            <a
                              href={`https://wa.me/?text=Hello%20${encodeURIComponent(
                                agent.name
                              )},%20I%20am%20interested%20in%20Aurelia%20Estates`}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => {
                                if (hasMovedRef.current) e.preventDefault();
                                e.stopPropagation();
                              }}
                              className="p-2.5 bg-[#1a1d26] hover:bg-[#252936] text-[#c5a880] border border-[#2c3140] rounded-lg transition-colors"
                              title="Chat on WhatsApp"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      </>
                    ) : (
                      /* BACK OF CARD: BIO & NOTABLE SALES RECORD */
                      <div className="p-6 h-full flex flex-col justify-between space-y-4 bg-[#101217]">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between border-b border-[#222633] pb-3">
                            <div>
                              <h4 className="font-serif-luxury text-xl text-white font-medium">
                                {agent.name}
                              </h4>
                              <p className="text-[10px] text-[#c5a880] uppercase tracking-wider">
                                {agent.specialty}
                              </p>
                            </div>
                            <button
                              onClick={(e) => toggleFlip(agent.id, e)}
                              className="p-1.5 rounded-full bg-[#1c202a] text-[#8e95a5] hover:text-white transition-colors"
                              title="Back to front"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                          </div>

                          <div>
                            <p className="text-[11px] font-semibold tracking-wider text-[#9ba2b3] uppercase">
                              Notable Transaction
                            </p>
                            <p className="text-xs text-white mt-0.5 font-medium">
                              {agent.recentNotableSale}
                            </p>
                          </div>

                          <div>
                            <p className="text-[11px] font-semibold tracking-wider text-[#9ba2b3] uppercase">
                              Executive Bio
                            </p>
                            <p className="text-xs text-[#a7aebc] leading-relaxed mt-1 line-clamp-4">
                              {agent.bio}
                            </p>
                          </div>

                          <div>
                            <p className="text-[11px] font-semibold tracking-wider text-[#9ba2b3] uppercase">
                              Languages Spoken
                            </p>
                            <div className="flex flex-wrap gap-1.5 mt-1.5">
                              {agent.languages.map((lang) => (
                                <span
                                  key={lang}
                                  className="px-2 py-0.5 text-[10px] bg-[#1a1d26] text-[#c7cbd4] rounded border border-[#2b303d]"
                                >
                                  {lang}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={(e) => {
                            if (hasMovedRef.current) return;
                            e.stopPropagation();
                            onSelectAgent(agent);
                          }}
                          className="w-full py-2.5 bg-[#c5a880] hover:bg-[#d8b88a] active:scale-95 text-black font-semibold text-xs tracking-wider rounded-lg transition-colors"
                        >
                          BOOK CONFIDENTIAL CONSULTATION
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Pagination Dots */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center space-x-2">
            {agents.map((agent, i) => (
              <button
                key={agent.id}
                onClick={() => jumpToAgent(i)}
                className={`transition-all rounded-full ${
                  activeAgentIndex === i
                    ? 'w-8 h-2 bg-[#c5a880] shadow-[0_0_10px_#c5a880]'
                    : 'w-2 h-2 bg-[#2d313d] hover:bg-[#52586b]'
                }`}
                aria-label={`Jump to ${agent.name}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
