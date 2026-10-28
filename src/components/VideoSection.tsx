import React, { useState, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Video
} from 'lucide-react';

interface VideoSectionProps {
  onEnroll: () => void;
  onExploreQuran?: () => void;
}

export const VideoSection: React.FC<VideoSectionProps> = ({ onEnroll, onExploreQuran }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
      setHasStarted(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const keyHighlights = [
    'How top Quran teachers earn $1,000–$2,500+ monthly teaching international students',
    'Interactive screen sharing, digital whiteboard, and Tajweed software setup',
    'Mastering UK, US, and Australian student communication standards',
    'Step-by-step guidance on lesson plans for Noorani Qaida, Nazra, and Hifz',
    'Direct feedback and 1-on-1 coaching with Abdul Basit Saleem'
  ];

  return (
    <section id="video-tour" className="py-20 bg-gradient-to-b from-[#faf8ff] via-white to-purple-50/30 relative overflow-hidden border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-100 border border-purple-200 rounded-full text-xs font-black text-purple-900 uppercase tracking-widest">
            <Video className="w-3.5 h-3.5 text-pink-600" />
            <span>ACADEMY VIDEO SHOWCASE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-purple-950 tracking-tight">
            See How We Train <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-800 via-pink-600 to-purple-600">Online Quran Teachers</span> & Students
          </h2>

          <p className="text-slate-600 text-base sm:text-lg">
            Watch the official video from Abdul Basit Saleem detailing the course curriculum, methodology, and student results.
          </p>
        </div>

        {/* Video Player + Highlight Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Video Box */}
          <div className="lg:col-span-8">
            <div className="relative rounded-3xl overflow-hidden bg-slate-950 shadow-2xl border-2 border-purple-300/60 aspect-video group">
              
              {/* Native Video Tag with ustadleads.com/heroin.mp4 */}
              <video
                ref={videoRef}
                src="https://ustadleads.com/heroin.mp4"
                poster="https://ustadleads.com/heroimg.png"
                playsInline
                preload="metadata"
                className="w-full h-full object-cover cursor-pointer"
                onClick={togglePlay}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
              />

              {/* Top Bar Overlay */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
                <div className="bg-purple-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-white text-xs font-bold flex items-center gap-2 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
                  <span>Official Masterclass Preview</span>
                </div>

                <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl text-purple-200 text-xs font-semibold">
                  Abdul Basit Saleem
                </div>
              </div>

              {/* Big Center Play Button (Visible when paused or before start) */}
              {(!isPlaying || !hasStarted) && (
                <div 
                  onClick={togglePlay}
                  className="absolute inset-0 bg-purple-950/40 backdrop-blur-xs flex flex-col items-center justify-center cursor-pointer transition-all z-20"
                >
                  <button
                    aria-label="Play video"
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white flex items-center justify-center shadow-2xl shadow-pink-500/50 hover:scale-110 active:scale-95 transition-all group-hover:ring-8 group-hover:ring-pink-500/30"
                  >
                    <Play className="w-9 h-9 sm:w-11 sm:h-11 translate-x-1 fill-white" />
                  </button>
                  <span className="mt-4 text-white text-sm sm:text-base font-black tracking-wide drop-shadow-md">
                    Click to Watch Academy Overview
                  </span>
                  <span className="text-xs text-purple-200 mt-1">
                    Duration: ~2 Minutes · Audio & Video
                  </span>
                </div>
              )}

              {/* Bottom Control Bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 flex items-center justify-between z-20 opacity-90 group-hover:opacity-100 transition">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="p-2 text-white hover:text-pink-400 bg-white/10 hover:bg-white/20 rounded-lg transition"
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white" />}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-2 text-white hover:text-pink-400 bg-white/10 hover:bg-white/20 rounded-lg transition"
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>

                  <span className="text-xs text-slate-300 font-medium">
                    Training for Online Quran Teachers
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleFullscreen}
                    className="p-2 text-white hover:text-pink-400 bg-white/10 hover:bg-white/20 rounded-lg transition"
                    title="Fullscreen"
                  >
                    <Maximize2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Right Highlights Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xl border border-purple-200/80 space-y-5">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-pink-600 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>What You Learn Inside</span>
                </div>
                <h3 className="text-xl font-black text-purple-950">
                  Comprehensive Academy Roadmap
                </h3>
              </div>

              <div className="space-y-3">
                {keyHighlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-purple-100 space-y-2.5">
                <button
                  onClick={onEnroll}
                  className="w-full py-3.5 px-5 bg-gradient-to-r from-purple-800 via-purple-700 to-pink-600 hover:from-purple-900 hover:to-pink-700 text-white text-xs font-black rounded-xl shadow-lg shadow-pink-500/20 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Enroll in Program (PKR 4,999)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {onExploreQuran && (
                  <button
                    onClick={onExploreQuran}
                    className="w-full py-2.5 px-4 bg-purple-50 hover:bg-purple-100 text-purple-900 text-xs font-bold rounded-xl border border-purple-200 transition text-center cursor-pointer"
                  >
                    Open Interactive Full Quran Reader
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
