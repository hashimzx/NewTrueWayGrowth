import React, { useState, useRef } from 'react';
import { User } from '../types';
import { AnimatedLogo } from './AnimatedLogo';
import { 
  Home,
  BookOpen, 
  GraduationCap, 
  Mic, 
  User as UserIcon, 
  ShieldCheck, 
  LogOut, 
  Sparkles,
  BookMarked,
  ChevronDown,
  History,
  Clock,
  Moon,
  CheckCircle2,
  Award,
  CreditCard,
  Compass
} from 'lucide-react';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  currentUser: User | null;
  onOpenAuth: () => void;
  onOpenEnroll: () => void;
  onLogout: () => void;
  currency: 'USD' | 'GBP' | 'EUR' | 'CAD' | 'AUD';
  setCurrency: (c: 'USD' | 'GBP' | 'EUR' | 'CAD' | 'AUD') => void;
  timezone: string;
  setTimezone: (tz: string) => void;
}

/**
 * Navbar - True Way Quran
 * Styled after Integrated Biosciences (navbar.gallery/navbar/integrated-biosciences):
 * - Refined floating capsule container with subtle hairline border and backdrop glassmorphism
 * - Formal, modern typography with clean pill active and hover states
 * - Balanced, comfortable height (48-50px)
 * - Formal presentation with zero casual emojis, using clean Lucide vector icons
 * - Exact brand palette: #6B1B7E (primary purple), #5B2A9A (violet), #E0107F (magenta)
 */
export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  currentUser,
  onOpenAuth,
  onOpenEnroll,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [learnDropdownOpen, setLearnDropdownOpen] = useState(false);
  const [spiritualDropdownOpen, setSpiritualDropdownOpen] = useState(false);

  const learnTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const spiritualTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isLearnActive = ['courses', 'hifz', 'qaida', 'history'].includes(currentView);
  const isSpiritualActive = ['namaz', 'namaz_salah_guide', 'namaz_tahajjud', 'duas', 'worship_guide'].includes(currentView);

  return (
    <header className="sticky top-0 z-50 py-3 sm:py-4 px-3 sm:px-6 transition-all duration-300 pointer-events-none">
      
      {/* Big, Highly Interactive Floating Capsule Navbar */}
      <div className="max-w-7xl mx-auto rounded-full bg-white/95 backdrop-blur-xl border-2 border-[#6B1B7E]/25 shadow-xl shadow-[#6B1B7E]/10 px-5 sm:px-8 py-3 sm:py-4 transition-all duration-300 pointer-events-auto">
        <div className="flex items-center justify-between gap-3 sm:gap-6 min-h-[58px] sm:min-h-[66px]">
          
          {/* Prominent Interactive Brand Animated Logo */}
          <button
            onClick={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center focus:outline-none text-left shrink-0 cursor-pointer transition-transform hover:scale-[1.03] active:scale-[0.98] origin-left"
            aria-label="True Way Quran Home"
          >
            <div className="hidden sm:block">
              <AnimatedLogo size="md" showUrl={true} />
            </div>
            <div className="block sm:hidden">
              <AnimatedLogo size="sm" showUrl={false} />
            </div>
          </button>

          {/* Desktop Navigation Menu (Big, prominent, easy to interact with) */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            
            {/* 1. Home */}
            <button
              onClick={() => {
                setCurrentView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-4.5 py-2.5 rounded-full text-sm font-bold transition-all duration-150 cursor-pointer ${
                currentView === 'home'
                  ? 'bg-[#6B1B7E] text-white font-black shadow-sm'
                  : 'text-slate-700 hover:text-[#6B1B7E] hover:bg-purple-50'
              }`}
            >
              Home
            </button>

            {/* 2. Learn Dropdown (Hifz, Courses, Madani Qaida, History) */}
            <div 
              className="relative"
              onMouseEnter={() => {
                if (learnTimeoutRef.current) clearTimeout(learnTimeoutRef.current);
                setLearnDropdownOpen(true);
              }}
              onMouseLeave={() => {
                learnTimeoutRef.current = setTimeout(() => setLearnDropdownOpen(false), 200);
              }}
            >
              <button
                onClick={() => setLearnDropdownOpen(!learnDropdownOpen)}
                className={`px-4.5 py-2.5 rounded-full text-sm font-bold transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
                  isLearnActive
                    ? 'bg-[#6B1B7E] text-white font-bold shadow-xs'
                    : 'text-slate-700 hover:text-[#6B1B7E] hover:bg-purple-50/80'
                }`}
              >
                <span>Learn</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-150 ${isLearnActive ? 'text-pink-200' : 'text-[#6B1B7E]'} ${learnDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {learnDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-68 bg-white/98 backdrop-blur-xl border border-[#6B1B7E]/15 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 space-y-1">
                  <button
                    onClick={() => {
                      setCurrentView('hifz');
                      setLearnDropdownOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-purple-50/90 transition flex items-start gap-2.5 cursor-pointer group"
                  >
                    <div className="p-1.5 rounded-lg bg-pink-100 text-[#E0107F] group-hover:bg-[#E0107F] group-hover:text-white transition mt-0.5">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="text-xs font-bold text-slate-900 group-hover:text-[#6B1B7E]">Quran Hifz (Memorization)</p>
                        <span className="text-[9px] font-black px-1.5 py-0.2 rounded-full bg-pink-100 text-[#E0107F]">New</span>
                      </div>
                      <p className="text-[10px] text-slate-500">Sabaq, Sabqi & Manzil 1-on-1</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setCurrentView('courses');
                      setLearnDropdownOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-purple-50/90 transition flex items-start gap-2.5 cursor-pointer group"
                  >
                    <div className="p-1.5 rounded-lg bg-purple-100 text-[#6B1B7E] group-hover:bg-[#6B1B7E] group-hover:text-white transition mt-0.5">
                      <GraduationCap className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 group-hover:text-[#6B1B7E]">Quran Courses</p>
                      <p className="text-[10px] text-slate-500">Tajweed, Tafseer & Teacher Training</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setCurrentView('qaida');
                      setLearnDropdownOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-purple-50/90 transition flex items-start gap-2.5 cursor-pointer group"
                  >
                    <div className="p-1.5 rounded-lg bg-purple-100 text-[#5B2A9A] group-hover:bg-[#5B2A9A] group-hover:text-white transition mt-0.5">
                      <Mic className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 group-hover:text-[#6B1B7E]">Madani Qaida</p>
                      <p className="text-[10px] text-slate-500">Makharij & Tajweed colored rules</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setCurrentView('history');
                      setLearnDropdownOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-purple-50/90 transition flex items-start gap-2.5 cursor-pointer group"
                  >
                    <div className="p-1.5 rounded-lg bg-purple-50 text-slate-600 group-hover:bg-[#6B1B7E] group-hover:text-white transition mt-0.5">
                      <History className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 group-hover:text-[#6B1B7E]">History of the Quran</p>
                      <p className="text-[10px] text-slate-500">22-Milestone preservation carousel</p>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* 3. Full Quran (All 114 Surahs) */}
            <button
              onClick={() => {
                setCurrentView('quran');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-4.5 py-2.5 rounded-full text-sm font-bold transition-all duration-150 flex items-center gap-2 cursor-pointer ${
                currentView === 'quran'
                  ? 'bg-[#6B1B7E] text-white font-bold shadow-md'
                  : 'text-slate-700 hover:text-[#6B1B7E] hover:bg-purple-50/80'
              }`}
            >
              <BookOpen className={`w-4 h-4 ${currentView === 'quran' ? 'text-pink-200' : 'text-[#E0107F]'}`} />
              <span>Full Quran</span>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                currentView === 'quran' ? 'bg-white/20 text-white' : 'bg-pink-100 text-[#E0107F]'
              }`}>
                114
              </span>
            </button>

            {/* 4. Namaz & Spiritual Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => {
                if (spiritualTimeoutRef.current) clearTimeout(spiritualTimeoutRef.current);
                setSpiritualDropdownOpen(true);
              }}
              onMouseLeave={() => {
                spiritualTimeoutRef.current = setTimeout(() => setSpiritualDropdownOpen(false), 200);
              }}
            >
              <button
                onClick={() => setSpiritualDropdownOpen(!spiritualDropdownOpen)}
                className={`px-4.5 py-2.5 rounded-full text-sm font-bold transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
                  isSpiritualActive
                    ? 'bg-[#6B1B7E] text-white font-bold shadow-md'
                    : 'text-slate-700 hover:text-[#6B1B7E] hover:bg-purple-50/80'
                }`}
              >
                <span>Namaz & Spiritual</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-150 ${isSpiritualActive ? 'text-pink-200' : 'text-[#6B1B7E]'} ${spiritualDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {spiritualDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-88 bg-white/98 backdrop-blur-xl border border-[#6B1B7E]/15 rounded-2xl shadow-xl p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150 space-y-1">
                  <button
                    onClick={() => {
                      setCurrentView('namaz_salah_guide');
                      setSpiritualDropdownOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full text-left p-3 rounded-xl bg-purple-50/70 hover:bg-purple-100/80 transition flex items-start gap-3 cursor-pointer border border-purple-200/60"
                  >
                    <CheckCircle2 className="w-4.5 h-4.5 text-[#E0107F] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs sm:text-[13px] font-bold text-[#6B1B7E] leading-snug">
                        A Step-by-Step Guide to Daily Prayer (Salah)
                      </p>
                      <p className="text-[10px] text-slate-500">Wudu, 5 daily prayers Rak'at table & Salam Center manual</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setCurrentView('namaz_tahajjud');
                      setSpiritualDropdownOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full text-left p-3 rounded-xl bg-pink-50/70 hover:bg-pink-100/80 transition flex items-start gap-3 cursor-pointer border border-pink-200/60"
                  >
                    <Moon className="w-4.5 h-4.5 text-[#6B1B7E] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs sm:text-[13px] font-bold text-[#6B1B7E] leading-snug">
                        How to Pray Tahajjud
                      </p>
                      <p className="text-[10px] text-slate-500">Night vigil window, Rak'at format & Prophetic supplication</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setCurrentView('namaz');
                      setSpiritualDropdownOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full text-left p-3 rounded-xl hover:bg-purple-50/90 transition flex items-start gap-3 cursor-pointer"
                  >
                    <Clock className="w-4.5 h-4.5 text-[#6B1B7E] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs sm:text-[13px] font-bold text-slate-900">Auto Namaz Times & Qibla</p>
                      <p className="text-[10px] text-slate-500">Live calculation schedule based on location</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setCurrentView('worship_guide');
                      setSpiritualDropdownOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full text-left p-3 rounded-xl hover:bg-purple-50/90 transition flex items-start gap-3 cursor-pointer"
                  >
                    <Sparkles className="w-4.5 h-4.5 text-[#E0107F] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs sm:text-[13px] font-bold text-slate-900">True Way of Namaz & Roza</p>
                      <p className="text-[10px] text-slate-500">Eid, Janazah, Postures & Right/Wrong comparisons</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setCurrentView('duas');
                      setSpiritualDropdownOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full text-left p-3 rounded-xl hover:bg-purple-50/90 transition flex items-start gap-3 cursor-pointer"
                  >
                    <BookMarked className="w-4.5 h-4.5 text-[#5B2A9A] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs sm:text-[13px] font-bold text-slate-900">Authentic Duas Library</p>
                      <p className="text-[10px] text-slate-500">Morning, evening & daily Sunnah supplications</p>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* 5. Pricing */}
            <button
              onClick={() => {
                setCurrentView('pricing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-4.5 py-2.5 rounded-full text-sm font-bold transition-all duration-150 cursor-pointer ${
                ['pricing', 'courses'].includes(currentView)
                  ? 'bg-[#6B1B7E] text-white font-bold shadow-md'
                  : 'text-slate-700 hover:text-[#6B1B7E] hover:bg-purple-50/80'
              }`}
            >
              Pricing
            </button>

            {/* 6. Contact */}
            <button
              onClick={() => {
                setCurrentView('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-4.5 py-2.5 rounded-full text-sm font-bold transition-all duration-150 cursor-pointer ${
                currentView === 'contact'
                  ? 'bg-[#6B1B7E] text-white font-bold shadow-md'
                  : 'text-slate-700 hover:text-[#6B1B7E] hover:bg-purple-50/80'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Right Action Controls (Enlarged, prominent, easy to click) */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">

            {currentUser ? (
              <div className="flex items-center gap-2">
                {currentUser.role === 'admin' && (
                  <button
                    onClick={() => setCurrentView('admin')}
                    className="p-2.5 text-xs font-bold rounded-full bg-purple-50 text-[#6B1B7E] border border-[#6B1B7E]/20 hover:bg-purple-100 transition cursor-pointer"
                    title="LMS Admin Database & Portal"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#6B1B7E]" />
                  </button>
                )}

                <button
                  onClick={() => setCurrentView('dashboard')}
                  className={`px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold rounded-full border flex items-center gap-2 cursor-pointer max-w-[130px] sm:max-w-[160px] truncate transition ${
                    currentView === 'dashboard'
                      ? 'bg-[#6B1B7E] text-white border-[#6B1B7E]'
                      : 'bg-purple-50 text-[#6B1B7E] border-[#6B1B7E]/20 hover:bg-purple-100'
                  }`}
                  title={`Student Portal & Hifz Tracker: ${currentUser.name}`}
                >
                  <UserIcon className={`w-4 h-4 shrink-0 ${currentView === 'dashboard' ? 'text-pink-200' : 'text-[#E0107F]'}`} />
                  <span className="truncate">{currentUser.name.split(' ')[0]}</span>
                </button>

                <button
                  onClick={() => setCurrentView('hifz')}
                  className={`hidden md:inline-flex px-3.5 py-2.5 text-xs sm:text-sm font-bold rounded-full border items-center gap-1.5 cursor-pointer transition ${
                    currentView === 'hifz'
                      ? 'bg-[#E0107F] text-white border-[#E0107F]'
                      : 'bg-pink-50 text-[#E0107F] border-pink-200 hover:bg-pink-100'
                  }`}
                  title="Hifz Memorization Program"
                >
                  <Award className="w-4 h-4 shrink-0" />
                  <span>Hifz</span>
                </button>

                <button
                  onClick={onLogout}
                  title="Sign Out"
                  className="hidden sm:inline-flex p-2 text-slate-400 hover:text-red-600 rounded-full hover:bg-red-50 transition cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="text-xs sm:text-sm font-bold text-[#6B1B7E] bg-purple-50 hover:bg-purple-100 border border-[#6B1B7E]/25 px-5 sm:px-6 py-2.5 rounded-full transition shadow-xs cursor-pointer"
              >
                Sign In
              </button>
            )}

            {/* Primary Enroll CTA Pill */}
            <button
              onClick={onOpenEnroll}
              className="hidden sm:flex bg-gradient-to-r from-[#6B1B7E] via-[#5B2A9A] to-[#E0107F] hover:opacity-95 text-white text-xs sm:text-sm font-bold px-5 sm:px-7 py-2.5 rounded-full shadow-md hover:shadow-lg transition items-center gap-2 cursor-pointer active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-pink-200 shrink-0" />
              <span>Enroll Now</span>
            </button>

            {/* Mobile 3-Bar Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden relative w-11 h-11 flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-full hover:bg-purple-50 transition cursor-pointer focus:outline-none shrink-0 border border-purple-100"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <span 
                className={`h-0.5 w-5 bg-[#6B1B7E] rounded-full transition-all duration-300 ease-in-out transform origin-center ${
                  mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`} 
              />
              <span 
                className={`h-0.5 w-5 bg-[#E0107F] rounded-full transition-all duration-300 ease-in-out ${
                  mobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
                }`} 
              />
              <span 
                className={`h-0.5 w-5 bg-[#6B1B7E] rounded-full transition-all duration-300 ease-in-out transform origin-center ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`} 
              />
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer (Formal, zero emojis) */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 max-w-5xl mx-auto bg-white/98 backdrop-blur-2xl border border-[#6B1B7E]/20 rounded-3xl p-4 sm:p-5 shadow-2xl space-y-4 animate-in fade-in slide-in-from-top-3 duration-200 pointer-events-auto max-h-[85vh] overflow-y-auto">
          
          {/* Section 1: Quran & Memorization */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-wider text-[#6B1B7E] px-2 mb-1.5">
              Quran & Memorization
            </p>
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-1.5 text-xs font-semibold">
              <button
                onClick={() => {
                  setCurrentView('home');
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-xl text-left transition flex items-center gap-2 ${
                  currentView === 'home'
                    ? 'bg-purple-100/90 text-[#6B1B7E] font-bold'
                    : 'bg-purple-50/60 text-slate-800 hover:bg-purple-100/50'
                }`}
              >
                <Home className="w-3.5 h-3.5 text-[#6B1B7E]" />
                <span>Home</span>
              </button>

              <button
                onClick={() => {
                  setCurrentView('hifz');
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-xl text-left transition flex items-center gap-2 ${
                  currentView === 'hifz'
                    ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-[#6B1B7E] font-bold'
                    : 'bg-pink-50/70 text-[#6B1B7E] hover:bg-pink-100/70'
                }`}
              >
                <Award className="w-3.5 h-3.5 text-[#E0107F]" />
                <span>Quran Hifz Program</span>
              </button>

              {currentUser && (
                <button
                  onClick={() => {
                    setCurrentView('dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className={`p-2.5 rounded-xl text-left col-span-full transition flex items-center gap-2 ${
                    currentView === 'dashboard'
                      ? 'bg-[#6B1B7E] text-white font-bold'
                      : 'bg-purple-100/80 text-[#6B1B7E] hover:bg-purple-200/70'
                  }`}
                >
                  <UserIcon className="w-3.5 h-3.5 text-[#E0107F]" />
                  <span>Student Portal & Hifz Daily Tracker</span>
                </button>
              )}

              <button
                onClick={() => {
                  setCurrentView('quran');
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-xl text-left transition flex items-center gap-2 ${
                  currentView === 'quran'
                    ? 'bg-purple-100/90 text-[#6B1B7E] font-bold'
                    : 'bg-purple-50/60 text-slate-800 hover:bg-purple-100/50'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-[#6B1B7E]" />
                <span>Full Quran (114 Surahs)</span>
              </button>

              <button
                onClick={() => {
                  setCurrentView('qaida');
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-xl text-left transition flex items-center gap-2 ${
                  currentView === 'qaida'
                    ? 'bg-purple-100/90 text-[#6B1B7E] font-bold'
                    : 'bg-purple-50/60 text-slate-800 hover:bg-purple-100/50'
                }`}
              >
                <Mic className="w-3.5 h-3.5 text-[#5B2A9A]" />
                <span>Madani Qaida (Colored)</span>
              </button>

              <button
                onClick={() => {
                  setCurrentView('history');
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-xl text-left transition flex items-center gap-2 ${
                  currentView === 'history'
                    ? 'bg-purple-100/90 text-[#6B1B7E] font-bold'
                    : 'bg-purple-50/60 text-slate-800 hover:bg-purple-100/50'
                }`}
              >
                <History className="w-3.5 h-3.5 text-[#6B1B7E]" />
                <span>History of the Quran</span>
              </button>

              <button
                onClick={() => {
                  setCurrentView('pricing');
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-xl text-left transition flex items-center gap-2 ${
                  ['pricing', 'courses'].includes(currentView)
                    ? 'bg-purple-100/90 text-[#6B1B7E] font-bold'
                    : 'bg-purple-50/60 text-slate-800 hover:bg-purple-100/50'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5 text-[#E0107F]" />
                <span>Pricing & Tuition Plans</span>
              </button>
            </div>
          </div>

          {/* Section 2: Namaz & Spiritual Sub-sections */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-wider text-[#6B1B7E] px-2 mb-1.5">
              Namaz & Spiritual Sub-Sections
            </p>
            <div className="grid grid-cols-1 gap-1.5 text-xs font-semibold">
              <button
                onClick={() => {
                  setCurrentView('namaz_salah_guide');
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-xl text-left transition border flex items-center gap-2 ${
                  currentView === 'namaz_salah_guide'
                    ? 'bg-purple-100 text-[#6B1B7E] border-[#6B1B7E]/30 font-bold'
                    : 'bg-purple-50/80 text-[#6B1B7E] border-purple-200/60 hover:bg-purple-100/70'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-[#E0107F] shrink-0" />
                <span>A step-by-step guide to performing the daily Islamic prayer (Salah)</span>
              </button>

              <button
                onClick={() => {
                  setCurrentView('namaz_tahajjud');
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-xl text-left transition border flex items-center gap-2 ${
                  currentView === 'namaz_tahajjud'
                    ? 'bg-pink-100 text-[#6B1B7E] border-[#E0107F]/30 font-bold'
                    : 'bg-pink-50/80 text-[#6B1B7E] border-pink-200/60 hover:bg-pink-100/70'
                }`}
              >
                <Moon className="w-4 h-4 text-[#6B1B7E] shrink-0" />
                <span>How to pray tahajjud</span>
              </button>

              <div className="grid grid-cols-1 xs:grid-cols-2 gap-1.5">
                <button
                  onClick={() => {
                    setCurrentView('namaz');
                    setMobileMenuOpen(false);
                  }}
                  className={`p-2.5 rounded-xl text-left transition flex items-center gap-2 ${
                    currentView === 'namaz'
                      ? 'bg-purple-100/90 text-[#6B1B7E] font-bold'
                      : 'bg-purple-50/60 text-slate-800 hover:bg-purple-100/50'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5 text-[#6B1B7E]" />
                  <span>Auto Namaz Times & Qibla</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentView('worship_guide');
                    setMobileMenuOpen(false);
                  }}
                  className={`p-2.5 rounded-xl text-left transition flex items-center gap-2 ${
                    currentView === 'worship_guide'
                      ? 'bg-purple-100/90 text-[#6B1B7E] font-bold'
                      : 'bg-purple-50/60 text-slate-800 hover:bg-purple-100/50'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#E0107F]" />
                  <span>Eid, Janazah & Roza Guide</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentView('duas');
                    setMobileMenuOpen(false);
                  }}
                  className={`p-2.5 rounded-xl text-left transition col-span-full flex items-center gap-2 ${
                    currentView === 'duas'
                      ? 'bg-purple-100/90 text-[#6B1B7E] font-bold'
                      : 'bg-purple-50/60 text-slate-800 hover:bg-purple-100/50'
                  }`}
                >
                  <BookMarked className="w-3.5 h-3.5 text-[#5B2A9A]" />
                  <span>Daily Authentic Duas Library</span>
                </button>
              </div>
            </div>
          </div>

          {/* Section 3: Student Actions */}
          <div className="pt-2.5 border-t border-purple-100 flex items-center justify-between gap-2">
            <button
              onClick={() => {
                if (currentUser) {
                  setCurrentView('dashboard');
                } else {
                  onOpenAuth();
                }
                setMobileMenuOpen(false);
              }}
              className="text-xs font-bold text-[#6B1B7E] px-4 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 transition"
            >
              {currentUser ? `User: ${currentUser.name.split(' ')[0]}` : 'Sign In'}
            </button>
            <button
              onClick={() => {
                onOpenEnroll();
                setMobileMenuOpen(false);
              }}
              className="text-xs font-bold text-white px-5 py-2 rounded-xl bg-gradient-to-r from-[#6B1B7E] to-[#E0107F] shadow-sm"
            >
              Enroll Now
            </button>
          </div>
        </div>
      )}

    </header>
  );
};
