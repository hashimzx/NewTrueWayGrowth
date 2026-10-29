import React, { useState, useEffect } from 'react';
import { User, PronunciationAttempt } from '../types';
import { COURSES_DATA } from '../data/coursesData';
import { INITIAL_QAIDA_LESSONS } from '../data/qaidaData';
import { 
  IslamicTask, 
  loadTodayTasks, 
  saveTodayTasks, 
  calculateTaskCompletion, 
  getTodayDateKey,
  generateDailyTasks
} from '../utils/dailyTasks';
import { 
  Award, 
  Flame, 
  Clock, 
  CheckCircle2, 
  BookOpen, 
  Mic, 
  Calendar, 
  Sparkles, 
  Globe, 
  UserCheck,
  CheckSquare,
  Square,
  RefreshCw,
  HeartHandshake,
  BookMarked,
  Plus,
  ArrowRight
} from 'lucide-react';

interface HifzProgressState {
  activeSurah: string;
  sabaqAyahRange: string;
  sabaqCompletedToday: boolean;
  sabqiTarget: string;
  sabqiCompletedToday: boolean;
  manzilJuz: string;
  manzilCompletedToday: boolean;
  memorizedSurahsCount: number;
  memorizedAyahsCount: number;
  lastUpdatedDate: string;
}

const POPULAR_HIFZ_SURAHS = [
  'Surah Al-Mulk (67) — 30 Ayahs',
  'Surah Yaseen (36) — 83 Ayahs',
  'Surah Ar-Rahman (55) — 78 Ayahs',
  'Surah Al-Waqi’ah (56) — 96 Ayahs',
  'Surah Al-Kahf (18) — 110 Ayahs',
  'Surah An-Naba (78) — 40 Ayahs',
  'Surah An-Nazi’at (79) — 46 Ayahs',
  'Surah Abasa (80) — 42 Ayahs',
  'Surah Al-A’la (87) — 19 Ayahs',
  'Surah Ad-Duha (93) — 11 Ayahs',
  'Surah Ash-Sharh (94) — 8 Ayahs',
  'Surah Al-Baqarah (2) — 286 Ayahs',
  'Surah Ali ‘Imran (3) — 200 Ayahs'
];

interface StudentDashboardProps {
  user: User;
  onNavigateToQaida: (lessonId?: string) => void;
  onOpenSchedule: () => void;
  attemptsHistory: PronunciationAttempt[];
  onNavigateToAttendance?: () => void;
  onNavigateToHifz?: () => void;
  onNavigateToQuran?: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  user,
  onNavigateToQaida,
  onOpenSchedule,
  onNavigateToAttendance,
  onNavigateToHifz,
  onNavigateToQuran
}) => {
  // Enrolled courses data
  const enrolledCourses = COURSES_DATA.filter(c => user.enrolledCourseIds.includes(c.id));

  // Total words across qaida
  const totalQaidaWords = INITIAL_QAIDA_LESSONS.reduce((acc, l) => acc + l.words.length, 0);
  const wordsMastered = user.progress.masteredWordIds.length;
  const overallProgressPercent = Math.min(100, Math.round((wordsMastered / totalQaidaWords) * 100));

  // Daily Islamic Tasks state
  const [dailyTasks, setDailyTasks] = useState<IslamicTask[]>(() => loadTodayTasks());
  const todayKey = getTodayDateKey();

  // Student Hifz (Quran Memorization) Tracker State
  const hifzStorageKey = `twq_student_hifz_${user.id}`;
  const [hifzState, setHifzState] = useState<HifzProgressState>(() => {
    try {
      const saved = localStorage.getItem(hifzStorageKey);
      if (saved) {
        const parsed = JSON.parse(saved) as HifzProgressState;
        // Reset daily checkboxes if date changed
        if (parsed.lastUpdatedDate !== todayKey) {
          return {
            ...parsed,
            sabaqCompletedToday: false,
            sabqiCompletedToday: false,
            manzilCompletedToday: false,
            lastUpdatedDate: todayKey
          };
        }
        return parsed;
      }
    } catch {}
    return {
      activeSurah: 'Surah Al-Mulk (67) — 30 Ayahs',
      sabaqAyahRange: 'Ayah 1 to 10',
      sabaqCompletedToday: true,
      sabqiTarget: 'Juz 30 (Surah An-Naba to An-Nas)',
      sabqiCompletedToday: true,
      manzilJuz: 'Juz 30 (Amma Para)',
      manzilCompletedToday: false,
      memorizedSurahsCount: 16,
      memorizedAyahsCount: 245,
      lastUpdatedDate: todayKey
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem(hifzStorageKey, JSON.stringify(hifzState));
    } catch {}
  }, [hifzState, hifzStorageKey]);

  useEffect(() => {
    saveTodayTasks(dailyTasks, todayKey);
  }, [dailyTasks, todayKey]);

  const toggleTask = (taskId: string) => {
    setDailyTasks(prev => 
      prev.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleRefreshTasks = () => {
    const fresh = generateDailyTasks(`${todayKey}-${Date.now()}`);
    setDailyTasks(fresh);
  };

  const handleLogNewMemorizedAyahs = () => {
    setHifzState(prev => ({
      ...prev,
      memorizedAyahsCount: prev.memorizedAyahsCount + 5,
      sabaqCompletedToday: true
    }));
  };

  const { completedCount, total: totalTasks, percentage: taskPercentage } = calculateTaskCompletion(dailyTasks);
  const hifzPillarsDone = [hifzState.sabaqCompletedToday, hifzState.sabqiCompletedToday, hifzState.manzilCompletedToday].filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Student Greeting & Profile Banner in Brand Decent Colors */}
      <div className="bg-gradient-to-r from-[#6B1B7E] via-[#5B2A9A] to-[#E0107F] rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 border-2 border-white/40 flex items-center justify-center text-white font-black text-2xl shadow-lg backdrop-blur-md">
              {user.name.charAt(0)}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                  As-salamu alaykum, {user.name}
                </h1>
                <span className="text-[10px] bg-white/20 text-pink-100 border border-white/30 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  {user.role}
                </span>
              </div>
              <p className="text-xs text-purple-100 flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-pink-200" />
                <span>{user.country} · Timezone: {user.timezone}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {onNavigateToHifz && (
              <button
                onClick={onNavigateToHifz}
                className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-purple-950 rounded-xl text-xs font-black transition flex items-center gap-2 shadow-md cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#6B1B7E]" />
                <span>Hifz Program & Classes</span>
              </button>
            )}

            {onNavigateToAttendance && (
              <button
                onClick={onNavigateToAttendance}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-md cursor-pointer"
              >
                <UserCheck className="w-4 h-4 text-emerald-100" />
                <span>Daily Attendance (96%)</span>
              </button>
            )}

            <button
              onClick={() => onNavigateToQaida()}
              className="px-4 py-2.5 bg-white text-[#6B1B7E] hover:bg-purple-50 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-md cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-[#E0107F]" />
              <span>Resume Qaida</span>
            </button>

            <button
              onClick={onOpenSchedule}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-pink-200" />
              <span>Book 1-on-1 Class</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row in Decent Light Theme */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="bg-white border border-[#6B1B7E]/15 rounded-2xl p-5 shadow-xs space-y-1 hover:border-[#6B1B7E]/30 transition">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span>Hifz Memorized</span>
            <BookMarked className="w-4 h-4 text-[#E0107F]" />
          </div>
          <span className="text-3xl font-black text-[#6B1B7E]">{hifzState.memorizedSurahsCount}</span>
          <span className="text-[11px] text-slate-500 block">{hifzState.memorizedAyahsCount} Ayahs Retained</span>
        </div>

        <div className="bg-white border border-[#6B1B7E]/15 rounded-2xl p-5 shadow-xs space-y-1 hover:border-[#6B1B7E]/30 transition">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span>Qaida Mastery</span>
            <Award className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-3xl font-black text-[#6B1B7E]">{overallProgressPercent}%</span>
          <span className="text-[11px] text-slate-500 block">{wordsMastered} / {totalQaidaWords} words cleared</span>
        </div>

        <div className="bg-white border border-[#6B1B7E]/15 rounded-2xl p-5 shadow-xs space-y-1 hover:border-[#6B1B7E]/30 transition">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span>Pronunciation Avg.</span>
            <Mic className="w-4 h-4 text-[#E0107F]" />
          </div>
          <span className="text-3xl font-black text-[#6B1B7E]">
            {user.progress.averagePronunciationScore || 88}%
          </span>
          <span className="text-[11px] text-slate-500 block">AI Verified Voice Accuracy</span>
        </div>

        <div className="bg-white border border-[#6B1B7E]/15 rounded-2xl p-5 shadow-xs space-y-1 hover:border-[#6B1B7E]/30 transition">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span>Daily Streak</span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <span className="text-3xl font-black text-[#6B1B7E]">
            {user.progress.streakDays} Days
          </span>
          <span className="text-[11px] text-slate-500 block">Consistency is blessed</span>
        </div>

        <div className="col-span-2 sm:col-span-1 bg-white border border-[#6B1B7E]/15 rounded-2xl p-5 shadow-xs space-y-1 hover:border-[#6B1B7E]/30 transition">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span>Practice Time</span>
            <Clock className="w-4 h-4 text-purple-600" />
          </div>
          <span className="text-3xl font-black text-[#6B1B7E]">
            {user.progress.practiceMinutes}m
          </span>
          <span className="text-[11px] text-slate-500 block">Minutes in recitation</span>
        </div>
      </div>

      {/* ======================================================================= */}
      {/* STUDENT PORTAL HIFZ (QURAN MEMORIZATION) TRACKER & PRACTICE HUB         */}
      {/* ======================================================================= */}
      <div className="bg-gradient-to-br from-purple-50/90 via-white to-pink-50/70 border-2 border-[#6B1B7E]/25 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#6B1B7E]/15 pb-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6B1B7E] text-white text-[10px] font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Student Portal · Hifz-ul-Quran Tracker</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              My Quran Memorization (Hifz) — Daily Sabaq, Sabqi & Manzil
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Track your daily 3-pillar Hifz routine, log newly memorized verses, and review with your certified Hafiz mentor.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleLogNewMemorizedAyahs}
              className="px-4 py-2.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-[#6B1B7E] text-xs font-black flex items-center gap-1.5 transition cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#E0107F]" />
              <span>+5 Ayahs Memorized</span>
            </button>

            {onNavigateToQuran && (
              <button
                onClick={onNavigateToQuran}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-purple-50 text-[#6B1B7E] border border-[#6B1B7E]/20 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-[#E0107F]" />
                <span>Open Full Mushaf</span>
              </button>
            )}

            {onNavigateToHifz && (
              <button
                onClick={onNavigateToHifz}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#6B1B7E] to-[#E0107F] text-white text-xs font-black flex items-center gap-1.5 shadow-sm hover:opacity-95 transition cursor-pointer"
              >
                <span>Full Hifz Curriculum</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Active Surah & 3-Pillar Daily Check-Off Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          
          {/* Pillar 1: SABAQ (New Lesson) */}
          <div className={`p-5 rounded-2xl border transition space-y-4 ${
            hifzState.sabaqCompletedToday
              ? 'bg-emerald-50/70 border-emerald-300 shadow-xs'
              : 'bg-white border-purple-200'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#6B1B7E] text-white">
                1. Sabaq (New Memorization)
              </span>
              <button
                onClick={() => setHifzState(prev => ({ ...prev, sabaqCompletedToday: !prev.sabaqCompletedToday }))}
                className={`text-xs font-black px-2.5 py-1 rounded-lg flex items-center gap-1 cursor-pointer transition ${
                  hifzState.sabaqCompletedToday
                    ? 'bg-emerald-600 text-white'
                    : 'bg-purple-100 text-[#6B1B7E] hover:bg-purple-200'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{hifzState.sabaqCompletedToday ? 'Completed' : 'Mark Done'}</span>
              </button>
            </div>

            <div className="space-y-2.5">
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                  Active Hifz Surah
                </label>
                <select
                  value={hifzState.activeSurah}
                  onChange={(e) => setHifzState(prev => ({ ...prev, activeSurah: e.target.value }))}
                  className="w-full rounded-xl border border-purple-200 bg-white px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#6B1B7E]"
                >
                  {POPULAR_HIFZ_SURAHS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                  Today's Target Ayah Range
                </label>
                <input
                  type="text"
                  value={hifzState.sabaqAyahRange}
                  onChange={(e) => setHifzState(prev => ({ ...prev, sabaqAyahRange: e.target.value }))}
                  className="w-full rounded-xl border border-purple-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#6B1B7E]"
                  placeholder="e.g. Ayah 1 to 10"
                />
              </div>
            </div>
          </div>

          {/* Pillar 2: SABQI (Recent Revision) */}
          <div className={`p-5 rounded-2xl border transition space-y-4 ${
            hifzState.sabqiCompletedToday
              ? 'bg-emerald-50/70 border-emerald-300 shadow-xs'
              : 'bg-white border-purple-200'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#5B2A9A] text-white">
                2. Sabqi (Recent 5–7 Pages)
              </span>
              <button
                onClick={() => setHifzState(prev => ({ ...prev, sabqiCompletedToday: !prev.sabqiCompletedToday }))}
                className={`text-xs font-black px-2.5 py-1 rounded-lg flex items-center gap-1 cursor-pointer transition ${
                  hifzState.sabqiCompletedToday
                    ? 'bg-emerald-600 text-white'
                    : 'bg-purple-100 text-[#6B1B7E] hover:bg-purple-200'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{hifzState.sabqiCompletedToday ? 'Completed' : 'Mark Done'}</span>
              </button>
            </div>

            <div className="space-y-2.5">
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                  Recent Portion for Fluency Review
                </label>
                <input
                  type="text"
                  value={hifzState.sabqiTarget}
                  onChange={(e) => setHifzState(prev => ({ ...prev, sabqiTarget: e.target.value }))}
                  className="w-full rounded-xl border border-purple-200 bg-white px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#6B1B7E]"
                />
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Recite your recently memorized verses from memory before starting new Sabaq so retention stays 100% solid.
              </p>
            </div>
          </div>

          {/* Pillar 3: MANZIL (Old Juz Revision) */}
          <div className={`p-5 rounded-2xl border transition space-y-4 ${
            hifzState.manzilCompletedToday
              ? 'bg-emerald-50/70 border-emerald-300 shadow-xs'
              : 'bg-white border-purple-200'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#E0107F] text-white">
                3. Manzil (Old Juz Cycle)
              </span>
              <button
                onClick={() => setHifzState(prev => ({ ...prev, manzilCompletedToday: !prev.manzilCompletedToday }))}
                className={`text-xs font-black px-2.5 py-1 rounded-lg flex items-center gap-1 cursor-pointer transition ${
                  hifzState.manzilCompletedToday
                    ? 'bg-emerald-600 text-white'
                    : 'bg-purple-100 text-[#6B1B7E] hover:bg-purple-200'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{hifzState.manzilCompletedToday ? 'Completed' : 'Mark Done'}</span>
              </button>
            </div>

            <div className="space-y-2.5">
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                  Assigned Daily Manzil Juz
                </label>
                <select
                  value={hifzState.manzilJuz}
                  onChange={(e) => setHifzState(prev => ({ ...prev, manzilJuz: e.target.value }))}
                  className="w-full rounded-xl border border-purple-200 bg-white px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#6B1B7E]"
                >
                  <option value="Juz 30 (Amma Para)">Juz 30 (Amma Para)</option>
                  <option value="Juz 29 (Tabarakalladhi)">Juz 29 (Tabarakalladhi)</option>
                  <option value="Juz 28 (Qad Sami' Allah)">Juz 28 (Qad Sami' Allah)</option>
                  <option value="Juz 1 (Alif Lam Meem)">Juz 1 (Alif Lam Meem)</option>
                  <option value="Juz 2 (Sayaqool)">Juz 2 (Sayaqool)</option>
                  <option value="Selected Surahs Cycle">Selected Surahs Cycle</option>
                </select>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Daily rotational revision of older memorized Juz ensures lifelong preservation without forgetting.
              </p>
            </div>
          </div>

        </div>

        {/* Hifz Daily Completion Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-purple-100 text-xs">
          <div className="flex items-center gap-2 font-bold text-[#6B1B7E]">
            <span>Today's 3-Pillar Hifz Status:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-[#6B1B7E] font-black">
              {hifzPillarsDone} / 3 Pillars Completed
            </span>
          </div>
          <span className="text-slate-500 font-medium">
            Total Memorized: <strong className="text-slate-900">{hifzState.memorizedSurahsCount} Surahs ({hifzState.memorizedAyahsCount} Ayahs)</strong>
          </span>
        </div>
      </div>

      {/* Daily Islamic Tasks Widget */}
      <div className="bg-white border-2 border-[#6B1B7E]/20 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#6B1B7E]/10 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#6B1B7E]/10 text-[#6B1B7E]">
                <HeartHandshake className="w-5 h-5 text-[#E0107F]" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#6B1B7E]">
                Daily Islamic Tasks & Good Deeds
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600">
              Personal spiritual accountability for today ({todayKey}). Check off each Sunnah action as you complete it.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRefreshTasks}
              className="px-3 py-1.5 rounded-xl border border-[#6B1B7E]/20 hover:border-[#6B1B7E]/40 text-[#6B1B7E] text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
              title="Get a new set of random daily tasks"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#E0107F]" />
              <span>Shuffle Tasks</span>
            </button>

            <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-purple-50 text-[#6B1B7E] border border-purple-200">
              {completedCount} / {totalTasks} Completed ({taskPercentage}%)
            </span>
          </div>
        </div>

        {/* Completion Progress Bar */}
        <div className="space-y-1.5">
          <div className="w-full h-3 bg-purple-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#6B1B7E] via-[#5B2A9A] to-[#E0107F] transition-all duration-500 rounded-full"
              style={{ width: `${taskPercentage}%` }}
            />
          </div>
          {taskPercentage === 100 && (
            <p className="text-xs text-emerald-700 font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>MashaAllah! You have completed all daily Islamic tasks for today. May Allah accept your devotion!</span>
            </p>
          )}
        </div>

        {/* Tasks List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {dailyTasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                task.completed
                  ? 'bg-purple-50/70 border-[#6B1B7E]/30 shadow-2xs'
                  : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-[#6B1B7E]/30'
              }`}
            >
              <button
                type="button"
                className="mt-0.5 text-lg shrink-0 cursor-pointer"
                aria-label={`Mark ${task.title} as ${task.completed ? 'incomplete' : 'complete'}`}
              >
                {task.completed ? (
                  <CheckSquare className="w-5 h-5 text-[#6B1B7E]" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400 hover:text-[#6B1B7E]" />
                )}
              </button>

              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className={`text-xs sm:text-sm font-bold ${task.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                    {task.title}
                  </p>
                  {task.arabic && (
                    <span className="text-xs font-serif text-[#6B1B7E] font-bold shrink-0" dir="rtl">
                      {task.arabic}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  {task.rewardNote}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enrolled Courses & Quick Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Enrolled Courses */}
        <div className="lg:col-span-2 bg-white border border-[#6B1B7E]/15 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-[#6B1B7E]">Your Active Curriculum</h3>
            <span className="text-xs text-slate-500">{enrolledCourses.length + 1} Courses Active</span>
          </div>

          <div className="space-y-3">
            {/* Hifz Program Active Card in Student Portal */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border border-[#E0107F]/30 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-black text-[#6B1B7E]">Quran Memorization (Hifz) Program</h4>
                  <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-[#E0107F] text-white">
                    Sabaq · Sabqi · Manzil
                  </span>
                </div>
                <p className="text-xs text-slate-600">Active Surah: {hifzState.activeSurah} ({hifzState.sabaqAyahRange})</p>
              </div>
              {onNavigateToHifz && (
                <button
                  onClick={onNavigateToHifz}
                  className="px-3.5 py-1.5 bg-gradient-to-r from-[#6B1B7E] to-[#E0107F] hover:opacity-95 text-white text-xs font-bold rounded-xl transition shadow-xs cursor-pointer shrink-0"
                >
                  Open Hifz Class
                </button>
              )}
            </div>

            {enrolledCourses.map((c) => (
              <div key={c.id} className="p-4 rounded-2xl bg-purple-50/40 border border-purple-100 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900">{c.title}</h4>
                  <p className="text-xs text-slate-500">{c.level} · {c.duration}</p>
                </div>
                <button
                  onClick={() => onNavigateToQaida()}
                  className="px-3.5 py-1.5 bg-[#6B1B7E] hover:bg-[#5B2A9A] text-white text-xs font-bold rounded-xl transition shadow-xs cursor-pointer shrink-0"
                >
                  Enter Class
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Academy Help & Schedule */}
        <div className="bg-gradient-to-br from-purple-50 via-white to-pink-50 border border-[#6B1B7E]/20 rounded-3xl p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6B1B7E]/10 text-[#6B1B7E] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#E0107F]" />
              <span>Mentorship Access</span>
            </div>
            <h4 className="text-base font-black text-slate-900">Need Help with Hifz or Pronunciation?</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Book a live 1-on-1 Sabaq & Tajweed verification session with your dedicated Hafiz teacher.
            </p>
          </div>

          <button
            onClick={onOpenSchedule}
            className="w-full py-2.5 bg-gradient-to-r from-[#6B1B7E] to-[#E0107F] text-white text-xs font-black rounded-xl shadow-md transition cursor-pointer"
          >
            Schedule Free 1-on-1 Review
          </button>
        </div>

      </div>

    </div>
  );
};
