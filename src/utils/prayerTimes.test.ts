import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { 
  computePrayerTimes, 
  getNextPrayer, 
  formatLiveClock,
  formatTimeAmPm,
  getPrayerAvailabilitySchedule,
  getEstimatedHijriDate 
} from './prayerTimes.js';
import { 
  getWorldDateMetrics, 
  getWorldMonthGrid 
} from './worldCalendar.js';

describe('prayerTimes utils', () => {
  const testDate = new Date('2026-05-15T12:00:00Z');

  it('computes 5 prayer times + sunrise for London', () => {
    const times = computePrayerTimes(testDate, 51.5074, -0.1278, true);
    assert.ok(times.fajr instanceof Date, 'Fajr should be a Date instance');
    assert.ok(times.sunrise instanceof Date, 'Sunrise should be a Date instance');
    assert.ok(times.dhuhr instanceof Date, 'Dhuhr should be a Date instance');
    assert.ok(times.asr instanceof Date, 'Asr should be a Date instance');
    assert.ok(times.maghrib instanceof Date, 'Maghrib should be a Date instance');
    assert.ok(times.isha instanceof Date, 'Isha should be a Date instance');
  });

  it('computes prayer times for Makkah Al-Mukarramah', () => {
    const times = computePrayerTimes(testDate, 21.4225, 39.8262, false);
    assert.ok(times.dhuhr instanceof Date);
    assert.ok(times.maghrib instanceof Date);
  });

  it('computes prayer times for New York and Karachi', () => {
    const nyTimes = computePrayerTimes(testDate, 40.7128, -74.0060, true);
    const karachiTimes = computePrayerTimes(testDate, 24.8607, 67.0011, true);
    assert.ok(nyTimes.fajr instanceof Date);
    assert.ok(karachiTimes.fajr instanceof Date);
  });

  it('calculates the next prayer and countdown correctly', () => {
    const times = computePrayerTimes(testDate, 51.5074, -0.1278, true);
    const next = getNextPrayer(times, testDate);
    assert.ok(next.name, 'Next prayer should have a name');
    assert.ok(next.time, 'Next prayer should have a time');
    assert.ok(next.remainingFormatted, 'Next prayer should have countdown text');
  });

  it('formats live clock properly with 12h format', () => {
    const clockStr = formatLiveClock(testDate, 'Asia/Riyadh');
    assert.ok(clockStr.includes(':'), 'Clock string should contain colon');
    assert.ok(clockStr.includes('AM') || clockStr.includes('PM'));
  });

  it('computes estimated Hijri date string', () => {
    const hijri = getEstimatedHijriDate(testDate);
    assert.ok(typeof hijri === 'string', 'Hijri date should be a string');
    assert.ok(hijri.includes('AH'), 'Hijri date should contain AH');
  });

  it('accurately identifies ongoing prayer for country based on local country time', () => {
    // Test midday prayer (Dhuhr) at 13:00
    const schedule = getPrayerAvailabilitySchedule({
      fajr: '05:00',
      sunrise: '06:30',
      dhuhr: '12:30',
      asr: '16:00',
      maghrib: '18:45',
      isha: '20:15'
    }, new Date('2026-05-15T13:00:00Z'), 'UTC');

    assert.ok(schedule.currentlyAvailable, 'Should have an ongoing prayer');
    assert.equal(schedule.currentlyAvailable?.id, 'dhuhr', 'Dhuhr should be the ongoing prayer at 13:00');
    assert.equal(schedule.currentlyAvailable?.isAvailableNow, true);
    assert.ok(schedule.activeSummary.includes('ONGOING NOW'), 'Summary should clearly state ONGOING NOW');

    // Test late afternoon prayer (Asr) at 17:00
    const asrSchedule = getPrayerAvailabilitySchedule({
      fajr: '05:00',
      sunrise: '06:30',
      dhuhr: '12:30',
      asr: '16:00',
      maghrib: '18:45',
      isha: '20:15'
    }, new Date('2026-05-15T17:00:00Z'), 'UTC');

    assert.equal(asrSchedule.currentlyAvailable?.id, 'asr', 'Asr should be the ongoing prayer at 17:00');
    assert.equal(asrSchedule.upcomingNext?.id, 'maghrib', 'Next prayer should be Maghrib');
  });
});

describe('worldCalendar utils', () => {
  const testDate = new Date('2026-05-15T12:00:00Z');

  it('calculates world date metrics for specified date', () => {
    const metrics = getWorldDateMetrics(testDate);
    assert.equal(typeof metrics.year, 'number');
    assert.equal(typeof metrics.monthName, 'string');
    assert.equal(metrics.dayOfMonth, 15);
    assert.equal(metrics.quarter, 'Q2');
  });

  it('generates monthly calendar grid with month offset', () => {
    const grid = getWorldMonthGrid(testDate, 0);
    assert.equal(grid.days.length, 31, 'May has 31 days');
    assert.equal(grid.year, 2026);
    assert.equal(grid.monthName, 'May');
  });
});
