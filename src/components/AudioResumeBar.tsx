import React, { useState, useEffect } from 'react';
import { getAudioSession, clearAudioSession, formatTime, AudioSession } from '../utils/audioState';
import { Play, X, Volume2, RotateCcw } from 'lucide-react';

interface AudioResumeBarProps {
  onResume: (session: AudioSession) => void;
}

export const AudioResumeBar: React.FC<AudioResumeBarProps> = ({ onResume }) => {
  const [session, setSession] = useState<AudioSession | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const saved = getAudioSession();
    if (saved && saved.currentTime > 2) {
      setSession(saved);
    }
  }, []);

  if (!session || dismissed) return null;

  return (
    <aside aria-label="Resume audio recitation" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-lg animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#6B1B7E] text-white rounded-2xl p-3 sm:p-4 shadow-2xl border-2 border-[#E0107F]/40 flex items-center justify-between gap-3 backdrop-blur-xl">
        
        {/* Reciter & Surah Details */}
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5B2A9A] to-[#E0107F] flex items-center justify-center shrink-0 shadow-md">
            <Volume2 className="w-5 h-5 text-white animate-pulse" />
          </div>

          <div className="overflow-hidden space-y-0.5">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 text-[#C8C8C8] px-1.5 py-0.2 rounded">
                Resume Audio
              </span>
              <span className="text-xs font-mono text-pink-200">
                at {formatTime(session.currentTime)}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-bold truncate">
              Surah {session.englishName} ({session.surahName})
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              onResume(session);
              setDismissed(true);
            }}
            className="px-3.5 py-2 bg-gradient-to-r from-white to-[#C8C8C8] hover:from-white hover:to-white text-[#6B1B7E] rounded-xl text-xs font-black transition flex items-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-[#6B1B7E]" />
            <span>Resume</span>
          </button>

          <button
            onClick={() => {
              clearAudioSession();
              setDismissed(true);
            }}
            className="p-1.5 text-purple-200 hover:text-white hover:bg-white/10 rounded-lg transition cursor-pointer"
            title="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </aside>
  );
};
