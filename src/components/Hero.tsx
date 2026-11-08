import React from 'react';
import { 
  ArrowRight, 
  Sparkles,
  CheckCircle2,
  BookOpen,
  Calendar,
  ShieldCheck,
  Star,
  Users,
  Award
} from 'lucide-react';

interface HeroProps {
  onEnrollNow: () => void;
  onBookFreeTrial: () => void;
  onExploreCourses: () => void;
  onOpenQuranReader?: () => void;
  onOpenWhatsApp?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onEnrollNow,
  onBookFreeTrial,
  onExploreCourses,
  onOpenQuranReader,
  onOpenWhatsApp
}) => {
  const handleWhatsApp = () => {
    if (onOpenWhatsApp) {
      onOpenWhatsApp();
    } else {
      window.open('https://wa.me/923068959085?text=Assalam-o-Alaikum%20True%20Way%20Quran%2C%20I%20would%20like%20to%20book%20a%20Free%20Trial%20Class%20for%20my%20child.', '_blank');
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#f3e8ff]/50 via-white to-[#faf8ff] text-slate-900 pt-10 pb-16 lg:pt-16 lg:pb-22 border-b border-[#6B1B7E]/10">
      
      {/* Background Aurora Glows preserving exact brand colors #6B1B7E and #E0107F */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[750px] h-[380px] bg-[#6B1B7E]/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-1/4 w-[520px] h-[400px] bg-[#E0107F]/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        
        {/* Main Required Headline */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#6B1B7E] leading-[1.14]">
            Learn the Holy Quran Online <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B1B7E] via-[#5B2A9A] to-[#E0107F]">
              Anytime, Anywhere
            </span>
          </h1>

          {/* Main Required Description */}
          <p className="text-slate-600 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed pt-1">
            Start your Quran learning journey with experienced teachers, personalized online classes and a structured learning program for children and adults worldwide.
          </p>
        </div>

        {/* Action Buttons: Enroll Now, Book a Free Trial Class, Read Holy Quran */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          
          {/* Primary CTA: Enroll Now */}
          <button
            onClick={onEnrollNow}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#6B1B7E] via-[#5B2A9A] to-[#E0107F] hover:from-[#5B2A9A] hover:to-[#6B1B7E] text-white font-black text-sm rounded-2xl shadow-lg shadow-purple-900/20 hover:shadow-xl hover:shadow-purple-900/30 transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 group"
          >
            <span>Enroll Now</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Secondary CTA: Book a Free Trial Class */}
          <button
            onClick={onBookFreeTrial}
            className="w-full sm:w-auto px-7 py-4 bg-white hover:bg-purple-50 text-[#6B1B7E] font-bold text-sm rounded-2xl border-2 border-[#6B1B7E]/30 hover:border-[#6B1B7E] transition shadow-xs cursor-pointer flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4 text-[#E0107F]" />
            <span>Book a Free Trial Class</span>
          </button>

          {/* Tertiary CTA: Read Holy Quran Reader */}
          {onOpenQuranReader && (
            <button
              onClick={onOpenQuranReader}
              className="w-full sm:w-auto px-7 py-4 bg-purple-50 hover:bg-purple-100 text-[#5B2A9A] font-bold text-sm rounded-2xl border border-purple-200 transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <BookOpen className="w-4 h-4 text-[#6B1B7E]" />
              <span>Full Quran Reader (114 Surahs)</span>
            </button>
          )}
        </div>

        {/* WhatsApp & Instant Contact Callout */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium">Direct Admissions Desk:</span>
            <button 
              onClick={handleWhatsApp}
              className="font-bold text-emerald-700 hover:underline cursor-pointer"
            >
              +92 306 8959085 (WhatsApp)
            </button>
          </div>
          <span className="hidden sm:inline text-slate-300">|</span>
          <div className="flex items-center gap-1 text-slate-500">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#E0107F]" />
            <span>3 Days Free Trial · Male & Female Teachers · 24/7 Schedule</span>
          </div>
        </div>

        {/* Verified Academy Statistics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#6B1B7E]/10 max-w-4xl mx-auto">
          <div className="p-4 bg-white rounded-2xl border border-[#6B1B7E]/15 shadow-2xs text-center">
            <span className="block text-3xl font-black text-[#6B1B7E]">1,200+</span>
            <span className="text-xs text-slate-500 font-semibold">Active Students</span>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-[#6B1B7E]/15 shadow-2xs text-center">
            <span className="block text-3xl font-black text-[#E0107F]">100%</span>
            <span className="text-xs text-slate-500 font-semibold">Certified Qari & Hafiz</span>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-[#6B1B7E]/15 shadow-2xs text-center">
            <span className="block text-3xl font-black text-[#6B1B7E]">25+</span>
            <span className="text-xs text-slate-500 font-semibold">Countries Worldwide</span>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-[#6B1B7E]/15 shadow-2xs text-center">
            <span className="block text-3xl font-black text-[#E0107F]">4.98 ★</span>
            <span className="text-xs text-slate-500 font-semibold">Parent & Student Rating</span>
          </div>
        </div>

      </div>
    </div>
  );
};
