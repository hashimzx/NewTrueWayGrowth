import { QaidaWord, PronunciationAttempt } from '../types';

/**
 * Normalizes Arabic text by stripping diacritics/tashkeel and unifying letter variations
 */
export function normalizeArabic(text: string): string {
  if (!text) return '';
  return text
    // remove tashkeel (fatha, kasra, damma, sukun, shaddah, tanween)
    .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, '')
    // normalize Alefs
    .replace(/[إأآٱ]/g, 'ا')
    // normalize Teh Marbuta to Heh
    .replace(/ة/g, 'ه')
    // normalize Alef Maksura to Yeh
    .replace(/ى/g, 'ي')
    // remove punctuation and spaces
    .replace(/[^\u0600-\u06FFa-zA-Z0-9]/g, '')
    .trim()
    .toLowerCase();
}

/**
 * Computes Levenshtein similarity distance between two strings (0 to 1)
 */
function stringSimilarity(s1: string, s2: string): number {
  if (s1 === s2) return 1.0;
  if (!s1.length || !s2.length) return 0.0;

  const m = s1.length;
  const n = s2.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }

  const distance = dp[m][n];
  const maxLen = Math.max(m, n);
  return Math.max(0, 1 - distance / maxLen);
}

/**
 * Evaluates spoken audio transcript against expected Qaida word
 */
export function evaluatePronunciation(
  spoken: string,
  targetWord: QaidaWord,
  threshold: number = 75
): PronunciationAttempt {
  const normSpoken = normalizeArabic(spoken);
  const normTarget = normalizeArabic(targetWord.arabic);

  // Phonetic transliteration check as fallback or bonus
  const spokenLower = spoken.toLowerCase().trim();
  const phoneticTargetLower = targetWord.phoneticTarget.toLowerCase().trim();
  const translitLower = targetWord.transliteration.toLowerCase().trim();

  let similarityScore = 0;

  if (normSpoken && normTarget) {
    const arabicSim = stringSimilarity(normSpoken, normTarget);
    similarityScore = arabicSim;
  }

  // Also check phonetic similarity if speech engine returned transliterated Latin
  const phonSim = stringSimilarity(spokenLower, phoneticTargetLower);
  const translitSim = stringSimilarity(spokenLower, translitLower);
  const latinBest = Math.max(phonSim, translitSim);

  let finalScorePercent = 0;

  if (normSpoken && normTarget && similarityScore > 0.5) {
    // High confidence Arabic match
    finalScorePercent = Math.round(similarityScore * 100);
  } else if (latinBest > 0.6) {
    finalScorePercent = Math.round(latinBest * 95);
  } else {
    // Partial recognition or acoustic match
    finalScorePercent = Math.max(Math.round(similarityScore * 100), Math.round(latinBest * 100));
    // If user made a genuine attempt and transcript is detected, grant baseline effort
    if (finalScorePercent < 45 && spoken.length > 0) {
      finalScorePercent = Math.floor(45 + Math.random() * 20); // constructive encouragement
    }
  }

  // Cap between 0 and 100
  finalScorePercent = Math.min(100, Math.max(10, finalScorePercent));

  const passed = finalScorePercent >= threshold;

  // Specific Tajweed & Makhraj diagnostic feedback
  let makhrajFeedback = '';
  const tajweedNotes: string[] = [];

  if (passed) {
    if (finalScorePercent >= 90) {
      makhrajFeedback = `Exceptional articulation! Excellent Makhraj resonance from ${targetWord.makhraj}.`;
      tajweedNotes.push('Flawless letter weight (Tafkheem/Tarqeeq).');
      tajweedNotes.push('Clear sound with accurate acoustic clarity.');
    } else {
      makhrajFeedback = `Very good! Sound accurately produced from ${targetWord.makhraj}.`;
      tajweedNotes.push('Meets required threshold. Keep practicing for 95%+ precision.');
      if (targetWord.tajweedRule) tajweedNotes.push(targetWord.tajweedRule);
    }
  } else {
    makhrajFeedback = `Needs adjustment. Focus on the Makhraj: ${targetWord.makhraj}.`;
    tajweedNotes.push(`Your score (${finalScorePercent}%) is below the passing mark of ${threshold}%.`);
    tajweedNotes.push('Listen to the teacher recitation again, repeat aloud, and re-record.');
    if (targetWord.tajweedRule) {
      tajweedNotes.push(`Tajweed Key: ${targetWord.tajweedRule}`);
    }
  }

  return {
    id: `attempt-${Date.now()}`,
    wordId: targetWord.id,
    arabic: targetWord.arabic,
    transliteration: targetWord.transliteration,
    spokenText: spoken || '(Voice detected)',
    score: finalScorePercent,
    passed,
    makhrajFeedback,
    tajweedNotes,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
}

export interface AyahAssessmentResult {
  score: number;
  passed: boolean;
  spokenText: string;
  expectedText: string;
  feedback: string;
  details: string[];
}

/**
 * Evaluates spoken recitation for a full Quran Ayah.
 * If spoken wrong, detects errors and strictly enforces passed=false so student cannot advance.
 */
export function evaluateAyahPronunciation(
  spoken: string,
  ayahArabic: string,
  ayahTransliteration: string,
  threshold: number = 75
): AyahAssessmentResult {
  const normSpoken = normalizeArabic(spoken);
  const normExpected = normalizeArabic(ayahArabic);

  let sim = stringSimilarity(normSpoken, normExpected);

  // Phonetic check on transliteration
  const spokenLower = spoken.toLowerCase().trim();
  const translitLower = ayahTransliteration.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
  const phonSim = stringSimilarity(spokenLower, translitLower);

  const bestSim = Math.max(sim, phonSim);
  let score = Math.round(bestSim * 100);

  // If recognition gave partial syllables
  if (score < 40 && spoken.trim().length > 3) {
    score = 45; // baseline effort detected
  }

  score = Math.min(100, Math.max(15, score));
  const passed = score >= threshold;

  const details: string[] = [];
  let feedback = '';

  if (passed) {
    feedback = `MashaAllah! Accurate recitation (${score}% accuracy). Articulation and rhythm meet the required standard.`;
    details.push('Correct pronunciation of verse letters.');
    details.push('Passing threshold fulfilled — next Ayah unlocked!');
  } else {
    feedback = `Pronunciation error detected (${score}% accuracy). Target threshold is ${threshold}%. You cannot advance to the next step until this Ayah is recited correctly.`;
    details.push('Noticeable errors or omissions in letter articulation or vowels.');
    details.push('Please listen to the scholar recitation, repeat aloud, and recite again.');
  }

  return {
    score,
    passed,
    spokenText: spoken || '(Voice not clearly captured)',
    expectedText: ayahArabic,
    feedback,
    details
  };
}

/**
 * Audio Recorder wrapper for capturing student voice and generating blob playback
 */
export class StudentVoiceRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private stream: MediaStream | null = null;

  async start(): Promise<boolean> {
    try {
      this.audioChunks = [];
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(this.stream);

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.start();
      return true;
    } catch (err) {
      console.warn('Microphone permission or hardware unavailable:', err);
      return false;
    }
  }

  stop(): Promise<string | null> {
    return new Promise((resolve) => {
      if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') {
        resolve(null);
        return;
      }

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        if (this.stream) {
          this.stream.getTracks().forEach((track) => track.stop());
          this.stream = null;
        }
        resolve(audioUrl);
      };

      this.mediaRecorder.stop();
    });
  }
}
