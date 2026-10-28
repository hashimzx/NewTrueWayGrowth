import React, { useState, useEffect } from 'react';
import { 
  ISLAMIC_DUAS, 
  SALAH_STEPS, 
  HAJJ_UMRAH_GUIDE, 
  ISLAMIC_EVENTS, 
  GLOBAL_CITIES_PRAYER 
} from '../data/islamicResourcesData';
import { soundEngine } from '../utils/audioSynth';
import { 
  Clock, 
  Compass, 
  BookMarked, 
  Calendar, 
  CheckCircle, 
  Volume2, 
  ChevronRight, 
  MapPin, 
  Sparkles, 
  Sun, 
  Moon, 
  Bell, 
  Share2
} from 'lucide-react';

export const IslamicResources: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'prayer' | 'duas' | 'salah' | 'hajj' | 'calendar'>('prayer');
  const [selectedCity, setSelectedCity] = useState<string>('London');
  const [playingDuaId, setPlayingDuaId] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const cityData = GLOBAL_CITIES_PRAYER.find(c => c.cityName === selectedCity) || GLOBAL_CITIES_PRAYER[0];

  const handlePlayArabic = async (id: string, text: string) => {
    setPlayingDuaId(id);
    await soundEngine.speakArabic(text, 0.85);
    setPlayingDuaId(null);
  };

  const handleTestAzan = () => {
    soundEngine.playCueSound('success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 text-center space-y-3 relative overflow-hidden shadow-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-600/10 border border-red-600/30 rounded-full text-xs font-semibold text-red-400">
          <Compass className="w-3.5 h-3.5 text-red-500" />
          <span>True Way Growth Islamic Resource Center</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Comprehensive Islamic Learning
        </h1>

        <p className="text-zinc-400 text-sm max-w-2xl mx-auto">
          Essential spiritual resources for international Muslims: accurate worldwide prayer times, authentic Duas with Arabic audio, step-by-step Salah guides, and Hajj & Umrah instructions.
        </p>

        {/* Tab Navigation */}
        <div className="flex items-center justify-center gap-2 pt-4 flex-wrap">
          {[
            { id: 'prayer', label: 'Prayer Times', icon: Clock },
            { id: 'duas', label: 'Daily Duas', icon: BookMarked },
            { id: 'salah', label: 'Salah (Namaz) Guide', icon: Sparkles },
            { id: 'hajj', label: 'Hajj & Umrah', icon: Compass },
            { id: 'calendar', label: 'Islamic Calendar', icon: Calendar },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                  isActive
                    ? 'bg-red-600 text-white shadow-lg glow-red-sm'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. Prayer Times View */}
      {activeTab === 'prayer' && (
        <div className="space-y-8">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6">
            
            {/* City Selector and Current Time */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
              <div>
                <span className="text-xs font-bold text-red-500 uppercase tracking-widest flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" /> Global Prayer Times
                </span>
                <h2 className="text-2xl font-black text-white mt-1">
                  Prayer Schedule for {cityData.cityName}, {cityData.country}
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Timezone: {cityData.timezone}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-xs text-zinc-400 block">Local Time:</span>
                  <span className="font-mono text-xl font-bold text-white">{currentTime}</span>
                </div>

                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="bg-zinc-900 text-white text-xs border border-zinc-700 rounded-xl px-3 py-2.5 font-semibold focus:outline-none focus:border-red-500"
                >
                  {GLOBAL_CITIES_PRAYER.map(c => (
                    <option key={c.cityName} value={c.cityName}>
                      {c.cityName} ({c.country})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Prayer Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: 'Fajr', arabic: 'الفَجْر', time: cityData.prayerTimes.fajr, icon: Moon },
                { name: 'Sunrise', arabic: 'الشُّرُوق', time: cityData.prayerTimes.sunrise, icon: Sun },
                { name: 'Dhuhr', arabic: 'الظُّهْر', time: cityData.prayerTimes.dhuhr, icon: Sun },
                { name: 'Asr', arabic: 'العَصْر', time: cityData.prayerTimes.asr, icon: Sun },
                { name: 'Maghrib', arabic: 'المَغْرِب', time: cityData.prayerTimes.maghrib, icon: Moon },
                { name: 'Isha', arabic: 'العِشَاء', time: cityData.prayerTimes.isha, icon: Moon },
              ].map((p, idx) => {
                const Icon = p.icon;
                return (
                  <div
                    key={idx}
                    className="bg-zinc-900 border border-zinc-800 hover:border-red-600/60 rounded-2xl p-5 text-center space-y-2 transition group"
                  >
                    <div className="w-8 h-8 rounded-full bg-zinc-800 text-red-500 flex items-center justify-center mx-auto group-hover:bg-red-600 group-hover:text-white transition">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-zinc-300 block">{p.name}</span>
                      <span className="font-arabic text-xs text-zinc-500 block">{p.arabic}</span>
                    </div>
                    <span className="text-xl font-black text-white block font-mono">
                      {p.time}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Azan Notification Banner */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-800/80 bg-zinc-900/40 p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-red-500 shrink-0" />
                <span className="text-xs text-zinc-300">
                  Enable Azan reminders for your timezone to never miss congregation.
                </span>
              </div>
              <button
                onClick={handleTestAzan}
                className="px-3.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-xs font-bold border border-zinc-700 transition"
              >
                Test Azan Chime
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Daily Duas View */}
      {activeTab === 'duas' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ISLAMIC_DUAS.map((dua) => {
              const isPlaying = playingDuaId === dua.id;
              return (
                <div
                  key={dua.id}
                  className="bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-lg"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-red-500 bg-red-600/10 px-2 py-0.5 rounded-full border border-red-600/20">
                        {dua.category.replace('_', ' ')}
                      </span>
                      <span className="text-xs text-zinc-400 italic">{dua.reference}</span>
                    </div>

                    <h3 className="text-base font-bold text-white">{dua.title}</h3>

                    {/* Arabic Calligraphy */}
                    <div className="bg-zinc-900/70 p-4 rounded-xl border border-zinc-850 text-right dir-rtl">
                      <p className="font-arabic text-2xl font-bold text-white leading-loose">
                        {dua.arabic}
                      </p>
                    </div>

                    {/* Transliteration */}
                    <p className="text-xs text-zinc-300 font-medium italic">
                      "{dua.transliteration}"
                    </p>

                    {/* English Translation */}
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {dua.englishTranslation}
                    </p>

                    {dua.virtue && (
                      <div className="text-[11px] text-zinc-400 bg-zinc-900/40 p-2.5 rounded-lg border-l-2 border-red-600">
                        <strong className="text-zinc-200">Virtue:</strong> {dua.virtue}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-zinc-850 flex items-center justify-end">
                    <button
                      onClick={() => handlePlayArabic(dua.id, dua.arabic)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                        isPlaying
                          ? 'bg-red-600 text-white animate-pulse'
                          : 'bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800'
                      }`}
                    >
                      <Volume2 className="w-4 h-4 text-red-500" />
                      <span>{isPlaying ? 'Reciting...' : 'Listen Audio'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Step-by-Step Salah (Namaz) Guide */}
      {activeTab === 'salah' && (
        <div className="space-y-8">
          {/* Salah Units / Raka'at Chart */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-red-500 mb-3">
              Daily Five Prayers (Raka'at Breakdown)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-zinc-300">
                <thead className="bg-zinc-900 text-zinc-400 uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Prayer</th>
                    <th className="p-3">Sunnah (Before)</th>
                    <th className="p-3 font-bold text-white">Fard (Obligatory)</th>
                    <th className="p-3">Sunnah (After)</th>
                    <th className="p-3">Nafl / Witr</th>
                    <th className="p-3 text-red-400 font-bold">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-850 font-medium">
                  <tr>
                    <td className="p-3 font-bold text-white">Fajr (Dawn)</td>
                    <td className="p-3">2 Sunnah Mu'akkadah</td>
                    <td className="p-3 font-bold text-red-500">2 Fard</td>
                    <td className="p-3">-</td>
                    <td className="p-3">-</td>
                    <td className="p-3 font-bold text-white">4 Raka'at</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">Dhuhr (Midday)</td>
                    <td className="p-3">4 Sunnah Mu'akkadah</td>
                    <td className="p-3 font-bold text-red-500">4 Fard</td>
                    <td className="p-3">2 Sunnah</td>
                    <td className="p-3">2 Nafl</td>
                    <td className="p-3 font-bold text-white">12 Raka'at</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">Asr (Afternoon)</td>
                    <td className="p-3">4 Sunnah Ghayr-Mu'akkadah</td>
                    <td className="p-3 font-bold text-red-500">4 Fard</td>
                    <td className="p-3">-</td>
                    <td className="p-3">-</td>
                    <td className="p-3 font-bold text-white">8 Raka'at</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">Maghrib (Sunset)</td>
                    <td className="p-3">-</td>
                    <td className="p-3 font-bold text-red-500">3 Fard</td>
                    <td className="p-3">2 Sunnah</td>
                    <td className="p-3">2 Nafl</td>
                    <td className="p-3 font-bold text-white">7 Raka'at</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">Isha (Night)</td>
                    <td className="p-3">4 Sunnah</td>
                    <td className="p-3 font-bold text-red-500">4 Fard</td>
                    <td className="p-3">2 Sunnah</td>
                    <td className="p-3">3 Witr + 2 Nafl</td>
                    <td className="p-3 font-bold text-white">17 Raka'at</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Step-by-Step Postures and Recitations */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-red-500" />
              <span>Step-by-Step Namaz Postures & Recitations</span>
            </h3>

            <div className="space-y-4">
              {SALAH_STEPS.map((step) => (
                <div
                  key={step.stepNumber}
                  className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-850">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-red-600 text-white font-black text-sm flex items-center justify-center shrink-0">
                        {step.stepNumber}
                      </span>
                      <h4 className="text-base font-bold text-white">{step.postureName}</h4>
                    </div>
                    <span className="font-arabic text-xl font-bold text-red-500">{step.arabicName}</span>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Recitation Box */}
                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold text-zinc-400">Arabic Recitation:</span>
                      <button
                        onClick={() => soundEngine.speakArabic(step.recitationArabic, 0.85)}
                        className="text-xs text-red-400 hover:text-white flex items-center gap-1 font-semibold"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Listen</span>
                      </button>
                    </div>
                    <p className="font-arabic text-2xl font-bold text-white text-right dir-rtl leading-relaxed">
                      {step.recitationArabic}
                    </p>
                    <p className="text-xs text-zinc-300 italic">
                      "{step.recitationTransliteration}"
                    </p>
                    <p className="text-xs text-zinc-400">
                      Meaning: {step.recitationMeaning}
                    </p>
                  </div>

                  {/* Key rules */}
                  <div className="space-y-1">
                    {step.keyPoints.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2 text-xs text-zinc-400">
                        <CheckCircle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. Hajj & Umrah Guide */}
      {activeTab === 'hajj' && (
        <div className="space-y-6">
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-2">
              Pilgrimage Guide: Umrah and Hajj
            </h3>
            <p className="text-xs text-zinc-400 mb-6">
              Essential step-by-step instructions for pilgrims embarking on Umrah or the 5 days of Hajj.
            </p>

            <div className="space-y-6">
              {HAJJ_UMRAH_GUIDE.map((item, idx) => (
                <div key={idx} className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-zinc-800">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-red-500">{item.title}</span>
                      <span className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-full">
                        {item.category}
                      </span>
                    </div>
                    <span className="font-arabic text-lg font-bold text-zinc-300">{item.arabicTitle}</span>
                  </div>

                  <p className="text-xs text-zinc-300 font-medium">{item.summary}</p>

                  <div className="space-y-1.5 pl-2">
                    {item.steps.map((st, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2 text-xs text-zinc-400">
                        <span className="text-red-500 font-bold">•</span>
                        <span>{st}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. Islamic Hijri Calendar & Events */}
      {activeTab === 'calendar' && (
        <div className="space-y-6">
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">Important Islamic Calendar Dates</h3>
                <p className="text-xs text-zinc-400">Major milestones of the Islamic Hijri year.</p>
              </div>
              <span className="text-xs font-bold bg-red-600/20 text-red-400 border border-red-600/30 px-3 py-1 rounded-full">
                Hijri 1448 AH
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ISLAMIC_EVENTS.map((event, idx) => (
                <div
                  key={idx}
                  className="bg-zinc-900 border border-zinc-850 rounded-xl p-4 flex flex-col justify-between space-y-2 hover:border-red-600/50 transition"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">{event.event}</h4>
                    <span className="text-xs font-bold text-red-400 bg-red-950/40 px-2 py-0.5 rounded border border-red-800/40">
                      {event.hijriDate}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {event.significance}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
