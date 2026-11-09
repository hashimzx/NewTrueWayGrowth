/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  Play, 
  Pause, 
  Trash2, 
  Award, 
  Sparkles, 
  Download, 
  Calendar, 
  BookOpen, 
  CheckCircle2,
  Clock,
  Volume2
} from 'lucide-react';
import { 
  getStoredVoiceRecordings, 
  deleteVerseVoiceRecording, 
  VerseVoiceRecording 
} from '../../utils/quranVoiceRecorder';

interface PortalVoiceVaultSectionProps {
  studentName: string;
  onNavigateToVerse?: (surahNumber: number, ayahNumber: number) => void;
}

export const PortalVoiceVaultSection: React.FC<PortalVoiceVaultSectionProps> = ({
  studentName,
  onNavigateToVerse
}) => {
  const [recordings, setRecordings] = useState<VerseVoiceRecording[]>([]);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioPlayerRef = React.useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    loadRecordings();
  }, []);

  const loadRecordings = () => {
    const list = getStoredVoiceRecordings();
    setRecordings(list);
  };

  const handlePlayVoice = (rec: VerseVoiceRecording) => {
    if (playingId === rec.id) {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
        audioPlayerRef.current = null;
      }
      setPlayingId(null);
      return;
    }

    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
    }

    const audio = new Audio(rec.audioDataUrl);
    audioPlayerRef.current = audio;
    setPlayingId(rec.id);

    audio.onended = () => setPlayingId(null);
    audio.onerror = () => setPlayingId(null);
    audio.play().catch(() => setPlayingId(null));
  };

  const handleDelete = (surahNumber: number, ayahNumber: number) => {
    deleteVerseVoiceRecording(surahNumber, ayahNumber);
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current = null;
    }
    setPlayingId(null);
    loadRecordings();
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#6E1373] via-[#851C82] to-[#C72F8A] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-pink-200 text-xs font-bold">
            <Mic className="w-3.5 h-3.5 text-pink-300" />
            <span>My Quran Recitation Studio & Voice Vault</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Give Your Voice to the Holy Quran
          </h2>
          <p className="text-pink-100 text-xs sm:text-sm leading-relaxed">
            Record your personal recitation for any Ayah across the 114 Surahs. Listen back to evaluate your Tajweed, test your pronunciation against 75% passing threshold, and track your recitation journey.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-xs">
          <span className="text-xs text-slate-500 font-bold block">Total Verses Recorded</span>
          <span className="text-2xl font-black text-[#6E1373] mt-1 block">
            {recordings.length} Verses
          </span>
          <span className="text-[11px] text-slate-400">Stored safely on your device</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-xs">
          <span className="text-xs text-slate-500 font-bold block">Passed Recitations (≥75%)</span>
          <span className="text-2xl font-black text-emerald-600 mt-1 block">
            {recordings.filter(r => (r.score || 0) >= 75).length} Mastered
          </span>
          <span className="text-[11px] text-emerald-600 font-semibold">Accurate Tajweed verified</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-xs">
          <span className="text-xs text-slate-500 font-bold block">Average Speaking Score</span>
          <span className="text-2xl font-black text-[#C72F8A] mt-1 block">
            {recordings.length > 0 
              ? Math.round(recordings.reduce((acc, r) => acc + (r.score || 80), 0) / recordings.length) 
              : 0}%
          </span>
          <span className="text-[11px] text-slate-400">Target passing mark: 75%</span>
        </div>
      </div>

      {/* Recordings List */}
      {recordings.length === 0 ? (
        <div className="bg-white rounded-3xl border border-purple-100 p-10 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-purple-50 text-[#6E1373] flex items-center justify-center mx-auto">
            <Mic className="w-8 h-8 text-[#C72F8A]" />
          </div>
          <div className="space-y-1 max-w-md mx-auto">
            <h3 className="text-base font-bold text-slate-900">No Quran Recordings Yet</h3>
            <p className="text-xs text-slate-500">
              Open the <strong>Holy Quran</strong> tab, choose any Surah and verse, and click <strong>"Record My Voice"</strong> to build your personal Quran voice library.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-purple-100 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-purple-50 pb-3">
            <h3 className="text-sm font-bold text-[#6E1373] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C72F8A]" />
              <span>Your Recorded Verses ({recordings.length})</span>
            </h3>
            <span className="text-xs text-slate-400">Ready to play</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {recordings.map((rec) => {
              const isPlaying = playingId === rec.id;
              const isPassed = (rec.score || 0) >= 75;

              return (
                <div
                  key={rec.id}
                  className={`p-4 rounded-2xl border transition-all space-y-3 ${
                    isPlaying 
                      ? 'border-[#851C82] ring-2 ring-purple-100 bg-purple-50/20' 
                      : 'border-slate-200 hover:border-purple-200 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-black text-[#6E1373]">
                        Surah {rec.surahName} : Ayah {rec.ayahNumber}
                      </span>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Recorded on {new Date(rec.recordedAt).toLocaleDateString()} · {rec.durationSeconds}s
                      </p>
                    </div>

                    {rec.score !== undefined && (
                      <span
                        className={`text-xs font-black px-2.5 py-1 rounded-xl shadow-2xs ${
                          isPassed 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {rec.score}% {isPassed ? '✓ Pass' : 'Repeat'}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                    <button
                      onClick={() => handlePlayVoice(rec)}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                        isPlaying
                          ? 'bg-pink-600 text-white'
                          : 'bg-purple-50 hover:bg-purple-100 text-[#6E1373] border border-purple-200'
                      }`}
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      <span>{isPlaying ? 'Pause Voice' : 'Play My Voice'}</span>
                    </button>

                    {onNavigateToVerse && (
                      <button
                        onClick={() => onNavigateToVerse(rec.surahNumber, rec.ayahNumber)}
                        className="py-2 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer"
                        title="Open in Quran Reader"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(rec.surahNumber, rec.ayahNumber)}
                      className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition cursor-pointer"
                      title="Delete recording"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
