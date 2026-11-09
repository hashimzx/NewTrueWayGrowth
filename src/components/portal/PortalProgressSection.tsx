import React, { useState } from 'react';
import { 
  Award, 
  Bookmark, 
  BookmarkCheck, 
  CheckCircle2, 
  Trash2, 
  BookOpen, 
  Download, 
  ArrowRight,
  Sparkles,
  Layers
} from 'lucide-react';
import { 
  getStudentLearningProfile, 
  toggleStudentBookmark, 
  toggleTopicCompletion,
  StudentBookmarkItem,
  StudentCertificate
} from '../../utils/studentLearningStorage';

interface PortalProgressSectionProps {
  studentId: string;
  studentName: string;
  onNavigateToTab?: (tab: string) => void;
  onRefresh?: () => void;
}

export const PortalProgressSection: React.FC<PortalProgressSectionProps> = ({
  studentId,
  studentName,
  onNavigateToTab,
  onRefresh
}) => {
  const profile = getStudentLearningProfile(studentId, studentName);
  const [activeSubTab, setActiveSubTab] = useState<'levels' | 'bookmarks' | 'certificates'>('levels');

  const handleRemoveBookmark = (bm: StudentBookmarkItem) => {
    toggleStudentBookmark(studentId, studentName, {
      type: bm.type,
      title: bm.title,
      arabicText: bm.arabicText,
      englishTranslation: bm.englishTranslation,
      reference: bm.reference,
      surahNumber: bm.surahNumber,
      ayahNumber: bm.ayahNumber
    });
    if (onRefresh) onRefresh();
  };

  const handleToggleTopic = (topicId: string) => {
    toggleTopicCompletion(studentId, studentName, topicId);
    if (onRefresh) onRefresh();
  };

  // 4 Learning Levels Curriculum Definition
  const LEARNING_LEVELS = [
    {
      level: 1,
      title: 'Level 1 – Beginner Foundation',
      subtitle: 'Arabic letters, Madani Qaida, Basic Duas, Six Kalimas, and Wudu',
      topics: [
        { id: 'topic-qaida-alphabet', title: '29 Arabic Letters & Makharij Articulation', tab: 'dashboard' },
        { id: 'topic-wudu-steps', title: 'Complete Step-by-Step Wudu & Purification', tab: 'namaz' },
        { id: 'topic-kalimas-all', title: 'Memorize the Six Kalimas of Islam', tab: 'kalimas' },
        { id: 'topic-basic-duas', title: 'Daily Sleeping, Waking, and Eating Duas', tab: 'duas' }
      ]
    },
    {
      level: 2,
      title: 'Level 2 – Basic Islamic Education',
      subtitle: 'Complete Namaz, Five Pillars, Six Articles of Faith, and Daily Sunnahs',
      topics: [
        { id: 'topic-namaz-procedure', title: 'Five Daily Prayers Postures & Recitations', tab: 'namaz' },
        { id: 'topic-namaz-rakats', title: 'Rakats Breakdown (Fard, Sunnah, Nafl, Witr)', tab: 'namaz' },
        { id: 'topic-five-pillars', title: 'Five Pillars of Islam (Shahadah to Hajj)', tab: 'pillars' },
        { id: 'topic-six-articles', title: 'Six Articles of Faith (Iman in Allah to Qadr)', tab: 'articles' }
      ]
    },
    {
      level: 3,
      title: 'Level 3 – Quran Understanding',
      subtitle: 'Complete Quran with English Translation, Word Meanings, and Tafsir',
      topics: [
        { id: 'topic-surah-fatihah', title: 'Surah Al-Fatihah In-Depth Translation & Tafsir', tab: 'quran' },
        { id: 'topic-juz-amma', title: 'Short Surahs of Juz 30 (Al-Ikhlas to An-Nas)', tab: 'quran' },
        { id: 'topic-word-by-word', title: 'Quranic Arabic Word-by-Word Vocabulary', tab: 'quran' },
        { id: 'topic-surah-backgrounds', title: 'Historical Context (Asbab al-Nuzul) of Key Surahs', tab: 'quran' }
      ]
    },
    {
      level: 4,
      title: 'Level 4 – Advanced Islamic Learning',
      subtitle: 'Hadith Sciences, Seerah, Hajj, Zakat, and Advanced Islamic Ethics',
      topics: [
        { id: 'topic-nawawi-hadith', title: 'Forty Hadith of Imam Nawawi Selections', tab: 'hadith' },
        { id: 'topic-prophets-seerah', title: 'Prophetic Biographies & Seerah of Muhammad ﷺ', tab: 'prophets' },
        { id: 'topic-zakat-hajj', title: 'Zakat Calculation & Interactive Hajj Rites', tab: 'pillars' },
        { id: 'topic-islamic-manners', title: 'Islamic Manners for Youth & Character Building', tab: 'manners' }
      ]
    }
  ];

  // Calculate overall stats
  const totalTopics = LEARNING_LEVELS.reduce((acc, lvl) => acc + lvl.topics.length, 0);
  const completedTopicsCount = profile.completedTopicIds.length;
  const overallPercentage = Math.round((completedTopicsCount / totalTopics) * 100);

  const printCertificate = (cert: StudentCertificate) => {
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

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#6E1373] via-[#851C82] to-[#561F79] text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-purple-200">
              <Award className="w-3.5 h-3.5 text-amber-300" />
              <span>Personal Academic Progression & Saved Lessons</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              My Learning Progress & Bookmarks
            </h2>
            <p className="text-xs sm:text-sm text-purple-100 max-w-2xl">
              Track your journey across the 4 structured Islamic education levels, manage your saved Ayahs and Duas, view last reading positions, and showcase earned certificates.
            </p>
          </div>

          <div className="bg-white/10 rounded-2xl p-4 border border-white/20 text-center shrink-0">
            <span className="text-[11px] text-purple-200 uppercase font-bold block">Overall Curriculum</span>
            <div className="text-2xl font-black text-white">{overallPercentage}%</div>
            <span className="text-[10px] text-purple-300">{completedTopicsCount} of {totalTopics} lessons done</span>
          </div>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {[
          { id: 'levels', label: '1. Four Learning Levels Roadmap', count: `${completedTopicsCount}/${totalTopics}` },
          { id: 'bookmarks', label: '2. Saved Bookmarks', count: profile.bookmarks.length },
          { id: 'certificates', label: '3. Official Certificates', count: profile.certificates.length }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as typeof activeSubTab)}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold shrink-0 transition cursor-pointer flex items-center gap-2 ${
              activeSubTab === tab.id
                ? 'bg-[#6E1373] text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            <span>{tab.label}</span>
            <span className="px-2 py-0.5 rounded-full bg-black/10 text-[11px]">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* TAB 1: 4 LEARNING LEVELS ROADMAP */}
      {activeSubTab === 'levels' && (
        <div className="space-y-6">
          <div className="space-y-5">
            {LEARNING_LEVELS.map(lvl => {
              const levelCompleted = lvl.topics.filter(t => profile.completedTopicIds.includes(t.id)).length;
              const lvlPercentage = Math.round((levelCompleted / lvl.topics.length) * 100);
              const isCertified = !!profile.certificates.find(c => c.level === lvl.level);

              return (
                <div key={lvl.level} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-purple-100 text-[#6E1373] text-xs font-bold flex items-center justify-center">
                          {lvl.level}
                        </span>
                        <h3 className="text-lg font-bold text-slate-900">{lvl.title}</h3>
                        {isCertified && (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                            ✓ Level Certified
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{lvl.subtitle}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-[#6E1373]">{lvlPercentage}% Completed</span>
                      <div className="w-28 h-2 bg-slate-100 rounded-full mt-1 overflow-hidden">
                        <div className="h-full bg-[#6E1373] transition-all" style={{ width: `${lvlPercentage}%` }} />
                      </div>
                    </div>
                  </div>

                  {/* Topic Checkboxes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {lvl.topics.map(topic => {
                      const isChecked = profile.completedTopicIds.includes(topic.id);
                      return (
                        <div
                          key={topic.id}
                          className={`p-3.5 rounded-2xl border transition flex items-center justify-between gap-3 ${
                            isChecked
                              ? 'bg-purple-50/50 border-purple-200 text-slate-900'
                              : 'bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium flex-1">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleToggleTopic(topic.id)}
                              className="w-4 h-4 rounded text-[#6E1373] focus:ring-[#6E1373]"
                            />
                            <span>{topic.title}</span>
                          </label>

                          {onNavigateToTab && (
                            <button
                              onClick={() => onNavigateToTab(topic.tab)}
                              className="text-[11px] font-bold text-[#6E1373] hover:underline flex items-center gap-1 cursor-pointer shrink-0"
                            >
                              <span>Study</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: SAVED BOOKMARKS */}
      {activeSubTab === 'bookmarks' && (
        <div className="space-y-6">
          {profile.bookmarks.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
              <Bookmark className="w-10 h-10 text-slate-300 mx-auto" />
              <h4 className="font-bold text-slate-800 text-base">No Saved Bookmarks Yet</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                While studying Quran Ayahs, Duas, Kalimas, or Hadith, click the bookmark icon to save your favorite verses here for instant revision.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.bookmarks.map(bm => (
                <div key={bm.id} className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-[#6E1373] uppercase">
                        {bm.type.replace('_', ' ')}
                      </span>
                      <button
                        onClick={() => handleRemoveBookmark(bm)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                        title="Remove bookmark"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm">{bm.title}</h4>

                    <p dir="rtl" className="text-lg font-arabic font-bold text-purple-950 text-right leading-loose">
                      {bm.arabicText}
                    </p>

                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {bm.englishTranslation}
                    </p>
                  </div>

                  <div className="text-[11px] text-slate-400 border-t border-slate-100 pt-2 flex items-center justify-between">
                    <span>{bm.reference}</span>
                    <span>Saved: {new Date(bm.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: OFFICIAL CERTIFICATES */}
      {activeSubTab === 'certificates' && (
        <div className="space-y-6">
          {profile.certificates.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
              <Award className="w-10 h-10 text-slate-300 mx-auto" />
              <h4 className="font-bold text-slate-800 text-base">No Certificates Earned Yet</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Head over to the Quizzes & Tests section, pass the level exam with 70% or higher, and your official certificate will appear right here!
              </p>
              {onNavigateToTab && (
                <button
                  onClick={() => onNavigateToTab('quizzes')}
                  className="px-4 py-2 bg-[#6E1373] text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Award className="w-4 h-4" />
                  <span>Take Islamic Quiz Now</span>
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {profile.certificates.map(cert => (
                <div key={cert.id} className="bg-gradient-to-br from-purple-50 via-white to-pink-50 rounded-3xl border-2 border-purple-200 p-6 shadow-xs flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="w-8 h-8 rounded-full bg-[#6E1373] text-white text-xs font-bold flex items-center justify-center">
                        L{cert.level}
                      </span>
                      <span className="text-xs font-mono text-purple-800 font-bold">
                        {cert.certificateCode}
                      </span>
                    </div>

                    <h4 className="text-lg font-black text-slate-900">{cert.levelTitle}</h4>
                    <p className="text-xs text-slate-600">
                      Awarded to <strong>{cert.studentName}</strong> with an exam score of <strong>{cert.scorePercentage}%</strong>.
                    </p>
                    <p className="text-[11px] text-slate-400">Issued on {cert.issueDate}</p>
                  </div>

                  <button
                    onClick={() => printCertificate(cert)}
                    className="w-full py-2.5 bg-[#6E1373] hover:bg-[#561F79] text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>View & Download Certificate</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
