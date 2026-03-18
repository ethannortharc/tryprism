/**
 * BF-16: Theme Switching on Big Five Pages (INV-16)
 *
 * Verifier: auto (Playwright)
 * Claim: All new Big Five pages support dark/light theme switching via the existing
 *        ThemeContext. Toggling theme on one Big Five page changes background color,
 *        and the preference persists when navigating to another Big Five page.
 *
 * These tests FAIL until Big Five pages are integrated with ThemeContext.
 */

import { test, expect, Page } from '@playwright/test';

const BASE_URL = process.env.APP_URL ?? 'http://localhost:5173';

// ---------------------------------------------------------------------------
// Helpers (mirrors INV-12 pattern for theme tests)
// ---------------------------------------------------------------------------

async function clickThemeToggle(page: Page): Promise<void> {
  const toggle = page.getByTestId('theme-toggle')
    .or(page.getByRole('button', { name: /dark|light|theme|mode/i }))
    .or(page.locator('[aria-label*="theme" i], [aria-label*="dark" i], [aria-label*="light" i]').first());
  await toggle.first().click();
  await page.waitForTimeout(400);
}

async function getBodyBgColor(page: Page): Promise<string> {
  return page.evaluate(() => window.getComputedStyle(document.body).backgroundColor);
}

function isDarkColor(rgb: string): boolean {
  const match = rgb.match(/\d+/g);
  if (!match || match.length < 3) return false;
  const [r, g, b] = match.map(Number);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.5;
}

async function getCssVariable(page: Page, varName: string): Promise<string> {
  return page.evaluate((v) => {
    return getComputedStyle(document.documentElement).getPropertyValue(v).trim();
  }, varName);
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test.describe('BF-16 — Theme toggle present on Big Five pages', () => {
  test('theme toggle is visible on /bigfive', async ({ page }) => {
    await page.goto(`${BASE_URL}/bigfive`);
    await page.waitForLoadState('networkidle');

    const themeToggle = page.getByTestId('theme-toggle')
      .or(page.getByRole('button', { name: /dark|light|theme/i }))
      .or(page.locator('[aria-label*="theme" i], [aria-label*="dark" i]').first());

    await expect(themeToggle.first(), 'Theme toggle not visible on /bigfive').toBeVisible({ timeout: 5000 });
  });

  test('theme toggle is visible on /bigfive/quiz', async ({ page }) => {
    await page.goto(`${BASE_URL}/bigfive/quiz?mode=quick`);
    await page.waitForLoadState('networkidle');

    const themeToggle = page.getByTestId('theme-toggle')
      .or(page.getByRole('button', { name: /dark|light|theme/i }))
      .or(page.locator('[aria-label*="theme" i]').first());

    await expect(themeToggle.first(), 'Theme toggle not visible on /bigfive/quiz').toBeVisible({ timeout: 5000 });
  });
});

test.describe('BF-16 — Theme changes apply on /bigfive', () => {
  test('clicking theme toggle changes background color on /bigfive', async ({ page }) => {
    await page.goto(`${BASE_URL}/bigfive`);
    await page.waitForLoadState('networkidle');

    const bgBefore = await getBodyBgColor(page);
    await clickThemeToggle(page);
    const bgAfter = await getBodyBgColor(page);

    expect(
      bgAfter,
      'Background color did not change after clicking theme toggle on /bigfive'
    ).not.toBe(bgBefore);
  });

  test('toggling changes from dark to light on /bigfive (default should be dark)', async ({ page }) => {
    await page.goto(`${BASE_URL}/bigfive`);
    await page.waitForLoadState('networkidle');

    const bgBefore = await getBodyBgColor(page);

    if (isDarkColor(bgBefore)) {
      await clickThemeToggle(page);
      const bgAfter = await getBodyBgColor(page);
      expect(
        isDarkColor(bgAfter),
        'After toggling from dark, background should be light'
      ).toBe(false);
    } else {
      // Already in light mode — toggle to dark
      await clickThemeToggle(page);
      const bgAfter = await getBodyBgColor(page);
      expect(
        isDarkColor(bgAfter),
        'After toggling from light, background should be dark'
      ).toBe(true);
    }
  });
});

test.describe('BF-16 — Theme persists when navigating to quiz page', () => {
  test('theme set on /bigfive persists on /bigfive/quiz', async ({ page }) => {
    await page.goto(`${BASE_URL}/bigfive`);
    await page.waitForLoadState('networkidle');

    const initialBg = await getBodyBgColor(page);
    await clickThemeToggle(page);
    const toggledBg = await getBodyBgColor(page);

    // Navigate to quiz
    await page.goto(`${BASE_URL}/bigfive/quiz?mode=quick`);
    await page.waitForLoadState('networkidle');

    const quizBg = await getBodyBgColor(page);

    // The quiz page background should match the toggled theme (not the initial)
    expect(
      quizBg,
      'Theme did not persist from /bigfive to /bigfive/quiz'
    ).toBe(toggledBg);
  });
});

test.describe('BF-16 — CSS variables change with theme', () => {
  test('CSS variables change when theme is toggled on /bigfive', async ({ page }) => {
    await page.goto(`${BASE_URL}/bigfive`);
    await page.waitForLoadState('networkidle');

    // Check common CSS variables that should change with theme
    const bgVarBefore = await getCssVariable(page, '--bg-primary').catch(() => '');
    const textVarBefore = await getCssVariable(page, '--text-primary').catch(() => '');

    await clickThemeToggle(page);

    const bgVarAfter = await getCssVariable(page, '--bg-primary').catch(() => '');
    const textVarAfter = await getCssVariable(page, '--text-primary').catch(() => '');

    // At least one CSS variable should change
    const cssChanged = bgVarAfter !== bgVarBefore || textVarAfter !== textVarBefore;

    if (!cssChanged) {
      // Fall back to background color check
      const bgBefore = await getBodyBgColor(page);
      await clickThemeToggle(page);
      const bgAfter = await getBodyBgColor(page);
      expect(bgAfter, 'Neither CSS variables nor background changed with theme toggle').not.toBe(bgBefore);
    } else {
      expect(cssChanged, 'CSS variables did not change with theme toggle').toBe(true);
    }
  });
});

test.describe('BF-16 — Dark/light class or attribute on html element', () => {
  test('/bigfive page has a dark/light mode indicator attribute', async ({ page }) => {
    await page.goto(`${BASE_URL}/bigfive`);
    await page.waitForLoadState('networkidle');

    const hasThemeIndicator = await page.evaluate(() => {
      return (
        document.documentElement.classList.contains('dark') ||
        document.documentElement.classList.contains('light') ||
        document.documentElement.getAttribute('data-theme') !== null ||
        document.body.classList.contains('dark') ||
        document.body.classList.contains('light') ||
        document.body.getAttribute('data-theme') !== null
      );
    });

    expect(
      hasThemeIndicator,
      'Expected a dark/light class or data-theme attribute on html or body element'
    ).toBe(true);
  });
});
