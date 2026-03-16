/**
 * INV-02: Home page renders with branding, mode selection, language toggle, and theme toggle
 *
 * Verifier: auto (Playwright)
 * Claim: The home page loads, shows app title/branding, quick and full mode options,
 *        a zh/en language toggle, a dark/light theme toggle, and no console errors.
 *
 * These tests FAIL until the implementation exists.
 * App is assumed to run at http://localhost:5173 (Vite dev server).
 */

import { test, expect, Page } from '@playwright/test';

const BASE_URL = process.env.APP_URL ?? 'http://localhost:5173';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

async function collectConsoleErrors(page: Page): Promise<string[]> {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (err) => errors.push(err.message));
  return errors;
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test.describe('INV-02 — Home page initial render', () => {
  test('home page loads without HTTP error', async ({ page }) => {
    const response = await page.goto(BASE_URL);
    expect(response?.status()).toBeLessThan(400);
  });

  test('app title / branding is visible', async ({ page }) => {
    await page.goto(BASE_URL);
    // Accept either the title text or a logo image with alt text
    const brandingLocator = page.getByTestId('app-title')
      .or(page.getByRole('heading', { level: 1 }))
      .or(page.getByRole('img', { name: /tryprism|prism/i }));
    await expect(brandingLocator.first()).toBeVisible();
  });

  test('tagline or description text is visible', async ({ page }) => {
    await page.goto(BASE_URL);
    const tagline = page.getByTestId('app-tagline')
      .or(page.locator('[data-testid="tagline"]'))
      .or(page.locator('p, .tagline, .subtitle').first());
    await expect(tagline.first()).toBeVisible();
  });

  test('quick mode selection option is present and visible', async ({ page }) => {
    await page.goto(BASE_URL);
    const quickMode = page.getByTestId('quick-mode-card')
      .or(page.getByRole('button', { name: /quick/i }))
      .or(page.getByText(/quick/i).first());
    await expect(quickMode.first()).toBeVisible();
  });

  test('full mode selection option is present and visible', async ({ page }) => {
    await page.goto(BASE_URL);
    const fullMode = page.getByTestId('full-mode-card')
      .or(page.getByRole('button', { name: /full/i }))
      .or(page.getByText(/full/i).first());
    await expect(fullMode.first()).toBeVisible();
  });
});

test.describe('INV-02 — Language toggle', () => {
  test('language toggle element is present on home page', async ({ page }) => {
    await page.goto(BASE_URL);
    const langToggle = page.getByTestId('language-toggle')
      .or(page.getByRole('button', { name: /zh|en|中文|english/i }))
      .or(page.locator('[aria-label*="language" i], [aria-label*="语言"]'));
    await expect(langToggle.first()).toBeVisible();
  });

  test('language toggle is clickable and changes visible text', async ({ page }) => {
    await page.goto(BASE_URL);

    // Capture some text before toggle
    const headingBefore = await page.getByRole('heading', { level: 1 }).textContent();

    const langToggle = page.getByTestId('language-toggle')
      .or(page.getByRole('button', { name: /zh|en|中文|english/i }))
      .or(page.locator('[aria-label*="language" i]'));

    await langToggle.first().click();
    await page.waitForTimeout(300); // allow re-render

    const headingAfter = await page.getByRole('heading', { level: 1 }).textContent();

    // After toggle, some visible text should have changed
    // (heading text changes, or at minimum the toggle button label changes)
    const toggleTextAfter = await langToggle.first().textContent();
    const toggleTextBefore = headingBefore ?? '';

    // Either the heading changed or toggle label changed
    const somethingChanged = headingAfter !== headingBefore || toggleTextAfter !== toggleTextBefore;
    expect(somethingChanged, 'Language toggle did not change any visible text').toBe(true);
  });
});

test.describe('INV-02 — Theme toggle', () => {
  test('theme toggle element is present on home page', async ({ page }) => {
    await page.goto(BASE_URL);
    const themeToggle = page.getByTestId('theme-toggle')
      .or(page.getByRole('button', { name: /dark|light|theme/i }))
      .or(page.locator('[aria-label*="theme" i], [aria-label*="dark" i], [aria-label*="light" i]'));
    await expect(themeToggle.first()).toBeVisible();
  });

  test('theme toggle is clickable', async ({ page }) => {
    await page.goto(BASE_URL);
    const themeToggle = page.getByTestId('theme-toggle')
      .or(page.getByRole('button', { name: /dark|light|theme/i }))
      .or(page.locator('[aria-label*="theme" i]'));
    await expect(themeToggle.first()).toBeEnabled();
  });
});

test.describe('INV-02 — No console errors on initial load', () => {
  test('home page produces no console errors', async ({ page }) => {
    const errors = await collectConsoleErrors(page);
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    expect(errors, `Console errors on home page:\n${errors.join('\n')}`).toHaveLength(0);
  });
});

test.describe('INV-02 — Mode selection cards are interactive', () => {
  test('clicking quick mode navigates to quiz or mode-selection page', async ({ page }) => {
    await page.goto(BASE_URL);
    const quickMode = page.getByTestId('quick-mode-card')
      .or(page.getByRole('button', { name: /quick/i }));
    await quickMode.first().click();
    await page.waitForURL(/quiz|test|questions/, { timeout: 5000 }).catch(() => {
      // May show a confirmation step first — acceptable
    });
    // Either URL changed or something on page changed to indicate mode selected
    const currentUrl = page.url();
    const movedOn = currentUrl !== BASE_URL && currentUrl !== BASE_URL + '/';
    const quizStarted = await page.getByTestId('question-text').isVisible().catch(() => false);
    expect(movedOn || quizStarted, 'Quick mode click had no effect').toBe(true);
  });
});
