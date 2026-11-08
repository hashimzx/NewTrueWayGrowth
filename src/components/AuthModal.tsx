import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User as UserIcon, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  ShieldCheck,
  Phone,
  BookOpen,
  Calendar,
  GraduationCap
} from 'lucide-react';
import { AcademyUser } from '../types/academy';
import { getStoredAcademyUsers, saveAcademyUsers } from '../utils/academyDatabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: any) => void;
  initialMode?: 'login' | 'register' | 'admin_login';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  initialMode = 'login'
}) => {
  const [authRole, setAuthRole] = useState<'student' | 'instructor' | 'admin'>(
    initialMode === 'admin_login' ? 'admin' : 'student'
  );
  const [mode, setMode] = useState<'login' | 'register' | 'forgot' | 'verify'>('login');

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [studentAge, setStudentAge] = useState('8');
  const [parentName, setParentName] = useState('');

  // Password Visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Status & Validation
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [pendingVerificationUser, setPendingVerificationUser] = useState<AcademyUser | null>(null);

  if (!isOpen) return null;

  const handleApplyDemoCredentials = (targetRole: 'student' | 'instructor' | 'admin') => {
    setAuthRole(targetRole);
    setMode('login');
    setErrorMessage(null);
    setSuccessMessage(null);

    if (targetRole === 'student') {
      setEmail('student@truewayquran.com');
      setPassword('student123');
    } else if (targetRole === 'instructor') {
      setEmail('teacher@truewayquran.com');
      setPassword('teacher123');
    } else if (targetRole === 'admin') {
      setEmail('admin@truewayquran.com');
      setPassword('admin123');
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    const allUsers = getStoredAcademyUsers();
    const cleanEmail = email.trim().toLowerCase();

    // Find matching user
    const existingUser = allUsers.find(
      u => u.email.toLowerCase() === cleanEmail
    );

    if (!existingUser) {
      setErrorMessage('No account found with this email address. Please register or check for typos.');
      return;
    }

    // Check role restriction
    if (authRole === 'admin' && existingUser.role !== 'admin') {
      setErrorMessage('Access denied: This portal is strictly for authorized True Way Quran administrators.');
      return;
    }

    if (authRole === 'instructor' && existingUser.role !== 'instructor' && existingUser.role !== 'admin') {
      setErrorMessage('Access denied: This login is reserved for certified Quran instructors.');
      return;
    }

    // Verify Password
    if (existingUser.passwordHash && existingUser.passwordHash !== password) {
      setErrorMessage('Incorrect password. Please verify or use "Forgot Password?".');
      return;
    }

    // Check Active Status
    if (existingUser.status === 'inactive') {
      setErrorMessage('This account is currently inactive. Please contact the academy admissions desk.');
      return;
    }

    onLogin(existingUser);
    onClose();
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage('Student name is required.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('A valid email address is required.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please re-enter.');
      return;
    }

    const allUsers = getStoredAcademyUsers();
    const cleanEmail = email.trim().toLowerCase();

    // Prevent duplicate registrations
    const duplicate = allUsers.find(u => u.email.toLowerCase() === cleanEmail);
    if (duplicate) {
      setErrorMessage('An account with this email already exists. Please log in instead.');
      return;
    }

    const newUser: AcademyUser = {
      id: `usr-student-${Date.now()}`,
      name: name.trim(),
      email: cleanEmail,
      passwordHash: password,
      role: 'student',
      phone: phone.trim(),
      country: 'United Kingdom',
      timezone: 'Europe/London (GMT)',
      status: 'active',
      emailVerified: false,
      createdAt: new Date().toISOString().split('T')[0],
      studentAge: parseInt(studentAge, 10) || 8,
      parentName: parentName.trim() || name.trim(),
      parentPhone: phone.trim(),
      enrolledCourseIds: ['course-madani-qaida', 'course-quran-tajweed'],
      assignedTeacherId: 'teacher-bilal',
      assignedTeacherName: 'Qari Muhammad Bilal Al-Azhari',
      monthlyFee: 50,
      currency: 'GBP'
    };

    const updated = [newUser, ...allUsers];
    saveAcademyUsers(updated);

    setPendingVerificationUser(newUser);
    setMode('verify');
    setSuccessMessage(`Account created for ${newUser.name}! Verification code sent to ${newUser.email}.`);
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pendingVerificationUser) return;

    const allUsers = getStoredAcademyUsers();
    const verifiedUsers = allUsers.map(u => 
      u.id === pendingVerificationUser.id ? { ...u, emailVerified: true } : u
    );
    saveAcademyUsers(verifiedUsers);

    onLogin({ ...pendingVerificationUser, emailVerified: true });
    onClose();
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMessage('Please enter your email to receive password reset instructions.');
      return;
    }
    setSuccessMessage(`If an account exists for ${email}, password reset instructions have been sent.`);
    setTimeout(() => {
      setMode('login');
      setSuccessMessage(null);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-purple-100 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition z-10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 pb-4 bg-gradient-to-b from-purple-50 via-white to-white text-center space-y-2 border-b border-purple-50">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-purple-200 text-[#6B1B7E] text-xs font-bold shadow-2xs">
            <BookOpen className="w-3.5 h-3.5 text-[#E0107F]" />
            <span>True Way Quran Academy</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            {authRole === 'admin' 
              ? 'Admin Management Portal'
              : authRole === 'instructor'
              ? 'Quran Instructor Login'
              : mode === 'register' 
              ? 'Student & Parent Registration'
              : 'Student & Parent Portal'}
          </h2>
          <p className="text-xs text-slate-500">
            {authRole === 'admin'
              ? 'Secure console to manage students, teachers, and trial classes.'
              : authRole === 'instructor'
              ? 'Access assigned students, daily lesson logs, and launch live classes.'
              : 'Log in to view your class schedule, daily Sabaq, and teacher notes.'}
          </p>
        </div>

        {/* Role Toggle Strip */}
        <div className="px-6 pt-3">
          <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-xl text-xs font-bold text-center">
            <button
              onClick={() => { setAuthRole('student'); setMode('login'); setErrorMessage(null); }}
              className={`py-1.5 rounded-lg transition cursor-pointer ${
                authRole === 'student' ? 'bg-white text-[#6B1B7E] shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Student / Parent
            </button>
            <button
              onClick={() => { setAuthRole('instructor'); setMode('login'); setErrorMessage(null); }}
              className={`py-1.5 rounded-lg transition cursor-pointer ${
                authRole === 'instructor' ? 'bg-white text-[#6B1B7E] shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Teacher Portal
            </button>
            <button
              onClick={() => { setAuthRole('admin'); setMode('login'); setErrorMessage(null); }}
              className={`py-1.5 rounded-lg transition cursor-pointer ${
                authRole === 'admin' ? 'bg-white text-[#6B1B7E] shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Admin Portal
            </button>
          </div>
        </div>

        {/* Sub-Tabs: Sign In vs Register (for students only) */}
        {authRole === 'student' && mode !== 'verify' && mode !== 'forgot' && (
          <div className="flex border-b border-slate-100 mx-6 mt-3">
            <button
              onClick={() => { setMode('login'); setErrorMessage(null); }}
              className={`flex-1 py-2 text-xs font-bold border-b-2 transition cursor-pointer ${
                mode === 'login'
                  ? 'border-[#6B1B7E] text-[#6B1B7E]'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode('register'); setErrorMessage(null); }}
              className={`flex-1 py-2 text-xs font-bold border-b-2 transition cursor-pointer ${
                mode === 'register'
                  ? 'border-[#6B1B7E] text-[#6B1B7E]'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              Register New Student
            </button>
          </div>
        )}

        {/* Alerts */}
        <div className="px-6 pt-3 space-y-2">
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}
        </div>

        {/* Form Body */}
        <div className="p-6 pt-3 space-y-4">
          
          {/* LOGIN FORM */}
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={
                      authRole === 'admin' 
                        ? 'admin@truewayquran.com' 
                        : authRole === 'instructor' 
                        ? 'teacher@truewayquran.com' 
                        : 'student@truewayquran.com'
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-[#6B1B7E] focus:outline-hidden"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => { setMode('forgot'); setErrorMessage(null); }}
                    className="text-[11px] text-[#6B1B7E] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-[#6B1B7E] focus:outline-hidden pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#6B1B7E] via-[#5B2A9A] to-[#E0107F] hover:from-[#5B2A9A] hover:to-[#6B1B7E] text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>
                  {authRole === 'admin' 
                    ? 'Enter Admin Console' 
                    : authRole === 'instructor' 
                    ? 'Enter Teacher Dashboard' 
                    : 'Sign In to Student Portal'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          {/* REGISTER STUDENT FORM */}
          {mode === 'register' && authRole === 'student' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Student Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Rayan Farooq"
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#6B1B7E] focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Student Age
                  </label>
                  <input
                    type="number"
                    value={studentAge}
                    onChange={e => setStudentAge(e.target.value)}
                    placeholder="8"
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#6B1B7E] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Parent Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+44 7911 123456"
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#6B1B7E] focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Parent / Login Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="parent@example.com"
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#6B1B7E] focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Password *
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Min 6 chars"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#6B1B7E] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Confirm Password *
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#6B1B7E] focus:outline-hidden"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#6B1B7E] to-[#E0107F] hover:from-[#5B2A9A] hover:to-[#6B1B7E] text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer mt-2"
              >
                Create Student Account & Verify
              </button>
            </form>
          )}

          {/* EMAIL VERIFICATION SIMULATION */}
          {mode === 'verify' && pendingVerificationUser && (
            <form onSubmit={handleVerifySubmit} className="space-y-4">
              <div className="p-4 bg-purple-50 rounded-2xl text-center space-y-1">
                <ShieldCheck className="w-8 h-8 text-[#6B1B7E] mx-auto" />
                <h4 className="font-bold text-xs text-slate-900">Enter 4-Digit Verification Code</h4>
                <p className="text-[11px] text-slate-500">
                  Code sent to <strong>{pendingVerificationUser.email}</strong>. For demonstration, click below to verify.
                </p>
              </div>

              <div className="flex justify-center gap-2">
                {['7', '8', '2', '4'].map((digit, i) => (
                  <input
                    key={i}
                    type="text"
                    readOnly
                    value={digit}
                    className="w-10 h-12 text-center text-lg font-black border border-purple-300 rounded-xl bg-white"
                  />
                ))}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition"
              >
                Complete Verification & Enter Portal
              </button>
            </form>
          )}

          {/* FORGOT PASSWORD FORM */}
          {mode === 'forgot' && (
            <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
              <p className="text-xs text-slate-600">
                Enter your account email address and we will send you a reset link.
              </p>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-[#6B1B7E] focus:outline-hidden"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Back to Sign In
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#6B1B7E] hover:bg-[#5B2A9A] text-white font-bold text-xs rounded-xl"
                >
                  Send Reset Link
                </button>
              </div>
            </form>
          )}

          {/* Quick Demo Credentials Strip */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <span className="block text-center text-[10px] font-bold uppercase tracking-wider text-slate-400">
              One-Click Testing Credentials:
            </span>
            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => handleApplyDemoCredentials('student')}
                className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 text-[#6B1B7E] rounded-lg text-[11px] font-bold border border-purple-200 cursor-pointer"
              >
                Demo Student
              </button>
              <button
                type="button"
                onClick={() => handleApplyDemoCredentials('instructor')}
                className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 text-[#5B2A9A] rounded-lg text-[11px] font-bold border border-purple-200 cursor-pointer"
              >
                Demo Teacher
              </button>
              <button
                type="button"
                onClick={() => handleApplyDemoCredentials('admin')}
                className="px-2.5 py-1 bg-pink-50 hover:bg-pink-100 text-[#E0107F] rounded-lg text-[11px] font-bold border border-pink-200 cursor-pointer"
              >
                Demo Admin
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
