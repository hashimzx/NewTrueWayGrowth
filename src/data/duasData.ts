import { IslamicDua } from '../types';

export const AUTHENTIC_DUAS: IslamicDua[] = [
  // 1. Quran Study & Knowledge
  {
    id: 'dua-study-1',
    category: 'quran_study',
    title: 'Dua for Increase in Knowledge (Before Quran/Qaida Study)',
    arabic: 'رَّبِّ زِدْنِي عِلْمًا',
    transliteration: 'Rabbi zidni \'ilma.',
    englishTranslation: 'My Lord, increase me in knowledge.',
    reference: 'Surah Ta-Ha (20:114)',
    virtue: 'Recited by students and teachers prior to every Quran lesson, Tajweed practice, and revision.'
  },
  {
    id: 'dua-study-2',
    category: 'quran_study',
    title: 'Dua for Ease of Speech and Clear Pronunciation',
    arabic: 'رَبِّ اشْرَحْ لِي صَدْرِي ۝ وَيَسِّرْ لِي أَمْرِي ۝ وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي ۝ يَفْقَهُوا قَوْلِي',
    transliteration: 'Rabbish-rah li sadri, wa yassir li amri, wahlul \'uqdatam-mil-lisani, yafqahoo qawli.',
    englishTranslation: 'My Lord, expand for me my chest, and ease for me my task, and untie the knot from my tongue that they may understand my speech.',
    reference: 'Surah Ta-Ha (20:25-28)',
    virtue: 'The prayer of Prophet Musa (AS). Essential for Quran teachers delivering lessons and students mastering Makharij articulation.'
  },
  {
    id: 'dua-study-3',
    category: 'quran_study',
    title: 'Dua for Beneficial Knowledge and Accepted Deeds',
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا',
    transliteration: 'Allahumma inni as\'aluka \'ilman nafi\'an, wa rizqan tayyiban, wa \'amalan mutaqabbala.',
    englishTranslation: 'O Allah, I ask You for knowledge that is of benefit, a good and pure provision, and deeds that will be accepted.',
    reference: 'Sunan Ibn Majah 925 (Sahih)',
    virtue: 'The Prophet (ﷺ) would recite this every morning after the Fajr prayer.'
  },

  // 2. Daily Life Duas
  {
    id: 'dua-daily-1',
    category: 'daily',
    title: 'Dua Upon Waking Up',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    transliteration: 'Al-hamdu lillahil-ladhi ahyana ba\'da ma amatana wa ilayhin-nushoor.',
    englishTranslation: 'All praise is for Allah, Who gave us life after having taken it from us, and unto Him is the resurrection.',
    reference: 'Sahih al-Bukhari 6312',
    virtue: 'Expresses profound gratitude for another day of life and opportunities for worship.'
  },
  {
    id: 'dua-daily-2',
    category: 'daily',
    title: 'Dua Before Sleeping',
    arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    transliteration: 'Bismika Allahumma amutu wa ahya.',
    englishTranslation: 'In Your name, O Allah, I die and I live.',
    reference: 'Sahih al-Bukhari 6324',
    virtue: 'Surrenders one’s soul into Allah’s preservation during sleep.'
  },
  {
    id: 'dua-daily-3',
    category: 'daily',
    title: 'Dua When Leaving the Home',
    arabic: 'بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    transliteration: 'Bismillahi, tawakkaltu \'alallahi, wa la hawla wa la quwwata illa billah.',
    englishTranslation: 'In the name of Allah, I place my trust in Allah; there is no might nor power except with Allah.',
    reference: 'Sunan Abi Dawud 5095 (Sahih)',
    virtue: 'It is said to the person: You are guided, defended, and protected, and the devils turn away.'
  },
  {
    id: 'dua-daily-4',
    category: 'daily',
    title: 'Dua Before Eating',
    arabic: 'بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ',
    transliteration: 'Bismillahi wa \'ala barakatillah.',
    englishTranslation: 'In the name of Allah and with the blessings of Allah.',
    reference: 'Al-Hakim & Abu Dawud',
    virtue: 'Prevents the Shaytan from partaking in one’s meal and brings barakah in food.'
  },
  {
    id: 'dua-daily-5',
    category: 'daily',
    title: 'Dua After Eating',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ',
    transliteration: 'Al-hamdu lillahil-ladhi at\'amana wa saqana wa ja\'alana muslimeen.',
    englishTranslation: 'Praise be to Allah Who has fed us, given us drink, and made us Muslims.',
    reference: 'Sunan Abi Dawud 3850',
    virtue: 'Forgiveness of sins for praising Allah after provision.'
  },
  {
    id: 'dua-daily-6',
    category: 'daily',
    title: 'Dua for Safe Traveling',
    arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ ۝ وَإِنَّا إِلَىٰ رَبِّنَا لَمُنقَلِبُونَ',
    transliteration: 'Subhanal-ladhi sakh-khara lana hadha wa ma kunna lahu muqrinin, wa inna ila Rabbina lamunqaliboon.',
    englishTranslation: 'Glory unto Him Who has subjected this to us, and we were not capable of subduing it ourselves; and indeed, unto our Lord we will certainly return.',
    reference: 'Surah Az-Zukhruf (43:13-14)',
    virtue: 'Safeguards the traveler in all vehicles, airplanes, and journeys.'
  },

  // 3. Morning & Evening Azkar
  {
    id: 'dua-morning-1',
    category: 'morning_evening',
    title: 'Sayyid al-Istighfar (Chief of Forgiveness Prayers)',
    arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
    transliteration: 'Allahumma Anta Rabbi la ilaha illa Anta, khalaqtani wa ana \'abduka, wa ana \'ala \'ahdika wa wa\'dika mastata\'tu, a\'udhu bika min sharri ma sana\'tu, abu\'u laka bi ni\'matika \'alayya, wa abu\'u bi dhanbi faghfir li fa innahu la yaghfirudh-dhunooba illa Anta.',
    englishTranslation: 'O Allah, You are my Lord; there is no deity except You. You created me and I am Your slave, and I abide by Your covenant and promise as best as I can. I seek refuge in You from the evil of what I have done. I acknowledge Your favors upon me, and I acknowledge my sins, so forgive me, for none forgives sins except You.',
    reference: 'Sahih al-Bukhari 6306',
    virtue: 'Whoever recites this in the morning with certainty and dies that day enters Paradise; same if recited in the evening.'
  },
  {
    id: 'dua-morning-2',
    category: 'morning_evening',
    title: 'Ayat al-Kursi (The Throne Verse - Maximum Protection)',
    arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
    transliteration: 'Allahu la ilaha illa Huwal-Hayyul-Qayyum. La ta\'khudhuhu sinatuw-wa la nawm. Lahu ma fis-samawati wa ma fil-ard. Man dhal-ladhi yashfa\'u \'indahu illa bi-idhnih. Ya\'lamu ma bayna aydihim wa ma khalfahum, wa la yuheetoona bi-shay\'im-min \'ilmihi illa bima sha\'a. Wasi\'a kursiyyuhus-samawati wal-ard, wa la ya\'ooduhu hifdhuhuma, wa Huwal-\'Aliyyul-\'Adheem.',
    englishTranslation: 'Allah! There is no deity except Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that could intercede with Him except by His permission? He knows what is before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.',
    reference: 'Surah Al-Baqarah (2:255)',
    virtue: 'Protects from all evil spirits, devils, and harm when recited in the morning, evening, and after every prayer.'
  },
  {
    id: 'dua-morning-3',
    category: 'morning_evening',
    title: 'Dua for Complete Protection Against All Harm (3 Times)',
    arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    transliteration: 'Bismillahil-ladhi la yadurru ma\'as-mihi shay\'un fil-ardi wa la fis-sama\'i wa Huwas-Sami\'ul-\'Aleem.',
    englishTranslation: 'In the Name of Allah, with Whose Name nothing can cause harm in the earth nor in the heavens, and He is the All-Hearing, the All-Knowing.',
    reference: 'Sunan Abi Dawud 5088, At-Tirmidhi 3388',
    virtue: 'Recited 3 times in the morning and 3 times in the evening; no harm or poison will touch the servant.'
  },

  // 4. Salah & Namaz Prayers
  {
    id: 'dua-salah-1',
    category: 'prayer',
    title: 'Dua After Completing the Wudu (Ablution)',
    arabic: 'أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ، اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ',
    transliteration: 'Ashhadu alla ilaha illallahu wahdahu la shareeka lah, wa ashhadu anna Muhammadan \'abduhu wa rasooluh. Allahummaj-\'alni minat-tawwabeena waj-\'alni minal-mutatahhireen.',
    englishTranslation: 'I bear witness that none has the right to be worshipped except Allah alone, without partner, and I bear witness that Muhammad is His servant and messenger. O Allah, make me of those who repent and make me of those who purify themselves.',
    reference: 'Jami\' at-Tirmidhi 55 (Sahih)',
    virtue: 'All eight gates of Paradise are opened for whoever recites this after performing ablution.'
  },
  {
    id: 'dua-salah-2',
    category: 'prayer',
    title: 'Dua After the Azan (Call to Prayer)',
    arabic: 'اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ، وَالصَّلَاةِ الْقَائِمَةِ، آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ، وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ',
    transliteration: 'Allahumma Rabba hadhihid-da\'watit-tammah, was-salatil-qa\'imah, ati Muhammadanil-waseelata wal-fadeelah, wab\'ath-hu maqamam-mahmoodanil-ladhi wa\'adtah.',
    englishTranslation: 'O Allah, Lord of this perfect call and established prayer, grant Muhammad the status of intercession and distinction, and raise him to the praised position that You have promised him.',
    reference: 'Sahih al-Bukhari 614',
    virtue: 'The intercession of the Prophet (ﷺ) becomes assured for the reciter on the Day of Resurrection.'
  },
  {
    id: 'dua-salah-3',
    category: 'prayer',
    title: 'Remembrance Immediately After Salam in Prayer',
    arabic: 'أَسْتَغْفِرُ اللَّهَ، أَسْتَغْفِرُ اللَّهَ، أَسْتَغْفِرُ اللَّهَ، اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالإِكْرَامِ',
    transliteration: 'Astaghfirullah, Astaghfirullah, Astaghfirullah. Allahumma Antas-Salamu wa minkas-salam, tabarakta ya Dhal-Jalali wal-Ikram.',
    englishTranslation: 'I ask Allah for forgiveness (3 times). O Allah, You are Peace and from You comes peace. Blessed are You, O Owner of Majesty and Honor.',
    reference: 'Sahih Muslim 591',
    virtue: 'Sunnah recited immediately after concluding every obligatory Namaz.'
  },

  // 5. Parents & Family
  {
    id: 'dua-parents-1',
    category: 'parents',
    title: 'Quranic Prayer for Parents’ Mercy',
    arabic: 'رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    transliteration: 'Rabbir-hamhuma kama rabbayani sagheera.',
    englishTranslation: 'My Lord, have mercy upon them as they brought me up when I was small.',
    reference: 'Surah Al-Isra (17:24)',
    virtue: 'Direct commandment of Allah to honor mother and father with continuous dua.'
  },
  {
    id: 'dua-parents-2',
    category: 'parents',
    title: 'Dua for Forgiveness of Parents and All Believers',
    arabic: 'رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ',
    transliteration: 'Rabbana-ghfir li wa liwalidayya wa lil-mu\'mineena yawma yaqoomul-hisab.',
    englishTranslation: 'Our Lord, forgive me and my parents and the believers the Day the account is established.',
    reference: 'Surah Ibrahim (14:41)',
    virtue: 'Prayer of Prophet Ibrahim (AS), elevating the status of parents in the Akhirah.'
  },
  {
    id: 'dua-parents-3',
    category: 'parents',
    title: 'Dua for Righteous Family and Children',
    arabic: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا',
    transliteration: 'Rabbana hab lana min azwajina wa dhurriyyatina qurrata a\'yuniw-waj\'alna lil-muttaqeena imama.',
    englishTranslation: 'Our Lord, grant us from among our spouses and offspring comfort to our eyes and make us a leader for the righteous.',
    reference: 'Surah Al-Furqan (25:74)',
    virtue: 'Dua of the servants of the Most Merciful (Ibad-ur-Rahman) for familial peace and piety.'
  },

  // 6. Hardship, Ease & Healing
  {
    id: 'dua-hardship-1',
    category: 'hardship',
    title: 'Dua of Prophet Yunus (In Times of Distress & Grief)',
    arabic: 'لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ',
    transliteration: 'La ilaha illa Anta subhanaka inni kuntu minadh-dhalimeen.',
    englishTranslation: 'There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.',
    reference: 'Surah Al-Anbiya (21:87)',
    virtue: 'The Prophet (ﷺ) said: No Muslim supplicates with this in any situation except that Allah responds to him.'
  },
  {
    id: 'dua-hardship-2',
    category: 'hardship',
    title: 'Dua for Making Any Difficult Task Easy',
    arabic: 'اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا، وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلًا',
    transliteration: 'Allahumma la sahla illa ma ja\'altahu sahla, wa Anta taj\'alul-hazna idha shi\'ta sahla.',
    englishTranslation: 'O Allah, there is no ease except in that which You have made easy, and You make the difficulty easy when You wish.',
    reference: 'Sahih Ibn Hibban 974',
    virtue: 'Extremely powerful when facing tough exams, interviews, Quran tests, or complex endeavors.'
  },
  {
    id: 'dua-hardship-3',
    category: 'hardship',
    title: 'Dua Against Anxiety, Grief, Laziness & Debt',
    arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ، وَغَلَبَةِ الرِّجَالِ',
    transliteration: 'Allahumma inni a\'udhu bika minal-hammi wal-hazani, wal-\'ajzi wal-kasali, wal-bukhli wal-jubni, wa dala\'id-dayni, wa ghalabatir-rijal.',
    englishTranslation: 'O Allah, I seek refuge in You from anxiety and sorrow, weakness and laziness, miserliness and cowardice, the burden of debts and from being overpowered by men.',
    reference: 'Sahih al-Bukhari 2893',
    virtue: 'Daily comprehensive shield against psychological distress, procrastination, and financial debt.'
  },

  // 7. Forgiveness & Comprehensive Dua
  {
    id: 'dua-forgive-1',
    category: 'forgiveness',
    title: 'The Best Comprehensive Quranic Dua (Dunya & Akhirah)',
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    transliteration: 'Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina \'adhaban-nar.',
    englishTranslation: 'Our Lord, give us in this world that which is good and in the Hereafter that which is good and protect us from the punishment of the Fire.',
    reference: 'Surah Al-Baqarah (2:201)',
    virtue: 'The most frequent supplication recited by Prophet Muhammad (ﷺ).'
  },
  {
    id: 'dua-forgive-2',
    category: 'forgiveness',
    title: 'Repentance of Adam and Hawwa (AS)',
    arabic: 'رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ',
    transliteration: 'Rabbana thalamna anfusana wa il-lam taghfir lana wa tarhamna lanakoonanna minal-khasireen.',
    englishTranslation: 'Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers.',
    reference: 'Surah Al-A\'raf (7:23)',
    virtue: 'The first words of repentance granted by Allah to humanity.'
  }
];
