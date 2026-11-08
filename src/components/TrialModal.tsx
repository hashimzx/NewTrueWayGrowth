import React, { useState } from 'react';
import { X, Calendar, CheckCircle2, Send, MessageCircle, Sparkles, BookOpen } from 'lucide-react';
import { TrialBookingRequest } from '../types/academy';
import { getStoredTrialBookings, saveTrialBookings, DEFAULT_QURAN_COURSES } from '../utils/academyDatabase';

interface TrialModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourseId?: string;
  onSuccess?: () => void;
}

export const TrialModal: React.FC<TrialModalProps> = ({
  isOpen,
  onClose,
  defaultCourseId,
  onSuccess
}) => {
  const [studentName, setStudentName] = useState('');
  const [studentAge, setStudentAge] = useState('8');
  const [parentName, setParentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [courseId, setCourseId] = useState(defaultCourseId || 'course-madani-qaida');
  const [preferredTeacherGender, setPreferredTeacherGender] = useState<'any' | 'male' | 'female'>('any');
  const [preferredTimeSlot, setPreferredTimeSlot] = useState('05:00 PM - 06:00 PM');
  const [timezone, setTimezone] = useState('Europe/London (UK GMT)');
  
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!studentName.trim() || !parentEmail.trim() || !parentPhone.trim()) {
      setErrorMsg('Please provide student name, parent email, and WhatsApp number.');
      return;
    }

    const course = DEFAULT_QURAN_COURSES.find(c => c.id === courseId);
    const newBooking: TrialBookingRequest = {
      id: `trial-${Date.now()}`,
      studentName: studentName.trim(),
      studentAge: parseInt(studentAge, 10) || 8,
      parentName: parentName.trim() || studentName.trim(),
      parentEmail: parentEmail.trim(),
      parentPhone: parentPhone.trim(),
      courseId,
      courseTitle: course ? course.title : 'Quran Course',
      preferredTeacherGender,
      preferredDays: ['Monday', 'Wednesday', 'Friday'],
      preferredTimeSlot,
      timezone,
      status: 'new',
      createdAt: new Date().toISOString().split('T')[0]
    };

    const current = getStoredTrialBookings();
    saveTrialBookings([newBooking, ...current]);

    setSubmitted(true);
    if (onSuccess) onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-purple-100 overflow-hidden">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition z-10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 pb-4 bg-gradient-to-b from-purple-50 via-white to-white text-center space-y-1.5 border-b border-purple-50">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-purple-200 text-[#6B1B7E] text-xs font-bold shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-[#E0107F]" />
            <span>3 Days Free Trial · Zero Obligation</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Book a Free 1-on-1 Quran Trial Class
          </h2>
          <p className="text-xs text-slate-500">
            Certified Alim/Qari instructors · Private Google Meet / Zoom Room · No Card Needed
          </p>
        </div>

        <div className="p-6 pt-4">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-slate-900">
                Trial Request Confirmed!
              </h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Director Abdul Basit Saleem will contact you via WhatsApp to match your child with the best instructor.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row justify-center gap-2">
                <a
                  href={`https://wa.me/923068959085?text=Assalam-o-Alaikum%20Abdul%20Basit%2C%20I%20just%20booked%20a%20free%20trial%20for%20${encodeURIComponent(studentName)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Open WhatsApp Chat</span>
                </a>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-purple-50 hover:bg-purple-100 text-[#6B1B7E] font-bold text-xs rounded-xl transition"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {errorMsg && (
                <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 rounded-xl font-medium">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Student Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rayan Farooq"
                    value={studentName}
                    onChange={e => setStudentName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-[#6B1B7E] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Age</label>
                  <select
                    value={studentAge}
                    onChange={e => setStudentAge(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:border-[#6B1B7E] focus:outline-hidden"
                  >
                    <option value="4">4 Years (Beginner)</option>
                    <option value="5">5 Years</option>
                    <option value="6">6 Years</option>
                    <option value="7">7 Years</option>
                    <option value="8">8 Years</option>
                    <option value="9">9 Years</option>
                    <option value="10">10 Years</option>
                    <option value="11">11 Years</option>
                    <option value="12">12 Years</option>
                    <option value="15">13-17 Years</option>
                    <option value="25">Adult (18+)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Parent Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="parent@example.com"
                    value={parentEmail}
                    onChange={e => setParentEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-[#6B1B7E] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">WhatsApp Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+44 7911 123456"
                    value={parentPhone}
                    onChange={e => setParentPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-[#6B1B7E] focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Desired Course</label>
                  <select
                    value={courseId}
                    onChange={e => setCourseId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:border-[#6B1B7E] focus:outline-hidden"
                  >
                    {DEFAULT_QURAN_COURSES.map(c => (
                      <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Teacher Gender</label>
                  <select
                    value={preferredTeacherGender}
                    onChange={e => setPreferredTeacherGender(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:border-[#6B1B7E] focus:outline-hidden"
                  >
                    <option value="any">Any Qualified Teacher</option>
                    <option value="female">Female Teacher (For Sisters/Kids)</option>
                    <option value="male">Male Teacher (Qari/Hafiz)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#6B1B7E] to-[#E0107F] hover:from-[#5B2A9A] hover:to-[#6B1B7E] text-white font-black text-xs rounded-xl shadow-md transition cursor-pointer mt-1"
              >
                Confirm Free 3-Day Trial Booking
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
