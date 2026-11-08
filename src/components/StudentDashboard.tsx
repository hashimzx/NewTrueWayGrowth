import React, { useState, useEffect } from 'react';
import { 
  User as UserIcon, 
  Settings, 
  BookOpen, 
  FileText, 
  CheckCircle2, 
  Bell, 
  CreditCard, 
  HelpCircle, 
  Lock, 
  LogOut, 
  Download, 
  Video, 
  Clock, 
  ArrowRight,
  MessageCircle,
  Eye, 
  EyeOff, 
  Sparkles,
  Calendar,
  Award,
  ShieldCheck,
  Star,
  Users
} from 'lucide-react';
import { 
  AcademyUser, 
  ClassScheduleItem, 
  DailyLessonLog, 
  StudentAttendanceLog, 
  AcademyInvoice, 
  AcademyAnnouncement 
} from '../types/academy';
import { 
  getStoredAcademyUsers, 
  saveAcademyUsers, 
  getStoredClassSchedules, 
  getStoredDailyLessons, 
  getStoredAttendanceLogs, 
  getStoredInvoices, 
  getStoredAnnouncements,
  DEFAULT_QURAN_COURSES,
  DEFAULT_TEACHERS
} from '../utils/academyDatabase';

interface StudentDashboardProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    country: string;
    timezone: string;
  };
  onLogout: () => void;
  onNavigateToQuran?: () => void;
  onNavigateToQaida?: () => void;
  onOpenWhatsApp?: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  user,
  onLogout,
  onNavigateToQuran,
  onNavigateToQaida,
  onOpenWhatsApp
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'timetable' | 'lessons' | 'attendance' | 'invoices' | 'profile' | 'support'>('overview');

  const [dbUser, setDbUser] = useState<AcademyUser>(() => {
    const all = getStoredAcademyUsers();
    return all.find(u => u.id === user.id || u.email.toLowerCase() === user.email.toLowerCase()) || {
      id: user.id || 'usr-student-1',
      name: user.name || 'Hashim Zafar',
      email: user.email || 'student@truewayquran.com',
      role: 'student',
      phone: '+44 7911 123456',
      country: user.country || 'United Kingdom',
      timezone: user.timezone || 'Europe/London (GMT)',
      status: 'active',
      emailVerified: true,
      createdAt: '2026-09-10',
      studentAge: 11,
      parentName: 'Zafar Iqbal',
      parentPhone: '+44 7911 123456',
      enrolledCourseIds: ['course-quran-tajweed', 'course-quran-hifz'],
      assignedTeacherId: 'teacher-bilal',
      assignedTeacherName: 'Qari Muhammad Bilal Al-Azhari',
      monthlyFee: 65,
      currency: 'GBP'
    };
  });

  const [schedules, setSchedules] = useState<ClassScheduleItem[]>([]);
  const [dailyLessons, setDailyLessons] = useState<DailyLessonLog[]>([]);
  const [attendanceLogs, setAttendanceLogs] = useState<StudentAttendanceLog[]>([]);
  const [invoices, setInvoices] = useState<AcademyInvoice[]>([]);
  const [announcements, setAnnouncements] = useState<AcademyAnnouncement[]>([]);

  // Profile Edit State
  const [editName, setEditName] = useState(dbUser.name);
  const [editPhone, setEditPhone] = useState(dbUser.phone || '');
  const [editParentName, setEditParentName] = useState(dbUser.parentName || '');
  const [editAge, setEditAge] = useState(String(dbUser.studentAge || 10));
  const [editCountry, setEditCountry] = useState(dbUser.country);
  const [profileSavedMsg, setProfileSavedMsg] = useState(false);

  // Password Change State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<{ text: string; isError: boolean } | null>(null);

  useEffect(() => {
    setSchedules(getStoredClassSchedules());
    setDailyLessons(getStoredDailyLessons());
    setAttendanceLogs(getStoredAttendanceLogs());
    setInvoices(getStoredInvoices());
    setAnnouncements(getStoredAnnouncements());
  }, []);

  const enrolledCourses = DEFAULT_QURAN_COURSES.filter(c => 
    dbUser.enrolledCourseIds?.includes(c.id) || c.id === 'course-quran-tajweed'
  );

  const assignedTeacher = DEFAULT_TEACHERS.find(t => 
    t.id === dbUser.assignedTeacherId
  ) || DEFAULT_TEACHERS[0];

  const upcomingClass = schedules[0] || {
    id: 'sch-next',
    studentId: dbUser.id,
    studentName: dbUser.name,
    teacherId: assignedTeacher.id,
    teacherName: assignedTeacher.name,
    courseId: enrolledCourses[0]?.id || 'course-quran-tajweed',
    courseTitle: enrolledCourses[0]?.title || 'Quran with Tajweed',
    dayOfWeek: 'Monday' as const,
    timeSlot: '05:00 PM',
    durationMinutes: 30,
    meetingUrl: 'https://meet.google.com/trueway-quran-live',
    meetingPlatform: 'Google Meet' as const,
    status: 'upcoming' as const
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: AcademyUser = {
      ...dbUser,
      name: editName.trim(),
      phone: editPhone.trim(),
      parentName: editParentName.trim(),
      studentAge: parseInt(editAge, 10) || dbUser.studentAge,
      country: editCountry.trim()
    };
    setDbUser(updated);

    const all = getStoredAcademyUsers();
    const idx = all.findIndex(u => u.id === updated.id);
    if (idx !== -1) {
      all[idx] = updated;
      saveAcademyUsers(all);
    }

    setProfileSavedMsg(true);
    setTimeout(() => setProfileSavedMsg(false), 3000);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg(null);

    if (newPassword.length < 6) {
      setPasswordMsg({ text: 'New password must be at least 6 characters.', isError: true });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMsg({ text: 'New passwords do not match.', isError: true });
      return;
    }

    setPasswordMsg({ text: 'Password successfully updated!', isError: false });
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPasswordMsg(null), 3500);
  };

  const downloadReceipt = (inv: AcademyInvoice) => {
    const content = `TRUE WAY QURAN ACADEMY - OFFICIAL RECEIPT
Invoice No: ${inv.invoiceNumber}
Date: ${inv.date}
Student Name: ${dbUser.name}
Parent Name: ${dbUser.parentName || dbUser.name}
Course: ${inv.courseTitle}
Billing Period: ${inv.billingPeriod}
Amount Paid: ${inv.currency === 'GBP' ? '£' : '$'}${inv.amount}
Status: ${inv.status.toUpperCase()}
Payment Method: Verified International Online Payment

Thank you for trusting True Way Quran Academy!
Support WhatsApp: +92 306 8959085
Email: support@ustadleads.com
Headquarters: True Way Quran, United Kingdom & International Desks
`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${inv.invoiceNumber}_receipt.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#6B1B7E] via-[#5B2A9A] to-[#2e1065] text-white py-8 border-b border-purple-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-purple-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Student & Parent Portal</span>
              <span className="text-white/40">·</span>
              <span>Student ID: {dbUser.id}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Welcome back, {dbUser.name}!
            </h1>
            <p className="text-xs sm:text-sm text-purple-200">
              Access your daily Sabaq lessons, class timetable, join live Google Meet classes, and view teacher evaluation feedback.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {onNavigateToQuran && (
              <button
                onClick={onNavigateToQuran}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer flex items-center gap-1.5"
              >
                <BookOpen className="w-4 h-4" />
                <span>Full Quran Reader</span>
              </button>
            )}

            {onNavigateToQaida && (
              <button
                onClick={onNavigateToQaida}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 transition cursor-pointer"
              >
                Madani Qaida
              </button>
            )}

            <button
              onClick={onLogout}
              className="px-4 py-2 bg-red-600/80 hover:bg-red-600 text-white font-bold text-xs rounded-xl transition cursor-pointer flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4 mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'bg-[#6B1B7E] text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Overview & Next Class</span>
          </button>

          <button
            onClick={() => setActiveTab('timetable')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'timetable'
                ? 'bg-[#6B1B7E] text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Class Timetable ({schedules.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('lessons')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'lessons'
                ? 'bg-[#6B1B7E] text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Daily Lesson & Homework ({dailyLessons.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('attendance')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'attendance'
                ? 'bg-[#6B1B7E] text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Attendance Record</span>
          </button>

          <button
            onClick={() => setActiveTab('invoices')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'invoices'
                ? 'bg-[#6B1B7E] text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Fee & Invoices ({invoices.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'bg-[#6B1B7E] text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            <UserIcon className="w-4 h-4" />
            <span>Student Profile & Password</span>
          </button>

          <button
            onClick={() => setActiveTab('support')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'support'
                ? 'bg-[#6B1B7E] text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Support & Help Desk</span>
          </button>
        </div>

        {/* Tab 1: Overview & Next Class */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            
            {/* Top 4 KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 bg-white rounded-2xl border border-purple-100 shadow-xs space-y-1">
                <span className="text-xs font-semibold text-slate-400">Assigned Teacher</span>
                <span className="block text-base font-black text-slate-900 truncate">
                  {assignedTeacher.name}
                </span>
                <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Ijazah Certified Scholar</span>
                </span>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-purple-100 shadow-xs space-y-1">
                <span className="text-xs font-semibold text-slate-400">Enrolled Courses</span>
                <span className="block text-2xl font-black text-[#6B1B7E]">
                  {enrolledCourses.length} Courses
                </span>
                <span className="text-[11px] text-slate-500 truncate block">
                  {enrolledCourses.map(c => c.title).join(', ')}
                </span>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-purple-100 shadow-xs space-y-1">
                <span className="text-xs font-semibold text-slate-400">Attendance Rate</span>
                <span className="block text-2xl font-black text-emerald-600">
                  100% Present
                </span>
                <span className="text-[11px] text-slate-500">
                  {attendanceLogs.length} Sessions Logged
                </span>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-purple-100 shadow-xs space-y-1">
                <span className="text-xs font-semibold text-slate-400">Average Tajweed Score</span>
                <span className="block text-2xl font-black text-[#E0107F]">
                  92% Excellence
                </span>
                <span className="text-[11px] text-slate-500">
                  Makharij & Fluency Rated
                </span>
              </div>
            </div>

            {/* Upcoming Live Class Banner with Direct Meeting Launch */}
            <div className="p-7 rounded-3xl bg-gradient-to-r from-[#6B1B7E] to-[#5B2A9A] text-white shadow-xl shadow-purple-900/10 flex flex-col md:flex-row items-center justify-between gap-6 border border-purple-400/20">
              <div className="space-y-2 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Next Live Class: {upcomingClass.dayOfWeek} at {upcomingClass.timeSlot}</span>
                </div>
                <h3 className="text-2xl font-black text-white">
                  {upcomingClass.courseTitle}
                </h3>
                <p className="text-xs sm:text-sm text-purple-200">
                  Teacher: <strong>{upcomingClass.teacherName}</strong> · Duration: {upcomingClass.durationMinutes} mins · 1-on-1 Private Room
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                <a
                  href={upcomingClass.meetingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition flex items-center gap-2"
                >
                  <Video className="w-4 h-4" />
                  <span>Join Online Class ({upcomingClass.meetingPlatform})</span>
                </a>

                {onOpenWhatsApp && (
                  <button
                    onClick={onOpenWhatsApp}
                    className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 transition flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-300" />
                    <span>Message Teacher</span>
                  </button>
                )}
              </div>
            </div>

            {/* 2-Column: Latest Daily Lesson & Notifications */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Latest Daily Lesson Log */}
              <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-black text-slate-900 text-lg">
                      Latest Lesson Progress
                    </h3>
                    <p className="text-xs text-slate-400">Recorded by {assignedTeacher.name}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 font-bold text-xs">
                    {dailyLessons[0]?.date || 'Recent'}
                  </span>
                </div>

                {dailyLessons[0] ? (
                  <div className="space-y-4 text-xs">
                    <div className="p-4 bg-purple-50/50 rounded-2xl border border-purple-100 space-y-2">
                      <span className="block text-slate-500 font-semibold uppercase text-[10px]">
                        Today's Sabaq (New Lesson):
                      </span>
                      <p className="text-sm font-bold text-slate-900">
                        {dailyLessons[0].sabaqTitle}
                      </p>
                      <div className="flex flex-wrap gap-3 pt-1 text-[11px]">
                        <span>Tajweed: <strong>{dailyLessons[0].tajweedScore}%</strong></span>
                        <span>·</span>
                        <span>Makharij: <strong>{dailyLessons[0].makharijScore}%</strong></span>
                        <span>·</span>
                        <span>Fluency: <strong>{dailyLessons[0].fluencyScore}%</strong></span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                        <span className="block text-[10px] text-slate-400 uppercase font-bold">Sabqi (Recent Revision)</span>
                        <p className="font-semibold text-slate-800 text-xs mt-1">{dailyLessons[0].sabqiRevision}</p>
                      </div>

                      <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                        <span className="block text-[10px] text-slate-400 uppercase font-bold">Manzil (Permanent Review)</span>
                        <p className="font-semibold text-slate-800 text-xs mt-1">{dailyLessons[0].manzilRevision}</p>
                      </div>
                    </div>

                    <div className="p-4 bg-amber-50/50 rounded-2xl border border-amber-200/60 space-y-1">
                      <span className="block text-[10px] uppercase font-bold text-amber-800">Assigned Homework:</span>
                      <p className="text-slate-700 text-xs">{dailyLessons[0].homework}</p>
                    </div>

                    <div className="p-4 bg-purple-50/30 rounded-2xl border border-purple-100 space-y-1">
                      <span className="block text-[10px] uppercase font-bold text-[#6B1B7E]">Teacher Feedback to Parents:</span>
                      <p className="text-slate-700 text-xs italic">"{dailyLessons[0].teacherFeedback}"</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 py-4">No daily lessons logged yet.</p>
                )}
              </div>

              {/* Academy Announcements & Notices */}
              <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-black text-slate-900 text-lg">
                    Announcements
                  </h3>
                  <span className="text-xs text-purple-600 font-bold">Live Notices</span>
                </div>

                <div className="space-y-3">
                  {announcements.map((ann) => (
                    <div key={ann.id} className="p-4 rounded-2xl bg-purple-50/40 border border-purple-100 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-slate-900 text-xs">{ann.title}</h4>
                        <span className="text-[10px] text-slate-400">{ann.date}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{ann.message}</p>
                      <span className="block text-[10px] text-[#6B1B7E] font-semibold pt-1">
                        From: {ann.senderName}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* Tab 2: Timetable */}
        {activeTab === 'timetable' && (
          <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div>
              <h3 className="text-xl font-black text-slate-900">
                Weekly Class Timetable
              </h3>
              <p className="text-xs text-slate-500">
                Your weekly schedule with live meeting links. To change timings, please message our support desk.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {schedules.map((sch) => (
                <div key={sch.id} className="p-5 rounded-2xl border border-purple-100 bg-purple-50/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md bg-[#6B1B7E] text-white text-[10px] font-bold">
                      {sch.dayOfWeek}
                    </span>
                    <span className="text-xs font-bold text-slate-700">{sch.timeSlot}</span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-sm">{sch.courseTitle}</h4>
                  <p className="text-xs text-slate-500">Teacher: {sch.teacherName}</p>

                  <a
                    href={sch.meetingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Join Class Room</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Daily Lessons & Homework */}
        {activeTab === 'lessons' && (
          <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div>
              <h3 className="text-xl font-black text-slate-900">
                Daily Quran Lesson History & Homework
              </h3>
              <p className="text-xs text-slate-500">
                Complete record of daily Sabaq (new verses), Sabqi revision, and teacher feedback.
              </p>
            </div>

            <div className="space-y-4">
              {dailyLessons.map((les) => (
                <div key={les.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-200 pb-2">
                    <div>
                      <span className="font-black text-slate-900 text-sm">{les.sabaqTitle}</span>
                      <span className="text-xs text-slate-400 block">{les.date} · Evaluator: {les.teacherName}</span>
                    </div>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                      Status: {les.sabaqStatus.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 bg-white rounded-xl border border-slate-100">
                      <span className="block text-[10px] text-slate-400 uppercase font-bold">Sabqi (Recent)</span>
                      <p className="font-semibold text-slate-800 mt-0.5">{les.sabqiRevision}</p>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-slate-100">
                      <span className="block text-[10px] text-slate-400 uppercase font-bold">Manzil (Cumulative)</span>
                      <p className="font-semibold text-slate-800 mt-0.5">{les.manzilRevision}</p>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-slate-100">
                      <span className="block text-[10px] text-slate-400 uppercase font-bold">Scores</span>
                      <p className="font-semibold text-purple-900 mt-0.5">
                        Tajweed: {les.tajweedScore}% · Makharij: {les.makharijScore}%
                      </p>
                    </div>
                  </div>

                  {les.homework && (
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-slate-700">
                      <strong className="text-amber-800">Homework:</strong> {les.homework}
                    </div>
                  )}

                  {les.teacherFeedback && (
                    <p className="text-xs text-slate-600 italic">
                      <strong>Teacher Feedback:</strong> "{les.teacherFeedback}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Attendance Log */}
        {activeTab === 'attendance' && (
          <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div>
              <h3 className="text-xl font-black text-slate-900">
                Attendance & Session Log
              </h3>
              <p className="text-xs text-slate-500">
                Complete log of live sessions attended with topics covered.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4">Date & Time</th>
                    <th className="py-3 px-4">Course</th>
                    <th className="py-3 px-4">Topic Covered</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {attendanceLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/80">
                      <td className="py-3.5 px-4 font-semibold text-slate-800">
                        {log.date} at {log.time}
                      </td>
                      <td className="py-3.5 px-4 text-[#6B1B7E] font-medium">
                        {log.courseTitle}
                      </td>
                      <td className="py-3.5 px-4 text-slate-700">
                        {log.sessionTopic}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                          {log.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500">
                        {log.durationMinutes} mins
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 5: Invoices & Fee Status */}
        {activeTab === 'invoices' && (
          <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div>
              <h3 className="text-xl font-black text-slate-900">
                Tuition Fee History & Receipts
              </h3>
              <p className="text-xs text-slate-500">
                Download official receipts for your monthly academy tuition payments.
              </p>
            </div>

            <div className="space-y-3">
              {invoices.map((inv) => (
                <div key={inv.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-4">
                  <div>
                    <span className="font-bold text-slate-900 text-sm block">
                      {inv.invoiceNumber} · {inv.billingPeriod}
                    </span>
                    <span className="text-xs text-slate-500">
                      {inv.courseTitle} · Date: {inv.date}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-black text-slate-900 text-base">
                      {inv.currency === 'GBP' ? '£' : '$'}{inv.amount}
                    </span>
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold text-[11px] rounded-full">
                      PAID
                    </span>
                    <button
                      onClick={() => downloadReceipt(inv)}
                      className="px-3 py-1.5 bg-white border border-slate-300 hover:border-[#6B1B7E] text-[#6B1B7E] font-bold text-xs rounded-lg flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Receipt</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: Profile & Password */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Edit Profile */}
            <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-xs space-y-5">
              <h3 className="text-xl font-black text-slate-900">
                Personal & Parent Information
              </h3>

              {profileSavedMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Profile details updated successfully!</span>
                </div>
              )}

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Student Full Name
                  </label>
                  <input
                    type="text"
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-[#6B1B7E] focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Student Age
                    </label>
                    <input
                      type="number"
                      value={editAge}
                      onChange={e => setEditAge(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-[#6B1B7E] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      value={editCountry}
                      onChange={e => setEditCountry(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-[#6B1B7E] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Parent / Guardian Name
                  </label>
                  <input
                    type="text"
                    value={editParentName}
                    onChange={e => setEditParentName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-[#6B1B7E] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Parent Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={editPhone}
                    onChange={e => setEditPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-[#6B1B7E] focus:outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#6B1B7E] hover:bg-[#5B2A9A] text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
                >
                  Save Profile Changes
                </button>
              </form>
            </div>

            {/* Change Password */}
            <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-xs space-y-5">
              <h3 className="text-xl font-black text-slate-900">
                Change Password
              </h3>

              {passwordMsg && (
                <div className={`p-3 rounded-xl text-xs font-bold ${
                  passwordMsg.isError ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                }`}>
                  {passwordMsg.text}
                </div>
              )}

              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-[#6B1B7E] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      placeholder="At least 6 characters"
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

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-[#6B1B7E] focus:outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#6B1B7E] hover:bg-[#5B2A9A] text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
                >
                  Update Password
                </button>
              </form>
            </div>

          </div>
        )}

        {/* Tab 7: Support Desk */}
        {activeTab === 'support' && (
          <div className="max-w-2xl bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div>
              <h3 className="text-xl font-black text-slate-900">
                Academy Support & Student Help Desk
              </h3>
              <p className="text-xs text-slate-500">
                Need to reschedule a session, discuss your child's progress, or change your course?
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Direct WhatsApp Support</h4>
                  <p className="text-xs text-slate-600">Mentor Abdul Basit Saleem (Available 24/7)</p>
                </div>
                <a
                  href="https://wa.me/923068959085?text=Assalam-o-Alaikum%20Abdul%20Basit%2C%20I%20am%20a%20student%20at%20True%20Way%20Quran."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>+92 306 8959085</span>
                </a>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Official Email</h4>
                  <p className="text-xs text-slate-600">Admissions & Parent Inquiries</p>
                </div>
                <a
                  href="mailto:support@ustadleads.com"
                  className="px-4 py-2 bg-[#6B1B7E] hover:bg-[#5B2A9A] text-white font-bold text-xs rounded-xl shadow-xs transition"
                >
                  support@ustadleads.com
                </a>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
