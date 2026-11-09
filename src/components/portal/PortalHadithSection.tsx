import React, { useState } from 'react';
import { 
  BookMarked, 
  Search, 
  Volume2, 
  Bookmark, 
  BookmarkCheck, 
  Sparkles, 
  CheckCircle2, 
  CheckSquare,
  Award
} from 'lucide-react';
import { HADITH_LEARNING_DATA, HadithItem } from '../../data/hadithLearningData';
import { audioEngine } from '../../utils/audioSynth';
import { toggleStudentBookmark, isItemBookmarked } from '../../utils/studentLearningStorage';

interface PortalHadithSectionProps {
  studentId: string;
  studentName: string;
  onBookmarkChanged?: () => void;
}

export const PortalHadithSection: React.FC<PortalHadithSectionProps> = ({
  studentId,
  studentName,
  onBookmarkChanged
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [speakingHadithId, setSpeakingHadithId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Topics' },
    { id: 'sincerity', label: 'Sincerity (Niyyah)' },
    { id: 'manners', label: 'Good Character & Manners' },
    { id: 'parents', label: 'Respect to Parents' },
    { id: 'kindness', label: 'Universal Mercy & Kindness' },
    { id: 'honesty', label: 'Honesty & Truthfulness' },
    { id: 'knowledge', label: 'Quran & Sacred Knowledge' },
    { id: 'salah', label: 'Importance of Prayer' },
    { id: 'nawawi40', label: 'Forty Hadith Nawawi' }
  ];

  const handleSpeak = async (hadith: HadithItem) => {
    if (speakingHadithId === hadith.id) {
      audioEngine.stopVoice();
      setSpeakingHadithId(null);
      return;
    }
    setSpeakingHadithId(hadith.id);
    await audioEngine.speakArabic(hadith.arabicText, 0.85);
    setSpeakingHadithId(null);
  };

  const handleToggleBookmark = (hadith: HadithItem) => {
    toggleStudentBookmark(studentId, studentName, {
      type: 'hadith',
      title: hadith.title,
      arabicText: hadith.arabicText,
      englishTranslation: hadith.englishTranslation,
      reference: hadith.sourceReference
    });
    if (onBookmarkChanged) onBookmarkChanged();
  };

  const filteredHadiths = HADITH_LEARNING_DATA.filter(h => {
    const matchesCat = selectedCategory === 'all' || h.category === selectedCategory;
    const matchesSearch = 
      h.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.englishTranslation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.sourceReference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.explanation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#6E1373] via-[#851C82] to-[#561F79] text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-purple-200">
            <BookMarked className="w-3.5 h-3.5 text-amber-300" />
            <span>Authentic Prophetic Traditions (Sunnah an-Nabawiyyah)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Hadith Learning & Practical Action
          </h2>
          <p className="text-xs sm:text-sm text-purple-100 max-w-2xl">
            Selected traditions from Forty Hadith of Imam Nawawi, Sahih al-Bukhari, and Sahih Muslim on Salah, manners, parents, kindness, honesty, and knowledge with verified references and daily action items.
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Hadith by keyword, narrator, or topic (e.g. Bukhari, parents, smile, intentions)..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6E1373] text-slate-900"
          />
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#6E1373] text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Hadith Cards List */}
      <div className="space-y-6">
        {filteredHadiths.map((hadith) => {
          const isSpeaking = speakingHadithId === hadith.id;
          const isBookmarked = isItemBookmarked(studentId, studentName, 'hadith', { title: hadith.title });

          return (
            <div
              key={hadith.id}
              className={`bg-white rounded-3xl border transition-all p-6 sm:p-8 shadow-xs space-y-5 ${
                isSpeaking 
                  ? 'border-[#851C82] ring-2 ring-purple-100 bg-purple-50/20' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#851C82] mb-1">
                    <span className="px-2 py-0.5 rounded-full bg-purple-100 text-[#6E1373]">
                      {hadith.categoryLabel}
                    </span>
                    <span>·</span>
                    <span>Grade: {hadith.grade}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    {hadith.title}
                  </h3>
                  <span className="text-xs text-slate-500">Narrated by: {hadith.narrator}</span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {/* Listen */}
                  <button
                    onClick={() => handleSpeak(hadith)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                      isSpeaking
                        ? 'bg-amber-400 text-slate-950 animate-pulse'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>{isSpeaking ? 'Playing' : 'Recite'}</span>
                  </button>

                  {/* Bookmark */}
                  <button
                    onClick={() => handleToggleBookmark(hadith)}
                    className={`p-2 rounded-xl text-xs transition cursor-pointer ${
                      isBookmarked
                        ? 'bg-purple-100 text-[#6E1373]'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                    }`}
                    title={isBookmarked ? 'Remove Bookmark' : 'Bookmark this Hadith'}
                  >
                    {isBookmarked ? <BookmarkCheck className="w-4 h-4 fill-[#6E1373]" /> : <Bookmark className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Arabic Matn */}
              <div className="bg-purple-50/40 rounded-2xl p-5 border border-purple-100 text-right">
                <p 
                  dir="rtl"
                  className="text-xl sm:text-2xl font-arabic text-slate-950 leading-loose"
                >
                  {hadith.arabicText}
                </p>
              </div>

              {/* English Translation */}
              <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  English Translation
                </span>
                <p className="text-sm sm:text-base text-slate-800 font-semibold leading-relaxed">
                  "{hadith.englishTranslation}"
                </p>
                <p className="text-xs text-[#6E1373] font-bold pt-1">
                  Source: {hadith.sourceReference}
                </p>
              </div>

              {/* Scholarly Explanation */}
              <div className="bg-purple-50/60 rounded-2xl p-4 border border-purple-100 text-xs sm:text-sm space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#6E1373]">
                  <Sparkles className="w-4 h-4 text-[#851C82]" />
                  <span>Scholarly Meaning & Context</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  {hadith.explanation}
                </p>
              </div>

              {/* Practical Action Items */}
              <div className="bg-emerald-50/60 rounded-2xl p-4 border border-emerald-100 space-y-2">
                <span className="text-xs font-bold text-emerald-900 block flex items-center gap-1">
                  <CheckSquare className="w-4 h-4 text-emerald-600" />
                  <span>Practical Daily Lessons for the Student:</span>
                </span>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {hadith.practicalLessons.map((lesson, lIdx) => (
                    <li key={lIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{lesson}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
