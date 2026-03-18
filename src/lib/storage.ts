/**
 * localStorage persistence for TryPrism test results.
 *
 * Exports:
 *   saveResult(result)      → void
 *   getResults()            → StoredResult[]
 *   clearResults()          → void
 *   saveMbtiResult(result)  → void
 *   getMbtiResults()        → StoredMbtiResult[]
 */

import type { ScoreResult } from '../types/index';
import type { StoredMbtiResult } from '../types/mbti';
import type { StoredBigFiveResult } from '../types/bigfive';

export interface StoredResult extends ScoreResult {
  id: string;
  takenAt: string;       // ISO timestamp
  mode: 'quick' | 'full';
  completedAt?: string;  // alternative timestamp field from external sources
}

const STORAGE_KEY = 'tryprism_results';

/** Safely read and parse results from localStorage. Returns empty array on any error. */
function readFromStorage(): StoredResult[] {
  try {
    if (typeof localStorage === 'undefined') return [];
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Accept any entry with at least a valid primaryType number; fill in missing fields.
    return parsed
      .filter((item): boolean => {
        return (
          item !== null &&
          typeof item === 'object' &&
          typeof (item as Record<string, unknown>).primaryType === 'number'
        );
      })
      .map((item): StoredResult => {
        const obj = item as Record<string, unknown>;
        // Normalise to StoredResult, filling in missing fields gracefully
        const takenAt =
          typeof obj.takenAt === 'string' ? obj.takenAt :
          typeof obj.completedAt === 'string' ? obj.completedAt :
          new Date(0).toISOString();
        return {
          scores: (obj.scores ?? {}) as Record<number, number>,
          primaryType: obj.primaryType as number,
          wing: typeof obj.wing === 'number' ? obj.wing : 0,
          lowConfidence: typeof obj.lowConfidence === 'boolean' ? obj.lowConfidence : false,
          flatProfile: typeof obj.flatProfile === 'boolean' ? obj.flatProfile : false,
          id: typeof obj.id === 'string' ? obj.id : `imported-${String(takenAt)}`,
          takenAt,
          mode: (obj.mode === 'quick' || obj.mode === 'full') ? obj.mode : 'quick',
          completedAt: typeof obj.completedAt === 'string' ? obj.completedAt : undefined,
        };
      });
  } catch {
    // JSON parse error or localStorage unavailable — return empty
    return [];
  }
}

/** Saves a result to localStorage. Appends to existing results. */
export function saveResult(result: StoredResult): void {
  try {
    if (typeof localStorage === 'undefined') return;
    const existing = readFromStorage();
    existing.push(result);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch {
    // localStorage unavailable or quota exceeded — ignore
  }
}

/** Returns all saved results, most recent first. Returns empty array on any error. */
export function getResults(): StoredResult[] {
  const results = readFromStorage();
  // Sort by takenAt descending (most recent first); fall back to completedAt
  return results.slice().sort((a, b) => {
    const tA = new Date(a.completedAt ?? a.takenAt).getTime();
    const tB = new Date(b.completedAt ?? b.takenAt).getTime();
    return tB - tA;
  });
}

/** Clears all saved results from localStorage. */
export function clearResults(): void {
  try {
    if (typeof localStorage === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // localStorage unavailable — ignore
  }
}

// ---------------------------------------------------------------------------
// MBTI result storage
// ---------------------------------------------------------------------------

const MBTI_STORAGE_KEY = 'tryprism_mbti_results';

/** Safely read and parse MBTI results from localStorage. Returns empty array on any error. */
function readMbtiFromStorage(): StoredMbtiResult[] {
  try {
    if (typeof localStorage === 'undefined') return [];
    const raw = localStorage.getItem(MBTI_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is StoredMbtiResult =>
        item !== null &&
        typeof item === 'object' &&
        typeof (item as Record<string, unknown>).type === 'string'
    );
  } catch {
    return [];
  }
}

/** Saves an MBTI result to localStorage. Appends to existing results. */
export function saveMbtiResult(result: StoredMbtiResult): void {
  try {
    if (typeof localStorage === 'undefined') return;
    const existing = readMbtiFromStorage();
    existing.push(result);
    localStorage.setItem(MBTI_STORAGE_KEY, JSON.stringify(existing));
  } catch {
    // localStorage unavailable or quota exceeded — ignore
  }
}

/** Returns all saved MBTI results, most recent first. Returns empty array on any error. */
export function getMbtiResults(): StoredMbtiResult[] {
  const results = readMbtiFromStorage();
  return results.slice().sort((a, b) => {
    const tA = new Date(a.takenAt).getTime();
    const tB = new Date(b.takenAt).getTime();
    return tB - tA;
  });
}

// ---------------------------------------------------------------------------
// Big Five result storage
// ---------------------------------------------------------------------------

const BIGFIVE_STORAGE_KEY = 'tryprism_bigfive_results';

/** Safely read and parse Big Five results from localStorage. Returns empty array on any error. */
function readBigFiveFromStorage(): StoredBigFiveResult[] {
  try {
    if (typeof localStorage === 'undefined') return [];
    const raw = localStorage.getItem(BIGFIVE_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is StoredBigFiveResult =>
        item !== null &&
        typeof item === 'object' &&
        typeof (item as Record<string, unknown>).id === 'string' &&
        typeof (item as Record<string, unknown>).factors === 'object'
    );
  } catch {
    return [];
  }
}

/** Saves a Big Five result to localStorage. Appends to existing results. */
export function saveBigFiveResult(result: StoredBigFiveResult): void {
  try {
    if (typeof localStorage === 'undefined') return;
    const existing = readBigFiveFromStorage();
    existing.push(result);
    localStorage.setItem(BIGFIVE_STORAGE_KEY, JSON.stringify(existing));
  } catch {
    // localStorage unavailable or quota exceeded — ignore
  }
}

/** Returns all saved Big Five results, most recent first. Returns empty array on any error. */
export function getBigFiveResults(): StoredBigFiveResult[] {
  const results = readBigFiveFromStorage();
  return results.slice().sort((a, b) => {
    const tA = new Date(a.takenAt).getTime();
    const tB = new Date(b.takenAt).getTime();
    return tB - tA;
  });
}
