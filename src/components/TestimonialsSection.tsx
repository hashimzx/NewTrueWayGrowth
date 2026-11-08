import React from 'react';
import { Star, Quote, CheckCircle2, BookOpen, Sparkles } from 'lucide-react';

interface TestimonialsSectionProps {
  onBookFreeTrial?: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ onBookFreeTrial }) => {
  const reviews = [
    {
      name: 'Sister Yasmin Farooq',
      location: 'Birmingham, United Kingdom',
      course: 'Madani Qaida & Quran with Tajweed',
      child: 'Mother of Rayan (7) and Zara (9)',
      quote: 'Living in the UK, finding reliable, qualified Quran teachers who speak fluent English was so difficult. Ustadha Maryam and Qari Bilal have been a true blessing. My 7-year-old son completed his Madani Qaida in just 7 weeks and now recites Surah Al-Fatihah with proper Makharij!',
      rating: 5,
      date: 'November 2026'
    },
    {
      name: 'Brother Tariq Mehmood',
      location: 'Dallas, Texas, USA',
      course: 'Quran Memorization (Hifz Program)',
      child: 'Father of Daniyal (12)',
      quote: 'The Sabaq, Sabqi, and Manzil system at True Way Quran is exceptional. My son has already memorized 4 Juz with flawless retention. The teacher connects promptly on Google Meet and gives me weekly verbal feedback. Worth every penny.',
      rating: 5,
      date: 'October 2026'
    },
    {
      name: 'Dr. Harris & Fatima Ahmed',
      location: 'Toronto, Canada',
      course: 'Quran with Tajweed & Islamic Studies',
      child: 'Parents of Hamza (11) and Maryam (8)',
      quote: 'What sets True Way Quran apart is their patience with kids. They do not yell or rush. They use digital screen sharing with color-coded Tajweed, making it so enjoyable. My children look forward to their class every day after school.',
      rating: 5,
      date: 'October 2026'
    },
    {
      name: 'Sister Samina Al-Rashid',
      location: 'Dubai, UAE',
      course: 'Quran Translation & Tafseer',
      child: 'Adult Learner',
      quote: 'I wanted to understand the words I recite in Salah. Sheikh Zaid\'s word-for-word translation classes opened my eyes to the beauty of the Quran. The flexible timetable fits perfectly around my work schedule.',
      rating: 5,
      date: 'September 2026'
    }
  ];

  return (
    <section id="reviews" className="py-16 lg:py-24 bg-white border-b border-[#6B1B7E]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-[#6B1B7E] text-xs font-bold border border-purple-200">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span>Parent & Student Testimonials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Loved by Muslim Families Worldwide
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Read real feedback from parents across the UK, USA, Canada, and Australia whose children are flourishing at True Way Quran Academy.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {reviews.map((rev, idx) => (
            <div 
              key={idx}
              className="p-7 rounded-3xl bg-purple-50/40 hover:bg-white border border-purple-100 hover:border-purple-300 transition-all duration-200 shadow-xs hover:shadow-lg flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, rIdx) => (
                      <Star key={rIdx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold text-[10px] flex items-center gap-1 border border-emerald-100">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Verified Parent</span>
                  </span>
                </div>

                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed italic">
                  "{rev.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-purple-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{rev.name}</h4>
                  <p className="text-xs text-slate-500">{rev.location}</p>
                  <p className="text-[11px] text-[#6B1B7E] font-semibold">{rev.child}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-0.5 bg-white text-[#6B1B7E] text-[10px] font-bold rounded border border-purple-200">
                    {rev.course}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Bar */}
        <div className="mt-12 text-center">
          {onBookFreeTrial && (
            <button
              onClick={onBookFreeTrial}
              className="px-8 py-3.5 bg-gradient-to-r from-[#6B1B7E] via-[#5B2A9A] to-[#E0107F] hover:from-[#5B2A9A] hover:to-[#6B1B7E] text-white font-bold text-sm rounded-xl shadow-md transition cursor-pointer"
            >
              Book Your Free 3-Day Trial Class Today
            </button>
          )}
        </div>

      </div>
    </section>
  );
};
