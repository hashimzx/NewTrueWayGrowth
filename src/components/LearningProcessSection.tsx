import React from 'react';
import { 
  Video, 
  Monitor, 
  Volume2, 
  FileCheck2, 
  Sparkles, 
  ShieldCheck, 
  BookOpen, 
  Users,
  CheckCircle2
} from 'lucide-react';

export const LearningProcessSection: React.FC = () => {
  const steps = [
    {
      icon: Video,
      title: 'Live 1-on-1 Interactive Video Class',
      desc: 'Each student connects via Zoom or Google Meet with their dedicated teacher. Classes are 30 to 45 minutes of pure focused attention.'
    },
    {
      icon: Monitor,
      title: 'Digital Quran & Qaida Screen Sharing',
      desc: 'Teachers project high-resolution, color-coded Tajweed Mushaf and Madani Qaida pages directly on screen, highlighting words as they read.'
    },
    {
      icon: Volume2,
      title: 'Real-Time Makhraj Voice Correction',
      desc: 'Teachers listen closely to every syllable, demonstrating the exact throat and tongue placement so students absorb correct pronunciation naturally.'
    },
    {
      icon: FileCheck2,
      title: 'Daily Sabaq, Sabqi & Homework Logging',
      desc: 'After each session, the instructor records the verses read, Tajweed accuracy score, and assigns specific revision goals for home practice.'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-[#faf8ff] via-white to-[#faf8ff] border-b border-[#6B1B7E]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-[#6B1B7E] text-xs font-bold border border-purple-200">
            <Monitor className="w-3.5 h-3.5 text-[#E0107F]" />
            <span>Interactive Virtual Madrasa</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            How Online Quran Classes Work
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Our virtual classrooms combine the time-honored traditional Sanad teaching method with modern digital tools for an engaging, safe, and effective learning experience.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-6 border border-purple-100 shadow-sm hover:shadow-md transition space-y-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#6B1B7E] flex items-center justify-center border border-purple-200">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Interactive Features Callout */}
        <div className="mt-12 p-8 bg-gradient-to-br from-[#6B1B7E] to-[#5B2A9A] rounded-3xl text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-purple-200 inline-block">
              Parent Peace of Mind
            </span>
            <h3 className="text-2xl font-black text-white">
              Safe, Monitored & Recorded Virtual Classrooms
            </h3>
            <p className="text-xs sm:text-sm text-purple-100 max-w-2xl">
              Parents can sit alongside their children during classes, review past session recordings, or log into the <strong>Student & Parent Portal</strong> to view daily lesson notes, attendance logs, and teacher feedback anytime.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <div className="px-5 py-3 rounded-2xl bg-white/10 border border-white/20 text-center">
              <span className="block text-xl font-black text-white">100%</span>
              <span className="text-[11px] text-purple-200">Safe Environment</span>
            </div>
            <div className="px-5 py-3 rounded-2xl bg-white/10 border border-white/20 text-center">
              <span className="block text-xl font-black text-emerald-300">24/7</span>
              <span className="text-[11px] text-purple-200">Help Desk Support</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
