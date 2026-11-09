export interface StudentBookmarkItem {
  id: string;
  studentId: string;
  type: 'quran_ayah' | 'dua' | 'kalima' | 'namaz' | 'hadith' | 'pillar' | 'prophet' | 'name_of_allah';
  title: string;
  arabicText: string;
  englishTranslation: string;
  reference: string;
  surahNumber?: number;
  ayahNumber?: number;
  createdAt: string;
}

export interface StudentQuizResult {
  quizLevel: number;
  score: number;
  total: number;
  passed: boolean;
  certificateTitle: string;
  date: string;
}

export interface StudentCertificate {
  id: string;
  studentId: string;
  studentName: string;
  level: number;
  levelTitle: string;
  certificateCode: string;
  scorePercentage: number;
  issueDate: string;
}

export interface StudentLearningProfile {
  studentId: string;
  currentLevel: 1 | 2 | 3 | 4;
  lastReadingPosition: {
    surahNumber: number;
    surahName: string;
    ayahNumber: number;
    updatedAt: string;
  };
  completedTopicIds: string[];
  bookmarks: StudentBookmarkItem[];
  quizResults: Record<number, StudentQuizResult>;
  certificates: StudentCertificate[];
}

const STORAGE_KEY_PREFIX = 'twq_student_learning_';

export function getStudentLearningProfile(studentId: string, studentName: string): StudentLearningProfile {
  const key = `${STORAGE_KEY_PREFIX}${studentId}`;
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        studentId,
        currentLevel: parsed.currentLevel || 1,
        lastReadingPosition: parsed.lastReadingPosition || {
          surahNumber: 1,
          surahName: 'Al-Fatihah',
          ayahNumber: 1,
          updatedAt: new Date().toISOString()
        },
        completedTopicIds: Array.isArray(parsed.completedTopicIds) ? parsed.completedTopicIds : [],
        bookmarks: Array.isArray(parsed.bookmarks) ? parsed.bookmarks : [],
        quizResults: parsed.quizResults || {},
        certificates: Array.isArray(parsed.certificates) ? parsed.certificates : []
      };
    }
  } catch (err) {
    console.warn('Failed to parse learning profile', err);
  }

  // Initial default state
  const defaultProfile: StudentLearningProfile = {
    studentId,
    currentLevel: 1,
    lastReadingPosition: {
      surahNumber: 1,
      surahName: 'Al-Fatihah',
      ayahNumber: 1,
      updatedAt: new Date().toISOString()
    },
    completedTopicIds: ['topic-qaida-1', 'topic-kalima-1'],
    bookmarks: [
      {
        id: 'bm-initial-1',
        studentId,
        type: 'quran_ayah',
        title: 'Surah Al-Fatihah - Ayah 1',
        arabicText: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        englishTranslation: 'In the name of Allah, the Most Compassionate, the Most Merciful.',
        reference: 'Surah 1:1',
        surahNumber: 1,
        ayahNumber: 1,
        createdAt: new Date().toISOString()
      },
      {
        id: 'bm-initial-2',
        studentId,
        type: 'kalima',
        title: 'First Kalima: Tayyibah',
        arabicText: 'لَا إِلَٰهَ إِلَّا اللَّهُ مُحَمَّدٌ رَّسُولُ اللَّهِ',
        englishTranslation: 'There is no deity worthy of worship except Allah, and Muhammad is the Messenger of Allah.',
        reference: 'Kalima of Divine Oneness',
        createdAt: new Date().toISOString()
      }
    ],
    quizResults: {},
    certificates: []
  };

  saveStudentLearningProfile(defaultProfile);
  return defaultProfile;
}

export function saveStudentLearningProfile(profile: StudentLearningProfile): void {
  try {
    const key = `${STORAGE_KEY_PREFIX}${profile.studentId}`;
    localStorage.setItem(key, JSON.stringify(profile));
  } catch (err) {
    console.warn('Failed to save learning profile', err);
  }
}

export function toggleStudentBookmark(
  studentId: string,
  studentName: string,
  bookmark: Omit<StudentBookmarkItem, 'id' | 'studentId' | 'createdAt'>
): { isBookmarked: boolean; updatedBookmarks: StudentBookmarkItem[] } {
  const profile = getStudentLearningProfile(studentId, studentName);
  const existingIdx = profile.bookmarks.findIndex(
    b => b.type === bookmark.type && (
      (b.surahNumber && b.surahNumber === bookmark.surahNumber && b.ayahNumber === bookmark.ayahNumber) ||
      b.title === bookmark.title
    )
  );

  let isBookmarked = false;
  if (existingIdx !== -1) {
    profile.bookmarks.splice(existingIdx, 1);
    isBookmarked = false;
  } else {
    const newBm: StudentBookmarkItem = {
      ...bookmark,
      id: `bm-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      studentId,
      createdAt: new Date().toISOString()
    };
    profile.bookmarks.unshift(newBm);
    isBookmarked = true;
  }

  saveStudentLearningProfile(profile);
  return { isBookmarked, updatedBookmarks: profile.bookmarks };
}

export function isItemBookmarked(
  studentId: string,
  studentName: string,
  type: string,
  identifier: { surahNumber?: number; ayahNumber?: number; title?: string }
): boolean {
  const profile = getStudentLearningProfile(studentId, studentName);
  return profile.bookmarks.some(b => {
    if (b.type !== type) return false;
    if (identifier.surahNumber && b.surahNumber) {
      return b.surahNumber === identifier.surahNumber && b.ayahNumber === identifier.ayahNumber;
    }
    return b.title === identifier.title;
  });
}

export function updateLastReadingPosition(
  studentId: string,
  studentName: string,
  surahNumber: number,
  surahName: string,
  ayahNumber: number
): void {
  const profile = getStudentLearningProfile(studentId, studentName);
  profile.lastReadingPosition = {
    surahNumber,
    surahName,
    ayahNumber,
    updatedAt: new Date().toISOString()
  };
  saveStudentLearningProfile(profile);
}

export function toggleTopicCompletion(
  studentId: string,
  studentName: string,
  topicId: string
): { isCompleted: boolean; completedCount: number } {
  const profile = getStudentLearningProfile(studentId, studentName);
  const exists = profile.completedTopicIds.includes(topicId);
  if (exists) {
    profile.completedTopicIds = profile.completedTopicIds.filter(id => id !== topicId);
  } else {
    profile.completedTopicIds.push(topicId);
  }
  saveStudentLearningProfile(profile);
  return { isCompleted: !exists, completedCount: profile.completedTopicIds.length };
}

export function recordQuizCompletion(
  studentId: string,
  studentName: string,
  level: 1 | 2 | 3 | 4,
  score: number,
  total: number,
  certificateTitle: string
): { passed: boolean; certificate?: StudentCertificate } {
  const profile = getStudentLearningProfile(studentId, studentName);
  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= 70;

  profile.quizResults[level] = {
    quizLevel: level,
    score,
    total,
    passed,
    certificateTitle,
    date: new Date().toISOString().split('T')[0]
  };

  let newCert: StudentCertificate | undefined = undefined;

  if (passed) {
    // If not already issued certificate for this level
    const existingCert = profile.certificates.find(c => c.level === level);
    if (!existingCert) {
      const code = `TWQ-${level}-${Math.floor(100000 + Math.random() * 900000)}`;
      newCert = {
        id: `cert-${Date.now()}`,
        studentId,
        studentName,
        level,
        levelTitle: certificateTitle,
        certificateCode: code,
        scorePercentage: percentage,
        issueDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
      };
      profile.certificates.push(newCert);

      // Advance student level if passed
      if (profile.currentLevel === level && level < 4) {
        profile.currentLevel = (level + 1) as 1 | 2 | 3 | 4;
      }
    } else {
      newCert = existingCert;
    }
  }

  saveStudentLearningProfile(profile);
  return { passed, certificate: newCert };
}
