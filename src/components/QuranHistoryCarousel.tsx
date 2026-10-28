import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  BookOpen, 
  Sparkles, 
  ShieldCheck, 
  Scroll, 
  Compass, 
  Play, 
  Pause,
  Award,
  Calendar,
  Layers
} from 'lucide-react';

export interface HistorySlide {
  id: number;
  period: string;
  year: string;
  title: string;
  arabicTitle: string;
  badge: string;
  summary: string;
  details: string[];
  keyFigures: string[];
  quranAyahRef?: {
    arabic: string;
    translation: string;
    reference: string;
  };
  visualTheme: {
    accentBg: string;
    border: string;
    iconBg: string;
  };
}

export const QURAN_HISTORY_SLIDES: HistorySlide[] = [
  {
    id: 1,
    period: 'Pre-Temporal Origin',
    year: 'Before Creation',
    title: 'The Preserved Tablet (Al-Lawh Al-Mahfuz)',
    arabicTitle: 'اللَّوْحُ الْمَحْفُوظ',
    badge: 'Divine Archetype',
    summary: 'Before physical creation, the complete Glorious Quran was eternally ordained and inscribed in the Preserved Tablet in the presence of the Almighty, incorruptible by time or change.',
    details: [
      'The transcendent archetype from which the Quran descended to Bayt al-\'Izzah in the lowest heaven on Laylat al-Qadr.',
      'Protected from addition, alteration, or interception by the devils.',
      'Affirms the primordial authenticity and uncreated word of Allah.'
    ],
    keyFigures: ['Allah Subhaanahu wa Ta\'ala', 'Archangel Jibril (Gabriel)'],
    quranAyahRef: {
      arabic: 'بَلْ هُوَ قُرْآنٌ مَّجِيدٌ ۝ فِي لَوْحٍ مَّحْفُوظٍ',
      translation: 'Rather, it is an honored Quran — [Inscribed] in a Preserved Slate.',
      reference: 'Surah Al-Buruj (85:21-22)'
    },
    visualTheme: {
      accentBg: 'from-[#6B1B7E]/20 via-[#5B2A9A]/15 to-[#E0107F]/10',
      border: 'border-[#6B1B7E]/30',
      iconBg: 'bg-[#6B1B7E]'
    }
  },
  {
    id: 2,
    period: 'The First Revelation',
    year: '610 CE (Ramadan)',
    title: 'Cave of Hira: The Command "Iqra" (Read)',
    arabicTitle: 'بَدْءُ الْوَحْيِ فِي غَارِ حِرَاء',
    badge: 'Dawn of Prophethood',
    summary: 'In the solitude of Mount Jabal al-Nour near Makkah, Archangel Jibril embraced Prophet Muhammad ﷺ and delivered the first five transformative verses of Surah Al-\'Alaq.',
    details: [
      'The initial five verses commanded reading, seeking knowledge, and the honor of the pen.',
      'The Prophet ﷺ returned trembling to Khadijah (RA), who reassured him with her unwavering faith.',
      'Marked the night of Laylat al-Qadr (Night of Decree), superior to a thousand months.'
    ],
    keyFigures: ['Prophet Muhammad ﷺ', 'Archangel Jibril (AS)', 'Khadijah bint Khuwaylid (RA)'],
    quranAyahRef: {
      arabic: 'اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ ۝ خَلَقَ الْإِنسَانَ مِنْ عَلَقٍ',
      translation: 'Read in the name of your Lord who created — Created man from an adhering clot.',
      reference: 'Surah Al-\'Alaq (96:1-2)'
    },
    visualTheme: {
      accentBg: 'from-[#5B2A9A]/20 via-[#6B1B7E]/15 to-[#E0107F]/10',
      border: 'border-[#5B2A9A]/30',
      iconBg: 'bg-[#5B2A9A]'
    }
  },
  {
    id: 3,
    period: 'Makki Era & Dar al-Arqam',
    year: '610 – 622 CE (Makkah)',
    title: 'Oral Imprinting & Tawheed Foundation',
    arabicTitle: 'دَارُ الأَرْقَمِ وَتَرْسِيخُ التَّوْحِيد',
    badge: 'Secret Assembly & Memorization',
    summary: 'In Dar al-Arqam at the foot of Mount Safa, early companions gathered in utmost secrecy to memorize every revealed ayah directly from the lips of the Messenger of Allah ﷺ.',
    details: [
      'Surahs revealed in Makkah focused intensely on Oneness of God (Tawheed), Day of Judgment, and moral courage.',
      'Abdullah ibn Mas\'ud was the first to boldly recite Surah Ar-Rahman aloud in front of the Ka\'bah.',
      'The rhythm and rhetorical majesty of the Quran mesmerized even the fiercest pagan poets.'
    ],
    keyFigures: ['Al-Arqam ibn Abi al-Arqam (RA)', 'Abdullah ibn Mas\'ud (RA)', 'Abu Bakr As-Siddiq (RA)'],
    quranAyahRef: {
      arabic: 'وَإِنَّكَ لَتُلَقَّى الْقُرْآنَ مِن لَّدُنْ حَكِيمٍ عَلِيمٍ',
      translation: 'And indeed, you receive the Quran from one Wise and Knowing.',
      reference: 'Surah An-Naml (27:6)'
    },
    visualTheme: {
      accentBg: 'from-[#6B1B7E]/20 via-[#E0107F]/15 to-[#5B2A9A]/10',
      border: 'border-[#E0107F]/30',
      iconBg: 'bg-[#E0107F]'
    }
  },
  {
    id: 4,
    period: 'The Abyssinian Recitation',
    year: '615 CE (Axum, Abyssinia)',
    title: 'Ja\'far (RA) Recites Surah Maryam to King Najashi',
    arabicTitle: 'تِلَاوَةُ جَعْفَرٍ عَلَى النَّجَاشِيّ',
    badge: 'Diplomatic Preservation',
    summary: 'Persecuted Muslims sought refuge with the righteous Christian King Negus of Abyssinia. Ja\'far ibn Abi Talib recited verses from Surah Maryam, moving the King and his bishops to tears.',
    details: [
      'Proved that the Quranic account of Prophet Isa (Jesus) and Maryam (Mary) emanates from the same divine fountain as previous scriptures.',
      'The Negus drew a line in the sand, proclaiming: "The difference between what Isa brought and what Muhammad brought is not greater than this line."',
      'Demonstrated the powerful universal resonance of pristine Quranic recitation.'
    ],
    keyFigures: ['Ja\'far ibn Abi Talib (RA)', 'King Najashi (Ashama)', 'Amr ibn al-\'As (before Islam)'],
    quranAyahRef: {
      arabic: 'ذَٰلِكَ عِيسَى ابْنُ مَرْيَمَ ۚ قَوْلَ الْحَقِّ الَّذِي فِيهِ يَمْتَرُونَ',
      translation: 'That is Jesus, the son of Mary — the word of truth about which they are in dispute.',
      reference: 'Surah Maryam (19:34)'
    },
    visualTheme: {
      accentBg: 'from-[#5B2A9A]/20 via-[#6B1B7E]/15 to-purple-100',
      border: 'border-[#6B1B7E]/30',
      iconBg: 'bg-[#6B1B7E]'
    }
  },
  {
    id: 5,
    period: 'Al-Isra wal-Mi\'raj',
    year: '621 CE (Jerusalem & Heavens)',
    title: 'The Night Journey & Gift of the 5 Daily Prayers',
    arabicTitle: 'الإِسْرَاءُ وَالْمِعْرَاجُ وَفَرْضُ الصَّلَاة',
    badge: 'Liturgical Integration',
    summary: 'Prophet Muhammad ﷺ was taken from Makkah to Al-Aqsa Mosque and ascended through the seven heavens, where Salah was prescribed, embedding daily Quran recitation into the fabric of life.',
    details: [
      'Five daily prayers mandated, guaranteeing that every Muslim recites Surah Al-Fatihah at least 17 times each day.',
      'The final two verses of Surah Al-Baqarah (Amanar-Rasul) were bestowed directly without intermediary.',
      'Created a worldwide communal recitation rhythm that guarantees the Quran cannot ever be forgotten.'
    ],
    keyFigures: ['Prophet Muhammad ﷺ', 'Prophet Musa (AS)', 'Archangel Jibril (AS)'],
    quranAyahRef: {
      arabic: 'سُبْحَانَ الَّذِي أَسْرَىٰ بِعَبْدِهِ لَيْلًا مِّنَ الْمَسْجِدِ الْحَرَامِ إِلَى الْمَسْجِدِ الْأَقْصَى',
      translation: 'Exalted is He who took His Servant by night from al-Masjid al-Haram to al-Masjid al-Aqsa.',
      reference: 'Surah Al-Isra (17:1)'
    },
    visualTheme: {
      accentBg: 'from-[#E0107F]/15 via-[#6B1B7E]/15 to-[#5B2A9A]/10',
      border: 'border-[#E0107F]/30',
      iconBg: 'bg-[#E0107F]'
    }
  },
  {
    id: 6,
    period: 'The Madinan Migration',
    year: '622 – 632 CE (Madinah)',
    title: 'Constitution of Madinah & Legislative Verses',
    arabicTitle: 'الْهِجْرَةُ النَّبَوِيَّةُ وَآيَاتُ الأَحْكَام',
    badge: 'Society & Civilization',
    summary: 'In Madinah, verses were revealed establishing family law, social justice, financial ethics, and peace accords, transforming faith into a living righteous society.',
    details: [
      'The Prophet ﷺ established the Masjid Nabawi as the primary school of Quranic learning.',
      'Companions of the Bench (Ashab al-Suffah) dedicated themselves round the clock to memorizing the Quran.',
      'Over 40 designated scribes wrote every newly revealed verse immediately.'
    ],
    keyFigures: ['Prophet Muhammad ﷺ', 'Zayd ibn Thabit (RA)', 'Abu Hurayrah (RA)', 'Ubayy ibn Ka\'b (RA)'],
    quranAyahRef: {
      arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِن قَبْلِكُمْ',
      translation: 'O you who have believed, decreed upon you is fasting as it was decreed upon those before you.',
      reference: 'Surah Al-Baqarah (2:183)'
    },
    visualTheme: {
      accentBg: 'from-[#6B1B7E]/20 via-[#5B2A9A]/20 to-[#E0107F]/15',
      border: 'border-[#5B2A9A]/30',
      iconBg: 'bg-[#5B2A9A]'
    }
  },
  {
    id: 7,
    period: 'Katiban-e-Wahi (Scribes of Revelation)',
    year: '610 – 632 CE (Ongoing Recording)',
    title: 'The Prophetic Transcription Protocol',
    arabicTitle: 'كَتَبَةُ الْوَحْيِ وَالتَّدْوِينُ النَّبَوِيّ',
    badge: 'Direct Divine Dictation',
    summary: 'Whenever revelation descended, the Prophet ﷺ summoned designated scribes and dictated the exact wording, specifying precisely where each ayah belonged within its Surah.',
    details: [
      'The Surah order and ayah placement were decreed by divine revelation (Tawqifi), not human judgment.',
      'Scribes were ordered to read back what they had written to eliminate any clerical slip.',
      'Prominent scribes included Ali ibn Abi Talib, Ubayy ibn Ka\'b, Zayd ibn Thabit, and Mu\'awiyah.'
    ],
    keyFigures: ['Zayd ibn Thabit (RA)', 'Ali ibn Abi Talib (RA)', 'Ubayy ibn Ka\'b (RA)'],
    quranAyahRef: {
      arabic: 'فِي صُحُفٍ مُّكَرَّمَةٍ ۝ مَّرْفُوعَةٍ مُّطَهَّرَةٍ ۝ بِأَيْدِي سَفَرَةٍ ۝ كِرَامٍ بَرَرَةٍ',
      translation: '[Inscribed] on honored sheets, exalted and purified, in the hands of scribes, noble and dutiful.',
      reference: 'Surah \'Abasa (80:13-16)'
    },
    visualTheme: {
      accentBg: 'from-[#6B1B7E]/20 via-[#E0107F]/15 to-[#5B2A9A]/15',
      border: 'border-[#6B1B7E]/40',
      iconBg: 'bg-[#6B1B7E]'
    }
  },
  {
    id: 8,
    period: 'Physical Mediums of Early Writing',
    year: '7th Century Arabia',
    title: 'Raqq, Date-Palm Stalks & Shoulder Bones',
    arabicTitle: 'أَدَوَاتُ الْكِتَابَةِ عِنْدَ الصَّحَابَة',
    badge: 'Archaeological Integrity',
    summary: 'Before paper mills existed in Arabia, companions utilized high-durability natural materials to record every verse of the revelation.',
    details: [
      'Raqq (treated parchment leather) provided resilient durability that lasted centuries.',
      '\'Usb (stripped wide branches of date-palm trees) and Likhaf (smooth white limestone slabs).',
      'Aktaf (broad shoulder-blade bones of camels) and Adla\' (flat rib bones) preserved verses.'
    ],
    keyFigures: ['Companions of the Prophet ﷺ', 'Curators of Islamic Archaeology'],
    quranAyahRef: {
      arabic: 'وَالطُّورِ ۝ وَكِتَابٍ مَّسْطُورٍ ۝ فِي رَقٍّ مَّنشُورٍ',
      translation: 'By the mount, and [by] a Book inscribed in a parchment unrolled.',
      reference: 'Surah At-Tur (52:1-3)'
    },
    visualTheme: {
      accentBg: 'from-[#5B2A9A]/20 via-[#6B1B7E]/15 to-[#E0107F]/10',
      border: 'border-[#5B2A9A]/30',
      iconBg: 'bg-[#5B2A9A]'
    }
  },
  {
    id: 9,
    period: 'Al-\'Ardah Al-Akhirah',
    year: '632 CE (Ramadan, Final Year)',
    title: 'The Final Archangelic Audit & Cross-Check',
    arabicTitle: 'الْعَرْضَةُ الأَخِيرَةُ مَعَ جِبْرِيل',
    badge: 'Direct Peer Review',
    summary: 'In every Ramadan, Archangel Jibril reviewed the entire Quran once with the Prophet ﷺ. In his final year on earth, Jibril reviewed the entire Quran twice in its complete final sequence.',
    details: [
      'Zayd ibn Thabit and other primary scribes attended this final recitation session.',
      'The definitive recitation confirmed the abrogated verses and established the final eternal arrangement.',
      'Guaranteed absolute consensus of the Sahabah on the complete text of the Book of Allah.'
    ],
    keyFigures: ['Prophet Muhammad ﷺ', 'Archangel Jibril (AS)', 'Zayd ibn Thabit (RA)'],
    quranAyahRef: {
      arabic: 'إِنَّ عَلَيْنَا جَمْعَهُ وَقُرْآنَهُ ۝ فَإِذَا قَرَأْنَاهُ فَاتَّبِعْ قُرْآنَهُ',
      translation: 'Indeed, upon Us is its collection and its recitation. So when We have recited it, follow its recitation.',
      reference: 'Surah Al-Qiyamah (75:17-18)'
    },
    visualTheme: {
      accentBg: 'from-[#6B1B7E]/20 via-[#5B2A9A]/15 to-[#E0107F]/10',
      border: 'border-[#6B1B7E]/30',
      iconBg: 'bg-[#6B1B7E]'
    }
  },
  {
    id: 10,
    period: 'Farewell Pilgrimage',
    year: '632 CE (Mount Arafat)',
    title: 'The Completion of the Divine Favor',
    arabicTitle: 'حَجَّةُ الْوَدَاعِ وَتَمَامُ الدِّين',
    badge: 'Climax of Revelation',
    summary: 'Standing before over 100,000 pilgrims on the plains of Mount Arafat, Prophet Muhammad ﷺ received the momentous verse declaring the perfection and completion of Islam.',
    details: [
      'Revealed on the sacred Day of Arafah on a Friday afternoon.',
      'Umar ibn al-Khattab wept knowing the Prophet\'s earthly mission was successfully completed.',
      'The Prophet ﷺ asked: "Have I not delivered the message?" and 100,000 voices replied: "Yes!"'
    ],
    keyFigures: ['Prophet Muhammad ﷺ', 'Over 100,000 Sahabah at Mount Arafat'],
    quranAyahRef: {
      arabic: 'الْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ وَأَتْمَمْتُ عَلَيْكُمْ نِعْمَتِي وَرَضِيتُ لَكُمُ الْإِسْلَامَ دِينًا',
      translation: 'This day I have perfected for you your religion and completed My favor upon you and have approved for you Islam as religion.',
      reference: 'Surah Al-Ma\'idah (5:3)'
    },
    visualTheme: {
      accentBg: 'from-[#E0107F]/15 via-[#6B1B7E]/15 to-[#5B2A9A]/10',
      border: 'border-[#E0107F]/30',
      iconBg: 'bg-[#E0107F]'
    }
  },
  {
    id: 11,
    period: 'Passing of the Prophet ﷺ',
    year: '632 CE (Madinah Munawwarah)',
    title: 'Unbroken Living Memorization of the Sahabah',
    arabicTitle: 'انْتِقَالُ النَّبِيِّ ﷺ وَحِفْظُ الصَّحَابَة',
    badge: 'Living Hearts as Tablets',
    summary: 'When the Messenger of Allah ﷺ passed away, thousands of companions carried the entire Quran memorized in their chests, with written fragments in their homes.',
    details: [
      'The entire Quran was memorized word-for-word by hundreds of companions (Huffadh).',
      'Recited publicly in five daily prayers, Tahajjud, and Taraweeh across Madinah.',
      'No single verse was missing or disputed among the companions.'
    ],
    keyFigures: ['Abu Bakr As-Siddiq (RA)', 'Aisha bint Abi Bakr (RA)', 'The Entire Sahabah Community'],
    quranAyahRef: {
      arabic: 'وَمَا مُحَمَّدٌ إِلَّا رَسُولٌ قَدْ خَلَتْ مِن قَبْلِهِ الرُّسُلُ',
      translation: 'Muhammad is not but a messenger; [other] messengers have passed on before him.',
      reference: 'Surah Ali \'Imran (3:144)'
    },
    visualTheme: {
      accentBg: 'from-[#5B2A9A]/20 via-[#6B1B7E]/15 to-purple-100',
      border: 'border-[#6B1B7E]/30',
      iconBg: 'bg-[#6B1B7E]'
    }
  },
  {
    id: 12,
    period: 'Battle of Yamama',
    year: '633 CE (Yamama, Najd)',
    title: 'Martyrdom of the Reciters & Umar\'s Counsel',
    arabicTitle: 'مَعْرَكَةُ الْيَمَامَةِ وَمَشُورَةُ عُمَر',
    badge: 'Decisive Turning Point',
    summary: 'During the Ridda wars, over 70 master Quran memorizers attained martyrdom at Yamama. Umar ibn al-Khattab urgently advised Caliph Abu Bakr to collect all written verses into one bound volume.',
    details: [
      'Umar (RA) feared that further battles might claim more Huffadh, jeopardizing future generations.',
      'Abu Bakr (RA) initially hesitated, asking: "How can I do something the Prophet ﷺ did not do?"',
      'Allah opened Abu Bakr\'s heart to the immense wisdom of preserving the text in writing.'
    ],
    keyFigures: ['Umar ibn Al-Khattab (RA)', 'Abu Bakr As-Siddiq (RA)', 'Salim Mawla Abi Hudhayfah (RA)'],
    quranAyahRef: {
      arabic: 'إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ',
      translation: 'Indeed, it is We who sent down the Quran and indeed, We will be its guardian.',
      reference: 'Surah Al-Hijr (15:9)'
    },
    visualTheme: {
      accentBg: 'from-[#6B1B7E]/20 via-[#E0107F]/15 to-[#5B2A9A]/10',
      border: 'border-[#E0107F]/30',
      iconBg: 'bg-[#E0107F]'
    }
  },
  {
    id: 13,
    period: 'The First Bound Compilation (Suhuf)',
    year: '633 – 634 CE (Madinah)',
    title: 'Zayd ibn Thabit\'s Rigorous Two-Witness Standard',
    arabicTitle: 'جَمْعُ الصِّدِّيقِ بِإِشْرَافِ زَيْد',
    badge: 'First Master Codex',
    summary: 'Abu Bakr commissioned 21-year-old Zayd ibn Thabit, chief scribe of the Prophet ﷺ, to head the compilation. Zayd instituted a scientific standard unmatched in human literary history.',
    details: [
      'No verse was accepted in writing unless two upright witnesses testified they heard the Prophet ﷺ recite it.',
      'Cross-checked against the memory of dozens of living Huffadh and personal manuscripts.',
      'Collected into sheets of identical size (Al-Suhuf) kept safely in the caliph\'s custody.'
    ],
    keyFigures: ['Zayd ibn Thabit (RA)', 'Abu Bakr As-Siddiq (RA)', 'Khuzaima ibn Thabit (RA)'],
    quranAyahRef: {
      arabic: 'لَّقَدْ جَاءَكُمْ رَسُولٌ مِّنْ أَنفُسِكُمْ عَزِيزٌ عَلَيْهِ مَا عَنِتُّمْ حَرِيصٌ عَلَيْكُم',
      translation: 'There has certainly come to you a Messenger from among yourselves. Grievous to him is what you suffer; [he is] concerned over you.',
      reference: 'Surah At-Tawbah (9:128)'
    },
    visualTheme: {
      accentBg: 'from-[#6B1B7E]/20 via-[#5B2A9A]/15 to-[#E0107F]/10',
      border: 'border-[#6B1B7E]/30',
      iconBg: 'bg-[#6B1B7E]'
    }
  },
  {
    id: 14,
    period: 'Safekeeping with Hafsah (RA)',
    year: '634 – 650 CE (Madinah)',
    title: 'Preserved with the Mother of the Believers',
    arabicTitle: 'وَدِيعَةُ حَفْصَةَ أُمِّ الْمُؤْمِنِين',
    badge: 'Imperial Custody',
    summary: 'Following Abu Bakr\'s passing, the master Suhuf passed to Caliph Umar (RA). Upon Umar\'s martyrdom, the manuscript was entrusted to his scholarly daughter, Hafsah bint Umar (RA).',
    details: [
      'Hafsah (RA) was literate, highly learned in Quranic sciences, and a wife of the Prophet ﷺ.',
      'The manuscript was guarded with reverence in her home in Madinah for over a decade.',
      'Became the primary pristine source from which Caliph Uthman produced the global master codices.'
    ],
    keyFigures: ['Hafsah bint Umar (RA)', 'Umar ibn Al-Khattab (RA)', 'Uthman ibn Affan (RA)'],
    quranAyahRef: {
      arabic: 'وَقَرْنَ فِي بُيُوتِكُنَّ وَلَا تَبَرَّجْنَ تَبَرُّجَ الْجَاهِلِيَّةِ الْأُولَىٰ',
      translation: 'And abide in your houses and do not display yourselves as [was] the display of the former times of ignorance.',
      reference: 'Surah Al-Ahzab (33:33)'
    },
    visualTheme: {
      accentBg: 'from-[#5B2A9A]/20 via-[#6B1B7E]/15 to-[#E0107F]/10',
      border: 'border-[#5B2A9A]/30',
      iconBg: 'bg-[#5B2A9A]'
    }
  },
  {
    id: 15,
    period: 'The Uthmanic Canon (Mushaf al-Imam)',
    year: '650 CE (Madinah Munawwarah)',
    title: 'Standardizing the Universal Archetype',
    arabicTitle: 'مُصْحَفُ عُثْمَانَ ذِي النُّورَيْن',
    badge: 'Universal Consensus',
    summary: 'When general Hudhayfah ibn al-Yaman reported fierce disputes over pronunciation on the Armenian front, Caliph Uthman (RA) united the global Ummah on one pristine Qurayshi orthography.',
    details: [
      'Formed a prestigious four-scholar committee: Zayd ibn Thabit, Abdullah ibn al-Zubayr, Sa\'id ibn al-\'As, and Abdur-Rahman ibn al-Harith.',
      'If any spelling nuance arose, it was written in the authoritative dialect of Quraysh.',
      'All companions, including Ali ibn Abi Talib (RA), wholeheartedly affirmed and celebrated Uthman\'s action.'
    ],
    keyFigures: ['Uthman ibn Affan (RA)', 'Hudhayfah ibn al-Yaman (RA)', 'Abdullah ibn al-Zubayr (RA)'],
    quranAyahRef: {
      arabic: 'وَاعْتَصِمُوا بِحَبْلِ اللَّهِ جَمِيعًا وَلَا تَفَرَّقُوا',
      translation: 'And hold firmly to the rope of Allah all together and do not become divided.',
      reference: 'Surah Ali \'Imran (3:103)'
    },
    visualTheme: {
      accentBg: 'from-[#6B1B7E]/20 via-[#E0107F]/15 to-[#5B2A9A]/15',
      border: 'border-[#6B1B7E]/40',
      iconBg: 'bg-[#6B1B7E]'
    }
  },
  {
    id: 16,
    period: 'Regional Codex Dispatches',
    year: '650 – 655 CE (Global Centers)',
    title: 'Mus\'hafs Sent to Makkah, Kufa, Basra & Damascus',
    arabicTitle: 'إِرْسَالُ الْمَصَاحِفِ إِلَى الأَمْصَار',
    badge: 'Global Dissemination',
    summary: 'Caliph Uthman dispatched authoritative handwritten master copies to every major provincial metropolis, accompanied by certified master teachers of recitation.',
    details: [
      'Master codices sent to Makkah (with Abdullah ibn al-Sa\'ib), Kufa (with Abu Abdur-Rahman al-Sulami), Basra (with \'Amir ibn Abd al-Qays), and Damascus (with Al-Mughirah ibn Abi Shihab).',
      'One copy retained in Madinah (known as Mushaf al-Imam).',
      'Established the unbroken global chain of recitation (Sanad / Isnad) that True Way Quran teaches today.'
    ],
    keyFigures: ['Uthman ibn Affan (RA)', 'Abu Abdur-Rahman al-Sulami', 'Abdullah ibn al-Sa\'ib'],
    quranAyahRef: {
      arabic: 'يَهْدِي بِهِ اللَّهُ مَنِ اتَّبَعَ رِضْوَانَهُ سُبُلَ السَّلَامِ',
      translation: 'By which Allah guides those who pursue His pleasure to the ways of peace.',
      reference: 'Surah Al-Ma\'idah (5:16)'
    },
    visualTheme: {
      accentBg: 'from-[#5B2A9A]/20 via-[#6B1B7E]/15 to-purple-100',
      border: 'border-[#6B1B7E]/30',
      iconBg: 'bg-[#6B1B7E]'
    }
  },
  {
    id: 17,
    period: 'Invention of Vocalization Dots',
    year: '688 CE (Basra, Iraq)',
    title: 'Abu al-Aswad al-Du\'ali & The Red Dots System',
    arabicTitle: 'نَقْطُ أَبِي الأَسْوَدِ الدُّؤَلِيّ',
    badge: 'Phonetic Protection',
    summary: 'As millions of non-Arabs embraced Islam across Persia and Byzantium, mispronunciations (Lahn) threatened grammar. Abu al-Aswad al-Du\'ali devised colored dots to indicate short vowels.',
    details: [
      'Instructed a scribe: "When I open my mouth, place a red dot above the letter; when I drop my jaw, place a dot below; when I round my lips, place a dot in front."',
      'Prevented grammatical solecisms while maintaining the exact consonantal skeleton of Uthman.',
      'Laid the foundation for Arabic grammar and phonological sciences.'
    ],
    keyFigures: ['Abu al-Aswad al-Du\'ali', 'Ziyad ibn Abi Sufyan (Governor of Basra)'],
    quranAyahRef: {
      arabic: 'قُرْآنًا عَرَبِيًّا غَيْرَ ذِي عِوَجٍ لَّعَلَّهُمْ يَتَّقُونَ',
      translation: 'An Arabic Quran, without any crookedness, that they might become conscious of Allah.',
      reference: 'Surah Az-Zumar (39:28)'
    },
    visualTheme: {
      accentBg: 'from-[#E0107F]/15 via-[#6B1B7E]/15 to-[#5B2A9A]/10',
      border: 'border-[#E0107F]/30',
      iconBg: 'bg-[#E0107F]'
    }
  },
  {
    id: 18,
    period: 'Dotting Similar Consonants (I\'jam)',
    year: '700 CE (Umayyad Era)',
    title: 'Nasr ibn Asim & Yahya ibn Ya\'mur Add Permanent Dots',
    arabicTitle: 'إِعْجَامُ نَصْرِ بْنِ عَاصِمٍ وَيَحْيَى',
    badge: 'Orthographic Perfection',
    summary: 'Letters sharing identical shapes (like ب, ت, ث, ن, ي and ج, ح, خ) had no distinguishing marks. Commissioned by Al-Hajjaj ibn Yusuf, master linguists added permanent black diacritical dots.',
    details: [
      'Introduced single, double, and triple dots above and below consonant glyphs.',
      'Differentiated dots of letters from the colored vowel dots of Abu al-Aswad.',
      'Ensured even beginning students across the globe could read every consonant with 100% clarity.'
    ],
    keyFigures: ['Nasr ibn Asim al-Laythi', 'Yahya ibn Ya\'mur', 'Al-Hajjaj ibn Yusuf al-Thaqafi'],
    quranAyahRef: {
      arabic: 'كِتَابٌ أُحْكِمَتْ آيَاتُهُ ثُمَّ فُصِّلَتْ مِن لَّدُنْ حَكِيمٍ خَبِيرٍ',
      translation: '[This is] a Book whose verses are perfected and then presented in detail from one who is Wise and Acquainted.',
      reference: 'Surah Hud (11:1)'
    },
    visualTheme: {
      accentBg: 'from-[#6B1B7E]/20 via-[#5B2A9A]/20 to-[#E0107F]/15',
      border: 'border-[#5B2A9A]/30',
      iconBg: 'bg-[#5B2A9A]'
    }
  },
  {
    id: 19,
    period: 'Modern Harakat & Tashkeel',
    year: '786 CE (Basra & Baghdad)',
    title: 'Al-Khalil ibn Ahmad al-Farahidi\'s Diacritic System',
    arabicTitle: 'تَشْكِيلُ الْخَلِيلِ بْنِ أَحْمَدَ الْفَرَاهِيدِيّ',
    badge: 'Universal Notation',
    summary: 'The genius philologist and lexicographer Al-Khalil invented the elegant diacritical shapes used worldwide today: the slanted stroke for Fathah (ـَ), teardrop for Dammah (ـُ), bottom stroke for Kasrah (ـِ), mini circle for Sukoon (ـْ), and head of sheen for Shaddah (ـّ).',
    details: [
      'Replaced confusing red dots with distinct miniature letter shapes (e.g. mini Alif for Fathah, mini Waw for Dammah).',
      'Created universal clarity for non-Arabic readers and young children in Madani Qaida.',
      'Remains the unchallenged typographic standard across all published Mus\'hafs in the world today.'
    ],
    keyFigures: ['Al-Khalil ibn Ahmad al-Farahidi', 'Sibawayh (His Student & Master Grammarian)'],
    quranAyahRef: {
      arabic: 'وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا',
      translation: 'And recite the Quran with measured, rhythmic recitation.',
      reference: 'Surah Al-Muzzammil (73:4)'
    },
    visualTheme: {
      accentBg: 'from-[#6B1B7E]/20 via-[#5B2A9A]/15 to-[#E0107F]/10',
      border: 'border-[#6B1B7E]/30',
      iconBg: 'bg-[#6B1B7E]'
    }
  },
  {
    id: 20,
    period: 'Codification of the Seven Recitations',
    year: '936 CE (Baghdad, Abbasid Era)',
    title: 'Ibn Mujahid\'s Kitab al-Sab\'ah (The 7 Qira\'at)',
    arabicTitle: 'تَوْثِيقُ الْقِرَاءَاتِ السَّبْعِ لِابْنِ مُجَاهِد',
    badge: 'Scholarly Canonicity',
    summary: 'Abu Bakr ibn Mujahid formally verified and codified the Seven Mutawatir Recitations (Nafi\', Ibn Kathir, Abu \'Amr, Ibn \'Amir, \'Asim, Hamzah, and Al-Kisa\'i) with rigorous unbroken chains to the Sahabah.',
    details: [
      'Each canonical Qira\'ah strictly satisfied 3 conditions: authentic continuous chain, conformity to Uthmanic script, and classic Arabic grammar.',
      'Later expanded by Imam Ibn al-Jazari (d. 1429 CE) to the Ten Mutawatir Qira\'at.',
      'Hafs \'an \'Asim and Warsh \'an Nafi\' are the most widely recited traditions across the Muslim world today.'
    ],
    keyFigures: ['Ibn Mujahid', 'Imam \'Asim & Hafs', 'Imam Nafi\' & Warsh', 'Ibn al-Jazari'],
    quranAyahRef: {
      arabic: 'فَاقْرَءُوا مَا تَيَسَّرَ مِنَ الْقُرْآنِ',
      translation: 'So recite what is easy [for you] of the Quran.',
      reference: 'Surah Al-Muzzammil (73:20)'
    },
    visualTheme: {
      accentBg: 'from-[#5B2A9A]/20 via-[#6B1B7E]/15 to-[#E0107F]/10',
      border: 'border-[#5B2A9A]/30',
      iconBg: 'bg-[#5B2A9A]'
    }
  },
  {
    id: 21,
    period: 'The Cairo Amiri Standard Edition',
    year: '1924 CE (Cairo, Egypt)',
    title: 'The Al-Azhar Committee\'s Universal Typography',
    arabicTitle: 'مُصْحَفُ الْقَاهِرَةِ الأَمِيرِيّ (١٩٢٤ م)',
    badge: 'Modern Print Masterpiece',
    summary: 'Under the patronage of King Fuad I and supervised by an elite Al-Azhar scholarly council led by Sheikh Muhammad Ali al-Dabba\', the Amiri Press produced the universal gold-standard typographic Mus\'haf.',
    details: [
      'Meticulously grounded in the classical orthography of Abu \'Amr al-Dani and Abu Dawud Sulayman ibn Najah.',
      'Standardized page breaks, Surah headers, verse markers, and stopping signs (Waqf) worldwide.',
      'Became the foundational basis adopted by Saudi Arabia, Pakistan, Turkey, and worldwide publishers.'
    ],
    keyFigures: ['Sheikh Muhammad Ali al-Dabba\'', 'Scholars of Al-Azhar University', 'King Fuad I of Egypt'],
    quranAyahRef: {
      arabic: 'لَا يَأْتِيهِ الْبَاطِلُ مِن بَيْنِ يَدَيْهِ وَلَا مِنْ خَلْفِهِ ۖ تَنزِيلٌ مِّنْ حَكِيمٍ حَمِيدٍ',
      translation: 'Falsehood cannot approach it from before it or from behind it; [it is] a revelation from a [Lord who is] Wise and Praiseworthy.',
      reference: 'Surah Fussilat (41:42)'
    },
    visualTheme: {
      accentBg: 'from-[#6B1B7E]/20 via-[#E0107F]/15 to-[#5B2A9A]/15',
      border: 'border-[#6B1B7E]/40',
      iconBg: 'bg-[#6B1B7E]'
    }
  },
  {
    id: 22,
    period: 'Contemporary Era & Digital AI',
    year: '1984 CE – Present (Madinah & Global)',
    title: 'King Fahd Complex to Real-Time Voice Verification',
    arabicTitle: 'مُجَمَّعُ الْمَلِكِ فَهْدٍ وَالتَّحْقِيقُ الصَّوْتِيُّ الذَّكِيّ',
    badge: 'Living Miraculous Isnad',
    summary: 'The King Fahd Complex in Madinah has printed over 350 million Mus\'hafs in 70+ languages. Today, True Way Quran blends this sacred unbroken heritage with real-time acoustic Tajweed verification for global learners.',
    details: [
      'Over 10 million living Huffadh preserve the Holy Quran letter-for-letter across every continent.',
      'High-precision audio recognition verifies Makharij and Tajweed rules down to milliseconds.',
      'Unbroken living transmission (Sanad) flows continuously from Prophet Muhammad ﷺ directly to our certified mentors and students.'
    ],
    keyFigures: ['King Fahd Complex Scholars', 'Global Sanad Holders & Huffadh', 'True Way Quran Academic Faculty'],
    quranAyahRef: {
      arabic: 'وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ فَهَلْ مِن مُّدَّكِرٍ',
      translation: 'And We have certainly made the Quran easy for remembrance, so is there any who will remember?',
      reference: 'Surah Al-Qamar (54:17)'
    },
    visualTheme: {
      accentBg: 'from-[#5B2A9A]/20 via-[#6B1B7E]/15 to-purple-100',
      border: 'border-[#6B1B7E]/30',
      iconBg: 'bg-[#6B1B7E]'
    }
  }
];

export const QuranHistoryCarousel: React.FC<{ onExploreQuran?: () => void }> = ({ onExploreQuran }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const autoSlideDuration = 12000; // 12 seconds per milestone
  const timelineScrollRef = useRef<HTMLDivElement>(null);

  const currentSlide = QURAN_HISTORY_SLIDES[currentIndex];

  // Auto-advance timer with smooth progress bar
  useEffect(() => {
    if (!isAutoPlaying) {
      setProgress(0);
      return;
    }

    const intervalTime = 100;
    const step = (intervalTime / autoSlideDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentIndex((idx) => (idx + 1) % QURAN_HISTORY_SLIDES.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isAutoPlaying, currentIndex]);

  // Center active thumbnail in timeline on slide change
  useEffect(() => {
    if (timelineScrollRef.current) {
      const activeEl = timelineScrollRef.current.querySelector(`[data-slide-index="${currentIndex}"]`) as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [currentIndex]);

  const handlePrev = () => {
    setProgress(0);
    setCurrentIndex((prev) => (prev === 0 ? QURAN_HISTORY_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setProgress(0);
    setCurrentIndex((prev) => (prev + 1) % QURAN_HISTORY_SLIDES.length);
  };

  const handleSelectSlide = (idx: number) => {
    setProgress(0);
    setCurrentIndex(idx);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white via-[#faf5ff] to-white border-y border-[#6B1B7E]/10 relative overflow-hidden">
      {/* Brand Color Ambient Gradients */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#6B1B7E]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#E0107F]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6B1B7E]/10 border border-[#6B1B7E]/25 text-[#6B1B7E] text-xs font-black uppercase tracking-wider shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#E0107F]" />
            <span>Interactive Historical Timeline · 22 Chronological Milestones</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#6B1B7E] tracking-tight">
            History & Preservation of the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B1B7E] via-[#5B2A9A] to-[#E0107F]">
              Holy Quran
            </span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base font-medium">
            Explore 1,400+ years of miraculous letter-for-letter preservation, from the primordial Preserved Tablet and Cave Hira to Uthmanic codices and modern digital precision.
          </p>
        </div>

        {/* Swipeable Mobile / Desktop Horizontal Timeline Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
            <span className="flex items-center gap-1.5 text-[#6B1B7E]">
              <Layers className="w-3.5 h-3.5 text-[#E0107F]" />
              Select Any Milestone (Swipe Horizontally)
            </span>
            <span className="text-[#6B1B7E]">
              {currentIndex + 1} of {QURAN_HISTORY_SLIDES.length}
            </span>
          </div>

          <div 
            ref={timelineScrollRef}
            className="flex items-center gap-2.5 overflow-x-auto pb-3 pt-1 px-1 snap-x snap-mandatory no-scrollbar scroll-smooth"
          >
            {QURAN_HISTORY_SLIDES.map((slide, idx) => {
              const isActive = currentIndex === idx;
              return (
                <button
                  key={slide.id}
                  data-slide-index={idx}
                  onClick={() => handleSelectSlide(idx)}
                  className={`shrink-0 snap-center px-3.5 py-2 rounded-xl text-left transition duration-200 border cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#6B1B7E] to-[#5B2A9A] text-white border-[#6B1B7E] shadow-md scale-102 ring-2 ring-[#E0107F]/40'
                      : 'bg-white hover:bg-purple-50 text-slate-700 border-[#6B1B7E]/15'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center shrink-0 ${
                      isActive ? 'bg-[#E0107F] text-white' : 'bg-purple-100 text-[#6B1B7E]'
                    }`}>
                      {slide.id}
                    </span>
                    <div>
                      <p className={`text-xs font-bold truncate max-w-[170px] ${isActive ? 'text-white' : 'text-slate-900'}`}>
                        {slide.period}
                      </p>
                      <p className={`text-[10px] truncate max-w-[170px] ${isActive ? 'text-purple-200' : 'text-slate-500'}`}>
                        {slide.year}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Milestone Spotlight Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#6B1B7E]/20 shadow-2xl relative overflow-hidden space-y-8">
          
          {/* Top Auto-Play Countdown Progress Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-purple-100">
            <div 
              className="h-full bg-gradient-to-r from-[#6B1B7E] via-[#5B2A9A] to-[#E0107F] transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 pt-2">
            
            {/* Left Column: Timeline, Titles, and Narration */}
            <div className="lg:col-span-7 space-y-5">
              
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 rounded-full bg-[#6B1B7E] text-white text-xs font-black tracking-wider uppercase shadow-xs">
                  Milestone {currentSlide.id} of {QURAN_HISTORY_SLIDES.length}
                </span>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#6B1B7E]/30 text-xs font-bold text-[#6B1B7E] shadow-2xs">
                  <Clock className="w-3.5 h-3.5 text-[#E0107F]" />
                  <span>{currentSlide.year}</span>
                </span>

                <span className="px-2.5 py-1 rounded-full bg-[#E0107F]/10 border border-[#E0107F]/30 text-[#E0107F] text-xs font-bold">
                  {currentSlide.badge}
                </span>
              </div>

              <div>
                <p className="text-xl sm:text-2xl font-arabic font-quran text-[#6B1B7E] font-bold mb-1" dir="rtl">
                  {currentSlide.arabicTitle}
                </p>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-snug">
                  {currentSlide.title}
                </h3>
              </div>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed bg-purple-50/50 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-[#6B1B7E]/10">
                {currentSlide.summary}
              </p>

              {/* Historical Highlights */}
              <div className="space-y-2">
                <p className="text-xs font-black tracking-wider uppercase text-[#6B1B7E] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#E0107F]" />
                  <span>Historical Verification Facts</span>
                </p>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                  {currentSlide.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2 bg-white/80 p-2.5 rounded-xl border border-purple-100 shadow-2xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E0107F] mt-2 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Personalities */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-500">Key Figures & Scholars:</span>
                {currentSlide.keyFigures.map((fig, i) => (
                  <span key={i} className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white border border-[#6B1B7E]/20 text-[#6B1B7E] shadow-2xs">
                    {fig}
                  </span>
                ))}
              </div>

            </div>

            {/* Right Column: Quranic Ayah Inscription & Visual Emblem */}
            <div className="lg:col-span-5 space-y-4">
              
              {currentSlide.quranAyahRef && (
                <div className="bg-white rounded-2xl p-6 border-2 border-[#6B1B7E]/25 shadow-xl relative space-y-4">
                  <div className="flex items-center justify-between border-b border-[#6B1B7E]/15 pb-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-black text-[#6B1B7E]">
                      <BookOpen className="w-4 h-4 text-[#E0107F]" />
                      <span>Divine Guarantee & Proof</span>
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">
                      {currentSlide.quranAyahRef.reference}
                    </span>
                  </div>

                  <p className="text-xl sm:text-2xl font-arabic font-quran text-[#6B1B7E] leading-loose text-center font-bold" dir="rtl">
                    {currentSlide.quranAyahRef.arabic}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 italic text-center leading-relaxed">
                    "{currentSlide.quranAyahRef.translation}"
                  </p>
                </div>
              )}

              {/* Academy Connection Banner */}
              <div className="bg-gradient-to-r from-[#6B1B7E] via-[#5B2A9A] to-[#E0107F] text-white p-5 rounded-2xl shadow-lg space-y-3">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-300" />
                  <span className="font-bold text-xs uppercase tracking-wide">Live Heritage at True Way Quran</span>
                </div>
                <p className="text-xs text-purple-100 leading-relaxed">
                  Our certified mentors carry authentic chains of transmission (Ijazah with Isnad) tracing directly back through these 22 pivotal generations to the Prophet Muhammad ﷺ.
                </p>
                {onExploreQuran && (
                  <button
                    onClick={onExploreQuran}
                    className="w-full py-2.5 bg-white text-[#6B1B7E] hover:bg-purple-50 text-xs font-black rounded-xl transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#E0107F]" />
                    <span>Open Full 114 Surahs Library</span>
                  </button>
                )}
              </div>

            </div>

          </div>

          {/* Carousel Controls Bottom Bar */}
          <div className="pt-6 border-t border-[#6B1B7E]/15 flex flex-wrap items-center justify-between gap-4">
            
            {/* Slide Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  handlePrev();
                  setIsAutoPlaying(false);
                }}
                className="w-10 h-10 rounded-full bg-white hover:bg-[#6B1B7E] hover:text-white text-[#6B1B7E] border border-[#6B1B7E]/30 flex items-center justify-center transition shadow-xs cursor-pointer"
                title="Previous Milestone"
                aria-label="Previous Milestone"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => {
                  handleNext();
                  setIsAutoPlaying(false);
                }}
                className="w-10 h-10 rounded-full bg-white hover:bg-[#6B1B7E] hover:text-white text-[#6B1B7E] border border-[#6B1B7E]/30 flex items-center justify-center transition shadow-xs cursor-pointer"
                title="Next Milestone"
                aria-label="Next Milestone"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-purple-50 text-slate-700 border border-[#6B1B7E]/20 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                title={isAutoPlaying ? 'Pause Slideshow' : 'Resume Auto-Play (12s per slide)'}
              >
                {isAutoPlaying ? <Pause className="w-3.5 h-3.5 text-[#E0107F]" /> : <Play className="w-3.5 h-3.5 text-emerald-600" />}
                <span>{isAutoPlaying ? 'Auto-Slide (12s)' : 'Paused'}</span>
              </button>
            </div>

            {/* Slide indicator dots (scrollable or condensed) */}
            <div className="hidden sm:flex items-center gap-1 max-w-[280px] overflow-hidden">
              {QURAN_HISTORY_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectSlide(i)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentIndex === i ? 'w-6 bg-gradient-to-r from-[#6B1B7E] to-[#E0107F]' : 'w-1.5 bg-[#6B1B7E]/20 hover:bg-[#6B1B7E]/50'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Counter */}
            <div className="text-xs font-mono font-bold text-slate-600 bg-purple-50 px-3 py-1.5 rounded-lg border border-purple-200">
              {String(currentIndex + 1).padStart(2, '0')} / {String(QURAN_HISTORY_SLIDES.length).padStart(2, '0')} Milestones
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
