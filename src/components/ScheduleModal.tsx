import React, { useState } from 'react';
import { User, LiveBooking } from '../types';
import { 
  Calendar, 
  Clock, 
  Globe, 
  UserCheck, 
  X, 
  CheckCircle2, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  timezone: string;
  onConfirmBooking: (booking: LiveBooking) => void;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  timezone,
  onConfirmBooking
}) => {
  const [selectedDate, setSelectedDate] = useState('Tomorrow');
  const [selectedSlot, setSelectedSlot] = useState('10:00 AM - 10:45 AM');
  const [selectedTutor, setSelectedTutor] = useState('Qari Bilal Al-Azhari');
  const [isBooked, setIsBooked] = useState(false);

  if (!isOpen) return null;

  const tutors = [
    { name: 'Qari Bilal Al-Azhari', role: 'Madani Qaida & Tajweed Specialist', lang: 'English, Arabic, Urdu' },
    { name: 'Ustadh Tariq Hashimi', role: 'Hifz & Advanced Recitation Coach', lang: 'English, Arabic' },
    { name: 'Ustadha Maryam Siddiqui', role: 'Sisters & Children Quran Instructor', lang: 'English, Urdu' },
  ];

  const timeSlots = [
    '08:00 AM - 08:45 AM',
    '10:00 AM - 10:45 AM',
    '02:00 PM - 02:45 PM',
    '05:30 PM - 06:15 PM',
    '08:00 PM - 08:45 PM',
    '10:30 PM - 11:15 PM'
  ];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const newBooking: LiveBooking = {
      id: `booking-${Date.now()}`,
      studentId: currentUser?.id || 'guest',
      studentName: currentUser?.name || 'International Student',
      instructorName: selectedTutor,
      date: selectedDate === 'Tomorrow' ? 'Oct 24, 2026' : 'Oct 25, 2026',
      timeSlot: selectedSlot,
      timezone: timezone,
      courseTitle: '1-on-1 Madani Qaida & Tajweed Practice',
      status: 'confirmed'
    };

    setIsBooked(true);
    onConfirmBooking(newBooking);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/50">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-red-600/20 text-red-500 rounded-lg">
              <Calendar className="w-4 h-4" />
            </span>
            <span className="text-sm font-bold text-white">
              International 1-on-1 Class Scheduling
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isBooked ? (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-black text-white">Class Confirmed!</h3>
              <p className="text-xs text-zinc-400">
                Your 1-on-1 live session with <strong className="text-white">{selectedTutor}</strong> has been reserved.
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-left text-xs space-y-2">
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-400">Class Time:</span>
                <span className="font-bold text-white">{selectedSlot}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-400">Your Local Timezone:</span>
                <span className="font-bold text-red-400">{timezone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Classroom Link:</span>
                <span className="font-semibold text-emerald-400">Video room link sent to your email</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsBooked(false);
                onClose();
              }}
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs transition"
            >
              Done & Return
            </button>
          </div>
        ) : (
          <form onSubmit={handleBooking} className="p-6 space-y-6">
            
            {/* Timezone Notice */}
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-zinc-300">
                <Globe className="w-4 h-4 text-red-500 shrink-0" />
                <span>All class times automatically converted to your local time:</span>
              </div>
              <span className="font-bold text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-800/40">
                {timezone}
              </span>
            </div>

            {/* Select Tutor */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-300 block">Select Preferred Instructor:</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {tutors.map((t) => (
                  <button
                    key={t.name}
                    type="button"
                    onClick={() => setSelectedTutor(t.name)}
                    className={`p-3 rounded-xl border text-left text-xs transition ${
                      selectedTutor === t.name
                        ? 'border-red-600 bg-zinc-900 text-white'
                        : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:bg-zinc-900'
                    }`}
                  >
                    <span className="font-bold text-white block truncate">{t.name}</span>
                    <span className="text-[10px] text-zinc-400 block mt-0.5 truncate">{t.role}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Select Day */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-300 block">Choose Date:</label>
              <div className="grid grid-cols-2 gap-2">
                {['Tomorrow (Oct 24)', 'In 2 Days (Oct 25)'].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setSelectedDate(d)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition text-center ${
                      selectedDate.includes(d.slice(0, 8))
                        ? 'border-red-600 bg-zinc-900 text-white'
                        : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:bg-zinc-900'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Select Slot */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-300 block">Choose Time Slot:</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2 px-2 rounded-xl border text-center text-xs font-semibold transition ${
                      selectedSlot === slot
                        ? 'border-red-600 bg-red-600 text-white shadow'
                        : 'border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-lg glow-red-sm"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm 1-on-1 Class Reservation</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
