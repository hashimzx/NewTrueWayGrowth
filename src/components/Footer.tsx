import React, { useState } from 'react';
import { AnimatedLogo } from './AnimatedLogo';
import { 
  Mail, 
  Phone, 
  MessageCircle,
  CreditCard,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Calendar,
  ShieldCheck
} from 'lucide-react';
import { DEFAULT_QURAN_COURSES } from '../utils/academyDatabase';

interface FooterProps {
  onNavigate: (view: string) => void;
  onOpenTrialModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenTrialModal
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubmitted(true);
      setTimeout(() => {
        setNewsletterSubmitted(false);
        setNewsletterEmail('');
      }, 4000);
    }
  };

  return (
    <footer className="bg-[#1f0938] text-white pt-16 pb-12 border-t border-purple-900/60 relative overflow-hidden">
      
      {/* Background Subtle Ambient Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#6B1B7E]/20 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#E0107F]/15 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Column 1 & 2: True Way Quran Brand Story */}
          <div className="lg:col-span-2 space-y-4">
            <div className="inline-block">
              <AnimatedLogo size="md" variant="growth" lightBg={false} />
            </div>

            <p className="text-xs text-purple-200/80 leading-relaxed max-w-sm">
              <strong>True Way Quran</strong> is a premier international online Quran academy dedicated to providing authentic 1-on-1 Quran and Islamic education to children, sisters, and adults across the globe. Certified Al-Azhar & Wifaq scholars, flexible timetables, and structured learning programs.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-purple-300">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                <span>Serving Students in 25+ Countries</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>100% Certified Male & Female Scholars</span>
              </span>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={onOpenTrialModal}
                className="px-5 py-2.5 bg-gradient-to-r from-[#6B1B7E] to-[#E0107F] hover:from-[#5B2A9A] hover:to-[#6B1B7E] text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
              >
                Book a Free Trial Class
              </button>

              <a
                href="https://wa.me/923068959085?text=Assalam-o-Alaikum%20Abdul%20Basit%2C%20I%20have%20inquiries%20about%20True%20Way%20Quran."
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 transition flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp Desk</span>
              </a>
            </div>
          </div>

          {/* Column 3: 5 Quran Courses */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider">
              Our 5 Quran Courses
            </h4>
            <ul className="space-y-2 text-xs text-purple-200/80">
              {DEFAULT_QURAN_COURSES.map(c => (
                <li key={c.id}>
                  <button
                    onClick={() => {
                      onNavigate('home');
                      setTimeout(() => {
                        const el = document.getElementById('courses');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="hover:text-white transition text-left cursor-pointer"
                  >
                    {c.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Quick Navigation & Tools */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider">
              Navigation & Resources
            </h4>
            <ul className="space-y-2 text-xs text-purple-200/80">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition cursor-pointer"
                >
                  Homepage
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('quran')}
                  className="hover:text-emerald-300 font-semibold transition cursor-pointer flex items-center gap-1 text-emerald-400"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Holy Quran Reader (114 Surahs)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('qaida')}
                  className="hover:text-white transition cursor-pointer"
                >
                  Interactive Madani Qaida
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('student')}
                  className="hover:text-white transition cursor-pointer"
                >
                  Student & Parent Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('teacher')}
                  className="hover:text-white transition cursor-pointer"
                >
                  Teacher Portal Login
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('admin')}
                  className="hover:text-white transition cursor-pointer"
                >
                  Super Admin Console
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Direct Contact Desk */}
          <div className="space-y-4">
            <h4 className="text-sm font-black text-white uppercase tracking-wider">
              Admissions & Contact
            </h4>
            
            <div className="space-y-2.5 text-xs text-purple-200/80">
              <a href="tel:+448085310303" className="flex items-center gap-2 hover:text-white transition">
                <Phone className="w-3.5 h-3.5 text-purple-400" />
                <span>+44 808 5310 303 (UK Desk)</span>
              </a>
              <a href="https://wa.me/923068959085" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>+92 306 8959085 (WhatsApp)</span>
              </a>
              <a href="mailto:support@ustadleads.com" className="flex items-center gap-2 hover:text-white transition truncate">
                <Mail className="w-3.5 h-3.5 text-pink-400" />
                <span>support@ustadleads.com</span>
              </a>
            </div>

            {/* Newsletter */}
            <div className="pt-2 space-y-2">
              <span className="block text-[11px] font-bold text-purple-300">
                Weekly Islamic Parenting & Quran Brief
              </span>
              {newsletterSubmitted ? (
                <div className="p-2 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 rounded-lg text-xs flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>JazakAllah Khair! Subscribed.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-1.5">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={e => setNewsletterEmail(e.target.value)}
                    placeholder="Enter parent email"
                    className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-xs text-white placeholder-purple-300 focus:outline-hidden focus:border-purple-300"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-[#E0107F] hover:bg-[#6B1B7E] text-white rounded-lg text-xs font-bold transition cursor-pointer"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>

            {/* Social Media Links */}
            <div className="pt-2 space-y-1.5">
              <span className="block text-[11px] text-purple-300 font-bold">Follow True Way Quran</span>
              <div className="flex flex-wrap items-center gap-3 text-xs text-purple-200">
                <a href="https://www.facebook.com/share/16HE8RzUcF/" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">Facebook</a>
                <span>·</span>
                <a href="https://www.instagram.com/ustadleads?igsh=NjgxYm5vem9ybWd4" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">Instagram</a>
                <span>·</span>
                <a href="https://www.tiktok.com/@ustadleads" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">TikTok</a>
                <span>·</span>
                <a href="https://www.youtube.com/@ustadleads" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">YouTube</a>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-8 border-t border-purple-900/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-purple-300/70">
          <p>© 2026 True Way Quran Academy (www.truewaygrowth.com). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Online Quran Learning for Kids & Adults</span>
            <span>·</span>
            <span>UK, USA & Global Operations</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
