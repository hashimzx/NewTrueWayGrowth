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
  HeartHandshake
} from 'lucide-react';

interface StudentDashboardProps {
  user: User;
  onNavigateToQaida: (lessonId?: string) => void;
  onOpenSchedule: () => void;
  attemptsHistory: PronunciationAttempt[];
  onNavigateToAttendance?: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  user,
  onNavigateToQaida,
  onOpenSchedule,
  attemptsHistory,
  onNavigateToAttendance
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

  const { completedCount, total: totalTasks, percentage: taskPercentage } = calculateTaskCompletion(dailyTasks);

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

          <div className="flex items-center gap-3 flex-wrap">
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
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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

        <div className="bg-white border border-[#6B1B7E]/15 rounded-2xl p-5 shadow-xs space-y-1 hover:border-[#6B1B7E]/30 transition">
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

      {/* Daily Islamic Tasks Widget (Custom Requested) */}
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
            <span className="text-xs text-slate-500">{enrolledCourses.length} Courses Enrolled</span>
          </div>

          <div className="space-y-3">
            {enrolledCourses.map((c) => (
              <div key={c.id} className="p-4 rounded-2xl bg-purple-50/40 border border-purple-100 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900">{c.title}</h4>
                  <p className="text-xs text-slate-500">{c.level} · {c.duration}</p>
                </div>
                <button
                  onClick={() => onNavigateToQaida()}
                  className="px-3.5 py-1.5 bg-[#6B1B7E] hover:bg-[#5B2A9A] text-white text-xs font-bold rounded-xl transition shadow-xs cursor-pointer"
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
            <h4 className="text-base font-black text-slate-900">Need Help with Pronunciation?</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Book a live 1-on-1 recitation verification with your dedicated teacher.
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
