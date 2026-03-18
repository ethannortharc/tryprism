/**
 * Core TypeScript types for the Big Five (OCEAN) personality test.
 */

// ---------------------------------------------------------------------------
// Factor and facet identifiers
// ---------------------------------------------------------------------------

/** Five OCEAN factor identifiers */
export type BigFiveFactor = 'O' | 'C' | 'E' | 'A' | 'N';

/** 30 facet codes (6 per factor) */
export type BigFiveFacet =
  | 'N1' | 'N2' | 'N3' | 'N4' | 'N5' | 'N6'
  | 'E1' | 'E2' | 'E3' | 'E4' | 'E5' | 'E6'
  | 'O1' | 'O2' | 'O3' | 'O4' | 'O5' | 'O6'
  | 'A1' | 'A2' | 'A3' | 'A4' | 'A5' | 'A6'
  | 'C1' | 'C2' | 'C3' | 'C4' | 'C5' | 'C6';

/** Descriptive band for a factor or facet score */
export type BigFiveBand = 'low' | 'average' | 'high';

/** Scoring key: '+' = score as-is (1-5), '-' = reverse (6 - raw) */
export type ScoringKey = '+' | '-';

// ---------------------------------------------------------------------------
// Questions
// ---------------------------------------------------------------------------

/** A single question for either IPIP-50 or IPIP-NEO-120 */
export interface BigFiveQuestion {
  id: string;
  factor: BigFiveFactor;
  /** Undefined for IPIP-50 (factor-only), present for IPIP-NEO-120 (facet-level) */
  facet?: BigFiveFacet;
  key: ScoringKey;
  text: { en: string; zh: string };
}

// ---------------------------------------------------------------------------
// Scoring results
// ---------------------------------------------------------------------------

/** Score for a single factor */
export interface BigFiveFactorScore {
  raw: number;        // Sum of scored items
  max: number;        // Maximum possible raw score
  percentage: number; // 0-100
  band: BigFiveBand;  // low/average/high
}

/** Score for a single facet */
export interface BigFiveFacetScore {
  facet: BigFiveFacet;
  raw: number;
  max: number;
  percentage: number;
  band: BigFiveBand;
}

/** Full result from the scoring algorithm */
export interface BigFiveScoreResult {
  factors: Record<BigFiveFactor, BigFiveFactorScore>;
  /** Only present for full (IPIP-NEO-120) mode */
  facets?: Record<BigFiveFacet, BigFiveFacetScore>;
  mode: 'quick' | 'full';
}

// ---------------------------------------------------------------------------
// Storage
// ---------------------------------------------------------------------------

/** Stored result saved to localStorage (extends score result with metadata) */
export interface StoredBigFiveResult extends BigFiveScoreResult {
  id: string;
  takenAt: string; // ISO timestamp
}
