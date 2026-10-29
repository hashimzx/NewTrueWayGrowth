/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { User, QaidaLesson, Course, SubscriptionTier, PronunciationAttempt } from './types';
import { INITIAL_QAIDA_LESSONS } from './data/qaidaData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MentorSection } from './components/MentorSection';
import { VideoSection } from './components/VideoSection';
import { FaqSection } from './components/FaqSection';
import { QuranReader } from './components/QuranReader';
import { QuranGatewayCard } from './components/QuranGatewayCard';
import { SpecializedClasses } from './components/SpecializedClasses';
import { ServicesSection } from './components/ServicesSection';
import { ContactSection } from './components/ContactSection';
import { BlogSection } from './components/BlogSection';
import { QaidaViewer } from './components/QaidaViewer';
import { CoursesSection } from './components/CoursesSection';
import { StudentDashboard } from './components/StudentDashboard';
import { AdminPanel } from './components/AdminPanel';
import { CheckoutModal } from './components/CheckoutModal';
import { AuthModal } from './components/AuthModal';
import { EnrollModal } from './components/EnrollModal';
import { NamazSection } from './components/NamazSection';
import { DuasSection } from './components/DuasSection';
import { AttendanceTracker } from './components/AttendanceTracker';
import { QuranHistoryCarousel } from './components/QuranHistoryCarousel';
import { AudioResumeBar } from './components/AudioResumeBar';
import { PrayerTimeSidebar } from './components/PrayerTimeSidebar';
import { WorshipGuideSection } from './components/WorshipGuideSection';
import { HifzSection } from './components/HifzSection';
import { Footer } from './components/Footer';
import { MessageCircle } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<string>(() => {
    try {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const v = params.get('view');
        if (v) return v;
        if (window.location.hash === '#quran') return 'quran';
      }
    } catch {}
    return 'home';
  });

  // Keep URL search query in sync with currentView
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        if (currentView === 'home') {
          url.searchParams.delete('view');
        } else {
          url.searchParams.set('view', currentView);
        }
        window.history.replaceState({}, '', url.toString());
      }
    } catch {}
  }, [currentView]);

  const [currency, setCurrency] = useState<'USD' | 'GBP' | 'EUR' | 'CAD' | 'AUD'>('GBP');
  const [timezone, setTimezone] = useState<string>('Europe/London');
  const [selectedTrackForTrial, setSelectedTrackForTrial] = useState<'kids' | 'adults' | 'female' | null>(null);
  const [audioResumeSession, setAudioResumeSession] = useState<{ surahNumber: number; seekTime: number } | null>(null);

  // Lessons state with custom teacher recordings capability
  const [lessons, setLessons] = useState<QaidaLesson[]>(() => {
    const saved = localStorage.getItem('twq_qaida_lessons');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return INITIAL_QAIDA_LESSONS;
  });

  // Current logged in student/admin
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('twq_current_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return {
      id: 'usr-student-1',
      name: 'Hashim Zafar',
      email: 'hashimzafar2k@gmail.com',
      role: 'student',
      country: 'United Kingdom',
      timezone: 'Europe/London (GMT/BST)',
      enrolledCourseIds: ['course-madani-qaida', 'course-tajweed-rules'],
      progress: {
        completedLessonIds: ['lesson-1'],
        masteredWordIds: ['w-1', 'w-2', 'w-3', 'w-4', 'w-5', 'w-8', 'w-201', 'w-202'],
        averagePronunciationScore: 89,
        practiceMinutes: 110,
        streakDays: 6,
        lastPracticeDate: new Date().toISOString()
      },
      bookmarks: ['w-6', 'w-15']
    };
  });

  // Pronunciation attempts log
  const [pronunciationAttempts, setPronunciationAttempts] = useState<PronunciationAttempt[]>([
    {
      id: 'att-1',
      wordId: 'w-1',
      arabic: 'ا',
      transliteration: 'Alif',
      spokenText: 'alif',
      score: 96,
      passed: true,
      makhrajFeedback: 'Flawless glottal release from the mouth cavity.',
      tajweedNotes: ['Light letter properly observed.'],
      timestamp: 'Today at 09:15 AM'
    },
    {
      id: 'att-2',
      wordId: 'w-2',
      arabic: 'ب',
      transliteration: 'Baa',
      spokenText: 'baa',
      score: 94,
      passed: true,
      makhrajFeedback: 'Accurate lip closure on inner moist lips.',
      tajweedNotes: ['Clear pronunciation.'],
      timestamp: 'Today at 09:20 AM'
    }
  ]);

  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const [enrollDefaultCourse, setEnrollDefaultCourse] = useState<string>('Quran Hifz (Memorization) Program');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedCheckoutItem, setSelectedCheckoutItem] = useState<Course | SubscriptionTier | null>(null);

  const handleOpenEnroll = (courseName?: string) => {
    if (courseName) {
      setEnrollDefaultCourse(courseName);
    }
    setIsEnrollOpen(true);
  };

  // Sync state to local storage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('twq_current_user', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('twq_qaida_lessons', JSON.stringify(lessons));
  }, [lessons]);

  // Handle successful student pronunciation assessment
  const handleRecordSuccess = (attempt: PronunciationAttempt) => {
    setPronunciationAttempts(prev => [attempt, ...prev]);

    if (currentUser) {
      const alreadyMastered = currentUser.progress.masteredWordIds.includes(attempt.wordId);
      const newMastered = alreadyMastered
        ? currentUser.progress.masteredWordIds
        : [...currentUser.progress.masteredWordIds, attempt.wordId];

      setCurrentUser({
        ...currentUser,
        progress: {
          ...currentUser.progress,
          masteredWordIds: newMastered,
          practiceMinutes: currentUser.progress.practiceMinutes + 2,
          lastPracticeDate: new Date().toISOString()
        }
      });
    }
  };

  const handleToggleBookmark = (wordId: string) => {
    if (!currentUser) return;
    const isBookmarked = currentUser.bookmarks.includes(wordId);
    const newBookmarks = isBookmarked
      ? currentUser.bookmarks.filter(id => id !== wordId)
      : [...currentUser.bookmarks, wordId];

    setCurrentUser({
      ...currentUser,
      bookmarks: newBookmarks
    });
  };

  const handleEnrollCourse = (course: Course) => {
    setSelectedCheckoutItem(course);
    setIsEnrollOpen(true);
  };

  const handleSubscribe = (tier: SubscriptionTier) => {
    setSelectedCheckoutItem(tier);
    setIsCheckoutOpen(true);
  };

  const handlePaymentSuccess = () => {
    if (!currentUser || !selectedCheckoutItem) return;
    if ('level' in selectedCheckoutItem) {
      setCurrentUser({
        ...currentUser,
        enrolledCourseIds: [...currentUser.enrolledCourseIds, selectedCheckoutItem.id]
      });
    }
  };

  const handleSaveTeacherVoice = (lessonId: string, wordId: string, audioBase64: string) => {
    const updatedLessons = lessons.map(lesson => {
      if (lesson.id !== lessonId) return lesson;
      return {
        ...lesson,
        words: lesson.words.map(w => {
          if (w.id !== wordId) return w;
          return {
            ...w,
            teacherCustomVoiceUrl: audioBase64
          };
        })
      };
    });
    setLessons(updatedLessons);
  };

  const handleOpenTrial = (track?: 'kids' | 'adults' | 'female') => {
    if (track) setSelectedTrackForTrial(track);
    setCurrentView('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResumeAudio = (session: { surahNumber: number; currentTime: number }) => {
    setAudioResumeSession({
      surahNumber: session.surahNumber,
      seekTime: session.currentTime
    });
    setCurrentView('quran');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-slate-900 font-sans flex flex-col selection:bg-[#6B1B7E] selection:text-white">
      
      {/* Navigation */}
      <Navbar
        currentView={currentView}
        setCurrentView={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenEnroll={() => handleOpenEnroll()}
        onLogout={() => setCurrentUser(null)}
        currency={currency}
        setCurrency={setCurrency}
        timezone={timezone}
        setTimezone={setTimezone}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentView === 'home' && (
          <div className="space-y-0">
            {/* Front Design like ustadleads.com */}
            <Hero
              onStartQaida={() => setCurrentView('qaida')}
              onExploreCourses={() => setCurrentView('courses')}
              onOpenQuranReader={() => {
                setCurrentView('quran');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenEnroll={() => handleOpenEnroll()}
            />

            {/* Specialized Classes for Kids, Sisters & Adults */}
            <SpecializedClasses
              onBookTrial={(cat) => handleOpenTrial(cat)}
              onExploreQaida={() => setCurrentView('qaida')}
            />

            {/* Quran Memorization (Hifz) Program with Sabaq/Sabqi/Manzil */}
            <HifzSection
              onOpenEnroll={handleOpenEnroll}
              onOpenQaida={() => setCurrentView('qaida')}
              currency={currency}
            />

            {/* True Way of Namaz, Eid, Janazah & Roza (Do This & Avoid This) Guide */}
            <WorshipGuideSection
              onOpenFullQuran={() => {
                setCurrentView('quran');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenDuas={() => {
                setCurrentView('duas');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenSalahGuide={() => {
                setCurrentView('namaz_salah_guide');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenTahajjud={() => {
                setCurrentView('namaz_tahajjud');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* History of the Holy Quran Carousel (Requested Feature) */}
            <QuranHistoryCarousel
              onExploreQuran={() => {
                setCurrentView('quran');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Contact & Free Trial Section with UstadLeads info */}
            <ContactSection initialTrack={selectedTrackForTrial} />
          </div>
        )}

        {currentView === 'hifz' && (
          <HifzSection
            onOpenEnroll={handleOpenEnroll}
            onOpenQaida={() => setCurrentView('qaida')}
            currency={currency}
          />
        )}

        {currentView === 'history' && (
          <QuranHistoryCarousel
            onExploreQuran={() => {
              setCurrentView('quran');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'mentor' && (
          <div className="space-y-0">
            <MentorSection
              onEnroll={() => setIsEnrollOpen(true)}
            />
            <VideoSection
              onEnroll={() => setIsEnrollOpen(true)}
              onExploreQuran={() => setCurrentView('quran')}
            />
            <FaqSection
              onOpenEnroll={() => setIsEnrollOpen(true)}
            />
          </div>
        )}

        {currentView === 'quran' && (
          <QuranReader
            initialSurah={audioResumeSession?.surahNumber}
            initialSeekTime={audioResumeSession?.seekTime}
          />
        )}

        {currentView === 'qaida' && (
          <QaidaViewer
            lessons={lessons}
            currentUser={currentUser}
            onRecordSuccess={handleRecordSuccess}
            onToggleBookmark={handleToggleBookmark}
            onSaveTeacherVoice={handleSaveTeacherVoice}
          />
        )}

        {(currentView === 'courses' || currentView === 'pricing') && (
          <div className="space-y-0">
            <CoursesSection
              currency={currency}
              onEnrollCourse={handleEnrollCourse}
              onSubscribe={handleSubscribe}
            />
            <MentorSection
              onEnroll={() => setIsEnrollOpen(true)}
            />
          </div>
        )}

        {(currentView === 'namaz' || currentView === 'namaz_salah_guide' || currentView === 'namaz_tahajjud') && (
          <NamazSection
            initialSubSection={
              currentView === 'namaz_salah_guide'
                ? 'salah_guide'
                : currentView === 'namaz_tahajjud'
                ? 'tahajjud'
                : 'times'
            }
            onOpenDuas={() => {
              setCurrentView('duas');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'duas' && (
          <DuasSection
            onOpenQuran={() => {
              setCurrentView('quran');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenQaida={() => {
              setCurrentView('qaida');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'attendance' && (
          <AttendanceTracker
            currentUser={currentUser}
            onOpenSchedule={() => handleOpenTrial()}
            onNavigateToCourse={() => {
              setCurrentView('courses');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'faqs' && (
          <div className="py-8">
            <FaqSection
              onOpenEnroll={() => setIsEnrollOpen(true)}
            />
          </div>
        )}

        {currentView === 'contact' && (
          <ContactSection initialTrack={selectedTrackForTrial} />
        )}

        {currentView === 'dashboard' && currentUser && (
          <StudentDashboard
            user={currentUser}
            onNavigateToQaida={() => setCurrentView('qaida')}
            onOpenSchedule={() => handleOpenTrial()}
            onNavigateToAttendance={() => {
              setCurrentView('attendance');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToHifz={() => {
              setCurrentView('hifz');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToQuran={() => {
              setCurrentView('quran');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            attemptsHistory={pronunciationAttempts}
          />
        )}

        {currentView === 'worship_guide' && (
          <WorshipGuideSection
            onOpenFullQuran={() => {
              setCurrentView('quran');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenDuas={() => {
              setCurrentView('duas');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenSalahGuide={() => {
              setCurrentView('namaz_salah_guide');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenTahajjud={() => {
              setCurrentView('namaz_tahajjud');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'admin' && (
          <AdminPanel
            lessons={lessons}
            onUpdateLessons={setLessons}
            students={currentUser ? [currentUser] : []}
            attempts={pronunciationAttempts}
            onSaveTeacherVoice={handleSaveTeacherVoice}
          />
        )}
      </main>

      {/* Non-Quran Page Elements: Dedicated Quran Page shows ONLY Quran & Navbar as requested */}
      {currentView !== 'quran' && (
        <>
          {/* Floating Audio Resume Bar (when saved session exists) */}
          <AudioResumeBar onResume={handleResumeAudio} />

          {/* Floating Side Bar for Live Local Time, Namaz & World Calendar */}
          <PrayerTimeSidebar 
            onOpenFullNamaz={() => {
              setCurrentView('namaz');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenWorshipGuide={() => {
              setCurrentView('worship_guide');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          {/* Floating WhatsApp Action Button (ustadleads.com) */}
          <a
            href="https://wa.me/923068959085?text=Assalam-o-Alaikum%20Abdul%20Basit%2C%20I%20want%20to%20learn%20more%20about%20the%20Academy%20and%20Courses"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with Abdul on WhatsApp"
            className="fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white p-3.5 sm:px-4 sm:py-3.5 rounded-full shadow-2xl shadow-emerald-500/40 hover:shadow-emerald-500/60 transition flex items-center gap-2 group cursor-pointer"
            title="Chat on WhatsApp (+92 306 8959085)"
          >
            <MessageCircle className="w-6 h-6 group-hover:scale-110 transition shrink-0" />
            <span className="hidden sm:inline text-xs font-black tracking-wide pr-1">
              Chat on WhatsApp
            </span>
          </a>

          {/* Footer */}
          <Footer
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenEnroll={() => setIsEnrollOpen(true)}
          />
        </>
      )}

      {/* Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={(user) => {
          // Automatically record daily student attendance
          try {
            const todayKey = new Date().toISOString().split('T')[0];
            const stored = JSON.parse(localStorage.getItem('twq_student_attendance') || '{}');
            stored[todayKey] = {
              status: 'present',
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              studentId: user.id,
              studentName: user.name,
              sessionType: 'Portal Sign-in & Daily Islamic Study'
            };
            localStorage.setItem('twq_student_attendance', JSON.stringify(stored));
          } catch {}

          setCurrentUser({
            ...user,
            progress: {
              ...user.progress,
              streakDays: (user.progress?.streakDays || 6) + 1,
              lastPracticeDate: new Date().toISOString()
            }
          });

          if (user.role === 'admin') {
            setCurrentView('admin');
          } else {
            setCurrentView('dashboard');
          }
        }}
      />

      <EnrollModal
        isOpen={isEnrollOpen}
        onClose={() => setIsEnrollOpen(false)}
        currency={currency}
        defaultCourse={enrollDefaultCourse}
      />

      <CheckoutModal
        item={selectedCheckoutItem}
        currency={currency}
        currentUser={currentUser}
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
        onNavigateToQaida={() => setCurrentView('qaida')}
      />
    </div>
  );
}
