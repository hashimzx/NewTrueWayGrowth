export interface AudioSession {
  surahNumber: number;
  surahName: string;
  englishName: string;
  currentTime: number;
  duration?: number;
  reciterId: string;
  reciterName?: string;
  timestamp: number;
}

const STORAGE_KEY = 'twq_last_audio_session';

export function saveAudioSession(session: Omit<AudioSession, 'timestamp'>): void {
  try {
    const payload: AudioSession = {
      ...session,
      timestamp: Date.now()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (err) {
    console.warn('Could not save audio session to localStorage', err);
  }
}

export function getAudioSession(): AudioSession | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    const parsed: AudioSession = JSON.parse(saved);
    if (parsed && typeof parsed.surahNumber === 'number' && parsed.currentTime >= 0) {
      return parsed;
    }
  } catch (err) {
    console.warn('Could not read audio session from localStorage', err);
  }
  return null;
}

export function clearAudioSession(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}

export function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}
