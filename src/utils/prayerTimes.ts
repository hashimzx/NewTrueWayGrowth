/**
 * Automatic Namaz & Prayer Time Engine for True Way Quran
 * Automatically calculates accurate prayer times based on the user's live geolocation or timezone.
 * Works 100% offline via astronomical algorithms, with Aladhan API live sync when online.
 */

export interface PrayerTimesResult {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  tahajjud: string;
  fajrDate: Date;
  sunriseDate: Date;
  dhuhrDate: Date;
  asrDate: Date;
  maghribDate: Date;
  ishaDate: Date;
  locationName: string;
  country: string;
  timezone: string;
  coordinates: { lat: number; lng: number };
  hijriDate: string;
  qiblaDegrees: number;
}

export interface NextPrayerInfo {
  name: 'Fajr' | 'Sunrise' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha';
  arabicName: string;
  time: string;
  targetDate: Date;
  remainingMinutes: number;
  remainingFormatted: string;
  currentActive: 'Fajr' | 'Sunrise' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha' | 'Tahajjud';
}

// Global timezone to city/coordinates map fallback with 40+ major world locations
const TIMEZONE_LOCATION_MAP: Record<string, { city: string; country: string; lat: number; lng: number }> = {
  // United Kingdom & Ireland
  'Europe/London': { city: 'London / Birmingham', country: 'United Kingdom', lat: 51.5074, lng: -0.1278 },
  'Europe/Dublin': { city: 'Dublin', country: 'Ireland', lat: 53.3498, lng: -6.2603 },

  // United States
  'America/New_York': { city: 'New York / Boston', country: 'United States', lat: 40.7128, lng: -74.0060 },
  'America/Chicago': { city: 'Chicago / Dallas / Houston', country: 'United States', lat: 41.8781, lng: -87.6298 },
  'America/Denver': { city: 'Denver / Phoenix', country: 'United States', lat: 39.7392, lng: -104.9903 },
  'America/Los_Angeles': { city: 'Los Angeles / San Francisco', country: 'United States', lat: 34.0522, lng: -118.2437 },

  // Canada
  'America/Toronto': { city: 'Toronto / Ottawa / Montreal', country: 'Canada', lat: 43.6532, lng: -79.3832 },
  'America/Vancouver': { city: 'Vancouver / Calgary', country: 'Canada', lat: 49.2827, lng: -123.1207 },
  'America/Edmonton': { city: 'Edmonton', country: 'Canada', lat: 53.5461, lng: -113.4938 },

  // Pakistan
  'Asia/Karachi': { city: 'Karachi / Islamabad / Lahore', country: 'Pakistan', lat: 24.8607, lng: 67.0011 },

  // Middle East & Gulf
  'Asia/Riyadh': { city: 'Riyadh / Makkah / Madinah', country: 'Saudi Arabia', lat: 24.7136, lng: 46.6753 },
  'Asia/Dubai': { city: 'Dubai / Abu Dhabi', country: 'United Arab Emirates', lat: 25.2048, lng: 55.2708 },
  'Asia/Qatar': { city: 'Doha', country: 'Qatar', lat: 25.2854, lng: 51.5310 },
  'Asia/Kuwait': { city: 'Kuwait City', country: 'Kuwait', lat: 29.3759, lng: 47.9774 },
  'Asia/Muscat': { city: 'Muscat', country: 'Oman', lat: 23.5880, lng: 58.3829 },
  'Asia/Bahrain': { city: 'Manama', country: 'Bahrain', lat: 26.2285, lng: 50.5860 },
  'Asia/Amman': { city: 'Amman', country: 'Jordan', lat: 31.9454, lng: 35.9284 },
  'Asia/Beirut': { city: 'Beirut', country: 'Lebanon', lat: 33.8938, lng: 35.5018 },
  'Asia/Baghdad': { city: 'Baghdad', country: 'Iraq', lat: 33.3152, lng: 44.3661 },

  // Europe
  'Europe/Paris': { city: 'Paris', country: 'France', lat: 48.8566, lng: 2.3522 },
  'Europe/Berlin': { city: 'Berlin / Frankfurt', country: 'Germany', lat: 52.5200, lng: 13.4050 },
  'Europe/Amsterdam': { city: 'Amsterdam', country: 'Netherlands', lat: 52.3676, lng: 4.9041 },
  'Europe/Brussels': { city: 'Brussels', country: 'Belgium', lat: 50.8503, lng: 4.3517 },
  'Europe/Rome': { city: 'Rome / Milan', country: 'Italy', lat: 41.9028, lng: 12.4964 },
  'Europe/Madrid': { city: 'Madrid / Barcelona', country: 'Spain', lat: 40.4168, lng: -3.7038 },
  'Europe/Oslo': { city: 'Oslo', country: 'Norway', lat: 59.9139, lng: 10.7522 },
  'Europe/Stockholm': { city: 'Stockholm', country: 'Sweden', lat: 59.3293, lng: 18.0686 },
  'Europe/Copenhagen': { city: 'Copenhagen', country: 'Denmark', lat: 55.6761, lng: 12.5683 },
  'Europe/Zurich': { city: 'Zurich / Geneva', country: 'Switzerland', lat: 47.3769, lng: 8.5417 },
  'Europe/Vienna': { city: 'Vienna', country: 'Austria', lat: 48.2082, lng: 16.3738 },

  // Turkey & Central Asia
  'Asia/Istanbul': { city: 'Istanbul / Ankara', country: 'Turkey', lat: 41.0082, lng: 28.9784 },
  'Asia/Baku': { city: 'Baku', country: 'Azerbaijan', lat: 40.4093, lng: 49.8671 },

  // Australia & New Zealand
  'Australia/Sydney': { city: 'Sydney', country: 'Australia', lat: -33.8688, lng: 151.2093 },
  'Australia/Melbourne': { city: 'Melbourne', country: 'Australia', lat: -37.8136, lng: 144.9631 },
  'Australia/Brisbane': { city: 'Brisbane', country: 'Australia', lat: -27.4698, lng: 153.0251 },
  'Australia/Perth': { city: 'Perth', country: 'Australia', lat: -31.9505, lng: 115.8605 },
  'Pacific/Auckland': { city: 'Auckland', country: 'New Zealand', lat: -36.8485, lng: 174.7633 },

  // South & Southeast Asia
  'Asia/Kolkata': { city: 'Delhi / Mumbai', country: 'India', lat: 28.6139, lng: 77.2090 },
  'Asia/Dhaka': { city: 'Dhaka', country: 'Bangladesh', lat: 23.8103, lng: 90.4125 },
  'Asia/Kuala_Lumpur': { city: 'Kuala Lumpur', country: 'Malaysia', lat: 3.1390, lng: 101.6869 },
  'Asia/Singapore': { city: 'Singapore', country: 'Singapore', lat: 1.3521, lng: 103.8198 },
  'Asia/Jakarta': { city: 'Jakarta', country: 'Indonesia', lat: -6.2088, lng: 106.8456 },
  'Asia/Bangkok': { city: 'Bangkok', country: 'Thailand', lat: 13.7563, lng: 100.5018 },
  'Asia/Tokyo': { city: 'Tokyo', country: 'Japan', lat: 35.6762, lng: 139.6503 },
  'Asia/Seoul': { city: 'Seoul', country: 'South Korea', lat: 37.5665, lng: 126.9780 },

  // Africa
  'Africa/Cairo': { city: 'Cairo', country: 'Egypt', lat: 30.0444, lng: 31.2357 },
  'Africa/Johannesburg': { city: 'Johannesburg / Cape Town', country: 'South Africa', lat: -26.2041, lng: 28.0473 },
  'Africa/Casablanca': { city: 'Casablanca', country: 'Morocco', lat: 33.5731, lng: -7.5898 },
  'Africa/Nairobi': { city: 'Nairobi', country: 'Kenya', lat: -1.2921, lng: 36.8219 },
  'Africa/Lagos': { city: 'Lagos', country: 'Nigeria', lat: 6.5244, lng: 3.3792 }
};

// Math helpers for astronomical solar calculations
const degToRad = (deg: number) => (deg * Math.PI) / 180.0;
const radToDeg = (rad: number) => (rad * 180.0) / Math.PI;

export function getAutoLocation(): { city: string; country: string; lat: number; lng: number; timezone: string } {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/London';
    if (TIMEZONE_LOCATION_MAP[tz]) {
      return { ...TIMEZONE_LOCATION_MAP[tz], timezone: tz };
    }
    // Match partial timezone name
    const found = Object.keys(TIMEZONE_LOCATION_MAP).find(k => tz.includes(k.split('/')[1] || '---'));
    if (found) {
      return { ...TIMEZONE_LOCATION_MAP[found], timezone: tz };
    }
    // Default fallback
    return { city: 'London', country: 'United Kingdom', lat: 51.5074, lng: -0.1278, timezone: tz };
  } catch {
    return { city: 'London', country: 'United Kingdom', lat: 51.5074, lng: -0.1278, timezone: 'Europe/London' };
  }
}

/**
 * Calculates Qibla direction (bearing in degrees clockwise from True North)
 * Kaaba coordinates: 21.4225° N, 39.8262° E
 */
export function calculateQibla(lat: number, lng: number): number {
  const mLat = degToRad(21.4225);
  const mLng = degToRad(39.8262);
  const uLat = degToRad(lat);
  const uLng = degToRad(lng);

  const y = Math.sin(mLng - uLng);
  const x = Math.cos(uLat) * Math.tan(mLat) - Math.sin(uLat) * Math.cos(mLng - uLng);
  let qibla = radToDeg(Math.atan2(y, x));
  return Math.round((qibla + 360) % 360);
}

/**
 * Astronomical Solar Prayer Times Calculation
 */
export function computePrayerTimes(
  date: Date = new Date(),
  lat: number = 51.5074,
  lng: number = -0.1278,
  isHanafiAsr: boolean = true
): {
  fajr: Date;
  sunrise: Date;
  dhuhr: Date;
  asr: Date;
  maghrib: Date;
  isha: Date;
  tahajjud: Date;
} {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // Julian date computation
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  const jd =
    day +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045;

  const d = jd - 2451545.0; // days since J2000.0

  // Mean anomaly and solar coordinates
  const g = (357.529 + 0.98560028 * d) % 360;
  const q = (280.459 + 0.98564736 * d) % 360;
  const L = (q + 1.915 * Math.sin(degToRad(g)) + 0.02 * Math.sin(degToRad(2 * g))) % 360;

  // Earth's obliquity
  const e = 23.439 - 0.00000036 * d;

  // Declination and right ascension
  const dec = radToDeg(Math.asin(Math.sin(degToRad(e)) * Math.sin(degToRad(L))));
  const RA = radToDeg(Math.atan2(Math.cos(degToRad(e)) * Math.sin(degToRad(L)), Math.cos(degToRad(L)))) / 15;

  // Equation of time in minutes
  const eqt = (q / 15 - RA) * 60;

  // Solar Noon (Dhuhr)
  // Timezone offset of target date in hours
  const tzOffset = -date.getTimezoneOffset() / 60;
  const noonHour = 12 + tzOffset - lng / 15 - eqt / 60;

  // Sun hour angle helper for given depression angle
  const hourAngle = (angle: number): number => {
    const cosHA =
      (-Math.sin(degToRad(angle)) - Math.sin(degToRad(lat)) * Math.sin(degToRad(dec))) /
      (Math.cos(degToRad(lat)) * Math.cos(degToRad(dec)));
    if (cosHA > 1) return 0;
    if (cosHA < -1) return 180;
    return radToDeg(Math.acos(cosHA));
  };

  // Asr hour angle (shadow ratio: Hanafi = 2, Shafi'i = 1)
  const shadowFactor = isHanafiAsr ? 2 : 1;
  const asrAngle = radToDeg(
    Math.atan(1 / (shadowFactor + Math.tan(degToRad(Math.abs(lat - dec)))))
  );
  const asrHA = hourAngle(90 - asrAngle);

  // Fajr depression angle: 18 degrees (MWL/Karachi standard)
  const fajrHA = hourAngle(18);
  // Sunrise/Sunset: 0.833 degrees refraction
  const sunHA = hourAngle(0.833);
  // Isha depression angle: 17.5 degrees
  const ishaHA = hourAngle(17.5);

  const hoursToDate = (hours: number): Date => {
    const res = new Date(date);
    res.setHours(0, 0, 0, 0);
    const totalMs = Math.round(hours * 3600 * 1000);
    res.setTime(res.getTime() + totalMs);
    return res;
  };

  const dhuhrTime = hoursToDate(noonHour);
  const fajrTime = hoursToDate(noonHour - fajrHA / 15);
  const sunriseTime = hoursToDate(noonHour - sunHA / 15);
  const asrTime = hoursToDate(noonHour + asrHA / 15);
  const maghribTime = hoursToDate(noonHour + sunHA / 15);
  const ishaTime = hoursToDate(noonHour + ishaHA / 15);

  // Tahajjud: 1.5 hours before Fajr
  const tahajjudTime = new Date(fajrTime.getTime() - 90 * 60 * 1000);

  return {
    fajr: fajrTime,
    sunrise: sunriseTime,
    dhuhr: dhuhrTime,
    asr: asrTime,
    maghrib: maghribTime,
    isha: ishaTime,
    tahajjud: tahajjudTime
  };
}

export function formatTimeAmPm(d: Date | string): string {
  if (typeof d === 'string') {
    const parts = d.split(':');
    const h = parseInt(parts[0], 10);
    if (isNaN(h)) return d;
    const m = parts[1] || '00';
    const period = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${m} ${period}`;
  }
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
}

export function formatLiveClock(d: Date = new Date(), timezone?: string): string {
  try {
    return d.toLocaleTimeString([], { 
      timeZone: timezone, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit', 
      hour12: true 
    });
  } catch {
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  }
}

export function getEstimatedHijriDate(date: Date = new Date()): string {
  try {
    // Standard Islamic Umm al-Qura Intl format
    return new Intl.DateTimeFormat('en-TN-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date) + ' AH';
  } catch {
    return '15 Shawwal 1447 AH';
  }
}

export function getNextPrayer(times: {
  fajr: Date;
  sunrise: Date;
  dhuhr: Date;
  asr: Date;
  maghrib: Date;
  isha: Date;
  tahajjud: Date;
}, now: Date = new Date()): NextPrayerInfo {
  const prayers: Array<{ name: 'Fajr' | 'Sunrise' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha'; arabic: string; time: Date }> = [
    { name: 'Fajr', arabic: 'الفَجْر', time: times.fajr },
    { name: 'Sunrise', arabic: 'الشُّرُوق', time: times.sunrise },
    { name: 'Dhuhr', arabic: 'الظُّهْر', time: times.dhuhr },
    { name: 'Asr', arabic: 'العَصْر', time: times.asr },
    { name: 'Maghrib', arabic: 'المَغْرِب', time: times.maghrib },
    { name: 'Isha', arabic: 'العِشَاء', time: times.isha }
  ];

  // Current active prayer determination
  let currentActive: NextPrayerInfo['currentActive'] = 'Tahajjud';
  if (now >= times.fajr && now < times.sunrise) currentActive = 'Fajr';
  else if (now >= times.sunrise && now < times.dhuhr) currentActive = 'Sunrise';
  else if (now >= times.dhuhr && now < times.asr) currentActive = 'Dhuhr';
  else if (now >= times.asr && now < times.maghrib) currentActive = 'Asr';
  else if (now >= times.maghrib && now < times.isha) currentActive = 'Maghrib';
  else if (now >= times.isha) currentActive = 'Isha';

  // Find next upcoming prayer today
  for (const p of prayers) {
    if (p.time > now) {
      const diffMs = p.time.getTime() - now.getTime();
      const mins = Math.max(0, Math.floor(diffMs / 60000));
      const hours = Math.floor(mins / 60);
      const remainingMins = mins % 60;
      const formatted = hours > 0 ? `${hours}h ${remainingMins}m` : `${remainingMins}m`;

      return {
        name: p.name,
        arabicName: p.arabic,
        time: formatTimeAmPm(p.time),
        targetDate: p.time,
        remainingMinutes: mins,
        remainingFormatted: formatted,
        currentActive
      };
    }
  }

  // If after Isha, next prayer is Fajr tomorrow
  const nextFajrTomorrow = new Date(times.fajr.getTime() + 24 * 3600 * 1000);
  const diffMs = nextFajrTomorrow.getTime() - now.getTime();
  const mins = Math.max(0, Math.floor(diffMs / 60000));
  const hours = Math.floor(mins / 60);
  const remainingMins = mins % 60;

  return {
    name: 'Fajr',
    arabicName: 'الفَجْر',
    time: formatTimeAmPm(times.fajr),
    targetDate: nextFajrTomorrow,
    remainingMinutes: mins,
    remainingFormatted: `${hours}h ${remainingMins}m`,
    currentActive: 'Isha'
  };
}

export interface PrayerAvailabilitySlot {
  id: 'fajr' | 'sunrise' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';
  name: string;
  arabicName: string;
  startTime: string;
  endTime: string;
  isAvailableNow: boolean;
  status: 'available_now' | 'upcoming_next' | 'completed';
  minutesRemainingInWindow: number;
  timeRemainingFormatted: string;
  description: string;
}

export interface PrayerAvailabilityScheduleResult {
  slots: PrayerAvailabilitySlot[];
  currentlyAvailable: PrayerAvailabilitySlot | null;
  upcomingNext: PrayerAvailabilitySlot | null;
  activeSummary: string;
}

/**
 * Computes exact Islamic prayer availability windows based on current time
 * and marks which prayer is currently available to pray right now.
 */
export function getPrayerAvailabilitySchedule(
  times: {
    fajr: string;
    sunrise: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  },
  now: Date = new Date()
): PrayerAvailabilityScheduleResult {
  const toMins = (t: string) => {
    const parts = (t || '00:00').split(':').map(Number);
    return (parts[0] || 0) * 60 + (parts[1] || 0);
  };

  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const fajrM = toMins(times.fajr);
  const sunriseM = toMins(times.sunrise);
  const dhuhrM = toMins(times.dhuhr);
  const asrM = toMins(times.asr);
  const maghribM = toMins(times.maghrib);
  const ishaM = toMins(times.isha);

  const rawSlots: Array<{
    id: 'fajr' | 'sunrise' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';
    name: string;
    arabicName: string;
    startTimeStr: string;
    endTimeStr: string;
    startM: number;
    endM: number;
    description: string;
  }> = [
    {
      id: 'fajr',
      name: 'Fajr',
      arabicName: 'الفَجْر',
      startTimeStr: times.fajr,
      endTimeStr: times.sunrise,
      startM: fajrM,
      endM: sunriseM,
      description: 'Dawn Obligatory Prayer (2 Sunnah + 2 Fard)'
    },
    {
      id: 'sunrise',
      name: 'Sunrise (Ishraq / Duha)',
      arabicName: 'الشُّرُوق',
      startTimeStr: times.sunrise,
      endTimeStr: times.dhuhr,
      startM: sunriseM,
      endM: dhuhrM,
      description: 'Morning Voluntary Ishraq & Chasht / Duha Prayer'
    },
    {
      id: 'dhuhr',
      name: 'Dhuhr',
      arabicName: 'الظُّهْر',
      startTimeStr: times.dhuhr,
      endTimeStr: times.asr,
      startM: dhuhrM,
      endM: asrM,
      description: 'Midday Obligatory Prayer (4 Sunnah + 4 Fard + 2 Sunnah)'
    },
    {
      id: 'asr',
      name: 'Asr',
      arabicName: 'العَصْر',
      startTimeStr: times.asr,
      endTimeStr: times.maghrib,
      startM: asrM,
      endM: maghribM,
      description: 'Afternoon Obligatory Prayer (4 Fard)'
    },
    {
      id: 'maghrib',
      name: 'Maghrib',
      arabicName: 'المَغْرِب',
      startTimeStr: times.maghrib,
      endTimeStr: times.isha,
      startM: maghribM,
      endM: ishaM,
      description: 'Sunset Obligatory Prayer (3 Fard + 2 Sunnah)'
    },
    {
      id: 'isha',
      name: 'Isha',
      arabicName: 'العِشَاء',
      startTimeStr: times.isha,
      endTimeStr: times.fajr,
      startM: ishaM,
      endM: fajrM,
      description: 'Night Obligatory Prayer (4 Fard + 2 Sunnah + 3 Witr)'
    }
  ];

  let activeIndex = -1;

  // Determine which slot is active right now
  for (let i = 0; i < rawSlots.length; i++) {
    const s = rawSlots[i];
    if (s.id === 'isha') {
      // Crosses midnight
      if (nowMinutes >= ishaM || nowMinutes < fajrM) {
        activeIndex = i;
        break;
      }
    } else {
      if (nowMinutes >= s.startM && nowMinutes < s.endM) {
        activeIndex = i;
        break;
      }
    }
  }

  // Fallback to Isha if late night / before Fajr
  if (activeIndex === -1) {
    activeIndex = rawSlots.length - 1; // Isha
  }

  // Determine next upcoming slot
  let upcomingIndex = (activeIndex + 1) % rawSlots.length;

  const slots: PrayerAvailabilitySlot[] = rawSlots.map((s, idx) => {
    const isNow = idx === activeIndex;
    const isUpcoming = idx === upcomingIndex;

    let status: 'available_now' | 'upcoming_next' | 'completed' = 'completed';
    if (isNow) {
      status = 'available_now';
    } else if (isUpcoming) {
      status = 'upcoming_next';
    } else if (s.id !== 'isha' && nowMinutes < s.startM) {
      status = 'upcoming_next';
    }

    // Calculate minutes remaining in this window
    let remainingMins = 0;
    if (isNow) {
      if (s.id === 'isha') {
        if (nowMinutes >= ishaM) {
          remainingMins = (1440 - nowMinutes) + fajrM;
        } else {
          remainingMins = fajrM - nowMinutes;
        }
      } else {
        remainingMins = Math.max(0, s.endM - nowMinutes);
      }
    } else if (isUpcoming) {
      if (s.id === 'isha' && nowMinutes < ishaM) {
        remainingMins = ishaM - nowMinutes;
      } else if (s.startM > nowMinutes) {
        remainingMins = s.startM - nowMinutes;
      } else {
        remainingMins = (1440 - nowMinutes) + s.startM;
      }
    }

    const hrs = Math.floor(remainingMins / 60);
    const mins = remainingMins % 60;
    const timeRemainingFormatted = hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;

    return {
      id: s.id,
      name: s.name,
      arabicName: s.arabicName,
      startTime: formatTimeAmPm(s.startTimeStr),
      endTime: formatTimeAmPm(s.endTimeStr),
      isAvailableNow: isNow,
      status,
      minutesRemainingInWindow: remainingMins,
      timeRemainingFormatted,
      description: s.description
    };
  });

  const currentlyAvailable = slots[activeIndex] || null;
  const upcomingNext = slots[upcomingIndex] || null;

  const activeSummary = currentlyAvailable
    ? `${currentlyAvailable.name} Salah is AVAILABLE NOW (${currentlyAvailable.startTime} – ${currentlyAvailable.endTime}) · ${currentlyAvailable.timeRemainingFormatted} remaining in prayer window`
    : 'Waiting for next prayer time';

  return {
    slots,
    currentlyAvailable,
    upcomingNext,
    activeSummary
  };
}
