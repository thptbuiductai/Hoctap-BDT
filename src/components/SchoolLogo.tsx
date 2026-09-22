import React from 'react';

interface SchoolLogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
}

export const SchoolLogo: React.FC<SchoolLogoProps> = ({ 
  className = "w-10 h-10", 
  size,
  showText = false
}) => {
  const style = size ? { width: size, height: size } : undefined;

  return (
    <svg 
      viewBox="0 0 500 500" 
      className={`inline-block select-none ${className}`}
      style={style}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Logo Trường THPT Bùi Dục Tài"
    >
      <defs>
        {/* Flame glow filter */}
        <filter id="flame-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Linear gradients */}
        <linearGradient id="sky-grad" x1="250" y1="20" x2="250" y2="400" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#48C3FC" />
          <stop offset="100%" stopColor="#25A5F4" />
        </linearGradient>

        <linearGradient id="flame-grad" x1="250" y1="80" x2="250" y2="210" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF2A2A" />
          <stop offset="60%" stopColor="#EA1D1D" />
          <stop offset="100%" stopColor="#C41212" />
        </linearGradient>

        <linearGradient id="flame-inner-glow" x1="250" y1="120" x2="250" y2="200" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF176" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FF9800" stopOpacity="0.4" />
        </linearGradient>

        <radialGradient id="torch-glow" cx="250" cy="170" r="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFE082" stopOpacity="0.75" />
          <stop offset="65%" stopColor="#FFE082" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#48C3FC" stopOpacity="0" />
        </radialGradient>

        {/* Text path for TRƯỜNG THPT along bottom-left edge */}
        <path id="path-truong-thpt" d="M 45 250 L 235 440" />
        {/* Text path for BÙI DỤC TÀI along bottom-right edge */}
        <path id="path-bui-duc-tai" d="M 265 440 L 455 250" />
      </defs>

      {/* 1. Main Rhombus / Diamond Frame */}
      {/* Upper cyan/sky-blue triangle zone */}
      <polygon 
        points="250,15 485,250 250,485 15,250" 
        fill="url(#sky-grad)" 
      />

      {/* Yellow sunburst/radial light behind the flame */}
      <circle cx="250" cy="175" r="70" fill="url(#torch-glow)" />

      {/* 2. Lower Pink/Magenta V-Shape Chevron Banner */}
      <polygon 
        points="15,250 250,485 485,250 435,250 250,435 65,250" 
        fill="#F8B6CE" 
        stroke="#1E293B" 
        strokeWidth="3.5" 
      />

      {/* Bottom white chevron zone & center notch */}
      <polygon 
        points="215,450 250,485 285,450 250,460" 
        fill="#FFFFFF" 
        stroke="#1E293B" 
        strokeWidth="2.5" 
      />
      {/* Little white curved base tab */}
      <path 
        d="M 238,400 C 238,435 242,460 250,460 C 258,460 262,435 262,400 Z" 
        fill="#FFFFFF" 
        stroke="#1E293B" 
        strokeWidth="2.5" 
      />

      {/* 3. Golden Cogwheel / Gear behind torch */}
      <g id="logo-gear" transform="translate(250, 215)">
        <circle r="46" fill="#FFD000" stroke="#1E293B" strokeWidth="2.5" />
        {/* Cog teeth */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
          <rect 
            key={i} 
            x="-7" 
            y="-56" 
            width="14" 
            height="15" 
            rx="2"
            fill="#FFD000" 
            stroke="#1E293B" 
            strokeWidth="2.5" 
            transform={`rotate(${deg})`} 
          />
        ))}
        {/* Gear center hole */}
        <circle r="22" fill="#48C3FC" stroke="#1E293B" strokeWidth="2" />
      </g>

      {/* 4. Atom Model / Science Symbol (Right of Torch) */}
      <g id="logo-atom" transform="translate(365, 185)">
        {/* 3 Orbiting ellipses */}
        <ellipse cx="0" cy="0" rx="35" ry="12" stroke="#1E293B" strokeWidth="2.2" fill="none" transform="rotate(0)" />
        <ellipse cx="0" cy="0" rx="35" ry="12" stroke="#1E293B" strokeWidth="2.2" fill="none" transform="rotate(60)" />
        <ellipse cx="0" cy="0" rx="35" ry="12" stroke="#1E293B" strokeWidth="2.2" fill="none" transform="rotate(-60)" />
        {/* Atom nucleus and orbiting electrons */}
        <circle cx="0" cy="0" r="4.5" fill="#1E293B" />
        <circle cx="34" cy="0" r="3" fill="#1E293B" />
        <circle cx="-17" cy="28" r="3" fill="#1E293B" />
        <circle cx="-17" cy="-28" r="3" fill="#1E293B" />
      </g>

      {/* 5. Olympic Torch (Fluted Column Base & Red/Orange Flame) */}
      <g id="logo-torch">
        {/* Torch Flame with 3 stylized tongues */}
        <path 
          d="M 235,215 
             C 215,200 195,185 195,155 
             C 195,125 220,115 225,125 
             C 230,135 235,145 240,135 
             C 242,120 242,105 248,88 
             C 255,105 260,120 258,135 
             C 268,115 285,115 295,130 
             C 305,145 305,170 290,190 
             C 285,198 275,208 265,215 Z" 
          fill="url(#flame-grad)" 
          stroke="#1E293B" 
          strokeWidth="2.5" 
          strokeLinejoin="round"
        />

        {/* Inner flame core yellow highlight */}
        <path 
          d="M 242,205 
             C 230,195 218,175 222,155 
             C 224,145 232,145 238,155 
             C 244,140 248,130 252,118 
             C 255,130 258,145 268,155 
             C 275,165 270,185 258,205 Z" 
          fill="url(#flame-inner-glow)" 
        />

        {/* Torch Bowl / Pedestal Head */}
        <path 
          d="M 195,215 L 305,215 L 295,235 L 205,235 Z" 
          fill="#FFFFFF" 
          stroke="#1E293B" 
          strokeWidth="3" 
          strokeLinejoin="round" 
        />
        {/* Torch Fluted Pillar Stem */}
        <path 
          d="M 210,235 L 290,235 L 275,320 L 225,320 Z" 
          fill="#FFFFFF" 
          stroke="#1E293B" 
          strokeWidth="3" 
        />
        {/* Fluting lines on torch column */}
        <line x1="230" y1="235" x2="238" y2="320" stroke="#1E293B" strokeWidth="2" />
        <line x1="250" y1="235" x2="250" y2="320" stroke="#1E293B" strokeWidth="2" />
        <line x1="270" y1="235" x2="262" y2="320" stroke="#1E293B" strokeWidth="2" />
      </g>

      {/* 6. Golden Rice Wheat Stalk (Bông Lúa Vàng) on the Left */}
      <g id="logo-wheat" stroke="#1E293B" strokeWidth="1.8">
        {/* Wheat curving stem */}
        <path 
          d="M 205,340 C 160,310 115,250 125,170 C 130,130 155,100 198,90" 
          fill="none" 
          stroke="#1E293B" 
          strokeWidth="2.5" 
        />
        {/* Wheat grains */}
        {[
          { cx: 122, cy: 260, rx: 11, ry: 6, rot: -45 },
          { cx: 135, cy: 248, rx: 12, ry: 6, rot: -30 },
          { cx: 120, cy: 232, rx: 12, ry: 6, rot: -50 },
          { cx: 136, cy: 218, rx: 13, ry: 6, rot: -30 },
          { cx: 123, cy: 200, rx: 13, ry: 6, rot: -55 },
          { cx: 142, cy: 188, rx: 13, ry: 6, rot: -30 },
          { cx: 132, cy: 170, rx: 13, ry: 6, rot: -55 },
          { cx: 153, cy: 158, rx: 13, ry: 6, rot: -30 },
          { cx: 144, cy: 142, rx: 13, ry: 6, rot: -50 },
          { cx: 166, cy: 132, rx: 13, ry: 6, rot: -25 },
          { cx: 160, cy: 115, rx: 12, ry: 6, rot: -45 },
          { cx: 182, cy: 110, rx: 12, ry: 6, rot: -15 },
          { cx: 180, cy: 96, rx: 10, ry: 5, rot: -30 },
          { cx: 198, cy: 92, rx: 9, ry: 5, rot: 0 },
        ].map((g, idx) => (
          <ellipse 
            key={idx} 
            cx={g.cx} 
            cy={g.cy} 
            rx={g.rx} 
            ry={g.ry} 
            fill="#FFC72C" 
            transform={`rotate(${g.rot} ${g.cx} ${g.cy})`} 
          />
        ))}
      </g>

      {/* 7. Open Book with Golden Star on Right Page */}
      <g id="logo-book">
        {/* Left Book Page */}
        <path 
          d="M 248,255 
             C 215,248 175,240 148,245 
             L 138,345 
             C 170,338 215,348 248,375 Z" 
          fill="#FFFFFF" 
          stroke="#1E293B" 
          strokeWidth="3.2" 
          strokeLinejoin="round" 
        />
        {/* Left page thickness / lower depth */}
        <path 
          d="M 148,245 L 122,255 L 120,358 L 138,345 Z" 
          fill="#F1F5F9" 
          stroke="#1E293B" 
          strokeWidth="2.5" 
        />

        {/* Right Book Page */}
        <path 
          d="M 252,255 
             C 285,248 325,240 352,245 
             L 362,345 
             C 330,338 285,348 252,375 Z" 
          fill="#FFFFFF" 
          stroke="#1E293B" 
          strokeWidth="3.2" 
          strokeLinejoin="round" 
        />
        {/* Right page thickness / lower depth */}
        <path 
          d="M 352,245 L 378,255 L 380,358 L 362,345 Z" 
          fill="#F1F5F9" 
          stroke="#1E293B" 
          strokeWidth="2.5" 
        />

        {/* Book spine line */}
        <line x1="250" y1="255" x2="250" y2="390" stroke="#1E293B" strokeWidth="3" />

        {/* Page text line accents on left page */}
        <line x1="165" y1="275" x2="230" y2="282" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="160" y1="295" x2="232" y2="302" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="158" y1="315" x2="230" y2="322" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round" />

        {/* Golden Five-Pointed Star on right page */}
        <polygon 
          points="310,248 315,263 331,263 318,272 323,287 310,278 297,287 302,272 289,263 305,263" 
          fill="#FFD200" 
          stroke="#1E293B" 
          strokeWidth="2.2" 
          strokeLinejoin="round"
        />
      </g>

      {/* 8. Text: "TRƯỜNG THPT" along bottom-left edge */}
      <g transform="translate(142, 350) rotate(45)">
        <text 
          x="0" 
          y="0" 
          fill="#004D99" 
          fontSize="30" 
          fontWeight="900" 
          fontFamily="system-ui, -apple-system, sans-serif"
          textAnchor="middle"
          letterSpacing="2.5"
        >
          TRƯỜNG THPT
        </text>
      </g>

      {/* 9. Text: "BÙI DỤC TÀI" along bottom-right edge */}
      <g transform="translate(358, 350) rotate(-45)">
        <text 
          x="0" 
          y="0" 
          fill="#004D99" 
          fontSize="30" 
          fontWeight="900" 
          fontFamily="system-ui, -apple-system, sans-serif"
          textAnchor="middle"
          letterSpacing="2.5"
        >
          BÙI DỤC TÀI
        </text>
      </g>

      {/* 10. Outer Diamond Frame Border Stroke */}
      <polygon 
        points="250,15 485,250 250,485 15,250" 
        fill="none" 
        stroke="#1E293B" 
        strokeWidth="3.5" 
      />
    </svg>
  );
};
