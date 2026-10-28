import { QaidaLesson } from '../types';

/**
 * Authentic 22-Lesson Madani Qaida Curriculum (Standard Global Curriculum as on equranschool.com/qaida/)
 * Enhanced with authentic Madani color-coding:
 * - Black: Normal Consonants
 * - Red: Madd (Prolongation letters & Khari Harakat)
 * - Blue: Harakaat (Zabar, Zer, Pesh, Sukoon, Qalqalah)
 * - Green: Ghunnah, Ikhfa & Idgham
 */
export const INITIAL_QAIDA_LESSONS: QaidaLesson[] = [
  // LESSON 1: Huroof Mufradat
  {
    id: 'lesson-1',
    lessonNumber: 1,
    title: 'Huroof Mufradat (Individual Letters)',
    arabicTitle: 'حُرُوفُ الْمُفْرَدَات',
    description: 'Master the 29 individual letters of the Arabic alphabet with their exact points of articulation (Makharij).',
    rulesSummary: [
      'Pronounce each letter clearly from its specific point of articulation (Makhraj).',
      'Bold/Full-mouth letters (Musta\'liyah): Khaw (خ), Saad (ص), Daad (ض), Ghayn (غ), Taw (ط), Qaf (ق), Za (ظ).',
      'Throat letters (Halqiyyah): Hamzah (ء), Haa (ه), Ayn (ع), Haa (ح), Ghayn (غ), Khaa (خ).'
    ],
    passingScore: 75,
    words: [
      { id: 'w-1', arabic: 'ا', transliteration: 'Alif', makhraj: 'Empty space of mouth & throat (Jawf)', phoneticTarget: 'alif', level: 'beginner', colorCategory: 'black' },
      { id: 'w-2', arabic: 'ب', transliteration: 'Baa', makhraj: 'Moist inner parts of both lips', phoneticTarget: 'baa', level: 'beginner', colorCategory: 'black' },
      { id: 'w-3', arabic: 'ت', transliteration: 'Taa', makhraj: 'Tip of tongue touching roots of upper front teeth', phoneticTarget: 'taa', level: 'beginner', colorCategory: 'black' },
      { id: 'w-4', arabic: 'ث', transliteration: 'Thaa', makhraj: 'Tip of tongue touching edges of upper front teeth', phoneticTarget: 'thaa', level: 'beginner', colorCategory: 'black' },
      { id: 'w-5', arabic: 'ج', transliteration: 'Jeem', makhraj: 'Middle of tongue touching upper palate', phoneticTarget: 'jeem', level: 'beginner', colorCategory: 'black' },
      { id: 'w-6', arabic: 'ح', transliteration: 'Haa', makhraj: 'Middle of throat (Wasat al-Halq)', phoneticTarget: 'haa', level: 'intermediate', colorCategory: 'black' },
      { id: 'w-7', arabic: 'خ', transliteration: 'Khaa', makhraj: 'Upper throat nearest to mouth (Adna al-Halq)', phoneticTarget: 'khaa', level: 'intermediate', colorCategory: 'blue', tajweedRule: 'Heavy / Bold letter (Tafkheem)' },
      { id: 'w-8', arabic: 'د', transliteration: 'Daal', makhraj: 'Tip of tongue on roots of upper teeth', phoneticTarget: 'daal', level: 'beginner', colorCategory: 'black' },
      { id: 'w-9', arabic: 'ذ', transliteration: 'Zaal', makhraj: 'Tip of tongue on edges of upper teeth', phoneticTarget: 'dhaal', level: 'beginner', colorCategory: 'black' },
      { id: 'w-10', arabic: 'ر', transliteration: 'Raa', makhraj: 'Tip of tongue and top part of gums', phoneticTarget: 'raa', level: 'beginner', colorCategory: 'black' },
      { id: 'w-11', arabic: 'ز', transliteration: 'Zaa', makhraj: 'Tip of tongue near inner lower teeth', phoneticTarget: 'zaay', level: 'beginner', colorCategory: 'black' },
      { id: 'w-12', arabic: 'س', transliteration: 'Seen', makhraj: 'Tip of tongue near lower front teeth with whistle', phoneticTarget: 'seen', level: 'beginner', colorCategory: 'black' },
      { id: 'w-13', arabic: 'ش', transliteration: 'Sheen', makhraj: 'Middle of tongue with breath dispersion (Tafash-shi)', phoneticTarget: 'sheen', level: 'beginner', colorCategory: 'black' },
      { id: 'w-14', arabic: 'ص', transliteration: 'Saad', makhraj: 'Tip of tongue near lower teeth, lips rounded & full-mouth', phoneticTarget: 'saad', level: 'intermediate', colorCategory: 'blue', tajweedRule: 'Heavy / Bold letter (Isti\'la)' },
      { id: 'w-15', arabic: 'ض', transliteration: 'Daad', makhraj: 'Side/edge of tongue against upper molars', phoneticTarget: 'daad', level: 'advanced', colorCategory: 'blue', tajweedRule: 'Boldest Arabic letter (Istitalah)' },
      { id: 'w-16', arabic: 'ط', transliteration: 'Taw', makhraj: 'Tip of tongue against upper roots, pronounced bold', phoneticTarget: 'taa', level: 'intermediate', colorCategory: 'blue', tajweedRule: 'Heavy / Bold letter' },
      { id: 'w-17', arabic: 'ظ', transliteration: 'Zaw', makhraj: 'Tip of tongue on edges of upper teeth, bold', phoneticTarget: 'dhaa', level: 'intermediate', colorCategory: 'blue', tajweedRule: 'Heavy / Bold letter' },
      { id: 'w-18', arabic: 'ع', transliteration: 'Ayn', makhraj: 'Middle of throat (Wasat al-Halq)', phoneticTarget: 'ayn', level: 'advanced', colorCategory: 'black' },
      { id: 'w-19', arabic: 'غ', transliteration: 'Ghayn', makhraj: 'Top of throat nearest to uvula', phoneticTarget: 'ghayn', level: 'intermediate', colorCategory: 'blue', tajweedRule: 'Heavy / Bold letter' },
      { id: 'w-20', arabic: 'ف', transliteration: 'Faa', makhraj: 'Edges of upper front teeth on wet inside of lower lip', phoneticTarget: 'faa', level: 'beginner', colorCategory: 'black' },
      { id: 'w-21', arabic: 'ق', transliteration: 'Qaaf', makhraj: 'Extreme back of tongue touching soft palate', phoneticTarget: 'qaaf', level: 'intermediate', colorCategory: 'blue', tajweedRule: 'Heavy & Qalqalah' },
      { id: 'w-22', arabic: 'ك', transliteration: 'Kaaf', makhraj: 'Back of tongue touching hard palate just in front of Qaf', phoneticTarget: 'kaaf', level: 'beginner', colorCategory: 'black' },
      { id: 'w-23', arabic: 'ل', transliteration: 'Laam', makhraj: 'Side and front of tongue against upper gums', phoneticTarget: 'laam', level: 'beginner', colorCategory: 'black' },
      { id: 'w-24', arabic: 'م', transliteration: 'Meem', makhraj: 'Dry outer edges of both lips meeting', phoneticTarget: 'meem', level: 'beginner', colorCategory: 'black' },
      { id: 'w-25', arabic: 'ن', transliteration: 'Noon', makhraj: 'Tip of tongue on upper gums with nasal sound', phoneticTarget: 'noon', level: 'beginner', colorCategory: 'black' },
      { id: 'w-26', arabic: 'و', transliteration: 'Waw', makhraj: 'Incomplete contact of both lips forming a circle', phoneticTarget: 'waw', level: 'beginner', colorCategory: 'black' },
      { id: 'w-27', arabic: 'ه', transliteration: 'Haa (Soft)', makhraj: 'Deepest bottom of throat (Aqsa al-Halq)', phoneticTarget: 'haa', level: 'beginner', colorCategory: 'black' },
      { id: 'w-28', arabic: 'ء', transliteration: 'Hamzah', makhraj: 'Deepest bottom of throat with vocal cord closure', phoneticTarget: 'hamzah', level: 'beginner', colorCategory: 'black' },
      { id: 'w-29', arabic: 'ي', transliteration: 'Yaa', makhraj: 'Middle of tongue raised towards upper roof', phoneticTarget: 'yaa', level: 'beginner', colorCategory: 'black' }
    ]
  },

  // LESSON 2: Huroof Murakkabat (Compound Letters)
  {
    id: 'lesson-2',
    lessonNumber: 2,
    title: 'Huroof Murakkabat (Compound Letters)',
    arabicTitle: 'حُرُوفُ الْمُرَكَّبَات',
    description: 'Learn how Arabic letters connect and change shapes at the beginning, middle, and end of words.',
    rulesSummary: [
      'Recognize letters by their head shapes and dots, not by the tail.',
      'Alif never connects forward; it only joins from the right.',
      'Baa, Taa, Thaa, Noon, and Yaa share the same base shape in compound forms.'
    ],
    passingScore: 75,
    words: [
      { id: 'w-201', arabic: 'لا', transliteration: 'Laam-Alif', makhraj: 'Compound of Laam & Alif', phoneticTarget: 'laam alif', level: 'beginner', colorCategory: 'red' },
      { id: 'w-202', arabic: 'با', transliteration: 'Baa-Alif', makhraj: 'Baa connecting into Alif', phoneticTarget: 'baa alif', level: 'beginner', colorCategory: 'black' },
      { id: 'w-203', arabic: 'تا', transliteration: 'Taa-Alif', makhraj: 'Taa connecting into Alif', phoneticTarget: 'taa alif', level: 'beginner', colorCategory: 'black' },
      { id: 'w-204', arabic: 'ثا', transliteration: 'Thaa-Alif', makhraj: 'Thaa connecting into Alif', phoneticTarget: 'thaa alif', level: 'beginner', colorCategory: 'black' },
      { id: 'w-205', arabic: 'بل', transliteration: 'Baa-Laam', makhraj: 'Baa joined with tall Laam', phoneticTarget: 'baa laam', level: 'beginner', colorCategory: 'black' },
      { id: 'w-206', arabic: 'تل', transliteration: 'Taa-Laam', makhraj: 'Taa joined with Laam', phoneticTarget: 'taa laam', level: 'beginner', colorCategory: 'black' },
      { id: 'w-207', arabic: 'جا', transliteration: 'Jeem-Alif', makhraj: 'Jeem head joined with Alif', phoneticTarget: 'jeem alif', level: 'beginner', colorCategory: 'black' },
      { id: 'w-208', arabic: 'حق', transliteration: 'Haa-Qaaf', makhraj: 'Throaty Haa joined with Qaaf', phoneticTarget: 'haa qaaf', level: 'intermediate', colorCategory: 'blue' },
      { id: 'w-209', arabic: 'خب', transliteration: 'Khaa-Baa', makhraj: 'Heavy Khaa joined with Baa', phoneticTarget: 'khaa baa', level: 'intermediate', colorCategory: 'blue' },
      { id: 'w-210', arabic: 'نل', transliteration: 'Noon-Laam', makhraj: 'Noon head joined with Laam', phoneticTarget: 'noon laam', level: 'beginner', colorCategory: 'black' },
      { id: 'w-211', arabic: 'يل', transliteration: 'Yaa-Laam', makhraj: 'Yaa head joined with Laam', phoneticTarget: 'yaa laam', level: 'beginner', colorCategory: 'black' },
      { id: 'w-212', arabic: 'ثم', transliteration: 'Thaa-Meem', makhraj: 'Thaa joined with circular Meem', phoneticTarget: 'thaa meem', level: 'beginner', colorCategory: 'black' }
    ]
  },

  // LESSON 3: Huroof Muqatta'at (Abbreviated Letters)
  {
    id: 'lesson-3',
    lessonNumber: 3,
    title: 'Huroof Muqatta\'at (Quranic Disjoined Letters)',
    arabicTitle: 'حُرُوفُ الْمُقَطَّعَات',
    description: 'Mysterious letters appearing at the beginning of 29 Surahs, recited by their full original names with prolonged Madd.',
    rulesSummary: [
      'Pronounce each letter by its full spelling name (e.g., Alif, Laam, Meem).',
      'Stretch letters containing Madd (Laam, Meem, Seen, Saad, Qaf, Kaaf) for 4 to 6 counts (harakat).',
      'Apply Ghunnah where Meem and Noon merge.'
    ],
    passingScore: 75,
    words: [
      { id: 'w-301', arabic: 'الۤمۤ', transliteration: 'Alif-Laaam-Meeem', makhraj: 'Alif (1) + Laam (6) + Meem (6) with Ghunnah', phoneticTarget: 'alif laam meem', level: 'intermediate', colorCategory: 'red', tajweedRule: 'Madd Lazim Harfi Musaqqal (6 counts)' },
      { id: 'w-302', arabic: 'الۤمۤصۤ', transliteration: 'Alif-Laaam-Meeem-Saaad', makhraj: 'Alif + Laam + Meem + Saad (6 counts each)', phoneticTarget: 'alif laam meem saad', level: 'advanced', colorCategory: 'red' },
      { id: 'w-303', arabic: 'الر', transliteration: 'Alif-Laaam-Raa', makhraj: 'Alif (no stretch) + Laam (6 counts) + Raa (2 counts)', phoneticTarget: 'alif laam raa', level: 'intermediate', colorCategory: 'red' },
      { id: 'w-304', arabic: 'طٰهٰ', transliteration: 'Taa-Haa', makhraj: 'Taa (2 counts) + Haa (2 counts)', phoneticTarget: 'taa haa', level: 'beginner', colorCategory: 'red' },
      { id: 'w-305', arabic: 'طٰسۤمۤ', transliteration: 'Taa-Seeen-Meeem', makhraj: 'Taa (2 counts) + Seen (6 counts) + Meem (6 counts)', phoneticTarget: 'taa seen meem', level: 'advanced', colorCategory: 'red' },
      { id: 'w-306', arabic: 'يٰسۤ', transliteration: 'Yaa-Seeen', makhraj: 'Yaa (2 counts) + Seen (6 counts)', phoneticTarget: 'yaa seen', level: 'intermediate', colorCategory: 'red' },
      { id: 'w-307', arabic: 'صۤ', transliteration: 'Saaad', makhraj: 'Saad with full mouth and 6 counts prolongation', phoneticTarget: 'saad', level: 'intermediate', colorCategory: 'red' },
      { id: 'w-308', arabic: 'حٰمۤ', transliteration: 'Haa-Meeem', makhraj: 'Haa (2 counts) + Meem (6 counts)', phoneticTarget: 'haa meem', level: 'intermediate', colorCategory: 'red' },
      { id: 'w-309', arabic: 'قۤ', transliteration: 'Qaaaf', makhraj: 'Qaaf deep full-mouth with 6 counts prolongation', phoneticTarget: 'qaaf', level: 'intermediate', colorCategory: 'red' },
      { id: 'w-310', arabic: 'نۤ', transliteration: 'Nooon', makhraj: 'Noon with 6 counts prolongation and Ghunnah', phoneticTarget: 'noon', level: 'intermediate', colorCategory: 'red' }
    ]
  },

  // LESSON 4: Harakaat (Short Vowels: Zabar, Zer, Pesh)
  {
    id: 'lesson-4',
    lessonNumber: 4,
    title: 'Harakaat (Zabar, Zer, Pesh - Short Vowels)',
    arabicTitle: 'الْحَرَكَات (فَتْحَة ، كَسْرَة ، ضَمَّة)',
    description: 'Learn the three primary short vowels: Fathah (Zabar), Kasrah (Zer), and Dammah (Pesh). Pronounce promptly without stretching.',
    rulesSummary: [
      'Do not stretch Harakaat: pronounce swiftly in 1 count.',
      'Fathah (Zabar): slant line above letter producing "a" sound.',
      'Kasrah (Zer): slant line below letter producing "i" sound.',
      'Dammah (Pesh): small hook above letter producing "u" sound without rounding lips excessively.'
    ],
    passingScore: 75,
    words: [
      { id: 'w-401', arabic: 'أَ', transliteration: 'A', makhraj: 'Hamzah with Fathah', phoneticTarget: 'a', level: 'beginner', colorCategory: 'blue' },
      { id: 'w-402', arabic: 'إِ', transliteration: 'I', makhraj: 'Hamzah with Kasrah', phoneticTarget: 'i', level: 'beginner', colorCategory: 'blue' },
      { id: 'w-403', arabic: 'أُ', transliteration: 'U', makhraj: 'Hamzah with Dammah', phoneticTarget: 'u', level: 'beginner', colorCategory: 'blue' },
      { id: 'w-404', arabic: 'بَ', transliteration: 'Ba', makhraj: 'Baa with Fathah', phoneticTarget: 'ba', level: 'beginner', colorCategory: 'blue' },
      { id: 'w-405', arabic: 'بِ', transliteration: 'Bi', makhraj: 'Baa with Kasrah', phoneticTarget: 'bi', level: 'beginner', colorCategory: 'blue' },
      { id: 'w-406', arabic: 'بُ', transliteration: 'Bu', makhraj: 'Baa with Dammah', phoneticTarget: 'bu', level: 'beginner', colorCategory: 'blue' },
      { id: 'w-407', arabic: 'تَ', transliteration: 'Ta', makhraj: 'Taa with Fathah', phoneticTarget: 'ta', level: 'beginner', colorCategory: 'blue' },
      { id: 'w-408', arabic: 'تِ', transliteration: 'Ti', makhraj: 'Taa with Kasrah', phoneticTarget: 'ti', level: 'beginner', colorCategory: 'blue' },
      { id: 'w-409', arabic: 'تُ', transliteration: 'Tu', makhraj: 'Taa with Dammah', phoneticTarget: 'tu', level: 'beginner', colorCategory: 'blue' }
    ]
  },

  // LESSON 5: Tanween (Double Vowels)
  {
    id: 'lesson-5',
    lessonNumber: 5,
    title: 'Tanween (Do Zabar, Do Zer, Do Pesh)',
    arabicTitle: 'التَّنْوِين',
    description: 'Double short vowels that produce a hidden Noon Sakin sound at the end: -an, -in, -un.',
    rulesSummary: [
      'Two Zabars (Fathatayn): produces "an" sound.',
      'Two Zers (Kasratayn): produces "in" sound.',
      'Two Pesh (Dammatayn): produces "un" sound.'
    ],
    passingScore: 75,
    words: [
      { id: 'w-501', arabic: 'أً', transliteration: 'An', makhraj: 'Double Fathah on Hamzah', phoneticTarget: 'an', level: 'beginner', colorCategory: 'blue' },
      { id: 'w-502', arabic: 'إٍ', transliteration: 'In', makhraj: 'Double Kasrah on Hamzah', phoneticTarget: 'in', level: 'beginner', colorCategory: 'blue' },
      { id: 'w-503', arabic: 'أٌ', transliteration: 'Un', makhraj: 'Double Dammah on Hamzah', phoneticTarget: 'un', level: 'beginner', colorCategory: 'blue' },
      { id: 'w-504', arabic: 'بً', transliteration: 'Ban', makhraj: 'Double Fathah on Baa', phoneticTarget: 'ban', level: 'beginner', colorCategory: 'blue' },
      { id: 'w-505', arabic: 'بٍ', transliteration: 'Bin', makhraj: 'Double Kasrah on Baa', phoneticTarget: 'bin', level: 'beginner', colorCategory: 'blue' },
      { id: 'w-506', arabic: 'بٌ', transliteration: 'Bun', makhraj: 'Double Dammah on Baa', phoneticTarget: 'bun', level: 'beginner', colorCategory: 'blue' }
    ]
  },

  // LESSON 6: Mashq Harakaat wa Tanween
  {
    id: 'lesson-6',
    lessonNumber: 6,
    title: 'Mashq Harakaat wa Tanween (Word Exercises)',
    arabicTitle: 'مَشْقُ الْحَرَكَاتِ وَالتَّنْوِين',
    description: 'Practical exercise combining short vowels and Tanween into real Quranic words.',
    rulesSummary: [
      'Do not stretch short vowels into long ones.',
      'Pronounce each letter clearly with proper vowel inflection.'
    ],
    passingScore: 75,
    words: [
      { id: 'w-601', arabic: 'أَبَدًا', transliteration: 'Abadan', makhraj: 'Hamzah + Baa + Daal with Tanween', phoneticTarget: 'abadan', level: 'beginner', colorCategory: 'black', englishMeaning: 'Forever' },
      { id: 'w-602', arabic: 'أَحَدٌ', transliteration: 'Ahadun', makhraj: 'Hamzah + throaty Haa + Daal with Tanween', phoneticTarget: 'ahadun', level: 'beginner', colorCategory: 'black', englishMeaning: 'One' },
      { id: 'w-603', arabic: 'خَلَقَ', transliteration: 'Khalaqa', makhraj: 'Bold Khaa + light Laam + bold Qaaf', phoneticTarget: 'khalaqa', level: 'intermediate', colorCategory: 'blue', englishMeaning: 'He created' },
      { id: 'w-604', arabic: 'مَلِكٍ', transliteration: 'Malikin', makhraj: 'Meem + Laam + Kaaf with Tanween', phoneticTarget: 'malikin', level: 'beginner', colorCategory: 'black', englishMeaning: 'King' }
    ]
  },

  // LESSON 7: Khari Harakaat (Standing Vowels)
  {
    id: 'lesson-7',
    lessonNumber: 7,
    title: 'Khari Harakaat (Standing Zabar, Zer & Ulta Pesh)',
    arabicTitle: 'الْحَرَكَاتُ الْقَائِمَة',
    description: 'Vertical vowel marks that stand in place of Huroof Maddah, prolonged for exactly 2 counts (1 Alif).',
    rulesSummary: [
      'Khara Zabar equals Alif Maddah (stretched 2 counts).',
      'Khari Zer equals Yaa Maddah (stretched 2 counts).',
      'Ulta Pesh equals Waw Maddah (stretched 2 counts).'
    ],
    passingScore: 75,
    words: [
      { id: 'w-701', arabic: 'بٰ', transliteration: 'Baa', makhraj: 'Baa with Standing Zabar', phoneticTarget: 'baa', level: 'beginner', colorCategory: 'red', tajweedRule: 'Stretch 2 counts' },
      { id: 'w-702', arabic: 'بٖ', transliteration: 'Bee', makhraj: 'Baa with Standing Zer', phoneticTarget: 'bee', level: 'beginner', colorCategory: 'red', tajweedRule: 'Stretch 2 counts' },
      { id: 'w-703', arabic: 'بٗ', transliteration: 'Boo', makhraj: 'Baa with Inverted Pesh', phoneticTarget: 'boo', level: 'beginner', colorCategory: 'red', tajweedRule: 'Stretch 2 counts' },
      { id: 'w-704', arabic: 'مٰلِكِ', transliteration: 'Maaliki', makhraj: 'Meem with Khara Zabar (2 counts) + Laam + Kaaf', phoneticTarget: 'maaliki', level: 'beginner', colorCategory: 'red', englishMeaning: 'Master / Owner' }
    ]
  },

  // LESSON 8: Huroof Maddah & Leen
  {
    id: 'lesson-8',
    lessonNumber: 8,
    title: 'Huroof Maddah & Leen (Soft & Prolonged Letters)',
    arabicTitle: 'حُرُوفُ الْمَدَّةِ وَاللِّين',
    description: 'Learn the three letters of prolongation (Alif, Waw, Yaa) and the two soft letters of Leen.',
    rulesSummary: [
      'Alif before Fathah, Waw Saakin before Dammah, Yaa Saakin before Kasrah = Huroof Maddah (2 counts).',
      'Waw Saakin and Yaa Saakin before Fathah = Huroof Leen (soft, smooth sound without stretching).'
    ],
    passingScore: 75,
    words: [
      { id: 'w-801', arabic: 'بَا', transliteration: 'Baa', makhraj: 'Alif Maddah after Fathah', phoneticTarget: 'baa', level: 'beginner', colorCategory: 'red' },
      { id: 'w-802', arabic: 'بُو', transliteration: 'Boo', makhraj: 'Waw Maddah after Dammah', phoneticTarget: 'boo', level: 'beginner', colorCategory: 'red' },
      { id: 'w-803', arabic: 'بِي', transliteration: 'Bee', makhraj: 'Yaa Maddah after Kasrah', phoneticTarget: 'bee', level: 'beginner', colorCategory: 'red' },
      { id: 'w-804', arabic: 'بَوْ', transliteration: 'Baw', makhraj: 'Waw Leen pronounced softly', phoneticTarget: 'baw', level: 'beginner', colorCategory: 'blue' },
      { id: 'w-805', arabic: 'بَيْ', transliteration: 'Bay', makhraj: 'Yaa Leen pronounced softly', phoneticTarget: 'bay', level: 'beginner', colorCategory: 'blue' }
    ]
  },

  // LESSON 9: Mashq Khari Harakat & Madd-o-Leen
  {
    id: 'lesson-9',
    lessonNumber: 9,
    title: 'Mashq Khari Harakat & Madd-o-Leen',
    arabicTitle: 'مَشْقُ الْحَرَكَاتِ وَاللِّين',
    description: 'Comprehensive practice combining long vowels, standing vowels, and soft letters in Quranic phrases.',
    rulesSummary: [
      'Maintain exact 2-count duration for Maddah.',
      'Do not jerk the voice on Leen letters.'
    ],
    passingScore: 75,
    words: [
      { id: 'w-901', arabic: 'قَالَ', transliteration: 'Qaala', makhraj: 'Heavy Qaaf with Alif Madd + light Laam', phoneticTarget: 'qaala', level: 'beginner', colorCategory: 'red', englishMeaning: 'He said' },
      { id: 'w-902', arabic: 'يَقُولُ', transliteration: 'Yaqoolu', makhraj: 'Yaa + Qaaf with Waw Madd + Laam', phoneticTarget: 'yaqoolu', level: 'beginner', colorCategory: 'red', englishMeaning: 'He says' },
      { id: 'w-903', arabic: 'خَوْفٍ', transliteration: 'Khawfin', makhraj: 'Bold Khaa with Waw Leen + Faa with Tanween', phoneticTarget: 'khawfin', level: 'intermediate', colorCategory: 'blue', englishMeaning: 'Fear' },
      { id: 'w-904', arabic: 'قُرَيْشٍ', transliteration: 'Qurayshin', makhraj: 'Qaaf + Raa with Yaa Leen + Sheen', phoneticTarget: 'qurayshin', level: 'intermediate', colorCategory: 'blue', englishMeaning: 'Quraysh' }
    ]
  },

  // LESSON 10: Sukoon / Jazm
  {
    id: 'lesson-10',
    lessonNumber: 10,
    title: 'Sukoon / Jazm (Resting / Quiescent Letters)',
    arabicTitle: 'السُّكُون (الْجَزْم)',
    description: 'A letter with Sukoon (circle or small crescent mark) has no vowel and rests upon the preceding moving letter.',
    rulesSummary: [
      'A Saakin letter cannot be pronounced alone; it must join with the previous letter.',
      'Pronounce firmly without adding an extra vowel.'
    ],
    passingScore: 75,
    words: [
      { id: 'w-1001', arabic: 'أَبْ', transliteration: 'Ab', makhraj: 'Hamzah into Saakin Baa (Qalqalah)', phoneticTarget: 'ab', level: 'beginner', colorCategory: 'blue', tajweedRule: 'Qalqalah on Baa' },
      { id: 'w-1002', arabic: 'إِبْ', transliteration: 'Ib', makhraj: 'Kasrah into Saakin Baa', phoneticTarget: 'ib', level: 'beginner', colorCategory: 'blue' },
      { id: 'w-1003', arabic: 'أُبْ', transliteration: 'Ub', makhraj: 'Dammah into Saakin Baa', phoneticTarget: 'ub', level: 'beginner', colorCategory: 'blue' },
      { id: 'w-1004', arabic: 'أَنْ', transliteration: 'An', makhraj: 'Hamzah into Saakin Noon', phoneticTarget: 'an', level: 'beginner', colorCategory: 'blue' }
    ]
  },

  // LESSON 11: Mashq Sukoon / Jazm
  {
    id: 'lesson-11',
    lessonNumber: 11,
    title: 'Mashq Sukoon / Jazm (Word Exercises)',
    arabicTitle: 'مَشْقُ السُّكُون',
    description: 'Reading full words containing quiescent letters with accurate timing and articulation.',
    rulesSummary: [
      'Stop cleanly on the saakin letter without creating a phantom vowel.',
      'Observe Qalqalah on ق ط ب ج د when saakin.'
    ],
    passingScore: 75,
    words: [
      { id: 'w-1101', arabic: 'يَكْتُبُ', transliteration: 'Yaktubu', makhraj: 'Kaaf with Hams under Sukoon', phoneticTarget: 'yaktubu', level: 'beginner', colorCategory: 'black', englishMeaning: 'He writes' },
      { id: 'w-1102', arabic: 'يَقْرَأُ', transliteration: 'Yaqra-u', makhraj: 'Qaaf with Qalqalah + Raa + Hamzah', phoneticTarget: 'yaqra-u', level: 'intermediate', colorCategory: 'blue', englishMeaning: 'He recites' },
      { id: 'w-1103', arabic: 'أَنْعَمْتَ', transliteration: 'An’amta', makhraj: 'Clear Noon (Izhar) + Ayn + Meem', phoneticTarget: 'an-amta', level: 'intermediate', colorCategory: 'black', englishMeaning: 'You bestowed favor' }
    ]
  },

  // LESSON 12: Tashdeed (Shaddah / Doubled Letters)
  {
    id: 'lesson-12',
    lessonNumber: 12,
    title: 'Tashdeed (Shaddah - Doubled Letters)',
    arabicTitle: 'التَّشْدِيد (الشَّدَّة)',
    description: 'A three-pronged mark (ّ) indicating that the letter is pronounced twice: first with Sukoon, then with a vowel.',
    rulesSummary: [
      'Pronounce with emphasis and strength (Nabr).',
      'If Shaddah is on Noon (نّ) or Meem (مّ), recite with compulsory Ghunnah (2 counts nasal sound).'
    ],
    passingScore: 75,
    words: [
      { id: 'w-1201', arabic: 'أَبَّ', transliteration: 'Abba', makhraj: 'Baa doubled with Fathah', phoneticTarget: 'abba', level: 'beginner', colorCategory: 'blue' },
      { id: 'w-1202', arabic: 'إِبِّ', transliteration: 'Ibbi', makhraj: 'Baa doubled with Kasrah', phoneticTarget: 'ibbi', level: 'beginner', colorCategory: 'blue' },
      { id: 'w-1203', arabic: 'أُبُّ', transliteration: 'Ubbu', makhraj: 'Baa doubled with Dammah', phoneticTarget: 'ubbu', level: 'beginner', colorCategory: 'blue' },
      { id: 'w-1204', arabic: 'إِنَّ', transliteration: 'Inna', makhraj: 'Noon Mushaddad with mandatory Ghunnah', phoneticTarget: 'inna', level: 'beginner', colorCategory: 'green', tajweedRule: 'Ghunnah 2 counts' }
    ]
  },

  // LESSON 13: Mashq Tashdeed
  {
    id: 'lesson-13',
    lessonNumber: 13,
    title: 'Mashq Tashdeed (Words with Doubled Letters)',
    arabicTitle: 'مَشْقُ التَّشْدِيد',
    description: 'Practical training on real Quranic words containing doubled letters with proper vocal weight.',
    rulesSummary: [
      'Do not rush past doubled letters; give them double duration.',
      'Pronounce the Shaddah firmly without stopping the voice abruptly.'
    ],
    passingScore: 75,
    words: [
      { id: 'w-1301', arabic: 'رَبَّنَا', transliteration: 'Rabbanaa', makhraj: 'Raa + doubled Baa + Naa', phoneticTarget: 'rabbanaa', level: 'beginner', colorCategory: 'blue', englishMeaning: 'Our Lord' },
      { id: 'w-1302', arabic: 'مَدَّ', transliteration: 'Madda', makhraj: 'Meem + doubled Daal with strength', phoneticTarget: 'madda', level: 'beginner', colorCategory: 'blue', englishMeaning: 'He extended' },
      { id: 'w-1303', arabic: 'حَقَّ', transliteration: 'Haqqa', makhraj: 'Throaty Haa + doubled bold Qaaf', phoneticTarget: 'haqqa', level: 'intermediate', colorCategory: 'blue', englishMeaning: 'True / Due' }
    ]
  },

  // LESSON 14: Tashdeed with Sukoon
  {
    id: 'lesson-14',
    lessonNumber: 14,
    title: 'Tashdeed with Sukoon',
    arabicTitle: 'التَّشْدِيدُ مَعَ السُّكُون',
    description: 'Words that combine both Shaddah and Sukoon in sequential syllables.',
    rulesSummary: [
      'Transition smoothly from the doubled letter into the quiescent letter.',
      'Maintain clear distinction between moving and stationary sounds.'
    ],
    passingScore: 75,
    words: [
      { id: 'w-1401', arabic: 'أَمَّنْ', transliteration: 'Am-man', makhraj: 'Meem Mushaddadah with Ghunnah + Noon Saakin', phoneticTarget: 'am-man', level: 'intermediate', colorCategory: 'green' },
      { id: 'w-1402', arabic: 'كَلَّا', transliteration: 'Kallaa', makhraj: 'Kaaf + doubled Laam into Alif Madd', phoneticTarget: 'kallaa', level: 'beginner', colorCategory: 'red', englishMeaning: 'Nay / By no means' }
    ]
  },

  // LESSON 15: Tashdeed with Tashdeed (Consecutive Shaddah)
  {
    id: 'lesson-15',
    lessonNumber: 15,
    title: 'Tashdeed with Tashdeed (Consecutive Shaddah)',
    arabicTitle: 'تَشْدِيدٌ بَعْدَ تَشْدِيد',
    description: 'Advanced words containing two doubled letters in succession, requiring precise tongue control.',
    rulesSummary: [
      'Give both consecutive Shaddahs their full emphasis.',
      'Do not let the tongue slip or merge the two letters into one.'
    ],
    passingScore: 80,
    words: [
      { id: 'w-1501', arabic: 'يَزَّكَّىٰ', transliteration: 'Yazzakkaa', makhraj: 'Doubled Zaa + doubled Kaaf into Khara Zabar', phoneticTarget: 'yazzakkaa', level: 'advanced', colorCategory: 'red', englishMeaning: 'Purifies himself' },
      { id: 'w-1502', arabic: 'مُزَّمِّلُ', transliteration: 'Muzzammilu', makhraj: 'Doubled Zaa + doubled Meem with Ghunnah', phoneticTarget: 'muzzammilu', level: 'advanced', colorCategory: 'green', englishMeaning: 'Wrapped in garments' }
    ]
  },

  // LESSON 16: Tashdeed with Huroof Maddah
  {
    id: 'lesson-16',
    lessonNumber: 16,
    title: 'Tashdeed with Huroof Maddah (Madd Lazim)',
    arabicTitle: 'التَّشْدِيدُ مَعَ حُرُوفِ الْمَدَّة',
    description: 'When a long vowel letter is directly followed by a letter with Shaddah, stretch for 6 full counts.',
    rulesSummary: [
      'Recite with compulsory 6 counts prolongation (Madd Lazim Kalimi Musaqqal).',
      'Press with voice on the doubled letter (Nabr) upon ending the stretch.'
    ],
    passingScore: 80,
    words: [
      { id: 'w-1601', arabic: 'ضَآلِّينَ', transliteration: 'Daalllleen', makhraj: 'Daad + 6 counts Madd + doubled Laam', phoneticTarget: 'daalleen', level: 'advanced', colorCategory: 'red', tajweedRule: 'Madd Lazim (6 counts)' },
      { id: 'w-1602', arabic: 'دَآبَّةٍ', transliteration: 'Daabbatin', makhraj: 'Daal + 6 counts Madd + doubled Baa with Shaddah', phoneticTarget: 'daabbatin', level: 'advanced', colorCategory: 'red', englishMeaning: 'Creature' }
    ]
  },

  // LESSON 17: Rules of Noon Sakin & Tanween
  {
    id: 'lesson-17',
    lessonNumber: 17,
    title: 'Rules of Noon Sakin & Tanween (Izhar, Idgham, Iqlab, Ikhfa)',
    arabicTitle: 'أَحْكَامُ النُّونِ السَّاكِنَةِ وَالتَّنْوِين',
    description: 'The four fundamental Tajweed rulings governing Noon Sakin and Tanween.',
    rulesSummary: [
      'Izhar (Clear): Before 6 throat letters (ء ه ع ح غ خ) - no Ghunnah.',
      'Idgham (Merging): Into letters of يَرْمَلُون (with Ghunnah in ي ن م و, without in ل ر).',
      'Iqlab (Conversion): Turned into small Meem with Ghunnah before Baa (ب).',
      'Ikhfa (Hiding): Concealed with nasal Ghunnah before the remaining 15 letters.'
    ],
    passingScore: 80,
    words: [
      { id: 'w-1701', arabic: 'مَنْ ءَامَنَ', transliteration: 'Man Aamana', makhraj: 'Noon followed by Hamzah -> Izhar (Clear)', phoneticTarget: 'man aamana', level: 'intermediate', colorCategory: 'black', tajweedRule: 'Izhar Halqi' },
      { id: 'w-1702', arabic: 'مَن يَّقُولُ', transliteration: 'May-yaqoolu', makhraj: 'Noon merged into Yaa with 2 counts Ghunnah', phoneticTarget: 'may yaqoolu', level: 'intermediate', colorCategory: 'green', tajweedRule: 'Idgham with Ghunnah' },
      { id: 'w-1703', arabic: 'مِنۢ بَعْدِ', transliteration: 'Mim-ba’di', makhraj: 'Noon converted into Meem before Baa', phoneticTarget: 'mim ba-di', level: 'intermediate', colorCategory: 'green', tajweedRule: 'Iqlab' },
      { id: 'w-1704', arabic: 'مِن قَبْلِ', transliteration: 'Min qabli', makhraj: 'Noon concealed near Qaaf with bold Ghunnah', phoneticTarget: 'min qabli', level: 'advanced', colorCategory: 'green', tajweedRule: 'Ikhfa Haqiqi' }
    ]
  },

  // LESSON 18: Rules of Meem Sakin
  {
    id: 'lesson-18',
    lessonNumber: 18,
    title: 'Rules of Meem Sakin (Idgham, Ikhfa & Izhar Shafawi)',
    arabicTitle: 'أَحْكَامُ الْمِيمِ السَّاكِنَة',
    description: 'Rules for reciting a stationary Meem based on the letter that follows.',
    rulesSummary: [
      'Idgham Shafawi: Merged with Ghunnah when followed by another Meem (م).',
      'Ikhfa Shafawi: Concealed with light lip closure and Ghunnah before Baa (ب).',
      'Izhar Shafawi: Pronounced clearly without Ghunnah before all other 26 letters.'
    ],
    passingScore: 80,
    words: [
      { id: 'w-1801', arabic: 'لَهُم مَّا', transliteration: 'Lahum-maa', makhraj: 'Meem merged into Meem with Ghunnah', phoneticTarget: 'lahum maa', level: 'intermediate', colorCategory: 'green', tajweedRule: 'Idgham Shafawi' },
      { id: 'w-1802', arabic: 'تَرْمِيهِم بِحِجَارَةٍ', transliteration: 'Tarmeehim-bi-hijaarah', makhraj: 'Meem concealed before Baa with Ghunnah', phoneticTarget: 'tarmeehim bi hijaarah', level: 'advanced', colorCategory: 'green', tajweedRule: 'Ikhfa Shafawi' },
      { id: 'w-1803', arabic: 'هُمْ فِيهَا', transliteration: 'Hum feehaa', makhraj: 'Clear Meem before Faa (Izhar Shafawi)', phoneticTarget: 'hum feehaa', level: 'intermediate', colorCategory: 'black', tajweedRule: 'Izhar Shafawi' }
    ]
  },

  // LESSON 19: Rules of Qalqalah (Echoing / Bouncing Letters)
  {
    id: 'lesson-19',
    lessonNumber: 19,
    title: 'Rules of Qalqalah (Echoing Letters: ق ط ب ج د)',
    arabicTitle: 'حُرُوفُ الْقَلْقَلَة (قُطْبُ جَدّ)',
    description: 'When any of the five letters of Qutb Jadd has a Sukoon or when stopping on them, create a resonant echoing bounce.',
    rulesSummary: [
      'Five letters: Qaaf (ق), Taw (ط), Baa (ب), Jeem (ج), Daal (د).',
      'Minor Qalqalah (Sughra): in the middle of a word or continuous recitation.',
      'Major Qalqalah (Kubra): when stopping on the letter at the end of an Ayah.'
    ],
    passingScore: 80,
    words: [
      { id: 'w-1901', arabic: 'الفَلَقِ', transliteration: 'Al-Falaq (when stopped)', makhraj: 'Echo bounce on Qaaf at Waqf', phoneticTarget: 'al-falaq', level: 'intermediate', colorCategory: 'blue', tajweedRule: 'Qalqalah Kubra' },
      { id: 'w-1902', arabic: 'كَسَبَ', transliteration: 'Kasab (when stopped)', makhraj: 'Echo bounce on Baa at Waqf', phoneticTarget: 'kasab', level: 'intermediate', colorCategory: 'blue', tajweedRule: 'Qalqalah Kubra' },
      { id: 'w-1903', arabic: 'يَجْعَلُ', transliteration: 'Yaj’alu', makhraj: 'Quick bounce on Jeem in mid-word', phoneticTarget: 'yaj-alu', level: 'intermediate', colorCategory: 'blue', tajweedRule: 'Qalqalah Sughra' }
    ]
  },

  // LESSON 20: Rules of Raa & Laam (Bold vs Light)
  {
    id: 'lesson-20',
    lessonNumber: 20,
    title: 'Rules of Raa & Laam (Tafkheem & Tarqeeq)',
    arabicTitle: 'أَحْكَامُ الرَّاءِ وَاللَّام (التَّفْخِيمُ وَالتَّرْقِيق)',
    description: 'Mastering when Raa and the Name of Allah (Lafz al-Jalalah) are pronounced bold/thick or soft/light.',
    rulesSummary: [
      'Raa is Bold (Mufakhkham) with Fathah or Dammah; Light (Muraqqaq) with Kasrah.',
      'Laam in "Allah" is Bold after Fathah or Dammah; Light after Kasrah (e.g. Bismillahi).'
    ],
    passingScore: 80,
    words: [
      { id: 'w-2001', arabic: 'رَبِّ', transliteration: 'Rabbi', makhraj: 'Raa with Fathah -> Bold / Thick', phoneticTarget: 'rabbi', level: 'beginner', colorCategory: 'blue', tajweedRule: 'Raa Mufakhkham' },
      { id: 'w-2002', arabic: 'رِزْقًا', transliteration: 'Rizqan', makhraj: 'Raa with Kasrah -> Light / Thin', phoneticTarget: 'rizqan', level: 'beginner', colorCategory: 'black', tajweedRule: 'Raa Muraqqaq' },
      { id: 'w-2003', arabic: 'اللَّهَ', transliteration: 'Allaaha', makhraj: 'Name of Allah after Fathah -> Heavy Laam', phoneticTarget: 'allaaha', level: 'intermediate', colorCategory: 'blue', tajweedRule: 'Lafz al-Jalalah Bold' },
      { id: 'w-2004', arabic: 'بِاللَّهِ', transliteration: 'Billaahi', makhraj: 'Name of Allah after Kasrah -> Light Laam', phoneticTarget: 'billaahi', level: 'intermediate', colorCategory: 'black', tajweedRule: 'Lafz al-Jalalah Light' }
    ]
  },

  // LESSON 21: Rules of Maddat (Types of Prolongation)
  {
    id: 'lesson-21',
    lessonNumber: 21,
    title: 'Rules of Maddat (Prolongation Categories)',
    arabicTitle: 'أَقْسَامُ الْمُدُود',
    description: 'Detailed study of Madd Muttasil (Connected, 4-5 counts), Madd Munfasil (Separated, 4 counts), and Madd Lazim (Compulsory, 6 counts).',
    rulesSummary: [
      'Madd Muttasil: Long vowel + Hamzah in the same word (4-5 counts).',
      'Madd Munfasil: Long vowel at end of word + Hamzah at start of next word (4 counts).',
      'Madd Lazim: Long vowel followed by permanent Sukoon or Shaddah (6 full counts).'
    ],
    passingScore: 85,
    words: [
      { id: 'w-2101', arabic: 'السَّمَآءُ', transliteration: 'As-Samaaa-u', makhraj: 'Connected Madd + Hamzah in same word (4-5 counts)', phoneticTarget: 'as-samaa-u', level: 'advanced', colorCategory: 'red', tajweedRule: 'Madd Muttasil (4-5 counts)' },
      { id: 'w-2102', arabic: 'قُوۤا أَنفُسَكُمْ', transliteration: 'Qooo anfusakum', makhraj: 'Separated Madd across words (4 counts)', phoneticTarget: 'qoo anfusakum', level: 'advanced', colorCategory: 'red', tajweedRule: 'Madd Munfasil (4 counts)' },
      { id: 'w-2103', arabic: 'الصَّآخَّةُ', transliteration: 'As-Saakhkhatu', makhraj: 'Compulsory Madd followed by Shaddah (6 counts)', phoneticTarget: 'as-saakhkhatu', level: 'advanced', colorCategory: 'red', tajweedRule: 'Madd Lazim (6 counts)' }
    ]
  },

  // LESSON 22: Rules of Waqf (Quranic Stopping Signs)
  {
    id: 'lesson-22',
    lessonNumber: 22,
    title: 'Rules of Waqf (Stopping Signs in the Holy Quran)',
    arabicTitle: 'عَلَامَاتُ الْوَقْفِ فِي الْمُصْحَفِ الشَّرِيف',
    description: 'Learn the primary stopping symbols in the Quran (م, ط, ج, ز, ص, قف, لا) and how to convert last vowels into Sukoon when pausing.',
    rulesSummary: [
      'Stop by silencing the last vowel into a Sukoon.',
      'Ta Marbutah (ة) becomes a soft Haa (هْ) upon stopping.',
      'Double Fathah (ـً) becomes an Alif (2 counts Madd).',
      'Symbols: م (Compulsory stop), ط (Absolute stop), ج (Permissible stop), لا (Do not stop).'
    ],
    passingScore: 85,
    words: [
      { id: 'w-2201', arabic: 'عَلِيمٌ ۗ', transliteration: '‘Aleem (Stop with Sukoon)', makhraj: 'Tanween converted to Sukoon + Madd Aaridh', phoneticTarget: 'aleem', level: 'intermediate', colorCategory: 'blue', tajweedRule: 'Waqf: Silent last vowel' },
      { id: 'w-2202', arabic: 'رَحْمَةً ۚ', transliteration: 'Rahmah (Stop as Haa)', makhraj: 'Ta Marbutah converted into Haa upon stopping', phoneticTarget: 'rahmah', level: 'intermediate', colorCategory: 'blue', tajweedRule: 'Waqf: Ta Marbutah -> Haa' },
      { id: 'w-2203', arabic: 'شُكُورًا ۙ', transliteration: 'Shukooraa (Stop with Alif)', makhraj: 'Two Zabars become 2 counts Alif Madd upon pause', phoneticTarget: 'shukooraa', level: 'intermediate', colorCategory: 'red', tajweedRule: 'Waqf Iwadh (2 counts)' }
    ]
  }
];
