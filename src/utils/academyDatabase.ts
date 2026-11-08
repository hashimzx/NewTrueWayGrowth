import {
  AcademyUser,
  QuranCourseItem,
  ClassScheduleItem,
  DailyLessonLog,
  StudentAttendanceLog,
  TrialBookingRequest,
  AcademyInvoice,
  AcademyAnnouncement,
  AcademyTeacher
} from '../types/academy';

export const DEFAULT_QURAN_COURSES: QuranCourseItem[] = [
  {
    id: 'course-madani-qaida',
    title: 'Madani Qaida Course',
    arabicTitle: 'القَاعِدَة المَدَنِيَّة لِلْمُبْتَدِئِين',
    tagline: 'Learn Arabic letters, pronunciation, joining letters and basic reading',
    description: 'The essential foundational course for children and complete beginners. Master Arabic alphabet recognition, correct Makharij (points of articulation), joining letters, Harakat (Fatha, Kasrah, Dammah), Tanween, Sukoon, and Qalqalah to recite the Holy Quran smoothly.',
    level: 'Beginner',
    duration: '6 to 8 Weeks',
    totalLessons: 28,
    ageGroup: 'Kids (4+) & Adult Beginners',
    featured: true,
    instructorName: 'Qari Muhammad Bilal Al-Azhari',
    instructorTitle: 'Senior Tajweed Scholar, Al-Azhar Certified',
    prices: { USD: 39, GBP: 32, EUR: 36, CAD: 52, AUD: 58 },
    keyBenefits: [
      'Master the 29 Arabic letters with exact physical throat, tongue, and lip articulation',
      'Step-by-step guidance connecting single letters into compound words (Murakkabat)',
      'Eliminate common pronunciation mistakes with live teacher feedback',
      'Interactive visual drills and built-in digital Madani Qaida exercises'
    ],
    syllabus: [
      { title: 'Lesson 1-4: Individual Letters & Articulation', topics: ['Throat letters (Halqiyyah)', 'Tongue & Palate letters', 'Lip & Dental mechanics'] },
      { title: 'Lesson 5-9: Compound Letters & Short Vowels', topics: ['Connecting letter shapes (Murakkabat)', 'Fatha, Kasrah, Dammah drills', 'Avoiding vowel stretching'] },
      { title: 'Lesson 10-15: Tanween, Sukoon & Qalqalah', topics: ['Hidden Noon sounds (Tanween)', 'Sukoon resting dynamics', '5 Qalqalah bouncing letters'] },
      { title: 'Lesson 16-22: Tashdeed & Madd Rules', topics: ['Doubled letters with Ghunnah', 'Madd Asli elongation (2 counts)', 'Reading complete Quranic words'] }
    ]
  },
  {
    id: 'course-quran-tajweed',
    title: 'Quran with Tajweed',
    arabicTitle: 'تِلَاوَةُ القُرْآنِ بِأَحْكَامِ التَّجْوِيد',
    tagline: 'Learn correct Quran recitation and pronunciation rules',
    description: 'Transform your recitation into melodious, beautiful, and rule-compliant Tarteel. Learn practical Tajweed rules directly while reciting the Holy Quran, including Noon Sakinah, Meem Sakinah, heavy vs light letters (Tafkheem/Tarqeeq), and Waqf stopping signs.',
    level: 'Intermediate',
    duration: '12 Weeks',
    totalLessons: 36,
    ageGroup: 'Children (7+) & Adults',
    featured: true,
    instructorName: 'Ustadh Tariq Hashimi',
    instructorTitle: 'Hafiz & Ijazah Holder in Hafs \'an \'Asim',
    prices: { USD: 49, GBP: 39, EUR: 45, CAD: 67, AUD: 75 },
    keyBenefits: [
      'Apply all 4 rules of Noon Sakinah & Tanween (Izhar, Idgham, Iqlab, Ikhfa)',
      'Master Meem Sakinah and rules of Madd (prolongation up to 6 counts)',
      'Learn proper breath control, vocal melody, and Quranic pausing signs (Waqf)',
      '1-on-1 private recitation correction with verified Hafiz instructors'
    ],
    syllabus: [
      { title: 'Module 1: Sifaat & Letter Characteristics', topics: ['Hams vs Jahr', 'Shiddah, Rakhawah, Tawassut', 'Istila\'a & Itbaaq (Heavy letters)'] },
      { title: 'Module 2: Noon Sakinah & Tanween', topics: ['Izhar Halqi', 'Idgham with and without Ghunnah', 'Iqlab conversion mechanics', 'Ikhfa with 15 letters'] },
      { title: 'Module 3: Meem Sakinah & Madd Prolongations', topics: ['Ikhfa Shafawi', 'Idgham Mithlayn', 'Madd Muttasil, Munfasil, and Laazim'] },
      { title: 'Module 4: Practical Mushaf Recitation', topics: ['Reciting Juz Amma with Tajweed notation', 'Rules of Waqf (Pausing symbols)', 'Vocal rhythm and Tarteel'] }
    ]
  },
  {
    id: 'course-quran-hifz',
    title: 'Quran Memorization (Hifz)',
    arabicTitle: 'بَرْنَامَجُ حِفْظِ القُرْآنِ الكَرِيم كَامِلاً',
    tagline: 'Structured memorization with revision and progress tracking',
    description: 'A proven, systematic Hifz program tailored for children, teens, and busy adults. Combines the classical three-tier method—Sabaq (new daily lesson), Sabqi (recent lesson revision), and Manzil (cumulative revision)—with digital progress monitoring.',
    level: 'All Ages',
    duration: 'Ongoing Monthly / Full Hifz',
    totalLessons: 150,
    ageGroup: 'Kids (6+), Youths & Adults',
    featured: true,
    instructorName: 'Ustadha Maryam Siddiqui & Qari Bilal',
    instructorTitle: 'Hafizah & Lead Hifz Director',
    prices: { USD: 79, GBP: 65, EUR: 74, CAD: 105, AUD: 118 },
    keyBenefits: [
      'Daily 1-on-1 recitation listening sessions with certified Huffaz',
      'Systematic Sabaq, Sabqi, and Manzil retention protocol',
      'Mutashabihat (similar verses) detection to eliminate memory slips',
      'Monthly parent performance reports and official Hifz graduation certificate'
    ],
    syllabus: [
      { title: 'Sabaq Protocol (New Memorization)', topics: ['Error-free reading before memorizing', 'Verse audio looping technique', 'Visual page mapping'] },
      { title: 'Sabqi Protocol (Recent Revision)', topics: ['Connecting last 5-10 pages daily', 'Cross-Juz linking', 'Strengthening recent lessons'] },
      { title: 'Manzil Protocol (Permanent Review)', topics: ['Daily half-Juz to 1-Juz cycle', 'Permanent long-term memory retention', 'Quarterly comprehensive exams'] }
    ]
  },
  {
    id: 'course-quran-translation',
    title: 'Quran Translation & Tafseer',
    arabicTitle: 'تَرْجَمَةُ القُرْآنِ وَفَهْمُ مَعَانِيهِ',
    tagline: 'Understand Quranic meanings and basic explanations',
    description: 'Connect your heart with the divine message. Learn word-for-word translation, grammatical roots of recurring Quranic vocabulary, contextual background (Asbab al-Nuzul), and practical life reflections from the Holy Quran.',
    level: 'Intermediate',
    duration: '10 Weeks',
    totalLessons: 30,
    ageGroup: 'Youths (12+) & Adults',
    featured: false,
    instructorName: 'Sheikh Zaid Al-Mansoor',
    instructorTitle: 'Islamic Scholar & International Lecturer',
    prices: { USD: 55, GBP: 44, EUR: 49, CAD: 75, AUD: 85 },
    keyBenefits: [
      'Learn the 300 most frequent Quranic words that unlock 70% of the Quran',
      'Understand verse-by-verse translation in clear, contemporary English and Urdu',
      'Historical context and lessons from prophetic stories in the Quran',
      'Practical reflections (Tadabbur) to apply Quranic wisdom in daily life'
    ],
    syllabus: [
      { title: 'Module 1: Quranic Vocabulary Keys', topics: ['Most common roots & particles', 'Pronouns and verb patterns', 'Surah Al-Fatihah word breakdown'] },
      { title: 'Module 2: Short Surahs of Juz Amma', topics: ['Asbab al-Nuzul (Context of revelation)', 'Themes of the Day of Judgment', 'Tadabbur & practical lessons'] },
      { title: 'Module 3: Core Themes of the Quran', topics: ['Tawheed & Prophethood', 'Parables and wisdom stories', 'Quranic supplications and their virtues'] }
    ]
  },
  {
    id: 'course-islamic-studies',
    title: 'Islamic Studies & Daily Duas',
    arabicTitle: 'الدِّرَاسَاتُ الإِسْلَامِيَّةُ وَالأَدْعِيَةُ المَسْنُونَة',
    tagline: 'Learn daily duas, basic Islamic teachings and essential practices',
    description: 'A comprehensive curriculum nurturing young minds and adults in authentic Islamic faith. Covers the exact Sunnah method of Namaz (prayer), Wudu, fasting, Masnoon Duas for morning/evening, 40 Hadith on character, and Islamic manners (Akhlaq).',
    level: 'All Ages',
    duration: '8 Weeks',
    totalLessons: 24,
    ageGroup: 'Kids (5+) & Beginners',
    featured: false,
    instructorName: 'Mentor Abdul Basit Saleem',
    instructorTitle: 'Islamic Educator & Academy Director',
    prices: { USD: 35, GBP: 29, EUR: 32, CAD: 48, AUD: 54 },
    keyBenefits: [
      'Step-by-step practical Namaz (Salah) mastery with Arabic, transliteration, and meaning',
      'Essential daily Masnoon Duas: waking up, sleeping, eating, traveling, entering home/mosque',
      'Prophetic morals, respect for parents, honesty, and kindness in daily life',
      'Interactive quizzes and colorful completion badges for young learners'
    ],
    syllabus: [
      { title: 'Module 1: Taharah & Perfect Salah', topics: ['Wudu method and Sunnah steps', 'Salah movements, Tashahhud, and Durood', 'Janazah, Eid, and Taraweeh basics'] },
      { title: 'Module 2: Essential Masnoon Duas', topics: ['Morning & evening protections', 'Duas for study, food, travel, and health', 'Memorizing with correct pronunciation'] },
      { title: 'Module 3: Seerah & Islamic Akhlaq', topics: ['Life of the Holy Prophet (PBUH)', 'Islamic manners and social etiquette', 'Islamic months and Sunnah virtues'] }
    ]
  }
];

export const DEFAULT_TEACHERS: AcademyTeacher[] = [
  {
    id: 'teacher-bilal',
    name: 'Qari Muhammad Bilal Al-Azhari',
    arabicName: 'القارئ محمد بلال الأزهري',
    title: 'Senior Tajweed & Qira\'at Scholar',
    gender: 'male',
    qualifications: 'Faculty of Usul al-Din, Al-Azhar University Cairo',
    ijazah: 'Sanad in Hafs \'an \'Asim & Shu\'bah with continuous chain to the Prophet (PBUH)',
    experienceYears: 14,
    languages: ['English', 'Urdu', 'Arabic'],
    specialties: ['Madani Qaida', 'Advanced Tajweed', 'Qira\'at Sab\'ah', 'Makharij Correction'],
    photo: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80',
    bio: 'Dedicated to teaching Quranic phonetics with patient, systematic methodology. Over 1,200 international students guided across UK, USA, and Canada.',
    activeStudentsCount: 38,
    rating: 4.95,
    availableTimeSlots: ['04:00 PM - 06:00 PM', '06:00 PM - 08:00 PM', '08:00 PM - 10:00 PM']
  },
  {
    id: 'teacher-maryam',
    name: 'Ustadha Maryam Siddiqui',
    arabicName: 'الأستاذة مريم صديقي',
    title: 'Certified Hafizah & Lead Female Instructor',
    gender: 'female',
    qualifications: 'Darse Nizami (Wifaq-ul-Madaris), Master of Islamic Studies',
    ijazah: 'Full Quran Hifz Ijazah & Tajweed Certification',
    experienceYears: 11,
    languages: ['English', 'Urdu'],
    specialties: ['Female Students', 'Young Children', 'Quran Hifz Program', 'Tajweed Foundation'],
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    bio: 'Specializes in nurturing young female learners and children in a warm, encouraging environment. Experienced in tailored Hifz pacing.',
    activeStudentsCount: 42,
    rating: 4.98,
    availableTimeSlots: ['02:00 PM - 04:00 PM', '04:00 PM - 06:00 PM', '07:00 PM - 09:00 PM']
  },
  {
    id: 'teacher-basit',
    name: 'Mentor Abdul Basit Saleem',
    arabicName: 'الأستاذ عبد الباسط سليم',
    title: 'Director of Education & Teacher Training',
    gender: 'male',
    qualifications: 'Alim Scholar, International Quran Teacher Educator',
    ijazah: 'Ijazah in Tajweed & Hadith Studies',
    experienceYears: 12,
    languages: ['English', 'Urdu', 'Punjabi'],
    specialties: ['Online Quran Teacher Training', 'Kids Islamic Studies', 'Daily Duas', 'Hifz Mentorship'],
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    bio: 'Passionate about modern digital Islamic education, empowering students and Quran teachers globally to achieve excellence.',
    activeStudentsCount: 50,
    rating: 4.97,
    availableTimeSlots: ['03:00 PM - 05:00 PM', '06:00 PM - 08:00 PM', '09:00 PM - 11:00 PM']
  },
  {
    id: 'teacher-zaid',
    name: 'Sheikh Zaid Al-Mansoor',
    arabicName: 'الشيخ زيد المنصور',
    title: 'Imam & Tafseer Scholar',
    gender: 'male',
    qualifications: 'Islamic University of Madinah, Faculty of Shariah',
    ijazah: 'Ijazah in Ten Minor Qira\'at & Tafseer Jalalayn',
    experienceYears: 16,
    languages: ['Arabic', 'English'],
    specialties: ['Quran Translation', 'Tafseer', 'Arabic Grammar', 'Advanced Tarteel'],
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    bio: 'Renowned for making the Quranic Arabic message deeply relatable and transformative for English-speaking youths and professionals.',
    activeStudentsCount: 30,
    rating: 4.96,
    availableTimeSlots: ['05:00 PM - 07:00 PM', '07:00 PM - 09:00 PM']
  }
];

export const DEFAULT_ACADEMY_USERS: AcademyUser[] = [
  {
    id: 'usr-student-1',
    name: 'Hashim Zafar',
    email: 'student@truewayquran.com',
    passwordHash: 'student123',
    role: 'student',
    phone: '+44 7911 123456',
    country: 'United Kingdom',
    timezone: 'Europe/London (GMT)',
    status: 'active',
    emailVerified: true,
    createdAt: '2026-09-10',
    studentAge: 11,
    parentName: 'Zafar Iqbal',
    parentPhone: '+44 7911 123456',
    enrolledCourseIds: ['course-quran-tajweed', 'course-quran-hifz'],
    assignedTeacherId: 'teacher-bilal',
    assignedTeacherName: 'Qari Muhammad Bilal Al-Azhari',
    monthlyFee: 65,
    currency: 'GBP'
  },
  {
    id: 'usr-student-2',
    name: 'Aisha Malik',
    email: 'aisha@example.com',
    passwordHash: 'student123',
    role: 'student',
    phone: '+1 312 555 0192',
    country: 'United States',
    timezone: 'America/Chicago (CST)',
    status: 'active',
    emailVerified: true,
    createdAt: '2026-10-01',
    studentAge: 8,
    parentName: 'Fatima Malik',
    parentPhone: '+1 312 555 0192',
    enrolledCourseIds: ['course-madani-qaida'],
    assignedTeacherId: 'teacher-maryam',
    assignedTeacherName: 'Ustadha Maryam Siddiqui',
    monthlyFee: 49,
    currency: 'USD'
  },
  {
    id: 'usr-instructor-1',
    name: 'Qari Muhammad Bilal Al-Azhari',
    email: 'teacher@truewayquran.com',
    passwordHash: 'teacher123',
    role: 'instructor',
    phone: '+92 300 1234567',
    country: 'Pakistan',
    timezone: 'Asia/Karachi (PKT)',
    status: 'active',
    emailVerified: true,
    createdAt: '2026-01-15',
    qualifications: 'Faculty of Usul al-Din, Al-Azhar University Cairo',
    ijazah: 'Sanad in Hafs \'an \'Asim with continuous Isnad',
    languages: ['English', 'Urdu', 'Arabic'],
    assignedStudentIds: ['usr-student-1', 'usr-student-3'],
    enrolledCourseIds: [],
    monthlyFee: 0,
    currency: 'USD'
  },
  {
    id: 'usr-admin-1',
    name: 'True Way Quran Director',
    email: 'admin@truewayquran.com',
    passwordHash: 'admin123',
    role: 'admin',
    phone: '+92 306 8959085',
    country: 'United Kingdom / Pakistan',
    timezone: 'Europe/London (GMT)',
    status: 'active',
    emailVerified: true,
    createdAt: '2026-01-01',
    enrolledCourseIds: [],
    monthlyFee: 0,
    currency: 'USD'
  }
];

export const DEFAULT_CLASS_SCHEDULES: ClassScheduleItem[] = [
  {
    id: 'sch-101',
    studentId: 'usr-student-1',
    studentName: 'Hashim Zafar',
    teacherId: 'teacher-bilal',
    teacherName: 'Qari Muhammad Bilal Al-Azhari',
    courseId: 'course-quran-tajweed',
    courseTitle: 'Quran with Tajweed',
    dayOfWeek: 'Monday',
    timeSlot: '05:00 PM',
    durationMinutes: 30,
    meetingUrl: 'https://meet.google.com/trueway-quran-live',
    meetingPlatform: 'Google Meet',
    status: 'upcoming'
  },
  {
    id: 'sch-102',
    studentId: 'usr-student-1',
    studentName: 'Hashim Zafar',
    teacherId: 'teacher-bilal',
    teacherName: 'Qari Muhammad Bilal Al-Azhari',
    courseId: 'course-quran-hifz',
    courseTitle: 'Quran Memorization (Hifz)',
    dayOfWeek: 'Wednesday',
    timeSlot: '05:00 PM',
    durationMinutes: 30,
    meetingUrl: 'https://meet.google.com/trueway-quran-live',
    meetingPlatform: 'Google Meet',
    status: 'upcoming'
  },
  {
    id: 'sch-103',
    studentId: 'usr-student-1',
    studentName: 'Hashim Zafar',
    teacherId: 'teacher-bilal',
    teacherName: 'Qari Muhammad Bilal Al-Azhari',
    courseId: 'course-quran-tajweed',
    courseTitle: 'Quran with Tajweed',
    dayOfWeek: 'Friday',
    timeSlot: '05:00 PM',
    durationMinutes: 30,
    meetingUrl: 'https://meet.google.com/trueway-quran-live',
    meetingPlatform: 'Google Meet',
    status: 'upcoming'
  },
  {
    id: 'sch-104',
    studentId: 'usr-student-2',
    studentName: 'Aisha Malik',
    teacherId: 'teacher-maryam',
    teacherName: 'Ustadha Maryam Siddiqui',
    courseId: 'course-madani-qaida',
    courseTitle: 'Madani Qaida Course',
    dayOfWeek: 'Tuesday',
    timeSlot: '04:30 PM',
    durationMinutes: 30,
    meetingUrl: 'https://meet.google.com/trueway-qaida-live',
    meetingPlatform: 'Google Meet',
    status: 'upcoming'
  }
];

export const DEFAULT_DAILY_LESSONS: DailyLessonLog[] = [
  {
    id: 'les-201',
    studentId: 'usr-student-1',
    studentName: 'Hashim Zafar',
    teacherId: 'teacher-bilal',
    teacherName: 'Qari Muhammad Bilal Al-Azhari',
    courseId: 'course-quran-hifz',
    date: '2026-11-06',
    sabaqTitle: 'Surah Al-Mulk: Verses 1 to 8',
    sabaqStatus: 'passed',
    sabqiRevision: 'Surah Al-Jumu\'ah (Complete Surah)',
    manzilRevision: 'Juz 29: Surah Al-Qalam to Al-Haqqah',
    tajweedScore: 92,
    makharijScore: 95,
    fluencyScore: 88,
    homework: 'Revise Surah Al-Mulk Verses 1-8 five times from memory before tomorrow\'s class.',
    teacherFeedback: 'Masha\'Allah excellent retention! Remember to give full 2 counts to the Madd Asli in verse 3 and do not rush Qalqalah on Qaf.',
    parentNotes: 'Practiced with father after Maghrib prayer.'
  },
  {
    id: 'les-202',
    studentId: 'usr-student-1',
    studentName: 'Hashim Zafar',
    teacherId: 'teacher-bilal',
    teacherName: 'Qari Muhammad Bilal Al-Azhari',
    courseId: 'course-quran-hifz',
    date: '2026-11-04',
    sabaqTitle: 'Surah Al-Munafiqun: Verses 7 to 11',
    sabaqStatus: 'passed',
    sabqiRevision: 'Surah Al-Munafiqun (Verses 1-6)',
    manzilRevision: 'Juz 28: Surah At-Tahrim & At-Talaq',
    tajweedScore: 90,
    makharijScore: 92,
    fluencyScore: 89,
    homework: 'Connect the whole Surah Al-Munafiqun smoothly without pausing between verses.',
    teacherFeedback: 'Very good recitation. The Ghunnah on Noon Mushaddad was beautifully executed.'
  }
];

export const DEFAULT_ATTENDANCE_LOGS: StudentAttendanceLog[] = [
  {
    id: 'att-301',
    studentId: 'usr-student-1',
    studentName: 'Hashim Zafar',
    courseId: 'course-quran-tajweed',
    courseTitle: 'Quran with Tajweed',
    teacherName: 'Qari Muhammad Bilal Al-Azhari',
    date: '2026-11-06',
    time: '05:00 PM',
    status: 'present',
    sessionTopic: 'Rules of Noon Sakinah & Ikhfa in Surah Al-Mulk',
    durationMinutes: 30,
    notes: 'Prompt arrival; recited with strong focus and confidence.'
  },
  {
    id: 'att-302',
    studentId: 'usr-student-1',
    studentName: 'Hashim Zafar',
    courseId: 'course-quran-hifz',
    courseTitle: 'Quran Memorization (Hifz)',
    teacherName: 'Qari Muhammad Bilal Al-Azhari',
    date: '2026-11-04',
    time: '05:00 PM',
    status: 'present',
    sessionTopic: 'Sabaq listening: Surah Al-Munafiqun',
    durationMinutes: 30,
    notes: 'Flawless recall with zero stumbling.'
  },
  {
    id: 'att-303',
    studentId: 'usr-student-1',
    studentName: 'Hashim Zafar',
    courseId: 'course-quran-tajweed',
    courseTitle: 'Quran with Tajweed',
    teacherName: 'Qari Muhammad Bilal Al-Azhari',
    date: '2026-11-01',
    time: '05:00 PM',
    status: 'present',
    sessionTopic: 'Tafkheem & Tarqeeq in letter Ra (ر)',
    durationMinutes: 30,
    notes: 'Understood when Ra is heavy vs light.'
  }
];

export const DEFAULT_TRIAL_BOOKINGS: TrialBookingRequest[] = [
  {
    id: 'trial-401',
    studentName: 'Zayd Miller',
    studentAge: 9,
    parentName: 'Sarah Miller',
    parentEmail: 'sarah.miller@example.co.uk',
    parentPhone: '+44 7890 234567',
    courseId: 'course-madani-qaida',
    courseTitle: 'Madani Qaida Course',
    preferredTeacherGender: 'any',
    preferredDays: ['Monday', 'Wednesday', 'Friday'],
    preferredTimeSlot: '05:30 PM',
    timezone: 'Europe/London (GMT)',
    notes: 'Complete beginner. We want him to learn basic Arabic alphabet and correct Quran reading.',
    status: 'new',
    createdAt: '2026-11-07 14:20'
  },
  {
    id: 'trial-402',
    studentName: 'Maryam Al-Sharif',
    studentAge: 12,
    parentName: 'Tariq Al-Sharif',
    parentEmail: 'tariq@alsharif.com',
    parentPhone: '+1 312 889 0112',
    courseId: 'course-quran-hifz',
    courseTitle: 'Quran Memorization (Hifz)',
    preferredTeacherGender: 'female',
    preferredDays: ['Tuesday', 'Thursday', 'Saturday'],
    preferredTimeSlot: '06:00 PM',
    timezone: 'America/Chicago (CST)',
    notes: 'Has already memorized Juz 30. Wants a female teacher to continue Juz 29.',
    status: 'scheduled',
    createdAt: '2026-11-05 09:15'
  },
  {
    id: 'trial-403',
    studentName: 'Hamza Khan',
    studentAge: 15,
    parentName: 'Dr. Imran Khan',
    parentEmail: 'dr.khan@healthcare.ca',
    parentPhone: '+1 416 555 7788',
    courseId: 'course-quran-tajweed',
    courseTitle: 'Quran with Tajweed',
    preferredTeacherGender: 'male',
    preferredDays: ['Saturday', 'Sunday'],
    preferredTimeSlot: '11:00 AM',
    timezone: 'America/Toronto (EST)',
    notes: 'Can read Arabic fluently but needs Tajweed correction and beautiful Tarteel recitation.',
    status: 'enrolled',
    createdAt: '2026-11-02 18:30'
  }
];

export const DEFAULT_INVOICES: AcademyInvoice[] = [
  {
    id: 'inv-501',
    invoiceNumber: 'TWQ-2026-0089',
    studentId: 'usr-student-1',
    studentName: 'Hashim Zafar',
    date: '2026-11-01',
    courseTitle: 'Quran with Tajweed & Hifz (Monthly Retainer)',
    amount: 65,
    currency: 'GBP',
    status: 'paid',
    billingPeriod: 'November 2026'
  },
  {
    id: 'inv-502',
    invoiceNumber: 'TWQ-2026-0043',
    studentId: 'usr-student-1',
    studentName: 'Hashim Zafar',
    date: '2026-10-01',
    courseTitle: 'Quran with Tajweed & Hifz (Monthly Retainer)',
    amount: 65,
    currency: 'GBP',
    status: 'paid',
    billingPeriod: 'October 2026'
  }
];

export const DEFAULT_ANNOUNCEMENTS: AcademyAnnouncement[] = [
  {
    id: 'ann-601',
    title: 'Upcoming Monthly Tajweed & Hifz Evaluation',
    message: 'All students are reminded of the monthly progress evaluation during the upcoming weekend. Instructors will assess Makharij fluency and Sabaq retention.',
    targetRole: 'all',
    date: '2026-11-05',
    senderName: 'Academy Administration'
  },
  {
    id: 'ann-602',
    title: 'Free Interactive Holy Quran Reader & Audio Added',
    message: 'Students and parents can now access the full 114 Surah Quran Reader with multi-reciter audio, pause/resume, and last-read page memory directly from the student dashboard.',
    targetRole: 'students',
    date: '2026-10-28',
    senderName: 'Director Abdul Basit Saleem'
  }
];

// LocalStorage Persistence Keys
const USERS_STORAGE_KEY = 'twq_academy_users_v2';
const SESSIONS_STORAGE_KEY = 'twq_current_user_v2';
const SCHEDULES_STORAGE_KEY = 'twq_class_schedules_v2';
const LESSONS_STORAGE_KEY = 'twq_daily_lessons_v2';
const ATTENDANCE_STORAGE_KEY = 'twq_attendance_logs_v2';
const TRIALS_STORAGE_KEY = 'twq_trial_bookings_v2';
const INVOICES_STORAGE_KEY = 'twq_invoices_v2';
const ANNOUNCEMENTS_STORAGE_KEY = 'twq_announcements_v2';

// Storage Helpers
export function getStoredAcademyUsers(): AcademyUser[] {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_ACADEMY_USERS));
      return DEFAULT_ACADEMY_USERS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_ACADEMY_USERS;
  }
}

export function saveAcademyUsers(users: AcademyUser[]) {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (err) {
    console.error('Failed saving users to localStorage', err);
  }
}

export function getCurrentAcademyUser(): AcademyUser | null {
  try {
    const raw = localStorage.getItem(SESSIONS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setCurrentAcademyUser(user: AcademyUser | null) {
  try {
    if (user) {
      localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(SESSIONS_STORAGE_KEY);
    }
  } catch (err) {
    console.error('Failed updating session in localStorage', err);
  }
}

export function getStoredClassSchedules(): ClassScheduleItem[] {
  try {
    const raw = localStorage.getItem(SCHEDULES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(SCHEDULES_STORAGE_KEY, JSON.stringify(DEFAULT_CLASS_SCHEDULES));
      return DEFAULT_CLASS_SCHEDULES;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_CLASS_SCHEDULES;
  }
}

export function saveClassSchedules(schedules: ClassScheduleItem[]) {
  try {
    localStorage.setItem(SCHEDULES_STORAGE_KEY, JSON.stringify(schedules));
  } catch (err) {
    console.error('Failed saving schedules', err);
  }
}

export function getStoredDailyLessons(): DailyLessonLog[] {
  try {
    const raw = localStorage.getItem(LESSONS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LESSONS_STORAGE_KEY, JSON.stringify(DEFAULT_DAILY_LESSONS));
      return DEFAULT_DAILY_LESSONS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_DAILY_LESSONS;
  }
}

export function saveDailyLessons(lessons: DailyLessonLog[]) {
  try {
    localStorage.setItem(LESSONS_STORAGE_KEY, JSON.stringify(lessons));
  } catch (err) {
    console.error('Failed saving daily lessons', err);
  }
}

export function getStoredAttendanceLogs(): StudentAttendanceLog[] {
  try {
    const raw = localStorage.getItem(ATTENDANCE_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ATTENDANCE_STORAGE_KEY, JSON.stringify(DEFAULT_ATTENDANCE_LOGS));
      return DEFAULT_ATTENDANCE_LOGS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_ATTENDANCE_LOGS;
  }
}

export function saveAttendanceLogs(logs: StudentAttendanceLog[]) {
  try {
    localStorage.setItem(ATTENDANCE_STORAGE_KEY, JSON.stringify(logs));
  } catch (err) {
    console.error('Failed saving attendance logs', err);
  }
}

export function getStoredTrialBookings(): TrialBookingRequest[] {
  try {
    const raw = localStorage.getItem(TRIALS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(TRIALS_STORAGE_KEY, JSON.stringify(DEFAULT_TRIAL_BOOKINGS));
      return DEFAULT_TRIAL_BOOKINGS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_TRIAL_BOOKINGS;
  }
}

export function saveTrialBookings(trials: TrialBookingRequest[]) {
  try {
    localStorage.setItem(TRIALS_STORAGE_KEY, JSON.stringify(trials));
  } catch (err) {
    console.error('Failed saving trial bookings', err);
  }
}

export function getStoredInvoices(): AcademyInvoice[] {
  try {
    const raw = localStorage.getItem(INVOICES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(INVOICES_STORAGE_KEY, JSON.stringify(DEFAULT_INVOICES));
      return DEFAULT_INVOICES;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_INVOICES;
  }
}

export function getStoredAnnouncements(): AcademyAnnouncement[] {
  try {
    const raw = localStorage.getItem(ANNOUNCEMENTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ANNOUNCEMENTS_STORAGE_KEY, JSON.stringify(DEFAULT_ANNOUNCEMENTS));
      return DEFAULT_ANNOUNCEMENTS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_ANNOUNCEMENTS;
  }
}

export function saveAnnouncements(announcements: AcademyAnnouncement[]) {
  try {
    localStorage.setItem(ANNOUNCEMENTS_STORAGE_KEY, JSON.stringify(announcements));
  } catch (err) {
    console.error('Failed saving announcements', err);
  }
}
