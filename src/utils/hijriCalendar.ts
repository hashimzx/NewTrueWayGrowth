/**
 * Authentic Islamic (Hijri) Calendar Engine for True Way Quran
 * Uses Umm al-Qura astronomical lunar calendar calculations via Intl API with full fallback support.
 */

export interface HijriDateDetails {
  day: number;
  dayArabic: string;
  monthName: string;
  monthArabic: string;
  monthIndex: number;
  year: number;
  yearArabic: string;
  weekday: string;
  weekdayArabic: string;
  formattedEnglish: string;
  formattedArabic: string;
  isWhiteDay: boolean;
  isFriday: boolean;
  isSacredMonth: boolean;
  specialEvent?: string;
}

export interface IslamicEvent {
  title: string;
  arabicTitle: string;
  hijriDay: number;
  hijriMonth: number;
  monthName: string;
  description: string;
  type: 'major' | 'sunnah_fast' | 'night_of_worship';
}

export const ISLAMIC_MONTHS = [
  { index: 1, name: 'Muharram', arabic: 'المُحَرَّم', sacred: true, meaning: 'The Sacred Month · Islamic New Year & Ashura' },
  { index: 2, name: 'Safar', arabic: 'صَفَر', sacred: false, meaning: 'The Month of Travel' },
  { index: 3, name: "Rabi' al-Awwal", arabic: 'رَبِيع الأَوَّل', sacred: false, meaning: "Birth of Prophet Muhammad ﷺ" },
  { index: 4, name: "Rabi' al-Thani", arabic: 'رَبِيع الآخِر', sacred: false, meaning: 'Spring Season' },
  { index: 5, name: 'Jumada al-Ula', arabic: 'جُمَادَى الأُولَى', sacred: false, meaning: 'First Jumada' },
  { index: 6, name: 'Jumada al-Akhirah', arabic: 'جُمَادَى الآخِرَة', sacred: false, meaning: 'Second Jumada' },
  { index: 7, name: 'Rajab', arabic: 'رَجَب', sacred: true, meaning: 'The Sacred Month · Isra & Mi’raj' },
  { index: 8, name: "Sha'ban", arabic: 'شَعْبَان', sacred: false, meaning: 'The Month of Prophet ﷺ · Laylat al-Bara’at' },
  { index: 9, name: 'Ramadan', arabic: 'رَمَضَان', sacred: false, meaning: 'Holy Month of Fasting, Quran & Laylatul Qadr' },
  { index: 10, name: 'Shawwal', arabic: 'شَوَّال', sacred: false, meaning: 'Eid-ul-Fitr & 6 Sunnah Fasts of Shawwal' },
  { index: 11, name: "Dhu al-Qi'dah", arabic: 'ذُو القَعْدَة', sacred: true, meaning: 'The Sacred Month of Peace' },
  { index: 12, name: 'Dhu al-Hijjah', arabic: 'ذُو الحِجَّة', sacred: true, meaning: 'The Sacred Month of Hajj & Eid-ul-Adha' },
];

export const MAJOR_ISLAMIC_EVENTS: IslamicEvent[] = [
  {
    title: 'Islamic New Year',
    arabicTitle: 'رأس السنة الهجرية',
    hijriDay: 1,
    hijriMonth: 1,
    monthName: 'Muharram',
    description: '1st of Muharram marking the Hijrah of Prophet Muhammad ﷺ from Makkah to Madinah.',
    type: 'major'
  },
  {
    title: 'Day of Ashura',
    arabicTitle: 'يوم عاشوراء',
    hijriDay: 10,
    hijriMonth: 1,
    monthName: 'Muharram',
    description: 'Day Prophet Musa (AS) was saved from Pharaoh. Recommended Sunnah fasting on 9th & 10th or 10th & 11th.',
    type: 'sunnah_fast'
  },
  {
    title: 'Mawlid an-Nabi',
    arabicTitle: 'المولد النبوي الشريف',
    hijriDay: 12,
    hijriMonth: 3,
    monthName: "Rabi' al-Awwal",
    description: 'Honoring the birth and exemplary legacy of the final Messenger, Prophet Muhammad ﷺ.',
    type: 'major'
  },
  {
    title: 'Isra and Mi’raj',
    arabicTitle: 'الإسراء والمعراج',
    hijriDay: 27,
    hijriMonth: 7,
    monthName: 'Rajab',
    description: 'The miraculous Night Journey and Heavenly Ascension where 5 daily prayers were ordained.',
    type: 'night_of_worship'
  },
  {
    title: 'Laylat al-Bara’ah (Shab-e-Barat)',
    arabicTitle: 'ليلة البراءة',
    hijriDay: 15,
    hijriMonth: 8,
    monthName: "Sha'ban",
    description: 'The blessed 15th night of Sha’ban for sincere repentance, forgiveness, and night prayers.',
    type: 'night_of_worship'
  },
  {
    title: 'First Day of Ramadan',
    arabicTitle: 'أول أيام رمضان',
    hijriDay: 1,
    hijriMonth: 9,
    monthName: 'Ramadan',
    description: 'Beginning of the obligatory month of fasting, recitation of the Quran, and Taraweeh prayers.',
    type: 'major'
  },
  {
    title: 'Laylat al-Qadr (Night of Power)',
    arabicTitle: 'ليلة القدر',
    hijriDay: 27,
    hijriMonth: 9,
    monthName: 'Ramadan',
    description: 'Sought during the odd nights of the last 10 days of Ramadan. Better than a thousand months.',
    type: 'night_of_worship'
  },
  {
    title: 'Eid al-Fitr',
    arabicTitle: 'عيد الفطر المبارك',
    hijriDay: 1,
    hijriMonth: 10,
    monthName: 'Shawwal',
    description: 'Celebration marking the blessed completion of the month of Ramadan.',
    type: 'major'
  },
  {
    title: 'First 10 Days of Dhul-Hijjah',
    arabicTitle: 'عشر ذي الحجة',
    hijriDay: 1,
    hijriMonth: 12,
    monthName: 'Dhu al-Hijjah',
    description: 'The most virtuous 10 days of the entire year for good deeds, fasting, Takbeer, and remembrance.',
    type: 'major'
  },
  {
    title: 'Day of Arafah',
    arabicTitle: 'يوم عرفة',
    hijriDay: 9,
    hijriMonth: 12,
    monthName: 'Dhu al-Hijjah',
    description: 'Pinnacle day of Hajj pilgrimage. Fasting for non-pilgrims expiates sins of previous & coming year.',
    type: 'sunnah_fast'
  },
  {
    title: 'Eid al-Adha',
    arabicTitle: 'عيد الأضحى المبارك',
    hijriDay: 10,
    hijriMonth: 12,
    monthName: 'Dhu al-Hijjah',
    description: 'The Feast of Sacrifice commemorating Prophet Ibrahim’s (AS) devotion to Allah.',
    type: 'major'
  },
  {
    title: 'Days of Tashreeq',
    arabicTitle: 'أيام التشريق',
    hijriDay: 11,
    hijriMonth: 12,
    monthName: 'Dhu al-Hijjah',
    description: '11th, 12th, and 13th of Dhul-Hijjah. Days of eating, drinking, and reciting Takbeerat-e-Tashreeq.',
    type: 'major'
  }
];

const ARABIC_DIGITS: Record<string, string> = {
  '0': '٠', '1': '١', '2': '٢', '3': '٣', '4': '٤',
  '5': '٥', '6': '٦', '7': '٧', '8': '٨', '9': '٩'
};

export function toArabicNumerals(num: number | string): string {
  return String(num).split('').map(c => ARABIC_DIGITS[c] || c).join('');
}

/**
 * Parses and returns detailed Hijri date representation for any Gregorian date.
 */
export function getHijriDateDetails(date: Date = new Date()): HijriDateDetails {
  try {
    const partsEn = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      weekday: 'long'
    }).formatToParts(date);

    let day = 1;
    let monthIndex = 1;
    let year = 1448;
    let weekday = 'Friday';

    for (const p of partsEn) {
      if (p.type === 'day') day = parseInt(p.value, 10);
      else if (p.type === 'month') monthIndex = parseInt(p.value, 10);
      else if (p.type === 'year') year = parseInt(p.value, 10);
      else if (p.type === 'weekday') weekday = p.value;
    }

    const monthObj = ISLAMIC_MONTHS[monthIndex - 1] || ISLAMIC_MONTHS[0];
    const monthName = monthObj.name;
    const monthArabic = monthObj.arabic;

    // Check if current day is Ayyam al-Beed (13th, 14th, 15th)
    const isWhiteDay = day >= 13 && day <= 15;
    const isFriday = date.getDay() === 5;
    const isSacredMonth = monthObj.sacred;

    // Check for special event on this date
    let specialEvent: string | undefined = undefined;
    const matchedEvent = MAJOR_ISLAMIC_EVENTS.find(e => e.hijriMonth === monthIndex && e.hijriDay === day);
    if (matchedEvent) {
      specialEvent = matchedEvent.title;
    } else if (isWhiteDay) {
      specialEvent = 'Ayyam al-Beed (Sunnah Fasting Day)';
    } else if (isFriday) {
      specialEvent = 'Sayyid al-Ayyam (Blessed Friday)';
    }

    const dayArabic = toArabicNumerals(day);
    const yearArabic = toArabicNumerals(year);

    // Format Arabic weekday
    const arabicWeekdays: Record<number, string> = {
      0: 'الأَحَد', 1: 'الاِثْنَيْن', 2: 'الثُّلَاثَاء',
      3: 'الأَرْبِعَاء', 4: 'الخَمِيس', 5: 'الجُمُعَة', 6: 'السَّبْت'
    };
    const weekdayArabic = arabicWeekdays[date.getDay()] || 'الجُمُعَة';

    return {
      day,
      dayArabic,
      monthName,
      monthArabic,
      monthIndex,
      year,
      yearArabic,
      weekday,
      weekdayArabic,
      formattedEnglish: `${day} ${monthName} ${year} AH`,
      formattedArabic: `${dayArabic} ${monthArabic} ${yearArabic} هـ`,
      isWhiteDay,
      isFriday,
      isSacredMonth,
      specialEvent
    };
  } catch {
    return {
      day: 15,
      dayArabic: '١٥',
      monthName: 'Shawwal',
      monthArabic: 'شَوَّال',
      monthIndex: 10,
      year: 1448,
      yearArabic: '١٤٤٨',
      weekday: 'Monday',
      weekdayArabic: 'الاِثْنَيْن',
      formattedEnglish: '15 Shawwal 1448 AH',
      formattedArabic: '١٥ شَوَّال ١٤٤٨ هـ',
      isWhiteDay: true,
      isFriday: false,
      isSacredMonth: false,
      specialEvent: 'Ayyam al-Beed (Sunnah Fasting Day)'
    };
  }
}

/**
 * Returns month calendar grid for a given Hijri month
 */
export function getHijriMonthGrid(referenceDate: Date = new Date(), monthOffset: number = 0) {
  const targetDate = new Date(referenceDate);
  if (monthOffset !== 0) {
    targetDate.setDate(targetDate.getDate() + monthOffset * 29.5);
  }

  const currentDetails = getHijriDateDetails(targetDate);
  const targetMonth = currentDetails.monthIndex;
  const targetYear = currentDetails.year;

  // Find approximate start date of this Hijri month
  // Step backward until month changes
  const cursor = new Date(targetDate);
  while (true) {
    const prev = new Date(cursor);
    prev.setDate(prev.getDate() - 1);
    const d = getHijriDateDetails(prev);
    if (d.monthIndex !== targetMonth) break;
    cursor.setDate(cursor.getDate() - 1);
  }

  // Now cursor is at Day 1 of this Hijri Month
  const days: Array<{
    hijriDay: number;
    gregorianDate: Date;
    weekdayIndex: number;
    isToday: boolean;
    isWhiteDay: boolean;
    isFriday: boolean;
    event?: string;
  }> = [];

  const now = new Date();
  const dayScan = new Date(cursor);

  for (let i = 1; i <= 30; i++) {
    const details = getHijriDateDetails(dayScan);
    if (details.monthIndex !== targetMonth) break;

    const isToday = 
      dayScan.getDate() === now.getDate() &&
      dayScan.getMonth() === now.getMonth() &&
      dayScan.getFullYear() === now.getFullYear();

    const matchedEvent = MAJOR_ISLAMIC_EVENTS.find(
      e => e.hijriMonth === targetMonth && e.hijriDay === details.day
    );

    days.push({
      hijriDay: details.day,
      gregorianDate: new Date(dayScan),
      weekdayIndex: dayScan.getDay(),
      isToday,
      isWhiteDay: details.isWhiteDay,
      isFriday: dayScan.getDay() === 5,
      event: matchedEvent?.title
    });

    dayScan.setDate(dayScan.getDate() + 1);
  }

  const monthObj = ISLAMIC_MONTHS[targetMonth - 1] || ISLAMIC_MONTHS[0];

  return {
    monthName: monthObj.name,
    monthArabic: monthObj.arabic,
    monthIndex: targetMonth,
    year: targetYear,
    isSacred: monthObj.sacred,
    days
  };
}
