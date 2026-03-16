/**
 * INV-11: All UI strings exist in both zh and en locale files with no missing keys
 *
 * Verifier: auto (Vitest)
 * Claim: The en and zh locale key sets are identical (bidirectional), no empty values,
 *        and every question in the bank has both zh and en text.
 *
 * These tests FAIL until the implementation exists.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import * as path from 'node:path';

// The implementation must provide locale files in one of these locations.
// Adjust the import paths once the project structure is established.
const WORKSPACE_ROOT = path.resolve(__dirname, '../../../../');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Recursively flatten nested locale object into dot-separated keys. */
function flattenKeys(obj: Record<string, unknown>, prefix = ''): string[] {
  const keys: string[] = [];
  for (const [k, v] of Object.entries(obj)) {
    const full = prefix ? `${prefix}.${k}` : k;
    if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
      keys.push(...flattenKeys(v as Record<string, unknown>, full));
    } else {
      keys.push(full);
    }
  }
  return keys;
}

/** Recursively collect all leaf values as strings. */
function flattenValues(obj: Record<string, unknown>, prefix = ''): Array<{ key: string; value: unknown }> {
  const entries: Array<{ key: string; value: unknown }> = [];
  for (const [k, v] of Object.entries(obj)) {
    const full = prefix ? `${prefix}.${k}` : k;
    if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
      entries.push(...flattenValues(v as Record<string, unknown>, full));
    } else {
      entries.push({ key: full, value: v });
    }
  }
  return entries;
}

// ---------------------------------------------------------------------------
// Load locale files
// ---------------------------------------------------------------------------

let enLocale: Record<string, unknown>;
let zhLocale: Record<string, unknown>;
let enKeys: string[];
let zhKeys: string[];

beforeAll(async () => {
  // Try standard i18n locations. The implementation should export or provide these.
  try {
    const enMod = await import('../../src/locales/en.json');
    enLocale = enMod.default ?? enMod;
  } catch {
    try {
      const enMod = await import('../../src/i18n/en.json');
      enLocale = enMod.default ?? enMod;
    } catch {
      throw new Error(
        'Could not import English locale file. Expected at src/locales/en.json or src/i18n/en.json'
      );
    }
  }

  try {
    const zhMod = await import('../../src/locales/zh.json');
    zhLocale = zhMod.default ?? zhMod;
  } catch {
    try {
      const zhMod = await import('../../src/i18n/zh.json');
      zhLocale = zhMod.default ?? zhMod;
    } catch {
      throw new Error(
        'Could not import Chinese locale file. Expected at src/locales/zh.json or src/i18n/zh.json'
      );
    }
  }

  enKeys = flattenKeys(enLocale).sort();
  zhKeys = flattenKeys(zhLocale).sort();
});

// ---------------------------------------------------------------------------
// Level 2 — Locale key parity tests
// ---------------------------------------------------------------------------

describe('INV-11 — Locale key sets are identical (en ↔ zh)', () => {
  it('en locale has at least one key', () => {
    expect(enKeys.length).toBeGreaterThan(0);
  });

  it('zh locale has at least one key', () => {
    expect(zhKeys.length).toBeGreaterThan(0);
  });

  it('en and zh have the same number of keys', () => {
    expect(zhKeys.length).toBe(enKeys.length);
  });

  it('every key in en exists in zh', () => {
    const zhSet = new Set(zhKeys);
    const missingFromZh = enKeys.filter((k) => !zhSet.has(k));
    expect(
      missingFromZh,
      `Keys in en but missing from zh:\n${missingFromZh.join('\n')}`
    ).toHaveLength(0);
  });

  it('every key in zh exists in en', () => {
    const enSet = new Set(enKeys);
    const missingFromEn = zhKeys.filter((k) => !enSet.has(k));
    expect(
      missingFromEn,
      `Keys in zh but missing from en:\n${missingFromEn.join('\n')}`
    ).toHaveLength(0);
  });
});

describe('INV-11 — No empty string values in either locale', () => {
  it('en locale has no empty string values', () => {
    const enValues = flattenValues(enLocale);
    const emptyInEn = enValues.filter(
      ({ value }) => typeof value === 'string' && value.trim() === ''
    );
    expect(
      emptyInEn.map(({ key }) => key),
      `Empty strings in en locale:\n${emptyInEn.map(({ key }) => key).join('\n')}`
    ).toHaveLength(0);
  });

  it('zh locale has no empty string values', () => {
    const zhValues = flattenValues(zhLocale);
    const emptyInZh = zhValues.filter(
      ({ value }) => typeof value === 'string' && value.trim() === ''
    );
    expect(
      emptyInZh.map(({ key }) => key),
      `Empty strings in zh locale:\n${emptyInZh.map(({ key }) => key).join('\n')}`
    ).toHaveLength(0);
  });
});

describe('INV-11 — Locale values are strings (not null or missing)', () => {
  it('all en values are non-null strings', () => {
    const enValues = flattenValues(enLocale);
    const nonStrings = enValues.filter(({ value }) => typeof value !== 'string');
    expect(nonStrings.map(({ key }) => key)).toHaveLength(0);
  });

  it('all zh values are non-null strings', () => {
    const zhValues = flattenValues(zhLocale);
    const nonStrings = zhValues.filter(({ value }) => typeof value !== 'string');
    expect(nonStrings.map(({ key }) => key)).toHaveLength(0);
  });
});

describe('INV-11 — zh locale contains Chinese characters', () => {
  it('at least 50% of zh string values contain Chinese characters', () => {
    const zhValues = flattenValues(zhLocale)
      .filter(({ value }) => typeof value === 'string') as Array<{ key: string; value: string }>;
    const withChinese = zhValues.filter(({ value }) => /[\u4e00-\u9fff]/.test(value));
    // Not every key will have Chinese (e.g., numeric codes, proper names), but most should
    expect(withChinese.length).toBeGreaterThan(zhValues.length * 0.5);
  });
});

// ---------------------------------------------------------------------------
// Level 2 — Question bank bilingual validation
// ---------------------------------------------------------------------------

describe('INV-11 — Question bank bilingual completeness', () => {
  let questions: Array<{ id: string; text: { en: string; zh: string } }>;

  beforeAll(async () => {
    const mod = await import('../../src/data/questions');
    questions = mod.questions ?? mod.default;
  });

  it('every question has a non-empty en text', () => {
    const missing = questions.filter(
      (q) => !q.text?.en || q.text.en.trim() === ''
    );
    expect(missing.map((q) => q.id)).toHaveLength(0);
  });

  it('every question has a non-empty zh text', () => {
    const missing = questions.filter(
      (q) => !q.text?.zh || q.text.zh.trim() === ''
    );
    expect(missing.map((q) => q.id)).toHaveLength(0);
  });

  it('question zh text contains Chinese characters', () => {
    const noChineseChars = questions.filter(
      (q) => q.text?.zh && !/[\u4e00-\u9fff]/.test(q.text.zh)
    );
    expect(noChineseChars.map((q) => q.id)).toHaveLength(0);
  });
});
