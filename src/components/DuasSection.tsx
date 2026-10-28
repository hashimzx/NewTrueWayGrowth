import React, { useState } from 'react';
import { AUTHENTIC_DUAS } from '../data/duasData';
import { IslamicDua } from '../types';
import { soundEngine } from '../utils/audioSynth';
import { 
  BookMarked, 
  Search, 
  Volume2, 
  Copy, 
  Check, 
  Bookmark, 
  Sparkles, 
  BookOpen, 
  Heart, 
  Sun, 
  ShieldCheck, 
  Users, 
  Compass,
  ArrowRight
} from 'lucide-react';

interface DuasSectionProps {
  onOpenQuran?: () => void;
  onOpenQaida?: () => void;
}

export const DuasSection: React.FC<DuasSectionProps> = ({ onOpenQuran, onOpenQaida }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [playingDuaId, setPlayingDuaId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('twq_bookmarked_duas');
      return saved ? JSON.parse(saved) : ['dua-study-1', 'dua-morning-1'];
    } catch {
      return ['dua-study-1'];
    }
  });

  const categories = [
    { id: 'all', label: 'All Duas', icon: Sparkles },
    { id: 'quran_study', label: 'Quran & Knowledge', icon: BookOpen },
    { id: 'daily', label: 'Daily Life', icon: Compass },
    { id: 'morning_evening', label: 'Morning & Evening', icon: Sun },
    { id: 'prayer', label: 'Salah & Namaz', icon: ShieldCheck },
    { id: 'parents', label: 'Parents & Family', icon: Users },
    { id: 'hardship', label: 'Hardship & Ease', icon: Heart },
    { id: 'forgiveness', label: 'Forgiveness', icon: BookMarked },
    { id: 'bookmarked', label: 'Saved Duas', icon: Bookmark }
  ];

  const toggleBookmark = (id: string) => {
    const updated = bookmarkedIds.includes(id)
      ? bookmarkedIds.filter(item => item !== id)
      : [...bookmarkedIds, id];
    setBookmarkedIds(updated);
    try {
      localStorage.setItem('twq_bookmarked_duas', JSON.stringify(updated));
    } catch {}
  };

  const handleCopyDua = (dua: IslamicDua) => {
    const textToCopy = `${dua.title}\n\n${dua.arabic}\n\nTransliteration:\n${dua.transliteration}\n\nTranslation:\n"${dua.englishTranslation}"\n\nReference: ${dua.reference}\n— True Way Quran Academy`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(dua.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handlePlayArabic = async (dua: IslamicDua) => {
    if (playingDuaId === dua.id) {
      setPlayingDuaId(null);
      return;
    }
    setPlayingDuaId(dua.id);
    try {
      await soundEngine.speakArabic(dua.arabic, 0.85);
    } catch (e) {
      console.warn('Audio synthesis completed or interrupted', e);
    } finally {
      setPlayingDuaId(null);
    }
  };

  const filteredDuas = AUTHENTIC_DUAS.filter(dua => {
    // Category match
    if (selectedCategory === 'bookmarked') {
      if (!bookmarkedIds.includes(dua.id)) return false;
    } else if (selectedCategory !== 'all' && dua.category !== selectedCategory) {
      return false;
    }

    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const inTitle = dua.title.toLowerCase().includes(q);
      const inMeaning = dua.englishTranslation.toLowerCase().includes(q);
      const inTrans = dua.transliteration.toLowerCase().includes(q);
      const inRef = dua.reference.toLowerCase().includes(q);
      const inArabic = dua.arabic.includes(q);
      return inTitle || inMeaning || inTrans || inRef || inArabic;
    }

    return true;
  });

  return (
    <div className="py-12 bg-gradient-to-b from-[#faf8ff] via-white to-purple-50/30 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header Hero Banner */}
        <div className="bg-gradient-to-r from-[#2e0854] via-[#3b0764] to-[#4a044e] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden border border-purple-700/50">
          <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold text-pink-300">
              <BookMarked className="w-4 h-4 text-pink-400" />
              <span>Authentic Islamic Duas & Supplications</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Fortress of the Believer:{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-200 to-amber-300">
                Daily Masnoon Duas
              </span>
            </h1>

            <p className="text-purple-200 text-sm sm:text-base leading-relaxed">
              Strengthen your relationship with Allah through authentic supplications from the Holy Quran and Sahih Sunnah. Complete with Arabic calligraphy, transliteration, English meaning, and audio recitations.
            </p>

            {/* Quick action shortcuts */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="text-xs text-purple-300 font-semibold">Quick Access:</span>
              <button
                onClick={() => setSelectedCategory('quran_study')}
                className="px-3 py-1 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-xs font-bold transition cursor-pointer"
              >
                Quran Study Duas
              </button>
              <button
                onClick={() => setSelectedCategory('morning_evening')}
                className="px-3 py-1 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-xs font-bold transition cursor-pointer"
              >
                Sayyid al-Istighfar
              </button>
              <button
                onClick={() => setSelectedCategory('hardship')}
                className="px-3 py-1 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-xs font-bold transition cursor-pointer"
              >
                Duas for Ease
              </button>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-purple-100 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Dua (e.g. knowledge, sleep, travel, parents)..."
                className="w-full pl-10 pr-4 py-2.5 bg-purple-50/50 border border-purple-200 rounded-xl text-xs sm:text-sm text-purple-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-bold text-purple-900">{filteredDuas.length}</span>
              <span>Duas found</span>
              {bookmarkedIds.length > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-pink-100 text-pink-700 font-bold rounded-full">
                  {bookmarkedIds.length} Saved
                </span>
              )}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-800 to-pink-600 text-white shadow-md shadow-pink-500/20'
                      : 'bg-purple-50/60 text-purple-900 hover:bg-purple-100 border border-purple-100'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                  {cat.id === 'bookmarked' && (
                    <span className="ml-1 px-1.5 py-0.2 bg-white/20 rounded-full text-[10px]">
                      {bookmarkedIds.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Duas List Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredDuas.map((dua) => {
            const isBookmarked = bookmarkedIds.includes(dua.id);
            const isPlaying = playingDuaId === dua.id;
            const isCopied = copiedId === dua.id;

            return (
              <div
                key={dua.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-purple-100 shadow-sm hover:shadow-md hover:border-purple-300 transition space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  
                  {/* Top Bar: Title & Actions */}
                  <div className="flex items-start justify-between gap-3 border-b border-purple-100 pb-3">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black uppercase tracking-wider bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-full inline-block">
                        {dua.category.replace('_', ' ')}
                      </span>
                      <h3 className="text-base font-extrabold text-purple-950">
                        {dua.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {/* Play Audio Button */}
                      <button
                        onClick={() => handlePlayArabic(dua)}
                        className={`p-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                          isPlaying
                            ? 'bg-pink-600 text-white animate-pulse'
                            : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                        }`}
                        title="Listen to Arabic recitation"
                      >
                        <Volume2 className="w-4 h-4" />
                        <span className="hidden sm:inline">{isPlaying ? 'Playing...' : 'Audio'}</span>
                      </button>

                      {/* Copy Button */}
                      <button
                        onClick={() => handleCopyDua(dua)}
                        className="p-2 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 transition cursor-pointer"
                        title="Copy Dua"
                      >
                        {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>

                      {/* Bookmark Button */}
                      <button
                        onClick={() => toggleBookmark(dua.id)}
                        className={`p-2 rounded-xl transition cursor-pointer ${
                          isBookmarked
                            ? 'bg-pink-100 text-pink-600'
                            : 'bg-purple-50 text-slate-400 hover:text-purple-700 hover:bg-purple-100'
                        }`}
                        title={isBookmarked ? 'Remove Bookmark' : 'Save Dua'}
                      >
                        <Bookmark className="w-4 h-4 fill-current" />
                      </button>
                    </div>
                  </div>

                  {/* Arabic Text Display */}
                  <div className="p-5 bg-gradient-to-r from-purple-50/70 via-pink-50/30 to-purple-50/70 rounded-2xl border border-purple-100 text-right">
                    <p className="font-quran text-2xl sm:text-3xl text-purple-950 leading-loose" dir="rtl">
                      {dua.arabic}
                    </p>
                  </div>

                  {/* Transliteration */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase text-purple-700 tracking-wider">Pronunciation Guide</span>
                    <p className="text-xs text-purple-900 font-medium italic leading-relaxed">
                      {dua.transliteration}
                    </p>
                  </div>

                  {/* English Translation */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Meaning</span>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                      &quot;{dua.englishTranslation}&quot;
                    </p>
                  </div>
                </div>

                {/* Footer: Hadith Reference & Virtue */}
                <div className="pt-4 border-t border-purple-100 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-bold text-purple-950 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      {dua.reference}
                    </span>
                    {isCopied && (
                      <span className="text-emerald-600 font-bold">Copied to clipboard!</span>
                    )}
                  </div>

                  {dua.virtue && (
                    <div className="p-2.5 bg-amber-50/80 rounded-xl border border-amber-200/60 text-[11px] text-amber-950">
                      <strong>Benefit:</strong> {dua.virtue}
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredDuas.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-purple-100 space-y-4">
            <BookMarked className="w-12 h-12 text-purple-300 mx-auto" />
            <h4 className="text-xl font-bold text-purple-950">No Duas matched your search</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try searching with different terms or select &apos;All Duas&apos; to view our complete collection.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 bg-purple-700 text-white rounded-xl text-xs font-bold hover:bg-purple-800 transition cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
