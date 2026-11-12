import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Search, 
  Play, 
  Pause, 
  RotateCcw, 
  Bookmark, 
  BookmarkCheck, 
  Volume2, 
  Eye, 
  EyeOff, 
  Sparkles, 
  Info, 
  CheckCircle2, 
  Layers, 
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Mic,
  Award,
  Compass
} from 'lucide-react';
import { ALL_114_SURAHS, SurahSummary } from '../../data/allSurahsMeta';
import { loadFullSurah, FullSurahData } from '../../utils/quranFullLoader';
import { POPULAR_RECITERS, QuranReciter, QuranAyah } from '../../data/quranData';
import { SURAH_HISTORICAL_BACKGROUNDS, getAyahInsight } from '../../utils/quranTafseerData';
import { getAyahWordByWord, AyahWordDetail } from '../../utils/quranWordByWordData';
import { 
  toggleStudentBookmark, 
  isItemBookmarked, 
  updateLastReadingPosition,
  getStudentLearningProfile
} from '../../utils/studentLearningStorage';
import { AyahRecitationStudio } from './AyahRecitationStudio';
import { getRecordingForVerse } from '../../utils/quranVoiceRecorder';

interface PortalQuranSectionProps {
  studentId: string;
  studentName: string;
  onBookmarkChanged?: () => void;
  onBackToDashboard?: () => void;
}

export const PortalQuranSection: React.FC<PortalQuranSectionProps> = ({
  studentId,
  studentName,
  onBookmarkChanged,
  onBackToDashboard
}) => {
  const profile = getStudentLearningProfile(studentId, studentName);
  const initialSurahNum = profile.lastReadingPosition?.surahNumber || 1;

  const [selectedSurahNumber, setSelectedSurahNumber] = useState<number>(initialSurahNum);
  const [currentSurahData, setCurrentSurahData] = useState<FullSurahData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedJuz, setSelectedJuz] = useState<number | 'all'>('all');

  // Surah Directory Pagination: 15 Surahs per page as requested
  const SURAHS_PER_PAGE = 15;
  const [surahPage, setSurahPage] = useState<number>(() => Math.ceil(initialSurahNum / SURAHS_PER_PAGE));
  const [directJumpValue, setDirectJumpValue] = useState<string>('');

  // Reciter & Audio
  const [selectedReciter, setSelectedReciter] = useState<QuranReciter>(POPULAR_RECITERS[0]);
  const [playingAyahIndex, setPlayingAyahIndex] = useState<number | null>(null);
  const [isPlayingContinuous, setIsPlayingContinuous] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Learning Toggles
  const [showWordByWord, setShowWordByWord] = useState<boolean>(false);
  const [showTafseer, setShowTafseer] = useState<boolean>(false);
  const [showTransliteration, setShowTransliteration] = useState<boolean>(true);
  const [showTranslation, setShowTranslation] = useState<boolean>(true);
  const [memorizationMode, setMemorizationMode] = useState<boolean>(false);
  const [hiddenAyahIndexes, setHiddenAyahIndexes] = useState<Set<number>>(new Set());

  // Background info accordion
  const [showBackgroundInfo, setShowBackgroundInfo] = useState<boolean>(false);

  // Recitation Testing & Voice Recording Studio
  const [activeStudioAyahIndex, setActiveStudioAyahIndex] = useState<number>(0);
  const [showStudio, setShowStudio] = useState<boolean>(true);

  // Jump to specific Surah helper
  const handleSelectSurah = (surahNum: number) => {
    if (surahNum >= 1 && surahNum <= 114) {
      setSelectedSurahNumber(surahNum);
      setSurahPage(Math.ceil(surahNum / SURAHS_PER_PAGE));
      const el = document.getElementById('active-surah-view');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleDirectJumpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(directJumpValue.trim(), 10);
    if (!isNaN(num) && num >= 1 && num <= 114) {
      handleSelectSurah(num);
      setDirectJumpValue('');
    }
  };

  // Load selected Surah
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    stopAudio();
    setActiveStudioAyahIndex(0);

    loadFullSurah(selectedSurahNumber).then(data => {
      if (isMounted) {
        setCurrentSurahData(data);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
      stopAudio();
    };
  }, [selectedSurahNumber]);

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setPlayingAyahIndex(null);
    setIsPlayingContinuous(false);
  };

  const playAyahAudio = (ayahIndex: number, continuous: boolean = false) => {
    if (!currentSurahData || !currentSurahData.ayahs[ayahIndex]) return;

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const ayah = currentSurahData.ayahs[ayahIndex];
    const padSurah = String(currentSurahData.number).padStart(3, '0');
    const padAyah = String(ayah.numberInSurah).padStart(3, '0');
    const audioUrl = `${selectedReciter.audioBaseUrl}${padSurah}${padAyah}.mp3`;

    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    setPlayingAyahIndex(ayahIndex);
    setIsPlayingContinuous(continuous);

    audio.play().catch(err => {
      console.warn('Audio playback failed or blocked:', err);
      stopAudio();
    });

    audio.onended = () => {
      if (continuous && ayahIndex + 1 < currentSurahData.ayahs.length) {
        playAyahAudio(ayahIndex + 1, true);
      } else {
        stopAudio();
      }
    };
  };

  const handleToggleBookmark = (ayah: QuranAyah) => {
    if (!currentSurahData) return;
    toggleStudentBookmark(studentId, studentName, {
      type: 'quran_ayah',
      title: `Surah ${currentSurahData.englishName} (${currentSurahData.number}:${ayah.numberInSurah})`,
      arabicText: ayah.arabic,
      englishTranslation: ayah.translation,
      reference: `Surah ${currentSurahData.englishName} (${currentSurahData.name}) - Ayah ${ayah.numberInSurah}`,
      surahNumber: currentSurahData.number,
      ayahNumber: ayah.numberInSurah
    });
    if (onBookmarkChanged) onBookmarkChanged();
  };

  const handleSetLastPosition = (ayahNumber: number) => {
    if (!currentSurahData) return;
    updateLastReadingPosition(studentId, studentName, currentSurahData.number, currentSurahData.englishName, ayahNumber);
    if (onBookmarkChanged) onBookmarkChanged();
  };

  const toggleHideAyah = (index: number) => {
    setHiddenAyahIndexes(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const filteredSurahs = ALL_114_SURAHS.filter(s => {
    const matchesSearch = 
      s.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.englishTranslation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name.includes(searchQuery) ||
      String(s.number) === searchQuery.trim();
    const matchesJuz = selectedJuz === 'all' || s.juz === selectedJuz;
    return matchesSearch && matchesJuz;
  });

  const historicalContext = SURAH_HISTORICAL_BACKGROUNDS[selectedSurahNumber];

  const totalSurahPages = Math.ceil(filteredSurahs.length / SURAHS_PER_PAGE) || 1;
  const currentSliceStart = (surahPage - 1) * SURAHS_PER_PAGE;
  const pageSurahs = filteredSurahs.slice(currentSliceStart, currentSliceStart + SURAHS_PER_PAGE);

  return (
    <div className="space-y-6">
      
      {/* Top Breadcrumb & Back to Dashboard Bar */}
      {onBackToDashboard && (
        <div className="flex items-center justify-between pb-2">
          <button
            onClick={onBackToDashboard}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-purple-50 text-[#6E1373] text-xs font-bold border border-purple-200 transition shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#851C82]" />
            <span>← Back to Dashboard Overview</span>
          </button>
          <span className="text-xs text-slate-500 font-semibold hidden sm:inline">
            Student Portal / Holy Quran Reader
          </span>
        </div>
      )}

      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-[#6E1373] via-[#851C82] to-[#561F79] text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-purple-200">
              <BookOpen className="w-3.5 h-3.5 text-amber-300" />
              <span>Complete Holy Quran with English Meaning & Tafsir</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Holy Quran & English Translation
            </h2>
            <p className="text-xs sm:text-sm text-purple-100 max-w-2xl">
              Study all 114 Surahs with authentic Arabic Uthmani text, complete English translation, word-by-word meanings, classical Tafsir, and Ayah-by-Ayah audio recitation.
            </p>
          </div>

          {/* Quick Resume Button */}
          {profile.lastReadingPosition && (
            <button
              onClick={() => handleSelectSurah(profile.lastReadingPosition.surahNumber)}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-sm transition flex items-center gap-2 cursor-pointer shrink-0"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Resume: Surah {profile.lastReadingPosition.surahName} (Ayah {profile.lastReadingPosition.ayahNumber})</span>
            </button>
          )}
        </div>
      </div>

      {/* Surah Selector, Search & Direct Jump Controls */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs space-y-4">
        
        {/* Search, Filter & Reciter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          {/* Search Box */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSurahPage(1);
              }}
              placeholder="Search by Surah name, English title, or number (e.g. 18, Kahf)..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6E1373] text-slate-900"
            />
          </div>

          {/* Juz Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedJuz}
              onChange={(e) => {
                setSelectedJuz(e.target.value === 'all' ? 'all' : parseInt(e.target.value, 10));
                setSurahPage(1);
              }}
              aria-label="Filter Surahs by Juz / Para"
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6E1373] text-slate-800"
            >
              <option value="all">All Juz / Paras (1 to 30)</option>
              {Array.from({ length: 30 }, (_, i) => i + 1).map(juz => (
                <option key={juz} value={juz}>Juz {juz}</option>
              ))}
            </select>
          </div>

          {/* Reciter Selector */}
          <div className="md:col-span-4">
            <select
              value={selectedReciter.id}
              onChange={(e) => {
                const rec = POPULAR_RECITERS.find(r => r.id === e.target.value);
                if (rec) setSelectedReciter(rec);
              }}
              aria-label="Select verified Quran reciter"
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6E1373] text-slate-800"
            >
              {POPULAR_RECITERS.map(rec => (
                <option key={rec.id} value={rec.id}>
                  🎙️ {rec.name} ({rec.country})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Direct Jump to Surah Bar (as requested: 1 or option bi add karo surah ka ke user direct kon se surah me jaye ga) */}
        <div className="p-3.5 bg-purple-50/80 border border-purple-200 rounded-2xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label className="text-xs font-black text-[#6E1373] flex items-center gap-1.5 shrink-0">
              <Compass className="w-4 h-4 text-[#851C82]" />
              <span>Direct Jump to Surah:</span>
            </label>
            <select
              value={selectedSurahNumber}
              onChange={(e) => handleSelectSurah(Number(e.target.value))}
              className="px-3 py-2 bg-white border border-purple-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6E1373] shadow-xs cursor-pointer"
            >
              {ALL_114_SURAHS.map((s) => (
                <option key={s.number} value={s.number}>
                  {s.number}. Surah {s.englishName} ({s.name}) — {s.englishTranslation} ({s.ayahsCount}v)
                </option>
              ))}
            </select>
          </div>

          <form onSubmit={handleDirectJumpSubmit} className="flex items-center gap-2">
            <input
              type="number"
              min={1}
              max={114}
              value={directJumpValue}
              onChange={(e) => setDirectJumpValue(e.target.value)}
              placeholder="Surah # (1-114)"
              className="w-28 px-3 py-1.5 bg-white border border-purple-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#6E1373]"
            />
            <button
              type="submit"
              className="px-3.5 py-1.5 rounded-xl bg-[#6E1373] hover:bg-[#561F79] text-white text-xs font-black shadow-xs transition cursor-pointer"
            >
              Go ➔
            </button>
          </form>
        </div>

        {/* 15 Surahs Per Page Directory Grid (as requested: pages add karo 15 surah 1 pages me add hone hai) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-600 font-bold px-1">
            <span>
              Surah Directory: Page {surahPage} of {totalSurahPages} ({pageSurahs.length} Surahs on this page)
            </span>
            <span className="text-[#851C82] bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
              15 Surahs per page
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
            {pageSurahs.map((s) => {
              const isSelected = selectedSurahNumber === s.number;
              return (
                <button
                  key={s.number}
                  onClick={() => handleSelectSurah(s.number)}
                  className={`p-3 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between gap-2 ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#6E1373] to-[#851C82] text-white border-transparent shadow-md ring-2 ring-purple-300'
                      : 'bg-white hover:bg-purple-50/60 border-slate-200 hover:border-purple-200 text-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`w-6 h-6 rounded-lg text-[10px] font-black flex items-center justify-center ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-purple-100 text-[#6E1373]'
                    }`}>
                      {s.number}
                    </span>
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                      isSelected ? 'bg-white/15 text-purple-100' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {s.revelationType}
                    </span>
                  </div>

                  <div>
                    <div className="font-black text-xs truncate">{s.englishName}</div>
                    <div className={`text-[10px] truncate ${isSelected ? 'text-purple-200' : 'text-slate-500'}`}>
                      {s.englishTranslation}
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-current/10 pt-1.5">
                    <span className={`text-[10px] ${isSelected ? 'text-purple-200' : 'text-slate-400'}`}>
                      {s.ayahsCount} Verses
                    </span>
                    <span className={`font-arabic text-sm font-bold ${isSelected ? 'text-white' : 'text-[#6E1373]'}`} dir="rtl">
                      {s.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Pagination Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
            <span className="text-xs text-slate-500 font-semibold">
              Showing Surahs {currentSliceStart + 1}–{Math.min(currentSliceStart + SURAHS_PER_PAGE, filteredSurahs.length)} of {filteredSurahs.length}
            </span>

            <div className="flex items-center gap-1.5">
              <button
                disabled={surahPage <= 1}
                onClick={() => setSurahPage(p => Math.max(1, p - 1))}
                className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold text-slate-700 flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Previous 15</span>
              </button>

              {Array.from({ length: totalSurahPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setSurahPage(p)}
                  className={`w-7 h-7 rounded-xl text-xs font-bold transition cursor-pointer ${
                    surahPage === p
                      ? 'bg-[#6E1373] text-white shadow-xs'
                      : 'bg-white hover:bg-purple-50 text-slate-700 border border-slate-200'
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                disabled={surahPage >= totalSurahPages}
                onClick={() => setSurahPage(p => Math.min(totalSurahPages, p + 1))}
                className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold text-slate-700 flex items-center gap-1 cursor-pointer"
              >
                <span>Next 15</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>

      <div id="active-surah-view" />

      {/* Main Selected Surah View */}
      {loading ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#6E1373] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold text-slate-600">Loading Holy Quran Ayahs & English Meanings...</p>
        </div>
      ) : currentSurahData ? (
        <div className="space-y-6">
          
          {/* Active Surah Banner */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#851C82] mb-1">
                  <span>Surah #{currentSurahData.number}</span>
                  <span>·</span>
                  <span className="px-2 py-0.5 rounded-full bg-purple-100 text-[#6E1373] font-medium">
                    {currentSurahData.revelationType} Revelation
                  </span>
                  <span>·</span>
                  <span>{currentSurahData.ayahsCount} Verses</span>
                  <span>·</span>
                  <span>Juz {currentSurahData.juz}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                  Surah {currentSurahData.englishName}
                  <span className="text-sm sm:text-base font-normal text-slate-500 ml-2">
                    ({currentSurahData.englishTranslation})
                  </span>
                </h3>
              </div>

              {/* Arabic Name Callout */}
              <div className="text-right">
                <div className="text-3xl sm:text-4xl font-arabic font-bold text-[#6E1373]">
                  سُورَةُ {currentSurahData.name}
                </div>
                <span className="text-xs text-slate-400">Reciter: {selectedReciter.name}</span>
              </div>
            </div>

            {/* Interactive Feature Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
              
              {/* Audio Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (isPlayingContinuous) {
                      stopAudio();
                    } else {
                      playAyahAudio(0, true);
                    }
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    isPlayingContinuous
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-[#6E1373] hover:bg-[#561F79] text-white shadow-xs'
                  }`}
                >
                  {isPlayingContinuous ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlayingContinuous ? 'Pause Recitation' : 'Play Full Surah'}</span>
                </button>

                {playingAyahIndex !== null && (
                  <button
                    onClick={stopAudio}
                    className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition cursor-pointer"
                    title="Stop Audio"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Learning Feature Toggles */}
              <div className="flex flex-wrap items-center gap-2">
                
                {/* Word-by-Word Toggle */}
                <button
                  onClick={() => setShowWordByWord(!showWordByWord)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border cursor-pointer flex items-center gap-1.5 ${
                    showWordByWord
                      ? 'bg-purple-100 border-purple-300 text-[#6E1373]'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 text-[#851C82]" />
                  <span>Word-by-Word Meaning</span>
                </button>

                {/* Tafsir Toggle */}
                <button
                  onClick={() => setShowTafseer(!showTafseer)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border cursor-pointer flex items-center gap-1.5 ${
                    showTafseer
                      ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Tafsir & Meaning</span>
                </button>

                {/* Memorization Mode Toggle */}
                <button
                  onClick={() => {
                    setMemorizationMode(!memorizationMode);
                    if (!memorizationMode) {
                      setHiddenAyahIndexes(new Set());
                    }
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border cursor-pointer flex items-center gap-1.5 ${
                    memorizationMode
                      ? 'bg-amber-100 border-amber-300 text-amber-900'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  {memorizationMode ? <EyeOff className="w-3.5 h-3.5 text-amber-600" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>Memorization Mode</span>
                </button>

                {/* Voice & Recitation Testing Studio Toggle */}
                <button
                  onClick={() => setShowStudio(!showStudio)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border cursor-pointer flex items-center gap-1.5 ${
                    showStudio
                      ? 'bg-gradient-to-r from-[#6E1373] to-[#851C82] text-white shadow-xs'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <Mic className="w-3.5 h-3.5 text-pink-300" />
                  <span>Voice & Speaking Test</span>
                </button>

                {/* Surah Background Accordion Toggle */}
                <button
                  onClick={() => setShowBackgroundInfo(!showBackgroundInfo)}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 transition cursor-pointer flex items-center gap-1.5"
                >
                  <Info className="w-3.5 h-3.5 text-blue-600" />
                  <span>Surah Background</span>
                  {showBackgroundInfo ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Surah Background & Themes Info Box */}
            {showBackgroundInfo && (
              <div className="bg-purple-50/70 border border-purple-200 rounded-2xl p-4 sm:p-5 text-xs sm:text-sm space-y-2.5 animate-fadeIn">
                <div className="flex items-center gap-2 font-bold text-[#6E1373]">
                  <Sparkles className="w-4 h-4 text-[#851C82]" />
                  <span>Historical Revelation & Significance: Surah {currentSurahData.englishName}</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  {historicalContext?.historicalSetting || 
                    `Surah ${currentSurahData.englishName} is the ${currentSurahData.number}th chapter of the Holy Quran, containing ${currentSurahData.ayahsCount} verses revealed in the ${currentSurahData.revelationType} era.`
                  }
                </p>
                {historicalContext?.majorThemes && (
                  <div className="pt-1">
                    <span className="font-semibold text-purple-900 mr-2">Major Themes:</span>
                    <div className="inline-flex flex-wrap gap-1.5 mt-1">
                      {historicalContext.majorThemes.map((th, idx) => (
                        <span key={idx} className="px-2.5 py-0.5 rounded-md bg-purple-200/80 text-[#561F79] text-[11px] font-medium">
                          {th}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {historicalContext?.virtueAndSignificance && (
                  <p className="text-emerald-900 bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 text-xs">
                    <strong>Virtue & Benefit:</strong> {historicalContext.virtueAndSignificance}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Interactive Recitation & Voice Studio */}
          {showStudio && currentSurahData.ayahs[activeStudioAyahIndex] && (
            <div id="recitation-studio" className="scroll-mt-24">
              <AyahRecitationStudio
                surahNumber={currentSurahData.number}
                surahName={currentSurahData.englishName}
                totalVerses={currentSurahData.ayahsCount}
                currentAyah={currentSurahData.ayahs[activeStudioAyahIndex]}
                reciter={selectedReciter}
                onSelectAyah={(ayahNum) => {
                  const idx = currentSurahData.ayahs.findIndex(a => a.numberInSurah === ayahNum);
                  if (idx >= 0) setActiveStudioAyahIndex(idx);
                }}
                onRecitationPassed={(ayahNum, score) => {
                  // If passed with >= 75%
                  console.log(`Ayah ${ayahNum} passed with ${score}%!`);
                }}
              />
            </div>
          )}

          {/* Bismillah Header (except Surah 9 At-Tawbah) */}
          {currentSurahData.number !== 9 && (
            <div className="text-center py-4 bg-white rounded-2xl border border-slate-100 shadow-xs">
              <p className="text-2xl sm:text-3xl font-arabic text-slate-800 tracking-wide">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
              <p className="text-xs text-slate-500 mt-1 italic">
                In the name of Allah, the Most Compassionate, the Most Merciful
              </p>
            </div>
          )}

          {/* Ayah List */}
          <div className="space-y-4">
            {currentSurahData.ayahs.map((ayah, index) => {
              const isPlaying = playingAyahIndex === index;
              const isBookmarked = isItemBookmarked(studentId, studentName, 'quran_ayah', {
                surahNumber: currentSurahData.number,
                ayahNumber: ayah.numberInSurah
              });
              const isHidden = memorizationMode && hiddenAyahIndexes.has(index);
              const wordByWordList = showWordByWord ? getAyahWordByWord(currentSurahData.number, ayah.numberInSurah, ayah.arabic) : [];
              const insight = showTafseer ? getAyahInsight(currentSurahData.number, ayah.numberInSurah) : null;

              return (
                <div
                  key={ayah.numberInSurah}
                  id={`ayah-${ayah.numberInSurah}`}
                  className={`bg-white rounded-3xl border transition-all p-5 sm:p-6 shadow-xs space-y-4 ${
                    isPlaying 
                      ? 'border-[#851C82] ring-2 ring-purple-100 bg-purple-50/20' 
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {/* Ayah Top Bar: Number & Actions */}
                  <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-[#6E1373]/10 text-[#6E1373] font-bold text-xs flex items-center justify-center">
                        {ayah.numberInSurah}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        {currentSurahData.englishName} : {ayah.numberInSurah}
                      </span>
                      {isPlaying && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold animate-pulse flex items-center gap-1">
                          <Volume2 className="w-3 h-3" />
                          <span>Playing</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      {/* Play single ayah */}
                      <button
                        onClick={() => {
                          if (isPlaying) {
                            stopAudio();
                          } else {
                            playAyahAudio(index, false);
                          }
                        }}
                        className={`p-2 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1 ${
                          isPlaying
                            ? 'bg-amber-500 text-slate-950'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                        title="Listen to this verse"
                      >
                        {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                        <span className="hidden sm:inline">{isPlaying ? 'Pause' : 'Recite'}</span>
                      </button>

                      {/* Studio Focus: Record & Test Speaking */}
                      <button
                        onClick={() => {
                          setActiveStudioAyahIndex(index);
                          setShowStudio(true);
                          const el = document.getElementById('recitation-studio');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-2.5 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-[#6E1373] text-xs font-bold transition cursor-pointer flex items-center gap-1"
                        title="Record your voice & test speaking accuracy (75% to pass)"
                      >
                        <Mic className="w-3.5 h-3.5 text-[#C72F8A]" />
                        <span className="hidden md:inline">Voice & Test</span>
                      </button>

                      {/* Bookmark Button */}
                      <button
                        onClick={() => handleToggleBookmark(ayah)}
                        className={`p-2 rounded-xl text-xs transition cursor-pointer ${
                          isBookmarked
                            ? 'bg-purple-100 text-[#6E1373]'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                        }`}
                        title={isBookmarked ? 'Remove Bookmark' : 'Bookmark this verse'}
                      >
                        {isBookmarked ? <BookmarkCheck className="w-4 h-4 fill-[#6E1373]" /> : <Bookmark className="w-4 h-4" />}
                      </button>

                      {/* Set as Last Reading Position */}
                      <button
                        onClick={() => handleSetLastPosition(ayah.numberInSurah)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-purple-100 hover:text-[#6E1373] text-slate-600 text-xs transition cursor-pointer"
                        title="Save as last reading bookmark"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>

                      {/* Memorization blur toggle */}
                      {memorizationMode && (
                        <button
                          onClick={() => toggleHideAyah(index)}
                          className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs transition cursor-pointer"
                          title="Reveal / Hide verse for memorization"
                        >
                          {isHidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Arabic Text (Large, Elegant Uthmani) */}
                  <div className="py-2 text-right">
                    <p 
                      dir="rtl"
                      className={`text-2xl sm:text-3xl lg:text-4xl font-arabic text-slate-900 leading-loose transition select-text ${
                        isHidden ? 'blur-md select-none' : ''
                      }`}
                    >
                      {ayah.arabic}
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-purple-300 bg-purple-50 text-xs text-[#6E1373] font-sans mr-2 align-middle">
                        {ayah.numberInSurah}
                      </span>
                    </p>
                  </div>

                  {/* Transliteration */}
                  {showTransliteration && (
                    <div className="pt-1">
                      <p className="text-xs sm:text-sm font-medium text-purple-900/80 italic">
                        {ayah.transliteration}
                      </p>
                    </div>
                  )}

                  {/* English Translation */}
                  {showTranslation && (
                    <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        English Translation (Sahih International)
                      </span>
                      <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                        {ayah.translation}
                      </p>
                    </div>
                  )}

                  {/* Word-by-Word Meaning Breakdown Table */}
                  {showWordByWord && wordByWordList.length > 0 && (
                    <div className="bg-purple-50/50 rounded-2xl p-3 sm:p-4 border border-purple-100 space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#6E1373]">
                        <Layers className="w-3.5 h-3.5" />
                        <span>Word-by-Word Vocabulary Meaning</span>
                      </div>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 pt-1">
                        {wordByWordList.map((wbw, wIdx) => (
                          <div key={wIdx} className="bg-white rounded-xl p-2.5 border border-purple-100 text-center space-y-1 shadow-2xs">
                            <div className="text-lg font-arabic font-bold text-slate-900">
                              {wbw.arabic}
                            </div>
                            <div className="text-[10px] text-purple-800 font-medium">
                              {wbw.transliteration}
                            </div>
                            <div className="text-[11px] font-semibold text-slate-700 border-t border-slate-100 pt-1">
                              {wbw.english}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tafsir & Meaning Explanation */}
                  {showTafseer && (
                    <div className="bg-emerald-50/60 rounded-2xl p-4 border border-emerald-100 text-xs sm:text-sm space-y-2">
                      <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                        <Sparkles className="w-4 h-4 text-emerald-600" />
                        <span>Explanation & Tafsir Insights</span>
                        <span className="text-[10px] text-emerald-600 font-normal ml-auto">
                          Source: {insight?.tafseerReference || 'Classical Tafsir Literature'}
                        </span>
                      </div>
                      <p className="text-slate-700 leading-relaxed">
                        {insight?.meaning || 'This blessed ayah conveys essential moral guidance, reminding the faithful of Allah\'s boundless sovereignty, mercy, and our perpetual reliance upon Him in every moment of existence.'}
                      </p>
                      {insight?.summary && (
                        <p className="text-emerald-800 font-semibold pt-1">
                          Key Lesson: {insight.summary}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Surah Navigation Footer */}
          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => {
                if (currentSurahData.number > 1) {
                  setSelectedSurahNumber(currentSurahData.number - 1);
                  window.scrollTo({ top: 300, behavior: 'smooth' });
                }
              }}
              disabled={currentSurahData.number <= 1}
              className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs sm:text-sm font-semibold text-slate-700 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2"
            >
              <span>← Previous Surah</span>
            </button>

            <span className="text-xs text-slate-400 font-medium">
              Surah {currentSurahData.number} of 114
            </span>

            <button
              onClick={() => {
                if (currentSurahData.number < 114) {
                  setSelectedSurahNumber(currentSurahData.number + 1);
                  window.scrollTo({ top: 300, behavior: 'smooth' });
                }
              }}
              disabled={currentSurahData.number >= 114}
              className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs sm:text-sm font-semibold text-slate-700 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2"
            >
              <span>Next Surah →</span>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
