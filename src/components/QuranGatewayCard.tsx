import React from 'react';
import { BookOpen, Mic, Volume2, Sparkles, ArrowRight, CheckCircle2, Award, Headphones } from 'lucide-react';

interface QuranGatewayCardProps {
  onOpenQuran: () => void;
  onOpenQaida: () => void;
}

export const QuranGatewayCard: React.FC<QuranGatewayCardProps> = ({ onOpenQuran, onOpenQaida }) => {
  return (
    <section className="py-16 bg-gradient-to-b from-purple-50/40 via-white to-[#faf8ff] border-b border-purple-100 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-[#2e0854] via-[#3b0764] to-[#4a044e] rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden border border-purple-700/50">
          
          {/* Subtle Islamic Motif Background Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold text-pink-300">
                <BookOpen className="w-4 h-4 text-pink-400" />
                <span>Dedicated Holy Quran Section · 114 Surahs</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Read, Listen & Verify Your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-200 to-amber-300">
                  Holy Quran Recitation
                </span>
              </h2>

              <p className="text-purple-200 text-sm sm:text-base leading-relaxed max-w-xl">
                Access our full Quran player in a dedicated view with studio-grade audio by Sheikh Mishary Rashid Alafasy, English translations, and real-time AI pronunciation feedback for each Ayah.
              </p>

              {/* Feature Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2.5 text-xs text-purple-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>All 114 Surahs with Arabic & English</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-purple-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Crystal-Clear Audio Recitation</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-purple-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Speech-to-Text Tajweed Verifier</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-purple-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Bookmark Surahs & Track History</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <button
                  onClick={onOpenQuran}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 active:scale-[0.99] text-white font-black text-sm rounded-xl transition shadow-xl shadow-pink-500/30 flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <Headphones className="w-4 h-4" />
                  <span>Open Full Quran Reader</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </button>

                <button
                  onClick={onOpenQaida}
                  className="w-full sm:w-auto px-6 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Mic className="w-4 h-4 text-pink-300" />
                  <span>Interactive Qaida Lessons</span>
                </button>
              </div>
            </div>

            {/* Right Card: Interactive Preview Widget */}
            <div className="lg:col-span-5">
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-6 shadow-xl space-y-5 text-left">
                <div className="flex items-center justify-between border-b border-white/15 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-400/30 flex items-center justify-center text-pink-300 font-black text-sm">
                      01
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Surah Al-Fatihah</h4>
                      <p className="text-[11px] text-purple-200">The Opening · 7 Verses · Makki</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold px-2.5 py-1 rounded-full">
                    Audio Available
                  </span>
                </div>

                {/* Arabic Calligraphy Sample */}
                <div className="p-4 bg-black/30 rounded-xl border border-white/10 text-right space-y-2">
                  <p className="font-quran text-2xl text-amber-200 leading-loose" dir="rtl">
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                  </p>
                  <p className="text-[11px] text-purple-200 text-left italic">
                    &quot;In the name of Allah, the Entirely Merciful, the Especially Merciful.&quot;
                  </p>
                </div>

                {/* Features Highlights inside preview */}
                <div className="flex items-center justify-between text-xs text-purple-200 pt-1">
                  <div className="flex items-center gap-1.5">
                    <Volume2 className="w-4 h-4 text-pink-400" />
                    <span>Mishary Alafasy Reciter</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-pink-300">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Voice Verifier</span>
                  </div>
                </div>

                <button
                  onClick={onOpenQuran}
                  className="w-full py-3 bg-white text-purple-950 hover:bg-purple-50 font-black text-xs rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Launch Quran Player & Verifier</span>
                  <ArrowRight className="w-3.5 h-3.5 text-purple-700" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
