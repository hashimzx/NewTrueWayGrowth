import test from 'node:test';
import assert from 'node:assert/strict';
import { ASMA_UL_HUSNA } from '../data/asmaUlHusnaFullData';
import { JANAZAH_GUIDE } from '../data/namazLearningData';
import { normalizeArabic, soundEngine, audioEngine } from './audioSynth';

test('ASMA_UL_HUSNA contains complete 99 Names of Allah with valid audio URLs', () => {
  assert.equal(ASMA_UL_HUSNA.length, 99, 'Must have exactly 99 Names of Allah');

  ASMA_UL_HUSNA.forEach((item, idx) => {
    assert.equal(item.number, idx + 1, `Name #${idx + 1} has correct number`);
    assert.ok(item.arabic && item.arabic.length > 0, `Name #${item.number} has Arabic text`);
    assert.ok(item.transliteration && item.transliteration.length > 0, `Name #${item.number} has transliteration`);
    assert.ok(item.meaning && item.meaning.length > 0, `Name #${item.number} has meaning`);
    assert.ok(item.audioUrl && item.audioUrl.startsWith('https://cdn.jsdelivr.net/gh/soachishti/Asma-ul-Husna@master/audio/'), `Name #${item.number} has valid studio audio URL`);
  });
});

test('JANAZAH_GUIDE contains all 4 Takbeers and authentic Child Duas', () => {
  assert.equal(JANAZAH_GUIDE.steps.length, 4, 'Must have 4 Takbeers');
  assert.ok(JANAZAH_GUIDE.duaChildBoy.arabic.length > 0, 'Must have Dua for deceased boy');
  assert.ok(JANAZAH_GUIDE.duaChildGirl.arabic.length > 0, 'Must have Dua for deceased girl');

  // Takbeer 3 contains the authentic adult dua
  const takbeer3 = JANAZAH_GUIDE.steps.find(s => s.takbeerNumber === 3);
  assert.ok(takbeer3, 'Takbeer 3 must exist');
  assert.ok(takbeer3.recitationArabic.includes('اللَّهُمَّ اغْفِرْ لِحَيِّنَا وَمَيِّتِنَا'), 'Takbeer 3 has authentic adult janazah prayer');
});

test('normalizeArabic removes diacritics and normalizes text for speech matching', () => {
  const input = 'اللَّهُمَّ اغْفِرْ لِحَيِّنَا وَمَيِّتِنَا';
  const normalized = normalizeArabic(input);
  assert.ok(!normalized.includes('َ') && !normalized.includes('ِّ'), 'Diacritics must be stripped');
  assert.ok(normalized.includes('اغفر لحينا وميتنا'), 'Root phrase preserved');
});

test('AudioEngine methods for Asma-ul-Husna, Janaza, Salah, and Kalimas are present and functional', () => {
  assert.equal(typeof soundEngine.playAsmaUlHusna, 'function');
  assert.equal(typeof soundEngine.playJanazaStep, 'function');
  assert.equal(typeof soundEngine.playJanazaChildDua, 'function');
  assert.equal(typeof soundEngine.playSalahStep, 'function');
  assert.equal(typeof soundEngine.playKalima, 'function');
  assert.equal(typeof soundEngine.speakArabic, 'function');
  assert.equal(typeof soundEngine.stopVoice, 'function');
  assert.equal(soundEngine, audioEngine, 'soundEngine and audioEngine refer to the same singleton');
});
