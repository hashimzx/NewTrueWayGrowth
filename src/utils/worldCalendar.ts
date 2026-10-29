/**
 * World Calendar Utility - True Way Quran
 * Provides standard Gregorian World Calendar calculations, international date metrics,
 * global timezones, and calendar grid generation.
 */

export interface WorldCalendarDay {
  dayNumber: number;
  weekdayIndex: number; // 0 = Sun, 1 = Mon, ..., 6 = Sat
  isToday: boolean;
  isWeekend: boolean;
  dateISO: string;
}

export interface WorldMonthGrid {
  year: number;
  monthIndex: number; // 0 to 11
  monthName: string;
  daysInMonth: number;
  startWeekday: number;
  days: WorldCalendarDay[];
}

export interface WorldTimezoneHub {
  city: string;
  country: string;
  timezone: string;
  timeString: string;
  offsetString: string;
  tag: string;
}

export interface WorldDateMetrics {
  formattedFull: string;
  formattedShort: string;
  isoDate: string;
  dayName: string;
  monthName: string;
  year: number;
  dayOfMonth: number;
  dayOfYear: number;
  totalDaysInYear: number;
  daysRemainingInYear: number;
  weekNumber: number;
  quarter: string;
  isLeapYear: boolean;
  yearProgressPercent: number;
  monthProgressPercent: number;
}

/** Check if a given year is a leap year */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/** Get total days in a given year */
export function getTotalDaysInYear(year: number): number {
  return isLeapYear(year) ? 366 : 365;
}

/** Compute Day of Year (1 to 365/366) */
export function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime() + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

/** Compute ISO Week Number (1 to 53) */
export function getISOWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

/** Get comprehensive World Date Metrics for a given date */
export function getWorldDateMetrics(targetDate: Date = new Date()): WorldDateMetrics {
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth();
  const dayOfMonth = targetDate.getDate();

  const totalDays = getTotalDaysInYear(year);
  const dayOfYear = getDayOfYear(targetDate);
  const daysRemaining = totalDays - dayOfYear;
  const weekNumber = getISOWeekNumber(targetDate);

  const quarterNumber = Math.floor(month / 3) + 1;
  const quarter = `Q${quarterNumber}`;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthProgress = Math.round((dayOfMonth / daysInMonth) * 100);
  const yearProgress = Math.round((dayOfYear / totalDays) * 100);

  const formattedFull = targetDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formattedShort = targetDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const dayName = targetDate.toLocaleDateString('en-US', { weekday: 'long' });
  const monthName = targetDate.toLocaleDateString('en-US', { month: 'long' });

  const isoDate = targetDate.toISOString().split('T')[0];

  return {
    formattedFull,
    formattedShort,
    isoDate,
    dayName,
    monthName,
    year,
    dayOfMonth,
    dayOfYear,
    totalDaysInYear: totalDays,
    daysRemainingInYear: daysRemaining,
    weekNumber,
    quarter,
    isLeapYear: isLeapYear(year),
    yearProgressPercent: yearProgress,
    monthProgressPercent: monthProgress
  };
}

/** Generate standard Gregorian month calendar grid with month offset */
export function getWorldMonthGrid(baseDate: Date = new Date(), monthOffset: number = 0): WorldMonthGrid {
  const current = new Date(baseDate.getFullYear(), baseDate.getMonth() + monthOffset, 1);
  const year = current.getFullYear();
  const monthIndex = current.getMonth();
  const monthName = current.toLocaleDateString('en-US', { month: 'long' });

  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const startWeekday = new Date(year, monthIndex, 1).getDay(); // 0 = Sunday

  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === monthIndex;

  const days: WorldCalendarDay[] = [];
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = isCurrentMonth && today.getDate() === d;
    const dateObj = new Date(year, monthIndex, d);
    const weekdayIndex = dateObj.getDay();
    const isWeekend = weekdayIndex === 0 || weekdayIndex === 6;
    const monthStr = String(monthIndex + 1).padStart(2, '0');
    const dayStr = String(d).padStart(2, '0');

    days.push({
      dayNumber: d,
      weekdayIndex,
      isToday,
      isWeekend,
      dateISO: `${year}-${monthStr}-${dayStr}`
    });
  }

  return {
    year,
    monthIndex,
    monthName,
    daysInMonth,
    startWeekday,
    days
  };
}

/** Global Timezone Hubs with Live Formatted Clock Times */
export function getWorldTimezoneHubs(date: Date = new Date()): WorldTimezoneHub[] {
  const hubs = [
    { city: 'UTC / GMT', country: 'Universal Time', timezone: 'UTC', tag: 'Reference' },
    { city: 'London', country: 'United Kingdom', timezone: 'Europe/London', tag: 'Western Europe' },
    { city: 'New York', country: 'United States', timezone: 'America/New_York', tag: 'North America' },
    { city: 'Makkah', country: 'Saudi Arabia', timezone: 'Asia/Riyadh', tag: 'Middle East' },
    { city: 'Dubai', country: 'United Arab Emirates', timezone: 'Asia/Dubai', tag: 'Gulf' },
    { city: 'Islamabad / Karachi', country: 'Pakistan', timezone: 'Asia/Karachi', tag: 'South Asia' },
    { city: 'Kuala Lumpur', country: 'Malaysia', timezone: 'Asia/Kuala_Lumpur', tag: 'Southeast Asia' },
    { city: 'Sydney', country: 'Australia', timezone: 'Australia/Sydney', tag: 'Oceania' }
  ];

  return hubs.map(hub => {
    let timeString = '--:--';
    let offsetString = '';
    try {
      timeString = date.toLocaleTimeString('en-US', {
        timeZone: hub.timezone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      // Short timezone name
      const tzName = new Intl.DateTimeFormat('en-US', {
        timeZone: hub.timezone,
        timeZoneName: 'short'
      }).formatToParts(date).find(p => p.type === 'timeZoneName')?.value || '';
      offsetString = tzName;
    } catch {
      timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    return {
      city: hub.city,
      country: hub.country,
      timezone: hub.timezone,
      timeString,
      offsetString,
      tag: hub.tag
    };
  });
}
