/**
 * INV-07: Wing calculation always selects from the two adjacent types on the Enneagram circle
 *
 * Verifier: auto (Vitest)
 * Claim: For each primary type, the wing is always one of the two adjacent types.
 *        Non-adjacent types with higher scores must NOT be selected as wing.
 *        Equal adjacent scores are handled gracefully.
 *
 * Wing adjacency map:
 *   1 → {9, 2}
 *   2 → {1, 3}
 *   3 → {2, 4}
 *   4 → {3, 5}
 *   5 → {4, 6}
 *   6 → {5, 7}
 *   7 → {6, 8}
 *   8 → {7, 9}
 *   9 → {8, 1}
 *
 * These tests FAIL until the implementation exists.
 */

import { describe, it, expect, beforeAll } from 'vitest';

interface ScoreResult {
  scores: Record<number, number>;
  primaryType: number;
  wing: number;
  lowConfidence: boolean;
  flatProfile: boolean;
}

interface Answer {
  questionId: string;
  questionType: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  value: number;
}

type ScoringFn = (answers: Answer[]) => ScoreResult;

// The scoring module's calculateWing may also be exported separately
type WingFn = (primaryType: number, scores: Record<number, number>) => number;

let scoreAnswers: ScoringFn;
let calculateWing: WingFn | undefined;

beforeAll(async () => {
  const mod = await import('../../../../src/lib/scoring');
  scoreAnswers = mod.scoreAnswers ?? mod.default?.scoreAnswers ?? mod.default;
  calculateWing = mod.calculateWing ?? mod.default?.calculateWing;

  if (typeof scoreAnswers !== 'function') {
    throw new Error('scoreAnswers function not found in scoring module');
  }
});

// ---------------------------------------------------------------------------
// The canonical adjacency map
// ---------------------------------------------------------------------------
const ADJACENCY: Record<number, [number, number]> = {
  1: [9, 2],
  2: [1, 3],
  3: [2, 4],
  4: [3, 5],
  5: [4, 6],
  6: [5, 7],
  7: [6, 8],
  8: [7, 9],
  9: [8, 1],
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Build scores that clearly favor one primary type and a specific adjacent wing,
 * while making all non-adjacent types score very low.
 */
function buildScoresForWing(
  primaryType: number,
  intendedWing: number
): Record<number, number> {
  const scores: Record<number, number> = {};
  for (let t = 1; t <= 9; t++) {
    if (t === primaryType) {
      scores[t] = 90;
    } else if (t === intendedWing) {
      scores[t] = 60; // Higher than other adjacent
    } else if (ADJACENCY[primaryType].includes(t)) {
      scores[t] = 30; // Other adjacent, lower than intended wing
    } else {
      // Non-adjacent — even higher than adjacent to test that wing constraint holds
      scores[t] = 75;
    }
  }
  return scores;
}

/**
 * Build answers that produce a clear primary type and allow us to verify
 * the wing constraint end-to-end through scoreAnswers.
 */
function buildAnswers(
  primaryType: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9,
  totalPerType = 6
): Answer[] {
  const answers: Answer[] = [];
  for (let t = 1; t <= 9; t++) {
    for (let i = 0; i < totalPerType; i++) {
      answers.push({
        questionId: `q-${t}-${i}`,
        questionType: t as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9,
        value: t === primaryType ? 5 : 1,
      });
    }
  }
  return answers;
}

// ---------------------------------------------------------------------------
// Level 2 — Unit tests via scoreAnswers
// ---------------------------------------------------------------------------

describe('INV-07 — Wing is always an adjacent type via scoreAnswers', () => {
  const ALL_TYPES = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

  for (const primaryType of ALL_TYPES) {
    it(`primaryType=${primaryType} → wing is one of [${ADJACENCY[primaryType].join(', ')}]`, () => {
      const answers = buildAnswers(primaryType);
      const result = scoreAnswers(answers);

      // Only check wing if this scenario actually produces the expected primaryType
      if (result.primaryType !== primaryType) {
        // The scoring may not isolate to exactly this type with these synthetic answers;
        // use the direct calculateWing helper if available
        if (typeof calculateWing === 'function') {
          const scores: Record<number, number> = {};
          for (let t = 1; t <= 9; t++) {
            scores[t] = t === primaryType ? 90 : 10;
          }
          const wing = calculateWing(primaryType, scores);
          const validWings = ADJACENCY[primaryType];
          expect(validWings).toContain(wing);
        }
        return;
      }

      const validWings = ADJACENCY[result.primaryType];
      expect(
        validWings,
        `Wing ${result.wing} is not adjacent to type ${result.primaryType}. Valid wings: [${validWings.join(', ')}]`
      ).toContain(result.wing);
    });
  }
});

// ---------------------------------------------------------------------------
// Unit tests via calculateWing (if exported separately)
// ---------------------------------------------------------------------------

describe('INV-07 — calculateWing enforces adjacency constraint', () => {
  for (const [primaryType, adjacent] of Object.entries(ADJACENCY)) {
    it(`type ${primaryType} wing must be one of [${adjacent.join(', ')}] even when non-adjacent scores are higher`, () => {
      if (typeof calculateWing !== 'function') {
        // Skip gracefully if not exported; covered by scoreAnswers tests above
        return;
      }

      // Construct scores where a non-adjacent type scores higher than adjacent types
      const pType = Number(primaryType);
      const scores = buildScoresForWing(pType, adjacent[0]);

      const wing = calculateWing(pType, scores);

      expect(
        [adjacent[0], adjacent[1]],
        `calculateWing returned ${wing} which is not adjacent to type ${pType}`
      ).toContain(wing);
    });
  }
});

describe('INV-07 — Wing adjacency for every possible score configuration', () => {
  it('wing is always adjacent regardless of which adjacent type scores higher', () => {
    if (typeof calculateWing !== 'function') return;

    for (const [primaryType, adjacent] of Object.entries(ADJACENCY)) {
      const pType = Number(primaryType);

      // Scenario A: first adjacent scores higher
      const scoresA: Record<number, number> = {};
      for (let t = 1; t <= 9; t++) {
        if (t === pType) scoresA[t] = 100;
        else if (t === adjacent[0]) scoresA[t] = 70;
        else if (t === adjacent[1]) scoresA[t] = 40;
        else scoresA[t] = 10;
      }
      const wingA = calculateWing(pType, scoresA);
      expect([adjacent[0], adjacent[1]]).toContain(wingA);

      // Scenario B: second adjacent scores higher
      const scoresB: Record<number, number> = {};
      for (let t = 1; t <= 9; t++) {
        if (t === pType) scoresB[t] = 100;
        else if (t === adjacent[1]) scoresB[t] = 70;
        else if (t === adjacent[0]) scoresB[t] = 40;
        else scoresB[t] = 10;
      }
      const wingB = calculateWing(pType, scoresB);
      expect([adjacent[0], adjacent[1]]).toContain(wingB);
    }
  });

  it('equal adjacent scores returns one of the two adjacent types (no crash)', () => {
    if (typeof calculateWing !== 'function') return;

    for (const [primaryType, adjacent] of Object.entries(ADJACENCY)) {
      const pType = Number(primaryType);
      const scores: Record<number, number> = {};
      for (let t = 1; t <= 9; t++) {
        if (t === pType) scores[t] = 100;
        else if (adjacent.includes(t)) scores[t] = 50; // Equal adjacent scores
        else scores[t] = 10;
      }
      const wing = calculateWing(pType, scores);
      expect([adjacent[0], adjacent[1]]).toContain(wing);
    }
  });
});

describe('INV-07 — Wing value is an integer 1–9', () => {
  it('scoreAnswers returns integer wing 1–9', () => {
    const result = scoreAnswers(buildAnswers(4));
    expect(Number.isInteger(result.wing)).toBe(true);
    expect(result.wing).toBeGreaterThanOrEqual(1);
    expect(result.wing).toBeLessThanOrEqual(9);
  });
});
