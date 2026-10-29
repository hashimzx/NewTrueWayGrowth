import test from 'node:test';
import assert from 'node:assert/strict';
import { ALL_114_SURAHS, getSurahByNumber, searchSurahs, getSurahAudioUrl } from '../data/allSurahsMeta';
import { formatTime } from './audioState';
import { generateDailyTasks, calculateTaskCompletion } from './dailyTasks';

test('ALL_114_SURAHS contains exactly 114 surahs starting with Al-Fatihah and ending with An-Nas', () => {
  assert.equal(ALL_114_SURAHS.length, 114);
  assert.equal(ALL_114_SURAHS[0].number, 1);
  assert.equal(ALL_114_SURAHS[0].englishName, 'Al-Fatihah');
  assert.equal(ALL_114_SURAHS[113].number, 114);
  assert.equal(ALL_114_SURAHS[113].englishName, 'An-Nas');
});

test('getSurahByNumber returns correct metadata', () => {
  const baqarah = getSurahByNumber(2);
  assert.ok(baqarah);
  assert.equal(baqarah.englishName, 'Al-Baqarah');
  assert.equal(baqarah.ayahsCount, 286);
  assert.equal(baqarah.revelationType, 'Medinan');

  const mulk = getSurahByNumber(67);
  assert.ok(mulk);
  assert.equal(mulk.englishName, 'Al-Mulk');
  assert.equal(mulk.ayahsCount, 30);
});

test('searchSurahs matches by name and number', () => {
  const yasin = searchSurahs('ya-sin');
  assert.ok(yasin.length >= 1);
  assert.equal(yasin[0].number, 36);

  const num112 = searchSurahs('112');
  assert.equal(num112.length, 1);
  assert.equal(num112[0].englishName, 'Al-Ikhlas');
});

test('getSurahAudioUrl generates valid CDN MP3 links for different reciters', () => {
  const urlAlafasy = getSurahAudioUrl(1, 'alafasy');
  assert.ok(urlAlafasy.includes('server8.mp3quran.net/afs/001.mp3'));

  const urlSudais = getSurahAudioUrl(114, 'sudais');
  assert.ok(urlSudais.includes('server11.mp3quran.net/sds/114.mp3'));
});

test('formatTime properly formats seconds to MM:SS', () => {
  assert.equal(formatTime(0), '00:00');
  assert.equal(formatTime(65), '01:05');
  assert.equal(formatTime(360), '06:00');
  assert.equal(formatTime(3599), '59:59');
  assert.equal(formatTime(-5), '00:00');
});

test('generateDailyTasks creates 5 distinct Islamic tasks', () => {
  const tasks = generateDailyTasks('2026-10-26');
  assert.equal(tasks.length, 5);
  const ids = new Set(tasks.map(t => t.id));
  assert.equal(ids.size, 5);
});

test('calculateTaskCompletion accurately computes completion stats', () => {
  const sampleTasks = [
    { id: '1', title: 'Task 1', category: 'quran' as const, rewardNote: 'N1', completed: true },
    { id: '2', title: 'Task 2', category: 'dhikr' as const, rewardNote: 'N2', completed: false },
    { id: '3', title: 'Task 3', category: 'sunnah' as const, rewardNote: 'N3', completed: true },
    { id: '4', title: 'Task 4', category: 'qaida' as const, rewardNote: 'N4', completed: false },
  ];
  const { completedCount, total, percentage } = calculateTaskCompletion(sampleTasks);
  assert.equal(completedCount, 2);
  assert.equal(total, 4);
  assert.equal(percentage, 50);
});

test('loadFullSurah loads full Ayahs for Surah 1 Al-Fatihah', async () => {
  const { loadFullSurah } = await import('./quranFullLoader');
  const fatihah = await loadFullSurah(1);
  assert.equal(fatihah.number, 1);
  assert.equal(fatihah.englishName, 'Al-Fatihah');
  assert.equal(fatihah.ayahs.length, 7);
  assert.ok(fatihah.ayahs[0].arabic.includes('بِسْمِ'));
});

test('getWorldDateMetrics and getWorldMonthGrid compute accurate Gregorian world calendar data', async () => {
  const { getWorldDateMetrics, getWorldMonthGrid, getWorldTimezoneHubs, isLeapYear } = await import('./worldCalendar');
  const d = new Date('2026-10-29T12:00:00Z');
  const metrics = getWorldDateMetrics(d);

  assert.equal(metrics.year, 2026);
  assert.equal(metrics.monthName, 'October');
  assert.equal(metrics.quarter, 'Q4');
  assert.equal(isLeapYear(2026), false);
  assert.equal(metrics.totalDaysInYear, 365);
  assert.ok(metrics.dayOfYear > 300);
  assert.ok(metrics.weekNumber >= 43 && metrics.weekNumber <= 45);

  const grid = getWorldMonthGrid(d, 0);
  assert.equal(grid.daysInMonth, 31);
  assert.equal(grid.days.length, 31);

  const hubs = getWorldTimezoneHubs(d);
  assert.ok(hubs.length >= 7);
  assert.ok(hubs.some(h => h.city.includes('UTC')));
  assert.ok(hubs.some(h => h.city.includes('London')));
  assert.ok(hubs.some(h => h.city.includes('New York')));
});

