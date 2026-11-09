export interface WordByWord {
  arabic: string;
  transliteration: string;
  english: string;
}

export interface KalimaItem {
  id: number;
  name: string;
  arabicName: string;
  meaningTitle: string;
  arabicText: string;
  transliteration: string;
  translation: string;
  explanation: string;
  virtues: string[];
  wordByWord: WordByWord[];
  testBlanks?: {
    sentence: string;
    missingWord: string;
    options: string[];
  };
}

export const SIX_KALIMAS: KalimaItem[] = [
  {
    id: 1,
    name: 'First Kalima: Tayyibah',
    arabicName: 'الكَلِمَةُ الطَّيِّبَة (كَلِمَةُ التَّوْحِيد)',
    meaningTitle: 'The Word of Purity & Divine Oneness',
    arabicText: 'لَا إِلَٰهَ إِلَّا اللَّهُ مُحَمَّدٌ رَّسُولُ اللَّهِ',
    transliteration: 'La ilaha illallahu Muhammadur-Rasoolullah.',
    translation: 'There is no deity worthy of worship except Allah, and Muhammad is the Messenger of Allah.',
    explanation: 'This is the foundational declaration of Islam. The first part negates all false gods, idols, and selfish desires, affirming exclusive worship to Allah alone. The second part confirms that Prophet Muhammad ﷺ is Allah\'s final messenger, whose Sunnah and teachings guide our life.',
    virtues: [
      'The key to entering Paradise (Jannah).',
      'The heaviest deed on the Scales on the Day of Judgment.',
      'Cleanses the heart from spiritual doubts and polytheism (Shirk).'
    ],
    wordByWord: [
      { arabic: 'لَا', transliteration: 'La', english: 'No' },
      { arabic: 'إِلَٰهَ', transliteration: 'Ilaha', english: 'Deity / god worthy of worship' },
      { arabic: 'إِلَّا', transliteration: 'Illa', english: 'Except' },
      { arabic: 'اللَّهُ', transliteration: 'Allah', english: 'Allah (The One True God)' },
      { arabic: 'مُحَمَّدٌ', transliteration: 'Muhammadun', english: 'Muhammad ﷺ' },
      { arabic: 'رَسُولُ', transliteration: 'Rasoolu', english: 'Messenger of' },
      { arabic: 'اللَّهِ', transliteration: 'Allah', english: 'Allah' }
    ]
  },
  {
    id: 2,
    name: 'Second Kalima: Shahadat',
    arabicName: 'كَلِمَةُ الشَّهَادَة',
    meaningTitle: 'The Word of Testimony & Witness',
    arabicText: 'أَشْهَدُ أَنْ لَّا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
    transliteration: 'Ash-hadu alla ilaha illallahu wahdahu la shareeka lahu wa ash-hadu anna Muhammadan \'abduhu wa rasooluh.',
    translation: 'I bear witness that there is no deity worthy of worship except Allah, Who is Alone and has no partner; and I bear witness that Muhammad is His servant and Messenger.',
    explanation: 'Shahadat means conscious, wholehearted testimony. We testify with our tongue and heart that Allah is singular without equal, and that Prophet Muhammad ﷺ is His beloved servant and noble messenger, sent as a mercy to all creation.',
    virtues: [
      'Recited after completing Wudu opens all eight gates of Paradise.',
      'Affirms both the servitude (\'Abd) and messengerhood (Rasool) of Prophet Muhammad ﷺ.',
      'Guards against exaggerating prophets beyond human servanthood.'
    ],
    wordByWord: [
      { arabic: 'أَشْهَدُ', transliteration: 'Ash-hadu', english: 'I bear witness' },
      { arabic: 'أَنْ', transliteration: 'an', english: 'that' },
      { arabic: 'لَّا إِلَٰهَ', transliteration: 'la ilaha', english: 'there is no deity' },
      { arabic: 'إِلَّا اللَّهُ', transliteration: 'illallah', english: 'except Allah' },
      { arabic: 'وَحْدَهُ', transliteration: 'wahdahu', english: 'He is alone' },
      { arabic: 'لَا شَرِيكَ لَهُ', transliteration: 'la shareeka lah', english: 'He has no partner' },
      { arabic: 'وَأَشْهَدُ', transliteration: 'wa ash-hadu', english: 'and I bear witness' },
      { arabic: 'أَنَّ مُحَمَّدًا', transliteration: 'anna Muhammadan', english: 'that Muhammad ﷺ' },
      { arabic: 'عَبْدُهُ', transliteration: '\'abduhu', english: 'is His servant' },
      { arabic: 'وَرَسُولُهُ', transliteration: 'wa rasooluh', english: 'and His messenger' }
    ]
  },
  {
    id: 3,
    name: 'Third Kalima: Tamjeed',
    arabicName: 'كَلِمَةُ التَّمْجِيد',
    meaningTitle: 'The Word of Glorification & Exaltation',
    arabicText: 'سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَٰهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ',
    transliteration: 'Subhanallahi wal-hamdu lillahi wa la ilaha illallahu wallahu Akbar, wa la hawla wa la quwwata illa billahil-\'Aliyyil-\'Adheem.',
    translation: 'Glory be to Allah, and all praise is for Allah, and there is no deity worthy of worship except Allah, and Allah is the Greatest; and there is no might nor power except with Allah, the Most High, the Most Magnificent.',
    explanation: 'Kalima Tamjeed combines the four most beloved phrases to Allah (Tasbih, Tahmid, Tahlil, Takbir) with Hawqalah. It acknowledges that human beings possess no independent power or ability except through the grace and might of the Almighty.',
    virtues: [
      'The four phrases most beloved to Allah in speech.',
      'Plants trees for the believer in Paradise.',
      'Forgives sins even if they are as abundant as foam on the sea.'
    ],
    wordByWord: [
      { arabic: 'سُبْحَانَ اللَّهِ', transliteration: 'Subhanallah', english: 'Glory be to Allah' },
      { arabic: 'وَالْحَمْدُ لِلَّهِ', transliteration: 'wal-hamdu lillah', english: 'and all praise is for Allah' },
      { arabic: 'وَلَا إِلَٰهَ إِلَّا اللَّهُ', transliteration: 'wa la ilaha illallah', english: 'and none is worthy of worship except Allah' },
      { arabic: 'وَاللَّهُ أَكْبَرُ', transliteration: 'wallahu Akbar', english: 'and Allah is the Greatest' },
      { arabic: 'وَلَا حَوْلَ', transliteration: 'wa la hawla', english: 'and there is no might' },
      { arabic: 'وَلَا قُوَّةَ', transliteration: 'wa la quwwata', english: 'nor power' },
      { arabic: 'إِلَّا بِاللَّهِ', transliteration: 'illa billah', english: 'except with Allah' },
      { arabic: 'الْعَلِيِّ الْعَظِيمِ', transliteration: 'al-\'Aliyyil-\'Adheem', english: 'the Most High, the Magnificent' }
    ]
  },
  {
    id: 4,
    name: 'Fourth Kalima: Tauheed',
    arabicName: 'كَلِمَةُ التَّوْحِيد',
    meaningTitle: 'The Word of Absolute Monotheism',
    arabicText: 'لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، يُحْيِي وَيُمِيتُ، وَهُوَ حَيٌّ لَّا يَمُوتُ أَبَدًا أَبَدًا، ذُو الْجَلَالِ وَالْإِكْرَامِ، بِيَدِهِ الْخَيْرُ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ',
    transliteration: 'La ilaha illallahu wahdahu la shareeka lahu, lahul-mulku wa lahul-hamdu, yuhyi wa yumeetu, wa Huwa hayyul-la yamootu abadan abada, Dhul-Jalali wal-Ikram, biyadihil-khayr, wa Huwa \'ala kulli shay\'in Qadeer.',
    translation: 'There is no deity worthy of worship except Allah, Who is Alone and has no partner. To Him belongs sovereignty and to Him belongs all praise. He gives life and causes death, and He is Ever-Living and never dies. Possessor of Majesty and Honor! In His hand is all goodness, and He has power over all things.',
    explanation: 'Tauheed is the cornerstone of Islamic theology. This Kalima describes Allah\'s eternal nature: He has no beginning and no end, sovereign over the heavens and earth, holding life, death, resurrection, and the ultimate destiny of all beings in His control.',
    virtues: [
      'Reciting it 100 times daily rewards the liberation of 10 slaves and writes 100 good deeds.',
      'Acts as an impenetrable shield against the whisperings of Satan.',
      'Removes 100 misdeeds and bestows supreme peace of mind.'
    ],
    wordByWord: [
      { arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ', transliteration: 'La ilaha illallah', english: 'None worthy of worship except Allah' },
      { arabic: 'وَحْدَهُ', transliteration: 'wahdahu', english: 'alone' },
      { arabic: 'لَا شَرِيكَ لَهُ', transliteration: 'la shareeka lah', english: 'with no partner' },
      { arabic: 'لَهُ الْمُلْكُ', transliteration: 'lahul-mulk', english: 'to Him belongs dominion' },
      { arabic: 'وَلَهُ الْحَمْدُ', transliteration: 'wa lahul-hamd', english: 'and to Him belongs all praise' },
      { arabic: 'يُحْيِي وَيُمِيتُ', transliteration: 'yuhyi wa yumeet', english: 'He grants life and causes death' },
      { arabic: 'وَهُوَ حَيٌّ لَّا يَمُوتُ', transliteration: 'wa Huwa hayyun la yamoot', english: 'and He is Ever-Living, never dies' },
      { arabic: 'ذُو الْجَلَالِ وَالْإِكْرَامِ', transliteration: 'Dhul-Jalali wal-Ikram', english: 'Owner of Majesty and Honor' },
      { arabic: 'بِيَدِهِ الْخَيْرُ', transliteration: 'biyadihil-khayr', english: 'in His Hand is all good' },
      { arabic: 'عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ', transliteration: '\'ala kulli shay\'in Qadeer', english: 'over all things Omnipotent' }
    ]
  },
  {
    id: 5,
    name: 'Fifth Kalima: Astaghfar',
    arabicName: 'كَلِمَةُ الاسْتِغْفَار',
    meaningTitle: 'The Word of Sincere Penitence & Forgiveness',
    arabicText: 'أَسْتَغْفِرُ اللَّهَ رَبِّي مِنْ كُلِّ ذَنْبٍ أَذْنَبْتُهُ عَمْدًا أَوْ خَطَأً سِرًّا أَوْ عَلَانِيَةً، وَأَتُوبُ إِلَيْهِ مِنَ الذَّنْبِ الَّذِي أَعْلَمُ وَمِنَ الذَّنْبِ الَّذِي لَا أَعْلَمُ، إِنَّكَ أَنْتَ عَلَّامُ الْغُيُوبِ وَسَتَّارُ الْعُيُوبِ وَغَفَّارُ الذُّنُوبِ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ',
    transliteration: 'Astaghfirullaha Rabbi min kulli dhanbin adhnabtuhu \'amdan aw khata\'an, sirran aw \'alaniyyatan, wa atoobu ilayhi minadh-dhanbil-ladhi a\'lamu wa minadh-dhanbil-ladhi la a\'lam, innaka Anta \'Allamul-Ghuyoobi wa Sattarul-\'Uyoobi wa Ghaffarudh-Dhunoobi wa la hawla wa la quwwata illa billahil-\'Aliyyil-\'Adheem.',
    translation: 'I seek forgiveness from Allah, my Lord, for every sin I committed deliberately or by error, secretly or openly; and I turn to Him in repentance from the sin that I know and from the sin that I do not know. Truly You are the Knower of the unseen, the Concealer of faults, and the Forgiver of sins; and there is no might nor power except with Allah, the Most High, the Most Magnificent.',
    explanation: 'Astaghfar is turning humbly to Allah to wash away human lapses. It covers conscious transgressions and unintentional errors, recognizing that Allah conceals our faults and forgives when we turn with a sincere, penitent heart.',
    virtues: [
      'Brings relief from every anxiety and a way out of every difficulty.',
      'Increases spiritual tranquility, sustenance, and rainfall.',
      'The Prophet ﷺ sought forgiveness from Allah more than 70 to 100 times every day.'
    ],
    wordByWord: [
      { arabic: 'أَسْتَغْفِرُ اللَّهَ', transliteration: 'Astaghfirullah', english: 'I seek forgiveness of Allah' },
      { arabic: 'رَبِّي', transliteration: 'Rabbi', english: 'my Lord' },
      { arabic: 'مِنْ كُلِّ ذَنْبٍ', transliteration: 'min kulli dhanb', english: 'from every sin' },
      { arabic: 'عَمْدًا أَوْ خَطَأً', transliteration: '\'amdan aw khata\'an', english: 'deliberately or accidentally' },
      { arabic: 'سِرًّا أَوْ عَلَانِيَةً', transliteration: 'sirran aw \'alaniyah', english: 'secretly or openly' },
      { arabic: 'وَأَتُوبُ إِلَيْهِ', transliteration: 'wa atoobu ilayh', english: 'and I repent to Him' },
      { arabic: 'عَلَّامُ الْغُيُوبِ', transliteration: '\'Allamul-Ghuyoob', english: 'Knower of the unseen' },
      { arabic: 'سَتَّارُ الْعُيُوبِ', transliteration: 'Sattarul-\'Uyoob', english: 'Concealer of faults' },
      { arabic: 'غَفَّارُ الذُّنُوبِ', transliteration: 'Ghaffarudh-Dhunoob', english: 'Forgiver of sins' }
    ]
  },
  {
    id: 6,
    name: 'Sixth Kalima: Radd-e-Kufr',
    arabicName: 'كَلِمَةُ رَدِّ الكُفْر',
    meaningTitle: 'The Word of Refutation of Disbelief & Shirk',
    arabicText: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ أَنْ أُشْرِكَ بِكَ شَيْئًا وَأَنَا أَعْلَمُ بِهِ، وَأَسْتَغْفِرُكَ لِمَا لَا أَعْلَمُ بِهِ، تُبْتُ عَنْهُ وَتَبَرَّأْتُ مِنَ الْكُفْرِ وَالشِّرْكِ وَالْكِذْبِ وَالْغِيبَةِ وَالْبِدْعَةِ وَالنَّمِيمَةِ وَالْفَوَاحِشِ وَالْبُهْتَانِ وَالْمَعَاصِي كُلِّهَا، وَأَسْلَمْتُ وَأَقُولُ لَا إِلَٰهَ إِلَّا اللَّهُ مُحَمَّدٌ رَّسُولُ اللَّهِ',
    transliteration: 'Allahumma inni a\'udhu bika min an ushrika bika shay\'an wa ana a\'lamu bih, wa astaghfiruka lima la a\'lamu bih, tubtu \'anhu wa tabarra\'tu minal-kufri wash-shirki wal-kidhbi wal-gheebati wal-bid\'ati wan-nameemati wal-fawahishi wal-buhtani wal-ma\'asi kulliha, wa aslamtu wa aqoolu: La ilaha illallahu Muhammadur-Rasoolullah.',
    translation: 'O Allah! I seek refuge in You from knowingly associating any partner with You, and I ask Your forgiveness for that which I do not know. I repent from it, and I disassociate myself from disbelief, polytheism, lying, backbiting, religious innovations, tale-bearing, lewdness, slander, and all acts of disobedience. I have submitted to You, and I say: There is no deity worthy of worship except Allah, and Muhammad is the Messenger of Allah.',
    explanation: 'Radd-e-Kufr is a protective shield against intentional or hidden polytheism (Riya / ostentation) and major moral spiritual vices. It serves as an active renewal of faith, disowning slander, backbiting, and disobedience, while re-anchoring upon pure Tawheed.',
    virtues: [
      'Protects from minor Shirk (hypocrisy, showing off in good deeds).',
      'Purifies tongue and character from destructive habits like backbiting and lying.',
      'Acts as a comprehensive renewal of the Muslim pledge of allegiance to Allah.'
    ],
    wordByWord: [
      { arabic: 'أَعُوذُ بِكَ', transliteration: 'a\'udhu bika', english: 'I seek refuge in You' },
      { arabic: 'مِنْ أَنْ أُشْرِكَ بِكَ', transliteration: 'min an ushrika bik', english: 'from associating partners with You' },
      { arabic: 'وَأَسْتَغْفِرُكَ', transliteration: 'wa astaghfiruk', english: 'and I seek Your forgiveness' },
      { arabic: 'تُبْتُ عَنْهُ', transliteration: 'tubtu \'anh', english: 'I have repented from it' },
      { arabic: 'وَتَبَرَّأْتُ', transliteration: 'wa tabarra\'t', english: 'and disassociated myself' },
      { arabic: 'مِنَ الْكُفْرِ وَالشِّرْكِ', transliteration: 'minal-kufri wash-shirk', english: 'from disbelief and polytheism' },
      { arabic: 'وَالْغِيبَةِ وَالْبُهْتَانِ', transliteration: 'wal-gheebati wal-buhtan', english: 'and backbiting and slander' },
      { arabic: 'وَأَسْلَمْتُ', transliteration: 'wa aslamtu', english: 'and I have submitted' }
    ]
  }
];
