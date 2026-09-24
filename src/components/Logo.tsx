import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 44, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
    aria-label="Hashim Motiwala Plastics & Polymer Engineering"
  >
    {/* Outer hexagonal ring — representing polymer molecular structure */}
    <path
      d="M60 6L106.3 32.7V86.3L60 113L13.7 86.3V32.7L60 6Z"
      stroke="#006194"
      strokeWidth="3"
      fill="none"
      opacity="0.15"
    />
    {/* Inner hexagonal ring — precision engineering */}
    <path
      d="M60 18L96.8 39.2V81.8L60 103L23.2 81.8V39.2L60 18Z"
      stroke="#006194"
      strokeWidth="2.5"
      fill="none"
      opacity="0.3"
    />
    {/* Filled hexagonal core */}
    <path
      d="M60 28L88 44.2V76.8L60 93L32 76.8V44.2L60 28Z"
      fill="#006194"
    />
    {/* Gear-tooth accents on the hex edges */}
    <rect x="56" y="4" width="8" height="10" rx="2" fill="#006194" opacity="0.5" />
    <rect x="56" y="106" width="8" height="10" rx="2" fill="#006194" opacity="0.5" />
    <rect x="6" y="30" width="10" height="8" rx="2" fill="#006194" opacity="0.5" transform="rotate(-30 6 30)" />
    <rect x="104" y="30" width="10" height="8" rx="2" fill="#006194" opacity="0.5" transform="rotate(30 104 30)" />
    <rect x="6" y="82" width="10" height="8" rx="2" fill="#006194" opacity="0.5" transform="rotate(30 6 82)" />
    <rect x="104" y="82" width="10" height="8" rx="2" fill="#006194" opacity="0.5" transform="rotate(-30 104 82)" />
    {/* "HM" Monogram */}
    <text
      x="60"
      y="68"
      textAnchor="middle"
      fill="white"
      fontFamily="'Plus Jakarta Sans', sans-serif"
      fontWeight="800"
      fontSize="32"
      letterSpacing="-1"
    >
      HM
    </text>
    {/* Molecule connection dots */}
    <circle cx="60" cy="6" r="3" fill="#006194" />
    <circle cx="106.3" cy="32.7" r="3" fill="#006194" />
    <circle cx="106.3" cy="86.3" r="3" fill="#006194" />
    <circle cx="60" cy="113" r="3" fill="#006194" />
    <circle cx="13.7" cy="86.3" r="3" fill="#006194" />
    <circle cx="13.7" cy="32.7" r="3" fill="#006194" />
  </svg>
);

export default Logo;
