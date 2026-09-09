import React from 'react';

export const CustomerLogos: React.FC = () => {
  return (
    <div
      className="w-full relative overflow-hidden py-4 select-none"
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
      }}
    >
      {/* Infinite sliding marquee track */}
      <div className="flex w-max items-center space-x-14 sm:space-x-20 animate-[marquee_38s_linear_infinite] hover:[animation-play-state:paused]">
        {/* Set 1 */}
        <LogoSet />
        {/* Set 2 for seamless infinite loop */}
        <LogoSet />
      </div>
    </div>
  );
};

const LogoSet: React.FC = () => {
  return (
    <div className="flex items-center space-x-14 sm:space-x-20 shrink-0">
      {/* 1. Figma */}
      <div className="h-9 flex items-center transition-transform hover:scale-105" title="Figma">
        <svg height="30" viewBox="0 0 105 32" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Figma">
          <text
            x="2"
            y="24"
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            fontSize="28"
            fontWeight="700"
            letterSpacing="-0.8px"
            fill="#000000"
          >
            Figma
          </text>
        </svg>
      </div>

      {/* 2. Woo (Iconic purple rounded wordmark) */}
      <div className="h-9 flex items-center transition-transform hover:scale-105" title="Woo">
        <svg height="28" viewBox="0 0 88 30" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Woo">
          {/* Custom SVG geometry for the signature rounded 'woo' */}
          {/* 'w' */}
          <path
            d="M3 7C3 5.34 4.34 4 6 4C7.66 4 9 5.34 9 7V16.8L12.7 8.2C13.3 6.8 14.7 6 16.2 6C17.7 6 19.1 6.8 19.7 8.2L23.4 16.8V7C23.4 5.34 24.74 4 26.4 4C28.06 4 29.4 5.34 29.4 7V22C29.4 23.66 28.06 25 26.4 25C25 25 23.8 24.2 23.1 23L16.2 9.5L9.3 23C8.6 24.2 7.4 25 6 25C4.34 25 3 23.66 3 22V7Z"
            fill="#7F54B3"
          />
          {/* First 'o' */}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M44.5 4C38.7 4 34 8.7 34 14.5C34 20.3 38.7 25 44.5 25C50.3 25 55 20.3 55 14.5C55 8.7 50.3 4 44.5 4ZM44.5 9.5C41.7 9.5 39.5 11.7 39.5 14.5C39.5 17.3 41.7 19.5 44.5 19.5C47.3 19.5 49.5 17.3 49.5 14.5C49.5 11.7 47.3 9.5 44.5 9.5Z"
            fill="#7F54B3"
          />
          {/* Second 'o' */}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M71.5 4C65.7 4 61 8.7 61 14.5C61 20.3 65.7 25 71.5 25C77.3 25 82 20.3 82 14.5C82 8.7 77.3 4 71.5 4ZM71.5 9.5C68.7 9.5 66.5 11.7 66.5 14.5C66.5 17.3 68.7 19.5 71.5 19.5C74.3 19.5 76.5 17.3 76.5 14.5C76.5 11.7 74.3 9.5 71.5 9.5Z"
            fill="#7F54B3"
          />
        </svg>
      </div>

      {/* 3. Vercel (Triangle + Vercel in bold) */}
      <div className="h-9 flex items-center space-x-2.5 transition-transform hover:scale-105" title="Vercel">
        <svg height="22" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Vercel Triangle">
          <path d="M14 0L28 24H0L14 0Z" fill="#000000" />
        </svg>
        <span className="text-2xl font-bold tracking-tight text-black font-sans">Vercel</span>
      </div>

      {/* 4. Uber (Clean grotesque) */}
      <div className="h-9 flex items-center transition-transform hover:scale-105" title="Uber">
        <svg height="28" viewBox="0 0 85 30" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Uber">
          <text
            x="0"
            y="23"
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            fontSize="29"
            fontWeight="700"
            letterSpacing="-0.5px"
            fill="#000000"
          >
            Uber
          </text>
        </svg>
      </div>

      {/* 5. ANTHROP\C */}
      <div className="h-9 flex items-center transition-transform hover:scale-105" title="Anthropic">
        <span className="text-[21px] font-extrabold tracking-wider text-black font-mono select-none">
          ANTHROP\C
        </span>
      </div>

      {/* 6. brightwheel (Pinwheel icon + brightwheel in vivid blue) */}
      <div className="h-9 flex items-center space-x-2.5 transition-transform hover:scale-105" title="brightwheel">
        {/* Flower / Pinwheel colored icon */}
        <svg height="26" width="26" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="brightwheel pinwheel">
          {/* 8 rounded petal capsules in circular formation */}
          <rect x="13.5" y="1" width="5" height="10" rx="2.5" fill="#00C49F" />
          <rect x="13.5" y="21" width="5" height="10" rx="2.5" fill="#FF8042" />
          <rect x="1" y="13.5" width="10" height="5" rx="2.5" fill="#FFBB28" />
          <rect x="21" y="13.5" width="10" height="5" rx="2.5" fill="#0088FE" />
          <rect x="5.5" y="5.5" width="5" height="10" rx="2.5" transform="rotate(-45 5.5 5.5)" fill="#FF6B8B" />
          <rect x="19.5" y="19.5" width="5" height="10" rx="2.5" transform="rotate(-45 19.5 19.5)" fill="#9B51E0" />
          <rect x="22.5" y="5.5" width="5" height="10" rx="2.5" transform="rotate(45 22.5 5.5)" fill="#00A3FF" />
          <rect x="8.5" y="19.5" width="5" height="10" rx="2.5" transform="rotate(45 8.5 19.5)" fill="#27AE60" />
        </svg>
        <span className="text-2xl font-bold tracking-tight text-[#2363EB] font-sans">
          brightwheel
        </span>
      </div>

      {/* 7. CURSOR (3D faceted cube/prism + CURSOR in bold all-caps) */}
      <div className="h-9 flex items-center space-x-2 transition-transform hover:scale-105" title="Cursor">
        <svg height="24" width="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cursor icon">
          {/* Isometric faceted 3D cube */}
          {/* Top face */}
          <path d="M16 2L29 9.5L16 17L3 9.5L16 2Z" fill="#71717A" />
          {/* Left face */}
          <path d="M3 9.5L16 17V30L3 22.5V9.5Z" fill="#3F3F46" />
          {/* Right face */}
          <path d="M16 17L29 9.5V22.5L16 30V17Z" fill="#18181B" />
        </svg>
        <span className="text-[21px] font-black tracking-wider text-black font-sans uppercase">
          CURSOR
        </span>
      </div>

      {/* 8. OpenAI */}
      <div className="h-9 flex items-center space-x-2.5 transition-transform hover:scale-105" title="OpenAI">
        <svg height="24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="OpenAI swirl">
          <path
            d="M22.28 10.15a5.55 5.55 0 0 0-.48-4.52 5.75 5.75 0 0 0-4.14-2.8 5.68 5.68 0 0 0-5.1 1.39A5.6 5.6 0 0 0 8.08 3.5a5.75 5.75 0 0 0-4.22 2.72 5.6 5.6 0 0 0 .68 6.47 5.55 5.55 0 0 0 .48 4.52 5.75 5.75 0 0 0 4.14 2.8 5.68 5.68 0 0 0 5.1-1.39 5.6 5.6 0 0 0 4.48.72 5.75 5.75 0 0 0 4.22-2.72 5.6 5.6 0 0 0-.68-6.47zM13.2 20.3a4.34 4.34 0 0 1-2.73-.97l.14-.08 4.52-2.61a.7.7 0 0 0 .36-.62v-6.38l1.92 1.11a.06.06 0 0 1 .03.05v5.18a4.37 4.37 0 0 1-4.24 4.32zm-7.6-3.26a4.29 4.29 0 0 1-.53-2.85l.14.09 4.52 2.61a.72.72 0 0 0 .72 0l5.53-3.19v2.22a.06.06 0 0 1-.03.05l-4.48 2.59a4.38 4.38 0 0 1-5.87-1.52zm-1.34-8.8a4.32 4.32 0 0 1 2.2-1.89v5.3a.7.7 0 0 0 .36.62l5.53 3.19-1.92 1.11a.06.06 0 0 1-.06 0L5.9 13.98a4.36 4.36 0 0 1-1.64-5.74zm13.78 2.59L12.5 7.64l1.92-1.11a.06.06 0 0 1 .06 0l4.48 2.59a4.37 4.37 0 0 1-.92 7.89v-5.3a.7.7 0 0 0-.36-.62zm2.14-2.83l-.14-.08-4.52-2.61a.72.72 0 0 0-.72 0L9.21 8.49V6.27a.06.06 0 0 1 .03-.05l4.48-2.59a4.38 4.38 0 0 1 6.46 4.45zm-8.85 3.32L9.4 9.94l1.93-1.11 3.86 2.23-1.93 1.11z"
            fill="#000000"
          />
        </svg>
        <span className="text-2xl font-bold tracking-tight text-black font-sans">OpenAI</span>
      </div>

      {/* 9. Amazon */}
      <div className="h-9 flex items-center transition-transform hover:scale-105" title="Amazon">
        <svg height="28" viewBox="0 0 95 30" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Amazon">
          <text
            x="0"
            y="20"
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            fontSize="26"
            fontWeight="700"
            letterSpacing="-0.5px"
            fill="#000000"
          >
            amazon
          </text>
          {/* Smile curve arrow */}
          <path
            d="M5 23C18 29 45 29 65 22"
            stroke="#FF9900"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            d="M62 20L67 22.5L62.5 26"
            stroke="#FF9900"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* 10. Shopify */}
      <div className="h-9 flex items-center space-x-2 transition-transform hover:scale-105" title="Shopify">
        <svg height="26" width="23" viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Shopify bag">
          <path
            d="M23.6 8.5C23.5 8.3 23.3 8.2 23.1 8.2C23 8.2 20.3 8.2 20.3 8.2C20.3 8.2 18.2 5.9 17.9 5.7C17.6 5.4 17.1 5.5 16.9 5.5L15.8 5.9C15.5 4.5 14.3 3.6 13 3.6C12.9 3.6 12.8 3.6 12.7 3.6C12.1 2.9 11.3 2.5 10.4 2.5C8.6 2.5 6.9 3.8 5.4 6.3C4.3 8 3.5 10.2 3.3 11.9C2 12.4 1.1 12.9 1 13C0 13.3 -0.1 13.5 0 14.6C0.1 15.4 2.9 36.5 2.9 36.5L17.8 39.5L27.6 37.3C27.6 37.3 23.7 8.7 23.6 8.5Z"
            fill="#95BF47"
          />
          <path
            d="M17.8 39.5L2.9 36.5C2.9 36.5 0.1 15.4 0 14.6C0 14.1 0.3 13.7 0.7 13.4L17.8 39.5Z"
            fill="#64943E"
          />
          <path
            d="M15.4 12.5C13.5 12.5 12.3 13.8 12.3 15.4C12.3 17.8 15.9 18.7 15.9 21.1C15.9 22.3 14.9 23.1 13.6 23.1C11.9 23.1 10.6 22 10.6 22L9.8 24.5C9.8 24.5 11.4 25.5 13.5 25.5C16.8 25.5 18.9 23.7 18.9 20.8C18.9 18.1 15.3 17.4 15.3 15.3C15.3 14.4 16.1 13.7 17.2 13.7C18.4 13.7 19.3 14.2 19.3 14.2L20.1 11.8C20.1 11.8 18.2 12.5 15.4 12.5Z"
            fill="#FFFFFF"
          />
        </svg>
        <span className="text-2xl font-bold tracking-tight text-black font-sans">shopify</span>
      </div>
    </div>
  );
};
