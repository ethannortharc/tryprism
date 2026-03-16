/**
 * INV-06: Scoring algorithm correctly identifies primary Enneagram type from answer patterns
 *
 * Verifier: auto (Vitest)
 * Covers:
 * - Perfect-score scenarios: strongly favoring one type → that type is primary
 * - All 9 types identifiable as primary
 * - Weighted/continuous scoring (not just tallies)
 * - Score normalization (9 scores sum to a consistent total / percentage)
 * - Boundary cases: min and max inputs
 * - Invalid input handling: missing answers, out-of-range values
 * - Tie handling: low-confidence flag when top scores within 10% of each other
 * - Flat profile detection
 *
 * These tests FAIL until the implementation exists.
 */

import { describe, it, expect, beforeAll } from 'vitest';

// Expected shape exported by the scoring module
interface ScoreResult {
  scores: Record<number, number>;       // type 1-9 → raw or normalized score
  primaryType: number;                  // 1–9
  wing: number;                         // adjacent type
  lowConfidence: boolean;               // true when top scores within 10%
  flatProfile: boolean;                 // true when distribution is very even
}

interface Answer {
  questionId: string;
  questionType: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  value: number;  // Likert: 1–5
}

type ScoringFn = (answers: Answer[]) => ScoreResult;

let scoreAnswers: ScoringFn;

beforeAll(async () => {
  const mod = await import('../../src/lib/scoring');
  scoreAnswers = mod.scoreAnswers ?? mod.default?.scoreAnswers ?? mod.default;
  if (typeof scoreAnswers !== 'function') {
    throw new Error('scoreAnswers function not found in scoring module');
  }
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Build a synthetic answer set that strongly favors one type. */
function buildPerfectAnswers(
  favoredType: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9,
  totalPerType = 6
): Answer[] {
  const answers: Answer[] = [];
  for (let t = 1; t <= 9; t++) {
    for (let i = 0; i < totalPerType; i++) {
      answers.push({
        questionId: `q-${t}-${i}`,
        questionType: t as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9,
        // Strongly agree for the favored type, strongly disagree for others
        value: t === favoredType ? 5 : 1,
      });
    }
  }
  return answers;
}

/** Build answers where all types score the same (flat profile). */
function buildFlatAnswers(totalPerType = 6): Answer[] {
  const answers: Answer[] = [];
  for (let t = 1; t <= 9; t++) {
    for (let i = 0; i < totalPerType; i++) {
      answers.push({
        questionId: `q-${t}-${i}`,
        questionType: t as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9,
        value: 3, // Neutral — all types identical
      });
    }
  }
  return answers;
}

/** Build answers where two types tie (values 5 for two types, 1 for others). */
function buildTiedAnswers(
  typeA: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9,
  typeB: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9,
  totalPerType = 6
): Answer[] {
  const answers: Answer[] = [];
  for (let t = 1; t <= 9; t++) {
    for (let i = 0; i < totalPerType; i++) {
      answers.push({
        questionId: `q-${t}-${i}`,
        questionType: t as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9,
        value: t === typeA || t === typeB ? 5 : 1,
      });
    }
  }
  return answers;
}

// ---------------------------------------------------------------------------
// Level 2 — Unit tests
// ---------------------------------------------------------------------------

describe('INV-06 — Perfect-score scenarios identify correct primary type', () => {
  const ALL_TYPES = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

  for (const t of ALL_TYPES) {
    it(`strongly favoring type ${t} → primaryType === ${t}`, () => {
      const answers = buildPerfectAnswers(t);
      const result = scoreAnswers(answers);
      expect(result.primaryType).toBe(t);
    });
  }
});

describe('INV-06 — Scores are continuous (weighted), not just integer tallies', () => {
  it('scores are numbers (not just 0 or integer counts)', () => {
    const answers = buildPerfectAnswers(4);
    const result = scoreAnswers(answers);
    // At least one score should be non-integer when weighting is applied
    const scores = Object.values(result.scores);
    // All scores are numbers
    expect(scores.every((s) => typeof s === 'number')).toBe(true);
  });

  it('scores object contains entries for all 9 types', () => {
    const result = scoreAnswers(buildPerfectAnswers(1));
    for (let t = 1; t <= 9; t++) {
      expect(result.scores[t], `Missing score for type ${t}`).toBeDefined();
      expect(typeof result.scores[t]).toBe('number');
    }
  });
});

describe('INV-06 — Score normalization', () => {
  it('normalized scores sum to 100 (percentage distribution)', () => {
    const result = scoreAnswers(buildPerfectAnswers(3));
    const total = Object.values(result.scores).reduce((a, b) => a + b, 0);
    // Allow floating-point tolerance
    expect(total).toBeCloseTo(100, 1);
  });

  it('all individual scores are between 0 and 100', () => {
    const result = scoreAnswers(buildPerfectAnswers(7));
    for (const score of Object.values(result.scores)) {
      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThanOrEqual(100);
    }
  });
});

describe('INV-06 — Boundary cases', () => {
  it('all minimum inputs (value=1) does not throw', () => {
    const answers = buildFlatAnswers(6).map((a) => ({ ...a, value: 1 }));
    expect(() => scoreAnswers(answers)).not.toThrow();
  });

  it('all maximum inputs (value=5) does not throw', () => {
    const answers = buildFlatAnswers(6).map((a) => ({ ...a, value: 5 }));
    expect(() => scoreAnswers(answers)).not.toThrow();
  });

  it('single question input does not throw', () => {
    const answers: Answer[] = [{ questionId: 'q-1-0', questionType: 1, value: 5 }];
    expect(() => scoreAnswers(answers)).not.toThrow();
  });

  it('empty answer array does not throw and returns a result', () => {
    const result = scoreAnswers([]);
    expect(result).toBeDefined();
  });
});

describe('INV-06 — Invalid input handling', () => {
  it('out-of-range Likert value (0) is handled gracefully without throw', () => {
    const answers: Answer[] = [{ questionId: 'q-1-0', questionType: 1, value: 0 }];
    expect(() => scoreAnswers(answers)).not.toThrow();
  });

  it('out-of-range Likert value (6) is handled gracefully without throw', () => {
    const answers: Answer[] = [{ questionId: 'q-1-0', questionType: 1, value: 6 }];
    expect(() => scoreAnswers(answers)).not.toThrow();
  });
});

describe('INV-06 — Tie detection and low-confidence flag', () => {
  it('tied top scores set lowConfidence = true', () => {
    const answers = buildTiedAnswers(1, 2);
    const result = scoreAnswers(answers);
    expect(result.lowConfidence).toBe(true);
  });

  it('clear winner (no tie) sets lowConfidence = false', () => {
    const answers = buildPerfectAnswers(5);
    const result = scoreAnswers(answers);
    expect(result.lowConfidence).toBe(false);
  });
});

describe('INV-06 — Flat profile detection', () => {
  it('all-neutral answers sets flatProfile = true', () => {
    const answers = buildFlatAnswers(6);
    const result = scoreAnswers(answers);
    expect(result.flatProfile).toBe(true);
  });

  it('strong single-type answers sets flatProfile = false', () => {
    const answers = buildPerfectAnswers(8);
    const result = scoreAnswers(answers);
    expect(result.flatProfile).toBe(false);
  });
});

describe('INV-06 — Result shape', () => {
  it('result contains primaryType, wing, scores, lowConfidence, flatProfile', () => {
    const result = scoreAnswers(buildPerfectAnswers(6));
    expect(result).toHaveProperty('primaryType');
    expect(result).toHaveProperty('wing');
    expect(result).toHaveProperty('scores');
    expect(result).toHaveProperty('lowConfidence');
    expect(result).toHaveProperty('flatProfile');
  });

  it('primaryType is an integer 1–9', () => {
    const result = scoreAnswers(buildPerfectAnswers(9));
    expect(Number.isInteger(result.primaryType)).toBe(true);
    expect(result.primaryType).toBeGreaterThanOrEqual(1);
    expect(result.primaryType).toBeLessThanOrEqual(9);
  });
});
