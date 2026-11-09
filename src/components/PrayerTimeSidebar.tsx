import React, { useState, useEffect } from 'react';
import { 
  computePrayerTimes, 
  getNextPrayer, 
  formatLiveClock,
  formatTimeAmPm,
  getPrayerAvailabilitySchedule,
  getEstimatedHijriDate
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
  BookOpen,
  Sparkles,
  X,
  CheckCircle2,
  SlidersHorizontal,
  Compass,
  ArrowRight
} from 'lucide-react';

export interface WorldwideLocationItem {
  id: string;
  city: string;
  country: string;
  flag: string;
  region: 'UK & Europe' | 'North America' | 'Middle East' | 'Asia & Pacific';
  timezone: string;
  lat: number;
  lng: number;
}

export const WORLDWIDE_STUDENT_LOCATIONS: WorldwideLocationItem[] = [
  // United Kingdom
  { id: 'uk-london', city: 'London', country: 'United Kingdom', flag: '🇬🇧', region: 'UK & Europe', timezone: 'Europe/London', lat: 51.5074, lng: -0.1278 },
  { id: 'uk-birmingham', city: 'Birmingham', country: 'United Kingdom', flag: '🇬🇧', region: 'UK & Europe', timezone: 'Europe/London', lat: 52.4862, lng: -1.8904 },
  { id: 'uk-manchester', city: 'Manchester', country: 'United Kingdom', flag: '🇬🇧', region: 'UK & Europe', timezone: 'Europe/London', lat: 53.4808, lng: -2.2426 },
  { id: 'uk-glasgow', city: 'Glasgow', country: 'United Kingdom', flag: '🇬🇧', region: 'UK & Europe', timezone: 'Europe/London', lat: 55.8642, lng: -4.2518 },

  // United States
  { id: 'us-nyc', city: 'New York', country: 'United States', flag: '🇺🇸', region: 'North America', timezone: 'America/New_York', lat: 40.7128, lng: -74.0060 },
  { id: 'us-chicago', city: 'Chicago', country: 'United States', flag: '🇺🇸', region: 'North America', timezone: 'America/Chicago', lat: 41.8781, lng: -87.6298 },
  { id: 'us-houston', city: 'Houston / Dallas', country: 'United States', flag: '🇺🇸', region: 'North America', timezone: 'America/Chicago', lat: 29.7604, lng: -95.3698 },
  { id: 'us-la', city: 'Los Angeles', country: 'United States', flag: '🇺🇸', region: 'North America', timezone: 'America/Los_Angeles', lat: 34.0522, lng: -118.2437 },

  // Canada
  { id: 'ca-toronto', city: 'Toronto', country: 'Canada', flag: '🇨🇦', region: 'North America', timezone: 'America/Toronto', lat: 43.6532, lng: -79.3832 },
  { id: 'ca-vancouver', city: 'Vancouver', country: 'Canada', flag: '🇨🇦', region: 'North America', timezone: 'America/Vancouver', lat: 49.2827, lng: -123.1207 },
  { id: 'ca-montreal', city: 'Montreal', country: 'Canada', flag: '🇨🇦', region: 'North America', timezone: 'America/Toronto', lat: 45.5017, lng: -73.5673 },
  { id: 'ca-calgary', city: 'Calgary', country: 'Canada', flag: '🇨🇦', region: 'North America', timezone: 'America/Edmonton', lat: 51.0447, lng: -114.0719 },

  // Australia
  { id: 'au-sydney', city: 'Sydney', country: 'Australia', flag: '🇦🇺', region: 'Asia & Pacific', timezone: 'Australia/Sydney', lat: -33.8688, lng: 151.2093 },
  { id: 'au-melbourne', city: 'Melbourne', country: 'Australia', flag: '🇦🇺', region: 'Asia & Pacific', timezone: 'Australia/Melbourne', lat: -37.8136, lng: 144.9631 },
  { id: 'au-perth', city: 'Perth', country: 'Australia', flag: '🇦🇺', region: 'Asia & Pacific', timezone: 'Australia/Perth', lat: -31.9505, lng: 115.8605 },

  // Middle East & Gulf
  { id: 'sa-makkah', city: 'Makkah Mukarramah', country: 'Saudi Arabia', flag: '🇸🇦', region: 'Middle East', timezone: 'Asia/Riyadh', lat: 21.3891, lng: 39.8579 },
  { id: 'sa-madinah', city: 'Madinah Munawwarah', country: 'Saudi Arabia', flag: '🇸🇦', region: 'Middle East', timezone: 'Asia/Riyadh', lat: 24.5247, lng: 39.5692 },
  { id: 'sa-riyadh', city: 'Riyadh', country: 'Saudi Arabia', flag: '🇸🇦', region: 'Middle East', timezone: 'Asia/Riyadh', lat: 24.7136, lng: 46.6753 },
  { id: 'ae-dubai', city: 'Dubai', country: 'United Arab Emirates', flag: '🇦🇪', region: 'Middle East', timezone: 'Asia/Dubai', lat: 25.2048, lng: 55.2708 },
  { id: 'qa-doha', city: 'Doha', country: 'Qatar', flag: '🇶🇦', region: 'Middle East', timezone: 'Asia/Qatar', lat: 25.2854, lng: 51.5310 },
  { id: 'kw-kuwait', city: 'Kuwait City', country: 'Kuwait', flag: '🇰🇼', region: 'Middle East', timezone: 'Asia/Kuwait', lat: 29.3759, lng: 47.9774 },

  // Pakistan
  { id: 'pk-karachi', city: 'Karachi', country: 'Pakistan', flag: '🇵🇰', region: 'Asia & Pacific', timezone: 'Asia/Karachi', lat: 24.8607, lng: 67.0011 },
  { id: 'pk-lahore', city: 'Lahore', country: 'Pakistan', flag: '🇵🇰', region: 'Asia & Pacific', timezone: 'Asia/Karachi', lat: 31.5204, lng: 74.3587 },
  { id: 'pk-islamabad', city: 'Islamabad', country: 'Pakistan', flag: '🇵🇰', region: 'Asia & Pacific', timezone: 'Asia/Karachi', lat: 33.6844, lng: 73.0479 },

  // Europe
  { id: 'fr-paris', city: 'Paris', country: 'France', flag: '🇫🇷', region: 'UK & Europe', timezone: 'Europe/Paris', lat: 48.8566, lng: 2.3522 },
  { id: 'de-berlin', city: 'Berlin / Frankfurt', country: 'Germany', flag: '🇩🇪', region: 'UK & Europe', timezone: 'Europe/Berlin', lat: 52.5200, lng: 13.4050 },
  { id: 'nl-amsterdam', city: 'Amsterdam', country: 'Netherlands', flag: '🇳🇱', region: 'UK & Europe', timezone: 'Europe/Amsterdam', lat: 52.3676, lng: 4.9041 },
  { id: 'ie-dublin', city: 'Dublin', country: 'Ireland', flag: '🇮🇪', region: 'UK & Europe', timezone: 'Europe/Dublin', lat: 53.3498, lng: -6.2603 },
  { id: 'my-kl', city: 'Kuala Lumpur', country: 'Malaysia', flag: '🇲🇾', region: 'Asia & Pacific', timezone: 'Asia/Kuala_Lumpur', lat: 3.1390, lng: 101.6869 }
];

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
  
  // Location selection for worldwide students
  const [selectedLocation, setSelectedLocation] = useState<WorldwideLocationItem>(() => {
    try {
      const saved = localStorage.getItem('twq_student_location');
      if (saved) {
        const parsed = JSON.parse(saved);
        const match = WORLDWIDE_STUDENT_LOCATIONS.find(l => l.id === parsed.id);
        if (match) return match;
      }
      // Auto match by browser timezone
      const browserTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const tzMatch = WORLDWIDE_STUDENT_LOCATIONS.find(l => l.timezone === browserTz);
      if (tzMatch) return tzMatch;
    } catch {}
    return WORLDWIDE_STUDENT_LOCATIONS[0]; // Default London UK
  });

  // Live Clock state updated every second
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [liveClock, setLiveClock] = useState(() => formatLiveClock(new Date(), selectedLocation.timezone));
  const [calendarMonthOffset, setCalendarMonthOffset] = useState<number>(0);

  // Timer update every second for live clock
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentDate(now);
      setLiveClock(formatLiveClock(now, selectedLocation.timezone));
    }, 1000);
    return () => clearInterval(timer);
  }, [selectedLocation.timezone]);

  // Save selected location
  const handleSelectLocation = (loc: WorldwideLocationItem) => {
    setSelectedLocation(loc);
    try {
      localStorage.setItem('twq_student_location', JSON.stringify(loc));
    } catch {}
    setLiveClock(formatLiveClock(new Date(), loc.timezone));
  };

  // Astronomical Prayer Times Calculation for Selected Worldwide Student Location
  const prayerTimes = computePrayerTimes(currentDate, selectedLocation.lat, selectedLocation.lng, true, selectedLocation.timezone);
  const nextPrayer = getNextPrayer(prayerTimes, currentDate);
  const worldMetrics = getWorldDateMetrics(currentDate);
  const monthGrid = getWorldMonthGrid(currentDate, calendarMonthOffset);
  const hijriDate = getEstimatedHijriDate(currentDate);

  const toHHMM = (d: Date) => `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;

  const availability = getPrayerAvailabilitySchedule({
    fajr: toHHMM(prayerTimes.fajr),
    sunrise: toHHMM(prayerTimes.sunrise),
    dhuhr: toHHMM(prayerTimes.dhuhr),
    asr: toHHMM(prayerTimes.asr),
    maghrib: toHHMM(prayerTimes.maghrib),
    isha: toHHMM(prayerTimes.isha)
  }, currentDate, selectedLocation.timezone);

  const prayersList = [
    { id: 'fajr', name: 'Fajr', arabic: 'الفَجْر', time: formatTimeAmPm(prayerTimes.fajr), desc: 'Dawn obligatory prayer (2 Sunnah + 2 Fard)' },
    { id: 'sunrise', name: 'Sunrise (Ishraq)', arabic: 'الشُّرُوق', time: formatTimeAmPm(prayerTimes.sunrise), desc: 'End of Fajr · Voluntary morning Ishraq/Duha' },
    { id: 'dhuhr', name: 'Dhuhr', arabic: 'الظُّهْر', time: formatTimeAmPm(prayerTimes.dhuhr), desc: 'Midday noon prayer (4 Sunnah + 4 Fard + 2 Sunnah)' },
    { id: 'asr', name: 'Asr', arabic: 'العَصْر', time: formatTimeAmPm(prayerTimes.asr), desc: 'Late afternoon prayer (4 Fard)' },
    { id: 'maghrib', name: 'Maghrib', arabic: 'المَغْرِب', time: formatTimeAmPm(prayerTimes.maghrib), desc: 'Sunset prayer (3 Fard + 2 Sunnah)' },
    { id: 'isha', name: 'Isha', arabic: 'العِشَاء', time: formatTimeAmPm(prayerTimes.isha), desc: 'Night prayer (4 Fard + 2 Sunnah + 3 Witr)' },
    { id: 'tahajjud', name: 'Tahajjud', arabic: 'التَّهَجُّد', time: formatTimeAmPm(prayerTimes.tahajjud), desc: 'Optional late night prayer before Fajr' }
  ];

  const weekdayLetters = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const ongoingPrayer = availability.currentlyAvailable;
  const upcomingPrayer = availability.upcomingNext;

  return (
    <aside 
      aria-label="Live Namaz Times, Worldwide Clock, and Prayer Schedule" 
      className="fixed top-20 sm:top-24 right-0 z-50 select-none transition-all duration-300"
    >
      <div className="flex items-start">
        
        {/* Floating Side Tab Badge - Compact & Short */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-1.5 py-1.5 px-2.5 rounded-l-xl shadow-lg transition-all cursor-pointer ${
            isOpen 
              ? 'bg-[#6E1373] text-white ring-2 ring-purple-300/40' 
              : 'bg-white/95 backdrop-blur-md text-[#6E1373] border-y border-l border-[#6E1373]/25 hover:bg-purple-50 hover:shadow-xl'
          }`}
          title={isOpen ? 'Close Worldwide Namaz Panel' : 'Open Live Namaz Times, Clock & Calendar'}
          aria-label={isOpen ? 'Close Worldwide Namaz Panel' : 'Open Live Namaz Times, Clock & Calendar'}
        >
          {isOpen ? (
            <div className="flex items-center gap-1">
              <ChevronRight className="w-3.5 h-3.5 text-pink-300" />
              <span className="text-[11px] font-bold hidden sm:inline">Close</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1">
                <span className="text-xs leading-none">🕌</span>
                <span className="text-[11px] font-black font-mono text-slate-900">{liveClock.slice(0, 5)}</span>
                <span className="text-[9px] font-bold text-purple-700 bg-purple-50 px-1 rounded">{selectedLocation.flag}</span>
              </div>
              {/* Clearly mark ongoing prayer on collapsed badge */}
              {ongoingPrayer ? (
                <div className="hidden sm:flex items-center gap-1 text-[9px] border-l border-slate-200 pl-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-emerald-700 font-bold">{ongoingPrayer.name}</span>
                </div>
              ) : null}
              <ChevronLeft className="w-3 h-3 text-[#6E1373]" />
            </div>
          )}
        </button>

        {/* Expanded Worldwide Student Sidebar Drawer - Shortened */}
        {isOpen && (
          <div className="w-[300px] sm:w-[330px] max-h-[70vh] overflow-y-auto bg-white/98 backdrop-blur-2xl border-y border-l border-[#6E1373]/25 shadow-2xl rounded-l-2xl p-3.5 space-y-3 animate-in slide-in-from-right duration-200 text-slate-800">
            
            {/* Header: Title & Close Button */}
            <div className="flex items-center justify-between pb-1.5 border-b border-purple-100">
              <div className="flex items-center gap-1.5">
                <span className="text-base">🕌</span>
                <div>
                  <h3 className="text-xs sm:text-sm font-black text-[#6E1373] leading-tight">
                    Worldwide Namaz & Clock
                  </h3>
                  <p className="text-[9px] text-slate-500 font-semibold">
                    Live schedule for students
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition cursor-pointer"
                aria-label="Close Sidebar"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Worldwide Country & City Selector */}
            <div className="space-y-1.5 bg-purple-50/70 p-3 rounded-2xl border border-purple-100">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#6E1373]" />
                  <span>Select Student Country / City:</span>
                </span>
                <span className="text-[10px] text-purple-700 font-bold bg-white px-2 py-0.5 rounded-md border border-purple-200">
                  {selectedLocation.flag} {selectedLocation.country}
                </span>
              </div>

              <select
                value={selectedLocation.id}
                onChange={(e) => {
                  const found = WORLDWIDE_STUDENT_LOCATIONS.find(l => l.id === e.target.value);
                  if (found) handleSelectLocation(found);
                }}
                className="w-full bg-white border border-purple-200 text-xs font-bold text-slate-800 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#6E1373]/30 cursor-pointer"
              >
                {WORLDWIDE_STUDENT_LOCATIONS.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.flag} {loc.city}, {loc.country} ({loc.timezone})
                  </option>
                ))}
              </select>

              {/* Quick Country Pills */}
              <div className="flex flex-wrap gap-1 pt-1">
                {[
                  { id: 'uk-london', label: '🇬🇧 UK' },
                  { id: 'us-nyc', label: '🇺🇸 USA' },
                  { id: 'ca-toronto', label: '🇨🇦 Canada' },
                  { id: 'au-sydney', label: '🇦🇺 Australia' },
                  { id: 'ae-dubai', label: '🇦🇪 UAE' },
                  { id: 'sa-makkah', label: '🇸🇦 Makkah' },
                  { id: 'pk-karachi', label: '🇵🇰 Pakistan' }
                ].map(p => (
                  <button
                    key={p.id}
                    onClick={() => {
                      const found = WORLDWIDE_STUDENT_LOCATIONS.find(l => l.id === p.id);
                      if (found) handleSelectLocation(found);
                    }}
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md transition cursor-pointer ${
                      selectedLocation.id === p.id
                        ? 'bg-[#6E1373] text-white shadow-2xs'
                        : 'bg-white hover:bg-purple-100 text-[#6E1373] border border-purple-200'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Country Clock & Hijri Calendar Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#561F79] via-[#6E1373] to-[#851C82] text-white shadow-md space-y-2">
              <div className="flex items-center justify-between text-xs text-purple-200 font-bold">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-pink-300" />
                  <span>{selectedLocation.city} Local Time</span>
                </span>
                <span className="text-[10px] font-mono bg-white/20 px-2 py-0.5 rounded-full text-pink-100">
                  {selectedLocation.city}
                </span>
              </div>

              {/* Large Digital Clock */}
              <div className="text-3xl font-black font-mono tracking-tight text-white drop-shadow-xs">
                {liveClock}
              </div>

              {/* Dates: Gregorian and Islamic Hijri */}
              <div className="pt-1 border-t border-white/15 flex flex-col gap-0.5 text-xs text-purple-100 font-medium">
                <div className="flex items-center justify-between">
                  <span>📅 {worldMetrics.formattedFull}</span>
                </div>
                <div className="flex items-center justify-between text-amber-200 font-bold text-[11px]">
                  <span>🌙 {hijriDate}</span>
                  <span className="text-[10px] text-pink-200">Umm al-Qura</span>
                </div>
              </div>
            </div>

            {/* Navigation Tabs inside Drawer */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => setActiveTab('namaz')}
                className={`flex-1 py-1.5 rounded-lg transition flex items-center justify-center gap-1 cursor-pointer ${
                  activeTab === 'namaz'
                    ? 'bg-[#6E1373] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-[#6E1373]'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Prayer Times</span>
              </button>

              <button
                onClick={() => setActiveTab('calendar')}
                className={`flex-1 py-1.5 rounded-lg transition flex items-center justify-center gap-1 cursor-pointer ${
                  activeTab === 'calendar'
                    ? 'bg-[#6E1373] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-[#6E1373]'
                }`}
              >
                <CalendarIcon className="w-3.5 h-3.5" />
                <span>Calendar & World Hubs</span>
              </button>
            </div>

            {/* TAB 1: NAMAZ PRAYER TIMES WITH MARKED ONGOING SALAH */}
            {activeTab === 'namaz' && (
              <div className="space-y-3">
                
                {/* PROMINENT ONGOING PRAYER HERO CARD */}
                {ongoingPrayer ? (
                  <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 text-white p-3.5 rounded-2xl shadow-md space-y-1.5 border-2 border-emerald-400">
                    <div className="flex items-center justify-between text-[10px] font-bold text-emerald-200">
                      <span className="flex items-center gap-1.5">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-300"></span>
                        </span>
                        <span className="uppercase tracking-wider font-black text-white">
                          CURRENT ONGOING PRAYER IN {selectedLocation.country.toUpperCase()}
                        </span>
                      </span>
                      <span className="bg-black/30 px-2 py-0.5 rounded-full text-emerald-100 font-mono text-[10px] font-bold">
                        {ongoingPrayer.timeRemainingFormatted} left
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between pt-0.5">
                      <div>
                        <p className="text-xl font-black text-white tracking-tight">
                          {ongoingPrayer.name} Salah
                        </p>
                        <p className="text-[11px] text-emerald-100">
                          Window: <span className="font-mono font-bold">{ongoingPrayer.startTime} – {ongoingPrayer.endTime}</span>
                        </p>
                      </div>
                      <span className="font-arabic text-2xl text-emerald-100 font-bold">
                        {ongoingPrayer.arabicName}
                      </span>
                    </div>

                    <div className="pt-1.5 border-t border-emerald-500/40 flex items-center justify-between text-[11px] text-emerald-100">
                      <span>Status: <strong className="text-white">Active to Pray Now</strong></span>
                      <span className="text-[10px] text-emerald-200 font-medium">{ongoingPrayer.description}</span>
                    </div>
                  </div>
                ) : (
                  <div className="bg-purple-50 text-[#6E1373] p-3 rounded-2xl border border-purple-200 text-xs font-bold">
                    No obligatory prayer is currently ongoing. Preparing for the next prayer.
                  </div>
                )}

                {/* Next Prayer Countdown Card */}
                {upcomingPrayer && (
                  <div className="bg-gradient-to-r from-purple-50 via-pink-50/50 to-purple-50 border border-purple-200 p-3 rounded-2xl flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wide">Next Upcoming Prayer</span>
                      <h4 className="text-base font-black text-[#6E1373] leading-tight">
                        {upcomingPrayer.name} ({upcomingPrayer.arabicName})
                      </h4>
                      <p className="text-[10px] text-slate-500 font-medium">Begins at {upcomingPrayer.startTime}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black font-mono text-[#C72F8A] bg-white px-2.5 py-1 rounded-xl border border-pink-200 shadow-2xs inline-block">
                        in {upcomingPrayer.timeRemainingFormatted}
                      </span>
                    </div>
                  </div>
                )}

                {/* 5 Daily Prayers List with Marked Ongoing Prayer */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Schedule for {selectedLocation.city}, {selectedLocation.country}
                    </span>
                    <span className="text-[10px] text-purple-700 font-bold">12-Hour</span>
                  </div>

                  <div className="space-y-1.5 max-h-72 overflow-y-auto pr-0.5">
                    {prayersList.map((prayer) => {
                      const isOngoing = ongoingPrayer?.id === prayer.id;
                      const isNext = upcomingPrayer?.id === prayer.id;
                      return (
                        <div
                          key={prayer.name}
                          className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                            isOngoing
                              ? 'bg-emerald-50/95 text-emerald-950 border-2 border-emerald-500 shadow-sm ring-1 ring-emerald-400/50'
                              : isNext
                              ? 'bg-purple-50/80 text-[#6E1373] border border-purple-300'
                              : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-100'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            {isOngoing ? (
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse shadow-xs" />
                            ) : isNext ? (
                              <span className="w-2 h-2 rounded-full bg-[#C72F8A]" />
                            ) : (
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                            )}
                            <div>
                              <div className="flex items-center gap-2">
                                <span className={isOngoing ? 'text-emerald-950 font-black text-sm' : ''}>
                                  {prayer.name}
                                </span>
                                <span className="font-arabic text-[12px] text-slate-400 font-normal">
                                  ({prayer.arabic})
                                </span>
                                {isOngoing && (
                                  <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-600 text-white shadow-2xs tracking-wider">
                                    🟢 ONGOING NOW
                                  </span>
                                )}
                                {isNext && !isOngoing && (
                                  <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-pink-100 text-[#C72F8A] tracking-wider">
                                    Next
                                  </span>
                                )}
                              </div>
                              <p className="text-[10px] text-slate-400 font-normal">
                                {prayer.desc}
                              </p>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className={`font-mono text-xs block ${isOngoing ? 'text-emerald-900 font-black text-sm' : 'text-slate-900'}`}>
                              {prayer.time}
                            </span>
                            {isOngoing && (
                              <span className="text-[9px] text-emerald-700 font-bold block">
                                {ongoingPrayer.timeRemainingFormatted} left
                              </span>
                            )}
                            {isNext && !isOngoing && (
                              <span className="text-[9px] text-[#C72F8A] font-bold block">
                                in {nextPrayer.remainingFormatted}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: CALENDAR & WORLDWIDE STUDENT HUBS */}
            {activeTab === 'calendar' && (
              <div className="space-y-3">
                {/* Month Navigation */}
                <div className="bg-purple-50/80 p-3 rounded-2xl border border-purple-100 flex items-center justify-between">
                  <button
                    onClick={() => setCalendarMonthOffset(calendarMonthOffset - 1)}
                    className="p-1 rounded-lg hover:bg-white text-purple-700 transition cursor-pointer"
                    title="Previous Month"
                    aria-label="Previous Month"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <div className="text-center">
                    <p className="text-xs font-black text-[#6E1373]">
                      {monthGrid.monthName} {monthGrid.year}
                    </p>
                    <p className="text-[10px] text-slate-500 font-semibold">
                      {hijriDate}
                    </p>
                  </div>

                  <button
                    onClick={() => setCalendarMonthOffset(calendarMonthOffset + 1)}
                    className="p-1 rounded-lg hover:bg-white text-purple-700 transition cursor-pointer"
                    title="Next Month"
                    aria-label="Next Month"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Calendar Days Grid */}
                <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="grid grid-cols-7 gap-1 text-center font-bold text-[10px] text-slate-400">
                    {weekdayLetters.map((l, i) => (
                      <span key={i}>{l}</span>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center text-xs">
                    {Array.from({ length: monthGrid.startWeekday }).map((_, i) => (
                      <span key={`empty-${i}`} className="p-1.5 text-slate-200">·</span>
                    ))}
                    {monthGrid.days.map((d) => (
                      <span
                        key={d.dayNumber}
                        className={`p-1.5 rounded-lg font-bold text-xs transition ${
                          d.isToday
                            ? 'bg-[#6E1373] text-white shadow-xs'
                            : d.isWeekend
                            ? 'text-pink-600 bg-pink-50/60'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {d.dayNumber}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Worldwide Student Clocks */}
                <div className="space-y-1.5 pt-1">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <Globe className="w-3 h-3 text-[#6E1373]" />
                    <span>Worldwide Student Hub Clocks</span>
                  </p>
                  <div className="grid grid-cols-2 gap-1.5 text-xs">
                    {[
                      { city: 'London', flag: '🇬🇧', tz: 'Europe/London' },
                      { city: 'New York', flag: '🇺🇸', tz: 'America/New_York' },
                      { city: 'Toronto', flag: '🇨🇦', tz: 'America/Toronto' },
                      { city: 'Sydney', flag: '🇦🇺', tz: 'Australia/Sydney' },
                      { city: 'Dubai', flag: '🇦🇪', tz: 'Asia/Dubai' },
                      { city: 'Karachi', flag: '🇵🇰', tz: 'Asia/Karachi' }
                    ].map(h => (
                      <div key={h.city} className="bg-white p-2 rounded-xl border border-slate-200 shadow-2xs">
                        <div className="flex items-center justify-between text-[10px] text-slate-500">
                          <span>{h.flag} {h.city}</span>
                        </div>
                        <p className="font-mono font-black text-xs text-[#6E1373]">
                          {formatLiveClock(currentDate, h.tz).slice(0, 8)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="pt-2 border-t border-purple-100 flex items-center gap-2">
              <button
                onClick={() => {
                  onOpenFullNamaz();
                  setIsOpen(false);
                }}
                className="flex-1 py-2 bg-[#6E1373] hover:bg-[#561F79] text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Full Namaz Schedule</span>
              </button>

              {onOpenWorshipGuide && (
                <button
                  onClick={() => {
                    onOpenWorshipGuide();
                    setIsOpen(false);
                  }}
                  className="py-2 px-3 bg-purple-50 hover:bg-purple-100 text-[#6E1373] border border-purple-200 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                  title="Islamic Prayer Guide"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Guide</span>
                </button>
              )}
            </div>

          </div>
        )}

      </div>
    </aside>
  );
};
