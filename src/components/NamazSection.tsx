import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  MapPin, 
  Compass, 
  Sun, 
  Sunrise, 
  Sunset, 
  Moon, 
  RefreshCw, 
  Sparkles, 
  CheckCircle2, 
  Volume2, 
  ExternalLink, 
  BookOpen, 
  Heart, 
  Star,
  Droplets,
  Globe
} from 'lucide-react';
import { soundEngine } from '../utils/audioSynth';

interface PrayerTimes {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  imsak: string;
  midnight: string;
  tahajjud: string;
}

interface LocationInfo {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
  worldCalendarSummary: string;
  gregorianDate: string;
}

export type NamazSubSection = 'times' | 'salah_guide' | 'tahajjud';

interface NamazSectionProps {
  onOpenDuas?: () => void;
  initialSubSection?: NamazSubSection;
}

export const NamazSection: React.FC<NamazSectionProps> = ({ 
  onOpenDuas,
  initialSubSection = 'times'
}) => {
  const [activeSubSection, setActiveSubSection] = useState<NamazSubSection>(initialSubSection);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [loading, setLoading] = useState<boolean>(true);
  const [usingFallback, setUsingFallback] = useState<boolean>(false);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const [locationInfo, setLocationInfo] = useState<LocationInfo>({
    city: 'London',
    country: 'United Kingdom',
    latitude: 51.5074,
    longitude: -0.1278,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/London',
    worldCalendarSummary: new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    gregorianDate: new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  });

  const [times, setTimes] = useState<PrayerTimes>({
    fajr: '04:38',
    sunrise: '06:12',
    dhuhr: '13:05',
    asr: '16:48',
    maghrib: '20:02',
    isha: '21:35',
    imsak: '04:28',
    midnight: '00:08',
    tahajjud: '02:15'
  });

  useEffect(() => {
    setActiveSubSection(initialSubSection);
  }, [initialSubSection]);

  // Live 1-second digital clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePlayArabic = (id: string, text: string) => {
    setPlayingAudioId(id);
    soundEngine.speakArabic(text, 0.82);
    setTimeout(() => {
      setPlayingAudioId((prev) => (prev === id ? null : prev));
    }, 4500);
  };

  // Fetch prayer times by coordinates from Aladhan API
  const fetchPrayerTimesByCoords = async (lat: number, lon: number, cityLabel?: string, countryLabel?: string) => {
    setLoading(true);
    try {
      const timestamp = Math.floor(Date.now() / 1000);
      const res = await fetch(`https://api.aladhan.com/v1/timings/${timestamp}?latitude=${lat}&longitude=${lon}&method=2`);
      const data = await res.json();
      if (data && data.code === 200 && data.data) {
        const t = data.data.timings;
        const hijri = data.data.date?.hijri;
        const greg = data.data.date?.readable;
        const meta = data.data.meta;

        setTimes({
          fajr: (t.Fajr || '04:45').split(' ')[0],
          sunrise: (t.Sunrise || '06:15').split(' ')[0],
          dhuhr: (t.Dhuhr || '13:05').split(' ')[0],
          asr: (t.Asr || '16:45').split(' ')[0],
          maghrib: (t.Maghrib || '19:55').split(' ')[0],
          isha: (t.Isha || '21:25').split(' ')[0],
          imsak: (t.Imsak || '04:35').split(' ')[0],
          midnight: (t.Midnight || '00:10').split(' ')[0],
          tahajjud: (t.Lastthird || '02:20').split(' ')[0]
        });

        setLocationInfo(prev => ({
          ...prev,
          city: cityLabel || meta?.timezone?.split('/')[1]?.replace('_', ' ') || prev.city,
          country: countryLabel || meta?.timezone?.split('/')[0] || prev.country,
          latitude: lat,
          longitude: lon,
          timezone: meta?.timezone || prev.timezone,
          worldCalendarSummary: greg || new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
          gregorianDate: greg || prev.gregorianDate
        }));
      }
    } catch {
      setUsingFallback(true);
    } finally {
      setLoading(false);
    }
  };

  // Automatic location detection (IP -> Geolocation fallback)
  const detectUserLocation = async () => {
    setLoading(true);
    try {
      const ipRes = await fetch('https://ipapi.co/json/');
      if (ipRes.ok) {
        const ipData = await ipRes.json();
        if (ipData && ipData.latitude && ipData.longitude) {
          await fetchPrayerTimesByCoords(
            ipData.latitude,
            ipData.longitude,
            ipData.city || 'Local City',
            ipData.country_name || 'Detected Country'
          );
          return;
        }
      }
    } catch {
      // Fall through to browser geolocation or timezone estimate
    }

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          fetchPrayerTimesByCoords(pos.coords.latitude, pos.coords.longitude);
        },
        () => {
          const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/London';
          const cityPart = tz.split('/')[1]?.replace('_', ' ') || 'London';
          setLocationInfo(prev => ({ ...prev, city: cityPart, timezone: tz }));
          fetchPrayerTimesByCoords(51.5074, -0.1278, cityPart, 'Auto Timezone');
        },
        { timeout: 5000 }
      );
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    detectUserLocation();
  }, []);

  // Determine current and next prayer
  const getPrayerScheduleStatus = () => {
    const nowMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

    const toMins = (timeStr: string) => {
      const [h, m] = timeStr.split(':').map(Number);
      return (h || 0) * 60 + (m || 0);
    };

    const format12Hour = (timeStr: string) => {
      const [hStr, mStr] = timeStr.split(':');
      const h = parseInt(hStr, 10);
      if (isNaN(h)) return timeStr;
      const period = h >= 12 ? 'PM' : 'AM';
      const h12 = h % 12 || 12;
      return `${h12}:${mStr} ${period}`;
    };

    const schedule = [
      { id: 'fajr', name: 'Fajr', arabic: 'الفجر', time24: times.fajr, time: format12Hour(times.fajr), mins: toMins(times.fajr), icon: Sunrise, description: '2 Rak’at Sunnah + 2 Rak’at Fard (Dawn)' },
      { id: 'sunrise', name: 'Sunrise', arabic: 'الشروق', time24: times.sunrise, time: format12Hour(times.sunrise), mins: toMins(times.sunrise), icon: Sun, description: 'Ishraq / End of Fajr Window' },
      { id: 'dhuhr', name: 'Dhuhr', arabic: 'الظهر', time24: times.dhuhr, time: format12Hour(times.dhuhr), mins: toMins(times.dhuhr), icon: Sun, description: '4 Sunnah + 4 Fard + 2 Sunnah (Midday)' },
      { id: 'asr', name: 'Asr', arabic: 'العصر', time24: times.asr, time: format12Hour(times.asr), mins: toMins(times.asr), icon: Sun, description: '4 Rak’at Fard (Afternoon)' },
      { id: 'maghrib', name: 'Maghrib', arabic: 'المغرب', time24: times.maghrib, time: format12Hour(times.maghrib), mins: toMins(times.maghrib), icon: Sunset, description: '3 Fard + 2 Sunnah (Sunset)' },
      { id: 'isha', name: 'Isha', arabic: 'العشاء', time24: times.isha, time: format12Hour(times.isha), mins: toMins(times.isha), icon: Moon, description: '4 Fard + 2 Sunnah + 3 Witr (Night)' },
    ];

    let nextIndex = schedule.findIndex(s => s.mins > nowMinutes);
    if (nextIndex === -1) nextIndex = 0;

    const currentIndex = nextIndex === 0 ? schedule.length - 1 : nextIndex - 1;
    const nextPrayer = schedule[nextIndex];

    let diffMins = nextPrayer.mins - nowMinutes;
    if (diffMins < 0) diffMins += 24 * 60;
    const hoursLeft = Math.floor(diffMins / 60);
    const minsLeft = diffMins % 60;

    return {
      schedule,
      currentPrayer: schedule[currentIndex],
      nextPrayer,
      countdown: `${hoursLeft}h ${minsLeft}m remaining`
    };
  };

  const { schedule, currentPrayer, nextPrayer, countdown } = getPrayerScheduleStatus();

  const formatTimeAmPm = (timeStr: string) => {
    const [hStr, mStr] = timeStr.split(':');
    const h = parseInt(hStr, 10);
    if (isNaN(h)) return timeStr;
    const period = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${mStr} ${period}`;
  };

  // Step-by-Step Salah Guide Data (Grounded in Salam Center Prayer Guide PDF)
  const wuduSteps = [
    { step: 1, title: 'Niyyah & Bismillah', desc: 'Make intention in your heart to purify yourself for prayer and say "Bismillāh" (In the Name of Allah).' },
    { step: 2, title: 'Wash Both Hands (3x)', desc: 'Wash both hands up to the wrists thoroughly three times, ensuring water reaches between the fingers.' },
    { step: 3, title: 'Rinse Mouth & Nose (3x)', desc: 'Swish water in the mouth three times (Madmadah) and gently sniff water into the nostrils and blow it out three times (Istinshaq).' },
    { step: 4, title: 'Wash the Face (3x)', desc: 'Wash the entire face three times from the hairline to the bottom of the chin, and from ear to ear.' },
    { step: 5, title: 'Wash Forearms to Elbows (3x)', desc: 'Wash the right arm from fingertips to just above the elbow three times, then the left arm three times.' },
    { step: 6, title: 'Wipe the Head & Ears (1x)', desc: 'Wipe wet hands over the head from front to back and back to front once (Masah), then clean inside and behind the ears with index fingers and thumbs.' },
    { step: 7, title: 'Wash Both Feet to Ankles (3x)', desc: 'Wash the right foot up to and including the ankle three times (cleaning between toes), then the left foot three times.' },
    { step: 8, title: 'Shahadah & Dua After Wudu', desc: 'Recite: "Ash-hadu an lā ilāha illallāhu waḥdahu lā sharīka lah, wa ash-hadu anna Muḥammadan ‘abduhu wa rasūluh."' }
  ];

  const dailyRakatTable = [
    { prayer: 'Fajr (Dawn)', sunnahBefore: '2 Sunnah Mu’akkadah', fard: '2 Fard (Loud)', sunnahAfter: '—', witr: '—', total: '4 Rak’ats' },
    { prayer: 'Dhuhr (Midday)', sunnahBefore: '4 Sunnah Mu’akkadah', fard: '4 Fard (Silent)', sunnahAfter: '2 Sunnah Mu’akkadah', witr: '—', total: '10 Rak’ats' },
    { prayer: 'Asr (Afternoon)', sunnahBefore: '4 Sunnah (Optional)', fard: '4 Fard (Silent)', sunnahAfter: '—', witr: '—', total: '4 (or 8) Rak’ats' },
    { prayer: 'Maghrib (Sunset)', sunnahBefore: '—', fard: '3 Fard (First 2 Loud)', sunnahAfter: '2 Sunnah Mu’akkadah', witr: '—', total: '5 Rak’ats' },
    { prayer: 'Isha (Night)', sunnahBefore: '—', fard: '4 Fard (First 2 Loud)', sunnahAfter: '2 Sunnah Mu’akkadah', witr: '3 Witr', total: '9 Rak’ats' }
  ];

  const salahStepByStep = [
    {
      id: 'salah-step-1',
      stepNumber: 1,
      title: 'Standing Towards Qibla & Niyyah (Intention)',
      posture: 'Qiyam (Standing Upright)',
      instruction: 'Ensure your body, clothing (covering the Awrah), and prayer space are clean, and that you have valid Wudu. Stand facing the Qibla (Kaaba in Makkah) with feet comfortably apart. Make the intention (Niyyah) in your heart for the specific prayer you are offering.',
      arabic: 'نَوَيْتُ أَنْ أُصَلِّيَ لِلَّهِ تَعَالَى',
      transliteration: 'Nawaytu an usalliya lillāhi Ta‘ālā (Intention is in the heart)',
      translation: 'I intend to offer this prayer sincerely for the sake of Allah Almighty.'
    },
    {
      id: 'salah-step-2',
      stepNumber: 2,
      title: 'Takbirat-ul-Ihram (Opening Takbir)',
      posture: 'Raising Hands to Shoulders or Earlobes',
      instruction: 'Raise both hands with open palms facing the Qibla up to the level of your shoulders or earlobes, and say the opening Takbir clearly. Once said, you have officially entered the sacred state of Salah.',
      arabic: 'اللَّهُ أَكْبَرُ',
      transliteration: 'Allāhu Akbar',
      translation: 'Allah is the Greatest.'
    },
    {
      id: 'salah-step-3',
      stepNumber: 3,
      title: 'Qiyam & Opening Supplication (Thana / Istiftah)',
      posture: 'Placing Right Hand Over Left on the Chest',
      instruction: 'Place your right hand over your left hand/wrist on your chest, keeping your eyes focused modestly on the spot where your forehead will touch in prostration (Sujood). Quietly recite the opening supplication (Thana):',
      arabic: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَهَ غَيْرُكَ',
      transliteration: 'Subḥānak-Allāhumma wa biḥamdika, wa tabārak-asmuka, wa ta‘ālā jadduka, wa lā ilāha ghayruk.',
      translation: 'Glory be to You, O Allah, and all praise is Yours; blessed is Your Name, exalted is Your Majesty, and there is no deity worthy of worship besides You.'
    },
    {
      id: 'salah-step-4',
      stepNumber: 4,
      title: 'Reciting Surah Al-Fatihah & A Passage of the Quran',
      posture: 'Standing in Qiyam (Every Rak’at)',
      instruction: 'Seek refuge in Allah ("A‘ūdhu billāhi minash-shayṭānir-rajīm") and say "Bismillāhir-Raḥmānir-Raḥīm". Then recite Surah Al-Fatihah verse by verse, pausing at each verse, and conclude by saying "Āmīn". In the first two Rak’ats, follow Surah Al-Fatihah with another Surah or at least three short verses (e.g., Surah Al-Ikhlas).',
      arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝ الرَّحْمَٰنِ الرَّحِيمِ ۝ مَالِكِ يَوْمِ الدِّينِ ۝ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ۝ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ۝ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ ۝ آمِين',
      transliteration: 'Bismillāhir-Raḥmānir-Raḥīm. Al-ḥamdu lillāhi Rabbil-‘ālamīn. Ar-Raḥmānir-Raḥīm. Māliki yawmid-dīn. Iyyāka na‘budu wa iyyāka nasta‘īn. Ihdinaṣ-ṣirāṭal-mustaqīm. Ṣirāṭal-ladhīna an‘amta ‘alayhim ghayril-maghḍūbi ‘alayhim wa laḍ-ḍāllīn. Āmīn.',
      translation: 'In the Name of Allah, the Most Gracious, the Most Merciful. All praise belongs to Allah, Lord of all the worlds... Guide us to the Straight Path... Amen.'
    },
    {
      id: 'salah-step-5',
      stepNumber: 5,
      title: 'Ruku (Bowing Position)',
      posture: 'Bowing at 90° with Hands Grasping Knees',
      instruction: 'Say "Allāhu Akbar" and bow down into Ruku. Place your palms firmly on your knees with fingers spread apart. Keep your back and head level in a straight horizontal line, and recite calmly three times:',
      arabic: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ',
      transliteration: 'Subḥāna Rabbiyal-‘Aẓīm (3 times)',
      translation: 'Glory be to my Lord, the Almighty.'
    },
    {
      id: 'salah-step-6',
      stepNumber: 6,
      title: 'Qaumah (Rising Upright from Ruku)',
      posture: 'Standing Straight & Calm Before Prostration',
      instruction: 'Rise smoothly from bowing until you are standing completely upright and composed. While rising say "Sami‘-Allāhu liman ḥamidah", and once upright say "Rabbanā wa lakal-ḥamd":',
      arabic: 'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ ۝ رَبَّنَا وَلَكَ الْحَمْدُ حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ',
      transliteration: 'Sami‘-Allāhu liman ḥamidah. Rabbanā wa lakal-ḥamd, ḥamdan kathīran ṭayyiban mubārakan fīh.',
      translation: 'Allah hears whoever praises Him. Our Lord, to You belongs all praise—abundant, pure, and blessed praise.'
    },
    {
      id: 'salah-step-7',
      stepNumber: 7,
      title: 'First Sujood (Prostration on 7 Bones)',
      posture: 'Forehead & Nose, Both Palms, Both Knees, Both Sets of Toes on Ground',
      instruction: 'Say "Allāhu Akbar" and go down into prostration. Ensure seven body parts rest firmly on the ground: (1) Forehead together with the tip of the nose, (2 & 3) both palms flat level with shoulders/ears, (4 & 5) both knees, and (6 & 7) toes of both feet bent facing the Qibla. Keep your elbows lifted off the floor, and recite three times:',
      arabic: 'سُبْحَانَ رَبِّيَ الْأَعْلَى',
      transliteration: 'Subḥāna Rabbiyal-A‘lā (3 times)',
      translation: 'Glory be to my Lord, the Most High.'
    },
    {
      id: 'salah-step-8',
      stepNumber: 8,
      title: 'Jalsah (Sitting Between the Two Prostrations)',
      posture: 'Sitting Calmly on Left Foot with Right Foot Upright',
      instruction: 'Say "Allāhu Akbar" and sit up calmly between the two prostrations with your hands resting on your thighs/knees. Recite the prophetic supplication for forgiveness:',
      arabic: 'رَبِّ اغْفِرْ لِي، رَبِّ اغْفِرْ لِي، وَارْحَمْنِي، وَاهْدِنِي، وَعَافِنِي، وَارْزُقْنِي',
      transliteration: 'Rabbigh-fir lī, Rabbigh-fir lī, warḥamnī, wahdinī, wa ‘āfinī, warzuqnī.',
      translation: 'My Lord, forgive me; my Lord, forgive me, have mercy on me, guide me, grant me well-being, and provide for me.'
    },
    {
      id: 'salah-step-9',
      stepNumber: 9,
      title: 'Second Sujood & Completing the First Rak’at',
      posture: 'Second Prostration on 7 Bones',
      instruction: 'Say "Allāhu Akbar" and perform the second prostration exactly like the first, reciting "Subḥāna Rabbiyal-A‘lā" three times. This completes 1 full Rak’at! Say "Allāhu Akbar" and stand up to repeat steps 4–9 for the 2nd Rak’at.',
      arabic: 'سُبْحَانَ رَبِّيَ الْأَعْلَى',
      transliteration: 'Subḥāna Rabbiyal-A‘lā (3 times)',
      translation: 'Glory be to my Lord, the Most High.'
    },
    {
      id: 'salah-step-10',
      stepNumber: 10,
      title: 'Tashahhud (At-Tahiyyat) & Durood-e-Ibrahim',
      posture: 'Sitting After the 2nd Rak’at & in the Final Sitting (Qa’dah Akhirah)',
      instruction: 'After completing the second Sujood of the 2nd Rak’at, sit calmly, place your hands on your thighs, point your right index finger during the testimony of faith (Shahadah), and recite At-Tahiyyat. If it is the final sitting of the prayer (2nd Rak’at of Fajr, 3rd of Maghrib, or 4th of Dhuhr/Asr/Isha), continue by reciting Durood-e-Ibrahim:',
      arabic: 'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ ۝ اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ',
      transliteration: 'At-taḥiyyātu lillāhi waṣ-ṣalawātu waṭ-ṭayyibāt, as-salāmu ‘alayka ayyuhan-Nabiyyu wa raḥmatullāhi wa barakātuh, as-salāmu ‘alaynā wa ‘alā ‘ibādillāhiṣ-ṣāliḥīn. Ash-hadu an lā ilāha illallāhu wa ash-hadu anna Muḥammadan ‘abduhu wa rasūluh. Allāhumma ṣalli ‘alā Muḥammadin wa ‘alā āli Muḥammad...',
      translation: 'All compliments, prayers, and pure words belong to Allah. Peace be upon you, O Prophet, and the mercy of Allah and His blessings. Peace be upon us and upon the righteous servants of Allah. I bear witness that there is no deity worthy of worship except Allah, and I bear witness that Muhammad is His servant and Messenger...'
    },
    {
      id: 'salah-step-11',
      stepNumber: 11,
      title: 'Closing Supplication & Tasleem (Ending the Prayer)',
      posture: 'Turning Head to the Right & Left Shoulders',
      instruction: 'After Durood-e-Ibrahim, recite a Sunnah Dua (such as "Rabbanā ātinā fid-dunyā ḥasanatan..."), then turn your head smoothly to your right shoulder saying the Salam, and then turn your head to your left shoulder saying the Salam to conclude the prayer.',
      arabic: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ',
      transliteration: 'As-salāmu ‘alaykum wa raḥmatullāh (to the right, then to the left)',
      translation: 'Peace and the mercy of Allah be upon you.'
    }
  ];

  // How to Pray Tahajjud Data (Grounded in Islamic Relief Knowledge Base)
  const tahajjudSteps = [
    {
      step: 1,
      title: 'Make Intention (Niyyah) Before Going to Sleep',
      desc: 'Before sleeping after Isha prayer, set an alarm and make a sincere intention in your heart to wake up for Tahajjud. The Prophet ﷺ taught that whoever intends to wake up for night prayer, even if sleep overcomes them, receives the reward of their intention.'
    },
    {
      step: 2,
      title: 'Wake Up in the Night & Perform Fresh Wudu',
      desc: 'Tahajjud literally means "to give up sleep." Wake up during the night (ideally in the last third of the night before Fajr), wipe sleep from your face, clean your teeth (Miswak/toothbrush), remember Allah, and perform fresh Wudu.'
    },
    {
      step: 3,
      title: 'Face the Qibla & Intend 2 Rak’ats of Tahajjud',
      desc: 'Stand in a quiet, peaceful place facing the Qibla. Make the intention in your heart to pray 2 Rak’ats of voluntary Night Prayer (Tahajjud / Qiyam-ul-Layl) for the sake of Allah.'
    },
    {
      step: 4,
      title: 'Pray in Sets of 2 Rak’ats (2-by-2)',
      desc: 'The Prophet ﷺ said: "The night prayer is offered two Rak’ats followed by two Rak’ats." (Sahih Al-Bukhari). Begin with Takbir ("Allāhu Akbar"), recite Surah Al-Fatihah and a longer or deeply reflective passage of the Quran, and perform Ruku and Sujood calmly.'
    },
    {
      step: 5,
      title: 'Pray Between 2 to 8 (or 12) Rak’ats',
      desc: 'After completing the first 2 Rak’ats with Tasleem (Salam), you may stop at 2 Rak’ats if time is short, or continue praying additional sets of 2 Rak’ats (4, 6, 8, or 12 Rak’ats total). The Prophet ﷺ most frequently prayed 8 Rak’ats of Tahajjud followed by 3 Rak’ats of Witr.'
    },
    {
      step: 6,
      title: 'Pour Your Heart Out in Dua (During Sujood & After Salam)',
      desc: 'In the last third of the night, Allah descends to the lowest heaven asking: "Who is calling upon Me, that I may answer him? Who is asking of Me, that I may give him? Who is seeking My forgiveness, that I may forgive him?" Make sincere personal Duas for this life and the Hereafter.'
    },
    {
      step: 7,
      title: 'Seal Your Night Prayer with Witr Before Fajr',
      desc: 'If you have not already prayed Witr after Isha, conclude your Tahajjud prayer with 1 or 3 Rak’ats of Witr before the Fajr Adhan begins, as the Prophet ﷺ said: "Make Witr the last of your prayers at night."'
    }
  ];

  const tahajjudPropheticDua = {
    id: 'tahajjud-dua-bukhari',
    arabic: 'اللَّهُمَّ لَكَ الْحَمْدُ أَنْتَ قَيِّمُ السَّمَوَاتِ وَالأَرْضِ وَمَنْ فِيهِنَّ، وَلَكَ الْحَمْدُ لَكَ مُلْكُ السَّمَوَاتِ وَالأَرْضِ وَمَنْ فِيهِنَّ، وَلَكَ الْحَمْدُ أَنْتَ نُورُ السَّمَوَاتِ وَالأَرْضِ، وَلَكَ الْحَمْدُ أَنْتَ الْحَقُّ، وَوَعْدُكَ الْحَقُّ، وَلِقَاؤُكَ حَقٌّ، وَقَوْلُكَ حَقٌّ، وَالْجَنَّةُ حَقٌّ، وَالنَّارُ حَقٌّ، وَالنَّبِيُّونَ حَقٌّ، وَمُحَمَّدٌ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ حَقٌّ، وَالسَّاعَةُ حَقٌّ، اللَّهُمَّ لَكَ أَسْلَمْتُ، وَبِكَ آمَنْتُ، وَعَلَيْكَ تَوَكَّلْتُ، وَإِلَيْكَ أَنَبْتُ، وَبِكَ خَاصَمْتُ، وَإِلَيْكَ حَاكَمْتُ، فَاغْفِرْ لِي مَا قَدَّمْتُ وَمَا أَخَّرْتُ، وَمَا أَسْرَرْتُ وَمَا أَعْلَنْتُ، أَنْتَ الْمُقَدِّمُ وَأَنْتَ الْمُؤَخِّرُ، لاَ إِلَهَ إِلاَّ أَنْتَ',
    transliteration: 'Allāhumma lakal-ḥamdu Anta qayyimus-samāwāti wal-arḍi wa man fīhinna, wa lakal-ḥamdu laka mulkus-samāwāti wal-arḍi wa man fīhinna, wa lakal-ḥamdu Anta nūrus-samāwāti wal-arḍ, wa lakal-ḥamdu Antal-ḥaqq, wa wa‘dukal-ḥaqq, wa liqā’uka ḥaqq, wa qawluka ḥaqq, wal-jannatu ḥaqq, wan-nāru ḥaqq, wan-nabiyyūna ḥaqq, wa Muḥammadun ﷺ ḥaqq, was-sā‘atu ḥaqq. Allāhumma laka aslamtu, wa bika āmantu, wa ‘alayka tawakkaltu, wa ilayka anabtu, wa bika khāṣamtu, wa ilayka ḥākamtu, faghfir lī mā qaddamtu wa mā akhkhartu, wa mā asrartu wa mā a‘lantu, Antal-Muqaddimu wa Antal-Mu’akhkhiru, lā ilāha illā Ant.',
    translation: 'O Allah! All praise belongs to You. You are the Sustainer of the heavens and the earth and whoever is in them. All praise belongs to You; to You belongs the sovereignty of the heavens and the earth and whoever is in them. All praise belongs to You; You are the Light of the heavens and the earth. All praise belongs to You; You are the Truth, Your Promise is true, the meeting with You is true, Your Word is true, Paradise is true, the Fire is true, the Prophets are true, Muhammad ﷺ is true, and the Hour is true. O Allah! To You I have submitted, in You I believe, upon You I rely, to You I turn in repentance, by Your help I strive, and to You I refer for judgment; so forgive me for what I have sent ahead and what I have delayed, and what I have concealed and what I have declared. You are the First and the Last; there is no deity worthy of worship except You. (Sahih Al-Bukhari 1120)'
  };

  return (
    <div className="py-10 bg-gradient-to-b from-purple-50/60 via-white to-purple-50/40 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Namaz Navigation Sub-Sections Bar */}
        <div className="bg-white rounded-3xl p-3 sm:p-4 border border-[#6B1B7E]/20 shadow-md space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 px-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#6B1B7E] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#E0107F]" />
              <span>Namaz & Salah Mastery Portal — Choose Sub-Section</span>
            </span>
            <span className="text-[11px] text-slate-500 font-semibold">
              Live Local Time: <strong className="text-[#6B1B7E] font-mono">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong> ({locationInfo.city})
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            {/* Sub-section 1: Live Namaz Times */}
            <button
              onClick={() => setActiveSubSection('times')}
              className={`p-3.5 rounded-2xl text-left border transition flex items-start gap-3 cursor-pointer ${
                activeSubSection === 'times'
                  ? 'bg-gradient-to-r from-[#6B1B7E] to-[#5B2A9A] text-white border-[#6B1B7E] shadow-md'
                  : 'bg-purple-50/60 hover:bg-purple-100/70 text-slate-800 border-purple-200/70'
              }`}
            >
              <Clock className={`w-5 h-5 mt-0.5 shrink-0 ${activeSubSection === 'times' ? 'text-pink-300' : 'text-[#6B1B7E]'}`} />
              <div>
                <p className="text-xs sm:text-sm font-black leading-snug">
                  Auto Namaz Times & Qibla
                </p>
                <p className={`text-[10px] mt-0.5 ${activeSubSection === 'times' ? 'text-purple-200' : 'text-slate-500'}`}>
                  Live prayer schedule for {locationInfo.city}
                </p>
              </div>
            </button>

            {/* Sub-section 2: A step-by-step guide to performing the daily Islamic prayer (Salah) */}
            <button
              onClick={() => setActiveSubSection('salah_guide')}
              className={`p-3.5 rounded-2xl text-left border transition flex items-start gap-3 cursor-pointer ${
                activeSubSection === 'salah_guide'
                  ? 'bg-gradient-to-r from-[#6B1B7E] via-[#5B2A9A] to-[#E0107F] text-white border-[#E0107F] shadow-md'
                  : 'bg-purple-50/60 hover:bg-purple-100/70 text-slate-800 border-purple-200/70'
              }`}
            >
              <CheckCircle2 className={`w-5 h-5 mt-0.5 shrink-0 ${activeSubSection === 'salah_guide' ? 'text-amber-300' : 'text-[#E0107F]'}`} />
              <div>
                <p className="text-xs sm:text-sm font-black leading-snug">
                  A step-by-step guide to performing the daily Islamic prayer (Salah)
                </p>
                <p className={`text-[10px] mt-0.5 ${activeSubSection === 'salah_guide' ? 'text-purple-100' : 'text-slate-500'}`}>
                  Wudu, 5 Prayers Rak'at Table & Salam Center Guide
                </p>
              </div>
            </button>

            {/* Sub-section 3: How to pray tahajjud */}
            <button
              onClick={() => setActiveSubSection('tahajjud')}
              className={`p-3.5 rounded-2xl text-left border transition flex items-start gap-3 cursor-pointer ${
                activeSubSection === 'tahajjud'
                  ? 'bg-gradient-to-r from-[#2e0854] via-[#5B2A9A] to-[#E0107F] text-white border-pink-500 shadow-md'
                  : 'bg-pink-50/60 hover:bg-pink-100/70 text-slate-800 border-pink-200/70'
              }`}
            >
              <Moon className={`w-5 h-5 mt-0.5 shrink-0 ${activeSubSection === 'tahajjud' ? 'text-amber-300' : 'text-[#6B1B7E]'}`} />
              <div>
                <p className="text-xs sm:text-sm font-black leading-snug">
                  How to pray tahajjud
                </p>
                <p className={`text-[10px] mt-0.5 ${activeSubSection === 'tahajjud' ? 'text-purple-100' : 'text-slate-500'}`}>
                  Last Third of Night ({formatTimeAmPm(times.tahajjud)}), Rak'ats & Dua
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* SUB-SECTION 1: LIVE NAMAZ TIMES & QIBLA                               */}
        {/* ===================================================================== */}
        {activeSubSection === 'times' && (
          <div className="space-y-8">
            {/* Header & Live Local Clock Hero */}
            <div className="bg-gradient-to-r from-[#1f0638] via-[#2e0854] to-[#4a044e] rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-purple-500/30 relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left: Location & Hijri Info */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-pink-300 text-xs font-bold">
                    <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '10s' }} />
                    <span>Auto-Detected Local Time & Namaz Schedule</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                    Accurate Prayer Times for{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-200 to-amber-200">
                      {locationInfo.city}, {locationInfo.country}
                    </span>
                  </h1>

                  <p className="text-purple-200 text-sm sm:text-base max-w-2xl">
                    Your prayer schedule and local time are automatically synchronized with your geographical coordinates ({locationInfo.timezone}).
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-xs font-semibold">
                      <MapPin className="w-4 h-4 text-pink-400" />
                      <span>{locationInfo.city} ({locationInfo.latitude.toFixed(2)}°N, {locationInfo.longitude.toFixed(2)}°E)</span>
                    </div>

                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400/15 border border-amber-300/30 text-amber-200 text-xs font-bold">
                      <Globe className="w-4 h-4 text-amber-300" />
                      <span>World Date: {locationInfo.worldCalendarSummary}</span>
                    </div>

                    <button
                      onClick={detectUserLocation}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold transition shadow-md cursor-pointer"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                      <span>Refresh Location</span>
                    </button>
                  </div>
                </div>

                {/* Right: Live Digital Clock & Next Prayer Countdown */}
                <div className="lg:col-span-5 bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6 text-center space-y-4 shadow-inner">
                  <div className="text-xs font-bold uppercase tracking-widest text-purple-200">
                    Current Local Time ({locationInfo.city})
                  </div>

                  <div className="text-4xl sm:text-5xl font-mono font-black tracking-wider text-white">
                    {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </div>

                  <div className="text-xs text-purple-200 font-medium">
                    {locationInfo.gregorianDate}
                  </div>

                  <div className="pt-4 border-t border-white/15 flex items-center justify-between text-left bg-purple-950/60 px-4 py-3 rounded-2xl">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-pink-300 block">
                        Upcoming Prayer
                      </span>
                      <span className="text-lg font-black text-white">
                        {nextPrayer.name} ({nextPrayer.arabic})
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-mono font-black text-amber-300 block">
                        {nextPrayer.time}
                      </span>
                      <span className="text-[11px] text-purple-200 font-semibold">
                        {countdown}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* 6 Daily Prayer Cards Grid */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h2 className="text-2xl font-extrabold text-purple-950 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-pink-600" />
                  <span>Today's 5 Obligatory Namaz & Sunrise Schedule</span>
                </h2>
                <span className="text-xs text-slate-500 font-semibold">
                  Calculation Method: ISNA / Muslim World League Standard
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {schedule.map((p) => {
                  const isNext = p.id === nextPrayer.id;
                  const isActive = p.id === currentPrayer.id;
                  const Icon = p.icon;

                  return (
                    <div
                      key={p.id}
                      className={`rounded-3xl p-5 border transition flex flex-col justify-between space-y-4 relative overflow-hidden ${
                        isNext
                          ? 'bg-gradient-to-br from-[#2e0854] to-[#4a044e] text-white border-pink-500 shadow-xl ring-2 ring-pink-500/40'
                          : isActive
                          ? 'bg-purple-100/70 border-purple-300 text-purple-950 shadow-md'
                          : 'bg-white border-purple-100 text-slate-900 hover:border-purple-300 shadow-xs'
                      }`}
                    >
                      {isNext && (
                        <span className="absolute top-2 right-2 px-2 py-0.5 bg-pink-500 text-white text-[9px] font-black uppercase tracking-wider rounded-full">
                          Next
                        </span>
                      )}

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                            isNext ? 'bg-pink-500/20 text-pink-300' : 'bg-purple-50 text-purple-700'
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="font-quran text-xl font-bold">
                            {p.arabic}
                          </span>
                        </div>

                        <div>
                          <h4 className="text-sm font-extrabold">{p.name}</h4>
                          <p className={`text-[11px] ${isNext ? 'text-purple-200' : 'text-slate-500'}`}>
                            {p.description}
                          </p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-purple-100/40">
                        <span className={`text-2xl font-mono font-black ${
                          isNext ? 'text-amber-300' : 'text-purple-950'
                        }`}>
                          {p.time}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Interactive Cards to Open Step-by-Step Salah Guide & Tahajjud Guide */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card 1: Step-by-Step Salah Guide */}
              <div 
                onClick={() => setActiveSubSection('salah_guide')}
                className="bg-white rounded-3xl p-6 border border-[#6B1B7E]/20 shadow-sm hover:shadow-md hover:border-[#E0107F] transition cursor-pointer flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#6B1B7E] bg-purple-100 px-2.5 py-1 rounded-full">
                    Complete Prayer Guide
                  </span>
                  <h3 className="text-base font-black text-slate-900 group-hover:text-[#6B1B7E] transition">
                    A step-by-step guide to performing the daily Islamic prayer (Salah)
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Learn Wudu, Rak'at counts for all 5 daily prayers, and every posture from Takbir to Tasleem with Arabic audio.
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs font-black text-[#E0107F] pt-2 border-t border-purple-50">
                  <span>Open Step-by-Step Salah Guide</span>
                  <span>→</span>
                </div>
              </div>

              {/* Card 2: How to Pray Tahajjud */}
              <div 
                onClick={() => setActiveSubSection('tahajjud')}
                className="bg-white rounded-3xl p-6 border border-indigo-200 shadow-sm hover:shadow-md hover:border-[#E0107F] transition cursor-pointer flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full">
                      Night Vigil (Qiyam-ul-Layl)
                    </span>
                    <span className="text-xs font-mono font-black text-[#6B1B7E]">
                      {formatTimeAmPm(times.tahajjud)}
                    </span>
                  </div>
                  <h3 className="text-base font-black text-slate-900 group-hover:text-[#6B1B7E] transition">
                    How to pray tahajjud
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Best time in the last third of the night ({formatTimeAmPm(times.tahajjud)}), number of Rak'ats, step-by-step method, and Prophetic Tahajjud Dua.
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs font-black text-[#6B1B7E] pt-2 border-t border-purple-50">
                  <span>Open Tahajjud Prayer Guide</span>
                  <span>→</span>
                </div>
              </div>

              {/* Card 3: Duas Shortcut */}
              {onOpenDuas && (
                <div 
                  onClick={onOpenDuas}
                  className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-6 border border-purple-200 shadow-sm flex flex-col justify-between space-y-4 cursor-pointer hover:border-pink-300 transition group"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 bg-white px-2.5 py-1 rounded-full">
                      Post-Namaz Remembrance
                    </span>
                    <h3 className="text-base font-black text-purple-950">
                      Read Daily Masnoon Duas
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Access authentic supplications for after obligatory prayers, morning, evening, and protection.
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs font-black text-[#E0107F] pt-2 border-t border-purple-100">
                    <span>Explore Authentic Duas</span>
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* SUB-SECTION 2: A STEP-BY-STEP GUIDE TO PERFORMING SALAH               */}
        {/* ===================================================================== */}
        {activeSubSection === 'salah_guide' && (
          <div className="space-y-10 animate-in fade-in duration-200">
            
            {/* Hero Banner for Step-by-Step Salah Guide */}
            <div className="bg-gradient-to-r from-[#6B1B7E] via-[#5B2A9A] to-[#E0107F] rounded-3xl p-6 sm:p-10 text-white shadow-xl space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/20 text-xs font-black uppercase tracking-wider">
                  <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                  <span>Complete Daily Salah Manual</span>
                </div>

                <a
                  href="https://salamcenter.org/wp-content/uploads/2020/09/Prayer-Guide.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-[#6B1B7E] hover:bg-pink-50 text-xs font-black shadow-md transition"
                >
                  <span>View Official Salam Center Prayer Guide PDF</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#E0107F]" />
                </a>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                A step-by-step guide to performing the daily Islamic prayer (Salah)
              </h1>

              <p className="text-purple-100 text-sm sm:text-base max-w-3xl leading-relaxed">
                Salah is the second pillar of Islam and the direct spiritual connection between a believer and Allah Almighty. Follow this comprehensive guide covering Wudu (ablution), the Rak'at structure for all five daily prayers, and every posture and Arabic recitation from the opening Takbir to the concluding Tasleem.
              </p>
            </div>

            {/* Part 1: Step-by-Step Wudu (Ablution) Prerequisites */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#6B1B7E]/15 shadow-sm space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-purple-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-purple-100 text-[#6B1B7E] flex items-center justify-center font-black">
                    <Droplets className="w-6 h-6 text-[#E0107F]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#E0107F]">
                      Prerequisite of Valid Salah
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                      Part 1: How to Perform Wudu (Ablution) Before Prayer
                    </h2>
                  </div>
                </div>
                <button
                  onClick={() => handlePlayArabic('wudu-shahadah', 'أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ')}
                  className="px-4 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#6B1B7E] border border-purple-200 text-xs font-bold flex items-center gap-2 cursor-pointer transition"
                >
                  <Volume2 className="w-4 h-4 text-[#E0107F]" />
                  <span>{playingAudioId === 'wudu-shahadah' ? 'Playing Wudu Dua...' : 'Listen to Wudu Dua'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {wuduSteps.map((w) => (
                  <div key={w.step} className="p-4 rounded-2xl bg-purple-50/40 border border-purple-100 space-y-2 hover:border-[#6B1B7E]/30 transition">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#6B1B7E] text-white text-xs font-black flex items-center justify-center shrink-0">
                        {w.step}
                      </span>
                      <h3 className="text-xs font-black text-slate-900">{w.title}</h3>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                      {w.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Part 2: Complete 5 Daily Prayers Rak'at Table */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#6B1B7E]/15 shadow-sm space-y-5">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#6B1B7E]">
                  Daily Obligatory & Sunnah Units
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Part 2: Number of Rak'ats in the 5 Daily Prayers
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-purple-100 text-[11px] font-black uppercase tracking-wider text-[#6B1B7E] bg-purple-50/60">
                      <th className="py-3 px-4 rounded-tl-xl">Prayer Name</th>
                      <th className="py-3 px-4">Sunnah Before Fard</th>
                      <th className="py-3 px-4">Fard (Obligatory)</th>
                      <th className="py-3 px-4">Sunnah After Fard</th>
                      <th className="py-3 px-4">Witr</th>
                      <th className="py-3 px-4 rounded-tr-xl">Total Units</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-50 text-xs font-medium text-slate-700">
                    {dailyRakatTable.map((row, i) => (
                      <tr key={i} className="hover:bg-purple-50/40 transition">
                        <td className="py-3.5 px-4 font-black text-slate-900">{row.prayer}</td>
                        <td className="py-3.5 px-4">{row.sunnahBefore}</td>
                        <td className="py-3.5 px-4 font-bold text-[#E0107F]">{row.fard}</td>
                        <td className="py-3.5 px-4">{row.sunnahAfter}</td>
                        <td className="py-3.5 px-4 font-bold text-[#6B1B7E]">{row.witr}</td>
                        <td className="py-3.5 px-4 font-black text-slate-900">{row.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Part 3: Chronological 11 Steps of Performing Salah */}
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#E0107F]">
                    Step-by-Step Postures & Arabic Recitations
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                    Part 3: Performing Salah Step-by-Step (1 to 11)
                  </h2>
                </div>
                <a
                  href="https://salamcenter.org/wp-content/uploads/2020/09/Prayer-Guide.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-black text-[#6B1B7E] hover:text-[#E0107F] underline flex items-center gap-1"
                >
                  <span>Reference: Salam Center Prayer-Guide.pdf</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {salahStepByStep.map((item) => {
                  const isPlaying = playingAudioId === item.id;
                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-3xl p-6 border border-[#6B1B7E]/15 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <span className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#6B1B7E] to-[#E0107F] text-white font-black text-sm flex items-center justify-center shrink-0 shadow-xs">
                              {item.stepNumber}
                            </span>
                            <div>
                              <h3 className="text-base font-black text-slate-900 leading-snug">
                                {item.title}
                              </h3>
                              <span className="text-[11px] font-bold text-[#6B1B7E]">
                                Posture: {item.posture}
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => handlePlayArabic(item.id, item.arabic)}
                            className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 shrink-0 cursor-pointer transition ${
                              isPlaying
                                ? 'bg-[#E0107F] text-white border-[#E0107F] animate-pulse'
                                : 'bg-purple-50 text-[#6B1B7E] border-purple-200 hover:bg-purple-100'
                            }`}
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>{isPlaying ? 'Playing...' : 'Audio'}</span>
                          </button>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed font-medium">
                          {item.instruction}
                        </p>

                        <div className="bg-purple-50/60 p-4 rounded-2xl border border-purple-100 space-y-2">
                          <p className="font-arabic font-quran text-xl sm:text-2xl text-right text-slate-900 leading-loose" dir="rtl">
                            {item.arabic}
                          </p>
                          <p className="text-xs font-bold text-[#6B1B7E]">
                            {item.transliteration}
                          </p>
                          <p className="text-xs text-slate-600 italic">
                            "{item.translation}"
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* ===================================================================== */}
        {/* SUB-SECTION 3: HOW TO PRAY TAHAJJUD                                   */}
        {/* ===================================================================== */}
        {activeSubSection === 'tahajjud' && (
          <div className="space-y-10 animate-in fade-in duration-200">
            
            {/* Hero Banner for How to Pray Tahajjud */}
            <div className="bg-gradient-to-r from-[#1f0638] via-[#4a044e] to-[#6B1B7E] rounded-3xl p-6 sm:p-10 text-white shadow-xl space-y-5 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/20 text-xs font-black uppercase tracking-wider text-amber-300">
                  <Moon className="w-3.5 h-3.5" />
                  <span>Qiyam-ul-Layl · Voluntary Night Prayer</span>
                </div>

                <a
                  href="https://islamic-relief.org/knowledge-base/how-to-pray-tahajjud/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-[#6B1B7E] hover:bg-pink-50 text-xs font-black shadow-md transition"
                >
                  <span>Reference: Islamic Relief Tahajjud Guide</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#E0107F]" />
                </a>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                <div className="lg:col-span-8 space-y-3">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                    How to pray tahajjud
                  </h1>
                  <p className="text-purple-100 text-sm sm:text-base leading-relaxed">
                    Tahajjud (also known as <em>Qiyam-ul-Layl</em>, the Night Vigil) is the most virtuous voluntary prayer after the obligatory five daily prayers. It is performed after waking up from sleep during the night, especially in the blessed <strong>last third of the night</strong> before Fajr.
                  </p>
                </div>

                <div className="lg:col-span-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-center space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 block">
                    Tonight's Optimal Tahajjud Window ({locationInfo.city})
                  </span>
                  <div className="text-3xl font-mono font-black text-white">
                    {formatTimeAmPm(times.tahajjud)} – {formatTimeAmPm(times.fajr)}
                  </div>
                  <p className="text-[11px] text-purple-200">
                    Last Third of the Night until Fajr Adhan
                  </p>
                </div>
              </div>
            </div>

            {/* Key Facts Grid: When, How Many Rak'ats & Virtues */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-3xl p-6 border border-[#6B1B7E]/15 shadow-xs space-y-2">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#6B1B7E] flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-base font-black text-slate-900">When is Tahajjud Prayed?</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Anytime after praying Isha and waking up from sleep until the break of dawn (Fajr). However, the <strong>last third of the night</strong> ({formatTimeAmPm(times.tahajjud)} in {locationInfo.city}) is the most sacred time when Duas are readily accepted.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-[#6B1B7E]/15 shadow-xs space-y-2">
                <div className="w-10 h-10 rounded-xl bg-pink-100 text-[#E0107F] flex items-center justify-center">
                  <Star className="w-5 h-5" />
                </div>
                <h3 className="text-base font-black text-slate-900">How Many Rak'ats to Pray?</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  The minimum for Tahajjud is <strong>2 Rak'ats</strong>. It is prayed in pairs of two (2-by-2). You can pray 2, 4, 6, 8, or 12 Rak'ats according to your capacity, and conclude with <strong>3 Rak'ats of Witr</strong> (or 1 Rak'at) before Fajr.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-[#6B1B7E]/15 shadow-xs space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="text-base font-black text-slate-900">Quranic Honour (Surah Al-Isra 17:79)</h3>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "And rise from sleep during the night as an additional prayer (Tahajjud) for you; it is expected that your Lord will resurrect you to a praised station (Maqāman Maḥmūdā)."
                </p>
              </div>
            </div>

            {/* 7 Step-by-Step Cards on How to Pray Tahajjud */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#6B1B7E]/15 shadow-sm space-y-6">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#E0107F]">
                  Complete Method
                </span>
                <h2 className="text-2xl font-black text-slate-900">
                  Step-by-Step: How to Perform Tahajjud Prayer
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tahajjudSteps.map((s) => (
                  <div key={s.step} className="p-5 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-2">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-full bg-gradient-to-r from-[#6B1B7E] to-[#E0107F] text-white text-xs font-black flex items-center justify-center shrink-0">
                        {s.step}
                      </span>
                      <h3 className="text-sm font-black text-slate-900">{s.title}</h3>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {s.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Authentic Prophetic Tahajjud Dua Card */}
            <div className="bg-gradient-to-br from-purple-50 via-white to-pink-50 rounded-3xl p-6 sm:p-8 border border-[#6B1B7E]/20 shadow-md space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#6B1B7E] bg-purple-100 px-3 py-1 rounded-full">
                    Sunnah Supplication (Sahih Al-Bukhari 1120)
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                    The Prophet's ﷺ Authentic Tahajjud Dua
                  </h2>
                </div>

                <button
                  onClick={() => handlePlayArabic(tahajjudPropheticDua.id, tahajjudPropheticDua.arabic)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#6B1B7E] to-[#E0107F] text-white text-xs font-black flex items-center gap-2 shadow-md cursor-pointer transition"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>{playingAudioId === tahajjudPropheticDua.id ? 'Playing Tahajjud Dua...' : 'Listen to Tahajjud Dua Audio'}</span>
                </button>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-purple-100 space-y-4">
                <p className="font-arabic font-quran text-2xl sm:text-3xl text-right text-slate-900 leading-loose" dir="rtl">
                  {tahajjudPropheticDua.arabic}
                </p>
                <div className="border-t border-purple-100 pt-3 space-y-2">
                  <p className="text-xs font-bold text-[#6B1B7E] leading-relaxed">
                    <strong>Transliteration:</strong> {tahajjudPropheticDua.transliteration}
                  </p>
                  <p className="text-xs text-slate-600 italic leading-relaxed">
                    <strong>Meaning:</strong> "{tahajjudPropheticDua.translation}"
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
