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
      <div className="max-w-6xl mx-auto rounded-full bg-white/95 backdrop-blur-xl border border-[#6B1B7E]/20 shadow-xl shadow-[#6B1B7E]/10 px-4 sm:px-7 py-2.5 transition-all duration-300 pointer-events-auto">
        <div className="flex items-center justify-between gap-3 sm:gap-6 min-h-[56px]">
          
          {/* Big Brand Animated Logo (Prominent True Way Quran presence) */}
          <button
            onClick={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center focus:outline-none text-left py-1 shrink-0 cursor-pointer transition-transform hover:scale-105"
            aria-label="True Way Quran Home"
          >
            <AnimatedLogo size="md" showUrl={true} />
          </button>

          {/* Desktop Short Nav with Sub-sections (Portal & Time removed as requested) */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2.5">
            
            {/* 1. Home */}
            <button
              onClick={() => {
                setCurrentView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-3.5 py-2 rounded-full text-xs font-bold transition cursor-pointer ${
                currentView === 'home'
                  ? 'text-[#6B1B7E] bg-purple-100/80 shadow-2xs'
                  : 'text-slate-700 hover:text-[#6B1B7E] hover:bg-purple-50/60'
              }`}
            >
              Home
            </button>

            {/* 2. Learn Dropdown (Courses, Madani Qaida, History of Quran) */}
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
                className={`px-3.5 py-2 rounded-full text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  ['courses', 'qaida', 'history'].includes(currentView)
                    ? 'text-[#6B1B7E] bg-purple-100/80 shadow-2xs'
                    : 'text-slate-700 hover:text-[#6B1B7E] hover:bg-purple-50/60'
                }`}
              >
                <span>Learn</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#E0107F] transition-transform ${learnDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {learnDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-60 bg-white/95 backdrop-blur-xl border border-[#6B1B7E]/20 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <button
                    onClick={() => {
                      setCurrentView('courses');
                      setLearnDropdownOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-purple-50/80 transition flex items-start gap-2.5 cursor-pointer"
                  >
                    <GraduationCap className="w-4 h-4 text-[#6B1B7E] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">Quran Courses</p>
                      <p className="text-[10px] text-slate-500">Tajweed, Hifz, & Masterclass</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setCurrentView('qaida');
                      setLearnDropdownOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-purple-50/80 transition flex items-start gap-2.5 cursor-pointer"
                  >
                    <Mic className="w-4 h-4 text-[#E0107F] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">Madani Qaida</p>
                      <p className="text-[10px] text-slate-500">AI Voice verification steps</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setCurrentView('history');
                      setLearnDropdownOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-purple-50/80 transition flex items-start gap-2.5 cursor-pointer"
                  >
                    <History className="w-4 h-4 text-[#5B2A9A] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">History of the Quran</p>
                      <p className="text-[10px] text-slate-500">7-Milestone preservation</p>
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
              className={`px-3.5 py-2 rounded-full text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                currentView === 'quran'
                  ? 'text-white bg-gradient-to-r from-[#6B1B7E] to-[#E0107F] shadow-sm'
                  : 'text-slate-700 hover:text-[#6B1B7E] hover:bg-purple-50/60'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#E0107F]" />
              <span>Full Quran</span>
              <span className={`text-[9px] font-black px-1.5 py-0.2 rounded-full ${
                currentView === 'quran' ? 'bg-white/20 text-white' : 'bg-pink-100 text-[#E0107F]'
              }`}>
                114
              </span>
            </button>

            {/* 4. Spiritual Dropdown (Namaz Times, Daily Duas) */}
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
                className={`px-3.5 py-2 rounded-full text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  ['namaz', 'duas', 'worship_guide'].includes(currentView)
                    ? 'text-[#6B1B7E] bg-purple-100/80 shadow-2xs'
                    : 'text-slate-700 hover:text-[#6B1B7E] hover:bg-purple-50/60'
                }`}
              >
                <span>Spiritual</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#E0107F] transition-transform ${spiritualDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {spiritualDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-xl border border-[#6B1B7E]/20 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <button
                    onClick={() => {
                      setCurrentView('worship_guide');
                      setSpiritualDropdownOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-purple-50/80 transition flex items-start gap-2.5 cursor-pointer"
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
                    className="w-full text-left p-2.5 rounded-xl hover:bg-purple-50/80 transition flex items-start gap-2.5 cursor-pointer"
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
                    className="w-full text-left p-2.5 rounded-xl hover:bg-purple-50/80 transition flex items-start gap-2.5 cursor-pointer"
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
              className={`px-3.5 py-2 rounded-full text-xs font-bold transition cursor-pointer ${
                ['pricing', 'courses'].includes(currentView)
                  ? 'text-[#6B1B7E] bg-purple-100/80 shadow-2xs'
                  : 'text-slate-700 hover:text-[#6B1B7E] hover:bg-purple-50/60'
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
              className={`px-3.5 py-2 rounded-full text-xs font-bold transition cursor-pointer ${
                currentView === 'contact'
                  ? 'text-[#6B1B7E] bg-purple-100/80 shadow-2xs'
                  : 'text-slate-700 hover:text-[#6B1B7E] hover:bg-purple-50/60'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Right Action Controls: Account Pill, Enroll CTA */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* User Account / Login Button */}
            {currentUser ? (
              <div className="flex items-center gap-1.5">
                {currentUser.role === 'admin' && (
                  <button
                    onClick={() => setCurrentView('admin')}
                    className="p-2 text-xs font-bold rounded-full bg-purple-50 text-[#6B1B7E] border border-[#6B1B7E]/20 hover:bg-purple-100 cursor-pointer"
                    title="Admin Panel"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#6B1B7E]" />
                  </button>
                )}

                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="px-3.5 py-1.5 text-xs font-bold rounded-full bg-purple-50 text-[#6B1B7E] border border-[#6B1B7E]/20 hover:bg-purple-100 flex items-center gap-1.5 cursor-pointer max-w-[130px] truncate"
                >
                  <UserIcon className="w-3.5 h-3.5 text-[#E0107F]" />
                  <span className="truncate">{currentUser.name.split(' ')[0]}</span>
                </button>

                <button
                  onClick={onLogout}
                  title="Sign Out"
                  className="p-1.5 text-slate-400 hover:text-red-600 rounded-full hover:bg-red-50 transition cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="text-xs font-black text-[#6B1B7E] bg-purple-50 hover:bg-purple-100 border border-[#6B1B7E]/20 px-4 py-2 rounded-full transition cursor-pointer"
              >
                Sign In
              </button>
            )}

            {/* Browserbase-style Gradient CTA Pill */}
            <button
              onClick={onOpenEnroll}
              className="bg-gradient-to-r from-[#6B1B7E] via-[#5B2A9A] to-[#E0107F] hover:opacity-95 text-white text-xs font-black px-4 sm:px-5 py-2 rounded-full shadow-md shadow-[#E0107F]/20 hover:shadow-lg transition flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-200" />
              <span>Enroll Now</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-slate-700 hover:bg-purple-50 transition cursor-pointer"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#6B1B7E]" /> : <Menu className="w-5 h-5 text-[#6B1B7E]" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 bg-white/95 backdrop-blur-xl border border-[#6B1B7E]/20 rounded-3xl p-5 shadow-2xl space-y-3 animate-in fade-in slide-in-from-top-2 duration-200 pointer-events-auto">
          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            <button
              onClick={() => {
                setCurrentView('home');
                setMobileMenuOpen(false);
              }}
              className="p-3 rounded-xl text-left bg-purple-50/60 text-[#6B1B7E]"
            >
              Home
            </button>
            <button
              onClick={() => {
                setCurrentView('quran');
                setMobileMenuOpen(false);
              }}
              className="p-3 rounded-xl text-left bg-purple-50/60 text-[#6B1B7E]"
            >
              Full Quran (114 Surahs)
            </button>
            <button
              onClick={() => {
                setCurrentView('courses');
                setMobileMenuOpen(false);
              }}
              className="p-3 rounded-xl text-left bg-purple-50/60 text-[#6B1B7E]"
            >
              Courses
            </button>
            <button
              onClick={() => {
                setCurrentView('pricing');
                setMobileMenuOpen(false);
              }}
              className="p-3 rounded-xl text-left bg-purple-50/60 text-[#6B1B7E] font-bold"
            >
              Pricing & Tuition
            </button>
            <button
              onClick={() => {
                setCurrentView('qaida');
                setMobileMenuOpen(false);
              }}
              className="p-3 rounded-xl text-left bg-purple-50/60 text-[#6B1B7E]"
            >
              Madani Qaida
            </button>
            <button
              onClick={() => {
                setCurrentView('history');
                setMobileMenuOpen(false);
              }}
              className="p-3 rounded-xl text-left bg-purple-50/60 text-[#6B1B7E]"
            >
              History of the Quran
            </button>
            <button
              onClick={() => {
                setCurrentView('worship_guide');
                setMobileMenuOpen(false);
              }}
              className="p-3 rounded-xl text-left bg-gradient-to-r from-purple-50 to-pink-50 text-[#6B1B7E] font-bold"
            >
              🕌 True Way of Namaz & Roza Guide
            </button>
            <button
              onClick={() => {
                setCurrentView('namaz');
                setMobileMenuOpen(false);
              }}
              className="p-3 rounded-xl text-left bg-purple-50/60 text-[#6B1B7E]"
            >
              Namaz Schedule
            </button>
            <button
              onClick={() => {
                setCurrentView('duas');
                setMobileMenuOpen(false);
              }}
              className="p-3 rounded-xl text-left bg-purple-50/60 text-[#6B1B7E]"
            >
              Daily Duas
            </button>
            <button
              onClick={() => {
                setCurrentView('contact');
                setMobileMenuOpen(false);
              }}
              className="p-3 rounded-xl text-left bg-purple-50/60 text-[#6B1B7E]"
            >
              Contact Support
            </button>
          </div>

          <div className="pt-2 border-t border-purple-100 flex items-center justify-between">
            <button
              onClick={() => {
                onOpenAuth();
                setMobileMenuOpen(false);
              }}
              className="text-xs font-bold text-[#6B1B7E] px-4 py-1.5 rounded-full bg-purple-50"
            >
              {currentUser ? currentUser.name : 'Sign In'}
            </button>
            <button
              onClick={() => {
                onOpenEnroll();
                setMobileMenuOpen(false);
              }}
              className="text-xs font-black text-white px-4 py-1.5 rounded-full bg-gradient-to-r from-[#6B1B7E] to-[#E0107F]"
            >
              Enroll Now
            </button>
          </div>
        </div>
      )}

    </header>
  );
};
