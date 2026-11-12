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

export interface ParaJuzDetail {
  paraNumber: number;
  arabicName: string;
  englishTransliteration: string;
  surahRange: string;
  startingAyah: string;
  totalVerses: number;
  pdfUrl: string;
  onlineViewerUrl: string;
  thumbnailGradient: string;
}

export const ALL_30_PARAS_DATA: ParaJuzDetail[] = [
  {
    paraNumber: 1,
    arabicName: 'الم (آلم)',
    englishTransliteration: 'Alif Lam Meem',
    surahRange: 'Surah Al-Fatihah (1:1) – Al-Baqarah (2:141)',
    startingAyah: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ · الم ذَٰلِكَ الْكِتَابُ',
    totalVerses: 148,
    pdfUrl: 'https://archive.org/download/colored-tajwidi-quran-with-english-transliteration/Para-01.pdf',
    onlineViewerUrl: 'https://archive.org/embed/colored-tajwidi-quran-with-english-transliteration?page=1',
    thumbnailGradient: 'from-purple-900 to-[#6E1373]'
  },
  {
    paraNumber: 2,
    arabicName: 'سَيَقُولُ',
    englishTransliteration: 'Sayaqool',
    surahRange: 'Surah Al-Baqarah (2:142) – Al-Baqarah (2:252)',
    startingAyah: 'سَيَقُولُ السُّفَهَاءُ مِنَ النَّاسِ مَا وَلَّاهُمْ عَنْ قِبْلَتِهِمُ',
    totalVerses: 111,
    pdfUrl: 'https://archive.org/download/colored-tajwidi-quran-with-english-transliteration/Para-02.pdf',
    onlineViewerUrl: 'https://archive.org/embed/colored-tajwidi-quran-with-english-transliteration?page=21',
    thumbnailGradient: 'from-[#6E1373] to-[#851C82]'
  },
  {
    paraNumber: 3,
    arabicName: 'تِلْكَ الرُّسُلُ',
    englishTransliteration: 'Tilka-r-Rusul',
    surahRange: 'Surah Al-Baqarah (2:253) – Ali \'Imran (3:92)',
    startingAyah: 'تِلْكَ الرُّسُلُ فَضَّلْنَا بَعْضَهُمْ عَلَىٰ بَعْضٍ',
    totalVerses: 126,
    pdfUrl: 'https://archive.org/download/colored-tajwidi-quran-with-english-transliteration/Para-03.pdf',
    onlineViewerUrl: 'https://archive.org/embed/colored-tajwidi-quran-with-english-transliteration?page=41',
    thumbnailGradient: 'from-[#851C82] to-[#C72F8A]'
  },
  {
    paraNumber: 4,
    arabicName: 'لَنْ تَنَالُوا',
    englishTransliteration: 'Lan Tanalu',
    surahRange: 'Surah Ali \'Imran (3:93) – An-Nisa (4:23)',
    startingAyah: 'لَنْ تَنَالُوا الْبِرَّ حَتَّىٰ تُنْفِقُوا مِمَّا تُحِبُّونَ',
    totalVerses: 131,
    pdfUrl: 'https://archive.org/download/colored-tajwidi-quran-with-english-transliteration/Para-04.pdf',
    onlineViewerUrl: 'https://archive.org/embed/colored-tajwidi-quran-with-english-transliteration?page=61',
    thumbnailGradient: 'from-[#561F79] to-indigo-900'
  },
  {
    paraNumber: 5,
    arabicName: 'وَالْمُحْصَنَاتُ',
    englishTransliteration: 'Wal-Muhsanat',
    surahRange: 'Surah An-Nisa (4:24) – An-Nisa (4:147)',
    startingAyah: 'وَالْمُحْصَنَاتُ مِنَ النِّسَاءِ إِلَّا مَا مَلَكَتْ أَيْمَانُكُمْ',
    totalVerses: 124,
    pdfUrl: 'https://archive.org/download/colored-tajwidi-quran-with-english-transliteration/Para-05.pdf',
    onlineViewerUrl: 'https://archive.org/embed/colored-tajwidi-quran-with-english-transliteration?page=81',
    thumbnailGradient: 'from-indigo-900 to-purple-900'
  },
  {
    paraNumber: 6,
    arabicName: 'لَا يُحِبُّ اللَّهُ',
    englishTransliteration: 'La Yuhibbullahu',
    surahRange: 'Surah An-Nisa (4:148) – Al-Ma\'idah (5:81)',
    startingAyah: 'لَا يُحِبُّ اللَّهُ الْجَهْرَ بِالسُّوءِ مِنَ الْقَوْلِ إِلَّا مَنْ ظُلِمَ',
    totalVerses: 110,
    pdfUrl: 'https://archive.org/download/colored-tajwidi-quran-with-english-transliteration/Para-06.pdf',
    onlineViewerUrl: 'https://archive.org/embed/colored-tajwidi-quran-with-english-transliteration?page=101',
    thumbnailGradient: 'from-purple-950 to-[#6E1373]'
  },
  {
    paraNumber: 7,
    arabicName: 'وَإِذَا سَمِعُوا',
    englishTransliteration: 'Wa Iza Sami\'u',
    surahRange: 'Surah Al-Ma\'idah (5:82) – Al-An\'am (6:110)',
    startingAyah: 'وَإِذَا سَمِعُوا مَا أُنْزِلَ إِلَى الرَّسُولِ تَرَىٰ أَعْيُنَهُمْ تَفِيضُ مِنَ الدَّمْعِ',
    totalVerses: 148,
    pdfUrl: 'https://archive.org/download/colored-tajwidi-quran-with-english-transliteration/Para-07.pdf',
    onlineViewerUrl: 'https://archive.org/embed/colored-tajwidi-quran-with-english-transliteration?page=121',
    thumbnailGradient: 'from-[#6E1373] to-emerald-900'
  },
  {
    paraNumber: 8,
    arabicName: 'وَلَوْ أَنَّنَا',
    englishTransliteration: 'Wa Law Annana',
    surahRange: 'Surah Al-An\'am (6:111) – Al-A\'raf (7:87)',
    startingAyah: 'وَلَوْ أَنَّنَا نَزَّلْنَا إِلَيْهِمُ الْمَلَائِكَةَ وَكَلَّمَهُمُ الْمَوْتَىٰ',
    totalVerses: 142,
    pdfUrl: 'https://archive.org/download/colored-tajwidi-quran-with-english-transliteration/Para-08.pdf',
    onlineViewerUrl: 'https://archive.org/embed/colored-tajwidi-quran-with-english-transliteration?page=141',
    thumbnailGradient: 'from-emerald-900 to-[#851C82]'
  },
  {
    paraNumber: 9,
    arabicName: 'قَالَ الْمَلَأُ',
    englishTransliteration: 'Qalal-Mala\'u',
    surahRange: 'Surah Al-A\'raf (7:88) – Al-Anfal (8:40)',
    startingAyah: 'قَالَ الْمَلَأُ الَّذِينَ اسْتَكْبَرُوا مِنْ قَوْمِهِ لَنُخْرِجَنَّكَ يَا شُعَيْبُ',
    totalVerses: 159,
    pdfUrl: 'https://archive.org/download/colored-tajwidi-quran-with-english-transliteration/Para-09.pdf',
    onlineViewerUrl: 'https://archive.org/embed/colored-tajwidi-quran-with-english-transliteration?page=161',
    thumbnailGradient: 'from-[#851C82] to-amber-900'
  },
  {
    paraNumber: 10,
    arabicName: 'وَاعْلَمُوا',
    englishTransliteration: 'Wa\'lamu',
    surahRange: 'Surah Al-Anfal (8:41) – At-Tawbah (9:92)',
    startingAyah: 'وَاعْلَمُوا أَنَّمَا غَنِمْتُمْ مِنْ شَيْءٍ فَأَنَّ لِلَّهِ خُمُسَهُ',
    totalVerses: 127,
    pdfUrl: 'https://archive.org/download/colored-tajwidi-quran-with-english-transliteration/Para-10.pdf',
    onlineViewerUrl: 'https://archive.org/embed/colored-tajwidi-quran-with-english-transliteration?page=181',
    thumbnailGradient: 'from-amber-900 to-purple-900'
  },
  {
    paraNumber: 11,
    arabicName: 'يَعْتَذِرُونَ',
    englishTransliteration: 'Ya\'tadhiruna',
    surahRange: 'Surah At-Tawbah (9:93) – Hud (11:5)',
    startingAyah: 'يَعْتَذِرُونَ إِلَيْكُمْ إِذَا رَجَعْتُمْ إِلَيْهِمْ قُلْ لَا تَعْتَذِرُوا',
    totalVerses: 151,
    pdfUrl: 'https://archive.org/download/colored-tajwidi-quran-with-english-transliteration/Para-11.pdf',
    onlineViewerUrl: 'https://archive.org/embed/colored-tajwidi-quran-with-english-transliteration?page=201',
    thumbnailGradient: 'from-purple-900 to-[#561F79]'
  },
  {
    paraNumber: 12,
    arabicName: 'وَمَا مِنْ دَابَّةٍ',
    englishTransliteration: 'Wa Ma Min Dabbah',
    surahRange: 'Surah Hud (11:6) – Yusuf (12:52)',
    startingAyah: 'وَمَا مِنْ دَابَّةٍ فِي الْأَرْضِ إِلَّا عَلَى اللَّهِ رِزْقُهَا',
    totalVerses: 170,
    pdfUrl: 'https://archive.org/download/colored-tajwidi-quran-with-english-transliteration/Para-12.pdf',
    onlineViewerUrl: 'https://archive.org/embed/colored-tajwidi-quran-with-english-transliteration?page=221',
    thumbnailGradient: 'from-[#561F79] to-teal-900'
  },
  {
    paraNumber: 13,
    arabicName: 'وَمَا أُبَرِّئُ',
    englishTransliteration: 'Wa Ma Ubarri\'u',
    surahRange: 'Surah Yusuf (12:53) – Ibrahim (14:52)',
    startingAyah: 'وَمَا أُبَرِّئُ نَفْسِي إِنَّ النَّفْسَ لَأَمَّارَةٌ بِالسُّوءِ',
    totalVerses: 154,
    pdfUrl: 'https://archive.org/download/colored-tajwidi-quran-with-english-transliteration/Para-13.pdf',
    onlineViewerUrl: 'https://archive.org/embed/colored-tajwidi-quran-with-english-transliteration?page=241',
    thumbnailGradient: 'from-teal-900 to-[#6E1373]'
  },
  {
    paraNumber: 14,
    arabicName: 'رُبَمَا',
    englishTransliteration: 'Rubama',
    surahRange: 'Surah Al-Hijr (15:1) – An-Nahl (16:128)',
    startingAyah: 'الر تِلْكَ آيَاتُ الْكِتَابِ وَقُرْآنٍ مُبِينٍ · رُبَمَا يَوَدُّ الَّذِينَ كَفَرُوا',
    totalVerses: 227,
    pdfUrl: 'https://archive.org/download/colored-tajwidi-quran-with-english-transliteration/Para-14.pdf',
    onlineViewerUrl: 'https://archive.org/embed/colored-tajwidi-quran-with-english-transliteration?page=261',
    thumbnailGradient: 'from-[#6E1373] to-rose-900'
  },
  {
    paraNumber: 15,
    arabicName: 'سُبْحَانَ الَّذِي',
    englishTransliteration: 'Subhanallazi',
    surahRange: 'Surah Al-Isra (17:1) – Al-Kahf (18:74)',
    startingAyah: 'سُبْحَانَ الَّذِي أَسْرَىٰ بِعَبْدِهِ لَيْلًا مِنَ الْمَسْجِدِ الْحَرَامِ',
    totalVerses: 185,
    pdfUrl: 'https://archive.org/download/colored-tajwidi-quran-with-english-transliteration/Para-15.pdf',
    onlineViewerUrl: 'https://archive.org/embed/colored-tajwidi-quran-with-english-transliteration?page=281',
    thumbnailGradient: 'from-rose-900 to-[#851C82]'
  },
  {
    paraNumber: 16,
    arabicName: 'قَالَ أَلَمْ',
    englishTransliteration: 'Qala Alam',
    surahRange: 'Surah Al-Kahf (18:75) – Ta-Ha (20:135)',
    startingAyah: 'قَالَ أَلَمْ أَقُلْ لَكَ إِنَّكَ لَنْ تَسْتَطِيعَ مَعِيَ صَبْرًا',
    totalVerses: 269,
    pdfUrl: 'https://archive.org/download/colored-tajwidi-quran-with-english-transliteration/Para-16.pdf',
    onlineViewerUrl: 'https://archive.org/embed/colored-tajwidi-quran-with-english-transliteration?page=301',
    thumbnailGradient: 'from-[#851C82] to-sky-900'
  },
  {
    paraNumber: 17,
    arabicName: 'اقْتَرَبَ',
    englishTransliteration: 'Iqtaraba',
    surahRange: 'Surah Al-Anbiya (21:1) – Al-Hajj (22:78)',
    startingAyah: 'اقْتَرَبَ لِلنَّاسِ حِسَابُهُمْ وَهُمْ فِي غَفْلَةٍ مُعْرِضُونَ',
    totalVerses: 190,
    pdfUrl: 'https://archive.org/download/colored-tajwidi-quran-with-english-transliteration/Para-17.pdf',
    onlineViewerUrl: 'https://archive.org/embed/colored-tajwidi-quran-with-english-transliteration?page=321',
    thumbnailGradient: 'from-sky-900 to-[#561F79]'
  },
  {
    paraNumber: 18,
    arabicName: 'قَدْ أَفْلَحَ',
    englishTransliteration: 'Qadd Aflaha',
    surahRange: 'Surah Al-Mu\'minun (23:1) – Al-Furqan (25:20)',
    startingAyah: 'قَدْ أَفْلَحَ الْمُؤْمِنُونَ · الَّذِينَ هُمْ فِي صَلَاتِهِمْ خَاشِعُونَ',
    totalVerses: 202,
    pdfUrl: 'https://archive.org/download/colored-tajwidi-quran-with-english-transliteration/Para-18.pdf',
    onlineViewerUrl: 'https://archive.org/embed/colored-tajwidi-quran-with-english-transliteration?page=341',
    thumbnailGradient: 'from-[#561F79] to-emerald-950'
  },
  {
    paraNumber: 19,
    arabicName: 'وَقَالَ الَّذِينَ',
    englishTransliteration: 'Wa Qalal-Ladhina',
    surahRange: 'Surah Al-Furqan (25:21) – An-Naml (27:55)',
    startingAyah: 'وَقَالَ الَّذِينَ لَا يَرْجُونَ لِقَاءَنَا لَوْلَا أُنْزِلَ عَلَيْنَا الْمَلَائِكَةُ',
    totalVerses: 339,
    pdfUrl: 'https://archive.org/download/colored-tajwidi-quran-with-english-transliteration/Para-19.pdf',
    onlineViewerUrl: 'https://archive.org/embed/colored-tajwidi-quran-with-english-transliteration?page=361',
    thumbnailGradient: 'from-emerald-950 to-indigo-900'
  },
  {
    paraNumber: 20,
    arabicName: 'أَمَّنْ خَلَقَ',
    englishTransliteration: 'Amman Khalaqa',
    surahRange: 'Surah An-Naml (27:56) – Al-\'Ankabut (29:45)',
    startingAyah: 'أَمَّنْ خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ وَأَنْزَلَ لَكُمْ مِنَ السَّمَاءِ مَاءً',
    totalVerses: 171,
    pdfUrl: 'https://archive.org/download/colored-tajwidi-quran-with-english-transliteration/Para-20.pdf',
    onlineViewerUrl: 'https://archive.org/embed/colored-tajwidi-quran-with-english-transliteration?page=381',
    thumbnailGradient: 'from-indigo-900 to-[#6E1373]'
  },
  {
    paraNumber: 21,
    arabicName: 'اتْلُ مَا أُوحِيَ',
    englishTransliteration: 'Utlu Ma Oohiya',
    surahRange: 'Surah Al-\'Ankabut (29:46) – Al-Ahzab (33:30)',
    startingAyah: 'اتْلُ مَا أُوحِيَ إِلَيْكَ مِنَ الْكِتَابِ وَأَقِمِ الصَّلَاةَ',
    totalVerses: 178,
    pdfUrl: 'https://archive.org/download/colored-tajwidi-quran-with-english-transliteration/Para-21.pdf',
    onlineViewerUrl: 'https://archive.org/embed/colored-tajwidi-quran-with-english-transliteration?page=401',
    thumbnailGradient: 'from-[#6E1373] to-purple-900'
  },
  {
    paraNumber: 22,
    arabicName: 'وَمَنْ يَقْنُتْ',
    englishTransliteration: 'Wa Man Yaqnut',
    surahRange: 'Surah Al-Ahzab (33:31) – Ya-Sin (36:27)',
    startingAyah: 'وَمَنْ يَقْنُتْ مِنْكُنَّ لِلَّهِ وَرَسُولِهِ وَتَعْمَلْ صَالِحًا',
    totalVerses: 169,
    pdfUrl: 'https://archive.org/download/colored-tajwidi-quran-with-english-transliteration/Para-22.pdf',
    onlineViewerUrl: 'https://archive.org/embed/colored-tajwidi-quran-with-english-transliteration?page=421',
    thumbnailGradient: 'from-purple-900 to-amber-900'
  },
  {
    paraNumber: 23,
    arabicName: 'وَمَا لِيَ',
    englishTransliteration: 'Wa Maliya',
    surahRange: 'Surah Ya-Sin (36:28) – Az-Zumar (39:31)',
    startingAyah: 'وَمَا لِيَ لَا أَعْبُدُ الَّذِي فَطَرَنِي وَإِلَيْهِ تُرْجَعُونَ',
    totalVerses: 357,
    pdfUrl: 'https://archive.org/download/colored-tajwidi-quran-with-english-transliteration/Para-23.pdf',
    onlineViewerUrl: 'https://archive.org/embed/colored-tajwidi-quran-with-english-transliteration?page=441',
    thumbnailGradient: 'from-amber-900 to-[#851C82]'
  },
  {
    paraNumber: 24,
    arabicName: 'فَمَنْ أَظْلَمُ',
    englishTransliteration: 'Fa-Man Azlamu',
    surahRange: 'Surah Az-Zumar (39:32) – Fussilat (41:46)',
    startingAyah: 'فَمَنْ أَظْلَمُ مِمَّنْ كَذَبَ عَلَى اللَّهِ وَكَذَّبَ بِالصِّدْقِ إِذْ جَاءَهُ',
    totalVerses: 175,
    pdfUrl: 'https://archive.org/download/colored-tajwidi-quran-with-english-transliteration/Para-24.pdf',
    onlineViewerUrl: 'https://archive.org/embed/colored-tajwidi-quran-with-english-transliteration?page=461',
    thumbnailGradient: 'from-[#851C82] to-teal-900'
  },
  {
    paraNumber: 25,
    arabicName: 'إِلَيْهِ يُرَدُّ',
    englishTransliteration: 'Ilayhi Yuraddu',
    surahRange: 'Surah Fussilat (41:47) – Al-Jathiyah (45:37)',
    startingAyah: 'إِلَيْهِ يُرَدُّ عِلْمُ السَّاعَةِ وَمَا تَخْرُجُ مِنْ ثَمَرَاتٍ مِنْ أَكْمَامِهَا',
    totalVerses: 246,
    pdfUrl: 'https://archive.org/download/colored-tajwidi-quran-with-english-transliteration/Para-25.pdf',
    onlineViewerUrl: 'https://archive.org/embed/colored-tajwidi-quran-with-english-transliteration?page=481',
    thumbnailGradient: 'from-teal-900 to-indigo-900'
  },
  {
    paraNumber: 26,
    arabicName: 'حم (حَمِيم)',
    englishTransliteration: 'Ha-Meem (Hameem)',
    surahRange: 'Surah Al-Ahqaf (46:1) – Adh-Dhariyat (51:30)',
    startingAyah: 'حم تَنْزِيلُ الْكِتَابِ مِنَ اللَّهِ الْعَزِيزِ الْحَكِيمِ',
    totalVerses: 195,
    pdfUrl: 'https://archive.org/download/colored-tajwidi-quran-with-english-transliteration/Para-26.pdf',
    onlineViewerUrl: 'https://archive.org/embed/colored-tajwidi-quran-with-english-transliteration?page=501',
    thumbnailGradient: 'from-indigo-900 to-[#6E1373]'
  },
  {
    paraNumber: 27,
    arabicName: 'قَالَ فَمَا خَطْبُكُمْ',
    englishTransliteration: 'Qala Fama Khatbukum',
    surahRange: 'Surah Adh-Dhariyat (51:31) – Al-Hadid (57:29)',
    startingAyah: 'قَالَ فَمَا خَطْبُكُمْ أَيُّهَا الْمُرْسَلُونَ · قَالُوا إِنَّا أُرْسِلْنَا',
    totalVerses: 399,
    pdfUrl: 'https://archive.org/download/colored-tajwidi-quran-with-english-transliteration/Para-27.pdf',
    onlineViewerUrl: 'https://archive.org/embed/colored-tajwidi-quran-with-english-transliteration?page=521',
    thumbnailGradient: 'from-[#6E1373] to-rose-900'
  },
  {
    paraNumber: 28,
    arabicName: 'قَدْ سَمِعَ اللَّهُ',
    englishTransliteration: 'Qadd Sami\'allahu',
    surahRange: 'Surah Al-Mujadila (58:1) – At-Tahrim (66:12)',
    startingAyah: 'قَدْ سَمِعَ اللَّهُ قَوْلَ الَّتِي تُجَادِلُكَ فِي زَوْجِهَا',
    totalVerses: 137,
    pdfUrl: 'https://archive.org/download/colored-tajwidi-quran-with-english-transliteration/Para-28.pdf',
    onlineViewerUrl: 'https://archive.org/embed/colored-tajwidi-quran-with-english-transliteration?page=541',
    thumbnailGradient: 'from-rose-900 to-purple-900'
  },
  {
    paraNumber: 29,
    arabicName: 'تَبَارَكَ الَّذِي',
    englishTransliteration: 'Tabarakallazi',
    surahRange: 'Surah Al-Mulk (67:1) – Al-Mursalat (77:50)',
    startingAyah: 'تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ',
    totalVerses: 431,
    pdfUrl: 'https://archive.org/download/colored-tajwidi-quran-with-english-transliteration/Para-29.pdf',
    onlineViewerUrl: 'https://archive.org/embed/colored-tajwidi-quran-with-english-transliteration?page=561',
    thumbnailGradient: 'from-purple-900 to-[#851C82]'
  },
  {
    paraNumber: 30,
    arabicName: 'عَمَّ يَتَسَاءَلُونَ',
    englishTransliteration: 'Amma Yatasa\'aloon',
    surahRange: 'Surah An-Naba (78:1) – An-Nas (114:6)',
    startingAyah: 'عَمَّ يَتَسَاءَلُونَ · عَنِ النَّبَإِ الْعَظِيمِ',
    totalVerses: 564,
    pdfUrl: 'https://archive.org/download/colored-tajwidi-quran-with-english-transliteration/Para-30.pdf',
    onlineViewerUrl: 'https://archive.org/embed/colored-tajwidi-quran-with-english-transliteration?page=581',
    thumbnailGradient: 'from-[#851C82] to-amber-700'
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
