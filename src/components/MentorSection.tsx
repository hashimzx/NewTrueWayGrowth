import React from 'react';
import { 
  CheckCircle2, 
  Award, 
  Users, 
  GraduationCap, 
  DollarSign, 
  Globe, 
  ArrowRight, 
  MessageCircle, 
  Star,
  Sparkles,
  BookOpen,
  ShieldCheck
} from 'lucide-react';

interface MentorSectionProps {
  onEnroll: () => void;
  onOpenWhatsApp?: () => void;
}

export const MentorSection: React.FC<MentorSectionProps> = ({ onEnroll, onOpenWhatsApp }) => {
  const handleWhatsApp = () => {
    if (onOpenWhatsApp) {
      onOpenWhatsApp();
    } else {
      window.open('https://wa.me/923068959085?text=Assalam-o-Alaikum%20Abdul%20Basit%2C%20I%20want%20to%20learn%20more%20about%20the%20Online%20Quran%20Teacher%20Course', '_blank');
    }
  };

  const checkpoints = [
    'Learn professional online Quran teaching techniques & Tajweed pedagogies',
    'Gain confidence in delivering structured, interactive and engaging lessons',
    'Attract and manage international students effectively across the globe',
    'Receive my direct personal mentorship and one-on-one support throughout',
    'Generate sustainable halal earnings while teaching the Holy Quran with pride'
  ];

  const thirtyDayHighlights = [
    {
      title: 'Tajweed & Structured Lessons',
      urdu: 'Tajweed aur structured lessons confidently padhana seekh jayenge',
      icon: BookOpen,
      desc: 'Master professional Makharij correction, lesson structuring, and engaging digital whiteboard techniques.'
    },
    {
      title: 'Global Student Communication',
      urdu: 'International students ke saath communication aur English skills improve karenge',
      desc: 'Speak confidently with UK, USA, Canadian and Australian parents and kids with polished professionalism.'
    },
    {
      title: 'Student Acquisition & Tech',
      urdu: 'Students attract aur manage karna aur online tools ka professional use seekh jayenge',
      desc: 'Hands-on training with Zoom, Google Meet, digital drawing tablets, and parent reporting tools.'
    },
    {
      title: 'Halal Global Income',
      urdu: 'Marketing ke zariye duniya ke har hisay se students hasil karenge aur halal earning grow karenge',
      desc: 'Build your personal brand, set sustainable fee structures, and receive direct payments safely.'
    }
  ];

  return (
    <section id="mentor" className="py-20 bg-gradient-to-b from-white via-purple-50/40 to-white relative overflow-hidden border-b border-purple-100">
      {/* Decorative Glow */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-pink-300/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Eyebrow Badge */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 rounded-full text-xs font-black text-purple-900 uppercase tracking-widest shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-pink-600" />
            <span>MEET YOUR MENTOR</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-purple-950 tracking-tight">
            Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-800 via-pink-600 to-purple-600">Abdul Basit Saleem</span>.
          </h2>

          <p className="text-slate-600 text-base sm:text-lg">
            Founder of Quran Academy & Lead Mentor to 500+ successful online Quran teachers worldwide.
          </p>
        </div>

        {/* Mentor Profile Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Authentic Mentor Photo & Trust Cards */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            
            {/* Background Halo */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-pink-500/20 rounded-3xl blur-2xl transform -rotate-2 scale-95" />

            {/* Profile Card */}
            <div className="relative w-full max-w-md bg-white rounded-3xl p-4 shadow-2xl border border-purple-200/80">
              <div className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-gradient-to-b from-purple-900 to-slate-900">
                <img
                  src="https://ustadleads.com/abdul.jpeg"
                  alt="Abdul Basit Saleem – Lead Mentor at UstadLeads & True Way Quran"
                  className="w-full h-full object-cover object-top hover:scale-105 transition duration-500"
                  onError={(e) => {
                    // Fallback to high-res mentor portrait if external network hiccups
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
                  }}
                />

                {/* Overlaid Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-purple-950/85 backdrop-blur-md border border-white/20 text-white p-3.5 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                        <span>Abdul Basit Saleem</span>
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      </h4>
                      <p className="text-xs text-purple-200">Academy Director & Master Trainer</p>
                    </div>
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>4.9 / 5.0</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stat Chips below photo */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-purple-50/80 border border-purple-100 rounded-xl p-3 text-center">
                  <span className="block text-2xl font-black text-purple-950">500+</span>
                  <span className="text-xs text-purple-700 font-semibold">Trained Teachers</span>
                </div>
                <div className="bg-pink-50/80 border border-pink-100 rounded-xl p-3 text-center">
                  <span className="block text-2xl font-black text-pink-950">1,000+</span>
                  <span className="text-xs text-pink-700 font-semibold">Global Students</span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="mt-5 w-full max-w-md">
              <button
                onClick={handleWhatsApp}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl shadow-md transition flex items-center justify-center gap-2 group cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-200 group-hover:scale-110 transition" />
                <span>Message Abdul Directly on WhatsApp (+92 306 8959085)</span>
              </button>
            </div>
          </div>

          {/* Right Column: Narrative, 5 Checkpoints & Bio */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-4 text-slate-700 text-base leading-relaxed">
              <p className="text-lg text-slate-800 font-medium">
                For the past <strong>5 years</strong>, I have been running a successful Quran Academy, currently serving over <strong>1,000 students</strong> from around the world (UK, USA, Canada, Australia, UAE, and beyond).
              </p>

              <p>
                Through my experience, I&apos;ve trained countless students and tutors who have gone on to become professional, highly paid online Quran teachers themselves.
              </p>

              <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 text-purple-950 font-semibold italic text-base">
                &ldquo;I created this course to guide aspiring Quran teachers like you with a complete roadmap, so you can:&rdquo;
              </div>
            </div>

            {/* 5 Bullet Points from UstadLeads */}
            <div className="space-y-3 pt-1">
              {checkpoints.map((point, idx) => (
                <div 
                  key={idx}
                  className="flex items-start gap-3.5 p-3 rounded-xl bg-white border border-purple-100 hover:border-pink-300 transition shadow-2xs group"
                >
                  <div className="mt-0.5 p-1 rounded-lg bg-pink-100 text-pink-700 group-hover:bg-pink-600 group-hover:text-white transition shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-slate-800 group-hover:text-purple-950 transition">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            {/* Closing Bio Paragraph */}
            <p className="text-slate-600 text-sm leading-relaxed">
              This course is designed as a step-by-step, practical, and fully trackable learning experience, leveraging the same methods and guidance that have helped thousands of students worldwide. With my direct support, you won&apos;t just learn; you&apos;ll build a successful career as an online Quran teacher.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <button
                onClick={onEnroll}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-800 via-purple-700 to-pink-600 hover:from-purple-900 hover:to-pink-700 text-white font-black text-sm rounded-xl shadow-xl shadow-pink-500/20 transition flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Learn Directly From Abdul</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </button>

              <button
                onClick={handleWhatsApp}
                className="w-full sm:w-auto px-6 py-4 bg-white border-2 border-purple-200 hover:border-purple-300 text-purple-900 font-bold text-sm rounded-xl shadow-xs transition flex items-center justify-center gap-2 hover:bg-purple-50 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Ask a Question on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

        {/* 30-Day Bilingual Mastery Card (from UstadLeads) */}
        <div className="mt-20 rounded-3xl bg-gradient-to-br from-[#2e0854] via-[#3b0764] to-[#4a044e] text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle Islamic Geometry Watermark */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <span className="inline-block px-3.5 py-1 bg-pink-500/30 border border-pink-400/40 rounded-full text-xs font-black uppercase tracking-wider text-pink-200">
                30 Days Transformation Program
              </span>
              <h3 className="text-2xl sm:text-4xl font-black text-white">
                30 Din Me Banain Apni Pehchaan as Professional Online Quran Teacher
              </h3>
              <p className="text-purple-200 text-sm sm:text-base">
                Is course ke 30 din me aap ek certified, trusted aur internationally recognized online Quran teacher ban kar apni professional journey start karenge.
              </p>
            </div>

            {/* 4 Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {thirtyDayHighlights.map((item, i) => (
                <div 
                  key={i}
                  className="bg-white/10 hover:bg-white/15 border border-white/15 rounded-2xl p-5 backdrop-blur-xs transition space-y-2.5"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-300 flex items-center justify-center font-black text-sm border border-pink-400/30">
                      ✓
                    </div>
                    <h4 className="font-bold text-white text-base">{item.title}</h4>
                  </div>
                  <p className="text-pink-200 font-urdu font-medium text-sm leading-relaxed">
                    &ldquo;{item.urdu}&rdquo;
                  </p>
                  <p className="text-xs text-purple-200 leading-normal">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center pt-4">
              <button
                onClick={onEnroll}
                className="px-9 py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-black text-sm rounded-xl shadow-xl shadow-pink-900/40 transition inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Enroll in 30-Day Masterclass (PKR 4,999)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
