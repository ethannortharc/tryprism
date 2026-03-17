/**
 * Core TypeScript types and interfaces for the MBTI personality test.
 */

// ---------------------------------------------------------------------------
// Dichotomies and poles
// ---------------------------------------------------------------------------

/** Four MBTI dichotomies */
export type MbtiDichotomy = 'EI' | 'SN' | 'TF' | 'JP';

/** Eight MBTI poles (one per side of each dichotomy) */
export type MbtiPole = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';

// ---------------------------------------------------------------------------
// The 16 MBTI types
// ---------------------------------------------------------------------------

export type MbtiType =
  | 'ISTJ' | 'ISFJ' | 'INFJ' | 'INTJ'
  | 'ISTP' | 'ISFP' | 'INFP' | 'INTP'
  | 'ESTP' | 'ESFP' | 'ENFP' | 'ENTP'
  | 'ESTJ' | 'ESFJ' | 'ENFJ' | 'ENTJ';

// ---------------------------------------------------------------------------
// Type groups
// ---------------------------------------------------------------------------

/** Four MBTI type groups (based on NT/NF/SJ/SP temperament theory) */
export type MbtiTypeGroup = 'analyst' | 'diplomat' | 'sentinel' | 'explorer';

// ---------------------------------------------------------------------------
// Cognitive functions
// ---------------------------------------------------------------------------

/** Eight Jungian cognitive functions */
export type CognitiveFunctionName = 'Fi' | 'Fe' | 'Ti' | 'Te' | 'Si' | 'Se' | 'Ni' | 'Ne';

/** Position of a function in the four-function stack */
export type CognitiveFunctionRole = 'dominant' | 'auxiliary' | 'tertiary' | 'inferior';

export interface CognitiveFunction {
  name: CognitiveFunctionName;
  role: CognitiveFunctionRole;
  /** e.g. "Introverted Feeling" / "内倾情感" */
  label: { en: string; zh: string };
  description: { en: string; zh: string };
}

// ---------------------------------------------------------------------------
// Questions
// ---------------------------------------------------------------------------

export interface MbtiQuestion {
  id: string;
  dichotomy: MbtiDichotomy;
  /** Which pole this question measures (Strongly Agree → toward this pole) */
  pole: MbtiPole;
  /** 'both' = appears in quick + full mode; 'full' = full mode only */
  mode: 'both' | 'full';
  text: { en: string; zh: string };
}

// ---------------------------------------------------------------------------
// Answers
// ---------------------------------------------------------------------------

export interface MbtiAnswer {
  questionId: string;
  dichotomy: MbtiDichotomy;
  pole: MbtiPole;
  /** Likert scale value: 1 (strongly disagree) – 5 (strongly agree) */
  value: number;
}

// ---------------------------------------------------------------------------
// Scoring
// ---------------------------------------------------------------------------

/** Preference result for a single dichotomy */
export interface DichotomyPreference {
  dichotomy: MbtiDichotomy;
  /** First letter of the dichotomy (E, S, T, J) */
  poleA: MbtiPole;
  /** Second letter of the dichotomy (I, N, F, P) */
  poleB: MbtiPole;
  /** Percentage toward poleA (0–100) */
  percentA: number;
  /** Percentage toward poleB (0–100); always equals 100 - percentA */
  percentB: number;
  /** The winning pole */
  preference: MbtiPole;
  strength: 'slight' | 'moderate' | 'clear' | 'strong';
}

/** Full scoring result returned by the algorithm */
export interface MbtiScoreResult {
  type: MbtiType;
  typeGroup: MbtiTypeGroup;
  preferences: DichotomyPreference[];
  cognitiveStack: CognitiveFunction[];
}

// ---------------------------------------------------------------------------
// Type descriptions
// ---------------------------------------------------------------------------

export interface MbtiTypeDescription {
  type: MbtiType;
  typeGroup: MbtiTypeGroup;
  name: { en: string; zh: string };
  title: { en: string; zh: string };
  tagline: { en: string; zh: string };
  overview: { en: string; zh: string };
  cognitive_functions: CognitiveFunction[];
  strengths: { en: string[]; zh: string[] };
  weaknesses: { en: string[]; zh: string[] };
  growth_areas: {
    en: { title: string; description: string }[];
    zh: { title: string; description: string }[];
  };
  career_paths: { en: string[]; zh: string[] };
  communication_style: { en: string; zh: string };
}

// ---------------------------------------------------------------------------
// Storage
// ---------------------------------------------------------------------------

/** Stored MBTI result saved to localStorage */
export interface StoredMbtiResult extends MbtiScoreResult {
  id: string;
  testType: 'mbti';
  takenAt: string;
  mode: 'quick' | 'full';
}
