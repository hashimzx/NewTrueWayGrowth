import React, { useState, useEffect } from 'react';
import { 
  getAutoLocation, 
  computePrayerTimes, 
  getNextPrayer, 
  formatTimeAmPm, 
  formatLiveClock, 
  getEstimatedHijriDate, 
  calculateQibla,
  NextPrayerInfo
} from '../utils/prayerTimes';
import { soundEngine } from '../utils/audioSynth';
import { 
  Clock, 
  MapPin, 
  Compass, 
  Bell, 
  Sun, 
  Moon, 
  Sunrise, 
  Sunset, 
  Sparkles, 
  CheckCircle2, 
  Volume2, 
  RefreshCw,
  Globe,
  Sliders,
  Calendar
} from 'lucide-react';

interface NamazSectionProps {
  onOpenDuas?: () => void;
}

export const NamazSection: React.FC<NamazSectionProps> = ({ onOpenDuas }) => {
  const [now, setNow] = useState<Date>(new Date());
  const [isHanafiAsr, setIsHanafiAsr] = useState<boolean>(true);
  const [location, setLocation] = useState<{ city: string; country: string; lat: number; lng: number; timezone: string }>(() => getAutoLocation());
  const [isGpsActive, setIsGpsActive] = useState<boolean>(false);
  const [gpsLoading, setGpsLoading] = useState<boolean>(false);
  const [audioAlertActive, setAudioAlertActive] = useState<boolean>(true);
  const [customCityOpen, setCustomCityOpen] = useState<boolean>(false);

  // Live ticking clock
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Compute prayer times for current location & juristic setting
  const times = computePrayerTimes(now, location.lat, location.lng, isHanafiAsr);
  const nextPrayer: NextPrayerInfo = getNextPrayer(times, now);
  const hijriDate = getEstimatedHijriDate(now);
  const qiblaDegrees = calculateQibla(location.lat, location.lng);

  // Attempt automatic GPS geolocation on user request or initial load
  const requestGpsLocation = () => {
    if (!navigator.geolocation) return;
    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          city: 'My Live Location',
          country: 'Auto-Detected GPS',
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        });
        setIsGpsActive(true);
        setGpsLoading(false);
      },
      (err) => {
        console.warn('Geolocation denied or unavailable, keeping timezone auto location', err);
        setGpsLoading(false);
      },
      { timeout: 8000 }
    );
  };

  const handlePlayAzanCue = () => {
    soundEngine.playCueSound('success');
  };

  const prayerCards = [
    {
      id: 'fajr',
      name: 'Fajr',
      arabic: 'الفَجْر',
      time: formatTimeAmPm(times.fajr),
      targetDate: times.fajr,
      icon: Moon,
      color: 'from-indigo-600 to-purple-800',
      description: 'Dawn prayer before sunrise'
    },
    {
      id: 'sunrise',
      name: 'Sunrise',
      arabic: 'الشُّرُوق',
      time: formatTimeAmPm(times.sunrise),
      targetDate: times.sunrise,
      icon: Sunrise,
      color: 'from-amber-500 to-orange-600',
      description: 'End of Fajr prayer window'
    },
    {
      id: 'dhuhr',
      name: 'Dhuhr',
      arabic: 'الظُّهْر',
      time: formatTimeAmPm(times.dhuhr),
      targetDate: times.dhuhr,
      icon: Sun,
      color: 'from-amber-600 to-yellow-600',
      description: 'Midday prayer after sun passes zenith'
    },
    {
      id: 'asr',
      name: 'Asr',
      arabic: 'العَصْر',
      time: formatTimeAmPm(times.asr),
      targetDate: times.asr,
      icon: Sun,
      color: 'from-orange-500 to-amber-700',
      description: isHanafiAsr ? 'Afternoon prayer (Hanafi 2x shadow)' : 'Afternoon prayer (Standard 1x shadow)'
    },
    {
      id: 'maghrib',
      name: 'Maghrib',
      arabic: 'المَغْرِب',
      time: formatTimeAmPm(times.maghrib),
      targetDate: times.maghrib,
      icon: Sunset,
      color: 'from-pink-600 to-rose-700',
      description: 'Sunset prayer & fast-breaking time'
    },
    {
      id: 'isha',
      name: 'Isha',
      arabic: 'العِشَاء',
      time: formatTimeAmPm(times.isha),
      targetDate: times.isha,
      icon: Moon,
      color: 'from-purple-800 to-slate-900',
      description: 'Night prayer after twilight disappears'
    }
  ];

  return (
    <div className="py-12 bg-gradient-to-b from-[#faf8ff] via-white to-purple-50/40 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Header Card */}
        <div className="bg-gradient-to-r from-[#2e0854] via-[#3b0764] to-[#4a044e] rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden border border-purple-700/50">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left: Auto Location & Live Time */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold text-pink-300">
                <Clock className="w-4 h-4 text-pink-400" />
                <span>Automatic Live Namaz Times</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Accurate Prayer Times for{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-200 to-amber-300">
                  {location.city}
                </span>
              </h1>

              <p className="text-purple-200 text-sm sm:text-base leading-relaxed">
                Automatically calculated for your location ({location.country}) using astronomical algorithms. Includes active prayer window, live countdown, and Qibla compass bearing.
              </p>

              {/* Location pills & GPS toggle */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 rounded-lg text-xs font-medium text-purple-100">
                  <MapPin className="w-3.5 h-3.5 text-pink-400" />
                  <span>{location.city}, {location.country}</span>
                  {isGpsActive && <span className="text-[10px] bg-emerald-500/40 px-1.5 py-0.2 rounded font-bold">GPS</span>}
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 rounded-lg text-xs font-medium text-purple-100">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>{hijriDate}</span>
                </div>

                <button
                  onClick={requestGpsLocation}
                  disabled={gpsLoading}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-600/80 hover:bg-pink-600 rounded-lg text-xs font-bold text-white transition cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${gpsLoading ? 'animate-spin' : ''}`} />
                  <span>{gpsLoading ? 'Locating...' : 'Refetch GPS Location'}</span>
                </button>
              </div>
            </div>

            {/* Right: Live Clock & Next Prayer Spotlight Widget */}
            <div className="lg:col-span-5">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 text-left">
                
                {/* Live Digital Clock */}
                <div className="flex items-center justify-between border-b border-white/15 pb-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300">Current Local Time</span>
                    <p className="text-3xl sm:text-4xl font-mono font-black text-white tracking-wider">
                      {formatLiveClock(now)}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-pink-300">Qibla Direction</span>
                    <p className="text-xl font-mono font-bold text-amber-300 flex items-center justify-end gap-1">
                      <Compass className="w-4 h-4" />
                      <span>{qiblaDegrees}°</span>
                    </p>
                  </div>
                </div>

                {/* Next Upcoming Namaz Box */}
                <div className="p-4 bg-gradient-to-r from-pink-500/20 via-purple-600/30 to-pink-500/20 rounded-2xl border border-pink-400/40 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-pink-500 text-white px-2 py-0.5 rounded-full">
                      Next Namaz
                    </span>
                    <h3 className="text-2xl font-black text-white">
                      {nextPrayer.name}{' '}
                      <span className="font-quran text-lg text-amber-200 mr-2">
                        {nextPrayer.arabicName}
                      </span>
                    </h3>
                    <p className="text-xs text-purple-200">
                      Starts at <strong className="text-white">{nextPrayer.time}</strong>
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-purple-300 block">Remaining</span>
                    <span className="text-2xl font-black text-amber-300 font-mono">
                      {nextPrayer.remainingFormatted}
                    </span>
                  </div>
                </div>

                {/* Azan Audio Preview & Controls */}
                <div className="flex items-center justify-between pt-1 text-xs">
                  <button
                    onClick={handlePlayAzanCue}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white font-bold transition cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-pink-300" />
                    <span>Test Azan Alert</span>
                  </button>

                  <button
                    onClick={() => setIsHanafiAsr(!isHanafiAsr)}
                    className="inline-flex items-center gap-1.5 text-purple-200 hover:text-white cursor-pointer font-medium"
                  >
                    <Sliders className="w-3.5 h-3.5 text-amber-300" />
                    <span>Asr: <strong>{isHanafiAsr ? 'Hanafi' : 'Standard'}</strong></span>
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Prayer Time Cards Grid (Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-purple-950 flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-600" />
              <span>Today&apos;s Namaz Schedule</span>
            </h2>

            <span className="text-xs text-slate-500">
              Active Window: <strong className="text-purple-900 font-bold">{nextPrayer.currentActive}</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {prayerCards.map((p) => {
              const isNext = nextPrayer.name === p.name;
              const isActive = nextPrayer.currentActive === p.name;
              const Icon = p.icon;

              return (
                <div
                  key={p.id}
                  className={`rounded-3xl p-5 border transition flex flex-col justify-between space-y-4 relative overflow-hidden ${
                    isNext
                      ? 'bg-gradient-to-br from-[#2e0854] to-[#4a044e] text-white border-pink-500 shadow-xl ring-2 ring-pink-500/40'
                      : isActive
                      ? 'bg-purple-100/70 border-purple-300 text-purple-950 shadow-md'
                      : 'bg-white border-purple-100 text-slate-900 hover:border-purple-300 shadow-xs'
                  }`}
                >
                  {isNext && (
                    <span className="absolute top-2 right-2 px-2 py-0.5 bg-pink-500 text-white text-[9px] font-black uppercase tracking-wider rounded-full">
                      Next
                    </span>
                  )}

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        isNext ? 'bg-pink-500/20 text-pink-300' : 'bg-purple-50 text-purple-700'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-quran text-xl font-bold">
                        {p.arabic}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-extrabold">{p.name}</h4>
                      <p className={`text-[11px] ${isNext ? 'text-purple-200' : 'text-slate-500'}`}>
                        {p.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-purple-100/40">
                    <span className={`text-2xl font-mono font-black ${
                      isNext ? 'text-amber-300' : 'text-purple-950'
                    }`}>
                      {p.time}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Qibla & Tahajjud Special Guidance Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Tahajjud Card */}
          <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-sm flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 shrink-0">
              <Moon className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                Night Vigil (Tahajjud)
              </span>
              <h3 className="text-base font-extrabold text-purple-950">
                Recommended Time: <span className="font-mono text-purple-700">{formatTimeAmPm(times.tahajjud)}</span>
              </h3>
              <p className="text-xs text-slate-600">
                The last third of the night before Fajr is the most virtuous time for private Duas and supplication.
              </p>
            </div>
          </div>

          {/* Duas Shortcut Card */}
          {onOpenDuas && (
            <div 
              onClick={onOpenDuas}
              className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-6 border border-purple-200 shadow-sm flex items-center justify-between cursor-pointer hover:border-pink-300 transition group"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 bg-white px-2 py-0.5 rounded-full">
                  Post-Namaz Remembrance
                </span>
                <h3 className="text-base font-extrabold text-purple-950 group-hover:text-purple-850">
                  Read Daily Masnoon Duas
                </h3>
                <p className="text-xs text-slate-600">
                  Access authentic supplications for after prayer, morning, and evening.
                </p>
              </div>

              <div className="w-10 h-10 rounded-xl bg-purple-700 text-white flex items-center justify-center group-hover:translate-x-1 transition shadow-md">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
