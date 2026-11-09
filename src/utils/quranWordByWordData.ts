export interface AyahWordDetail {
  arabic: string;
  transliteration: string;
  english: string;
}

// Exact word-by-word mappings for common and celebrated Surahs
export const EXACT_SURAH_WORD_BY_WORD: Record<string, AyahWordDetail[]> = {
  // Surah 1 (Al-Fatihah)
  '1:1': [
    { arabic: 'بِسْمِ', transliteration: 'Bismi', english: 'In the name (of)' },
    { arabic: 'اللَّهِ', transliteration: 'Allahi', english: 'Allah' },
    { arabic: 'الرَّحْمَٰنِ', transliteration: 'Ar-Rahmani', english: 'the Most Compassionate' },
    { arabic: 'الرَّحِيمِ', transliteration: 'Ar-Raheemi', english: 'the Most Merciful' }
  ],
  '1:2': [
    { arabic: 'الْحَمْدُ', transliteration: 'Al-hamdu', english: '[All] praise' },
    { arabic: 'لِلَّهِ', transliteration: 'lillahi', english: 'is due to Allah' },
    { arabic: 'رَبِّ', transliteration: 'Rabbi', english: 'Lord' },
    { arabic: 'الْعَالَمِينَ', transliteration: 'al-\'alameen', english: 'of the worlds' }
  ],
  '1:3': [
    { arabic: 'الرَّحْمَٰنِ', transliteration: 'Ar-Rahmani', english: 'The Most Compassionate' },
    { arabic: 'الرَّحِيمِ', transliteration: 'Ar-Raheemi', english: 'the Most Merciful' }
  ],
  '1:4': [
    { arabic: 'مَالِكِ', transliteration: 'Maliki', english: 'Master / Sovereign' },
    { arabic: 'يَوْمِ', transliteration: 'Yawmi', english: 'of the Day' },
    { arabic: 'الدِّينِ', transliteration: 'ad-Deen', english: 'of Judgment / Recompense' }
  ],
  '1:5': [
    { arabic: 'إِيَّاكَ', transliteration: 'Iyyaka', english: 'You alone' },
    { arabic: 'نَعْبُدُ', transliteration: 'na\'budu', english: 'we worship' },
    { arabic: 'وَإِيَّاكَ', transliteration: 'wa iyyaka', english: 'and You alone' },
    { arabic: 'نَسْتَعِينُ', transliteration: 'nasta\'een', english: 'we ask for help' }
  ],
  '1:6': [
    { arabic: 'اهْدِنَا', transliteration: 'Ihdina', english: 'Guide us' },
    { arabic: 'الصِّرَاطَ', transliteration: 'as-Sirata', english: 'to the Path' },
    { arabic: 'الْمُسْتَقِيمَ', transliteration: 'al-Mustaqeem', english: 'the Straight' }
  ],
  '1:7': [
    { arabic: 'صِرَاطَ', transliteration: 'Sirata', english: 'The path of' },
    { arabic: 'الَّذِينَ', transliteration: 'al-ladheena', english: 'those whom' },
    { arabic: 'أَنْعَمْتَ', transliteration: 'an\'amta', english: 'You have bestowed favor' },
    { arabic: 'عَلَيْهِمْ', transliteration: '\'alayhim', english: 'upon them' },
    { arabic: 'غَيْرِ', transliteration: 'ghayri', english: 'not of' },
    { arabic: 'الْمَغْضُوبِ', transliteration: 'al-maghdoobi', english: 'those who evoked anger' },
    { arabic: 'عَلَيْهِمْ', transliteration: '\'alayhim', english: 'upon themselves' },
    { arabic: 'وَلَا', transliteration: 'wa la', english: 'and nor of' },
    { arabic: 'الضَّالِّينَ', transliteration: 'ad-daalleen', english: 'those who went astray' }
  ],
  // Surah 112 (Al-Ikhlas)
  '112:1': [
    { arabic: 'قُلْ', transliteration: 'Qul', english: 'Say' },
    { arabic: 'هُوَ', transliteration: 'Huwa', english: 'He is' },
    { arabic: 'اللَّهُ', transliteration: 'Allahu', english: 'Allah' },
    { arabic: 'أَحَدٌ', transliteration: 'Ahad', english: '[Who is] One' }
  ],
  '112:2': [
    { arabic: 'اللَّهُ', transliteration: 'Allahu', english: 'Allah' },
    { arabic: 'الصَّمَدُ', transliteration: 'as-Samad', english: 'the Eternal Refuge / Self-Sufficient' }
  ],
  '112:3': [
    { arabic: 'لَمْ', transliteration: 'Lam', english: 'He does not' },
    { arabic: 'يَلِدْ', transliteration: 'yalid', english: 'beget' },
    { arabic: 'وَلَمْ', transliteration: 'wa lam', english: 'and is not' },
    { arabic: 'يُولَدْ', transliteration: 'yoolad', english: 'begotten' }
  ],
  '112:4': [
    { arabic: 'وَلَمْ', transliteration: 'Wa lam', english: 'And not' },
    { arabic: 'يَكُن', transliteration: 'yakun', english: 'is' },
    { arabic: 'لَّهُ', transliteration: 'lahu', english: 'unto Him' },
    { arabic: 'كُفُوًا', transliteration: 'kufuwan', english: 'equal / equivalent' },
    { arabic: 'أَحَدٌ', transliteration: 'ahad', english: 'any one' }
  ],
  // Surah 113 (Al-Falaq)
  '113:1': [
    { arabic: 'قُلْ', transliteration: 'Qul', english: 'Say' },
    { arabic: 'أَعُوذُ', transliteration: 'a\'oodhu', english: 'I seek refuge' },
    { arabic: 'بِرَبِّ', transliteration: 'bi Rabbi', english: 'in the Lord' },
    { arabic: 'الْفَلَقِ', transliteration: 'al-falaq', english: 'of daybreak' }
  ],
  // Surah 114 (An-Nas)
  '114:1': [
    { arabic: 'قُلْ', transliteration: 'Qul', english: 'Say' },
    { arabic: 'أَعُوذُ', transliteration: 'a\'oodhu', english: 'I seek refuge' },
    { arabic: 'بِرَبِّ', transliteration: 'bi Rabbi', english: 'in the Lord' },
    { arabic: 'النَّاسِ', transliteration: 'an-nas', english: 'of mankind' }
  ]
};

// General dictionary of common recurring Quranic roots and particles
const COMMON_VOCABULARY: Record<string, { transliteration: string; english: string }> = {
  'اللَّهِ': { transliteration: 'Allahi', english: 'Allah' },
  'اللَّهُ': { transliteration: 'Allahu', english: 'Allah' },
  'رَبِّ': { transliteration: 'Rabbi', english: 'Lord' },
  'رَبَّنَا': { transliteration: 'Rabbana', english: 'Our Lord' },
  'إِنَّ': { transliteration: 'Inna', english: 'Indeed / Surely' },
  'إِنَّمَا': { transliteration: 'Innama', english: 'Only / Surely' },
  'الَّذِينَ': { transliteration: 'al-ladheena', english: 'those who' },
  'آمَنُوا': { transliteration: 'aamanu', english: 'believed' },
  'وَعَمِلُوا': { transliteration: 'wa \'amilu', english: 'and did' },
  'الصَّالِحَاتِ': { transliteration: 'as-salihat', english: 'righteous deeds' },
  'يَا': { transliteration: 'Ya', english: 'O' },
  'أَيُّهَا': { transliteration: 'ayyuhan', english: 'you who' },
  'فِي': { transliteration: 'fee', english: 'in' },
  'عَلَىٰ': { transliteration: '\'ala', english: 'upon / over' },
  'مِن': { transliteration: 'min', english: 'from' },
  'إِلَىٰ': { transliteration: 'ila', english: 'to / toward' },
  'مَا': { transliteration: 'ma', english: 'what / that which' },
  'لَا': { transliteration: 'la', english: 'not / no' },
  'وَ': { transliteration: 'wa', english: 'and' },
  'ثُمَّ': { transliteration: 'thumma', english: 'then' },
  'قُلْ': { transliteration: 'Qul', english: 'Say' },
  'قَالُوا': { transliteration: 'qaloo', english: 'they said' },
  'السَّمَاوَاتِ': { transliteration: 'as-samawati', english: 'the heavens' },
  'الْأَرْضِ': { transliteration: 'al-ardi', english: 'the earth' },
  'نُورٌ': { transliteration: 'noor', english: 'light' },
  'كِتَابٌ': { transliteration: 'kitab', english: 'book / scripture' },
  'عَلِيمٌ': { transliteration: '\'aleem', english: 'All-Knowing' },
  'حَكِيمٌ': { transliteration: 'hakeem', english: 'All-Wise' },
  'غَفُورٌ': { transliteration: 'ghafoor', english: 'Forgiving' },
  'رَحِيمٌ': { transliteration: 'raheem', english: 'Merciful' },
  'عَظِيمٌ': { transliteration: '\'adheem', english: 'Magnificent' }
};

/**
 * Returns exact word-by-word array if available, or derives clean word breakdowns
 */
export function getAyahWordByWord(surahNumber: number, ayahNumber: number, arabicText: string): AyahWordDetail[] {
  const key = `${surahNumber}:${ayahNumber}`;
  if (EXACT_SURAH_WORD_BY_WORD[key]) {
    return EXACT_SURAH_WORD_BY_WORD[key];
  }

  // Tokenize the Arabic text into words, removing trailing ayah numbers if any
  const cleanArabic = arabicText.replace(/[0-9٠-٩۝]/g, '').trim();
  const words = cleanArabic.split(/\s+/).filter(w => w.length > 0);

  return words.map((word) => {
    // Check clean version without tashkeel for vocabulary match
    const lookup = COMMON_VOCABULARY[word];
    if (lookup) {
      return {
        arabic: word,
        transliteration: lookup.transliteration,
        english: lookup.english
      };
    }
    return {
      arabic: word,
      transliteration: word,
      english: '—'
    };
  });
}
