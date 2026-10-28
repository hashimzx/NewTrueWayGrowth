import React, { useState } from 'react';
import { 
  BookOpen, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  UserCheck, 
  ShieldCheck, 
  ArrowRight, 
  Calendar, 
  Brain, 
  Heart, 
  Users, 
  Check, 
  HelpCircle,
  CreditCard,
  Gift
} from 'lucide-react';

interface HifzSectionProps {
  onOpenEnroll: (courseName?: string) => void;
  onOpenQaida?: () => void;
  currency?: 'USD' | 'GBP' | 'EUR' | 'CAD' | 'AUD';
}

export const HifzSection: React.FC<HifzSectionProps> = ({ 
  onOpenEnroll, 
  onOpenQaida,
  currency = 'GBP' 
}) => {
  // Interactive Calculator State
  const [selectedGoal, setSelectedGoal] = useState<'juz30' | 'selected' | '5juz' | 'full30'>('juz30');
  const [dailyPace, setDailyPace] = useState<'3verses' | '5verses' | 'halfPage' | 'fullPage'>('5verses');

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

  // Estimates based on standard 604-page Madani Mushaf (approx 6,236 verses)
  const calculateEstimate = () => {
    let targetVerses = 564; // Juz 30
    if (selectedGoal === 'selected') targetVerses = 850;
    if (selectedGoal === '5juz') targetVerses = 1050;
    if (selectedGoal === 'full30') targetVerses = 6236;

    let versesPerDay = 5;
    let dailyTime = '45 mins/day';
    if (dailyPace === '3verses') {
      versesPerDay = 3;
      dailyTime = '30 mins/day';
    } else if (dailyPace === '5verses') {
      versesPerDay = 5;
      dailyTime = '45 mins/day';
    } else if (dailyPace === 'halfPage') {
      versesPerDay = 8;
      dailyTime = '60 mins/day';
    } else if (dailyPace === 'fullPage') {
      versesPerDay = 15;
      dailyTime = '90 mins/day';
    }

    const totalDays = Math.ceil(targetVerses / versesPerDay);
    const months = (totalDays / 26).toFixed(1); // 26 study days/month accounting for rest
    const years = (Number(months) / 12).toFixed(1);

    return {
      durationText: Number(months) < 12 ? `${months} Months` : `${years} Years (${months} Mos)`,
      dailyTime,
      totalDays,
      versesPerDay
    };
  };

  const estimate = calculateEstimate();

  const hifzPlans = [
    {
      id: 'hifz_starter',
      name: 'Starter Hifz Track',
      days: '2 Days / Week (8 Sessions / Month)',
      duration: '30 Minutes per 1-on-1 Session',
      prices: { USD: 35, GBP: 28, EUR: 32, CAD: 48, AUD: 52 },
      description: 'Ideal for young children (ages 5-9) and busy working adults starting with Juz \'Amma.',
      features: [
        '1-on-1 private certified Hafiz/Hafiza mentor',
        'Sabaq (New Lesson) Tajweed check',
        'Weekly Sabqi revision consolidation',
        'Monthly recorded progress report',
        'Flexible 24/7 rescheduling'
      ],
      badge: 'Starter Pacing'
    },
    {
      id: 'hifz_standard',
      name: 'Standard Hifz Track',
      days: '3–4 Days / Week (16 Sessions / Month)',
      duration: '45 Minutes per 1-on-1 Session',
      prices: { USD: 55, GBP: 44, EUR: 50, CAD: 75, AUD: 82 },
      description: 'Our most popular balanced curriculum balancing steady new memorization with continuous revision.',
      features: [
        '1-on-1 private certified Hafiz/Hafiza mentor',
        'Full 3-Part Hifz system (Sabaq, Sabqi, Manzil)',
        'Melodic Ayah linking & breathing mastery',
        'Bi-weekly live oral evaluation tests',
        '20% Sibling discount eligible',
        'Direct WhatsApp teacher voice guidance'
      ],
      badge: 'Most Popular',
      popular: true
    },
    {
      id: 'hifz_intensive',
      name: 'Intensive Full Hifz & Ijazah',
      days: '5 Days / Week (22 Sessions / Month)',
      duration: '60 Minutes Daily 1-on-1 Session',
      prices: { USD: 85, GBP: 68, EUR: 78, CAD: 115, AUD: 125 },
      description: 'Dedicated full Quran memorization program aimed at complete 30 Juz Hifz with Sanad & Ijazah.',
      features: [
        'Daily 60-min intensive 1-on-1 recitation',
        'Complete 30 Juz structured roadmap',
        'Continuous Manzil revision of older Juz',
        'Preparation for Sanad with continuous chain (Isnad)',
        'Priority scheduling & dedicated Arab / Asian master faculty',
        'Family discount & certificate of completion'
      ],
      badge: 'Complete 30 Juz'
    }
  ];

  return (
    <div className="py-16 md:py-24 bg-gradient-to-b from-white via-purple-50/40 to-white relative overflow-hidden" id="hifz-section">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#6B1B7E]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#E0107F]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/90 border border-[#6B1B7E]/20 text-[#6B1B7E] text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#E0107F]" />
            <span>Online Quran Memorization (Hifz) Course</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Memorize the Holy Quran with{' '}
            <span className="bg-gradient-to-r from-[#6B1B7E] via-[#5B2A9A] to-[#E0107F] bg-clip-text text-transparent">
              Authentic Tajweed & Lifelong Retention
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
            Structured 1-on-1 live mentorship for kids, adults, brothers and sisters based on the proven 3-pillar method: <strong>Sabaq</strong>, <strong>Sabqi</strong>, and <strong>Manzil</strong>.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs font-bold text-slate-600">
            <span className="flex items-center gap-1.5 text-[#6B1B7E]">
              <CheckCircle2 className="w-4 h-4 text-[#E0107F]" />
              1-on-1 Live Private Tutors
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5 text-[#6B1B7E]">
              <CheckCircle2 className="w-4 h-4 text-[#E0107F]" />
              24/7 Flexible Scheduling
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5 text-[#6B1B7E]">
              <Gift className="w-4 h-4 text-emerald-600" />
              20% Sibling & Family Discount
            </span>
          </div>
        </div>

        {/* 3-Pillar Methodology (Direct from equranschool.com) */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-black text-[#6B1B7E] uppercase tracking-wider">
              Proven Pedagogical System
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              The 3-Stage Daily Hifz Routine
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
              Memorizing the Quran is easy when guided by this authentic daily rhythm used in classical Quran academies worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Pillar 1: Sabaq */}
            <div className="bg-white rounded-3xl p-7 border-2 border-[#6B1B7E]/20 shadow-lg shadow-purple-900/5 space-y-4 hover:border-[#6B1B7E]/40 transition">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-[#6B1B7E] font-black text-lg flex items-center justify-center">
                1
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-[#E0107F]">Daily New Lesson</span>
                <h4 className="text-xl font-black text-slate-900">Sabaq (الْسَبَق)</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                The new portion (1 to 5 verses or half a page) assigned daily. Before committing anything to memory, your mentor verifies every single Harakah, vowel, and Tajweed rule to eliminate entrenched pronunciation errors.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-700 border-t border-purple-50 pt-3">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Accurate Makharij check before memorizing</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Ayah linking and breath regulation</span>
                </li>
              </ul>
            </div>

            {/* Pillar 2: Sabqi */}
            <div className="bg-white rounded-3xl p-7 border-2 border-[#5B2A9A]/20 shadow-lg shadow-purple-900/5 space-y-4 hover:border-[#5B2A9A]/40 transition">
              <div className="w-12 h-12 rounded-2xl bg-pink-100 text-[#E0107F] font-black text-lg flex items-center justify-center">
                2
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-[#5B2A9A]">Recent Revision</span>
                <h4 className="text-xl font-black text-slate-900">Sabqi (الْسَبْقِي)</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Daily recitation of the verses memorized over the last 5 to 10 days. This cements short-term memory into intermediate recall, preventing recent work from fading away as new lessons progress.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-700 border-t border-purple-50 pt-3">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Consolidates the past 5–10 pages</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Teacher spots subtle hesitations instantly</span>
                </li>
              </ul>
            </div>

            {/* Pillar 3: Manzil */}
            <div className="bg-white rounded-3xl p-7 border-2 border-[#E0107F]/20 shadow-lg shadow-purple-900/5 space-y-4 hover:border-[#E0107F]/40 transition">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#6B1B7E] to-[#E0107F] text-white font-black text-lg flex items-center justify-center shadow-md">
                3
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-[#6B1B7E]">Permanent Retention</span>
                <h4 className="text-xl font-black text-slate-900">Manzil / Muraja'ah (الْمَنْزِل)</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Cumulative revision of older Juz. The student recites 0.5 to 1 full previously completed Juz each day. This guarantees that whether you memorized Surah Al-Baqarah 2 months ago or 2 years ago, it remains crystal clear.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-700 border-t border-purple-50 pt-3">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Guarantees 100% long-term retention</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Prepares student for formal Sanad / Ijazah</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Prerequisites & Guidance Banner (from equranschool.com) */}
        <div className="bg-gradient-to-r from-purple-50 via-white to-pink-50 p-6 sm:p-8 rounded-3xl border border-[#6B1B7E]/20 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 text-xs font-black text-[#6B1B7E] uppercase tracking-wide">
                <ShieldCheck className="w-4 h-4 text-[#E0107F]" />
                Course Prerequisites & Eligibility
              </span>
              <h4 className="text-lg sm:text-xl font-black text-slate-900">
                Who Can Enroll in the Hifz Program?
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                Students should possess basic Nazra Quran reading ability (recognizing Arabic letters, vowels, Sukoon, Madd, and Tanween). If you or your child are starting from absolute scratch, we recommend completing our 22-Lesson <strong>Madani Qaida</strong> foundation first.
              </p>
            </div>

            {onOpenQaida && (
              <button
                onClick={onOpenQaida}
                className="px-5 py-3 rounded-2xl bg-white hover:bg-purple-50 text-[#6B1B7E] border border-[#6B1B7E]/30 text-xs font-black transition shadow-xs shrink-0 flex items-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-[#E0107F]" />
                <span>Open Madani Qaida (22 Lessons)</span>
              </button>
            )}
          </div>
        </div>

        {/* Interactive Hifz Milestone Calculator */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#6B1B7E]/25 shadow-xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-[#6B1B7E] bg-purple-100 px-3 py-1 rounded-full">
              Personalized Plan Generator
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              Calculate Your Hifz Timeline
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Select your memorization goal and preferred daily commitment to view an estimated milestone schedule.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Options */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Goal Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wide">
                  Step 1: Choose Your Memorization Target
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setSelectedGoal('juz30')}
                    className={`p-3 rounded-2xl text-xs font-bold text-center border transition cursor-pointer ${
                      selectedGoal === 'juz30'
                        ? 'bg-gradient-to-r from-[#6B1B7E] to-[#5B2A9A] text-white border-[#6B1B7E] shadow-sm'
                        : 'bg-slate-50 hover:bg-purple-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    <span>Juz 'Amma (30th)</span>
                    <span className="block text-[10px] opacity-80">Short Surahs</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedGoal('selected')}
                    className={`p-3 rounded-2xl text-xs font-bold text-center border transition cursor-pointer ${
                      selectedGoal === 'selected'
                        ? 'bg-gradient-to-r from-[#6B1B7E] to-[#5B2A9A] text-white border-[#6B1B7E] shadow-sm'
                        : 'bg-slate-50 hover:bg-purple-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    <span>Selected Surahs</span>
                    <span className="block text-[10px] opacity-80">Yasin, Mulk, Kahf</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedGoal('5juz')}
                    className={`p-3 rounded-2xl text-xs font-bold text-center border transition cursor-pointer ${
                      selectedGoal === '5juz'
                        ? 'bg-gradient-to-r from-[#6B1B7E] to-[#5B2A9A] text-white border-[#6B1B7E] shadow-sm'
                        : 'bg-slate-50 hover:bg-purple-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    <span>5–10 Juz</span>
                    <span className="block text-[10px] opacity-80">Intermediate</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedGoal('full30')}
                    className={`p-3 rounded-2xl text-xs font-bold text-center border transition cursor-pointer ${
                      selectedGoal === 'full30'
                        ? 'bg-gradient-to-r from-[#6B1B7E] to-[#5B2A9A] text-white border-[#6B1B7E] shadow-sm'
                        : 'bg-slate-50 hover:bg-purple-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    <span>Full Quran</span>
                    <span className="block text-[10px] opacity-80">All 30 Juz</span>
                  </button>
                </div>
              </div>

              {/* Pace Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wide">
                  Step 2: Choose Your Daily Pace (Sabaq)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setDailyPace('3verses')}
                    className={`p-3 rounded-2xl text-xs font-bold text-center border transition cursor-pointer ${
                      dailyPace === '3verses'
                        ? 'bg-[#E0107F] text-white border-[#E0107F] shadow-sm'
                        : 'bg-slate-50 hover:bg-purple-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    <span>3 Verses / Day</span>
                    <span className="block text-[10px] opacity-80">~30 mins/day</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDailyPace('5verses')}
                    className={`p-3 rounded-2xl text-xs font-bold text-center border transition cursor-pointer ${
                      dailyPace === '5verses'
                        ? 'bg-[#E0107F] text-white border-[#E0107F] shadow-sm'
                        : 'bg-slate-50 hover:bg-purple-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    <span>5 Verses / Day</span>
                    <span className="block text-[10px] opacity-80">~45 mins/day</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDailyPace('halfPage')}
                    className={`p-3 rounded-2xl text-xs font-bold text-center border transition cursor-pointer ${
                      dailyPace === 'halfPage'
                        ? 'bg-[#E0107F] text-white border-[#E0107F] shadow-sm'
                        : 'bg-slate-50 hover:bg-purple-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    <span>Half Page / Day</span>
                    <span className="block text-[10px] opacity-80">~60 mins/day</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDailyPace('fullPage')}
                    className={`p-3 rounded-2xl text-xs font-bold text-center border transition cursor-pointer ${
                      dailyPace === 'fullPage'
                        ? 'bg-[#E0107F] text-white border-[#E0107F] shadow-sm'
                        : 'bg-slate-50 hover:bg-purple-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    <span>1 Full Page / Day</span>
                    <span className="block text-[10px] opacity-80">~90 mins/day</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Calculated Milestone Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#6B1B7E] via-[#5B2A9A] to-[#E0107F] text-white rounded-3xl p-7 shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-white/20 pb-3">
                <span className="text-xs font-black uppercase tracking-wider text-pink-200">Estimated Milestone</span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold">1-on-1 Mentorship</span>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-purple-200 font-medium">Estimated Completion Time:</span>
                <p className="text-3xl sm:text-4xl font-black text-white">
                  {estimate.durationText}
                </p>
                <p className="text-xs text-pink-200 font-semibold">
                  Recommended live pace: {estimate.dailyTime} with certified tutor
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl text-xs space-y-1.5 border border-white/15">
                <p className="flex items-center justify-between">
                  <span>Daily Sabaq (New):</span>
                  <span className="font-bold">{estimate.versesPerDay} verses/day</span>
                </p>
                <p className="flex items-center justify-between">
                  <span>Daily Sabqi (Recent):</span>
                  <span className="font-bold">5–10 pages</span>
                </p>
                <p className="flex items-center justify-between">
                  <span>Daily Manzil (Revision):</span>
                  <span className="font-bold">0.5 to 1 full Juz</span>
                </p>
              </div>

              <button
                onClick={() => onOpenEnroll(`Quran Hifz Program (${selectedGoal.toUpperCase()})`)}
                className="w-full py-3 bg-white text-[#6B1B7E] hover:bg-pink-50 text-xs font-black rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book 3-Day Free Hifz Trial</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Pricing & Tuition Packages for Hifz (with Card & PayPal) */}
        <div className="space-y-8" id="hifz-pricing">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-[#6B1B7E] bg-purple-100 px-3.5 py-1 rounded-full">
              Transparent Tuition & Online Purchase
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900">
              Hifz Program Tuition & Packages
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Pay securely online with all major <strong>Credit / Debit Cards</strong> or <strong>PayPal</strong>. Sibling discounts and 3-day risk-free trials included.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {hifzPlans.map((plan) => {
              const price = plan.prices[currency];

              return (
                <div
                  key={plan.id}
                  className={`bg-white rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 relative border ${
                    plan.popular
                      ? 'border-2 border-[#E0107F] shadow-2xl shadow-purple-900/15 ring-4 ring-[#E0107F]/10 scale-102'
                      : 'border-[#6B1B7E]/20 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-gradient-to-r from-[#6B1B7E] to-[#E0107F] text-white text-[11px] font-black uppercase tracking-wider px-4 py-1 rounded-full shadow-md">
                      Most Popular
                    </div>
                  )}

                  <div className="space-y-5">
                    <div>
                      <span className="text-xs font-black uppercase tracking-wider text-[#6B1B7E]">
                        {plan.badge}
                      </span>
                      <h4 className="text-2xl font-black text-slate-900 mt-1">
                        {plan.name}
                      </h4>
                      <p className="text-xs text-slate-500 font-semibold mt-1">
                        {plan.days}
                      </p>
                      <p className="text-[11px] text-[#E0107F] font-bold">
                        {plan.duration}
                      </p>
                    </div>

                    {/* Price Display */}
                    <div className="bg-purple-50/70 p-4 rounded-2xl border border-purple-100 space-y-1">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-3xl sm:text-4xl font-black text-slate-900">
                          {symbol}{price}
                        </span>
                        <span className="text-xs font-bold text-slate-500">/ month</span>
                      </div>
                      <p className="text-[10px] text-emerald-700 font-bold">
                        ✓ 20% discount applies to 2nd & 3rd sibling
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {plan.description}
                    </p>

                    {/* Features list */}
                    <ul className="space-y-2.5 text-xs text-slate-700 pt-2 border-t border-purple-50">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Payment Buttons with Card & PayPal */}
                  <div className="pt-6 space-y-2.5">
                    <button
                      onClick={() => onOpenEnroll(plan.name)}
                      className={`w-full py-3.5 rounded-xl font-black text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                        plan.popular
                          ? 'bg-gradient-to-r from-[#6B1B7E] via-[#5B2A9A] to-[#E0107F] text-white hover:opacity-95'
                          : 'bg-[#6B1B7E] text-white hover:bg-purple-900'
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Enroll with Card or PayPal</span>
                    </button>

                    <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-slate-500">
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        Card & PayPal Accepted
                      </span>
                      <span>·</span>
                      <span>3-Day Free Trial</span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
