/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  Calendar, 
  Star, 
  Clock, 
  TrendingUp,
  BookmarkCheck
} from 'lucide-react';

interface PortalHifzTrackerSectionProps {
  studentName: string;
}

export const PortalHifzTrackerSection: React.FC<PortalHifzTrackerSectionProps> = ({
  studentName
}) => {
  // Demo interactive state for memorized juz
  const [memorizedJuzList, setMemorizedJuzList] = useState<number[]>([30, 29]);
  const [selectedJuzDetail, setSelectedJuzDetail] = useState<number>(30);

  const toggleJuz = (juzNumber: number) => {
    setMemorizedJuzList(prev => 
      prev.includes(juzNumber)
        ? prev.filter(n => n !== juzNumber)
        : [...prev, juzNumber]
    );
  };

  const juzDetailsMap: Record<number, { name: string; surahs: string; verses: number }> = {
    30: { name: 'Amma (عَمَّ)', surahs: "Surah An-Naba (78) to Surah An-Nas (114) — 37 Surahs", verses: 564 },
    29: { name: 'Tabarak (تَبَارَكَ)', surahs: "Surah Al-Mulk (67) to Surah Al-Mursalat (77) — 11 Surahs", verses: 431 },
    28: { name: 'Qad Sami’a (قَدْ سَمِعَ)', surahs: "Surah Al-Mujadila (58) to Surah At-Tahrim (66) — 9 Surahs", verses: 137 },
    1: { name: 'Alif Lam Meem (الم)', surahs: "Surah Al-Fatihah (1) & Surah Al-Baqarah (1-141)", verses: 148 }
  };

  const currentDetail = juzDetailsMap[selectedJuzDetail] || {
    name: `Juz ${selectedJuzDetail}`,
    surahs: `Core Quranic chapters and foundational verses in Juz ${selectedJuzDetail}`,
    verses: 180
  };

  const percentage = Math.round((memorizedJuzList.length / 30) * 100);

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#561F79] via-[#6E1373] to-[#851C82] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-pink-200 text-xs font-bold">
            <Award className="w-3.5 h-3.5 text-pink-300" />
            <span>Quran Memorization (Hifz) Roadmap</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Holy Quran Hifz & Retention Tracker
          </h2>
          <p className="text-pink-100 text-xs sm:text-sm leading-relaxed">
            Systematic daily Sabaq (new verse), Sabqi (recent revision), and Manzil (old revision) tracking across all 30 Juz to achieve long-term retention.
          </p>
        </div>
      </div>

      {/* Progress Metric Card */}
      <div className="bg-white rounded-3xl border border-purple-100 p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Overall Hifz Progress</span>
            <h3 className="text-2xl font-black text-[#6E1373] mt-0.5">
              {memorizedJuzList.length} of 30 Juz Memorized ({percentage}%)
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-purple-50 text-[#6E1373] text-xs font-bold border border-purple-200">
              Active Focus: Juz 28
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
          <div 
            className="bg-gradient-to-r from-[#6E1373] to-[#C72F8A] h-full rounded-full transition-all duration-500"
            style={{ width: `${Math.max(5, percentage)}%` }}
          />
        </div>
      </div>

      {/* 30 Juz Visual Grid */}
      <div className="bg-white rounded-3xl border border-purple-100 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-purple-50 pb-3">
          <div>
            <h3 className="text-sm font-bold text-[#6E1373]">
              30 Juz Interactive Memorization Grid
            </h3>
            <p className="text-xs text-slate-500">
              Tap any Juz to view Surah breakdown and toggle your memorization completion.
            </p>
          </div>
          <span className="text-xs text-slate-400 font-semibold hidden sm:inline">
            Click to mark/unmark
          </span>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-2 sm:gap-3">
          {Array.from({ length: 30 }, (_, i) => 30 - i).map((juzNum) => {
            const isDone = memorizedJuzList.includes(juzNum);
            const isSelected = selectedJuzDetail === juzNum;

            return (
              <button
                key={juzNum}
                onClick={() => {
                  setSelectedJuzDetail(juzNum);
                  toggleJuz(juzNum);
                }}
                className={`p-3 rounded-2xl text-center transition-all cursor-pointer border flex flex-col items-center justify-center space-y-1 ${
                  isDone
                    ? 'bg-gradient-to-br from-[#6E1373] to-[#851C82] text-white border-[#6E1373] shadow-sm'
                    : isSelected
                    ? 'bg-purple-50 text-[#6E1373] border-purple-300 ring-2 ring-purple-200'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                <span className="text-[10px] uppercase font-bold opacity-75">Juz</span>
                <span className="text-base sm:text-lg font-black">{juzNum}</span>
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-slate-300" />
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Juz Detail Card */}
        <div className="bg-purple-50/60 p-4 sm:p-5 rounded-2xl border border-purple-200 space-y-2 mt-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-[#6E1373]">
              Juz {selectedJuzDetail} Details: {currentDetail.name}
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              memorizedJuzList.includes(selectedJuzDetail) 
                ? 'bg-emerald-100 text-emerald-800' 
                : 'bg-amber-100 text-amber-800'
            }`}>
              {memorizedJuzList.includes(selectedJuzDetail) ? '✓ Completed' : 'In Progress'}
            </span>
          </div>
          <p className="text-xs text-slate-700">
            <strong>Chapters:</strong> {currentDetail.surahs}
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
            <span>Verses: ~{currentDetail.verses}</span>
            <span>·</span>
            <span>Revision Recommendation: Every 3 Days</span>
          </div>
        </div>
      </div>

      {/* Daily 3-Tier Hifz System (Sabaq, Sabqi, Manzil) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-purple-100 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-[#6E1373]">
            <Sparkles className="w-4 h-4 text-[#C72F8A]" />
            <h4 className="text-sm font-black">1. Today's Sabaq (New)</h4>
          </div>
          <p className="text-xs text-slate-600">
            Learn 5 to 7 new verses with flawless Tajweed and repeat 20 times before presenting to your Qari.
          </p>
          <div className="p-3 bg-purple-50 rounded-xl text-xs font-bold text-[#6E1373] mt-2">
            Surah Al-Mulk: Verses 1–8
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-purple-100 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-[#6E1373]">
            <BookOpen className="w-4 h-4 text-[#851C82]" />
            <h4 className="text-sm font-black">2. Sabqi (Recent Revision)</h4>
          </div>
          <p className="text-xs text-slate-600">
            Revise the last 5 to 10 pages memorized in the current Juz to reinforce recent neural connections.
          </p>
          <div className="p-3 bg-purple-50 rounded-xl text-xs font-bold text-[#6E1373] mt-2">
            Surah Al-Jumu'ah: Verses 1–11
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-purple-100 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-[#6E1373]">
            <Star className="w-4 h-4 text-amber-500" />
            <h4 className="text-sm font-black">3. Manzil (Old Revision)</h4>
          </div>
          <p className="text-xs text-slate-600">
            Recite one full past Juz every day to maintain permanent lifelong retention without forgetting.
          </p>
          <div className="p-3 bg-purple-50 rounded-xl text-xs font-bold text-[#6E1373] mt-2">
            Juz 30 (Amma): Full Recitation
          </div>
        </div>
      </div>

    </div>
  );
};
