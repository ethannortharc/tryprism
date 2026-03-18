/**
 * BF-07: IPIP-NEO-120 Question Interleaving (INV-15)
 *
 * Verifier: auto (Vitest)
 * Claim: The IPIP-NEO-120 administered (interleaved) question order satisfies:
 *   1. No two consecutive questions belong to the same facet
 *   2. No three consecutive questions belong to the same factor
 *   3. All 120 questions are present (no duplicates, no missing items)
 *
 * These tests FAIL until src/data/bigfive/questions120.ts exports the administered order.
 *
 * Expected module: src/data/bigfive/questions120.ts
 * Expected exports:
 *   `administeredOrder` — the 120 questions in interleaved administration sequence
 *   OR `questions120` with a stable order that satisfies the interleaving constraints
 */

import { describe, it, expect, beforeAll } from 'vitest';

// ---------------------------------------------------------------------------
// Expected interface
// ---------------------------------------------------------------------------

type BigFiveFactor = 'O' | 'C' | 'E' | 'A' | 'N';

interface BigFiveQuestion120 {
  id: string;
  factor: BigFiveFactor;
  facet: string;
  key: '+' | '-';
  text: {
    en: string;
    zh: string;
  };
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const TOTAL_QUESTIONS = 120;

// ---------------------------------------------------------------------------
// Load module — fails until implementation exists
// ---------------------------------------------------------------------------

let administeredOrder: BigFiveQuestion120[];

beforeAll(async () => {
  const mod = await import('../../src/data/bigfive/questions120');

  // Prefer an explicit administeredOrder export; fall back to questions120/default
  const rawOrder =
    (mod as unknown as Record<string, unknown>).administeredOrder ??
    mod.questions120 ??
    mod.questions ??
    mod.default;

  if (!Array.isArray(rawOrder)) {
    throw new Error(
      'src/data/bigfive/questions120 must export an array as ' +
      '`administeredOrder`, `questions120`, `questions`, or default'
    );
  }

  administeredOrder = rawOrder as BigFiveQuestion120[];
});

// ---------------------------------------------------------------------------
// Completeness: all 120 questions present with no duplicates
// ---------------------------------------------------------------------------

describe('BF-07 — Administered order completeness', () => {
  it(`administered order contains exactly ${TOTAL_QUESTIONS} questions`, () => {
    expect(administeredOrder.length).toBe(TOTAL_QUESTIONS);
  });

  it('no duplicate question IDs in administered order', () => {
    const ids = administeredOrder.map((q) => q.id);
    const unique = new Set(ids);
    expect(unique.size, 'Duplicate question IDs found in administered order').toBe(ids.length);
  });

  it('all 5 factors are represented in the administered order', () => {
    const factors = new Set(administeredOrder.map((q) => q.factor));
    expect([...factors].sort().join(',')).toBe('A,C,E,N,O');
  });

  it('all 30 facets are represented in the administered order', () => {
    const facets = new Set(administeredOrder.map((q) => q.facet));
    expect(facets.size).toBe(30);
  });
});

// ---------------------------------------------------------------------------
// Constraint 1: No two consecutive questions from the same facet
// ---------------------------------------------------------------------------

describe('BF-07 — No consecutive same-facet questions', () => {
  it('no two adjacent questions share the same facet', () => {
    const violations: string[] = [];
    for (let i = 1; i < administeredOrder.length; i++) {
      const prev = administeredOrder[i - 1];
      const curr = administeredOrder[i];
      if (prev.facet === curr.facet) {
        violations.push(
          `Questions ${i} and ${i + 1} both belong to facet ${curr.facet} ` +
          `(ids: ${prev.id}, ${curr.id})`
        );
      }
    }
    expect(
      violations,
      `Consecutive same-facet questions found:\n${violations.slice(0, 10).join('\n')}`
    ).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// Constraint 2: No three consecutive questions from the same factor
// ---------------------------------------------------------------------------

describe('BF-07 — No three consecutive same-factor questions', () => {
  it('no three adjacent questions share the same factor', () => {
    const violations: string[] = [];
    for (let i = 2; i < administeredOrder.length; i++) {
      const q1 = administeredOrder[i - 2];
      const q2 = administeredOrder[i - 1];
      const q3 = administeredOrder[i];
      if (q1.factor === q2.factor && q2.factor === q3.factor) {
        violations.push(
          `Questions ${i - 1}, ${i}, ${i + 1} all belong to factor ${q3.factor} ` +
          `(ids: ${q1.id}, ${q2.id}, ${q3.id})`
        );
      }
    }
    expect(
      violations,
      `Three consecutive same-factor questions found:\n${violations.slice(0, 10).join('\n')}`
    ).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// Distribution sanity: each facet appears exactly 4 times
// ---------------------------------------------------------------------------

describe('BF-07 — Each facet appears exactly 4 times in the administered order', () => {
  it('every facet has exactly 4 items in the administered order', () => {
    const facetCounts = new Map<string, number>();
    for (const q of administeredOrder) {
      facetCounts.set(q.facet, (facetCounts.get(q.facet) ?? 0) + 1);
    }

    const wrongCount: string[] = [];
    for (const [facet, count] of facetCounts.entries()) {
      if (count !== 4) {
        wrongCount.push(`Facet ${facet}: expected 4, got ${count}`);
      }
    }
    expect(
      wrongCount,
      `Facets with wrong item count:\n${wrongCount.join('\n')}`
    ).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// Distribution sanity: each factor appears exactly 24 times
// ---------------------------------------------------------------------------

describe('BF-07 — Each factor appears exactly 24 times in the administered order', () => {
  it('every factor has exactly 24 items in the administered order', () => {
    const factorCounts: Record<string, number> = { O: 0, C: 0, E: 0, A: 0, N: 0 };
    for (const q of administeredOrder) {
      factorCounts[q.factor] = (factorCounts[q.factor] ?? 0) + 1;
    }

    const wrongCount: string[] = [];
    for (const [factor, count] of Object.entries(factorCounts)) {
      if (count !== 24) {
        wrongCount.push(`Factor ${factor}: expected 24, got ${count}`);
      }
    }
    expect(
      wrongCount,
      `Factors with wrong item count:\n${wrongCount.join('\n')}`
    ).toHaveLength(0);
  });
});
