import React, { useState } from 'react';

interface AnimatedLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'responsive';
  showUrl?: boolean;
  className?: string;
  lightBg?: boolean;
}

/**
 * AnimatedLogo - True Way Quran
 * Uses the authentic, original high-resolution logo image (/assets/aistudio/true_way_logo_trimmed.png)
 * featuring the genuine Square Kufic calligraphy, TRUE WAY and QURAN boxes, and www.truewayquran.com.
 */
export const AnimatedLogo: React.FC<AnimatedLogoProps> = ({
  size = 'md',
  className = '',
  lightBg = true
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Height configurations mapping cleanly across layouts (prominent & readable)
  const heightClasses: Record<string, string> = {
    xs: 'h-8 sm:h-9',
    sm: 'h-10 sm:h-11 md:h-12',
    md: 'h-13 sm:h-15 md:h-16',
    lg: 'h-18 sm:h-20 md:h-22',
    xl: 'h-24 sm:h-26 md:h-28',
    responsive: 'h-11 sm:h-13 md:h-15'
  };

  const selectedHeight = heightClasses[size] || heightClasses.md;

  return (
    <div
      className={`inline-flex items-center group select-none transition-all duration-300 cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title="True Way Quran - Online Quran Academy"
    >
      {/* Outer Chassis with Brand Aura Glow */}
      <div
        className={`relative flex items-center justify-center rounded-xl transition-all duration-300 transform group-hover:scale-[1.02] ${
          size === 'xs'
            ? 'bg-white p-0.5 sm:p-1 shadow-xs border border-purple-100/90 hover:border-[#E0107F]/40'
            : lightBg
            ? 'bg-white p-1 sm:p-1.5 shadow-sm border border-purple-100/90 hover:border-[#E0107F]/40 hover:shadow-md'
            : 'bg-white p-1.5 sm:p-2 shadow-lg border border-purple-200 hover:border-[#E0107F]/50 hover:shadow-xl'
        }`}
      >
        {/* Ambient Neon Aurora Glow on hover matching brand palette */}
        <div
          className={`absolute -inset-1 rounded-xl transition-opacity duration-500 pointer-events-none blur-lg bg-gradient-to-r from-[#6B1B7E] via-[#5B2A9A] to-[#E0107F] ${
            isHovered ? 'opacity-40' : 'opacity-0'
          }`}
        />

        {/* Authentic Original Logo Image */}
        <img
          src="/assets/aistudio/true_way_logo_trimmed.png"
          alt="True Way Quran Logo"
          className={`${selectedHeight} w-auto object-contain transition-all duration-300 relative z-10`}
          style={{ filter: isHovered ? 'drop-shadow(0 0 6px rgba(224, 16, 127, 0.25))' : 'none' }}
          loading="eager"
        />
      </div>
    </div>
  );
};
