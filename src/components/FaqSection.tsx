import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Mail, MessageCircle, ArrowRight } from 'lucide-react';

interface FaqSectionProps {
  onOpenEnroll: () => void;
  onOpenWhatsApp?: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenEnroll, onOpenWhatsApp }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What exactly do I get when I enroll?',
      a: 'You get lifetime access to all course content, live Zoom sessions, dedicated community support, step-by-step student acquisition templates, and all future batch updates. It is a one-time payment with zero recurring fees.'
    },
    {
      q: 'Do I need prior experience?',
      a: 'No prior online teaching experience is required. Whether you are a Hafiz, Qari, Islamic studies student, or someone wanting to teach Noorani Qaida and Nazra, we guide you through teaching mechanics, tech setup, and student handling from day one.'
    },
    {
      q: 'Is this theory or practical?',
      a: 'This course is 100% hands-on and practical. You will execute mock teaching sessions, set up digital whiteboards, learn exact conversation scripts for international parents, and run real student recruitment campaigns.'
    },
    {
      q: 'How is this different from free content online?',
      a: 'Free videos give disjointed tips without a cohesive system. Here you receive a proven 30-day structured roadmap, continuous live mentorship directly from Abdul Basit Saleem, verified lesson plans, and an active teacher network.'
    },
    {
      q: 'Can I do this alongside my job or studies?',
      a: 'Absolutely. The schedule is structured for busy professionals, university students, and homemakers. All live sessions are recorded in high-definition so you can study at your own pace.'
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept all major international Credit and Debit Cards (Visa, Mastercard, American Express), digital wallets, and instant 256-bit SSL encrypted checkout for students worldwide.'
    }
  ];

  const handleWhatsApp = () => {
    if (onOpenWhatsApp) {
      onOpenWhatsApp();
    } else {
      window.open('https://wa.me/923068959085?text=Assalam-o-Alaikum%20Abdul%2C%20I%20have%20a%20question%20about%20the%20course', '_blank');
    }
  };

  return (
    <section id="faqs" className="py-20 bg-white relative overflow-hidden border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Heading & Contact Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-100 text-purple-900 rounded-full text-xs font-black uppercase tracking-wider">
                <HelpCircle className="w-3.5 h-3.5 text-pink-600" />
                <span>Frequently Asked Questions</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-purple-950 tracking-tight">
                Still Got Questions? <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-800 to-pink-600">
                  We&apos;ve Got Answers.
                </span>
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Can&apos;t find what you need? Get all your questions answered in class or reach out to Mentor Abdul Basit Saleem directly.
              </p>
            </div>

            {/* Support Card like ustadleads.com */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50/60 border border-purple-200/80 rounded-2xl p-6 space-y-4 shadow-sm">
              <h4 className="font-black text-purple-950 text-sm">
                Need Fast 1-on-1 Guidance?
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Answer through WhatsApp voice note, email, or recorded live breakdown directly from our mentors.
              </p>

              <div className="space-y-2 pt-1">
                <button
                  onClick={handleWhatsApp}
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp (+92 306 8959085)</span>
                </button>

                <button
                  onClick={onOpenEnroll}
                  className="w-full py-2.5 px-4 bg-white border border-purple-200 hover:bg-purple-100 text-purple-950 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <span>Go to Enrollment Form</span>
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
                    className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-purple-950 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="p-1 rounded-full bg-purple-100 text-purple-800 shrink-0">
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
