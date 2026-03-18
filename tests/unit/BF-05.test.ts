/**
 * BF-05: Big Five i18n Keys (INV-07)
 *
 * Verifier: auto (Vitest)
 * Claim: All Big Five-related i18n keys exist in both en.json and zh.json.
 *        Specifically: factor names, facet names, Likert scale labels,
 *        band labels (low/average/high), and general UI strings for bigfive pages.
 *
 * These tests FAIL until the locale files are updated with bigfive keys.
 *
 * Expected locale files: src/locales/en.json and src/locales/zh.json
 * Expected key namespace: bigfive.* (or similar nesting)
 */

import { describe, it, expect, beforeAll } from 'vitest';

// ---------------------------------------------------------------------------
// Helpers — reused from INV-11 pattern
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

/** Safely get a nested value by dot-separated key path. */
function getNestedValue(obj: Record<string, unknown>, keyPath: string): unknown {
  return keyPath.split('.').reduce<unknown>((acc, k) => {
    if (acc !== null && typeof acc === 'object') {
      return (acc as Record<string, unknown>)[k];
    }
    return undefined;
  }, obj);
}

// ---------------------------------------------------------------------------
// Constants — required Big Five locale key patterns
// ---------------------------------------------------------------------------

// Factor names that must exist in both locales
const REQUIRED_FACTOR_KEYS = [
  'openness',
  'conscientiousness',
  'extraversion',
  'agreeableness',
  'neuroticism',
];

// Facet codes (30 total): O1–O6, C1–C6, E1–E6, A1–A6, N1–N6
const FACET_CODES = ['O', 'C', 'E', 'A', 'N'].flatMap((factor) =>
  [1, 2, 3, 4, 5, 6].map((n) => `${factor}${n}`)
);

// Band labels that must exist
const REQUIRED_BAND_KEYS = ['low', 'average', 'high'];

// Likert label count (5-point scale)
const LIKERT_SCALE_POINTS = 5;

// ---------------------------------------------------------------------------
// Load locale files
// ---------------------------------------------------------------------------

let enLocale: Record<string, unknown>;
let zhLocale: Record<string, unknown>;
let enKeys: string[];
let zhKeys: string[];
let bigfiveEnKeys: string[];
let bigfiveZhKeys: string[];

beforeAll(async () => {
  try {
    const enMod = await import('../../src/locales/en.json');
    enLocale = enMod.default ?? (enMod as unknown as Record<string, unknown>);
  } catch {
    try {
      const enMod = await import('../../src/i18n/en.json');
      enLocale = enMod.default ?? (enMod as unknown as Record<string, unknown>);
    } catch {
      throw new Error('Could not import English locale file from src/locales/en.json or src/i18n/en.json');
    }
  }

  try {
    const zhMod = await import('../../src/locales/zh.json');
    zhLocale = zhMod.default ?? (zhMod as unknown as Record<string, unknown>);
  } catch {
    try {
      const zhMod = await import('../../src/i18n/zh.json');
      zhLocale = zhMod.default ?? (zhMod as unknown as Record<string, unknown>);
    } catch {
      throw new Error('Could not import Chinese locale file from src/locales/zh.json or src/i18n/zh.json');
    }
  }

  enKeys = flattenKeys(enLocale).sort();
  zhKeys = flattenKeys(zhLocale).sort();

  // Filter to bigfive-related keys (all keys under bigfive.* namespace)
  bigfiveEnKeys = enKeys.filter((k) => k.startsWith('bigfive'));
  bigfiveZhKeys = zhKeys.filter((k) => k.startsWith('bigfive'));
});

// ---------------------------------------------------------------------------
// Key symmetry — bigfive namespace
// ---------------------------------------------------------------------------

describe('BF-05 — Big Five locale key symmetry (en ↔ zh)', () => {
  it('en.json has at least 1 bigfive.* key', () => {
    expect(
      bigfiveEnKeys.length,
      'No bigfive.* keys found in en.json — locale not yet updated'
    ).toBeGreaterThan(0);
  });

  it('zh.json has at least 1 bigfive.* key', () => {
    expect(
      bigfiveZhKeys.length,
      'No bigfive.* keys found in zh.json — locale not yet updated'
    ).toBeGreaterThan(0);
  });

  it('every bigfive.* key in en.json also exists in zh.json', () => {
    const zhSet = new Set(zhKeys);
    const missingFromZh = bigfiveEnKeys.filter((k) => !zhSet.has(k));
    expect(
      missingFromZh,
      `Big Five keys in en.json but missing from zh.json:\n${missingFromZh.join('\n')}`
    ).toHaveLength(0);
  });

  it('every bigfive.* key in zh.json also exists in en.json', () => {
    const enSet = new Set(enKeys);
    const missingFromEn = bigfiveZhKeys.filter((k) => !enSet.has(k));
    expect(
      missingFromEn,
      `Big Five keys in zh.json but missing from en.json:\n${missingFromEn.join('\n')}`
    ).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// Factor names
// ---------------------------------------------------------------------------

describe('BF-05 — Factor names in both locales', () => {
  for (const factorName of REQUIRED_FACTOR_KEYS) {
    it(`factor key "${factorName}" exists in en.json under bigfive namespace`, () => {
      const matchingKeys = enKeys.filter(
        (k) => k.startsWith('bigfive') && k.toLowerCase().includes(factorName)
      );
      expect(
        matchingKeys.length,
        `No bigfive key containing "${factorName}" found in en.json`
      ).toBeGreaterThan(0);
    });

    it(`factor key "${factorName}" exists in zh.json under bigfive namespace`, () => {
      const matchingKeys = zhKeys.filter(
        (k) => k.startsWith('bigfive') && k.toLowerCase().includes(factorName)
      );
      expect(
        matchingKeys.length,
        `No bigfive key containing "${factorName}" found in zh.json`
      ).toBeGreaterThan(0);
    });
  }
});

// ---------------------------------------------------------------------------
// Facet names — 30 facets
// ---------------------------------------------------------------------------

describe('BF-05 — Facet names in both locales (30 facets)', () => {
  for (const facetCode of FACET_CODES) {
    it(`facet "${facetCode}" has a key in en.json`, () => {
      const matchingKeys = enKeys.filter(
        (k) => k.startsWith('bigfive') && k.toLowerCase().includes(facetCode.toLowerCase())
      );
      expect(
        matchingKeys.length,
        `No bigfive key for facet "${facetCode}" found in en.json`
      ).toBeGreaterThan(0);
    });

    it(`facet "${facetCode}" has a key in zh.json`, () => {
      const matchingKeys = zhKeys.filter(
        (k) => k.startsWith('bigfive') && k.toLowerCase().includes(facetCode.toLowerCase())
      );
      expect(
        matchingKeys.length,
        `No bigfive key for facet "${facetCode}" found in zh.json`
      ).toBeGreaterThan(0);
    });
  }
});

// ---------------------------------------------------------------------------
// Likert labels
// ---------------------------------------------------------------------------

describe('BF-05 — Likert scale labels in both locales', () => {
  it(`bigfive Likert scale has ${LIKERT_SCALE_POINTS} label keys in en.json`, () => {
    // Accept either an array or numbered keys (likert1, likert2, ... or labels.1, etc.)
    const likertKeys = enKeys.filter(
      (k) => k.startsWith('bigfive') && (k.includes('likert') || k.includes('label') || k.includes('scale'))
    );
    expect(
      likertKeys.length,
      `Expected at least ${LIKERT_SCALE_POINTS} Likert label keys in en.json bigfive namespace, got ${likertKeys.length}`
    ).toBeGreaterThanOrEqual(LIKERT_SCALE_POINTS);
  });

  it(`bigfive Likert scale has ${LIKERT_SCALE_POINTS} label keys in zh.json`, () => {
    const likertKeys = zhKeys.filter(
      (k) => k.startsWith('bigfive') && (k.includes('likert') || k.includes('label') || k.includes('scale'))
    );
    expect(
      likertKeys.length,
      `Expected at least ${LIKERT_SCALE_POINTS} Likert label keys in zh.json bigfive namespace, got ${likertKeys.length}`
    ).toBeGreaterThanOrEqual(LIKERT_SCALE_POINTS);
  });
});

// ---------------------------------------------------------------------------
// Band labels (low / average / high)
// ---------------------------------------------------------------------------

describe('BF-05 — Band labels in both locales', () => {
  for (const band of REQUIRED_BAND_KEYS) {
    it(`band label "${band}" has a key in en.json under bigfive namespace`, () => {
      const matchingKeys = enKeys.filter(
        (k) => k.startsWith('bigfive') && k.toLowerCase().includes(band)
      );
      expect(
        matchingKeys.length,
        `No bigfive key for band "${band}" found in en.json`
      ).toBeGreaterThan(0);
    });

    it(`band label "${band}" has a key in zh.json under bigfive namespace`, () => {
      const matchingKeys = zhKeys.filter(
        (k) => k.startsWith('bigfive') && k.toLowerCase().includes(band)
      );
      expect(
        matchingKeys.length,
        `No bigfive key for band "${band}" found in zh.json`
      ).toBeGreaterThan(0);
    });
  }
});

// ---------------------------------------------------------------------------
// No empty values in bigfive namespace
// ---------------------------------------------------------------------------

describe('BF-05 — No empty string values in bigfive locale keys', () => {
  it('no empty string values in en.json bigfive keys', () => {
    const emptyKeys = bigfiveEnKeys.filter((k) => {
      const val = getNestedValue(enLocale, k);
      return typeof val === 'string' && val.trim() === '';
    });
    expect(
      emptyKeys,
      `Empty string values in en.json bigfive keys:\n${emptyKeys.join('\n')}`
    ).toHaveLength(0);
  });

  it('no empty string values in zh.json bigfive keys', () => {
    const emptyKeys = bigfiveZhKeys.filter((k) => {
      const val = getNestedValue(zhLocale, k);
      return typeof val === 'string' && val.trim() === '';
    });
    expect(
      emptyKeys,
      `Empty string values in zh.json bigfive keys:\n${emptyKeys.join('\n')}`
    ).toHaveLength(0);
  });

  it('zh.json bigfive values contain Chinese characters (≥50% of them)', () => {
    const zhBigfiveValues = bigfiveZhKeys
      .map((k) => getNestedValue(zhLocale, k))
      .filter((v): v is string => typeof v === 'string');

    const withChinese = zhBigfiveValues.filter((v) => /[\u4e00-\u9fff]/.test(v));

    expect(
      withChinese.length,
      `Less than 50% of zh.json bigfive values contain Chinese characters`
    ).toBeGreaterThan(zhBigfiveValues.length * 0.5);
  });
});
