import React from 'react';
import { 
  Users, 
  ShieldCheck, 
  Clock, 
  FileText, 
  Laptop, 
  Gift, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface WhyChooseUsProps {
  onBookFreeTrial?: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onBookFreeTrial }) => {
  const pillars = [
    {
      icon: Users,
      title: '1-on-1 Private Attention',
      desc: 'Every session is exclusively one-on-one between your child and the teacher. This guarantees uninterrupted recitation time and immediate, gentle Makharij correction.',
      badge: '100% Individualized'
    },
    {
      icon: ShieldCheck,
      title: 'Certified Male & Female Scholars',
      desc: 'All instructors are vetted Alim and Hafiz scholars holding Sanad and Ijazah certifications. We provide dedicated female teachers for young girls and sisters.',
      badge: 'Al-Azhar & Wifaq Certified'
    },
    {
      icon: Clock,
      title: 'Flexible 24/7 Global Schedules',
      desc: 'Whether you live in London, New York, Toronto, Sydney, or Dubai, our teachers accommodate your preferred time slots before or after school and on weekends.',
      badge: 'Any Timezone'
    },
    {
      icon: FileText,
      title: 'Detailed Parent Progress Reports',
      desc: 'Parents receive monthly performance report cards detailing attendance, daily Sabaq progression, Tajweed mastery, and personalized teacher recommendations.',
      badge: 'Total Transparency'
    },
    {
      icon: Laptop,
      title: 'Interactive Digital Whiteboards',
      desc: 'Our classes use digital Quran screen sharing, color-coded Tajweed notation, and interactive Madani Qaida tools that keep children engaged and excited to learn.',
      badge: 'Modern Technology'
    },
    {
      icon: Gift,
      title: '3-Day Free Trial (No Card Needed)',
      desc: 'Experience our teaching quality firsthand before making any financial commitment. Test the class format, meet the teacher, and receive a free level diagnostic.',
      badge: 'Zero Risk'
    }
  ];

  return (
    <section id="why-choose-us" className="py-16 lg:py-24 bg-white border-b border-[#6B1B7E]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-[#6B1B7E] text-xs font-bold border border-purple-200">
            <Sparkles className="w-3.5 h-3.5 text-[#E0107F]" />
            <span>Why Choose True Way Quran</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Why Families Worldwide Choose True Way Quran
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            We understand how important authentic Islamic upbringing is for your family. Here is why hundreds of parents across the globe trust True Way Quran.
          </p>
        </div>

        {/* 6 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx}
                className="p-7 rounded-3xl bg-purple-50/40 hover:bg-white border border-purple-100 hover:border-purple-300 transition-all duration-200 shadow-xs hover:shadow-lg space-y-4 group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-white group-hover:bg-gradient-to-br group-hover:from-[#6B1B7E] group-hover:to-[#E0107F] text-[#6B1B7E] group-hover:text-white flex items-center justify-center shadow-xs border border-purple-100 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-white text-[#6B1B7E] text-[11px] font-bold border border-purple-100">
                    {pillar.badge}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#6B1B7E] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Callout Strip */}
        <div className="mt-12 text-center">
          {onBookFreeTrial && (
            <button
              onClick={onBookFreeTrial}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#6B1B7E] via-[#5B2A9A] to-[#E0107F] hover:from-[#5B2A9A] hover:to-[#6B1B7E] text-white font-bold text-sm rounded-xl shadow-md transition cursor-pointer"
            >
              <span>Book Your Child's Free 3-Day Trial</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </section>
  );
};
