import React, { useState, useEffect } from 'react';
import { 
  getAutoLocation, 
  computePrayerTimes, 
  getNextPrayer, 
  formatLiveClock,
  formatTimeAmPm,
  getPrayerAvailabilitySchedule
} from '../utils/prayerTimes';
import { 
  getWorldDateMetrics, 
  getWorldMonthGrid, 
  getWorldTimezoneHubs 
} from '../utils/worldCalendar';
import { 
  Clock, 
  MapPin, 
  ChevronRight, 
  ChevronLeft, 
  Globe, 
  Calendar as CalendarIcon,
  Sun,
  BookOpen,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Sparkles
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
  const [activeTab, setActiveTab] = useState<'namaz' | 'world_calendar'>('namaz');
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
  const worldMetrics = getWorldDateMetrics(now);
  const monthGrid = getWorldMonthGrid(now, calendarMonthOffset);
  const worldHubs = getWorldTimezoneHubs(now);

  const toHHMM = (d: Date) => `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;

  const availability = getPrayerAvailabilitySchedule({
    fajr: toHHMM(prayerTimes.fajr),
    sunrise: toHHMM(prayerTimes.sunrise),
    dhuhr: toHHMM(prayerTimes.dhuhr),
    asr: toHHMM(prayerTimes.asr),
    maghrib: toHHMM(prayerTimes.maghrib),
    isha: toHHMM(prayerTimes.isha)
  }, now);

  const prayersList = [
    { id: 'fajr', name: 'Fajr', time: formatTimeAmPm(prayerTimes.fajr) },
    { id: 'dhuhr', name: 'Dhuhr', time: formatTimeAmPm(prayerTimes.dhuhr) },
    { id: 'asr', name: 'Asr', time: formatTimeAmPm(prayerTimes.asr) },
    { id: 'maghrib', name: 'Maghrib', time: formatTimeAmPm(prayerTimes.maghrib) },
    { id: 'isha', name: 'Isha', time: formatTimeAmPm(prayerTimes.isha) },
  ];

  const weekdayLetters = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <aside aria-label="Live Namaz Times and World Calendar Sidebar" className="fixed top-28 right-0 z-[60] select-none">
      <div className="flex items-start">
        
        {/* Toggle Button Tab */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-1.5 py-3 px-2.5 rounded-l-2xl shadow-xl transition-all font-bold text-xs cursor-pointer ${
            isOpen 
              ? 'bg-[#6B1B7E] text-white' 
              : 'bg-white/95 backdrop-blur-md text-[#6B1B7E] border-y border-l border-[#6B1B7E]/25 hover:bg-purple-50'
          }`}
          title={isOpen ? 'Collapse Sidebar' : 'Show Live Time & World Calendar'}
          aria-label={isOpen ? 'Collapse Sidebar' : 'Show Live Time & World Calendar'}
        >
          {isOpen ? (
            <ChevronRight className="w-4 h-4 text-pink-300" />
          ) : (
            <>
              <div className="flex flex-col items-center gap-1">
                <Clock className="w-4 h-4 text-[#E0107F]" />
                <Globe className="w-3.5 h-3.5 text-[#5B2A9A]" />
              </div>
              <div className="flex flex-col text-[10px] leading-tight text-left pr-1">
                <span className="font-mono font-bold text-slate-900">{liveClock.slice(0, 5)}</span>
                <span className="text-[#E0107F] font-black">{nextPrayer.name}</span>
                <span className="text-[9px] text-slate-500 font-semibold">{worldMetrics.formattedShort}</span>
              </div>
              <ChevronLeft className="w-3.5 h-3.5 text-[#6B1B7E]" />
            </>
          )}
        </button>

        {/* Expanded Sidebar Drawer */}
        {isOpen && (
          <div className="w-84 max-h-[85vh] overflow-y-auto bg-white/98 backdrop-blur-2xl border-y border-l border-[#6B1B7E]/20 shadow-2xl rounded-l-3xl p-4 space-y-4 animate-in slide-in-from-right duration-200 text-slate-800">
            
            {/* Top Switcher Tabs: Namaz Times vs Today World Calendar */}
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
                onClick={() => setActiveTab('world_calendar')}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'world_calendar'
                    ? 'bg-gradient-to-r from-[#6B1B7E] to-[#E0107F] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#6B1B7E]'
                }`}
              >
                <CalendarIcon className="w-3.5 h-3.5" />
                <span>World Calendar</span>
              </button>
            </div>

            {/* TAB 1: NAMAZ TIMES & LIVE LOCAL DIGITAL CLOCK */}
            {activeTab === 'namaz' && (
              <div className="space-y-3.5">
                {/* Live Clock & Location */}
                <div className="border-b border-[#6B1B7E]/15 pb-2.5 space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#E0107F]" />
                      <span>{currentLoc.city}, {currentLoc.country}</span>
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Live Timezone Sync" />
                  </div>

                  {/* Large Digital Clock */}
                  <div className="font-mono text-2xl font-black text-[#6B1B7E] tracking-tight">
                    {liveClock}
                  </div>

                  {/* Standard World Gregorian Date Subtitle */}
                  <div className="flex items-center justify-between text-[11px] text-slate-600 font-semibold">
                    <span>{worldMetrics.formattedFull}</span>
                  </div>
                </div>

                {/* CURRENTLY AVAILABLE PRAYER CARD */}
                {availability.currentlyAvailable && (
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-3.5 rounded-2xl shadow-md space-y-1 border border-emerald-300/40">
                    <div className="flex items-center justify-between text-[11px] font-bold text-emerald-200">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                        <span>AVAILABLE NOW TO PRAY</span>
                      </span>
                      <span className="bg-black/20 px-2 py-0.5 rounded-full text-amber-300 font-mono text-[10px]">
                        {availability.currentlyAvailable.timeRemainingFormatted} left
                      </span>
                    </div>
                    <p className="text-lg font-black">
                      {availability.currentlyAvailable.name} Salah ({availability.currentlyAvailable.arabicName})
                    </p>
                    <p className="text-xs text-emerald-100 font-medium">
                      Window: {availability.currentlyAvailable.startTime} – {availability.currentlyAvailable.endTime}
                    </p>
                  </div>
                )}

                {/* Next Namaz Countdown Card */}
                <div className="bg-gradient-to-r from-[#6B1B7E] via-[#5B2A9A] to-[#E0107F] text-white p-3.5 rounded-2xl shadow-md space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-bold text-pink-200">
                    <span>Next Scheduled Prayer</span>
                    <span className="bg-white/20 px-2 py-0.5 rounded-full text-white text-[10px]">
                      in {nextPrayer.remainingFormatted}
                    </span>
                  </div>
                  <p className="text-lg font-black">
                    {nextPrayer.name} Prayer
                  </p>
                  <p className="text-xs text-purple-100 font-mono">
                    Adhan time at {nextPrayer.time} ({currentLoc.city})
                  </p>
                </div>

                {/* Today's 5 Daily Prayers List */}
                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Today's Prayer Schedule ({currentLoc.city})
                  </p>
                  <div className="space-y-1">
                    {prayersList.map((prayer) => {
                      const isAvail = availability.currentlyAvailable?.id === prayer.id;
                      const isNext = prayer.name === nextPrayer.name;
                      return (
                        <div
                          key={prayer.name}
                          className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition ${
                            isAvail
                              ? 'bg-emerald-50 text-emerald-900 border-2 border-emerald-500 shadow-xs ring-1 ring-emerald-400'
                              : isNext
                              ? 'bg-purple-100/90 text-[#6B1B7E] border border-[#6B1B7E]/30'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span className="flex items-center gap-1.5">
                            {isAvail ? (
                              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                            ) : isNext ? (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#E0107F]" />
                            ) : null}
                            <span>{prayer.name}</span>
                            {isAvail && (
                              <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded-full bg-emerald-600 text-white">
                                Available Now
                              </span>
                            )}
                            {isNext && !isAvail && (
                              <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded-full bg-pink-100 text-[#E0107F]">
                                Next
                              </span>
                            )}
                          </span>
                          <span className={`font-mono ${isAvail ? 'text-emerald-800 font-black' : 'text-slate-900'}`}>{prayer.time}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-1.5 pt-1">
                  <button
                    onClick={() => {
                      onOpenFullNamaz();
                      setIsOpen(false);
                    }}
                    className="w-full py-2 bg-purple-50 hover:bg-purple-100 text-[#6B1B7E] rounded-xl text-xs font-bold border border-[#6B1B7E]/20 transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <CalendarIcon className="w-3.5 h-3.5 text-[#E0107F]" />
                    <span>Open Full Namaz Schedule & Qibla</span>
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

            {/* TAB 2: TODAY'S WORLD CALENDAR */}
            {activeTab === 'world_calendar' && (
              <div className="space-y-3.5">
                
                {/* Active Month Banner & Month Navigator */}
                <div className="bg-gradient-to-br from-[#6B1B7E] via-[#5B2A9A] to-[#E0107F] text-white p-3.5 rounded-2xl shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setCalendarMonthOffset(prev => prev - 1)}
                      className="p-1 hover:bg-white/20 rounded-lg transition cursor-pointer"
                      title="Previous Month"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <div className="text-center">
                      <p className="text-sm font-black tracking-wide">
                        {monthGrid.monthName} {monthGrid.year}
                      </p>
                      <p className="text-[11px] text-pink-200 font-medium">
                        World Calendar · {monthGrid.daysInMonth} Days
                      </p>
                    </div>

                    <button
                      onClick={() => setCalendarMonthOffset(prev => prev + 1)}
                      className="p-1 hover:bg-white/20 rounded-lg transition cursor-pointer"
                      title="Next Month"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {calendarMonthOffset !== 0 && (
                    <button
                      onClick={() => setCalendarMonthOffset(0)}
                      className="w-full py-1 text-[10px] bg-white/20 hover:bg-white/30 rounded-lg font-bold text-center cursor-pointer transition"
                    >
                      Return to Current Month ({worldMetrics.monthName} {worldMetrics.year})
                    </button>
                  )}
                </div>

                {/* World Date Snapshot Cards */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-100">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Day of Year</span>
                    <span className="text-base font-black text-[#6B1B7E]">Day {worldMetrics.dayOfYear}</span>
                    <span className="text-[10px] text-slate-500 block">of {worldMetrics.totalDaysInYear} days</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-100">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Calendar Week</span>
                    <span className="text-base font-black text-[#6B1B7E]">Week {worldMetrics.weekNumber}</span>
                    <span className="text-[10px] text-slate-500 block">Quarter {worldMetrics.quarter}</span>
                  </div>
                </div>

                {/* Monthly Days Grid */}
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1.5">
                  {/* Weekday headers */}
                  <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-black text-slate-400">
                    {weekdayLetters.map((w, idx) => (
                      <span key={idx} className={idx === 0 || idx === 6 ? 'text-slate-500' : ''}>{w}</span>
                    ))}
                  </div>

                  {/* Empty offsets for starting weekday */}
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {Array.from({ length: monthGrid.startWeekday }).map((_, idx) => (
                      <div key={`empty-${idx}`} className="h-7" />
                    ))}

                    {/* Month Days */}
                    {monthGrid.days.map((d) => (
                      <div
                        key={d.dayNumber}
                        title={`Day ${d.dayNumber} of ${monthGrid.monthName} ${monthGrid.year}`}
                        className={`h-7 rounded-lg text-xs font-bold flex items-center justify-center transition ${
                          d.isToday
                            ? 'bg-gradient-to-r from-[#6B1B7E] to-[#E0107F] text-white shadow-xs scale-105'
                            : d.isWeekend
                            ? 'text-slate-500 bg-slate-100/70'
                            : 'text-slate-700 hover:bg-slate-200/60'
                        }`}
                      >
                        {d.dayNumber}
                      </div>
                    ))}
                  </div>

                  {/* Legend */}
                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-200">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded bg-gradient-to-r from-[#6B1B7E] to-[#E0107F]" />
                      <span>Today ({worldMetrics.formattedShort})</span>
                    </span>
                    <span>{worldMetrics.daysRemainingInYear} days left in {worldMetrics.year}</span>
                  </div>
                </div>

                {/* Major World Timezones Hub */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-[#6B1B7E]" />
                      <span>Global Timezone Hubs</span>
                    </p>
                    <span className="text-[10px] text-slate-400 font-mono">Live Sync</span>
                  </div>

                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {worldHubs.map((hub) => (
                      <div 
                        key={hub.city}
                        className="bg-white p-2 rounded-xl border border-slate-200 text-xs flex items-center justify-between gap-2 shadow-2xs hover:border-[#6B1B7E]/30 transition"
                      >
                        <div>
                          <p className="font-bold text-slate-900 leading-tight">{hub.city}</p>
                          <p className="text-[10px] text-slate-500">{hub.tag} · {hub.country}</p>
                        </div>
                        <div className="text-right">
                          <span className="font-mono font-black text-[#6B1B7E] block text-xs">
                            {hub.timeString}
                          </span>
                          <span className="text-[9px] text-slate-400 font-mono">
                            {hub.offsetString}
                          </span>
                        </div>
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
