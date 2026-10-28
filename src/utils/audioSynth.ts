/**
 * High quality Arabic audio playback engine for True Way Quran.
 * Supports:
 * - Authentic Madani Qaida Qari pronunciation with proper letter phoneme names
 * - Web Speech Synthesis with native Arabic vocal tuning
 * - Web Audio API acoustic chime & harmonic Tajweed cue sounds
 * - Teacher custom recorded recitations
 */

const QAIDA_LETTER_PHONETICS: Record<string, string> = {
  'ا': 'أَلِف',
  'ب': 'بَاء',
  'ت': 'تَاء',
  'ث': 'ثَاء',
  'ج': 'جِيم',
  'ح': 'حَاء',
  'خ': 'خَاء',
  'د': 'دَال',
  'ذ': 'ذَال',
  'ر': 'رَاء',
  'ز': 'زَاي',
  'س': 'سِين',
  'ش': 'شِين',
  'ص': 'صَاد',
  'ض': 'ضَاد',
  'ط': 'طَاء',
  'ظ': 'ظَاء',
  'ع': 'عَيْن',
  'غ': 'غَيْن',
  'ف': 'فَاء',
  'ق': 'قَاف',
  'ك': 'كَاف',
  'ل': 'لَام',
  'م': 'مِيم',
  'ن': 'نُون',
  'و': 'وَاو',
  'ه': 'هَاء',
  'ء': 'هَمْزَة',
  'ي': 'يَاء',
  'ى': 'أَلِف مَقْصُورَة',
  'ة': 'تَاء مَرْبُوطَة',
  'آ': 'أَلِف مَدَّة',
  'ٱ': 'هَمْزَةُ الْوَصْل',
  'لا': 'لَام أَلِف',
  'با': 'بَاء أَلِف',
  'تا': 'تَاء أَلِف',
  'ثا': 'ثَاء أَلِف',
  'بل': 'بَاء لَام',
  'جا': 'جِيم أَلِف',
  'حق': 'حَاء قَاف',
  'خب': 'خَاء بَاء',
  'نل': 'نُون لَام',
  'يل': 'يَاء لَام',
  'ال': 'أَلِف لَام'
};

class AudioEngine {
  private ctx: AudioContext | null = null;

  private getAudioContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  /**
   * Speaks authentic Madani Qaida letter or compound word
   */
  public speakQaidaWord(rawArabic: string, rate: number = 0.85): Promise<void> {
    const phoneticText = QAIDA_LETTER_PHONETICS[rawArabic.trim()] || rawArabic;
    return this.speakArabic(phoneticText, rate);
  }

  /**
   * Plays Arabic text using native high quality browser Arabic voice
   */
  public speakArabic(text: string, rate: number = 0.85): Promise<void> {
    return new Promise((resolve) => {
      if (!('speechSynthesis' in window)) {
        this.playFallbackTone(440, 0.4);
        resolve();
        return;
      }

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA';
      utterance.rate = rate; // deliberate pacing for clear tajweed
      utterance.pitch = 1.0;

      // Select Arabic voice if available in system
      const voices = window.speechSynthesis.getVoices();
      const arabicVoice = voices.find(v => 
        v.lang.startsWith('ar') || 
        v.name.toLowerCase().includes('arabic') || 
        v.name.toLowerCase().includes('maged') || 
        v.name.toLowerCase().includes('tarik') ||
        v.name.toLowerCase().includes('laila')
      );
      if (arabicVoice) {
        utterance.voice = arabicVoice;
      }

      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();

      window.speechSynthesis.speak(utterance);
    });
  }

  /**
   * Plays harmonic cue tones (success, retry, chime)
   */
  public playCueSound(type: 'success' | 'retry' | 'recording_start' | 'recording_stop') {
    try {
      const ctx = this.getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.12);
        osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.24);

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.25, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

        osc.start(now);
        osc.stop(now + 0.5);
      } else if (type === 'retry') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(392.00, now);
        osc.frequency.linearRampToValueAtTime(329.63, now + 0.18);

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.2, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

        osc.start(now);
        osc.stop(now + 0.4);
      } else if (type === 'recording_start') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      }
    } catch {}
  }

  private playFallbackTone(freq: number, duration: number) {
    try {
      const ctx = this.getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {}
  }
}

export const soundEngine = new AudioEngine();
