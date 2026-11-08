import React, { useState } from 'react';
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  Sparkles,
  BookOpen,
  Calendar,
  UserCheck
} from 'lucide-react';
import { TrialBookingRequest } from '../types/academy';
import { getStoredTrialBookings, saveTrialBookings, DEFAULT_QURAN_COURSES } from '../utils/academyDatabase';

interface ContactSectionProps {
  onSuccessSubmit?: (booking: TrialBookingRequest) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onSuccessSubmit }) => {
  const [studentName, setStudentName] = useState('');
  const [studentAge, setStudentAge] = useState('8');
  const [parentName, setParentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [courseId, setCourseId] = useState('course-madani-qaida');
  const [preferredTeacherGender, setPreferredTeacherGender] = useState<'any' | 'male' | 'female'>('any');
  const [preferredTimeSlot, setPreferredTimeSlot] = useState('05:00 PM - 06:00 PM (After School)');
  const [timezone, setTimezone] = useState('Europe/London (UK GMT)');
  const [notes, setNotes] = useState('');
  
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!studentName.trim() || !parentEmail.trim() || !parentPhone.trim()) {
      setErrorMessage('Please fill in student name, parent email, and WhatsApp phone number.');
      return;
    }

    setIsSubmitting(true);

    const selectedCourse = DEFAULT_QURAN_COURSES.find(c => c.id === courseId);
    const courseTitle = selectedCourse ? selectedCourse.title : 'Quran Course';

    const newBooking: TrialBookingRequest = {
      id: `trial-${Date.now()}`,
      studentName: studentName.trim(),
      studentAge: parseInt(studentAge, 10) || 8,
      parentName: parentName.trim() || studentName.trim(),
      parentEmail: parentEmail.trim(),
      parentPhone: parentPhone.trim(),
      courseId,
      courseTitle,
      preferredTeacherGender,
      preferredDays: ['Monday', 'Wednesday', 'Friday'],
      preferredTimeSlot,
      timezone,
      notes: notes.trim(),
      status: 'new',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    const currentBookings = getStoredTrialBookings();
    saveTrialBookings([newBooking, ...currentBookings]);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      if (onSuccessSubmit) {
        onSuccessSubmit(newBooking);
      }
    }, 400);
  };

  const handleReset = () => {
    setStudentName('');
    setParentName('');
    setParentEmail('');
    setParentPhone('');
    setNotes('');
    setSubmitted(false);
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-gradient-to-b from-[#faf8ff] via-white to-purple-50/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-[#6B1B7E] text-xs font-bold border border-purple-200">
            <Calendar className="w-3.5 h-3.5 text-[#E0107F]" />
            <span>Admissions & Free Trial Booking</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Book a Free 3-Day Trial Class
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Experience our 1-on-1 teaching quality with zero financial commitment. Fill out the form below or message our admissions director on WhatsApp.
          </p>
        </div>

        {/* 4 Direct Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          
          <div className="p-5 bg-white rounded-2xl border border-purple-100 shadow-xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Direct WhatsApp</span>
              <a 
                href="https://wa.me/923068959085?text=Assalam-o-Alaikum%20Abdul%20Basit%2C%20I%20want%20to%20book%20a%20free%20trial%20class."
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-slate-900 text-sm hover:text-emerald-700 block transition"
              >
                +92 306 8959085
              </a>
              <span className="text-[11px] text-emerald-600 font-medium">Instant 24/7 Response</span>
            </div>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-purple-100 shadow-xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#6B1B7E] flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">United Kingdom</span>
              <a 
                href="tel:+448085310303" 
                className="font-bold text-slate-900 text-sm hover:text-[#6B1B7E] block transition"
              >
                +44 808 5310 303
              </a>
              <span className="text-[11px] text-slate-500">Toll-Free UK & Europe</span>
            </div>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-purple-100 shadow-xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#5B2A9A] flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">North America</span>
              <a 
                href="tel:+13189310931" 
                className="font-bold text-slate-900 text-sm hover:text-[#6B1B7E] block transition"
              >
                +1 (318) 931 0931
              </a>
              <span className="text-[11px] text-slate-500">Direct USA & Canada</span>
            </div>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-purple-100 shadow-xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-pink-50 text-[#E0107F] flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Official Email</span>
              <a 
                href="mailto:support@ustadleads.com" 
                className="font-bold text-slate-900 text-sm hover:text-[#E0107F] block transition truncate"
              >
                support@ustadleads.com
              </a>
              <span className="text-[11px] text-slate-500">Admissions & Support</span>
            </div>
          </div>

        </div>

        {/* 2-Column: Free Trial Form & Info Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Booking Form */}
          <div className="lg:col-span-8 bg-white p-7 sm:p-10 rounded-3xl border border-purple-100 shadow-xl shadow-purple-900/5">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">
                  Trial Class Request Received!
                </h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  JazakAllah Khair! Mentor Abdul Basit Saleem or our admissions team will message you via WhatsApp within <strong>2 hours</strong> to confirm your teacher and schedule your first 1-on-1 session.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={`https://wa.me/923068959085?text=Assalam-o-Alaikum%20Abdul%20Basit%2C%20I%20just%20submitted%20a%20free%20trial%20class%20request%20for%20${encodeURIComponent(studentName)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Open WhatsApp Chat Now</span>
                  </a>
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 bg-purple-50 hover:bg-purple-100 text-[#6B1B7E] font-bold text-xs rounded-xl transition"
                  >
                    Book Another Child
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                    Request Your Free Trial Class
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1">
                    Select your course, child's age, and preferred schedule. No credit card required.
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Student Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={e => setStudentName(e.target.value)}
                      placeholder="e.g. Rayan Farooq"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-[#6B1B7E] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Student Age
                    </label>
                    <select
                      value={studentAge}
                      onChange={e => setStudentAge(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-[#6B1B7E] focus:outline-hidden bg-white"
                    >
                      <option value="4">4 Years Old (Early Phonics)</option>
                      <option value="5">5 Years Old</option>
                      <option value="6">6 Years Old</option>
                      <option value="7">7 Years Old</option>
                      <option value="8">8 Years Old</option>
                      <option value="9">9 Years Old</option>
                      <option value="10">10 Years Old</option>
                      <option value="11">11 Years Old</option>
                      <option value="12">12 Years Old</option>
                      <option value="14">13-16 Years Old (Youth)</option>
                      <option value="25">Adult (18+)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Parent / Guardian Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={parentEmail}
                      onChange={e => setParentEmail(e.target.value)}
                      placeholder="parent@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-[#6B1B7E] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      WhatsApp / Phone (with Country Code) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={parentPhone}
                      onChange={e => setParentPhone(e.target.value)}
                      placeholder="+44 7911 123456 or +1 312 555 0192"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-[#6B1B7E] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Course Needed *
                    </label>
                    <select
                      value={courseId}
                      onChange={e => setCourseId(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-[#6B1B7E] focus:outline-hidden bg-white"
                    >
                      {DEFAULT_QURAN_COURSES.map(c => (
                        <option key={c.id} value={c.id}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Preferred Teacher Gender
                    </label>
                    <select
                      value={preferredTeacherGender}
                      onChange={e => setPreferredTeacherGender(e.target.value as any)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-[#6B1B7E] focus:outline-hidden bg-white"
                    >
                      <option value="any">Any Qualified Teacher (Fastest Match)</option>
                      <option value="female">Female Teacher (For Sisters / Young Kids)</option>
                      <option value="male">Male Teacher (Qari / Hafiz)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Timezone & Country
                    </label>
                    <select
                      value={timezone}
                      onChange={e => setTimezone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-[#6B1B7E] focus:outline-hidden bg-white"
                    >
                      <option value="Europe/London (UK GMT)">United Kingdom / Europe (GMT/BST)</option>
                      <option value="America/New_York (US EST)">USA / Canada (Eastern Time)</option>
                      <option value="America/Chicago (US CST)">USA / Canada (Central Time)</option>
                      <option value="America/Los_Angeles (US PST)">USA / Canada (Pacific Time)</option>
                      <option value="Asia/Dubai (UAE GST)">UAE / Gulf Countries (GST)</option>
                      <option value="Australia/Sydney (AEST)">Australia / New Zealand (AEST)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Preferred Time Slot
                    </label>
                    <select
                      value={preferredTimeSlot}
                      onChange={e => setPreferredTimeSlot(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-[#6B1B7E] focus:outline-hidden bg-white"
                    >
                      <option value="04:00 PM - 05:00 PM (After School)">04:00 PM – 05:00 PM (After School)</option>
                      <option value="05:00 PM - 06:00 PM (Evening)">05:00 PM – 06:00 PM (Evening)</option>
                      <option value="06:00 PM - 07:00 PM (Evening)">06:00 PM – 07:00 PM (Evening)</option>
                      <option value="07:00 PM - 08:30 PM (Night)">07:00 PM – 08:30 PM (Night)</option>
                      <option value="Weekend Mornings (Sat/Sun)">Weekend Mornings (Sat/Sun)</option>
                      <option value="Weekend Afternoons (Sat/Sun)">Weekend Afternoons (Sat/Sun)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Student Current Level or Notes (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Tell us if your child is a complete beginner, knows Arabic letters, or has already read certain Surahs..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-[#6B1B7E] focus:outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-[#6B1B7E] via-[#5B2A9A] to-[#E0107F] hover:from-[#5B2A9A] hover:to-[#6B1B7E] text-white font-black text-sm rounded-2xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting Request...' : 'Book 3-Day Free Trial Class'}</span>
                </button>

                <p className="text-center text-[11px] text-slate-400">
                  🔒 100% Free · No Payment Required · Verified Al-Azhar & Wifaq Teachers
                </p>
              </form>
            )}
          </div>

          {/* Right Column: Information & Guarantee */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="p-6 bg-gradient-to-br from-[#6B1B7E] to-[#5B2A9A] rounded-3xl text-white shadow-lg space-y-4">
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[11px] font-bold text-purple-200">
                Direct Admissions Desk
              </span>
              <h4 className="text-xl font-bold text-white leading-tight">
                Chat Directly with Mentor Abdul Basit Saleem
              </h4>
              <p className="text-xs text-purple-100 leading-relaxed">
                Prefer quick messaging instead of forms? Speak with our academy director directly on WhatsApp to choose your days and schedule.
              </p>
              <a
                href="https://wa.me/923068959085?text=Assalam-o-Alaikum%20Abdul%20Basit%2C%20I%20want%20to%20enroll%20my%20child%20at%20True%20Way%20Quran."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Open WhatsApp (+92 306 8959085)</span>
              </a>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-purple-100 shadow-xs space-y-4">
              <h4 className="font-bold text-slate-900 text-sm">
                What Happens in the Free Trial?
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>15-minute gentle reading diagnostic with a certified scholar</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Experience the live digital screen sharing and classroom tools</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Get feedback on Makharij, Tajweed, and recommended pace</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Confirm whether you prefer to continue with the assigned teacher</span>
                </li>
              </ul>
            </div>

            <div className="p-5 bg-purple-50/60 rounded-2xl border border-purple-100 text-xs text-slate-600 space-y-2">
              <span className="font-bold text-slate-900 block text-xs">
                Academy Operating Headquarters:
              </span>
              <p>
                True Way Quran Academy · UK, USA & Pakistan Educational Operations Desk.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
