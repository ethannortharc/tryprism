/**
 * BF-03: Big Five Scoring Algorithm (INV-03)
 *
 * Verifier: auto (Vitest)
 * Claim: The scoring algorithm correctly:
 *   - Reverse-scores negatively-keyed items (6 minus raw value)
 *   - Passes through positively-keyed items as-is
 *   - Computes factor sums and normalizes to 0–100%
 *   - Computes facet sums (full mode) and normalizes to 0–100%
 *   - Assigns descriptive bands: Low (≤35%), Average (36–65%), High (≥66%)
 *   - Returns correct result shapes for quick and full modes
 *
 * These tests FAIL until src/lib/bigfive/scoring.ts exists.
 *
 * Expected module: src/lib/bigfive/scoring.ts
 * Expected exports: `scoreBigFive` function (or similar name)
 */

import { describe, it, expect, beforeAll } from 'vitest';

// ---------------------------------------------------------------------------
// Expected types — defines the contract the implementation must satisfy
// ---------------------------------------------------------------------------

type BigFiveFactor = 'O' | 'C' | 'E' | 'A' | 'N';
type ScoringKey = '+' | '-';
type Band = 'low' | 'average' | 'high';

interface QuestionItem {
  id: string;
  factor: BigFiveFactor;
  facet?: string;
  key: ScoringKey;
}

interface FactorScore {
  raw: number;
  percentage: number;
  band: Band;
}

interface FacetScore {
  raw: number;
  percentage: number;
  band: Band;
}

interface BigFiveQuickResult {
  factors: Record<BigFiveFactor, FactorScore>;
  facets?: undefined;
}

interface BigFiveFullResult {
  factors: Record<BigFiveFactor, FactorScore>;
  facets: Record<string, FacetScore>;
}

type BigFiveResult = BigFiveQuickResult | BigFiveFullResult;
type ScoringFn = (answers: Record<string, number>, questions: QuestionItem[], mode?: 'quick' | 'full') => BigFiveResult;

// ---------------------------------------------------------------------------
// Load module — fails until implementation exists
// ---------------------------------------------------------------------------

let scoreBigFive: ScoringFn;

beforeAll(async () => {
  const mod = await import('../../src/lib/bigfive/scoring');
  scoreBigFive = mod.scoreBigFive ?? mod.score ?? mod.default?.scoreBigFive ?? mod.default;
  if (typeof scoreBigFive !== 'function') {
    throw new Error('src/lib/bigfive/scoring must export a scoring function as `scoreBigFive`, `score`, or default');
  }
});

// ---------------------------------------------------------------------------
// Helpers: build synthetic question sets and answer maps
// ---------------------------------------------------------------------------

/** Build a minimal IPIP-50 question set: 10 per factor, alternating + and - keys. */
function buildQuestions50(): QuestionItem[] {
  const factors: BigFiveFactor[] = ['E', 'A', 'C', 'N', 'O'];
  const questions: QuestionItem[] = [];
  let idx = 0;
  for (let i = 0; i < 10; i++) {
    for (const factor of factors) {
      questions.push({
        id: `q50-${idx}`,
        factor,
        key: i < 5 ? '+' : '-',
      });
      idx++;
    }
  }
  return questions;
}

/** Build answers mapping every question ID to the given raw value. */
function buildAnswers(questions: QuestionItem[], rawValue: number): Record<string, number> {
  const answers: Record<string, number> = {};
  for (const q of questions) {
    answers[q.id] = rawValue;
  }
  return answers;
}

/** Build answers with different values for + and - keyed items. */
function buildMixedAnswers(
  questions: QuestionItem[],
  positiveValue: number,
  negativeValue: number
): Record<string, number> {
  const answers: Record<string, number> = {};
  for (const q of questions) {
    answers[q.id] = q.key === '+' ? positiveValue : negativeValue;
  }
  return answers;
}

/** Build a minimal IPIP-NEO-120 question set: 4 items per facet, 6 facets per factor. */
function buildQuestions120(): QuestionItem[] {
  const factors: BigFiveFactor[] = ['O', 'C', 'E', 'A', 'N'];
  const questions: QuestionItem[] = [];
  let idx = 0;
  for (const factor of factors) {
    for (let facetNum = 1; facetNum <= 6; facetNum++) {
      for (let item = 0; item < 4; item++) {
        questions.push({
          id: `q120-${idx}`,
          factor,
          facet: `${factor}${facetNum}`,
          key: item < 2 ? '+' : '-',
        });
        idx++;
      }
    }
  }
  return questions;
}

// ---------------------------------------------------------------------------
// Level 2 — Reverse scoring unit tests
// ---------------------------------------------------------------------------

describe('BF-03 — Reverse scoring of negatively-keyed items', () => {
  it('item with key "-" and raw value 1 scores as 5 (6 - 1)', async () => {
    const q: QuestionItem = { id: 'test-rev-1', factor: 'E', key: '-' };
    const result = scoreBigFive({ 'test-rev-1': 1 }, [q]);
    // Factor E should have scored value 5 (not 1)
    // raw sum for 1 item: 5; min=1, max=5, percentage = (5-1)/(5-1) * 100 = 100%
    expect(result.factors.E.percentage).toBeGreaterThan(50);
  });

  it('item with key "-" and raw value 5 scores as 1 (6 - 5)', async () => {
    const q: QuestionItem = { id: 'test-rev-5', factor: 'E', key: '-' };
    const result = scoreBigFive({ 'test-rev-5': 5 }, [q]);
    // raw scored = 1, minimum possible — percentage should be 0%
    expect(result.factors.E.percentage).toBeLessThan(50);
  });

  it('item with key "+" and raw value 1 scores as 1 (no reversal)', async () => {
    const q: QuestionItem = { id: 'test-pos-1', factor: 'E', key: '+' };
    const result = scoreBigFive({ 'test-pos-1': 1 }, [q]);
    // scored = 1, minimum — percentage should be 0%
    expect(result.factors.E.percentage).toBeLessThan(50);
  });

  it('item with key "+" and raw value 5 scores as 5 (no reversal)', async () => {
    const q: QuestionItem = { id: 'test-pos-5', factor: 'E', key: '+' };
    const result = scoreBigFive({ 'test-pos-5': 5 }, [q]);
    // scored = 5, maximum — percentage should be 100%
    expect(result.factors.E.percentage).toBeGreaterThan(50);
  });
});

// ---------------------------------------------------------------------------
// IPIP-50 factor score normalization
// ---------------------------------------------------------------------------

describe('BF-03 — IPIP-50 factor scores: all answers = 3', () => {
  it('each factor score is the midpoint (percentage = 50%)', () => {
    const questions = buildQuestions50();
    const answers = buildAnswers(questions, 3);
    const result = scoreBigFive(answers, questions, 'quick');

    const factors: BigFiveFactor[] = ['O', 'C', 'E', 'A', 'N'];
    for (const factor of factors) {
      expect(
        result.factors[factor].percentage,
        `Factor ${factor} should be ~50% when all answers = 3`
      ).toBeCloseTo(50, 0);
    }
  });
});

describe('BF-03 — IPIP-50 factor scores: max scoring answers', () => {
  it('all + items answered 5, all - items answered 1 → each factor at or near 100%', () => {
    const questions = buildQuestions50();
    // Answer 5 on + items (max positive), 1 on - items (which reverse to 5)
    const answers = buildMixedAnswers(questions, 5, 1);
    const result = scoreBigFive(answers, questions, 'quick');

    const factors: BigFiveFactor[] = ['O', 'C', 'E', 'A', 'N'];
    for (const factor of factors) {
      expect(
        result.factors[factor].percentage,
        `Factor ${factor} should be at or near 100% with max answers`
      ).toBeGreaterThanOrEqual(95);
    }
  });

  it('all + items answered 1, all - items answered 5 → each factor at or near 0%', () => {
    const questions = buildQuestions50();
    // Answer 1 on + items (min positive), 5 on - items (which reverse to 1)
    const answers = buildMixedAnswers(questions, 1, 5);
    const result = scoreBigFive(answers, questions, 'quick');

    const factors: BigFiveFactor[] = ['O', 'C', 'E', 'A', 'N'];
    for (const factor of factors) {
      expect(
        result.factors[factor].percentage,
        `Factor ${factor} should be at or near 0% with min answers`
      ).toBeLessThanOrEqual(5);
    }
  });
});

// ---------------------------------------------------------------------------
// IPIP-NEO-120 facet score normalization
// ---------------------------------------------------------------------------

describe('BF-03 — IPIP-NEO-120 facet scores: all answers = 3', () => {
  it('each facet score percentage is approximately 50%', () => {
    const questions = buildQuestions120();
    const answers = buildAnswers(questions, 3);
    const result = scoreBigFive(answers, questions, 'full') as BigFiveFullResult;

    expect(result.facets, 'Full mode result must include facets').toBeDefined();

    for (let factor of ['O', 'C', 'E', 'A', 'N'] as BigFiveFactor[]) {
      for (let facetNum = 1; facetNum <= 6; facetNum++) {
        const facetKey = `${factor}${facetNum}`;
        const facetScore = result.facets[facetKey];
        expect(
          facetScore,
          `Facet ${facetKey} missing from full result`
        ).toBeDefined();
        expect(
          facetScore.percentage,
          `Facet ${facetKey} should be ~50% when all answers = 3`
        ).toBeCloseTo(50, 0);
      }
    }
  });
});

// ---------------------------------------------------------------------------
// Band assignment
// ---------------------------------------------------------------------------

describe('BF-03 — Band assignment thresholds', () => {
  it('percentage ≤35% → band is "low"', () => {
    // All + items answered 1, all - items answered 5 → near 0%
    const questions = buildQuestions50();
    const answers = buildMixedAnswers(questions, 1, 5);
    const result = scoreBigFive(answers, questions, 'quick');

    const factors: BigFiveFactor[] = ['O', 'C', 'E', 'A', 'N'];
    for (const factor of factors) {
      if (result.factors[factor].percentage <= 35) {
        expect(
          result.factors[factor].band,
          `Factor ${factor} at ${result.factors[factor].percentage}% should have band "low"`
        ).toBe('low');
      }
    }
  });

  it('percentage ≥66% → band is "high"', () => {
    // All + items answered 5, all - items answered 1 → near 100%
    const questions = buildQuestions50();
    const answers = buildMixedAnswers(questions, 5, 1);
    const result = scoreBigFive(answers, questions, 'quick');

    const factors: BigFiveFactor[] = ['O', 'C', 'E', 'A', 'N'];
    for (const factor of factors) {
      if (result.factors[factor].percentage >= 66) {
        expect(
          result.factors[factor].band,
          `Factor ${factor} at ${result.factors[factor].percentage}% should have band "high"`
        ).toBe('high');
      }
    }
  });

  it('percentage in range 36–65% → band is "average" (midpoint answers)', () => {
    const questions = buildQuestions50();
    const answers = buildAnswers(questions, 3);
    const result = scoreBigFive(answers, questions, 'quick');

    const factors: BigFiveFactor[] = ['O', 'C', 'E', 'A', 'N'];
    for (const factor of factors) {
      expect(
        result.factors[factor].band,
        `Factor ${factor} at midpoint should have band "average"`
      ).toBe('average');
    }
  });
});

// ---------------------------------------------------------------------------
// Result shape validation
// ---------------------------------------------------------------------------

describe('BF-03 — Quick mode result shape', () => {
  it('includes factors object with O, C, E, A, N keys', () => {
    const questions = buildQuestions50();
    const answers = buildAnswers(questions, 3);
    const result = scoreBigFive(answers, questions, 'quick');

    expect(result.factors).toBeDefined();
    expect(result.factors.O).toBeDefined();
    expect(result.factors.C).toBeDefined();
    expect(result.factors.E).toBeDefined();
    expect(result.factors.A).toBeDefined();
    expect(result.factors.N).toBeDefined();
  });

  it('each factor entry has percentage (number) and band (string) fields', () => {
    const questions = buildQuestions50();
    const answers = buildAnswers(questions, 3);
    const result = scoreBigFive(answers, questions, 'quick');

    const factors: BigFiveFactor[] = ['O', 'C', 'E', 'A', 'N'];
    for (const factor of factors) {
      expect(typeof result.factors[factor].percentage).toBe('number');
      expect(['low', 'average', 'high']).toContain(result.factors[factor].band);
    }
  });

  it('does NOT include facets in quick mode', () => {
    const questions = buildQuestions50();
    const answers = buildAnswers(questions, 3);
    const result = scoreBigFive(answers, questions, 'quick');

    // facets should be absent or undefined for quick mode
    expect((result as BigFiveFullResult).facets).toBeUndefined();
  });
});

describe('BF-03 — Full mode result shape', () => {
  it('includes facets object with all 30 facet keys', () => {
    const questions = buildQuestions120();
    const answers = buildAnswers(questions, 3);
    const result = scoreBigFive(answers, questions, 'full') as BigFiveFullResult;

    expect(result.facets).toBeDefined();
    const facetKeys = Object.keys(result.facets);
    expect(facetKeys.length).toBe(30);
  });

  it('each facet entry has percentage (number) and band (string) fields', () => {
    const questions = buildQuestions120();
    const answers = buildAnswers(questions, 3);
    const result = scoreBigFive(answers, questions, 'full') as BigFiveFullResult;

    for (const [facetKey, facetScore] of Object.entries(result.facets)) {
      expect(
        typeof facetScore.percentage,
        `Facet ${facetKey} percentage should be a number`
      ).toBe('number');
      expect(
        ['low', 'average', 'high'],
        `Facet ${facetKey} band should be low/average/high`
      ).toContain(facetScore.band);
    }
  });

  it('factor scores are also present in full mode', () => {
    const questions = buildQuestions120();
    const answers = buildAnswers(questions, 3);
    const result = scoreBigFive(answers, questions, 'full') as BigFiveFullResult;

    expect(result.factors.O).toBeDefined();
    expect(result.factors.C).toBeDefined();
    expect(result.factors.E).toBeDefined();
    expect(result.factors.A).toBeDefined();
    expect(result.factors.N).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// Percentage range
// ---------------------------------------------------------------------------

describe('BF-03 — Percentage values are within valid range', () => {
  it('all factor percentages are between 0 and 100 (inclusive)', () => {
    const questions = buildQuestions50();
    const answers = buildAnswers(questions, 3);
    const result = scoreBigFive(answers, questions, 'quick');

    const factors: BigFiveFactor[] = ['O', 'C', 'E', 'A', 'N'];
    for (const factor of factors) {
      const pct = result.factors[factor].percentage;
      expect(pct, `Factor ${factor} percentage out of range: ${pct}`).toBeGreaterThanOrEqual(0);
      expect(pct, `Factor ${factor} percentage out of range: ${pct}`).toBeLessThanOrEqual(100);
    }
  });

  it('all facet percentages are between 0 and 100 (inclusive) in full mode', () => {
    const questions = buildQuestions120();
    const answers = buildAnswers(questions, 3);
    const result = scoreBigFive(answers, questions, 'full') as BigFiveFullResult;

    for (const [facetKey, facetScore] of Object.entries(result.facets)) {
      const pct = facetScore.percentage;
      expect(pct, `Facet ${facetKey} percentage out of range: ${pct}`).toBeGreaterThanOrEqual(0);
      expect(pct, `Facet ${facetKey} percentage out of range: ${pct}`).toBeLessThanOrEqual(100);
    }
  });
});
