/**
 * INV-04: Quick mode presents exactly 54 questions covering all 9 types (6 per type)
 *
 * Verifier: auto (Vitest)
 * Claim: Quick mode question bank has exactly 54 questions, 6 per Enneagram type,
 *        no duplicates, all questions have both zh and en translations.
 *
 * These tests FAIL until the implementation exists.
 */

import { describe, it, expect } from 'vitest';

// Expected interface for a question in the bank.
// The actual module must export this shape.
interface Question {
  id: string;
  type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  mode: 'quick' | 'full' | 'both';
  text: {
    en: string;
    zh: string;
  };
  // Optional secondary type weighting
  weight?: {
    primary: number;
    secondary?: { type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9; weight: number };
  };
}

// The implementation must export a default array or named export `questions`
let allQuestions: Question[];
let quickQuestions: Question[];

// Dynamically load — will fail at runtime until the module exists
beforeAll(async () => {
  const mod = await import('../../src/data/questions');
  allQuestions = mod.questions ?? mod.default;
  quickQuestions = allQuestions.filter(
    (q) => q.mode === 'quick' || q.mode === 'both'
  );
});

const ALL_TYPES = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
const QUICK_TOTAL = 54;
const QUICK_PER_TYPE = 6;

describe('INV-04 — Quick mode question count', () => {
  it(`quick mode contains exactly ${QUICK_TOTAL} questions`, () => {
    expect(quickQuestions.length).toBe(QUICK_TOTAL);
  });
});

describe('INV-04 — Quick mode type distribution', () => {
  for (const t of ALL_TYPES) {
    it(`type ${t} has exactly ${QUICK_PER_TYPE} questions`, () => {
      const typeQuestions = quickQuestions.filter((q) => q.type === t);
      expect(typeQuestions.length).toBe(QUICK_PER_TYPE);
    });
  }
});

describe('INV-04 — Quick mode question uniqueness', () => {
  it('no duplicate question IDs', () => {
    const ids = quickQuestions.map((q) => q.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('no duplicate English question text', () => {
    const texts = quickQuestions.map((q) => q.text.en.trim().toLowerCase());
    const unique = new Set(texts);
    expect(unique.size).toBe(texts.length);
  });

  it('no duplicate Chinese question text', () => {
    const texts = quickQuestions.map((q) => q.text.zh.trim());
    const unique = new Set(texts);
    expect(unique.size).toBe(texts.length);
  });
});

describe('INV-04 — Quick mode bilingual completeness', () => {
  it('every question has a non-empty English text', () => {
    const missing = quickQuestions.filter((q) => !q.text.en || q.text.en.trim() === '');
    expect(missing).toHaveLength(0);
  });

  it('every question has a non-empty Chinese text', () => {
    const missing = quickQuestions.filter((q) => !q.text.zh || q.text.zh.trim() === '');
    expect(missing).toHaveLength(0);
  });

  it('Chinese text contains Chinese characters (not just ASCII)', () => {
    const noChineseChars = quickQuestions.filter(
      (q) => !/[\u4e00-\u9fff]/.test(q.text.zh)
    );
    expect(noChineseChars).toHaveLength(0);
  });
});

describe('INV-04 — Quick mode question IDs are well-formed', () => {
  it('all question IDs are non-empty strings', () => {
    const empty = quickQuestions.filter((q) => typeof q.id !== 'string' || q.id.trim() === '');
    expect(empty).toHaveLength(0);
  });

  it('all question type values are integers 1–9', () => {
    const invalid = quickQuestions.filter(
      (q) => !Number.isInteger(q.type) || q.type < 1 || q.type > 9
    );
    expect(invalid).toHaveLength(0);
  });
});
