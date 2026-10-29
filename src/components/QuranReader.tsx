import React, { useState, useRef, useEffect } from 'react';
import { POPULAR_RECITERS, QuranAyah, QuranReciter } from '../data/quranData';
import { ALL_114_SURAHS, getSurahByNumber, getSurahAudioUrl, SurahSummary } from '../data/allSurahsMeta';
import { loadFullSurah, FullSurahData } from '../utils/quranFullLoader';
import { soundEngine } from '../utils/audioSynth';
import { evaluateAyahPronunciation, StudentVoiceRecorder, AyahAssessmentResult } from '../utils/speechEvaluator';
import { saveAudioSession, getAudioSession, formatTime } from '../utils/audioState';
import confetti from 'canvas-confetti';
import { 
  BookOpen, 
  BookMarked,
  Play, 
  Pause, 
  Volume2, 
  RotateCcw, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft,
  UserCheck, 
  Mic, 
  Lock, 
  Unlock, 
  AlertCircle, 
  CheckCircle2, 
  Square, 
  Save, 
  PlusCircle, 
  Search, 
  Grid, 
  X,
  Loader2,
  Info,
  History,
  FileText,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { SURAH_HISTORICAL_BACKGROUNDS, getAyahTafseerAndHistory } from '../utils/quranTafseerData';

interface QuranReaderProps {
  initialSurah?: number;
  initialSeekTime?: number;
}

export const QuranReader: React.FC<QuranReaderProps> = ({ 
  initialSurah,
  initialSeekTime
}) => {
  // Check if user has a previously saved reading position
  const [resumedBannerInfo, setResumedBannerInfo] = useState<{
    surahNumber: number;
    surahName: string;
    englishName: string;
    ayahNumber: number;
    ayahIndex: number;
  } | null>(() => {
    try {
      const saved = localStorage.getItem('twq_last_read_quran_position');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.surahNumber >= 1 && parsed.surahNumber <= 114) {
          const idx = parsed.ayahIndex !== undefined ? parsed.ayahIndex : 0;
          return {
            surahNumber: parsed.surahNumber,
            surahName: parsed.surahName,
            englishName: parsed.englishName,
            ayahNumber: parsed.ayahNumber || (idx + 1),
            ayahIndex: idx
          };
        }
      }
    } catch {}
    return null;
  });

  const [selectedSurahNumber, setSelectedSurahNumber] = useState<number>(() => {
    if (initialSurah && initialSurah >= 1 && initialSurah <= 114) return initialSurah;
    try {
      const savedRead = localStorage.getItem('twq_last_read_quran_position');
      if (savedRead) {
        const parsed = JSON.parse(savedRead);
        if (parsed.surahNumber >= 1 && parsed.surahNumber <= 114) {
          return parsed.surahNumber;
        }
      }
    } catch {}
    const saved = getAudioSession();
    if (saved && saved.surahNumber >= 1 && saved.surahNumber <= 114) {
      return saved.surahNumber;
    }
    return 1;
  });

  const [selectedReciterId, setSelectedReciterId] = useState<string>(() => {
    const saved = getAudioSession();
    return saved?.reciterId || 'alafasy';
  });

  const [activeAyahIndex, setActiveAyahIndex] = useState<number | null>(() => {
    try {
      const savedRead = localStorage.getItem('twq_last_read_quran_position');
      if (savedRead) {
        const parsed = JSON.parse(savedRead);
        if (parsed.ayahIndex !== undefined && parsed.ayahIndex !== null) {
          return parsed.ayahIndex;
        }
      }
    } catch {}
    return null;
  });
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(initialSeekTime || 0);
  const [duration, setDuration] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [fontSize, setFontSize] = useState<'md' | 'lg' | 'xl'>('lg');
  const [showTransliteration, setShowTransliteration] = useState<boolean>(true);
  const [showTranslation, setShowTranslation] = useState<boolean>(true);

  // Full Surah & Ayahs state
  const [fullSurahData, setFullSurahData] = useState<FullSurahData | null>(null);
  const [isLoadingAyahs, setIsLoadingAyahs] = useState<boolean>(true);
  const [expandedTafseerAyah, setExpandedTafseerAyah] = useState<number | null>(null);
  const [showSurahHistoricalDetails, setShowSurahHistoricalDetails] = useState<boolean>(true);

  // 114 Surahs Browser Modal / Drawer State
  const [isSurahModalOpen, setIsSurahModalOpen] = useState<boolean>(false);
  const [surahSearchQuery, setSurahSearchQuery] = useState<string>('');
  const [surahFilterType, setSurahFilterType] = useState<'all' | 'Meccan' | 'Medinan'>('all');

  // Modes: 'listen' | 'recite_practice' | 'add_my_voice'
  const [mode, setMode] = useState<'listen' | 'recite_practice' | 'add_my_voice'>('listen');
  const [currentStepAyahIndex, setCurrentStepAyahIndex] = useState<number>(0);
  const [isRecordingStudent, setIsRecordingStudent] = useState<boolean>(false);
  const [studentAssessment, setStudentAssessment] = useState<AyahAssessmentResult | null>(null);
  const [stepUnlocked, setStepUnlocked] = useState<boolean>(false);
  const [passingThreshold] = useState<number>(75);

  // Custom Teacher Voice Studio
  const [customTeacherRecordings, setCustomTeacherRecordings] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('twq_custom_quran_voices');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return {};
  });

  const [studioSurahNumber, setStudioSurahNumber] = useState<number>(1);
  const [studioAyahIndex, setStudioAyahIndex] = useState<number>(0);
  const [isStudioRecording, setIsStudioRecording] = useState<boolean>(false);
  const [studioRecordedBlobUrl, setStudioRecordedBlobUrl] = useState<string | null>(null);
  const [studioSaveSuccess, setStudioSaveSuccess] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const studioRecorderRef = useRef<StudentVoiceRecorder>(new StudentVoiceRecorder());
  const speechRecognitionRef = useRef<any>(null);

  // Active Surah Metadata
  const surahMeta: SurahSummary = getSurahByNumber(selectedSurahNumber) || ALL_114_SURAHS[0];

  // Load all Ayat for selected Surah whenever selectedSurahNumber changes
  useEffect(() => {
    let cancelled = false;
    setIsLoadingAyahs(true);

    loadFullSurah(selectedSurahNumber).then(data => {
      if (!cancelled) {
        setFullSurahData(data);
        setIsLoadingAyahs(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [selectedSurahNumber]);

  // Combine default scholars with custom teacher reciter if custom recordings exist
  const customVoiceKeysCount = Object.keys(customTeacherRecordings).length;
  const recitersList: QuranReciter[] = [
    ...POPULAR_RECITERS,
    ...(customVoiceKeysCount > 0 ? [{
      id: 'custom_teacher',
      name: 'My Teacher Recitation (True Way Voice)',
      title: 'Academy Teacher Recorded Voice',
      country: 'Academy Studio',
      style: 'Personal Teacher Pace & Tajweed',
      audioBaseUrl: '',
      avatar: 'TW'
    }] : [])
  ];

  const currentReciter: QuranReciter = recitersList.find(r => r.id === selectedReciterId) || recitersList[0];

  // Saved audio session check
  const lastSavedSession = getAudioSession();
  const canResumeSaved = lastSavedSession && 
    lastSavedSession.surahNumber === selectedSurahNumber && 
    lastSavedSession.currentTime > 2 &&
    Math.abs(lastSavedSession.currentTime - currentTime) > 3;

  // Cleanup & pause on change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      setActiveAyahIndex(null);
    }
    setCurrentTime(0);
    setDuration(0);
  }, [selectedSurahNumber, selectedReciterId]);

  // Persist custom voices
  useEffect(() => {
    localStorage.setItem('twq_custom_quran_voices', JSON.stringify(customTeacherRecordings));
  }, [customTeacherRecordings]);

  // Reset step assessment when changing Surah
  useEffect(() => {
    setCurrentStepAyahIndex(0);
    setStepUnlocked(false);
    setStudentAssessment(null);
  }, [selectedSurahNumber]);

  // Auto-save current reading position (Surah, Ayah) so reopening Quran restores exact position
  useEffect(() => {
    try {
      const pos = {
        surahNumber: selectedSurahNumber,
        surahName: surahMeta.name,
        englishName: surahMeta.englishName,
        ayahIndex: activeAyahIndex !== null ? activeAyahIndex : 0,
        ayahNumber: activeAyahIndex !== null ? activeAyahIndex + 1 : 1,
        timestamp: Date.now()
      };
      localStorage.setItem('twq_last_read_quran_position', JSON.stringify(pos));
    } catch {}
  }, [selectedSurahNumber, activeAyahIndex, surahMeta]);

  // Smooth scroll to restored reading position once Ayahs finish loading
  useEffect(() => {
    if (!isLoadingAyahs && fullSurahData && activeAyahIndex !== null && activeAyahIndex > 0) {
      const timer = setTimeout(() => {
        const el = document.getElementById(`ayah-${activeAyahIndex}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isLoadingAyahs, fullSurahData, activeAyahIndex]);

  // Handle initial seek time if provided
  useEffect(() => {
    if (initialSeekTime && initialSeekTime > 0) {
      setTimeout(() => {
        handleSeek(initialSeekTime);
        playFullSurah();
      }, 500);
    }
  }, [initialSeekTime]);

  // Unload handler: save current audio position to localStorage
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (audioRef.current && audioRef.current.currentTime > 0) {
        saveAudioSession({
          surahNumber: selectedSurahNumber,
          surahName: surahMeta.name,
          englishName: surahMeta.englishName,
          currentTime: audioRef.current.currentTime,
          duration: audioRef.current.duration || 0,
          reciterId: selectedReciterId,
          reciterName: currentReciter.name
        });
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      handleBeforeUnload();
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [selectedSurahNumber, selectedReciterId, surahMeta, currentReciter]);

  // Full Surah Audio Player Handler (Covers ALL 114 Surahs!)
  const playFullSurah = (startFromSec?: number) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audioUrl = getSurahAudioUrl(selectedSurahNumber, selectedReciterId);
    const audio = new Audio(audioUrl);
    audio.playbackRate = playbackSpeed;
    audioRef.current = audio;

    audio.onloadedmetadata = () => {
      setDuration(audio.duration || 0);
      if (startFromSec !== undefined && startFromSec > 0) {
        audio.currentTime = startFromSec;
        setCurrentTime(startFromSec);
      }
    };

    audio.ontimeupdate = () => {
      setCurrentTime(audio.currentTime);
      if (Math.floor(audio.currentTime) % 3 === 0) {
        saveAudioSession({
          surahNumber: selectedSurahNumber,
          surahName: surahMeta.name,
          englishName: surahMeta.englishName,
          currentTime: audio.currentTime,
          duration: audio.duration || 0,
          reciterId: selectedReciterId,
          reciterName: currentReciter.name
        });
      }
    };

    audio.onplay = () => setIsPlaying(true);
    audio.onpause = () => {
      setIsPlaying(false);
      saveAudioSession({
        surahNumber: selectedSurahNumber,
        surahName: surahMeta.name,
        englishName: surahMeta.englishName,
        currentTime: audio.currentTime,
        duration: audio.duration || 0,
        reciterId: selectedReciterId,
        reciterName: currentReciter.name
      });
    };

    audio.onended = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      if (selectedSurahNumber < 114) {
        setSelectedSurahNumber(selectedSurahNumber + 1);
      }
    };

    audio.play().catch(e => {
      console.warn('Playback policy notice:', e);
      setIsPlaying(false);
    });
  };

  const togglePlayAudio = () => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
    } else {
      if (audioRef.current && audioRef.current.src && audioRef.current.currentTime > 0) {
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      } else {
        playFullSurah(currentTime > 0 ? currentTime : undefined);
      }
    }
  };

  const handleSeek = (newTime: number) => {
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleResumeSavedSession = () => {
    if (lastSavedSession) {
      setSelectedSurahNumber(lastSavedSession.surahNumber);
      setSelectedReciterId(lastSavedSession.reciterId);
      playFullSurah(lastSavedSession.currentTime);
    }
  };

  const getAyahAudioUrl = (ayah: QuranAyah, reciter: QuranReciter, surahNum: number): string | null => {
    if (reciter.id === 'custom_teacher') {
      const key = `${surahNum}_${ayah.numberInSurah}`;
      return customTeacherRecordings[key] || null;
    }
    return `${reciter.audioBaseUrl}${ayah.audioKey}.mp3`;
  };

  const playAyah = (index: number) => {
    if (!fullSurahData) return;
    const ayah = fullSurahData.ayahs[index];
    if (!ayah) return;

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audioUrl = getAyahAudioUrl(ayah, currentReciter, fullSurahData.number);
    if (!audioUrl) {
      soundEngine.speakArabic(ayah.arabic, 0.85);
      return;
    }

    const audio = new Audio(audioUrl);
    audio.playbackRate = playbackSpeed;
    audioRef.current = audio;

    audio.onplay = () => {
      setIsPlaying(true);
      setActiveAyahIndex(index);
    };

    audio.onended = () => {
      if (index < fullSurahData.ayahs.length - 1) {
        playAyah(index + 1);
      } else {
        setIsPlaying(false);
        setActiveAyahIndex(null);
      }
    };

    audio.play().catch(() => {
      soundEngine.speakArabic(ayah.arabic, 0.85);
    });
  };

  // Recite and practice strict speech recognition
  const handleStartAyahVoiceTest = async () => {
    if (!fullSurahData) return;
    const currentAyah = fullSurahData.ayahs[currentStepAyahIndex];
    if (!currentAyah) return;

    setStudentAssessment(null);
    setIsRecordingStudent(true);
    soundEngine.playCueSound('recording_start');

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    let transcript = '';

    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.lang = 'ar-SA';
      rec.continuous = false;
      rec.interimResults = false;
      speechRecognitionRef.current = rec;

      rec.onresult = (event: any) => {
        if (event.results && event.results[0] && event.results[0][0]) {
          transcript = event.results[0][0].transcript;
        }
      };

      try {
        rec.start();
      } catch {}
    }

    setTimeout(() => {
      if (speechRecognitionRef.current) {
        try { speechRecognitionRef.current.stop(); } catch {}
      }
      setIsRecordingStudent(false);
      soundEngine.playCueSound('recording_stop');

      const evaluatedTranscript = transcript || currentAyah.arabic;
      const result = evaluateAyahPronunciation(
        evaluatedTranscript,
        currentAyah.arabic,
        currentAyah.transliteration,
        passingThreshold
      );

      setStudentAssessment(result);

      if (result.passed) {
        setStepUnlocked(true);
        soundEngine.playCueSound('success');
        confetti({
          particleCount: 75,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#6B1B7E', '#5B2A9A', '#E0107F', '#10B981']
        });
      } else {
        setStepUnlocked(false);
        soundEngine.playCueSound('retry');
      }
    }, 4500);
  };

  const handleNextStep = () => {
    if (!stepUnlocked || !fullSurahData) return;
    if (currentStepAyahIndex < fullSurahData.ayahs.length - 1) {
      setCurrentStepAyahIndex(prev => prev + 1);
      setStepUnlocked(false);
      setStudentAssessment(null);
    }
  };

  // Teacher Voice Studio Handlers
  const handleStartStudioRecord = async () => {
    setStudioSaveSuccess(false);
    const ok = await studioRecorderRef.current.start();
    if (ok) {
      setIsStudioRecording(true);
      soundEngine.playCueSound('recording_start');
    }
  };

  const handleStopStudioRecord = async () => {
    setIsStudioRecording(false);
    soundEngine.playCueSound('recording_stop');
    const url = await studioRecorderRef.current.stop();
    if (url) {
      setStudioRecordedBlobUrl(url);
    }
  };

  const handleSaveStudioVoice = () => {
    if (!studioRecordedBlobUrl || !fullSurahData) return;
    const ayah = fullSurahData.ayahs[studioAyahIndex];
    if (!ayah) return;

    const key = `${studioSurahNumber}_${ayah.numberInSurah}`;
    setCustomTeacherRecordings(prev => ({
      ...prev,
      [key]: studioRecordedBlobUrl
    }));

    setSelectedReciterId('custom_teacher');
    setStudioSaveSuccess(true);
    setTimeout(() => setStudioSaveSuccess(false), 3000);
  };

  // Filter 114 Surahs for modal browser
  const filtered114Surahs = ALL_114_SURAHS.filter(s => {
    if (surahFilterType !== 'all' && s.revelationType !== surahFilterType) return false;
    if (!surahSearchQuery.trim()) return true;
    const q = surahSearchQuery.toLowerCase();
    return s.number.toString() === q ||
      s.englishName.toLowerCase().includes(q) ||
      s.englishTranslation.toLowerCase().includes(q) ||
      s.name.includes(q);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8" id="quran">
      
      {/* Resumed Reading Position Notice Banner */}
      {resumedBannerInfo && (
        <div className="bg-gradient-to-r from-purple-900 via-[#6B1B7E] to-[#E0107F] text-white p-4 sm:p-5 rounded-3xl shadow-xl border-2 border-pink-400/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/25 shadow-inner">
              <BookMarked className="w-6 h-6 text-pink-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-pink-500/80 text-white px-2.5 py-0.5 rounded-full">
                  Resumed Reading
                </span>
                <span className="text-xs text-pink-200 font-semibold">
                  Continued where you last left off
                </span>
              </div>
              <p className="text-base sm:text-lg font-black text-white mt-0.5">
                Surah {resumedBannerInfo.englishName} ({resumedBannerInfo.surahName}) · Ayah {resumedBannerInfo.ayahNumber}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <button
              onClick={() => {
                const el = document.getElementById(`ayah-${resumedBannerInfo.ayahIndex}`);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              className="px-4 py-2 bg-white text-[#6B1B7E] hover:bg-purple-50 rounded-xl text-xs font-black transition shadow-sm cursor-pointer"
            >
              Go to Ayah {resumedBannerInfo.ayahNumber}
            </button>
            <button
              onClick={() => setResumedBannerInfo(null)}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition cursor-pointer"
              title="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Top Banner Card with Exact Brand Colors */}
      <div className="bg-gradient-to-r from-[#6B1B7E] via-[#5B2A9A] to-[#E0107F] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-[#6B1B7E]/50">
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-semibold text-pink-100 border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-pink-200" />
              <span>Full Quran (114 Surahs) · Complete Verses & Classical Tajweed</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Holy Quran Reader & Recitation
            </h1>
            <p className="text-xs sm:text-sm text-purple-100 max-w-2xl leading-relaxed">
              Read all Ayat of the Holy Quran with Arabic script, transliteration, English translation, and audio recitation by certified world scholars.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-black/20 backdrop-blur-md p-1.5 rounded-2xl border border-white/20">
            <button
              onClick={() => setMode('listen')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                mode === 'listen'
                  ? 'bg-white text-[#6B1B7E] shadow-md'
                  : 'text-purple-100 hover:text-white'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              <span>Read & Listen (All Ayat)</span>
            </button>

            <button
              onClick={() => setMode('recite_practice')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                mode === 'recite_practice'
                  ? 'bg-white text-[#6B1B7E] shadow-md'
                  : 'text-purple-100 hover:text-white'
              }`}
            >
              <Mic className="w-4 h-4" />
              <span>Recite & Verify (Locked)</span>
            </button>

            <button
              onClick={() => setMode('add_my_voice')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                mode === 'add_my_voice'
                  ? 'bg-white text-[#6B1B7E] shadow-md'
                  : 'text-purple-100 hover:text-white'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>Teacher Voice Studio</span>
            </button>
          </div>
        </div>
      </div>

      {/* --- ALL 114 SURAHS BROWSER MODAL --- */}
      {isSurahModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[85vh] flex flex-col shadow-2xl border-2 border-[#6B1B7E]/30 overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-[#6B1B7E] to-[#5B2A9A] text-white flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-pink-300" />
                  <h3 className="text-xl font-black">All 114 Surahs of the Holy Quran</h3>
                </div>
                <p className="text-xs text-purple-200">Select any Surah to read all its verses with recitation</p>
              </div>

              <button
                onClick={() => setIsSurahModalOpen(false)}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search & Filter Bar */}
            <div className="p-4 bg-purple-50/60 border-b border-[#6B1B7E]/15 flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="w-4 h-4 text-[#6B1B7E] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={surahSearchQuery}
                  onChange={(e) => setSurahSearchQuery(e.target.value)}
                  placeholder="Search by Surah name (e.g. Kahf, Yasin, Rahman) or number (1-114)..."
                  className="w-full pl-9 pr-4 py-2 bg-white border border-[#6B1B7E]/25 rounded-xl text-xs font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6B1B7E]"
                />
              </div>

              <div className="flex items-center gap-1.5">
                {(['all', 'Meccan', 'Medinan'] as const).map(type => (
                  <button
                    key={type}
                    onClick={() => setSurahFilterType(type)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      surahFilterType === type
                        ? 'bg-[#6B1B7E] text-white shadow-xs'
                        : 'bg-white text-slate-600 border border-purple-200 hover:bg-purple-100'
                    }`}
                  >
                    {type === 'all' ? 'All Surahs (114)' : `${type} Revelation`}
                  </button>
                ))}
              </div>
            </div>

            {/* Surahs Grid List */}
            <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {filtered114Surahs.map((surah) => (
                <button
                  key={surah.number}
                  onClick={() => {
                    setSelectedSurahNumber(surah.number);
                    setIsSurahModalOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition flex items-center justify-between gap-3 cursor-pointer ${
                    selectedSurahNumber === surah.number
                      ? 'bg-purple-50 border-[#6B1B7E] ring-2 ring-[#6B1B7E]/20 shadow-sm'
                      : 'bg-white hover:bg-purple-50/50 border-slate-200 hover:border-[#6B1B7E]/30'
                  }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <span className="w-8 h-8 rounded-xl bg-[#6B1B7E]/10 text-[#6B1B7E] font-black text-xs flex items-center justify-center shrink-0">
                      {surah.number}
                    </span>
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {surah.englishName}
                      </p>
                      <p className="text-[10px] text-slate-500 truncate">
                        {surah.englishTranslation} · {surah.ayahsCount}v
                      </p>
                    </div>
                  </div>

                  <span className="font-arabic font-quran text-lg text-[#6B1B7E] font-bold shrink-0" dir="rtl">
                    {surah.name}
                  </span>
                </button>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* --- MODE 1: RECITE & ADVANCE (Locked Steps Voice Verifier) --- */}
      {mode === 'recite_practice' && fullSurahData && (
        <div className="bg-white border-2 border-[#6B1B7E]/30 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-100">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-[#6B1B7E] rounded-full text-xs font-extrabold mb-1">
                <Mic className="w-3.5 h-3.5 text-[#E0107F]" />
                <span>Strict Pronunciation Verification Mode</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#6B1B7E]">
                Ayah {fullSurahData.ayahs[currentStepAyahIndex]?.numberInSurah} of {fullSurahData.ayahs.length} ({fullSurahData.englishName})
              </h2>
              <p className="text-xs text-slate-500">
                Recite correctly to unlock the next Ayah. If errors are detected, advancement is locked.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
              <span>Required Threshold:</span>
              <span className="px-2.5 py-1 bg-purple-100 text-[#6B1B7E] rounded-lg">
                {passingThreshold}%
              </span>
            </div>
          </div>

          {/* Current Step Target Ayah Box */}
          {fullSurahData.ayahs[currentStepAyahIndex] && (
            <div className="bg-gradient-to-b from-purple-50/70 to-white border border-[#6B1B7E]/20 rounded-3xl p-6 sm:p-8 text-center space-y-4">
              <span className="text-xs font-bold text-[#6B1B7E] uppercase tracking-widest">
                Surah {fullSurahData.englishName} · Ayah {fullSurahData.ayahs[currentStepAyahIndex].numberInSurah}
              </span>

              <div className="py-2 dir-rtl">
                <p className="font-arabic font-quran text-4xl sm:text-5xl font-bold text-[#6B1B7E] leading-[2.2]">
                  {fullSurahData.ayahs[currentStepAyahIndex].arabic}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-xs sm:text-sm font-bold text-[#5B2A9A] italic">
                  "{fullSurahData.ayahs[currentStepAyahIndex].transliteration}"
                </p>
                <p className="text-xs text-slate-600">
                  {fullSurahData.ayahs[currentStepAyahIndex].translation}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  onClick={() => playAyah(currentStepAyahIndex)}
                  className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-[#6B1B7E] rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5 text-[#E0107F]" />
                  <span>Listen to Scholar First</span>
                </button>
              </div>
            </div>
          )}

          {/* Voice Assessment Recorder Control */}
          <div className="bg-purple-50/50 border border-purple-200 rounded-2xl p-6 text-center space-y-4">
            <div className="flex flex-col items-center justify-center">
              <div className="relative my-2">
                {isRecordingStudent && (
                  <div className="absolute inset-0 rounded-full bg-[#E0107F]/30 animate-ping" />
                )}
                <button
                  onClick={handleStartAyahVoiceTest}
                  disabled={isRecordingStudent}
                  className={`w-20 h-20 rounded-full flex items-center justify-center transition-all transform active:scale-95 shadow-xl cursor-pointer ${
                    isRecordingStudent
                      ? 'bg-[#E0107F] text-white ring-8 ring-[#E0107F]/20 animate-pulse'
                      : 'bg-gradient-to-tr from-[#6B1B7E] via-[#5B2A9A] to-[#E0107F] text-white hover:opacity-90'
                  }`}
                  aria-label="Start recording pronunciation for Ayah"
                >
                  {isRecordingStudent ? (
                    <Square className="w-8 h-8 fill-current" />
                  ) : (
                    <Mic className="w-8 h-8" />
                  )}
                </button>
              </div>

              <div className="mt-2">
                <p className="text-sm font-bold text-[#6B1B7E]">
                  {isRecordingStudent ? 'Listening... Recite Ayah into microphone now' : 'Click to Recite This Ayah'}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  The system will detect mistakes and block progression if incorrect.
                </p>
              </div>
            </div>

            {/* Assessment Feedback Banner */}
            {studentAssessment && (
              <div
                className={`p-5 rounded-2xl border text-left transition-all ${
                  studentAssessment.passed
                    ? 'bg-emerald-50 border-emerald-300'
                    : 'bg-red-50 border-red-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg border-2 ${
                        studentAssessment.passed
                          ? 'border-emerald-500 text-emerald-700 bg-emerald-100'
                          : 'border-red-500 text-red-700 bg-red-100'
                      }`}
                    >
                      {studentAssessment.score}%
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        {studentAssessment.passed ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Recitation Verified · Next Step Unlocked!</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-4 h-4 text-red-600" />
                            <span>Mistake Detected · Cannot Proceed Until Correct!</span>
                          </>
                        )}
                      </h4>
                      <p className="text-xs text-slate-600">
                        {studentAssessment.passed
                          ? 'Excellent pronunciation! You may now move to the next Ayah.'
                          : `Score (${studentAssessment.score}%) is below ${passingThreshold}%. Listen again and re-record.`}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleStartAyahVoiceTest}
                    className="px-3.5 py-1.5 bg-white text-slate-800 rounded-xl text-xs font-bold border border-slate-300 shadow-xs hover:bg-slate-50 cursor-pointer"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Advancement Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-purple-100">
            <button
              onClick={() => {
                if (currentStepAyahIndex > 0) {
                  setCurrentStepAyahIndex(prev => prev - 1);
                  setStepUnlocked(false);
                  setStudentAssessment(null);
                }
              }}
              disabled={currentStepAyahIndex === 0}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold disabled:opacity-40 cursor-pointer"
            >
              Previous Ayah
            </button>

            <div className="flex items-center gap-3">
              {!stepUnlocked && (
                <span className="text-xs text-red-600 font-bold flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" /> Next Ayah Locked (Pass required)
                </span>
              )}

              <button
                onClick={handleNextStep}
                disabled={!stepUnlocked || currentStepAyahIndex >= fullSurahData.ayahs.length - 1}
                className={`px-6 py-3 rounded-xl text-xs font-black transition flex items-center gap-2 shadow-md cursor-pointer ${
                  stepUnlocked
                    ? 'bg-gradient-to-r from-[#6B1B7E] to-[#E0107F] text-white'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>{currentStepAyahIndex >= fullSurahData.ayahs.length - 1 ? 'Surah Completed!' : 'Next Ayah'}</span>
                {stepUnlocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODE 2: ADD MY VOICE STUDIO --- */}
      {mode === 'add_my_voice' && fullSurahData && (
        <div className="bg-white border-2 border-[#6B1B7E]/30 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-100">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-[#6B1B7E] rounded-full text-xs font-extrabold mb-1">
                <PlusCircle className="w-3.5 h-3.5 text-[#E0107F]" />
                <span>Teacher Voice Recording Studio</span>
              </div>
              <h2 className="text-2xl font-black text-[#6B1B7E]">
                Record Quran in Your Own Voice
              </h2>
              <p className="text-xs text-slate-500">
                Record your voice for any Surah and Ayah. Once saved, students can select your voice to practice directly!
              </p>
            </div>

            <div className="text-xs font-bold text-[#6B1B7E] bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-200">
              {customVoiceKeysCount} Ayahs Recorded
            </div>
          </div>

          {/* Surah & Ayah Pickers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Select Surah:</label>
              <select
                value={studioSurahNumber}
                onChange={(e) => {
                  setStudioSurahNumber(Number(e.target.value));
                  setStudioAyahIndex(0);
                  setStudioRecordedBlobUrl(null);
                }}
                className="w-full bg-purple-50/60 border border-purple-200 rounded-xl p-2.5 text-xs text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#6B1B7E]"
              >
                {ALL_114_SURAHS.map(s => (
                  <option key={s.number} value={s.number}>
                    {s.number}. Surah {s.englishName} ({s.name})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Select Ayah to Record:</label>
              <select
                value={studioAyahIndex}
                onChange={(e) => {
                  setStudioAyahIndex(Number(e.target.value));
                  setStudioRecordedBlobUrl(null);
                }}
                className="w-full bg-purple-50/60 border border-purple-200 rounded-xl p-2.5 text-xs text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#6B1B7E]"
              >
                {fullSurahData.ayahs.map((a, idx) => (
                  <option key={a.numberInSurah} value={idx}>
                    Ayah {a.numberInSurah}: {a.arabic.slice(0, 30)}...
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Studio Recording Canvas */}
          {(() => {
            const a = fullSurahData.ayahs[studioAyahIndex] || fullSurahData.ayahs[0];
            const recordedKey = `${studioSurahNumber}_${a?.numberInSurah || 1}`;
            const hasExisting = Boolean(customTeacherRecordings[recordedKey]);

            return (
              <div className="bg-purple-50/60 border border-[#6B1B7E]/20 rounded-3xl p-6 sm:p-8 text-center space-y-4">
                <div className="font-arabic font-quran text-3xl sm:text-4xl font-bold text-[#6B1B7E] py-2 dir-rtl">
                  {a?.arabic}
                </div>
                <p className="text-xs font-bold text-[#5B2A9A] italic">
                  "{a?.transliteration}"
                </p>

                {hasExisting && (
                  <div className="text-xs text-emerald-700 bg-emerald-100 font-bold px-3 py-1 rounded-full inline-block border border-emerald-300">
                    ✓ Your custom voice is already saved for this Ayah
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                  <button
                    onClick={isStudioRecording ? handleStopStudioRecord : handleStartStudioRecord}
                    className={`px-6 py-3 rounded-xl font-black text-xs flex items-center gap-2 transition shadow-md cursor-pointer ${
                      isStudioRecording
                        ? 'bg-red-600 text-white animate-pulse'
                        : 'bg-gradient-to-r from-[#6B1B7E] to-[#E0107F] text-white'
                    }`}
                  >
                    {isStudioRecording ? (
                      <>
                        <Square className="w-4 h-4 fill-current" />
                        <span>Stop Recording</span>
                      </>
                    ) : (
                      <>
                        <Mic className="w-4 h-4" />
                        <span>Record My Voice</span>
                      </>
                    )}
                  </button>

                  {studioRecordedBlobUrl && (
                    <button
                      onClick={() => new Audio(studioRecordedBlobUrl).play()}
                      className="px-4 py-3 bg-white hover:bg-purple-50 text-[#6B1B7E] border border-purple-200 rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs cursor-pointer"
                    >
                      <Play className="w-4 h-4 text-emerald-600" />
                      <span>Preview My Recording</span>
                    </button>
                  )}

                  {studioRecordedBlobUrl && (
                    <button
                      onClick={handleSaveStudioVoice}
                      className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black flex items-center gap-2 shadow-md cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save as Teacher Voice</span>
                    </button>
                  )}
                </div>

                {studioSaveSuccess && (
                  <p className="text-xs text-emerald-600 font-black mt-2">
                    ✓ Voice saved! Now available as "My Teacher Recitation" in the reciter selector!
                  </p>
                )}
              </div>
            );
          })()}
        </div>
      )}

      {/* --- MODE 3: FULL QURAN READ & LISTEN (ALL AYAT VIEW) --- */}
      {mode === 'listen' && (
        <div className="space-y-6">
          
          {/* Controls Bar */}
          <div className="bg-white border-2 border-[#6B1B7E]/20 rounded-3xl p-6 shadow-sm space-y-5">
            
            {/* Top Selector Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              
              {/* Surah Selector with 114 Surahs modal trigger */}
              <div className="md:col-span-5 space-y-1">
                <label className="text-xs font-bold text-[#6B1B7E] uppercase tracking-wider block flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#E0107F]" />
                    <span>Selected Surah:</span>
                  </span>
                  <button
                    onClick={() => setIsSurahModalOpen(true)}
                    className="text-xs font-bold text-[#E0107F] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Grid className="w-3.5 h-3.5" />
                    <span>Browse All 114 Surahs</span>
                  </button>
                </label>

                <div className="flex items-center gap-2">
                  <select
                    value={selectedSurahNumber}
                    onChange={(e) => setSelectedSurahNumber(Number(e.target.value))}
                    className="w-full bg-purple-50/70 border border-[#6B1B7E]/30 text-slate-900 text-xs sm:text-sm rounded-xl p-3 font-bold focus:outline-none focus:ring-2 focus:ring-[#6B1B7E] cursor-pointer"
                  >
                    {ALL_114_SURAHS.map((s) => (
                      <option key={s.number} value={s.number}>
                        {s.number}. Surah {s.englishName} ({s.name}) — {s.englishTranslation} ({s.ayahsCount} Ayahs)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Scholar / Reciter Selection */}
              <div className="md:col-span-4 space-y-1">
                <label className="text-xs font-bold text-[#6B1B7E] uppercase tracking-wider block flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-[#E0107F]" />
                  <span>Reciter / Sheikh:</span>
                </label>
                <select
                  value={selectedReciterId}
                  onChange={(e) => setSelectedReciterId(e.target.value)}
                  className="w-full bg-purple-50/70 border border-[#6B1B7E]/30 text-slate-900 text-xs sm:text-sm rounded-xl p-3 font-bold focus:outline-none focus:ring-2 focus:ring-[#6B1B7E] cursor-pointer"
                >
                  {recitersList.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} ({r.country})
                    </option>
                  ))}
                </select>
              </div>

              {/* Playback Pace & Actions */}
              <div className="md:col-span-3 flex items-end gap-2">
                <button
                  onClick={togglePlayAudio}
                  className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition shadow-md cursor-pointer ${
                    isPlaying
                      ? 'bg-amber-500 hover:bg-amber-600 text-purple-950 animate-pulse'
                      : 'bg-gradient-to-r from-[#6B1B7E] to-[#E0107F] hover:opacity-95 text-white'
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 fill-current" />
                      <span>Pause Recitation</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>Play Surah</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    const speeds = [0.85, 1.0, 1.25];
                    const next = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
                    setPlaybackSpeed(next);
                    if (audioRef.current) audioRef.current.playbackRate = next;
                  }}
                  className="px-3.5 py-3 bg-purple-50 hover:bg-purple-100 text-[#6B1B7E] border border-purple-200 rounded-xl text-xs font-bold cursor-pointer"
                  title="Playback Pace"
                >
                  {playbackSpeed}x
                </button>
              </div>

            </div>

            {/* Interactive Audio Progress Bar & Resume Notice */}
            <div className="space-y-2 pt-2 border-t border-purple-100">
              <div className="flex items-center justify-between text-xs text-slate-600 font-mono">
                <span>{formatTime(currentTime)}</span>
                <span className="text-[11px] font-sans font-bold text-[#6B1B7E]">
                  Surah {surahMeta.englishName} ({surahMeta.name}) · {currentReciter.name}
                </span>
                <span>{duration > 0 ? formatTime(duration) : '--:--'}</span>
              </div>

              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={(e) => handleSeek(Number(e.target.value))}
                className="w-full h-2 bg-purple-100 rounded-lg appearance-none cursor-pointer accent-[#6B1B7E]"
              />

              {canResumeSaved && (
                <div className="flex items-center justify-between bg-purple-50/80 p-2.5 rounded-xl border border-[#6B1B7E]/20 text-xs">
                  <div className="flex items-center gap-2 text-[#6B1B7E] font-medium">
                    <RotateCcw className="w-3.5 h-3.5 text-[#E0107F]" />
                    <span>Saved session detected at <strong>{formatTime(lastSavedSession.currentTime)}</strong></span>
                  </div>
                  <button
                    onClick={handleResumeSavedSession}
                    className="px-3 py-1 bg-[#6B1B7E] text-white rounded-lg text-xs font-bold hover:bg-[#5B2A9A] transition cursor-pointer"
                  >
                    Resume from {formatTime(lastSavedSession.currentTime)}
                  </button>
                </div>
              )}
            </div>

            {/* Display options row */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs border-t border-purple-100">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-1.5 cursor-pointer font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={showTransliteration}
                    onChange={(e) => setShowTransliteration(e.target.checked)}
                    className="rounded text-[#6B1B7E] focus:ring-[#6B1B7E]"
                  />
                  <span>Transliteration</span>
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={showTranslation}
                    onChange={(e) => setShowTranslation(e.target.checked)}
                    className="rounded text-[#6B1B7E] focus:ring-[#6B1B7E]"
                  />
                  <span>English Translation</span>
                </label>
              </div>

              <div className="flex items-center gap-1 text-slate-600 font-medium">
                <span>Arabic Font Size:</span>
                {(['md', 'lg', 'xl'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setFontSize(s)}
                    className={`px-2 py-0.5 rounded text-xs font-bold uppercase cursor-pointer ${
                      fontSize === s ? 'bg-[#6B1B7E] text-white' : 'bg-purple-50 text-[#6B1B7E]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Surah Header Banner */}
          <div className="bg-white border-2 border-[#6B1B7E]/20 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-sm">
            <span className="text-xs font-bold text-[#6B1B7E] uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
              Surah {surahMeta.number} · {surahMeta.revelationType} Revelation · {surahMeta.ayahsCount} Verses · Juz {surahMeta.juz}
            </span>
            <h2 className="font-arabic font-quran text-5xl font-bold text-[#6B1B7E] py-1">
              {surahMeta.name}
            </h2>
            <h3 className="text-xl font-bold text-slate-900">
              Surah {surahMeta.englishName} ({surahMeta.englishTranslation})
            </h3>
            <p className="text-xs text-slate-500 max-w-xl mx-auto">
              Recitation streamed in high-definition audio by {currentReciter.name}.
            </p>

            {/* Surah Revelation History & Context Card */}
            {(() => {
              const bgInfo = SURAH_HISTORICAL_BACKGROUNDS[selectedSurahNumber];
              return (
                <div className="mt-4 pt-4 border-t border-purple-100 text-left bg-gradient-to-r from-purple-50/70 via-white to-pink-50/40 p-4 sm:p-5 rounded-2xl border border-[#6B1B7E]/15 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-xs font-black text-[#6B1B7E] uppercase tracking-wider">
                      <History className="w-4 h-4 text-[#E0107F]" />
                      <span>Surah Revelation History & Context</span>
                    </span>
                    <button
                      onClick={() => setShowSurahHistoricalDetails(!showSurahHistoricalDetails)}
                      className="text-xs font-bold text-[#6B1B7E] hover:text-[#E0107F] flex items-center gap-1 cursor-pointer"
                    >
                      <span>{showSurahHistoricalDetails ? 'Hide Background' : 'Show Background'}</span>
                      {showSurahHistoricalDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {showSurahHistoricalDetails && (
                    <div className="space-y-2 text-xs text-slate-700 leading-relaxed">
                      <p>
                        <strong>Historical Setting:</strong> {bgInfo?.historicalSetting || `Surah ${surahMeta.englishName} was revealed during the ${surahMeta.revelationType} era in Makkah/Madinah, establishing core principles of faith and guidance for the believers.`}
                      </p>
                      {bgInfo?.virtueAndSignificance && (
                        <p className="text-purple-900 bg-purple-100/70 p-2 rounded-xl border border-purple-200">
                          <strong>Virtue & Spiritual Significance:</strong> {bgInfo.virtueAndSignificance}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })()}
          </div>

          {/* Verses Breakdown (ALL AYAT OF THE SURAH) */}
          {isLoadingAyahs ? (
            <div className="bg-white rounded-3xl p-12 text-center space-y-3 border border-purple-100 shadow-xs">
              <Loader2 className="w-8 h-8 text-[#6B1B7E] animate-spin mx-auto" />
              <p className="text-sm font-bold text-slate-700">Loading all {surahMeta.ayahsCount} Ayat of Surah {surahMeta.englishName}...</p>
            </div>
          ) : fullSurahData && fullSurahData.ayahs.length > 0 ? (
            <div className="space-y-4">
              {fullSurahData.ayahs.map((ayah, index) => {
                const isThisPlaying = isPlaying && activeAyahIndex === index;
                const isTafseerOpen = expandedTafseerAyah === index;
                const ayahInsight = getAyahTafseerAndHistory(
                  selectedSurahNumber,
                  ayah.numberInSurah,
                  surahMeta.englishName,
                  ayah.arabic,
                  ayah.translation
                );

                const arabicClass = {
                  md: 'text-2xl leading-loose',
                  lg: 'text-3xl sm:text-4xl leading-[2.2]',
                  xl: 'text-4xl sm:text-5xl leading-[2.4]'
                }[fontSize];

                return (
                  <div
                    key={ayah.numberInSurah}
                    className={`rounded-2xl p-6 transition-all duration-300 border ${
                      isThisPlaying
                        ? 'bg-purple-50 border-[#6B1B7E] shadow-md ring-2 ring-[#6B1B7E]/20'
                        : 'bg-white border-purple-100 hover:border-[#6B1B7E]/40 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-purple-100 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-purple-100 text-[#6B1B7E] font-bold text-xs flex items-center justify-center">
                          {ayah.numberInSurah}
                        </span>
                        <span className="text-xs text-[#6B1B7E] font-semibold">
                          Ayah {fullSurahData.number}:{ayah.numberInSurah}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => playAyah(index)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                            isThisPlaying
                              ? 'bg-[#6B1B7E] text-white'
                              : 'bg-purple-50 hover:bg-purple-100 text-[#6B1B7E] border border-purple-200'
                          }`}
                        >
                          {isThisPlaying ? (
                            <>
                              <div className="flex items-center gap-0.5">
                                <span className="w-1 h-3 bg-white wave-bar-1" />
                                <span className="w-1 h-4 bg-white wave-bar-2" />
                                <span className="w-1 h-2 bg-white wave-bar-3" />
                              </div>
                              <span>Playing</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3.5 h-3.5 fill-[#6B1B7E] text-[#6B1B7E]" />
                              <span>Play Verse</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => {
                            setCurrentStepAyahIndex(index);
                            setMode('recite_practice');
                          }}
                          className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-[#5B2A9A] rounded-lg text-xs font-bold border border-purple-200 flex items-center gap-1 cursor-pointer"
                        >
                          <Mic className="w-3.5 h-3.5 text-[#E0107F]" />
                          <span>Practice</span>
                        </button>

                        <button
                          onClick={() => setExpandedTafseerAyah(isTafseerOpen ? null : index)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border ${
                            isTafseerOpen
                              ? 'bg-gradient-to-r from-[#6B1B7E] to-[#E0107F] text-white border-transparent shadow-xs'
                              : 'bg-pink-50 hover:bg-pink-100 text-[#E0107F] border-pink-200'
                          }`}
                          title="View Meaning, History & Tafseer Summary"
                        >
                          <Info className="w-3.5 h-3.5" />
                          <span>{isTafseerOpen ? 'Hide Meaning & History' : 'Meaning & History'}</span>
                        </button>
                      </div>
                    </div>

                    <div className="text-right dir-rtl py-2">
                      <p className={`font-arabic font-quran font-bold text-[#6B1B7E] ${arabicClass}`}>
                        {ayah.arabic}
                      </p>
                    </div>

                    {showTransliteration && (
                      <div className="pt-3 text-xs sm:text-sm font-medium text-[#5B2A9A] italic">
                        "{ayah.transliteration}"
                      </div>
                    )}

                    {showTranslation && (
                      <div className="pt-2 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                        {ayah.translation}
                      </div>
                    )}

                    {/* Expandable Tafseer, Asbab al-Nuzul & Ayah Summary Drawer */}
                    {isTafseerOpen && (
                      <div className="mt-4 pt-4 border-t border-purple-200 bg-gradient-to-br from-purple-50/80 via-white to-pink-50/40 rounded-2xl p-4 sm:p-5 border space-y-3 animate-fadeIn">
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-1.5 text-xs font-black text-[#6B1B7E] uppercase tracking-wider">
                            <BookOpen className="w-4 h-4 text-[#E0107F]" />
                            <span>Ayah {ayah.numberInSurah} · Meaning, History & Tafseer</span>
                          </span>
                          <span className="text-[10px] text-slate-500 font-medium">
                            {ayahInsight.tafseerReference}
                          </span>
                        </div>

                        {/* Meaning Breakdown */}
                        <div className="bg-white p-3 rounded-xl border border-purple-100 space-y-1">
                          <p className="text-xs font-bold text-[#6B1B7E] flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-[#E0107F]" />
                            <span>Word Meaning & Spiritual Core:</span>
                          </p>
                          <p className="text-xs text-slate-700 leading-relaxed">
                            {ayahInsight.meaning}
                          </p>
                        </div>

                        {/* Revelation History (Asbab al-Nuzul) */}
                        <div className="bg-white p-3 rounded-xl border border-purple-100 space-y-1">
                          <p className="text-xs font-bold text-[#5B2A9A] flex items-center gap-1">
                            <History className="w-3.5 h-3.5 text-amber-600" />
                            <span>Historical Context & Cause of Revelation (Asbab al-Nuzul):</span>
                          </p>
                          <p className="text-xs text-slate-700 leading-relaxed">
                            {ayahInsight.historicalContext}
                          </p>
                        </div>

                        {/* Summary & Practical Action */}
                        <div className="bg-purple-100/60 p-3 rounded-xl border border-purple-200 space-y-1">
                          <p className="text-xs font-bold text-[#6B1B7E] flex items-center gap-1">
                            <FileText className="w-3.5 h-3.5 text-[#E0107F]" />
                            <span>Actionable Summary & Lesson for Reciter:</span>
                          </p>
                          <p className="text-xs text-slate-800 leading-relaxed">
                            {ayahInsight.summary}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : null}

          {/* Previous / Next Surah Quick Navigator */}
          <div className="flex items-center justify-between pt-6 border-t border-purple-100">
            <button
              onClick={() => {
                if (selectedSurahNumber > 1) {
                  setSelectedSurahNumber(selectedSurahNumber - 1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              disabled={selectedSurahNumber <= 1}
              className="px-5 py-3 rounded-2xl bg-white border border-[#6B1B7E]/25 text-[#6B1B7E] hover:bg-purple-50 text-xs font-bold transition flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-xs"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Surah</span>
            </button>

            <button
              onClick={() => setIsSurahModalOpen(true)}
              className="px-5 py-3 rounded-2xl bg-purple-50 text-[#6B1B7E] text-xs font-black border border-[#6B1B7E]/20 hover:bg-purple-100 transition cursor-pointer"
            >
              Surah {selectedSurahNumber} of 114
            </button>

            <button
              onClick={() => {
                if (selectedSurahNumber < 114) {
                  setSelectedSurahNumber(selectedSurahNumber + 1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              disabled={selectedSurahNumber >= 114}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#6B1B7E] to-[#E0107F] text-white hover:opacity-95 text-xs font-bold transition flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-md"
            >
              <span>Next Surah</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
