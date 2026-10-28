import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  Globe 
} from 'lucide-react';

interface ContactSectionProps {
  initialTrack?: 'kids' | 'adults' | 'female' | null;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialTrack }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: 'noorani-qaida',
    studentType: initialTrack || 'kids',
    tutorGender: initialTrack === 'female' ? 'female' : 'any',
    timezone: 'Europe/London (GMT/BST)',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#7c3aed', '#9333ea', '#c084fc', '#f59e0b']
    });
  };

  return (
    <section className="py-16 bg-[#faf8ff] border-t border-purple-100" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-900 rounded-full text-xs font-bold border border-purple-200">
            <Phone className="w-4 h-4 text-purple-600" />
            <span>24/7 International Student Support</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-purple-950">
            Contact True Way Quran & Book Free Trial
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Have questions about our online Quran courses or tutor availability? Fill out the quick form below or contact our global academic offices via WhatsApp or phone.
          </p>
        </div>

        {/* Global Contact Numbers Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-purple-100 rounded-2xl p-5 shadow-sm space-y-1.5 hover:border-purple-300 transition">
            <div className="flex items-center gap-2 text-purple-600 text-xs font-bold uppercase">
              <Globe className="w-4 h-4" />
              <span>United Kingdom & Global</span>
            </div>
            <p className="text-base font-extrabold text-slate-900">+44 808 5310 303</p>
            <span className="text-[11px] text-slate-500">Toll-Free International</span>
          </div>

          <div className="bg-white border border-purple-100 rounded-2xl p-5 shadow-sm space-y-1.5 hover:border-purple-300 transition">
            <div className="flex items-center gap-2 text-purple-600 text-xs font-bold uppercase">
              <Globe className="w-4 h-4" />
              <span>United States & Canada</span>
            </div>
            <p className="text-base font-extrabold text-slate-900">+1 (318) 931 0931</p>
            <span className="text-[11px] text-slate-500">Direct North America Line</span>
          </div>

          <div className="bg-white border border-purple-100 rounded-2xl p-5 shadow-sm space-y-1.5 hover:border-purple-300 transition">
            <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>UstadLeads WhatsApp</span>
            </div>
            <p className="text-base font-extrabold text-slate-900">+92 306 8959085</p>
            <span className="text-[11px] text-emerald-600 font-semibold">Instant Response (Abdul Basit)</span>
          </div>

          <div className="bg-white border border-purple-100 rounded-2xl p-5 shadow-sm space-y-1.5 hover:border-purple-300 transition">
            <div className="flex items-center gap-2 text-purple-600 text-xs font-bold uppercase">
              <Mail className="w-4 h-4" />
              <span>Official Email</span>
            </div>
            <p className="text-base font-extrabold text-slate-900 truncate">support@ustadleads.com</p>
            <span className="text-[11px] text-slate-500">Admissions & Inquiries</span>
          </div>
        </div>

        {/* Main Grid: Form + Office/WhatsApp Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Form: Book 3-Day Free Trial */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-purple-100 shadow-xl space-y-6">
            <div className="border-b border-purple-100 pb-4">
              <h3 className="text-2xl font-black text-purple-950">
                Book Your 3-Day Free Trial Class
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Fill this form to reserve your free sessions. We never share your contact details.
              </p>
            </div>

            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 border border-emerald-300 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-black text-purple-950">Free Trial Request Received!</h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  JazakAllah Khair! Our academic coordinator will contact you via WhatsApp or Email at <strong>{formData.phone || formData.email}</strong> within 2 hours to confirm your tutor schedule.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 bg-purple-600 text-white rounded-xl text-xs font-bold"
                >
                  Book for Another Student
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      Parent / Student Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Brother Ahmad / Sister Fatima"
                      className="w-full bg-purple-50/50 border border-purple-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full bg-purple-50/50 border border-purple-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      Phone / WhatsApp Number (with Country Code) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+44 7911 123456"
                      className="w-full bg-purple-50/50 border border-purple-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      Select Course *
                    </label>
                    <select
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      className="w-full bg-purple-50/50 border border-purple-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="noorani-qaida">Noorani & Madani Qaida</option>
                      <option value="quran-tajweed">Quran Reading with Tajweed</option>
                      <option value="quran-hifz">Quran Memorization (Hifz)</option>
                      <option value="translation-tafseer">Quran Translation & Tafseer</option>
                      <option value="islamic-studies">Islamic Studies for Kids</option>
                      <option value="arabic-language">Quranic Arabic Language</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      Student Category *
                    </label>
                    <select
                      value={formData.studentType}
                      onChange={(e) => setFormData({ ...formData, studentType: e.target.value as any })}
                      className="w-full bg-purple-50/50 border border-purple-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="kids">Child (Ages 4 - 15)</option>
                      <option value="female">Sister / Female Student</option>
                      <option value="adults">Brother / Adult</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      Teacher Gender Preference *
                    </label>
                    <select
                      value={formData.tutorGender}
                      onChange={(e) => setFormData({ ...formData, tutorGender: e.target.value })}
                      className="w-full bg-purple-50/50 border border-purple-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="female">Female Teacher (Exclusively)</option>
                      <option value="male">Male Teacher</option>
                      <option value="any">No Preference (First Available)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Your Timezone & Preferred Days/Hours
                  </label>
                  <input
                    type="text"
                    value={formData.timezone}
                    onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                    placeholder="e.g. London GMT, weekdays after 5:00 PM"
                    className="w-full bg-purple-50/50 border border-purple-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Special Notes or Prior Experience
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about the student's current Quran level, age, or any specific goals..."
                    className="w-full bg-purple-50/50 border border-purple-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-black rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit & Claim 3-Day Free Trial</span>
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>100% Free · No Obligation · Instant WhatsApp Confirmation</span>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Direct WhatsApp & FAQ */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* WhatsApp Box */}
            <div className="bg-gradient-to-br from-emerald-600 to-teal-800 text-white rounded-3xl p-7 shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded-full">
                  Fastest Response
                </span>
                <span className="w-3 h-3 rounded-full bg-emerald-300 animate-ping" />
              </div>

              <h4 className="text-2xl font-black">Chat Directly on WhatsApp</h4>
              <p className="text-xs text-emerald-50 leading-relaxed">
                Want to book instantly or ask a quick question? Message our admissions director on WhatsApp right now. We typically reply in under 5 minutes.
              </p>

              <a
                href="https://wa.me/923068959085?text=Assalam-o-Alaikum,%20Abdul%20Basit,%20I%20am%20interested%20in%20online%20Quran%20classes%20and%20the%20Online%20Quran%20Teacher%20Course."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-white text-emerald-800 font-black rounded-xl text-xs hover:bg-emerald-50 transition shadow cursor-pointer"
              >
                <span>Open WhatsApp (+92 306 8959085)</span>
              </a>
            </div>

            {/* Admissions Advisory & Support Information (No Bank Details) */}
            <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-purple-100 pb-3">
                <h4 className="text-base font-bold text-purple-950 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-purple-600" />
                  <span>Admissions Advisory Desk</span>
                </h4>
                <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2.5 py-0.5 rounded-full">
                  Available 24/7
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Need guidance choosing the right course or scheduling private 1-on-1 sessions for yourself or your children? Our dedicated academic counselors are here to help.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3.5 bg-purple-50/60 rounded-2xl border border-purple-100">
                  <Clock className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className="font-bold text-purple-950">Flexible Global Timings</p>
                    <p className="text-slate-500 text-[11px] mt-0.5">Classes running 24/7 across UK, USA, Canada, Australia and Gulf timezones.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 bg-purple-50/60 rounded-2xl border border-purple-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className="font-bold text-purple-950">Certified Male & Female Faculty</p>
                    <p className="text-slate-500 text-[11px] mt-0.5">Alim & Alimah certified teachers specialized in kids, adult beginners, and advanced Tajweed.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 bg-purple-50/60 rounded-2xl border border-purple-100">
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className="font-bold text-purple-950">100% Free 3-Day Evaluation</p>
                    <p className="text-slate-500 text-[11px] mt-0.5">No credit card required. Experience interactive private lessons before any commitment.</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-600 border border-slate-200 flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Academic Office:</strong> UstadLeads & True Way Quran Academy · UK & Pakistan Student Desks.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
