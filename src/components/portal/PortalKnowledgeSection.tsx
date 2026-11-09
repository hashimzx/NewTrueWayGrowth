import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  BookOpen, 
  Heart, 
  Compass, 
  Moon, 
  Sun, 
  CheckCircle2, 
  Volume2, 
  Bookmark, 
  BookmarkCheck,
  ChevronRight,
  Layers,
  Award
} from 'lucide-react';
import { ASMA_UL_HUSNA, STORIES_OF_PROPHETS, ISLAMIC_MANNERS_DATA, NameOfAllah, ProphetStory, IslamicMannerLesson } from '../../data/islamicKnowledgeData';
import { HAJJ_UMRAH_GUIDE, ISLAMIC_EVENTS } from '../../data/islamicResourcesData';
import { audioEngine } from '../../utils/audioSynth';
import { toggleStudentBookmark, isItemBookmarked } from '../../utils/studentLearningStorage';

interface PortalKnowledgeSectionProps {
  studentId: string;
  studentName: string;
  initialTopic?: 'names_of_allah' | 'prophets' | 'manners' | 'ramadan' | 'hajj';
  onBookmarkChanged?: () => void;
}

export const PortalKnowledgeSection: React.FC<PortalKnowledgeSectionProps> = ({
  studentId,
  studentName,
  initialTopic = 'names_of_allah',
  onBookmarkChanged
}) => {
  const [activeTopic, setActiveTopic] = useState<'names_of_allah' | 'prophets' | 'manners' | 'ramadan' | 'hajj'>(initialTopic);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProphetId, setSelectedProphetId] = useState<string>(STORIES_OF_PROPHETS[0].id);

  // Manners interactive check
  const [mannerChecklist, setMannerChecklist] = useState<Record<string, boolean>>({});

  const handleSpeakArabic = async (text: string) => {
    await audioEngine.speakArabic(text, 0.85);
  };

  const handleBookmarkName = (item: NameOfAllah) => {
    toggleStudentBookmark(studentId, studentName, {
      type: 'name_of_allah',
      title: `${item.number}. ${item.transliteration} (${item.meaning})`,
      arabicText: item.arabic,
      englishTranslation: item.explanation,
      reference: item.quranicReference
    });
    if (onBookmarkChanged) onBookmarkChanged();
  };

  const handleBookmarkProphet = (story: ProphetStory) => {
    toggleStudentBookmark(studentId, studentName, {
      type: 'prophet',
      title: story.name,
      arabicText: story.arabicName,
      englishTranslation: story.title,
      reference: story.quranicMention
    });
    if (onBookmarkChanged) onBookmarkChanged();
  };

  const filteredNames = ASMA_UL_HUSNA.filter(n => 
    n.transliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.arabic.includes(searchQuery) ||
    String(n.number) === searchQuery.trim()
  );

  const activeProphet = STORIES_OF_PROPHETS.find(p => p.id === selectedProphetId) || STORIES_OF_PROPHETS[0];

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#6E1373] via-[#851C82] to-[#561F79] text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-purple-200">
            <Compass className="w-3.5 h-3.5 text-amber-300" />
            <span>Islamic Sciences & Spiritual Wisdom</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Islamic Knowledge, History & Manners
          </h2>
          <p className="text-xs sm:text-sm text-purple-100 max-w-2xl">
            Explore the 99 Beautiful Names of Allah (Asma-ul-Husna), the inspiring Stories of the Prophets (Qisas al-Anbiya), Islamic manners for youth, Ramadan guidelines, and the Hajj pilgrimage.
          </p>
        </div>
      </div>

      {/* Sub-Topic Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {[
          { id: 'names_of_allah', label: '1. 99 Names of Allah', icon: Sparkles },
          { id: 'prophets', label: '2. Stories of Prophets', icon: BookOpen },
          { id: 'manners', label: '3. Manners for Children', icon: Heart },
          { id: 'ramadan', label: '4. Ramadan & Fasting', icon: Moon },
          { id: 'hajj', label: '5. Hajj & Umrah Guide', icon: Compass }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTopic(tab.id as typeof activeTopic)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold shrink-0 transition cursor-pointer flex items-center gap-2 ${
                activeTopic === tab.id
                  ? 'bg-[#6E1373] text-white shadow-sm'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TOPIC 1: 99 NAMES OF ALLAH (ASMA-UL-HUSNA) */}
      {activeTopic === 'names_of_allah' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Asma-ul-Husna by Arabic name, English transliteration, or meaning (e.g. Rahman, King, Peace)..."
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6E1373] text-slate-900"
              />
            </div>
            <p className="text-xs text-slate-500">
              The Prophet ﷺ said: "Allah has ninety-nine names; whoever enumerates and lives by them will enter Paradise." (Sahih al-Bukhari)
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredNames.map(name => {
              const isBookmarked = isItemBookmarked(studentId, studentName, 'name_of_allah', {
                title: `${name.number}. ${name.transliteration} (${name.meaning})`
              });

              return (
                <div
                  key={name.number}
                  className="bg-white rounded-3xl border border-slate-200 hover:border-purple-300 transition-all p-5 shadow-xs flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="w-7 h-7 rounded-full bg-purple-100 text-[#6E1373] text-xs font-bold flex items-center justify-center">
                        #{name.number}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleSpeakArabic(name.arabic)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                          title="Listen"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleBookmarkName(name)}
                          className={`p-1.5 rounded-lg transition cursor-pointer ${
                            isBookmarked ? 'bg-purple-100 text-[#6E1373]' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {isBookmarked ? <BookmarkCheck className="w-3.5 h-3.5 fill-[#6E1373]" /> : <Bookmark className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div className="text-center py-2 bg-purple-50/50 rounded-2xl border border-purple-100">
                      <p dir="rtl" className="text-2xl font-arabic font-bold text-slate-900">
                        {name.arabic}
                      </p>
                      <p className="text-xs font-bold text-[#851C82] mt-0.5">
                        {name.transliteration}
                      </p>
                    </div>

                    <h5 className="font-bold text-slate-900 text-xs sm:text-sm text-center">
                      {name.meaning}
                    </h5>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {name.explanation}
                    </p>
                  </div>

                  <div className="bg-emerald-50/60 rounded-xl p-2.5 text-[11px] text-emerald-950 border border-emerald-100">
                    <strong>Reflection:</strong> {name.reflection}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TOPIC 2: STORIES OF THE PROPHETS (QISAS AL-ANBIYA) */}
      {activeTopic === 'prophets' && (
        <div className="space-y-6">
          
          {/* Prophet Selector Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {STORIES_OF_PROPHETS.map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedProphetId(p.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold shrink-0 transition cursor-pointer flex items-center gap-2 ${
                  selectedProphetId === p.id
                    ? 'bg-[#6E1373] text-white shadow-sm'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <span>{p.name.split('(')[0]}</span>
                <span className="font-arabic opacity-80 text-xs">{p.arabicName.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Active Prophet Showcase Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-[#851C82] uppercase tracking-wider block">
                  Prophetic Journey · {activeProphet.era}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                  {activeProphet.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  {activeProphet.title}
                </p>
              </div>

              <div className="text-right flex items-center gap-2">
                <span className="text-2xl font-arabic font-bold text-[#6E1373]">
                  {activeProphet.arabicName}
                </span>
                <button
                  onClick={() => handleBookmarkProphet(activeProphet)}
                  className="p-2 rounded-xl bg-purple-50 text-[#6E1373] border border-purple-200 cursor-pointer"
                  title="Bookmark this Prophet Story"
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Main Narrative */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                The Divine Story from the Holy Quran
              </span>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal bg-purple-50/30 p-5 rounded-2xl border border-purple-100">
                {activeProphet.mainStory}
              </p>
              <span className="text-xs font-semibold text-[#851C82] block">
                {activeProphet.quranicMention}
              </span>
            </div>

            {/* Trials & Moral Lessons Two Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Trials */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                  Major Trials & Sacrifices:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {activeProphet.majorTrials.map((tr, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-1.5" />
                      <span>{tr}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Moral Lessons */}
              <div className="bg-emerald-50/60 rounded-2xl p-5 border border-emerald-100 space-y-2">
                <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider block">
                  Enduring Moral Lessons for Us:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {activeProphet.moralLessons.map((ml, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{ml}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOPIC 3: ISLAMIC MANNERS FOR CHILDREN & YOUTH */}
      {activeTopic === 'manners' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Islamic Manners & Character Building (Adab & Akhlaq)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              Specially designed for young students and beginners with real-life scenarios, Prophetic advice, and practical action checklists.
            </p>

            <div className="space-y-5 pt-2">
              {ISLAMIC_MANNERS_DATA.map(manner => (
                <div key={manner.id} className="bg-slate-50 rounded-3xl p-5 sm:p-6 border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                    <div>
                      <span className="text-xs font-bold text-[#851C82] block">{manner.topic}</span>
                      <h4 className="text-base sm:text-lg font-bold text-slate-900">{manner.title}</h4>
                    </div>
                  </div>

                  {/* Real-life Scenario */}
                  <div className="bg-white rounded-2xl p-4 border border-slate-200 space-y-1 text-xs sm:text-sm">
                    <span className="font-bold text-amber-900 block">Everyday Scenario:</span>
                    <p className="text-slate-700 italic">"{manner.scenario}"</p>
                  </div>

                  {/* Prophetic Guidance */}
                  <div className="bg-purple-50/70 rounded-2xl p-4 border border-purple-200 text-xs sm:text-sm space-y-1">
                    <span className="font-bold text-[#6E1373] block">Prophetic Guidance & Quranic Command:</span>
                    <p className="text-slate-700 leading-relaxed">{manner.propheticGuidance}</p>
                  </div>

                  {/* Action Items Checklist */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-900 block">Action Habits to Practice:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {manner.actionItems.map((act, aIdx) => {
                        const checkKey = `${manner.id}-${aIdx}`;
                        const isChecked = !!mannerChecklist[checkKey];
                        return (
                          <button
                            key={aIdx}
                            onClick={() => setMannerChecklist(prev => ({ ...prev, [checkKey]: !prev[checkKey] }))}
                            className={`p-3 rounded-xl border text-left text-xs transition cursor-pointer flex items-start gap-2.5 ${
                              isChecked
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-medium'
                                : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
                            }`}
                          >
                            <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isChecked ? 'text-emerald-600' : 'text-slate-300'}`} />
                            <span>{act}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 italic pt-1">
                    Question for reflection: {manner.reflectionQuestion}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TOPIC 4: RAMADAN & FASTING */}
      {activeTopic === 'ramadan' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#6E1373] flex items-center justify-center font-bold">
                <Moon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  Ramadan, Fasting, Taraweeh & Laylatul Qadr
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Comprehensive spiritual and practical manual for the blessed month of Quran revelation.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Sehri & Iftar Duas */}
              <div className="bg-purple-50/50 rounded-2xl p-5 border border-purple-100 space-y-3">
                <h4 className="font-bold text-[#6E1373] text-sm sm:text-base">Sehri (Suhoor) & Iftar Supplications</h4>
                
                <div className="bg-white rounded-xl p-3 border border-purple-100 space-y-1">
                  <span className="text-xs font-bold text-slate-700 block">Intention for Fasting (Sehri):</span>
                  <p dir="rtl" className="font-arabic font-bold text-purple-950 text-right">
                    وَبِصَوْمِ غَدٍ نَّوَيْتُ مِنْ شَهْرِ رَمَضَانَ
                  </p>
                  <p className="text-[11px] text-slate-600 italic">Wa bi-sawmi ghadin nawaytu min shahri Ramadan.</p>
                  <p className="text-[11px] text-slate-700">"I intend to fast tomorrow for the month of Ramadan."</p>
                </div>

                <div className="bg-white rounded-xl p-3 border border-purple-100 space-y-1">
                  <span className="text-xs font-bold text-slate-700 block">Dua upon Breaking the Fast (Iftar):</span>
                  <p dir="rtl" className="font-arabic font-bold text-purple-950 text-right">
                    ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللَّهُ
                  </p>
                  <p className="text-[11px] text-slate-600 italic">Dhahabadh-dhama\'u wabtallatil-\'urooqu wa thabatal-ajru in sha Allah.</p>
                  <p className="text-[11px] text-slate-700">"The thirst has gone, the veins are moistened, and the reward is confirmed, if Allah wills." (Abu Dawud)</p>
                </div>
              </div>

              {/* Laylatul Qadr & Taraweeh */}
              <div className="bg-purple-50/50 rounded-2xl p-5 border border-purple-100 space-y-3">
                <h4 className="font-bold text-[#6E1373] text-sm sm:text-base">Taraweeh & Laylatul Qadr (The Night of Decree)</h4>
                
                <p className="text-xs text-slate-700 leading-relaxed">
                  Taraweeh prayer is prayed in pairs of 2 Rakats after Isha. In the last ten nights, seek Laylatul Qadr which is better than 1,000 months of worship.
                </p>

                <div className="bg-white rounded-xl p-3 border border-purple-100 space-y-1">
                  <span className="text-xs font-bold text-[#851C82] block">Special Dua of Laylatul Qadr:</span>
                  <p dir="rtl" className="font-arabic font-bold text-slate-900 text-right">
                    اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي
                  </p>
                  <p className="text-[11px] text-slate-600 italic">Allahumma innaka \'Afuwwun tuhibbul-\'afwa fa\'fu \'anni.</p>
                  <p className="text-[11px] text-slate-700">"O Allah, You are Most Forgiving and You love to forgive, so forgive me." (At-Tirmidhi)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOPIC 5: HAJJ & UMRAH GUIDE */}
      {activeTopic === 'hajj' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  Step-by-Step Interactive Guide to Hajj & Umrah
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  The rites, boundaries (Mawqeet), Tawaf, Sa'i, and five days of Hajj.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {HAJJ_UMRAH_GUIDE.map((step, idx) => (
                <div key={idx} className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#851C82] bg-purple-100 px-2.5 py-0.5 rounded-full">
                      Stage {idx + 1} · {step.category}
                    </span>
                    <span className="font-arabic font-bold text-slate-900 text-sm">
                      {step.arabicTitle}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-base">{step.title}</h4>
                  <p className="text-xs text-slate-600 font-medium">{step.summary}</p>

                  <div className="space-y-1.5 text-xs text-slate-700">
                    <span className="font-bold text-slate-900 block">Actions to Perform:</span>
                    <ul className="space-y-1 list-disc list-inside">
                      {step.steps.map((st, sIdx) => (
                        <li key={sIdx}>{st}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
