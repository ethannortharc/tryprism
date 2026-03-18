/**
 * BF-01: IPIP-50 Question Data Integrity (INV-01)
 *
 * Verifier: auto (Vitest)
 * Claim: The IPIP-50 question bank contains exactly 50 items with 10 per factor
 *        (O, C, E, A, N), bilingual en/zh text, valid scoring key (+/-),
 *        valid factor assignment, and standard IPIP-50 interleaving order.
 *
 * These tests FAIL until src/data/bigfive/questions50.ts exists.
 *
 * Expected module: src/data/bigfive/questions50.ts
 * Expected exports: `questions50` (named) or default array
 */

import { describe, it, expect, beforeAll } from 'vitest';

// ---------------------------------------------------------------------------
// Expected interface — defines the contract the implementation must satisfy
// ---------------------------------------------------------------------------

type BigFiveFactor = 'O' | 'C' | 'E' | 'A' | 'N';
type ScoringKey = '+' | '-';

interface BigFiveQuestion50 {
  id: string;
  factor: BigFiveFactor;
  key: ScoringKey;
  text: {
    en: string;
    zh: string;
  };
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const FACTORS: BigFiveFactor[] = ['O', 'C', 'E', 'A', 'N'];
const VALID_KEYS: ScoringKey[] = ['+', '-'];
const TOTAL_QUESTIONS = 50;
const PER_FACTOR = 10;

// Standard IPIP-50 interleaving cycle: E, A, C, N (ES), O
// Item 1=E, 2=A, 3=C, 4=N, 5=O, 6=E, ...
// (Factor IV in IPIP-50 is Emotional Stability = inverted N)
const INTERLEAVE_CYCLE: BigFiveFactor[] = ['E', 'A', 'C', 'N', 'O'];

// ---------------------------------------------------------------------------
// Load module dynamically — fails until implementation exists
// ---------------------------------------------------------------------------

let allQuestions: BigFiveQuestion50[];

beforeAll(async () => {
  const mod = await import('../../src/data/bigfive/questions50');
  allQuestions = mod.questions50 ?? mod.questions ?? mod.default;
  if (!Array.isArray(allQuestions)) {
    throw new Error(
      'src/data/bigfive/questions50 must export an array as `questions50`, `questions`, or default'
    );
  }
});

// ---------------------------------------------------------------------------
// Total count
// ---------------------------------------------------------------------------

describe('BF-01 — IPIP-50 total question count', () => {
  it(`question bank contains exactly ${TOTAL_QUESTIONS} items`, () => {
    expect(allQuestions.length).toBe(TOTAL_QUESTIONS);
  });
});

// ---------------------------------------------------------------------------
// Per-factor distribution
// ---------------------------------------------------------------------------

describe('BF-01 — IPIP-50 factor distribution (10 per factor)', () => {
  for (const factor of FACTORS) {
    it(`factor ${factor} has exactly ${PER_FACTOR} items`, () => {
      const count = allQuestions.filter((q) => q.factor === factor).length;
      expect(
        count,
        `Expected ${PER_FACTOR} items for factor ${factor}, got ${count}`
      ).toBe(PER_FACTOR);
    });
  }
});

// ---------------------------------------------------------------------------
// Bilingual completeness
// ---------------------------------------------------------------------------

describe('BF-01 — IPIP-50 bilingual text', () => {
  it('every item has a non-empty English text field', () => {
    const missing = allQuestions.filter(
      (q) => !q.text?.en || q.text.en.trim() === ''
    );
    expect(
      missing,
      `Items missing EN text: ${missing.map((q) => q.id).join(', ')}`
    ).toHaveLength(0);
  });

  it('every item has a non-empty Chinese text field', () => {
    const missing = allQuestions.filter(
      (q) => !q.text?.zh || q.text.zh.trim() === ''
    );
    expect(
      missing,
      `Items missing ZH text: ${missing.map((q) => q.id).join(', ')}`
    ).toHaveLength(0);
  });

  it('Chinese text contains Chinese characters (not just ASCII)', () => {
    const noChineseChars = allQuestions.filter(
      (q) => !/[\u4e00-\u9fff]/.test(q.text?.zh ?? '')
    );
    expect(
      noChineseChars,
      `Items with no CJK characters in ZH text: ${noChineseChars.map((q) => q.id).join(', ')}`
    ).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// Valid scoring keys
// ---------------------------------------------------------------------------

describe('BF-01 — IPIP-50 scoring key validity', () => {
  it('all items have a valid scoring key ("+" or "-")', () => {
    const invalid = allQuestions.filter(
      (q) => !VALID_KEYS.includes(q.key as ScoringKey)
    );
    expect(
      invalid,
      `Items with invalid key: ${invalid.map((q) => `${q.id}:${q.key}`).join(', ')}`
    ).toHaveLength(0);
  });

  it('each factor has a mix of positively and negatively keyed items', () => {
    for (const factor of FACTORS) {
      const factorItems = allQuestions.filter((q) => q.factor === factor);
      const positiveCount = factorItems.filter((q) => q.key === '+').length;
      const negativeCount = factorItems.filter((q) => q.key === '-').length;
      expect(
        positiveCount,
        `Factor ${factor} has no positively keyed items`
      ).toBeGreaterThan(0);
      expect(
        negativeCount,
        `Factor ${factor} has no negatively keyed items`
      ).toBeGreaterThan(0);
    }
  });
});

// ---------------------------------------------------------------------------
// Valid factor assignments
// ---------------------------------------------------------------------------

describe('BF-01 — IPIP-50 factor assignment validity', () => {
  it('all items have a valid factor (O, C, E, A, or N)', () => {
    const invalid = allQuestions.filter(
      (q) => !FACTORS.includes(q.factor as BigFiveFactor)
    );
    expect(
      invalid,
      `Items with invalid factor: ${invalid.map((q) => `${q.id}:${q.factor}`).join(', ')}`
    ).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// Standard IPIP-50 interleaving order
// ---------------------------------------------------------------------------

describe('BF-01 — IPIP-50 standard interleaving order (E, A, C, N, O cycle)', () => {
  it('item positions follow standard IPIP-50 cycle: E, A, C, N, O', () => {
    const violatingItems: string[] = [];
    allQuestions.forEach((q, idx) => {
      const expectedFactor = INTERLEAVE_CYCLE[idx % INTERLEAVE_CYCLE.length];
      if (q.factor !== expectedFactor) {
        violatingItems.push(
          `Item ${idx + 1} (id=${q.id}): expected factor ${expectedFactor}, got ${q.factor}`
        );
      }
    });
    expect(
      violatingItems,
      `Items not following interleave cycle:\n${violatingItems.join('\n')}`
    ).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// Uniqueness
// ---------------------------------------------------------------------------

describe('BF-01 — IPIP-50 uniqueness', () => {
  it('all item IDs are unique', () => {
    const ids = allQuestions.map((q) => q.id);
    const unique = new Set(ids);
    expect(unique.size, 'Duplicate item IDs found').toBe(ids.length);
  });

  it('no duplicate English item text', () => {
    const texts = allQuestions.map((q) => q.text.en.trim().toLowerCase());
    const unique = new Set(texts);
    expect(unique.size, 'Duplicate EN item text found').toBe(texts.length);
  });

  it('all item IDs are non-empty strings', () => {
    const empty = allQuestions.filter(
      (q) => typeof q.id !== 'string' || q.id.trim() === ''
    );
    expect(empty, 'Items with empty/non-string IDs found').toHaveLength(0);
  });
});
