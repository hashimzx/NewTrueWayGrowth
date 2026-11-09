export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LevelQuiz {
  level: 1 | 2 | 3 | 4;
  levelName: string;
  title: string;
  description: string;
  passingScore: number; // percentage, e.g. 70
  certificateTitle: string;
  questions: QuizQuestion[];
}

export const LEVEL_QUIZZES: LevelQuiz[] = [
  {
    level: 1,
    levelName: 'Level 1: Beginner Foundation',
    title: 'Madani Qaida, Basic Duas, Six Kalimas & Wudu',
    description: 'Test your knowledge of the Arabic alphabet basics, Wudu steps, and the foundational Six Kalimas.',
    passingScore: 70,
    certificateTitle: 'Certificate of Islamic Foundations (Level 1)',
    questions: [
      {
        id: 'q1-1',
        question: 'What is the First Kalima and what does it declare?',
        options: [
          'Kalima Shahadat: Bearing witness to angels',
          'Kalima Tayyibah: Declaration of Tawheed and Messengerhood of Muhammad ﷺ',
          'Kalima Astaghfar: Seeking forgiveness for sins',
          'Kalima Tamjeed: Praising the creation'
        ],
        correctIndex: 1,
        explanation: 'The First Kalima (Tayyibah) is "La ilaha illallahu Muhammadur-Rasoolullah", declaring Allah\'s Oneness and Prophet Muhammad\'s messengerhood.'
      },
      {
        id: 'q1-2',
        question: 'Which of the following acts is OBLIGATORY (Fard) during Wudu?',
        options: [
          'Using a Miswak (toothstick)',
          'Washing the face completely from hairline to chin and ear to ear',
          'Washing the hands up to wrists 3 times at the start',
          'Putting water into nostrils'
        ],
        correctIndex: 1,
        explanation: 'Washing the entire face once is one of the four obligatory (Fard) acts of Wudu commanded in the Quran (Surah Al-Ma\'idah 5:6).'
      },
      {
        id: 'q1-3',
        question: 'What do you say upon waking up in the morning according to Sunnah?',
        options: [
          'Bismika Allahumma amootu wa ahya',
          'Al-hamdu lillahil-ladhi ahyana ba\'da ma amatana wa ilayhin-nushoor',
          'Subhanallahi wa bihamdih',
          'Astaghfirullaha Rabbi min kulli dhanb'
        ],
        correctIndex: 1,
        explanation: 'The Sunnah Dua upon waking is "Al-hamdu lillahil-ladhi ahyana ba\'da ma amatana wa ilayhin-nushoor" (Praise be to Allah Who brought us back to life).'
      },
      {
        id: 'q1-4',
        question: 'How many Kalimas of Islam are taught in foundational Islamic learning?',
        options: ['3 Kalimas', '5 Kalimas', '6 Kalimas', '10 Kalimas'],
        correctIndex: 2,
        explanation: 'There are Six Kalimas: Tayyibah, Shahadat, Tamjeed, Tauheed, Astaghfar, and Radd-e-Kufr.'
      },
      {
        id: 'q1-5',
        question: 'What does the word "Tawheed" mean?',
        options: [
          'Performing fasting during Ramadan',
          'Belief in the absolute Oneness and Uniqueness of Allah alone',
          'Reciting the Quran with melody',
          'Traveling to Makkah for pilgrimage'
        ],
        correctIndex: 1,
        explanation: 'Tawheed is the fundamental monotheistic concept that Allah is One, without partners, children, or equal.'
      }
    ]
  },
  {
    level: 2,
    levelName: 'Level 2: Basic Islamic Education',
    title: 'Complete Namaz, Five Pillars & Six Articles of Faith',
    description: 'Assess your understanding of daily prayer rakats, postures, pillars of Islam, and articles of faith.',
    passingScore: 70,
    certificateTitle: 'Certificate of Basic Islamic Education (Level 2)',
    questions: [
      {
        id: 'q2-1',
        question: 'How many total Rakats are in the obligatory (Fard) prayer of Maghrib?',
        options: ['2 Rakats', '3 Rakats', '4 Rakats', '5 Rakats'],
        correctIndex: 1,
        explanation: 'Maghrib consists of 3 Fard Rakats, followed by 2 Sunnah Mu\'akkadah.'
      },
      {
        id: 'q2-2',
        question: 'What is the correct recitation in Ruku (bowing posture) of Salah?',
        options: [
          'Subhana Rabbiyal-A\'la',
          'Subhana Rabbiyal-\'Adheem',
          'Rabbana lakal-hamd',
          'Allahu Akbar wa lillahil-hamd'
        ],
        correctIndex: 1,
        explanation: 'In Ruku, we recite "Subhana Rabbiyal-\'Adheem" (Glory be to my Lord, the Magnificent) at least three times.'
      },
      {
        id: 'q2-3',
        question: 'What percentage of qualifying surplus wealth is paid as Zakat annually?',
        options: ['1.5%', '2.5%', '5%', '10%'],
        correctIndex: 1,
        explanation: 'Zakat is 2.5% (one fortieth) of wealth held above the Nisab threshold for a full lunar year.'
      },
      {
        id: 'q2-4',
        question: 'Which of the following is NOT one of the Six Articles of Faith (Iman)?',
        options: [
          'Belief in Angels',
          'Belief in the Holy Books',
          'Belief in paying Zakat',
          'Belief in Divine Decree (Qadr)'
        ],
        correctIndex: 2,
        explanation: 'Paying Zakat is one of the Five Pillars of Islam (action/practice), while belief in Qadr, Books, and Angels are Articles of Faith (creed).'
      },
      {
        id: 'q2-5',
        question: 'What is the distinguishing physical characteristic of Namaz-e-Janazah (Funeral Prayer)?',
        options: [
          'It has 2 Rakats with long Sujood',
          'It has 4 Takbeers while standing (Qiyam), with NO Ruku and NO Sujood',
          'It is prayed in total silence without Takbeer',
          'It must be prayed sitting on the floor'
        ],
        correctIndex: 1,
        explanation: 'Namaz-e-Janazah consists exclusively of standing (Qiyam) and 4 Takbeers; there is no bowing (Ruku) and no prostration (Sujood).'
      }
    ]
  },
  {
    level: 3,
    levelName: 'Level 3: Quran Understanding',
    title: 'Quranic Sciences, Word Meanings & Surah Al-Fatihah Tafsir',
    description: 'Demonstrate comprehension of the Holy Quran structure, vocabulary, revelation, and verse meanings.',
    passingScore: 70,
    certificateTitle: 'Certificate of Quran Understanding (Level 3)',
    questions: [
      {
        id: 'q3-1',
        question: 'How many total Surahs are there in the Holy Quran?',
        options: ['112 Surahs', '114 Surahs', '30 Surahs', '60 Surahs'],
        correctIndex: 1,
        explanation: 'The Holy Quran contains 114 Surahs, arranged across 30 Juz (Paras).'
      },
      {
        id: 'q3-2',
        question: 'What does the word "Al-Fatihah" mean in English?',
        options: [
          'The Cow',
          'The Opening / The Key',
          'The Light',
          'The Daybreak'
        ],
        correctIndex: 1,
        explanation: 'Surah Al-Fatihah means "The Opening", serving as the opening chapter of the Quran and recited in every Rakat of prayer.'
      },
      {
        id: 'q3-3',
        question: 'Which verse in the Quran is famously known as "Ayat al-Kursi"?',
        options: [
          'Surah Al-Baqarah (2:255)',
          'Surah Ali \'Imran (3:18)',
          'Surah Al-Ikhlas (112:1)',
          'Surah An-Nur (24:35)'
        ],
        correctIndex: 0,
        explanation: 'Ayat al-Kursi (The Throne Verse) is verse 255 of Surah Al-Baqarah, the greatest verse in the Quran.'
      },
      {
        id: 'q3-4',
        question: 'What is the difference between Makki and Madani Surahs?',
        options: [
          'Makki surahs were revealed in Arabic; Madani were revealed in Hebrew',
          'Makki surahs were revealed before the Hijrah to Madinah; Madani surahs were revealed after the Hijrah',
          'Makki surahs are longer than Madani surahs',
          'Makki surahs are only for children'
        ],
        correctIndex: 1,
        explanation: 'By standard scholarly consensus, Makki Surahs are those revealed prior to the Prophet\'s migration (Hijrah) to Madinah, while Madani Surahs were revealed after the migration.'
      },
      {
        id: 'q3-5',
        question: 'In the phrase "Iyyaka na\'budu wa iyyaka nasta\'een", what is the English meaning?',
        options: [
          'All praise is for Allah, Lord of the worlds',
          'Guide us to the Straight Path',
          'You alone we worship, and from You alone we ask for help',
          'Master of the Day of Judgment'
        ],
        correctIndex: 2,
        explanation: 'Ayah 5 of Surah Al-Fatihah means: "You alone we worship, and from You alone we ask for help".'
      }
    ]
  },
  {
    level: 4,
    levelName: 'Level 4: Advanced Islamic Learning',
    title: 'Hadith Sciences, Seerah, Hajj & Advanced Islamic History',
    description: 'Challenge your knowledge of Hadith literature, Seerah of Prophet Muhammad ﷺ, Hajj rituals, and Islamic ethics.',
    passingScore: 70,
    certificateTitle: 'Master Certificate of Islamic Studies (Level 4)',
    questions: [
      {
        id: 'q4-1',
        question: 'Which companion narrated Hadith 1 of Forty Nawawi: "Actions are judged by intentions"?',
        options: [
          'Abu Bakr as-Siddiq (RA)',
          'Umar ibn al-Khattab (RA)',
          'Uthman ibn Affan (RA)',
          'Ali ibn Abi Talib (RA)'
        ],
        correctIndex: 1,
        explanation: 'Amir al-Mu\'mineen Sayyidina Umar ibn al-Khattab (RA) narrated this foundational Hadith on sincerity of intentions.'
      },
      {
        id: 'q4-2',
        question: 'What is the single most important day and ritual of Hajj, without which Hajj is invalid?',
        options: [
          'Staying in Mina on the 8th of Dhul Hijjah',
          'Standing on the Plain of Arafat on the 9th of Dhul Hijjah',
          'Shopping in Makkah',
          'Visiting Madinah prior to Hajj'
        ],
        correctIndex: 1,
        explanation: 'The Prophet ﷺ stated clearly: "Al-Hajju \'Arafah" (Hajj is Arafah). Standing in prayer at Arafat on the 9th of Dhul Hijjah is the essential pillar of Hajj.'
      },
      {
        id: 'q4-3',
        question: 'In what year did the Prophet Muhammad ﷺ make the historic Hijrah from Makkah to Madinah?',
        options: ['610 CE', '622 CE', '632 CE', '615 CE'],
        correctIndex: 1,
        explanation: 'The Hijrah took place in 622 CE, which marks Year 1 of the Islamic lunar calendar (Hijri calendar).'
      },
      {
        id: 'q4-4',
        question: 'What is the night in the last ten days of Ramadan that is described as "better than a thousand months"?',
        options: ['Laylatul Isra', 'Laylatul Qadr (Night of Decree)', 'Laylatun-Nisf min Sha\'ban', 'Yawm al-Jumu\'ah'],
        correctIndex: 1,
        explanation: 'Laylatul Qadr (The Night of Power and Decree) is honored in Surah Al-Qadr as superior to 1,000 months of worship.'
      },
      {
        id: 'q4-5',
        question: 'According to Sahih al-Bukhari, what did the Prophet ﷺ describe as "smiling at your brother"?',
        options: ['An obligation like Wudu', 'An act of charity (Sadaqah)', 'A requirement before eating', 'A sign of weakness'],
        correctIndex: 1,
        explanation: 'Prophet Muhammad ﷺ taught: "Your smiling in the face of your brother is charity for you" (Sunan at-Tirmidhi).'
      }
    ]
  }
];
