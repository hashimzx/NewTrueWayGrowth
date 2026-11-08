import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  GraduationCap, 
  Users, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  ShieldCheck,
  Star
} from 'lucide-react';
import { QuranCourseItem } from '../types/academy';
import { DEFAULT_QURAN_COURSES } from '../utils/academyDatabase';

interface QuranCoursesSectionProps {
  currency: 'USD' | 'GBP';
  onSelectCourse: (course: QuranCourseItem) => void;
  onBookFreeTrial: (courseId?: string) => void;
}

export const QuranCoursesSection: React.FC<QuranCoursesSectionProps> = ({
  currency,
  onSelectCourse,
  onBookFreeTrial
}) => {
  const [expandedSyllabusId, setExpandedSyllabusId] = useState<string | null>('course-madani-qaida');

  const toggleSyllabus = (id: string) => {
    setExpandedSyllabusId(prev => prev === id ? null : id);
  };

  const getPrice = (course: QuranCourseItem) => {
    return currency === 'GBP' ? `£${course.prices.GBP}` : `$${course.prices.USD}`;
  };

  return (
    <section id="courses" className="py-16 lg:py-24 bg-gradient-to-b from-[#faf8ff] via-white to-[#faf8ff] border-b border-[#6B1B7E]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-[#6B1B7E] text-xs font-bold border border-purple-200">
            <BookOpen className="w-3.5 h-3.5 text-[#E0107F]" />
            <span>Structured Learning Pathways</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Our Online Quran Courses
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Tailored 1-on-1 programs for children, beginners, sisters, and adults. Every course is taught by verified scholars with interactive digital screen sharing and daily progress tracking.
          </p>
        </div>

        {/* 5 Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DEFAULT_QURAN_COURSES.map((course, idx) => {
            const isExpanded = expandedSyllabusId === course.id;
            const isFeatured = course.featured;

            return (
              <div
                key={course.id}
                className={`flex flex-col justify-between bg-white rounded-3xl p-6 sm:p-7 transition-all duration-200 shadow-md hover:shadow-xl relative border ${
                  isFeatured 
                    ? 'border-[#6B1B7E]/30 ring-2 ring-[#6B1B7E]/10' 
                    : 'border-slate-200/80 hover:border-purple-200'
                }`}
              >
                {/* Course Number & Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="w-8 h-8 rounded-full bg-purple-100 text-[#6B1B7E] font-black text-xs flex items-center justify-center">
                    0{idx + 1}
                  </span>
                  {isFeatured && (
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#6B1B7E] to-[#E0107F] text-white text-[10px] font-black tracking-wide uppercase shadow-xs">
                      Most Enrolled
                    </span>
                  )}
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                    {course.ageGroup}
                  </span>
                </div>

                {/* Course Header */}
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight leading-snug">
                    {course.title}
                  </h3>
                  <p className="text-xs font-arabic text-emerald-800 font-bold" dir="rtl">
                    {course.arabicTitle}
                  </p>
                  <p className="text-xs font-semibold text-[#6B1B7E]">
                    {course.tagline}
                  </p>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed pt-1">
                    {course.description}
                  </p>
                </div>

                {/* Key Benefits */}
                <div className="my-5 pt-4 border-t border-slate-100 space-y-2">
                  <span className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Course Highlights:
                  </span>
                  <ul className="space-y-1.5">
                    {course.keyBenefits.map((benefit, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Syllabus Accordion */}
                <div className="mb-5 border border-purple-100 rounded-xl overflow-hidden bg-purple-50/40">
                  <button
                    onClick={() => toggleSyllabus(course.id)}
                    className="w-full px-3.5 py-2.5 flex items-center justify-between text-xs font-bold text-[#6B1B7E] hover:bg-purple-100/60 transition cursor-pointer"
                  >
                    <span>View Curriculum Modules ({course.syllabus.length})</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                  {isExpanded && (
                    <div className="p-3 bg-white space-y-2 text-xs border-t border-purple-100">
                      {course.syllabus.map((module, mIdx) => (
                        <div key={mIdx} className="space-y-1">
                          <span className="font-bold text-slate-800 block text-[11px] text-[#6B1B7E]">
                            {module.title}
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {module.topics.map((t, tIdx) => (
                              <span key={tIdx} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] rounded-md">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer: Price & CTA */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div>
                    <span className="block text-[11px] text-slate-500 font-semibold">Tuition Starting</span>
                    <span className="text-xl font-black text-[#6B1B7E]">
                      {getPrice(course)}
                      <span className="text-xs text-slate-500 font-normal"> / month</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onBookFreeTrial(course.id)}
                      className="px-4 py-2.5 bg-gradient-to-r from-[#6B1B7E] to-[#E0107F] hover:from-[#5B2A9A] hover:to-[#6B1B7E] text-white font-bold text-xs rounded-xl shadow-sm transition cursor-pointer flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Free Trial</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Global Class Info Banner */}
        <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-[#6B1B7E]/10 via-[#5B2A9A]/10 to-[#E0107F]/10 border border-[#6B1B7E]/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-bold text-slate-900 text-base flex items-center justify-center md:justify-start gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Not sure which course is right for your child?</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              Our Senior Scholars conduct a <strong>Free 15-Minute Level Assessment</strong> to recommend the ideal course and match you with the best male or female teacher.
            </p>
          </div>

          <button
            onClick={() => onBookFreeTrial()}
            className="px-6 py-3 bg-[#6B1B7E] hover:bg-[#5B2A9A] text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer whitespace-nowrap"
          >
            Request Free Assessment Call
          </button>
        </div>

      </div>
    </section>
  );
};
