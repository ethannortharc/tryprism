/**
 * BF-06: Big Five Result Storage (INV-08)
 *
 * Verifier: auto (Vitest)
 * Claim: saveBigFiveResult saves results to localStorage under 'tryprism_bigfive_results',
 *        getBigFiveResults returns the saved array sorted by date (most recent first),
 *        and the result shape is preserved through a full save/load cycle.
 *
 * These tests FAIL until storage.ts is extended with saveBigFiveResult/getBigFiveResults.
 *
 * Expected module: src/lib/storage.ts
 * Expected exports: `saveBigFiveResult`, `getBigFiveResults`
 */

import { describe, it, expect, beforeEach, beforeAll } from 'vitest';

// ---------------------------------------------------------------------------
// Expected types
// ---------------------------------------------------------------------------

type BigFiveFactor = 'O' | 'C' | 'E' | 'A' | 'N';
type Band = 'low' | 'average' | 'high';

interface FactorScore {
  raw: number;
  percentage: number;
  band: Band;
}

interface BigFiveResult {
  id: string;
  takenAt: string;
  mode: 'quick' | 'full';
  factors: Record<BigFiveFactor, FactorScore>;
  facets?: Record<string, FactorScore>;
}

type SaveBigFiveResultFn = (result: BigFiveResult) => void;
type GetBigFiveResultsFn = () => BigFiveResult[];

// ---------------------------------------------------------------------------
// Load storage module — fails until implementation exists
// ---------------------------------------------------------------------------

let saveBigFiveResult: SaveBigFiveResultFn;
let getBigFiveResults: GetBigFiveResultsFn;

const BF_STORAGE_KEY = 'tryprism_bigfive_results';

beforeAll(async () => {
  const mod = await import('../../src/lib/storage');
  saveBigFiveResult = (mod as unknown as Record<string, unknown>).saveBigFiveResult as SaveBigFiveResultFn;
  getBigFiveResults = (mod as unknown as Record<string, unknown>).getBigFiveResults as GetBigFiveResultsFn;

  if (typeof saveBigFiveResult !== 'function') {
    throw new Error('src/lib/storage must export `saveBigFiveResult` function');
  }
  if (typeof getBigFiveResults !== 'function') {
    throw new Error('src/lib/storage must export `getBigFiveResults` function');
  }
});

// ---------------------------------------------------------------------------
// Mock localStorage with vitest's jsdom environment
// ---------------------------------------------------------------------------

beforeEach(() => {
  localStorage.clear();
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeFactorScore(pct: number): FactorScore {
  return {
    raw: Math.round(pct * 0.5),
    percentage: pct,
    band: pct <= 35 ? 'low' : pct <= 65 ? 'average' : 'high',
  };
}

function makeBigFiveResult(overrides: Partial<BigFiveResult> = {}): BigFiveResult {
  return {
    id: `bf-test-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    takenAt: new Date().toISOString(),
    mode: 'quick',
    factors: {
      O: makeFactorScore(60),
      C: makeFactorScore(45),
      E: makeFactorScore(70),
      A: makeFactorScore(55),
      N: makeFactorScore(30),
    },
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Save and storage key
// ---------------------------------------------------------------------------

describe('BF-06 — saveBigFiveResult stores under correct localStorage key', () => {
  it(`saves to localStorage key "${BF_STORAGE_KEY}"`, () => {
    const result = makeBigFiveResult();
    saveBigFiveResult(result);

    const raw = localStorage.getItem(BF_STORAGE_KEY);
    expect(raw, `Expected data at localStorage key "${BF_STORAGE_KEY}"`).not.toBeNull();
  });

  it('stored value is valid JSON containing an array', () => {
    const result = makeBigFiveResult();
    saveBigFiveResult(result);

    const raw = localStorage.getItem(BF_STORAGE_KEY)!;
    let parsed: unknown;
    expect(() => { parsed = JSON.parse(raw); }).not.toThrow();
    expect(Array.isArray(parsed), 'Stored value is not an array').toBe(true);
  });
});

// ---------------------------------------------------------------------------
// getBigFiveResults — retrieval
// ---------------------------------------------------------------------------

describe('BF-06 — getBigFiveResults retrieves saved results', () => {
  it('returns empty array when nothing has been saved', () => {
    const results = getBigFiveResults();
    expect(Array.isArray(results)).toBe(true);
    expect(results).toHaveLength(0);
  });

  it('returns one result after saving one result', () => {
    const result = makeBigFiveResult();
    saveBigFiveResult(result);

    const results = getBigFiveResults();
    expect(results).toHaveLength(1);
  });

  it('returns multiple results after saving multiple results', () => {
    saveBigFiveResult(makeBigFiveResult({ id: 'bf-1' }));
    saveBigFiveResult(makeBigFiveResult({ id: 'bf-2' }));
    saveBigFiveResult(makeBigFiveResult({ id: 'bf-3' }));

    const results = getBigFiveResults();
    expect(results).toHaveLength(3);
  });
});

// ---------------------------------------------------------------------------
// Sort order — most recent first
// ---------------------------------------------------------------------------

describe('BF-06 — getBigFiveResults returns results sorted most recent first', () => {
  it('results are sorted by takenAt in descending order', () => {
    const older = makeBigFiveResult({
      id: 'bf-old',
      takenAt: new Date('2024-01-01T10:00:00Z').toISOString(),
    });
    const newer = makeBigFiveResult({
      id: 'bf-new',
      takenAt: new Date('2024-06-01T10:00:00Z').toISOString(),
    });

    saveBigFiveResult(older);
    saveBigFiveResult(newer);

    const results = getBigFiveResults();
    expect(results).toHaveLength(2);
    expect(results[0].id, 'Most recent result should be first').toBe('bf-new');
    expect(results[1].id, 'Older result should be second').toBe('bf-old');
  });
});

// ---------------------------------------------------------------------------
// Round-trip shape preservation
// ---------------------------------------------------------------------------

describe('BF-06 — Result shape preserved after save/load cycle', () => {
  it('id field is preserved', () => {
    const result = makeBigFiveResult({ id: 'bf-shape-test' });
    saveBigFiveResult(result);
    const [loaded] = getBigFiveResults();
    expect(loaded.id).toBe('bf-shape-test');
  });

  it('takenAt field is preserved', () => {
    const takenAt = new Date('2024-03-15T12:00:00Z').toISOString();
    const result = makeBigFiveResult({ takenAt });
    saveBigFiveResult(result);
    const [loaded] = getBigFiveResults();
    expect(loaded.takenAt).toBe(takenAt);
  });

  it('mode field is preserved', () => {
    const result = makeBigFiveResult({ mode: 'full' });
    saveBigFiveResult(result);
    const [loaded] = getBigFiveResults();
    expect(loaded.mode).toBe('full');
  });

  it('factors object is preserved with all 5 OCEAN keys', () => {
    const result = makeBigFiveResult();
    saveBigFiveResult(result);
    const [loaded] = getBigFiveResults();

    expect(loaded.factors).toBeDefined();
    expect(loaded.factors.O).toBeDefined();
    expect(loaded.factors.C).toBeDefined();
    expect(loaded.factors.E).toBeDefined();
    expect(loaded.factors.A).toBeDefined();
    expect(loaded.factors.N).toBeDefined();
  });

  it('factor percentage values are preserved', () => {
    const result = makeBigFiveResult();
    saveBigFiveResult(result);
    const [loaded] = getBigFiveResults();

    expect(loaded.factors.O.percentage).toBe(result.factors.O.percentage);
    expect(loaded.factors.E.percentage).toBe(result.factors.E.percentage);
    expect(loaded.factors.N.percentage).toBe(result.factors.N.percentage);
  });

  it('facets field is preserved when present (full mode)', () => {
    const facets: Record<string, FactorScore> = {
      O1: makeFactorScore(55),
      O2: makeFactorScore(62),
    };
    const result = makeBigFiveResult({ mode: 'full', facets });
    saveBigFiveResult(result);
    const [loaded] = getBigFiveResults();

    expect(loaded.facets).toBeDefined();
    expect(loaded.facets!.O1.percentage).toBe(55);
    expect(loaded.facets!.O2.percentage).toBe(62);
  });
});

// ---------------------------------------------------------------------------
// localStorage mock robustness
// ---------------------------------------------------------------------------

describe('BF-06 — Storage handles corrupted localStorage gracefully', () => {
  it('getBigFiveResults returns empty array when localStorage has malformed JSON', () => {
    localStorage.setItem(BF_STORAGE_KEY, 'not-valid-json{{{');
    const results = getBigFiveResults();
    expect(Array.isArray(results)).toBe(true);
    expect(results).toHaveLength(0);
  });

  it('getBigFiveResults returns empty array when localStorage has non-array JSON', () => {
    localStorage.setItem(BF_STORAGE_KEY, JSON.stringify({ notAnArray: true }));
    const results = getBigFiveResults();
    expect(Array.isArray(results)).toBe(true);
    expect(results).toHaveLength(0);
  });
});
