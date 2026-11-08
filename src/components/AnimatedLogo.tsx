import React, { useState } from 'react';

interface AnimatedLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'responsive';
  variant?: 'trimmed' | 'square' | 'growth' | 'quran';
  showUrl?: boolean;
  className?: string;
  lightBg?: boolean;
}

/**
 * AnimatedLogo - True Way Quran
 * Official Brand Identity:
 * - Square Kufic calligraphy "القرآن الكريم" stacked in two lines with plum-to-magenta vertical gradient (#561F79 -> #851C82 -> #C72F8A)
 * - Stacked name block: "TRUE WAY" on #6E1373 and "QURAN" bordered in #6E1373
 * - URL tracking line: WWW.TRUEWAYQURAN.COM
 * Features continuous subtle floating pulse, ambient aura glow, and timed diagonal sheen sweep.
 */
export const AnimatedLogo: React.FC<AnimatedLogoProps> = ({
  size = 'responsive',
  variant = 'trimmed',
  className = '',
  lightBg = true
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Height configurations optimized across all breakpoints
  const heightClasses: Record<string, string> = {
    xs: 'h-7 sm:h-8',
    sm: 'h-9 sm:h-10',
    md: 'h-11 sm:h-13',
    lg: 'h-14 sm:h-16',
    xl: 'h-18 sm:h-22',
    responsive: 'h-10 sm:h-12 md:h-13'
  };

  const selectedHeight = heightClasses[size] || heightClasses.responsive;
  const isSquare = variant === 'square';
  const logoSrc = isSquare 
    ? '/assets/aistudio/image_9a2a600b.png' 
    : '/assets/aistudio/image_9a2a600b_trimmed.png';

  return (
    <div
      className={`inline-flex items-center group select-none cursor-pointer transition-all duration-300 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title="True Way Quran – www.truewayquran.com"
      role="img"
      aria-label="True Way Quran Logo"
    >
      <div
        className={`relative flex items-center justify-center rounded-2xl transition-all duration-500 transform group-hover:scale-[1.03] ${
          size === 'xs'
            ? 'bg-white p-0.5 sm:p-1 shadow-xs border border-[#6E1373]/15'
            : lightBg
            ? 'bg-white p-1 sm:p-1.5 shadow-xs border border-[#6E1373]/15 hover:border-[#C72F8A]/40 hover:shadow-md'
            : 'bg-white p-1.5 sm:p-2 shadow-lg border border-[#6E1373]/25 hover:border-[#C72F8A]/50 hover:shadow-xl'
        }`}
      >
        {/* Animated Plum-to-Magenta Halo Aura behind logo */}
        <div
          className={`absolute -inset-1.5 rounded-2xl transition-opacity duration-700 pointer-events-none blur-md bg-gradient-to-r from-[#561F79] via-[#851C82] to-[#C72F8A] ${
            isHovered ? 'opacity-50 animate-logo-aura' : 'opacity-25'
          }`}
        />

        {/* Ambient Pulsing Glow Underneath */}
        <div className="absolute inset-0 rounded-2xl bg-white shadow-xs z-0" />

        {/* Logo Container with Subtle Floating Breathing Animation */}
        <div className="relative z-10 overflow-hidden rounded-xl flex items-center justify-center animate-logo-float">
          
          {/* Official True Way Quran Logo */}
          <img
            src={logoSrc}
            alt="True Way Quran - www.truewayquran.com"
            className={`${selectedHeight} w-auto object-contain transition-transform duration-300 relative z-10`}
            loading="eager"
          />

          {/* Timed Diagonal Sheen Sweep over the Calligraphy and Letterforms */}
          <div 
            className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-hidden"
          >
            <div 
              className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/45 to-transparent animate-logo-gleam"
            />
          </div>
        </div>

        {/* Micro Sparkle Indicator for Active Digital Academy */}
        <span 
          className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#C72F8A] border-2 border-white shadow-xs animate-ping pointer-events-none" 
        />
        <span 
          className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#C72F8A] border-2 border-white shadow-xs pointer-events-none" 
        />
      </div>
    </div>
  );
};
