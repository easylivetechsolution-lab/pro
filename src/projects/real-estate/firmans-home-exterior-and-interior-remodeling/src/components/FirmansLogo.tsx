import React from 'react';

interface FirmansLogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const FirmansLogo: React.FC<FirmansLogoProps> = ({
  className = '',
  variant = 'light',
  size = 'md',
  showSubtitle = true,
}) => {
  const isDarkBg = variant === 'light'; // Text is light on dark bg

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const titleSizes = {
    sm: 'text-sm tracking-[0.22em]',
    md: 'text-base tracking-[0.24em]',
    lg: 'text-xl tracking-[0.26em]',
  };

  const subSizes = {
    sm: 'text-[7.5px] tracking-[0.12em]',
    md: 'text-[9px] sm:text-[9.5px] tracking-[0.14em]',
    lg: 'text-[11px] sm:text-xs tracking-[0.16em]',
  };

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Architectural Monogram Emblem */}
      <div
        className={`${iconSizes[size]} relative rounded-lg bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-[#C07848]/40 shadow-md flex items-center justify-center shrink-0 group-hover:border-[#C07848] transition-colors`}
      >
        <svg
          viewBox="0 0 40 40"
          className="w-[72%] h-[72%]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Architectural structural framing lines */}
          <rect
            x="3"
            y="3"
            width="34"
            height="34"
            rx="4"
            stroke="#C07848"
            strokeWidth="1.2"
            strokeOpacity="0.5"
          />
          {/* Horizontal lintel beam */}
          <line x1="3" y1="9" x2="37" y2="9" stroke="#C07848" strokeWidth="1" strokeOpacity="0.4" />
          
          {/* Stylized Architectural "F" with Cantilever */}
          {/* Vertical Stem */}
          <path
            d="M12 12V30"
            stroke={isDarkBg ? '#FFFFFF' : '#0F172A'}
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          {/* Top Cantilever Bar with Accent Angle */}
          <path
            d="M12 14H27L29 17H12"
            fill="#C07848"
          />
          {/* Middle Transom Bar */}
          <path
            d="M12 21H23"
            stroke="#C07848"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* Bottom Foundation Serif Tick */}
          <path
            d="M10 30H15"
            stroke={isDarkBg ? '#FFFFFF' : '#0F172A'}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Wordmark */}
      <div className="flex flex-col justify-center">
        <span
          className={`font-serif font-bold leading-none ${
            isDarkBg ? 'text-white' : 'text-slate-900'
          } ${titleSizes[size]}`}
        >
          FIRMANS
        </span>
        {showSubtitle && (
          <span
            className={`font-sans font-semibold uppercase text-[#C07848] mt-1 leading-none whitespace-nowrap ${subSizes[size]}`}
          >
            HOME EXTERIOR &amp; INTERIOR REMODELING
          </span>
        )}
      </div>
    </div>
  );
};
