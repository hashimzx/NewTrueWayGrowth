import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Mail, MessageCircle, ArrowRight, BookOpen } from 'lucide-react';

interface FaqSectionProps {
  onOpenEnroll: () => void;
  onOpenWhatsApp?: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenEnroll, onOpenWhatsApp }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does the 3-Day Free Trial work?',
      a: 'The 3-day trial is 100% free with no credit card required. You submit your child\'s name, age, and preferred course. We match you with a certified instructor and schedule 3 private 1-on-1 classes. If satisfied, you can proceed with enrollment; otherwise, there is zero obligation.'
    },
    {
      q: 'Are female Quran teachers available for girls and female students?',
      a: 'Yes, absolutely. We have qualified female Hafizah and Alimah instructors with Ijazah in Tajweed dedicated exclusively to teaching sisters and young children in a comfortable, modest online environment.'
    },
    {
      q: 'What age can children start learning at True Way Quran?',
      a: 'Children can start the Madani Qaida Foundation course as young as 4 or 5 years old. Our instructors use visual slides, interactive phonics, and warm encouragement to make learning enjoyable and engaging for young minds.'
    },
    {
      q: 'What equipment or apps do we need for classes?',
      a: 'All you need is a laptop, desktop, iPad, tablet, or smartphone with an internet connection. Classes take place via Zoom or Google Meet with digital Quran screen sharing. We assist you with setup in under 2 minutes.'
    },
    {
      q: 'Can we change our class timetable or reschedule missed sessions?',
      a: 'Yes. We understand family commitments, school exams, and vacations. With advance notice to your assigned teacher or the support desk, missed classes can be rescheduled at no additional cost.'
    },
    {
      q: 'How long is each class and what are the class options?',
      a: 'Classes are 30 minutes of private 1-on-1 instruction. Depending on your goals, families typically choose between 2 days, 3 days, or 5 days per week.'
    }
  ];

  const handleWhatsApp = () => {
    if (onOpenWhatsApp) {
      onOpenWhatsApp();
    } else {
      window.open('https://wa.me/923068959085?text=Assalam-o-Alaikum%20Abdul%20Basit%2C%20I%20have%20questions%20about%20True%20Way%20Quran%20classes.', '_blank');
    }
  };

  return (
    <section id="faqs" className="py-20 bg-white relative overflow-hidden border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Heading & Contact Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-[#6B1B7E] text-xs font-bold border border-purple-200">
                <HelpCircle className="w-3.5 h-3.5 text-[#E0107F]" />
                <span>Frequently Asked Questions</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Everything You Need <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B1B7E] via-[#5B2A9A] to-[#E0107F]">
                  To Know Before Starting
                </span>
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Have questions regarding class timings, our teachers, or fee packages? Reach out to our admissions director anytime.
              </p>
            </div>

            {/* Support Card */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50/60 border border-purple-200/80 rounded-2xl p-6 space-y-4 shadow-xs">
              <h4 className="font-black text-slate-900 text-sm">
                Need Immediate Help or Custom Schedule?
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Speak directly with Mentor Abdul Basit Saleem via WhatsApp voice note or message.
              </p>

              <div className="space-y-2 pt-1">
                <button
                  onClick={handleWhatsApp}
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black flex items-center justify-center gap-2 shadow-xs transition cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp (+92 306 8959085)</span>
                </button>

                <button
                  onClick={onOpenEnroll}
                  className="w-full py-2.5 px-4 bg-white border border-purple-200 hover:bg-purple-100 text-[#6B1B7E] rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <span>Book Free 3-Day Trial</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Accordion */}
          <div className="lg:col-span-7 space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className={`border rounded-2xl transition overflow-hidden ${
                    isOpen 
                      ? 'border-purple-300 bg-purple-50/40 shadow-xs' 
                      : 'border-purple-100 bg-white hover:border-purple-200'
                  }`}
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="p-1 rounded-full bg-purple-100 text-[#6B1B7E] shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-purple-100/60">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
