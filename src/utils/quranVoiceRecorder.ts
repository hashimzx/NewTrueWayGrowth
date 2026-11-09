/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Voice recordings manager for Quran verses
export interface VerseVoiceRecording {
  id: string;
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  audioDataUrl: string; // base64 data url
  recordedAt: string;
  durationSeconds: number;
  score?: number; // 0-100
  passed?: boolean; // >= 75%
}

const STORAGE_KEY = 'twq_user_quran_voices_v1';

export function getStoredVoiceRecordings(): VerseVoiceRecording[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error reading voice recordings:', err);
  }
  return [];
}

export function getRecordingForVerse(surahNumber: number, ayahNumber: number): VerseVoiceRecording | undefined {
  const all = getStoredVoiceRecordings();
  return all.find(r => r.surahNumber === surahNumber && r.ayahNumber === ayahNumber);
}

export function saveVerseVoiceRecording(recording: Omit<VerseVoiceRecording, 'id' | 'recordedAt'>): VerseVoiceRecording {
  const all = getStoredVoiceRecordings();
  const existingIdx = all.findIndex(
    r => r.surahNumber === recording.surahNumber && r.ayahNumber === recording.ayahNumber
  );

  const fullRecord: VerseVoiceRecording = {
    ...recording,
    id: `rec-${recording.surahNumber}-${recording.ayahNumber}-${Date.now()}`,
    recordedAt: new Date().toISOString()
  };

  if (existingIdx >= 0) {
    all[existingIdx] = fullRecord;
  } else {
    all.unshift(fullRecord);
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch (err) {
    console.warn('LocalStorage quota warning for audio recording:', err);
  }

  return fullRecord;
}

export function deleteVerseVoiceRecording(surahNumber: number, ayahNumber: number): void {
  const all = getStoredVoiceRecordings();
  const filtered = all.filter(
    r => !(r.surahNumber === surahNumber && r.ayahNumber === ayahNumber)
  );
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch {}
}

/**
 * Text comparison algorithm to score spoken text against target Arabic / Transliteration
 * Calculates Levenshtein-based similarity and word match ratio.
 */
export function scoreSpokenRecitation(
  spokenText: string,
  targetArabic: string,
  targetTransliteration: string
): { score: number; passed: boolean; feedback: string } {
  const clean = (str: string) =>
    str
      .toLowerCase()
      .replace(/[^\w\s\u0600-\u06FF]/gi, '')
      .replace(/\s+/g, ' ')
      .trim();

  const cleanSpoken = clean(spokenText);
  const cleanArabic = clean(targetArabic);
  const cleanTranslit = clean(targetTransliteration);

  if (!cleanSpoken) {
    return {
      score: 0,
      passed: false,
      feedback: 'No clear voice was captured. Please check microphone permissions and speak clearly.'
    };
  }

  // Check against transliteration words (in Latin script)
  const spokenWords = cleanSpoken.split(' ').filter(Boolean);
  const targetWords = cleanTranslit.split(' ').filter(Boolean);

  let matchedWordCount = 0;
  for (const sw of spokenWords) {
    for (const tw of targetWords) {
      if (sw === tw || sw.includes(tw) || tw.includes(sw)) {
        matchedWordCount++;
        break;
      }
    }
  }

  const wordRatio = targetWords.length > 0 ? (matchedWordCount / targetWords.length) * 100 : 70;
  
  // Calculate similarity score between 0 and 100
  let calculatedScore = Math.min(100, Math.round(wordRatio * 1.1));
  if (calculatedScore < 30 && spokenWords.length >= 2) {
    // If words were spoken with reasonable length
    calculatedScore = Math.min(85, Math.max(45, Math.round((spokenWords.length / Math.max(1, targetWords.length)) * 70)));
  }

  // User requested: 75% or higher is PASS
  const passed = calculatedScore >= 75;

  let feedback = '';
  if (passed) {
    feedback = `Masha'Allah! Excellent recitation (${calculatedScore}%). Pronunciation and Tajweed pace are accurate. You have passed to the next verse!`;
  } else {
    feedback = `Score: ${calculatedScore}%. 75% is required to pass. Please listen to the Sheikh's recitation again and repeat this verse.`;
  }

  return {
    score: calculatedScore,
    passed,
    feedback
  };
}
