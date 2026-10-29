import React, { useState, useEffect } from 'react';
import { User, AttendanceRecord } from '../types';
import confetti from 'canvas-confetti';
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Award, 
  Flame, 
  UserCheck, 
  Filter, 
  Download, 
  Plus, 
  AlertCircle, 
  ShieldCheck, 
  BookOpen,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface AttendanceTrackerProps {
  currentUser: User | null;
  onOpenSchedule?: () => void;
  onNavigateToCourse?: () => void;
}

const DEFAULT_ATTENDANCE_LOG: AttendanceRecord[] = [
  {
    id: 'att-101',
    userId: 'usr-student-1',
    userName: 'Hashim Zafar',
    courseId: 'course-quran-teacher',
    courseTitle: 'Online Quran Teacher Masterclass',
    date: '2026-10-24',
    time: '04:00 PM',
    status: 'present',
    sessionTopic: 'International Student Engagement & Lesson Delivery',
    instructorName: 'Mentor Abdul Basit Saleem',
    durationMinutes: 45,
    notes: 'Excellent participation; completed mock teaching demonstration.'
  },
  {
    id: 'att-102',
    userId: 'usr-student-1',
    userName: 'Hashim Zafar',
    courseId: 'course-tajweed-rules',
    courseTitle: 'Practical Tajweed & Makharij Masterclass',
    date: '2026-10-23',
    time: '05:30 PM',
    status: 'present',
    sessionTopic: 'Heavy vs Light Letters (Tafkheem & Tarqeeq)',
    instructorName: 'Ustadh Tariq Hashimi',
    durationMinutes: 45,
    notes: 'Mastered heavy letter release from root of tongue.'
  },
  {
    id: 'att-103',
    userId: 'usr-student-1',
    userName: 'Hashim Zafar',
    courseId: 'course-madani-qaida',
    courseTitle: 'Complete Madani Qaida Foundation',
    date: '2026-10-21',
    time: '04:00 PM',
    status: 'present',
    sessionTopic: 'Compound Letters & Joint Forms (Lesson 2)',
    instructorName: 'Qari Muhammad Bilal',
    durationMinutes: 45,
    notes: 'Pronounced Baa, Taa, and Thaa compound joins accurately.'
  },
  {
    id: 'att-104',
    userId: 'usr-student-1',
    userName: 'Hashim Zafar',
    courseId: 'course-quran-teacher',
    courseTitle: 'Online Quran Teacher Masterclass',
    date: '2026-10-19',
    time: '04:00 PM',
    status: 'late',
    sessionTopic: 'Digital Whiteboard Setup & Screen Sharing',
    instructorName: 'Mentor Abdul Basit Saleem',
    durationMinutes: 40,
    notes: 'Joined 5 mins late due to internet reconnection; completed exercises.'
  },
  {
    id: 'att-105',
    userId: 'usr-student-1',
    userName: 'Hashim Zafar',
    courseId: 'course-madani-qaida',
    courseTitle: 'Complete Madani Qaida Foundation',
    date: '2026-10-17',
    time: '04:00 PM',
    status: 'present',
    sessionTopic: 'Mufradat Single Letters Mastery',
    instructorName: 'Qari Muhammad Bilal',
    durationMinutes: 45
  },
  {
    id: 'att-106',
    userId: 'usr-student-1',
    userName: 'Hashim Zafar',
    courseId: 'course-tajweed-rules',
    courseTitle: 'Practical Tajweed & Makharij Masterclass',
    date: '2026-10-15',
    time: '05:30 PM',
    status: 'excused',
    sessionTopic: 'Noon Sakinah Rules & Ghunnah Duration',
    instructorName: 'Ustadh Tariq Hashimi',
    durationMinutes: 45,
    notes: 'Prior notice given for university exams; watched HD class recording.'
  }
];

export const AttendanceTracker: React.FC<AttendanceTrackerProps> = ({
  currentUser,
  onOpenSchedule,
  onNavigateToCourse
}) => {
  const [records, setRecords] = useState<AttendanceRecord[]>(() => {
    try {
      const saved = localStorage.getItem('twq_attendance_records');
      return saved ? JSON.parse(saved) : DEFAULT_ATTENDANCE_LOG;
    } catch {
      return DEFAULT_ATTENDANCE_LOG;
    }
  });

  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>('all');
  const [isCheckedInToday, setIsCheckedInToday] = useState<boolean>(false);
  const [checkInSuccessMsg, setCheckInSuccessMsg] = useState<string | null>(null);

  const todayStr = new Date().toISOString().split('T')[0];

  useEffect(() => {
    try {
      localStorage.setItem('twq_attendance_records', JSON.stringify(records));
    } catch {}
    // Check if attendance already marked for today
    const exists = records.some(r => r.date === todayStr);
    setIsCheckedInToday(exists);
  }, [records, todayStr]);

  const handleCheckInToday = () => {
    const newRecord: AttendanceRecord = {
      id: `att-${Date.now()}`,
      userId: currentUser?.id || 'usr-student-1',
      userName: currentUser?.name || 'Hashim Zafar',
      courseId: 'course-quran-teacher',
      courseTitle: 'Online Quran Teacher Masterclass',
      date: todayStr,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
      status: 'present',
      sessionTopic: 'Live Interactive Session & Teacher Practice',
      instructorName: 'Mentor Abdul Basit Saleem',
      durationMinutes: 45,
      notes: 'Self check-in marked via Student Portal.'
    };

    setRecords([newRecord, ...records]);
    setIsCheckedInToday(true);
    setCheckInSuccessMsg('Attendance marked as PRESENT for today! JazakAllah Khair.');
    setTimeout(() => setCheckInSuccessMsg(null), 4000);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#7c3aed', '#db2777', '#10b981']
    });
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Student Name', 'Course Title', 'Date', 'Time', 'Status', 'Instructor', 'Duration (mins)', 'Notes'];
    const rows = records.map(r => [
      r.id,
      `"${r.userName}"`,
      `"${r.courseTitle}"`,
      r.date,
      r.time,
      r.status.toUpperCase(),
      `"${r.instructorName}"`,
      r.durationMinutes,
      `"${r.notes || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `TrueWayQuran_Attendance_${todayStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Metrics
  const totalClasses = records.length;
  const presentCount = records.filter(r => r.status === 'present').length;
  const lateCount = records.filter(r => r.status === 'late').length;
  const excusedCount = records.filter(r => r.status === 'excused').length;
  const absentCount = records.filter(r => r.status === 'absent').length;

  const attendancePercentage = totalClasses > 0
    ? Math.round(((presentCount + lateCount * 0.8 + excusedCount * 0.5) / totalClasses) * 100)
    : 100;

  const filteredRecords = selectedCourseFilter === 'all'
    ? records
    : records.filter(r => r.courseId === selectedCourseFilter);

  return (
    <div className="py-12 bg-gradient-to-b from-[#faf8ff] via-white to-purple-50/30 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-[#2e0854] via-[#3b0764] to-[#4a044e] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden border border-purple-700/50">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold text-pink-300">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <span>Class Attendance & Participation Portal</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Track Your Quran Class{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-pink-300 to-amber-200">
                  Attendance & Streaks
                </span>
              </h1>

              <p className="text-purple-200 text-sm sm:text-base leading-relaxed max-w-2xl">
                Maintain consistency in your Quran learning journey. Record daily class attendance, view teacher verifications, and download verified certificates of participation.
              </p>

              {/* Student Identification */}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-purple-200">
                <span>Student: <strong className="text-white">{currentUser?.name || 'Hashim Zafar'}</strong></span>
                <span>·</span>
                <span>Email: <strong className="text-white">{currentUser?.email || 'hashimzafar2k@gmail.com'}</strong></span>
                <span>·</span>
                <span>Role: <strong className="text-amber-300 uppercase">{currentUser?.role || 'Student'}</strong></span>
              </div>
            </div>

            {/* Quick Check-In Card on Right */}
            <div className="lg:col-span-4">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-2xl space-y-4 text-center">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-black text-white">Today&apos;s Class Check-In</h3>
                  <p className="text-xs text-purple-200">
                    {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>

                {checkInSuccessMsg && (
                  <div className="p-3 bg-emerald-500/20 border border-emerald-400 text-emerald-200 text-xs rounded-xl font-bold">
                    {checkInSuccessMsg}
                  </div>
                )}

                <button
                  onClick={handleCheckInToday}
                  disabled={isCheckedInToday}
                  className={`w-full py-3.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                    isCheckedInToday
                      ? 'bg-emerald-600/60 text-emerald-100 cursor-not-allowed'
                      : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-emerald-500/30 active:scale-[0.99]'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isCheckedInToday ? 'Attended Today (Verified)' : 'Mark Today\'s Attendance'}</span>
                </button>

                <p className="text-[11px] text-purple-300">
                  {isCheckedInToday ? 'Your attendance has been recorded for today.' : 'Click to log presence for your scheduled session.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Attendance Rate</span>
              <Award className="w-4 h-4 text-purple-600" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-purple-950">{attendancePercentage}%</span>
              <span className="text-xs font-bold text-emerald-600">Excellent</span>
            </div>
            <div className="w-full bg-purple-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-purple-700 to-pink-500 h-full rounded-full transition-all duration-500" 
                style={{ width: `${attendancePercentage}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Classes Attended</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-purple-950">{presentCount}</span>
              <span className="text-xs text-slate-500">/ {totalClasses} Sessions</span>
            </div>
            <p className="text-[11px] text-slate-500">
              {presentCount} Present · {lateCount} Late
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Attendance Streak</span>
              <Flame className="w-4 h-4 text-amber-500" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-amber-600">14</span>
              <span className="text-xs font-bold text-amber-600">Days Active</span>
            </div>
            <p className="text-[11px] text-slate-500">Consistent learner badge unlocked</p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Certificate Status</span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-black text-emerald-700">Eligible</span>
            </div>
            <p className="text-[11px] text-slate-500">Requires 85%+ attendance</p>
          </div>
        </div>

        {/* Filter Bar & Export */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-purple-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Filter className="w-4 h-4 text-purple-600" />
            <span className="text-xs font-bold text-purple-950">Filter by Course:</span>
            <select
              value={selectedCourseFilter}
              onChange={(e) => setSelectedCourseFilter(e.target.value)}
              className="bg-purple-50/70 border border-purple-200 rounded-xl px-3 py-1.5 text-xs text-purple-950 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Enrolled Courses</option>
              <option value="course-quran-teacher">Online Quran Teacher Masterclass</option>
              <option value="course-tajweed-rules">Practical Tajweed & Makharij</option>
              <option value="course-madani-qaida">Complete Madani Qaida Foundation</option>
            </select>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleExportCSV}
              className="px-4 py-2 bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-900 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV Attendance Sheet</span>
            </button>
          </div>
        </div>

        {/* Detailed Attendance Records Table */}
        <div className="bg-white rounded-3xl border border-purple-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-purple-100 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-purple-950">Class Attendance Log</h3>
              <p className="text-xs text-slate-500">Complete verified history of past class attendances and feedback</p>
            </div>
            <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full">
              Showing {filteredRecords.length} Records
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-purple-50/60 text-[11px] font-black uppercase text-purple-900 border-b border-purple-100">
                <tr>
                  <th className="py-3.5 px-6">Date & Time</th>
                  <th className="py-3.5 px-6">Course & Topic</th>
                  <th className="py-3.5 px-6">Instructor</th>
                  <th className="py-3.5 px-6 text-center">Status</th>
                  <th className="py-3.5 px-6">Teacher Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-50">
                {filteredRecords.map((r) => {
                  const statusColors = {
                    present: 'bg-emerald-100 text-emerald-800 border-emerald-300',
                    late: 'bg-amber-100 text-amber-800 border-amber-300',
                    excused: 'bg-blue-100 text-blue-800 border-blue-300',
                    absent: 'bg-rose-100 text-rose-800 border-rose-300'
                  };

                  return (
                    <tr key={r.id} className="hover:bg-purple-50/40 transition">
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="font-bold text-slate-900">{r.date}</div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-purple-600" />
                          <span>{r.time} ({r.durationMinutes} mins)</span>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <div className="font-bold text-purple-950">{r.courseTitle}</div>
                        <div className="text-slate-600 text-[11px] mt-0.5">{r.sessionTopic}</div>
                      </td>

                      <td className="py-4 px-6 whitespace-nowrap">
                        <span className="font-bold text-slate-800">{r.instructorName}</span>
                      </td>

                      <td className="py-4 px-6 text-center whitespace-nowrap">
                        <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase border ${statusColors[r.status]}`}>
                          {r.status}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-slate-600 text-[11px]">
                        {r.notes || 'Class completed successfully.'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
