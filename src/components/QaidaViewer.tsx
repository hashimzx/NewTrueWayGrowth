import React, { useState, useRef } from 'react';
import { QaidaLesson, QaidaWord, PronunciationAttempt, User } from '../types';
import { soundEngine } from '../utils/audioSynth';
import { StudentVoiceRecorder } from '../utils/speechEvaluator';
import { VoicePracticeModal } from './VoicePracticeModal';
import { 
  BookOpen, 
  Mic, 
  Volume2, 
  CheckCircle, 
  Search, 
  Sparkles, 
  Bookmark, 
  BookmarkCheck,
  CheckCircle2,
  ShieldAlert,
  ArrowRight,
  Radio,
  Play,
  Square,
  Save,
  X,
  PlusCircle
} from 'lucide-react';

interface QaidaViewerProps {
  lessons: QaidaLesson[];
  currentUser: User | null;
  onRecordSuccess: (attempt: PronunciationAttempt) => void;
  onToggleBookmark: (wordId: string) => void;
  onSaveTeacherVoice?: (lessonId: string, wordId: string, audioUrl: string) => void;
}

export const QaidaViewer: React.FC<QaidaViewerProps> = ({
  lessons,
  currentUser,
  onRecordSuccess,
  onToggleBookmark,
  onSaveTeacherVoice
}) => {
  const [selectedLessonId, setSelectedLessonId] = useState<string>(lessons[0]?.id || 'lesson-1');
  const [activeWordForVoice, setActiveWordForVoice] = useState<QaidaWord | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [playingWordId, setPlayingWordId] = useState<string | null>(null);

  // Teacher Voice Studio for Qaida letters/words
  const [recordingWordForTeacher, setRecordingWordForTeacher] = useState<QaidaWord | null>(null);
  const [isTeacherRecording, setIsTeacherRecording] = useState(false);
  const [teacherRecordedUrl, setTeacherRecordedUrl] = useState<string | null>(null);
  const teacherRecorderRef = useRef<StudentVoiceRecorder>(new StudentVoiceRecorder());

  const currentLesson = lessons.find(l => l.id === selectedLessonId) || lessons[0];

  const isWordMastered = (wordId: string): boolean => {
    return currentUser?.progress.masteredWordIds.includes(wordId) || false;
  };

  const isWordBookmarked = (wordId: string): boolean => {
    return currentUser?.bookmarks.includes(wordId) || false;
  };

  const handlePlayWord = async (e: React.MouseEvent, word: QaidaWord, rate: number = 0.85) => {
    e.stopPropagation();
    setPlayingWordId(word.id);
    if (word.teacherVoiceUrl) {
      const audio = new Audio(word.teacherVoiceUrl);
      audio.playbackRate = rate;
      audio.onended = () => setPlayingWordId(null);
      audio.onerror = async () => {
        await soundEngine.speakQaidaWord(word.arabic, rate);
        setPlayingWordId(null);
      };
      audio.play().catch(async () => {
        await soundEngine.speakQaidaWord(word.arabic, rate);
        setPlayingWordId(null);
      });
    } else {
      await soundEngine.speakQaidaWord(word.arabic, rate);
      setPlayingWordId(null);
    }
  };

  const handleStartTeacherRecording = async (word: QaidaWord) => {
    setRecordingWordForTeacher(word);
    setTeacherRecordedUrl(null);
    const ok = await teacherRecorderRef.current.start();
    if (ok) {
      setIsTeacherRecording(true);
      soundEngine.playCueSound('recording_start');
    }
  };

  const handleStopTeacherRecording = async () => {
    setIsTeacherRecording(false);
    soundEngine.playCueSound('recording_stop');
    const url = await teacherRecorderRef.current.stop();
    if (url) {
      setTeacherRecordedUrl(url);
    }
  };

  const handleSaveTeacherVoiceForWord = () => {
    if (!recordingWordForTeacher || !teacherRecordedUrl) return;
    if (onSaveTeacherVoice) {
      onSaveTeacherVoice(selectedLessonId, recordingWordForTeacher.id, teacherRecordedUrl);
    }
    soundEngine.playCueSound('success');
    setRecordingWordForTeacher(null);
    setTeacherRecordedUrl(null);
  };

  const filteredWords = currentLesson.words.filter(word => {
    const matchesSearch = 
      word.arabic.includes(searchQuery) ||
      word.transliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (word.englishMeaning && word.englishMeaning.toLowerCase().includes(searchQuery.toLowerCase())) ||
      word.makhraj.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLevel = levelFilter === 'all' || word.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  const masteredCountInLesson = currentLesson.words.filter(w => isWordMastered(w.id)).length;
  const lessonProgressPercent = Math.round((masteredCountInLesson / currentLesson.words.length) * 100);

  const handleNextWordInModal = () => {
    if (!activeWordForVoice) return;
    const currentIndex = currentLesson.words.findIndex(w => w.id === activeWordForVoice.id);
    if (currentIndex >= 0 && currentIndex < currentLesson.words.length - 1) {
      setActiveWordForVoice(currentLesson.words[currentIndex + 1]);
    }
  };

  const hasNextWord = Boolean(
    activeWordForVoice &&
    currentLesson.words.findIndex(w => w.id === activeWordForVoice.id) < currentLesson.words.length - 1
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner / Course Header */}
      <div className="bg-gradient-to-r from-[#2e0854] via-[#3b0764] to-[#4a044e] text-white border border-purple-700/50 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-semibold text-pink-200">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>Certified Standard · Noorani & Madani Qaida System</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Interactive Madani Qaida with AI Voice Assessment
            </h1>
            <p className="text-xs sm:text-sm text-purple-200 max-w-2xl leading-relaxed">
              Step-by-step authentic Quran foundation. Click any Arabic letter or word to listen to pure pronunciation, then use the microphone to evaluate your Makhraj against the required accuracy threshold.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl shrink-0">
            <div className="text-center px-3 border-r border-white/10">
              <span className="block text-2xl font-black text-white">{lessons.length}</span>
              <span className="text-[11px] text-purple-200 font-medium uppercase">Lessons</span>
            </div>
            <div className="text-center px-3 border-r border-white/10">
              <span className="block text-2xl font-black text-pink-300">
                {lessons.reduce((acc, l) => acc + l.words.length, 0)}
              </span>
              <span className="text-[11px] text-purple-200 font-medium uppercase">Words</span>
            </div>
            <div className="text-center px-3">
              <span className="block text-2xl font-black text-emerald-400">
                {currentUser?.progress.masteredWordIds.length || 0}
              </span>
              <span className="text-[11px] text-purple-200 font-medium uppercase">Mastered</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar Lessons Selector + Qaida Board */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Left Sidebar: Lesson Selection */}
        <div className="lg:col-span-1 bg-white border border-purple-100 rounded-3xl p-4 space-y-3 sticky top-28 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-purple-100 px-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-purple-950 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-600" />
              <span>Qaida Curriculum</span>
            </h2>
            <span className="text-[10px] text-purple-800 font-bold bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
              {lessons.length} Lessons
            </span>
          </div>

          <div className="space-y-1.5 max-h-[580px] overflow-y-auto pr-1">
            {lessons.map((lesson) => {
              const isSelected = lesson.id === selectedLessonId;
              const masteredInThis = lesson.words.filter(w => isWordMastered(w.id)).length;
              const isComplete = masteredInThis === lesson.words.length && lesson.words.length > 0;

              return (
                <button
                  key={lesson.id}
                  onClick={() => setSelectedLessonId(lesson.id)}
                  className={`w-full text-left p-3 rounded-2xl transition flex flex-col gap-1 border ${
                    isSelected
                      ? 'bg-purple-600 border-purple-600 shadow-md text-white'
                      : 'bg-purple-50/40 border-purple-100 hover:bg-purple-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${isSelected ? 'text-amber-300' : 'text-purple-700'}`}>
                      Lesson {lesson.lessonNumber}
                    </span>
                    {isComplete ? (
                      <span className={`text-xs flex items-center gap-1 font-semibold ${isSelected ? 'text-emerald-200' : 'text-emerald-600'}`}>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Done</span>
                      </span>
                    ) : (
                      <span className={`text-[10px] font-medium ${isSelected ? 'text-purple-200' : 'text-slate-400'}`}>
                        {masteredInThis}/{lesson.words.length}
                      </span>
                    )}
                  </div>

                  <span className={`text-sm font-bold truncate ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                    {lesson.title}
                  </span>

                  <span className={`font-arabic text-sm text-right dir-rtl ${isSelected ? 'text-purple-100' : 'text-purple-900'}`}>
                    {lesson.arabicTitle}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Main Content: Lesson Board */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Active Lesson Header & Rules Card */}
          <div className="bg-white border border-purple-100 rounded-3xl p-6 space-y-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-purple-600 uppercase tracking-widest">
                    Lesson {currentLesson.lessonNumber}
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs font-semibold text-slate-600">
                    Passing Accuracy Threshold: <strong className="text-purple-900 font-extrabold">{currentLesson.passingScore}%</strong>
                  </span>
                </div>
                <h2 className="text-2xl font-black text-purple-950 mt-1">
                  {currentLesson.title}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {currentLesson.description}
                </p>
              </div>

              <div className="text-right font-arabic text-3xl font-bold text-purple-900">
                {currentLesson.arabicTitle}
              </div>
            </div>

            {/* Lesson Rules Summary Points */}
            <div className="bg-purple-50/70 border border-purple-200/80 rounded-2xl p-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-purple-950 mb-2 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-purple-600" />
                <span>Tajweed Articulation Points & Rules</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                {currentLesson.rulesSummary.map((rule, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold leading-none mt-0.5">•</span>
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Search and Level Filters */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search Arabic, transliteration or Makhraj..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-purple-50/50 border border-purple-200 text-xs text-slate-900 pl-9 pr-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-slate-400"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {(['all', 'beginner', 'intermediate', 'advanced'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setLevelFilter(lvl)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition ${
                      levelFilter === lvl
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'bg-purple-50 text-purple-900 hover:bg-purple-100 border border-purple-200'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Authentic Madani Color-Coding System Guide */}
          <div className="bg-purple-50/70 border border-[#6B1B7E]/20 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-bold text-[#6B1B7E] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#E0107F]" />
              <span>Madani Qaida Color Guide:</span>
            </span>
            <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold">
              <span className="flex items-center gap-1 text-slate-900">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-900" />
                <span>Black: Normal Letters</span>
              </span>
              <span className="flex items-center gap-1 text-red-600">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
                <span>Red: Madd & Prolongation</span>
              </span>
              <span className="flex items-center gap-1 text-blue-600">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                <span>Blue: Harakat & Qalqalah</span>
              </span>
              <span className="flex items-center gap-1 text-emerald-700">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-700" />
                <span>Green: Ghunnah & Ikhfa</span>
              </span>
            </div>
          </div>

          {/* Interactive Word Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredWords.map((word, index) => {
              const mastered = isWordMastered(word.id);
              const bookmarked = isWordBookmarked(word.id);
              const isPlaying = playingWordId === word.id;

              const wordColorClass = word.colorCategory === 'red'
                ? 'text-red-600'
                : word.colorCategory === 'blue'
                ? 'text-blue-600'
                : word.colorCategory === 'green'
                ? 'text-emerald-700'
                : 'text-slate-900';

              return (
                <div
                  key={word.id}
                  onClick={() => setActiveWordForVoice(word)}
                  className={`group relative bg-white border rounded-3xl p-5 text-center flex flex-col justify-between transition-all cursor-pointer hover:scale-[1.02] shadow-sm hover:shadow-xl ${
                    mastered
                      ? 'border-emerald-300 ring-2 ring-emerald-100'
                      : 'border-purple-100 hover:border-purple-400'
                  }`}
                >
                  {/* Top indicators */}
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-[10px] font-bold text-slate-400">
                      #{index + 1}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {mastered && (
                        <span className="p-0.5 text-emerald-600" title="Pronunciation Mastered">
                          <CheckCircle2 className="w-4 h-4 fill-emerald-100" />
                        </span>
                      )}

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleBookmark(word.id);
                        }}
                        className="text-slate-300 hover:text-purple-600 transition p-0.5"
                        title={bookmarked ? 'Remove Bookmark' : 'Bookmark for Review'}
                      >
                        {bookmarked ? (
                          <BookmarkCheck className="w-4 h-4 text-purple-600 fill-current" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Large Arabic Calligraphy with Madani Colors */}
                  <div className="my-2">
                    <span className={`font-arabic text-5xl sm:text-6xl font-bold tracking-normal transition-colors drop-shadow-xs ${wordColorClass}`}>
                      {word.arabic}
                    </span>
                  </div>

                  {/* Transliteration */}
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-slate-800">
                      {word.transliteration}
                    </p>
                    {word.englishMeaning && (
                      <p className="text-[10px] text-slate-500 truncate">
                        {word.englishMeaning}
                      </p>
                    )}
                  </div>

                  {/* Articulation / Makhraj Brief Tag */}
                  <div className="mt-3 pt-3 border-t border-purple-50 text-[10px] text-slate-500 leading-tight">
                    <span className="truncate block" title={word.makhraj}>
                      {word.makhraj}
                    </span>
                  </div>

                  {/* Actions Bar: Audio Listen + Teacher Record + Mic Assessment */}
                  <div className="mt-3 pt-2 flex items-center justify-center gap-1.5">
                    <button
                      onClick={(e) => handlePlayWord(e, word, 0.85)}
                      className={`p-2 rounded-xl transition ${
                        isPlaying
                          ? 'bg-purple-600 text-white animate-pulse'
                          : 'bg-purple-50 text-purple-900 hover:bg-purple-100'
                      }`}
                      title={word.teacherVoiceUrl ? "Listen Teacher Voice" : "Listen Authentic Qaida Voice"}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartTeacherRecording(word);
                      }}
                      className="p-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 transition"
                      title="Record Teacher Voice for this letter"
                    >
                      <Radio className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveWordForVoice(word);
                      }}
                      className="flex-1 py-1.5 px-2 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 transition shadow-xs"
                    >
                      <Mic className="w-3.5 h-3.5" />
                      <span>Assess</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredWords.length === 0 && (
            <div className="text-center py-12 bg-white border border-purple-100 rounded-3xl p-8">
              <p className="text-sm text-slate-500">No words match your search query or filter.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setLevelFilter('all');
                }}
                className="mt-3 text-xs font-bold text-purple-600 hover:underline"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Voice Practice Modal */}
      {activeWordForVoice && (
        <VoicePracticeModal
          word={activeWordForVoice}
          passingScore={currentLesson.passingScore}
          isOpen={Boolean(activeWordForVoice)}
          onClose={() => setActiveWordForVoice(null)}
          onSuccess={(attempt) => {
            onRecordSuccess(attempt);
          }}
          onNextWord={handleNextWordInModal}
          hasNextWord={hasNextWord}
        />
      )}

      {/* Teacher Voice Recording Studio for Qaida Word */}
      {recordingWordForTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl border border-purple-200 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-purple-100">
              <div className="flex items-center gap-2">
                <Radio className="w-5 h-5 text-purple-600" />
                <h3 className="text-base font-bold text-purple-950">Record Teacher Voice (Madani Qaida)</h3>
              </div>
              <button
                onClick={() => {
                  if (isTeacherRecording) handleStopTeacherRecording();
                  setRecordingWordForTeacher(null);
                  setTeacherRecordedUrl(null);
                }}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-center py-4 space-y-2 bg-purple-50/50 rounded-2xl border border-purple-100">
              <span className="text-xs font-semibold text-purple-700">Target Letter / Word</span>
              <p className="font-arabic text-6xl font-bold text-purple-950">{recordingWordForTeacher.arabic}</p>
              <p className="text-sm font-bold text-slate-800">{recordingWordForTeacher.transliteration}</p>
              <p className="text-xs text-slate-500">{recordingWordForTeacher.makhraj}</p>
            </div>

            <div className="flex flex-col items-center justify-center space-y-3">
              <button
                onClick={isTeacherRecording ? handleStopTeacherRecording : () => handleStartTeacherRecording(recordingWordForTeacher)}
                className={`w-16 h-16 rounded-full flex items-center justify-center text-white transition-all shadow-lg ${
                  isTeacherRecording
                    ? 'bg-red-600 ring-4 ring-red-300 animate-pulse'
                    : 'bg-purple-600 hover:bg-purple-700'
                }`}
              >
                {isTeacherRecording ? <Square className="w-6 h-6 fill-current" /> : <Mic className="w-7 h-7" />}
              </button>
              <p className="text-xs font-semibold text-slate-600">
                {isTeacherRecording ? 'Recording... Click square to stop' : 'Click to record your voice'}
              </p>
            </div>

            {teacherRecordedUrl && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span className="text-xs font-bold text-emerald-900">Audio Recorded!</span>
                </div>
                <button
                  onClick={() => {
                    const audio = new Audio(teacherRecordedUrl);
                    audio.play();
                  }}
                  className="px-3 py-1 bg-white text-emerald-700 border border-emerald-300 rounded-lg text-xs font-bold flex items-center gap-1 shadow-xs"
                >
                  <Play className="w-3.5 h-3.5 fill-current" /> Preview
                </button>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  setRecordingWordForTeacher(null);
                  setTeacherRecordedUrl(null);
                }}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveTeacherVoiceForWord}
                disabled={!teacherRecordedUrl}
                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md"
              >
                <Save className="w-4 h-4" /> Save Teacher Voice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
