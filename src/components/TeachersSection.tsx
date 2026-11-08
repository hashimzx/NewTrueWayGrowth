import React from 'react';
import { 
  Award, 
  GraduationCap, 
  Globe2, 
  Star, 
  BookOpen, 
  Sparkles, 
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { DEFAULT_TEACHERS } from '../utils/academyDatabase';

interface TeachersSectionProps {
  onBookTrialWithTeacher: (teacherId: string) => void;
}

export const TeachersSection: React.FC<TeachersSectionProps> = ({ onBookTrialWithTeacher }) => {
  return (
    <section id="teachers" className="py-16 lg:py-24 bg-gradient-to-b from-white via-[#faf8ff] to-white border-b border-[#6B1B7E]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-[#6B1B7E] text-xs font-bold border border-purple-200">
            <GraduationCap className="w-3.5 h-3.5 text-[#E0107F]" />
            <span>Certified Islamic Educators</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Meet Our Qualified Quran Teachers
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Our male and female instructors are certified scholars, Huffaz, and Ijazah holders with years of experience teaching international students with patience, kindness, and pedagogical mastery.
          </p>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
          {DEFAULT_TEACHERS.map((teacher) => (
            <div 
              key={teacher.id}
              className="bg-white rounded-3xl p-6 border border-purple-100 hover:border-purple-300 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between space-y-5"
            >
              {/* Photo & Gender Badge */}
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl mx-auto overflow-hidden shadow-md border-2 border-purple-100 bg-purple-50">
                  <img 
                    src={teacher.photo} 
                    alt={teacher.name}
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="absolute bottom-0 right-1/2 translate-x-10 translate-y-2">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider text-white shadow-xs ${
                    teacher.gender === 'female' ? 'bg-[#E0107F]' : 'bg-[#6B1B7E]'
                  }`}>
                    {teacher.gender === 'female' ? 'Female Instructor' : 'Male Scholar'}
                  </span>
                </div>
              </div>

              {/* Names & Rating */}
              <div className="text-center space-y-1">
                <h3 className="font-black text-slate-900 text-base leading-tight">
                  {teacher.name}
                </h3>
                {teacher.arabicName && (
                  <p className="text-xs font-arabic text-emerald-800 font-bold" dir="rtl">
                    {teacher.arabicName}
                  </p>
                )}
                <p className="text-xs font-semibold text-[#6B1B7E]">
                  {teacher.title}
                </p>
                <div className="flex items-center justify-center gap-1 text-xs text-amber-500 pt-1 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{teacher.rating}</span>
                  <span className="text-slate-400 font-normal">({teacher.activeStudentsCount} students)</span>
                </div>
              </div>

              {/* Qualifications & Ijazah */}
              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                <div>
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Education:</span>
                  <p className="text-slate-700 font-medium text-[11px] leading-tight">
                    {teacher.qualifications}
                  </p>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Sanad & Ijazah:</span>
                  <p className="text-emerald-800 font-medium text-[11px] leading-tight flex items-start gap-1">
                    <Award className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{teacher.ijazah}</span>
                  </p>
                </div>
              </div>

              {/* Languages & Specialties */}
              <div className="space-y-2">
                <div className="flex flex-wrap gap-1">
                  {teacher.languages.map((lang, lIdx) => (
                    <span key={lIdx} className="px-2 py-0.5 bg-purple-50 text-[#6B1B7E] font-semibold text-[10px] rounded-md">
                      {lang}
                    </span>
                  ))}
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] rounded-md">
                    {teacher.experienceYears}+ Yrs Exp
                  </span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {teacher.specialties.slice(0, 3).map((spec, sIdx) => (
                    <span key={sIdx} className="px-1.5 py-0.5 bg-emerald-50 text-emerald-800 text-[10px] rounded">
                      • {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onBookTrialWithTeacher(teacher.id)}
                className="w-full py-2.5 bg-purple-50 hover:bg-[#6B1B7E] text-[#6B1B7E] hover:text-white font-bold text-xs rounded-xl border border-purple-200 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Trial Class</span>
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
