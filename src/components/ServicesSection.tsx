import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Check, 
  ArrowRight, 
  Clock, 
  Award, 
  Languages, 
  HeartHandshake, 
  ShieldCheck, 
  ChevronRight,
  BookMarked,
  Layers,
  GraduationCap
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
  onOpenQaida: () => void;
  onBookTrial: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onOpenQaida,
  onBookTrial
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'recitation' | 'memorization' | 'islamic'>('all');

  const services = [
    {
      id: 'noorani-qaida',
      category: 'recitation',
      title: 'Online Noorani & Madani Qaida Course',
      arabicTitle: 'القَاعِدَة النُّورَانِيَّة وَالمَدَنِيَّة',
      tagline: 'The ideal foundation for beginners and kids',
      description: 'Master Arabic alphabet pronunciation from exact vocal points (Makharij). Progress through compound letters, short vowels (Harakat), Tanween, Sukoon, and Tashdeed to read the Quran with ease.',
      features: [
        'Recognizing Arabic letters in individual & joined forms',
        'Correct Makharij articulation points & acoustic clarity',
        'Short vowels, Tanween, Sukoon, and Qalqalah exercises',
        'Interactive voice recognition assessment & drills',
        'Prerequisite for fluent Quran reading'
      ],
      idealFor: 'Kids (ages 4+) and adult beginners',
      duration: '1 to 3 Months',
      badge: 'Most Popular'
    },
    {
      id: 'quran-tajweed',
      category: 'recitation',
      title: 'Quran Reading with Tajweed Rules',
      arabicTitle: 'تِلَاوَةُ القُرْآنِ بِالتَّجْوِيد',
      tagline: 'Flawless recitation compliant with Prophet Muhammad ﷺ tradition',
      description: 'Learn and apply all major Tajweed rules directly while reciting the Holy Quran. Master Noon Sakinah, Meem Sakinah, heavy vs light letters (Tafkheem/Tarqeeq), Madd prolongations, and stopping signs (Waqf).',
      features: [
        'Izhar, Idgham, Iqlab, and Ikhfa mastery',
        'Heavy and light letter discrimination (Musta\'liyah)',
        'Rules of Madd (Natural, Obligatory, Permissible)',
        'Rules of Waqf (Stopping signs & proper resuming)',
        'Color-coded Tajweed Mushaf reading'
      ],
      idealFor: 'Students who completed Qaida and wish to recite fluently',
      duration: '3 to 6 Months',
      badge: 'Recommended'
    },
    {
      id: 'quran-hifz',
      category: 'memorization',
      title: 'Quran Memorisation (Hifz-ul-Quran)',
      arabicTitle: 'تَحْفِيظُ القُرْآنِ الكَرِيم',
      tagline: 'Preserve the words of Allah in your heart',
      description: 'A customized, structured memorization pathway guided by Hafiz tutors. Combines modern spaced repetition revision with the traditional triple-system: Sabaq (new verse), Sabqi (recent revision), and Manzil (overall cycle).',
      features: [
        'Memorization of daily Sabaq with 100% Tajweed accuracy',
        'Daily Sabqi revision of past 5 to 10 pages',
        'Manzil revision cycle to ensure zero retention loss',
        'Memorization of selected Surahs (Yasin, Mulk, Rahman, Waqiah)',
        'Full Hifz or Partial Hifz options'
      ],
      idealFor: 'Dedicated children, teens, and adults',
      duration: '1 to 3 Years (Flexible pace)',
      badge: 'High Honor'
    },
    {
      id: 'translation-tafseer',
      category: 'islamic',
      title: 'Quran Translation & Tafseer Course',
      arabicTitle: 'تَرْجَمَةُ وَتَفْسِيرُ القُرْآن',
      tagline: 'Understand the divine meaning, wisdom & contextual revelation',
      description: 'Move beyond mere recitation to understand what Allah is communicating to you. Study word-by-word meanings, grammatical roots, reasons for revelation (Shan-e-Nuzool), and practical life lessons.',
      features: [
        'Word-by-word translation in English or Urdu',
        'Detailed explanation (Tafseer) of historical context',
        'Understanding Quranic parables, commands, and ethics',
        'Modern real-world application of divine guidance',
        'Taught by qualified Alims and scholars'
      ],
      idealFor: 'Adults and youths seeking spiritual connection',
      duration: '6 to 12 Months'
    },
    {
      id: 'islamic-studies',
      category: 'islamic',
      title: 'Islamic Studies & Character Building',
      arabicTitle: 'الدِّرَاسَاتُ الإِسْلَامِيَّةُ وَالأَخْلَاق',
      tagline: 'Comprehensive deen education for Muslim children and youth',
      description: 'Nurture strong Islamic identity in children growing up in the West. Covers the 6 Kalimas, step-by-step Salah (Namaz), essential daily Masnoon Duas, stories of the Prophets, and Islamic manners (Akhlaq).',
      features: [
        'Correct performance of Wudu and 5 Daily Prayers (Salah)',
        'Memorization of daily life Duas with meanings',
        'Stories of the Prophets and Companions (Seerah)',
        'Halal & Haram guidelines, good manners with parents & peers',
        'Interactive quizzes and engaging workbooks'
      ],
      idealFor: 'Children aged 5 to 16 in UK, USA, Canada & Europe',
      duration: 'Ongoing Weekly'
    },
    {
      id: 'ten-qirat',
      category: 'recitation',
      title: 'Ten Qira\'at & Advanced Tajweed Course',
      arabicTitle: 'القِرَاءَاتُ العَشْر وَالإِجَازَة',
      tagline: 'Authentic prophetic recitation methods with Ijazah Sanad',
      description: 'For advanced reciters wishing to study the canonical Qira\'at (Hafs \'an \'Asim, Warsh \'an Nafi\', Qaloon, Al-Duri, etc.) with unbroken chains of transmission back to the Prophet Muhammad ﷺ.',
      features: [
        'Comprehensive study of Matn Al-Jazariyyah and Shatibiyyah',
        'Comparative study of canonical recitation dialects',
        'Sanad and Ijazah certification pathway for qualified reciters',
        'Direct one-on-one mentorship by Senior Qira\'at Scholars'
      ],
      idealFor: 'Imams, teachers, and advanced Quran students',
      duration: '1 Year Intensive'
    },
    {
      id: 'arabic-language',
      category: 'islamic',
      title: 'Quranic Arabic Language Course',
      arabicTitle: 'لُغَةُ القُرْآنِ الكَرِيم',
      tagline: 'Directly comprehend 80% of Quranic vocabulary',
      description: 'Learn the sacred language of the Quran. Focus on high-frequency Quranic words, basic Nahw (syntax), Sarf (morphology), and sentence structure so you can understand recitation directly during prayer.',
      features: [
        'High-frequency vocabulary occurring 50+ times in the Quran',
        'Basic Arabic grammar made simple and accessible',
        'Translating short Surahs and daily Azkar without translation',
        'Speaking and reading basic Arabic phrases'
      ],
      idealFor: 'Adults and youth wanting to understand Salah and Quran directly',
      duration: '6 Months'
    }
  ];

  const filteredServices = services.filter(s => {
    if (selectedCategory === 'all') return true;
    return s.category === selectedCategory;
  });

  return (
    <section className="py-16 bg-white border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 text-purple-900 rounded-full text-xs font-bold border border-purple-200">
            <GraduationCap className="w-4 h-4 text-purple-600" />
            <span>Accredited Online Quran Academy Services</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-purple-950">
            Our Online Quran Services & Courses
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            True Way Quran offers comprehensive online Islamic education based on UK and international educational standards. Every course includes 1-on-1 personalized attention, flexible scheduling, and certified male & female tutors.
          </p>

          {/* Filter Tabs */}
          <div className="inline-flex p-1 bg-purple-50 rounded-2xl border border-purple-100 mt-4 flex-wrap justify-center gap-1">
            {[
              { id: 'all', label: 'All Services' },
              { id: 'recitation', label: 'Qaida & Tajweed' },
              { id: 'memorization', label: 'Hifz Program' },
              { id: 'islamic', label: 'Islamic Studies & Arabic' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  selectedCategory === tab.id
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-purple-900 hover:bg-purple-100/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map(service => (
            <div
              key={service.id}
              className="bg-white rounded-3xl p-7 border border-purple-100 hover:border-purple-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {service.badge && (
                <div className="absolute top-0 right-0 bg-purple-600 text-white text-[10px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                  {service.badge}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600">
                    {service.duration} · 1-on-1 Live
                  </span>
                  <h3 className="text-xl font-bold text-purple-950 mt-1 group-hover:text-purple-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="font-arabic text-sm text-purple-800 mt-0.5 dir-rtl">
                    {service.arabicTitle}
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {service.description}
                </p>

                {/* Features list */}
                <div className="space-y-2 pt-2 border-t border-purple-100/80">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-[11px] text-purple-900 bg-purple-50/70 p-2.5 rounded-xl border border-purple-100">
                  <strong className="text-purple-950">Ideal For:</strong> {service.idealFor}
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-6 mt-6 border-t border-purple-100 flex items-center justify-between gap-2">
                {service.id === 'noorani-qaida' ? (
                  <button
                    onClick={onOpenQaida}
                    className="text-xs font-bold text-purple-700 hover:text-purple-900 underline"
                  >
                    Open Interactive Qaida
                  </button>
                ) : (
                  <span className="text-xs font-medium text-slate-500">Free 3-Day Trial</span>
                )}

                <button
                  onClick={onBookTrial}
                  className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-bold rounded-xl text-xs transition flex items-center gap-1.5 shadow-sm"
                >
                  <span>Book Free Class</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
