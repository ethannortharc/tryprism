/**
 * BF-02: IPIP-NEO-120 Question Data Integrity (INV-02)
 *
 * Verifier: auto (Vitest)
 * Claim: The IPIP-NEO-120 question bank contains exactly 120 items with correct
 *        facet/factor structure: 4 items per facet, 6 facets per factor, 5 factors,
 *        bilingual en/zh text, valid scoring keys (+/-), valid factor AND facet
 *        assignments, and facets correctly mapped to their parent factor.
 *
 * These tests FAIL until src/data/bigfive/questions120.ts exists.
 *
 * Expected module: src/data/bigfive/questions120.ts
 * Expected exports: `questions120` (named) or default array
 */

import { describe, it, expect, beforeAll } from 'vitest';

// ---------------------------------------------------------------------------
// Expected interface
// ---------------------------------------------------------------------------

type BigFiveFactor = 'O' | 'C' | 'E' | 'A' | 'N';
type ScoringKey = '+' | '-';

interface BigFiveQuestion120 {
  id: string;
  factor: BigFiveFactor;
  facet: string;     // e.g. 'O1', 'O2', ..., 'N6'
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
const TOTAL_QUESTIONS = 120;
const PER_FACTOR = 24;
const FACETS_PER_FACTOR = 6;
const ITEMS_PER_FACET = 4;
const TOTAL_FACETS = 30;

// The 30 facets, 6 per factor
const FACET_MAP: Record<BigFiveFactor, string[]> = {
  O: ['O1', 'O2', 'O3', 'O4', 'O5', 'O6'],
  C: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6'],
  E: ['E1', 'E2', 'E3', 'E4', 'E5', 'E6'],
  A: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6'],
  N: ['N1', 'N2', 'N3', 'N4', 'N5', 'N6'],
};

const ALL_FACETS = Object.values(FACET_MAP).flat();

// ---------------------------------------------------------------------------
// Load module dynamically — fails until implementation exists
// ---------------------------------------------------------------------------

let allQuestions: BigFiveQuestion120[];

beforeAll(async () => {
  const mod = await import('../../src/data/bigfive/questions120');
  allQuestions = mod.questions120 ?? mod.questions ?? mod.default;
  if (!Array.isArray(allQuestions)) {
    throw new Error(
      'src/data/bigfive/questions120 must export an array as `questions120`, `questions`, or default'
    );
  }
});

// ---------------------------------------------------------------------------
// Total count
// ---------------------------------------------------------------------------

describe('BF-02 — IPIP-NEO-120 total question count', () => {
  it(`question bank contains exactly ${TOTAL_QUESTIONS} items`, () => {
    expect(allQuestions.length).toBe(TOTAL_QUESTIONS);
  });
});

// ---------------------------------------------------------------------------
// Per-factor distribution (24 per factor)
// ---------------------------------------------------------------------------

describe('BF-02 — IPIP-NEO-120 factor distribution (24 per factor)', () => {
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
// Per-facet distribution (4 items per facet)
// ---------------------------------------------------------------------------

describe('BF-02 — IPIP-NEO-120 facet distribution (4 items per facet)', () => {
  for (const facet of ALL_FACETS) {
    it(`facet ${facet} has exactly ${ITEMS_PER_FACET} items`, () => {
      const count = allQuestions.filter((q) => q.facet === facet).length;
      expect(
        count,
        `Expected ${ITEMS_PER_FACET} items for facet ${facet}, got ${count}`
      ).toBe(ITEMS_PER_FACET);
    });
  }
});

// ---------------------------------------------------------------------------
// Facet structure
// ---------------------------------------------------------------------------

describe('BF-02 — IPIP-NEO-120 facet structure', () => {
  it(`each factor has exactly ${FACETS_PER_FACTOR} distinct facets`, () => {
    for (const factor of FACTORS) {
      const factorItems = allQuestions.filter((q) => q.factor === factor);
      const facets = new Set(factorItems.map((q) => q.facet));
      expect(
        facets.size,
        `Factor ${factor} has ${facets.size} facets, expected ${FACETS_PER_FACTOR}`
      ).toBe(FACETS_PER_FACTOR);
    }
  });

  it(`total distinct facets across all factors is ${TOTAL_FACETS}`, () => {
    const facets = new Set(allQuestions.map((q) => q.facet));
    expect(facets.size).toBe(TOTAL_FACETS);
  });
});

// ---------------------------------------------------------------------------
// Facet-to-factor mapping correctness
// ---------------------------------------------------------------------------

describe('BF-02 — IPIP-NEO-120 facets correctly mapped to parent factor', () => {
  it('every facet belongs to the correct parent factor per FACET_MAP', () => {
    const mismatched: string[] = [];
    for (const q of allQuestions) {
      const expectedFacets = FACET_MAP[q.factor];
      if (!expectedFacets || !expectedFacets.includes(q.facet)) {
        mismatched.push(
          `Item ${q.id}: factor=${q.factor}, facet=${q.facet} (expected facet in [${expectedFacets?.join(', ')}])`
        );
      }
    }
    expect(
      mismatched,
      `Facet-factor mismatches:\n${mismatched.join('\n')}`
    ).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// Bilingual completeness
// ---------------------------------------------------------------------------

describe('BF-02 — IPIP-NEO-120 bilingual text', () => {
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

describe('BF-02 — IPIP-NEO-120 scoring key validity', () => {
  it('all items have a valid scoring key ("+" or "-")', () => {
    const invalid = allQuestions.filter(
      (q) => !VALID_KEYS.includes(q.key as ScoringKey)
    );
    expect(
      invalid,
      `Items with invalid key: ${invalid.map((q) => `${q.id}:${q.key}`).join(', ')}`
    ).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// Valid factor and facet assignments
// ---------------------------------------------------------------------------

describe('BF-02 — IPIP-NEO-120 valid factor and facet values', () => {
  it('all items have a valid factor (O, C, E, A, or N)', () => {
    const invalid = allQuestions.filter(
      (q) => !FACTORS.includes(q.factor as BigFiveFactor)
    );
    expect(
      invalid,
      `Items with invalid factor: ${invalid.map((q) => `${q.id}:${q.factor}`).join(', ')}`
    ).toHaveLength(0);
  });

  it('all items have a valid facet (one of the 30 known facets)', () => {
    const invalid = allQuestions.filter(
      (q) => !ALL_FACETS.includes(q.facet)
    );
    expect(
      invalid,
      `Items with invalid facet: ${invalid.map((q) => `${q.id}:${q.facet}`).join(', ')}`
    ).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// Uniqueness
// ---------------------------------------------------------------------------

describe('BF-02 — IPIP-NEO-120 uniqueness', () => {
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
