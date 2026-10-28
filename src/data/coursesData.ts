import { Course, SubscriptionTier } from '../types';

export const COURSES_DATA: Course[] = [
  {
    id: 'course-madani-qaida',
    title: 'Complete Madani Qaida Foundation',
    arabicTitle: 'القَاعِدَة المَدَنِيَّة الشَّامِلَة',
    tagline: 'From Arabic Alphabet to Flawless Quran Word Formation',
    description: 'Designed specifically for international beginners and kids. Master the exact Makharij (points of articulation), Arabic letter joins, short vowels, Tanween, Sukoon, and Qalqalah with interactive AI speech verification.',
    level: 'Beginner',
    duration: '6 Weeks (Self-paced or 1-on-1)',
    totalLessons: 24,
    featured: true,
    instructorName: 'Qari Muhammad Bilal Al-Azhari',
    instructorTitle: 'Senior Tajweed Scholar, Al-Azhar Certified',
    prices: {
      USD: 29,
      GBP: 24,
      EUR: 27,
      CAD: 39,
      AUD: 44
    },
    syllabus: [
      {
        title: 'Module 1: The 29 Makharij & Articulation',
        topics: ['Throat letters (Halqiyyah)', 'Tongue & Palate letters', 'Lip & Dental mechanics', 'Mouth hollow vowels']
      },
      {
        title: 'Module 2: Connected Arabic Script & Harakat',
        topics: ['Compound shapes (Murakkabat)', 'Fatha, Kasrah, Dammah precision', 'Avoiding vowel stretching mistakes', 'Vowel speed drills']
      },
      {
        title: 'Module 3: Tanween, Sukoon & Qalqalah',
        topics: ['Hidden Noon sounds (Tanween)', 'Sukoon resting dynamics', 'The 5 Qalqalah bouncing letters', 'Tashdeed doubling and Ghunnah']
      },
      {
        title: 'Module 4: Reading Verification & First Surahs',
        topics: ['Prolongation (Madd Asli)', 'Noon Sakinah rules', 'Recitation of Surah Al-Fatihah & Ikhlas', 'Passing certification assessment']
      }
    ],
    features: [
      'Interactive Voice Recognition & Pronunciation Assessment',
      'Real-time Makhraj feedback & score threshold unlocking',
      'High-definition native teacher audio playback',
      'Progress tracking dashboard & certificate on graduation',
      'Flexible time slots for international students'
    ]
  },
  {
    id: 'course-tajweed-rules',
    title: 'Quran Reading with Practical Tajweed',
    arabicTitle: 'تِلَاوَةُ القُرْآنِ بِأَحْكَامِ التَّجْوِيد',
    tagline: 'Transform your recitation into melodious, compliant Tarteel',
    description: 'Learn and apply all major Tajweed rules directly while reciting the Holy Quran. Master Noon Sakinah, Meem Sakinah, heavy vs light letters (Tafkheem & Tarqeeq), Madd prolongations, and stopping signs (Waqf).',
    level: 'Intermediate',
    duration: '10 Weeks',
    totalLessons: 36,
    featured: true,
    instructorName: 'Ustadh Tariq Hashimi',
    instructorTitle: 'Hafiz & Ijazah Holder in Hafs \'an \'Asim',
    prices: {
      USD: 49,
      GBP: 39,
      EUR: 45,
      CAD: 67,
      AUD: 75
    },
    syllabus: [
      {
        title: 'Module 1: Advanced Sifaat (Letter Characteristics)',
        topics: ['Hams vs Jahr', 'Shiddah, Rakhawah, Tawassut', 'Istila\'a & Itbaaq (Thick resonance)', 'Safeer, Leen, Inhiraf, Takreer']
      },
      {
        title: 'Module 2: The Four Rules of Noon Sakinah & Tanween',
        topics: ['Izhar Halqi with zero drag', 'Idgham with & without Ghunnah', 'Iqlab conversion mechanics', 'Ikhfa Haqiqi with 15 letters']
      },
      {
        title: 'Module 3: Rules of Meem Sakinah & Madd Categories',
        topics: ['Ikhfa Shafawi & Idgham Mithlayn', 'Madd Muttasil (Connected)', 'Madd Munfasil (Detached)', 'Madd Laazim (Compulsory 6 counts)']
      },
      {
        title: 'Module 4: Practical Mushaf Application',
        topics: ['Reciting Juz Amma with Tajweed notation', 'Rules of Waqf (Pausing symbols)', 'Vocal pitch and breath control', 'AI recitation evaluation']
      }
    ],
    features: [
      'Live recitation feedback with audio waveform analysis',
      'Color-coded Tajweed Mushaf integration',
      'Weekly 1-on-1 international instructor review',
      'Personalized Tajweed mistake audit sheet',
      'Graduation Ijazah preparation pathway'
    ]
  },
  {
    id: 'course-tarteel-fluent',
    title: 'Tarteel & Melodious Quran Recitation',
    arabicTitle: 'التَّرْتِيلُ وَالمَقَامَاتُ القُرْآنِيَّة',
    tagline: 'Recite with heart-touching beauty and profound contemplation',
    description: 'Designed for adults and youths who can read Arabic and wish to elevate their recitation into moving, rhythmic, and soulful Tarteel. Learn vocal modulation, Maqamat awareness, and deep Quranic reverence.',
    level: 'Advanced',
    duration: '8 Weeks',
    totalLessons: 24,
    instructorName: 'Sheikh Zaid Al-Mansoor',
    instructorTitle: 'Imam & International Qira\'at Judge',
    prices: {
      USD: 69,
      GBP: 55,
      EUR: 63,
      CAD: 95,
      AUD: 105
    },
    syllabus: [
      {
        title: 'Module 1: The Art of Tarteel & Rhythm',
        topics: ['Sunnah of reciting slowly (Tartil)', 'Diaphragmatic breathing techniques', 'Vocal resonance and warm-up drills']
      },
      {
        title: 'Module 2: Natural Quranic Melodic Patterns',
        topics: ['Bayati introduction (Warm & humble)', 'Hijaz introduction (Soulful longing)', 'Nahawand introduction (Gentle contemplative)']
      },
      {
        title: 'Module 3: Meaning-Driven Recitation',
        topics: ['Modulating tone on verses of mercy vs warning', 'Seamless stopping and resuming (Ibtida)', 'Overcoming vocal fatigue']
      }
    ],
    features: [
      'Professional audio recording studio module',
      'Comparison player: compare your tone with world renowned Qaris',
      '1-on-1 vocal coaching sessions',
      'Downloadable backing practice tracks'
    ]
  },
  {
    id: 'course-hifz-memorization',
    title: 'Quran Hifz (Memorization) Program',
    arabicTitle: 'بَرْنَامَجُ حِفْظِ القُرْآنِ الكَرِيم',
    tagline: 'A systematic, supportive journey to memorizing the Holy Quran',
    description: 'Customized memorization schedules tailored for international busy professionals, university students, and homeschooling children. Combines modern spaced-repetition tracking with classical Muraja\'ah revision circles.',
    level: 'All Levels',
    duration: 'Ongoing Monthly / Annual',
    totalLessons: 120,
    instructorName: 'Ustadha Maryam Siddiqui & Qari Bilal',
    instructorTitle: 'Hafizah & Lead Hifz Director',
    prices: {
      USD: 89,
      GBP: 72,
      EUR: 82,
      CAD: 120,
      AUD: 135
    },
    syllabus: [
      {
        title: 'Sabaq (New Lesson Protocol)',
        topics: ['Error-free reading before memorizing', 'Verse-by-verse audio loop method', 'Visual memory mapping']
      },
      {
        title: 'Sabqi (Recent Lessons Revision)',
        topics: ['Connecting the last 5 pages daily', 'Mutashabihat (Similar verses) detection']
      },
      {
        title: 'Manzil (Comprehensive Revision)',
        topics: ['Daily Juz cycle system', 'Retention exam and weak spots diagnostics']
      }
    ],
    features: [
      'Daily 1-on-1 teacher listening session',
      'Spaced repetition memory dashboard',
      'Monthly parent / student progress report',
      'Official Hifz completion certificate'
    ]
  },
  {
    id: 'course-islamic-studies',
    title: 'Essential Islamic Studies & Daily Fiqh',
    arabicTitle: 'الدِّرَاسَاتُ الإِسْلَامِيَّةُ وَالفِقْهُ اليَوْمِي',
    tagline: 'Practical faith, morals, and worship for the modern world',
    description: 'Comprehensive foundation covering Islamic Creed (Aqeedah), purification (Taharah), perfect prayer (Salah), fasting, halal finance, Islamic manners (Akhlaq), and prophetic character (Seerah).',
    level: 'All Levels',
    duration: '8 Weeks',
    totalLessons: 20,
    instructorName: 'Dr. Hamza Rahman',
    instructorTitle: 'Islamic Jurisprudence Lecturer & Author',
    prices: {
      USD: 39,
      GBP: 32,
      EUR: 36,
      CAD: 54,
      AUD: 60
    },
    syllabus: [
      {
        title: 'Module 1: Aqeedah & Pillars of Iman',
        topics: ['Tawheed and Allah\'s Beautiful Names', 'Angels, Divine Books, and Messengers', 'Day of Judgment & Qadar']
      },
      {
        title: 'Module 2: Practical Fiqh of Worship',
        topics: ['Wudu, Ghusl, and Tayammum mistakes', 'Conditions, pillars, and invalidators of Salah', 'Zakah calculation & Ramadan rulings']
      },
      {
        title: 'Module 3: Daily Adab & Seerah Lessons',
        topics: ['Prophetic manners with family and neighbors', 'Dua etiquette & spiritual remedies', 'Halal lifestyle in the West']
      }
    ],
    features: [
      'Interactive quizzes & visual guides',
      'Direct Q&A with Islamic scholars',
      'Downloadable PDF study guides and workbooks',
      'Certificate of Islamic Literacy'
    ]
  }
];

export type { SubscriptionTier } from '../types';

export const SUBSCRIPTION_TIERS: SubscriptionTier[] = [
  {
    id: 'monthly',
    name: 'Monthly Pass',
    tagline: 'Flexible month-to-month Quran learning',
    prices: {
      USD: 35,
      GBP: 28,
      EUR: 32,
      CAD: 48,
      AUD: 54
    },
    period: 'per month',
    features: [
      'Unlimited access to interactive Madani Qaida',
      'AI Voice Recognition & instant pronunciation grading',
      '2 One-on-one live tutor classes per month',
      'Full access to Islamic Resources & Salah Guides',
      'Cancel anytime with zero penalty'
    ]
  },
  {
    id: 'quarterly',
    name: 'Quarterly Growth',
    badge: 'Most Popular',
    tagline: 'Ideal commitment to master reading & Tajweed',
    prices: {
      USD: 89,
      GBP: 72,
      EUR: 82,
      CAD: 122,
      AUD: 138
    },
    period: 'every 3 months (Save 15%)',
    features: [
      'Everything in Monthly Pass',
      '8 One-on-one live tutor classes per quarter',
      'Access to All Paid Quran & Tajweed Courses',
      'Priority international time zone slot reservation',
      'Dedicated teacher audio review on student recordings',
      'Official verified graduation certificate'
    ]
  },
  {
    id: 'annual',
    name: 'Annual Mastery',
    badge: 'Best Value',
    tagline: 'Complete transformation for families & individuals',
    prices: {
      USD: 280,
      GBP: 225,
      EUR: 259,
      CAD: 380,
      AUD: 430
    },
    period: 'per year (Save 33%)',
    features: [
      'Full family access (up to 3 student accounts)',
      'Unlimited Madani Qaida, Tajweed & Hifz systems',
      '36 One-on-one live certified tutor sessions',
      'Personalized curriculum tailored to student pace',
      'Direct WhatsApp instructor support channel',
      'Physical completion pack & framed certificate mailed internationally'
    ]
  }
];
