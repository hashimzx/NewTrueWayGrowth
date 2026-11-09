export interface PrayerRakatBreakdown {
  prayerName: string;
  arabicName: string;
  timeWindow: string;
  totalRakats: number;
  breakdown: Array<{
    type: 'Sunnah Mu\'akkadah' | 'Fard' | 'Sunnah Ghair Mu\'akkadah' | 'Nafl' | 'Witr';
    count: number;
    description: string;
  }>;
  significance: string;
}

export const FIVE_DAILY_PRAYERS_RAKATS: PrayerRakatBreakdown[] = [
  {
    prayerName: 'Fajr (Dawn Prayer)',
    arabicName: 'صَلَاةُ الفَجْر',
    timeWindow: 'From true dawn until right before sunrise',
    totalRakats: 4,
    breakdown: [
      { type: 'Sunnah Mu\'akkadah', count: 2, description: 'Emphasized Sunnah before Fard; the Prophet ﷺ said: "Two Rakats of Fajr are better than this world and all it contains."' },
      { type: 'Fard', count: 2, description: 'Obligatory prayer, recited audibly (Jahri) by the Imam.' }
    ],
    significance: 'Protects the believer from hypocrisy, grants divine safety throughout the entire day, and is witnessed directly by angels.'
  },
  {
    prayerName: 'Dhuhr (Noon Prayer)',
    arabicName: 'صَلَاةُ الظُّهْر',
    timeWindow: 'From the sun passing its zenith until shadow equals object length',
    totalRakats: 12,
    breakdown: [
      { type: 'Sunnah Mu\'akkadah', count: 4, description: 'Four Rakats prayed with one Salam prior to Fard.' },
      { type: 'Fard', count: 4, description: 'Four Rakats obligatory, recited silently (Sirri).' },
      { type: 'Sunnah Mu\'akkadah', count: 2, description: 'Two Rakats prayed immediately after Fard.' },
      { type: 'Nafl', count: 2, description: 'Voluntary extra reward.' }
    ],
    significance: 'Offered in the middle of the workday to pause worldly pursuits, re-orienting heart and conscience towards the Creator.'
  },
  {
    prayerName: 'Asr (Late Afternoon Prayer)',
    arabicName: 'صَلَاةُ العَصْر',
    timeWindow: 'From Asr shadow length until the sun turns pale orange before sunset',
    totalRakats: 8,
    breakdown: [
      { type: 'Sunnah Ghair Mu\'akkadah', count: 4, description: 'Optional four Rakats before Fard; Prophet ﷺ said: "May Allah have mercy on the one who prays 4 before Asr."' },
      { type: 'Fard', count: 4, description: 'Obligatory prayer, recited silently (Sirri).' }
    ],
    significance: 'Known in the Quran as "As-Salat al-Wusta" (The Middle Prayer). Great warning is issued against missing it intentionally.'
  },
  {
    prayerName: 'Maghrib (Sunset Prayer)',
    arabicName: 'صَلَاةُ المَغْرِب',
    timeWindow: 'Immediately after the sun completely dips below the horizon until red twilight fades',
    totalRakats: 7,
    breakdown: [
      { type: 'Fard', count: 3, description: 'Obligatory prayer; first 2 Rakats recited audibly, 3rd silently.' },
      { type: 'Sunnah Mu\'akkadah', count: 2, description: 'Two Rakats prayed after Fard.' },
      { type: 'Nafl', count: 2, description: 'Voluntary extra prayers (Awwabeen prayers can follow).' }
    ],
    significance: 'Marks the transition from day to evening; rapid performance is encouraged before the twilight dissipates.'
  },
  {
    prayerName: 'Isha (Night Prayer)',
    arabicName: 'صَلَاةُ العِشَاء',
    timeWindow: 'From the disappearance of the twilight until midnight / early dawn',
    totalRakats: 17,
    breakdown: [
      { type: 'Sunnah Ghair Mu\'akkadah', count: 4, description: 'Recommended before Fard.' },
      { type: 'Fard', count: 4, description: 'Obligatory prayer; first 2 Rakats audible, last 2 silent.' },
      { type: 'Sunnah Mu\'akkadah', count: 2, description: 'Emphasized Sunnah following Fard.' },
      { type: 'Nafl', count: 2, description: 'Voluntary prayers before Witr.' },
      { type: 'Witr', count: 3, description: 'Odd-numbered prayer with Dua Qunut; highly emphasized (Wajib in Hanafi, Sunnah Mu\'akkadah in Shafi\'i/Hanbali).' },
      { type: 'Nafl', count: 2, description: 'Concluding two quiet Rakats.' }
    ],
    significance: 'Praying Isha in congregation earns the reward of standing in prayer for half the night; combined with Fajr, it equals standing the entire night.'
  }
];

export interface PurifyingStep {
  step: number;
  title: string;
  arabicName: string;
  description: string;
  duaArabic?: string;
  duaTransliteration?: string;
  duaMeaning?: string;
  isObligatory: boolean;
}

export const WUDU_STEPS: PurifyingStep[] = [
  {
    step: 1,
    title: 'Intention (Niyyah) & Saying Bismillah',
    arabicName: 'النِّيَّة وَالتَّسْمِيَة',
    description: 'Make intention in the heart to purify yourself for Salah. Begin by saying Bismillah (In the name of Allah).',
    duaArabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    duaTransliteration: 'Bismillahir-Rahmanir-Raheem',
    duaMeaning: 'In the name of Allah, the Most Compassionate, the Most Merciful.',
    isObligatory: true
  },
  {
    step: 2,
    title: 'Washing Hands up to Wrists 3 Times',
    arabicName: 'غَسْلُ الكَفَّيْن',
    description: 'Thoroughly wash both hands up to the wrists three times, rubbing between fingers and rotating rings.',
    isObligatory: false
  },
  {
    step: 3,
    title: 'Rinsing Mouth (Madmadah) 3 Times',
    arabicName: 'المَضْمَضَة',
    description: 'Take water with right hand into the mouth, swirl it thoroughly around the teeth and palate, then expel it. Repeat 3 times.',
    isObligatory: false
  },
  {
    step: 4,
    title: 'Sniffing Water into Nostrils (Istinshaq) 3 Times',
    arabicName: 'الاسْتِنْشَاق وَالاسْتِنْثَار',
    description: 'Sniff water gently into nostrils using right hand, and blow it out softly using left hand. Repeat 3 times.',
    isObligatory: false
  },
  {
    step: 5,
    title: 'Washing Entire Face 3 Times',
    arabicName: 'غَسْلُ الوَجْه',
    description: 'Wash from the top of the forehead (hairline) down to the chin, and from earlobe to earlobe. Pass wet fingers through beard.',
    isObligatory: true
  },
  {
    step: 6,
    title: 'Washing Arms up to and Including Elbows 3 Times',
    arabicName: 'غَسْلُ اليَدَيْن إِلَى المِرْفَقَيْن',
    description: 'Wash right arm from fingertips all the way including the elbow 3 times, then wash left arm similarly 3 times.',
    isObligatory: true
  },
  {
    step: 7,
    title: 'Wiping the Head (Masah) & Ears Once',
    arabicName: 'مَسْحُ الرَّأْس وَالأُذُنَيْن',
    description: 'Wet hands and wipe from front hairline back to nape and return forward. Insert wet index fingers inside ears while wiping back with thumbs.',
    isObligatory: true
  },
  {
    step: 8,
    title: 'Washing Feet up to and Including Ankles 3 Times',
    arabicName: 'غَسْلُ الرِّجْلَيْن إِلَى الكَعْبَيْن',
    description: 'Wash right foot including ankle bones 3 times, using left pinky finger to clean between toes. Repeat identically for left foot.',
    isObligatory: true
  },
  {
    step: 9,
    title: 'Concluding Dua of Wudu',
    arabicName: 'دُعَاءُ مَا بَعْدَ الوُضُوء',
    description: 'Face the Qiblah, raise index finger, and recite the testimony. The Prophet ﷺ promised that all eight gates of Paradise open for whoever recites this.',
    duaArabic: 'أَشْهَدُ أَنْ لَّا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ ۝ اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ',
    duaTransliteration: 'Ash-hadu alla ilaha illallahu wahdahu la shareeka lahu wa ash-hadu anna Muhammadan \'abduhu wa rasooluh. Allahummaj-\'alni minat-tawwabeena waj-\'alni minal-mutatahhireen.',
    duaMeaning: 'I bear witness that there is no deity worthy of worship except Allah, alone without partner, and Muhammad is His servant and messenger. O Allah, make me among those who constantly repent and make me among those who purify themselves.',
    isObligatory: false
  }
];

export const GHUSL_METHOD = {
  title: 'Complete Method of Ghusl (Ritual Bath)',
  arabicTitle: 'كَيْفِيَّةُ الغُسْلِ الشَّرْعِيّ',
  obligations: [
    'Rinsing mouth thoroughly so water reaches all areas (Madmadah).',
    'Sniffing water deep into nostrils up to soft bone (Istinshaq).',
    'Washing the entire body from head to toe such that not a single hair or skin patch remains dry.'
  ],
  steps: [
    '1. Formulate intention in heart for purification from major ritual impurity (Janabah/Hayd/Nifas).',
    '2. Wash both hands up to wrists 3 times.',
    '3. Wash private parts and remove any physical impurities.',
    '4. Perform complete Wudu just as you do for Salah (you may postpone washing feet to the end if standing in puddle).',
    '5. Pour water over head 3 times, ensuring it reaches roots of hair.',
    '6. Pour water over right side of entire body from shoulder to feet, then left side.',
    '7. Wash entire body thoroughly, rubbing with hands to leave no spot untouched.'
  ]
};

export const TAYAMMUM_METHOD = {
  title: 'Method of Tayammum (Dry Purification)',
  arabicTitle: 'كَيْفِيَّةُ التَّيَمُّمِ بِالتُّرَاب',
  whenPermitted: [
    'When water is unavailable within a reasonable travel distance (approx. 1 mile / 1.6 km).',
    'When using water would cause genuine physical illness, severe pain, or delay healing.',
    'When water is extremely cold and no means exist to heat it, posing danger to life or health.'
  ],
  steps: [
    '1. Make Niyyah (intention) in heart to purify yourself to perform Salah.',
    '2. Say Bismillah.',
    '3. Strike clean earth, dust, dry soil, or clean unglazed stone with both palms with fingers spread.',
    '4. Shake or blow dust gently off hands to remove excess earth.',
    '5. Wipe hands over the entire face once.',
    '6. Strike clean earth once more, shake off excess, and wipe right arm from fingertips to elbow with left hand, then left arm from fingertips to elbow with right hand.'
  ]
};

export interface JanazahStep {
  takbeerNumber: number;
  title: string;
  arabicTitle: string;
  description: string;
  recitationArabic: string;
  recitationTransliteration: string;
  recitationEnglish: string;
  note?: string;
}

export const JANAZAH_GUIDE: {
  importance: string;
  conditions: string[];
  schoolsNote: string;
  steps: JanazahStep[];
  duaChildBoy: { arabic: string; transliteration: string; translation: string };
  duaChildGirl: { arabic: string; transliteration: string; translation: string };
} = {
  importance: 'Namaz-e-Janazah (Funeral Prayer) is a communal obligation (Fard Kifayah). If a portion of the community fulfills it, the obligation is lifted from the rest; if neglected by all, the entire community incurs sin. It is an earnest intercession and collective prayer of mercy for the departed soul.',
  conditions: [
    'Purity of the body, clothing, and place (Taharah / Wudu).',
    'Facing the Qiblah.',
    'The deceased body must be Muslim, washed (Ghusl given), wrapped in clean shroud (Kafan), and placed before the congregation.',
    'There is no Ruku (bowing) and no Sujood (prostration) in Janazah prayer; it consists solely of standing (Qiyam) and 4 Takbeers.'
  ],
  schoolsNote: 'Schools of jurisprudence agree on the 4 Takbeers and solemn standing. In the Hanafi school, hands are raised only at the 1st Takbeer (and remain folded during the rest), and Sana is recited after the 1st Takbeer. In the Shafi\'i and Hanbali schools, hands are raised with every Takbeer, and Surah Al-Fatihah is recited after the 1st Takbeer. Both practices are grounded in authentic Sunnah and widely accepted across the Ummah.',
  steps: [
    {
      takbeerNumber: 1,
      title: 'First Takbeer: Sana (Glorification of Allah)',
      arabicTitle: 'التَّكْبِيرَةُ الأُولَى وَالثَّنَاء',
      description: 'Raise hands to ears saying "Allahu Akbar", fold hands, and recite Sana with the addition of "Wa jalla thana\'uk". (In Shafi\'i/Hanbali tradition, Surah Al-Fatihah is recited).',
      recitationArabic: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَىٰ جَدُّكَ، وَجَلَّ ثَنَاؤُكَ، وَلَا إِلَٰهَ غَيْرُكَ',
      recitationTransliteration: 'Subhanak Allahumma wa bihamdika, wa tabarakasmuka, wa ta\'ala jadduka, wa jalla thana\'uka, wa la ilaha ghayruk.',
      recitationEnglish: 'Glory and praise be to You, O Allah; blessed is Your Name, exalted is Your Majesty, magnificent is Your praise, and there is no deity worthy of worship besides You.'
    },
    {
      takbeerNumber: 2,
      title: 'Second Takbeer: Durood-e-Ibrahim (Blessings on the Prophet ﷺ)',
      arabicTitle: 'التَّكْبِيرَةُ الثَّانِيَة وَالصَّلَاةُ عَلَى النَّبِيّ',
      description: 'Say "Allahu Akbar" (without raising hands in Hanafi school; raising in Shafi\'i/Hanbali) and send blessings on Prophet Muhammad ﷺ and his family.',
      recitationArabic: 'اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَّعَلَىٰ آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَىٰ إِبْرَاهِيمَ وَعَلَىٰ آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَّجِيدٌ ۝ اللَّهُمَّ بَارِكْ عَلَىٰ مُحَمَّدٍ وَّعَلَىٰ آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَىٰ إِبْرَاهِيمَ وَعَلَىٰ آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَّجِيدٌ',
      recitationTransliteration: 'Allahumma salli \'ala Muhammadinw-wa \'ala aali Muhammadin kama sallayta \'ala Ibraheema wa \'ala aali Ibraheema innaka Hameedum-Majeed. Allahumma barik \'ala Muhammadinw-wa \'ala aali Muhammadin kama barakta \'ala Ibraheema wa \'ala aali Ibraheema innaka Hameedum-Majeed.',
      recitationEnglish: 'O Allah, bestow Your blessings upon Muhammad and the family of Muhammad, as You bestowed blessings upon Ibrahim and the family of Ibrahim. Truly, You are Praiseworthy, Full of Glory. O Allah, send Your benedictions upon Muhammad and the family of Muhammad, as You sent benedictions upon Ibrahim and the family of Ibrahim. Truly, You are Praiseworthy, Full of Glory.'
    },
    {
      takbeerNumber: 3,
      title: 'Third Takbeer: Supplication for the Deceased (Adult)',
      arabicTitle: 'التَّكْبِيرَةُ الثَّالِثَة وَالدُّعَاءُ لِلْمَيِّتِ الكَبِير',
      description: 'Say "Allahu Akbar" and recite the authentic comprehensive Prophetic supplication for the departed and for all living and deceased Muslims.',
      recitationArabic: 'اللَّهُمَّ اغْفِرْ لِحَيِّنَا وَمَيِّتِنَا، وَشَاهِدِنَا وَغَائِبِنَا، وَصَغِيرِنَا وَكَبِيرِنَا، وَذَكَرِنَا وَأُنْثَانَا، اللَّهُمَّ مَنْ أَحْيَيْتَهُ مِنَّا فَأَحْيِهِ عَلَى الإِسْلَامِ، وَمَنْ تَوَفَّيْتَهُ مِنَّا فَتَوَفَّهُ عَلَى الإِيمَانِ، اللَّهُمَّ لَا تَحْرِمْنَا أَجْرَهُ وَلَا تُضِلَّنَا بَعْدَهُ',
      recitationTransliteration: 'Allahummagh-fir lihayyina wa mayyitina, wa shahidina wa gha\'ibina, wa sagheerina wa kabeerina, wa dhakarina wa unthana. Allahumma man ahyaytahu minna fa-ahyihi \'alal-Islam, wa man tawaffaytahu minna fatawaffahu \'alal-Eeman. Allahumma la tahrimna ajrahu wa la tudillana ba\'dah.',
      recitationEnglish: 'O Allah, forgive our living and our deceased, those present among us and those absent, our young and our old, our males and our females. O Allah, whomever You keep alive among us, let them live upon Islam; and whomever You cause to die, let them die upon true faith (Iman). O Allah, do not deprive us of their reward and do not lead us astray after them.',
      note: 'Narrated in Sunan Abi Dawud (3201) and Sunan at-Tirmidhi (1024) with Sahih chain.'
    },
    {
      takbeerNumber: 4,
      title: 'Fourth Takbeer & Tasleem (Concluding the Prayer)',
      arabicTitle: 'التَّكْبِيرَةُ الرَّابِعَة وَالتَّسْلِيم',
      description: 'Say "Allahu Akbar", pause silently for a brief moment, then conclude the prayer with Tasleem turning head to the right and left saying "As-salamu \'alaykum wa rahmatullah".',
      recitationArabic: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ',
      recitationTransliteration: 'As-salamu \'alaykum wa rahmatullah',
      recitationEnglish: 'May peace and the mercy of Allah be upon you.',
      note: 'Concludes the funeral prayer. Both hands are gently lowered to sides.'
    }
  ],
  duaChildBoy: {
    arabic: 'اللَّهُمَّ اجْعَلْهُ لَنَا فَرَطًا، وَاجْعَلْهُ لَنَا أَجْرًا وَذُخْرًا، وَاجْعَلْهُ لَنَا شَافِعًا وَمُشَفَّعًا',
    transliteration: 'Allahummaj-\'alhu lana faratan, waj-\'alhu lana ajranw-wa dhukhran, waj-\'alhu lana shafi\'anw-wa mushaffa\'a.',
    translation: 'O Allah! Make him for us an advance herald, and make him for us a source of immense reward and treasure, and make him for us an intercessor whose intercession is granted.'
  },
  duaChildGirl: {
    arabic: 'اللَّهُمَّ اجْعَلْهَا لَنَا فَرَطًا، وَاجْعَلْهَا لَنَا أَجْرًا وَذُخْرًا، وَاجْعَلْهَا لَنَا شَافِعَةً وَمُشَفَّعَةً',
    transliteration: 'Allahummaj-\'alha lana faratan, waj-\'alha lana ajranw-wa dhukhran, waj-\'alha lana shafi\'atanw-wa mushaffa\'ah.',
    translation: 'O Allah! Make her for us an advance herald, and make her for us a source of immense reward and treasure, and make her for us an intercessor whose intercession is granted.'
  }
};

export const COMMON_SALAH_MISTAKES = [
  {
    mistake: 'Rushing and lacking stillness (Tum\'aneenah)',
    correction: 'Each posture (Ruku, Qawmah, Sajdah, Jalsah) must be maintained until every joint rests calmly for at least the duration of reciting one Tasbih.',
    evidence: 'The Prophet ﷺ told a man who prayed quickly: "Go back and pray, for you have not truly prayed."'
  },
  {
    mistake: 'Pecking like a rooster in Sujood',
    correction: 'Ensure 7 body parts touch the floor firmly: forehead & nose, both palms, both knees, and tips of both toes.',
    evidence: 'Sahih al-Bukhari 812.'
  },
  {
    mistake: 'Preceding the Imam in congregational prayer',
    correction: 'Never move into Ruku or Sujood before the Imam has finished saying Allahu Akbar and moved into position.',
    evidence: 'The Prophet ﷺ warned: "Does not the one who raises his head before the Imam fear that Allah may turn his head into that of a donkey?"'
  },
  {
    mistake: 'Looking around or gazing upwards at the ceiling',
    correction: 'Direct eyes humbly to the exact spot where your forehead rests in prostration during standing, bowing, and sitting.',
    evidence: 'Sunan an-Nasa\'i 1195.'
  },
  {
    mistake: 'Wearing translucent, tight, or revealing clothing (violating Satr)',
    correction: 'Men must cover at least from navel to below knee in opaque loose clothes; women must cover everything except face and hands.',
    evidence: 'Surah Al-A\'raf (7:31).'
  }
];

export const SPECIAL_PRAYERS = [
  {
    title: 'Jumu\'ah (Friday Congregational Prayer)',
    arabicTitle: 'صَلَاةُ الجُمُعَة',
    description: 'Obligatory upon every adult Muslim male. Replaces Dhuhr prayer on Friday with 2 Khutbahs followed by 2 audible Fard Rakats in congregation.',
    virtues: 'The best day upon which the sun rises; sins committed between two Fridays are expiated for whoever attends.'
  },
  {
    title: 'Tahajjud (Night Vigil Prayer)',
    arabicTitle: 'صَلَاةُ التَّهَجُّد (قِيَامُ اللَّيْل)',
    description: 'Prayed in the final third of the night after sleeping. Consists of 2 to 8+ Rakats in pairs, concluding with Witr.',
    virtues: 'The most honorable prayer after the obligatory prayers. Allah descends to the lowest heaven asking: "Who is calling upon Me that I may answer?"'
  },
  {
    title: 'Eid Prayer (Eid ul-Fitr & Eid ul-Adha)',
    arabicTitle: 'صَلَاةُ العِيدَيْن',
    description: 'Consists of 2 Rakats with additional Takbeers (6 additional in Hanafi; 7 in first Rakat and 5 in second in Shafi\'i), followed by an inspirational sermon.',
    virtues: 'A joyous communal celebration of thanksgiving, unity, and brotherhood across the worldwide Ummah.'
  }
];
