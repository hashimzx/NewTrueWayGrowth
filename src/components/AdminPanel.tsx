import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  ShieldCheck, 
  Mail, 
  Phone, 
  Trash2, 
  Edit, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  Calendar, 
  Video, 
  BookOpen, 
  DollarSign, 
  FileText, 
  Star, 
  Bell, 
  LogOut, 
  ArrowRight, 
  MessageCircle, 
  Plus,
  Clock,
  Sparkles
} from 'lucide-react';
import { 
  AcademyUser, 
  TrialBookingRequest, 
  ClassScheduleItem, 
  StudentAttendanceLog, 
  DailyLessonLog, 
  AcademyAnnouncement,
  AcademyTeacher
} from '../types/academy';
import { 
  getStoredAcademyUsers, 
  saveAcademyUsers, 
  getStoredTrialBookings, 
  saveTrialBookings, 
  getStoredClassSchedules, 
  saveClassSchedules,
  getStoredAttendanceLogs,
  getStoredDailyLessons,
  getStoredAnnouncements,
  saveAnnouncements,
  DEFAULT_QURAN_COURSES,
  DEFAULT_TEACHERS
} from '../utils/academyDatabase';

interface AdminPanelProps {
  currentUser: any;
  onLogout: () => void;
  onNavigateHome: () => void;
  onOpenQuranReader?: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  currentUser,
  onLogout,
  onNavigateHome,
  onOpenQuranReader
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'trials' | 'students' | 'teachers' | 'schedules' | 'attendance' | 'broadcast'>('overview');

  const [users, setUsers] = useState<AcademyUser[]>([]);
  const [trials, setTrials] = useState<TrialBookingRequest[]>([]);
  const [schedules, setSchedules] = useState<ClassScheduleItem[]>([]);
  const [attendance, setAttendance] = useState<StudentAttendanceLog[]>([]);
  const [dailyLessons, setDailyLessons] = useState<DailyLessonLog[]>([]);
  const [announcements, setAnnouncements] = useState<AcademyAnnouncement[]>([]);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [trialFilter, setTrialFilter] = useState<'all' | 'new' | 'contacted' | 'scheduled' | 'enrolled'>('all');

  // New Student Modal / Form
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentEmail, setNewStudentEmail] = useState('');
  const [newStudentParent, setNewStudentParent] = useState('');
  const [newStudentPhone, setNewStudentPhone] = useState('');
  const [newStudentAge, setNewStudentAge] = useState('8');
  const [newStudentCourse, setNewStudentCourse] = useState('course-madani-qaida');
  const [newStudentTeacher, setNewStudentTeacher] = useState('teacher-bilal');

  // New Schedule Modal / Form
  const [showAddSchedule, setShowAddSchedule] = useState(false);
  const [schedStudentId, setSchedStudentId] = useState('');
  const [schedTeacherId, setSchedTeacherId] = useState('teacher-bilal');
  const [schedDay, setSchedDay] = useState<any>('Monday');
  const [schedTime, setSchedTime] = useState('05:00 PM');
  const [schedUrl, setSchedUrl] = useState('https://meet.google.com/trueway-quran-live');

  // Broadcast state
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMsg, setBroadcastMsg] = useState('');
  const [broadcastSavedNotice, setBroadcastSavedNotice] = useState(false);

  useEffect(() => {
    setUsers(getStoredAcademyUsers());
    setTrials(getStoredTrialBookings());
    setSchedules(getStoredClassSchedules());
    setAttendance(getStoredAttendanceLogs());
    setDailyLessons(getStoredDailyLessons());
    setAnnouncements(getStoredAnnouncements());
  }, []);

  const studentsList = users.filter(u => u.role === 'student');
  const instructorsList = users.filter(u => u.role === 'instructor');

  const handleUpdateTrialStatus = (id: string, newStatus: any) => {
    const updated = trials.map(t => t.id === id ? { ...t, status: newStatus } : t);
    setTrials(updated);
    saveTrialBookings(updated);
  };

  const handleToggleUserStatus = (id: string) => {
    const updated = users.map(u => {
      if (u.id === id) {
        return { ...u, status: u.status === 'active' ? 'inactive' : 'active' as any };
      }
      return u;
    });
    setUsers(updated);
    saveAcademyUsers(updated);
  };

  const handleDeleteUser = (id: string) => {
    if (confirm('Are you sure you want to remove this user from the academy database?')) {
      const updated = users.filter(u => u.id !== id);
      setUsers(updated);
      saveAcademyUsers(updated);
    }
  };

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim() || !newStudentEmail.trim()) return;

    const teacherObj = DEFAULT_TEACHERS.find(t => t.id === newStudentTeacher);

    const newUser: AcademyUser = {
      id: `usr-student-${Date.now()}`,
      name: newStudentName.trim(),
      email: newStudentEmail.trim(),
      passwordHash: 'student123',
      role: 'student',
      phone: newStudentPhone.trim(),
      country: 'United Kingdom',
      timezone: 'Europe/London (GMT)',
      status: 'active',
      emailVerified: true,
      createdAt: new Date().toISOString().split('T')[0],
      studentAge: parseInt(newStudentAge, 10) || 8,
      parentName: newStudentParent.trim() || newStudentName.trim(),
      parentPhone: newStudentPhone.trim(),
      enrolledCourseIds: [newStudentCourse],
      assignedTeacherId: newStudentTeacher,
      assignedTeacherName: teacherObj ? teacherObj.name : 'Qari Muhammad Bilal Al-Azhari',
      monthlyFee: 50,
      currency: 'GBP'
    };

    const updated = [newUser, ...users];
    setUsers(updated);
    saveAcademyUsers(updated);

    setShowAddStudent(false);
    setNewStudentName('');
    setNewStudentEmail('');
    setNewStudentParent('');
    setNewStudentPhone('');
  };

  const handleCreateSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    const student = users.find(u => u.id === schedStudentId) || studentsList[0];
    const teacher = DEFAULT_TEACHERS.find(t => t.id === schedTeacherId) || DEFAULT_TEACHERS[0];
    if (!student) return;

    const newSch: ClassScheduleItem = {
      id: `sch-${Date.now()}`,
      studentId: student.id,
      studentName: student.name,
      teacherId: teacher.id,
      teacherName: teacher.name,
      courseId: (student.enrolledCourseIds && student.enrolledCourseIds[0]) || 'course-quran-tajweed',
      courseTitle: 'Quran Reading & Tajweed',
      dayOfWeek: schedDay,
      timeSlot: schedTime,
      durationMinutes: 30,
      meetingUrl: schedUrl.trim() || 'https://meet.google.com/trueway-quran-live',
      meetingPlatform: 'Google Meet',
      status: 'upcoming'
    };

    const updated = [newSch, ...schedules];
    setSchedules(updated);
    saveClassSchedules(updated);
    setShowAddSchedule(false);
  };

  const handlePostBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle.trim() || !broadcastMsg.trim()) return;

    const newAnn: AcademyAnnouncement = {
      id: `ann-${Date.now()}`,
      title: broadcastTitle.trim(),
      message: broadcastMsg.trim(),
      targetRole: 'all',
      date: new Date().toISOString().split('T')[0],
      senderName: 'Academy Super Admin'
    };

    const updated = [newAnn, ...announcements];
    setAnnouncements(updated);
    saveAnnouncements(updated);

    setBroadcastTitle('');
    setBroadcastMsg('');
    setBroadcastSavedNotice(true);
    setTimeout(() => setBroadcastSavedNotice(false), 3000);
  };

  const filteredTrials = trials.filter(t => {
    if (trialFilter !== 'all' && t.status !== trialFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        t.studentName.toLowerCase().includes(q) ||
        t.parentName.toLowerCase().includes(q) ||
        t.parentEmail.toLowerCase().includes(q) ||
        t.parentPhone.includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#6B1B7E] via-[#5B2A9A] to-[#2e1065] text-white py-8 border-b border-purple-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-purple-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>True Way Quran Super Admin</span>
              <span className="text-white/40">·</span>
              <span>Central Management Console</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Academy Executive Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-purple-200">
              Manage student registrations, teacher assignments, class schedules, lead triage, and academy reports.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {onOpenQuranReader && (
              <button
                onClick={onOpenQuranReader}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 transition cursor-pointer flex items-center gap-1.5"
              >
                <BookOpen className="w-4 h-4 text-emerald-300" />
                <span>Quran Reader</span>
              </button>
            )}

            <button
              onClick={onNavigateHome}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 transition cursor-pointer"
            >
              Public Site
            </button>

            <button
              onClick={onLogout}
              className="px-4 py-2 bg-red-600/80 hover:bg-red-600 text-white font-bold text-xs rounded-xl transition cursor-pointer flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
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
            <ShieldCheck className="w-4 h-4" />
            <span>Overview & KPIs</span>
          </button>

          <button
            onClick={() => setActiveTab('trials')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'trials'
                ? 'bg-[#6B1B7E] text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Trial Requests ({trials.filter(t => t.status === 'new').length} New)</span>
          </button>

          <button
            onClick={() => setActiveTab('students')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'students'
                ? 'bg-[#6B1B7E] text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Students ({studentsList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('teachers')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'teachers'
                ? 'bg-[#6B1B7E] text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Teachers ({DEFAULT_TEACHERS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('schedules')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'schedules'
                ? 'bg-[#6B1B7E] text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Class Timetables & Links ({schedules.length})</span>
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
            <span>Attendance & Progress</span>
          </button>

          <button
            onClick={() => setActiveTab('broadcast')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'broadcast'
                ? 'bg-[#6B1B7E] text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Send Announcements</span>
          </button>
        </div>

        {/* Tab 1: Overview & KPIs */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 bg-white rounded-2xl border border-purple-100 shadow-xs space-y-1">
                <span className="text-xs font-semibold text-slate-400">Total Registered Students</span>
                <span className="block text-3xl font-black text-[#6B1B7E]">
                  {studentsList.length}
                </span>
                <span className="text-[11px] text-emerald-600 font-bold">
                  {studentsList.filter(s => s.status === 'active').length} Active · 0 Inactive
                </span>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-purple-100 shadow-xs space-y-1">
                <span className="text-xs font-semibold text-slate-400">New Free Trial Leads</span>
                <span className="block text-3xl font-black text-[#E0107F]">
                  {trials.filter(t => t.status === 'new').length}
                </span>
                <span className="text-[11px] text-slate-500">
                  {trials.length} Total Applications
                </span>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-purple-100 shadow-xs space-y-1">
                <span className="text-xs font-semibold text-slate-400">Certified Instructors</span>
                <span className="block text-3xl font-black text-[#6B1B7E]">
                  {DEFAULT_TEACHERS.length}
                </span>
                <span className="text-[11px] text-slate-500">
                  Male & Female Scholars
                </span>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-purple-100 shadow-xs space-y-1">
                <span className="text-xs font-semibold text-slate-400">Quran Courses</span>
                <span className="block text-3xl font-black text-emerald-600">
                  {DEFAULT_QURAN_COURSES.length}
                </span>
                <span className="text-[11px] text-slate-500">
                  Madani Qaida, Tajweed, Hifz, Tafseer
                </span>
              </div>
            </div>

            {/* Recent Trial Submissions */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-black text-slate-900 text-lg">
                  Recent Free Trial Requests
                </h3>
                <button
                  onClick={() => setActiveTab('trials')}
                  className="text-xs font-bold text-[#6B1B7E] hover:underline cursor-pointer"
                >
                  View All ({trials.length}) →
                </button>
              </div>

              <div className="space-y-3">
                {trials.slice(0, 3).map(tr => (
                  <div key={tr.id} className="p-4 rounded-2xl bg-purple-50/40 border border-purple-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">
                        {tr.studentName} ({tr.studentAge} yrs)
                      </h4>
                      <p className="text-xs text-slate-500">
                        Parent: {tr.parentName} · {tr.parentPhone} · Course: <strong>{tr.courseTitle}</strong>
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        tr.status === 'new' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {tr.status.toUpperCase()}
                      </span>
                      <a
                        href={`https://wa.me/${tr.parentPhone.replace(/[^0-9]/g, '')}?text=Assalam-o-Alaikum%20${encodeURIComponent(tr.parentName)}%2C%20this%20is%20Abdul%20Basit%20from%20True%20Way%20Quran%20regarding%20the%20free%20trial%20class%20for%20${encodeURIComponent(tr.studentName)}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Free Trial Requests & Lead Management */}
        {activeTab === 'trials' && (
          <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  Free Trial Class Applications ({filteredTrials.length})
                </h3>
                <p className="text-xs text-slate-500">
                  Manage incoming trial leads, assign teachers, and communicate with parents via WhatsApp.
                </p>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2">
                {(['all', 'new', 'scheduled', 'enrolled'] as const).map(flt => (
                  <button
                    key={flt}
                    onClick={() => setTrialFilter(flt)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
                      trialFilter === flt ? 'bg-[#6B1B7E] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {flt}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4">Student & Age</th>
                    <th className="py-3 px-4">Parent Details</th>
                    <th className="py-3 px-4">Requested Course</th>
                    <th className="py-3 px-4">Preferred Slot</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredTrials.map(tr => (
                    <tr key={tr.id} className="hover:bg-slate-50/80">
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {tr.studentName}
                        <span className="block text-[11px] text-slate-400 font-normal">{tr.studentAge} years old</span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-700">
                        <span className="font-semibold">{tr.parentName}</span>
                        <span className="block text-[11px] text-slate-500">{tr.parentPhone}</span>
                        <span className="block text-[10px] text-slate-400">{tr.parentEmail}</span>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-[#6B1B7E]">
                        {tr.courseTitle}
                        <span className="block text-[10px] text-slate-400">Pref: {tr.preferredTeacherGender} teacher</span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {tr.preferredTimeSlot}
                        <span className="block text-[10px] text-slate-400">{tr.timezone}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <select
                          value={tr.status}
                          onChange={e => handleUpdateTrialStatus(tr.id, e.target.value)}
                          className="px-2 py-1 bg-white border border-slate-300 rounded-md text-[11px] font-bold"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="scheduled">Scheduled</option>
                          <option value="enrolled">Enrolled</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4">
                        <a
                          href={`https://wa.me/${tr.parentPhone.replace(/[^0-9]/g, '')}?text=Assalam-o-Alaikum%20${encodeURIComponent(tr.parentName)}%2C%20this%20is%20Abdul%20Basit%20from%20True%20Way%20Quran%20regarding%20the%20free%20trial%20class%20for%20${encodeURIComponent(tr.studentName)}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg inline-flex items-center gap-1 shadow-xs"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Student Management */}
        {activeTab === 'students' && (
          <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  Registered Students Management ({studentsList.length})
                </h3>
                <p className="text-xs text-slate-500">
                  Add new students, assign teachers, and toggle active status.
                </p>
              </div>

              <button
                onClick={() => setShowAddStudent(true)}
                className="px-4 py-2.5 bg-[#6B1B7E] hover:bg-[#5B2A9A] text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>Add New Student</span>
              </button>
            </div>

            {/* Add Student Modal / Inline Form */}
            {showAddStudent && (
              <div className="p-6 bg-purple-50/50 rounded-2xl border border-purple-200 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-sm">Create Student Profile</h4>
                  <button onClick={() => setShowAddStudent(false)} className="text-xs text-slate-400 hover:text-slate-600">
                    Cancel
                  </button>
                </div>

                <form onSubmit={handleCreateStudent} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Student Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Zayd Miller"
                      value={newStudentName}
                      onChange={e => setNewStudentName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Student Login Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="zayd@example.com"
                      value={newStudentEmail}
                      onChange={e => setNewStudentEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Parent Name</label>
                    <input
                      type="text"
                      placeholder="Sarah Miller"
                      value={newStudentParent}
                      onChange={e => setNewStudentParent(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Parent Phone / WhatsApp</label>
                    <input
                      type="tel"
                      placeholder="+44 7890 123456"
                      value={newStudentPhone}
                      onChange={e => setNewStudentPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Enrolled Course</label>
                    <select
                      value={newStudentCourse}
                      onChange={e => setNewStudentCourse(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                    >
                      {DEFAULT_QURAN_COURSES.map(c => (
                        <option key={c.id} value={c.id}>{c.title}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Assign Teacher</label>
                    <select
                      value={newStudentTeacher}
                      onChange={e => setNewStudentTeacher(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                    >
                      {DEFAULT_TEACHERS.map(t => (
                        <option key={t.id} value={t.id}>{t.name} ({t.gender})</option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2 lg:col-span-3 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-gradient-to-r from-[#6B1B7E] to-[#E0107F] text-white font-bold text-xs rounded-xl shadow-xs"
                    >
                      Save & Register Student
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4">Student</th>
                    <th className="py-3 px-4">Assigned Teacher</th>
                    <th className="py-3 px-4">Parent Details</th>
                    <th className="py-3 px-4">Monthly Fee</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {studentsList.map(st => (
                    <tr key={st.id} className="hover:bg-slate-50/80">
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {st.name}
                        <span className="block text-[10px] text-slate-400 font-normal">{st.email}</span>
                      </td>
                      <td className="py-3.5 px-4 text-[#6B1B7E] font-medium">
                        {st.assignedTeacherName || 'Qari Bilal'}
                      </td>
                      <td className="py-3.5 px-4 text-slate-700">
                        <span className="font-semibold">{st.parentName || st.name}</span>
                        <span className="block text-[11px] text-slate-500">{st.phone}</span>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {st.currency === 'GBP' ? '£' : '$'}{st.monthlyFee}/mo
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => handleToggleUserStatus(st.id)}
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer ${
                            st.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {st.status.toUpperCase()}
                        </button>
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => handleDeleteUser(st.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 cursor-pointer transition"
                          title="Remove Student"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Teacher Management */}
        {activeTab === 'teachers' && (
          <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div>
              <h3 className="text-xl font-black text-slate-900">
                Teacher Roster & Qualifications
              </h3>
              <p className="text-xs text-slate-500">
                Certified scholars, their Sanad/Ijazah credentials, and assigned student counts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {DEFAULT_TEACHERS.map(tc => (
                <div key={tc.id} className="p-6 rounded-2xl border border-purple-100 bg-purple-50/20 space-y-3">
                  <div className="flex items-start gap-4">
                    <img src={tc.photo} alt={tc.name} className="w-16 h-16 rounded-xl object-cover border border-purple-200" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">{tc.name}</h4>
                      <p className="text-xs text-[#6B1B7E] font-semibold">{tc.title}</p>
                      <span className="text-[11px] text-emerald-700 font-bold block mt-1">
                        Sanad: {tc.ijazah}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{tc.bio}</p>
                  
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-purple-100">
                    <span className="text-slate-500">Languages: <strong>{tc.languages.join(', ')}</strong></span>
                    <span className="text-purple-900 font-bold">{tc.activeStudentsCount} Active Students</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Class Timetables & Links */}
        {activeTab === 'schedules' && (
          <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  Class Timetables & Meeting Links ({schedules.length})
                </h3>
                <p className="text-xs text-slate-500">
                  Manage weekly recurring schedule slots and set custom Google Meet or Zoom URLs.
                </p>
              </div>

              <button
                onClick={() => setShowAddSchedule(true)}
                className="px-4 py-2.5 bg-[#6B1B7E] hover:bg-[#5B2A9A] text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Create Class Schedule</span>
              </button>
            </div>

            {/* Add Schedule Form */}
            {showAddSchedule && (
              <div className="p-6 bg-purple-50/50 rounded-2xl border border-purple-200 space-y-4">
                <h4 className="font-bold text-slate-900 text-sm">Schedule a Class Slot</h4>
                <form onSubmit={handleCreateSchedule} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Student</label>
                    <select
                      value={schedStudentId}
                      onChange={e => setSchedStudentId(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                    >
                      {studentsList.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Teacher</label>
                    <select
                      value={schedTeacherId}
                      onChange={e => setSchedTeacherId(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                    >
                      {DEFAULT_TEACHERS.map(t => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Day of Week</label>
                    <select
                      value={schedDay}
                      onChange={e => setSchedDay(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                    >
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Time Slot</label>
                    <input
                      type="text"
                      value={schedTime}
                      onChange={e => setSchedTime(e.target.value)}
                      placeholder="e.g. 05:00 PM"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-700 mb-1">Meeting Link (Google Meet / Zoom)</label>
                    <input
                      type="url"
                      value={schedUrl}
                      onChange={e => setSchedUrl(e.target.value)}
                      placeholder="https://meet.google.com/..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2 lg:col-span-3 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddSchedule(false)}
                      className="px-4 py-2 bg-slate-200 text-slate-700 rounded-xl font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-[#6B1B7E] text-white rounded-xl font-bold shadow-xs"
                    >
                      Save Schedule
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4">Student</th>
                    <th className="py-3 px-4">Teacher</th>
                    <th className="py-3 px-4">Day & Time</th>
                    <th className="py-3 px-4">Meeting URL</th>
                    <th className="py-3 px-4">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {schedules.map(sch => (
                    <tr key={sch.id} className="hover:bg-slate-50/80">
                      <td className="py-3.5 px-4 font-bold text-slate-900">{sch.studentName}</td>
                      <td className="py-3.5 px-4 text-[#6B1B7E] font-medium">{sch.teacherName}</td>
                      <td className="py-3.5 px-4 font-semibold text-slate-700">{sch.dayOfWeek} at {sch.timeSlot}</td>
                      <td className="py-3.5 px-4">
                        <a href={sch.meetingUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline truncate max-w-xs block font-mono">
                          {sch.meetingUrl}
                        </a>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500">{sch.durationMinutes} mins</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 6: Attendance & Progress */}
        {activeTab === 'attendance' && (
          <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div>
              <h3 className="text-xl font-black text-slate-900">
                Academy-Wide Attendance & Daily Lessons
              </h3>
              <p className="text-xs text-slate-500">
                Review sessions completed, topics covered, and teacher evaluation ratings.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4">Student</th>
                    <th className="py-3 px-4">Date & Time</th>
                    <th className="py-3 px-4">Teacher</th>
                    <th className="py-3 px-4">Topic / Sabaq</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {attendance.map(att => (
                    <tr key={att.id} className="hover:bg-slate-50/80">
                      <td className="py-3.5 px-4 font-bold text-slate-900">{att.studentName}</td>
                      <td className="py-3.5 px-4 text-slate-600">{att.date} at {att.time}</td>
                      <td className="py-3.5 px-4 text-[#6B1B7E] font-medium">{att.teacherName}</td>
                      <td className="py-3.5 px-4 text-slate-700">{att.sessionTopic}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
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

        {/* Tab 7: Send Broadcast Announcements */}
        {activeTab === 'broadcast' && (
          <div className="max-w-2xl bg-white p-7 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div>
              <h3 className="text-xl font-black text-slate-900">
                Send Academy-Wide Announcement
              </h3>
              <p className="text-xs text-slate-500">
                Broadcast an alert that appears on all student, parent, and teacher dashboards.
              </p>
            </div>

            {broadcastSavedNotice && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Announcement published to all portals!</span>
              </div>
            )}

            <form onSubmit={handlePostBroadcast} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Announcement Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramadan Schedule Timings & Special Hifz Intensive"
                  value={broadcastTitle}
                  onChange={e => setBroadcastTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-[#6B1B7E] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Message Content *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Type the message for students and teachers..."
                  value={broadcastMsg}
                  onChange={e => setBroadcastMsg(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-[#6B1B7E] focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#6B1B7E] hover:bg-[#5B2A9A] text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
              >
                Publish Academy Announcement
              </button>
            </form>
          </div>
        )}

      </div>

    </div>
  );
};
