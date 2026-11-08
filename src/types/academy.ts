export type AcademyUserRole = 'student' | 'instructor' | 'admin' | 'parent';

export interface AcademyUser {
  id: string;
  name: string;
  email: string;
  passwordHash?: string;
  role: AcademyUserRole;
  phone?: string;
  country: string;
  timezone: string;
  avatar?: string;
  status: 'active' | 'inactive';
  emailVerified: boolean;
  createdAt: string;
  // Student-specific fields
  studentAge?: number;
  parentName?: string;
  parentPhone?: string;
  enrolledCourseIds?: string[];
  assignedTeacherId?: string;
  assignedTeacherName?: string;
  monthlyFee?: number;
  currency?: string;
  // Teacher-specific fields
  qualifications?: string;
  ijazah?: string;
  languages?: string[];
  assignedStudentIds?: string[];
}

export interface QuranCourseItem {
  id: string;
  title: string;
  arabicTitle: string;
  tagline: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Ages';
  duration: string;
  totalLessons: number;
  ageGroup: string;
  featured?: boolean;
  instructorName: string;
  instructorTitle: string;
  prices: {
    USD: number;
    GBP: number;
    EUR: number;
    CAD: number;
    AUD: number;
  };
  keyBenefits: string[];
  syllabus: Array<{ title: string; topics: string[] }>;
}

export interface ClassScheduleItem {
  id: string;
  studentId: string;
  studentName: string;
  teacherId: string;
  teacherName: string;
  courseId: string;
  courseTitle: string;
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  timeSlot: string; // e.g. "05:00 PM"
  durationMinutes: number;
  meetingUrl: string; // Zoom or Google Meet URL
  meetingPlatform: 'Zoom' | 'Google Meet';
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}

export interface DailyLessonLog {
  id: string;
  studentId: string;
  studentName: string;
  teacherId: string;
  teacherName: string;
  courseId: string;
  date: string; // YYYY-MM-DD
  sabaqTitle: string; // e.g. "Surah Al-Mulk: Verses 1-10" or "Lesson 4: Harakat"
  sabaqStatus: 'passed' | 'needs_practice' | 'in_progress';
  sabqiRevision: string; // e.g. "Surah Al-Waqiah (Last 2 pages)"
  manzilRevision: string; // e.g. "Juz 29 Review"
  tajweedScore: number; // 1-5 or percentage
  makharijScore: number;
  fluencyScore: number;
  homework: string;
  teacherFeedback: string;
  parentNotes?: string;
}

export interface StudentAttendanceLog {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseTitle: string;
  teacherName: string;
  date: string; // YYYY-MM-DD
  time: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  sessionTopic: string;
  durationMinutes: number;
  notes?: string;
}

export interface TrialBookingRequest {
  id: string;
  studentName: string;
  studentAge: number;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  courseId: string;
  courseTitle: string;
  preferredTeacherGender: 'any' | 'male' | 'female';
  preferredDays: string[];
  preferredTimeSlot: string;
  timezone: string;
  notes?: string;
  status: 'new' | 'contacted' | 'scheduled' | 'enrolled' | 'cancelled';
  createdAt: string;
}

export interface AcademyInvoice {
  id: string;
  invoiceNumber: string;
  studentId: string;
  studentName: string;
  date: string;
  courseTitle: string;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'processing';
  billingPeriod: string;
}

export interface AcademyAnnouncement {
  id: string;
  title: string;
  message: string;
  targetRole: 'all' | 'students' | 'instructors';
  date: string;
  senderName: string;
}

export interface AcademyTeacher {
  id: string;
  name: string;
  arabicName?: string;
  title: string;
  gender: 'male' | 'female';
  qualifications: string;
  ijazah: string;
  experienceYears: number;
  languages: string[];
  specialties: string[];
  photo: string;
  bio: string;
  activeStudentsCount: number;
  rating: number;
  availableTimeSlots: string[];
}
