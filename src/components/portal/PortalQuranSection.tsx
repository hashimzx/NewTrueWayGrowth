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
  ChevronLeft, 
  ChevronRight, 
  Mic, 
  Award, 
  Compass,
  FileText,
  Download
} from 'lucide-react';
import { ALL_114_SURAHS, SurahSummary } from '../../data/allSurahsMeta';
import { loadFullSurah, FullSurahData } from '../../utils/quranFullLoader';
import { POPULAR_RECITERS, QuranReciter, QuranAyah } from '../../data/quranData';
import { SURAH_HISTORICAL_BACKGROUNDS, getAyahInsight } from '../../utils/quranTafseerData';
import { getAyahWordByWord } from '../../utils/quranWordByWordData';
import { 
  toggleStudentBookmark, 
  isItemBookmarked, 
  updateLastReadingPosition,
  getStudentLearningProfile
} from '../../utils/studentLearningStorage';
import { AyahRecitationStudio } from './AyahRecitationStudio';
import { ColorCodedTajweedSection } from './ColorCodedTajweedSection';
import { parseTajweedTokens, TAJWEED_COLOR_RULES } from '../../data/tajweedMushafData';

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

  // View state: 'directory' (Surah Selection List) | 'reader' (Next Page Quran Reader) | 'tajweed_mushaf' (Color Coded 30 Paras)
  const [viewMode, setViewMode] = useState<'directory' | 'reader' | 'tajweed_mushaf'>('directory');
  const [selectedSurahNumber, setSelectedSurahNumber] = useState<number>(initialSurahNum);
  const [currentSurahData, setCurrentSurahData] = useState<FullSurahData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedJuz, setSelectedJuz] = useState<number | 'all'>('all');

  // Surah Directory Pagination: 15 Surahs per page
  const SURAHS_PER_PAGE = 15;
  const [surahPage, setSurahPage] = useState<number>(() => Math.ceil(initialSurahNum / SURAHS_PER_PAGE));
  const [directJumpValue, setDirectJumpValue] = useState<string>('');

  // Reader Ayah Pagination: 10-15 Ayat per page as requested
  const [ayahsPerPage, setAyahsPerPage] = useState<number>(15);
  const [versePage, setVersePage] = useState<number>(1);

  // Reciter & Audio
  const [selectedReciter, setSelectedReciter] = useState<QuranReciter>(POPULAR_RECITERS[0]);
  const [playingAyahIndex, setPlayingAyahIndex] = useState<number | null>(null);
  const [isPlayingContinuous, setIsPlayingContinuous] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Learning Toggles
  const [showColorTajweed, setShowColorTajweed] = useState<boolean>(true);
  const [showTajweedLegend, setShowTajweedLegend] = useState<boolean>(false);
  const [showWordByWord, setShowWordByWord] = useState<boolean>(false);
  const [showTafseer, setShowTafseer] = useState<boolean>(false);
  const [showTransliteration, setShowTransliteration] = useState<boolean>(true);
  const [showTranslation, setShowTranslation] = useState<boolean>(true);
  const [memorizationMode, setMemorizationMode] = useState<boolean>(false);
  const [hiddenAyahIndexes, setHiddenAyahIndexes] = useState<Set<number>>(new Set());
  const [showBackgroundInfo, setShowBackgroundInfo] = useState<boolean>(false);

  // Voice Studio
  const [activeStudioAyahIndex, setActiveStudioAyahIndex] = useState<number>(0);
  const [showStudio, setShowStudio] = useState<boolean>(true);

  // Open a specific Surah on the dedicated Reader page (Next Page)
  const handleOpenSurahReader = (surahNum: number) => {
    if (surahNum >= 1 && surahNum <= 114) {
      setSelectedSurahNumber(surahNum);
      setSurahPage(Math.ceil(surahNum / SURAHS_PER_PAGE));
      setVersePage(1);
      setViewMode('reader');
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleDirectJumpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(directJumpValue.trim(), 10);
    if (!isNaN(num) && num >= 1 && num <= 114) {
      handleOpenSurahReader(num);
      setDirectJumpValue('');
    }
  };

  // Load selected Surah data
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
      console.warn('Audio playback notice:', err);
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
    if (onBookmarkChanged) {
      onBookmarkChanged();
    }
  };

  const handleSetLastPosition = (ayahNumber: number) => {
    if (!currentSurahData) return;
    updateLastReadingPosition(
      studentId, 
      studentName, 
      currentSurahData.number, 
      currentSurahData.englishName, 
      ayahNumber
    );
    if (onBookmarkChanged) {
      onBookmarkChanged();
    }
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

  // Filtered Surahs in directory
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

  // Verse pagination calculations for the dedicated reader page
  const totalVerses = currentSurahData?.ayahs.length || 0;
  const totalVersePages = Math.ceil(totalVerses / ayahsPerPage) || 1;
  const currentVerseSliceStart = (versePage - 1) * ayahsPerPage;
  const currentVerseSliceEnd = Math.min(currentVerseSliceStart + ayahsPerPage, totalVerses);
  const currentPaginatedAyahs = currentSurahData?.ayahs.slice(currentVerseSliceStart, currentVerseSliceEnd) || [];

  // ==========================================
  // VIEW 3: COLOR CODED TAJWEED 30 PARAS & PDFS
  // ==========================================
  if (viewMode === 'tajweed_mushaf') {
    return (
      <div className="space-y-4">
        <ColorCodedTajweedSection
          onSelectSurah={(surahNum) => {
            handleOpenSurahReader(surahNum);
          }}
          onBackToSurahList={() => {
            setViewMode('directory');
            window.scrollTo({ top: 100, behavior: 'smooth' });
          }}
        />
      </div>
    );
  }

  // ==========================================
  // VIEW 2: DEDICATED SURAH READER (NEXT PAGE)
  // ==========================================
  if (viewMode === 'reader') {
    return (
      <div className="space-y-6 animate-fadeIn">
        
        {/* Navigation & Direct Surah Switcher Top Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-purple-100 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          <div className="flex flex-wrap items-center gap-2">
            {/* Back to Surahs Directory Button */}
            <button
              onClick={() => {
                setViewMode('directory');
                stopAudio();
                window.scrollTo({ top: 100, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-50 hover:bg-[#6E1373] text-[#6E1373] hover:text-white text-xs font-black border border-purple-200 transition cursor-pointer group shadow-2xs"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>← Back to Surah Directory (114 Surahs)</span>
            </button>

            {onBackToDashboard && (
              <button
                onClick={onBackToDashboard}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer"
              >
                <span>Dashboard Overview</span>
              </button>
            )}

            <button
              onClick={() => {
                setViewMode('tajweed_mushaf');
                stopAudio();
                window.scrollTo({ top: 100, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold transition cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-amber-600" />
              <span>30 Paras Tajweed PDFs</span>
            </button>
          </div>

          {/* Option to select which Surah to read directly on this page */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-purple-50/70 p-2 rounded-2xl border border-purple-100">
            <label className="text-xs font-black text-[#6E1373] flex items-center gap-1 shrink-0 px-1">
              <Compass className="w-3.5 h-3.5" />
              <span>Select Surah to Read:</span>
            </label>
            <select
              value={selectedSurahNumber}
              onChange={(e) => {
                const num = Number(e.target.value);
                setSelectedSurahNumber(num);
                setVersePage(1);
                window.scrollTo({ top: 120, behavior: 'smooth' });
              }}
              className="px-3 py-1.5 bg-white border border-purple-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6E1373] shadow-xs cursor-pointer"
            >
              {ALL_114_SURAHS.map((s) => (
                <option key={s.number} value={s.number}>
                  {s.number}. Surah {s.englishName} ({s.name}) — {s.englishTranslation} ({s.ayahsCount}v)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Selected Surah Main Workspace */}
        {loading ? (
          <div className="bg-white rounded-3xl border border-purple-100 p-16 text-center space-y-4">
            <div className="w-12 h-12 border-4 border-[#6E1373] border-t-transparent rounded-full animate-spin mx-auto" />
            <h4 className="text-base font-black text-slate-900">Loading Surah Ayahs & Tajweed...</h4>
            <p className="text-xs text-slate-500">Preparing authentic Arabic text, English translation & audio recitation...</p>
          </div>
        ) : currentSurahData ? (
          <div className="space-y-6">
            
            {/* Active Surah Hero Card */}
            <div className="bg-white rounded-3xl border border-purple-100 p-6 sm:p-8 shadow-xs space-y-5">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#851C82] mb-1">
                    <span>Surah #{currentSurahData.number}</span>
                    <span>·</span>
                    <span className="px-2 py-0.5 rounded-full bg-purple-100 text-[#6E1373] font-black text-[11px]">
                      {currentSurahData.revelationType} Revelation
                    </span>
                    <span>·</span>
                    <span>{currentSurahData.ayahsCount} Total Verses</span>
                    <span>·</span>
                    <span>Juz {currentSurahData.juz}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-baseline gap-2">
                    <span>Surah {currentSurahData.englishName}</span>
                    <span className="text-sm sm:text-base font-normal text-slate-500">
                      ({currentSurahData.englishTranslation})
                    </span>
                  </h3>
                </div>

                {/* Arabic Calligraphy Header */}
                <div className="text-right">
                  <div className="text-3xl sm:text-4xl font-arabic font-bold text-[#6E1373]" dir="rtl">
                    سُورَةُ {currentSurahData.name}
                  </div>
                  <span className="text-xs text-slate-400 font-semibold">
                    Reciter: {selectedReciter.name} ({selectedReciter.country})
                  </span>
                </div>
              </div>

              {/* Reciter & Feature Toggles Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                
                {/* Audio Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (isPlayingContinuous) {
                        stopAudio();
                      } else {
                        playAyahAudio(currentVerseSliceStart, true);
                      }
                    }}
                    className={`px-4 py-2.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 cursor-pointer shadow-xs ${
                      isPlayingContinuous
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-[#6E1373] hover:bg-[#561F79] text-white'
                    }`}
                  >
                    {isPlayingContinuous ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span>{isPlayingContinuous ? 'Pause Recitation' : 'Play Page Recitation'}</span>
                  </button>

                  {playingAyahIndex !== null && (
                    <button
                      onClick={stopAudio}
                      className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition cursor-pointer"
                      title="Stop Audio"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  )}

                  {/* Reciter Selector */}
                  <select
                    value={selectedReciter.id}
                    onChange={(e) => {
                      const rec = POPULAR_RECITERS.find(r => r.id === e.target.value);
                      if (rec) setSelectedReciter(rec);
                    }}
                    className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#6E1373]"
                  >
                    {POPULAR_RECITERS.map(rec => (
                      <option key={rec.id} value={rec.id}>
                        🎙️ {rec.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Feature Toggles */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    onClick={() => setShowColorTajweed(!showColorTajweed)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border cursor-pointer flex items-center gap-1 ${
                      showColorTajweed ? 'bg-purple-100 text-[#6E1373] border-purple-300' : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                    <span>Color Tajweed</span>
                  </button>

                  <button
                    onClick={() => setShowTajweedLegend(!showTajweedLegend)}
                    className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-purple-50 text-purple-700 hover:bg-purple-100 transition cursor-pointer"
                    title="Tajweed Colors Legend"
                  >
                    <Info className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setShowWordByWord(!showWordByWord)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border cursor-pointer flex items-center gap-1 ${
                      showWordByWord ? 'bg-purple-100 text-[#6E1373] border-purple-300' : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5 text-[#6E1373]" />
                    <span>Word-by-Word</span>
                  </button>

                  <button
                    onClick={() => setShowTafseer(!showTafseer)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border cursor-pointer flex items-center gap-1 ${
                      showTafseer ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    <span>Tafsir</span>
                  </button>

                  <button
                    onClick={() => setMemorizationMode(!memorizationMode)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border cursor-pointer flex items-center gap-1 ${
                      memorizationMode ? 'bg-amber-100 text-amber-900 border-amber-300' : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    <EyeOff className="w-3.5 h-3.5 text-amber-700" />
                    <span>Hifz Mode</span>
                  </button>

                  <button
                    onClick={() => setShowStudio(!showStudio)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border cursor-pointer flex items-center gap-1 ${
                      showStudio ? 'bg-[#6E1373] text-white border-[#6E1373]' : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>Voice Test Studio</span>
                  </button>
                </div>
              </div>

              {/* Tajweed Color Legend Bar (when toggled) */}
              {showTajweedLegend && (
                <div className="p-3 bg-purple-50/70 border border-purple-200 rounded-2xl animate-fadeIn space-y-2">
                  <div className="text-[11px] font-black uppercase tracking-wider text-[#6E1373] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Color-Coded Tajweed Pronunciation Rules:</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs">
                    {TAJWEED_COLOR_RULES.map((rule) => (
                      <div key={rule.id} className="p-2 rounded-xl bg-white border border-purple-100 space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: rule.colorHex }} />
                          <span className="font-black text-[11px]" style={{ color: rule.colorHex }}>{rule.name.split('(')[0]}</span>
                        </div>
                        <p className="text-[10px] text-slate-500 font-medium">{rule.duration}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* AYAT PAGINATION TOOLBAR (10-15 Ayat per page) */}
            <div className="bg-white p-4 rounded-2xl border border-purple-100 shadow-xs flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-slate-700">
                  Showing Ayat {currentVerseSliceStart + 1}–{currentVerseSliceEnd} of {totalVerses}
                </span>
                <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full">
                  Page {versePage} of {totalVersePages}
                </span>
              </div>

              {/* Ayat per page selector & page buttons */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-xs font-bold text-slate-500 mr-2">
                  <span>Ayat / Page:</span>
                  <button
                    onClick={() => { setAyahsPerPage(15); setVersePage(1); }}
                    className={`px-2 py-0.5 rounded-md text-xs font-black transition cursor-pointer ${
                      ayahsPerPage === 15 ? 'bg-[#6E1373] text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    15
                  </button>
                  <button
                    onClick={() => { setAyahsPerPage(10); setVersePage(1); }}
                    className={`px-2 py-0.5 rounded-md text-xs font-black transition cursor-pointer ${
                      ayahsPerPage === 10 ? 'bg-[#6E1373] text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    10
                  </button>
                </div>

                <button
                  disabled={versePage <= 1}
                  onClick={() => {
                    setVersePage(p => Math.max(1, p - 1));
                    window.scrollTo({ top: 320, behavior: 'smooth' });
                  }}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-purple-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-black text-slate-700 flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                {/* Page number buttons */}
                <div className="hidden sm:flex items-center gap-1">
                  {Array.from({ length: totalVersePages }, (_, i) => i + 1)
                    .filter(p => p === 1 || p === totalVersePages || Math.abs(p - versePage) <= 2)
                    .map((p, idx, arr) => (
                      <React.Fragment key={p}>
                        {idx > 0 && p - arr[idx - 1] > 1 && (
                          <span className="px-1 text-slate-400 text-xs">...</span>
                        )}
                        <button
                          onClick={() => {
                            setVersePage(p);
                            window.scrollTo({ top: 320, behavior: 'smooth' });
                          }}
                          className={`w-7 h-7 rounded-xl text-xs font-black transition cursor-pointer ${
                            versePage === p
                              ? 'bg-[#6E1373] text-white shadow-xs'
                              : 'bg-white hover:bg-purple-50 text-slate-700 border border-slate-200'
                          }`}
                        >
                          {p}
                        </button>
                      </React.Fragment>
                    ))}
                </div>

                <button
                  disabled={versePage >= totalVersePages}
                  onClick={() => {
                    setVersePage(p => Math.min(totalVersePages, p + 1));
                    window.scrollTo({ top: 320, behavior: 'smooth' });
                  }}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-purple-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-black text-slate-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Recitation Testing & Voice Recording Studio for this Surah */}
            {showStudio && (
              <div className="bg-white rounded-3xl border border-purple-100 p-5 sm:p-6 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <h4 className="font-black text-slate-900 text-base flex items-center gap-2">
                      <Mic className="w-4 h-4 text-[#6E1373]" />
                      <span>Interactive Recitation Voice & Speaking Studio (75% to Pass)</span>
                    </h4>
                    <p className="text-xs text-slate-500">
                      Listen to Sheikh recitation, record your voice, and test speech accuracy.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-xs font-bold text-slate-600">Select Ayah:</label>
                    <select
                      value={activeStudioAyahIndex}
                      onChange={(e) => setActiveStudioAyahIndex(Number(e.target.value))}
                      className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#6E1373]"
                    >
                      {currentSurahData.ayahs.map((ay, idx) => (
                        <option key={ay.numberInSurah} value={idx}>
                          Ayah {ay.numberInSurah}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {currentSurahData.ayahs[activeStudioAyahIndex] && (
                  <AyahRecitationStudio
                    surahNumber={currentSurahData.number}
                    surahName={currentSurahData.englishName}
                    totalVerses={currentSurahData.ayahsCount}
                    currentAyah={currentSurahData.ayahs[activeStudioAyahIndex]}
                    reciter={selectedReciter}
                    onSelectAyah={(num) => {
                      const idx = currentSurahData.ayahs.findIndex(a => a.numberInSurah === num);
                      if (idx !== -1) setActiveStudioAyahIndex(idx);
                    }}
                    onRecitationPassed={(_num, _score) => {
                      if (activeStudioAyahIndex + 1 < currentSurahData.ayahs.length) {
                        setActiveStudioAyahIndex(prev => prev + 1);
                      }
                    }}
                  />
                )}
              </div>
            )}

            {/* Bismillah Header (Except Surah At-Tawbah #9) */}
            {currentSurahData.number !== 9 && currentSurahData.number !== 1 && (
              <div className="bg-white rounded-2xl border border-purple-100 p-4 text-center shadow-2xs">
                <p className="text-2xl sm:text-3xl font-arabic font-bold text-[#6E1373]" dir="rtl">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  In the name of Allah, the Most Compassionate, the Most Merciful
                </p>
              </div>
            )}

            {/* PAGINATED AYAH LIST (10-15 Ayat per page) */}
            <div className="space-y-4">
              {currentPaginatedAyahs.map((ayah, pageRelativeIndex) => {
                const globalAyahIndex = currentVerseSliceStart + pageRelativeIndex;
                const isPlayingThis = playingAyahIndex === globalAyahIndex;
                const isBookmarked = isItemBookmarked(studentId, studentName, 'quran_ayah', {
                  surahNumber: currentSurahData.number,
                  ayahNumber: ayah.numberInSurah
                });
                const isHidden = hiddenAyahIndexes.has(globalAyahIndex);
                const wordByWordList = getAyahWordByWord(currentSurahData.number, ayah.numberInSurah, ayah.arabic);
                const insight = getAyahInsight(currentSurahData.number, ayah.numberInSurah);
                const tajweedTokens = parseTajweedTokens(ayah.arabic);

                return (
                  <div
                    key={ayah.numberInSurah}
                    id={`ayah-${ayah.numberInSurah}`}
                    className={`bg-white rounded-3xl border transition-all duration-300 p-5 sm:p-6 space-y-4 ${
                      isPlayingThis
                        ? 'border-amber-400 ring-2 ring-amber-200/60 shadow-lg'
                        : 'border-purple-100 hover:border-purple-200 shadow-2xs'
                    }`}
                  >
                    {/* Ayah Action Header */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-xl bg-purple-50 text-[#6E1373] font-black text-xs flex items-center justify-center">
                          {ayah.numberInSurah}
                        </span>
                        <span className="text-xs font-black text-slate-700">
                          {currentSurahData.englishName} : {ayah.numberInSurah}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            if (isPlayingThis) {
                              stopAudio();
                            } else {
                              playAyahAudio(globalAyahIndex);
                            }
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1 cursor-pointer ${
                            isPlayingThis
                              ? 'bg-amber-500 text-slate-950'
                              : 'bg-purple-50 hover:bg-[#6E1373] text-[#6E1373] hover:text-white'
                          }`}
                        >
                          {isPlayingThis ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                          <span>{isPlayingThis ? 'Pause' : 'Recite'}</span>
                        </button>

                        <button
                          onClick={() => {
                            setActiveStudioAyahIndex(globalAyahIndex);
                            setShowStudio(true);
                            window.scrollTo({ top: 380, behavior: 'smooth' });
                          }}
                          className="px-2.5 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-[#6E1373] text-xs font-bold transition cursor-pointer flex items-center gap-1"
                          title="Record your voice & test speaking accuracy (75% to pass)"
                        >
                          <Mic className="w-3.5 h-3.5 text-[#C72F8A]" />
                          <span className="hidden sm:inline">Voice & Test</span>
                        </button>

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

                        <button
                          onClick={() => handleSetLastPosition(ayah.numberInSurah)}
                          className="p-2 rounded-xl bg-slate-100 hover:bg-purple-100 hover:text-[#6E1373] text-slate-600 text-xs transition cursor-pointer"
                          title="Save as last reading bookmark"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>

                        {memorizationMode && (
                          <button
                            onClick={() => toggleHideAyah(globalAyahIndex)}
                            className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs transition cursor-pointer"
                            title="Reveal / Hide verse for memorization"
                          >
                            {isHidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Arabic Text (Color-Coded Tajweed or Classical Uthmani) */}
                    <div className="py-2 text-right">
                      {showColorTajweed ? (
                        <div 
                          dir="rtl"
                          className={`text-2xl sm:text-3xl lg:text-4xl font-arabic text-slate-900 leading-loose transition select-text flex flex-wrap items-center justify-start gap-x-2 gap-y-1 ${
                            isHidden ? 'blur-md select-none' : ''
                          }`}
                        >
                          {tajweedTokens.map((t, tIdx) => (
                            <span 
                              key={tIdx} 
                              style={{ color: t.colorHex || '#0f172a' }}
                              className={`rounded px-0.5 transition-colors ${t.bgHex ? 'hover:bg-amber-50' : ''}`}
                              title={t.ruleName || undefined}
                            >
                              {t.text}
                            </span>
                          ))}
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-purple-300 bg-purple-50 text-xs text-[#6E1373] font-sans mr-2 align-middle">
                            {ayah.numberInSurah}
                          </span>
                        </div>
                      ) : (
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
                      )}
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

            {/* Bottom Ayat Pagination Controls */}
            <div className="bg-white p-4 rounded-2xl border border-purple-100 shadow-xs flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-600 font-bold">
                Page {versePage} of {totalVersePages} (Showing {currentVerseSliceStart + 1}–{currentVerseSliceEnd} of {totalVerses} Ayat)
              </span>

              <div className="flex items-center gap-2">
                <button
                  disabled={versePage <= 1}
                  onClick={() => {
                    setVersePage(p => Math.max(1, p - 1));
                    window.scrollTo({ top: 320, behavior: 'smooth' });
                  }}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-purple-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-black text-slate-700 flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous {ayahsPerPage} Ayat</span>
                </button>

                <button
                  disabled={versePage >= totalVersePages}
                  onClick={() => {
                    setVersePage(p => Math.min(totalVersePages, p + 1));
                    window.scrollTo({ top: 320, behavior: 'smooth' });
                  }}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-purple-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-black text-slate-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>Next {ayahsPerPage} Ayat</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Surah Navigation Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <button
                onClick={() => {
                  if (currentSurahData.number > 1) {
                    handleOpenSurahReader(currentSurahData.number - 1);
                  }
                }}
                disabled={currentSurahData.number <= 1}
                className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs sm:text-sm font-bold text-slate-700 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2"
              >
                <span>← Previous Surah</span>
              </button>

              <button
                onClick={() => {
                  setViewMode('directory');
                  window.scrollTo({ top: 100, behavior: 'smooth' });
                }}
                className="text-xs text-[#6E1373] hover:underline font-bold"
              >
                Return to Surah Directory
              </button>

              <button
                onClick={() => {
                  if (currentSurahData.number < 114) {
                    handleOpenSurahReader(currentSurahData.number + 1);
                  }
                }}
                disabled={currentSurahData.number >= 114}
                className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs sm:text-sm font-bold text-slate-700 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2"
              >
                <span>Next Surah →</span>
              </button>
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  // ==========================================
  // VIEW 1: SURAH DIRECTORY SELECTION PAGE
  // ==========================================
  return (
    <div className="space-y-6 animate-fadeIn">
      
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
            Student Portal / Holy Quran (114 Surahs Directory)
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
              Select any of the 114 Surahs below to open the dedicated reader page with 10–15 Ayat per page, voice assessment, word-by-word meaning, and audio recitations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {/* Color Coded Tajweed Section Button */}
            <button
              onClick={() => {
                setViewMode('tajweed_mushaf');
                window.scrollTo({ top: 100, behavior: 'smooth' });
              }}
              className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-sm transition flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Color-Coded Tajweed (30 Paras & PDFs)</span>
            </button>

            {/* Quick Resume Button */}
            {profile.lastReadingPosition && (
              <button
                onClick={() => handleOpenSurahReader(profile.lastReadingPosition.surahNumber)}
                className="px-4 py-2.5 bg-white/20 hover:bg-white/30 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Resume: Surah {profile.lastReadingPosition.surahName} (Ayah {profile.lastReadingPosition.ayahNumber})</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Surah Selector, Search & Direct Jump Controls */}
      <div className="bg-white rounded-3xl border border-purple-100 p-5 sm:p-6 shadow-xs space-y-4">
        
        {/* Search & Juz Filter */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          {/* Search Box */}
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSurahPage(1);
              }}
              placeholder="Search by Surah name, English title, or number (e.g. 18, Kahf, Baqarah)..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6E1373] text-slate-900"
            />
          </div>

          {/* Juz Filter */}
          <div className="md:col-span-4">
            <select
              value={selectedJuz}
              onChange={(e) => {
                setSelectedJuz(e.target.value === 'all' ? 'all' : parseInt(e.target.value, 10));
                setSurahPage(1);
              }}
              aria-label="Filter Surahs by Juz / Para"
              className="w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6E1373] text-slate-800"
            >
              <option value="all">All Juz / Paras (1 to 30)</option>
              {Array.from({ length: 30 }, (_, i) => i + 1).map(juz => (
                <option key={juz} value={juz}>Juz {juz}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Direct Jump to Surah Bar */}
        <div className="p-3.5 bg-purple-50/80 border border-purple-200 rounded-2xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label className="text-xs font-black text-[#6E1373] flex items-center gap-1.5 shrink-0">
              <Compass className="w-4 h-4 text-[#851C82]" />
              <span>Direct Jump to Surah:</span>
            </label>
            <select
              value={selectedSurahNumber}
              onChange={(e) => handleOpenSurahReader(Number(e.target.value))}
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

        {/* 15 Surahs Per Page Grid with Click-to-Open Next Page */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-700">
              Surah Directory: Page {surahPage} of {totalSurahPages} (15 Surahs on this page)
            </span>
            <span className="text-[11px] text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded-full">
              Click any Surah to open on next page
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {pageSurahs.map((s) => (
              <button
                key={s.number}
                onClick={() => handleOpenSurahReader(s.number)}
                className="p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between space-y-2 cursor-pointer bg-white border-slate-200 hover:border-[#6E1373] hover:shadow-md hover:-translate-y-0.5 group"
              >
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-lg bg-purple-100 group-hover:bg-[#6E1373] group-hover:text-white text-[#6E1373] flex items-center justify-center font-black text-xs transition">
                    {s.number}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md font-semibold bg-slate-100 text-slate-600">
                    {s.revelationType}
                  </span>
                </div>

                <div>
                  <div className="font-black text-xs truncate group-hover:text-[#6E1373] transition">
                    {s.englishName}
                  </div>
                  <div className="text-[10px] truncate text-slate-500">
                    {s.englishTranslation}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-1.5">
                  <span className="text-[10px] text-slate-400">
                    {s.ayahsCount} Verses
                  </span>
                  <span className="font-arabic text-sm font-bold text-[#6E1373]" dir="rtl">
                    {s.name}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Directory Pagination Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
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

    </div>
  );
};
