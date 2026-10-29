import React, { useState } from 'react';
import { soundEngine } from '../utils/audioSynth';
import { 
  CheckCircle2, 
  XCircle, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  BookOpen, 
  ArrowRight, 
  Sun, 
  Moon, 
  HeartHandshake, 
  Users, 
  HelpCircle,
  ShieldCheck,
  AlertTriangle,
  Play
} from 'lucide-react';

export type WorshipGuideCategory = 'namaz' | 'eid' | 'janazah' | 'roza';

interface StepItem {
  id: string;
  stepNumber: number;
  title: string;
  subtitle: string;
  arabicText?: string;
  transliteration?: string;
  translation?: string;
  postureDescription: string;
  visualType: 'qiyam' | 'ruku' | 'qaumah' | 'sujood' | 'jalsah' | 'tasleem' | 'eid_takbir' | 'janazah_stand' | 'suhoor' | 'iftar';
  doThis: {
    title: string;
    description: string;
    points: string[];
  };
  avoidThis: {
    title: string;
    description: string;
    points: string[];
  };
}

export const WorshipGuideSection: React.FC<{
  onOpenFullQuran?: () => void;
  onOpenDuas?: () => void;
  onOpenSalahGuide?: () => void;
  onOpenTahajjud?: () => void;
}> = ({ onOpenFullQuran, onOpenDuas, onOpenSalahGuide, onOpenTahajjud }) => {
  const [activeTab, setActiveTab] = useState<WorshipGuideCategory>('namaz');
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  // Play authentic Arabic voice using audio synth
  const handlePlayArabic = (id: string, arabicText: string) => {
    if (playingAudioId === id) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setPlayingAudioId(null);
      return;
    }
    setPlayingAudioId(id);
    soundEngine.speakArabic(arabicText, 0.82).then(() => {
      setPlayingAudioId(null);
    });
  };

  // 1. DAILY NAMAZ (SALAH) STEPS & RIGHT VS WRONG
  const namazSteps: StepItem[] = [
    {
      id: 'step-qiyam',
      stepNumber: 1,
      title: 'Takbir Tahrimah & Qiyam (Standing)',
      subtitle: 'Starting Salah with presence of heart and focus on the place of Sujood',
      arabicText: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ ، وَتَبَارَكَ اسْمُكَ ، وَتَعَالَى جَدُّكَ ، وَلاَ إِلَهَ غَيْرُكَ',
      transliteration: 'Subhaanaka Allaahumma wa bihamdika, wa tabaarakasmuka, wa ta’aala jadduka, wa laa ilaaha ghayruk.',
      translation: 'Glory be to You, O Allah, and all praise. Blessed is Your Name, exalted is Your Majesty, and there is no deity worthy of worship except You.',
      postureDescription: 'Raise hands level with ears (or shoulders for women), fold right hand over left wrist below chest/navel, keeping eyes fixated on the ground at the spot of Sujood.',
      visualType: 'qiyam',
      doThis: {
        title: 'DO THIS (Sunnah Posture)',
        description: 'Stand with calm humility (Khushu). Keep feet spaced comfortably (shoulder-width), toes pointing towards Qibla, eyes strictly at the place of prostration.',
        points: [
          'Clasp right hand firmly over the back of the left wrist/forearm.',
          'Keep posture upright and steady without swaying or shifting weight.',
          'Focus gaze entirely on the spot where forehead touches in Sujood.'
        ]
      },
      avoidThis: {
        title: 'AVOID THIS (Common Mistakes)',
        description: 'Looking around, looking up at the ceiling, or letting thoughts wander into worldly affairs.',
        points: [
          'Looking up at the sky/ceiling (strictly warned against by Prophet ﷺ).',
          'Shifting feet, fidgeting with clothes, watch, or hair during recitation.',
          'Spreading legs excessively wide or gluing feet tightly together.'
        ]
      }
    },
    {
      id: 'step-ruku',
      stepNumber: 2,
      title: 'Ruku (Bowing with a Level Back)',
      subtitle: 'Magnifying Allah with spine perfectly straight and palms on knees',
      arabicText: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ',
      transliteration: 'Subhaana Rabbiyal-’Azeem (Recited 3 times)',
      translation: 'Glory be to my Lord, the Most Magnificent.',
      postureDescription: 'Bow until back and head form a level horizontal plane. Clasp kneecaps with fingers spread wide, elbows straight without bending outwards.',
      visualType: 'ruku',
      doThis: {
        title: 'DO THIS (Sunnah Posture)',
        description: 'Back completely horizontal so that if a cup of water were placed on your back, it would not spill.',
        points: [
          'Spread fingers open and grip the kneecaps like holding a bowl.',
          'Keep head in line with the straight back (neither raised high nor drooping).',
          'Attain full tranquility (Tuma’ninah) for at least 3 tasbeehs before rising.'
        ]
      },
      avoidThis: {
        title: 'AVOID THIS (Common Mistakes)',
        description: 'Curving or hunching the spine, bending the knees, or rushing the bow like a quick dip.',
        points: [
          'Hunching the back like an arch or keeping head tilted awkwardly upward.',
          'Bending knees or resting hands on thighs instead of kneecaps.',
          'Racing into Ruku and jumping straight back up before achieving still rest.'
        ]
      }
    },
    {
      id: 'step-sujood',
      stepNumber: 3,
      title: 'Sujood (Prostration on Seven Bones)',
      subtitle: 'The closest a slave comes to their Lord Almighty',
      arabicText: 'سُبْحَانَ رَبِّيَ الأَعْلَى',
      transliteration: 'Subhaana Rabbiyal-A’laa (Recited 3 times)',
      translation: 'Glory be to my Lord, the Most High.',
      postureDescription: 'Prostrate with 7 bones touching ground: forehead and nose together, both palms, both knees, and the toes of both feet turned toward Qibla.',
      visualType: 'sujood',
      doThis: {
        title: 'DO THIS (Sunnah Posture)',
        description: 'Forehead and nose firmly pressed to ground. Keep forearms and elbows raised off the floor and away from ribcage (for men).',
        points: [
          'Ensure the nose touches the ground firmly along with the forehead.',
          'Both feet upright with toes bent forward pointing directly to the Qibla.',
          'Keep elbows lifted like wings, not resting on thighs or the prayer mat.'
        ]
      },
      avoidThis: {
        title: 'AVOID THIS (Common Mistakes)',
        description: 'Resting forearms flat on the ground like a dog, lifting feet into the air, or resting only on the forehead.',
        points: [
          'Laying forearms flat on the floor (explicitly forbidden by Prophet ﷺ).',
          'Lifting feet off the ground or dangling them in the air during Sujood.',
          'Resting forehead while nose remains elevated off the ground.'
        ]
      }
    },
    {
      id: 'step-tashahhud',
      stepNumber: 4,
      title: 'Jalsah & Tashahhud (Sitting & Testimony)',
      subtitle: 'Sitting serenely between prostrations and reciting Attahiyyaat',
      arabicText: 'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ ، السَّلاَمُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ',
      transliteration: 'At-tahiyyaatu lillaahi was-salawaatu wat-tayyibaatu, as-salaamu ‘alayka ayyuhan-Nabiyyu wa rahmatullaahi wa barakaatuh...',
      translation: 'All compliments, prayers, and pure things are for Allah. Peace be upon you, O Prophet, and the mercy of Allah and His blessings.',
      postureDescription: 'Sit in Iftirash: lay left foot flat and sit on it, keeping right foot upright with toes facing Qibla. Rest hands on thighs with index finger raised upon testifying Tawheed.',
      visualType: 'jalsah',
      doThis: {
        title: 'DO THIS (Sunnah Posture)',
        description: 'Sit in calm stillness. Rest palms on thighs right above knees. Raise right index finger pointing towards Qibla at "Ashhadu alla ilaha illallah".',
        points: [
          'Make sincere Dua between the two prostrations: "Rabbighfir lee".',
          'Raise index finger without wild shaking; direct it towards Qibla with focus.',
          'Keep posture dignified and still, without slouching backward.'
        ]
      },
      avoidThis: {
        title: 'AVOID THIS (Common Mistakes)',
        description: 'Iq’aa (sitting on heels like an animal) or waving the finger erratically.',
        points: [
          'Sitting between heels with toes pointing backward (Iq’aa of the dog).',
          'Rushing from first Sujood to second without a pause in Jalsah.',
          'Leaving fingers dangling over knees or looking at hands instead of lap.'
        ]
      }
    }
  ];

  // 2. EID NAMAZ (SALAT AL-EID) GUIDE
  const eidSteps: StepItem[] = [
    {
      id: 'eid-rakah1',
      stepNumber: 1,
      title: 'First Rak’ah: 3 Extra Takbeerat',
      subtitle: 'Beginning the joyful prayer with extra glorification of Allah',
      arabicText: 'اللهُ أَكْبَرُ ، اللهُ أَكْبَرُ ، لاَ إِلَهَ إِلاَّ اللهُ ، وَاللهُ أَكْبَرُ ، اللهُ أَكْبَرُ ، وَلِلَّهِ الْحَمْدُ',
      transliteration: 'Allaahu Akbar, Allaahu Akbar, Laa ilaaha illallaah, Wallaahu Akbar, Allaahu Akbar, wa lillaahil-hamd.',
      translation: 'Allah is the Greatest, Allah is the Greatest, there is no deity worthy of worship but Allah. Allah is the Greatest, Allah is the Greatest, and all praise belongs to Allah.',
      postureDescription: 'After Takbir Tahrimah and Thana, Imam recites 3 extra Takbeerat. Raise hands to ears on each Takbir and let them drop down by your sides. After the 3rd Takbir, fold hands across chest/navel for Surah Al-Fatihah.',
      visualType: 'eid_takbir',
      doThis: {
        title: 'DO THIS (Sunnah of Eid Salah)',
        description: 'Raise hands up to ears for each extra Takbir and let hands hang down naturally after the first two, folding only after the third.',
        points: [
          'Listen quietly to the Imam’s recitation of Surah Al-A’la or Surah Qaf.',
          'Recite Takbeerat-e-Tashreeq loudly while walking to the Eid prayer Musalla.',
          'Perform Ghusl, wear best clean garments, and apply Itr (perfume) for men.'
        ]
      },
      avoidThis: {
        title: 'AVOID THIS (Common Eid Mistakes)',
        description: 'Praying Nafl prayer immediately before Eid Salah at the open prayer ground, or leaving before the Khutbah.',
        points: [
          'Praying Nafl before or after the Eid prayer at the Musalla (contrary to Sunnah).',
          'Leaving the Musalla while the Imam is delivering the Eid Khutbah.',
          'Fasting on the Day of Eid (explicitly prohibited in Islamic law).'
        ]
      }
    },
    {
      id: 'eid-rakah2',
      stepNumber: 2,
      title: 'Second Rak’ah: 3 Extra Takbeerat Before Ruku',
      subtitle: 'Extra Takbeerat performed after recitation of Surah Al-Fatihah and Surah',
      arabicText: 'سَبِّحِ اسْمَ رَبِّكَ الأَعْلَى ... هَلْ أَتَاكَ حَدِيثُ الْغَاشِيَةِ',
      transliteration: 'Sabbihisma Rabbikal-A’laa ... Hal ataaka hadeethul-Ghaashiyah',
      translation: 'Exalt the name of your Lord, the Most High ... Has there reached you the report of the Overwhelming [event]?',
      postureDescription: 'In 2nd Rak’ah, recite Al-Fatihah + Surah first. Then before bowing into Ruku, the Imam will call 3 extra Takbeerat (raise hands and drop to sides). On the 4th Takbir, bow directly into Ruku without raising hands.',
      visualType: 'eid_takbir',
      doThis: {
        title: 'DO THIS (Sunnah Sequence)',
        description: 'Raise hands on the 3 extra Takbeerat after Surah recitation, and on the 4th Takbir move directly into Ruku.',
        points: [
          'Stay calm if confused; simply follow the Imam’s voice closely.',
          'Take an alternate walking route on your return journey from Eid prayer.',
          'Eat an odd number of dates before leaving home on Eid al-Fitr.'
        ]
      },
      avoidThis: {
        title: 'AVOID THIS (Mistakes in 2nd Rak’ah)',
        description: 'Bowing into Ruku prematurely before the 3 extra Takbeerat are called by the Imam.',
        points: [
          'Going directly into Ruku when the Imam calls the first Takbir of the 2nd Rak’ah.',
          'Folding hands after the extra Takbeerat in the second Rak’ah (they drop to sides).',
          'Engaging in loud chit-chat while the Eid Sermon is being given.'
        ]
      }
    }
  ];

  // 3. NAMAZ-E-JANAZAH (FUNERAL PRAYER) GUIDE
  const janazahSteps: StepItem[] = [
    {
      id: 'janazah-all',
      stepNumber: 1,
      title: 'The 4 Takbeerat of Janazah (No Ruku or Sujood)',
      subtitle: 'A solemn standing supplication of forgiveness for our departed Muslim brother/sister',
      arabicText: 'اللَّهُمَّ اغْفِرْ لِحَيِّنَا وَمَيِّتِنَا ، وَشَاهِدِنَا وَغَائِبِنَا ، وَصَغِيرِنَا وَكَبِيرِنَا ، وَذَكَرِنَا وَأُنْثَانَا',
      transliteration: 'Allaahummagh-fir lihayyinaa wa mayyitinaa, wa shaahidinaa wa ghaa’ibinaa, wa sagheerinaa wa kabeerinaa, wa thakarinaa wa unthaanaa...',
      translation: 'O Allah, forgive our living and our deceased, those present and those absent, our young and our old, our males and our females. O Allah, whomever You keep alive among us, keep him alive upon Islam.',
      postureDescription: 'Namaz-e-Janazah consists strictly of 4 Takbeerat performed completely standing upright with hands folded. There is NO Ruku (bowing) and NO Sujood (prostration).',
      visualType: 'janazah_stand',
      doThis: {
        title: 'DO THIS (Proper Janazah Etiquette)',
        description: 'Stand in 3 or an odd number of rows behind the Imam. Supplicate with tears and heartfelt sincerity for the deceased.',
        points: [
          '1st Takbir: Recite Thana (including "wa Jalla Thanaa’uk") or Surah Al-Fatihah.',
          '2nd Takbir: Recite complete Durood Ibrahim upon the Prophet ﷺ.',
          '3rd Takbir: Recite the authentic Janazah Dua for forgiveness.',
          '4th Takbir: Pause briefly, then turn head for Salam to end the prayer.'
        ]
      },
      avoidThis: {
        title: 'AVOID THIS (Grave Errors in Janazah)',
        description: 'Attempting to bow into Ruku or prostrate into Sajdah; screaming or wailing.',
        points: [
          'Bowing or prostrating (Namaz-e-Janazah has zero Ruku and zero Sujood).',
          'Loud screaming, chest-beating, or wailing (Niyaha), which is forbidden in Islam.',
          'Walking directly in front of the Janazah prayer rows.'
        ]
      }
    }
  ];

  // 4. ROZA (FASTING / SAWM) - RULES, DOS & AVOID THIS
  const rozaData = {
    title: 'Rules & Spiritual Etiquettes of Fasting (Roza / Sawm)',
    subtitle: 'From True Dawn (Fajr) to Sunset (Maghrib) for the sake of Allah',
    iftarDuaArabic: 'ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللَّهُ',
    iftarDuaTrans: 'Thahaba ath-thama’u wabtallatil-‘urooqu wa thabatal-ajru in shaa Allaah.',
    iftarDuaMeaning: 'The thirst has vanished, the veins have been moistened, and the reward is established, if Allah wills. (Abu Dawud)',
    suhoorDuaArabic: 'وَبِصَوْمِ غَدٍ نَوَيْتُ مِنْ شَهْرِ رَمَضَانَ',
    suhoorDuaTrans: 'Wa bisawmi ghadin nawaytu min shahri Ramadan.',
    suhoorDuaMeaning: 'And I intend to keep the fast tomorrow for the month of Ramadan.',
    doThisList: [
      {
        title: 'Eat the Pre-Dawn Meal (Suhoor / Sehri)',
        desc: 'The Prophet ﷺ said: "Eat Suhoor, for indeed in Suhoor there is divine blessing (Barakah)." Even drinking a sip of water or eating a single date fulfills the Sunnah.',
        hadith: 'Sahih Al-Bukhari 1923'
      },
      {
        title: 'Hasten to Break the Fast (Iftar) at Sunset',
        desc: 'Break your fast immediately upon the arrival of Maghrib adhan with fresh dates, dried dates, or water, followed by making sincere Duas before eating your meal.',
        hadith: 'Sahih Al-Bukhari 1957'
      },
      {
        title: 'Guard the Tongue, Eyes, and Temper',
        desc: 'The Prophet ﷺ said: "If one of you is fasting, he should avoid obscenity and arguing. If someone insults or fights him, let him say: ‘I am fasting (Inni Sa’im)’."',
        hadith: 'Sahih Muslim 1151'
      },
      {
        title: 'Abundant Charity, Quran Recitation & Taraweeh',
        desc: 'The Prophet ﷺ was the most generous of people, and he was at his utmost peak of generosity during Ramadan when Jibreel (AS) reviewed the Quran with him.',
        hadith: 'Sahih Al-Bukhari 6'
      }
    ],
    avoidThisList: [
      {
        title: 'What Completely Invalidates (Breaks) the Fast',
        desc: 'Deliberate eating, drinking, smoking, taking nutritive IV fluids, or intentional vomiting from True Dawn (Fajr) until Sunset (Maghrib). Requires Qada and repentance.',
        severity: 'Invalidates Fast'
      },
      {
        title: 'False Speech, Slander & Foul Arguments',
        desc: 'The Prophet ﷺ said: "Whoever does not leave false speech and acting upon it, Allah has no need in him leaving his food and drink." Sins rob the entire spiritual reward.',
        severity: 'Destroys Reward'
      },
      {
        title: 'Sleeping All Day to Evade the Hunger',
        desc: 'Spending the entire daylight hours asleep and consequently delaying or missing obligatory prayers (Dhuhr and Asr) goes against the primary purpose of Taqwa.',
        severity: 'Gross Negligence'
      },
      {
        title: 'Extravagant Overeating at Iftar',
        desc: 'Consuming heavy, greasy foods to excess at Iftar leads to physical fatigue and laziness during the nightly Taraweeh and Tahajjud prayers.',
        severity: 'Harmful Habit'
      }
    ],
    permissibleList: [
      {
        title: 'Brushing Teeth & Using Miswak',
        desc: 'Using a natural Miswak or toothbrush (without swallowing toothpaste) is entirely permissible and encouraged in Sunnah.'
      },
      {
        title: 'Medical Injections & Blood Tests',
        desc: 'Routine blood samples, insulin shots, and non-nutritional medical injections into muscle or vein do not break the fast.'
      },
      {
        title: 'Rinsing Mouth & Taking a Shower',
        desc: 'Rinsing mouth or nose during Wudu (without excessive inhalation) and bathing to cool down is permissible.'
      },
      {
        title: 'Eating or Drinking by Honest Forgetfulness',
        desc: 'If someone eats or drinks out of genuine forgetfulness, their fast remains 100% valid. The Prophet ﷺ said: "Allah has fed him and given him drink."'
      }
    ]
  };

  // Helper renderer for realistic human posture vector cards
  const renderPostureVisual = (type: StepItem['visualType']) => {
    switch (type) {
      case 'qiyam':
        return (
          <div className="w-full h-48 bg-gradient-to-b from-purple-50/70 via-white to-purple-50/40 rounded-2xl flex items-center justify-center border border-[#6B1B7E]/15 relative overflow-hidden group shadow-inner">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#6B1B7E_1px,transparent_1px)] [background-size:16px_16px]" />
            <svg viewBox="0 0 200 180" className="w-40 h-40 transition-transform group-hover:scale-105 duration-300">
              <defs>
                <linearGradient id="qiyamThobe" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="50%" stopColor="#F3EEF6" />
                  <stop offset="100%" stopColor="#E5DCED" />
                </linearGradient>
                <linearGradient id="rugGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#6B1B7E" />
                  <stop offset="50%" stopColor="#5B2A9A" />
                  <stop offset="100%" stopColor="#6B1B7E" />
                </linearGradient>
              </defs>
              {/* Prayer Rug with Mihrab arch */}
              <ellipse cx="100" cy="165" rx="75" ry="12" fill="url(#rugGrad)" opacity="0.25" />
              <path d="M 45 165 L 155 165 L 150 172 L 50 172 Z" fill="#6B1B7E" opacity="0.45" />
              <path d="M 70 165 Q 100 156 130 165" stroke="#E0107F" strokeWidth="1.5" fill="none" opacity="0.6" />

              {/* Head & Kufi Cap */}
              {/* White Kufi */}
              <path d="M 91 30 C 91 22, 109 22, 109 30 Z" fill="#FFFFFF" stroke="#C8C8C8" strokeWidth="1" />
              <ellipse cx="100" cy="30" rx="9" ry="3.5" fill="#FFFFFF" stroke="#C8C8C8" strokeWidth="0.8" />
              {/* Face and Beard Profile looking downwards */}
              <path d="M 93 30 Q 93 42 98 44 Q 102 44 104 42 Q 107 42 107 30 Z" fill="#D4A373" />
              {/* Trimmed beard */}
              <path d="M 94 36 Q 96 46 102 46 Q 106 46 107 38 Q 104 44 98 43 Z" fill="#3D2619" opacity="0.8" />
              {/* Gaze angle down to Sajdah */}
              <line x1="97" y1="36" x2="70" y2="164" stroke="#E0107F" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

              {/* Neck */}
              <path d="M 97 44 L 103 44 L 104 48 L 96 48 Z" fill="#D4A373" />

              {/* Upper Thobe & Shoulders */}
              <path d="M 80 56 Q 100 48 120 56 L 115 110 L 85 110 Z" fill="url(#qiyamThobe)" stroke="#C8C8C8" strokeWidth="1" />
              {/* Collar detail */}
              <path d="M 96 48 L 100 56 L 104 48" stroke="#6B1B7E" strokeWidth="1.5" fill="none" />

              {/* Folded Arms on chest / upper abdomen (Right over left) */}
              {/* Left arm sleeve */}
              <path d="M 80 56 Q 74 76 90 82 L 106 82 Q 108 77 106 74 L 88 74 Z" fill="#EDE9FE" stroke="#C8C8C8" strokeWidth="0.8" />
              {/* Right arm folded over */}
              <path d="M 120 56 Q 124 74 112 80 L 92 80 Q 90 75 94 72 L 114 70 Z" fill="#FFFFFF" stroke="#6B1B7E" strokeWidth="1.2" />
              {/* Right hand grasping left wrist */}
              <rect x="91" y="73" width="16" height="7" rx="3.5" fill="#D4A373" />
              <path d="M 97 73 L 97 80 M 100 73 L 100 80 M 103 73 L 103 80" stroke="#B08968" strokeWidth="0.7" />

              {/* Lower Thobe / Jubbah draping to above ankles */}
              <path d="M 85 110 Q 78 140 82 153 L 118 153 Q 122 140 115 110 Z" fill="url(#qiyamThobe)" stroke="#C8C8C8" strokeWidth="1" />
              {/* Natural garment fold lines */}
              <path d="M 94 112 Q 95 136 94 153" stroke="#D8CEE2" strokeWidth="1" fill="none" />
              <path d="M 104 112 Q 105 138 106 153" stroke="#D8CEE2" strokeWidth="1" fill="none" />

              {/* Feet resting neatly on prayer mat */}
              <ellipse cx="90" cy="156" rx="5" ry="3" fill="#D4A373" />
              <ellipse cx="110" cy="156" rx="5" ry="3" fill="#D4A373" />
            </svg>
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-2.5 text-[10px] font-bold text-[#6B1B7E] bg-white/90 backdrop-blur-xs rounded-lg py-1 border border-purple-200 shadow-xs">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E0107F]" />
                Gaze: Place of Sujood
              </span>
              <span className="font-semibold text-slate-700">Right Hand Over Left Wrist</span>
            </div>
          </div>
        );

      case 'ruku':
        return (
          <div className="w-full h-48 bg-gradient-to-b from-purple-50/70 via-white to-purple-50/40 rounded-2xl flex items-center justify-center border border-[#6B1B7E]/15 relative overflow-hidden group shadow-inner">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#6B1B7E_1px,transparent_1px)] [background-size:16px_16px]" />
            <svg viewBox="0 0 200 180" className="w-44 h-44 transition-transform group-hover:scale-105 duration-300">
              <defs>
                <linearGradient id="rukuThobe" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#E7DEEE" />
                </linearGradient>
              </defs>
              {/* Prayer Rug */}
              <ellipse cx="100" cy="165" rx="80" ry="12" fill="#6B1B7E" opacity="0.25" />
              <path d="M 35 165 L 165 165 L 160 172 L 40 172 Z" fill="#6B1B7E" opacity="0.45" />

              {/* Perfectly Straight Alignment Guide Bar */}
              <line x1="40" y1="78" x2="155" y2="78" stroke="#E0107F" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.75" />

              {/* Head with Kufi aligned with spine */}
              <path d="M 45 84 C 42 77, 53 73, 58 79 Z" fill="#FFFFFF" stroke="#C8C8C8" strokeWidth="0.8" />
              <ellipse cx="56" cy="85" rx="7" ry="6" fill="#D4A373" />
              <path d="M 52 87 Q 56 92 60 88" stroke="#3D2619" strokeWidth="1.5" fill="none" />

              {/* Horizontal Torso & Back in Thobe (Level Plane) */}
              <path d="M 58 80 L 138 80 Q 146 84 142 98 L 70 98 Q 58 96 58 80 Z" fill="url(#rukuThobe)" stroke="#6B1B7E" strokeWidth="1.2" />
              {/* Back drape fold */}
              <line x1="68" y1="88" x2="135" y2="88" stroke="#D8CEE2" strokeWidth="1" />

              {/* Straight Vertical Legs in Thobe */}
              <path d="M 125 98 L 123 155 L 142 155 L 142 98 Z" fill="url(#rukuThobe)" stroke="#C8C8C8" strokeWidth="1" />
              {/* Feet */}
              <ellipse cx="132" cy="158" rx="7" ry="3" fill="#D4A373" />

              {/* Arms extending down firmly grasping knees */}
              <path d="M 78 94 L 118 126" stroke="#EDE9FE" strokeWidth="9" strokeLinecap="round" />
              <path d="M 78 94 L 118 126" stroke="#6B1B7E" strokeWidth="2" strokeLinecap="round" fill="none" />

              {/* Hands with spread fingers firmly clasping kneecap */}
              <ellipse cx="120" cy="128" rx="6" ry="5" fill="#D4A373" stroke="#6B1B7E" strokeWidth="1" />
              <path d="M 117 125 L 123 125 M 117 128 L 124 128 M 118 131 L 123 131" stroke="#B08968" strokeWidth="1" />

              {/* Level indicator text badge inside visual */}
              <rect x="75" y="60" width="70" height="16" rx="8" fill="#E0107F" />
              <text x="110" y="71" fill="#FFFFFF" fontSize="8.5" fontWeight="bold" textAnchor="middle">180° Level Back</text>
            </svg>
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-2.5 text-[10px] font-bold text-[#6B1B7E] bg-white/90 backdrop-blur-xs rounded-lg py-1 border border-purple-200 shadow-xs">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Spine Perfectly Horizontal
              </span>
              <span className="font-semibold text-slate-700">Fingers Spread on Knees</span>
            </div>
          </div>
        );

      case 'sujood':
        return (
          <div className="w-full h-48 bg-gradient-to-b from-purple-50/70 via-white to-purple-50/40 rounded-2xl flex items-center justify-center border border-[#6B1B7E]/15 relative overflow-hidden group shadow-inner">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#6B1B7E_1px,transparent_1px)] [background-size:16px_16px]" />
            <svg viewBox="0 0 200 180" className="w-44 h-44 transition-transform group-hover:scale-105 duration-300">
              <defs>
                <linearGradient id="sujoodThobe" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#E4D9EB" />
                </linearGradient>
              </defs>
              {/* Prayer Rug */}
              <ellipse cx="100" cy="165" rx="85" ry="12" fill="#6B1B7E" opacity="0.25" />
              <path d="M 25 165 L 175 165 L 170 173 L 30 173 Z" fill="#6B1B7E" opacity="0.45" />

              {/* 7 Touch Points Highlight Dots */}
              {/* Forehead & Nose (1) */}
              <circle cx="48" cy="158" r="4.5" fill="#E0107F" className="animate-ping opacity-75" />
              <circle cx="48" cy="158" r="3.5" fill="#E0107F" />
              {/* Palms (2 & 3) */}
              <circle cx="68" cy="158" r="3.5" fill="#E0107F" />
              {/* Knees (4 & 5) */}
              <circle cx="118" cy="158" r="3.5" fill="#E0107F" />
              {/* Toes (6 & 7) */}
              <circle cx="160" cy="156" r="3.5" fill="#E0107F" />

              {/* Prostrating Head & Forehead + Nose pressed to mat */}
              <ellipse cx="50" cy="150" rx="8" ry="7" fill="#D4A373" />
              {/* Kufi Cap */}
              <path d="M 45 144 C 47 138, 56 138, 58 145 Z" fill="#FFFFFF" stroke="#C8C8C8" strokeWidth="0.8" />
              {/* Beard */}
              <path d="M 44 153 Q 48 156 52 153" stroke="#3D2619" strokeWidth="1.5" fill="none" />

              {/* Hands flat on rug next to shoulders */}
              <ellipse cx="68" cy="156" rx="6" ry="3.5" fill="#D4A373" stroke="#6B1B7E" strokeWidth="1" />

              {/* Elevated Winged Forearms & Elbows (High off ground) */}
              <path d="M 58 144 L 74 122 L 72 154" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 58 144 L 74 122 L 72 154" stroke="#6B1B7E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

              {/* Elegant Arch of Torso in Thobe */}
              <path d="M 55 142 Q 95 106 132 124 L 126 156 Q 102 144 80 148 Z" fill="url(#sujoodThobe)" stroke="#6B1B7E" strokeWidth="1.2" />
              <path d="M 85 125 Q 105 122 120 135" stroke="#D8CEE2" strokeWidth="1" fill="none" />

              {/* Thighs & Knees on floor */}
              <path d="M 132 124 L 115 158 L 152 158 Q 150 142 132 124 Z" fill="url(#sujoodThobe)" stroke="#C8C8C8" strokeWidth="1" />

              {/* Upright feet with toes bent forward toward Qibla */}
              <path d="M 152 158 L 164 148 L 165 157 Z" fill="#D4A373" stroke="#6B1B7E" strokeWidth="1" />
              <path d="M 160 157 L 166 157" stroke="#E0107F" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-2.5 text-[10px] font-bold text-[#6B1B7E] bg-white/90 backdrop-blur-xs rounded-lg py-1 border border-purple-200 shadow-xs">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E0107F]" />
                Forehead + Nose Pressed Firmly
              </span>
              <span className="font-semibold text-slate-700">Elbows Winged Off Floor</span>
            </div>
          </div>
        );

      case 'jalsah':
        return (
          <div className="w-full h-48 bg-gradient-to-b from-purple-50/70 via-white to-purple-50/40 rounded-2xl flex items-center justify-center border border-[#6B1B7E]/15 relative overflow-hidden group shadow-inner">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#6B1B7E_1px,transparent_1px)] [background-size:16px_16px]" />
            <svg viewBox="0 0 200 180" className="w-40 h-40 transition-transform group-hover:scale-105 duration-300">
              <defs>
                <linearGradient id="jalsahThobe" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#E6DCEE" />
                </linearGradient>
              </defs>
              {/* Prayer Rug */}
              <ellipse cx="100" cy="165" rx="80" ry="12" fill="#6B1B7E" opacity="0.25" />
              <path d="M 30 165 L 170 165 L 165 172 L 35 172 Z" fill="#6B1B7E" opacity="0.45" />

              {/* Head with Kufi Cap tilted serenely downward */}
              <path d="M 85 46 C 85 38, 103 38, 103 46 Z" fill="#FFFFFF" stroke="#C8C8C8" strokeWidth="0.8" />
              <ellipse cx="94" cy="46" rx="8.5" ry="3.5" fill="#FFFFFF" stroke="#C8C8C8" strokeWidth="0.8" />
              <path d="M 87 47 Q 86 58 92 60 Q 97 60 100 57 L 100 47 Z" fill="#D4A373" />
              <path d="M 88 52 Q 91 61 96 61 Q 100 61 100 54" stroke="#3D2619" strokeWidth="1.2" fill="none" />

              {/* Neck & Upright Back */}
              <path d="M 91 60 L 97 60 L 98 65 L 90 65 Z" fill="#D4A373" />
              <path d="M 76 72 Q 94 65 112 72 L 115 125 L 75 125 Z" fill="url(#jalsahThobe)" stroke="#6B1B7E" strokeWidth="1.2" />

              {/* Lower Thobe Draped across folded legs in Iftirash posture */}
              <path d="M 68 125 Q 60 156 70 162 L 135 162 Q 140 148 122 125 Z" fill="url(#jalsahThobe)" stroke="#C8C8C8" strokeWidth="1" />

              {/* Left hand resting open on left thigh */}
              <path d="M 82 82 L 72 126" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
              <ellipse cx="72" cy="128" rx="5" ry="3" fill="#D4A373" />

              {/* Right arm & Hand with Index Finger Raised in Tashahhud */}
              <path d="M 104 82 L 95 122" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" />
              <path d="M 104 82 L 95 122" stroke="#6B1B7E" strokeWidth="1.2" fill="none" />
              {/* Clenched fist with raised index finger */}
              <circle cx="95" cy="124" r="4.5" fill="#D4A373" stroke="#6B1B7E" strokeWidth="0.8" />
              <line x1="95" y1="124" x2="84" y2="116" stroke="#E0107F" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="83" cy="115" r="1.5" fill="#E0107F" />

              {/* Tashahhud Tawheed badge */}
              <rect x="52" y="100" width="56" height="15" rx="7.5" fill="#E0107F" />
              <text x="80" y="110" fill="#FFFFFF" fontSize="7.5" fontWeight="bold" textAnchor="middle">Shahadah Finger</text>
            </svg>
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-2.5 text-[10px] font-bold text-[#6B1B7E] bg-white/90 backdrop-blur-xs rounded-lg py-1 border border-purple-200 shadow-xs">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                Sit on Left Foot (Iftirash)
              </span>
              <span className="font-semibold text-slate-700">Point Finger at Tawheed</span>
            </div>
          </div>
        );

      case 'eid_takbir':
        return (
          <div className="w-full h-48 bg-gradient-to-b from-purple-50/70 via-white to-purple-50/40 rounded-2xl flex items-center justify-center border border-[#6B1B7E]/15 relative overflow-hidden group shadow-inner">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#6B1B7E_1px,transparent_1px)] [background-size:16px_16px]" />
            <svg viewBox="0 0 200 180" className="w-40 h-40 transition-transform group-hover:scale-105 duration-300">
              <defs>
                <linearGradient id="eidThobe" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#EDE5F3" />
                </linearGradient>
              </defs>
              <ellipse cx="100" cy="165" rx="75" ry="12" fill="#6B1B7E" opacity="0.25" />
              <path d="M 40 165 L 160 165 L 155 172 L 45 172 Z" fill="#6B1B7E" opacity="0.4" />

              {/* Head with Kufi */}
              <path d="M 91 32 C 91 24, 109 24, 109 32 Z" fill="#FFFFFF" stroke="#C8C8C8" strokeWidth="1" />
              <ellipse cx="100" cy="32" rx="9" ry="3.5" fill="#FFFFFF" stroke="#C8C8C8" strokeWidth="0.8" />
              <path d="M 93 32 Q 93 44 100 46 Q 107 44 107 32 Z" fill="#D4A373" />
              <path d="M 94 38 Q 97 47 100 47 Q 104 47 106 39" stroke="#3D2619" strokeWidth="1.2" fill="none" />

              {/* Both Hands Raised to Earlobes */}
              {/* Left hand & arm raised */}
              <path d="M 85 58 L 70 42 L 68 32" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
              <path d="M 85 58 L 70 42 L 68 32" stroke="#6B1B7E" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <ellipse cx="68" cy="28" rx="4.5" ry="6" fill="#D4A373" stroke="#E0107F" strokeWidth="1" />

              {/* Right hand & arm raised */}
              <path d="M 115 58 L 130 42 L 132 32" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
              <path d="M 115 58 L 130 42 L 132 32" stroke="#6B1B7E" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <ellipse cx="132" cy="28" rx="4.5" ry="6" fill="#D4A373" stroke="#E0107F" strokeWidth="1" />

              {/* Torso & Thobe */}
              <path d="M 82 56 Q 100 48 118 56 L 115 115 L 85 115 Z" fill="url(#eidThobe)" stroke="#6B1B7E" strokeWidth="1.2" />
              <path d="M 85 115 Q 78 142 82 154 L 118 154 Q 122 142 115 115 Z" fill="url(#eidThobe)" stroke="#C8C8C8" strokeWidth="1" />

              {/* Feet */}
              <ellipse cx="90" cy="157" rx="5" ry="3" fill="#D4A373" />
              <ellipse cx="110" cy="157" rx="5" ry="3" fill="#D4A373" />
            </svg>
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-2.5 text-[10px] font-bold text-[#6B1B7E] bg-white/90 backdrop-blur-xs rounded-lg py-1 border border-purple-200 shadow-xs">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E0107F]" />
                Raise Palms to Earlobes
              </span>
              <span className="font-semibold text-slate-700">Say Allāhu Akbar</span>
            </div>
          </div>
        );

      case 'janazah_stand':
        return (
          <div className="w-full h-48 bg-gradient-to-b from-purple-50/70 via-white to-purple-50/40 rounded-2xl flex items-center justify-center border border-[#6B1B7E]/15 relative overflow-hidden group shadow-inner">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#6B1B7E_1px,transparent_1px)] [background-size:16px_16px]" />
            <svg viewBox="0 0 200 180" className="w-44 h-44 transition-transform group-hover:scale-105 duration-300">
              {/* Funeral congregation standing shoulder to shoulder */}
              <ellipse cx="100" cy="165" rx="90" ry="10" fill="#6B1B7E" opacity="0.25" />

              {/* Left worshipper (partial silhouette) */}
              <circle cx="58" cy="46" r="8" fill="#5B2A9A" opacity="0.4" />
              <path d="M 44 64 Q 58 58 72 64 L 68 148 L 48 148 Z" fill="#EDE9FE" opacity="0.7" />

              {/* Right worshipper (partial silhouette) */}
              <circle cx="142" cy="46" r="8" fill="#5B2A9A" opacity="0.4" />
              <path d="M 128 64 Q 142 58 156 64 L 152 148 L 132 148 Z" fill="#EDE9FE" opacity="0.7" />

              {/* Center Imam / Lead worshipper */}
              <path d="M 91 32 C 91 24, 109 24, 109 32 Z" fill="#FFFFFF" stroke="#C8C8C8" strokeWidth="1" />
              <ellipse cx="100" cy="32" rx="9" ry="3.5" fill="#FFFFFF" stroke="#C8C8C8" strokeWidth="0.8" />
              <path d="M 93 32 Q 93 44 100 46 Q 107 44 107 32 Z" fill="#D4A373" />
              <path d="M 80 56 Q 100 48 120 56 L 115 152 L 85 152 Z" fill="#FFFFFF" stroke="#6B1B7E" strokeWidth="1.2" />
              {/* Folded hands across chest */}
              <rect x="90" y="74" width="20" height="9" rx="4" fill="#D4A373" stroke="#6B1B7E" strokeWidth="1" />

              {/* Stand Only badge */}
              <rect x="35" y="12" width="130" height="18" rx="9" fill="#E0107F" />
              <text x="100" y="24" fill="#FFFFFF" fontSize="9.5" fontWeight="bold" textAnchor="middle">Standing Only · 4 Takbeers · No Ruku/Sajdah</text>
            </svg>
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-2.5 text-[10px] font-bold text-[#6B1B7E] bg-white/90 backdrop-blur-xs rounded-lg py-1 border border-purple-200 shadow-xs">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E0107F]" />
                Straight Standing Row
              </span>
              <span className="font-semibold text-slate-700">Supplication for Deceased</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section 
      id="worship-guide"
      className="py-16 md:py-24 bg-gradient-to-b from-white via-purple-50/40 to-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/90 border border-[#6B1B7E]/20 text-[#6B1B7E] text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#E0107F]" />
            <span>Islamic Worship & Sunnah Mastery</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            True Way of <span className="bg-gradient-to-r from-[#6B1B7E] via-[#5B2A9A] to-[#E0107F] bg-clip-text text-transparent">Namaz, Eid, Janazah & Roza</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
            Learn authentic prophetic postures with correct Arabic recitations, audio pronunciation, and step-by-step visual comparisons of <strong>what to do</strong> and <strong>what to avoid</strong>.
          </p>
        </div>

        {/* Category Tabs (Namaz, Eid, Janazah, Roza) */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white shadow-md border border-[#6B1B7E]/15 rounded-2xl max-w-2xl mx-auto">
          <button
            onClick={() => setActiveTab('namaz')}
            className={`flex-1 min-w-[130px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'namaz'
                ? 'bg-gradient-to-r from-[#6B1B7E] to-[#5B2A9A] text-white shadow-sm'
                : 'text-slate-600 hover:text-[#6B1B7E] hover:bg-purple-50'
            }`}
          >
            <BookOpen className="w-4 h-4 shrink-0" />
            <span>Daily Namaz</span>
          </button>

          <button
            onClick={() => setActiveTab('eid')}
            className={`flex-1 min-w-[130px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'eid'
                ? 'bg-gradient-to-r from-[#6B1B7E] to-[#5B2A9A] text-white shadow-sm'
                : 'text-slate-600 hover:text-[#6B1B7E] hover:bg-purple-50'
            }`}
          >
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>Eid Namaz</span>
          </button>

          <button
            onClick={() => setActiveTab('janazah')}
            className={`flex-1 min-w-[130px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'janazah'
                ? 'bg-gradient-to-r from-[#6B1B7E] to-[#5B2A9A] text-white shadow-sm'
                : 'text-slate-600 hover:text-[#6B1B7E] hover:bg-purple-50'
            }`}
          >
            <Users className="w-4 h-4 shrink-0" />
            <span>Namaz Janazah</span>
          </button>

          <button
            onClick={() => setActiveTab('roza')}
            className={`flex-1 min-w-[130px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'roza'
                ? 'bg-gradient-to-r from-[#6B1B7E] to-[#E0107F] text-white shadow-sm'
                : 'text-slate-600 hover:text-[#6B1B7E] hover:bg-purple-50'
            }`}
          >
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Roza (Fasting)</span>
          </button>
        </div>

        {/* Dedicated Namaz Sub-Sections Banner: Step-by-Step Salah Guide & How to Pray Tahajjud */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl p-5 border border-[#6B1B7E]/20 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#E0107F] transition">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-100 text-[#6B1B7E] text-[10px] font-black uppercase tracking-wider">
                <CheckCircle2 className="w-3 h-3 text-[#E0107F]" />
                <span>Namaz Sub-Section 1</span>
              </span>
              <h3 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
                A step-by-step guide to performing the daily Islamic prayer (Salah)
              </h3>
              <p className="text-xs text-slate-500">
                Complete Wudu, 5 Prayers Rak'at Table & 11-Step Salah Guide (Salam Center PDF)
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {onOpenSalahGuide && (
                <button
                  onClick={onOpenSalahGuide}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#6B1B7E] to-[#E0107F] text-white text-xs font-black shadow-xs hover:opacity-95 transition cursor-pointer"
                >
                  Open Guide →
                </button>
              )}
              <a
                href="https://salamcenter.org/wp-content/uploads/2020/09/Prayer-Guide.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#6B1B7E] border border-purple-200 text-xs font-bold transition"
              >
                PDF
              </a>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-pink-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#6B1B7E] transition">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pink-100 text-[#E0107F] text-[10px] font-black uppercase tracking-wider">
                <Moon className="w-3 h-3 text-[#6B1B7E]" />
                <span>Namaz Sub-Section 2</span>
              </span>
              <h3 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
                How to pray tahajjud
              </h3>
              <p className="text-xs text-slate-500">
                Last Third of the Night prayer method, Rak'at rules & Prophetic Tahajjud Dua
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {onOpenTahajjud && (
                <button
                  onClick={onOpenTahajjud}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#5B2A9A] to-[#E0107F] text-white text-xs font-black shadow-xs hover:opacity-95 transition cursor-pointer"
                >
                  Open Tahajjud →
                </button>
              )}
              <a
                href="https://islamic-relief.org/knowledge-base/how-to-pray-tahajjud/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-xl bg-pink-50 hover:bg-pink-100 text-[#E0107F] border border-pink-200 text-xs font-bold transition"
              >
                Source
              </a>
            </div>
          </div>
        </div>

        {/* TAB 1: DAILY NAMAZ POSTURES & RIGHT/WRONG */}
        {activeTab === 'namaz' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between px-1 text-xs text-slate-500 font-semibold md:hidden">
              <span className="flex items-center gap-1.5 text-[#6B1B7E]">
                <span className="w-2 h-2 rounded-full bg-[#E0107F] animate-pulse" />
                Swipe postures horizontally (1-4)
              </span>
              <span>Slide →</span>
            </div>

            <div className="flex md:grid md:grid-cols-2 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 gap-6 md:gap-8 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
              {namazSteps.map((step) => {
                const isPlaying = playingAudioId === step.id;
                return (
                  <div 
                    key={step.id}
                    className="w-[86vw] sm:w-[440px] md:w-auto shrink-0 snap-center bg-white rounded-3xl p-6 sm:p-7 border border-[#6B1B7E]/15 shadow-lg shadow-purple-900/5 space-y-6 hover:border-[#6B1B7E]/30 transition duration-300"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-[#6B1B7E] text-white font-black text-sm flex items-center justify-center shrink-0">
                          {step.stepNumber}
                        </span>
                        <div>
                          <h3 className="text-lg font-black text-slate-900">{step.title}</h3>
                          <p className="text-xs text-slate-500 font-medium">{step.subtitle}</p>
                        </div>
                      </div>

                      {step.arabicText && (
                        <button
                          onClick={() => handlePlayArabic(step.id, step.arabicText!)}
                          className={`p-2.5 rounded-xl border transition flex items-center gap-1.5 cursor-pointer ${
                            isPlaying
                              ? 'bg-[#E0107F] text-white border-[#E0107F] shadow-sm animate-pulse'
                              : 'bg-purple-50 text-[#6B1B7E] border-purple-200 hover:bg-purple-100'
                          }`}
                          title="Listen to Arabic Pronunciation"
                        >
                          <Volume2 className="w-4 h-4" />
                          <span className="text-[11px] font-bold hidden sm:inline">
                            {isPlaying ? 'Playing...' : 'Audio'}
                          </span>
                        </button>
                      )}
                    </div>

                    {/* Visual Posture Diagram */}
                    {renderPostureVisual(step.visualType)}

                    {/* Arabic Text & Translation */}
                    {step.arabicText && (
                      <div className="bg-purple-50/60 p-4 rounded-2xl border border-purple-100 space-y-2">
                        <p className="font-arabic font-quran text-xl sm:text-2xl text-right text-slate-900 leading-loose" dir="rtl">
                          {step.arabicText}
                        </p>
                        <p className="text-xs font-semibold text-[#6B1B7E]">
                          {step.transliteration}
                        </p>
                        <p className="text-xs text-slate-600 italic">
                          "{step.translation}"
                        </p>
                      </div>
                    )}

                    {/* Posture Description */}
                    <p className="text-xs text-slate-700 leading-relaxed font-medium bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <strong>Posture Focus:</strong> {step.postureDescription}
                    </p>

                    {/* Side-by-Side Right vs Wrong */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      {/* Do This (Right) */}
                      <div className="bg-emerald-50/70 border border-emerald-200/90 rounded-2xl p-4 space-y-2">
                        <div className="flex items-center gap-2 text-emerald-800 font-black text-xs uppercase tracking-wide">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{step.doThis.title}</span>
                        </div>
                        <p className="text-[11px] text-emerald-950 font-medium">
                          {step.doThis.description}
                        </p>
                        <ul className="space-y-1 text-[11px] text-emerald-900">
                          {step.doThis.points.map((pt, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-emerald-600 font-bold">✓</span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Avoid This (Wrong) */}
                      <div className="bg-rose-50/70 border border-rose-200/90 rounded-2xl p-4 space-y-2">
                        <div className="flex items-center gap-2 text-rose-800 font-black text-xs uppercase tracking-wide">
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                          <span>{step.avoidThis.title}</span>
                        </div>
                        <p className="text-[11px] text-rose-950 font-medium">
                          {step.avoidThis.description}
                        </p>
                        <ul className="space-y-1 text-[11px] text-rose-900">
                          {step.avoidThis.points.map((pt, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-rose-600 font-bold">✗</span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: EID NAMAZ STEP-BY-STEP */}
        {activeTab === 'eid' && (
          <div className="space-y-8 max-w-5xl mx-auto">
            {/* Eid Takbeerat-e-Tashreeq Spotlight Card */}
            <div className="bg-gradient-to-r from-[#6B1B7E] via-[#5B2A9A] to-[#E0107F] text-white p-7 sm:p-9 rounded-3xl shadow-xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider">
                  Authentic Eid Takbeerat
                </span>
                <button
                  onClick={() => handlePlayArabic('eid-takbeerat-main', 'اللهُ أَكْبَرُ اللهُ أَكْبَرُ لاَ إِلَهَ إِلاَّ اللهُ وَاللهُ أَكْبَرُ اللهُ أَكْبَرُ وَلِلَّهِ الْحَمْدُ')}
                  className="px-4 py-2 bg-white text-[#6B1B7E] hover:bg-pink-50 rounded-xl font-bold text-xs transition flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Volume2 className="w-4 h-4 text-[#E0107F]" />
                  <span>Listen to Takbeerat Audio</span>
                </button>
              </div>

              <p className="font-arabic font-quran text-2xl sm:text-4xl text-right leading-relaxed" dir="rtl">
                اللهُ أَكْبَرُ ، اللهُ أَكْبَرُ ، لاَ إِلَهَ إِلاَّ اللهُ ، وَاللهُ أَكْبَرُ ، اللهُ أَكْبَرُ ، وَلِلَّهِ الْحَمْدُ
              </p>

              <div className="border-t border-white/20 pt-3 text-xs space-y-1 text-purple-100 font-medium">
                <p><strong>Transliteration:</strong> Allaahu Akbar, Allaahu Akbar, Laa ilaaha illallaah, Wallaahu Akbar, Allaahu Akbar, wa lillaahil-hamd.</p>
                <p><strong>Translation:</strong> Allah is the Greatest, Allah is the Greatest, there is no deity worthy of worship but Allah. Allah is the Greatest, Allah is the Greatest, and all praise belongs to Allah.</p>
              </div>
            </div>

            {/* 2 Rak'at Steps */}
            <div className="flex md:grid md:grid-cols-2 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 gap-6 md:gap-8 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
              {eidSteps.map((step) => {
                const isPlaying = playingAudioId === step.id;
                return (
                  <div 
                    key={step.id}
                    className="w-[86vw] sm:w-[440px] md:w-auto shrink-0 snap-center bg-white rounded-3xl p-6 sm:p-7 border border-[#6B1B7E]/15 shadow-lg shadow-purple-900/5 space-y-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-[#6B1B7E] text-white font-black text-sm flex items-center justify-center shrink-0">
                          {step.stepNumber}
                        </span>
                        <div>
                          <h3 className="text-lg font-black text-slate-900">{step.title}</h3>
                          <p className="text-xs text-slate-500 font-medium">{step.subtitle}</p>
                        </div>
                      </div>

                      {step.arabicText && (
                        <button
                          onClick={() => handlePlayArabic(step.id, step.arabicText!)}
                          className="p-2.5 rounded-xl border bg-purple-50 text-[#6B1B7E] border-purple-200 hover:bg-purple-100 transition flex items-center gap-1.5 cursor-pointer"
                        >
                          <Volume2 className="w-4 h-4" />
                          <span className="text-[11px] font-bold">Audio</span>
                        </button>
                      )}
                    </div>

                    {renderPostureVisual(step.visualType)}

                    <p className="text-xs text-slate-700 leading-relaxed font-medium bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <strong>Method:</strong> {step.postureDescription}
                    </p>

                    <div className="space-y-3 pt-2">
                      <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 space-y-1.5">
                        <div className="flex items-center gap-2 text-emerald-800 font-black text-xs uppercase tracking-wide">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{step.doThis.title}</span>
                        </div>
                        <ul className="space-y-1 text-[11px] text-emerald-900">
                          {step.doThis.points.map((pt, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-emerald-600 font-bold">✓</span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-rose-50/80 border border-rose-200 rounded-2xl p-4 space-y-1.5">
                        <div className="flex items-center gap-2 text-rose-800 font-black text-xs uppercase tracking-wide">
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                          <span>{step.avoidThis.title}</span>
                        </div>
                        <ul className="space-y-1 text-[11px] text-rose-900">
                          {step.avoidThis.points.map((pt, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-rose-600 font-bold">✗</span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: NAMAZ-E-JANAZAH (FUNERAL PRAYER) */}
        {activeTab === 'janazah' && (
          <div className="space-y-8 max-w-4xl mx-auto">
            {janazahSteps.map((step) => {
              const isPlaying = playingAudioId === step.id;
              return (
                <div 
                  key={step.id}
                  className="bg-white rounded-3xl p-6 sm:p-9 border border-[#6B1B7E]/15 shadow-xl space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-black text-slate-900">{step.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-500 font-medium">{step.subtitle}</p>
                    </div>

                    <button
                      onClick={() => handlePlayArabic(step.id, step.arabicText!)}
                      className="px-4 py-2 bg-gradient-to-r from-[#6B1B7E] to-[#E0107F] text-white rounded-xl font-bold text-xs transition flex items-center gap-2 cursor-pointer shadow-sm"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>{isPlaying ? 'Playing Audio...' : 'Listen to Janazah Dua'}</span>
                    </button>
                  </div>

                  {/* Janazah Arabic Dua Card */}
                  <div className="bg-purple-50/70 p-6 rounded-3xl border border-purple-200 space-y-3">
                    <p className="font-arabic font-quran text-2xl sm:text-3xl text-right text-slate-900 leading-loose" dir="rtl">
                      {step.arabicText}
                    </p>
                    <p className="text-xs font-bold text-[#6B1B7E]">
                      {step.transliteration}
                    </p>
                    <p className="text-xs text-slate-600 italic">
                      "{step.translation}"
                    </p>
                  </div>

                  {/* Four Takbeerat Breakdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-1">
                      <span className="w-6 h-6 rounded-full bg-[#6B1B7E] text-white text-xs font-bold inline-flex items-center justify-center">1</span>
                      <p className="text-xs font-bold text-slate-900">1st Takbir</p>
                      <p className="text-[10px] text-slate-500">Recite Thana / Surah Al-Fatihah</p>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-1">
                      <span className="w-6 h-6 rounded-full bg-[#6B1B7E] text-white text-xs font-bold inline-flex items-center justify-center">2</span>
                      <p className="text-xs font-bold text-slate-900">2nd Takbir</p>
                      <p className="text-[10px] text-slate-500">Recite Durood Ibrahim</p>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-1">
                      <span className="w-6 h-6 rounded-full bg-[#E0107F] text-white text-xs font-bold inline-flex items-center justify-center">3</span>
                      <p className="text-xs font-bold text-slate-900">3rd Takbir</p>
                      <p className="text-[10px] text-slate-500">Recite Supplication for Deceased</p>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-1">
                      <span className="w-6 h-6 rounded-full bg-[#6B1B7E] text-white text-xs font-bold inline-flex items-center justify-center">4</span>
                      <p className="text-xs font-bold text-slate-900">4th Takbir</p>
                      <p className="text-[10px] text-slate-500">Brief pause then Tasleem (Salam)</p>
                    </div>
                  </div>

                  {/* Do This vs Avoid This */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-5 space-y-2">
                      <div className="flex items-center gap-2 text-emerald-800 font-black text-xs uppercase tracking-wide">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{step.doThis.title}</span>
                      </div>
                      <p className="text-xs text-emerald-950 font-medium">{step.doThis.description}</p>
                      <ul className="space-y-1 text-xs text-emerald-900">
                        {step.doThis.points.map((pt, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-emerald-600 font-bold">✓</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-rose-50/80 border border-rose-200 rounded-2xl p-5 space-y-2">
                      <div className="flex items-center gap-2 text-rose-800 font-black text-xs uppercase tracking-wide">
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        <span>{step.avoidThis.title}</span>
                      </div>
                      <p className="text-xs text-rose-950 font-medium">{step.avoidThis.description}</p>
                      <ul className="space-y-1 text-xs text-rose-900">
                        {step.avoidThis.points.map((pt, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-rose-600 font-bold">✗</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* TAB 4: ROZA (FASTING) - DO THIS & AVOID THIS */}
        {activeTab === 'roza' && (
          <div className="space-y-10 max-w-5xl mx-auto">
            {/* Suhoor & Iftar Duas Bar */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Iftar Dua */}
              <div className="bg-gradient-to-br from-[#6B1B7E] to-[#5B2A9A] text-white p-6 rounded-3xl shadow-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-pink-200">
                    Sunnah Dua at Iftar (Sunset)
                  </span>
                  <button
                    onClick={() => handlePlayArabic('roza-iftar', rozaData.iftarDuaArabic)}
                    className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition cursor-pointer"
                    title="Listen to Iftar Dua"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="font-arabic font-quran text-xl sm:text-2xl text-right leading-relaxed" dir="rtl">
                  {rozaData.iftarDuaArabic}
                </p>
                <div className="text-[11px] text-purple-100 space-y-1 border-t border-white/20 pt-2 font-medium">
                  <p><strong>Pronunciation:</strong> {rozaData.iftarDuaTrans}</p>
                  <p>"{rozaData.iftarDuaMeaning}"</p>
                </div>
              </div>

              {/* Suhoor (Sehri) Intention */}
              <div className="bg-gradient-to-br from-[#5B2A9A] to-[#E0107F] text-white p-6 rounded-3xl shadow-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-pink-200">
                    Niyyah for Fasting (Suhoor)
                  </span>
                  <button
                    onClick={() => handlePlayArabic('roza-suhoor', rozaData.suhoorDuaArabic)}
                    className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition cursor-pointer"
                    title="Listen to Suhoor Dua"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="font-arabic font-quran text-xl sm:text-2xl text-right leading-relaxed" dir="rtl">
                  {rozaData.suhoorDuaArabic}
                </p>
                <div className="text-[11px] text-purple-100 space-y-1 border-t border-white/20 pt-2 font-medium">
                  <p><strong>Pronunciation:</strong> {rozaData.suhoorDuaTrans}</p>
                  <p>"{rozaData.suhoorDuaMeaning}"</p>
                </div>
              </div>
            </div>

            {/* Do This vs Avoid This Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* DO THIS (Roza Sunnahs & Virtues) */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-emerald-200 shadow-md space-y-5">
                <div className="flex items-center gap-2 pb-3 border-b border-emerald-100 text-emerald-800">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  <div>
                    <h3 className="text-lg font-black text-slate-900">DO THIS in Roza (Sunnahs)</h3>
                    <p className="text-xs text-emerald-700 font-bold">Actions that multiply reward and embody Taqwa</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {rozaData.doThisList.map((item, idx) => (
                    <div key={idx} className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200/80 space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs font-black text-emerald-950 flex items-center gap-1.5">
                          <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] inline-flex items-center justify-center font-bold">✓</span>
                          <span>{item.title}</span>
                        </h4>
                        <span className="text-[10px] text-emerald-700 font-bold bg-white px-2 py-0.5 rounded-full border border-emerald-200">
                          {item.hadith}
                        </span>
                      </div>
                      <p className="text-xs text-emerald-900 leading-relaxed font-medium">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* AVOID THIS (Nullifiers & Pitfalls) */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-rose-200 shadow-md space-y-5">
                <div className="flex items-center gap-2 pb-3 border-b border-rose-100 text-rose-800">
                  <XCircle className="w-6 h-6 text-rose-600" />
                  <div>
                    <h3 className="text-lg font-black text-slate-900">AVOID THIS in Roza (Pitfalls)</h3>
                    <p className="text-xs text-rose-700 font-bold">Actions that break the fast or destroy its reward</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {rozaData.avoidThisList.map((item, idx) => (
                    <div key={idx} className="bg-rose-50/70 p-4 rounded-2xl border border-rose-200/80 space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs font-black text-rose-950 flex items-center gap-1.5">
                          <span className="w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] inline-flex items-center justify-center font-bold">✗</span>
                          <span>{item.title}</span>
                        </h4>
                        <span className="text-[10px] text-rose-700 font-bold bg-white px-2 py-0.5 rounded-full border border-rose-200">
                          {item.severity}
                        </span>
                      </div>
                      <p className="text-xs text-rose-900 leading-relaxed font-medium">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Common Myths: What Does NOT Break Fast */}
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-black">
                <ShieldCheck className="w-5 h-5 text-[#6B1B7E]" />
                <h3 className="text-base sm:text-lg">Common Clarifications: What DOES NOT Break the Fast</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {rozaData.permissibleList.map((item, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-2xs">
                    <p className="text-xs font-bold text-[#6B1B7E]">{item.title}</p>
                    <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Bottom CTA & Resource Links */}
        <div className="text-center pt-4">
          <div className="inline-flex flex-wrap items-center justify-center gap-4 p-4 rounded-3xl bg-white border border-[#6B1B7E]/15 shadow-sm">
            <span className="text-xs text-slate-600 font-bold">
              Looking for more guidance?
            </span>

            {onOpenFullQuran && (
              <button
                onClick={onOpenFullQuran}
                className="px-4 py-2 bg-purple-50 hover:bg-purple-100 text-[#6B1B7E] rounded-xl text-xs font-bold border border-[#6B1B7E]/20 transition flex items-center gap-1.5 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#E0107F]" />
                <span>Read Full Quran (114 Surahs)</span>
              </button>
            )}

            {onOpenDuas && (
              <button
                onClick={onOpenDuas}
                className="px-4 py-2 bg-gradient-to-r from-[#6B1B7E] to-[#E0107F] text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Authentic Duas Library</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
