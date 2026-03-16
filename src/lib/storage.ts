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
    // Filter out entries that don't look like valid StoredResult objects
    return parsed.filter((item): item is StoredResult => {
      return (
        item !== null &&
        typeof item === 'object' &&
        typeof (item as Record<string, unknown>).id === 'string' &&
        typeof (item as Record<string, unknown>).takenAt === 'string' &&
        typeof (item as Record<string, unknown>).primaryType === 'number'
      );
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
  // Sort by takenAt descending (most recent first)
  return results.slice().sort((a, b) =>
    new Date(b.takenAt).getTime() - new Date(a.takenAt).getTime()
  );
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
