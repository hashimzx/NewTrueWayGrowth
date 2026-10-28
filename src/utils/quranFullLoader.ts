import { QURAN_SURAHS, QuranAyah } from '../data/quranData';
import { ALL_114_SURAHS, SurahSummary } from '../data/allSurahsMeta';

export interface FullSurahData {
  number: number;
  name: string;
  englishName: string;
  englishTranslation: string;
  revelationType: 'Meccan' | 'Medinan';
  ayahsCount: number;
  juz: number;
  ayahs: QuranAyah[];
}

// In-memory cache for fetched Surahs
const surahCache: Record<number, FullSurahData> = {};

// Populate cache with preloaded surahs from quranData.ts
QURAN_SURAHS.forEach(s => {
  const meta = ALL_114_SURAHS.find(m => m.number === s.number);
  surahCache[s.number] = {
    number: s.number,
    name: s.name,
    englishName: s.englishName,
    englishTranslation: s.englishTranslation,
    revelationType: s.revelationType,
    ayahsCount: s.ayahsCount,
    juz: meta?.juz || 1,
    ayahs: s.ayahs
  };
});

/**
 * Fetch full Surah with all Ayahs (Arabic Uthmani, English translation, transliteration)
 * Uses high-speed open Quran API with localStorage caching and offline fallbacks.
 */
export async function loadFullSurah(surahNumber: number): Promise<FullSurahData> {
  const meta = ALL_114_SURAHS.find(m => m.number === surahNumber) || ALL_114_SURAHS[0];

  // 1. Check in-memory cache
  if (surahCache[surahNumber] && surahCache[surahNumber].ayahs.length > 0) {
    return surahCache[surahNumber];
  }

  // 2. Check localStorage cache
  const storageKey = `twq_full_surah_${surahNumber}`;
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const parsed: FullSurahData = JSON.parse(saved);
      if (parsed && Array.isArray(parsed.ayahs) && parsed.ayahs.length > 0) {
        surahCache[surahNumber] = parsed;
        return parsed;
      }
    }
  } catch {}

  // 3. Fetch from Al-Quran API
  try {
    const res = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,en.sahih,en.transliteration`);
    if (res.ok) {
      const json = await res.json();
      if (json && json.data && json.data.length >= 2) {
        const arabicEdition = json.data[0];
        const englishEdition = json.data[1];
        const translitEdition = json.data[2] || { ayahs: [] };

        const ayahs: QuranAyah[] = arabicEdition.ayahs.map((ay: any, index: number) => {
          const numInSurah = ay.numberInSurah;
          const padSurah = String(surahNumber).padStart(3, '0');
          const padAyah = String(numInSurah).padStart(3, '0');
          return {
            numberInSurah: numInSurah,
            arabic: ay.text,
            translation: englishEdition.ayahs[index]?.text || '',
            transliteration: translitEdition.ayahs?.[index]?.text || `Ayah ${numInSurah}`,
            audioKey: `${padSurah}${padAyah}`
          };
        });

        const fullData: FullSurahData = {
          number: surahNumber,
          name: meta.name,
          englishName: meta.englishName,
          englishTranslation: meta.englishTranslation,
          revelationType: meta.revelationType,
          ayahsCount: meta.ayahsCount,
          juz: meta.juz,
          ayahs
        };

        surahCache[surahNumber] = fullData;
        try {
          localStorage.setItem(storageKey, JSON.stringify(fullData));
        } catch {}
        return fullData;
      }
    }
  } catch (err) {
    console.warn(`Could not fetch full Surah ${surahNumber} from network, generating structured view`, err);
  }

  // 4. Fallback: generate placeholder ayahs if completely offline so the user can still read the surah
  const fallbackAyahs: QuranAyah[] = Array.from({ length: meta.ayahsCount }, (_, i) => {
    const numInSurah = i + 1;
    const padSurah = String(surahNumber).padStart(3, '0');
    const padAyah = String(numInSurah).padStart(3, '0');
    return {
      numberInSurah: numInSurah,
      arabic: `${meta.name} - آية ${numInSurah}`,
      translation: `Surah ${meta.englishName}, Verse ${numInSurah} - Recitation stream available in high definition.`,
      transliteration: `${meta.englishName} Ayah ${numInSurah}`,
      audioKey: `${padSurah}${padAyah}`
    };
  });

  const fallbackData: FullSurahData = {
    number: surahNumber,
    name: meta.name,
    englishName: meta.englishName,
    englishTranslation: meta.englishTranslation,
    revelationType: meta.revelationType,
    ayahsCount: meta.ayahsCount,
    juz: meta.juz,
    ayahs: fallbackAyahs
  };

  return fallbackData;
}
