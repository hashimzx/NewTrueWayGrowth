import React from 'react';
import { 
  Calendar, 
  UserCheck, 
  Clock, 
  Video, 
  Sparkles, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface HowItWorksProps {
  onBookFreeTrial?: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onBookFreeTrial }) => {
  const steps = [
    {
      num: '01',
      title: 'Book a Free 3-Day Trial',
      desc: 'Fill out our quick 1-minute trial form. Select your preferred course, days, and whether you prefer a male or female teacher.',
      icon: Calendar,
      detail: 'No credit card required'
    },
    {
      num: '02',
      title: 'Free Level Diagnostic & Matching',
      desc: 'A certified scholar conducts a short 15-minute diagnostic to evaluate your child\'s reading level and assign the ideal instructor.',
      icon: UserCheck,
      detail: 'Personalized assessment'
    },
    {
      num: '03',
      title: 'Select Your Timetable & Schedule',
      desc: 'Choose the exact days and time slots that suit your family routine. We support flexible schedules 24 hours a day, 7 days a week.',
      icon: Clock,
      detail: 'Flexible international hours'
    },
    {
      num: '04',
      title: 'Start Live 1-on-1 Quran Classes',
      desc: 'Connect easily via Zoom or Google Meet. Watch your child build confidence with interactive digital whiteboards and daily teacher notes.',
      icon: Video,
      detail: 'Live screen sharing'
    }
  ];

  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-white border-b border-[#6B1B7E]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-[#6B1B7E] text-xs font-bold border border-purple-200">
            <Sparkles className="w-3.5 h-3.5 text-[#E0107F]" />
            <span>Simple Enrollment Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            How It Works
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Starting your Quran learning journey at True Way Quran takes less than 2 minutes. Follow these 4 easy steps to begin.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx}
                className="relative p-7 rounded-3xl bg-purple-50/40 hover:bg-white border border-purple-100 hover:border-purple-300 transition-all duration-200 shadow-xs hover:shadow-xl flex flex-col justify-between space-y-5 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#6B1B7E] to-[#E0107F]">
                    {step.num}
                  </span>
                  <div className="w-11 h-11 rounded-2xl bg-white text-[#6B1B7E] group-hover:bg-[#6B1B7E] group-hover:text-white flex items-center justify-center shadow-xs border border-purple-100 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-[#6B1B7E] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-purple-100/60 flex items-center justify-between text-[11px] font-semibold text-slate-500">
                  <span className="text-emerald-700 font-bold">{step.detail}</span>
                  <span className="text-[#6B1B7E]">Step {idx + 1} of 4</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          {onBookFreeTrial && (
            <button
              onClick={onBookFreeTrial}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#6B1B7E] via-[#5B2A9A] to-[#E0107F] hover:from-[#5B2A9A] hover:to-[#6B1B7E] text-white font-bold text-sm rounded-xl shadow-md transition cursor-pointer"
            >
              <span>Start Step 1: Book Your 3-Day Free Trial</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </section>
  );
};
