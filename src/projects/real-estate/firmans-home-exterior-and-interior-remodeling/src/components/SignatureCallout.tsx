import React from 'react';

interface SignatureCalloutProps {
  className?: string;
}

export const SignatureCallout: React.FC<SignatureCalloutProps> = ({ className = '' }) => {
  return (
    <div
      className={`inline-block select-none transform -rotate-[10.5deg] ${className}`}
      aria-label="Your Dream Home Our Expertise"
    >
      <div className="flex flex-col items-end text-right">
        {/* Line 1: Your Dream Home */}
        <span
          style={{
            fontFamily: "'Satisfy', 'Mr Dafoe', cursive",
            letterSpacing: '0.015em',
            textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 4px 16px rgba(0,0,0,0.8)',
          }}
          className="text-white text-3xl sm:text-4xl md:text-[46px] lg:text-[52px] font-normal leading-[1.08] whitespace-nowrap"
        >
          Your Dream Home
        </span>

        {/* Line 2: Our Expertise */}
        <span
          style={{
            fontFamily: "'Satisfy', 'Mr Dafoe', cursive",
            letterSpacing: '0.015em',
            textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 4px 16px rgba(0,0,0,0.8)',
          }}
          className="text-white text-3xl sm:text-4xl md:text-[46px] lg:text-[52px] font-normal leading-[1.08] whitespace-nowrap mt-0.5 sm:mt-1 pr-1"
        >
          Our Expertise
        </span>

        {/* Hand-drawn Underline with starting loop on the left, matching image */}
        <div className="w-full flex justify-end -mt-0.5 sm:-mt-1">
          <svg
            viewBox="0 0 280 34"
            className="w-48 sm:w-60 md:w-72 lg:w-80 h-7 sm:h-8 md:h-9 overflow-visible filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* The white brush underline with starting teardrop loop at bottom-left and smooth upward right-tapering sweep */}
            {/* Outline & fill for smooth tapered brush stroke */}
            <path
              d="M 28 27 C 22 31 16 28 14 23 C 12 17 17 12 23 13 C 28 14 30 19 28 23 C 26 27 21 28 18 26 C 16 24 18 21 24 20 C 42 16 95 18 160 15 C 205 13 248 9 276 4 C 278 3.5 277 4.5 274 5 C 244 11 198 16 150 18 C 90 21 44 21 29 25 Z"
              fill="#FFFFFF"
            />
            {/* Additional crisp center line to ensure full opacity and solid white body */}
            <path
              d="M 22 23 C 18 26 15 22 15 18 C 15 14 21 13 25 16 C 28 19 24 24 19 23 C 16 22 20 19 28 18 C 65 15 145 16 274 4.5"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
