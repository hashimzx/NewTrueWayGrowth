import React, { useState } from 'react';
import { 
  Heart, 
  Search, 
  Volume2, 
  Bookmark, 
  BookmarkCheck, 
  Eye, 
  EyeOff, 
  Sparkles, 
  CheckCircle2, 
  BookOpen,
  Filter
} from 'lucide-react';
import { AUTHENTIC_DUAS } from '../../data/duasData';
import { IslamicDua } from '../../types';
import { audioEngine } from '../../utils/audioSynth';
import { toggleStudentBookmark, isItemBookmarked } from '../../utils/studentLearningStorage';

interface PortalDuasSectionProps {
  studentId: string;
  studentName: string;
  onBookmarkChanged?: () => void;
}

// 15 Categories defined by requirement
export const DUA_CATEGORIES = [
  { id: 'all', label: 'All 15 Categories' },
  { id: 'morning_evening', label: '1. Morning & Evening' },
  { id: 'sleep', label: '2. Sleeping & Waking Up' },
  { id: 'eating', label: '3. Eating & Drinking' },
  { id: 'home', label: '4. Entering & Leaving Home' },
  { id: 'mosque', label: '5. Entering & Leaving Mosque' },
  { id: 'wudu', label: '6. Before & After Wudu' },
  { id: 'travel', label: '7. Traveling' },
  { id: 'parents', label: '8. Parents & Family' },
  { id: 'forgiveness', label: '9. Forgiveness & Istighfar' },
  { id: 'knowledge', label: '10. Knowledge & Understanding' },
  { id: 'protection', label: '11. Protection & Ayat al-Kursi' },
  { id: 'difficulty', label: '12. Difficulties & Anxiety' },
  { id: 'health', label: '13. Health & Sickness' },
  { id: 'success', label: '14. Success & Ease' },
  { id: 'after_salah', label: '15. After Obligatory Salah' }
];

export const COMPREHENSIVE_15_DUAS: Array<IslamicDua & { subCategory: string; explanationText: string }> = [
  // 1. Morning & Evening
  {
    id: 'dua-cat-1',
    category: 'morning_evening',
    subCategory: 'morning_evening',
    title: 'Sayyid al-Istighfar (Chief of All Prayers for Forgiveness)',
    arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَىٰ عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
    transliteration: 'Allahumma Anta Rabbi la ilaha illa Anta, khalaqtani wa ana \'abduka, wa ana \'ala \'ahdika wa wa\'dika mastata\'tu, a\'udhu bika min sharri ma sana\'tu, abu\'u laka bi ni\'matika \'alayya wa abu\'u bi dhanbi faghfir li fa innahu la yaghfirudh-dhunooba illa Ant.',
    englishTranslation: 'O Allah, You are my Lord; there is no deity worthy of worship except You. You created me and I am Your servant, and I abide by Your covenant and promise as best as I can. I seek refuge in You from the evil of what I have done. I acknowledge Your favors upon me and I acknowledge my sin, so forgive me, for none forgives sins except You.',
    reference: 'Sahih al-Bukhari 6306',
    virtue: 'The Prophet ﷺ said whoever recites this with firm faith in the morning and dies before evening will enter Paradise.',
    explanationText: 'Combines supreme praise, submission to divine servitude, gratitude for blessings, confession of shortcomings, and exclusive plea for divine pardon.'
  },
  // 2. Before Sleeping & After Waking Up
  {
    id: 'dua-cat-2a',
    category: 'daily',
    subCategory: 'sleep',
    title: 'Dua Before Sleeping',
    arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    transliteration: 'Bismika Allahumma amootu wa ahya.',
    englishTranslation: 'In Your name, O Allah, I die and I live.',
    reference: 'Sahih al-Bukhari 6324',
    virtue: 'Entrusts soul into Allah\'s divine preservation while sleeping.',
    explanationText: 'Sleep is described in the Quran as the minor death; this Dua places our soul in Allah\'s loving care.'
  },
  {
    id: 'dua-cat-2b',
    category: 'daily',
    subCategory: 'sleep',
    title: 'Dua Upon Waking Up',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    transliteration: 'Al-hamdu lillahil-ladhi ahyana ba\'da ma amatana wa ilayhin-nushoor.',
    englishTranslation: 'All praise belongs to Allah Who brought us back to life after giving us death, and unto Him is the resurrection.',
    reference: 'Sahih al-Bukhari 6312',
    virtue: 'Awakens the soul with profound gratitude and remembrance of the Day of Judgment.',
    explanationText: 'The very first breath upon waking begins with Tahmid (Praise of Allah) and acknowledging the resurrection.'
  },
  // 3. Before Eating & After Eating
  {
    id: 'dua-cat-3a',
    category: 'daily',
    subCategory: 'eating',
    title: 'Dua Before Eating & Drinking',
    arabic: 'بِسْمِ اللَّهِ وَعَلَىٰ بَرَكَةِ اللَّهِ',
    transliteration: 'Bismillahi wa \'ala barakatillah.',
    englishTranslation: 'In the name of Allah and with the blessings of Allah.',
    reference: 'Sunan Abi Dawud 3767 & Al-Hakim',
    virtue: 'Invites divine barakah into the meal and prevents Satan from sharing the sustenance.',
    explanationText: 'If forgotten at the beginning, say: "Bismillahi awwalahu wa aakhirahu" (In the name of Allah at its start and finish).'
  },
  {
    id: 'dua-cat-3b',
    category: 'daily',
    subCategory: 'eating',
    title: 'Dua After Finishing a Meal',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ',
    transliteration: 'Al-hamdu lillahil-ladhi at\'amana wa saqana wa ja\'alana muslimeen.',
    englishTranslation: 'All praise is due to Allah Who has fed us, given us drink, and made us Muslims.',
    reference: 'Sunan Abi Dawud 3850 & At-Tirmidhi 3457',
    virtue: 'Forgiveness of past minor sins for thanking Allah upon nourishment.',
    explanationText: 'Acknowledges that nourishment and hydration are unearned gifts from the Creator, paired with gratitude for the gift of Islam.'
  },
  // 4. Entering & Leaving Home
  {
    id: 'dua-cat-4a',
    category: 'daily',
    subCategory: 'home',
    title: 'Dua When Leaving the Home',
    arabic: 'بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    transliteration: 'Bismillahi, tawakkaltu \'alallahi, wa la hawla wa la quwwata illa billah.',
    englishTranslation: 'In the name of Allah, I place my trust in Allah; there is no might nor power except with Allah.',
    reference: 'Sunan Abi Dawud 5095 (Sahih)',
    virtue: 'It is said by the angels: "You are guided, defended, and protected," and devils retreat.',
    explanationText: 'Affirms absolute reliance on Allah (Tawakkul) before stepping into the world.'
  },
  {
    id: 'dua-cat-4b',
    category: 'daily',
    subCategory: 'home',
    title: 'Dua When Entering the Home',
    arabic: 'بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَىٰ رَبِّنَا تَوَكَّلْنَا',
    transliteration: 'Bismillahi walajna, wa bismillahi kharajna, wa \'ala Rabbina tawakkalna.',
    englishTranslation: 'In the name of Allah we enter, and in the name of Allah we leave, and upon our Lord we place our trust.',
    reference: 'Sunan Abi Dawud 5096',
    virtue: 'Brings peace and angels into the household, expelling negative demonic spirits.',
    explanationText: 'Follow with greeting family members with "As-salamu \'alaykum wa rahmatullah".'
  },
  // 5. Entering & Leaving Mosque
  {
    id: 'dua-cat-5a',
    category: 'prayer',
    subCategory: 'mosque',
    title: 'Dua Entering the Mosque (Masjid)',
    arabic: 'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
    transliteration: 'Allahummaf-tah li abwaba rahmatik.',
    englishTranslation: 'O Allah, open the gates of Your mercy for me.',
    reference: 'Sahih Muslim 713',
    virtue: 'Enter with right foot first while seeking Allah\'s vast spiritual mercy.',
    explanationText: 'The mosque is the house of divine mercy, tranquility, and congregational worship.'
  },
  {
    id: 'dua-cat-5b',
    category: 'prayer',
    subCategory: 'mosque',
    title: 'Dua Leaving the Mosque',
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ',
    transliteration: 'Allahumma inni as\'aluka min fadlik.',
    englishTranslation: 'O Allah, I ask You from Your divine bounty and grace.',
    reference: 'Sahih Muslim 713',
    virtue: 'Step out with left foot first, returning to daily work with Allah\'s blessings.',
    explanationText: 'Inside the mosque we seek spiritual mercy; outside the mosque we seek lawful bounty (Fadl).'
  },
  // 6. Before & After Wudu
  {
    id: 'dua-cat-6',
    category: 'prayer',
    subCategory: 'wudu',
    title: 'Dua After Completing Wudu',
    arabic: 'أَشْهَدُ أَنْ لَّا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ ۝ اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ',
    transliteration: 'Ash-hadu alla ilaha illallahu wahdahu la shareeka lahu wa ash-hadu anna Muhammadan \'abduhu wa rasooluh. Allahummaj-\'alni minat-tawwabeena waj-\'alni minal-mutatahhireen.',
    englishTranslation: 'I bear witness that there is no deity worthy of worship except Allah alone without partner, and Muhammad is His servant and messenger. O Allah, make me among those who constantly repent and make me among those who purify themselves.',
    reference: 'Jami\' at-Tirmidhi 55 (Sahih)',
    virtue: 'Whoever recites this, all eight gates of Paradise open for them to enter from whichever they wish.',
    explanationText: 'Pairs outer physical purity with inner spiritual repentance (Tawbah).'
  },
  // 7. Traveling
  {
    id: 'dua-cat-7',
    category: 'daily',
    subCategory: 'travel',
    title: 'Dua for Safe Journey & Travel',
    arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ ۝ وَإِنَّا إِلَىٰ رَبِّنَا لَمُنقَلِبُونَ',
    transliteration: 'Subhanal-ladhi sakh-khara lana hadha wa ma kunna lahu muqrinin, wa inna ila Rabbina lamunqaliboon.',
    englishTranslation: 'Glory unto Him Who has subjected this to us, and we were not capable of subduing it ourselves; and indeed, unto our Lord we will certainly return.',
    reference: 'Surah Az-Zukhruf (43:13-14) & Sahih Muslim 1342',
    virtue: 'Divine shield over cars, airplanes, ships, and passengers throughout travel.',
    explanationText: 'Reminds the traveler that mechanical transport is made possible by Allah, evoking the ultimate return to our Lord.'
  },
  // 8. Parents
  {
    id: 'dua-cat-8',
    category: 'daily',
    subCategory: 'parents',
    title: 'Quranic Dua for Parents',
    arabic: 'رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    transliteration: 'Rabbir-hamhuma kama rabbayani sagheera.',
    englishTranslation: 'My Lord, have mercy upon them both as they brought me up when I was small.',
    reference: 'Surah Al-Isra (17:24)',
    virtue: 'Elevates parental status in Jannah and brings lifelong barakah to the children.',
    explanationText: 'Recite frequently after every prayer for living and departed parents.'
  },
  // 9. Forgiveness
  {
    id: 'dua-cat-9',
    category: 'forgiveness',
    subCategory: 'forgiveness',
    title: 'Dua of Prophet Yunus (Dhun-Nun) in the Whale',
    arabic: 'لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ',
    transliteration: 'La ilaha illa Anta subhanaka inni kuntu minadh-dhalimeen.',
    englishTranslation: 'There is no deity except You; exalted are You! Indeed, I have been of the wrongdoers.',
    reference: 'Surah Al-Anbiya (21:87) & Sunan at-Tirmidhi 3505',
    virtue: 'The Prophet ﷺ said no Muslim ever supplication with this in distress except that Allah relieves their hardship.',
    explanationText: 'A formula of instant spiritual breakthrough: affirms Tawheed, glorifies Allah, and humbly acknowledges one\'s faults.'
  },
  // 10. Knowledge
  {
    id: 'dua-cat-10',
    category: 'quran_study',
    subCategory: 'knowledge',
    title: 'Dua for Increase in Sacred Quranic Knowledge',
    arabic: 'رَّبِّ زِدْنِي عِلْمًا',
    transliteration: 'Rabbi zidni \'ilma.',
    englishTranslation: 'My Lord, increase me in knowledge.',
    reference: 'Surah Ta-Ha (20:114)',
    virtue: 'The only thing Allah commanded the Prophet ﷺ to seek an increase of in the Quran.',
    explanationText: 'Essential prayer recited before starting Quran classes, Qaida revision, and memorization sessions.'
  },
  // 11. Protection
  {
    id: 'dua-cat-11',
    category: 'protection',
    subCategory: 'protection',
    title: 'Ayat al-Kursi (The Throne Verse - Ultimate Protection)',
    arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
    transliteration: 'Allahu la ilaha illa Huwal-Hayyul-Qayyum. La ta\'khudhuhu sinatuw-wa la nawm. Lahu ma fis-samawati wa ma fil-ard. Man dhal-ladhi yashfa\'u \'indahu illa bi-idhnih. Ya\'lamu ma bayna aydihim wa ma khalfahum, wa la yuheetoona bi-shay\'im-min \'ilmihi illa bima sha\'a. Wasi\'a kursiyyuhus-samawati wal-ard, wa la ya\'ooduhu hifdhuhuma, wa Huwal-\'Aliyyul-\'Adheem.',
    englishTranslation: 'Allah! There is no deity except Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and on earth. Who can intercede with Him except by His permission? He knows what is before them and what is behind them, while they encompass nothing of His knowledge except what He wills. His Kursi extends over the heavens and earth, and their preservation tires Him not. And He is the Most High, the Most Great.',
    reference: 'Surah Al-Baqarah (2:255)',
    virtue: 'Recited after each obligatory prayer guarantees entry into Paradise upon death; protects from all evil.',
    explanationText: 'The greatest verse in the Holy Quran, celebrating Allah\'s eternal vigilance, sovereignty, and divine grandeur.'
  },
  // 12. Difficulties
  {
    id: 'dua-cat-12',
    category: 'daily',
    subCategory: 'difficulty',
    title: 'Dua During Anxiety, Stress, and Distress',
    arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ',
    transliteration: 'Allahumma inni a\'udhu bika minal-hammi wal-hazani, wal-\'ajzi wal-kasali, wal-bukhli wal-jubni, wa dala\'id-dayni wa ghalabatir-rijal.',
    englishTranslation: 'O Allah, I seek refuge in You from anxiety and sorrow, from inability and laziness, from stinginess and cowardice, and from the burden of debt and being overpowered by men.',
    reference: 'Sahih al-Bukhari 6363',
    virtue: 'Shields the believer against psychological distress, clinical apathy, and financial oppression.',
    explanationText: 'A comprehensive medical and psychological supplication taught by Prophet Muhammad ﷺ.'
  },
  // 13. Health
  {
    id: 'dua-cat-13',
    category: 'daily',
    subCategory: 'health',
    title: 'Dua for Physical and Spiritual Health & Well-being',
    arabic: 'اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَٰهَ إِلَّا أَنْتَ',
    transliteration: 'Allahumma \'aafini fee badani, Allahumma \'aafini fee sam\'i, Allahumma \'aafini fee basari, la ilaha illa Ant.',
    englishTranslation: 'O Allah, grant health to my body. O Allah, grant health to my hearing. O Allah, grant health to my sight. There is no deity except You.',
    reference: 'Sunan Abi Dawud 5090',
    virtue: 'Recited 3 times every morning and evening for physical stamina and preservation of senses.',
    explanationText: 'Directs gratitude and preservation toward the faculties of body, ears, and eyes which serve Allah.'
  },
  // 14. Success
  {
    id: 'dua-cat-14',
    category: 'daily',
    subCategory: 'success',
    title: 'Dua for Ease and Success in Tasks and Exams',
    arabic: 'اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا، وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلًا',
    transliteration: 'Allahumma la sahla illa ma ja\'altahu sahlan, wa Anta taj\'alul-hazna idha shi\'ta sahlan.',
    englishTranslation: 'O Allah, there is no ease except that which You have made easy, and You make hardship easy if You will.',
    reference: 'Sahih Ibn Hibban 974',
    virtue: 'Brings calm focus before exams, interviews, difficult conversations, and challenging projects.',
    explanationText: 'Relieves stress by recognizing that all ease and facilitation originate solely from Allah\'s grace.'
  },
  // 15. After Salah
  {
    id: 'dua-cat-15',
    category: 'prayer',
    subCategory: 'after_salah',
    title: 'Dua Immediately After Finishing Obligatory Salah',
    arabic: 'اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ',
    transliteration: 'Allahumma Antas-Salamu wa minkas-salam, tabarakta ya Dhal-Jalali wal-Ikram.',
    englishTranslation: 'O Allah, You are Peace, and from You comes all peace. Blessed are You, O Owner of Majesty and Honor.',
    reference: 'Sahih Muslim 591',
    virtue: 'Sunnah recited immediately after concluding prayer with Tasleem.',
    explanationText: 'Acknowledges that the true peace of mind and soul we experienced in prayer originates exclusively from Allah.'
  }
];

export const PortalDuasSection: React.FC<PortalDuasSectionProps> = ({
  studentId,
  studentName,
  onBookmarkChanged
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [speakingDuaId, setSpeakingDuaId] = useState<string | null>(null);
  const [memorizationMode, setMemorizationMode] = useState<boolean>(false);
  const [hiddenDuaIds, setHiddenDuaIds] = useState<Set<string>>(new Set());

  const handleSpeak = async (dua: IslamicDua) => {
    if (speakingDuaId === dua.id) {
      audioEngine.stopVoice();
      setSpeakingDuaId(null);
      return;
    }
    setSpeakingDuaId(dua.id);
    await audioEngine.speakArabic(dua.arabic, 0.85);
    setSpeakingDuaId(null);
  };

  const handleToggleBookmark = (dua: IslamicDua) => {
    toggleStudentBookmark(studentId, studentName, {
      type: 'dua',
      title: dua.title,
      arabicText: dua.arabic,
      englishTranslation: dua.englishTranslation,
      reference: dua.reference
    });
    if (onBookmarkChanged) onBookmarkChanged();
  };

  const toggleHideDua = (id: string) => {
    setHiddenDuaIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const filteredDuas = COMPREHENSIVE_15_DUAS.filter(d => {
    const matchesCategory = selectedCategory === 'all' || d.subCategory === selectedCategory;
    const matchesSearch = 
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.englishTranslation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.transliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.reference.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#6E1373] via-[#851C82] to-[#561F79] text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-purple-200">
              <Heart className="w-3.5 h-3.5 text-pink-300" />
              <span>Authentic Fortress of the Muslim (Hisn al-Muslim)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Daily Duas & Supplications
            </h2>
            <p className="text-xs sm:text-sm text-purple-100 max-w-2xl">
              15 categorized sections covering every moment of your day with Arabic recitation, English transliteration, comprehensive translations, authentic references, and audio pronunciation.
            </p>
          </div>

          <button
            onClick={() => {
              setMemorizationMode(!memorizationMode);
              if (!memorizationMode) setHiddenDuaIds(new Set());
            }}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer shadow-xs ${
              memorizationMode
                ? 'bg-amber-400 text-slate-950'
                : 'bg-white/20 hover:bg-white/30 text-white'
            }`}
          >
            {memorizationMode ? <EyeOff className="w-4 h-4 text-amber-900" /> : <Eye className="w-4 h-4" />}
            <span>{memorizationMode ? 'Exit Memorization' : 'Memorization Mode'}</span>
          </button>
        </div>
      </div>

      {/* Category Pills & Search */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Duas by keyword, title, meaning, or reference (e.g. parents, sleeping, travel)..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6E1373] text-slate-900"
          />
        </div>

        {/* 15 Category Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {DUA_CATEGORIES.map(cat => (
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

      {/* Duas Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredDuas.map((dua) => {
          const isSpeaking = speakingDuaId === dua.id;
          const isBookmarked = isItemBookmarked(studentId, studentName, 'dua', { title: dua.title });
          const isHidden = memorizationMode && hiddenDuaIds.has(dua.id);

          return (
            <div
              key={dua.id}
              className={`bg-white rounded-3xl border transition-all p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4 ${
                isSpeaking 
                  ? 'border-[#851C82] ring-2 ring-purple-100 bg-purple-50/20' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="space-y-3">
                {/* Header: Title & Action buttons */}
                <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      {dua.title}
                    </h3>
                    <span className="text-[11px] font-medium text-[#851C82] bg-purple-100 px-2.5 py-0.5 rounded-full inline-block mt-1">
                      {dua.reference}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {/* Audio Recite */}
                    <button
                      onClick={() => handleSpeak(dua)}
                      className={`p-2 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1 ${
                        isSpeaking
                          ? 'bg-amber-500 text-slate-950 animate-pulse'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                      title="Listen to Arabic recitation"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{isSpeaking ? 'Playing' : 'Recite'}</span>
                    </button>

                    {/* Bookmark */}
                    <button
                      onClick={() => handleToggleBookmark(dua)}
                      className={`p-2 rounded-xl text-xs transition cursor-pointer ${
                        isBookmarked
                          ? 'bg-purple-100 text-[#6E1373]'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                      }`}
                      title={isBookmarked ? 'Remove Bookmark' : 'Bookmark this Dua'}
                    >
                      {isBookmarked ? <BookmarkCheck className="w-4 h-4 fill-[#6E1373]" /> : <Bookmark className="w-4 h-4" />}
                    </button>

                    {/* Memorization Hide/Reveal */}
                    {memorizationMode && (
                      <button
                        onClick={() => toggleHideDua(dua.id)}
                        className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs transition cursor-pointer"
                        title="Reveal / Hide translation for testing"
                      >
                        {isHidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                    )}
                  </div>
                </div>

                {/* Arabic Text */}
                <div className="py-2 text-right">
                  <p 
                    dir="rtl"
                    className="text-xl sm:text-2xl font-arabic text-slate-900 leading-loose"
                  >
                    {dua.arabic}
                  </p>
                </div>

                {/* Transliteration */}
                <div className="pt-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                    Transliteration
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-purple-900/90 italic leading-relaxed">
                    {dua.transliteration}
                  </p>
                </div>

                {/* English Translation */}
                <div className={`bg-slate-50/80 rounded-2xl p-4 border border-slate-100 transition-all ${
                  isHidden ? 'blur-md select-none' : ''
                }`}>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    English Meaning
                  </span>
                  <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                    {dua.englishTranslation}
                  </p>
                </div>

                {/* Meaning & Virtue Note */}
                <div className="bg-emerald-50/60 rounded-xl p-3 border border-emerald-100 text-xs text-emerald-950 space-y-1">
                  <p className="font-semibold text-emerald-900 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Virtue & Spiritual Benefit:</span>
                  </p>
                  <p className="text-slate-700 leading-relaxed text-[11px] sm:text-xs">
                    {dua.virtue}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
