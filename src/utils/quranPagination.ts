/**
 * Quran Page Navigation and Reading Memory System
 * Supports 10-15 Ayat per page (default: 15 Ayat per page)
 * Persists user's exact Surah, Page, and Ayah range across days/sessions.
 */

export const DEFAULT_AYAHS_PER_PAGE = 15;
export const ALLOWED_AYAHS_PER_PAGE = [10, 12, 15] as const;

export interface QuranReadingSession {
  surahNumber: number;
  surahName: string;
  englishName: string;
  pageNumber: number;
  totalPages: number;
  ayahsPerPage: number;
  startAyah: number;
  endAyah: number;
  ayahIndex: number;
  ayahNumber: number;
  timestamp: number;
  lastReadDate?: string;
}

export const QURAN_READING_STORAGE_KEY = 'twq_last_read_quran_position';

/**
 * Calculates total pages required for given number of ayahs
 */
export function calculateTotalPages(totalAyahs: number, ayahsPerPage: number = DEFAULT_AYAHS_PER_PAGE): number {
  if (!totalAyahs || totalAyahs <= 0) return 1;
  const perPage = Math.max(1, ayahsPerPage);
  return Math.max(1, Math.ceil(totalAyahs / perPage));
}

/**
 * Computes 1-based startAyah, endAyah and 0-based array slice indices
 */
export function getPageAyahRange(
  pageNumber: number,
  totalAyahs: number,
  ayahsPerPage: number = DEFAULT_AYAHS_PER_PAGE
): {
  pageNumber: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  startAyah: number;
  endAyah: number;
  totalAyahsOnPage: number;
} {
  const perPage = Math.max(1, ayahsPerPage);
  const totalPages = calculateTotalPages(totalAyahs, perPage);
  const validPage = Math.max(1, Math.min(pageNumber, totalPages));

  const startIndex = (validPage - 1) * perPage;
  const endIndex = Math.min(validPage * perPage, totalAyahs);
  const startAyah = totalAyahs > 0 ? startIndex + 1 : 1;
  const endAyah = Math.max(startAyah, endIndex);
  const totalAyahsOnPage = Math.max(0, endIndex - startIndex);

  return {
    pageNumber: validPage,
    totalPages,
    startIndex,
    endIndex,
    startAyah,
    endAyah,
    totalAyahsOnPage
  };
}

/**
 * Slices the ayahs array for the requested page
 */
export function paginateAyahs<T>(
  ayahs: T[],
  pageNumber: number,
  ayahsPerPage: number = DEFAULT_AYAHS_PER_PAGE
): T[] {
  if (!ayahs || ayahs.length === 0) return [];
  const range = getPageAyahRange(pageNumber, ayahs.length, ayahsPerPage);
  return ayahs.slice(range.startIndex, range.endIndex);
}

/**
 * Saves the user's reading position so that next day the page opens where user left off
 */
export function saveQuranReadingPosition(session: QuranReadingSession): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(QURAN_READING_STORAGE_KEY, JSON.stringify(session));
    }
  } catch (err) {
    console.error('Failed to save Quran reading position to localStorage', err);
  }
}

/**
 * Loads the user's saved reading position
 */
export function loadQuranReadingPosition(): QuranReadingSession | null {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    const raw = window.localStorage.getItem(QURAN_READING_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.surahNumber === 'number' && parsed.surahNumber >= 1 && parsed.surahNumber <= 114) {
      const perPage = parsed.ayahsPerPage || DEFAULT_AYAHS_PER_PAGE;
      const pageNum = parsed.pageNumber || (parsed.ayahIndex !== undefined ? Math.floor(parsed.ayahIndex / perPage) + 1 : 1);
      return {
        surahNumber: parsed.surahNumber,
        surahName: parsed.surahName || '',
        englishName: parsed.englishName || '',
        pageNumber: Math.max(1, pageNum),
        totalPages: parsed.totalPages || 1,
        ayahsPerPage: perPage,
        startAyah: parsed.startAyah || ((pageNum - 1) * perPage + 1),
        endAyah: parsed.endAyah || (pageNum * perPage),
        ayahIndex: parsed.ayahIndex !== undefined ? parsed.ayahIndex : (pageNum - 1) * perPage,
        ayahNumber: parsed.ayahNumber || ((pageNum - 1) * perPage + 1),
        timestamp: parsed.timestamp || Date.now(),
        lastReadDate: parsed.lastReadDate || new Date().toISOString().slice(0, 10)
      };
    }
  } catch (err) {
    console.error('Failed to load Quran reading position from localStorage', err);
  }
  return null;
}
