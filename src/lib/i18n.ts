/**
 * Minimal i18n system for TryPrism.
 *
 * Exports:
 *   getLocale()          → 'en' | 'zh'
 *   setLocale(locale)    → void  (persists to localStorage)
 *   t(key)               → translated string for the current locale
 */

import enLocale from '../locales/en.json';
import zhLocale from '../locales/zh.json';

export type Locale = 'en' | 'zh';

const STORAGE_KEY = 'tryprism_locale';

const locales: Record<Locale, Record<string, unknown>> = {
  en: enLocale as Record<string, unknown>,
  zh: zhLocale as Record<string, unknown>,
};

// ---------------------------------------------------------------------------
// Internal state — mutable locale
// ---------------------------------------------------------------------------
let currentLocale: Locale = 'en'; // default to English

// Attempt to restore persisted preference on module load.
// Guard for SSR / test environments where localStorage may not exist.
try {
  const stored = typeof localStorage !== 'undefined'
    ? localStorage.getItem(STORAGE_KEY)
    : null;
  if (stored === 'en' || stored === 'zh') {
    currentLocale = stored;
  }
} catch {
  // localStorage unavailable — use default
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** Returns the current active locale ('en' or 'zh'). */
export function getLocale(): Locale {
  return currentLocale;
}

/** Sets the active locale and persists the choice to localStorage. */
export function setLocale(locale: Locale): void {
  currentLocale = locale;
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, locale);
    }
  } catch {
    // localStorage unavailable — ignore
  }
}

/**
 * Translate a dot-separated key using the current locale.
 *
 * Example: t('buttons.next') → 'Next' (en) or '下一题' (zh)
 *
 * Returns the key itself if the translation is missing.
 */
export function t(key: string): string {
  const parts = key.split('.');
  let value: unknown = locales[currentLocale];

  for (const part of parts) {
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      value = (value as Record<string, unknown>)[part];
    } else {
      return key; // key not found
    }
  }

  if (typeof value === 'string') {
    return value;
  }

  return key; // fallback to key
}
