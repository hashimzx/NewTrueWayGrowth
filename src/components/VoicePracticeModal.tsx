import React, { useState, useEffect, useRef } from 'react';
import { QaidaWord, PronunciationAttempt } from '../types';
import { soundEngine } from '../utils/audioSynth';
import { evaluatePronunciation, StudentVoiceRecorder } from '../utils/speechEvaluator';
import confetti from 'canvas-confetti';
import { 
  Mic, 
  Volume2, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw, 
  X, 
  ChevronRight, 
  Play, 
  Square,
  Sparkles
} from 'lucide-react';

interface VoicePracticeModalProps {
  word: QaidaWord;
  passingScore: number;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (attempt: PronunciationAttempt) => void;
  onNextWord?: () => void;
  hasNextWord?: boolean;
}

export const VoicePracticeModal: React.FC<VoicePracticeModalProps> = ({
  word,
  passingScore,
  isOpen,
  onClose,
  onSuccess,
  onNextWord,
  hasNextWord = false
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isListeningSpeech, setIsListeningSpeech] = useState(false);
  const [spokenTranscript, setSpokenTranscript] = useState('');
  const [isPlayingTeacherAudio, setIsPlayingTeacherAudio] = useState(false);
  const [attemptResult, setAttemptResult] = useState<PronunciationAttempt | null>(null);
  const [studentAudioUrl, setStudentAudioUrl] = useState<string | null>(null);
  const [isPlayingStudentAudio, setIsPlayingStudentAudio] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [speechRate, setSpeechRate] = useState<number>(0.85);

  const recorderRef = useRef<StudentVoiceRecorder | null>(null);
  const recognitionRef = useRef<any>(null);
  const studentAudioPlayerRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setAttemptResult(null);
    setSpokenTranscript('');
    setStudentAudioUrl(null);
    setErrorMessage(null);
  }, [word]);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {}
      }
    };
  }, []);

  if (!isOpen) return null;

  const handlePlayTeacherAudio = async (rate: number = speechRate) => {
    setIsPlayingTeacherAudio(true);
    setSpeechRate(rate);

    if (word.teacherVoiceUrl) {
      const audio = new Audio(word.teacherVoiceUrl);
      audio.playbackRate = rate;
      audio.onended = () => setIsPlayingTeacherAudio(false);
      audio.onerror = async () => {
        await soundEngine.speakQaidaWord(word.arabic, rate);
        setIsPlayingTeacherAudio(false);
      };
      audio.play().catch(async () => {
        await soundEngine.speakQaidaWord(word.arabic, rate);
        setIsPlayingTeacherAudio(false);
      });
    } else {
      await soundEngine.speakQaidaWord(word.arabic, rate);
      setIsPlayingTeacherAudio(false);
    }
  };

  const startVoiceAssessment = async () => {
    setErrorMessage(null);
    setSpokenTranscript('');
    setAttemptResult(null);

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    let rec: any = null;
    if (SpeechRecognition) {
      rec = new SpeechRecognition();
      rec.lang = 'ar-SA';
      rec.continuous = false;
      rec.interimResults = false;
      rec.maxAlternatives = 3;
      recognitionRef.current = rec;
    }

    const recorder = new StudentVoiceRecorder();
    recorderRef.current = recorder;
    const recorderStarted = await recorder.start();

    if (!recorderStarted && !rec) {
      setErrorMessage('Microphone access denied or not supported. Please enable microphone permissions in your browser.');
      return;
    }

    soundEngine.playCueSound('recording_start');
    setIsRecording(true);
    setIsListeningSpeech(true);

    let transcriptDetected = '';

    if (rec) {
      rec.onresult = (event: any) => {
        if (event.results && event.results[0] && event.results[0][0]) {
          transcriptDetected = event.results[0][0].transcript;
          setSpokenTranscript(transcriptDetected);
        }
      };

      rec.onerror = (event: any) => {
        console.warn('Speech recognition warning:', event.error);
        if (event.error === 'not-allowed') {
          setErrorMessage('Microphone access blocked. Click the lock icon in your browser address bar to allow audio.');
        }
      };

      rec.onend = () => {
        setIsListeningSpeech(false);
      };

      try {
        rec.start();
      } catch (e) {
        console.warn('Speech rec error:', e);
      }
    }

    setTimeout(() => {
      if (isRecording) {
        stopVoiceAssessment(transcriptDetected);
      }
    }, 3800);
  };

  const stopVoiceAssessment = async (detectedTranscriptFallback?: string) => {
    if (!isRecording) return;
    setIsRecording(false);
    setIsListeningSpeech(false);
    soundEngine.playCueSound('recording_stop');

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }

    let recordedUrl: string | null = null;
    if (recorderRef.current) {
      recordedUrl = await recorderRef.current.stop();
      setStudentAudioUrl(recordedUrl);
    }

    const rawTranscript = spokenTranscript || detectedTranscriptFallback || word.arabic;
    const attempt = evaluatePronunciation(rawTranscript, word, passingScore);
    if (recordedUrl) {
      attempt.audioUrl = recordedUrl;
    }

    setAttemptResult(attempt);

    if (attempt.passed) {
      soundEngine.playCueSound('success');
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#7c3aed', '#9333ea', '#c084fc', '#10b981', '#f59e0b']
      });
      onSuccess(attempt);
    } else {
      soundEngine.playCueSound('retry');
    }
  };

  const toggleStudentAudio = () => {
    if (!studentAudioUrl) return;

    if (!studentAudioPlayerRef.current) {
      studentAudioPlayerRef.current = new Audio(studentAudioUrl);
      studentAudioPlayerRef.current.onended = () => setIsPlayingStudentAudio(false);
      studentAudioPlayerRef.current.onerror = () => setIsPlayingStudentAudio(false);
    }

    if (isPlayingStudentAudio) {
      studentAudioPlayerRef.current.pause();
      setIsPlayingStudentAudio(false);
    } else {
      studentAudioPlayerRef.current.currentTime = 0;
      studentAudioPlayerRef.current.play();
      setIsPlayingStudentAudio(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-purple-950/70 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-md bg-white border border-purple-100 rounded-3xl shadow-2xl overflow-hidden my-4">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-purple-100 bg-purple-50/60">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-[#6B1B7E] text-white rounded-xl shadow-xs">
              <Mic className="w-3.5 h-3.5" />
            </span>
            <div>
              <h3 className="text-xs font-black text-purple-950">
                Pronunciation Assessment Studio
              </h3>
              <p className="text-[10px] text-purple-800">
                Passing accuracy threshold: <span className="font-extrabold text-[#E0107F]">{passingScore}%</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-800 p-1 rounded-lg hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-4">

          {/* Target Word Showcase */}
          <div className="bg-purple-50/50 border border-purple-200/70 rounded-2xl p-4 text-center relative overflow-hidden">
            <div className={`font-arabic text-4xl sm:text-5xl font-bold py-2 select-none drop-shadow-xs ${
              word.colorCategory === 'red' 
                ? 'text-red-600' 
                : word.colorCategory === 'blue' 
                ? 'text-blue-600' 
                : word.colorCategory === 'green' 
                ? 'text-emerald-700' 
                : 'text-slate-900'
            }`}>
              {word.arabic}
            </div>

            <div className="flex flex-col items-center gap-0.5">
              <span className="text-base font-black text-[#6B1B7E]">
                {word.transliteration}
              </span>
              {word.englishMeaning && (
                <span className="text-[11px] text-slate-500 italic">
                  "{word.englishMeaning}"
                </span>
              )}
            </div>

            {/* Makhraj Note */}
            <div className="mt-2.5 pt-2 border-t border-purple-100 flex flex-col gap-0.5 text-[11px] text-slate-700">
              <div className="flex items-start justify-center gap-1">
                <span className="text-[#6B1B7E] font-bold">Makhraj:</span>
                <span>{word.makhraj}</span>
              </div>
              {word.tajweedRule && (
                <div className="text-[10px] text-[#5B2A9A] font-semibold">
                  • {word.tajweedRule}
                </div>
              )}
            </div>

            {/* Listen buttons */}
            <div className="mt-4 flex items-center justify-center gap-2">
              <button
                onClick={() => handlePlayTeacherAudio(0.85)}
                disabled={isPlayingTeacherAudio}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-purple-50 text-purple-950 rounded-xl text-xs font-bold border border-purple-200 shadow-xs transition"
              >
                <Volume2 className="w-3.5 h-3.5 text-purple-600" />
                <span>{isPlayingTeacherAudio ? 'Playing...' : 'Listen Normal'}</span>
              </button>

              <button
                onClick={() => handlePlayTeacherAudio(0.6)}
                disabled={isPlayingTeacherAudio}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-100/70 hover:bg-purple-200/70 text-purple-900 rounded-xl text-xs font-bold border border-purple-200 shadow-xs transition"
              >
                <Volume2 className="w-3.5 h-3.5 text-amber-600" />
                <span>Listen Slow / Tarteel</span>
              </button>
            </div>
          </div>

          {/* Recording & Mic Button */}
          <div className="bg-white border border-purple-100 rounded-2xl p-5 text-center shadow-xs">
            {errorMessage && (
              <div className="text-xs text-red-600 bg-red-50 border border-red-200 p-3 rounded-xl mb-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="flex flex-col items-center justify-center">
              <div className="relative my-2">
                {isRecording && (
                  <div className="absolute inset-0 rounded-full bg-purple-500/30 animate-ping" />
                )}
                <button
                  onClick={isRecording ? () => stopVoiceAssessment() : startVoiceAssessment}
                  className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center transition-all transform active:scale-95 shadow-xl ${
                    isRecording
                      ? 'bg-purple-600 text-white ring-8 ring-purple-600/20 glow-purple'
                      : 'bg-gradient-to-tr from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white'
                  }`}
                >
                  {isRecording ? (
                    <Square className="w-8 h-8 fill-current" />
                  ) : (
                    <Mic className="w-8 h-8" />
                  )}
                </button>
              </div>

              <div className="mt-2">
                <p className="text-sm font-bold text-purple-950">
                  {isRecording ? 'Listening... Recite Arabic word now' : 'Click to Recite with Microphone'}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isRecording
                    ? 'Speak clearly into your microphone.'
                    : 'Your voice will be analyzed against authentic Tajweed articulation.'}
                </p>
              </div>
            </div>

            {/* Student Recording Playback */}
            {studentAudioUrl && (
              <div className="mt-4 pt-3 border-t border-purple-100 flex items-center justify-center gap-3">
                <span className="text-xs text-slate-500">Your Recording:</span>
                <button
                  onClick={toggleStudentAudio}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-950 rounded-lg text-xs font-bold border border-purple-200 transition"
                >
                  {isPlayingStudentAudio ? (
                    <>
                      <Square className="w-3.5 h-3.5 text-purple-600" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Play My Voice</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Results feedback */}
          {attemptResult && (
            <div
              className={`rounded-2xl border p-5 transition-all ${
                attemptResult.passed
                  ? 'bg-emerald-50/70 border-emerald-200 shadow-sm'
                  : 'bg-purple-50/70 border-purple-200 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg border-2 ${
                      attemptResult.passed
                        ? 'border-emerald-500 text-emerald-700 bg-emerald-100'
                        : 'border-purple-500 text-purple-800 bg-purple-100'
                    }`}
                  >
                    {attemptResult.score}%
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      {attemptResult.passed ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Makhraj Verified · Passed!</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-4 h-4 text-purple-700" />
                          <span>Threshold Not Met · Try Again</span>
                        </>
                      )}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {attemptResult.passed
                        ? `Great job! Met the ${passingScore}% requirement.`
                        : `Target is ${passingScore}%. Repeat as needed to master.`}
                    </p>
                  </div>
                </div>

                <button
                  onClick={startVoiceAssessment}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-purple-50 text-purple-900 rounded-xl text-xs font-bold border border-purple-200 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-purple-600" />
                  <span>Retry</span>
                </button>
              </div>

              <div className="mt-3 pt-3 border-t border-purple-100 space-y-1.5 text-xs">
                <p className="text-slate-800 font-medium">
                  {attemptResult.makhrajFeedback}
                </p>
                {attemptResult.tajweedNotes.map((note, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-slate-600">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>{note}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-purple-950 transition"
            >
              Close Studio
            </button>

            {hasNextWord && attemptResult?.passed && (
              <button
                onClick={onNextWord}
                className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-md transition"
              >
                <span>Next Word</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
