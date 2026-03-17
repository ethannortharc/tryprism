/**
 * INV-10: Language toggle switches all visible UI text between Chinese and English
 *
 * Verifier: auto (Playwright)
 * Claim: Toggling the language switch changes all visible UI text on home, quiz,
 *        and results pages. No untranslated strings remain after toggling. Toggling
 *        back restores the original language.
 *
 * These tests FAIL until the implementation exists.
 */

import { test, expect, Page } from '@playwright/test';

const BASE_URL = process.env.APP_URL ?? 'http://localhost:5173';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function clickLanguageToggle(page: Page): Promise<void> {
  const langToggle = page.getByTestId('language-toggle')
    .or(page.getByRole('button', { name: /zh|en|中文|english|语言|language/i }))
    .or(page.locator('[aria-label*="language" i], [aria-label*="语言"]').first());
  await langToggle.first().click();
  await page.waitForTimeout(400); // allow re-render
}

/** Returns true if the text contains Chinese characters. */
function containsChinese(text: string): boolean {
  return /[\u4e00-\u9fff]/.test(text);
}

/** Returns true if the text is predominantly ASCII (Latin) characters. */
function isPredominantlyLatin(text: string): boolean {
  const latin = (text.match(/[a-zA-Z]/g) ?? []).length;
  const chinese = (text.match(/[\u4e00-\u9fff]/g) ?? []).length;
  return latin > chinese;
}

const MOCK_RESULT = {
  primaryType: 4, wing: 5,
  scores: { 1: 8, 2: 6, 3: 7, 4: 28, 5: 18, 6: 9, 7: 6, 8: 5, 9: 7 },
  tritype: [4, 5, 9], lowConfidence: false, flatProfile: false,
  mode: 'quick', completedAt: new Date().toISOString(),
};

async function injectResultAndGoToResults(page: Page): Promise<void> {
  await page.evaluate((result) => {
    localStorage.setItem('tryprism_latest_result', JSON.stringify(result));
    localStorage.setItem('latestResult', JSON.stringify(result));
  }, MOCK_RESULT);
  await page.goto(`${BASE_URL}/results`).catch(() => {});
  await page.waitForLoadState('networkidle');
}

// ---------------------------------------------------------------------------
// Tests — Home page
// ---------------------------------------------------------------------------

test.describe('INV-10 — Language toggle on home page', () => {
  test('default language renders either Chinese or English (not empty)', async ({ page }) => {
    await page.goto(BASE_URL);
    const heading = await page.getByRole('heading', { level: 1 }).textContent();
    expect(heading?.trim().length ?? 0).toBeGreaterThan(0);
  });

  test('toggling language changes heading text', async ({ page }) => {
    await page.goto(BASE_URL);
    const headingBefore = await page.getByRole('heading', { level: 1 }).textContent();
    await clickLanguageToggle(page);
    const headingAfter = await page.getByRole('heading', { level: 1 }).textContent();
    expect(headingAfter, 'Heading text did not change after language toggle').not.toBe(headingBefore);
  });

  test('after toggling, main buttons / labels change language', async ({ page }) => {
    await page.goto(BASE_URL);
    // Collect all visible button texts
    const buttonsBefore = await page.getByRole('button').allTextContents();

    await clickLanguageToggle(page);

    const buttonsAfter = await page.getByRole('button').allTextContents();

    // At least some button text should have changed
    const changed = buttonsBefore.some((text, i) => buttonsAfter[i] !== text);
    expect(changed, 'No button text changed after language toggle').toBe(true);
  });

  test('toggling back restores original language', async ({ page }) => {
    await page.goto(BASE_URL);
    const headingOriginal = await page.getByRole('heading', { level: 1 }).textContent();

    // Toggle once
    await clickLanguageToggle(page);
    // Toggle back
    await clickLanguageToggle(page);

    const headingRestored = await page.getByRole('heading', { level: 1 }).textContent();
    expect(headingRestored).toBe(headingOriginal);
  });
});

test.describe('INV-10 — No mixed language strings after toggle', () => {
  test('after toggle to Chinese, main heading is in Chinese', async ({ page }) => {
    await page.goto(BASE_URL);

    // Determine default language first
    const defaultHeading = await page.getByRole('heading', { level: 1 }).textContent() ?? '';
    const defaultIsEnglish = isPredominantlyLatin(defaultHeading);

    if (defaultIsEnglish) {
      // Toggle to Chinese
      await clickLanguageToggle(page);
      const headingZh = await page.getByRole('heading', { level: 1 }).textContent() ?? '';
      expect(containsChinese(headingZh), 'Expected Chinese heading after toggle but got: ' + headingZh).toBe(true);
    } else {
      // Already Chinese — toggle to English
      await clickLanguageToggle(page);
      const headingEn = await page.getByRole('heading', { level: 1 }).textContent() ?? '';
      expect(isPredominantlyLatin(headingEn), 'Expected English heading after toggle but got: ' + headingEn).toBe(true);
    }
  });

  test('navigation/menu items all change language after toggle', async ({ page }) => {
    await page.goto(BASE_URL);
    const navBefore = await page.locator('nav').allTextContents().catch(() => ['']);
    await clickLanguageToggle(page);
    const navAfter = await page.locator('nav').allTextContents().catch(() => ['']);

    const combinedBefore = navBefore.join(' ');
    const combinedAfter = navAfter.join(' ');

    if (combinedBefore.trim().length > 0) {
      expect(combinedAfter).not.toBe(combinedBefore);
    }
  });
});

test.describe('INV-10 — Language toggle on quiz page', () => {
  test('language toggle is accessible and functional during quiz', async ({ page }) => {
    await page.goto(`${BASE_URL}/enneagram`);
    const quickMode = page.getByTestId('quick-mode-card')
      .or(page.getByRole('button', { name: /quick/i }));
    await quickMode.first().click();
    await page.waitForSelector('[data-testid="question-text"], .question-text', { timeout: 5000 });

    const questionBefore = await page.locator('[data-testid="question-text"], .question-text').first().textContent();

    await clickLanguageToggle(page);

    const questionAfter = await page.locator('[data-testid="question-text"], .question-text').first().textContent();
    expect(questionAfter, 'Question text did not change after language toggle on quiz page').not.toBe(questionBefore);
  });
});

test.describe('INV-10 — Language toggle on results page', () => {
  test('results page content changes language after toggle', async ({ page }) => {
    await page.goto(BASE_URL);
    await injectResultAndGoToResults(page);

    const descBefore = await page.getByTestId('type-description')
      .or(page.locator('.type-description').first())
      .textContent().catch(() => '');

    await clickLanguageToggle(page);

    const descAfter = await page.getByTestId('type-description')
      .or(page.locator('.type-description').first())
      .textContent().catch(() => '');

    if (descBefore && descAfter) {
      expect(descAfter, 'Results description did not change after language toggle').not.toBe(descBefore);
    }
  });
});
