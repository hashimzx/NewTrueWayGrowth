import React from 'react';
import { 
  CheckCircle2, 
  ShieldCheck, 
  HeartHandshake, 
  Sparkles,
  BookOpen,
  Users,
  Award,
  Globe2,
  Calendar,
  Lock
} from 'lucide-react';
import { AnimatedLogo } from './AnimatedLogo';

interface AboutSectionProps {
  onBookFreeTrial?: () => void;
  onExploreCourses?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onBookFreeTrial,
  onExploreCourses
}) => {
  return (
    <section id="about" className="py-16 lg:py-24 bg-white border-b border-[#6B1B7E]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-[#6B1B7E] text-xs font-bold border border-purple-200">
            <BookOpen className="w-3.5 h-3.5 text-[#E0107F]" />
            <span>About True Way Quran Academy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Nurturing Hearts with the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B1B7E] via-[#5B2A9A] to-[#E0107F]">
              Light of the Holy Quran
            </span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            True Way Quran is a premier international online Quran academy dedicated to providing authentic, personalized Quranic and Islamic education to children, sisters, and brothers across the world.
          </p>
        </div>

        {/* 2-Column Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Narrative & Values */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4 text-slate-600 text-base leading-relaxed">
              <p>
                Founded to bridge the gap for Muslim families living in non-Muslim majority countries such as the <strong>United Kingdom, United States, Canada, and Australia</strong>, <strong>True Way Quran Academy</strong> provides live, interactive, one-on-one Quran classes from the comfort and safety of your home.
              </p>
              <p>
                Whether your young child is taking their first steps in the Arabic alphabet with <strong>Madani Qaida</strong>, an adult is seeking to beautify their recitation with <strong>Practical Tajweed</strong>, or a dedicated student is undertaking the blessed journey of <strong>Quran Hifz (Memorization)</strong>, our certified Alim and Qari instructors deliver patient, structured lessons tailored to every student's learning pace.
              </p>
              <p>
                We believe every child deserves individualized attention. That is why all our classes are strictly <strong>1-on-1 private sessions</strong>, enabling teachers to focus entirely on correcting articulation points (Makharij), building reading stamina, and instilling genuine love for the Book of Allah.
              </p>
            </div>

            {/* 4 Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-100 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#6B1B7E] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Certified Male & Female Teachers</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Al-Azhar & Wifaq-ul-Madaris graduates with verified continuous Tajweed chains.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-100 flex items-start gap-3">
                <Users className="w-5 h-5 text-[#E0107F] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">1-on-1 Private Attention</h4>
                  <p className="text-xs text-slate-600 mt-0.5">No crowded group classrooms. 100% personalized focus on your child's mistakes.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-100 flex items-start gap-3">
                <Calendar className="w-5 h-5 text-[#6B1B7E] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">24/7 Flexible Timetables</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Choose mornings, after-school, or weekends that align with your family's schedule.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-100 flex items-start gap-3">
                <Globe2 className="w-5 h-5 text-[#E0107F] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Multilingual Communication</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Fluent English and Urdu speaking instructors for effortless parent-teacher updates.</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {onBookFreeTrial && (
                <button
                  onClick={onBookFreeTrial}
                  className="px-6 py-3 bg-[#6B1B7E] hover:bg-[#5B2A9A] text-white font-bold text-sm rounded-xl shadow-md transition cursor-pointer flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#E0107F]" />
                  <span>Book 3-Day Free Trial</span>
                </button>
              )}

              {onExploreCourses && (
                <button
                  onClick={onExploreCourses}
                  className="px-6 py-3 bg-white hover:bg-purple-50 text-[#6B1B7E] font-bold text-sm rounded-xl border border-purple-200 transition cursor-pointer"
                >
                  <span>Explore All 5 Courses</span>
                </button>
              )}
            </div>

          </div>

          {/* Right Column: Visual Trust Card */}
          <div className="lg:col-span-5">
            <div className="relative p-7 sm:p-9 bg-gradient-to-br from-[#6B1B7E] via-[#5B2A9A] to-[#2e1065] rounded-3xl text-white shadow-xl shadow-purple-900/20 overflow-hidden border border-purple-400/20">
              
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-60 h-60 bg-[#E0107F]/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                
                {/* Brand Visual */}
                <div className="flex items-center gap-4 border-b border-white/10 pb-5">
                  <AnimatedLogo size="md" variant="growth" />
                  <div>
                    <h3 className="text-xl font-black text-white">True Way Quran</h3>
                    <p className="text-xs text-purple-200">International Quran Academy</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xl font-bold text-white leading-snug">
                    "The best among you are those who learn the Quran and teach it."
                  </h4>
                  <p className="text-xs text-purple-200 italic">
                    — Sahih al-Bukhari 5027
                  </p>
                </div>

                {/* Key Academy Metrics */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 bg-white/10 backdrop-blur-md rounded-xl border border-white/10">
                    <span className="block text-2xl font-black text-white">3 Days</span>
                    <span className="text-[11px] text-purple-200">Free Trial Classes</span>
                  </div>

                  <div className="p-3.5 bg-white/10 backdrop-blur-md rounded-xl border border-white/10">
                    <span className="block text-2xl font-black text-[#E0107F]">1-on-1</span>
                    <span className="text-[11px] text-purple-200">Live Video Sessions</span>
                  </div>

                  <div className="p-3.5 bg-white/10 backdrop-blur-md rounded-xl border border-white/10">
                    <span className="block text-2xl font-black text-white">Female</span>
                    <span className="text-[11px] text-purple-200">Teachers for Sisters/Kids</span>
                  </div>

                  <div className="p-3.5 bg-white/10 backdrop-blur-md rounded-xl border border-white/10">
                    <span className="block text-2xl font-black text-emerald-400">Monthly</span>
                    <span className="text-[11px] text-purple-200">Parent Progress Reports</span>
                  </div>
                </div>

                {/* Direct WhatsApp Callout */}
                <div className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-500/30 flex items-center justify-between">
                  <div>
                    <span className="block text-xs font-semibold text-emerald-300">Have questions?</span>
                    <span className="text-sm font-bold text-white">Chat directly with Director</span>
                  </div>
                  <a
                    href="https://wa.me/923068959085?text=Assalam-o-Alaikum%20Abdul%20Basit%2C%20I%20have%20questions%20about%20True%20Way%20Quran%20classes."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-lg shadow-sm transition"
                  >
                    WhatsApp
                  </a>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
