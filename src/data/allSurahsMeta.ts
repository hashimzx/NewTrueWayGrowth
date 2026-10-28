export interface SurahSummary {
  number: number;
  name: string; // Arabic name
  englishName: string;
  englishTranslation: string;
  ayahsCount: number;
  revelationType: 'Meccan' | 'Medinan';
  juz: number;
}

export const ALL_114_SURAHS: SurahSummary[] = [
  { number: 1, name: "الفَاتِحَة", englishName: "Al-Fatihah", englishTranslation: "The Opening", ayahsCount: 7, revelationType: "Meccan", juz: 1 },
  { number: 2, name: "البَقَرَة", englishName: "Al-Baqarah", englishTranslation: "The Cow", ayahsCount: 286, revelationType: "Medinan", juz: 1 },
  { number: 3, name: "آل عِمْرَان", englishName: "Ali 'Imran", englishTranslation: "Family of Imran", ayahsCount: 200, revelationType: "Medinan", juz: 3 },
  { number: 4, name: "النِّسَاء", englishName: "An-Nisa", englishTranslation: "The Women", ayahsCount: 176, revelationType: "Medinan", juz: 4 },
  { number: 5, name: "المَائِدَة", englishName: "Al-Ma'idah", englishTranslation: "The Table Spread", ayahsCount: 120, revelationType: "Medinan", juz: 6 },
  { number: 6, name: "الأَنْعَام", englishName: "Al-An'am", englishTranslation: "The Cattle", ayahsCount: 165, revelationType: "Meccan", juz: 7 },
  { number: 7, name: "الأَعْرَاف", englishName: "Al-A'raf", englishTranslation: "The Heights", ayahsCount: 206, revelationType: "Meccan", juz: 8 },
  { number: 8, name: "الأَنْفَال", englishName: "Al-Anfal", englishTranslation: "The Spoils of War", ayahsCount: 75, revelationType: "Medinan", juz: 9 },
  { number: 9, name: "التَّوْبَة", englishName: "At-Tawbah", englishTranslation: "The Repentance", ayahsCount: 129, revelationType: "Medinan", juz: 10 },
  { number: 10, name: "يُونُس", englishName: "Yunus", englishTranslation: "Jonah", ayahsCount: 109, revelationType: "Meccan", juz: 11 },
  { number: 11, name: "هُود", englishName: "Hud", englishTranslation: "Hud", ayahsCount: 123, revelationType: "Meccan", juz: 11 },
  { number: 12, name: "يُوسُف", englishName: "Yusuf", englishTranslation: "Joseph", ayahsCount: 111, revelationType: "Meccan", juz: 12 },
  { number: 13, name: "الرَّعْد", englishName: "Ar-Ra'd", englishTranslation: "The Thunder", ayahsCount: 43, revelationType: "Medinan", juz: 13 },
  { number: 14, name: "إِبْرَاهِيم", englishName: "Ibrahim", englishTranslation: "Abraham", ayahsCount: 52, revelationType: "Meccan", juz: 13 },
  { number: 15, name: "الحِجْر", englishName: "Al-Hijr", englishTranslation: "The Rocky Tract", ayahsCount: 99, revelationType: "Meccan", juz: 14 },
  { number: 16, name: "النَّحْل", englishName: "An-Nahl", englishTranslation: "The Bee", ayahsCount: 128, revelationType: "Meccan", juz: 14 },
  { number: 17, name: "الإِسْرَاء", englishName: "Al-Isra", englishTranslation: "The Night Journey", ayahsCount: 111, revelationType: "Meccan", juz: 15 },
  { number: 18, name: "الكَهْف", englishName: "Al-Kahf", englishTranslation: "The Cave", ayahsCount: 110, revelationType: "Meccan", juz: 15 },
  { number: 19, name: "مَرْيَم", englishName: "Maryam", englishTranslation: "Mary", ayahsCount: 98, revelationType: "Meccan", juz: 16 },
  { number: 20, name: "طه", englishName: "Ta-Ha", englishTranslation: "Ta-Ha", ayahsCount: 135, revelationType: "Meccan", juz: 16 },
  { number: 21, name: "الأَنْبِيَاء", englishName: "Al-Anbiya", englishTranslation: "The Prophets", ayahsCount: 112, revelationType: "Meccan", juz: 17 },
  { number: 22, name: "الحَجّ", englishName: "Al-Hajj", englishTranslation: "The Pilgrimage", ayahsCount: 78, revelationType: "Medinan", juz: 17 },
  { number: 23, name: "المُؤْمِنُون", englishName: "Al-Mu'minun", englishTranslation: "The Believers", ayahsCount: 118, revelationType: "Meccan", juz: 18 },
  { number: 24, name: "النُّور", englishName: "An-Nur", englishTranslation: "The Light", ayahsCount: 64, revelationType: "Medinan", juz: 18 },
  { number: 25, name: "الفُرْقَان", englishName: "Al-Furqan", englishTranslation: "The Criterion", ayahsCount: 77, revelationType: "Meccan", juz: 18 },
  { number: 26, name: "الشُّعَرَاء", englishName: "Ash-Shu'ara", englishTranslation: "The Poets", ayahsCount: 227, revelationType: "Meccan", juz: 19 },
  { number: 27, name: "النَّمْل", englishName: "An-Naml", englishTranslation: "The Ant", ayahsCount: 93, revelationType: "Meccan", juz: 19 },
  { number: 28, name: "القَصَص", englishName: "Al-Qasas", englishTranslation: "The Stories", ayahsCount: 88, revelationType: "Meccan", juz: 20 },
  { number: 29, name: "العَنْكَبُوت", englishName: "Al-'Ankabut", englishTranslation: "The Spider", ayahsCount: 69, revelationType: "Meccan", juz: 20 },
  { number: 30, name: "الرُّوم", englishName: "Ar-Rum", englishTranslation: "The Romans", ayahsCount: 60, revelationType: "Meccan", juz: 21 },
  { number: 31, name: "لُقْمَان", englishName: "Luqman", englishTranslation: "Luqman", ayahsCount: 34, revelationType: "Meccan", juz: 21 },
  { number: 32, name: "السَّجْدَة", englishName: "As-Sajdah", englishTranslation: "The Prostration", ayahsCount: 30, revelationType: "Meccan", juz: 21 },
  { number: 33, name: "الأَحْزَاب", englishName: "Al-Ahzab", englishTranslation: "The Combined Forces", ayahsCount: 73, revelationType: "Medinan", juz: 21 },
  { number: 34, name: "سَبَأ", englishName: "Saba", englishTranslation: "Sheba", ayahsCount: 54, revelationType: "Meccan", juz: 22 },
  { number: 35, name: "فَاطِر", englishName: "Fatir", englishTranslation: "Originator", ayahsCount: 45, revelationType: "Meccan", juz: 22 },
  { number: 36, name: "يس", englishName: "Ya-Sin", englishTranslation: "Ya-Sin (Heart of Quran)", ayahsCount: 83, revelationType: "Meccan", juz: 22 },
  { number: 37, name: "الصَّافَّات", englishName: "As-Saffat", englishTranslation: "Those who set the Ranks", ayahsCount: 182, revelationType: "Meccan", juz: 23 },
  { number: 38, name: "ص", englishName: "Sad", englishTranslation: "The Letter Sad", ayahsCount: 88, revelationType: "Meccan", juz: 23 },
  { number: 39, name: "الزُّمَر", englishName: "Az-Zumar", englishTranslation: "The Troops", ayahsCount: 75, revelationType: "Meccan", juz: 23 },
  { number: 40, name: "غَافِر", englishName: "Ghafir", englishTranslation: "The Forgiver", ayahsCount: 85, revelationType: "Meccan", juz: 24 },
  { number: 41, name: "فُصِّلَت", englishName: "Fussilat", englishTranslation: "Explained in Detail", ayahsCount: 54, revelationType: "Meccan", juz: 24 },
  { number: 42, name: "الشُّورَى", englishName: "Ash-Shura", englishTranslation: "The Consultation", ayahsCount: 53, revelationType: "Meccan", juz: 25 },
  { number: 43, name: "الزُّخْرُف", englishName: "Az-Zukhruf", englishTranslation: "The Ornaments of Gold", ayahsCount: 89, revelationType: "Meccan", juz: 25 },
  { number: 44, name: "الدُّخَان", englishName: "Ad-Dukhan", englishTranslation: "The Smoke", ayahsCount: 59, revelationType: "Meccan", juz: 25 },
  { number: 45, name: "الجَاثِيَة", englishName: "Al-Jathiyah", englishTranslation: "The Crouching", ayahsCount: 37, revelationType: "Meccan", juz: 25 },
  { number: 46, name: "الأَحْقَاف", englishName: "Al-Ahqaf", englishTranslation: "The Wind-Curved Sandhills", ayahsCount: 35, revelationType: "Meccan", juz: 26 },
  { number: 47, name: "مُحَمَّد", englishName: "Muhammad", englishTranslation: "Muhammad ﷺ", ayahsCount: 38, revelationType: "Medinan", juz: 26 },
  { number: 48, name: "الفَتْح", englishName: "Al-Fath", englishTranslation: "The Victory", ayahsCount: 29, revelationType: "Medinan", juz: 26 },
  { number: 49, name: "الحُجُرَات", englishName: "Al-Hujurat", englishTranslation: "The Rooms", ayahsCount: 18, revelationType: "Medinan", juz: 26 },
  { number: 50, name: "ق", englishName: "Qaf", englishTranslation: "The Letter Qaf", ayahsCount: 45, revelationType: "Meccan", juz: 26 },
  { number: 51, name: "الذَّارِيَات", englishName: "Adh-Dhariyat", englishTranslation: "The Winnowing Winds", ayahsCount: 60, revelationType: "Meccan", juz: 26 },
  { number: 52, name: "الطُّور", englishName: "At-Tur", englishTranslation: "The Mount", ayahsCount: 49, revelationType: "Meccan", juz: 27 },
  { number: 53, name: "النَّجْم", englishName: "An-Najm", englishTranslation: "The Star", ayahsCount: 62, revelationType: "Meccan", juz: 27 },
  { number: 54, name: "القَمَر", englishName: "Al-Qamar", englishTranslation: "The Moon", ayahsCount: 55, revelationType: "Meccan", juz: 27 },
  { number: 55, name: "الرَّحْمَٰن", englishName: "Ar-Rahman", englishTranslation: "The Beneficent", ayahsCount: 78, revelationType: "Medinan", juz: 27 },
  { number: 56, name: "الوَاقِعَة", englishName: "Al-Waqi'ah", englishTranslation: "The Inevitable", ayahsCount: 96, revelationType: "Meccan", juz: 27 },
  { number: 57, name: "الحَدِيد", englishName: "Al-Hadid", englishTranslation: "The Iron", ayahsCount: 29, revelationType: "Medinan", juz: 27 },
  { number: 58, name: "المُجَادِلَة", englishName: "Al-Mujadila", englishTranslation: "The Pleading Woman", ayahsCount: 22, revelationType: "Medinan", juz: 28 },
  { number: 59, name: "الحَشْر", englishName: "Al-Hashr", englishTranslation: "The Exile", ayahsCount: 24, revelationType: "Medinan", juz: 28 },
  { number: 60, name: "المُمْتَحَنَة", englishName: "Al-Mumtahanah", englishTranslation: "She that is to be examined", ayahsCount: 13, revelationType: "Medinan", juz: 28 },
  { number: 61, name: "الصَّفّ", englishName: "As-Saff", englishTranslation: "The Ranks", ayahsCount: 14, revelationType: "Medinan", juz: 28 },
  { number: 62, name: "الجُمُعَة", englishName: "Al-Jumu'ah", englishTranslation: "The Congregation (Friday)", ayahsCount: 11, revelationType: "Medinan", juz: 28 },
  { number: 63, name: "المُنَافِقُون", englishName: "Al-Munafiqun", englishTranslation: "The Hypocrites", ayahsCount: 11, revelationType: "Medinan", juz: 28 },
  { number: 64, name: "التَّغَابُن", englishName: "At-Taghabun", englishTranslation: "Mutual Disillusion", ayahsCount: 18, revelationType: "Medinan", juz: 28 },
  { number: 65, name: "الطَّلَاق", englishName: "At-Talaq", englishTranslation: "The Divorce", ayahsCount: 12, revelationType: "Medinan", juz: 28 },
  { number: 66, name: "التَّحْرِيم", englishName: "At-Tahrim", englishTranslation: "The Prohibition", ayahsCount: 12, revelationType: "Medinan", juz: 28 },
  { number: 67, name: "المُلْك", englishName: "Al-Mulk", englishTranslation: "The Sovereignty", ayahsCount: 30, revelationType: "Meccan", juz: 29 },
  { number: 68, name: "القَلَم", englishName: "Al-Qalam", englishTranslation: "The Pen", ayahsCount: 52, revelationType: "Meccan", juz: 29 },
  { number: 69, name: "الحَاقَّة", englishName: "Al-Haqqah", englishTranslation: "The Reality", ayahsCount: 52, revelationType: "Meccan", juz: 29 },
  { number: 70, name: "المَعَارِج", englishName: "Al-Ma'arij", englishTranslation: "The Ascending Stairways", ayahsCount: 44, revelationType: "Meccan", juz: 29 },
  { number: 71, name: "نُوح", englishName: "Nuh", englishTranslation: "Noah", ayahsCount: 28, revelationType: "Meccan", juz: 29 },
  { number: 72, name: "الجِنّ", englishName: "Al-Jinn", englishTranslation: "The Jinn", ayahsCount: 28, revelationType: "Meccan", juz: 29 },
  { number: 73, name: "المُزَّمِّل", englishName: "Al-Muzzammil", englishTranslation: "The Enshrouded One", ayahsCount: 20, revelationType: "Meccan", juz: 29 },
  { number: 74, name: "المُدَّثِّر", englishName: "Al-Muddaththir", englishTranslation: "The Cloaked One", ayahsCount: 56, revelationType: "Meccan", juz: 29 },
  { number: 75, name: "القِيَامَة", englishName: "Al-Qiyamah", englishTranslation: "The Resurrection", ayahsCount: 40, revelationType: "Meccan", juz: 29 },
  { number: 76, name: "الإِنْسَان", englishName: "Al-Insan", englishTranslation: "Man", ayahsCount: 31, revelationType: "Medinan", juz: 29 },
  { number: 77, name: "المُرْسَلَات", englishName: "Al-Mursalat", englishTranslation: "The Emissaries", ayahsCount: 50, revelationType: "Meccan", juz: 29 },
  { number: 78, name: "النَّبَأ", englishName: "An-Naba", englishTranslation: "The Tidings", ayahsCount: 40, revelationType: "Meccan", juz: 30 },
  { number: 79, name: "النَّازِعَات", englishName: "An-Nazi'at", englishTranslation: "Those who drag forth", ayahsCount: 46, revelationType: "Meccan", juz: 30 },
  { number: 80, name: "عَبَسَ", englishName: "'Abasa", englishTranslation: "He Frowned", ayahsCount: 42, revelationType: "Meccan", juz: 30 },
  { number: 81, name: "التَّكْوِير", englishName: "At-Takwir", englishTranslation: "The Overthrowing", ayahsCount: 29, revelationType: "Meccan", juz: 30 },
  { number: 82, name: "الانْفِطَار", englishName: "Al-Infitar", englishTranslation: "The Cleaving", ayahsCount: 19, revelationType: "Meccan", juz: 30 },
  { number: 83, name: "المُطَفِّفِين", englishName: "Al-Mutaffifin", englishTranslation: "Defrauding", ayahsCount: 36, revelationType: "Meccan", juz: 30 },
  { number: 84, name: "الانْشِقَاق", englishName: "Al-Inshiqaq", englishTranslation: "The Splitting Open", ayahsCount: 25, revelationType: "Meccan", juz: 30 },
  { number: 85, name: "البُرُوج", englishName: "Al-Buruj", englishTranslation: "The Constellations", ayahsCount: 22, revelationType: "Meccan", juz: 30 },
  { number: 86, name: "الطَّارِق", englishName: "At-Tariq", englishTranslation: "The Morning Star", ayahsCount: 17, revelationType: "Meccan", juz: 30 },
  { number: 87, name: "الأَعْلَى", englishName: "Al-A'la", englishTranslation: "The Most High", ayahsCount: 19, revelationType: "Meccan", juz: 30 },
  { number: 88, name: "الغَاشِيَة", englishName: "Al-Ghashiyah", englishTranslation: "The Overwhelming", ayahsCount: 26, revelationType: "Meccan", juz: 30 },
  { number: 89, name: "الفَجْر", englishName: "Al-Fajr", englishTranslation: "The Dawn", ayahsCount: 30, revelationType: "Meccan", juz: 30 },
  { number: 90, name: "البَلَد", englishName: "Al-Balad", englishTranslation: "The City", ayahsCount: 20, revelationType: "Meccan", juz: 30 },
  { number: 91, name: "الشَّمْس", englishName: "Ash-Shams", englishTranslation: "The Sun", ayahsCount: 15, revelationType: "Meccan", juz: 30 },
  { number: 92, name: "اللَّيْل", englishName: "Al-Layl", englishTranslation: "The Night", ayahsCount: 21, revelationType: "Meccan", juz: 30 },
  { number: 93, name: "الضُّحَى", englishName: "Ad-Duha", englishTranslation: "The Morning Hours", ayahsCount: 11, revelationType: "Meccan", juz: 30 },
  { number: 94, name: "الشَّرْح", englishName: "Ash-Sharh", englishTranslation: "The Relief", ayahsCount: 8, revelationType: "Meccan", juz: 30 },
  { number: 95, name: "التِّين", englishName: "At-Tin", englishTranslation: "The Fig", ayahsCount: 8, revelationType: "Meccan", juz: 30 },
  { number: 96, name: "العَلَق", englishName: "Al-'Alaq", englishTranslation: "The Clot (First Revelation)", ayahsCount: 19, revelationType: "Meccan", juz: 30 },
  { number: 97, name: "القَدْر", englishName: "Al-Qadr", englishTranslation: "The Power / Night of Decree", ayahsCount: 5, revelationType: "Meccan", juz: 30 },
  { number: 98, name: "البَيِّنَة", englishName: "Al-Bayyinah", englishTranslation: "The Clear Proof", ayahsCount: 8, revelationType: "Medinan", juz: 30 },
  { number: 99, name: "الزَّلْزَلَة", englishName: "Az-Zalzalah", englishTranslation: "The Earthquake", ayahsCount: 8, revelationType: "Medinan", juz: 30 },
  { number: 100, name: "العَادِيَات", englishName: "Al-'Adiyat", englishTranslation: "The Courser", ayahsCount: 11, revelationType: "Meccan", juz: 30 },
  { number: 101, name: "القَارِعَة", englishName: "Al-Qari'ah", englishTranslation: "The Calamity", ayahsCount: 11, revelationType: "Meccan", juz: 30 },
  { number: 102, name: "التَّكَاثُر", englishName: "At-Takathur", englishTranslation: "Competition in Increase", ayahsCount: 8, revelationType: "Meccan", juz: 30 },
  { number: 103, name: "العَصْر", englishName: "Al-'Asr", englishTranslation: "The Declining Day", ayahsCount: 3, revelationType: "Meccan", juz: 30 },
  { number: 104, name: "الهُمَزَة", englishName: "Al-Humazah", englishTranslation: "The Traducer", ayahsCount: 9, revelationType: "Meccan", juz: 30 },
  { number: 105, name: "الفِيل", englishName: "Al-Fil", englishTranslation: "The Elephant", ayahsCount: 5, revelationType: "Meccan", juz: 30 },
  { number: 106, name: "قُرَيْش", englishName: "Quraysh", englishTranslation: "Quraysh", ayahsCount: 4, revelationType: "Meccan", juz: 30 },
  { number: 107, name: "المَاعُون", englishName: "Al-Ma'un", englishTranslation: "Small Kindnesses", ayahsCount: 7, revelationType: "Meccan", juz: 30 },
  { number: 108, name: "الكَوْثَر", englishName: "Al-Kawthar", englishTranslation: "Abundance", ayahsCount: 3, revelationType: "Meccan", juz: 30 },
  { number: 109, name: "الكَافِرُون", englishName: "Al-Kafirun", englishTranslation: "The Disbelievers", ayahsCount: 6, revelationType: "Meccan", juz: 30 },
  { number: 110, name: "النَّصْر", englishName: "An-Nasr", englishTranslation: "The Divine Support", ayahsCount: 3, revelationType: "Medinan", juz: 30 },
  { number: 111, name: "المَسَد", englishName: "Al-Masad", englishTranslation: "The Palm Fiber", ayahsCount: 5, revelationType: "Meccan", juz: 30 },
  { number: 112, name: "الإِخْلَاص", englishName: "Al-Ikhlas", englishTranslation: "Sincerity / The Purity", ayahsCount: 4, revelationType: "Meccan", juz: 30 },
  { number: 113, name: "الفَلَق", englishName: "Al-Falaq", englishTranslation: "The Daybreak", ayahsCount: 5, revelationType: "Meccan", juz: 30 },
  { number: 114, name: "النَّاس", englishName: "An-Nas", englishTranslation: "Mankind", ayahsCount: 6, revelationType: "Meccan", juz: 30 },
];

export function getSurahByNumber(num: number): SurahSummary | undefined {
  return ALL_114_SURAHS.find(s => s.number === num);
}

export function searchSurahs(query: string): SurahSummary[] {
  if (!query.trim()) return ALL_114_SURAHS;
  const q = query.toLowerCase().trim();
  return ALL_114_SURAHS.filter(s => 
    s.number.toString() === q ||
    s.englishName.toLowerCase().includes(q) ||
    s.englishTranslation.toLowerCase().includes(q) ||
    s.name.includes(q)
  );
}

export function getSurahAudioUrl(surahNumber: number, reciterId: string = 'alafasy'): string {
  const padNum = String(surahNumber).padStart(3, '0');
  switch (reciterId) {
    case 'sudais':
      return `https://server11.mp3quran.net/sds/${padNum}.mp3`;
    case 'husary':
      return `https://server13.mp3quran.net/husr/${padNum}.mp3`;
    case 'muaiqly':
      return `https://server12.mp3quran.net/maher/${padNum}.mp3`;
    case 'ghamdi':
      return `https://server7.mp3quran.net/s_gmd/${padNum}.mp3`;
    case 'alafasy':
    default:
      return `https://server8.mp3quran.net/afs/${padNum}.mp3`;
  }
}
