/**
 * Theme system for TryPrism.
 *
 * Exports:
 *   getTheme()    → 'dark' | 'light'
 *   setTheme(t)   → void  (persists to localStorage, applies CSS class)
 *   toggleTheme() → void
 *   initTheme()   → void  (call once on app start to restore persisted preference)
 */

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'tryprism_theme';
const DEFAULT_THEME: Theme = 'dark';

// Internal state
let currentTheme: Theme = DEFAULT_THEME;

/**
 * Apply the theme class to the document root element.
 * Adds the active theme class and removes the other.
 */
function applyThemeToDOM(theme: Theme): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
    root.classList.remove('light');
  } else {
    root.classList.add('light');
    root.classList.remove('dark');
  }
}

/** Returns the current active theme. */
export function getTheme(): Theme {
  return currentTheme;
}

/** Sets the active theme, persists to localStorage, and applies CSS class. */
export function setTheme(theme: Theme): void {
  currentTheme = theme;
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, theme);
    }
  } catch {
    // localStorage unavailable — ignore
  }
  applyThemeToDOM(theme);
}

/** Toggles between dark and light theme. */
export function toggleTheme(): void {
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
}

/**
 * Initialize the theme system on app start.
 * Reads persisted preference from localStorage, falls back to dark mode default.
 * Applies the CSS class to the document root immediately.
 */
export function initTheme(): void {
  let stored: string | null = null;
  try {
    if (typeof localStorage !== 'undefined') {
      stored = localStorage.getItem(STORAGE_KEY);
    }
  } catch {
    // localStorage unavailable
  }

  if (stored === 'light') {
    currentTheme = 'light';
  } else {
    currentTheme = DEFAULT_THEME;
  }

  applyThemeToDOM(currentTheme);
}
