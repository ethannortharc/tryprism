/**
 * INV-02: 96 MBTI questions exist with bilingual text, 24 per dichotomy (E/I, S/N, T/F, J/P)
 *
 * Verifier: auto (Vitest)
 * Claim: The MBTI question bank contains exactly 96 questions — 24 per dichotomy,
 *        bilingual EN/ZH text, valid pole assignments, no duplicates, quick/full mode tags.
 *
 * These tests FAIL until the MBTI implementation exists.
 *
 * Expected module: src/data/mbti/questions.ts
 * Expected exports: `mbtiQuestions` (named) or default array
 */

import { describe, it, expect, beforeAll } from 'vitest';

// ---------------------------------------------------------------------------
// Expected interface — defines the contract the implementation must satisfy
// ---------------------------------------------------------------------------

type MbtiDichotomy = 'EI' | 'SN' | 'TF' | 'JP';
type MbtiPole = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';
type MbtiMode = 'both' | 'full';

interface MbtiQuestion {
  id: string;
  dichotomy: MbtiDichotomy;
  pole: MbtiPole;
  mode: MbtiMode;
  text: {
    en: string;
    zh: string;
  };
}

const DICHOTOMIES: MbtiDichotomy[] = ['EI', 'SN', 'TF', 'JP'];
const VALID_POLES: MbtiPole[] = ['E', 'I', 'S', 'N', 'T', 'F', 'J', 'P'];
const POLE_MAP: Record<MbtiDichotomy, [MbtiPole, MbtiPole]> = {
  EI: ['E', 'I'],
  SN: ['S', 'N'],
  TF: ['T', 'F'],
  JP: ['J', 'P'],
};

const TOTAL_QUESTIONS = 96;
const PER_DICHOTOMY = 24;
const QUICK_TOTAL = 48;
const QUICK_PER_DICHOTOMY = 12;
const FULL_ONLY_TOTAL = 48;
const FULL_ONLY_PER_DICHOTOMY = 12;

// ---------------------------------------------------------------------------
// Load module dynamically — fails until implementation exists
// ---------------------------------------------------------------------------

let allQuestions: MbtiQuestion[];
let quickQuestions: MbtiQuestion[];
let fullOnlyQuestions: MbtiQuestion[];

beforeAll(async () => {
  const mod = await import('../../src/data/mbti/questions');
  allQuestions = mod.mbtiQuestions ?? mod.questions ?? mod.default;
  if (!Array.isArray(allQuestions)) {
    throw new Error(
      'src/data/mbti/questions must export an array as `mbtiQuestions`, `questions`, or default'
    );
  }
  quickQuestions = allQuestions.filter((q) => q.mode === 'both');
  fullOnlyQuestions = allQuestions.filter((q) => q.mode === 'full');
});

// ---------------------------------------------------------------------------
// Total count
// ---------------------------------------------------------------------------

describe('INV-02 — Total question count', () => {
  it(`question bank contains exactly ${TOTAL_QUESTIONS} questions`, () => {
    expect(allQuestions.length).toBe(TOTAL_QUESTIONS);
  });
});

// ---------------------------------------------------------------------------
// Per-dichotomy counts
// ---------------------------------------------------------------------------

describe('INV-02 — Dichotomy distribution (24 per dichotomy)', () => {
  for (const d of DICHOTOMIES) {
    it(`dichotomy ${d} has exactly ${PER_DICHOTOMY} questions`, () => {
      const count = allQuestions.filter((q) => q.dichotomy === d).length;
      expect(count, `Expected ${PER_DICHOTOMY} questions for ${d}, got ${count}`).toBe(
        PER_DICHOTOMY
      );
    });
  }
});

// ---------------------------------------------------------------------------
// Quick mode (mode: 'both') counts — 48 total, 12 per dichotomy
// ---------------------------------------------------------------------------

describe('INV-02 — Quick mode questions (mode=both)', () => {
  it(`quick mode contains exactly ${QUICK_TOTAL} questions total`, () => {
    expect(quickQuestions.length).toBe(QUICK_TOTAL);
  });

  for (const d of DICHOTOMIES) {
    it(`quick mode has exactly ${QUICK_PER_DICHOTOMY} questions for dichotomy ${d}`, () => {
      const count = quickQuestions.filter((q) => q.dichotomy === d).length;
      expect(count).toBe(QUICK_PER_DICHOTOMY);
    });
  }
});

// ---------------------------------------------------------------------------
// Full-only mode (mode: 'full') counts — 48 total, 12 per dichotomy
// ---------------------------------------------------------------------------

describe('INV-02 — Full-only questions (mode=full)', () => {
  it(`full-only questions total exactly ${FULL_ONLY_TOTAL}`, () => {
    expect(fullOnlyQuestions.length).toBe(FULL_ONLY_TOTAL);
  });

  for (const d of DICHOTOMIES) {
    it(`full-only mode has exactly ${FULL_ONLY_PER_DICHOTOMY} questions for dichotomy ${d}`, () => {
      const count = fullOnlyQuestions.filter((q) => q.dichotomy === d).length;
      expect(count).toBe(FULL_ONLY_PER_DICHOTOMY);
    });
  }
});

// ---------------------------------------------------------------------------
// Bilingual completeness
// ---------------------------------------------------------------------------

describe('INV-02 — Bilingual completeness', () => {
  it('every question has a non-empty English text', () => {
    const missing = allQuestions.filter((q) => !q.text?.en || q.text.en.trim() === '');
    expect(
      missing,
      `Questions missing EN text: ${missing.map((q) => q.id).join(', ')}`
    ).toHaveLength(0);
  });

  it('every question has a non-empty Chinese text', () => {
    const missing = allQuestions.filter((q) => !q.text?.zh || q.text.zh.trim() === '');
    expect(
      missing,
      `Questions missing ZH text: ${missing.map((q) => q.id).join(', ')}`
    ).toHaveLength(0);
  });

  it('Chinese text contains Chinese characters (not just ASCII)', () => {
    const noChineseChars = allQuestions.filter(
      (q) => !/[\u4e00-\u9fff]/.test(q.text?.zh ?? '')
    );
    expect(
      noChineseChars,
      `Questions with no CJK characters in ZH text: ${noChineseChars.map((q) => q.id).join(', ')}`
    ).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// Valid dichotomy and pole assignments
// ---------------------------------------------------------------------------

describe('INV-02 — Valid dichotomy and pole values', () => {
  it('all questions have a valid dichotomy', () => {
    const invalid = allQuestions.filter((q) => !DICHOTOMIES.includes(q.dichotomy));
    expect(
      invalid,
      `Questions with invalid dichotomy: ${invalid.map((q) => `${q.id}:${q.dichotomy}`).join(', ')}`
    ).toHaveLength(0);
  });

  it('all questions have a valid pole', () => {
    const invalid = allQuestions.filter((q) => !VALID_POLES.includes(q.pole));
    expect(
      invalid,
      `Questions with invalid pole: ${invalid.map((q) => `${q.id}:${q.pole}`).join(', ')}`
    ).toHaveLength(0);
  });

  it('each question pole belongs to its dichotomy', () => {
    const mismatched = allQuestions.filter((q) => {
      const validPoles = POLE_MAP[q.dichotomy];
      return !validPoles || !validPoles.includes(q.pole);
    });
    expect(
      mismatched,
      `Questions with pole mismatched to dichotomy: ${mismatched
        .map((q) => `${q.id} (${q.dichotomy}/${q.pole})`)
        .join(', ')}`
    ).toHaveLength(0);
  });

  it('all mode values are either "both" or "full"', () => {
    const invalid = allQuestions.filter((q) => q.mode !== 'both' && q.mode !== 'full');
    expect(
      invalid,
      `Questions with invalid mode: ${invalid.map((q) => `${q.id}:${q.mode}`).join(', ')}`
    ).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// Uniqueness
// ---------------------------------------------------------------------------

describe('INV-02 — Question uniqueness', () => {
  it('all question IDs are unique', () => {
    const ids = allQuestions.map((q) => q.id);
    const unique = new Set(ids);
    expect(unique.size, 'Duplicate question IDs found').toBe(ids.length);
  });

  it('no duplicate English question text', () => {
    const texts = allQuestions.map((q) => q.text.en.trim().toLowerCase());
    const unique = new Set(texts);
    expect(unique.size, 'Duplicate EN question text found').toBe(texts.length);
  });

  it('no duplicate Chinese question text', () => {
    const texts = allQuestions.map((q) => q.text.zh.trim());
    const unique = new Set(texts);
    expect(unique.size, 'Duplicate ZH question text found').toBe(texts.length);
  });

  it('all question IDs are non-empty strings', () => {
    const empty = allQuestions.filter(
      (q) => typeof q.id !== 'string' || q.id.trim() === ''
    );
    expect(empty, 'Questions with empty/non-string IDs found').toHaveLength(0);
  });
});
