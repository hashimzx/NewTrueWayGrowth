export type { NameOfAllah } from './asmaUlHusnaFullData';
export { ASMA_UL_HUSNA } from './asmaUlHusnaFullData';


export interface ProphetStory {
  id: string;
  name: string;
  arabicName: string;
  title: string;
  era: string;
  mainStory: string;
  quranicMention: string;
  majorTrials: string[];
  moralLessons: string[];
}

export const STORIES_OF_PROPHETS: ProphetStory[] = [
  {
    id: 'prophet-adam',
    name: 'Prophet Adam (AS)',
    arabicName: 'آدَم عَلَيْهِ السَّلَام',
    title: 'The Father of Mankind & First Prophet',
    era: 'Beginning of Creation',
    mainStory: 'Allah created Adam from clay and breathed His divine spirit into him, teaching him the names of all things. When the angels were commanded to prostrate out of honor, Iblis (Satan) refused out of pride. Deceived by Satan in Paradise, Adam and Hawwa (Eve) ate from the forbidden tree, immediately repented with deep humility, and were forgiven by Allah and sent to earth to establish human civilization.',
    quranicMention: 'Mentioned 25 times in the Quran (Surah Al-Baqarah, Al-A\'raf, Taha).',
    majorTrials: ['Arrogance of Iblis refusing prostration', 'Deception leading to eating from forbidden tree', 'Separation and descent to earth'],
    moralLessons: [
      'Human dignity stems from knowledge (\'Ilm) and spiritual connection to Allah.',
      'Satan\'s foundational sin was arrogance and claiming superiority based on origins.',
      'True nobility lies in swift, humble repentance (Tawbah) when errors happen.'
    ]
  },
  {
    id: 'prophet-nuh',
    name: 'Prophet Nuh (Noah AS)',
    arabicName: 'نُوح عَلَيْهِ السَّلَام',
    title: 'The Grateful Servant & Ark Builder',
    era: 'Pre-Deluge Antiquity',
    mainStory: 'For 950 continuous years, Prophet Nuh called his idol-worshiping people night and day with utmost patience, love, and persistence. When they persistently rejected truth and mocked him, Allah commanded Nuh to construct the legendary Ark on dry land. The great Deluge washed away the stubborn disbelievers, while Nuh and the believers were saved to repopulate the earth.',
    quranicMention: 'Mentioned 43 times in the Quran (Surah Nuh, Hud, Al-Anbiya).',
    majorTrials: ['950 years of relentless preaching and public ridicule', 'Rejection by his own wife and son', 'Constructing the Ark under mockery'],
    moralLessons: [
      'Unwavering persistence in doing good even when worldly results seem slow.',
      'Spiritual righteousness matters infinitely more than genetic lineage.',
      'Trust Allah\'s divine plan even when commanded to build an Ark in a desert.'
    ]
  },
  {
    id: 'prophet-ibrahim',
    name: 'Prophet Ibrahim (Abraham AS)',
    arabicName: 'إِبْرَاهِيم عَلَيْهِ السَّلَام',
    title: 'Khalilullah (The Intimate Friend of Allah) & Father of Monotheism',
    era: 'Ancient Mesopotamia, Canaan & Arabia',
    mainStory: 'Prophet Ibrahim searched with pure reason for the Creator of stars, sun, and moon, concluding that only the Unseen Lord of the Worlds is worthy of worship. He shattered the stone idols of his nation, survived being cast into a blazing inferno by King Nimrod, traveled to Makkah to settle Lady Hajar and baby Ismail, and rebuilt the Holy Ka\'bah as the eternal sanctuary of Tawheed.',
    quranicMention: 'Mentioned 69 times in the Quran (Surah Ibrahim, Al-Baqarah, Maryam).',
    majorTrials: ['Cast into a massive fiery furnace by Nimrod', 'Leaving wife Hajar and infant Ismail in uncultivated desert of Makkah', 'The supreme test of sacrificing son Ismail'],
    moralLessons: [
      'Total submission and surrender (Tasleem) to Allah\'s divine commands.',
      'Rational argumentation and intellectual courage in challenging superstition.',
      'The rituals of Hajj and Eid ul-Adha celebrate his sublime family devotion.'
    ]
  },
  {
    id: 'prophet-yusuf',
    name: 'Prophet Yusuf (Joseph AS)',
    arabicName: 'يُوسُف عَلَيْهِ السَّلَام',
    title: 'The Truthful (As-Siddiq) & Icon of Moral Chastity',
    era: 'Ancient Egypt & Canaan',
    mainStory: 'Described by Allah as "Ahsan al-Qasas" (The Best of Stories). Thrown into a dark well by jealous brothers, sold into slavery in Egypt, falsely accused and imprisoned for years for safeguarding his chastity, Yusuf remained steadfast. He interpreted the Pharaoh\'s dream of seven lean cows, rescued Egypt from famine as chief treasurer, and generously forgave his brothers saying: "No blame is upon you today."',
    quranicMention: 'Complete dedicated 12th Surah of the Quran (Surah Yusuf).',
    majorTrials: ['Betrayal and abandonment by older brothers', 'Seductive temptation in the minister\'s palace', 'Years of unjust solitary imprisonment'],
    moralLessons: [
      'Patience (Sabr Jameel) during prolonged betrayal and isolation.',
      'Refusing moral compromise even when sin is easy and convenient.',
      'Generous forgiveness of those who previously inflicted harm upon you.'
    ]
  },
  {
    id: 'prophet-musa',
    name: 'Prophet Musa (Moses AS)',
    arabicName: 'مُوسَى عَلَيْهِ السَّلَام',
    title: 'Kalimullah (The One Spoken to Directly by Allah)',
    era: 'Pharaonic Egypt & Sinai Peninsula',
    mainStory: 'Placed as an infant into the Nile in a wooden basket, raised inside Pharaoh\'s palace, Musa fled to Madyan after defending an oppressed man. At Mount Tur, Allah spoke directly to him, commissioning him to confront the tyrannical Pharaoh and demand freedom for the Children of Israel. With his miraculous staff, Allah parted the Red Sea, drowning Pharaoh\'s army and revealing the Torah on Mount Sinai.',
    quranicMention: 'The most frequently mentioned prophet in the Quran (136 times).',
    majorTrials: ['Confronting the brutal tyrant Pharaoh without army or weapons', 'Navigating desert exile and stubbornness of his liberated followers', 'Leading people through divine trials and water scarcity'],
    moralLessons: [
      'Standing firmly against political tyranny and state-sponsored oppression.',
      'Reliance on Allah (Tawakkul) when caught between an army and the sea.',
      'The power of prayer and sincere communication directly with Allah.'
    ]
  },
  {
    id: 'prophet-muhammad',
    name: 'Prophet Muhammad ﷺ',
    arabicName: 'مُحَمَّدٌ رَسُولُ اللَّه ﷺ',
    title: 'Khatam an-Nabiyyin (The Seal of the Prophets) & Mercy to the Worlds',
    era: '570 CE – 632 CE (Makkah & Madinah)',
    mainStory: 'Born an orphan in Makkah, known as As-Sadiq (The Truthful) and Al-Amin (The Trustworthy). At age 40, received the first revelation of the Holy Quran in Cave Hira from Angel Jibril. Endured 13 years of persecution, boycott, and torture in Makkah, made the historic Hijrah to Madinah, established the first egalitarian Islamic society, secured the peaceful Conquest of Makkah, and delivered the Farewell Sermon enshrining human equality.',
    quranicMention: 'Mentioned by name in 4 Surahs; addressed throughout the entire Quran.',
    majorTrials: ['Orphanhood and loss of beloved wife Khadijah and uncle Abu Talib', 'Severe economic boycott and brutal physical stoning at At-Ta\'if', 'Military defenses against invading confederates in Badr, Uhud, and Khandaq'],
    moralLessons: [
      'Supreme character described as the "living Quran".',
      'Forgiving enemies upon triumphant victory without vengeance.',
      'Universal mercy extending to orphans, women, enemies, and nature.'
    ]
  }
];

export interface IslamicMannerLesson {
  id: string;
  topic: string;
  title: string;
  scenario: string;
  propheticGuidance: string;
  actionItems: string[];
  reflectionQuestion: string;
}

export const ISLAMIC_MANNERS_DATA: IslamicMannerLesson[] = [
  {
    id: 'manner-parents',
    topic: 'Respecting Parents (Birr al-Walidayn)',
    title: 'Gentleness, Kindness, and Obedience to Parents',
    scenario: 'Zayd was busy playing a video game when his mother asked him to help carry groceries inside. He felt annoyed and was tempted to sigh or delay.',
    propheticGuidance: 'The Quran commands: "And lower to them the wing of humility out of mercy and say: My Lord, have mercy upon them as they brought me up when I was small" (17:24). Pleasure of parents brings pleasure of Allah.',
    actionItems: [
      'Pause games or phone conversations immediately when parents call your name.',
      'Never respond with harsh words, slamming doors, or rolling your eyes.',
      'Kiss their hands or forehead in greeting and serve them water before they ask.'
    ],
    reflectionQuestion: 'How can you show extra gratitude to your parents today?'
  },
  {
    id: 'manner-teachers',
    topic: 'Respecting Teachers & Scholars (Adab al-Mu\'allim)',
    title: 'Honoring Your Quran Ustadh & School Teachers',
    scenario: 'During an online Quran class, a student feels distracted and thinks about browsing other tabs while the teacher reviews tajweed rules.',
    propheticGuidance: 'Sayyidina Ali (RA) said: "I am a servant to whoever taught me a single letter." Respecting the teacher is the key to unlocking barakah in sacred knowledge.',
    actionItems: [
      'Log into Quran and academic classes early, sitting upright with a clean camera and focused attention.',
      'Listen respectfully without interrupting while the teacher is speaking or explaining.',
      'Say "JazakAllahu Khairan Ustadh" at the end of every learning session.'
    ],
    reflectionQuestion: 'Why does respecting teachers help sacred knowledge enter our hearts?'
  },
  {
    id: 'manner-truth',
    topic: 'Honesty & Truthfulness (Sidq)',
    title: 'Speaking the Truth Even When Difficult',
    scenario: 'Maryam accidentally broke a vase while playing in the living room. She felt scared of being scolded and considered blaming it on the pet cat.',
    propheticGuidance: 'Prophet Muhammad ﷺ was known as As-Sadiq (The Truthful) decades before prophethood. He taught that truthfulness rescues a person while lying leads to spiritual ruin.',
    actionItems: [
      'Admit mistakes promptly and offer to help clean up or replace what was broken.',
      'Never tell lies in jest or to make friends laugh at someone else\'s expense.',
      'Keep your promises: if you say you will complete homework or meet someone, fulfill it.'
    ],
    reflectionQuestion: 'How does telling the truth build self-confidence and peaceful sleep?'
  },
  {
    id: 'manner-cleanliness',
    topic: 'Cleanliness is Half of Faith (Taharah)',
    title: 'Personal Hygiene and Caring for Surroundings',
    scenario: 'After eating a snack at a picnic park, a child is tempted to leave the wrapper on the bench instead of walking to the garbage bin.',
    propheticGuidance: 'The Prophet ﷺ taught: "Cleanliness is half of faith (At-Tahooru shatrul-Eeman)." Removing harmful objects from the walkway is an act of charity (Sadaqah).',
    actionItems: [
      'Brush teeth regularly (use Miswak or toothbrush) especially upon waking and before prayer.',
      'Keep your bedroom, study desk, and clothing neat and pleasantly scented.',
      'Never litter; pick up trash and place it in the recycling bin.'
    ],
    reflectionQuestion: 'In what ways does physical cleanliness reflect spiritual purity?'
  },
  {
    id: 'manner-backbiting',
    topic: 'Guarding the Tongue from Backbiting (Gheebah)',
    title: 'Protecting the Honor and Reputation of Others',
    scenario: 'Classmates start gossiping about a student who failed an exam, laughing at his low marks behind his back.',
    propheticGuidance: 'Surah Al-Hujurat compares backbiting to eating the flesh of one\'s dead brother. The Prophet ﷺ said: "Whoever believes in Allah and the Last Day, let him speak good or remain silent."',
    actionItems: [
      'Gently defend absent friends when people speak ill of them.',
      'Change the subject immediately if a group begins gossiping.',
      'Focus on fixing your own flaws rather than highlighting errors in others.'
    ],
    reflectionQuestion: 'What good habit can replace gossip when hanging out with friends?'
  }
];
