/**
 * MBTI scoring algorithm.
 *
 * Exports:
 *   scoreMbti(answers) → MbtiScoreOutput
 *   FUNCTION_STACKS — cognitive function stacks per type
 *   FUNCTION_LABELS — bilingual labels per cognitive function
 *   getTypeGroup(type) → MbtiTypeGroup
 */

import type {
  MbtiAnswer,
  MbtiDichotomy,
  MbtiPole,
  MbtiType,
  MbtiTypeGroup,
  DichotomyPreference,
  CognitiveFunction,
  CognitiveFunctionName,
  CognitiveFunctionRole,
} from '../../types/mbti';

// ---------------------------------------------------------------------------
// Pole definitions for each dichotomy
// ---------------------------------------------------------------------------

/** First pole (A) and second pole (B) for each dichotomy */
const DICHOTOMY_POLES: Record<MbtiDichotomy, [MbtiPole, MbtiPole]> = {
  EI: ['E', 'I'],
  SN: ['S', 'N'],
  TF: ['T', 'F'],
  JP: ['J', 'P'],
};

// ---------------------------------------------------------------------------
// Cognitive function stacks
// ---------------------------------------------------------------------------

export const FUNCTION_STACKS: Record<MbtiType, CognitiveFunctionName[]> = {
  INFP: ['Fi', 'Ne', 'Si', 'Te'],
  ENFP: ['Ne', 'Fi', 'Te', 'Si'],
  INFJ: ['Ni', 'Fe', 'Ti', 'Se'],
  ENFJ: ['Fe', 'Ni', 'Se', 'Ti'],
  INTP: ['Ti', 'Ne', 'Si', 'Fe'],
  ENTP: ['Ne', 'Ti', 'Fe', 'Si'],
  INTJ: ['Ni', 'Te', 'Fi', 'Se'],
  ENTJ: ['Te', 'Ni', 'Se', 'Fi'],
  ISFP: ['Fi', 'Se', 'Ni', 'Te'],
  ESFP: ['Se', 'Fi', 'Te', 'Ni'],
  ISFJ: ['Si', 'Fe', 'Ti', 'Ne'],
  ESFJ: ['Fe', 'Si', 'Ne', 'Ti'],
  ISTP: ['Ti', 'Se', 'Ni', 'Fe'],
  ESTP: ['Se', 'Ti', 'Fe', 'Ni'],
  ISTJ: ['Si', 'Te', 'Fi', 'Ne'],
  ESTJ: ['Te', 'Si', 'Ne', 'Fi'],
};

// ---------------------------------------------------------------------------
// Cognitive function labels
// ---------------------------------------------------------------------------

export const FUNCTION_LABELS: Record<CognitiveFunctionName, { en: string; zh: string }> = {
  Fi: { en: 'Introverted Feeling', zh: '内倾情感' },
  Fe: { en: 'Extraverted Feeling', zh: '外倾情感' },
  Ti: { en: 'Introverted Thinking', zh: '内倾思维' },
  Te: { en: 'Extraverted Thinking', zh: '外倾思维' },
  Si: { en: 'Introverted Sensing', zh: '内倾感觉' },
  Se: { en: 'Extraverted Sensing', zh: '外倾感觉' },
  Ni: { en: 'Introverted Intuition', zh: '内倾直觉' },
  Ne: { en: 'Extraverted Intuition', zh: '外倾直觉' },
};

// ---------------------------------------------------------------------------
// Cognitive function role descriptions (brief)
// ---------------------------------------------------------------------------

const FUNCTION_DESCRIPTIONS: Record<CognitiveFunctionName, { en: string; zh: string }> = {
  Fi: {
    en: 'Evaluates decisions based on internal values and authentic feelings.',
    zh: '根据内心价值观和真实感受做出判断。',
  },
  Fe: {
    en: 'Attunes to others\' emotions and seeks harmony in the social environment.',
    zh: '感知他人情绪，致力于维护社会和谐。',
  },
  Ti: {
    en: 'Builds precise internal frameworks and seeks logical consistency.',
    zh: '构建精确的内部逻辑体系，追求一致性。',
  },
  Te: {
    en: 'Organizes the external world efficiently using objective criteria.',
    zh: '以客观标准高效组织外部世界。',
  },
  Si: {
    en: 'Relies on past experience and detailed memory to navigate the present.',
    zh: '依赖过往经验和细节记忆来应对当下。',
  },
  Se: {
    en: 'Engages fully with the present sensory environment and immediate experience.',
    zh: '全身心投入当下的感官体验和即时环境。',
  },
  Ni: {
    en: 'Synthesizes information into deep insights and future-oriented visions.',
    zh: '将信息整合为深刻洞见和面向未来的愿景。',
  },
  Ne: {
    en: 'Explores patterns and possibilities across many ideas and connections.',
    zh: '探索众多想法与联系中的规律和可能性。',
  },
};

// ---------------------------------------------------------------------------
// Type group lookup
// ---------------------------------------------------------------------------

export function getTypeGroup(type: MbtiType): MbtiTypeGroup {
  const sn = type[1]; // S or N
  const tf = type[2]; // T or F
  const jp = type[3]; // J or P

  if (sn === 'N' && tf === 'T') return 'analyst';   // xNTx
  if (sn === 'N' && tf === 'F') return 'diplomat';  // xNFx
  if (sn === 'S' && jp === 'J') return 'sentinel';  // xSxJ
  return 'explorer';                                  // xSxP
}

// ---------------------------------------------------------------------------
// Strength classification helper
// ---------------------------------------------------------------------------

function classifyStrength(diff: number): DichotomyPreference['strength'] {
  if (diff < 10) return 'slight';
  if (diff < 25) return 'moderate';
  if (diff < 40) return 'clear';
  return 'strong';
}

// ---------------------------------------------------------------------------
// DichotomyResult shape expected by INV-04 test
// ---------------------------------------------------------------------------

export interface DichotomyResult {
  firstPole: MbtiPole;
  secondPole: MbtiPole;
  firstPct: number;
  secondPct: number;
  dominant: MbtiPole;
  /** Alias for percentA — kept for app compatibility */
  percentA: number;
  /** Alias for percentB — kept for app compatibility */
  percentB: number;
  /** The winning pole — same as dominant */
  preference: MbtiPole;
  strength: DichotomyPreference['strength'];
  dichotomy: MbtiDichotomy;
  poleA: MbtiPole;
  poleB: MbtiPole;
}

// ---------------------------------------------------------------------------
// MbtiScoreOutput — what scoreMbti returns
// This extends the app's MbtiScoreResult shape but uses dichotomies Record
// instead of (or in addition to) the preferences array.
// ---------------------------------------------------------------------------

export interface MbtiScoreOutput {
  type: MbtiType;
  typeGroup: MbtiTypeGroup;
  /** Keyed by dichotomy — used by INV-04 tests and the results UI */
  dichotomies: Record<MbtiDichotomy, DichotomyResult>;
  /** Array form of the same data — kept for backward compat with app */
  preferences: DichotomyPreference[];
  cognitiveStack: CognitiveFunction[];
}

// ---------------------------------------------------------------------------
// Public export: scoreMbti
// ---------------------------------------------------------------------------

/**
 * Score an array of MbtiAnswers and produce an MbtiScoreOutput.
 *
 * Algorithm per dichotomy:
 *   1. Clamp each answer value to [1, 5].
 *   2. Ignore answers with invalid dichotomy or pole.
 *   3. Sum values for questions whose pole is poleA (E/S/T/J) → rawA.
 *   4. Sum values for questions whose pole is poleB (I/N/F/P) → rawB.
 *   5. firstPct = rawA / (rawA + rawB) * 100 (or 50 when total = 0).
 *   6. secondPct = 100 - firstPct.
 *   7. Winner = poleA when firstPct >= secondPct (ties default to poleA per spec).
 *   8. Strength = classified by abs(firstPct - secondPct).
 */
export function scoreMbti(answers: MbtiAnswer[]): MbtiScoreOutput {
  const dichotomyOrder: MbtiDichotomy[] = ['EI', 'SN', 'TF', 'JP'];

  const dichotomies = {} as Record<MbtiDichotomy, DichotomyResult>;
  const preferences: DichotomyPreference[] = [];
  let typeStr = '';

  for (const d of dichotomyOrder) {
    const [poleA, poleB] = DICHOTOMY_POLES[d];

    let rawA = 0;
    let rawB = 0;

    for (const answer of answers) {
      // Skip answers with a different dichotomy
      if (answer.dichotomy !== d) continue;

      // Clamp value to valid Likert range [1, 5]
      const value = Math.max(1, Math.min(5, answer.value));

      if (answer.pole === poleA) {
        rawA += value;
      } else if (answer.pole === poleB) {
        rawB += value;
      }
      // Answers with invalid pole are ignored
    }

    const total = rawA + rawB;
    // When no answers for this dichotomy, default 50/50 → tiebreak to poleA
    const firstPct = total === 0 ? 50 : (rawA / total) * 100;
    const secondPct = 100 - firstPct;

    // Tiebreak: firstPct >= secondPct means poleA wins
    const dominant: MbtiPole = firstPct >= secondPct ? poleA : poleB;
    const strength = classifyStrength(Math.abs(firstPct - secondPct));

    const result: DichotomyResult = {
      firstPole: poleA,
      secondPole: poleB,
      firstPct,
      secondPct,
      dominant,
      percentA: firstPct,
      percentB: secondPct,
      preference: dominant,
      strength,
      dichotomy: d,
      poleA,
      poleB,
    };

    dichotomies[d] = result;

    preferences.push({
      dichotomy: d,
      poleA,
      poleB,
      percentA: firstPct,
      percentB: secondPct,
      preference: dominant,
      strength,
    });

    typeStr += dominant;
  }

  const type = typeStr as MbtiType;

  // Build cognitive function stack
  const functionNames = FUNCTION_STACKS[type];
  const roles: CognitiveFunctionRole[] = ['dominant', 'auxiliary', 'tertiary', 'inferior'];
  const cognitiveStack: CognitiveFunction[] = functionNames.map((name, idx) => ({
    name,
    role: roles[idx],
    label: FUNCTION_LABELS[name],
    description: FUNCTION_DESCRIPTIONS[name],
  }));

  return {
    type,
    typeGroup: getTypeGroup(type),
    dichotomies,
    preferences,
    cognitiveStack,
  };
}
