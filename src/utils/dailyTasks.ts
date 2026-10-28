export interface IslamicTask {
  id: string;
  title: string;
  arabic?: string;
  category: 'quran' | 'dhikr' | 'sunnah' | 'character' | 'qaida';
  rewardNote: string;
  completed: boolean;
}

export const ALL_ISLAMIC_TASKS_POOL: Omit<IslamicTask, 'completed'>[] = [
  {
    id: 'task-mulk',
    title: 'Recite Surah Al-Mulk (Chapter 67) before sleep',
    arabic: 'سُورَةُ الْمُلْكِ',
    category: 'quran',
    rewardNote: 'Protects from punishment of the grave and intercedes on Day of Judgment (Sunan Abi Dawud).'
  },
  {
    id: 'task-kursi',
    title: 'Recite Ayat-ul-Kursi after each Fard (obligatory) Salah',
    arabic: 'آيَةُ الْكُرْسِيِّ',
    category: 'quran',
    rewardNote: 'Nothing stands between you and Paradise except death (Sunan An-Nasa\'i).'
  },
  {
    id: 'task-salawat',
    title: 'Send 100 Salawat / Durood upon Prophet Muhammad ﷺ',
    arabic: 'اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ',
    category: 'dhikr',
    rewardNote: 'Whoever sends one blessing, Allah sends ten blessings and wipes ten sins (Sahih Muslim).'
  },
  {
    id: 'task-subhanallah',
    title: 'Recite "SubhanAllahi wa bihamdihi" 100 times',
    arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
    category: 'dhikr',
    rewardNote: 'Sins forgiven even if like the foam of the sea (Sahih al-Bukhari).'
  },
  {
    id: 'task-istighfar',
    title: 'Make Istighfar 70 to 100 times',
    arabic: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ',
    category: 'dhikr',
    rewardNote: 'Relieves distress, grants relief from every worry, and provides provision unexpectedly.'
  },
  {
    id: 'task-qaida',
    title: 'Practice 15 minutes of Madani Qaida with AI Voice Assessment',
    arabic: 'تَجْوِيدُ الْقَاعِدَةِ',
    category: 'qaida',
    rewardNote: 'Mastering pronunciation opens the door to fluent and beautiful Tarteel.'
  },
  {
    id: 'task-sadaqah',
    title: 'Give Sadaqah (charity) or perform a sincere act of kindness with a smile',
    arabic: 'الصَّدَقَةُ بُرْهَانٌ',
    category: 'character',
    rewardNote: 'Charity does not decrease wealth, and a warm smile to your brother is charity.'
  },
  {
    id: 'task-morning-azkar',
    title: 'Recite Morning or Evening Protective Azkar (Mu\'awwidhatayn)',
    arabic: 'أَذْكَارُ الصَّبَاحِ وَالْمَسَاءِ',
    category: 'sunnah',
    rewardNote: 'A divine shield against harm, evil eye, and anxiety throughout day and night.'
  },
  {
    id: 'task-parents',
    title: 'Make Dua for parents: "Rabbi irhamhuma kama rabbayani sagheera"',
    arabic: 'رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    category: 'character',
    rewardNote: 'A righteous prayer honoring mothers and fathers, raising their ranks in Jannah.'
  },
  {
    id: 'task-tahajjud-witr',
    title: 'Offer 2 Rakats of Tahajjud or pray Witr prayer before sleeping',
    arabic: 'صَلَاةُ الْوِتْرِ',
    category: 'sunnah',
    rewardNote: 'Allah is Witr (One) and loves the Witr prayer (Jami` at-Tirmidhi).'
  },
  {
    id: 'task-la-hawla',
    title: 'Recite "La hawla wa la quwwata illa billah" 33 times',
    arabic: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    category: 'dhikr',
    rewardNote: 'One of the priceless treasures of Paradise (Kanz min Kunuz al-Jannah).'
  },
  {
    id: 'task-ruku-quran',
    title: 'Read 1 Ruku of the Holy Quran with English translation and reflection',
    arabic: 'تَدَبُّرُ الْقُرْآنِ',
    category: 'quran',
    rewardNote: 'Every letter recited earns 10 good deeds; reflecting on the meaning transforms the heart.'
  }
];

export function getTodayDateKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

// Pseudo-random deterministic shuffle by date string so tasks are consistent throughout the day
function pseudoRandomSeed(seedStr: string): number {
  let hash = 0;
  for (let i = 0; i < seedStr.length; i++) {
    hash = (hash << 5) - hash + seedStr.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function generateDailyTasks(dateKey: string = getTodayDateKey()): IslamicTask[] {
  const seed = pseudoRandomSeed(dateKey);
  const pool = [...ALL_ISLAMIC_TASKS_POOL];
  
  // Fisher-Yates shuffle with seed
  for (let i = pool.length - 1; i > 0; i--) {
    const j = (seed * (i + 1) * 31 + i * 17) % (i + 1);
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  
  // Pick 5 daily tasks
  return pool.slice(0, 5).map(task => ({
    ...task,
    completed: false
  }));
}

export function loadTodayTasks(dateKey: string = getTodayDateKey()): IslamicTask[] {
  const storageKey = `twq_daily_tasks_${dateKey}`;
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {}
  
  const generated = generateDailyTasks(dateKey);
  try {
    localStorage.setItem(storageKey, JSON.stringify(generated));
  } catch {}
  return generated;
}

export function saveTodayTasks(tasks: IslamicTask[], dateKey: string = getTodayDateKey()): void {
  const storageKey = `twq_daily_tasks_${dateKey}`;
  try {
    localStorage.setItem(storageKey, JSON.stringify(tasks));
  } catch {}
}

export function calculateTaskCompletion(tasks: IslamicTask[]): { completedCount: number; total: number; percentage: number } {
  const total = tasks.length;
  if (total === 0) return { completedCount: 0, total: 0, percentage: 0 };
  const completedCount = tasks.filter(t => t.completed).length;
  const percentage = Math.round((completedCount / total) * 100);
  return { completedCount, total, percentage };
}
