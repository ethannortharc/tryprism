/**
 * localStorage persistence for TryPrism test results.
 *
 * Exports:
 *   saveResult(result)  → void
 *   getResults()        → StoredResult[]
 *   clearResults()      → void
 */

import type { ScoreResult } from '../types/index';

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
