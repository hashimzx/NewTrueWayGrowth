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
  ArrowLeft,
  ChevronLeft,
  MessageCircle,
  Eye, 
  EyeOff, 
  Sparkles,
  Calendar,
  Award,
  ShieldCheck,
  Star,
  Users,
  Heart,
  Layers,
  Compass,
  Moon,
  Shield,
  BookMarked,
  Bookmark,
  BookmarkCheck,
  Menu,
  X,
  RotateCcw,
  Mic,
  Search,
  TrendingUp,
  BarChart3,
  Play
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
import { getStudentLearningProfile } from '../utils/studentLearningStorage';

// Child Learning Portal Sections
import { PortalQuranSection } from './portal/PortalQuranSection';
import { ColorCodedTajweedSection } from './portal/ColorCodedTajweedSection';
import { PortalDuasSection } from './portal/PortalDuasSection';
import { PortalNamazSection } from './portal/PortalNamazSection';
import { PortalSixKalimasSection } from './portal/PortalSixKalimasSection';
import { PortalPillarsCreedSection } from './portal/PortalPillarsCreedSection';
import { PortalHadithSection } from './portal/PortalHadithSection';
import { PortalKnowledgeSection } from './portal/PortalKnowledgeSection';
import { PortalQuizzesSection } from './portal/PortalQuizzesSection';
import { PortalProgressSection } from './portal/PortalProgressSection';
import { PortalVoiceVaultSection } from './portal/PortalVoiceVaultSection';
import { PortalHifzTrackerSection } from './portal/PortalHifzTrackerSection';
import { PortalHabitTrackerSection } from './portal/PortalHabitTrackerSection';

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
  onNavigateHome?: () => void;
  onOpenWhatsApp?: () => void;
}

export type StudentPortalTab = 
  | 'overview'
  | 'quran'
  | 'tajweed_quran'
  | 'voice_vault'
  | 'hifz_tracker'
  | 'habit_tracker'
  | 'duas'
  | 'namaz'
  | 'kalimas'
  | 'janazah'
  | 'pillars'
  | 'articles'
  | 'hadith'
  | 'ramadan'
  | 'hajj'
  | 'asma_ul_husna'
  | 'prophets'
  | 'manners'
  | 'quizzes'
  | 'progress'
  | 'timetable'
  | 'lessons'
  | 'attendance'
  | 'invoices'
  | 'profile'
  | 'support';

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  user,
  onLogout,
  onNavigateToQuran,
  onNavigateToQaida,
  onNavigateHome,
  onOpenWhatsApp
}) => {
  const [activeTab, setActiveTab] = useState<StudentPortalTab>('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [profileRefreshKey, setProfileRefreshKey] = useState(0);

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

  const learningProfile = getStudentLearningProfile(dbUser.id, dbUser.name);

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

  const menuSections = [
    {
      group: 'Core Quranic Learning',
      items: [
        { id: 'overview', label: 'Dashboard Overview', icon: Sparkles },
        { id: 'quran', label: 'Holy Quran (114 Surahs)', icon: BookOpen, badge: '114' },
        { id: 'tajweed_quran', label: 'Color-Coded Tajweed (30 Paras)', icon: Sparkles, badge: 'PDFs' },
        { id: 'voice_vault', label: 'My Voice Studio', icon: Mic },
        { id: 'hifz_tracker', label: 'Hifz Roadmap (30 Juz)', icon: Award, badge: '30 Juz' },
        { id: 'habit_tracker', label: 'Salah & Sunnah Habits', icon: Clock }
      ]
    },
    {
      group: 'Daily Worship & Supplications',
      items: [
        { id: 'namaz', label: 'Namaz / Salah Guide', icon: Clock },
        { id: 'duas', label: 'Daily Masnoon Duas', icon: Heart, badge: '18' },
        { id: 'kalimas', label: 'Six Kalimas of Islam', icon: ShieldCheck, badge: '6' },
        { id: 'janazah', label: 'Funeral Prayer (Janazah)', icon: Heart }
      ]
    },
    {
      group: 'Islamic Sciences & Heritage',
      items: [
        { id: 'hadith', label: 'Hadith & Sunnah Learning', icon: BookMarked },
        { id: 'pillars', label: '5 Pillars of Islam & Zakat', icon: Shield },
        { id: 'articles', label: '6 Articles of Faith (Iman)', icon: Compass },
        { id: 'ramadan', label: 'Ramadan & Fasting Guide', icon: Moon },
        { id: 'hajj', label: 'Hajj & Umrah Pilgrimage', icon: Compass },
        { id: 'asma_ul_husna', label: '99 Beautiful Names of Allah', icon: Sparkles },
        { id: 'prophets', label: 'Stories of 25 Prophets', icon: BookOpen },
        { id: 'manners', label: 'Islamic Manners & Adab', icon: Star }
      ]
    },
    {
      group: 'Academic Center & Timetable',
      items: [
        { id: 'quizzes', label: 'Quizzes & Certificates', icon: Award },
        { id: 'progress', label: 'Bookmarks & Progress', icon: Bookmark, badge: String(learningProfile.bookmarks.length) },
        { id: 'timetable', label: 'Class Timetable', icon: Calendar, badge: String(schedules.length) },
        { id: 'lessons', label: 'Teacher Sabaq & HW', icon: FileText, badge: String(dailyLessons.length) },
        { id: 'attendance', label: 'Attendance Records', icon: CheckCircle2 },
        { id: 'invoices', label: 'Tuition & Invoices', icon: CreditCard, badge: String(invoices.length) },
        { id: 'profile', label: 'Student Profile & Settings', icon: UserIcon },
        { id: 'support', label: 'Support & Help Desk', icon: HelpCircle }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-28 md:pb-20">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#6E1373] via-[#851C82] to-[#561F79] text-white py-6 sm:py-8 border-b border-purple-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            
            {/* Student Info */}
            <div className="space-y-1 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-purple-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Complete Islamic Learning & Quran Education Portal</span>
                <span className="text-white/40">·</span>
                <span>Student ID: {dbUser.id}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                Assalam-o-Alaikum, {dbUser.name}!
              </h1>
              <p className="text-xs sm:text-sm text-purple-200">
                Level {learningProfile.currentLevel} Scholar · Continue your Holy Quran recitation, Duas, Namaz, Kalimas, and live academy classes.
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Back to Website Button */}
              {onNavigateHome && (
                <button
                  onClick={onNavigateHome}
                  className="px-3.5 py-2 bg-white/15 hover:bg-white/25 text-white font-bold text-xs rounded-xl border border-white/20 transition cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>← Back to Website</span>
                </button>
              )}

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden px-3.5 py-2 bg-white/20 hover:bg-white/30 text-white font-bold text-xs rounded-xl transition cursor-pointer flex items-center gap-1.5"
                aria-label="Open Student Portal Navigation Drawer"
              >
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                <span>Portal Menu</span>
              </button>

              {/* Resume Last Quran Reading Button */}
              {learningProfile.lastReadingPosition && (
                <button
                  onClick={() => setActiveTab('quran')}
                  className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Resume Quran ({learningProfile.lastReadingPosition.surahName})</span>
                </button>
              )}

              {onNavigateToQaida && (
                <button
                  onClick={onNavigateToQaida}
                  className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 transition cursor-pointer"
                >
                  Madani Qaida
                </button>
              )}

              <button
                onClick={onLogout}
                className="px-3.5 py-2 bg-red-600/80 hover:bg-red-600 text-white font-bold text-xs rounded-xl transition cursor-pointer flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Log Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* Mobile Horizontal Quick-Scroll Chips (Clean, professional labels) */}
        <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-thin">
          {[
            { id: 'overview', label: 'Dashboard' },
            { id: 'quran', label: 'Holy Quran' },
            { id: 'tajweed_quran', label: 'Color Tajweed (30 Paras)' },
            { id: 'voice_vault', label: 'My Voice Studio' },
            { id: 'hifz_tracker', label: 'Hifz (30 Juz)' },
            { id: 'habit_tracker', label: 'Salah Habits' },
            { id: 'duas', label: 'Daily Duas' },
            { id: 'namaz', label: 'Namaz Guide' },
            { id: 'kalimas', label: 'Six Kalimas' },
            { id: 'janazah', label: 'Janazah Guide' },
            { id: 'pillars', label: '5 Pillars & Zakat' },
            { id: 'articles', label: '6 Articles of Faith' },
            { id: 'hadith', label: 'Hadith Studies' },
            { id: 'ramadan', label: 'Ramadan Guide' },
            { id: 'hajj', label: 'Hajj & Umrah' },
            { id: 'asma_ul_husna', label: '99 Names of Allah' },
            { id: 'prophets', label: 'Stories of Prophets' },
            { id: 'manners', label: 'Islamic Manners' },
            { id: 'quizzes', label: 'Quizzes & Tests' },
            { id: 'progress', label: 'Progress & Bookmarks' },
            { id: 'timetable', label: 'Class Timetable' },
            { id: 'profile', label: 'Profile' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id as StudentPortalTab);
                window.scrollTo({ top: 120, behavior: 'smooth' });
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === item.id
                  ? 'bg-[#6E1373] text-white shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Mobile Slide-Over Drawer Navigation */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end lg:hidden animate-fadeIn">
            <div className="w-80 max-w-[85vw] bg-white h-full overflow-y-auto p-5 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="font-black text-[#6E1373] text-lg">Student Portal</h3>
                  <p className="text-xs text-slate-500">{dbUser.name}</p>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-xl bg-slate-100 text-slate-600 cursor-pointer"
                  aria-label="Close Mobile Navigation Drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {menuSections.map((sec, sIdx) => (
                <div key={sIdx} className="space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-900/60 block px-2">
                    {sec.group}
                  </span>
                  <div className="space-y-1">
                    {sec.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveTab(item.id as StudentPortalTab);
                            setIsMobileMenuOpen(false);
                            window.scrollTo({ top: 100, behavior: 'smooth' });
                          }}
                          className={`w-full p-2.5 rounded-xl text-left text-xs font-semibold transition cursor-pointer flex items-center justify-between ${
                            isActive
                              ? 'bg-[#6E1373] text-white font-bold shadow-xs'
                              : 'hover:bg-slate-100 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className="w-4 h-4" />
                            <span>{item.label}</span>
                          </div>
                          {item.badge && (
                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                              isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="border-t border-slate-100 pt-4">
                <button
                  onClick={onLogout}
                  className="w-full py-2.5 rounded-xl bg-red-50 text-red-600 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out of Portal</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TWO-COLUMN LAYOUT: LEFT VERTICAL SIDEBAR LINE + RIGHT MAIN CONTENT */}
        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
          
          {/* LEFT VERTICAL SIDEBAR LINE & NAVIGATION */}
          <aside className="hidden lg:flex flex-col w-72 xl:w-80 shrink-0 bg-white rounded-3xl border border-purple-100 shadow-sm sticky top-6 max-h-[calc(100vh-48px)] overflow-y-auto scrollbar-thin divide-y divide-purple-100/70">
            {/* Student Mini Profile Header in Sidebar */}
            <div className="p-4 bg-gradient-to-br from-purple-50/80 via-white to-purple-50/40">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#6E1373] to-[#C72F8A] text-white flex items-center justify-center font-black text-base shadow-sm">
                  {dbUser.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-black text-slate-900 truncate">{dbUser.name}</div>
                  <div className="text-[11px] font-semibold text-purple-700 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
                    <span>Student Active · ID: {dbUser.id}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Vertical Menu Groups */}
            <div className="p-3 space-y-4">
              {menuSections.map((sec, sIdx) => (
                <div key={sIdx} className="space-y-1">
                  <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-purple-900/60 flex items-center justify-between">
                    <span>{sec.group}</span>
                  </div>
                  <div className="space-y-0.5">
                    {sec.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveTab(item.id as StudentPortalTab);
                            window.scrollTo({ top: 100, behavior: 'smooth' });
                          }}
                          className={`w-full px-3 py-2.5 rounded-xl text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between group ${
                            isActive
                              ? 'bg-[#6E1373] text-white shadow-sm ring-1 ring-[#6E1373]'
                              : 'text-slate-600 hover:text-slate-900 hover:bg-purple-50/70'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className={`p-1.5 rounded-lg transition-colors ${
                              isActive ? 'bg-white/20 text-white' : 'bg-purple-50 text-[#6E1373] group-hover:bg-purple-100'
                            }`}>
                              <Icon className="w-4 h-4" />
                            </span>
                            <span className="truncate">{item.label}</span>
                          </div>
                          {item.badge && (
                            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full shrink-0 ${
                              isActive ? 'bg-white/20 text-white' : 'bg-purple-100/80 text-purple-800'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar Bottom Shortcuts */}
            <div className="p-3 bg-slate-50/70 space-y-2">
              <a
                href="https://wa.me/923068959085?text=Assalam-o-Alaikum%2C%20I%20am%20a%20student%20at%20True%20Way%20Quran"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Academic Desk</span>
              </a>
              <button
                onClick={onLogout}
                className="w-full py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200/80 text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-rose-600" />
                <span>Sign Out</span>
              </button>
            </div>
          </aside>

          {/* RIGHT MAIN WORKSPACE */}
          <main className="flex-1 min-w-0 w-full space-y-6">
            
            {/* Top Return-to-Dashboard Header & Breadcrumbs for any inner section */}
            {activeTab !== 'overview' && (
              <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-purple-100 shadow-xs flex flex-wrap items-center justify-between gap-3 animate-fadeIn">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setActiveTab('overview');
                      window.scrollTo({ top: 100, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-[#6E1373] text-[#6E1373] hover:text-white font-bold text-xs border border-purple-200 transition cursor-pointer group shadow-2xs"
                  >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                    <span>← Back to Dashboard Overview</span>
                  </button>
                  <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400">
                    <span>/</span>
                    <span className="font-semibold text-slate-700 capitalize">
                      {activeTab.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setActiveTab('quran');
                      window.scrollTo({ top: 100, behavior: 'smooth' });
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      activeTab === 'quran' ? 'bg-[#6E1373] text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    Holy Quran
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('duas');
                      window.scrollTo({ top: 100, behavior: 'smooth' });
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      activeTab === 'duas' ? 'bg-[#6E1373] text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    Daily Duas
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('namaz');
                      window.scrollTo({ top: 100, behavior: 'smooth' });
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      activeTab === 'namaz' ? 'bg-[#6E1373] text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    Namaz Guide
                  </button>
                </div>
              </div>
            )}

            {/* ACTIVE TAB CONTENT ROUTING */}
            
            {/* 1. OVERVIEW DASHBOARD - DRIBBLE LMS STYLE */}
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-fadeIn">
            
            {/* Search & Islamic Hijri Calendar Bar */}
            <div className="bg-white p-4 sm:p-5 rounded-3xl border border-purple-100 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-lg">
                <Search className="w-4 h-4 text-purple-900 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search in Quran, Duas, Namaz, Kalimas, Hadith, or homework..."
                  className="w-full pl-10 pr-4 py-2.5 bg-purple-50/50 hover:bg-purple-50 focus:bg-white border border-purple-100 rounded-2xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6E1373] transition"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                <div className="px-3.5 py-2 rounded-2xl bg-purple-50 text-purple-900 font-bold border border-purple-100 flex items-center gap-1.5">
                  <Moon className="w-3.5 h-3.5 text-amber-500" />
                  <span>Dhul-Qi'dah 1448 AH</span>
                  <span className="text-purple-300">·</span>
                  <span className="font-medium text-slate-600">Global Madrassa</span>
                </div>

                <div className="px-3.5 py-2 rounded-2xl bg-emerald-50 text-emerald-800 font-bold border border-emerald-100 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Term: Active Spring Semester</span>
                </div>
              </div>
            </div>

            {/* Top LMS Metric Cards (Dribbble LMS Style) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Stat 1: Quran Study Time */}
              <div className="p-5 bg-white rounded-3xl border border-purple-100 shadow-xs space-y-3 relative overflow-hidden group hover:border-purple-300 transition">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">Weekly Quran Hours</span>
                  <span className="w-8 h-8 rounded-2xl bg-purple-100 text-[#6E1373] flex items-center justify-center font-bold text-xs">
                    <Clock className="w-4 h-4" />
                  </span>
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900">28.5 <span className="text-xs font-semibold text-slate-400">/ 35 hrs</span></div>
                  <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-0.5">
                    <TrendingUp className="w-3 h-3" />
                    <span>+14% vs last week</span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-[#6E1373] to-[#C72F8A] h-1.5 rounded-full" style={{ width: '81%' }} />
                </div>
              </div>

              {/* Stat 2: Mastered Sabaq */}
              <div className="p-5 bg-white rounded-3xl border border-purple-100 shadow-xs space-y-3 relative overflow-hidden group hover:border-purple-300 transition">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">Mastered Sabaq</span>
                  <span className="w-8 h-8 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                    <Award className="w-4 h-4" />
                  </span>
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900">42 <span className="text-xs font-semibold text-slate-400">Lessons</span></div>
                  <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Passed: Surah Al-Mulk V1-8</span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-1.5 rounded-full" style={{ width: '88%' }} />
                </div>
              </div>

              {/* Stat 3: Active Attendance */}
              <div className="p-5 bg-white rounded-3xl border border-purple-100 shadow-xs space-y-3 relative overflow-hidden group hover:border-purple-300 transition">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">Attendance Streak</span>
                  <span className="w-8 h-8 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs">
                    <Calendar className="w-4 h-4" />
                  </span>
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900">96% <span className="text-xs font-semibold text-slate-400">Reliability</span></div>
                  <div className="text-[11px] text-amber-700 font-bold flex items-center gap-1 mt-0.5">
                    <span>🔥 7 Days in a row</span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-1.5 rounded-full" style={{ width: '96%' }} />
                </div>
              </div>

              {/* Stat 4: Hifz Memorization */}
              <div className="p-5 bg-white rounded-3xl border border-purple-100 shadow-xs space-y-3 relative overflow-hidden group hover:border-purple-300 transition">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">Hifz Retention</span>
                  <span className="w-8 h-8 rounded-2xl bg-purple-100 text-[#851C82] flex items-center justify-center font-bold text-xs">
                    <BookOpen className="w-4 h-4" />
                  </span>
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900">2 <span className="text-xs font-semibold text-slate-400">/ 30 Juz</span></div>
                  <div className="text-[11px] text-[#851C82] font-bold flex items-center gap-1 mt-0.5">
                    <span>Active: Juz 28 Memorization</span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-[#851C82] to-[#6E1373] h-1.5 rounded-full" style={{ width: '12%' }} />
                </div>
              </div>

            </div>

            {/* Spotlight Active Learning Course Hero Card */}
            <div className="bg-gradient-to-r from-[#6E1373] via-[#851C82] to-[#561F79] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-bold text-purple-200">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Active Enrolled Course · Term In Progress</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  Quran with Tajweed & Makharij Mastery
                </h2>

                <p className="text-xs sm:text-sm text-purple-100 leading-relaxed">
                  Continue your recitation of <strong>Surah Al-Mulk</strong> with Qari Muhammad Bilal Al-Azhari. Master articulation points, test your pronunciation against the 75% accuracy threshold, and record your voice.
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
                      QB
                    </div>
                    <span>Scholar: <strong>Qari Muhammad Bilal</strong></span>
                  </div>
                  <span className="text-white/40">·</span>
                  <div>Current Sabaq: <strong>Verses 1 to 8</strong></div>
                  <span className="text-white/40">·</span>
                  <div className="text-amber-300 font-bold">Passing Mark: 75%</div>
                </div>
              </div>

              {/* Action & Circular Progress */}
              <div className="flex items-center gap-5 shrink-0 bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/20">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle cx="32" cy="32" r="26" stroke="rgba(255,255,255,0.2)" strokeWidth="5" fill="transparent" />
                    <circle cx="32" cy="32" r="26" stroke="#fbbf24" strokeWidth="5" fill="transparent" strokeDasharray="163" strokeDashoffset="40" strokeLinecap="round" />
                  </svg>
                  <span className="absolute font-black text-xs text-white">76%</span>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => setActiveTab('quran')}
                    className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition shadow-sm cursor-pointer flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Resume Course</span>
                  </button>
                  <div className="text-[10px] text-purple-200 text-center">Module 7 of 10</div>
                </div>
              </div>
            </div>

            {/* PRIMARY ISLAMIC LEARNING GATEWAYS (IMAGE ABOVE, TITLE & DETAILS BELOW) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900">
                    My Islamic Learning Modules & Courses
                  </h3>
                  <p className="text-xs text-slate-500">
                    Complete curriculum cards with authentic illustrations, audio recitations, and progress
                  </p>
                </div>
                <span className="text-xs font-bold text-[#6E1373] bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
                  8 Active Modules
                </span>
              </div>

              {/* 8 Visual Cards Grid (Images ABOVE, Text BELOW) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* 1. Holy Quran */}
                <div 
                  onClick={() => setActiveTab('quran')}
                  className="bg-white rounded-3xl border border-purple-100 shadow-xs hover:shadow-xl hover:border-purple-300 transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer group"
                >
                  {/* Image ABOVE */}
                  <div className="aspect-video w-full bg-purple-50 overflow-hidden relative">
                    <img 
                      src="/assets/lms/quran.jpg" 
                      alt="Holy Quran Reader" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-black text-[#6E1373]">
                      Core Revelation
                    </span>
                    <span className="absolute bottom-2.5 right-3 text-white text-[11px] font-bold">
                      114 Surahs
                    </span>
                  </div>

                  {/* Written BELOW */}
                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-[#851C82] uppercase tracking-wider">Ayah-by-Ayah</span>
                        <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">75% Test</span>
                      </div>
                      <h4 className="font-black text-slate-900 text-base group-hover:text-[#6E1373] transition-colors">
                        Holy Quran (القرآن الكريم)
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Complete Uthmani text, English translation, Sheikh audio streams, and interactive voice assessment.
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#6E1373]">
                      <span>Open Quran Reader</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* 2. Madani Qaida Interactive */}
                <div 
                  onClick={() => onNavigateToQaida ? onNavigateToQaida() : setActiveTab('overview')}
                  className="bg-white rounded-3xl border border-purple-100 shadow-xs hover:shadow-xl hover:border-purple-300 transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer group"
                >
                  {/* Image ABOVE */}
                  <div className="aspect-video w-full bg-emerald-50 overflow-hidden relative">
                    <img 
                      src="/assets/lms/qaida.jpg" 
                      alt="Madani Qaida Interactive" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-black text-emerald-700">
                      Beginner Primer
                    </span>
                    <span className="absolute bottom-2.5 right-3 text-white text-[11px] font-bold">
                      22 Lessons
                    </span>
                  </div>

                  {/* Written BELOW */}
                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Arabic Foundations</span>
                        <span className="text-[10px] text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded-md">AI Assessment</span>
                      </div>
                      <h4 className="font-black text-slate-900 text-base group-hover:text-emerald-700 transition-colors">
                        Madani Qaida Interactive
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Master Arabic alphabets, Huroof Maddah, Tanween, and Sukoon with instant voice correction.
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                      <span>Start Qaida Practice</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* 3. Daily Masnoon Duas */}
                <div 
                  onClick={() => setActiveTab('duas')}
                  className="bg-white rounded-3xl border border-purple-100 shadow-xs hover:shadow-xl hover:border-purple-300 transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer group"
                >
                  {/* Image ABOVE */}
                  <div className="aspect-video w-full bg-pink-50 overflow-hidden relative">
                    <img 
                      src="/assets/lms/duas.jpg" 
                      alt="Daily Masnoon Duas" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-black text-rose-700">
                      Supplications
                    </span>
                    <span className="absolute bottom-2.5 right-3 text-white text-[11px] font-bold">
                      18 Categories
                    </span>
                  </div>

                  {/* Written BELOW */}
                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider">Hisn al-Muslim</span>
                        <span className="text-[10px] text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded-md">Audio Included</span>
                      </div>
                      <h4 className="font-black text-slate-900 text-base group-hover:text-rose-700 transition-colors">
                        Daily Masnoon Duas (أدعية يومية)
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Morning & evening adhkar, food, sleep, travel, parents, protection, and forgiveness prayers.
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-rose-700">
                      <span>Practice Duas</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* 4. Namaz / Salah Guide */}
                <div 
                  onClick={() => setActiveTab('namaz')}
                  className="bg-white rounded-3xl border border-purple-100 shadow-xs hover:shadow-xl hover:border-purple-300 transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer group"
                >
                  {/* Image ABOVE */}
                  <div className="aspect-video w-full bg-amber-50 overflow-hidden relative">
                    <img 
                      src="/assets/lms/namaz.jpg" 
                      alt="Namaz / Salah Guide" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-black text-amber-800">
                      2nd Pillar
                    </span>
                    <span className="absolute bottom-2.5 right-3 text-white text-[11px] font-bold">
                      5 Daily Prayers
                    </span>
                  </div>

                  {/* Written BELOW */}
                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">Step-by-Step</span>
                        <span className="text-[10px] text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded-md">Wudu Included</span>
                      </div>
                      <h4 className="font-black text-slate-900 text-base group-hover:text-amber-800 transition-colors">
                        Namaz / Salah Guide (الصلاة)
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Complete Sunnah method from Takbir to Tasleem, Tashahhud, Durood Ibrahim, and Rakat charts.
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-800">
                      <span>Open Namaz Guide</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* 5. Six Kalimas of Islam */}
                <div 
                  onClick={() => setActiveTab('kalimas')}
                  className="bg-white rounded-3xl border border-purple-100 shadow-xs hover:shadow-xl hover:border-purple-300 transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer group"
                >
                  {/* Image ABOVE */}
                  <div className="aspect-video w-full bg-purple-50 overflow-hidden relative">
                    <img 
                      src="/assets/lms/kalimas.jpg" 
                      alt="Six Kalimas of Islam" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-black text-purple-900">
                      Creed & Iman
                    </span>
                    <span className="absolute bottom-2.5 right-3 text-white text-[11px] font-bold">
                      6 Kalimas
                    </span>
                  </div>

                  {/* Written BELOW */}
                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-purple-900 uppercase tracking-wider">Islamic Creed</span>
                        <span className="text-[10px] text-purple-900 font-bold bg-purple-50 px-2 py-0.5 rounded-md">Translation</span>
                      </div>
                      <h4 className="font-black text-slate-900 text-base group-hover:text-purple-900 transition-colors">
                        Six Kalimas (ستة كلمات)
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Tayyibah, Shahadah, Tamjeed, Tawheed, Astaghfar, and Radde Kufr with Arabic recitation and English meanings.
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-900">
                      <span>Recite Kalimas</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* 6. Hadith & Prophetic Stories */}
                <div 
                  onClick={() => setActiveTab('hadith')}
                  className="bg-white rounded-3xl border border-purple-100 shadow-xs hover:shadow-xl hover:border-purple-300 transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer group"
                >
                  {/* Image ABOVE */}
                  <div className="aspect-video w-full bg-amber-50 overflow-hidden relative">
                    <img 
                      src="/assets/lms/hadith.jpg" 
                      alt="Hadith & Prophetic Seerah" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-black text-amber-900">
                      Sunnah Wisdom
                    </span>
                    <span className="absolute bottom-2.5 right-3 text-white text-[11px] font-bold">
                      Bukhari & Muslim
                    </span>
                  </div>

                  {/* Written BELOW */}
                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider">Character Building</span>
                        <span className="text-[10px] text-amber-900 font-bold bg-amber-50 px-2 py-0.5 rounded-md">Prophetic Seerah</span>
                      </div>
                      <h4 className="font-black text-slate-900 text-base group-hover:text-amber-900 transition-colors">
                        Hadith & Prophetic Stories
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Authentic traditions on honesty, kindness to parents, patience, and stories of the 25 Prophets in the Quran.
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-900">
                      <span>Explore Hadith</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* 7. Hifz Memorization Roadmap (30 Juz) */}
                <div 
                  onClick={() => setActiveTab('hifz_tracker')}
                  className="bg-white rounded-3xl border border-purple-100 shadow-xs hover:shadow-xl hover:border-purple-300 transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer group"
                >
                  {/* Visual Header ABOVE */}
                  <div className="aspect-video w-full bg-gradient-to-br from-[#6E1373] via-[#851C82] to-[#561F79] p-5 text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="flex items-center justify-between relative z-10">
                      <span className="px-2.5 py-1 rounded-full bg-white/20 text-[10px] font-black text-purple-200">
                        30 Juz Grid
                      </span>
                      <span className="text-xs font-bold text-amber-300">2 / 30 Juz Done</span>
                    </div>

                    <div className="relative z-10">
                      <div className="text-lg font-black leading-tight">Hifz Retention Roadmap</div>
                      <div className="text-[11px] text-purple-200">Sabaq · Sabqi · Manzil</div>
                    </div>

                    {/* Decorative radial circles */}
                    <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-white/10 blur-xl pointer-events-none" />
                  </div>

                  {/* Written BELOW */}
                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-[#6E1373] uppercase tracking-wider">Lifelong Retention</span>
                        <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">Juz 30 Mastered</span>
                      </div>
                      <h4 className="font-black text-slate-900 text-base group-hover:text-[#6E1373] transition-colors">
                        Holy Quran Hifz Roadmap
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Interactive 30-Juz completion matrix with teacher revision checkpoints and retention schedules.
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#6E1373]">
                      <span>Open 30 Juz Grid</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* 8. Color-Coded Tajweed (30 Paras) */}
                <div 
                  onClick={() => {
                    setActiveTab('tajweed_quran');
                    window.scrollTo({ top: 100, behavior: 'smooth' });
                  }}
                  className="bg-white rounded-3xl border border-purple-100 shadow-xs hover:shadow-xl hover:border-purple-300 transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer group"
                >
                  {/* Visual Header ABOVE */}
                  <div className="aspect-video w-full bg-gradient-to-br from-amber-600 via-rose-600 to-[#6E1373] p-5 text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="flex items-center justify-between relative z-10">
                      <span className="px-2.5 py-1 rounded-full bg-white/20 text-[10px] font-black text-amber-200">
                        Real Tajweed Mushaf
                      </span>
                      <span className="text-xs font-bold text-amber-300">All 30 Paras</span>
                    </div>

                    <div className="relative z-10">
                      <div className="text-lg font-black leading-tight">Color-Coded Tajweed</div>
                      <div className="text-[11px] text-amber-100">Tajweed Rules · 30 Paras PDFs</div>
                    </div>

                    {/* Decorative radial circles */}
                    <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-white/10 blur-xl pointer-events-none" />
                  </div>

                  {/* Written BELOW */}
                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">Madd · Ghunnah · Qalqalah</span>
                        <span className="text-[10px] text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded-md">30 Juz PDFs</span>
                      </div>
                      <h4 className="font-black text-slate-900 text-base group-hover:text-[#6E1373] transition-colors">
                        Quran with Tajweed & Translation
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Color-coded Tajweed guide, 30 Paras digital Mushaf reader, Surah directory, and verified online PDFs.
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#6E1373]">
                      <span>Open 30 Paras Tajweed</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* TWO-COLUMN LMS DASHBOARD SECTION (SCHEDULE & PERFORMANCE) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Scheduled Class & Sabaq Homework (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Section: Live 1-on-1 Class Card */}
                <div className="bg-white rounded-3xl border border-purple-100 p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#6E1373] tracking-wider block">
                        Today's Scheduled 1-on-1 Session
                      </span>
                      <h3 className="text-base sm:text-lg font-black text-slate-900">
                        {upcomingClass.courseTitle}
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-100">
                      Confirmed Live
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-purple-50/60 p-4 rounded-2xl border border-purple-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#6E1373] text-white flex items-center justify-center font-bold text-base shadow-xs">
                        {assignedTeacher.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-slate-900">{assignedTeacher.name}</div>
                        <div className="text-xs text-purple-900 font-semibold flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Ijazah Certified Scholar ({assignedTeacher.qualifications?.[0] || 'Al-Azhar Scholar'})</span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {upcomingClass.dayOfWeek} · {upcomingClass.timeSlot} (30 mins duration)
                        </div>
                      </div>
                    </div>

                    <a
                      href={upcomingClass.meetingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                    >
                      <Video className="w-4 h-4" />
                      <span>Join Google Meet</span>
                    </a>
                  </div>
                </div>

                {/* Section: Latest Sabaq Lesson Evaluation & Homework */}
                {dailyLessons.length > 0 && (
                  <div className="bg-white rounded-3xl border border-purple-100 p-6 shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <h3 className="text-base sm:text-lg font-black text-slate-900">
                          Teacher Sabaq Evaluation & Daily Homework
                        </h3>
                        <p className="text-xs text-slate-500">
                          Evaluated by {dailyLessons[0].teacherName} on {dailyLessons[0].date}
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveTab('lessons')}
                        className="text-xs font-bold text-[#6E1373] hover:underline cursor-pointer"
                      >
                        All Lessons →
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="bg-purple-50/70 rounded-2xl p-4 border border-purple-100 space-y-1.5">
                        <span className="text-[11px] font-bold text-[#6E1373] block uppercase tracking-wider">
                          Today's Sabaq (New)
                        </span>
                        <p className="text-sm font-bold text-slate-900">{dailyLessons[0].sabaqTitle}</p>
                        <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded-full inline-block">
                          Status: {dailyLessons[0].sabaqStatus.toUpperCase()} (PASSED)
                        </span>
                      </div>

                      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-1.5">
                        <span className="text-[11px] font-bold text-slate-700 block uppercase tracking-wider">
                          Revision (Sabqi & Manzil)
                        </span>
                        <p className="text-xs text-slate-800"><strong>Sabqi:</strong> {dailyLessons[0].sabqiRevision}</p>
                        <p className="text-xs text-slate-800"><strong>Manzil:</strong> {dailyLessons[0].manzilRevision}</p>
                      </div>

                      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-1.5">
                        <span className="text-[11px] font-bold text-slate-700 block uppercase tracking-wider">
                          Teacher Notes & HW
                        </span>
                        <p className="text-xs text-slate-700 italic">"{dailyLessons[0].teacherFeedback}"</p>
                        <p className="text-[11px] text-[#6E1373] font-bold">HW: {dailyLessons[0].homework}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Section: Weekly Quran Recitation Momentum (7-Day Visual Bars) */}
                <div className="bg-white rounded-3xl border border-purple-100 p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-[#6E1373]" />
                        <span>Weekly Recitation & Learning Momentum</span>
                      </h3>
                      <p className="text-xs text-slate-500">Daily practice consistency across the last 7 days</p>
                    </div>
                    <span className="text-xs font-bold text-emerald-600">Goal: 5/5 Days Met</span>
                  </div>

                  <div className="grid grid-cols-7 gap-2 pt-2 text-center">
                    {[
                      { day: 'Mon', hours: 45, label: '45m' },
                      { day: 'Tue', hours: 60, label: '60m' },
                      { day: 'Wed', hours: 30, label: '30m' },
                      { day: 'Thu', hours: 50, label: '50m' },
                      { day: 'Fri', hours: 75, label: '75m' },
                      { day: 'Sat', hours: 90, label: '90m' },
                      { day: 'Sun', hours: 40, label: '40m' }
                    ].map((item, idx) => (
                      <div key={idx} className="space-y-1.5 flex flex-col items-center">
                        <div className="w-full bg-purple-50 rounded-xl h-24 flex items-end p-1">
                          <div 
                            className="w-full rounded-lg bg-gradient-to-t from-[#6E1373] to-[#C72F8A] transition-all duration-500"
                            style={{ height: `${(item.hours / 90) * 100}%` }}
                          />
                        </div>
                        <div className="text-[10px] font-bold text-slate-700">{item.day}</div>
                        <div className="text-[9px] text-slate-400">{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: Salah Streak, Badges & Daily Ayah (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Section: Daily Salah & Sunnah Streak Card */}
                <div className="bg-white rounded-3xl border border-purple-100 p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                        🕌
                      </div>
                      <div>
                        <h4 className="font-black text-sm text-slate-900">Today's Salah Checklist</h4>
                        <p className="text-[11px] text-slate-500">Streak: 7 Consecutive Days</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTab('habit_tracker')}
                      className="text-xs font-bold text-[#6E1373] hover:underline cursor-pointer"
                    >
                      Tracker →
                    </button>
                  </div>

                  <div className="space-y-2">
                    {[
                      { prayer: 'Fajr', time: '05:30 AM', done: true },
                      { prayer: 'Dhuhr', time: '12:45 PM', done: true },
                      { prayer: 'Asr', time: '03:45 PM', done: false },
                      { prayer: 'Maghrib', time: '05:25 PM', done: false },
                      { prayer: 'Isha', time: '07:15 PM', done: false }
                    ].map((p, idx) => (
                      <div 
                        key={idx}
                        className={`p-2.5 rounded-2xl flex items-center justify-between text-xs border ${
                          p.done ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-600'
                        }`}
                      >
                        <div className="flex items-center gap-2 font-bold">
                          <span className={`w-2 h-2 rounded-full ${p.done ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                          <span>{p.prayer}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-400">{p.time}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            p.done ? 'bg-emerald-200 text-emerald-900' : 'bg-slate-200 text-slate-600'
                          }`}>
                            {p.done ? 'Completed' : 'Upcoming'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section: Badges & Scholarly Milestones */}
                <div className="bg-white rounded-3xl border border-purple-100 p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h4 className="font-black text-sm text-slate-900 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-amber-500" />
                      <span>Scholarly Badges & Milestones</span>
                    </h4>
                    <span className="text-[10px] font-bold text-slate-400">4 Unlocked</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { icon: '⭐', name: 'Tajweed Star', desc: 'Flawless Makharij on Al-Fatihah' },
                      { icon: '🎙️', name: '75% Pass Club', desc: 'Recitation test passed on first attempt' },
                      { icon: '🕌', name: 'Salah Champion', desc: '7 days continuous prayer completion' },
                      { icon: '📜', name: 'Level 1 Scholar', desc: 'Completed basic Qaida & Kalimas' }
                    ].map((b, idx) => (
                      <div key={idx} className="p-3 bg-purple-50/40 rounded-2xl border border-purple-100 text-center space-y-1">
                        <div className="text-xl">{b.icon}</div>
                        <div className="text-xs font-bold text-slate-900">{b.name}</div>
                        <div className="text-[10px] text-slate-500 leading-tight">{b.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section: Daily Ayah Reflection */}
                <div className="bg-gradient-to-br from-purple-50 via-white to-pink-50/50 rounded-3xl p-5 border border-purple-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#851C82] flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Daily Ayah with English Meaning</span>
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400">Surah Al-Baqarah (2:286)</span>
                  </div>

                  <p dir="rtl" className="text-lg font-arabic font-bold text-slate-950 text-right leading-loose">
                    لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا
                  </p>

                  <p className="text-xs text-slate-800 font-semibold leading-relaxed">
                    "Allah does not burden any soul beyond what it can bear."
                  </p>

                  <p className="text-[11px] text-slate-600 bg-white p-2.5 rounded-xl border border-purple-100 leading-relaxed">
                    <strong>Reflection:</strong> Whatever difficulty you face in study or life, Allah knows you possess the resilience to overcome it with sincere patience and prayer.
                  </p>

                  <button
                    onClick={() => setActiveTab('quran')}
                    className="text-xs font-bold text-[#6E1373] hover:underline flex items-center gap-1 pt-1 cursor-pointer"
                  >
                    <span>Read Full Surah in Quran Reader →</span>
                  </button>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* 2. HOLY QURAN & TRANSLATION */}
        {activeTab === 'quran' && (
          <PortalQuranSection
            studentId={dbUser.id}
            studentName={dbUser.name}
            onBookmarkChanged={() => setProfileRefreshKey(k => k + 1)}
            onBackToDashboard={() => {
              setActiveTab('overview');
              window.scrollTo({ top: 100, behavior: 'smooth' });
            }}
          />
        )}

        {/* 2T. COLOR-CODED TAJWEED MUSHAF (30 PARAS) */}
        {activeTab === 'tajweed_quran' && (
          <ColorCodedTajweedSection
            onSelectSurah={(_num) => {
              setActiveTab('quran');
              window.scrollTo({ top: 100, behavior: 'smooth' });
            }}
            onBackToSurahList={() => {
              setActiveTab('overview');
              window.scrollTo({ top: 100, behavior: 'smooth' });
            }}
          />
        )}

        {/* 2B. MY QURAN VOICE VAULT */}
        {activeTab === 'voice_vault' && (
          <PortalVoiceVaultSection
            studentName={dbUser.name}
            onNavigateToVerse={(surahNum) => {
              setActiveTab('quran');
            }}
          />
        )}

        {/* 2C. HIFZ ROADMAP */}
        {activeTab === 'hifz_tracker' && (
          <PortalHifzTrackerSection
            studentName={dbUser.name}
          />
        )}

        {/* 2D. DAILY SALAH & SUNNAH HABITS */}
        {activeTab === 'habit_tracker' && (
          <PortalHabitTrackerSection
            studentName={dbUser.name}
          />
        )}

        {/* 3. DAILY DUAS */}
        {activeTab === 'duas' && (
          <PortalDuasSection
            studentId={dbUser.id}
            studentName={dbUser.name}
            onBookmarkChanged={() => setProfileRefreshKey(k => k + 1)}
          />
        )}

        {/* 4. NAMAZ / SALAH LEARNING */}
        {activeTab === 'namaz' && (
          <PortalNamazSection
            studentId={dbUser.id}
            studentName={dbUser.name}
            initialTab="procedure"
            onBookmarkChanged={() => setProfileRefreshKey(k => k + 1)}
          />
        )}

        {/* 5. SIX KALIMAS */}
        {activeTab === 'kalimas' && (
          <PortalSixKalimasSection
            studentId={dbUser.id}
            studentName={dbUser.name}
            onBookmarkChanged={() => setProfileRefreshKey(k => k + 1)}
          />
        )}

        {/* 6. NAMAZ-E-JANAZAH */}
        {activeTab === 'janazah' && (
          <PortalNamazSection
            studentId={dbUser.id}
            studentName={dbUser.name}
            initialTab="janazah"
            onBookmarkChanged={() => setProfileRefreshKey(k => k + 1)}
          />
        )}

        {/* 7. PILLARS OF ISLAM & ZAKAT */}
        {activeTab === 'pillars' && (
          <PortalPillarsCreedSection initialMode="pillars" />
        )}

        {/* 8. ARTICLES OF FAITH (IMAN) */}
        {activeTab === 'articles' && (
          <PortalPillarsCreedSection initialMode="articles" />
        )}

        {/* 9. HADITH LEARNING */}
        {activeTab === 'hadith' && (
          <PortalHadithSection
            studentId={dbUser.id}
            studentName={dbUser.name}
            onBookmarkChanged={() => setProfileRefreshKey(k => k + 1)}
          />
        )}

        {/* 10. RAMADAN & FASTING */}
        {activeTab === 'ramadan' && (
          <PortalKnowledgeSection
            studentId={dbUser.id}
            studentName={dbUser.name}
            initialTopic="ramadan"
            onBookmarkChanged={() => setProfileRefreshKey(k => k + 1)}
          />
        )}

        {/* 11. HAJJ & UMRAH */}
        {activeTab === 'hajj' && (
          <PortalKnowledgeSection
            studentId={dbUser.id}
            studentName={dbUser.name}
            initialTopic="hajj"
            onBookmarkChanged={() => setProfileRefreshKey(k => k + 1)}
          />
        )}

        {/* 12. 99 NAMES OF ALLAH (ASMA-UL-HUSNA) */}
        {activeTab === 'asma_ul_husna' && (
          <PortalKnowledgeSection
            studentId={dbUser.id}
            studentName={dbUser.name}
            initialTopic="names_of_allah"
            onBookmarkChanged={() => setProfileRefreshKey(k => k + 1)}
          />
        )}

        {/* 13. STORIES OF PROPHETS */}
        {activeTab === 'prophets' && (
          <PortalKnowledgeSection
            studentId={dbUser.id}
            studentName={dbUser.name}
            initialTopic="prophets"
            onBookmarkChanged={() => setProfileRefreshKey(k => k + 1)}
          />
        )}

        {/* 14. ISLAMIC MANNERS */}
        {activeTab === 'manners' && (
          <PortalKnowledgeSection
            studentId={dbUser.id}
            studentName={dbUser.name}
            initialTopic="manners"
            onBookmarkChanged={() => setProfileRefreshKey(k => k + 1)}
          />
        )}

        {/* 15. QUIZZES & TESTS */}
        {activeTab === 'quizzes' && (
          <PortalQuizzesSection
            studentId={dbUser.id}
            studentName={dbUser.name}
            onCertificateEarned={() => setProfileRefreshKey(k => k + 1)}
          />
        )}

        {/* 16. MY PROGRESS & BOOKMARKS */}
        {activeTab === 'progress' && (
          <PortalProgressSection
            studentId={dbUser.id}
            studentName={dbUser.name}
            onNavigateToTab={(t) => setActiveTab(t as StudentPortalTab)}
            onRefresh={() => setProfileRefreshKey(k => k + 1)}
          />
        )}

        {/* 17. CLASS TIMETABLE */}
        {activeTab === 'timetable' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Weekly Class Timetable & Meeting Links
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Your assigned 1-on-1 scheduled classes with verified Quran scholars.
              </p>
            </div>

            <div className="space-y-4">
              {schedules.map((item) => (
                <div
                  key={item.id}
                  className="p-5 sm:p-6 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-[#6E1373] bg-purple-100 px-2.5 py-0.5 rounded-full inline-block">
                      {item.dayOfWeek} · {item.timeSlot} ({item.durationMinutes} mins)
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-slate-900">{item.courseTitle}</h4>
                    <p className="text-xs text-slate-600">Assigned Teacher: {item.teacherName}</p>
                  </div>

                  <a
                    href={item.meetingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <Video className="w-4 h-4" />
                    <span>Join Class ({item.meetingPlatform})</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 18. TEACHER SABAQ & HOMEWORK */}
        {activeTab === 'lessons' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Daily Lesson (Sabaq) History & Teacher Evaluations
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Track daily performance scores in Tajweed, Makharij articulation, fluency, and assigned homework.
              </p>
            </div>

            <div className="space-y-4">
              {dailyLessons.map((lesson) => (
                <div key={lesson.id} className="p-5 sm:p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                    <div>
                      <span className="text-xs font-bold text-slate-500">{lesson.date}</span>
                      <h4 className="text-base font-bold text-slate-900">{lesson.sabaqTitle}</h4>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold self-start sm:self-auto ${
                      lesson.sabaqStatus === 'passed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {lesson.sabaqStatus === 'passed' ? '✓ Passed Sabaq' : 'In Progress'}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-400 block font-bold">Tajweed</span>
                      <span className="text-base font-bold text-[#6E1373]">{lesson.tajweedScore}%</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-400 block font-bold">Makharij</span>
                      <span className="text-base font-bold text-[#851C82]">{lesson.makharijScore}%</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-400 block font-bold">Fluency</span>
                      <span className="text-base font-bold text-emerald-600">{lesson.fluencyScore}%</span>
                    </div>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs space-y-1">
                    <p className="text-slate-700 italic">"{lesson.teacherFeedback}"</p>
                    <p className="text-purple-900 font-semibold pt-1">Homework: {lesson.homework}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 19. ATTENDANCE RECORD */}
        {activeTab === 'attendance' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Class Attendance Records
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Full chronological logs of completed sessions.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 text-xs uppercase">
                    <th className="py-3 px-3">Date</th>
                    <th className="py-3 px-3">Course</th>
                    <th className="py-3 px-3">Teacher</th>
                    <th className="py-3 px-3">Duration</th>
                    <th className="py-3 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {attendanceLogs.map((att) => (
                    <tr key={att.id}>
                      <td className="py-3 px-3 font-semibold text-slate-900">{att.date}</td>
                      <td className="py-3 px-3 text-slate-700">{att.courseTitle}</td>
                      <td className="py-3 px-3 text-slate-600">{att.teacherName}</td>
                      <td className="py-3 px-3 text-slate-600">{att.durationMinutes} mins</td>
                      <td className="py-3 px-3">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                          {att.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 20. FEE & INVOICES */}
        {activeTab === 'invoices' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Fee & Tuition Invoices
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Download verified receipts for academic records.
              </p>
            </div>

            <div className="space-y-4">
              {invoices.map((inv) => (
                <div key={inv.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm sm:text-base">{inv.invoiceNumber}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {inv.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">{inv.courseTitle} · {inv.billingPeriod}</p>
                    <span className="text-xs text-slate-400">Date: {inv.date}</span>
                  </div>

                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="text-right">
                      <span className="text-lg font-black text-[#6E1373]">
                        {inv.currency === 'GBP' ? '£' : '$'}{inv.amount}
                      </span>
                    </div>

                    <button
                      onClick={() => downloadReceipt(inv)}
                      className="px-4 py-2 bg-[#6E1373] hover:bg-[#561F79] text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
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

        {/* 21. STUDENT PROFILE & PASSWORD */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Student Profile & Account Settings
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Manage your profile information and update your login password.
              </p>
            </div>

            {profileSavedMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold">
                ✓ Profile changes successfully saved!
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Student Name</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={dbUser.email}
                    disabled
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Parent / Guardian Name</label>
                  <input
                    type="text"
                    value={editParentName}
                    onChange={(e) => setEditParentName(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Contact Phone / WhatsApp</label>
                  <input
                    type="text"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-[#6E1373] hover:bg-[#561F79] text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
              >
                Save Profile Changes
              </button>
            </form>

            <div className="border-t border-slate-200 pt-6 space-y-4">
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">Change Account Password</h4>
              
              {passwordMsg && (
                <div className={`p-3 rounded-xl text-xs font-bold ${
                  passwordMsg.isError ? 'bg-red-50 text-red-800 border border-red-200' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                }`}>
                  {passwordMsg.text}
                </div>
              )}

              <form onSubmit={handleUpdatePassword} className="space-y-4 max-w-md">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl transition cursor-pointer"
                >
                  Update Password
                </button>
              </form>
            </div>
          </div>
        )}

        {/* 22. SUPPORT & HELP DESK */}
        {activeTab === 'support' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Academy Support & Student Help Desk
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Have questions regarding class schedule, teacher coordination, or curriculum? We are here 24/7.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 bg-purple-50/50 rounded-2xl border border-purple-100 space-y-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 text-[#6E1373] flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-base">Direct WhatsApp Support</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Connect instantly with our academic coordination desk for class rescheduling, teacher queries, or curriculum assistance.
                </p>
                <a
                  href="https://wa.me/923068959085?text=Assalam-o-Alaikum%2C%20I%20am%20a%20registered%20student%20at%20True%20Way%20Quran%20Academy%20and%20need%20assistance."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp (+92 306 8959085)</span>
                </a>
              </div>

              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-base">Academic Email Help Desk</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Official inquiries, billing questions, and certificate verifications can be forwarded directly to our academic dean.
                </p>
                <p className="text-xs font-mono font-bold text-[#6E1373]">
                  support@ustadleads.com
                </p>
              </div>
            </div>
          </div>
        )}
          </main>
        </div>
      </div>

      {/* STICKY BOTTOM MOBILE QUICK NAVIGATION BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 flex items-center justify-around shadow-lg">
        <button
          onClick={() => {
            setActiveTab('overview');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-[10px] font-bold transition ${
            activeTab === 'overview' ? 'text-[#6E1373]' : 'text-slate-500'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Dashboard</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('quran');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-[10px] font-bold transition ${
            activeTab === 'quran' ? 'text-[#6E1373]' : 'text-slate-500'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Quran</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('duas');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-[10px] font-bold transition ${
            activeTab === 'duas' ? 'text-[#6E1373]' : 'text-slate-500'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Duas</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('namaz');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-[10px] font-bold transition ${
            activeTab === 'namaz' ? 'text-[#6E1373]' : 'text-slate-500'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Namaz</span>
        </button>

        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-[10px] font-bold text-slate-500 hover:text-[#6E1373] transition"
        >
          <Menu className="w-4 h-4" />
          <span>All Menu</span>
        </button>
      </div>
    </div>
  );
};
