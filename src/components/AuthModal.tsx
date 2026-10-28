import React, { useState } from 'react';
import { User } from '../types';
import { 
  User as UserIcon, 
  Lock, 
  Mail, 
  Globe, 
  X, 
  CheckCircle, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  UserCheck,
  Flame,
  Award
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
  onNavigateToAttendance?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  onNavigateToAttendance
}) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('United Kingdom');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'forgot') {
      setForgotSuccess(true);
      return;
    }

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: mode === 'register' ? (name || 'New Student') : (email.includes('admin') ? 'TWQ Director' : 'Hashim Zafar'),
      email: email || (mode === 'register' ? 'student@truewayquran.com' : 'hashimzafar2k@gmail.com'),
      role: email.toLowerCase().includes('admin') ? 'admin' : 'student',
      country: country,
      timezone: 'Europe/London (GMT)',
      enrolledCourseIds: ['course-madani-qaida', 'course-tajweed-rules'],
      progress: {
        completedLessonIds: ['lesson-1', 'lesson-2'],
        masteredWordIds: ['w-1', 'w-2', 'w-3', 'w-4', 'w-201', 'w-202'],
        averagePronunciationScore: 88,
        practiceMinutes: 145,
        streakDays: 7,
        lastPracticeDate: new Date().toISOString()
      },
      bookmarks: ['w-6', 'w-15']
    };

    onLogin(newUser);
    onClose();
  };

  const loginAsDemoStudent = () => {
    const studentUser: User = {
      id: 'demo-student-1',
      name: 'Hashim Zafar',
      email: 'hashimzafar2k@gmail.com',
      role: 'student',
      country: 'United Kingdom',
      timezone: 'Europe/London (GMT)',
      enrolledCourseIds: ['course-madani-qaida', 'course-tajweed-rules'],
      progress: {
        completedLessonIds: ['lesson-1', 'lesson-2'],
        masteredWordIds: ['w-1', 'w-2', 'w-3', 'w-4', 'w-201', 'w-202'],
        averagePronunciationScore: 88,
        practiceMinutes: 160,
        streakDays: 7,
        lastPracticeDate: new Date().toISOString()
      },
      bookmarks: ['w-6', 'w-15']
    };
    onLogin(studentUser);
    onClose();
  };

  const loginAsDemoAdmin = () => {
    const adminUser: User = {
      id: 'demo-admin-1',
      name: 'TWQ Academy Admin',
      email: 'admin@truewayquran.com',
      role: 'admin',
      country: 'International Academy',
      timezone: 'Asia/Dubai (GST)',
      enrolledCourseIds: ['course-madani-qaida', 'course-tajweed-rules', 'course-tarteel-fluent', 'course-hifz-memorization', 'course-islamic-studies'],
      progress: {
        completedLessonIds: ['lesson-1', 'lesson-2', 'lesson-3'],
        masteredWordIds: ['w-1', 'w-2', 'w-3', 'w-4', 'w-5', 'w-6', 'w-201', 'w-202'],
        averagePronunciationScore: 96,
        practiceMinutes: 480,
        streakDays: 24,
        lastPracticeDate: new Date().toISOString()
      },
      bookmarks: []
    };
    onLogin(adminUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-md bg-white border-2 border-[#6B1B7E]/20 rounded-3xl shadow-2xl overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header in Brand Gradient */}
        <div className="bg-gradient-to-r from-[#6B1B7E] via-[#5B2A9A] to-[#E0107F] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-white/20 rounded-xl">
              <UserIcon className="w-4 h-4 text-white" />
            </span>
            <span className="text-sm font-black tracking-wide">
              {mode === 'login' && 'Student Portal Sign In'}
              {mode === 'register' && 'New Student Registration'}
              {mode === 'forgot' && 'Reset Account Password'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher: Login vs Sign Up */}
        <div className="flex border-b border-purple-100 bg-purple-50/50 p-1">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-2 text-xs font-black rounded-xl transition cursor-pointer ${
              mode === 'login'
                ? 'bg-white text-[#6B1B7E] shadow-xs'
                : 'text-slate-600 hover:text-[#6B1B7E]'
            }`}
          >
            Student Login
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`flex-1 py-2 text-xs font-black rounded-xl transition cursor-pointer ${
              mode === 'register'
                ? 'bg-white text-[#6B1B7E] shadow-xs'
                : 'text-slate-600 hover:text-[#6B1B7E]'
            }`}
          >
            Create Account (Sign Up)
          </button>
        </div>

        {/* Student Attendance Callout Banner */}
        <div className="mx-6 mt-4 p-3 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border border-[#6B1B7E]/15 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <UserCheck className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-slate-900">
              Daily Class Attendance Enabled
            </p>
            <p className="text-[11px] text-slate-600 leading-tight">
              Log in daily to mark your class presence, track study streaks, and unlock certified credits.
            </p>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5">
          
          {/* Quick Demo Buttons for immediate verification */}
          <div className="bg-purple-50/70 border border-[#6B1B7E]/15 rounded-2xl p-3 space-y-2">
            <div className="flex items-center justify-between text-[11px] text-slate-500 font-bold">
              <span>Quick One-Click Demo Access:</span>
              <span className="text-[#E0107F]">Instant Entry</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={loginAsDemoStudent}
                className="py-2 px-2.5 bg-white hover:bg-purple-100 text-[#6B1B7E] rounded-xl text-xs font-black border border-purple-200 transition flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <UserIcon className="w-3.5 h-3.5 text-[#E0107F]" />
                <span>Demo Student</span>
              </button>

              <button
                type="button"
                onClick={loginAsDemoAdmin}
                className="py-2 px-2.5 bg-white hover:bg-purple-100 text-[#5B2A9A] rounded-xl text-xs font-black border border-purple-200 transition flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#6B1B7E]" />
                <span>Demo Admin</span>
              </button>
            </div>
          </div>

          {forgotSuccess ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-300 flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Reset Link Sent</h4>
              <p className="text-xs text-slate-600">
                A password reset authorization link has been forwarded to <strong>{email}</strong>.
              </p>
              <button
                type="button"
                onClick={() => {
                  setForgotSuccess(false);
                  setMode('login');
                }}
                className="text-xs font-bold text-[#6B1B7E] hover:underline"
              >
                Return to Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Student Full Name
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-[#6B1B7E] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Hashim Zafar"
                      className="w-full pl-9 pr-3 py-2.5 bg-purple-50/50 border border-purple-200 rounded-xl text-xs text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#6B1B7E]"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#6B1B7E] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full pl-9 pr-3 py-2.5 bg-purple-50/50 border border-purple-200 rounded-xl text-xs text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#6B1B7E]"
                  />
                </div>
              </div>

              {mode !== 'forgot' && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700">Password</label>
                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={() => setMode('forgot')}
                        className="text-[11px] font-bold text-[#E0107F] hover:underline"
                      >
                        Forgot?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#6B1B7E] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2.5 bg-purple-50/50 border border-purple-200 rounded-xl text-xs text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#6B1B7E]"
                    />
                  </div>
                </div>
              )}

              {mode === 'register' && (
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Country of Residence
                  </label>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-[#6B1B7E] absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-purple-50/50 border border-purple-200 rounded-xl text-xs text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#6B1B7E]"
                    >
                      <option value="United Kingdom">United Kingdom (GMT)</option>
                      <option value="United States">United States (EST/PST)</option>
                      <option value="Canada">Canada (EST/CST)</option>
                      <option value="Australia">Australia (AEST)</option>
                      <option value="United Arab Emirates">United Arab Emirates (GST)</option>
                      <option value="Saudi Arabia">Saudi Arabia (AST)</option>
                      <option value="Pakistan">Pakistan (PKT)</option>
                    </select>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#6B1B7E] via-[#5B2A9A] to-[#E0107F] hover:opacity-95 text-white font-black text-xs rounded-xl transition shadow-md shadow-[#E0107F]/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>
                  {mode === 'login' && 'Sign In to Student Portal'}
                  {mode === 'register' && 'Register & Activate Daily Attendance'}
                  {mode === 'forgot' && 'Send Password Recovery'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Bottom Switcher */}
          <div className="pt-2 text-center text-xs text-slate-500">
            {mode === 'login' ? (
              <p>
                Don't have an academy account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="font-black text-[#6B1B7E] hover:underline"
                >
                  Create one now
                </button>
              </p>
            ) : (
              <p>
                Already registered with True Way Quran?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="font-black text-[#6B1B7E] hover:underline"
                >
                  Sign in here
                </button>
              </p>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
