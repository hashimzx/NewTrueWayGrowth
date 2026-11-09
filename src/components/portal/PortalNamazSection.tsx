import React, { useState } from 'react';
import { 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  Volume2, 
  AlertTriangle, 
  BookOpen, 
  ChevronRight, 
  Eye, 
  Award,
  Layers,
  Heart,
  Droplets,
  Bookmark,
  BookmarkCheck
} from 'lucide-react';
import { 
  FIVE_DAILY_PRAYERS_RAKATS, 
  WUDU_STEPS, 
  GHUSL_METHOD, 
  TAYAMMUM_METHOD, 
  JANAZAH_GUIDE, 
  COMMON_SALAH_MISTAKES, 
  SPECIAL_PRAYERS 
} from '../../data/namazLearningData';
import { SALAH_STEPS, SalahStep } from '../../data/islamicResourcesData';
import { audioEngine } from '../../utils/audioSynth';
import { toggleStudentBookmark, isItemBookmarked } from '../../utils/studentLearningStorage';

interface PortalNamazSectionProps {
  studentId: string;
  studentName: string;
  initialTab?: 'procedure' | 'wudu' | 'rakats' | 'janazah' | 'mistakes' | 'special';
  onBookmarkChanged?: () => void;
}

export const PortalNamazSection: React.FC<PortalNamazSectionProps> = ({
  studentId,
  studentName,
  initialTab = 'procedure',
  onBookmarkChanged
}) => {
  const [subTab, setSubTab] = useState<'procedure' | 'wudu' | 'rakats' | 'janazah' | 'mistakes' | 'special'>(initialTab);
  const [speakingStep, setSpeakingStep] = useState<number | null>(null);
  const [visualKidsMode, setVisualKidsMode] = useState<boolean>(true);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const handleSpeak = async (arabic: string, stepNum: number) => {
    if (speakingStep === stepNum) {
      audioEngine.stopVoice();
      setSpeakingStep(null);
      return;
    }
    setSpeakingStep(stepNum);
    await audioEngine.speakArabic(arabic, 0.85);
    setSpeakingStep(null);
  };

  const handleBookmarkStep = (step: SalahStep) => {
    toggleStudentBookmark(studentId, studentName, {
      type: 'namaz',
      title: `Salah Step ${step.stepNumber}: ${step.postureName}`,
      arabicText: step.recitationArabic,
      englishTranslation: step.recitationMeaning,
      reference: step.description
    });
    if (onBookmarkChanged) onBookmarkChanged();
  };

  const currentStep = SALAH_STEPS[currentStepIndex];
  const isCurrentBookmarked = isItemBookmarked(studentId, studentName, 'namaz', {
    title: `Salah Step ${currentStep.stepNumber}: ${currentStep.postureName}`
  });

  return (
    <div className="space-y-6">
      
      {/* Top Hero Banner */}
      <div className="bg-gradient-to-r from-[#6E1373] via-[#851C82] to-[#561F79] text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-purple-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Complete Step-by-Step Salah Academy</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Namaz / Salah Learning Portal
            </h2>
            <p className="text-xs sm:text-sm text-purple-100 max-w-2xl">
              Master the five daily prayers, step-by-step Wudu, Ghusl, Tayammum, postures, Arabic recitations with English translations, common mistakes, Namaz-e-Janazah, and special prayers.
            </p>
          </div>

          {/* Kids / Beginners Visual Mode Toggle */}
          <button
            onClick={() => setVisualKidsMode(!visualKidsMode)}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer shadow-xs ${
              visualKidsMode
                ? 'bg-amber-400 text-slate-950'
                : 'bg-white/20 hover:bg-white/30 text-white'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>{visualKidsMode ? 'Visual Guided Mode (Active)' : 'Standard View'}</span>
          </button>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {[
          { id: 'procedure', label: '1. Step-by-Step Namaz', icon: Sparkles },
          { id: 'rakats', label: '2. 5 Prayers & Rakats', icon: Clock },
          { id: 'wudu', label: '3. Wudu, Ghusl & Tayammum', icon: Droplets },
          { id: 'janazah', label: '4. Namaz-e-Janazah (Funeral)', icon: Heart },
          { id: 'mistakes', label: '5. Common Mistakes to Avoid', icon: AlertTriangle },
          { id: 'special', label: '6. Jumu\'ah, Tahajjud & Eid', icon: BookOpen }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id as typeof subTab)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold shrink-0 transition cursor-pointer flex items-center gap-2 ${
                subTab === tab.id
                  ? 'bg-[#6E1373] text-white shadow-sm'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: STEP-BY-STEP NAMAZ PROCEDURE */}
      {subTab === 'procedure' && (
        <div className="space-y-6">
          {/* Visual Step-by-Step Card (Interactive for Kids & Beginners) */}
          {visualKidsMode && (
            <div className="bg-white rounded-3xl border border-purple-200 p-6 sm:p-8 shadow-xs space-y-6">
              
              {/* Stepper Dots Bar */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold text-[#851C82] uppercase tracking-wider block">
                    Interactive Walkthrough
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900">
                    Step {currentStep.stepNumber} of {SALAH_STEPS.length}: {currentStep.postureName}
                  </h3>
                </div>

                <div className="flex items-center gap-1.5">
                  {/* Audio */}
                  <button
                    onClick={() => handleSpeak(currentStep.recitationArabic, currentStep.stepNumber)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                      speakingStep === currentStep.stepNumber
                        ? 'bg-amber-400 text-slate-950 animate-pulse'
                        : 'bg-purple-100 hover:bg-purple-200 text-[#6E1373]'
                    }`}
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>{speakingStep === currentStep.stepNumber ? 'Reciting...' : 'Listen'}</span>
                  </button>

                  {/* Bookmark */}
                  <button
                    onClick={() => handleBookmarkStep(currentStep)}
                    className={`p-2 rounded-xl text-xs transition cursor-pointer ${
                      isCurrentBookmarked
                        ? 'bg-purple-100 text-[#6E1373]'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                    }`}
                    title="Bookmark this Salah step"
                  >
                    {isCurrentBookmarked ? <BookmarkCheck className="w-4 h-4 fill-[#6E1373]" /> : <Bookmark className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Step Navigation Dots */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                {SALAH_STEPS.map((step, idx) => (
                  <button
                    key={step.stepNumber}
                    onClick={() => setCurrentStepIndex(idx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition cursor-pointer flex items-center gap-1 ${
                      currentStepIndex === idx
                        ? 'bg-[#6E1373] text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                    }`}
                  >
                    <span>{step.stepNumber}.</span>
                    <span className="hidden sm:inline">{step.postureName.split(' ')[0]}</span>
                  </button>
                ))}
              </div>

              {/* Main Step Detail Area */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                
                {/* Visual Arabic & Illustration Box */}
                <div className="md:col-span-5 bg-gradient-to-br from-purple-50 to-pink-50/60 rounded-3xl p-6 text-center border border-purple-100 space-y-4">
                  <span className="px-3 py-1 rounded-full bg-purple-200/80 text-[#561F79] text-xs font-bold">
                    Posture #{currentStep.stepNumber}
                  </span>
                  
                  <div className="text-3xl sm:text-4xl font-arabic font-bold text-[#6E1373] py-2">
                    {currentStep.arabicName}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {currentStep.description}
                  </p>
                </div>

                {/* Recitation & English Translation Box */}
                <div className="md:col-span-7 space-y-4">
                  
                  {/* Arabic Recitation */}
                  <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200/80 text-right space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block text-left">
                      Arabic Recitation
                    </span>
                    <p dir="rtl" className="text-xl sm:text-2xl font-arabic text-slate-900 leading-loose">
                      {currentStep.recitationArabic}
                    </p>
                  </div>

                  {/* Transliteration */}
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                      English Transliteration
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-purple-900 italic">
                      {currentStep.recitationTransliteration}
                    </p>
                  </div>

                  {/* English Translation */}
                  <div className="bg-purple-50/50 rounded-2xl p-4 border border-purple-100">
                    <span className="text-[10px] font-bold text-purple-800 uppercase tracking-wider block mb-1">
                      Complete English Translation & Meaning
                    </span>
                    <p className="text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed">
                      {currentStep.recitationMeaning}
                    </p>
                  </div>

                  {/* Key Points */}
                  <div className="space-y-1 pt-1">
                    <span className="text-xs font-bold text-slate-700 block">Posture Guidelines:</span>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {currentStep.keyPoints.map((kp, kIdx) => (
                        <li key={kIdx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{kp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Prev / Next Controls */}
              <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                <button
                  onClick={() => setCurrentStepIndex(Math.max(0, currentStepIndex - 1))}
                  disabled={currentStepIndex === 0}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  ← Previous Posture
                </button>

                <span className="text-xs text-slate-400 font-semibold">
                  {currentStepIndex + 1} of {SALAH_STEPS.length}
                </span>

                <button
                  onClick={() => setCurrentStepIndex(Math.min(SALAH_STEPS.length - 1, currentStepIndex + 1))}
                  disabled={currentStepIndex === SALAH_STEPS.length - 1}
                  className="px-4 py-2 rounded-xl bg-[#6E1373] hover:bg-[#561F79] text-xs font-semibold text-white transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  Next Posture →
                </button>
              </div>
            </div>
          )}

          {/* Full List of All 8 Postures */}
          <div className="space-y-4">
            <h4 className="text-base sm:text-lg font-bold text-slate-900">
              Complete Salah Posture Reference Catalog
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SALAH_STEPS.map((step) => (
                <div
                  key={step.stepNumber}
                  className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-[#6E1373] text-xs font-bold">
                      Step {step.stepNumber}
                    </span>
                    <button
                      onClick={() => handleSpeak(step.recitationArabic, step.stepNumber)}
                      className="text-xs text-[#6E1373] hover:underline flex items-center gap-1 cursor-pointer font-semibold"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Listen</span>
                    </button>
                  </div>

                  <h5 className="font-bold text-slate-900 text-sm sm:text-base">
                    {step.postureName}
                  </h5>

                  <p dir="rtl" className="text-lg font-arabic font-bold text-purple-950 text-right py-1">
                    {step.recitationArabic}
                  </p>

                  <p className="text-xs text-purple-900 italic">
                    {step.recitationTransliteration}
                  </p>

                  <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-700">
                    <strong className="text-slate-900">English:</strong> {step.recitationMeaning}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: FIVE DAILY PRAYERS & NUMBER OF RAKATS */}
      {subTab === 'rakats' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                The Five Daily Obligatory Prayers & Total Rakats
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Detailed breakdown of Sunnah Mu'akkadah, Fard, Sunnah Ghair Mu'akkadah, Nafl, and Witr for all five daily prayers.
              </p>
            </div>

            <div className="space-y-5">
              {FIVE_DAILY_PRAYERS_RAKATS.map((prayer, pIdx) => (
                <div 
                  key={pIdx}
                  className="bg-purple-50/40 rounded-3xl p-5 sm:p-6 border border-purple-100 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-100 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-lg font-black text-slate-900">{prayer.prayerName}</h4>
                        <span className="text-sm font-arabic font-bold text-[#6E1373]">{prayer.arabicName}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">Time window: {prayer.timeWindow}</p>
                    </div>

                    <div className="px-3.5 py-1.5 rounded-2xl bg-[#6E1373] text-white text-xs font-bold text-center shrink-0">
                      Total: {prayer.totalRakats} Rakats
                    </div>
                  </div>

                  {/* Rakat Breakdown Chips / Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {prayer.breakdown.map((item, bIdx) => (
                      <div key={bIdx} className="bg-white rounded-2xl p-3.5 border border-purple-100 space-y-1 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900">{item.count} Rakats</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            item.type === 'Fard' ? 'bg-emerald-100 text-emerald-800' :
                            item.type === 'Witr' ? 'bg-amber-100 text-amber-800' :
                            'bg-purple-100 text-[#6E1373]'
                          }`}>
                            {item.type}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-tight">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-slate-700 italic bg-white/70 rounded-xl p-2.5 border border-purple-100">
                    <strong>Significance:</strong> {prayer.significance}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: WUDU, GHUSL & TAYAMMUM */}
      {subTab === 'wudu' && (
        <div className="space-y-6">
          
          {/* Wudu Guide */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  Step-by-Step Method of Wudu (Ablution)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  The Prophet ﷺ said: "Cleanliness is half of faith." Follow the authentic sequence.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {WUDU_STEPS.map((ws) => (
                <div key={ws.step} className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                      {ws.step}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      ws.isObligatory ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {ws.isObligatory ? 'Fard (Obligatory)' : 'Sunnah'}
                    </span>
                  </div>

                  <h5 className="font-bold text-slate-900 text-sm">
                    {ws.title}
                  </h5>
                  <p className="text-xs font-arabic font-bold text-blue-900 text-right">
                    {ws.arabicName}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {ws.description}
                  </p>

                  {ws.duaArabic && (
                    <div className="bg-white rounded-xl p-2.5 border border-slate-200 text-xs space-y-1">
                      <p dir="rtl" className="font-arabic font-bold text-blue-950 text-right">
                        {ws.duaArabic}
                      </p>
                      <p className="italic text-[11px] text-slate-600">
                        {ws.duaTransliteration}
                      </p>
                      <p className="text-[11px] text-slate-700 font-medium">
                        {ws.duaMeaning}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Ghusl & Tayammum Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Ghusl Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-lg">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <span>{GHUSL_METHOD.title}</span>
              </div>
              <p className="text-xs text-slate-600">
                Required after major ritual impurity to enter into a state of purity for Salah and Quran touch.
              </p>

              <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100 space-y-2">
                <span className="text-xs font-bold text-[#6E1373] block">3 Obligatory Acts (Fara'id):</span>
                <ul className="space-y-1 text-xs text-slate-700 list-disc list-inside">
                  {GHUSL_METHOD.obligations.map((ob, idx) => (
                    <li key={idx}>{ob}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-1.5 text-xs text-slate-700">
                <span className="font-bold text-slate-900 block">Complete Recommended Sunnah Steps:</span>
                {GHUSL_METHOD.steps.map((st, sIdx) => (
                  <p key={sIdx} className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                    {st}
                  </p>
                ))}
              </div>
            </div>

            {/* Tayammum Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-lg">
                <Droplets className="w-5 h-5 text-amber-600" />
                <span>{TAYAMMUM_METHOD.title}</span>
              </div>
              <p className="text-xs text-slate-600">
                Permitted alternative using clean earth when water is legitimately unavailable or dangerous to health.
              </p>

              <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 space-y-2">
                <span className="text-xs font-bold text-amber-950 block">When Tayammum is Allowed:</span>
                <ul className="space-y-1 text-xs text-amber-900 list-disc list-inside">
                  {TAYAMMUM_METHOD.whenPermitted.map((wp, idx) => (
                    <li key={idx}>{wp}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-1.5 text-xs text-slate-700">
                <span className="font-bold text-slate-900 block">Step-by-Step Method:</span>
                {TAYAMMUM_METHOD.steps.map((st, sIdx) => (
                  <p key={sIdx} className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                    {st}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: NAMAZ-E-JANAZAH (FUNERAL PRAYER) */}
      {subTab === 'janazah' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-xs font-semibold text-[#6E1373] mb-2">
                <Heart className="w-3.5 h-3.5" />
                <span>Communal Obligation (Fard Kifayah)</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                Namaz-e-Janazah (The Funeral Prayer)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                {JANAZAH_GUIDE.importance}
              </p>
            </div>

            {/* School Differences Clarification Box */}
            <div className="bg-purple-50/70 border border-purple-200 rounded-2xl p-4 sm:p-5 text-xs sm:text-sm space-y-1">
              <span className="font-bold text-[#6E1373] flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#851C82]" />
                <span>Scholarly Consensus & Differences (Clearly Labeled):</span>
              </span>
              <p className="text-slate-700 leading-relaxed">
                {JANAZAH_GUIDE.schoolsNote}
              </p>
            </div>

            {/* 4 Takbeers Method Grid */}
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 text-base sm:text-lg">
                The 4 Takbeers Procedure Step-by-Step
              </h4>

              {JANAZAH_GUIDE.steps.map((step) => (
                <div key={step.takbeerNumber} className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-full bg-[#6E1373] text-white font-bold text-xs flex items-center justify-center">
                      #{step.takbeerNumber}
                    </span>
                    <button
                      onClick={() => handleSpeak(step.recitationArabic, step.takbeerNumber + 100)}
                      className="text-xs text-[#6E1373] hover:underline flex items-center gap-1 cursor-pointer font-semibold"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Listen</span>
                    </button>
                  </div>

                  <h5 className="font-bold text-slate-900 text-sm sm:text-base">
                    {step.title}
                  </h5>
                  <p className="text-xs text-slate-600">{step.description}</p>

                  <div className="bg-white rounded-xl p-4 border border-slate-200 space-y-2">
                    <p dir="rtl" className="text-lg sm:text-xl font-arabic font-bold text-purple-950 text-right leading-loose">
                      {step.recitationArabic}
                    </p>
                    <p className="text-xs text-purple-900 italic">
                      {step.recitationTransliteration}
                    </p>
                    <p className="text-xs text-slate-800 font-medium">
                      <strong>English Translation:</strong> {step.recitationEnglish}
                    </p>
                    {step.note && (
                      <p className="text-[11px] text-slate-500 pt-1">
                        Reference: {step.note}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Child Janazah Duas */}
            <div className="bg-gradient-to-r from-pink-50 via-purple-50 to-pink-50 rounded-2xl p-5 border border-pink-200 space-y-4">
              <h5 className="font-bold text-[#6E1373] text-sm sm:text-base">
                Specific Supplications for Deceased Children (Boy or Girl)
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Boy */}
                <div className="bg-white rounded-xl p-4 border border-purple-100 space-y-2">
                  <span className="text-xs font-bold text-blue-700 block">For a Deceased Boy:</span>
                  <p dir="rtl" className="font-arabic font-bold text-slate-900 text-right text-base">
                    {JANAZAH_GUIDE.duaChildBoy.arabic}
                  </p>
                  <p className="text-xs text-purple-900 italic">{JANAZAH_GUIDE.duaChildBoy.transliteration}</p>
                  <p className="text-xs text-slate-700">{JANAZAH_GUIDE.duaChildBoy.translation}</p>
                </div>

                {/* Girl */}
                <div className="bg-white rounded-xl p-4 border border-purple-100 space-y-2">
                  <span className="text-xs font-bold text-pink-700 block">For a Deceased Girl:</span>
                  <p dir="rtl" className="font-arabic font-bold text-slate-900 text-right text-base">
                    {JANAZAH_GUIDE.duaChildGirl.arabic}
                  </p>
                  <p className="text-xs text-purple-900 italic">{JANAZAH_GUIDE.duaChildGirl.transliteration}</p>
                  <p className="text-xs text-slate-700">{JANAZAH_GUIDE.duaChildGirl.translation}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: COMMON MISTAKES IN SALAH */}
      {subTab === 'mistakes' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Common Mistakes in Salah & How to Correct Them
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Authentic Prophetic corrections grounded in Sahih Hadith literature.
              </p>
            </div>

            <div className="space-y-4">
              {COMMON_SALAH_MISTAKES.map((cm, idx) => (
                <div key={idx} className="bg-red-50/50 rounded-2xl p-5 border border-red-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-red-900 text-sm sm:text-base">
                    <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>Mistake: {cm.mistake}</span>
                  </div>

                  <div className="bg-white rounded-xl p-3 border border-emerald-200 text-xs text-slate-800 space-y-1">
                    <strong className="text-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Correct Sunnah Method:</span>
                    </strong>
                    <p className="text-slate-700">{cm.correction}</p>
                    <p className="text-[11px] text-slate-500 italic pt-1">
                      Evidence: {cm.evidence}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: SPECIAL PRAYERS (JUMU'AH, TAHAJJUD, EID) */}
      {subTab === 'special' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Special Sunnah & Nafl Prayers
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Learn the rulings, method, and virtues of Friday Jumu'ah, Tahajjud (Night Vigil), and Eid prayers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {SPECIAL_PRAYERS.map((sp, idx) => (
                <div key={idx} className="bg-purple-50/50 rounded-3xl p-5 border border-purple-100 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <span className="text-xs font-arabic font-bold text-[#6E1373] block text-right">
                      {sp.arabicTitle}
                    </span>
                    <h4 className="font-bold text-slate-900 text-base">{sp.title}</h4>
                    <p className="text-xs text-slate-700 leading-relaxed">{sp.description}</p>
                  </div>

                  <div className="bg-white rounded-xl p-3 border border-purple-100 text-xs text-[#6E1373] font-medium">
                    <strong>Virtues:</strong> {sp.virtues}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
