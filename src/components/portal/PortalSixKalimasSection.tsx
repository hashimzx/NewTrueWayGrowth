import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Volume2, 
  Bookmark, 
  BookmarkCheck, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  RotateCcw,
  Eye,
  EyeOff,
  Award
} from 'lucide-react';
import { SIX_KALIMAS, KalimaItem } from '../../data/sixKalimasData';
import { audioEngine } from '../../utils/audioSynth';
import { toggleStudentBookmark, isItemBookmarked } from '../../utils/studentLearningStorage';

interface PortalSixKalimasSectionProps {
  studentId: string;
  studentName: string;
  onBookmarkChanged?: () => void;
}

export const PortalSixKalimasSection: React.FC<PortalSixKalimasSectionProps> = ({
  studentId,
  studentName,
  onBookmarkChanged
}) => {
  const [activeKalimaId, setActiveKalimaId] = useState<number>(1);
  const [speakingId, setSpeakingId] = useState<number | null>(null);
  const [showWordByWord, setShowWordByWord] = useState<boolean>(true);
  const [memorizationMode, setMemorizationMode] = useState<boolean>(false);
  const [hideTranslation, setHideTranslation] = useState<boolean>(false);

  // Memorization Quiz state
  const [testAnswer, setTestAnswer] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState<{ answered: boolean; correct: boolean } | null>(null);

  const activeKalima = SIX_KALIMAS.find(k => k.id === activeKalimaId) || SIX_KALIMAS[0];

  const handleSpeak = async (kalima: KalimaItem) => {
    if (speakingId === kalima.id) {
      audioEngine.stopVoice();
      setSpeakingId(null);
      return;
    }
    setSpeakingId(kalima.id);
    await audioEngine.speakArabic(kalima.arabicText, 0.85);
    setSpeakingId(null);
  };

  const handleToggleBookmark = (kalima: KalimaItem) => {
    toggleStudentBookmark(studentId, studentName, {
      type: 'kalima',
      title: kalima.name,
      arabicText: kalima.arabicText,
      englishTranslation: kalima.translation,
      reference: kalima.meaningTitle
    });
    if (onBookmarkChanged) onBookmarkChanged();
  };

  const isBookmarked = isItemBookmarked(studentId, studentName, 'kalima', { title: activeKalima.name });

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#6E1373] via-[#851C82] to-[#561F79] text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-purple-200">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              <span>Pillars of Islamic Creed & Testimony</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              The Six Kalimas of Islam
            </h2>
            <p className="text-xs sm:text-sm text-purple-100 max-w-2xl">
              Learn, recite, understand the word-by-word meaning, and memorize the essential Six Kalimas that define faith, testimony, glorification, Tawheed, forgiveness, and protection from disbelief.
            </p>
          </div>

          {/* Audio Recitation button */}
          <button
            onClick={() => handleSpeak(activeKalima)}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer shadow-xs ${
              speakingId === activeKalima.id
                ? 'bg-amber-400 text-slate-950 animate-pulse'
                : 'bg-white/20 hover:bg-white/30 text-white'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            <span>{speakingId === activeKalima.id ? 'Reciting...' : 'Listen to Recitation'}</span>
          </button>
        </div>
      </div>

      {/* Kalima Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {SIX_KALIMAS.map((k) => (
          <button
            key={k.id}
            onClick={() => {
              setActiveKalimaId(k.id);
              setQuizScore(null);
              setTestAnswer(null);
            }}
            className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold shrink-0 transition cursor-pointer flex items-center gap-2 ${
              activeKalimaId === k.id
                ? 'bg-[#6E1373] text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            <span className="w-6 h-6 rounded-full bg-black/10 text-[11px] flex items-center justify-center">
              {k.id}
            </span>
            <span>{k.name.split(':')[1] || k.name}</span>
          </button>
        ))}
      </div>

      {/* Main Active Kalima Showcase Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#851C82] mb-1">
              <span>Kalima #{activeKalima.id}</span>
              <span>·</span>
              <span>{activeKalima.meaningTitle}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              {activeKalima.name}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {/* Word-by-Word Toggle */}
            <button
              onClick={() => setShowWordByWord(!showWordByWord)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer flex items-center gap-1.5 ${
                showWordByWord
                  ? 'bg-purple-100 border-purple-300 text-[#6E1373]'
                  : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#851C82]" />
              <span>Word-by-Word</span>
            </button>

            {/* Memorization Mode */}
            <button
              onClick={() => setHideTranslation(!hideTranslation)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer flex items-center gap-1.5 ${
                hideTranslation
                  ? 'bg-amber-100 border-amber-300 text-amber-900'
                  : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              {hideTranslation ? <EyeOff className="w-3.5 h-3.5 text-amber-600" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{hideTranslation ? 'Reveal Meaning' : 'Test Memory'}</span>
            </button>

            {/* Bookmark */}
            <button
              onClick={() => handleToggleBookmark(activeKalima)}
              className={`p-2 rounded-xl text-xs transition cursor-pointer ${
                isBookmarked
                  ? 'bg-purple-100 text-[#6E1373]'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
              title={isBookmarked ? 'Remove Bookmark' : 'Bookmark this Kalima'}
            >
              {isBookmarked ? <BookmarkCheck className="w-4 h-4 fill-[#6E1373]" /> : <Bookmark className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Arabic Calligraphy Display */}
        <div className="bg-purple-50/40 rounded-3xl p-6 sm:p-8 text-center border border-purple-100 space-y-3">
          <p className="text-xs font-bold tracking-wider text-[#851C82] uppercase">
            {activeKalima.arabicName}
          </p>
          <p 
            dir="rtl"
            className="text-2xl sm:text-3xl lg:text-4xl font-arabic text-slate-950 leading-loose"
          >
            {activeKalima.arabicText}
          </p>
        </div>

        {/* Transliteration */}
        <div className="space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            English Transliteration
          </span>
          <p className="text-sm sm:text-base font-medium text-purple-900/90 italic leading-relaxed">
            {activeKalima.transliteration}
          </p>
        </div>

        {/* English Translation */}
        <div className={`bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-100 transition-all ${
          hideTranslation ? 'blur-md select-none' : ''
        }`}>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Complete English Translation
          </span>
          <p className="text-sm sm:text-base text-slate-800 font-semibold leading-relaxed">
            {activeKalima.translation}
          </p>
        </div>

        {/* Word-by-Word Breakdown Table */}
        {showWordByWord && activeKalima.wordByWord.length > 0 && (
          <div className="space-y-2 pt-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#6E1373]">
              <Layers className="w-4 h-4 text-[#851C82]" />
              <span>Word-by-Word Meaning Breakdown</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 pt-1">
              {activeKalima.wordByWord.map((wbw, idx) => (
                <div key={idx} className="bg-purple-50/50 rounded-2xl p-3 border border-purple-100 text-center space-y-1 shadow-2xs">
                  <div className="text-xl font-arabic font-bold text-slate-900">
                    {wbw.arabic}
                  </div>
                  <div className="text-[11px] text-[#851C82] font-medium">
                    {wbw.transliteration}
                  </div>
                  <div className="text-xs font-semibold text-slate-700 border-t border-purple-100 pt-1">
                    {wbw.english}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Explanation in Simple English */}
        <div className="bg-purple-50/60 rounded-2xl p-4 sm:p-5 border border-purple-100 space-y-2 text-xs sm:text-sm">
          <div className="flex items-center gap-1.5 font-bold text-[#6E1373]">
            <Sparkles className="w-4 h-4 text-[#851C82]" />
            <span>Explanation & Theological Significance</span>
          </div>
          <p className="text-slate-700 leading-relaxed">
            {activeKalima.explanation}
          </p>

          <div className="pt-2">
            <span className="font-semibold text-purple-900 block mb-1">Key Virtues & Merits:</span>
            <ul className="list-disc list-inside space-y-1 text-slate-700">
              {activeKalima.virtues.map((v, vIdx) => (
                <li key={vIdx}>{v}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Interactive Memorization Practice Card */}
        <div className="bg-amber-50/70 rounded-2xl p-4 sm:p-5 border border-amber-200 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-amber-950 text-xs sm:text-sm">
              <Award className="w-4 h-4 text-amber-600" />
              <span>Memorization Practice: Quick Recall Check</span>
            </div>
            {quizScore && (
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                quizScore.correct ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
              }`}>
                {quizScore.correct ? '✓ Correct Recall!' : '✗ Try again'}
              </span>
            )}
          </div>

          <p className="text-xs text-slate-700">
            What is the primary spiritual title of <strong>{activeKalima.name}</strong>?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            {[
              activeKalima.meaningTitle,
              'The Word of Supplication during Ramadan',
              'The Word of Hajj Declaration',
              'The Word of Journeying'
            ].sort().map((opt, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setTestAnswer(opt);
                  const isCorrect = opt === activeKalima.meaningTitle;
                  setQuizScore({ answered: true, correct: isCorrect });
                }}
                className={`p-2.5 rounded-xl text-left text-xs font-semibold border transition cursor-pointer ${
                  testAnswer === opt
                    ? opt === activeKalima.meaningTitle
                      ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                      : 'bg-red-100 border-red-400 text-red-900'
                    : 'bg-white hover:bg-amber-100/50 border-amber-200 text-slate-800'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
