import React from 'react';

interface TrilinkLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'color';
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const TrilinkLogo: React.FC<TrilinkLogoProps> = ({
  className = '',
  variant = 'dark',
  size = 'md',
  showText = true,
}) => {
  const iconSizes = {
    sm: 24,
    md: 32,
    lg: 40,
  };

  const textClasses = {
    sm: 'text-lg tracking-tight font-bold ml-2.5',
    md: 'text-2xl tracking-tight font-extrabold ml-3',
    lg: 'text-3xl tracking-tight font-black ml-3.5',
  };

  const isLight = variant === 'light';
  const textColor = isLight ? 'text-white' : 'text-[#0A2333]';

  return (
    <div className={`inline-flex items-center select-none cursor-pointer group ${className}`}>
      {/* Modern Tri-Link Emblem: Three intersecting rounded nodes creating a dynamic flow */}
      <svg
        width={iconSizes[size]}
        height={iconSizes[size]}
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 group-hover:scale-105"
        aria-label="Trilink logo mark"
      >
        <defs>
          <linearGradient id="trilink-grad-1" x1="6" y1="6" x2="38" y2="38" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00E599" />
            <stop offset="50%" stopColor="#00B87A" />
            <stop offset="100%" stopColor="#0077FE" />
          </linearGradient>
          <linearGradient id="trilink-grad-2" x1="38" y1="6" x2="6" y2="38" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00D2FF" />
            <stop offset="100%" stopColor="#0052D4" />
          </linearGradient>
          <filter id="trilink-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer triad continuous loop paths */}
        <path
          d="M22 5C14 5 7 11.5 7 20C7 24.2 8.7 27.9 11.5 30.6L16.2 25.9C14.8 24.3 14 22.2 14 20C14 15.6 17.6 12 22 12C26.4 12 30 15.6 30 20C30 22.2 29.2 24.3 27.8 25.9L32.5 30.6C35.3 27.9 37 24.2 37 20C37 11.5 30 5 22 5Z"
          fill="url(#trilink-grad-1)"
        />
        <path
          d="M13 36C15.5 38.5 18.8 40 22 40C25.2 40 28.5 38.5 31 36L26.3 31.3C25.1 32.4 23.6 33 22 33C20.4 33 18.9 32.4 17.7 31.3L13 36Z"
          fill="url(#trilink-grad-2)"
        />
        <circle cx="22" cy="20" r="3.5" fill={isLight ? '#00D492' : '#00E599'} />
      </svg>

      {showText && (
        <span className={`font-sans ${textColor} ${textClasses[size]} flex items-center`}>
          <span>Tri</span>
          <span className={isLight ? 'text-[#00E599]' : 'text-[#00A86B]'}>link</span>
        </span>
      )}
    </div>
  );
};
