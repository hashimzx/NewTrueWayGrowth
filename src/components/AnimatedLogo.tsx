import React, { useState } from 'react';

interface AnimatedLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showUrl?: boolean;
  className?: string;
  lightBg?: boolean;
}

/**
 * AnimatedLogo - True Way Quran
 * Implemented strictly according to official brand JSON specifications:
 * - Palette: primary_purple: #6B1B7E, violet: #5B2A9A, magenta: #E0107F, white: #FFFFFF, silver: #C8C8C8
 * - Elements:
 *    1. Arabic Calligraphy ("القرآن الكريم"): Square Kufic with linear-gradient top-to-bottom #5B2A9A to #E0107F
 *    2. TRUE WAY Box: rectangle #6B1B7E with gradient text #FFFFFF to #C8C8C8
 *    3. QURAN Box: white rectangle with thick #6B1B7E border and wide tracking #6B1B7E text
 *    4. WWW.TRUEWAYQURAN.COM: very-wide tracked #6B1B7E text
 * - Animations: Smooth holographic sheen sweep, gentle calligraphy shimmer, and ambient aura glow
 */
export const AnimatedLogo: React.FC<AnimatedLogoProps> = ({
  size = 'md',
  showUrl = true,
  className = '',
  lightBg = true
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Height configurations mapping cleanly across layouts (prominent & readable)
  const heightClasses = {
    xs: 'h-8 sm:h-9',
    sm: 'h-11 sm:h-12 md:h-13',
    md: 'h-14 sm:h-16 md:h-18',
    lg: 'h-20 sm:h-22 md:h-24',
    xl: 'h-26 sm:h-28 md:h-32'
  }[size];

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

        {/* Pure Vector In-Code Logo (SVG & CSS Animations) */}
        <div className="relative overflow-hidden rounded-lg flex items-center">
          <svg
            viewBox={showUrl ? "0 0 440 172" : "0 0 440 152"}
            className={`${heightClasses} w-auto object-contain transition-all duration-300`}
            style={{ filter: isHovered ? 'drop-shadow(0 0 8px rgba(224, 16, 127, 0.3))' : 'none' }}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* 1. Official Arabic Calligraphy Gradient: #5B2A9A (Violet) to #E0107F (Magenta) */}
              <linearGradient id="twqArabicGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5B2A9A" />
                <stop offset="50%" stopColor="#6B1B7E" />
                <stop offset="100%" stopColor="#E0107F" />
              </linearGradient>

              {/* 2. TRUE WAY Text Gradient: #FFFFFF to #C8C8C8 (Silver) */}
              <linearGradient id="twqTrueWayTextGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#C8C8C8" />
              </linearGradient>

              {/* 3. Dynamic Animated Sheen Sweep Gradient */}
              <linearGradient id="twqSheenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="45%" stopColor="#ffffff" stopOpacity="0.45" />
                <stop offset="55%" stopColor="#ffffff" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>

              {/* 4. Underline Laser Gradient */}
              <linearGradient id="twqLaserUnderline" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6B1B7E" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#E0107F" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#6B1B7E" stopOpacity="0.1" />
              </linearGradient>

              {/* Clip path for TRUE WAY sheen sweep */}
              <clipPath id="trueWayClip">
                <rect x="154" y="4" width="282" height="70" rx="0" />
              </clipPath>

              {/* Clip path for Arabic calligraphy sheen sweep */}
              <clipPath id="arabicCalligraphyClip">
                <rect x="2" y="2" width="144" height="144" rx="0" />
              </clipPath>
            </defs>

            {/* ====================================================================== */}
            {/* 1. LEFT SECTION: SQUARE KUFIC CALLIGRAPHY ("القرآن الكريم")              */}
            {/* ====================================================================== */}
            <g id="arabic_calligraphy" clipPath="url(#arabicCalligraphyClip)">
              <g
                transform="translate(4, 4) scale(0.9726, 0.9729)"
                className="transition-transform duration-300"
              >
                <path
                  d="M 130.309 3.250 C 129.864 3.938, 129.500 16.425, 129.500 31 L 129.500 57.500 120 58 L 110.500 58.500 110.185 62.901 C 109.982 65.745, 110.335 67.597, 111.185 68.136 C 112.688 69.089, 135.348 69.281, 138.750 68.370 L 141 67.767 141 36.083 C 141 12.774, 140.683 4.083, 139.800 3.200 C 138.219 1.619, 131.341 1.655, 130.309 3.250 M 40.732 3.724 C 39.094 4.122, 38.983 5.867, 39.232 27.327 L 39.500 50.500 44.750 50.802 L 50 51.105 50 33.552 L 50 16 55.250 15.889 C 58.138 15.828, 61.488 15.857, 62.695 15.954 C 63.903 16.050, 65.815 15.634, 66.945 15.029 C 68.478 14.209, 69 12.941, 69 10.036 C 69 3.799, 67.736 3.216, 54.289 3.258 C 47.805 3.278, 41.704 3.488, 40.732 3.724 M 75.200 4.200 C 73.900 5.500, 73.664 9.143, 74.643 12.798 C 75.198 14.870, 75.761 15.066, 80.379 14.798 L 85.500 14.500 85.811 10.176 C 85.982 7.798, 85.590 5.210, 84.939 4.426 C 83.500 2.693, 76.862 2.538, 75.200 4.200 M 93.406 4.386 C 93.113 5.148, 93.015 7.735, 93.187 10.136 L 93.500 14.500 98.750 14.802 L 104 15.105 104 9.052 L 104 3 98.969 3 C 95.603 3, 93.761 3.459, 93.406 4.386 M 111.498 4.195 C 111.233 4.913, 110.900 13.150, 110.758 22.500 C 110.503 39.289, 110.472 39.504, 108.246 39.820 C 106.996 39.998, 105.754 39.522, 105.458 38.752 C 105.166 37.989, 104.762 34.020, 104.561 29.932 C 104.360 25.845, 104.151 22.150, 104.098 21.723 C 104.044 21.295, 97.588 21.070, 89.750 21.223 L 75.500 21.500 75.500 36 L 75.500 50.500 84.810 50.788 L 94.121 51.077 93.810 54.288 L 93.500 57.500 80.773 57.780 L 68.045 58.059 67.773 39.780 L 67.500 21.500 63.114 21.186 C 60.702 21.013, 58.301 21.299, 57.779 21.821 C 57.243 22.357, 56.883 30.426, 56.952 40.385 L 57.075 58 52.287 58.203 C 49.654 58.314, 46.150 58.500, 44.500 58.617 C 42.850 58.733, 40.938 58.866, 40.250 58.914 C 38.395 59.042, 38.564 68.895, 40.433 69.613 C 41.222 69.915, 55.959 69.789, 73.183 69.331 L 104.500 68.500 104.794 60.032 C 104.956 55.374, 105.550 51.278, 106.116 50.929 C 106.681 50.579, 110.187 50.475, 113.907 50.698 C 118.704 50.984, 120.940 50.724, 121.597 49.801 C 122.138 49.042, 122.310 39.118, 122.012 26 L 121.500 3.500 116.740 3.195 C 113.507 2.988, 111.825 3.308, 111.498 4.195 M 2.713 4.621 C 2.321 5.013, 2 7.757, 2 10.719 L 2 16.105 7.250 15.802 L 12.500 15.500 12.500 10 L 12.500 4.500 7.963 4.204 C 5.467 4.041, 3.105 4.229, 2.713 4.621 M 20.805 4.698 C 20.697 5.139, 20.585 17.425, 20.555 32 L 20.500 58.500 16.773 58.809 L 13.046 59.118 12.773 40.809 L 12.500 22.500 7.232 22.197 L 1.964 21.894 2.232 45.697 L 2.500 69.500 17 69.500 L 31.500 69.500 31.500 37 L 31.500 4.500 26.250 4.198 C 23.362 4.031, 20.912 4.256, 20.805 4.698 M 86 36.060 L 86 40.121 89.750 39.810 C 93.055 39.537, 93.539 39.157, 93.830 36.609 C 94.205 33.327, 92.778 32.038, 88.750 32.015 C 86.199 32.001, 86 32.294, 86 36.060 M 131.250 75.662 C 130.287 76.051, 130 83.446, 130 107.883 C 130 131.219, 130.317 139.917, 131.200 140.800 C 132.896 142.496, 139.509 142.296, 140.997 140.504 C 141.963 139.340, 142.075 132.065, 141.501 107.754 C 140.995 86.344, 140.406 76.269, 139.631 75.765 C 138.370 74.946, 133.182 74.883, 131.250 75.662 M 16.308 76.758 C 4.828 77.018, 3.056 77.281, 2.653 78.779 C 2.397 79.725, 2.484 94.450, 2.844 111.500 L 3.500 142.500 16.998 142.667 C 25.118 142.767, 30.995 142.419, 31.748 141.794 C 32.437 141.223, 33 139.047, 33 136.959 C 33 130.160, 32.768 130, 22.893 130 L 14 130 14 118.023 L 14 106.045 32.250 105.773 L 50.500 105.500 50.690 98.500 C 50.794 94.650, 50.906 90.713, 50.940 89.750 C 50.992 88.227, 52.089 88, 59.383 88 C 68.782 88, 68.989 87.821, 68.026 80.500 L 67.500 76.500 54.046 76.787 C 46.646 76.945, 40.377 77.289, 40.115 77.551 C 39.853 77.814, 39.607 81.233, 39.569 85.150 C 39.514 90.795, 39.137 92.503, 37.750 93.381 C 36.477 94.188, 35.523 94.190, 34.250 93.391 C 32.909 92.550, 32.383 90.468, 32 84.476 C 31.725 80.176, 31.050 76.613, 30.500 76.559 C 29.950 76.504, 23.564 76.594, 16.308 76.758 M 75.599 77.602 C 75.261 78.483, 75.278 89.171, 75.637 101.352 C 76.060 115.711, 76.678 123.762, 77.395 124.246 C 78.003 124.657, 79.175 124.942, 80 124.881 C 80.825 124.820, 84.313 124.822, 87.750 124.885 C 93.188 124.985, 94 125.247, 94 126.904 C 94 128.606, 92.916 128.881, 83.750 129.506 C 78.112 129.890, 72.375 130.046, 71 129.852 L 68.500 129.500 68 112 L 67.500 94.500 62.250 94.198 C 58.477 93.981, 56.979 94.262, 56.925 95.198 C 56.883 95.914, 56.913 102.412, 56.991 109.637 C 57.069 116.862, 56.828 124.400, 56.455 126.387 L 55.777 130 47.889 130 L 40 130 40 136.011 L 40 142.022 81.750 141.761 L 123.500 141.500 123.125 109.500 C 122.919 91.900, 122.555 77.162, 122.316 76.750 C 122.077 76.338, 119.659 76, 116.941 76 L 112 76 112 102.500 L 112 129 109.019 129 C 105.593 129, 105.162 127.940, 104.757 118.500 L 104.500 112.500 95.750 112.211 L 87 111.922 87 99.961 L 87 88 90 88 C 91.654 88, 93.066 88.561, 93.148 89.250 C 93.229 89.938, 93.388 91.175, 93.500 92 C 93.612 92.825, 93.771 96.088, 93.852 99.250 L 94 105 99 105 L 104 105 104 90.500 L 104 76 90.107 76 C 78.287 76, 76.122 76.239, 75.599 77.602 M 14.713 88.621 C 14.321 89.013, 14 90.412, 14 91.730 C 14 93.832, 14.400 94.088, 17.250 93.813 C 19.966 93.551, 20.500 93.090, 20.500 91 C 20.500 89.068, 19.924 88.433, 17.963 88.204 C 16.567 88.041, 15.104 88.229, 14.713 88.621 M 22.568 112.765 C 22.256 113.078, 22 115.910, 22 119.060 C 22 123.359, 22.394 124.937, 23.582 125.393 C 26.189 126.393, 30.519 126.081, 31.800 124.800 C 33.393 123.207, 33.356 114.338, 31.752 113.347 C 30.235 112.409, 23.360 111.974, 22.568 112.765 M 41.250 113.083 C 39.338 113.807, 39 114.673, 39 118.845 C 39 121.603, 39.559 124.219, 40.274 124.813 C 40.997 125.412, 43.397 125.622, 45.818 125.298 L 50.088 124.725 49.794 118.612 C 49.504 112.587, 49.457 112.498, 46.500 112.365 C 44.850 112.291, 42.487 112.614, 41.250 113.083"
                  fill="url(#twqArabicGrad)"
                  fillRule="evenodd"
                />
              </g>

              {/* Shimmer sweep effect across Arabic calligraphy */}
              <rect
                x="0"
                y="0"
                width="80"
                height="150"
                fill="url(#twqSheenGrad)"
                className="animate-holo-sheen pointer-events-none opacity-40"
              />
            </g>

            {/* ====================================================================== */}
            {/* 2. RIGHT SECTION: TWO RECTANGULAR BADGES (TRUE WAY / QURAN)            */}
            {/* ====================================================================== */}
            <g id="brandBadgesSection">
              {/* --- TOP BADGE: SOLID PRIMARY PURPLE (#6B1B7E) WITH GRADIENT "TRUE WAY" --- */}
              <g id="true_way_box">
                {/* Background #6B1B7E matching exact JSON */}
                <rect
                  x="154"
                  y="4"
                  width="282"
                  height="70"
                  fill="#6B1B7E"
                />

                {/* Animated Holographic Sheen Sweep (CSS Animated) */}
                <g clipPath="url(#trueWayClip)">
                  <rect
                    x="120"
                    y="0"
                    width="70"
                    height="80"
                    fill="url(#twqSheenGrad)"
                    className="animate-holo-sheen pointer-events-none"
                  />
                </g>

                {/* Bold Sans-Serif Typography: TRUE WAY with #FFFFFF to #C8C8C8 fill */}
                <text
                  x="295"
                  y="52"
                  textAnchor="middle"
                  fill="url(#twqTrueWayTextGrad)"
                  fontFamily="'Plus Jakarta Sans', Montserrat, system-ui, -apple-system, sans-serif"
                  fontWeight="900"
                  fontSize="34"
                  letterSpacing="0.04em"
                >
                  TRUE WAY
                </text>
              </g>

              {/* --- MIDDLE BADGE: WHITE (#FFFFFF) WITH THICK #6B1B7E BORDER & "QURAN" --- */}
              <g id="quran_box">
                {/* White Enclosure with Thick Solid Purple Border #6B1B7E */}
                <rect
                  x="154"
                  y="74"
                  width="282"
                  height="74"
                  fill="#FFFFFF"
                  stroke="#6B1B7E"
                  strokeWidth="5"
                />

                {/* Bold Sans-Serif Typography: QURAN in #6B1B7E (Wide Tracking) */}
                <text
                  x="295"
                  y="126"
                  textAnchor="middle"
                  fill="#6B1B7E"
                  fontFamily="'Plus Jakarta Sans', Montserrat, system-ui, -apple-system, sans-serif"
                  fontWeight="900"
                  fontSize="36"
                  letterSpacing="0.22em"
                >
                  QURAN
                </text>
              </g>
            </g>

            {/* ====================================================================== */}
            {/* 3. BOTTOM-RIGHT SECTION: WWW.TRUEWAYQURAN.COM                           */}
            {/* ====================================================================== */}
            {showUrl && (
              <g id="website_url">
                <text
                  x="220"
                  y="166"
                  textAnchor="middle"
                  fill="#6B1B7E"
                  fontFamily="'Plus Jakarta Sans', Montserrat, system-ui, -apple-system, sans-serif"
                  fontWeight="900"
                  fontSize="11.5"
                  letterSpacing="0.26em"
                >
                  W W W . T R U E W A Y Q U R A N . C O M
                </text>

                {/* Subtle Laser Underline on Hover */}
                {isHovered && (
                  <line
                    x1="10"
                    y1="171"
                    x2="430"
                    y2="171"
                    stroke="url(#twqLaserUnderline)"
                    strokeWidth="1.5"
                    strokeDasharray="40 160"
                    className="animate-laser-runner"
                  />
                )}
              </g>
            )}
          </svg>
        </div>
      </div>
    </div>
  );
};
