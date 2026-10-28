export interface QuranAyah {
  numberInSurah: number;
  arabic: string;
  transliteration: string;
  translation: string;
  audioKey: string; // e.g. "001001" for Surah 1 Ayah 1
}

export interface QuranSurah {
  number: number;
  name: string;
  englishName: string;
  englishTranslation: string;
  revelationType: 'Meccan' | 'Medinan';
  ayahsCount: number;
  description: string;
  ayahs: QuranAyah[];
}

export interface QuranReciter {
  id: string;
  name: string;
  title: string;
  country: string;
  style: string;
  audioBaseUrl: string; // EveryAyah CDN path (Open non-copyright public domain)
  avatar: string;
}

export const POPULAR_RECITERS: QuranReciter[] = [
  {
    id: 'alafasy',
    name: 'Sheikh Mishary Rashid Alafasy',
    title: 'World-Renowned Kuwaiti Qari & Imam',
    country: 'Kuwait',
    style: 'Soulful, Melodious & Clear Tarteel',
    audioBaseUrl: 'https://everyayah.com/data/Alafasy_128kbps/',
    avatar: 'MA'
  },
  {
    id: 'sudais',
    name: 'Sheikh Abdul Rahman Al-Sudais',
    title: 'Chief Imam of Masjid al-Haram, Makkah',
    country: 'Saudi Arabia',
    style: 'Powerful, Emotive & Historic Haram Recitation',
    audioBaseUrl: 'https://everyayah.com/data/Abdurrahmaan_As-Sudais_192kbps/',
    avatar: 'AS'
  },
  {
    id: 'husary',
    name: 'Sheikh Mahmoud Khalil Al-Husary',
    title: 'Master of Tajweed & Classical Mu\'allim',
    country: 'Egypt',
    style: 'Exact Teaching Pace & Standard Tajweed Rules',
    audioBaseUrl: 'https://everyayah.com/data/Husary_128kbps/',
    avatar: 'KH'
  },
  {
    id: 'muaiqly',
    name: 'Sheikh Maher Al-Muaiqly',
    title: 'Beloved Imam of Masjid al-Haram',
    country: 'Saudi Arabia',
    style: 'Rhythmic, Moving & Deeply Contemplative',
    audioBaseUrl: 'https://everyayah.com/data/MaherAlMuaiqly128kbps/',
    avatar: 'MM'
  },
  {
    id: 'ghamdi',
    name: 'Sheikh Saad Al-Ghamdi',
    title: 'Distinguished Saudi Reciter & Scholar',
    country: 'Saudi Arabia',
    style: 'Fluent, Smooth & Soothing Cadence',
    audioBaseUrl: 'https://everyayah.com/data/Ghamadi_40kbps/',
    avatar: 'SG'
  }
];

export const QURAN_SURAHS: QuranSurah[] = [
  {
    number: 1,
    name: 'الفَاتِحَة',
    englishName: 'Al-Fatihah',
    englishTranslation: 'The Opening',
    revelationType: 'Meccan',
    ayahsCount: 7,
    description: 'The foundation of the Quran, recited in every unit of prayer. Essential for beginners.',
    ayahs: [
      {
        numberInSurah: 1,
        arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        transliteration: 'Bismillahir-Rahmanir-Raheem',
        translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
        audioKey: '001001'
      },
      {
        numberInSurah: 2,
        arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
        transliteration: 'Al-hamdu lillahi Rabbil-\'aalameen',
        translation: '[All] praise is [due] to Allah, Lord of the worlds -',
        audioKey: '001002'
      },
      {
        numberInSurah: 3,
        arabic: 'الرَّحْمَٰنِ الرَّحِيمِ',
        transliteration: 'Ar-Rahmanir-Raheem',
        translation: 'The Entirely Merciful, the Especially Merciful,',
        audioKey: '001003'
      },
      {
        numberInSurah: 4,
        arabic: 'مَالِكِ يَوْمِ الدِّينِ',
        transliteration: 'Maliki Yawmid-Deen',
        translation: 'Sovereign of the Day of Recompense.',
        audioKey: '001004'
      },
      {
        numberInSurah: 5,
        arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
        transliteration: 'Iyyaka na\'budu wa iyyaka nasta\'een',
        translation: 'It is You we worship and You we ask for help.',
        audioKey: '001005'
      },
      {
        numberInSurah: 6,
        arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
        transliteration: 'Ihdinas-Siraatal-Mustaqeem',
        translation: 'Guide us to the straight path -',
        audioKey: '001006'
      },
      {
        numberInSurah: 7,
        arabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
        transliteration: 'Siraatal-ladheena an\'amta \'alayhim ghayril-maghdoobi \'alayhim wa lad-daalleen',
        translation: 'The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.',
        audioKey: '001007'
      }
    ]
  },
  {
    number: 112,
    name: 'الإِخْلَاص',
    englishName: 'Al-Ikhlas',
    englishTranslation: 'The Sincerity',
    revelationType: 'Meccan',
    ayahsCount: 4,
    description: 'Equivalent to one-third of the Quran in virtue, declaring the absolute oneness of Allah.',
    ayahs: [
      {
        numberInSurah: 1,
        arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
        transliteration: 'Qul Huwallahu Ahad',
        translation: 'Say, "He is Allah, [who is] One,',
        audioKey: '112001'
      },
      {
        numberInSurah: 2,
        arabic: 'اللَّهُ الصَّمَدُ',
        transliteration: 'Allahus-Samad',
        translation: 'Allah, the Eternal Refuge.',
        audioKey: '112002'
      },
      {
        numberInSurah: 3,
        arabic: 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
        transliteration: 'Lam yalid wa lam yoolad',
        translation: 'He neither begets nor is born,',
        audioKey: '112003'
      },
      {
        numberInSurah: 4,
        arabic: 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
        transliteration: 'Wa lam yakul-lahu kufuwan ahad',
        translation: 'Nor is there to Him any equivalent."',
        audioKey: '112004'
      }
    ]
  },
  {
    number: 113,
    name: 'الفَلَق',
    englishName: 'Al-Falaq',
    englishTranslation: 'The Daybreak',
    revelationType: 'Meccan',
    ayahsCount: 5,
    description: 'Protection supplication against the evil of created things and envy.',
    ayahs: [
      {
        numberInSurah: 1,
        arabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ',
        transliteration: 'Qul a\'oodhu bi Rabbil-falaq',
        translation: 'Say, "I seek refuge in the Lord of daybreak',
        audioKey: '113001'
      },
      {
        numberInSurah: 2,
        arabic: 'مِن شَرِّ مَا خَلَقَ',
        transliteration: 'Min sharri ma khalaq',
        translation: 'From the evil of that which He created',
        audioKey: '113002'
      },
      {
        numberInSurah: 3,
        arabic: 'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ',
        transliteration: 'Wa min sharri ghasiqin idha waqab',
        translation: 'And from the evil of darkness when it settles',
        audioKey: '113003'
      },
      {
        numberInSurah: 4,
        arabic: 'وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ',
        transliteration: 'Wa min sharrin-naffathati fil-\'uqad',
        translation: 'And from the evil of the blowers in knots',
        audioKey: '113004'
      },
      {
        numberInSurah: 5,
        arabic: 'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
        transliteration: 'Wa min sharri hasidin idha hasad',
        translation: 'And from the evil of an envier when he envies."',
        audioKey: '113005'
      }
    ]
  },
  {
    number: 114,
    name: 'النَّاس',
    englishName: 'An-Nas',
    englishTranslation: 'Mankind',
    revelationType: 'Meccan',
    ayahsCount: 6,
    description: 'The final chapter of the Quran, seeking divine sanctuary against insidious whisperings.',
    ayahs: [
      {
        numberInSurah: 1,
        arabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ',
        transliteration: 'Qul a\'oodhu bi Rabbin-nas',
        translation: 'Say, "I seek refuge in the Lord of mankind,',
        audioKey: '114001'
      },
      {
        numberInSurah: 2,
        arabic: 'مَلِكِ النَّاسِ',
        transliteration: 'Malikin-nas',
        translation: 'The Sovereign of mankind,',
        audioKey: '114002'
      },
      {
        numberInSurah: 3,
        arabic: 'إِلَٰهِ النَّاسِ',
        transliteration: 'Ilahin-nas',
        translation: 'The God of mankind,',
        audioKey: '114003'
      },
      {
        numberInSurah: 4,
        arabic: 'مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ',
        transliteration: 'Min sharril-waswasil-khannas',
        translation: 'From the evil of the retreating whisperer -',
        audioKey: '114004'
      },
      {
        numberInSurah: 5,
        arabic: 'الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ',
        transliteration: 'Al-ladhee yuwaswisu fee sudoorin-nas',
        translation: 'Who whispers [evil] into the breasts of mankind -',
        audioKey: '114005'
      },
      {
        numberInSurah: 6,
        arabic: 'مِنَ الْجِنَّةِ وَالنَّاسِ',
        transliteration: 'Minal-jinnati wan-nas',
        translation: 'From among the jinn and mankind."',
        audioKey: '114006'
      }
    ]
  },
  {
    number: 108,
    name: 'الكَوْثَر',
    englishName: 'Al-Kawthar',
    englishTranslation: 'The Abundance',
    revelationType: 'Meccan',
    ayahsCount: 3,
    description: 'The shortest chapter of the Quran, promising the heavenly river of Al-Kawthar.',
    ayahs: [
      {
        numberInSurah: 1,
        arabic: 'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ',
        transliteration: 'Inna a\'taynakal-kawthar',
        translation: 'Indeed, We have granted you, [O Muhammad], al-Kawthar.',
        audioKey: '108001'
      },
      {
        numberInSurah: 2,
        arabic: 'فَصَلِّ لِرَبِّكَ وَانْحَرْ',
        transliteration: 'Fasalli li Rabbika wanhar',
        translation: 'So pray to your Lord and sacrifice [to Him alone].',
        audioKey: '108002'
      },
      {
        numberInSurah: 3,
        arabic: 'إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ',
        transliteration: 'Inna shani\'aka huwal-abtar',
        translation: 'Indeed, your enemy is the one cut off.',
        audioKey: '108003'
      }
    ]
  },
  {
    number: 103,
    name: 'العَصْر',
    englishName: 'Al-Asr',
    englishTranslation: 'The Declining Day / Time',
    revelationType: 'Meccan',
    ayahsCount: 3,
    description: 'Imam Al-Shafi\'i noted that if only this Surah was revealed, it would suffice humanity.',
    ayahs: [
      {
        numberInSurah: 1,
        arabic: 'وَالْعَصْرِ',
        transliteration: 'Wal-\'asr',
        translation: 'By time,',
        audioKey: '103001'
      },
      {
        numberInSurah: 2,
        arabic: 'إِنَّ الْإِنسَانَ لَفِي خُسْرٍ',
        transliteration: 'Innal-insana lafee khusr',
        translation: 'Indeed, mankind is in loss,',
        audioKey: '103002'
      },
      {
        numberInSurah: 3,
        arabic: 'إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ',
        transliteration: 'Illal-ladheena aamanoo wa \'amilus-saalihaati wa tawaasaw bil-haqqi wa tawaasaw bis-sabr',
        translation: 'Except for those who have believed and done righteous deeds and advised each other to truth and advised each other to patience.',
        audioKey: '103003'
      }
    ]
  },
  {
    number: 67,
    name: 'المُلْك',
    englishName: 'Al-Mulk',
    englishTranslation: 'The Sovereignty',
    revelationType: 'Meccan',
    ayahsCount: 4, // Opening key section
    description: 'The interceding chapter that protects against the trial of the grave.',
    ayahs: [
      {
        numberInSurah: 1,
        arabic: 'تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ',
        transliteration: 'Tabarakal-ladhee biyadihil-mulku wa Huwa \'ala kulli shay\'in Qadeer',
        translation: 'Blessed is He in whose hand is dominion, and He is over all things competent -',
        audioKey: '067001'
      },
      {
        numberInSurah: 2,
        arabic: 'الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا ۚ وَهُوَ الْعَزِيزُ الْغَفُورُ',
        transliteration: 'Alladhee khalaqal-mawta wal-hayata liyabluwakum ayyukum ahsanu \'amala, wa Huwal-\'Azeezul-Ghafoor',
        translation: '[He] who created death and life to test you [as to] which of you is best in deed - and He is the Exalted in Might, the Forgiving -',
        audioKey: '067002'
      },
      {
        numberInSurah: 3,
        arabic: 'الَّذِي خَلَقَ سَبْعَ سَمَاوَاتٍ طِبَاقًا ۖ مَّا تَرَىٰ فِي خَلْقِ الرَّحْمَٰنِ مِن تَفَاوُتٍ ۖ فَارْجِعِ الْبَصَرَ هَلْ تَرَىٰ مِن فُطُورٍ',
        transliteration: 'Alladhee khalaqa sab\'a samawatin tibaqa, ma tara fee khalqir-Rahmani min tafawut, farji\'il-basara hal tara min futoor',
        translation: '[And] who created seven heavens in layers. You see no flaw in the creation of the Most Merciful. So turn your vision [again]; can you see any breaks?',
        audioKey: '067003'
      },
      {
        numberInSurah: 4,
        arabic: 'ثُمَّ ارْجِعِ الْبَصَرَ كَرَّتَيْنِ يَنقَلِبْ إِلَيْكَ الْبَصَرُ خَاسِئًا وَهُوَ حَسِيرٌ',
        transliteration: 'Thummar-ji\'il-basara karratayni yanqalib ilaykal-basaru khasi\'an wa huwa haseer',
        translation: 'Then return [your] vision twice again. [Your] vision will return to you humbled while it is fatigued.',
        audioKey: '067004'
      }
    ]
  }
];
