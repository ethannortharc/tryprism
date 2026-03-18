/**
 * BF-04: Mode Question Loading (INV-04)
 *
 * Verifier: auto (Vitest)
 * Claim: A function to get questions for a given mode returns exactly 50 questions
 *        in quick mode (IPIP-50) and exactly 120 questions in full mode (IPIP-NEO-120).
 *
 * These tests FAIL until the implementation exists.
 *
 * Expected module: src/lib/bigfive/questions.ts (or similar)
 * Expected exports:
 *   `getBigFiveQuestions(mode: 'quick' | 'full')` → array of questions
 *   OR re-exports from questions50/questions120 with a mode-aware loader
 */

import { describe, it, expect, beforeAll } from 'vitest';

// ---------------------------------------------------------------------------
// Expected interfaces
// ---------------------------------------------------------------------------

type BigFiveFactor = 'O' | 'C' | 'E' | 'A' | 'N';
type ScoringKey = '+' | '-';

interface BigFiveQuestion {
  id: string;
  factor: BigFiveFactor;
  facet?: string;
  key: ScoringKey;
  text: {
    en: string;
    zh: string;
  };
}

type GetQuestionsFn = (mode: 'quick' | 'full') => BigFiveQuestion[];

// ---------------------------------------------------------------------------
// Load module — fails until implementation exists
// ---------------------------------------------------------------------------

let getBigFiveQuestions: GetQuestionsFn;

beforeAll(async () => {
  // Try the primary expected location first, then fallbacks
  let mod: Record<string, unknown>;
  try {
    mod = await import('../../src/lib/bigfive/questions');
  } catch {
    try {
      mod = await import('../../src/data/bigfive/questions');
    } catch {
      throw new Error(
        'Could not import Big Five question loader. ' +
        'Expected at src/lib/bigfive/questions.ts or src/data/bigfive/questions.ts ' +
        'with a getBigFiveQuestions(mode) export.'
      );
    }
  }

  getBigFiveQuestions =
    (mod.getBigFiveQuestions as GetQuestionsFn) ??
    (mod.getQuestions as GetQuestionsFn) ??
    (mod.default as GetQuestionsFn);

  if (typeof getBigFiveQuestions !== 'function') {
    throw new Error(
      'Module must export a function `getBigFiveQuestions(mode)` as a named or default export'
    );
  }
});

// ---------------------------------------------------------------------------
// Quick mode
// ---------------------------------------------------------------------------

describe('BF-04 — Quick mode returns exactly 50 questions', () => {
  it('getBigFiveQuestions("quick") returns exactly 50 questions', () => {
    const questions = getBigFiveQuestions('quick');
    expect(questions.length).toBe(50);
  });

  it('quick mode questions all have en and zh text', () => {
    const questions = getBigFiveQuestions('quick');
    const missingEn = questions.filter((q) => !q.text?.en || q.text.en.trim() === '');
    const missingZh = questions.filter((q) => !q.text?.zh || q.text.zh.trim() === '');
    expect(missingEn, 'Quick mode questions missing EN text').toHaveLength(0);
    expect(missingZh, 'Quick mode questions missing ZH text').toHaveLength(0);
  });

  it('quick mode questions all have valid scoring keys', () => {
    const questions = getBigFiveQuestions('quick');
    const invalid = questions.filter((q) => q.key !== '+' && q.key !== '-');
    expect(
      invalid,
      `Quick mode questions with invalid key: ${invalid.map((q) => q.id).join(', ')}`
    ).toHaveLength(0);
  });

  it('quick mode questions are unique (no duplicate IDs)', () => {
    const questions = getBigFiveQuestions('quick');
    const ids = questions.map((q) => q.id);
    const unique = new Set(ids);
    expect(unique.size, 'Duplicate IDs in quick mode').toBe(ids.length);
  });
});

// ---------------------------------------------------------------------------
// Full mode
// ---------------------------------------------------------------------------

describe('BF-04 — Full mode returns exactly 120 questions', () => {
  it('getBigFiveQuestions("full") returns exactly 120 questions', () => {
    const questions = getBigFiveQuestions('full');
    expect(questions.length).toBe(120);
  });

  it('full mode questions all have en and zh text', () => {
    const questions = getBigFiveQuestions('full');
    const missingEn = questions.filter((q) => !q.text?.en || q.text.en.trim() === '');
    const missingZh = questions.filter((q) => !q.text?.zh || q.text.zh.trim() === '');
    expect(missingEn, 'Full mode questions missing EN text').toHaveLength(0);
    expect(missingZh, 'Full mode questions missing ZH text').toHaveLength(0);
  });

  it('full mode questions all have valid scoring keys', () => {
    const questions = getBigFiveQuestions('full');
    const invalid = questions.filter((q) => q.key !== '+' && q.key !== '-');
    expect(
      invalid,
      `Full mode questions with invalid key: ${invalid.map((q) => q.id).join(', ')}`
    ).toHaveLength(0);
  });

  it('full mode questions all have a facet field', () => {
    const questions = getBigFiveQuestions('full');
    const missing = questions.filter((q) => !q.facet || q.facet.trim() === '');
    expect(
      missing,
      `Full mode questions without facet: ${missing.map((q) => q.id).join(', ')}`
    ).toHaveLength(0);
  });

  it('full mode questions are unique (no duplicate IDs)', () => {
    const questions = getBigFiveQuestions('full');
    const ids = questions.map((q) => q.id);
    const unique = new Set(ids);
    expect(unique.size, 'Duplicate IDs in full mode').toBe(ids.length);
  });
});

// ---------------------------------------------------------------------------
// Mode distinction
// ---------------------------------------------------------------------------

describe('BF-04 — Quick and full modes load different question sets', () => {
  it('full mode has more questions than quick mode', () => {
    const quickQuestions = getBigFiveQuestions('quick');
    const fullQuestions = getBigFiveQuestions('full');
    expect(fullQuestions.length).toBeGreaterThan(quickQuestions.length);
  });

  it('quick mode and full mode question sets have different IDs', () => {
    const quickIds = new Set(getBigFiveQuestions('quick').map((q) => q.id));
    const fullIds = new Set(getBigFiveQuestions('full').map((q) => q.id));
    // The two sets should be entirely distinct (different instruments)
    const overlap = [...quickIds].filter((id) => fullIds.has(id));
    // Either entirely distinct (different instruments) or quick is not a subset of full
    // For IPIP-50 vs IPIP-NEO-120, they should be entirely different items
    expect(overlap.length).toBeLessThan(10);
  });
});
