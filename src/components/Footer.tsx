import React from 'react';
import { AnimatedLogo } from './AnimatedLogo';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  ShieldCheck, 
  Heart, 
  Sparkles, 
  MessageCircle,
  CreditCard,
  Video
} from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
  onOpenEnroll: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenEnroll }) => {
  return (
    <footer className="bg-gradient-to-b from-[#1e0836] via-[#150527] to-[#0d0219] text-white pt-16 pb-12 border-t border-purple-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Column with Animated Logo (Preserved exact logo!) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="inline-block">
              <AnimatedLogo size="md" showUrl={true} lightBg={false} />
            </div>

            <p className="text-xs text-purple-200/80 leading-relaxed max-w-sm">
              True Way Quran & UstadLeads: A learning platform that actually works. Master online Quran teaching, Tajweed recitation, and student acquisition with a structured roadmap and direct mentorship from Abdul Basit Saleem.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-purple-300">
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-pink-400" />
                Serving Students in 25+ Countries
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                1,000+ Active Students
              </span>
            </div>

            <div className="pt-2 flex flex-wrap gap-2">
              <button
                onClick={onOpenEnroll}
                className="px-5 py-2.5 bg-gradient-to-r from-purple-700 via-purple-600 to-pink-600 hover:from-purple-800 hover:to-pink-700 text-white rounded-xl text-xs font-black shadow-lg shadow-pink-500/20 transition flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-pink-200" />
                <span>Enroll Now — PKR 4,999</span>
              </button>

              <a
                href="https://wa.me/923068959085"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Abdul</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-pink-400">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-purple-200/80">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('mentor')} className="hover:text-white transition cursor-pointer">
                  Meet Your Mentor
                </button>
              </li>
              <li>
                <a href="?view=quran" target="_blank" rel="noopener noreferrer" className="hover:text-white transition cursor-pointer">
                  Full Holy Quran (Open in New Tab)
                </a>
              </li>
              <li>
                <button onClick={() => onNavigate('qaida')} className="hover:text-white transition cursor-pointer">
                  Madani & Noorani Qaida
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-white transition cursor-pointer">
                  Courses & Masterclasses
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('namaz')} className="hover:text-white transition cursor-pointer text-pink-300 font-semibold">
                  Namaz Times (Live Auto)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('duas')} className="hover:text-white transition cursor-pointer text-pink-300 font-semibold">
                  Daily Masnoon Duas
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('attendance')} className="hover:text-white transition cursor-pointer text-emerald-300 font-semibold">
                  Class Attendance Tracker
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faqs')} className="hover:text-white transition cursor-pointer">
                  FAQs & Questions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition cursor-pointer">
                  Contact Support
                </button>
              </li>
            </ul>
          </div>

          {/* Our Courses (from ustadleads.com) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-pink-400">
              Our Courses
            </h4>
            <ul className="space-y-2 text-xs text-purple-200/80">
              <li>
                <button onClick={onOpenEnroll} className="hover:text-white transition text-left cursor-pointer">
                  How to Become an Online Quran Teacher
                </button>
              </li>
              <li>
                <button onClick={onOpenEnroll} className="hover:text-white transition text-left cursor-pointer">
                  One-on-One Session with Abdul Basit
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('quran')} className="hover:text-white transition text-left cursor-pointer">
                  Full Quran Tajweed & Recitation
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('qaida')} className="hover:text-white transition text-left cursor-pointer">
                  Arabic Alphabet & Qaida for Kids
                </button>
              </li>
              <li>
                <button onClick={onOpenEnroll} className="hover:text-white transition text-left cursor-pointer">
                  Quran Hifz (Memorization)
                </button>
              </li>
              <li>
                <button onClick={onOpenEnroll} className="hover:text-white transition text-left cursor-pointer">
                  Classes for Sisters (Female Tutors)
                </button>
              </li>
            </ul>
          </div>

          {/* Connect & Contact Info (Official details from ustadleads.com) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-pink-400">
              Connect & Support
            </h4>
            
            <div className="space-y-2.5 text-xs text-purple-200/80">
              <div className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-pink-400 shrink-0 mt-0.5" />
                <a href="https://wa.me/923068959085" target="_blank" rel="noopener noreferrer" className="hover:text-white transition font-mono font-bold">
                  +92 306 8959085
                </a>
              </div>

              <div className="flex items-start gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <a href="https://wa.me/923068959085" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  WhatsApp Support (24/7)
                </a>
              </div>

              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-pink-400 shrink-0 mt-0.5" />
                <span className="text-purple-200 font-mono">support@ustadleads.com</span>
              </div>

              <div className="flex items-start gap-2">
                <CreditCard className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                <span className="text-purple-300 text-[11px]">Visa, Mastercard, AMEX & Global Debit Cards</span>
              </div>
            </div>

            {/* Social Media Links from ustadleads.com */}
            <div className="pt-2">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-purple-400 mb-2">
                Follow UstadLeads
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <a 
                  href="https://www.facebook.com/share/16HE8RzUcF/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-[11px] font-medium text-purple-200 hover:text-white transition"
                >
                  Facebook
                </a>
                <a 
                  href="https://www.instagram.com/ustadleads?igsh=NjgxYm5vem9ybWd4" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-[11px] font-medium text-purple-200 hover:text-white transition"
                >
                  Instagram
                </a>
                <a 
                  href="https://www.tiktok.com/@ustadleads" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-[11px] font-medium text-purple-200 hover:text-white transition"
                >
                  TikTok
                </a>
                <a 
                  href="https://www.youtube.com/@ustadleads" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-[11px] font-medium text-purple-200 hover:text-white transition"
                >
                  YouTube
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Powered by Truth way growth */}
        <div className="border-t border-purple-900/40 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-purple-400 gap-4">
          <p>
            &copy; {new Date().getFullYear()} True Way Quran (www.truewayquran.com). All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <span className="text-purple-300 font-semibold">
              Powered by <span className="bg-gradient-to-r from-pink-400 to-purple-300 bg-clip-text text-transparent font-black">Truth way growth</span>
            </span>
            <span>·</span>
            <button onClick={() => onNavigate('contact')} className="hover:text-white transition cursor-pointer">
              Privacy
            </button>
            <span>·</span>
            <button onClick={() => onNavigate('contact')} className="hover:text-white transition cursor-pointer">
              Terms
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
