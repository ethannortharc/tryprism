/**
 * Core TypeScript types for the Enneagram personality test.
 */

/** Enneagram type number 1–9 */
export type EnneagramType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

/** A single answer from the user */
export interface Answer {
  questionId: string;
  /** Which Enneagram type this question measures */
  questionType: EnneagramType;
  /** Likert scale value: 1 (strongly disagree) to 5 (strongly agree) */
  value: number;
}

/** Result produced by the scoring algorithm */
export interface ScoreResult {
  /** Normalized percentage scores for each type 1–9 (sum ≈ 100) */
  scores: Record<number, number>;
  /** Primary Enneagram type (highest score), 1–9 */
  primaryType: number;
  /** Wing type (higher-scoring adjacent type on the circle), 1–9 */
  wing: number;
  /** True when top two normalized scores are within 10% of each other */
  lowConfidence: boolean;
  /** True when all 9 normalized scores are very similar (max - min < 5%) */
  flatProfile: boolean;
}

/** Localized text for a question */
export interface QuestionText {
  [languageCode: string]: string;
}

/** A single test question with optional weights for 1–2 types */
export interface Question {
  id: string;
  /** Primary type this question measures */
  type: EnneagramType;
  /**
   * Optional weights for this question's contribution to one or two types.
   * Key: type number (1–9), value: weight multiplier (default 1.0).
   */
  weights?: Partial<Record<EnneagramType, number>>;
  /** Question text indexed by language code (e.g. "en", "es") */
  text: QuestionText;
}
