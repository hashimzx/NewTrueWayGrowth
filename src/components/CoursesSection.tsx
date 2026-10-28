import React, { useState } from 'react';
import { Course, SubscriptionTier } from '../types';
import { COURSES_DATA, SUBSCRIPTION_TIERS } from '../data/coursesData';
import { 
  GraduationCap, 
  Check, 
  Sparkles, 
  Clock, 
  BookOpen, 
  UserCheck, 
  ArrowRight, 
  ShieldCheck, 
  CreditCard,
  ChevronDown,
  ChevronUp,
  Award,
  Users,
  CheckCircle2,
  Gift
} from 'lucide-react';

interface CoursesSectionProps {
  currency: 'USD' | 'GBP' | 'EUR' | 'CAD' | 'AUD';
  onEnrollCourse: (course: Course) => void;
  onSubscribe: (tier: SubscriptionTier) => void;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({
  currency,
  onEnrollCourse,
  onSubscribe
}) => {
  const [activeTab, setActiveTab] = useState<'hifz' | 'courses' | 'subscriptions'>('hifz');
  const [expandedSyllabusId, setExpandedSyllabusId] = useState<string | null>(null);

  const getCurrencySymbol = (curr: string) => {
    switch (curr) {
      case 'GBP': return '£';
      case 'EUR': return '€';
      case 'CAD': return 'CA$';
      case 'AUD': return 'AU$';
      default: return '$';
    }
  };

  const symbol = getCurrencySymbol(currency);

  // Hifz packages grounded in https://www.equranschool.com/quran-memorization-course
  const HIFZ_PRICING_PLANS = [
    {
      id: 'hifz-starter',
      title: 'Starter Hifz Program',
      arabicTitle: 'حفظ جزء عم والسور المختارة',
      tagline: "Juz 'Amma & Essential Daily Surahs",
      description: 'Ideal for young children and beginners starting their memorization journey. Focuses on Surah An-Naba to An-Nas with verified Tajweed.',
      prices: { GBP: 49, USD: 65, EUR: 59, CAD: 85, AUD: 95 },
      period: 'per month',
      sessions: '2-3 Sessions / Week',
      duration: '30 mins per session',
      features: [
        '1-on-1 Private Certified Hafiz/Hafiza Tutor',
        'Daily Sabaq (New 3-5 Verses) Verification',
        'Sabqi (Last 5-10 Verses) Retention Checks',
        'Manzil (Permanent Cumulative Review)',
        'Free 3-Day Live Trial (No Commitment)',
        '20% Sibling & Family Discount Available'
      ],
      badge: null,
      courseObj: {
        id: 'course-hifz-starter',
        title: 'Starter Hifz Program (Juz Amma)',
        arabicTitle: 'حفظ جزء عم',
        description: 'Structured 1-on-1 Hifz program covering Juz 30 and essential Surahs with Sabaq, Sabqi, and Manzil methods.',
        level: 'Beginner' as const,
        duration: 'Ongoing Monthly',
        totalLessons: 48,
        prices: { GBP: 49, USD: 65, EUR: 59, CAD: 85, AUD: 95 },
        instructorName: 'Qari Abdul Basit & Certified Huffaz',
        instructorTitle: 'Senior Hifz Director (Ijazah holder)',
        syllabus: [
          { title: 'Evaluation & Makharij Diagnostic', topics: ['Voice analysis', 'Reading fluency check'] },
          { title: 'Surah An-Nas to Al-Fil Mastery', topics: ['Sabaq recitation', 'Linking verses'] }
        ]
      }
    },
    {
      id: 'hifz-standard',
      title: 'Standard Hifz Track',
      arabicTitle: 'المسار المتوسط لحفظ القرآن',
      tagline: '5 to 10 Selected Juz / Consecutive Juz',
      description: 'Our most popular track. Tailored for committed students memorizing Surah Al-Baqarah, Yasin, Al-Mulk, Al-Kahf, Ar-Rahman, or consecutive Juz.',
      prices: { GBP: 79, USD: 99, EUR: 89, CAD: 135, AUD: 149 },
      period: 'per month',
      sessions: '4 Sessions / Week',
      duration: '35-40 mins per session',
      features: [
        'Dedicated 1-on-1 Hafiz Mentor (Male / Female)',
        'Daily Sabaq (Half-Page to 1 Page per day)',
        'Rigorous Sabqi (Recent 5-10 pages daily)',
        'Manzil Systematic Rolling Revision',
        'Audio Recordings of Your Recitation Feedback',
        'Monthly Memorization Progress Transcript',
        '20% Sibling Discount & Flexible 24/7 Scheduling'
      ],
      badge: 'Most Popular',
      courseObj: {
        id: 'course-hifz-standard',
        title: 'Standard Hifz Track (5-10 Juz)',
        arabicTitle: 'مسار الحفظ المتوسط',
        description: 'Comprehensive 1-on-1 Hifz track for memorizing 5 to 10 Juz with audio review and weekly teacher evaluations.',
        level: 'Intermediate' as const,
        duration: 'Ongoing Monthly',
        totalLessons: 96,
        prices: { GBP: 79, USD: 99, EUR: 89, CAD: 135, AUD: 149 },
        instructorName: 'Ustadh & Ustadha Certified Huffaz',
        instructorTitle: 'Authorized Quran Mentors',
        syllabus: [
          { title: 'Consolidation of Memorized Surahs', topics: ['Tajweed check', 'Ayah linking'] },
          { title: 'Structured Sabaq Cycle', topics: ['Memorization pace', 'Sabqi drills'] }
        ]
      }
    },
    {
      id: 'hifz-intensive',
      title: 'Intensive Full Quran Hifz',
      arabicTitle: 'البرنامج المكثف لحفظ القرآن كاملاً وإجازة',
      tagline: 'Complete 30 Juz Memorization & Sanad Ijazah',
      description: 'Full-time memorization track for students aiming to complete the entire Holy Quran with verified chain of transmission (Sanad) and Ijazah certification.',
      prices: { GBP: 129, USD: 159, EUR: 145, CAD: 215, AUD: 239 },
      period: 'per month',
      sessions: '5 Sessions / Week',
      duration: '45-60 mins per session',
      features: [
        'Elite Senior Hafiz with Sanad Mutassil (Connected Chain)',
        'Full 30 Juz Hifz with Rigorous Mutashabihat (Similar Verses) Mastery',
        'Daily 3-Pillar System (Sabaq + Sabqi + 1 Full Juz Manzil)',
        'Authentic Ijazah with Sanad upon Completion',
        'Direct WhatsApp Teacher Guidance & Daily Accountability',
        'Priority 24/7 Rescheduling & Lifetime Retention Tracking',
        '20% Sibling / Family Member Discount Included'
      ],
      badge: 'Ijazah Track',
      courseObj: {
        id: 'course-hifz-intensive',
        title: 'Intensive Full Quran Hifz with Ijazah',
        arabicTitle: 'حفظ القرآن كاملاً مع الإجازة',
        description: 'Intensive 5-day/week full Quran memorization program leading to authentic Sanad and worldwide-recognized Ijazah certification.',
        level: 'Advanced' as const,
        duration: 'Ongoing Monthly',
        totalLessons: 180,
        prices: { GBP: 129, USD: 159, EUR: 145, CAD: 215, AUD: 239 },
        instructorName: 'Sheikh Abdul Basit & Senior Sanad Holders',
        instructorTitle: 'Grand Ijazah Faculty',
        syllabus: [
          { title: 'Foundational Retention Architecture', topics: ['Mutashabihat rules', 'Daily 1 Juz review'] },
          { title: 'Intensive Sanad Recitation', topics: ['Full page Sabaq', 'Pronunciation precision'] }
        ]
      }
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12" id="pricing">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 border border-[#6B1B7E]/20 rounded-full text-xs font-bold text-[#6B1B7E]">
          <GraduationCap className="w-4 h-4 text-[#E0107F]" />
          <span>Transparent International Tuition & Packages</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#6B1B7E]">
          Course Tuition & Hifz Memorization Packages
        </h2>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Affordable, flexible tuition suitable for families living in the UK, USA, Canada, Australia, and worldwide. Pay securely via Credit/Debit Card or PayPal with full Buyer Protection.
        </p>

        {/* Payment Methods & Sibling Discount Ribbon */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
            <Gift className="w-3.5 h-3.5 text-emerald-600" />
            <span>20% Sibling & Family Discount on All Programs</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold">
            <CreditCard className="w-3.5 h-3.5 text-[#0070BA]" />
            <span>Credit/Debit Card & PayPal Accepted Worldwide</span>
          </div>
        </div>

        {/* View Switcher Tabs (Hifz Programs, Individual Courses, Passes) */}
        <div className="inline-flex flex-wrap p-1.5 bg-purple-50/90 border border-[#6B1B7E]/20 rounded-2xl mt-4 max-w-full">
          <button
            onClick={() => setActiveTab('hifz')}
            className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'hifz'
                ? 'bg-gradient-to-r from-[#6B1B7E] to-[#E0107F] text-white shadow-md'
                : 'text-slate-700 hover:text-[#6B1B7E]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-200" />
            <span>Quran Hifz (Memorization)</span>
            <span className="text-[9px] font-black px-1.5 py-0.2 rounded-full bg-pink-500 text-white ml-1">New</span>
          </button>

          <button
            onClick={() => setActiveTab('courses')}
            className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'courses'
                ? 'bg-[#6B1B7E] text-white shadow-md'
                : 'text-slate-700 hover:text-[#6B1B7E]'
            }`}
          >
            Individual Lifetime Courses
          </button>

          <button
            onClick={() => setActiveTab('subscriptions')}
            className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'subscriptions'
                ? 'bg-[#6B1B7E] text-white shadow-md'
                : 'text-slate-700 hover:text-[#6B1B7E]'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-300" />
            <span>Monthly & Annual Passes</span>
          </button>
        </div>
      </div>

      {/* 1. Quran Memorization (Hifz) Programs View (From equranschool.com/quran-memorization-course) */}
      {activeTab === 'hifz' && (
        <div className="space-y-8 animate-fade-in">
          
          {/* Method Explainer Pill */}
          <div className="bg-gradient-to-r from-purple-50 via-white to-pink-50 border border-[#6B1B7E]/20 rounded-3xl p-6 sm:p-7 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-[#6B1B7E] flex items-center justify-center font-black text-sm shrink-0">1</div>
                <div>
                  <h4 className="text-xs font-black text-[#6B1B7E] uppercase tracking-wide">Sabaq (Daily New Lesson)</h4>
                  <p className="text-xs text-slate-600 mt-1">Student recites new verses to tutor with flawless Tajweed before committing to memory.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-pink-100 text-[#E0107F] flex items-center justify-center font-black text-sm shrink-0">2</div>
                <div>
                  <h4 className="text-xs font-black text-[#E0107F] uppercase tracking-wide">Sabqi (Recent Consolidation)</h4>
                  <p className="text-xs text-slate-600 mt-1">Daily recitation of the last 5-10 pages to ensure new memorization does not fade away.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-100 text-[#5B2A9A] flex items-center justify-center font-black text-sm shrink-0">3</div>
                <div>
                  <h4 className="text-xs font-black text-[#5B2A9A] uppercase tracking-wide">Manzil (Permanent Revision)</h4>
                  <p className="text-xs text-slate-600 mt-1">Systematic rolling review of older Juz so the student never forgets a single Surah.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HIFZ_PRICING_PLANS.map((plan) => {
              const price = plan.prices[currency];

              return (
                <div
                  key={plan.id}
                  className={`bg-white rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all relative shadow-md hover:shadow-2xl border ${
                    plan.badge === 'Most Popular'
                      ? 'border-2 border-[#E0107F] ring-4 ring-[#E0107F]/10'
                      : 'border-[#6B1B7E]/20 hover:border-[#6B1B7E]/40'
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute top-0 right-8 -translate-y-1/2 bg-gradient-to-r from-[#6B1B7E] to-[#E0107F] text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
                      {plan.badge}
                    </div>
                  )}

                  <div className="space-y-5">
                    <div>
                      <span className="text-[10px] font-bold text-[#E0107F] uppercase tracking-widest block">
                        {plan.sessions}
                      </span>
                      <h3 className="text-2xl font-black text-[#6B1B7E] mt-1">
                        {plan.title}
                      </h3>
                      <p className="font-arabic text-sm text-[#5B2A9A] mt-0.5 dir-rtl">
                        {plan.arabicTitle}
                      </p>
                      <p className="text-xs text-slate-500 mt-2">
                        {plan.description}
                      </p>
                    </div>

                    {/* Price Tag */}
                    <div className="py-3 px-4 bg-purple-50/70 rounded-2xl border border-purple-100 flex items-baseline justify-between">
                      <div>
                        <span className="text-3xl sm:text-4xl font-black text-[#6B1B7E]">
                          {symbol}{price}
                        </span>
                        <span className="text-xs text-slate-500 font-medium ml-1">/{plan.period}</span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        20% Off Sibling
                      </span>
                    </div>

                    {/* Session Metadata */}
                    <div className="flex items-center gap-3 text-xs text-slate-600 py-2 border-y border-purple-100">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#E0107F]" />
                        <span>{plan.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <UserCheck className="w-3.5 h-3.5 text-[#6B1B7E]" />
                        <span>1-on-1 Private Tutor</span>
                      </div>
                    </div>

                    {/* Features list */}
                    <div className="space-y-2.5">
                      <p className="text-xs font-black uppercase tracking-wider text-slate-900">
                        What's Included:
                      </p>
                      {plan.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-[#E0107F] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Enroll Action with Card & PayPal */}
                  <div className="mt-8 pt-4 border-t border-purple-100 space-y-2">
                    <button
                      onClick={() => onEnrollCourse(plan.courseObj as unknown as Course)}
                      className={`w-full py-3.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-2 shadow-md cursor-pointer ${
                        plan.badge === 'Most Popular'
                          ? 'bg-gradient-to-r from-[#6B1B7E] to-[#E0107F] text-white hover:opacity-95 shadow-[#E0107F]/20'
                          : 'bg-[#6B1B7E] text-white hover:bg-[#5B2A9A]'
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Enroll with Card or PayPal</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <p className="text-[10px] text-center text-slate-400">
                      Free 3-Day Trial · Cancel or reschedule anytime 24/7
                    </p>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Individual Courses Grid View */}
      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
          {COURSES_DATA.map((course) => {
            const isExpanded = expandedSyllabusId === course.id;
            const price = course.prices[currency];

            return (
              <div
                key={course.id}
                className="bg-white border border-[#6B1B7E]/20 hover:border-[#6B1B7E]/40 rounded-3xl p-7 flex flex-col justify-between transition-all hover:shadow-xl relative overflow-hidden group shadow-sm"
              >
                {course.featured && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-[#6B1B7E] to-[#E0107F] text-white text-[10px] font-black px-3.5 py-1 rounded-bl-xl uppercase tracking-wider">
                    Most Popular
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <span className="text-[11px] font-bold text-[#E0107F] uppercase tracking-widest">
                      {course.level}
                    </span>
                    <h3 className="text-xl font-bold text-[#6B1B7E] mt-1 group-hover:text-[#5B2A9A] transition-colors">
                      {course.title}
                    </h3>
                    <p className="font-arabic text-sm text-[#5B2A9A] mt-0.5 dir-rtl">
                      {course.arabicTitle}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Metadata Row */}
                  <div className="flex items-center gap-4 text-xs text-slate-600 py-2.5 border-y border-purple-100">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#E0107F]" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-[#6B1B7E]" />
                      <span>{course.totalLessons} Lessons</span>
                    </div>
                  </div>

                  {/* Instructor Bio Snippet */}
                  <div className="flex items-center gap-2.5 bg-purple-50/70 p-2.5 rounded-xl border border-purple-100">
                    <UserCheck className="w-4 h-4 text-[#6B1B7E] shrink-0" />
                    <div className="text-[11px] truncate">
                      <span className="font-bold text-[#6B1B7E] block truncate">{course.instructorName}</span>
                      <span className="text-slate-500 truncate block">{course.instructorTitle}</span>
                    </div>
                  </div>

                  {/* Syllabus Dropdown Preview */}
                  <div className="pt-2">
                    <button
                      onClick={() => setExpandedSyllabusId(isExpanded ? null : course.id)}
                      className="text-xs font-bold text-[#6B1B7E] hover:text-[#E0107F] flex items-center justify-between w-full py-1 cursor-pointer"
                    >
                      <span>{isExpanded ? 'Hide Course Curriculum' : 'View Course Curriculum'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {isExpanded && (
                      <div className="mt-2.5 space-y-2 bg-purple-50/50 p-3 rounded-xl border border-purple-100 animate-in fade-in duration-200">
                        {course.syllabus.map((syl, i) => (
                          <div key={i} className="text-[11px] border-b border-purple-100/60 pb-1.5 last:border-0 last:pb-0">
                            <span className="font-bold text-[#6B1B7E]">{syl.title}</span>
                            <ul className="list-disc list-inside text-slate-500 mt-0.5 space-y-0.5">
                              {syl.topics.map((t, idx) => (
                                <li key={idx}>{t}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="mt-6 pt-4 border-t border-purple-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Full Lifetime Access</span>
                    <span className="text-2xl font-black text-[#6B1B7E]">{symbol}{price}</span>
                  </div>

                  <button
                    onClick={() => onEnrollCourse(course)}
                    className="bg-gradient-to-r from-[#6B1B7E] to-[#E0107F] hover:opacity-95 text-white text-xs font-black px-5 py-2.5 rounded-xl shadow-md transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Card / PayPal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 3. Subscription Plans View */}
      {activeTab === 'subscriptions' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
          {SUBSCRIPTION_TIERS.map((tier) => {
            const price = tier.prices[currency];

            return (
              <div
                key={tier.id}
                className={`bg-white rounded-3xl p-8 flex flex-col justify-between transition-all relative ${
                  tier.badge
                    ? 'border-2 border-[#E0107F] shadow-xl ring-2 ring-[#E0107F]/10'
                    : 'border border-[#6B1B7E]/20 hover:border-[#6B1B7E]/40 shadow-sm'
                }`}
              >
                {tier.badge && (
                  <div className="absolute top-0 right-8 -translate-y-1/2 bg-gradient-to-r from-[#6B1B7E] to-[#E0107F] text-white text-xs font-black px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
                    {tier.badge}
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-black text-[#6B1B7E]">{tier.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">{tier.tagline}</p>
                  </div>

                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-[#6B1B7E]">{symbol}{price}</span>
                      <span className="text-xs text-slate-500 font-medium">{tier.period}</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-purple-100">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#6B1B7E]">Plan Inclusions:</p>
                    {tier.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-[#E0107F] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-purple-100">
                  <button
                    onClick={() => onSubscribe(tier)}
                    className={`w-full py-3.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-md cursor-pointer ${
                      tier.badge
                        ? 'bg-gradient-to-r from-[#6B1B7E] to-[#E0107F] text-white hover:opacity-95'
                        : 'bg-purple-50 hover:bg-purple-100 text-[#6B1B7E] border border-purple-200'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Select {tier.name} (Card / PayPal)</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Trust & Guarantee Banner */}
      <div className="bg-gradient-to-r from-[#6B1B7E] via-[#5B2A9A] to-[#E0107F] text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/10 text-pink-200 rounded-2xl shrink-0 border border-white/20">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-base font-bold">100% Satisfaction & Tajweed Guarantee</h4>
            <p className="text-xs text-purple-100 mt-0.5">
              If your or your child's recitation does not significantly improve within 14 days, receive a full refund without hassle.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-purple-100 shrink-0">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            3-Day Free Trial
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Card & PayPal Buyer Protected
          </span>
        </div>
      </div>
    </div>
  );
};
