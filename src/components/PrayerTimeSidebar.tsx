import React, { useState, useEffect } from 'react';
import { 
  getAutoLocation, 
  computePrayerTimes, 
  getNextPrayer, 
  formatLiveClock,
  formatTimeAmPm
} from '../utils/prayerTimes';
import { 
  getHijriDateDetails, 
  getHijriMonthGrid, 
  MAJOR_ISLAMIC_EVENTS,
  toArabicNumerals
} from '../utils/hijriCalendar';
import { 
  Clock, 
  MapPin, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Calendar as CalendarIcon,
  Moon,
  Sun,
  Flame,
  Award,
  BookOpen,
  ArrowRight
} from 'lucide-react';

interface PrayerTimeSidebarProps {
  onOpenFullNamaz: () => void;
  onOpenWorshipGuide?: () => void;
}

export const PrayerTimeSidebar: React.FC<PrayerTimeSidebarProps> = ({ 
  onOpenFullNamaz,
  onOpenWorshipGuide 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'namaz' | 'calendar'>('namaz');
  const [currentLoc, setCurrentLoc] = useState(() => getAutoLocation());
  const [liveClock, setLiveClock] = useState(() => formatLiveClock(new Date(), currentLoc.timezone));
  const [calendarMonthOffset, setCalendarMonthOffset] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveClock(formatLiveClock(new Date(), currentLoc.timezone));
    }, 1000);
    return () => clearInterval(timer);
  }, [currentLoc.timezone]);

  const now = new Date();
  const prayerTimes = computePrayerTimes(now, currentLoc.lat, currentLoc.lng, true);
  const nextPrayer = getNextPrayer(prayerTimes, now);
  const hijriToday = getHijriDateDetails(now);
  const monthGrid = getHijriMonthGrid(now, calendarMonthOffset);

  const prayersList = [
    { name: 'Fajr', time: formatTimeAmPm(prayerTimes.fajr) },
    { name: 'Dhuhr', time: formatTimeAmPm(prayerTimes.dhuhr) },
    { name: 'Asr', time: formatTimeAmPm(prayerTimes.asr) },
    { name: 'Maghrib', time: formatTimeAmPm(prayerTimes.maghrib) },
    { name: 'Isha', time: formatTimeAmPm(prayerTimes.isha) },
  ];

  const weekdayLetters = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <aside aria-label="Live Namaz Times and Islamic Calendar Sidebar" className="fixed top-28 right-0 z-[60] select-none">
      <div className="flex items-start">
        
        {/* Toggle Button Tab */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-1.5 py-3 px-2.5 rounded-l-2xl shadow-xl transition-all font-bold text-xs cursor-pointer ${
            isOpen 
              ? 'bg-[#6B1B7E] text-white' 
              : 'bg-white/95 backdrop-blur-md text-[#6B1B7E] border-y border-l border-[#6B1B7E]/25 hover:bg-purple-50'
          }`}
          title={isOpen ? 'Collapse Sidebar' : 'Show Live Time & Islamic Calendar'}
          aria-label={isOpen ? 'Collapse Sidebar' : 'Show Live Time & Islamic Calendar'}
        >
          {isOpen ? (
            <ChevronRight className="w-4 h-4 text-pink-300" />
          ) : (
            <>
              <div className="flex flex-col items-center gap-1">
                <Clock className="w-4 h-4 text-[#E0107F] animate-pulse" />
                <Moon className="w-3.5 h-3.5 text-[#5B2A9A]" />
              </div>
              <div className="flex flex-col text-[10px] leading-tight text-left pr-1">
                <span className="font-mono font-bold text-slate-900">{liveClock.slice(0, 5)}</span>
                <span className="text-[#E0107F] font-black">{nextPrayer.name}</span>
                <span className="text-[9px] text-[#5B2A9A] font-semibold">{hijriToday.day} {hijriToday.monthName.slice(0, 6)}</span>
              </div>
              <ChevronLeft className="w-3.5 h-3.5 text-[#6B1B7E]" />
            </>
          )}
        </button>

        {/* Expanded Sidebar Drawer */}
        {isOpen && (
          <div className="w-80 max-h-[85vh] overflow-y-auto bg-white/95 backdrop-blur-2xl border-y border-l border-[#6B1B7E]/20 shadow-2xl rounded-l-3xl p-4 space-y-3.5 animate-in slide-in-from-right duration-200 text-slate-800">
            
            {/* Top Switcher Tabs: Namaz Times vs Islamic Calendar */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('namaz')}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'namaz'
                    ? 'bg-[#6B1B7E] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#6B1B7E]'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Namaz & Clock</span>
              </button>

              <button
                onClick={() => setActiveTab('calendar')}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'calendar'
                    ? 'bg-gradient-to-r from-[#6B1B7E] to-[#E0107F] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#6B1B7E]'
                }`}
              >
                <CalendarIcon className="w-3.5 h-3.5" />
                <span>Islamic Calendar</span>
              </button>
            </div>

            {/* TAB 1: NAMAZ TIMES & LIVE DIGITAL CLOCK */}
            {activeTab === 'namaz' && (
              <div className="space-y-3.5">
                {/* Live Clock & Location */}
                <div className="border-b border-[#6B1B7E]/15 pb-2.5 space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#E0107F]" />
                      <span>{currentLoc.city}, {currentLoc.country}</span>
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Live GPS / Timezone Sync" />
                  </div>

                  {/* Large Digital Clock */}
                  <div className="font-mono text-2xl font-black text-[#6B1B7E] tracking-tight">
                    {liveClock}
                  </div>

                  {/* Hijri Date Subtitle */}
                  <div className="flex items-center justify-between text-[11px] text-[#5B2A9A] font-semibold">
                    <span>{hijriToday.formattedEnglish}</span>
                    <span className="font-arabic text-xs font-bold">{hijriToday.formattedArabic}</span>
                  </div>
                </div>

                {/* Next Namaz Countdown Card */}
                <div className="bg-gradient-to-r from-[#6B1B7E] via-[#5B2A9A] to-[#E0107F] text-white p-3 rounded-2xl shadow-md space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-bold text-pink-200">
                    <span>Next Prayer</span>
                    <span className="bg-white/20 px-2 py-0.5 rounded-full text-white text-[10px]">
                      in {nextPrayer.remainingFormatted}
                    </span>
                  </div>
                  <p className="text-xl font-black">
                    {nextPrayer.name} Salah
                  </p>
                  <p className="text-xs text-purple-100 font-mono">
                    Adhan time at {nextPrayer.time}
                  </p>
                </div>

                {/* Today's 5 Daily Prayers List */}
                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Today's Schedule ({currentLoc.city})
                  </p>
                  <div className="space-y-1">
                    {prayersList.map((prayer) => {
                      const isNext = prayer.name === nextPrayer.name;
                      return (
                        <div
                          key={prayer.name}
                          className={`flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                            isNext
                              ? 'bg-purple-100/90 text-[#6B1B7E] border border-[#6B1B7E]/30'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span className="flex items-center gap-1.5">
                            {isNext && <span className="w-1.5 h-1.5 rounded-full bg-[#E0107F]" />}
                            <span>{prayer.name}</span>
                          </span>
                          <span className="font-mono text-slate-900">{prayer.time}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Buttons */}
                <div className="space-y-1.5 pt-1">
                  <button
                    onClick={() => {
                      onOpenFullNamaz();
                      setIsOpen(false);
                    }}
                    className="w-full py-2 bg-purple-50 hover:bg-purple-100 text-[#6B1B7E] rounded-xl text-xs font-bold border border-[#6B1B7E]/20 transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <CalendarIcon className="w-3.5 h-3.5 text-[#E0107F]" />
                    <span>Open Monthly Schedule & Qibla</span>
                  </button>

                  {onOpenWorshipGuide && (
                    <button
                      onClick={() => {
                        onOpenWorshipGuide();
                        setIsOpen(false);
                      }}
                      className="w-full py-2 bg-gradient-to-r from-[#6B1B7E]/10 to-[#E0107F]/10 hover:from-[#6B1B7E]/20 hover:to-[#E0107F]/20 text-[#6B1B7E] rounded-xl text-xs font-bold border border-[#6B1B7E]/20 transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-[#E0107F]" />
                      <span>True Way of Namaz & Roza Guide</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: ISLAMIC (HIJRI) CALENDAR */}
            {activeTab === 'calendar' && (
              <div className="space-y-3">
                {/* Active Hijri Month Banner & Navigator */}
                <div className="bg-gradient-to-br from-[#6B1B7E] to-[#5B2A9A] text-white p-3 rounded-2xl shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setCalendarMonthOffset(prev => prev - 1)}
                      className="p-1 hover:bg-white/20 rounded-lg transition cursor-pointer"
                      title="Previous Islamic Month"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <div className="text-center">
                      <p className="text-sm font-black tracking-wide">
                        {monthGrid.monthName} {monthGrid.year} AH
                      </p>
                      <p className="font-arabic text-xs text-pink-200 font-bold">
                        {monthGrid.monthArabic} {toArabicNumerals(monthGrid.year)} هـ
                      </p>
                    </div>

                    <button
                      onClick={() => setCalendarMonthOffset(prev => prev + 1)}
                      className="p-1 hover:bg-white/20 rounded-lg transition cursor-pointer"
                      title="Next Islamic Month"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {calendarMonthOffset !== 0 && (
                    <button
                      onClick={() => setCalendarMonthOffset(0)}
                      className="w-full py-0.5 text-[10px] bg-white/20 hover:bg-white/30 rounded-lg font-bold text-center cursor-pointer transition"
                    >
                      Back to Today ({hijriToday.monthName})
                    </button>
                  )}

                  {monthGrid.isSacred && (
                    <div className="text-center">
                      <span className="text-[10px] bg-amber-400/25 border border-amber-300/40 text-amber-200 px-2 py-0.5 rounded-full font-bold">
                        ✦ One of the 4 Sacred Months (الأشهر الحرم)
                      </span>
                    </div>
                  )}
                </div>

                {/* Today's Special Indicator Card */}
                {hijriToday.specialEvent && calendarMonthOffset === 0 && (
                  <div className="bg-pink-50 border border-pink-200/80 rounded-xl p-2.5 flex items-start gap-2 text-xs">
                    <Sparkles className="w-4 h-4 text-[#E0107F] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[#6B1B7E]">{hijriToday.specialEvent}</p>
                      <p className="text-[10px] text-slate-600">
                        {hijriToday.isWhiteDay 
                          ? 'Sunnah fasting of Ayyam al-Beed recommended on 13th, 14th & 15th.' 
                          : hijriToday.isFriday 
                          ? 'Recite Surah Al-Kahf & send excessive Durood upon Prophet ﷺ.' 
                          : 'Blessed Islamic date.'}
                      </p>
                    </div>
                  </div>
                )}

                {/* Monthly Days Grid */}
                <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-200 space-y-1.5">
                  {/* Weekday headers */}
                  <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-black text-slate-400">
                    {weekdayLetters.map((w, idx) => (
                      <span key={idx} className={idx === 5 ? 'text-[#E0107F]' : ''}>{w}</span>
                    ))}
                  </div>

                  {/* Empty offsets for starting day */}
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {Array.from({ length: (monthGrid.days[0]?.weekdayIndex || 0) }).map((_, idx) => (
                      <div key={`empty-${idx}`} className="h-7" />
                    ))}

                    {/* Month Days */}
                    {monthGrid.days.map((d) => (
                      <div
                        key={d.hijriDay}
                        title={`Day ${d.hijriDay} of ${monthGrid.monthName} ${d.event ? `· ${d.event}` : ''}`}
                        className={`h-7 rounded-lg text-xs font-bold flex flex-col items-center justify-center relative transition ${
                          d.isToday
                            ? 'bg-gradient-to-r from-[#6B1B7E] to-[#E0107F] text-white shadow-xs scale-105'
                            : d.isWhiteDay
                            ? 'bg-purple-100 text-[#6B1B7E] border border-[#6B1B7E]/20'
                            : d.isFriday
                            ? 'bg-emerald-50 text-emerald-800'
                            : 'text-slate-700 hover:bg-slate-200/60'
                        }`}
                      >
                        <span>{d.hijriDay}</span>
                        {d.isWhiteDay && !d.isToday && (
                          <span className="w-1 h-1 rounded-full bg-[#E0107F] -mt-0.5" />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Legend */}
                  <div className="flex items-center justify-between text-[9px] text-slate-500 pt-1 border-t border-slate-200">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded bg-gradient-to-r from-[#6B1B7E] to-[#E0107F]" />
                      <span>Today</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded bg-purple-100 border border-[#6B1B7E]/20" />
                      <span>White Days (13-15)</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded bg-emerald-50 text-emerald-800" />
                      <span>Friday</span>
                    </span>
                  </div>
                </div>

                {/* Upcoming Major Events in Islam */}
                <div className="space-y-1.5">
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Key Islamic Milestones
                  </p>
                  <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
                    {MAJOR_ISLAMIC_EVENTS.slice(0, 5).map((evt, idx) => (
                      <div 
                        key={idx}
                        className="bg-white p-2 rounded-xl border border-slate-200 text-xs flex items-start justify-between gap-1.5 shadow-2xs"
                      >
                        <div>
                          <p className="font-bold text-slate-900">{evt.title}</p>
                          <p className="text-[10px] text-slate-500">{evt.hijriDay} {evt.monthName}</p>
                        </div>
                        <span className="font-arabic text-[11px] text-[#6B1B7E] font-bold shrink-0">
                          {evt.arabicTitle}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

      </div>
    </aside>
  );
};
