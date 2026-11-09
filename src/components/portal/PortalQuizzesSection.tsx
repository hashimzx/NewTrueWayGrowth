import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  RotateCcw, 
  ArrowRight, 
  Download, 
  Sparkles, 
  ShieldCheck, 
  BookOpen, 
  ExternalLink 
} from 'lucide-react';
import { LEVEL_QUIZZES, LevelQuiz, QuizQuestion } from '../../data/islamicQuizzesData';
import { recordQuizCompletion, getStudentLearningProfile, StudentCertificate } from '../../utils/studentLearningStorage';

interface PortalQuizzesSectionProps {
  studentId: string;
  studentName: string;
  onCertificateEarned?: () => void;
}

export const PortalQuizzesSection: React.FC<PortalQuizzesSectionProps> = ({
  studentId,
  studentName,
  onCertificateEarned
}) => {
  const profile = getStudentLearningProfile(studentId, studentName);

  const [selectedLevel, setSelectedLevel] = useState<1 | 2 | 3 | 4>(profile.currentLevel || 1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [earnedCertificate, setEarnedCertificate] = useState<StudentCertificate | null>(null);

  const currentQuiz = LEVEL_QUIZZES.find(q => q.level === selectedLevel) || LEVEL_QUIZZES[0];
  const currentQuestion = currentQuiz.questions[currentQuestionIndex];

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    currentQuiz.questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });

    setQuizScore(score);
    setIsSubmitted(true);

    const { passed, certificate } = recordQuizCompletion(
      studentId,
      studentName,
      selectedLevel,
      score,
      currentQuiz.questions.length,
      currentQuiz.certificateTitle
    );

    if (certificate) {
      setEarnedCertificate(certificate);
      if (onCertificateEarned) onCertificateEarned();
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentQuestionIndex(0);
    setQuizScore(0);
    setEarnedCertificate(null);
  };

  const printOrDownloadCertificate = (cert: StudentCertificate) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>True Way Quran Certificate - ${cert.studentName}</title>
        <style>
          body { font-family: 'Georgia', serif; margin: 0; padding: 40px; background: #faf5ff; display: flex; justify-content: center; align-items: center; min-height: 90vh; }
          .cert { background: white; border: 12px double #6E1373; padding: 50px; width: 850px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.15); border-radius: 8px; }
          .header { font-size: 32px; font-weight: bold; color: #6E1373; text-transform: uppercase; letter-spacing: 2px; }
          .sub { font-size: 14px; color: #851C82; margin-top: 5px; font-style: italic; }
          .arabic { font-size: 32px; color: #6E1373; margin: 20px 0; font-family: 'Traditional Arabic', serif; }
          .certifies { font-size: 16px; color: #4b5563; margin-top: 25px; }
          .name { font-size: 36px; font-weight: bold; color: #111827; border-bottom: 2px solid #e5e7eb; display: inline-block; padding: 5px 40px; margin: 15px 0; }
          .course { font-size: 20px; font-weight: bold; color: #6E1373; margin: 15px 0; }
          .details { font-size: 14px; color: #6b7280; line-height: 1.6; max-width: 600px; margin: 0 auto; }
          .footer { display: flex; justify-content: space-between; margin-top: 50px; border-top: 1px solid #e5e7eb; padding-top: 20px; font-size: 13px; color: #4b5563; }
          .code { font-family: monospace; font-size: 12px; color: #9ca3af; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="cert">
          <div class="header">True Way Quran Academy</div>
          <div class="sub">Online International Quran & Islamic Education</div>
          <div class="arabic">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
          <div class="certifies">This is to officially certify that</div>
          <div class="name">${cert.studentName}</div>
          <div class="certifies">has successfully demonstrated mastery and graduated from</div>
          <div class="course">${cert.levelTitle}</div>
          <div class="details">
            Having successfully cleared rigorous assessments with an outstanding score of <strong>${cert.scorePercentage}%</strong> under the academic curriculum of True Way Quran Academy.
          </div>
          <div class="footer">
            <div>
              <strong>Date of Issue:</strong> ${cert.issueDate}
            </div>
            <div>
              <strong>Academic Director:</strong> Qari Muhammad Bilal Al-Azhari
            </div>
          </div>
          <div class="code">Verified Credential Code: ${cert.certificateCode} · www.truewayquran.com</div>
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  const percentage = Math.round((quizScore / currentQuiz.questions.length) * 100);
  const passed = percentage >= currentQuiz.passingScore;

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#6E1373] via-[#851C82] to-[#561F79] text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-purple-200">
            <Award className="w-3.5 h-3.5 text-amber-300" />
            <span>Interactive Assessment & Official Certification</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Islamic Knowledge Quizzes & Certificates
          </h2>
          <p className="text-xs sm:text-sm text-purple-100 max-w-2xl">
            Complete structured level assessments to test your knowledge of Qaida, Wudu, Namaz, Kalimas, Quran meanings, and Hadith. Score 70% or higher to earn an official True Way Quran Certificate!
          </p>
        </div>
      </div>

      {/* Level Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {LEVEL_QUIZZES.map((lq) => {
          const isPassed = !!profile.quizResults[lq.level]?.passed;
          return (
            <button
              key={lq.level}
              onClick={() => {
                setSelectedLevel(lq.level);
                handleResetQuiz();
              }}
              className={`p-4 rounded-3xl border text-left transition cursor-pointer flex flex-col justify-between space-y-2 ${
                selectedLevel === lq.level
                  ? 'bg-purple-50/70 border-[#6E1373] ring-2 ring-purple-200 shadow-sm'
                  : 'bg-white hover:bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center ${
                  selectedLevel === lq.level ? 'bg-[#6E1373] text-white' : 'bg-slate-100 text-slate-700'
                }`}>
                  {lq.level}
                </span>
                {isPassed && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Certified</span>
                  </span>
                )}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                  {lq.levelName}
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                  {lq.title}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Quiz Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        
        {/* Quiz Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-bold text-[#851C82] uppercase tracking-wider block">
              {currentQuiz.levelName} · Assessment
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
              {currentQuiz.title}
            </h3>
            <p className="text-xs text-slate-500">{currentQuiz.description}</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
              Passing Mark: {currentQuiz.passingScore}%
            </span>
            {isSubmitted && (
              <button
                onClick={handleResetQuiz}
                className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retry Quiz</span>
              </button>
            )}
          </div>
        </div>

        {/* Not Submitted View: Questions Flow */}
        {!isSubmitted ? (
          <div className="space-y-6">
            
            {/* Question Progress Tracker */}
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}</span>
              <span>Answered: {Object.keys(selectedAnswers).length} / {currentQuiz.questions.length}</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#6E1373] transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100}%` }}
              />
            </div>

            {/* Current Question */}
            <div className="bg-purple-50/40 rounded-3xl p-5 sm:p-6 border border-purple-100 space-y-4">
              <h4 className="text-base sm:text-lg font-bold text-slate-900">
                {currentQuestion.question}
              </h4>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = selectedAnswers[currentQuestion.id] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(currentQuestion.id, idx)}
                      className={`w-full p-3.5 rounded-2xl text-left text-xs sm:text-sm font-medium border transition cursor-pointer flex items-center gap-3 ${
                        isSelected
                          ? 'bg-[#6E1373] border-[#6E1373] text-white shadow-xs font-semibold'
                          : 'bg-white hover:bg-purple-50/70 border-slate-200 text-slate-800'
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-white text-[#6E1373]' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stepper Navigation */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                ← Previous
              </button>

              {currentQuestionIndex < currentQuiz.questions.length - 1 ? (
                <button
                  onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                  className="px-5 py-2 rounded-xl bg-[#6E1373] hover:bg-[#561F79] text-xs font-bold text-white transition cursor-pointer flex items-center gap-1.5"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(selectedAnswers).length < currentQuiz.questions.length}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-xs sm:text-sm font-bold text-white shadow-xs transition cursor-pointer flex items-center gap-1.5"
                >
                  <Award className="w-4 h-4" />
                  <span>Submit Quiz & Get Score</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Submitted Results & Certificate View */
          <div className="space-y-6">
            
            {/* Score Banner */}
            <div className={`rounded-3xl p-6 sm:p-8 text-center space-y-3 border ${
              passed
                ? 'bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-50 border-emerald-200'
                : 'bg-red-50/70 border-red-200'
            }`}>
              <div className="w-14 h-14 rounded-full mx-auto flex items-center justify-center text-2xl font-bold bg-white shadow-xs">
                {passed ? '🏆' : '📚'}
              </div>

              <h4 className="text-xl sm:text-2xl font-black text-slate-900">
                {passed ? 'Masha\'Allah! You Passed the Assessment!' : 'Good Effort! Keep Practicing & Try Again.'}
              </h4>

              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                {passed 
                  ? `Congratulations ${studentName}! You answered ${quizScore} out of ${currentQuiz.questions.length} questions correctly (${percentage}%). You have earned the ${currentQuiz.certificateTitle}!`
                  : `You scored ${quizScore} out of ${currentQuiz.questions.length} (${percentage}%). The passing requirement is ${currentQuiz.passingScore}%. Review the answer explanations below and retake the quiz.`}
              </p>

              {/* Certificate Download / Print Box */}
              {passed && (earnedCertificate || profile.certificates.find(c => c.level === selectedLevel)) && (
                <div className="pt-3">
                  <button
                    onClick={() => {
                      const cert = earnedCertificate || profile.certificates.find(c => c.level === selectedLevel);
                      if (cert) printOrDownloadCertificate(cert);
                    }}
                    className="px-6 py-3 bg-[#6E1373] hover:bg-[#561F79] text-white font-bold text-xs sm:text-sm rounded-2xl shadow-sm transition inline-flex items-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Official Academy Certificate</span>
                  </button>
                </div>
              )}
            </div>

            {/* Answer Explanations Review */}
            <div className="space-y-4 pt-2">
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                Question Review & Detailed Explanations
              </h4>

              {currentQuiz.questions.map((q, idx) => {
                const userChoice = selectedAnswers[q.id];
                const isCorrect = userChoice === q.correctIndex;

                return (
                  <div 
                    key={q.id}
                    className={`rounded-2xl p-4 sm:p-5 border space-y-2 ${
                      isCorrect ? 'bg-emerald-50/50 border-emerald-200' : 'bg-red-50/50 border-red-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h5 className="font-bold text-slate-900 text-xs sm:text-sm">
                        {idx + 1}. {q.question}
                      </h5>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                        isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700">
                      <strong>Your Answer:</strong> {q.options[userChoice] || 'No answer selected'}
                    </p>

                    {!isCorrect && (
                      <p className="text-xs text-emerald-800 font-semibold">
                        <strong>Correct Answer:</strong> {q.options[q.correctIndex]}
                      </p>
                    )}

                    <div className="bg-white/80 rounded-xl p-2.5 border border-slate-200 text-xs text-slate-600">
                      <strong>Explanation:</strong> {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
