import React, { useState, useRef } from 'react';
import { User } from '../types';
import { AnimatedLogo } from './AnimatedLogo';
import { 
  BookOpen, 
  GraduationCap, 
  Mic, 
  User as UserIcon, 
  ShieldCheck, 
  Globe, 
  LogOut, 
  Sparkles,
  Menu,
  X,
  BookMarked,
  ChevronDown,
  History,
  Clock
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

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  currentUser,
  onOpenAuth,
  onOpenEnroll,
  onLogout,
  currency,
  setCurrency
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [learnDropdownOpen, setLearnDropdownOpen] = useState(false);
  const [spiritualDropdownOpen, setSpiritualDropdownOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const learnTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const spiritualTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currencies: Array<'USD' | 'GBP' | 'EUR' | 'CAD' | 'AUD'> = ['USD', 'GBP', 'EUR', 'CAD', 'AUD'];

  return (
    <header className="sticky top-0 z-50 py-3 px-3 sm:px-6 transition-all duration-300 pointer-events-none">
      
      {/* Browserbase-style Floating Capsule Container */}
      <div className="max-w-6xl mx-auto rounded-full bg-white/95 backdrop-blur-xl border border-[#6B1B7E]/20 shadow-xl shadow-[#6B1B7E]/10 px-3 sm:px-6 py-1.5 sm:py-2.5 transition-all duration-300 pointer-events-auto">
        <div className="flex items-center justify-between gap-2 sm:gap-6 min-h-[46px] sm:min-h-[56px]">
          
          {/* Big Brand Animated Logo (Responsive: Compact on phone, full on tablet/desktop) */}
          <button
            onClick={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center focus:outline-none text-left shrink cursor-pointer transition-transform hover:scale-105 origin-left"
            aria-label="True Way Quran Home"
          >
            <div className="hidden sm:block">
              <AnimatedLogo size="md" showUrl={true} />
            </div>
            <div className="block sm:hidden">
              <AnimatedLogo size="sm" showUrl={false} />
            </div>
          </button>

          {/* Desktop Short Nav with Sub-sections (Kevin Powell animated top accent bar) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            
            {/* 1. Home */}
            <button
              onClick={() => {
                setCurrentView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`relative px-3.5 py-2 text-xs font-bold transition cursor-pointer before:content-[''] before:absolute before:top-0 before:left-0 before:h-[3px] before:bg-gradient-to-r before:from-[#6B1B7E] before:to-[#E0107F] before:transition-all before:duration-300 ${
                currentView === 'home'
                  ? 'text-[#6B1B7E] before:w-full font-black'
                  : 'text-slate-700 hover:text-[#6B1B7E] before:w-0 hover:before:w-full'
              }`}
            >
              Home
            </button>

            {/* 2. Learn Dropdown (Courses, Hifz, Madani Qaida, History of Quran) */}
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
                className={`relative px-3.5 py-2 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer before:content-[''] before:absolute before:top-0 before:left-0 before:h-[3px] before:bg-gradient-to-r before:from-[#6B1B7E] before:to-[#E0107F] before:transition-all before:duration-300 ${
                  ['courses', 'hifz', 'qaida', 'history'].includes(currentView)
                    ? 'text-[#6B1B7E] before:w-full font-black'
                    : 'text-slate-700 hover:text-[#6B1B7E] before:w-0 hover:before:w-full'
                }`}
              >
                <span>Learn</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#E0107F] transition-transform duration-200 ${learnDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {learnDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white/98 backdrop-blur-xl border border-[#6B1B7E]/20 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <button
                    onClick={() => {
                      setCurrentView('hifz');
                      setLearnDropdownOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-purple-50/90 transition flex items-start gap-2.5 cursor-pointer group"
                  >
                    <div className="p-1.5 rounded-lg bg-pink-100 text-[#E0107F] group-hover:bg-[#E0107F] group-hover:text-white transition">
                      <Sparkles className="w-4 h-4" />
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
                    <div className="p-1.5 rounded-lg bg-purple-100 text-[#6B1B7E] group-hover:bg-[#6B1B7E] group-hover:text-white transition">
                      <GraduationCap className="w-4 h-4" />
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
                    <div className="p-1.5 rounded-lg bg-purple-100 text-[#5B2A9A] group-hover:bg-[#5B2A9A] group-hover:text-white transition">
                      <Mic className="w-4 h-4" />
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
                    <div className="p-1.5 rounded-lg bg-purple-50 text-slate-600 group-hover:bg-[#6B1B7E] group-hover:text-white transition">
                      <History className="w-4 h-4" />
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
              className={`relative px-3.5 py-2 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer before:content-[''] before:absolute before:top-0 before:left-0 before:h-[3px] before:bg-gradient-to-r before:from-[#6B1B7E] before:to-[#E0107F] before:transition-all before:duration-300 ${
                currentView === 'quran'
                  ? 'text-[#6B1B7E] before:w-full font-black'
                  : 'text-slate-700 hover:text-[#6B1B7E] before:w-0 hover:before:w-full'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#E0107F]" />
              <span>Full Quran</span>
              <span className={`text-[9px] font-black px-1.5 py-0.2 rounded-full ${
                currentView === 'quran' ? 'bg-[#E0107F] text-white' : 'bg-pink-100 text-[#E0107F]'
              }`}>
                114
              </span>
            </button>

            {/* 4. Spiritual Dropdown (Namaz Times, Daily Duas, True Way Guide) */}
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
                className={`relative px-3.5 py-2 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer before:content-[''] before:absolute before:top-0 before:left-0 before:h-[3px] before:bg-gradient-to-r before:from-[#6B1B7E] before:to-[#E0107F] before:transition-all before:duration-300 ${
                  ['namaz', 'duas', 'worship_guide'].includes(currentView)
                    ? 'text-[#6B1B7E] before:w-full font-black'
                    : 'text-slate-700 hover:text-[#6B1B7E] before:w-0 hover:before:w-full'
                }`}
              >
                <span>Spiritual</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#E0107F] transition-transform duration-200 ${spiritualDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {spiritualDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white/98 backdrop-blur-xl border border-[#6B1B7E]/20 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <button
                    onClick={() => {
                      setCurrentView('worship_guide');
                      setSpiritualDropdownOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-purple-50/90 transition flex items-start gap-2.5 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-[#E0107F] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">True Way of Namaz & Roza</p>
                      <p className="text-[10px] text-slate-500">Eid, Janazah, Postures & Right/Wrong</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setCurrentView('namaz');
                      setSpiritualDropdownOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-purple-50/90 transition flex items-start gap-2.5 cursor-pointer"
                  >
                    <Clock className="w-4 h-4 text-[#6B1B7E] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">Auto Namaz Times</p>
                      <p className="text-[10px] text-slate-500">Full calculation schedule & Qibla</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setCurrentView('duas');
                      setSpiritualDropdownOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-purple-50/90 transition flex items-start gap-2.5 cursor-pointer"
                  >
                    <BookMarked className="w-4 h-4 text-[#5B2A9A] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">Authentic Duas Library</p>
                      <p className="text-[10px] text-slate-500">Morning, Evening & Sunnah Duas</p>
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
              className={`relative px-3.5 py-2 text-xs font-bold transition cursor-pointer before:content-[''] before:absolute before:top-0 before:left-0 before:h-[3px] before:bg-gradient-to-r before:from-[#6B1B7E] before:to-[#E0107F] before:transition-all before:duration-300 ${
                ['pricing', 'courses'].includes(currentView)
                  ? 'text-[#6B1B7E] before:w-full font-black'
                  : 'text-slate-700 hover:text-[#6B1B7E] before:w-0 hover:before:w-full'
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
              className={`relative px-3.5 py-2 text-xs font-bold transition cursor-pointer before:content-[''] before:absolute before:top-0 before:left-0 before:h-[3px] before:bg-gradient-to-r before:from-[#6B1B7E] before:to-[#E0107F] before:transition-all before:duration-300 ${
                currentView === 'contact'
                  ? 'text-[#6B1B7E] before:w-full font-black'
                  : 'text-slate-700 hover:text-[#6B1B7E] before:w-0 hover:before:w-full'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Right Action Controls: Account Pill, Enroll CTA, Kevin Powell Animated Hamburger */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">

            {/* User Account / Login Button */}
            {currentUser ? (
              <div className="flex items-center gap-1 sm:gap-1.5">
                {currentUser.role === 'admin' && (
                  <button
                    onClick={() => setCurrentView('admin')}
                    className="p-1.5 sm:p-2 text-xs font-bold rounded-full bg-purple-50 text-[#6B1B7E] border border-[#6B1B7E]/20 hover:bg-purple-100 cursor-pointer"
                    title="Admin Panel"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#6B1B7E]" />
                  </button>
                )}

                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="px-2 sm:px-3.5 py-1.5 text-xs font-bold rounded-full bg-purple-50 text-[#6B1B7E] border border-[#6B1B7E]/20 hover:bg-purple-100 flex items-center gap-1 sm:gap-1.5 cursor-pointer max-w-[85px] sm:max-w-[130px] truncate"
                  title={`Student Portal: ${currentUser.name}`}
                >
                  <UserIcon className="w-3.5 h-3.5 text-[#E0107F] shrink-0" />
                  <span className="truncate hidden xs:inline sm:inline">{currentUser.name.split(' ')[0]}</span>
                </button>

                <button
                  onClick={onLogout}
                  title="Sign Out"
                  className="hidden sm:inline-flex p-1.5 text-slate-400 hover:text-red-600 rounded-full hover:bg-red-50 transition cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="text-[11px] sm:text-xs font-black text-[#6B1B7E] bg-purple-50 hover:bg-purple-100 border border-[#6B1B7E]/20 px-2 sm:px-4 py-1 sm:py-2 rounded-full transition cursor-pointer"
              >
                Sign In
              </button>
            )}

            {/* Browserbase-style Gradient CTA Pill (Hidden on tiny phone screens to prevent clutter) */}
            <button
              onClick={onOpenEnroll}
              className="hidden sm:flex bg-gradient-to-r from-[#6B1B7E] via-[#5B2A9A] to-[#E0107F] hover:opacity-95 text-white text-xs font-black px-4 sm:px-5 py-2 rounded-full shadow-md shadow-[#E0107F]/20 hover:shadow-lg transition items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-200 shrink-0" />
              <span>Enroll Now</span>
            </button>

            {/* Kevin Powell Animated 3-Bar Hamburger Toggle Button (GrLKNo style) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden relative w-9 h-9 sm:w-10 sm:h-10 flex flex-col items-center justify-center gap-1.5 p-1.5 sm:p-2 rounded-full hover:bg-purple-50 transition cursor-pointer focus:outline-none shrink-0"
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

      {/* Kevin Powell Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 bg-white/98 backdrop-blur-2xl border border-[#6B1B7E]/20 rounded-3xl p-4 sm:p-5 shadow-2xl space-y-4 animate-in fade-in slide-in-from-top-3 duration-200 pointer-events-auto max-h-[85vh] overflow-y-auto">
          
          {/* Section 1: Quran & Memorization */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-wider text-[#6B1B7E] px-2 mb-1.5">
              Quran & Memorization
            </p>
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 text-xs font-bold">
              <button
                onClick={() => {
                  setCurrentView('home');
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-xl text-left transition relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:h-[2px] before:transition-all before:duration-300 ${
                  currentView === 'home'
                    ? 'bg-purple-100/90 text-[#6B1B7E] before:w-full before:bg-[#E0107F]'
                    : 'bg-purple-50/60 text-slate-800 hover:bg-purple-100/50 before:w-0 hover:before:w-full before:bg-[#6B1B7E]'
                }`}
              >
                🏠 Home
              </button>

              <button
                onClick={() => {
                  setCurrentView('hifz');
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-xl text-left transition relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:h-[2px] before:transition-all before:duration-300 ${
                  currentView === 'hifz'
                    ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-[#6B1B7E] before:w-full before:bg-[#E0107F]'
                    : 'bg-pink-50/70 text-[#6B1B7E] hover:bg-pink-100/70 before:w-0 hover:before:w-full before:bg-[#E0107F]'
                }`}
              >
                ✨ Quran Hifz Program <span className="text-[9px] font-black text-[#E0107F] ml-1">New</span>
              </button>

              <button
                onClick={() => {
                  setCurrentView('quran');
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-xl text-left transition relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:h-[2px] before:transition-all before:duration-300 ${
                  currentView === 'quran'
                    ? 'bg-purple-100/90 text-[#6B1B7E] before:w-full before:bg-[#E0107F]'
                    : 'bg-purple-50/60 text-slate-800 hover:bg-purple-100/50 before:w-0 hover:before:w-full before:bg-[#6B1B7E]'
                }`}
              >
                📖 Full Quran (114 Surahs)
              </button>

              <button
                onClick={() => {
                  setCurrentView('qaida');
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-xl text-left transition relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:h-[2px] before:transition-all before:duration-300 ${
                  currentView === 'qaida'
                    ? 'bg-purple-100/90 text-[#6B1B7E] before:w-full before:bg-[#E0107F]'
                    : 'bg-purple-50/60 text-slate-800 hover:bg-purple-100/50 before:w-0 hover:before:w-full before:bg-[#6B1B7E]'
                }`}
              >
                🎙️ Madani Qaida (Colored)
              </button>

              <button
                onClick={() => {
                  setCurrentView('history');
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-xl text-left transition relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:h-[2px] before:transition-all before:duration-300 ${
                  currentView === 'history'
                    ? 'bg-purple-100/90 text-[#6B1B7E] before:w-full before:bg-[#E0107F]'
                    : 'bg-purple-50/60 text-slate-800 hover:bg-purple-100/50 before:w-0 hover:before:w-full before:bg-[#6B1B7E]'
                }`}
              >
                📜 History of the Quran
              </button>

              <button
                onClick={() => {
                  setCurrentView('pricing');
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-xl text-left transition relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:h-[2px] before:transition-all before:duration-300 ${
                  ['pricing', 'courses'].includes(currentView)
                    ? 'bg-purple-100/90 text-[#6B1B7E] before:w-full before:bg-[#E0107F]'
                    : 'bg-purple-50/60 text-slate-800 hover:bg-purple-100/50 before:w-0 hover:before:w-full before:bg-[#6B1B7E]'
                }`}
              >
                💳 Pricing & Tuition (Card/PayPal)
              </button>
            </div>
          </div>

          {/* Section 2: Spiritual & Practical Sunnah */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-wider text-[#6B1B7E] px-2 mb-1.5">
              Spiritual & Sunnah Practice
            </p>
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 text-xs font-bold">
              <button
                onClick={() => {
                  setCurrentView('worship_guide');
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-xl text-left col-span-full transition relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:h-[2px] before:transition-all before:duration-300 ${
                  currentView === 'worship_guide'
                    ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-[#6B1B7E] before:w-full before:bg-[#E0107F]'
                    : 'bg-gradient-to-r from-purple-50/80 to-pink-50/80 text-[#6B1B7E] before:w-0 hover:before:w-full before:bg-[#E0107F]'
                }`}
              >
                🕌 True Way of Namaz & Roza (Eid, Janazah, Postures)
              </button>

              <button
                onClick={() => {
                  setCurrentView('namaz');
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-xl text-left transition relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:h-[2px] before:transition-all before:duration-300 ${
                  currentView === 'namaz'
                    ? 'bg-purple-100/90 text-[#6B1B7E] before:w-full before:bg-[#E0107F]'
                    : 'bg-purple-50/60 text-slate-800 hover:bg-purple-100/50 before:w-0 hover:before:w-full before:bg-[#6B1B7E]'
                }`}
              >
                ⏰ Auto Namaz Times & Qibla
              </button>

              <button
                onClick={() => {
                  setCurrentView('duas');
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-xl text-left transition relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:h-[2px] before:transition-all before:duration-300 ${
                  currentView === 'duas'
                    ? 'bg-purple-100/90 text-[#6B1B7E] before:w-full before:bg-[#E0107F]'
                    : 'bg-purple-50/60 text-slate-800 hover:bg-purple-100/50 before:w-0 hover:before:w-full before:bg-[#6B1B7E]'
                }`}
              >
                🤲 Daily Authentic Duas
              </button>
            </div>
          </div>

          {/* Section 3: Student Actions */}
          <div className="pt-3 border-t border-purple-100 flex items-center justify-between gap-2">
            <button
              onClick={() => {
                onOpenAuth();
                setMobileMenuOpen(false);
              }}
              className="text-xs font-bold text-[#6B1B7E] px-4 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 transition"
            >
              {currentUser ? `👤 ${currentUser.name.split(' ')[0]}` : 'Sign In'}
            </button>
            <button
              onClick={() => {
                onOpenEnroll();
                setMobileMenuOpen(false);
              }}
              className="text-xs font-black text-white px-5 py-2 rounded-xl bg-gradient-to-r from-[#6B1B7E] to-[#E0107F] shadow-md shadow-[#E0107F]/20"
            >
              Enroll Now
            </button>
          </div>
        </div>
      )}

    </header>
  );
};
