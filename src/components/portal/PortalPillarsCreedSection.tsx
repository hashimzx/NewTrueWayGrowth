import React, { useState } from 'react';
import { 
  Shield, 
  Sparkles, 
  Calculator, 
  BookOpen, 
  CheckCircle2, 
  HelpCircle, 
  Award,
  ChevronRight,
  Info
} from 'lucide-react';
import { FIVE_PILLARS_DATA, SIX_ARTICLES_OF_FAITH, IslamicPillar, ArticleOfFaith } from '../../data/islamicPillarsAndCreedData';

interface PortalPillarsCreedSectionProps {
  initialMode?: 'pillars' | 'articles';
}

export const PortalPillarsCreedSection: React.FC<PortalPillarsCreedSectionProps> = ({
  initialMode = 'pillars'
}) => {
  const [activeMode, setActiveMode] = useState<'pillars' | 'articles'>(initialMode);
  const [selectedPillarId, setSelectedPillarId] = useState<number>(1);
  const [selectedArticleId, setSelectedArticleId] = useState<number>(1);

  // Interactive Zakat Calculator state
  const [cashSavings, setCashSavings] = useState<string>('5000');
  const [goldValue, setGoldValue] = useState<string>('0');
  const [silverValue, setSilverValue] = useState<string>('0');
  const [businessStock, setBusinessStock] = useState<string>('0');
  const [shortTermDebts, setShortTermDebts] = useState<string>('0');

  // Creed Quiz States
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showQuizResults, setShowQuizResults] = useState<Record<number, boolean>>({});

  const activePillar = FIVE_PILLARS_DATA.find(p => p.id === selectedPillarId) || FIVE_PILLARS_DATA[0];
  const activeArticle = SIX_ARTICLES_OF_FAITH.find(a => a.id === selectedArticleId) || SIX_ARTICLES_OF_FAITH[0];

  // Zakat Math: Nisab threshold approx $4,500 USD / £3,600 GBP (Silver nisab approx $450 USD)
  const netWealth = Math.max(
    0,
    (parseFloat(cashSavings) || 0) +
    (parseFloat(goldValue) || 0) +
    (parseFloat(silverValue) || 0) +
    (parseFloat(businessStock) || 0) -
    (parseFloat(shortTermDebts) || 0)
  );
  const zakatDue = netWealth * 0.025;

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#6E1373] via-[#851C82] to-[#561F79] text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-purple-200">
              <Shield className="w-3.5 h-3.5 text-amber-300" />
              <span>Foundations of Islam (Arkan-e-Islam & Arkan-e-Iman)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Pillars of Islam & Articles of Faith
            </h2>
            <p className="text-xs sm:text-sm text-purple-100 max-w-2xl">
              Study the 5 essential Pillars of Action and the 6 foundational Articles of Creed with authentic Quranic references, explanations, rules, and an interactive Zakat calculator.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1.5 bg-black/20 p-1.5 rounded-2xl border border-white/10 shrink-0">
            <button
              onClick={() => setActiveMode('pillars')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                activeMode === 'pillars'
                  ? 'bg-white text-[#6E1373] shadow-xs'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              5 Pillars of Islam
            </button>
            <button
              onClick={() => setActiveMode('articles')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                activeMode === 'articles'
                  ? 'bg-white text-[#6E1373] shadow-xs'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              6 Articles of Faith
            </button>
          </div>
        </div>
      </div>

      {/* MODE 1: FIVE PILLARS OF ISLAM */}
      {activeMode === 'pillars' && (
        <div className="space-y-6">
          
          {/* Pillar Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {FIVE_PILLARS_DATA.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPillarId(p.id)}
                className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold shrink-0 transition cursor-pointer flex items-center gap-2 ${
                  selectedPillarId === p.id
                    ? 'bg-[#6E1373] text-white shadow-sm'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <span className="w-6 h-6 rounded-full bg-black/10 text-[11px] flex items-center justify-center">
                  {p.id}
                </span>
                <span>{p.name.split('(')[0].trim()}</span>
              </button>
            ))}
          </div>

          {/* Active Pillar Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#851C82] uppercase tracking-wider">
                  Pillar #{activePillar.id} of Arkan-e-Islam
                </span>
                <span className="text-xl font-arabic font-bold text-[#6E1373]">
                  {activePillar.arabicName}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                {activePillar.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {activePillar.translation}
              </p>
            </div>

            {/* Importance Summary */}
            <div className="bg-purple-50/50 rounded-2xl p-4 sm:p-5 border border-purple-100 space-y-2">
              <span className="text-xs font-bold text-[#6E1373] block">Theological Importance:</span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {activePillar.importance}
              </p>
            </div>

            {/* Rules & Benefits Two Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Rules & Method */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                  Rules, Conditions & Method
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {activePillar.rulesAndMethod.map((rule, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#851C82] shrink-0 mt-0.5" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Spiritual Benefits */}
              <div className="bg-emerald-50/50 rounded-2xl p-5 border border-emerald-100 space-y-3">
                <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider block">
                  Spiritual & Worldly Benefits
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {activePillar.benefits.map((ben, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{ben}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quranic Verses Card */}
            {activePillar.quranicVerses.map((verse, vIdx) => (
              <div key={vIdx} className="bg-purple-50/70 rounded-2xl p-5 border border-purple-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#6E1373]">
                    Quranic Evidence ({verse.reference})
                  </span>
                </div>
                <p dir="rtl" className="text-xl font-arabic font-bold text-slate-950 text-right leading-loose">
                  {verse.arabic}
                </p>
                <p className="text-xs text-purple-900 italic">
                  {verse.transliteration}
                </p>
                <p className="text-xs sm:text-sm text-slate-800 font-medium">
                  <strong>Translation:</strong> {verse.english}
                </p>
                <p className="text-xs text-slate-600 bg-white/70 p-2.5 rounded-xl border border-purple-100">
                  <strong>Explanation:</strong> {verse.explanation}
                </p>
              </div>
            ))}

            {/* Special Interactive Feature for Pillar 3: Zakat Calculator */}
            {activePillar.id === 3 && (
              <div className="bg-gradient-to-br from-amber-50 to-orange-50/60 rounded-3xl p-6 border border-amber-200 space-y-4">
                <div className="flex items-center gap-2 font-bold text-amber-950 text-base sm:text-lg">
                  <Calculator className="w-5 h-5 text-amber-600" />
                  <span>Interactive 2.5% Zakat Calculator</span>
                </div>
                <p className="text-xs text-slate-600">
                  Enter your net assets held above Nisab for one lunar year to calculate your obligatory Zakat.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">Cash & Savings</label>
                    <input
                      type="number"
                      value={cashSavings}
                      onChange={(e) => setCashSavings(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">Gold & Jewelry Value</label>
                    <input
                      type="number"
                      value={goldValue}
                      onChange={(e) => setGoldValue(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">Business Inventory / Stock</label>
                    <input
                      type="number"
                      value={businessStock}
                      onChange={(e) => setBusinessStock(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">Silver Value</label>
                    <input
                      type="number"
                      value={silverValue}
                      onChange={(e) => setSilverValue(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">Immediate Debts (Deductible)</label>
                    <input
                      type="number"
                      value={shortTermDebts}
                      onChange={(e) => setShortTermDebts(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div className="bg-white rounded-2xl p-3 border border-amber-300 flex flex-col justify-center text-center">
                    <span className="text-[11px] text-slate-500 font-bold uppercase">Obligatory 2.5% Zakat Due</span>
                    <span className="text-xl sm:text-2xl font-black text-[#6E1373]">
                      ${zakatDue.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODE 2: SIX ARTICLES OF FAITH (IMAN) */}
      {activeMode === 'articles' && (
        <div className="space-y-6">
          
          {/* Article Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {SIX_ARTICLES_OF_FAITH.map((a) => (
              <button
                key={a.id}
                onClick={() => setSelectedArticleId(a.id)}
                className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold shrink-0 transition cursor-pointer flex items-center gap-2 ${
                  selectedArticleId === a.id
                    ? 'bg-[#6E1373] text-white shadow-sm'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <span className="w-6 h-6 rounded-full bg-black/10 text-[11px] flex items-center justify-center">
                  {a.id}
                </span>
                <span>{a.name.split('(')[0].trim()}</span>
              </button>
            ))}
          </div>

          {/* Active Article Detail Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#851C82] uppercase tracking-wider">
                  Article #{activeArticle.id} of Arkan-e-Iman
                </span>
                <span className="text-xl font-arabic font-bold text-[#6E1373]">
                  {activeArticle.arabicName}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                {activeArticle.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
                {activeArticle.summary}
              </p>
            </div>

            {/* Explanation */}
            <div className="bg-purple-50/50 rounded-2xl p-5 border border-purple-100 space-y-2">
              <span className="text-xs font-bold text-[#6E1373] block">Detailed Theological Explanation:</span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {activeArticle.detailedExplanation}
              </p>
            </div>

            {/* Key Beliefs Checklist */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                Essential Points of Belief (Aqeedah):
              </span>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {activeArticle.keyBeliefs.map((kb, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#851C82] shrink-0 mt-0.5" />
                    <span>{kb}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quranic Reference */}
            <div className="bg-purple-50/70 rounded-2xl p-5 border border-purple-200 space-y-2">
              <span className="text-xs font-bold text-[#6E1373]">
                Quranic Foundation ({activeArticle.quranicReference.reference})
              </span>
              <p dir="rtl" className="text-xl font-arabic font-bold text-slate-950 text-right leading-loose">
                {activeArticle.quranicReference.verseArabic}
              </p>
              <p className="text-xs sm:text-sm text-slate-800 font-medium pt-1">
                {activeArticle.quranicReference.verseEnglish}
              </p>
            </div>

            {/* Interactive Mini-Quiz */}
            <div className="bg-amber-50/70 rounded-2xl p-5 border border-amber-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>Knowledge Check: {activeArticle.name.split('(')[0]}</span>
                </span>
                {showQuizResults[activeArticle.id] && (
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    quizAnswers[activeArticle.id] === activeArticle.quizQuestion.correctIndex
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {quizAnswers[activeArticle.id] === activeArticle.quizQuestion.correctIndex ? '✓ Correct!' : '✗ Review Answer'}
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm font-semibold text-slate-900">
                {activeArticle.quizQuestion.question}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {activeArticle.quizQuestion.options.map((opt, oIdx) => {
                  const isSelected = quizAnswers[activeArticle.id] === oIdx;
                  const isSubmitted = showQuizResults[activeArticle.id];
                  const isCorrect = oIdx === activeArticle.quizQuestion.correctIndex;

                  return (
                    <button
                      key={oIdx}
                      onClick={() => {
                        setQuizAnswers(prev => ({ ...prev, [activeArticle.id]: oIdx }));
                        setShowQuizResults(prev => ({ ...prev, [activeArticle.id]: true }));
                      }}
                      className={`p-3 rounded-xl text-left text-xs font-medium border transition cursor-pointer ${
                        isSubmitted
                          ? isCorrect
                            ? 'bg-emerald-100 border-emerald-400 text-emerald-950'
                            : isSelected
                            ? 'bg-red-100 border-red-300 text-red-900'
                            : 'bg-white border-slate-200 opacity-60'
                          : isSelected
                          ? 'bg-purple-100 border-[#6E1373] text-[#6E1373]'
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {showQuizResults[activeArticle.id] && (
                <p className="text-xs text-slate-700 bg-white/70 p-2.5 rounded-xl border border-amber-200 mt-2">
                  <strong>Explanation:</strong> {activeArticle.quizQuestion.explanation}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
