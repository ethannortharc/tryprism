/**
 * INV-12: Dark/light mode toggle changes theme and persists preference
 *
 * Verifier: auto (Playwright)
 * Claim: App defaults to dark mode; theme toggle switches to light mode with visible CSS changes;
 *        after a page reload, light mode is still active (localStorage persisted);
 *        toggling back restores dark mode.
 *
 * These tests FAIL until the implementation exists.
 */

import { test, expect, Page } from '@playwright/test';

const BASE_URL = process.env.APP_URL ?? 'http://localhost:5173';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function clickThemeToggle(page: Page): Promise<void> {
  const toggle = page.getByTestId('theme-toggle')
    .or(page.getByRole('button', { name: /dark|light|theme|mode/i }))
    .or(page.locator('[aria-label*="theme" i], [aria-label*="dark" i], [aria-label*="light" i]').first());
  await toggle.first().click();
  await page.waitForTimeout(400);
}

/** Get the computed background color of the document body. Returns "rgb(r, g, b)". */
async function getBodyBgColor(page: Page): Promise<string> {
  return page.evaluate(() => {
    return window.getComputedStyle(document.body).backgroundColor;
  });
}

/** Estimate whether a color string is "dark" (low luminance). */
function isDarkColor(rgb: string): boolean {
  const match = rgb.match(/\d+/g);
  if (!match || match.length < 3) return false;
  const [r, g, b] = match.map(Number);
  // Relative luminance approximation
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.5;
}

/** Read the stored theme preference from localStorage. */
async function getStoredTheme(page: Page): Promise<string | null> {
  return page.evaluate(() => {
    return localStorage.getItem('tryprism_theme') ??
           localStorage.getItem('theme') ??
           localStorage.getItem('colorMode') ??
           localStorage.getItem('color-mode');
  });
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test.describe('INV-12 — Default dark mode', () => {
  test('app loads in dark mode by default (no stored preference)', async ({ page }) => {
    // Ensure no stored preference
    await page.goto(BASE_URL);
    await page.evaluate(() => {
      localStorage.removeItem('tryprism_theme');
      localStorage.removeItem('theme');
      localStorage.removeItem('colorMode');
      localStorage.removeItem('color-mode');
    });
    await page.reload();
    await page.waitForLoadState('networkidle');

    const bgColor = await getBodyBgColor(page);
    expect(
      isDarkColor(bgColor),
      `Expected dark background by default but got: ${bgColor}`
    ).toBe(true);
  });

  test('dark mode CSS class or attribute is present by default', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.evaluate(() => {
      ['tryprism_theme', 'theme', 'colorMode', 'color-mode'].forEach(k => localStorage.removeItem(k));
    });
    await page.reload();

    const hasDarkIndicator = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark') ||
             document.documentElement.getAttribute('data-theme') === 'dark' ||
             document.body.classList.contains('dark') ||
             document.body.getAttribute('data-theme') === 'dark';
    });
    expect(hasDarkIndicator, 'No dark mode class or data-theme="dark" attribute found').toBe(true);
  });
});

test.describe('INV-12 — Theme toggle changes CSS', () => {
  test('clicking theme toggle switches from dark to light background', async ({ page }) => {
    await page.goto(BASE_URL);
    const bgBefore = await getBodyBgColor(page);

    await clickThemeToggle(page);

    const bgAfter = await getBodyBgColor(page);
    expect(bgAfter, 'Background color did not change after theme toggle').not.toBe(bgBefore);

    // After switching from dark default, background should now be light
    expect(
      isDarkColor(bgAfter),
      `Expected light background after toggle but got: ${bgAfter}`
    ).toBe(false);
  });

  test('light mode removes dark CSS class or attribute', async ({ page }) => {
    await page.goto(BASE_URL);
    await clickThemeToggle(page);

    const hasDarkClass = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark') ||
             document.documentElement.getAttribute('data-theme') === 'dark' ||
             document.body.classList.contains('dark');
    });

    const hasLightIndicator = await page.evaluate(() => {
      return document.documentElement.classList.contains('light') ||
             document.documentElement.getAttribute('data-theme') === 'light' ||
             document.body.classList.contains('light');
    });

    expect(
      !hasDarkClass || hasLightIndicator,
      'Dark class still present after switching to light mode'
    ).toBe(true);
  });
});

test.describe('INV-12 — Theme preference persistence (localStorage)', () => {
  test('theme preference is saved to localStorage after toggle', async ({ page }) => {
    await page.goto(BASE_URL);
    await clickThemeToggle(page); // Switch to light

    const storedTheme = await getStoredTheme(page);
    expect(storedTheme, 'Theme preference not saved to localStorage').not.toBeNull();
    expect(storedTheme?.toLowerCase()).toMatch(/light/);
  });

  test('light mode persists after page reload', async ({ page }) => {
    await page.goto(BASE_URL);
    await clickThemeToggle(page); // Switch to light

    // Reload the page
    await page.reload();
    await page.waitForLoadState('networkidle');

    const bgAfterReload = await getBodyBgColor(page);
    expect(
      isDarkColor(bgAfterReload),
      `Expected light mode to persist after reload, but background is still dark: ${bgAfterReload}`
    ).toBe(false);
  });

  test('toggling back to dark mode updates localStorage', async ({ page }) => {
    await page.goto(BASE_URL);
    await clickThemeToggle(page); // To light
    await clickThemeToggle(page); // Back to dark

    const storedTheme = await getStoredTheme(page);
    // Either stored as "dark" or removed (falling back to default dark)
    const isDarkStored = storedTheme === null || storedTheme.toLowerCase().includes('dark');
    expect(isDarkStored, `Expected dark mode stored but got: ${storedTheme}`).toBe(true);
  });

  test('dark mode persists after page reload', async ({ page }) => {
    await page.goto(BASE_URL);
    await clickThemeToggle(page); // To light
    await clickThemeToggle(page); // Back to dark

    await page.reload();
    await page.waitForLoadState('networkidle');

    const bgAfterReload = await getBodyBgColor(page);
    expect(
      isDarkColor(bgAfterReload),
      `Expected dark mode after reload but background is light: ${bgAfterReload}`
    ).toBe(true);
  });
});
