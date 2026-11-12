/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { User, QaidaLesson } from './types';
import { INITIAL_QAIDA_LESSONS } from './data/qaidaData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { QuranCoursesSection } from './components/QuranCoursesSection';
import { PricingSection } from './components/PricingSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { TeachersSection } from './components/TeachersSection';
import { HowItWorks } from './components/HowItWorks';
import { LearningProcessSection } from './components/LearningProcessSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { TrialModal } from './components/TrialModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { PrayerTimeSidebar } from './components/PrayerTimeSidebar';
import { StudentDashboard } from './components/StudentDashboard';
import { TeacherDashboard } from './components/TeacherDashboard';
import { AdminPanel } from './components/AdminPanel';
import { AuthModal } from './components/AuthModal';
import { QuranReader } from './components/QuranReader';
import { QaidaViewer } from './components/QaidaViewer';
import { NamazSection } from './components/NamazSection';
import { DuasSection } from './components/DuasSection';
import { Footer } from './components/Footer';

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

  // Guarantee page opens at top and disable automatic scroll restoration on load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    }
  }, []);

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

  const [currency, setCurrency] = useState<'USD' | 'GBP'>('USD');
  const [selectedCourseForTrial, setSelectedCourseForTrial] = useState<string | undefined>(undefined);

  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState<'login' | 'register' | 'admin_login'>('login');
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);

  // Lessons state for Madani Qaida
  const [lessons, setLessons] = useState<QaidaLesson[]>(() => {
    const saved = localStorage.getItem('twq_qaida_lessons');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return INITIAL_QAIDA_LESSONS;
  });

  // Logged in user session
  const [currentUser, setCurrentUser] = useState<any | null>(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('twq_current_user_v2');
        if (saved) {
          return JSON.parse(saved);
        }
        const params = new URLSearchParams(window.location.search);
        if (params.get('view') === 'student') {
          return {
            id: 'usr-student-1',
            name: 'Hashim Zafar',
            email: 'student@truewayquran.com',
            role: 'student',
            country: 'United Kingdom',
            timezone: 'Europe/London (GMT)'
          };
        }
      }
    } catch {}
    return null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('twq_current_user_v2', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('twq_current_user_v2');
    }
  }, [currentUser]);

  const handleLogin = (user: any) => {
    setCurrentUser(user);
    if (user.role === 'admin') {
      setCurrentView('admin');
    } else if (user.role === 'instructor') {
      setCurrentView('teacher');
    } else {
      setCurrentView('student');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('twq_current_user_v2');
    if (currentView === 'admin' || currentView === 'student' || currentView === 'teacher') {
      setCurrentView('home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTrialModal = (courseId?: string) => {
    setSelectedCourseForTrial(courseId);
    setIsTrialModalOpen(true);
  };

  const handleOpenAuth = (mode: 'login' | 'register' | 'admin_login' = 'login') => {
    setAuthInitialMode(mode);
    setIsAuthOpen(true);
  };

  // Safe navigation with role protection
  const handleNavigate = (view: string) => {
    if (view === 'admin') {
      if (!currentUser || currentUser.role !== 'admin') {
        handleOpenAuth('admin_login');
        return;
      }
    } else if (view === 'teacher') {
      if (!currentUser || (currentUser.role !== 'instructor' && currentUser.role !== 'admin')) {
        handleOpenAuth('login');
        return;
      }
    } else if (view === 'student') {
      if (!currentUser) {
        handleOpenAuth('login');
        return;
      }
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
            teacherVoiceUrl: audioBase64
          };
        })
      };
    });
    setLessons(updatedLessons);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-slate-900 font-sans flex flex-col selection:bg-[#6B1B7E] selection:text-white">
      
      {/* Navigation Header */}
      <Navbar
        currentView={currentView}
        setCurrentView={handleNavigate}
        currentUser={currentUser}
        onOpenAuth={() => handleOpenAuth('login')}
        onOpenTrialModal={() => handleOpenTrialModal()}
        onLogout={handleLogout}
        currency={currency}
        setCurrency={setCurrency}
      />

      {/* Main View Router */}
      <main className="flex-1">
        
        {/* HOMEPAGE: True Way Quran – Online Quran Academy */}
        {currentView === 'home' && (
          <div className="space-y-0">
            {/* 1. Hero Section */}
            <Hero
              onEnrollNow={() => handleOpenTrialModal()}
              onBookFreeTrial={() => handleOpenTrialModal()}
              onExploreCourses={() => {
                const el = document.getElementById('courses');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenQuranReader={() => setCurrentView('quran')}
              onOpenWhatsApp={() => window.open('https://wa.me/923068959085?text=Assalam-o-Alaikum%20True%20Way%20Quran%2C%20I%20would%20like%20to%20book%20a%20free%20trial%20class.', '_blank')}
            />

            {/* 2. About Us Section */}
            <AboutSection
              onBookFreeTrial={() => handleOpenTrialModal()}
              onExploreCourses={() => {
                const el = document.getElementById('courses');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* 3. Transparent Pricing Packages */}
            <PricingSection
              currency={currency}
              onSetCurrency={setCurrency}
              onSelectTier={() => handleOpenTrialModal()}
              onBookFreeTrial={() => handleOpenTrialModal()}
            />

            {/* 4. Why Choose Us Section */}
            <WhyChooseUs
              onBookFreeTrial={() => handleOpenTrialModal()}
            />

            {/* 5. Learning Process & Virtual Classroom */}
            <LearningProcessSection />

            {/* 8. Genuine Testimonials Section */}
            <TestimonialsSection
              onBookFreeTrial={() => handleOpenTrialModal()}
            />

            {/* 9. FAQs Section */}
            <FaqSection
              onOpenEnroll={() => handleOpenTrialModal()}
              onOpenWhatsApp={() => window.open('https://wa.me/923068959085', '_blank')}
            />

            {/* 10. Contact Us & Free Trial Booking Form */}
            <ContactSection
              onSuccessSubmit={() => {}}
            />
          </div>
        )}

        {/* STUDENT & PARENT DASHBOARD */}
        {currentView === 'student' && currentUser && (
          <StudentDashboard
            user={currentUser}
            onLogout={handleLogout}
            onNavigateHome={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToQuran={() => setCurrentView('quran')}
            onNavigateToQaida={() => setCurrentView('qaida')}
            onOpenWhatsApp={() => window.open('https://wa.me/923068959085', '_blank')}
          />
        )}

        {/* TEACHER DASHBOARD */}
        {currentView === 'teacher' && currentUser && (currentUser.role === 'instructor' || currentUser.role === 'admin') && (
          <TeacherDashboard
            currentUser={currentUser}
            onLogout={handleLogout}
            onNavigateHome={() => setCurrentView('home')}
            onOpenQuranReader={() => setCurrentView('quran')}
          />
        )}

        {/* ADMIN DASHBOARD */}
        {currentView === 'admin' && currentUser && currentUser.role === 'admin' && (
          <AdminPanel
            currentUser={currentUser}
            onLogout={handleLogout}
            onNavigateHome={() => setCurrentView('home')}
            onOpenQuranReader={() => setCurrentView('quran')}
          />
        )}

        {/* QURAN READER (114 Surahs, pagination, audio pause/resume/replay, last-read memory) */}
        {currentView === 'quran' && (
          <QuranReader
            onBackToHome={() => {
              setCurrentView(currentUser?.role === 'student' ? 'student' : 'home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* MADANI QAIDA VIEWER */}
        {currentView === 'qaida' && (
          <QaidaViewer
            lessons={lessons}
            currentUser={currentUser}
            onRecordSuccess={() => {}}
            onToggleBookmark={() => {}}
            onSaveTeacherVoice={handleSaveTeacherVoice}
            onBack={() => {
              setCurrentView(currentUser?.role === 'student' ? 'student' : 'home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* NAMAZ & PRAYER SCHEDULE */}
        {currentView === 'namaz' && (
          <NamazSection />
        )}

        {/* DAILY DUAS & ISLAMIC PRACTICES */}
        {currentView === 'duas' && (
          <DuasSection />
        )}

      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenTrialModal={() => handleOpenTrialModal()}
      />

      {/* Floating Worldwide Student Namaz, Live Clock & Prayer Calling Sidebar */}
      <PrayerTimeSidebar
        onOpenFullNamaz={() => {
          setCurrentView('namaz');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenWorshipGuide={() => {
          setCurrentView('namaz');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp phoneNumber="923068959085" />

      {/* Free Trial Class Booking Modal */}
      <TrialModal
        isOpen={isTrialModalOpen}
        onClose={() => setIsTrialModalOpen(false)}
        defaultCourseId={selectedCourseForTrial}
      />

      {/* Student, Teacher & Admin Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={handleLogin}
        initialMode={authInitialMode}
      />

    </div>
  );
}
