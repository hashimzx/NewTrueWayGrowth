// Real Quran Pak Tajweed & Color Coded Tajweed Resources
// References: Learning Quran School & Islamic Articles Color Coded Tajweed & Transliteration

export interface TajweedColorRule {
  id: string;
  name: string;
  arabicName: string;
  colorHex: string;
  bgHex: string;
  borderHex: string;
  duration: string;
  description: string;
  examples: string[];
}

export const TAJWEED_COLOR_RULES: TajweedColorRule[] = [
  {
    id: 'madd_obligatory',
    name: 'Long Elongation (Madd Lazim / Muttasil)',
    arabicName: 'مَدّ لَازِم / مُتَّصِل',
    colorHex: '#DC2626', // Red
    bgHex: '#FEE2E2',
    borderHex: '#FCA5A5',
    duration: '4 to 6 Harakat (Counts)',
    description: 'Obligatory or permissible elongation where a Madd letter (Alif, Waw, Yaa) is followed by a Hamzah or Sukoon.',
    examples: ['السَّمَاءِ', 'الضَّالِّينَ', 'جَاءَ', 'سُوءَ']
  },
  {
    id: 'ghunnah',
    name: 'Nasalization (Ghunnah & Ikhfa)',
    arabicName: 'غُنَّة وَ إِخْفَاء',
    colorHex: '#16A34A', // Green
    bgHex: '#DCFCE7',
    borderHex: '#86EFAC',
    duration: '2 Harakat (Counts)',
    description: 'A melodic nasal sound produced from the nasal cavity on Noon Mushaddadah (نّ), Meem Mushaddadah (مّ), and Ikhfa of Noon Saakin / Tanween.',
    examples: ['إِنَّ', 'مِنْ قَبْلُ', 'مِمَّا', 'كِتَابٌ كَرِيمٌ']
  },
  {
    id: 'qalqalah',
    name: 'Echoing / Bouncing Sound (Qalqalah)',
    arabicName: 'قَلْقَلَة (ق ط ب ج د)',
    colorHex: '#2563EB', // Blue
    bgHex: '#DBEAFE',
    borderHex: '#93C5FD',
    duration: 'Echo / Rebound on Sukoon',
    description: 'Vibration of the Makhraj when pronouncing one of the letters (ق، ط، ب، ج، د) when silent with Sukoon or at stopping points.',
    examples: ['أَحَدٌ', 'الفَلَقِ', 'مُحِيطٌ', 'أَبْوَابًا']
  },
  {
    id: 'iqlab',
    name: 'Conversion to Meem (Iqlab)',
    arabicName: 'إِقْلَاب (نْ / ً ٍ ٌ + ب)',
    colorHex: '#D97706', // Amber / Orange
    bgHex: '#FEF3C7',
    borderHex: '#FCD34D',
    duration: '2 Harakat with light Meem',
    description: 'Turning Noon Saakin or Tanween into a concealed Meem with Ghunnah when followed by the letter Baa (ب).',
    examples: ['مِنْ بَعْدِ', 'أَنْبِئْهُمْ', 'سَمِيعٌ بَصِيرٌ']
  },
  {
    id: 'idgham',
    name: 'Merging Letters (Idgham)',
    arabicName: 'إِدْغَام (ي ر م ل و ن)',
    colorHex: '#7C3AED', // Purple
    bgHex: '#EDE9FE',
    borderHex: '#C4B5FD',
    duration: 'Merged with or without Ghunnah',
    description: 'Inserting the first letter with Sukoon directly into the second voweled letter so they become one doubled letter.',
    examples: ['مَنْ يَقُولُ', 'مِنْ وَالٍ', 'مِنْ رَبِّهِمْ', 'مِنْ لَدُنْهُ']
  },
  {
    id: 'tafkheem',
    name: 'Heavy Letters (Tafkheem)',
    arabicName: 'تَفْخِيم (خ ص ض غ ط ق ظ)',
    colorHex: '#0891B2', // Cyan / Teal
    bgHex: '#CFFAFE',
    borderHex: '#67E8F9',
    duration: 'Full mouth resonance',
    description: 'Pronouncing the letter with an elevated back of tongue and full, heavy reverberation in the mouth.',
    examples: ['خَالِدِينَ', 'الصِّرَاطَ', 'غَفُورٌ', 'الظَّالِمِينَ']
  }
];

export interface ParaVerseSample {
  number: number;
  arabic: string;
  transliteration: string;
  english: string;
}

export interface ParaJuzDetail {
  paraNumber: number;
  arabicName: string;
  englishTransliteration: string;
  surahRange: string;
  startingAyah: string;
  totalVerses: number;
  pdfUrl: string;
  proxyPdfUrl: string;
  onlineViewerUrl: string;
  thumbnailGradient: string;
  sampleVerses?: ParaVerseSample[];
}

export const ALL_30_PARAS_DATA: ParaJuzDetail[] = [
  {
    paraNumber: 1,
    arabicName: 'الم (آلم)',
    englishTransliteration: 'Alif Lam Meem',
    surahRange: 'Surah Al-Fatihah (1:1) – Al-Baqarah (2:141)',
    startingAyah: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ · الم ذَٰلِكَ الْكِتَابُ',
    totalVerses: 148,
    pdfUrl: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-1-alif-laam-meem-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
    proxyPdfUrl: '/api/pdf/juz/1',
    onlineViewerUrl: '/api/pdf/juz/1',
    thumbnailGradient: 'from-purple-900 to-[#6E1373]',
    sampleVerses: [
      {
        number: 1,
        arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        transliteration: 'Bismillaahir-Rahmaanir-Raheem',
        english: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.'
      },
      {
        number: 2,
        arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
        transliteration: 'Al-hamdu lillaahi Rabbil-\'aalameen',
        english: '[All] praise is [due] to Allah, Lord of the worlds.'
      },
      {
        number: 3,
        arabic: 'الرَّحْمَٰنِ الرَّحِيمِ',
        transliteration: 'Ar-Rahmaanir-Raheem',
        english: 'The Entirely Merciful, the Especially Merciful,'
      },
      {
        number: 4,
        arabic: 'الم ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِلْمُتَّقِينَ',
        transliteration: 'Alif-Laaam-Meeem. Zaalikal-Kitaabu laa rayba feeh; hudal lilmuttaqeen',
        english: 'Alif, Lam, Meem. This is the Book about which there is no doubt, a guidance for those conscious of Allah.'
      }
    ]
  },
  {
    paraNumber: 2,
    arabicName: 'سَيَقُولُ',
    englishTransliteration: 'Sayaqool',
    surahRange: 'Surah Al-Baqarah (2:142) – Al-Baqarah (2:252)',
    startingAyah: 'سَيَقُولُ السُّفَهَاءُ مِنَ النَّاسِ مَا وَلَّاهُمْ عَنْ قِبْلَتِهِمُ',
    totalVerses: 111,
    pdfUrl: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-2-sayaqul-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
    proxyPdfUrl: '/api/pdf/juz/2',
    onlineViewerUrl: '/api/pdf/juz/2',
    thumbnailGradient: 'from-[#6E1373] to-[#851C82]',
    sampleVerses: [
      {
        number: 142,
        arabic: 'سَيَقُولُ السُّفَهَاءُ مِنَ النَّاسِ مَا وَلَّاهُمْ عَنْ قِبْلَتِهِمُ الَّتِي كَانُوا عَلَيْهَا',
        transliteration: 'Sayaqoolus-sufahaaa\'u minan-naasi maa wallaahum \'an qiblatihimullatee kaanoo \'alayhaa',
        english: 'The foolish among the people will say, "What has turned them from their qiblah towards which they used to face?"'
      },
      {
        number: 143,
        arabic: 'وَكَذَٰلِكَ جَعَلْنَاكُمْ أُمَّةً وَسَطًا لِتَكُونُوا شُهَدَاءَ عَلَى النَّاسِ',
        transliteration: 'Wa kazaalika ja\'alnaakum ummatan wasatal litakoonoo shuhadaaa\'a \'alan-naas',
        english: 'And thus We have made you a just community that you will be witnesses over the people.'
      }
    ]
  },
  {
    paraNumber: 3,
    arabicName: 'تِلْكَ الرُّسُلُ',
    englishTransliteration: 'Tilka-r-Rusul',
    surahRange: 'Surah Al-Baqarah (2:253) – Ali \'Imran (3:92)',
    startingAyah: 'تِلْكَ الرُّسُلُ فَضَّلْنَا بَعْضَهُمْ عَلَىٰ بَعْضٍ',
    totalVerses: 126,
    pdfUrl: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-3-tilka-arrusul-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
    proxyPdfUrl: '/api/pdf/juz/3',
    onlineViewerUrl: '/api/pdf/juz/3',
    thumbnailGradient: 'from-[#851C82] to-[#C72F8A]',
    sampleVerses: [
      {
        number: 255,
        arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ',
        transliteration: 'Allahu laa ilaaha illaa Huwal-Hayyul-Qayyoom; laa ta\'khuzuhuu sinatunw-wa laa nawm',
        english: 'Allah! There is no deity except Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness overtakes Him nor sleep.'
      }
    ]
  },
  {
    paraNumber: 4,
    arabicName: 'لَنْ تَنَالُوا',
    englishTransliteration: 'Lan Tanalu',
    surahRange: 'Surah Ali \'Imran (3:93) – An-Nisa (4:23)',
    startingAyah: 'لَنْ تَنَالُوا الْبِرَّ حَتَّىٰ تُنْفِقُوا مِمَّا تُحِبُّونَ',
    totalVerses: 131,
    pdfUrl: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-4-lan-tanalu-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
    proxyPdfUrl: '/api/pdf/juz/4',
    onlineViewerUrl: '/api/pdf/juz/4',
    thumbnailGradient: 'from-[#561F79] to-indigo-900',
    sampleVerses: [
      {
        number: 92,
        arabic: 'لَنْ تَنَالُوا الْبِرَّ حَتَّىٰ تُنْفِقُوا مِمَّا تُحِبُّونَ ۚ وَمَا تُنْفِقُوا مِنْ شَيْءٍ فَإِنَّ اللَّهَ بِهِ عَلِيمٌ',
        transliteration: 'Lan tanaalul-birra hattaa tunfiqoo mimmaa tuhibboon; wa maa tunfiqoo min shai\'in fa innal laaha bihee \'Aleem',
        english: 'Never will you attain the good [reward] until you spend [in the way of Allah] from that which you love.'
      }
    ]
  },
  {
    paraNumber: 5,
    arabicName: 'وَالْمُحْصَنَاتُ',
    englishTransliteration: 'Wal-Muhsanat',
    surahRange: 'Surah An-Nisa (4:24) – An-Nisa (4:147)',
    startingAyah: 'وَالْمُحْصَنَاتُ مِنَ النِّسَاءِ إِلَّا مَا مَلَكَتْ أَيْمَانُكُمْ',
    totalVerses: 124,
    pdfUrl: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-5-walmuhsanat-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
    proxyPdfUrl: '/api/pdf/juz/5',
    onlineViewerUrl: '/api/pdf/juz/5',
    thumbnailGradient: 'from-indigo-900 to-purple-900',
    sampleVerses: [
      {
        number: 29,
        arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تَأْكُلُوا أَمْوَالَكُمْ بَيْنَكُمْ بِالْبَاطِلِ إِلَّا أَنْ تَكُونَ تِجَارَةً عَنْ تَرَاضٍ مِنْكُمْ',
        transliteration: 'Yaaa ayyuhal-lazeena aamanoo laa ta\'kulooo amwaalakum bainakum bilbaatili illaaa an takoona tijaaratan \'an taraadim-minkum',
        english: 'O you who have believed, do not consume one another\'s wealth unjustly but only in lawful business by mutual consent.'
      }
    ]
  },
  {
    paraNumber: 6,
    arabicName: 'لَا يُحِبُّ اللَّهُ',
    englishTransliteration: 'La Yuhibbullahu',
    surahRange: 'Surah An-Nisa (4:148) – Al-Ma\'idah (5:81)',
    startingAyah: 'لَا يُحِبُّ اللَّهُ الْجَهْرَ بِالسُّوءِ مِنَ الْقَوْلِ إِلَّا مَنْ ظُلِمَ',
    totalVerses: 110,
    pdfUrl: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-6-la-yuhibullah-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
    proxyPdfUrl: '/api/pdf/juz/6',
    onlineViewerUrl: '/api/pdf/juz/6',
    thumbnailGradient: 'from-purple-950 to-[#6E1373]',
    sampleVerses: [
      {
        number: 148,
        arabic: 'لَا يُحِبُّ اللَّهُ الْجَهْرَ بِالسُّوءِ مِنَ الْقَوْلِ إِلَّا مَنْ ظُلِمَ ۚ وَكَانَ اللَّهُ سَمِيعًا عَلِيمًا',
        transliteration: 'Laa yuhibbullazul-jahra bissooo\'i minal-qawli illaa man zulim; wa kaanal laahu Samee\'an \'Aleemaa',
        english: 'Allah does not like the public mention of evil except by one who has been wronged. And ever is Allah Hearing and Knowing.'
      }
    ]
  },
  {
    paraNumber: 7,
    arabicName: 'وَإِذَا سَمِعُوا',
    englishTransliteration: 'Wa Iza Sami\'u',
    surahRange: 'Surah Al-Ma\'idah (5:82) – Al-An\'am (6:110)',
    startingAyah: 'وَإِذَا سَمِعُوا مَا أُنْزِلَ إِلَى الرَّسُولِ تَرَىٰ أَعْيُنَهُمْ تَفِيضُ مِنَ الدَّمْعِ',
    totalVerses: 148,
    pdfUrl: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-7-wa-iza-samiu-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
    proxyPdfUrl: '/api/pdf/juz/7',
    onlineViewerUrl: '/api/pdf/juz/7',
    thumbnailGradient: 'from-[#6E1373] to-emerald-900',
    sampleVerses: [
      {
        number: 83,
        arabic: 'وَإِذَا سَمِعُوا مَا أُنْزِلَ إِلَى الرَّسُولِ تَرَىٰ أَعْيُنَهُمْ تَفِيضُ مِنَ الدَّمْعِ مِمَّا عَرَفُوا مِنَ الْحَقِّ',
        transliteration: 'Wa izaa sami\'oo maaa unzila ilar-Rasooli taraaa a\'yunahum tafeedu minad-dam\'i mimmaa \'arafoo minal-haqq',
        english: 'And when they hear what has been revealed to the Messenger, you see their eyes overflowing with tears because of what they have recognized of the truth.'
      }
    ]
  },
  {
    paraNumber: 8,
    arabicName: 'وَلَوْ أَنَّنَا',
    englishTransliteration: 'Wa Law Annana',
    surahRange: 'Surah Al-An\'am (6:111) – Al-A\'raf (7:87)',
    startingAyah: 'وَلَوْ أَنَّنَا نَزَّلْنَا إِلَيْهِمُ الْمَلَائِكَةَ وَكَلَّمَهُمُ الْمَوْتَىٰ',
    totalVerses: 142,
    pdfUrl: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-8-walaw-annana-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
    proxyPdfUrl: '/api/pdf/juz/8',
    onlineViewerUrl: '/api/pdf/juz/8',
    thumbnailGradient: 'from-emerald-900 to-[#851C82]'
  },
  {
    paraNumber: 9,
    arabicName: 'قَالَ الْمَلَأُ',
    englishTransliteration: 'Qalal-Mala\'u',
    surahRange: 'Surah Al-A\'raf (7:88) – Al-Anfal (8:40)',
    startingAyah: 'قَالَ الْمَلَأُ الَّذِينَ اسْتَكْبَرُوا مِنْ قَوْمِهِ لَنُخْرِجَنَّكَ يَا شُعَيْبُ',
    totalVerses: 159,
    pdfUrl: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-9-qal-al-mala-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
    proxyPdfUrl: '/api/pdf/juz/9',
    onlineViewerUrl: '/api/pdf/juz/9',
    thumbnailGradient: 'from-[#851C82] to-amber-900'
  },
  {
    paraNumber: 10,
    arabicName: 'وَاعْلَمُوا',
    englishTransliteration: 'Wa\'lamu',
    surahRange: 'Surah Al-Anfal (8:41) – At-Tawbah (9:92)',
    startingAyah: 'وَاعْلَمُوا أَنَّمَا غَنِمْتُمْ مِنْ شَيْءٍ فَأَنَّ لِلَّهِ خُمُسَهُ',
    totalVerses: 127,
    pdfUrl: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-10-wa-alamu-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
    proxyPdfUrl: '/api/pdf/juz/10',
    onlineViewerUrl: '/api/pdf/juz/10',
    thumbnailGradient: 'from-amber-900 to-purple-900'
  },
  {
    paraNumber: 11,
    arabicName: 'يَعْتَذِرُونَ',
    englishTransliteration: 'Ya\'tadhiruna',
    surahRange: 'Surah At-Tawbah (9:93) – Hud (11:5)',
    startingAyah: 'يَعْتَذِرُونَ إِلَيْكُمْ إِذَا رَجَعْتُمْ إِلَيْهِمْ قُلْ لَا تَعْتَذِرُوا',
    totalVerses: 151,
    pdfUrl: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-11-yataziruna-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
    proxyPdfUrl: '/api/pdf/juz/11',
    onlineViewerUrl: '/api/pdf/juz/11',
    thumbnailGradient: 'from-purple-900 to-[#561F79]'
  },
  {
    paraNumber: 12,
    arabicName: 'وَمَا مِنْ دَابَّةٍ',
    englishTransliteration: 'Wa Ma Min Dabbah',
    surahRange: 'Surah Hud (11:6) – Yusuf (12:52)',
    startingAyah: 'وَمَا مِنْ دَابَّةٍ فِي الْأَرْضِ إِلَّا عَلَى اللَّهِ رِزْقُهَا',
    totalVerses: 170,
    pdfUrl: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-12-wama-min-daabbah-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
    proxyPdfUrl: '/api/pdf/juz/12',
    onlineViewerUrl: '/api/pdf/juz/12',
    thumbnailGradient: 'from-[#561F79] to-teal-900'
  },
  {
    paraNumber: 13,
    arabicName: 'وَمَا أُبَرِّئُ',
    englishTransliteration: 'Wa Ma Ubarri\'u',
    surahRange: 'Surah Yusuf (12:53) – Ibrahim (14:52)',
    startingAyah: 'وَمَا أُبَرِّئُ نَفْسِي إِنَّ النَّفْسَ لَأَمَّارَةٌ بِالسُّوءِ',
    totalVerses: 154,
    pdfUrl: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-13-wama-ubarriu-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
    proxyPdfUrl: '/api/pdf/juz/13',
    onlineViewerUrl: '/api/pdf/juz/13',
    thumbnailGradient: 'from-teal-900 to-[#6E1373]'
  },
  {
    paraNumber: 14,
    arabicName: 'رُبَمَا',
    englishTransliteration: 'Rubama',
    surahRange: 'Surah Al-Hijr (15:1) – An-Nahl (16:128)',
    startingAyah: 'الر تِلْكَ آيَاتُ الْكِتَابِ وَقُرْآنٍ مُبِينٍ · رُبَمَا يَوَدُّ الَّذِينَ كَفَرُوا',
    totalVerses: 227,
    pdfUrl: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-14-rubama-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
    proxyPdfUrl: '/api/pdf/juz/14',
    onlineViewerUrl: '/api/pdf/juz/14',
    thumbnailGradient: 'from-[#6E1373] to-rose-900'
  },
  {
    paraNumber: 15,
    arabicName: 'سُبْحَانَ الَّذِي',
    englishTransliteration: 'Subhanallazi',
    surahRange: 'Surah Al-Isra (17:1) – Al-Kahf (18:74)',
    startingAyah: 'سُبْحَانَ الَّذِي أَسْرَىٰ بِعَبْدِهِ لَيْلًا مِنَ الْمَسْجِدِ الْحَرَامِ',
    totalVerses: 185,
    pdfUrl: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-15-subhan-allazi-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
    proxyPdfUrl: '/api/pdf/juz/15',
    onlineViewerUrl: '/api/pdf/juz/15',
    thumbnailGradient: 'from-rose-900 to-[#851C82]'
  },
  {
    paraNumber: 16,
    arabicName: 'قَالَ أَلَمْ',
    englishTransliteration: 'Qala Alam',
    surahRange: 'Surah Al-Kahf (18:75) – Ta-Ha (20:135)',
    startingAyah: 'قَالَ أَلَمْ أَقُلْ لَكَ إِنَّكَ لَنْ تَسْتَطِيعَ مَعِيَ صَبْرًا',
    totalVerses: 269,
    pdfUrl: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-16-qala-alam-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
    proxyPdfUrl: '/api/pdf/juz/16',
    onlineViewerUrl: '/api/pdf/juz/16',
    thumbnailGradient: 'from-[#851C82] to-sky-900'
  },
  {
    paraNumber: 17,
    arabicName: 'اقْتَرَبَ',
    englishTransliteration: 'Iqtaraba',
    surahRange: 'Surah Al-Anbiya (21:1) – Al-Hajj (22:78)',
    startingAyah: 'اقْتَرَبَ لِلنَّاسِ حِسَابُهُمْ وَهُمْ فِي غَفْلَةٍ مُعْرِضُونَ',
    totalVerses: 190,
    pdfUrl: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-17-iqtaraba-linnas-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
    proxyPdfUrl: '/api/pdf/juz/17',
    onlineViewerUrl: '/api/pdf/juz/17',
    thumbnailGradient: 'from-sky-900 to-[#561F79]'
  },
  {
    paraNumber: 18,
    arabicName: 'قَدْ أَفْلَحَ',
    englishTransliteration: 'Qadd Aflaha',
    surahRange: 'Surah Al-Mu\'minun (23:1) – Al-Furqan (25:20)',
    startingAyah: 'قَدْ أَفْلَحَ الْمُؤْمِنُونَ · الَّذِينَ هُمْ فِي صَلَاتِهِمْ خَاشِعُونَ',
    totalVerses: 202,
    pdfUrl: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-18-qad-aflaha-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
    proxyPdfUrl: '/api/pdf/juz/18',
    onlineViewerUrl: '/api/pdf/juz/18',
    thumbnailGradient: 'from-[#561F79] to-emerald-950'
  },
  {
    paraNumber: 19,
    arabicName: 'وَقَالَ الَّذِينَ',
    englishTransliteration: 'Wa Qalal-Ladhina',
    surahRange: 'Surah Al-Furqan (25:21) – An-Naml (27:55)',
    startingAyah: 'وَقَالَ الَّذِينَ لَا يَرْجُونَ لِقَاءَنَا لَوْلَا أُنْزِلَ عَلَيْنَا الْمَلَائِكَةُ',
    totalVerses: 339,
    pdfUrl: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-19-wa-qal-allazina-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
    proxyPdfUrl: '/api/pdf/juz/19',
    onlineViewerUrl: '/api/pdf/juz/19',
    thumbnailGradient: 'from-emerald-950 to-indigo-900'
  },
  {
    paraNumber: 20,
    arabicName: 'أَمَّنْ خَلَقَ',
    englishTransliteration: 'Amman Khalaqa',
    surahRange: 'Surah An-Naml (27:56) – Al-\'Ankabut (29:45)',
    startingAyah: 'أَمَّنْ خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ وَأَنْزَلَ لَكُمْ مِنَ السَّمَاءِ مَاءً',
    totalVerses: 171,
    pdfUrl: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-20-fama-kana-jawaba-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
    proxyPdfUrl: '/api/pdf/juz/20',
    onlineViewerUrl: '/api/pdf/juz/20',
    thumbnailGradient: 'from-indigo-900 to-[#6E1373]'
  },
  {
    paraNumber: 21,
    arabicName: 'اتْلُ مَا أُوحِيَ',
    englishTransliteration: 'Utlu Ma Oohiya',
    surahRange: 'Surah Al-\'Ankabut (29:46) – Al-Ahzab (33:30)',
    startingAyah: 'اتْلُ مَا أُوحِيَ إِلَيْكَ مِنَ الْكِتَابِ وَأَقِمِ الصَّلَاةَ',
    totalVerses: 178,
    pdfUrl: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-21-wa-la-tujadiluu-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
    proxyPdfUrl: '/api/pdf/juz/21',
    onlineViewerUrl: '/api/pdf/juz/21',
    thumbnailGradient: 'from-[#6E1373] to-purple-900'
  },
  {
    paraNumber: 22,
    arabicName: 'وَمَنْ يَقْنُتْ',
    englishTransliteration: 'Wa Man Yaqnut',
    surahRange: 'Surah Al-Ahzab (33:31) – Ya-Sin (36:27)',
    startingAyah: 'وَمَنْ يَقْنُتْ مِنْكُنَّ لِلَّهِ وَرَسُولِهِ وَتَعْمَلْ صَالِحًا',
    totalVerses: 169,
    pdfUrl: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-22-waman-yaqnut-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
    proxyPdfUrl: '/api/pdf/juz/22',
    onlineViewerUrl: '/api/pdf/juz/22',
    thumbnailGradient: 'from-purple-900 to-amber-900'
  },
  {
    paraNumber: 23,
    arabicName: 'وَمَا لِيَ',
    englishTransliteration: 'Wa Maliya',
    surahRange: 'Surah Ya-Sin (36:28) – Az-Zumar (39:31)',
    startingAyah: 'وَمَا لِيَ لَا أَعْبُدُ الَّذِي فَطَرَنِي وَإِلَيْهِ تُرْجَعُونَ',
    totalVerses: 357,
    pdfUrl: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-23-wama-anzalna-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
    proxyPdfUrl: '/api/pdf/juz/23',
    onlineViewerUrl: '/api/pdf/juz/23',
    thumbnailGradient: 'from-amber-900 to-[#851C82]'
  },
  {
    paraNumber: 24,
    arabicName: 'فَمَنْ أَظْلَمُ',
    englishTransliteration: 'Fa-Man Azlamu',
    surahRange: 'Surah Az-Zumar (39:32) – Fussilat (41:46)',
    startingAyah: 'فَمَنْ أَظْلَمُ مِمَّنْ كَذَبَ عَلَى اللَّهِ وَكَذَّبَ بِالصِّدْقِ إِذْ جَاءَهُ',
    totalVerses: 175,
    pdfUrl: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-24-faman-azlamu-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
    proxyPdfUrl: '/api/pdf/juz/24',
    onlineViewerUrl: '/api/pdf/juz/24',
    thumbnailGradient: 'from-[#851C82] to-teal-900'
  },
  {
    paraNumber: 25,
    arabicName: 'إِلَيْهِ يُرَدُّ',
    englishTransliteration: 'Ilayhi Yuraddu',
    surahRange: 'Surah Fussilat (41:47) – Al-Jathiyah (45:37)',
    startingAyah: 'إِلَيْهِ يُرَدُّ عِلْمُ السَّاعَةِ وَمَا تَخْرُجُ مِنْ ثَمَرَاتٍ مِنْ أَكْمَامِهَا',
    totalVerses: 246,
    pdfUrl: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-25-ilaihi-yuradu-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
    proxyPdfUrl: '/api/pdf/juz/25',
    onlineViewerUrl: '/api/pdf/juz/25',
    thumbnailGradient: 'from-teal-900 to-indigo-900'
  },
  {
    paraNumber: 26,
    arabicName: 'حم (حَمِيم)',
    englishTransliteration: 'Ha-Meem (Hameem)',
    surahRange: 'Surah Al-Ahqaf (46:1) – Adh-Dhariyat (51:30)',
    startingAyah: 'حم تَنْزِيلُ الْكِتَابِ مِنَ اللَّهِ الْعَزِيزِ الْحَكِيمِ',
    totalVerses: 195,
    pdfUrl: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-26-haa-meem-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
    proxyPdfUrl: '/api/pdf/juz/26',
    onlineViewerUrl: '/api/pdf/juz/26',
    thumbnailGradient: 'from-indigo-900 to-[#6E1373]'
  },
  {
    paraNumber: 27,
    arabicName: 'قَالَ فَمَا خَطْبُكُمْ',
    englishTransliteration: 'Qala Fama Khatbukum',
    surahRange: 'Surah Adh-Dhariyat (51:31) – Al-Hadid (57:29)',
    startingAyah: 'قَالَ فَمَا خَطْبُكُمْ أَيُّهَا الْمُرْسَلُونَ · قَالُوا إِنَّا أُرْسِلْنَا',
    totalVerses: 399,
    pdfUrl: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-27-qala-fama-khatbukum-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
    proxyPdfUrl: '/api/pdf/juz/27',
    onlineViewerUrl: '/api/pdf/juz/27',
    thumbnailGradient: 'from-[#6E1373] to-rose-900'
  },
  {
    paraNumber: 28,
    arabicName: 'قَدْ سَمِعَ اللَّهُ',
    englishTransliteration: 'Qadd Sami\'allahu',
    surahRange: 'Surah Al-Mujadila (58:1) – At-Tahrim (66:12)',
    startingAyah: 'قَدْ سَمِعَ اللَّهُ قَوْلَ الَّتِي تُجَادِلُكَ فِي زَوْجِهَا',
    totalVerses: 137,
    pdfUrl: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-28-qad-samiallahu-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
    proxyPdfUrl: '/api/pdf/juz/28',
    onlineViewerUrl: '/api/pdf/juz/28',
    thumbnailGradient: 'from-rose-900 to-purple-900'
  },
  {
    paraNumber: 29,
    arabicName: 'تَبَارَكَ الَّذِي',
    englishTransliteration: 'Tabarakallazi',
    surahRange: 'Surah Al-Mulk (67:1) – Al-Mursalat (77:50)',
    startingAyah: 'تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ',
    totalVerses: 431,
    pdfUrl: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-29-tabarak-alazi-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
    proxyPdfUrl: '/api/pdf/juz/29',
    onlineViewerUrl: '/api/pdf/juz/29',
    thumbnailGradient: 'from-purple-900 to-[#851C82]'
  },
  {
    paraNumber: 30,
    arabicName: 'عَمَّ يَتَسَاءَلُونَ',
    englishTransliteration: 'Amma Yatasa\'aloon',
    surahRange: 'Surah An-Naba (78:1) – An-Nas (114:6)',
    startingAyah: 'عَمَّ يَتَسَاءَلُونَ · عَنِ النَّبَإِ الْعَظِيمِ',
    totalVerses: 564,
    pdfUrl: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-30-amma-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
    proxyPdfUrl: '/api/pdf/juz/30',
    onlineViewerUrl: '/api/pdf/juz/30',
    thumbnailGradient: 'from-[#851C82] to-amber-700',
    sampleVerses: [
      {
        number: 1,
        arabic: 'عَمَّ يَتَسَاءَلُونَ',
        transliteration: '\'Amma yatasaaa\'aloon',
        english: 'About what are they asking one another?'
      },
      {
        number: 2,
        arabic: 'عَنِ النَّبَإِ الْعَظِيمِ',
        transliteration: '\'Anin-naba\'il-\'azeem',
        english: 'About the great news -'
      },
      {
        number: 3,
        arabic: 'الَّذِي هُمْ فِيهِ مُخْتَلِفُونَ',
        transliteration: 'Allazee hum feehi mukhtalifoon',
        english: 'That over which they are in disagreement.'
      },
      {
        number: 4,
        arabic: 'كَلَّا سَيَعْلَمُونَ',
        transliteration: 'Kallaa saya\'lamoon',
        english: 'No! They are going to know.'
      }
    ]
  }
];

// Helper to color-code Arabic verses based on classical Tajweed rules
export interface TajweedToken {
  text: string;
  ruleId?: string;
  ruleName?: string;
  colorHex?: string;
  bgHex?: string;
}

export function parseTajweedTokens(arabicText: string): TajweedToken[] {
  // Common Tajweed patterns in Uthmani script:
  // Red: Madd signs (ٓ, آ, ىٰ, ۦ, ۏ)
  // Green: Ghunnah on Noon/Meem Mushaddadah (نّ, مّ) and tanween before ikhfa
  // Blue: Qalqalah (ق, ط, ب, ج, د with sukoon or end of word)
  // Orange: Iqlab (small meem ۘ or ن followed by ب)

  const tokens: TajweedToken[] = [];
  const words = arabicText.split(' ');

  words.forEach((word, wIdx) => {
    // Check word-level Tajweed markers
    if (word.includes('ٓ') || word.includes('آ') || word.includes('الضَّالِّينَ') || word.includes('السَّمَاءِ') || word.includes('جَاءَ')) {
      tokens.push({
        text: word,
        ruleId: 'madd_obligatory',
        ruleName: 'Madd (Long Elongation - 4/6 Counts)',
        colorHex: '#DC2626',
        bgHex: '#FEF2F2'
      });
    } else if (word.includes('نّ') || word.includes('مّ') || word.includes('إِنَّ') || word.includes('عَمَّ')) {
      tokens.push({
        text: word,
        ruleId: 'ghunnah',
        ruleName: 'Ghunnah (Nasal sound - 2 Counts)',
        colorHex: '#16A34A',
        bgHex: '#F0FDF4'
      });
    } else if (/[قطبجد]ْ/.test(word) || /[قطبجد]$/.test(word.replace(/[ًٌٍَُِّْٰ]/g, ''))) {
      tokens.push({
        text: word,
        ruleId: 'qalqalah',
        ruleName: 'Qalqalah (Echoing / Bouncing letter)',
        colorHex: '#2563EB',
        bgHex: '#EFF6FF'
      });
    } else if (word.includes('ۢ') || (word.includes('ن') && words[wIdx + 1]?.startsWith('ب'))) {
      tokens.push({
        text: word,
        ruleId: 'iqlab',
        ruleName: 'Iqlab (Convert to Meem)',
        colorHex: '#D97706',
        bgHex: '#FFFBEB'
      });
    } else {
      tokens.push({
        text: word
      });
    }
  });

  return tokens;
}
