export interface IslamicPillar {
  id: number;
  name: string;
  arabicName: string;
  translation: string;
  summary: string;
  importance: string;
  rulesAndMethod: string[];
  benefits: string[];
  quranicVerses: Array<{
    arabic: string;
    transliteration: string;
    english: string;
    reference: string;
    explanation: string;
  }>;
}

export const FIVE_PILLARS_DATA: IslamicPillar[] = [
  {
    id: 1,
    name: 'Shahadah (Declaration of Faith)',
    arabicName: 'الشَّهَادَة',
    translation: 'The Testimony that there is no god but Allah, and Muhammad is His Messenger',
    summary: 'The gateway to Islam and its supreme foundation. Everything in a believer\'s life branches out from this pure monotheistic testimony.',
    importance: 'The fundamental condition for any good deed to be accepted by Allah. Without Tawheed and affirmation of the finality of Prophet Muhammad ﷺ, no act of worship is valid.',
    rulesAndMethod: [
      'Must be uttered with sincere intention (Ikhlas), without coercion.',
      'Requires knowing the meaning (Ilm), having certain conviction (Yaqeen), and submitting willingly (Qubool).',
      'Requires living by its dictates: worshiping Allah exclusively and following the Sunnah.'
    ],
    benefits: [
      'Guarantees ultimate salvation and freedom from eternal punishment.',
      'Unifies the mind and heart under the loving sovereignty of One Creator.',
      'Liberates the human soul from subservience to creation, superstitions, and tyranny.'
    ],
    quranicVerses: [
      {
        arabic: 'فَاعْلَمْ أَنَّهُ لَا إِلَٰهَ إِلَّا اللَّهُ وَاسْتَغْفِرْ لِذَنبِكَ',
        transliteration: 'Fa\'lam annahu la ilaha illallahu was-taghfir lidhambik.',
        english: 'So know that there is no deity worthy of worship except Allah, and ask forgiveness for your sin.',
        reference: 'Surah Muhammad (47:19)',
        explanation: 'Allah commands knowledge of Tawheed first before action and repentance.'
      }
    ]
  },
  {
    id: 2,
    name: 'Salah (Five Daily Prayers)',
    arabicName: 'الصَّلَاة',
    translation: 'The Five Obligatory Daily Prayers',
    summary: 'The spiritual lifeline connecting the servant directly to Allah five times every single day from dawn until night.',
    importance: 'The second pillar of Islam and the very first matter a person will be questioned about on the Day of Judgment. It is the distinct boundary marker of faith.',
    rulesAndMethod: [
      'Prescribed five times: Fajr, Dhuhr, Asr, Maghrib, and Isha at specific celestial times.',
      'Requires physical ritual purity (Wudu / Ghusl), facing the Ka\'bah in Makkah, and covering the body modesty (Satr).',
      'Follows fixed postures of humble standing (Qiyam), bowing (Ruku), and prostration (Sujood).'
    ],
    benefits: [
      'Restrains from immorality, evil speech, and sinful wrongdoing.',
      'Acts like a river washing away daily missteps and spiritual dirt five times a day.',
      'Instills punctuality, discipline, brotherhood, and supreme inner peace.'
    ],
    quranicVerses: [
      {
        arabic: 'إِنَّ الصَّلَاةَ تَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنكَرِ',
        transliteration: 'Innas-Salata tanha \'anil-fahsha\'i wal-munkar.',
        english: 'Indeed, prayer prohibits immorality and wrongdoing.',
        reference: 'Surah Al-\'Ankabut (29:45)',
        explanation: 'Proper, mindful prayer actively transforms human conduct into goodness.'
      }
    ]
  },
  {
    id: 3,
    name: 'Zakat (Obligatory Charity)',
    arabicName: 'الزَّكَاة',
    translation: 'The 2.5% Annual Wealth Purification',
    summary: 'An obligatory annual contribution from personal surplus wealth to support the poor, needy, and designated categories in the Quran.',
    importance: 'Purifies wealth from greed, ensures wealth does not circulate only among the rich, and establishes economic justice and compassion in society.',
    rulesAndMethod: [
      'Levied at 2.5% on qualifying wealth (savings, gold, silver, investments, trade goods) held continuously above the Nisab threshold for one full lunar year (Hawl).',
      'Nisab threshold equals 87.48 grams of gold or 612.36 grams of silver.',
      'Distributed strictly among eight categories specified in Surah At-Tawbah (9:60).'
    ],
    benefits: [
      'Purifies the giver\'s heart from avarice and stinginess.',
      'Alleviates poverty, debt, and hardship for vulnerable families.',
      'Brings barakah (divine blessing and multiplication) into one\'s earnings.'
    ],
    quranicVerses: [
      {
        arabic: 'خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِم بِهَا',
        transliteration: 'Khudh min amwalihim sadaqatan tutahhiruhum wa tuzakkeehim biha.',
        english: 'Take from their wealth a charity by which you purify them and cause them increase.',
        reference: 'Surah At-Tawbah (9:103)',
        explanation: 'Zakat cleanses the soul of the donor while elevating and aiding the recipient.'
      }
    ]
  },
  {
    id: 4,
    name: 'Sawm (Fasting in Ramadan)',
    arabicName: 'الصَّوْم',
    translation: 'Fasting during the Holy Month of Ramadan',
    summary: 'Abstaining from food, drink, and marital relations from true dawn (Fajr) until sunset (Maghrib) with conscious intention.',
    importance: 'The fourth pillar of Islam, ordained for the entire month of Ramadan to cultivate Taqwa (God-consciousness), self-restraint, and empathy for the hungry.',
    rulesAndMethod: [
      'Obligatory on all healthy, adult, sane Muslims. Travelers, pregnant/nursing mothers, and the sick may make up missed days later.',
      'Eat Sehri (pre-dawn meal) before Fajr, make intention, and avoid backbiting, arguing, and vulgarity.',
      'Hasten to break fast at sunset (Iftar), preferably with fresh dates and water, followed by gratitude.'
    ],
    benefits: [
      'Forgives all prior sins for whoever fasts with faith and seeking Allah\'s reward.',
      'Detoxifies body, mind, and spirit, building profound willpower against cravings.',
      'Cultivates genuine empathy for impoverished people who face hunger every day.'
    ],
    quranicVerses: [
      {
        arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِن قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ',
        transliteration: 'Ya ayyuhal-ladheena aamanu kutiba \'alaykumus-siyamu kama kutiba \'alal-ladheena min qablikum la\'allakum tattaqoon.',
        english: 'O you who have believed, decreed upon you is fasting as it was decreed upon those before you that you may become righteous.',
        reference: 'Surah Al-Baqarah (2:183)',
        explanation: 'Fasting is an ancient prophetic discipline designed to awaken Taqwa.'
      }
    ]
  },
  {
    id: 5,
    name: 'Hajj (Pilgrimage to Makkah)',
    arabicName: 'الحَجّ',
    translation: 'The Once-in-a-Lifetime Pilgrimage to the Holy Ka\'bah',
    summary: 'The grand annual gathering in Makkah, Mina, Arafat, and Muzdalifah during the Islamic month of Dhul Hijjah.',
    importance: 'The fifth pillar of Islam, obligatory once in a lifetime upon every Muslim who is physically, mentally, and financially capable (Istita\'ah).',
    rulesAndMethod: [
      'Enter state of Ihram wearing simple unstitched white cloth, removing all distinctions of wealth or nationality.',
      'Perform Tawaf around the Ka\'bah, Sa\'i between Safa and Marwah.',
      'Stand on the Plain of Arafat on the 9th of Dhul Hijjah—the climax of Hajj.',
      'Spend night at Muzdalifah, stone the pillars representing Satan in Mina, and offer sacrifice.'
    ],
    benefits: [
      'An accepted Hajj (Hajj Mabrur) leaves the pilgrim purified of all past sins, newborn like the day their mother gave birth to them.',
      'The greatest demonstration of human brotherhood and equality in the world.',
      'Reflects the supreme devotion of Prophet Ibrahim and his blessed family.'
    ],
    quranicVerses: [
      {
        arabic: 'وَلِلَّهِ عَلَى النَّاسِ حِجُّ الْبَيْتِ مَنِ اسْتَطَاعَ إِلَيْهِ سَبِيلًا',
        transliteration: 'Wa lillahi \'alan-nasi hijjul-bayti manis-tata\'a ilayhi sabeela.',
        english: 'And due to Allah from the people is a pilgrimage to the House - for whoever is able to find thereto a way.',
        reference: 'Surah Ali \'Imran (3:97)',
        explanation: 'Affirms Hajj as an obligatory divine covenant upon the capable.'
      }
    ]
  }
];

export interface ArticleOfFaith {
  id: number;
  name: string;
  arabicName: string;
  summary: string;
  detailedExplanation: string;
  keyBeliefs: string[];
  quranicReference: {
    verseArabic: string;
    verseEnglish: string;
    reference: string;
  };
  quizQuestion: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export const SIX_ARTICLES_OF_FAITH: ArticleOfFaith[] = [
  {
    id: 1,
    name: 'Belief in Allah (Tawheed)',
    arabicName: 'الإِيمَانُ بِاللَّه',
    summary: 'Belief in the absolute Oneness, uniqueness, and supreme Lordship of Allah without partner, son, parent, or rival.',
    detailedExplanation: 'Tawheed is divided into three key dimensions: 1) Tawheed ar-Rububiyyah (affirming Allah as sole Creator, Provider, and Controller of the universe); 2) Tawheed al-Uluhiyyah (directing all acts of worship exclusively to Allah); and 3) Tawheed al-Asma was-Sifat (affirming all Beautiful Names and Attributes of Allah without distortion or anthropomorphism).',
    keyBeliefs: [
      'Allah has no beginning and no end; He is the First and the Last.',
      'Nothing resembles Allah in any way: "There is nothing like unto Him" (42:11).',
      'No intermediary or saint can share in His divine power or receive worship.'
    ],
    quranicReference: {
      verseArabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
      verseEnglish: 'Say: He is Allah, [who is] One, Allah, the Eternal Refuge. He neither begets nor is born, nor is there to Him any equivalent.',
      reference: 'Surah Al-Ikhlas (112:1-4)'
    },
    quizQuestion: {
      question: 'What is Tawheed al-Uluhiyyah?',
      options: [
        'Believing Allah created the universe',
        'Directing all worship exclusively to Allah alone',
        'Believing in the angels',
        'Fasting during Ramadan'
      ],
      correctIndex: 1,
      explanation: 'Tawheed al-Uluhiyyah means dedicating all acts of prayer, du\'a, sacrifice, and devotion purely to Allah without partners.'
    }
  },
  {
    id: 2,
    name: 'Belief in the Angels (Mala\'ikah)',
    arabicName: 'الإِيمَانُ بِالمَلَائِكَة',
    summary: 'Belief in the noble, unseen celestial beings created from light who carry out Allah\'s divine commands without ever disobeying.',
    detailedExplanation: 'Angels possess no gender, do not eat or drink, and do not experience fatigue. Major archangels include Jibril (Gabriel - conveys revelation), Mikail (Michael - in charge of rain and sustenance), Israfil (Raphael - blows the Trumpet on the Day of Judgment), and the Angel of Death (Malak al-Mawt). Kiraman Katibin record every word and deed of every human being.',
    keyBeliefs: [
      'Created from light (Nur) prior to mankind.',
      'Possess immense power, wings (two, three, four or hundreds), and radiant beauty.',
      'Surround assemblies where the Quran is recited and seek forgiveness for believers.'
    ],
    quranicReference: {
      verseArabic: 'لَّا يَعْصُونَ اللَّهَ مَا أَمَرَهُمْ وَيَفْعَلُونَ مَا يُؤْمَرُونَ',
      verseEnglish: 'They do not disobey Allah in what He commands them but do what they are commanded.',
      reference: 'Surah At-Tahrim (66:6)'
    },
    quizQuestion: {
      question: 'Which archangel is entrusted with blowing the Trumpet to signal the Day of Resurrection?',
      options: ['Jibril (Gabriel)', 'Mikail (Michael)', 'Israfil (Raphael)', 'Malak al-Mawt'],
      correctIndex: 2,
      explanation: 'Angel Israfil (AS) holds the Trumpet ready to sound the blast of resurrection by Allah\'s command.'
    }
  },
  {
    id: 3,
    name: 'Belief in the Holy Books (Kutub)',
    arabicName: 'الإِيمَانُ بِالكُتُبِ السَّمَاوِيَّة',
    summary: 'Belief in all original scriptures revealed by Allah to His messengers as divine guidance and light for mankind.',
    detailedExplanation: 'Muslims believe in all divine scriptures sent throughout history: the Suhuf (Scrolls) of Ibrahim, the Tawrah (Torah) given to Musa, the Zabur (Psalms) to Dawud, the Injeel (Gospel) to Isa, and the Holy Quran revealed to Prophet Muhammad ﷺ. The Holy Quran is Allah\'s final, universal, and divinely preserved revelation, protected forever from corruption.',
    keyBeliefs: [
      'All original scriptures came with the identical core message: worship One God.',
      'Previous scriptures were intended for specific nations and times; human hands altered their text.',
      'The Holy Quran confirms and supersedes previous scriptures and remains unchanged letter by letter.'
    ],
    quranicReference: {
      verseArabic: 'إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ',
      verseEnglish: 'Indeed, it is We who sent down the Quran and indeed, We will be its guardian.',
      reference: 'Surah Al-Hijr (15:9)'
    },
    quizQuestion: {
      question: 'Which scripture was revealed to Prophet Dawud (David)?',
      options: ['Tawrah (Torah)', 'Injeel (Gospel)', 'Zabur (Psalms)', 'Suhuf (Scrolls)'],
      correctIndex: 2,
      explanation: 'Prophet Dawud (AS) was given the Zabur (Psalms) by Allah.'
    }
  },
  {
    id: 4,
    name: 'Belief in the Prophets & Messengers (Rusul)',
    arabicName: 'الإِيمَانُ بِالأَنْبِيَاءِ وَالرُّسُل',
    summary: 'Belief in all noble men chosen by Allah to guide humanity from Adam (AS) to the final Seal of Prophets, Muhammad ﷺ.',
    detailedExplanation: 'Allah sent approximately 124,000 prophets throughout history, with 25 specifically named in the Holy Quran. The greatest among them are the Ulul-\'Azm (Messengers of Firm Resolve): Nuh, Ibrahim, Musa, Isa, and Muhammad ﷺ. Every prophet taught Tawheed, demonstrated moral perfection, and called people away from darkness into light.',
    keyBeliefs: [
      'Prophets were protected from major sins (Ma\'soom) and delivered the message without concealment.',
      'Muslims make no distinction in faith between any of Allah\'s prophets.',
      'Prophet Muhammad ﷺ is Khatam an-Nabiyyin (the Seal of all Prophets); no new prophet will ever come after him.'
    ],
    quranicReference: {
      verseArabic: 'مَّا كَانَ مُحَمَّدٌ أَبَا أَحَدٍ مِّن رِّجَالِكُمْ وَلَٰكِن رَّسُولَ اللَّهِ وَخَاتَمَ النَّبِيِّينَ',
      verseEnglish: 'Muhammad is not the father of [any] one of your men, but [he is] the Messenger of Allah and Seal of the prophets.',
      reference: 'Surah Al-Ahzab (33:40)'
    },
    quizQuestion: {
      question: 'How many prophets are explicitly named in the Holy Quran?',
      options: ['12 prophets', '25 prophets', '99 prophets', '114 prophets'],
      correctIndex: 1,
      explanation: 'The Holy Quran explicitly names 25 blessed prophets, beginning with Adam (AS) and concluding with Muhammad ﷺ.'
    }
  },
  {
    id: 5,
    name: 'Belief in the Day of Judgment (Yawm al-Qiyamah)',
    arabicName: 'الإِيمَانُ بِاليَوْمِ الآخِر',
    summary: 'Belief in the physical resurrection, supreme divine court, accountability for deeds, and the eternal destinations of Paradise (Jannah) and Hellfire (Jahannam).',
    detailedExplanation: 'This earthly life is a brief examination. On the Day of Judgment, every human soul will be resurrected from the grave. The Book of Deeds (Sahifah) will be handed out, the Scales (Mizan) will weigh every atom\'s weight of good and evil, the Bridge (Sirat) will be crossed, and righteous believers will enter Paradise of eternal bliss while the unrepentant wicked face retribution.',
    keyBeliefs: [
      'Every human soul is questioned in the grave by Munkar and Nakir.',
      'Even an atom\'s weight of good or evil will be seen and accounted for.',
      'Prophet Muhammad ﷺ will be granted the Great Intercession (Ash-Shafa\'ah al-\'Uzma) by Allah\'s permission.'
    ],
    quranicReference: {
      verseArabic: 'فَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ ۝ وَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ شَرًّا يَرَهُ',
      verseEnglish: 'So whoever does an atom\'s weight of good will see it, and whoever does an atom\'s weight of evil will see it.',
      reference: 'Surah Az-Zalzalah (99:7-8)'
    },
    quizQuestion: {
      question: 'What is the Mizan on the Day of Judgment?',
      options: [
        'The Trumpet blown by Israfil',
        'The Divine Scales that weigh good and bad deeds',
        'The Bridge over Hellfire',
        'The Fountain of Kawthar'
      ],
      correctIndex: 1,
      explanation: 'The Mizan is the just Divine Scale upon which all righteous and evil deeds are weighed with absolute precision.'
    }
  },
  {
    id: 6,
    name: 'Belief in Divine Decree (Al-Qadr)',
    arabicName: 'الإِيمَانُ بِالقَدَرِ خَيْرِهِ وَشَرِّه',
    summary: 'Belief that Allah has eternal foreknowledge of all events, has written them in the Preserved Tablet (Al-Lawh al-Mahfuz), and that nothing occurs outside His divine will and creation.',
    detailedExplanation: 'Al-Qadr encompasses four essential stages: 1) Al-\'Ilm (Allah\'s all-encompassing eternal knowledge of all things past, present, and future); 2) Al-Kitabah (Writing of all destinies in the Preserved Tablet 50,000 years before creating the universe); 3) Al-Mashi\'ah (Allah\'s sovereign Will which none can resist); and 4) Al-Khalq (Allah is the sole Creator of all beings, deeds, and causes). Humans possess moral agency and choice, for which they are held accountable.',
    keyBeliefs: [
      'Whatever reaches you was never meant to miss you, and whatever missed you was never meant to reach you.',
      'Calms anxiety, banishes despair in hardship, and prevents arrogance in prosperity.',
      'Human free will operates within the overarching sovereign Will of Allah.'
    ],
    quranicReference: {
      verseArabic: 'إِنَّا كُلَّ شَيْءٍ خَلَقْنَاهُ بِقَدَرٍ',
      verseEnglish: 'Indeed, all things We created with predestination (Qadr).',
      reference: 'Surah Al-Qamar (54:49)'
    },
    quizQuestion: {
      question: 'What psychological fruit does belief in Qadr grant to a Muslim?',
      options: [
        'Fatalistic laziness and abandoning work',
        'Supreme tranquility and resilience through both triumphs and trials',
        'Pride and boasting when successful',
        'Fear of planning for tomorrow'
      ],
      correctIndex: 1,
      explanation: 'Belief in Qadr brings unshakable inner peace: knowing Allah has written all things dispels despair in sorrow and pride in triumph.'
    }
  }
];
