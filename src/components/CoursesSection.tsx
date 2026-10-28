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
  ChevronUp
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
  const [activeTab, setActiveTab] = useState<'courses' | 'subscriptions'>('courses');
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12" id="pricing">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 border border-purple-200 rounded-full text-xs font-bold text-purple-900">
          <GraduationCap className="w-4 h-4 text-purple-600" />
          <span>Transparent International Tuition & Packages</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-purple-950">
          Course Tuition & All-Inclusive Membership
        </h2>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Affordable, flexible tuition suitable for families living in the UK, USA, Canada, Australia, and worldwide. Enroll in a single course or pick an all-access monthly membership.
        </p>

        {/* View Switcher Tabs */}
        <div className="inline-flex p-1 bg-purple-50 border border-purple-200 rounded-2xl mt-4">
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'courses'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-600 hover:text-purple-900'
            }`}
          >
            Individual Lifetime Courses
          </button>
          <button
            onClick={() => setActiveTab('subscriptions')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'subscriptions'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-600 hover:text-purple-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Monthly & Annual Passes</span>
          </button>
        </div>
      </div>

      {/* Courses Grid View */}
      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COURSES_DATA.map((course) => {
            const isExpanded = expandedSyllabusId === course.id;
            const price = course.prices[currency];

            return (
              <div
                key={course.id}
                className="bg-white border border-purple-100 hover:border-purple-300 rounded-3xl p-7 flex flex-col justify-between transition-all hover:shadow-xl relative overflow-hidden group shadow-sm"
              >
                {course.featured && (
                  <div className="absolute top-0 right-0 bg-purple-600 text-white text-[10px] font-black px-3.5 py-1 rounded-bl-xl uppercase tracking-wider">
                    Most Popular
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <span className="text-[11px] font-bold text-purple-600 uppercase tracking-widest">
                      {course.level}
                    </span>
                    <h3 className="text-xl font-bold text-purple-950 mt-1 group-hover:text-purple-700 transition-colors">
                      {course.title}
                    </h3>
                    <p className="font-arabic text-sm text-purple-900 mt-0.5 dir-rtl">
                      {course.arabicTitle}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Metadata Row */}
                  <div className="flex items-center gap-4 text-xs text-slate-600 py-2.5 border-y border-purple-100">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-purple-600" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-purple-600" />
                      <span>{course.totalLessons} Lessons</span>
                    </div>
                  </div>

                  {/* Instructor Bio Snippet */}
                  <div className="flex items-center gap-2.5 bg-purple-50/70 p-2.5 rounded-xl border border-purple-100">
                    <UserCheck className="w-4 h-4 text-purple-600 shrink-0" />
                    <div className="text-[11px] truncate">
                      <span className="font-bold text-purple-950 block truncate">{course.instructorName}</span>
                      <span className="text-slate-500 truncate block">{course.instructorTitle}</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2 pt-1">
                    {course.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Expandable Syllabus preview */}
                  <div>
                    <button
                      onClick={() => setExpandedSyllabusId(isExpanded ? null : course.id)}
                      className="text-xs font-bold text-purple-700 hover:text-purple-950 flex items-center gap-1 transition"
                    >
                      <span>{isExpanded ? 'Hide Syllabus' : 'View Course Syllabus'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {isExpanded && (
                      <div className="mt-3 space-y-2 bg-purple-50/60 p-3 rounded-2xl border border-purple-100 text-xs text-slate-700">
                        {course.syllabus.map((mod, idx) => (
                          <div key={idx} className="space-y-1">
                            <span className="font-bold text-purple-950 block">{mod.title}</span>
                            <ul className="list-disc list-inside text-slate-600 pl-1 text-[11px] space-y-0.5">
                              {mod.topics.map((top, tIdx) => (
                                <li key={tIdx}>{top}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Price and Enrollment CTA */}
                <div className="mt-6 pt-4 border-t border-purple-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Course Fee</span>
                    <div className="text-2xl font-black text-purple-950">
                      <span>{symbol}{price}</span>
                      <span className="text-xs font-normal text-slate-500 ml-1">one-time</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onEnrollCourse(course)}
                    className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-purple-600/20"
                  >
                    <span>Enroll Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Subscription Plans View */}
      {activeTab === 'subscriptions' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SUBSCRIPTION_TIERS.map((tier) => {
            const price = tier.prices[currency];

            return (
              <div
                key={tier.id}
                className={`bg-white rounded-3xl p-8 flex flex-col justify-between transition-all relative ${
                  tier.badge
                    ? 'border-2 border-purple-600 shadow-xl ring-2 ring-purple-600/10'
                    : 'border border-purple-100 hover:border-purple-300 shadow-sm'
                }`}
              >
                {tier.badge && (
                  <div className="absolute top-0 right-8 -translate-y-1/2 bg-purple-600 text-white text-xs font-black px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
                    {tier.badge}
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-black text-purple-950">{tier.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">{tier.tagline}</p>
                  </div>

                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-purple-950">{symbol}{price}</span>
                      <span className="text-xs text-slate-500 font-medium">{tier.period}</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-purple-100">
                    <p className="text-xs font-bold uppercase tracking-wider text-purple-950">Plan Inclusions:</p>
                    {tier.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-purple-100">
                  <button
                    onClick={() => onSubscribe(tier)}
                    className={`w-full py-3.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-md ${
                      tier.badge
                        ? 'bg-purple-600 hover:bg-purple-700 text-white glow-purple-sm'
                        : 'bg-purple-50 hover:bg-purple-100 text-purple-950 border border-purple-200'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Select {tier.name}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Trust & Guarantee Banner */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/10 text-amber-300 rounded-2xl shrink-0 border border-white/10">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-base font-bold">100% Satisfaction & Tajweed Guarantee</h4>
            <p className="text-xs text-purple-200 mt-0.5">
              If your pronunciation does not significantly improve within 14 days, receive a full refund without questions.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs text-purple-200 shrink-0">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            3-Day Free Trial Available
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            256-Bit Encrypted International Checkout
          </span>
        </div>
      </div>
    </div>
  );
};
