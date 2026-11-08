import React, { useState, useRef, useEffect } from 'react';
import { AnimatedLogo } from './AnimatedLogo';
import { 
  Home, 
  Sparkles, 
  Menu, 
  X, 
  User as UserIcon, 
  ShieldCheck, 
  LogOut, 
  ArrowRight,
  BookOpen,
  Calendar,
  MessageCircle,
  ChevronDown,
  ChevronRight,
  GraduationCap,
  Award,
  Layers,
  HeartHandshake,
  HelpCircle,
  Clock,
  Compass,
  Headphones
} from 'lucide-react';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  currentUser: any | null;
  onOpenAuth: () => void;
  onOpenTrialModal: () => void;
  onLogout: () => void;
  currency?: 'USD' | 'GBP';
  setCurrency?: (c: 'USD' | 'GBP') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  currentUser,
  onOpenAuth,
  onOpenTrialModal,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navigateToSection = (sectionId: string) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateToView = (view: string) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 py-2.5 sm:py-3.5 px-3 sm:px-6 transition-all duration-300 pointer-events-none">
      
      {/* Floating Capsule Navbar adjusted to never overflow */}
      <div 
        ref={navRef}
        className="max-w-7xl mx-auto rounded-full bg-white/95 backdrop-blur-xl border border-[#6E1373]/20 shadow-lg shadow-[#6E1373]/5 px-3.5 sm:px-6 py-2 transition-all duration-300 pointer-events-auto"
      >
        <div className="flex items-center justify-between gap-2 sm:gap-4 min-h-[48px] sm:min-h-[54px]">
          
          {/* True Way Quran Official Animated Logo */}
          <button
            onClick={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center focus:outline-none text-left shrink-0 cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98] origin-left"
            aria-label="True Way Quran Home"
          >
            <AnimatedLogo size="responsive" variant="trimmed" />
          </button>

          {/* Desktop Navigation Links with Dropdown Sections & Sub-Sections */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            
            {/* 1. Home Direct Button */}
            <button
              onClick={() => {
                setCurrentView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                currentView === 'home' && !activeDropdown
                  ? 'bg-[#6E1373] text-white shadow-xs'
                  : 'text-slate-700 hover:text-[#6E1373] hover:bg-purple-50'
              }`}
            >
              Home
            </button>

            {/* 2. About Academy Section with Sub-Sections Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('about')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'about' ? null : 'about')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  activeDropdown === 'about'
                    ? 'bg-purple-100 text-[#6E1373]'
                    : 'text-slate-700 hover:text-[#6E1373] hover:bg-purple-50'
                }`}
              >
                <span>About Academy</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'about' ? 'rotate-180 text-[#6E1373]' : 'text-slate-400'}`} />
              </button>

              {/* Sub-Section Menu */}
              {activeDropdown === 'about' && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-purple-100 p-2 space-y-1 animate-fadeIn z-50">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-purple-900 border-b border-purple-50">
                    Academy Insights
                  </div>
                  
                  <button
                    onClick={() => navigateToSection('about')}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-purple-50 transition flex items-center gap-2.5 text-xs font-bold text-slate-800 hover:text-[#6E1373] cursor-pointer"
                  >
                    <GraduationCap className="w-4 h-4 text-[#6E1373] shrink-0" />
                    <div>
                      <div className="leading-tight">About True Way Quran</div>
                      <div className="text-[10px] text-slate-500 font-normal">Authentic 1-on-1 online madrasa</div>
                    </div>
                  </button>

                  <button
                    onClick={() => navigateToSection('why-choose-us')}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-purple-50 transition flex items-center gap-2.5 text-xs font-bold text-slate-800 hover:text-[#6E1373] cursor-pointer"
                  >
                    <Award className="w-4 h-4 text-[#851C82] shrink-0" />
                    <div>
                      <div className="leading-tight">Why Choose Us</div>
                      <div className="text-[10px] text-slate-500 font-normal">6 core benefits & parent reports</div>
                    </div>
                  </button>

                  <button
                    onClick={() => navigateToSection('how-it-works')}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-purple-50 transition flex items-center gap-2.5 text-xs font-bold text-slate-800 hover:text-[#6E1373] cursor-pointer"
                  >
                    <Layers className="w-4 h-4 text-[#C72F8A] shrink-0" />
                    <div>
                      <div className="leading-tight">How It Works</div>
                      <div className="text-[10px] text-slate-500 font-normal">4 simple enrollment stages</div>
                    </div>
                  </button>

                  <button
                    onClick={() => navigateToSection('learning-process')}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-purple-50 transition flex items-center gap-2.5 text-xs font-bold text-slate-800 hover:text-[#6E1373] cursor-pointer"
                  >
                    <Headphones className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <div className="leading-tight">Virtual Classroom</div>
                      <div className="text-[10px] text-slate-500 font-normal">Live screen sharing & Makhraj voice</div>
                    </div>
                  </button>

                  <button
                    onClick={() => navigateToSection('reviews')}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-purple-50 transition flex items-center gap-2.5 text-xs font-bold text-slate-800 hover:text-[#6E1373] cursor-pointer"
                  >
                    <HeartHandshake className="w-4 h-4 text-amber-500 shrink-0" />
                    <div>
                      <div className="leading-tight">Parent Reviews</div>
                      <div className="text-[10px] text-slate-500 font-normal">Worldwide verified testimonials</div>
                    </div>
                  </button>

                  <button
                    onClick={() => navigateToSection('faqs')}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-purple-50 transition flex items-center gap-2.5 text-xs font-bold text-slate-800 hover:text-[#6E1373] cursor-pointer"
                  >
                    <HelpCircle className="w-4 h-4 text-indigo-500 shrink-0" />
                    <div>
                      <div className="leading-tight">Admissions FAQs</div>
                      <div className="text-[10px] text-slate-500 font-normal">Timetables, teachers & equipment</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* 3. Quran Courses Section with Sub-Sections Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('courses')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'courses' ? null : 'courses')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  activeDropdown === 'courses'
                    ? 'bg-purple-100 text-[#6E1373]'
                    : 'text-slate-700 hover:text-[#6E1373] hover:bg-purple-50'
                }`}
              >
                <span>Quran Courses</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'courses' ? 'rotate-180 text-[#6E1373]' : 'text-slate-400'}`} />
              </button>

              {/* Sub-Section Menu */}
              {activeDropdown === 'courses' && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-purple-100 p-2 space-y-1 animate-fadeIn z-50">
                  <div className="px-3 py-1.5 flex items-center justify-between border-b border-purple-50">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-900">Structured Curriculum</span>
                    <button 
                      onClick={() => navigateToSection('courses')} 
                      className="text-[10px] font-bold text-[#6E1373] hover:underline"
                    >
                      View All (5)
                    </button>
                  </div>

                  <button
                    onClick={() => navigateToSection('courses')}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-purple-50 transition flex items-center gap-2.5 text-xs font-bold text-slate-800 hover:text-[#6E1373] cursor-pointer"
                  >
                    <span className="w-5 h-5 rounded-lg bg-pink-100 text-pink-700 flex items-center justify-center text-[10px] font-black shrink-0">1</span>
                    <div>
                      <div className="leading-tight">Madani Qaida Course</div>
                      <div className="text-[10px] text-slate-500 font-normal">Alphabet, articulation & basic reading</div>
                    </div>
                  </button>

                  <button
                    onClick={() => navigateToSection('courses')}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-purple-50 transition flex items-center gap-2.5 text-xs font-bold text-slate-800 hover:text-[#6E1373] cursor-pointer"
                  >
                    <span className="w-5 h-5 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center text-[10px] font-black shrink-0">2</span>
                    <div>
                      <div className="leading-tight">Quran with Tajweed</div>
                      <div className="text-[10px] text-slate-500 font-normal">Correct pronunciation & Tarteel rules</div>
                    </div>
                  </button>

                  <button
                    onClick={() => navigateToSection('courses')}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-purple-50 transition flex items-center gap-2.5 text-xs font-bold text-slate-800 hover:text-[#6E1373] cursor-pointer"
                  >
                    <span className="w-5 h-5 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-black shrink-0">3</span>
                    <div>
                      <div className="leading-tight">Quran Memorization (Hifz)</div>
                      <div className="text-[10px] text-slate-500 font-normal">Sabaq, Sabqi & Manzil revision</div>
                    </div>
                  </button>

                  <button
                    onClick={() => navigateToSection('courses')}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-purple-50 transition flex items-center gap-2.5 text-xs font-bold text-slate-800 hover:text-[#6E1373] cursor-pointer"
                  >
                    <span className="w-5 h-5 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center text-[10px] font-black shrink-0">4</span>
                    <div>
                      <div className="leading-tight">Quran Translation & Tafseer</div>
                      <div className="text-[10px] text-slate-500 font-normal">Word-for-word meaning & reflections</div>
                    </div>
                  </button>

                  <button
                    onClick={() => navigateToSection('courses')}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-purple-50 transition flex items-center gap-2.5 text-xs font-bold text-slate-800 hover:text-[#6E1373] cursor-pointer"
                  >
                    <span className="w-5 h-5 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-black shrink-0">5</span>
                    <div>
                      <div className="leading-tight">Islamic Studies & Daily Duas</div>
                      <div className="text-[10px] text-slate-500 font-normal">Sunnah Salah, Wudu & Masnoon Duas</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* 4. Quran & Tools Section with Sub-Sections Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('tools')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'tools' ? null : 'tools')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  currentView === 'quran' || currentView === 'qaida' || currentView === 'duas' || currentView === 'namaz' || activeDropdown === 'tools'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'text-slate-700 hover:text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                <span>Quran & Learning Tools</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'tools' ? 'rotate-180 text-emerald-700' : 'text-slate-400'}`} />
              </button>

              {/* Sub-Section Menu */}
              {activeDropdown === 'tools' && (
                <div className="absolute top-full left-0 mt-2 w-76 bg-white rounded-2xl shadow-xl border border-purple-100 p-2 space-y-1 animate-fadeIn z-50">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-800 border-b border-emerald-50">
                    Interactive Islamic Tools
                  </div>

                  <button
                    onClick={() => navigateToView('quran')}
                    className={`w-full text-left px-3 py-2 rounded-xl transition flex items-center gap-2.5 text-xs font-bold cursor-pointer ${
                      currentView === 'quran' ? 'bg-emerald-50 text-emerald-800' : 'hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <BookOpen className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <div className="leading-tight">Holy Quran Reader</div>
                      <div className="text-[10px] text-slate-500 font-normal">All 114 Surahs, page memory & reciters</div>
                    </div>
                  </button>

                  <button
                    onClick={() => navigateToView('qaida')}
                    className={`w-full text-left px-3 py-2 rounded-xl transition flex items-center gap-2.5 text-xs font-bold cursor-pointer ${
                      currentView === 'qaida' ? 'bg-purple-50 text-[#6E1373]' : 'hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-[#C72F8A] shrink-0" />
                    <div>
                      <div className="leading-tight">Madani Qaida Interactive</div>
                      <div className="text-[10px] text-slate-500 font-normal">22 lessons with AI voice assessment</div>
                    </div>
                  </button>

                  <button
                    onClick={() => navigateToView('duas')}
                    className={`w-full text-left px-3 py-2 rounded-xl transition flex items-center gap-2.5 text-xs font-bold cursor-pointer ${
                      currentView === 'duas' ? 'bg-blue-50 text-blue-800' : 'hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <Compass className="w-4 h-4 text-blue-600 shrink-0" />
                    <div>
                      <div className="leading-tight">Daily Masnoon Duas</div>
                      <div className="text-[10px] text-slate-500 font-normal">Authentic supplications with audio</div>
                    </div>
                  </button>

                  <button
                    onClick={() => navigateToView('namaz')}
                    className={`w-full text-left px-3 py-2 rounded-xl transition flex items-center gap-2.5 text-xs font-bold cursor-pointer ${
                      currentView === 'namaz' ? 'bg-amber-50 text-amber-800' : 'hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                    <div>
                      <div className="leading-tight">Namaz Method & Times</div>
                      <div className="text-[10px] text-slate-500 font-normal">Step-by-step Sunnah prayer guide</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* 5. Contact Direct Button */}
            <button
              onClick={() => navigateToSection('contact')}
              className="px-3 py-1.5 rounded-full text-xs font-bold text-slate-700 hover:text-[#6E1373] hover:bg-purple-50 transition cursor-pointer"
            >
              Contact
            </button>

          </nav>

          {/* Right Action Cluster: Portal Access & Book Free Trial */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            
            {/* User Session Button / Portal Login */}
            {currentUser ? (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    if (currentUser.role === 'admin') setCurrentView('admin');
                    else if (currentUser.role === 'instructor') setCurrentView('teacher');
                    else setCurrentView('student');
                  }}
                  className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-purple-50 hover:bg-purple-100 border border-[#6E1373]/20 text-[#6E1373] font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                >
                  <UserIcon className="w-3.5 h-3.5 text-[#C72F8A]" />
                  <span className="truncate max-w-[80px] sm:max-w-[120px]">
                    {currentUser.name.split(' ')[0]}
                  </span>
                </button>

                <button
                  onClick={onLogout}
                  className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-full hover:bg-red-50 text-slate-400 hover:text-red-600 text-xs font-bold transition cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-slate-700 hover:text-[#6E1373] hover:bg-purple-50 text-xs font-bold transition border border-slate-200 hover:border-purple-200 cursor-pointer flex items-center gap-1.5"
              >
                <UserIcon className="w-3.5 h-3.5 text-[#6E1373]" />
                <span className="hidden sm:inline">Portal Login</span>
                <span className="sm:hidden">Login</span>
              </button>
            )}

            {/* Primary CTA: Book Free Trial */}
            <button
              onClick={onOpenTrialModal}
              className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#6E1373] via-[#851C82] to-[#C72F8A] hover:from-[#561F79] hover:to-[#6E1373] text-white font-black text-xs sm:text-xs shadow-md shadow-purple-900/15 hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Free Trial</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-xl text-slate-700 hover:text-[#6E1373] hover:bg-purple-50 transition cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>

        {/* Mobile Accordion Drawer: Perfectly structured so no section goes out of viewport */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 pt-2 pb-3 px-1 border-t border-purple-100 flex flex-col gap-1 text-xs font-bold max-h-[75vh] overflow-y-auto">
            
            {/* Home */}
            <button
              onClick={() => {
                setCurrentView('home');
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left px-3.5 py-2 rounded-xl hover:bg-purple-50 text-slate-700 flex items-center justify-between"
            >
              <span>Home</span>
              <Home className="w-4 h-4 text-slate-400" />
            </button>

            {/* About Academy Accordion */}
            <div className="border border-purple-50 rounded-xl overflow-hidden">
              <button
                onClick={() => setMobileExpandedSection(mobileExpandedSection === 'about' ? null : 'about')}
                className="w-full text-left px-3.5 py-2 bg-purple-50/50 hover:bg-purple-50 text-[#6E1373] flex items-center justify-between"
              >
                <span>About Academy</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpandedSection === 'about' ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpandedSection === 'about' && (
                <div className="p-2 space-y-1 bg-white">
                  <button onClick={() => navigateToSection('about')} className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-purple-50 text-slate-700">
                    • About True Way Quran
                  </button>
                  <button onClick={() => navigateToSection('why-choose-us')} className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-purple-50 text-slate-700">
                    • Why Choose Us (6 Advantages)
                  </button>
                  <button onClick={() => navigateToSection('how-it-works')} className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-purple-50 text-slate-700">
                    • How It Works (4 Stages)
                  </button>
                  <button onClick={() => navigateToSection('learning-process')} className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-purple-50 text-slate-700">
                    • Virtual Classroom & Process
                  </button>
                  <button onClick={() => navigateToSection('reviews')} className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-purple-50 text-slate-700">
                    • Parent & Student Reviews
                  </button>
                  <button onClick={() => navigateToSection('faqs')} className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-purple-50 text-slate-700">
                    • Admissions FAQs
                  </button>
                </div>
              )}
            </div>

            {/* Quran Courses Accordion */}
            <div className="border border-purple-50 rounded-xl overflow-hidden">
              <button
                onClick={() => setMobileExpandedSection(mobileExpandedSection === 'courses' ? null : 'courses')}
                className="w-full text-left px-3.5 py-2 bg-purple-50/50 hover:bg-purple-50 text-[#6E1373] flex items-center justify-between"
              >
                <span>Quran Courses (5)</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpandedSection === 'courses' ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpandedSection === 'courses' && (
                <div className="p-2 space-y-1 bg-white">
                  <button onClick={() => navigateToSection('courses')} className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-purple-50 text-slate-700">
                    • 1. Madani Qaida Course
                  </button>
                  <button onClick={() => navigateToSection('courses')} className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-purple-50 text-slate-700">
                    • 2. Quran with Tajweed
                  </button>
                  <button onClick={() => navigateToSection('courses')} className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-purple-50 text-slate-700">
                    • 3. Quran Memorization (Hifz)
                  </button>
                  <button onClick={() => navigateToSection('courses')} className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-purple-50 text-slate-700">
                    • 4. Quran Translation & Tafseer
                  </button>
                  <button onClick={() => navigateToSection('courses')} className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-purple-50 text-slate-700">
                    • 5. Islamic Studies & Daily Duas
                  </button>
                </div>
              )}
            </div>

            {/* Quran & Tools Accordion */}
            <div className="border border-emerald-100 rounded-xl overflow-hidden">
              <button
                onClick={() => setMobileExpandedSection(mobileExpandedSection === 'tools' ? null : 'tools')}
                className="w-full text-left px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 flex items-center justify-between"
              >
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Quran & Learning Tools</span>
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpandedSection === 'tools' ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpandedSection === 'tools' && (
                <div className="p-2 space-y-1 bg-white">
                  <button onClick={() => navigateToView('quran')} className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-emerald-50 text-emerald-900 flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Holy Quran Reader (114 Surahs)</span>
                  </button>
                  <button onClick={() => navigateToView('qaida')} className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-purple-50 text-purple-900 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#C72F8A]" />
                    <span>Madani Qaida Interactive (22 Lessons)</span>
                  </button>
                  <button onClick={() => navigateToView('duas')} className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-blue-50 text-blue-900 flex items-center gap-2">
                    <Compass className="w-3.5 h-3.5 text-blue-600" />
                    <span>Daily Masnoon Duas</span>
                  </button>
                  <button onClick={() => navigateToView('namaz')} className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-amber-50 text-amber-900 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>Namaz Prayer Times & Method</span>
                  </button>
                </div>
              )}
            </div>

            {/* Direct Contact */}
            <button
              onClick={() => navigateToSection('contact')}
              className="text-left px-3.5 py-2 rounded-xl hover:bg-purple-50 text-slate-700"
            >
              Contact & Admissions Desk
            </button>

          </div>
        )}

      </div>
    </header>
  );
};
