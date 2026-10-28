import React, { useState } from 'react';
import { QaidaLesson, User, PronunciationAttempt, QaidaWord } from '../types';
import { StudentVoiceRecorder } from '../utils/speechEvaluator';
import { 
  ShieldCheck, 
  Users, 
  BookOpen, 
  Mic, 
  DollarSign, 
  Settings, 
  Plus, 
  Check, 
  Play, 
  Square, 
  Volume2, 
  Trash2, 
  Save, 
  Sparkles,
  Search,
  Upload
} from 'lucide-react';

interface AdminPanelProps {
  lessons: QaidaLesson[];
  onUpdateLessons: (updated: QaidaLesson[]) => void;
  students: User[];
  attempts: PronunciationAttempt[];
  onSaveTeacherVoice: (lessonId: string, wordId: string, audioUrl: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  lessons,
  onUpdateLessons,
  students,
  attempts,
  onSaveTeacherVoice
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'lessons' | 'students' | 'teacher_studio' | 'assessments'>('overview');
  
  // Teacher studio state
  const [selectedStudioLessonId, setSelectedStudioLessonId] = useState<string>(lessons[0]?.id || 'lesson-1');
  const [selectedStudioWordId, setSelectedStudioWordId] = useState<string>(lessons[0]?.words[0]?.id || 'w-1');
  const [isRecordingTeacher, setIsRecordingTeacher] = useState(false);
  const [teacherRecordedUrl, setTeacherRecordedUrl] = useState<string | null>(null);
  const [teacherRecorder] = useState<StudentVoiceRecorder>(new StudentVoiceRecorder());
  const [teacherAudioSaved, setTeacherAudioSaved] = useState(false);

  // Lesson threshold editor
  const [thresholdLessonId, setThresholdLessonId] = useState<string>(lessons[0]?.id || 'lesson-1');
  const [newThreshold, setNewThreshold] = useState<number>(lessons[0]?.passingScore || 75);

  const selectedLesson = lessons.find(l => l.id === selectedStudioLessonId) || lessons[0];
  const selectedWord = selectedLesson?.words.find(w => w.id === selectedStudioWordId) || selectedLesson?.words[0];

  const handleStartTeacherRecord = async () => {
    setTeacherAudioSaved(false);
    const ok = await teacherRecorder.start();
    if (ok) {
      setIsRecordingTeacher(true);
    }
  };

  const handleStopTeacherRecord = async () => {
    setIsRecordingTeacher(false);
    const url = await teacherRecorder.stop();
    if (url) {
      setTeacherRecordedUrl(url);
    }
  };

  const handleSaveTeacherRecitation = () => {
    if (!teacherRecordedUrl || !selectedWord) return;
    onSaveTeacherVoice(selectedStudioLessonId, selectedWord.id, teacherRecordedUrl);
    setTeacherAudioSaved(true);
    setTimeout(() => setTeacherAudioSaved(false), 3000);
  };

  const handleUpdateThreshold = (lessonId: string, score: number) => {
    const updated = lessons.map(l => {
      if (l.id === lessonId) {
        return { ...l, passingScore: score };
      }
      return l;
    });
    onUpdateLessons(updated);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Admin Header */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-red-600/10 border border-red-500/40 flex items-center justify-center text-red-500">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-white">TWG Administration Portal</h1>
              <span className="text-[10px] bg-red-600 text-white font-bold px-2 py-0.5 rounded uppercase">
                Director Access
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Academy oversight, student enrollment control, custom teacher audio recording studio, and scoring thresholds.
            </p>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1.5 bg-zinc-900 p-1 rounded-xl border border-zinc-800 flex-wrap">
          {[
            { id: 'overview', label: 'Overview', icon: DollarSign },
            { id: 'lessons', label: 'Lessons & Thresholds', icon: BookOpen },
            { id: 'teacher_studio', label: 'Teacher Audio Studio', icon: Mic },
            { id: 'students', label: 'Students', icon: Users },
            { id: 'assessments', label: 'Pronunciation Audits', icon: Sparkles }
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  active ? 'bg-red-600 text-white shadow' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Overview Dashboard */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 space-y-1">
              <span className="text-xs text-zinc-400 block font-medium">Total Registered Students</span>
              <span className="text-3xl font-black text-white">{students.length + 184}</span>
              <span className="text-[11px] text-emerald-400 font-semibold block">+12 this week from US & UK</span>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 space-y-1">
              <span className="text-xs text-zinc-400 block font-medium">Active Subscriptions</span>
              <span className="text-3xl font-black text-red-500">128</span>
              <span className="text-[11px] text-zinc-500 block">Monthly & Quarterly</span>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 space-y-1">
              <span className="text-xs text-zinc-400 block font-medium">Monthly Gross Volume</span>
              <span className="text-3xl font-black text-white">$6,480</span>
              <span className="text-[11px] text-emerald-400 font-semibold block">+24% vs last month</span>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 space-y-1">
              <span className="text-xs text-zinc-400 block font-medium">Average Pronunciation Score</span>
              <span className="text-3xl font-black text-white">84.2%</span>
              <span className="text-[11px] text-zinc-400 block">Across 1,420 audio evaluations</span>
            </div>
          </div>

          {/* Quick Notice */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-xs text-zinc-300 space-y-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-red-500" />
              <span>Future Audio Content Integration Notice</span>
            </h3>
            <p className="leading-relaxed">
              As requested in development requirements, you can use the <strong>Teacher Audio Studio</strong> tab to record your own recitations in your own voice right here. Once recorded, the custom audio is bound to that word and will immediately play when international students click the "Listen" button in the Madani Qaida!
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: Lessons & Passing Score Thresholds */}
      {activeTab === 'lessons' && (
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
            <div>
              <h2 className="text-base font-bold text-white">Madani Qaida Lessons & Passing Thresholds</h2>
              <p className="text-xs text-zinc-400">Configure minimum required pronunciation accuracy for each lesson.</p>
            </div>
          </div>

          <div className="divide-y divide-zinc-850">
            {lessons.map(lesson => (
              <div key={lesson.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-red-500">Lesson {lesson.lessonNumber}</span>
                    <span className="text-sm font-bold text-white">{lesson.title}</span>
                  </div>
                  <span className="font-arabic text-sm text-zinc-400">{lesson.arabicTitle}</span>
                  <p className="text-xs text-zinc-400">{lesson.words.length} vocabulary words</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-400">Passing Threshold:</span>
                    <select
                      value={lesson.passingScore}
                      onChange={(e) => handleUpdateThreshold(lesson.id, Number(e.target.value))}
                      className="bg-zinc-900 text-white text-xs border border-zinc-700 rounded-lg px-2.5 py-1.5 font-bold focus:outline-none focus:border-red-500"
                    >
                      <option value={60}>60% (Easy)</option>
                      <option value={70}>70% (Standard)</option>
                      <option value={75}>75% (Recommended)</option>
                      <option value={80}>80% (Strict)</option>
                      <option value={85}>85% (Advanced)</option>
                      <option value={90}>90% (Mastery)</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Teacher Audio Studio (Future Audio Content Integration) */}
      {activeTab === 'teacher_studio' && (
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="pb-4 border-b border-zinc-800">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-red-600/20 text-red-400 rounded-full text-xs font-bold mb-1">
              <Mic className="w-3.5 h-3.5" />
              <span>Teacher Audio Studio</span>
            </div>
            <h2 className="text-xl font-bold text-white">Record Custom Recitations for Lessons</h2>
            <p className="text-xs text-zinc-400 mt-1">
              Record your own voice to replace the synthesized audio. Students will listen to your authentic recitation and practice directly from your recordings!
            </p>
          </div>

          {/* Word Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-zinc-400 block mb-1">Select Qaida Lesson:</label>
              <select
                value={selectedStudioLessonId}
                onChange={(e) => {
                  setSelectedStudioLessonId(e.target.value);
                  const l = lessons.find(less => less.id === e.target.value);
                  if (l && l.words[0]) setSelectedStudioWordId(l.words[0].id);
                }}
                className="w-full bg-zinc-900 border border-zinc-700 text-xs text-white rounded-xl p-2.5 focus:outline-none focus:border-red-500"
              >
                {lessons.map(l => (
                  <option key={l.id} value={l.id}>
                    Lesson {l.lessonNumber}: {l.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-400 block mb-1">Select Word / Letter:</label>
              <select
                value={selectedStudioWordId}
                onChange={(e) => setSelectedStudioWordId(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 text-xs text-white rounded-xl p-2.5 focus:outline-none focus:border-red-500 font-arabic text-sm"
              >
                {selectedLesson?.words.map(w => (
                  <option key={w.id} value={w.id}>
                    {w.arabic} - {w.transliteration} ({w.makhraj})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Recording Canvas */}
          {selectedWord && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center space-y-4">
              <div className="font-arabic text-7xl font-bold text-white py-2">
                {selectedWord.arabic}
              </div>
              <div className="text-sm font-bold text-red-500">
                {selectedWord.transliteration} · <span className="text-zinc-400 font-normal">{selectedWord.makhraj}</span>
              </div>

              {selectedWord.teacherVoiceUrl && (
                <div className="text-xs text-emerald-400 font-semibold bg-emerald-950/40 border border-emerald-800/40 py-1.5 px-3 rounded-lg inline-block">
                  ✓ Custom Teacher Audio Already Active
                </div>
              )}

              {/* Record buttons */}
              <div className="flex items-center justify-center gap-4 pt-3">
                <button
                  onClick={isRecordingTeacher ? handleStopTeacherRecord : handleStartTeacherRecord}
                  className={`px-6 py-3 rounded-xl font-bold text-xs flex items-center gap-2 transition shadow-xl ${
                    isRecordingTeacher
                      ? 'bg-red-600 text-white animate-pulse glow-red'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700'
                  }`}
                >
                  {isRecordingTeacher ? (
                    <>
                      <Square className="w-4 h-4 fill-current" />
                      <span>Stop Teacher Recording</span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-4 h-4 text-red-500" />
                      <span>Record In My Voice</span>
                    </>
                  )}
                </button>

                {teacherRecordedUrl && (
                  <button
                    onClick={() => new Audio(teacherRecordedUrl).play()}
                    className="px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 rounded-xl text-xs font-bold flex items-center gap-2"
                  >
                    <Play className="w-4 h-4 text-emerald-400" />
                    <span>Preview Audio</span>
                  </button>
                )}

                {teacherRecordedUrl && (
                  <button
                    onClick={handleSaveTeacherRecitation}
                    className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save to Qaida Lesson</span>
                  </button>
                )}
              </div>

              {teacherAudioSaved && (
                <div className="text-xs text-emerald-400 font-bold flex items-center justify-center gap-1 mt-2">
                  <Check className="w-4 h-4" />
                  <span>Teacher recording successfully published! All students will now hear this audio.</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Registered Students List */}
      {activeTab === 'students' && (
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <h2 className="text-base font-bold text-white">Student Roster & Enrollments</h2>
            <span className="text-xs text-zinc-400">{students.length} Total Users</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-zinc-300">
              <thead className="bg-zinc-900 text-zinc-400 uppercase text-[10px]">
                <tr>
                  <th className="p-3">Student Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Enrolled Courses</th>
                  <th className="p-3">Qaida Progress</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-850">
                {students.map(std => (
                  <tr key={std.id} className="hover:bg-zinc-900/40">
                    <td className="p-3 font-bold text-white">{std.name}</td>
                    <td className="p-3 text-zinc-400">{std.email}</td>
                    <td className="p-3">{std.country}</td>
                    <td className="p-3 font-semibold text-red-400">{std.enrolledCourseIds.length} Courses</td>
                    <td className="p-3">{std.progress.masteredWordIds.length} words mastered</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 5: Pronunciation Audits */}
      {activeTab === 'assessments' && (
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <h2 className="text-base font-bold text-white">Live Student Voice Submissions</h2>
            <span className="text-xs text-zinc-400">{attempts.length} Submissions</span>
          </div>

          <div className="divide-y divide-zinc-850 space-y-3">
            {attempts.map(att => (
              <div key={att.id} className="pt-3 flex items-center justify-between gap-4 text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-arabic text-lg font-bold text-white">{att.arabic}</span>
                    <span className="text-zinc-400">({att.transliteration})</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      att.passed ? 'bg-emerald-950 text-emerald-400' : 'bg-red-950 text-red-400'
                    }`}>
                      Score: {att.score}%
                    </span>
                  </div>
                  <p className="text-zinc-400 text-[11px]">{att.makhrajFeedback}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-zinc-500">{att.timestamp}</span>
                  {att.audioUrl && (
                    <button
                      onClick={() => new Audio(att.audioUrl).play()}
                      className="p-1.5 bg-zinc-900 hover:bg-zinc-800 text-red-400 rounded border border-zinc-750"
                      title="Listen Student Audio"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
