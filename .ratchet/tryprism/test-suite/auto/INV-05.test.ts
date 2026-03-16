/**
 * INV-05: Full mode presents exactly 108 questions covering all 9 types (12 per type)
 *
 * Verifier: auto (Vitest)
 * Claim: Full mode bank has 108 questions (12 per type), quick mode is a strict subset,
 *        no duplicates, all questions have both zh and en translations.
 *
 * These tests FAIL until the implementation exists.
 */

import { describe, it, expect, beforeAll } from 'vitest';

interface Question {
  id: string;
  type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  mode: 'quick' | 'full' | 'both';
  text: {
    en: string;
    zh: string;
  };
}

let allQuestions: Question[];
let quickQuestions: Question[];
let fullQuestions: Question[];

beforeAll(async () => {
  const mod = await import('../../../../src/data/questions');
  allQuestions = mod.questions ?? mod.default;
  quickQuestions = allQuestions.filter((q) => q.mode === 'quick' || q.mode === 'both');
  fullQuestions = allQuestions.filter((q) => q.mode === 'full' || q.mode === 'both');
});

const ALL_TYPES = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
const FULL_TOTAL = 108;
const FULL_PER_TYPE = 12;

describe('INV-05 — Full mode question count', () => {
  it(`full mode contains exactly ${FULL_TOTAL} questions`, () => {
    expect(fullQuestions.length).toBe(FULL_TOTAL);
  });
});

describe('INV-05 — Full mode type distribution', () => {
  for (const t of ALL_TYPES) {
    it(`type ${t} has exactly ${FULL_PER_TYPE} questions in full mode`, () => {
      const typeQuestions = fullQuestions.filter((q) => q.type === t);
      expect(typeQuestions.length).toBe(FULL_PER_TYPE);
    });
  }
});

describe('INV-05 — Quick mode is a subset of full mode', () => {
  it('every quick-mode question ID appears in full-mode question set', () => {
    const fullIds = new Set(fullQuestions.map((q) => q.id));
    const missing = quickQuestions.filter((q) => !fullIds.has(q.id));
    expect(
      missing,
      `Quick-mode questions not in full mode: ${missing.map((q) => q.id).join(', ')}`
    ).toHaveLength(0);
  });

  it('full mode has more questions than quick mode', () => {
    expect(fullQuestions.length).toBeGreaterThan(quickQuestions.length);
  });
});

describe('INV-05 — Full mode question uniqueness', () => {
  it('no duplicate question IDs in full mode', () => {
    const ids = fullQuestions.map((q) => q.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it('no duplicate English text in full mode', () => {
    const texts = fullQuestions.map((q) => q.text.en.trim().toLowerCase());
    const unique = new Set(texts);
    expect(unique.size).toBe(texts.length);
  });

  it('no duplicate Chinese text in full mode', () => {
    const texts = fullQuestions.map((q) => q.text.zh.trim());
    const unique = new Set(texts);
    expect(unique.size).toBe(texts.length);
  });
});

describe('INV-05 — Full mode bilingual completeness', () => {
  it('every full-mode question has non-empty English text', () => {
    const missing = fullQuestions.filter((q) => !q.text.en || q.text.en.trim() === '');
    expect(missing).toHaveLength(0);
  });

  it('every full-mode question has non-empty Chinese text', () => {
    const missing = fullQuestions.filter((q) => !q.text.zh || q.text.zh.trim() === '');
    expect(missing).toHaveLength(0);
  });

  it('Chinese text contains Chinese characters', () => {
    const noChineseChars = fullQuestions.filter(
      (q) => !/[\u4e00-\u9fff]/.test(q.text.zh)
    );
    expect(noChineseChars).toHaveLength(0);
  });
});

describe('INV-05 — Full mode question validity', () => {
  it('all type values are integers 1–9', () => {
    const invalid = fullQuestions.filter(
      (q) => !Number.isInteger(q.type) || q.type < 1 || q.type > 9
    );
    expect(invalid).toHaveLength(0);
  });

  it('all question IDs are non-empty strings', () => {
    const empty = fullQuestions.filter(
      (q) => typeof q.id !== 'string' || q.id.trim() === ''
    );
    expect(empty).toHaveLength(0);
  });
});
