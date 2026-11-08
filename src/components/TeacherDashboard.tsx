import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  BookOpen, 
  Video, 
  Send, 
  Star, 
  Award, 
  Edit3, 
  Plus, 
  ShieldCheck, 
  Bell, 
  LogOut, 
  Sparkles,
  MessageCircle,
  FileText
} from 'lucide-react';
import { 
  AcademyUser, 
  ClassScheduleItem, 
  DailyLessonLog, 
  StudentAttendanceLog, 
  AcademyAnnouncement 
} from '../types/academy';
import { 
  getStoredAcademyUsers, 
  getStoredClassSchedules, 
  saveClassSchedules,
  getStoredDailyLessons,
  saveDailyLessons,
  getStoredAttendanceLogs,
  saveAttendanceLogs,
  getStoredAnnouncements,
  saveAnnouncements
} from '../utils/academyDatabase';

interface TeacherDashboardProps {
  currentUser: AcademyUser;
  onLogout: () => void;
  onNavigateHome: () => void;
  onOpenQuranReader?: () => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  currentUser,
  onLogout,
  onNavigateHome,
  onOpenQuranReader
}) => {
  const [activeTab, setActiveTab] = useState<'schedule' | 'students' | 'progress' | 'attendance' | 'announcements'>('schedule');
  
  const [schedules, setSchedules] = useState<ClassScheduleItem[]>([]);
  const [students, setStudents] = useState<AcademyUser[]>([]);
  const [dailyLessons, setDailyLessons] = useState<DailyLessonLog[]>([]);
  const [attendanceLogs, setAttendanceLogs] = useState<StudentAttendanceLog[]>([]);
  const [announcements, setAnnouncements] = useState<AcademyAnnouncement[]>([]);

  // New Lesson Progress Form
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
  const [sabaqTitle, setSabaqTitle] = useState('');
  const [sabaqStatus, setSabaqStatus] = useState<'passed' | 'needs_practice' | 'in_progress'>('passed');
  const [sabqiRevision, setSabqiRevision] = useState('');
  const [manzilRevision, setManzilRevision] = useState('');
  const [tajweedScore, setTajweedScore] = useState<number>(90);
  const [makharijScore, setMakharijScore] = useState<number>(90);
  const [fluencyScore, setFluencyScore] = useState<number>(85);
  const [homework, setHomework] = useState('');
  const [teacherFeedback, setTeacherFeedback] = useState('');
  const [lessonSavedNotice, setLessonSavedNotice] = useState(false);

  // New Announcement
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementMsg, setAnnouncementMsg] = useState('');
  const [announcementSavedNotice, setAnnouncementSavedNotice] = useState(false);

  useEffect(() => {
    const allUsers = getStoredAcademyUsers();
    const studentUsers = allUsers.filter(u => u.role === 'student');
    setStudents(studentUsers);

    if (studentUsers.length > 0) {
      setSelectedStudentId(studentUsers[0].id);
    }

    const allSchedules = getStoredClassSchedules();
    setSchedules(allSchedules);

    const allLessons = getStoredDailyLessons();
    setDailyLessons(allLessons);

    const allAttendance = getStoredAttendanceLogs();
    setAttendanceLogs(allAttendance);

    const allAnnouncements = getStoredAnnouncements();
    setAnnouncements(allAnnouncements);
  }, []);

  const handleMarkAttendance = (schedule: ClassScheduleItem, status: 'present' | 'absent' | 'late' | 'excused') => {
    const newLog: StudentAttendanceLog = {
      id: `att-${Date.now()}`,
      studentId: schedule.studentId,
      studentName: schedule.studentName,
      courseId: schedule.courseId,
      courseTitle: schedule.courseTitle,
      teacherName: currentUser.name,
      date: new Date().toISOString().split('T')[0],
      time: schedule.timeSlot,
      status,
      sessionTopic: `${schedule.courseTitle} - Live Session`,
      durationMinutes: schedule.durationMinutes,
      notes: `Attendance marked by ${currentUser.name}`
    };

    const updated = [newLog, ...attendanceLogs];
    setAttendanceLogs(updated);
    saveAttendanceLogs(updated);
  };

  const handleSaveLesson = (e: React.FormEvent) => {
    e.preventDefault();
    const student = students.find(s => s.id === selectedStudentId);
    if (!student) return;

    const newLesson: DailyLessonLog = {
      id: `les-${Date.now()}`,
      studentId: student.id,
      studentName: student.name,
      teacherId: currentUser.id,
      teacherName: currentUser.name,
      courseId: (student.enrolledCourseIds && student.enrolledCourseIds[0]) || 'course-quran-tajweed',
      date: new Date().toISOString().split('T')[0],
      sabaqTitle: sabaqTitle.trim() || 'Daily Quran Recitation',
      sabaqStatus,
      sabqiRevision: sabqiRevision.trim() || 'Previous 5 Ayahs',
      manzilRevision: manzilRevision.trim() || 'Juz Review',
      tajweedScore,
      makharijScore,
      fluencyScore,
      homework: homework.trim() || 'Revise assigned lesson 3 times.',
      teacherFeedback: teacherFeedback.trim() || 'Masha\'Allah good recitation. Keep practicing Makharij.'
    };

    const updated = [newLesson, ...dailyLessons];
    setDailyLessons(updated);
    saveDailyLessons(updated);

    setLessonSavedNotice(true);
    setSabaqTitle('');
    setSabqiRevision('');
    setHomework('');
    setTeacherFeedback('');
    setTimeout(() => setLessonSavedNotice(false), 3000);
  };

  const handlePostAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementTitle.trim() || !announcementMsg.trim()) return;

    const newAnn: AcademyAnnouncement = {
      id: `ann-${Date.now()}`,
      title: announcementTitle.trim(),
      message: announcementMsg.trim(),
      targetRole: 'students',
      date: new Date().toISOString().split('T')[0],
      senderName: currentUser.name
    };

    const updated = [newAnn, ...announcements];
    setAnnouncements(updated);
    saveAnnouncements(updated);

    setAnnouncementTitle('');
    setAnnouncementMsg('');
    setAnnouncementSavedNotice(true);
    setTimeout(() => setAnnouncementSavedNotice(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#6B1B7E] via-[#5B2A9A] to-[#2e1065] text-white py-8 border-b border-purple-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-purple-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Certified Instructor Portal</span>
              <span className="text-white/40">·</span>
              <span>Sanad & Ijazah Verified</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Instructor Dashboard: {currentUser.name}
            </h1>
            <p className="text-xs sm:text-sm text-purple-200">
              Manage assigned students, launch live Zoom/Google Meet classes, log daily Sabaq, and mark attendance.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {onOpenQuranReader && (
              <button
                onClick={onOpenQuranReader}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 transition cursor-pointer flex items-center gap-1.5"
              >
                <BookOpen className="w-4 h-4 text-emerald-300" />
                <span>Open Quran Reader</span>
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
            onClick={() => setActiveTab('schedule')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'schedule'
                ? 'bg-[#6B1B7E] text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Daily Class Timetable ({schedules.length})</span>
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
            <span>Assigned Students ({students.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('progress')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'progress'
                ? 'bg-[#6B1B7E] text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>Update Lesson & Homework</span>
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
            <span>Attendance Records ({attendanceLogs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('announcements')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'announcements'
                ? 'bg-[#6B1B7E] text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Post Class Announcement</span>
          </button>
        </div>

        {/* Tab 1: Class Timetable & Launch Link */}
        {activeTab === 'schedule' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-black text-slate-900">
                    Today's Live Classes & Timetable
                  </h3>
                  <p className="text-xs text-slate-500">
                    Click "Join Online Class" to launch the Google Meet or Zoom virtual room directly.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {schedules.map((sch) => (
                  <div 
                    key={sch.id}
                    className="p-5 rounded-2xl border border-purple-100 bg-purple-50/30 flex flex-col justify-between space-y-4 hover:border-purple-300 transition"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="px-2.5 py-0.5 rounded-md bg-purple-100 text-[#6B1B7E] text-[10px] font-bold">
                          {sch.dayOfWeek} · {sch.timeSlot}
                        </span>
                        <h4 className="font-bold text-slate-900 text-base mt-2">
                          {sch.studentName}
                        </h4>
                        <p className="text-xs text-[#6B1B7E] font-medium">
                          {sch.courseTitle}
                        </p>
                      </div>

                      <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        {sch.durationMinutes} mins
                      </span>
                    </div>

                    <div className="pt-3 border-t border-purple-100 flex flex-wrap items-center justify-between gap-2">
                      <a
                        href={sch.meetingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gradient-to-r from-[#6B1B7E] to-[#E0107F] hover:from-[#5B2A9A] hover:to-[#6B1B7E] text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Launch Online Class ({sch.meetingPlatform})</span>
                      </a>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleMarkAttendance(sch, 'present')}
                          className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[11px] font-bold rounded-lg border border-emerald-200"
                        >
                          Mark Present
                        </button>
                        <button
                          onClick={() => handleMarkAttendance(sch, 'absent')}
                          className="px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-[11px] font-bold rounded-lg border border-red-200"
                        >
                          Absent
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Assigned Students */}
        {activeTab === 'students' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-xl font-black text-slate-900">
              Assigned Students List
            </h3>
            <p className="text-xs text-slate-500">
              View your active students, their enrolled courses, age, and parent contact information.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4">Student</th>
                    <th className="py-3 px-4">Age</th>
                    <th className="py-3 px-4">Parent Details</th>
                    <th className="py-3 px-4">Location / Timezone</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {students.map((st) => (
                    <tr key={st.id} className="hover:bg-slate-50/80">
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {st.name}
                        <span className="block text-[10px] text-slate-400 font-normal">{st.email}</span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {st.studentAge || 10} yrs
                      </td>
                      <td className="py-3.5 px-4 text-slate-700">
                        <span className="font-semibold">{st.parentName || st.name}</span>
                        <span className="block text-[11px] text-slate-500">{st.phone || st.parentPhone}</span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {st.country}
                        <span className="block text-[10px] text-slate-400">{st.timezone}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                          {st.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <a
                          href={`https://wa.me/${(st.phone || '').replace(/[^0-9]/g, '')}?text=Assalam-o-Alaikum%20${encodeURIComponent(st.parentName || st.name)}%2C%20this%20is%20${encodeURIComponent(currentUser.name)}%20from%20True%20Way%20Quran.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-[11px] rounded-lg border border-emerald-200 inline-flex items-center gap-1"
                        >
                          <MessageCircle className="w-3 h-3" />
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

        {/* Tab 3: Update Daily Lesson Progress */}
        {activeTab === 'progress' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 bg-white p-7 rounded-3xl border border-slate-200 shadow-xs space-y-5">
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  Record Daily Lesson Progress
                </h3>
                <p className="text-xs text-slate-500">
                  Update Sabaq (new verses), Sabqi revision, Tajweed evaluation score, and homework for the student.
                </p>
              </div>

              {lessonSavedNotice && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Lesson progress saved successfully and updated in Student & Parent Portal!</span>
                </div>
              )}

              <form onSubmit={handleSaveLesson} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Select Student *
                  </label>
                  <select
                    value={selectedStudentId}
                    onChange={e => setSelectedStudentId(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white focus:border-[#6B1B7E] focus:outline-hidden"
                  >
                    {students.map(st => (
                      <option key={st.id} value={st.id}>
                        {st.name} ({st.country})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Daily Sabaq (New Lesson) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Surah Al-Mulk: Verses 1 to 10"
                      value={sabaqTitle}
                      onChange={e => setSabaqTitle(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-[#6B1B7E] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Sabaq Result
                    </label>
                    <select
                      value={sabaqStatus}
                      onChange={e => setSabaqStatus(e.target.value as any)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:border-[#6B1B7E] focus:outline-hidden"
                    >
                      <option value="passed">Passed (Can advance next class)</option>
                      <option value="needs_practice">Needs Practice (Repeat next class)</option>
                      <option value="in_progress">In Progress</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Sabqi (Recent Lessons Revision)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Surah Al-Waqiah (Pages 1-2)"
                      value={sabqiRevision}
                      onChange={e => setSabqiRevision(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-[#6B1B7E] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Manzil (Cumulative Review)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Juz 29 Review"
                      value={manzilRevision}
                      onChange={e => setManzilRevision(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-[#6B1B7E] focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Performance Evaluation Sliders */}
                <div className="p-4 bg-purple-50/50 rounded-2xl border border-purple-100 space-y-3">
                  <span className="block text-xs font-bold text-[#6B1B7E] uppercase">
                    Performance Evaluation Scores:
                  </span>
                  
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="block text-slate-600 font-medium">Tajweed: {tajweedScore}%</span>
                      <input
                        type="range"
                        min="50"
                        max="100"
                        value={tajweedScore}
                        onChange={e => setTajweedScore(parseInt(e.target.value, 10))}
                        className="w-full accent-[#6B1B7E]"
                      />
                    </div>
                    <div>
                      <span className="block text-slate-600 font-medium">Makharij: {makharijScore}%</span>
                      <input
                        type="range"
                        min="50"
                        max="100"
                        value={makharijScore}
                        onChange={e => setMakharijScore(parseInt(e.target.value, 10))}
                        className="w-full accent-[#6B1B7E]"
                      />
                    </div>
                    <div>
                      <span className="block text-slate-600 font-medium">Fluency: {fluencyScore}%</span>
                      <input
                        type="range"
                        min="50"
                        max="100"
                        value={fluencyScore}
                        onChange={e => setFluencyScore(parseInt(e.target.value, 10))}
                        className="w-full accent-[#6B1B7E]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Homework / Practice Assignment
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Recite Surah Al-Mulk Verses 1-10 three times with father after Asr."
                    value={homework}
                    onChange={e => setHomework(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-[#6B1B7E] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Teacher Feedback & Note to Parents
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Masha'Allah very focused today. Remind him to pronounce letter Qaf without throat constriction."
                    value={teacherFeedback}
                    onChange={e => setTeacherFeedback(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#6B1B7E] focus:outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-[#6B1B7E] to-[#E0107F] text-white font-bold text-xs rounded-xl shadow-xs hover:shadow-md transition cursor-pointer"
                >
                  Save Daily Lesson & Send to Parent Portal
                </button>
              </form>
            </div>

            {/* Recent Lesson Log History */}
            <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <h4 className="font-bold text-slate-900 text-sm">
                Recent Daily Lessons History ({dailyLessons.length})
              </h4>
              
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {dailyLessons.map(log => (
                  <div key={log.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{log.studentName}</span>
                      <span className="text-[10px] text-slate-400">{log.date}</span>
                    </div>
                    <p className="font-semibold text-[#6B1B7E] text-[11px]">
                      Sabaq: {log.sabaqTitle}
                    </p>
                    <div className="flex gap-2 text-[10px] text-slate-600">
                      <span>Tajweed: <strong>{log.tajweedScore}%</strong></span>
                      <span>·</span>
                      <span>Makharij: <strong>{log.makharijScore}%</strong></span>
                    </div>
                    {log.homework && (
                      <p className="text-[11px] text-slate-500 italic">
                        HW: {log.homework}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Attendance Records */}
        {activeTab === 'attendance' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-xl font-black text-slate-900">
              Student Attendance Log
            </h3>
            <p className="text-xs text-slate-500">
              Logged attendance records for assigned student sessions.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4">Student</th>
                    <th className="py-3 px-4">Date & Time</th>
                    <th className="py-3 px-4">Course Topic</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {attendanceLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/80">
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {log.studentName}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {log.date} at {log.time}
                      </td>
                      <td className="py-3.5 px-4 text-slate-700 font-medium">
                        {log.sessionTopic}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                          log.status === 'present' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
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

        {/* Tab 5: Post Announcement */}
        {activeTab === 'announcements' && (
          <div className="max-w-2xl bg-white p-7 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div>
              <h3 className="text-xl font-black text-slate-900">
                Post Class Announcement
              </h3>
              <p className="text-xs text-slate-500">
                Send an alert directly to all your assigned students and their parent dashboards.
              </p>
            </div>

            {announcementSavedNotice && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Announcement published to students and parents!</span>
              </div>
            )}

            <form onSubmit={handlePostAnnouncement} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Announcement Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Schedule Update for Eid Week or Weekend Tajweed Exam"
                  value={announcementTitle}
                  onChange={e => setAnnouncementTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-[#6B1B7E] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Message Details *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Type the message for your students and parents..."
                  value={announcementMsg}
                  onChange={e => setAnnouncementMsg(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-[#6B1B7E] focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#6B1B7E] hover:bg-[#5B2A9A] text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
              >
                Publish Announcement
              </button>
            </form>
          </div>
        )}

      </div>

    </div>
  );
};
