import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  MessageCircle, 
  BookOpen
} from 'lucide-react';

interface HeroProps {
  onStartQaida: () => void;
  onExploreCourses: () => void;
  onOpenQuranReader: () => void;
  onOpenEnroll: () => void;
  onOpenWhatsApp?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartQaida,
  onExploreCourses,
  onOpenQuranReader,
  onOpenEnroll,
  onOpenWhatsApp
}) => {
  const handleWhatsApp = () => {
    if (onOpenWhatsApp) {
      onOpenWhatsApp();
    } else {
      window.open('https://wa.me/923068959085?text=Assalam-o-Alaikum%20Abdul%20Basit%2C%20I%20want%20to%20enroll%20in%20the%20Online%20Quran%20Teacher%20Course', '_blank');
    }
  };

  const countries = [
    { name: 'United Kingdom', flag: '🇬🇧' },
    { name: 'United States', flag: '🇺🇸' },
    { name: 'Canada', flag: '🇨🇦' },
    { name: 'Australia', flag: '🇦🇺' },
    { name: 'Malaysia', flag: '🇲🇾' },
    { name: 'Saudi Arabia', flag: '🇸🇦' },
    { name: 'Pakistan', flag: '🇵🇰' }
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#f3e8ff]/50 via-white to-[#faf8ff] text-slate-900 pt-12 pb-16 lg:pt-18 lg:pb-24 border-b border-[#6B1B7E]/10">
      
      {/* Background Aurora Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#6B1B7E]/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[400px] bg-[#E0107F]/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        
        {/* Centered Main Headline */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#6B1B7E] leading-[1.12]">
            Training for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B1B7E] via-[#5B2A9A] to-[#E0107F]">
              Online Quran Teachers
            </span>{' '}
            & Students.
          </h1>

          <p className="text-slate-600 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed pt-2">
            Learn proven methods to teach Quran online, attract international students worldwide, master Tajweed, and build a sustainable <strong>halal income</strong>.
          </p>
        </div>

        {/* Centered Countries Served Badge */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-bold text-slate-500">Students from 25+ countries:</span>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-[#6B1B7E]/20 rounded-full text-xs font-medium text-slate-700 shadow-2xs">
            {countries.map((c, i) => (
              <span key={i} title={c.name} className="text-sm hover:scale-125 transition inline-block">
                {c.flag}
              </span>
            ))}
            <span className="text-[11px] font-bold text-[#6B1B7E] ml-1">UK, USA, CA, AU, PK +</span>
          </div>
        </div>

        {/* Centered Main Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={onOpenEnroll}
            className="w-full sm:w-auto px-9 py-4 bg-gradient-to-r from-[#6B1B7E] via-[#5B2A9A] to-[#E0107F] hover:opacity-95 active:scale-[0.99] text-white font-black text-sm rounded-2xl transition shadow-xl shadow-[#E0107F]/25 flex items-center justify-center gap-2.5 group cursor-pointer"
          >
            <span>Enroll Now — PKR 4,999</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-7 py-4 bg-white hover:bg-purple-50 text-[#6B1B7E] font-bold text-sm rounded-2xl border-2 border-[#6B1B7E]/25 transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Book 3-Day Free Trial</span>
          </button>

          <button
            onClick={onOpenQuranReader}
            className="w-full sm:w-auto px-6 py-4 bg-purple-50 hover:bg-purple-100 text-[#5B2A9A] font-bold text-sm rounded-2xl border border-purple-200 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-[#E0107F]" />
            <span>Read Holy Quran</span>
          </button>
        </div>

        {/* WhatsApp Callout */}
        <div className="pt-1 flex items-center justify-center gap-2 text-xs text-slate-600">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Instant WhatsApp Support:</span>
          <button 
            onClick={handleWhatsApp}
            className="font-bold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>+92 306 8959085</span>
          </button>
        </div>

        {/* Centered Trust Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#6B1B7E]/10 max-w-3xl mx-auto">
          <div className="p-4 bg-white rounded-2xl border border-[#6B1B7E]/15 shadow-2xs">
            <span className="block text-3xl font-black text-[#6B1B7E]">500+</span>
            <span className="text-xs text-slate-500 font-semibold">Teachers Trained</span>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-[#6B1B7E]/15 shadow-2xs">
            <span className="block text-3xl font-black text-[#6B1B7E]">1,000+</span>
            <span className="text-xs text-slate-500 font-semibold">Active Students</span>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-[#6B1B7E]/15 shadow-2xs">
            <span className="block text-3xl font-black text-[#6B1B7E]">5+ Yrs</span>
            <span className="text-xs text-slate-500 font-semibold">Academy Legacy</span>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-[#6B1B7E]/15 shadow-2xs">
            <span className="block text-3xl font-black text-[#E0107F]">100%</span>
            <span className="text-xs text-slate-500 font-semibold">Halal Earning</span>
          </div>
        </div>

      </div>
    </div>
  );
};
