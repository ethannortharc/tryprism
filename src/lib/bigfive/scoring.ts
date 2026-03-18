/**
 * Big Five (OCEAN) scoring algorithm.
 *
 * Exports:
 *   scoreBigFive(answers, questions, mode) → BigFiveScoreResult
 *   getBand(percentage) → BigFiveBand
 */

import type {
  BigFiveFactor,
  BigFiveFacet,
  BigFiveBand,
  BigFiveQuestion,
  BigFiveFactorScore,
  BigFiveFacetScore,
  BigFiveScoreResult,
} from '../../types/bigfive';

// ---------------------------------------------------------------------------
// Band helper
// ---------------------------------------------------------------------------

/**
 * Assign a descriptive band to a 0–100 percentage score.
 *   ≤35  → 'low'
 *   36–65 → 'average'
 *   ≥66  → 'high'
 */
export function getBand(percentage: number): BigFiveBand {
  if (percentage <= 35) return 'low';
  if (percentage >= 66) return 'high';
  return 'average';
}

// ---------------------------------------------------------------------------
// Percentage normalization helpers
// ---------------------------------------------------------------------------

/**
 * Normalize a raw sum to 0–100 given the item count.
 * Each item is scored 1–5, so min = itemCount * 1, max = itemCount * 5.
 * percentage = (raw - min) / (max - min) * 100
 */
function normalizeScore(raw: number, itemCount: number): number {
  const min = itemCount * 1;
  const max = itemCount * 5;
  const range = max - min;
  if (range === 0) return 50;
  const pct = ((raw - min) / range) * 100;
  // Clamp to [0, 100]
  return Math.max(0, Math.min(100, pct));
}

// ---------------------------------------------------------------------------
// Public export: scoreBigFive
// ---------------------------------------------------------------------------

/**
 * Score a set of Big Five answers and produce a BigFiveScoreResult.
 *
 * Note: signature is (answers, questions, mode) to match the test contract.
 *
 * Algorithm:
 * 1. For each question, look up the raw answer (1–5, clamp to range).
 * 2. Apply scoring key: if key === '-', scored = 6 - raw; if key === '+', scored = raw.
 * 3. Accumulate scored values per factor.
 * 4. Compute factor percentage using item-count-based normalization.
 * 5. Assign band based on percentage thresholds.
 * 6. In full mode, also accumulate and score per-facet.
 */
export function scoreBigFive(
  answers: Record<string, number>,
  questions: BigFiveQuestion[],
  mode: 'quick' | 'full' = 'quick',
): BigFiveScoreResult {
  const allFactors: BigFiveFactor[] = ['O', 'C', 'E', 'A', 'N'];

  // Accumulators: factor → { sum, count }
  const factorAccum: Record<string, { sum: number; count: number }> = {};
  for (const f of allFactors) {
    factorAccum[f] = { sum: 0, count: 0 };
  }

  // Accumulators: facet → { sum, count }  (used in full mode)
  const facetAccum: Record<string, { sum: number; count: number }> = {};

  for (const question of questions) {
    const raw = answers[question.id];
    // Skip unanswered questions
    if (raw === undefined || raw === null) continue;

    // Clamp to [1, 5]
    const clamped = Math.max(1, Math.min(5, raw));

    // Apply scoring key
    const scored = question.key === '-' ? 6 - clamped : clamped;

    // Accumulate by factor
    const fa = factorAccum[question.factor];
    if (fa) {
      fa.sum += scored;
      fa.count += 1;
    }

    // Accumulate by facet (when present)
    if (question.facet !== undefined) {
      const facetKey = question.facet;
      if (!facetAccum[facetKey]) {
        facetAccum[facetKey] = { sum: 0, count: 0 };
      }
      facetAccum[facetKey].sum += scored;
      facetAccum[facetKey].count += 1;
    }
  }

  // Build factor scores
  const factors = {} as Record<BigFiveFactor, BigFiveFactorScore>;
  for (const f of allFactors) {
    const acc = factorAccum[f];
    const itemCount = acc.count;

    // Handle edge case: no questions for this factor
    if (itemCount === 0) {
      factors[f] = { raw: 0, max: 0, percentage: 50, band: 'average' };
      continue;
    }

    const percentage = normalizeScore(acc.sum, itemCount);
    const max = itemCount * 5;
    factors[f] = {
      raw: acc.sum,
      max,
      percentage,
      band: getBand(percentage),
    };
  }

  // Build facet scores (full mode only)
  if (mode === 'full') {
    const facets = {} as Record<BigFiveFacet, BigFiveFacetScore>;
    for (const [facetKey, acc] of Object.entries(facetAccum)) {
      const itemCount = acc.count;
      if (itemCount === 0) {
        facets[facetKey as BigFiveFacet] = {
          facet: facetKey as BigFiveFacet,
          raw: 0,
          max: 0,
          percentage: 50,
          band: 'average',
        };
        continue;
      }
      const percentage = normalizeScore(acc.sum, itemCount);
      const max = itemCount * 5;
      facets[facetKey as BigFiveFacet] = {
        facet: facetKey as BigFiveFacet,
        raw: acc.sum,
        max,
        percentage,
        band: getBand(percentage),
      };
    }
    return { factors, facets, mode };
  }

  return { factors, mode };
}
