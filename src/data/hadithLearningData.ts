export interface HadithItem {
  id: string;
  category: 'manners' | 'parents' | 'knowledge' | 'kindness' | 'sincerity' | 'salah' | 'honesty' | 'nawawi40';
  categoryLabel: string;
  hadithNumber?: number;
  title: string;
  narrator: string;
  arabicText: string;
  englishTranslation: string;
  sourceReference: string;
  grade: 'Sahih' | 'Hasan';
  explanation: string;
  practicalLessons: string[];
}

export const HADITH_LEARNING_DATA: HadithItem[] = [
  {
    id: 'hadith-nawawi-1',
    category: 'sincerity',
    categoryLabel: 'Sincerity & Intention',
    hadithNumber: 1,
    title: 'Actions are Judged by Intentions (Innamal A\'malu Bin-Niyyat)',
    narrator: 'Amir al-Mu\'mineen Umar ibn al-Khattab (RA)',
    arabicText: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى اللَّهِ وَرَسُولِهِ فَهِجْرَتُهُ إِلَى اللَّهِ وَرَسُولِهِ، وَمَنْ كَانَتْ هِجْرَتُهُ لِدُنْيَا يُصِيبُهَا أَوِ امْرَأَةٍ يَنْكِحُهَا فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ',
    englishTranslation: 'Actions are judged by intentions, and every person will only have what they intended. So whoever emigrated for Allah and His Messenger, then their emigration is for Allah and His Messenger; and whoever emigrated for a worldly gain they could acquire or for a woman to marry, their emigration is for that which they emigrated for.',
    sourceReference: 'Sahih al-Bukhari 1 & Sahih Muslim 1907 (Hadith 1 of Forty Nawawi)',
    grade: 'Sahih',
    explanation: 'Regarded by Imam Ash-Shafi\'i as one third of all Islamic knowledge. It establishes that the spiritual validity and celestial reward of any deed depends entirely upon the purity of the hidden intention in the heart. A small deed with sincere intention becomes immense, while a massive deed done for praise is rendered worthless.',
    practicalLessons: [
      'Renew your intention before every prayer, Quran recitation, and charitable act.',
      'Transform mundane habits (eating, sleeping, exercising, studying) into worship by intending strength for Allah\'s pleasure.',
      'Constantly guard your heart against vanity (Riya) and craving social praise.'
    ]
  },
  {
    id: 'hadith-manners-1',
    category: 'manners',
    categoryLabel: 'Good Manners & Character',
    hadithNumber: 2,
    title: 'The Best of Believers is the Best in Character',
    narrator: 'Abdullah ibn Amr (RA)',
    arabicText: 'إِنَّ مِنْ خِيَارِكُمْ أَحْسَنَكُمْ أَخْلَاقًا',
    englishTranslation: 'Indeed, the best among you are those who possess the best character.',
    sourceReference: 'Sahih al-Bukhari 3559 & Sahih Muslim 2321',
    grade: 'Sahih',
    explanation: 'Prophet Muhammad ﷺ emphasized that true religiosity is not merely outward rituals, but how one treats family, neighbors, strangers, and subordinates with gentle forbearance, humility, truthfulness, and generous warmth.',
    practicalLessons: [
      'Greet others with a cheerful, warm smile; the Prophet ﷺ said: "Smiling at your brother is charity."',
      'Suppress anger in discussions and speak gentle, helpful words.',
      'Treat service workers, classmates, and elders with deep respect.'
    ]
  },
  {
    id: 'hadith-parents-1',
    category: 'parents',
    categoryLabel: 'Respect to Parents',
    hadithNumber: 3,
    title: 'Who is Most Deserving of Your Companionship and Care?',
    narrator: 'Abu Hurairah (RA)',
    arabicText: 'جَاءَ رَجُلٌ إِلَى رَسُولِ اللَّهِ ﷺ فَقَالَ: يَا رَسُولَ اللَّهِ، مَنْ أَحَقُّ النَّاسِ بِحُسْنِ صَحَابَتِي؟ قَالَ: «أُمُّكَ»، قَالَ: ثُمَّ مَنْ؟ قَالَ: «ثُمَّ أُمُّكَ»، قَالَ: ثُمَّ مَنْ؟ قَالَ: «ثُمَّ أُمُّكَ»، قَالَ: ثُمَّ مَنْ؟ قَالَ: «ثُمَّ أَبُوكَ»',
    englishTranslation: 'A man came to the Messenger of Allah ﷺ and asked: "O Messenger of Allah! Who among people is most deserving of my good companionship and care?" He replied: "Your mother." The man asked: "Then who?" He replied: "Your mother." The man asked: "Then who?" He replied: "Your mother." The man asked: "Then who?" He replied: "Then your father."',
    sourceReference: 'Sahih al-Bukhari 5971 & Sahih Muslim 2548',
    grade: 'Sahih',
    explanation: 'The mother undergoes hardship during pregnancy, labor, nursing, and sleepless nights of child-rearing. Islam accords her three degrees of special compassion and honor, followed by the father who provides, protects, and guides.',
    practicalLessons: [
      'Never raise your voice or say "Uff" (an expression of irritation) to your parents.',
      'Call and visit your parents regularly, eagerly assisting with their household needs.',
      'Make heartfelt Dua for them daily: "Rabbi-rhamhuma kama rabbayani sagheera."'
    ]
  },
  {
    id: 'hadith-kindness-1',
    category: 'kindness',
    categoryLabel: 'Kindness & Mercy',
    hadithNumber: 4,
    title: 'The Merciful are Shown Mercy by the Most Merciful',
    narrator: 'Abdullah ibn Amr ibn al-Aas (RA)',
    arabicText: 'الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَٰنُ، ارْحَمُوا مَنْ فِي الأَرْضِ يَرْحَمْكُمْ مَنْ فِي السَّمَاءِ',
    englishTranslation: 'The merciful are shown mercy by the Most Merciful. Show mercy to those on earth, and the One in heaven will show mercy to you.',
    sourceReference: 'Sunan at-Tirmidhi 1924 & Sunan Abi Dawud 4941 (Sahih)',
    grade: 'Sahih',
    explanation: 'Known as "Hadith Musalsal bil-Awwaliyyah", this is often the very first Hadith a student of sacred Islamic knowledge is taught by their teacher. It conditions the Muslim to embody universal empathy, compassion to humans, animals, and the living environment.',
    practicalLessons: [
      'Refrain from animal cruelty and care for stray animals with water and feed.',
      'Pardon those who wrong you, remembering your own need for Allah\'s divine forgiveness.',
      'Support orphans, widows, and distressed families in your local community.'
    ]
  },
  {
    id: 'hadith-honesty-1',
    category: 'honesty',
    categoryLabel: 'Honesty & Truthfulness',
    hadithNumber: 5,
    title: 'Truthfulness Leads to Righteousness and Paradise',
    narrator: 'Abdullah ibn Mas\'ud (RA)',
    arabicText: 'عَلَيْكُمْ بِالصِّدْقِ، فَإِنَّ الصِّدْقَ يَهْدِي إِلَى البِرِّ، وَإِنَّ البِرَّ يَهْدِي إِلَى الجَنَّةِ، وَمَا يَزَالُ الرَّجُلُ يَصْدُقُ وَيَتَحَرَّى الصِّدْقَ حَتَّى يُكْتَبَ عِنْدَ اللَّهِ صِدِّيقًا',
    englishTranslation: 'You must hold fast to truthfulness, for truthfulness leads to righteousness, and righteousness leads to Paradise. A person continues to speak the truth and strives for truthfulness until they are registered with Allah as a Siddiq (a thoroughly truthful person).',
    sourceReference: 'Sahih al-Bukhari 6094 & Sahih Muslim 2607',
    grade: 'Sahih',
    explanation: 'Truthfulness (Sidq) is the foundation of moral integrity. Lying corrupts character and leads to hypocrisy, while unwavering truth builds trust, clears conscience, and elevates the believer to the rank of the Siddiqeen.',
    practicalLessons: [
      'Never lie, even in jest or when trying to save face after making a mistake.',
      'Honor business contracts and give honest measurements without concealment.',
      'Refrain from sharing unverified rumors or gossip on social media.'
    ]
  },
  {
    id: 'hadith-knowledge-1',
    category: 'knowledge',
    categoryLabel: 'Sacred Knowledge & Quran',
    hadithNumber: 6,
    title: 'The Best of You are Those Who Learn the Quran and Teach It',
    narrator: 'Uthman ibn Affan (RA)',
    arabicText: 'خَيْرُكُمْ مَنْ تَعَلَّمَ القُرْآنَ وَعَلَّمَهُ',
    englishTranslation: 'The best among you are those who learn the Holy Quran and teach it to others.',
    sourceReference: 'Sahih al-Bukhari 5027',
    grade: 'Sahih',
    explanation: 'The Word of Allah is the most sacred speech in existence. Therefore, those engaged in learning its letters, understanding its divine meanings, and transmitting it to subsequent generations hold the highest nobility in the Ummah.',
    practicalLessons: [
      'Commit to a daily schedule of Quran reading and understanding.',
      'Help siblings, children, or fellow students learn Qaida and Tajweed.',
      'Support verified Quran academies and scholars preserving sacred recitation.'
    ]
  },
  {
    id: 'hadith-salah-1',
    category: 'salah',
    categoryLabel: 'Importance of Prayer',
    hadithNumber: 7,
    title: 'The Five Prayers Wash Away Sins Like a Flowing River',
    narrator: 'Abu Hurairah (RA)',
    arabicText: 'أَرَأَيْتُمْ لَوْ أَنَّ نَهَرًا بِبَابِ أَحَدِكُمْ يَغْتَسِلُ مِنْهُ كُلَّ يَوْمٍ خَمْسَ مَرَّاتٍ، هَلْ يَبْقَى مِنْ دَرَنِهِ شَيْءٌ؟ قَالُوا: لَا يَبْقَى مِنْ دَرَنِهِ شَيْءٌ. قَالَ: «فَذَٰلِكَ مَثَلُ الصَّلَوَاتِ الخَمْسِ، يَمْحُو اللَّهُ بِهِنَّ الخَطَايَا»',
    englishTranslation: 'The Prophet ﷺ asked: "Tell me, if there was a river at the door of one of you in which he bathed five times a day, would any dirt remain on him?" They replied: "No dirt would remain on him." The Prophet ﷺ said: "That is the example of the five daily prayers: through them, Allah washes away sins."',
    sourceReference: 'Sahih al-Bukhari 528 & Sahih Muslim 667',
    grade: 'Sahih',
    explanation: 'A vivid physical parable demonstrating how the five daily prayers serve as a spiritual cleanse, lifting the burdens of accumulated errors, stress, and guilt so the soul remains pristine.',
    practicalLessons: [
      'Prioritize establishing Salah immediately as soon as the prayer time begins.',
      'Perform Wudu mindfully, feeling sins wash away with the flowing water droplets.',
      'Pray with presence of heart, contemplating the meaning of what you recite.'
    ]
  },
  {
    id: 'hadith-nawawi-2',
    category: 'nawawi40',
    categoryLabel: 'Forty Hadith Nawawi',
    hadithNumber: 13,
    title: 'Loving for Your Brother What You Love for Yourself',
    narrator: 'Anas ibn Malik (RA)',
    arabicText: 'لَا يُؤْمِنُ أَحَدُكُمْ حَتَّىٰ يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ',
    englishTranslation: 'None of you truly believes until he loves for his brother what he loves for himself.',
    sourceReference: 'Sahih al-Bukhari 13 & Sahih Muslim 45 (Hadith 13 of Forty Nawawi)',
    grade: 'Sahih',
    explanation: 'Faith reaches spiritual perfection when selfishness dissolves into genuine communal empathy, wishing peace, safety, prosperity, and guidance for all fellow human beings just as one wishes for oneself.',
    practicalLessons: [
      'Rejoice when your brother or sister succeeds instead of harboring envy (Hasad).',
      'Share food, knowledge, and opportunities generously with others.',
      'Defend fellow Muslims and neighbors in their absence.'
    ]
  }
];
