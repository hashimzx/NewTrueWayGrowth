import React from 'react';
import { 
  ArrowRight
} from 'lucide-react';

interface SpecializedClassesProps {
  onBookTrial: (category: 'kids' | 'adults' | 'female') => void;
  onExploreQaida: () => void;
}

export const SpecializedClasses: React.FC<SpecializedClassesProps> = ({
  onBookTrial,
  onExploreQaida
}) => {
  const tracks = [
    {
      id: 'kids' as const,
      badge: 'Ages 4 to 15',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
      title: 'Online Quran Classes for Kids',
      subtitle: 'Gentle, Fun & Structured Foundation',
      description: 'Engaging, interactive lessons designed specifically for children. Our patient teachers use gamified rewards, short 30-minute focused sessions, and visual Qaida tools to help young learners fall in love with the Holy Quran.',
      features: [
        'Interactive Madani Qaida with voice feedback',
        'Patient & child-psychology trained tutors',
        '30-minute attention-span friendly sessions',
        'Monthly progress reports & star achievements',
        'Safe, supervised child-friendly online classroom'
      ],
      cardGradient: 'from-amber-500/10 via-purple-50 to-white',
      borderHover: 'hover:border-amber-400',
      ctaText: 'Book Free Trial for My Child'
    },
    {
      id: 'female' as const,
      badge: '100% Female Tutors',
      badgeColor: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-300',
      title: 'Quran Classes for Female Students & Sisters',
      subtitle: 'Complete Modesty, Privacy & Qualified Alimahs',
      description: 'Dedicated one-on-one sessions taught exclusively by certified female scholars (Hafizahs & Alimahs). Designed for sisters, working women, and mothers seeking a comfortable, dignified environment to master Tajweed at their own pace.',
      features: [
        '100% Certified Native & International Female Tutors',
        'Total privacy in secure 1-on-1 virtual rooms',
        'Flexible schedules around family and work life',
        'Special modules on Daily Salah, Duas & Motherhood',
        'Ijazah preparation & Quran memorization pathways'
      ],
      cardGradient: 'from-fuchsia-500/10 via-purple-50 to-white',
      borderHover: 'hover:border-fuchsia-400',
      ctaText: 'Book Free Trial with Female Tutor'
    },
    {
      id: 'adults' as const,
      badge: 'Beginner to Advanced',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
      title: 'Online Quran Classes for Adults & Brothers',
      subtitle: 'Flexible Scheduling for Busy Professionals',
      description: 'It is never too late to learn to recite the Holy Quran correctly. Our adult curriculum accommodates university students and professionals with round-the-clock 24/7 flexibility, zero judgment, and rapid Tajweed improvement.',
      features: [
        'Zero-embarrassment supportive adult learning',
        'Flexible 24/7 time slots: Early morning, evening & weekend',
        'Practical Tajweed rules applied directly to the Mushaf',
        'Word-by-word Quran translation & Tafseer reflection',
        'Accelerated personalized 1-on-1 tutor pace'
      ],
      cardGradient: 'from-purple-500/10 via-indigo-50 to-white',
      borderHover: 'hover:border-purple-400',
      ctaText: 'Book Free Adult Consultation'
    }
  ];

  return (
    <section className="py-16 bg-[#faf8ff] border-y border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-purple-950">
            Dedicated Quran Classes for Kids, Adults & Sisters
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Every student learns differently. We offer specialized tracks with certified male and female scholars, customized teaching speeds, and international timezone flexibility.
          </p>
        </div>

        {/* 3 Specialized Tracks: Desktop Grid + Mobile Swipeable Carousel */}
        <div className="relative">
          <div className="flex lg:grid lg:grid-cols-3 gap-6 overflow-x-auto lg:overflow-visible snap-x snap-mandatory no-scrollbar pb-4 pt-1 px-1">
            {tracks.map((track) => {
              return (
                <div
                  key={track.id}
                  className={`min-w-[85vw] sm:min-w-[360px] lg:min-w-0 snap-center bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 ${track.borderHover} shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden`}
                >
                  {/* Background soft ambient tint */}
                  <div className={`absolute top-0 right-0 w-44 h-44 bg-gradient-to-br ${track.cardGradient} rounded-full blur-2xl -z-0 opacity-80`} />

                  <div className="relative z-10 space-y-5">
                    
                    {/* Badge */}
                    <div className="flex items-center justify-between">
                      <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full border ${track.badgeColor}`}>
                        {track.badge}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-purple-950 group-hover:text-purple-700 transition-colors">
                        {track.title}
                      </h3>
                      <p className="text-xs font-bold text-purple-600 mt-1">
                        {track.subtitle}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {track.description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-2 pt-2 border-t border-purple-100/80">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-purple-950 block">
                        Program Highlights:
                      </span>
                      {track.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-1.5 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="relative z-10 pt-6 mt-6 border-t border-purple-100">
                    <button
                      onClick={() => onBookTrial(track.id)}
                      className="w-full py-3.5 px-4 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-bold rounded-xl text-xs transition shadow-md hover:shadow-purple-500/20 flex items-center justify-center gap-2 group/btn cursor-pointer"
                    >
                      <span>{track.ctaText}</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Swipe Hint and Track Indicator */}
          <div className="flex lg:hidden items-center justify-center gap-2 pt-2 text-xs text-slate-400 font-bold">
            <span>← Swipe to explore Kids, Sisters & Adults tracks →</span>
          </div>
        </div>

        {/* 3 Days Free Trial Guarantee Strip with Original Brand Logo */}
        <div className="bg-gradient-to-r from-purple-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-14 bg-white rounded-2xl p-1.5 flex items-center justify-center shadow-md shrink-0">
              <img
                src="/assets/aistudio/image_9a2a600b_trimmed.png"
                alt="True Way Quran"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-bold">Start with 3 Days Free Trial Classes</h4>
              <p className="text-xs text-purple-200 mt-0.5">
                Experience our 1-on-1 personalized teaching first. No credit card or advance commitment required.
              </p>
            </div>
          </div>

          <button
            onClick={() => onBookTrial('kids')}
            className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-purple-950 font-black rounded-xl text-xs sm:text-sm transition shadow-lg shrink-0"
          >
            Claim 3-Day Free Trial
          </button>
        </div>
      </div>
    </section>
  );
};
