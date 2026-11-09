/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Flame, 
  Sparkles, 
  Clock, 
  Calendar as CalendarIcon, 
  Award,
  BookOpen,
  Heart
} from 'lucide-react';

interface PortalHabitTrackerSectionProps {
  studentName: string;
}

export const PortalHabitTrackerSection: React.FC<PortalHabitTrackerSectionProps> = ({
  studentName
}) => {
  const todayKey = new Date().toISOString().slice(0, 10);
  const [completedPrayers, setCompletedPrayers] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(`twq_prayers_${todayKey}`);
      if (saved) return JSON.parse(saved);
    } catch {}
    return ['fajr', 'dhuhr'];
  });

  const [sunnahPractices, setSunnahPractices] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(`twq_sunnah_${todayKey}`);
      if (saved) return JSON.parse(saved);
    } catch {}
    return ['morning_adhkar'];
  });

  const streakDays = 7;

  useEffect(() => {
    localStorage.setItem(`twq_prayers_${todayKey}`, JSON.stringify(completedPrayers));
  }, [completedPrayers, todayKey]);

  useEffect(() => {
    localStorage.setItem(`twq_sunnah_${todayKey}`, JSON.stringify(sunnahPractices));
  }, [sunnahPractices, todayKey]);

  const togglePrayer = (id: string) => {
    setCompletedPrayers(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const toggleSunnah = (id: string) => {
    setSunnahPractices(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const prayers = [
    { id: 'fajr', name: 'Fajr (Dawn)', time: '05:30 AM', rakats: '2 Sunnah + 2 Fard' },
    { id: 'dhuhr', name: 'Dhuhr (Noon)', time: '12:45 PM', rakats: '4 Sunnah + 4 Fard + 2 Sunnah + 2 Nafl' },
    { id: 'asr', name: 'Asr (Afternoon)', time: '03:45 PM', rakats: '4 Sunnah Ghair Mu’akkadah + 4 Fard' },
    { id: 'maghrib', name: 'Maghrib (Sunset)', time: '05:25 PM', rakats: '3 Fard + 2 Sunnah + 2 Nafl' },
    { id: 'isha', name: 'Isha (Night)', time: '07:15 PM', rakats: '4 Fard + 2 Sunnah + 2 Nafl + 3 Witr' }
  ];

  const sunnahs = [
    { id: 'morning_adhkar', title: 'Morning / Evening Adhkar (Hisn al-Muslim)', reward: 'Daily divine protection' },
    { id: 'ayat_al_kursi', title: 'Ayat al-Kursi after every Fard prayer', reward: 'Pathway to Jannah (Bukhari)' },
    { id: 'surah_mulk', title: 'Surah Al-Mulk before sleeping', reward: 'Shield against punishment of grave' },
    { id: 'duha_prayer', title: 'Salat al-Duha (Ishraq 2 Rakats)', reward: 'Charity on behalf of all 360 joints' },
    { id: 'istighfar_100', title: '100x Astaghfirullah Daily', reward: 'Opening of provision and relief from grief' }
  ];

  const prayerProgress = Math.round((completedPrayers.length / 5) * 100);

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#6E1373] via-[#851C82] to-[#C72F8A] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-pink-200 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-pink-300" />
            <span>Daily Islamic Habits & Salah Discipline</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Salah & Sunnah Daily Habit Tracker
          </h2>
          <p className="text-pink-100 text-xs sm:text-sm leading-relaxed">
            "Indeed, prayer has been decreed upon the believers a decree of specified times." (Surah An-Nisa 4:103). Mark your prayers on time and build your spiritual momentum.
          </p>
        </div>
      </div>

      {/* Streak and Completion Highlight */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-purple-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Flame className="w-6 h-6 fill-current" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-bold block">Active Prayer Streak</span>
            <span className="text-2xl font-black text-slate-900 mt-0.5 block">{streakDays} Consecutive Days</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-purple-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-bold block">Today's Salah ({prayerProgress}%)</span>
            <span className="text-2xl font-black text-emerald-600 mt-0.5 block">
              {completedPrayers.length} / 5 Prayers
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-purple-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#6E1373] flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-bold block">Sunnah Actions Checked</span>
            <span className="text-2xl font-black text-[#6E1373] mt-0.5 block">
              {sunnahPractices.length} Completed
            </span>
          </div>
        </div>
      </div>

      {/* 5 Daily Prayers Checklist */}
      <div className="bg-white rounded-3xl border border-purple-100 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-purple-50 pb-3">
          <h3 className="text-sm font-bold text-[#6E1373] flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#C72F8A]" />
            <span>Today's 5 Obligatory Prayers Checklist</span>
          </h3>
          <span className="text-xs text-slate-400 font-semibold">Tap to mark completed</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {prayers.map((prayer) => {
            const isDone = completedPrayers.includes(prayer.id);

            return (
              <button
                key={prayer.id}
                onClick={() => togglePrayer(prayer.id)}
                className={`p-4 rounded-2xl text-left transition-all border cursor-pointer space-y-2 ${
                  isDone
                    ? 'bg-emerald-50/80 border-emerald-400 ring-1 ring-emerald-300'
                    : 'bg-white hover:bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900">{prayer.name.split(' ')[0]}</span>
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <span className="w-4 h-4 rounded-full border border-slate-300" />
                  )}
                </div>
                <div className="text-[11px] font-semibold text-slate-500">{prayer.time}</div>
                <div className="text-[10px] text-slate-400 leading-tight">{prayer.rakats}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Daily Sunnah Habits Checklist */}
      <div className="bg-white rounded-3xl border border-purple-100 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-purple-50 pb-3">
          <h3 className="text-sm font-bold text-[#6E1373] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#851C82]" />
            <span>Recommended Prophetic Sunnah Daily Habits</span>
          </h3>
          <span className="text-xs text-slate-400 font-semibold">Spiritual rewards</span>
        </div>

        <div className="space-y-2.5">
          {sunnahs.map((sunnah) => {
            const isDone = sunnahPractices.includes(sunnah.id);

            return (
              <div
                key={sunnah.id}
                onClick={() => toggleSunnah(sunnah.id)}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                  isDone
                    ? 'bg-purple-50/80 border-purple-300'
                    : 'bg-white hover:bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition ${
                    isDone ? 'bg-[#6E1373] border-[#6E1373] text-white' : 'border-slate-300'
                  }`}>
                    {isDone && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800">{sunnah.title}</span>
                    <p className="text-[11px] text-purple-700">{sunnah.reward}</p>
                  </div>
                </div>

                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isDone ? 'bg-purple-200 text-[#6E1373]' : 'bg-slate-100 text-slate-500'
                }`}>
                  {isDone ? 'Done' : 'Pending'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
