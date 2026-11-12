import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Download, 
  ExternalLink, 
  Sparkles, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Layers, 
  Info,
  Compass,
  ArrowLeft,
  FileText,
  Eye,
  Play,
  Pause,
  RotateCcw,
  Check,
  AlertCircle
} from 'lucide-react';
import { 
  ALL_30_PARAS_DATA, 
  TAJWEED_COLOR_RULES, 
  ParaJuzDetail, 
  parseTajweedTokens 
} from '../../data/tajweedMushafData';
import { ALL_114_SURAHS, SurahSummary } from '../../data/allSurahsMeta';

interface ColorCodedTajweedSectionProps {
  onSelectSurah?: (surahNum: number) => void;
  onBackToSurahList?: () => void;
}

export const ColorCodedTajweedSection: React.FC<ColorCodedTajweedSectionProps> = ({
  onSelectSurah,
  onBackToSurahList
}) => {
  const [activeTab, setActiveTab] = useState<'paras' | 'surahs' | 'rules'>('paras');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalPara, setActiveModalPara] = useState<ParaJuzDetail | null>(null);
  const [modalViewMode, setModalViewMode] = useState<'interactive' | 'pdf'>('interactive');
  const [downloadingPara, setDownloadingPara] = useState<number | null>(null);
  const [downloadSuccessPara, setDownloadSuccessPara] = useState<number | null>(null);
  const [surahPage, setSurahPage] = useState(1);
  const [playingAudioIndex, setPlayingAudioIndex] = useState<number | null>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const SURAHS_PER_PAGE = 15;

  const filteredParas = ALL_30_PARAS_DATA.filter(p => 
    p.paraNumber.toString().includes(searchQuery.trim()) ||
    p.arabicName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.englishTransliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.surahRange.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSurahs = ALL_114_SURAHS.filter(s => 
    s.number.toString().includes(searchQuery.trim()) ||
    s.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.englishTranslation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.name.includes(searchQuery.trim())
  );

  const totalSurahPages = Math.ceil(filteredSurahs.length / SURAHS_PER_PAGE);
  const currentSurahs = filteredSurahs.slice((surahPage - 1) * SURAHS_PER_PAGE, surahPage * SURAHS_PER_PAGE);

  // Reliable, foolproof PDF download handler
  const handleDownloadPdf = (para: ParaJuzDetail, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setDownloadingPara(para.paraNumber);

    try {
      // Create a direct anchor download to our proxy streaming endpoint
      const downloadUrl = `${para.proxyPdfUrl}?download=1`;
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', `TrueWayQuran-Juz-${String(para.paraNumber).padStart(2, '0')}-Tajweed-English.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => {
        setDownloadingPara(null);
        setDownloadSuccessPara(para.paraNumber);
        setTimeout(() => setDownloadSuccessPara(null), 3000);
      }, 1200);
    } catch (err) {
      // Fallback: direct window open to upstream PDF
      window.open(para.pdfUrl, '_blank', 'noopener,noreferrer');
      setDownloadingPara(null);
    }
  };

  const handleOpenPdfWindow = (para: ParaJuzDetail) => {
    window.open(para.proxyPdfUrl, '_blank', 'noopener,noreferrer');
  };

  const handlePlayRecitation = (verseText: string, index: number) => {
    if (playingAudioIndex === index) {
      if (audioRef.current) {
        audioRef.current.pause();
        setPlayingAudioIndex(null);
      }
      return;
    }

    // Play pronunciation recitation via Web Speech API or audio
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(verseText);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.85;
      utterance.onend = () => setPlayingAudioIndex(null);
      utterance.onerror = () => setPlayingAudioIndex(null);
      setPlayingAudioIndex(index);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn text-slate-900">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#6E1373] via-[#851C82] to-[#561F79] p-6 sm:p-8 rounded-3xl text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-black text-amber-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Real Color-Coded Tajweed Quran Pak</span>
              <span className="text-white/40">·</span>
              <span>15/16 Line Mushaf & PDFs</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black leading-tight text-white">
              Holy Quran with Color Coded Tajweed & English Translation
            </h2>
            <p className="text-xs sm:text-sm text-purple-100 leading-relaxed">
              Read the Holy Quran with authentic color-coded Tajweed notation and English translation. 
              Features complete 30 Paras (Juz), high-resolution Uthmani & Indo-Pak script rules, and verified printable PDF editions with instant browser viewing and reliable one-click download.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-stretch md:self-auto shrink-0">
            {onBackToSurahList && (
              <button
                onClick={onBackToSurahList}
                className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs border border-white/20 transition cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Standard Quran Reader</span>
              </button>
            )}
            <button
              onClick={() => {
                setActiveModalPara(ALL_30_PARAS_DATA[0]);
                setModalViewMode('interactive');
              }}
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition cursor-pointer flex items-center gap-1.5 shadow-md"
            >
              <BookOpen className="w-4 h-4" />
              <span>Open Para 1 (Alif Lam Meem)</span>
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Complete Holy Quran Master Edition Highlight Bar */}
      <div className="bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-amber-500/10 border border-amber-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6E1373] to-[#851C82] text-amber-300 flex items-center justify-center shrink-0 shadow-xs">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-black text-sm text-slate-900 flex items-center gap-2">
              <span>Complete Holy Quran (All 30 Paras / 114 Surahs Single Master Edition)</span>
              <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[10px] font-black uppercase">
                Color Tajweed
              </span>
            </h4>
            <p className="text-xs text-slate-600">
              Download or view the complete high-resolution 15-line Quran Pak with Color-Coded Tajweed, English translation, and transliteration in a single book.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
          <a
            href="https://archive.org/download/quran-with-tajwid-and-english-translation/quran-with-tajwid-and-english-translation.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-[#6E1373] hover:bg-[#561F79] text-white font-black text-xs transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Master Quran PDF (356 MB)</span>
          </a>
          <button
            onClick={() => setActiveTab('rules')}
            className="px-3 py-2 rounded-xl bg-purple-100 hover:bg-purple-200 text-[#6E1373] font-bold text-xs transition cursor-pointer flex items-center gap-1"
          >
            <Info className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Rules Guide</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs & Tajweed Legend */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-purple-100 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-thin">
            <button
              onClick={() => setActiveTab('paras')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer shrink-0 flex items-center gap-1.5 ${
                activeTab === 'paras'
                  ? 'bg-[#6E1373] text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-purple-50 text-slate-700'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>All 30 Paras (Juz) with Tajweed</span>
            </button>
            <button
              onClick={() => setActiveTab('surahs')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer shrink-0 flex items-center gap-1.5 ${
                activeTab === 'surahs'
                  ? 'bg-[#6E1373] text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-purple-50 text-slate-700'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>114 Surahs Directory</span>
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer shrink-0 flex items-center gap-1.5 ${
                activeTab === 'rules'
                  ? 'bg-[#6E1373] text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-purple-50 text-slate-700'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Tajweed Color Rules Guide</span>
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Para number, name, or Surah..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6E1373]"
            />
          </div>
        </div>

        {/* Color Legend Quick Reference Strip */}
        <div className="p-3 bg-purple-50/70 border border-purple-100 rounded-2xl space-y-2">
          <div className="text-[11px] font-black uppercase tracking-wider text-[#6E1373] flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5" />
            <span>Official Tajweed Color Codes for Recitation:</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {TAJWEED_COLOR_RULES.map((rule) => (
              <div 
                key={rule.id}
                className="p-2 rounded-xl border flex flex-col justify-between"
                style={{ backgroundColor: rule.bgHex, borderColor: rule.borderHex }}
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: rule.colorHex }} />
                  <span className="text-[11px] font-black leading-tight" style={{ color: rule.colorHex }}>
                    {rule.name.split('(')[0]}
                  </span>
                </div>
                <span className="text-[10px] text-slate-600 font-bold mt-1">
                  {rule.duration}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TAB 1: ALL 30 PARAS (JUZ) GRID */}
      {activeTab === 'paras' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#6E1373]" />
              <span>Complete 30 Paras / Juz Tajweed Mushaf Library</span>
            </h3>
            <span className="text-xs text-slate-500 font-bold">
              Showing {filteredParas.length} of 30 Paras
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredParas.map((para) => (
              <div
                key={para.paraNumber}
                className="bg-white rounded-3xl border border-purple-100 shadow-xs hover:shadow-xl hover:border-purple-300 transition-all duration-300 p-5 flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  {/* Visual Header */}
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${para.thumbnailGradient} text-white flex items-center justify-between shadow-xs`}>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-purple-200 block">
                        Para / Juz {para.paraNumber}
                      </span>
                      <h4 className="text-lg font-black">{para.englishTransliteration}</h4>
                    </div>
                    <span className="font-arabic text-2xl font-bold text-white drop-shadow-sm" dir="rtl">
                      {para.arabicName}
                    </span>
                  </div>

                  {/* Starting Ayah & Details */}
                  <div className="space-y-1.5">
                    <p className="font-arabic text-sm text-slate-800 text-right line-clamp-1" dir="rtl">
                      {para.startingAyah}
                    </p>
                    <div className="text-xs font-semibold text-slate-600">
                      <span className="font-bold text-[#6E1373]">Coverage: </span>
                      {para.surahRange}
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 font-bold">
                        {para.totalVerses} Verses
                      </span>
                      <span className="text-slate-300">·</span>
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>15-Line Color Tajweed</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => {
                      setActiveModalPara(para);
                      setModalViewMode('interactive');
                    }}
                    className="flex-1 py-2 px-3 rounded-xl bg-[#6E1373] hover:bg-[#561F79] text-white text-xs font-black transition cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Read in Viewer</span>
                  </button>

                  <button
                    onClick={(e) => handleDownloadPdf(para, e)}
                    disabled={downloadingPara === para.paraNumber}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                      downloadSuccessPara === para.paraNumber
                        ? 'bg-emerald-500 text-white'
                        : 'bg-purple-50 hover:bg-purple-100 text-[#6E1373]'
                    }`}
                    title="Download 15-Line Color-Coded Tajweed PDF with English Translation"
                  >
                    {downloadingPara === para.paraNumber ? (
                      <span className="w-3.5 h-3.5 border-2 border-[#6E1373] border-t-transparent rounded-full animate-spin" />
                    ) : downloadSuccessPara === para.paraNumber ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <Download className="w-3.5 h-3.5" />
                    )}
                    <span className="hidden sm:inline">
                      {downloadSuccessPara === para.paraNumber ? 'Downloaded' : 'Download PDF'}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: 114 SURAHS DIRECTORY WITH 15 SURAHS PER PAGE */}
      {activeTab === 'surahs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#6E1373]" />
              <span>Surahs with Color-Coded Tajweed & English Translation</span>
            </h3>
            <span className="text-xs text-slate-500 font-bold">
              Page {surahPage} of {totalSurahPages || 1} (15 Surahs per page)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {currentSurahs.map((surah) => (
              <div
                key={surah.number}
                onClick={() => onSelectSurah && onSelectSurah(surah.number)}
                className="p-4 bg-white rounded-2xl border border-purple-100 hover:border-purple-300 hover:shadow-md transition cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-purple-50 group-hover:bg-[#6E1373] group-hover:text-white text-[#6E1373] flex items-center justify-center font-black text-xs transition">
                    {surah.number}
                  </span>
                  <div>
                    <h4 className="font-black text-sm text-slate-900 group-hover:text-[#6E1373] transition">
                      Surah {surah.englishName}
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      {surah.englishTranslation} · {surah.ayahsCount} Ayat
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-arabic text-lg font-bold text-[#6E1373]" dir="rtl">
                    {surah.name}
                  </span>
                  <span className="block text-[10px] text-slate-400">
                    {surah.revelationType} · Juz {surah.juz}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200">
            <span className="text-xs text-slate-500 font-semibold">
              Showing Surahs {(surahPage - 1) * SURAHS_PER_PAGE + 1}–{Math.min(surahPage * SURAHS_PER_PAGE, filteredSurahs.length)} of {filteredSurahs.length}
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
      )}

      {/* TAB 3: TAJWEED COLOR RULES COMPREHENSIVE GUIDE */}
      {activeTab === 'rules' && (
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  Science of Tajweed: Color-Coded Rules & Articulation Marks
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Tajweed means to pronounce every Arabic letter from its exact point of articulation (Makhraj) giving it its rightful attributes (Sifat). 
                  Our color-coded Mushaf applies colors consistently so learners instantly recognize whether to elongate, hold nasalization, or bounce the sound.
                </p>
              </div>

              <a
                href="/api/pdf/tajweed-rules?download=1"
                className="px-4 py-2 rounded-xl bg-[#6E1373] hover:bg-[#561F79] text-white text-xs font-black transition flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Tajweed Guide PDF</span>
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TAJWEED_COLOR_RULES.map((rule) => (
                <div 
                  key={rule.id}
                  className="p-5 rounded-2xl border space-y-3"
                  style={{ backgroundColor: rule.bgHex, borderColor: rule.borderHex }}
                >
                  <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: rule.borderHex }}>
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full" style={{ backgroundColor: rule.colorHex }} />
                      <h4 className="font-black text-sm" style={{ color: rule.colorHex }}>
                        {rule.name}
                      </h4>
                    </div>
                    <span className="font-arabic font-bold text-sm text-slate-800" dir="rtl">
                      {rule.arabicName}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    {rule.description}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
                    <span className="font-bold text-slate-900 bg-white/80 px-2.5 py-1 rounded-lg">
                      Duration: {rule.duration}
                    </span>
                    <div className="flex items-center gap-1.5 font-arabic font-bold text-sm" dir="rtl">
                      {rule.examples.map((ex, idx) => (
                        <span key={idx} className="bg-white px-2 py-0.5 rounded shadow-2xs" style={{ color: rule.colorHex }}>
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FULL-SCREEN DIGITAL MUSHAF & PDF VIEWER MODAL */}
      {activeModalPara && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-5xl h-[94vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-purple-200">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-[#6E1373] via-[#851C82] to-[#561F79] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center font-black text-base shadow-xs">
                  {activeModalPara.paraNumber}
                </span>
                <div>
                  <h3 className="font-black text-base sm:text-lg flex items-center gap-2">
                    <span>Para {activeModalPara.paraNumber}: {activeModalPara.englishTransliteration}</span>
                    <span className="font-arabic font-bold text-amber-200" dir="rtl">({activeModalPara.arabicName})</span>
                  </h3>
                  <p className="text-xs text-purple-200">
                    {activeModalPara.surahRange} · 15-Line Color-Coded Tajweed with English Meaning
                  </p>
                </div>
              </div>

              {/* Viewer Mode Switcher & Actions */}
              <div className="flex flex-wrap items-center gap-2 self-stretch md:self-auto justify-between md:justify-end">
                {/* Mode Switcher */}
                <div className="bg-white/15 p-1 rounded-xl flex items-center gap-1 border border-white/20">
                  <button
                    onClick={() => setModalViewMode('interactive')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                      modalViewMode === 'interactive'
                        ? 'bg-amber-400 text-slate-950 shadow-xs'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Interactive Tajweed</span>
                  </button>
                  <button
                    onClick={() => setModalViewMode('pdf')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                      modalViewMode === 'pdf'
                        ? 'bg-amber-400 text-slate-950 shadow-xs'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>15-Line PDF View</span>
                  </button>
                </div>

                {/* Direct Window Open */}
                <button
                  onClick={() => handleOpenPdfWindow(activeModalPara)}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                  title="Open PDF in a fresh browser tab"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Open in Tab</span>
                </button>

                {/* Download PDF button */}
                <button
                  onClick={(e) => handleDownloadPdf(activeModalPara, e)}
                  disabled={downloadingPara === activeModalPara.paraNumber}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 shadow-xs cursor-pointer ${
                    downloadSuccessPara === activeModalPara.paraNumber
                      ? 'bg-emerald-500 text-white'
                      : 'bg-white hover:bg-purple-50 text-[#6E1373]'
                  }`}
                >
                  {downloadingPara === activeModalPara.paraNumber ? (
                    <span className="w-3.5 h-3.5 border-2 border-[#6E1373] border-t-transparent rounded-full animate-spin" />
                  ) : downloadSuccessPara === activeModalPara.paraNumber ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <Download className="w-3.5 h-3.5" />
                  )}
                  <span>
                    {downloadSuccessPara === activeModalPara.paraNumber ? 'Downloaded' : 'Download PDF'}
                  </span>
                </button>

                {/* Close Button */}
                <button
                  onClick={() => {
                    setActiveModalPara(null);
                    if ('speechSynthesis' in window) {
                      window.speechSynthesis.cancel();
                    }
                  }}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
                  aria-label="Close Viewer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto bg-slate-50 relative">
              
              {/* MODE 1: INTERACTIVE COLOR-CODED TAJWEED MUSHAF (Instant & 100% reliable) */}
              {modalViewMode === 'interactive' && (
                <div className="p-4 sm:p-6 space-y-6 max-w-4xl mx-auto">
                  
                  {/* Para Header Card */}
                  <div className="bg-white p-5 rounded-3xl border border-purple-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="space-y-1 text-center sm:text-left">
                      <div className="text-xs font-black uppercase tracking-wider text-[#6E1373]">
                        Juz / Para {activeModalPara.paraNumber} · Color-Coded Recitation Mode
                      </div>
                      <h4 className="text-lg font-black text-slate-900">
                        {activeModalPara.englishTransliteration} ({activeModalPara.arabicName})
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">
                        Contains {activeModalPara.totalVerses} verses covering {activeModalPara.surahRange}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDownloadPdf(activeModalPara)}
                        className="px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#6E1373] font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download 15-Line PDF</span>
                      </button>
                      <button
                        onClick={() => setModalViewMode('pdf')}
                        className="px-3.5 py-2 rounded-xl bg-[#6E1373] hover:bg-[#561F79] text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>View PDF Embed</span>
                      </button>
                    </div>
                  </div>

                  {/* Tajweed Legend Bar */}
                  <div className="p-3 bg-white rounded-2xl border border-purple-100 shadow-2xs">
                    <div className="text-[11px] font-black uppercase text-slate-500 mb-2">
                      Active Tajweed Color Rules in this Reading:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-red-50 text-red-700 border border-red-200 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-600" />
                        <span>Madd (Long Elongation - 4-6 counts)</span>
                      </span>
                      <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-600" />
                        <span>Ghunnah (Nasalization - 2 counts)</span>
                      </span>
                      <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-blue-600" />
                        <span>Qalqalah (Echoing / Bouncing sound)</span>
                      </span>
                      <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-600" />
                        <span>Iqlab (Convert to Meem)</span>
                      </span>
                    </div>
                  </div>

                  {/* Sample Verses with Color-Coded Tajweed Tokens */}
                  <div className="space-y-4">
                    <div className="text-xs font-black uppercase tracking-wider text-slate-500">
                      Opening Verses of Para {activeModalPara.paraNumber}:
                    </div>

                    {(activeModalPara.sampleVerses || [
                      {
                        number: 1,
                        arabic: activeModalPara.startingAyah,
                        transliteration: activeModalPara.englishTransliteration,
                        english: 'Commencement of Juz ' + activeModalPara.paraNumber + ' in the Holy Quran.'
                      }
                    ]).map((verse, idx) => {
                      const tokens = parseTajweedTokens(verse.arabic);

                      return (
                        <div
                          key={idx}
                          className="bg-white p-5 rounded-3xl border border-purple-100 shadow-xs space-y-4 hover:border-purple-300 transition"
                        >
                          {/* Ayah Header */}
                          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <span className="w-7 h-7 rounded-lg bg-purple-50 text-[#6E1373] flex items-center justify-center font-black text-xs">
                              {verse.number}
                            </span>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handlePlayRecitation(verse.arabic, idx)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                                  playingAudioIndex === idx
                                    ? 'bg-amber-400 text-slate-950 font-black'
                                    : 'bg-purple-50 hover:bg-purple-100 text-[#6E1373]'
                                }`}
                              >
                                {playingAudioIndex === idx ? (
                                  <>
                                    <Pause className="w-3.5 h-3.5" />
                                    <span>Playing Recitation</span>
                                  </>
                                ) : (
                                  <>
                                    <Play className="w-3.5 h-3.5" />
                                    <span>Listen Recitation</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>

                          {/* Arabic Verse with Live Tajweed Colors */}
                          <div 
                            className="font-arabic text-2xl sm:text-3xl leading-loose text-right py-2 text-slate-900 select-text" 
                            dir="rtl"
                          >
                            {tokens.map((token, tIdx) => (
                              <span
                                key={tIdx}
                                className={token.colorHex ? 'mx-0.5 px-1 py-0.5 rounded font-black' : 'mx-0.5'}
                                style={
                                  token.colorHex
                                    ? {
                                        color: token.colorHex,
                                        backgroundColor: token.bgHex,
                                        borderBottom: `2px solid ${token.colorHex}`
                                      }
                                    : undefined
                                }
                                title={token.ruleName}
                              >
                                {token.text}
                              </span>
                            ))}
                          </div>

                          {/* Transliteration */}
                          <div className="p-3 bg-purple-50/50 rounded-xl text-xs font-serif italic text-purple-900">
                            <span className="font-sans not-italic font-bold text-[#6E1373] mr-1.5">Transliteration:</span>
                            {verse.transliteration}
                          </div>

                          {/* English Meaning */}
                          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                            <span className="font-bold text-slate-900 mr-1.5">Translation:</span>
                            {verse.english}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Complete Para Notice & Download CTA */}
                  <div className="p-6 bg-gradient-to-br from-purple-50 via-white to-purple-50 rounded-3xl border border-purple-200 text-center space-y-3">
                    <BookOpen className="w-8 h-8 text-[#6E1373] mx-auto" />
                    <h4 className="text-base font-black text-slate-900">
                      Need the Complete 15-Line Indo-Pak / Uthmani Mushaf for Para {activeModalPara.paraNumber}?
                    </h4>
                    <p className="text-xs text-slate-600 max-w-lg mx-auto">
                      Get the complete, verified 15-line color-coded PDF edition for Para {activeModalPara.paraNumber} ({activeModalPara.englishTransliteration}) featuring all {activeModalPara.totalVerses} Ayat, full English translation, and transliteration for print or offline study.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                      <button
                        onClick={() => handleDownloadPdf(activeModalPara)}
                        className="px-5 py-2.5 rounded-xl bg-[#6E1373] hover:bg-[#561F79] text-white font-black text-xs transition flex items-center gap-2 shadow-md cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download Full Para {activeModalPara.paraNumber} PDF</span>
                      </button>
                      <button
                        onClick={() => handleOpenPdfWindow(activeModalPara)}
                        className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 font-bold text-xs transition flex items-center gap-1.5 cursor-pointer"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Open in Browser Window</span>
                      </button>
                    </div>
                  </div>

                </div>
              )}

              {/* MODE 2: HIGH-DEFINITION 15-LINE COLOR PDF VIEWER */}
              {modalViewMode === 'pdf' && (
                <div className="w-full h-full flex flex-col">
                  {/* PDF Notice & Direct Action Toolbar */}
                  <div className="p-3 bg-amber-50 border-b border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-amber-900 shrink-0">
                    <div className="flex items-center gap-2">
                      <Info className="w-4 h-4 text-amber-700 shrink-0" />
                      <span>
                        Viewing high-definition 15-line Color Coded Tajweed PDF for <strong>Para {activeModalPara.paraNumber} ({activeModalPara.englishTransliteration})</strong>.
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleOpenPdfWindow(activeModalPara)}
                        className="px-3 py-1 bg-amber-200 hover:bg-amber-300 text-amber-950 font-bold rounded-lg transition flex items-center gap-1 cursor-pointer"
                      >
                        <Maximize2 className="w-3 h-3" />
                        <span>Full Window</span>
                      </button>
                      <button
                        onClick={() => handleDownloadPdf(activeModalPara)}
                        className="px-3 py-1 bg-[#6E1373] hover:bg-[#561F79] text-white font-bold rounded-lg transition flex items-center gap-1 cursor-pointer"
                      >
                        <Download className="w-3 h-3" />
                        <span>Save File</span>
                      </button>
                    </div>
                  </div>

                  {/* Embedded PDF Viewer Object with iframe and direct fallbacks */}
                  <div className="flex-1 w-full bg-slate-900 relative min-h-[500px]">
                    <object
                      data={activeModalPara.proxyPdfUrl}
                      type="application/pdf"
                      className="w-full h-full min-h-[600px] border-0"
                    >
                      {/* Fallback iframe */}
                      <iframe
                        src={activeModalPara.proxyPdfUrl}
                        title={`Color Coded Tajweed Para ${activeModalPara.paraNumber}`}
                        className="w-full h-full min-h-[600px] border-0"
                        allow="fullscreen"
                      >
                        {/* Final fallback when browser blocks inline document viewing */}
                        <div className="p-8 text-center text-white space-y-4">
                          <FileText className="w-12 h-12 text-amber-400 mx-auto" />
                          <h4 className="text-lg font-bold">PDF Ready to View</h4>
                          <p className="text-sm text-slate-300 max-w-md mx-auto">
                            Your browser environment prefers opening PDFs in an external window or downloading directly.
                          </p>
                          <div className="flex justify-center gap-3">
                            <button
                              onClick={() => handleOpenPdfWindow(activeModalPara)}
                              className="px-4 py-2 bg-amber-400 text-slate-950 font-black rounded-xl"
                            >
                              Open in New Tab
                            </button>
                            <button
                              onClick={() => handleDownloadPdf(activeModalPara)}
                              className="px-4 py-2 bg-[#6E1373] text-white font-black rounded-xl"
                            >
                              Download PDF
                            </button>
                          </div>
                        </div>
                      </iframe>
                    </object>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-slate-100 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 shrink-0">
              <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
                <button
                  disabled={activeModalPara.paraNumber <= 1}
                  onClick={() => {
                    const prev = ALL_30_PARAS_DATA.find(p => p.paraNumber === activeModalPara.paraNumber - 1);
                    if (prev) {
                      setActiveModalPara(prev);
                      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-purple-50 border border-slate-200 font-bold disabled:opacity-40 cursor-pointer flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Para {activeModalPara.paraNumber - 1}</span>
                </button>
                <button
                  disabled={activeModalPara.paraNumber >= 30}
                  onClick={() => {
                    const next = ALL_30_PARAS_DATA.find(p => p.paraNumber === activeModalPara.paraNumber + 1);
                    if (next) {
                      setActiveModalPara(next);
                      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-purple-50 border border-slate-200 font-bold disabled:opacity-40 cursor-pointer flex items-center gap-1"
                >
                  <span>Para {activeModalPara.paraNumber + 1}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-3 font-semibold text-slate-600">
                <span className="text-[#6E1373] font-bold">15-Line Tajweed Edition</span>
                <span>·</span>
                <a
                  href={activeModalPara.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-700 hover:underline flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Direct Mirror Link</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
