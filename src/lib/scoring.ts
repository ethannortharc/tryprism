/**
 * Enneagram scoring algorithm.
 *
 * Exports:
 *   scoreAnswers(answers) → ScoreResult
 *   calculateWing(primaryType, scores) → number
 */

import type { Answer, ScoreResult } from '../types/index';

// ---------------------------------------------------------------------------
// Adjacency map — defines valid wings for each primary type
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
// Growth and stress arrows (included in ScoreResult shape if needed later)
// ---------------------------------------------------------------------------
export const GROWTH_ARROWS: Record<number, number> = {
  1: 7, 2: 4, 3: 6, 4: 1, 5: 8, 6: 9, 7: 5, 8: 2, 9: 3,
};

export const STRESS_ARROWS: Record<number, number> = {
  1: 4, 2: 8, 3: 9, 4: 2, 5: 7, 6: 3, 7: 1, 8: 5, 9: 6,
};

// ---------------------------------------------------------------------------
// Centers of intelligence
// ---------------------------------------------------------------------------
export const CENTERS: Record<string, number[]> = {
  gut:  [8, 9, 1],
  heart: [2, 3, 4],
  head:  [5, 6, 7],
};

// ---------------------------------------------------------------------------
// Public helper: calculateWing
// ---------------------------------------------------------------------------

/**
 * Given a primary Enneagram type and a map of normalized scores, return
 * the wing — always one of the two adjacent types on the circle.
 *
 * The wing is whichever adjacent type has the higher score.
 * Non-adjacent types are never considered, regardless of their scores.
 */
export function calculateWing(
  primaryType: number,
  scores: Record<number, number>
): number {
  const [adjA, adjB] = ADJACENCY[primaryType];
  const scoreA = scores[adjA] ?? 0;
  const scoreB = scores[adjB] ?? 0;
  // Return the higher-scoring adjacent type; on a tie, prefer the first listed
  return scoreA >= scoreB ? adjA : adjB;
}

// ---------------------------------------------------------------------------
// Public export: scoreAnswers
// ---------------------------------------------------------------------------

/**
 * Score an array of Answers and produce a ScoreResult.
 *
 * Algorithm:
 * 1. Clamp each answer's Likert value to [1, 5].
 * 2. Accumulate raw scores: for each answer, add value to the type's bucket.
 * 3. Normalize to a percentage distribution (all 9 scores sum to 100).
 * 4. Primary type = type with highest normalized score.
 * 5. Wing = higher-scoring adjacent type (see calculateWing).
 * 6. lowConfidence = true when top two normalized scores are within 10 percentage
 *    points of each other.
 * 7. flatProfile = true when (max score - min score) < 5 percentage points.
 */
export function scoreAnswers(answers: Answer[]): ScoreResult {
  // Step 1 & 2: accumulate raw scores with clamping
  const raw: Record<number, number> = {};
  for (let t = 1; t <= 9; t++) {
    raw[t] = 0;
  }

  for (const answer of answers) {
    const type = answer.questionType;
    // Clamp value to valid Likert range [1, 5]
    const value = Math.max(1, Math.min(5, answer.value));
    raw[type] = (raw[type] ?? 0) + value;
  }

  // Step 3: normalize to percentage distribution
  const totalRaw = Object.values(raw).reduce((sum, v) => sum + v, 0);

  const scores: Record<number, number> = {};
  if (totalRaw === 0) {
    // Edge case: no answers or all zero — distribute equally
    for (let t = 1; t <= 9; t++) {
      scores[t] = 100 / 9;
    }
  } else {
    for (let t = 1; t <= 9; t++) {
      scores[t] = (raw[t] / totalRaw) * 100;
    }
  }

  // Step 4: primary type = highest score
  let primaryType = 1;
  let highestScore = scores[1];
  for (let t = 2; t <= 9; t++) {
    if (scores[t] > highestScore) {
      highestScore = scores[t];
      primaryType = t;
    }
  }

  // Step 5: wing (adjacent only)
  const wing = calculateWing(primaryType, scores);

  // Step 6: low confidence — top two within 10 percentage points
  const sortedScores = Object.values(scores).sort((a, b) => b - a);
  const lowConfidence = sortedScores[1] !== undefined
    ? (sortedScores[0] - sortedScores[1]) < 10
    : false;

  // Step 7: flat profile — max minus min < 5 percentage points
  const maxScore = sortedScores[0];
  const minScore = sortedScores[sortedScores.length - 1];
  const flatProfile = (maxScore - minScore) < 5;

  return {
    scores,
    primaryType,
    wing,
    lowConfidence,
    flatProfile,
  };
}
