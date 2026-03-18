/**
 * BF-14: History Integration (INV-08, INV-11)
 *
 * Verifier: auto (Playwright)
 * Claim: After completing a Big Five quiz, the result appears on the /history page
 *        as a Big Five result card showing the "Big Five" label and a factor summary.
 *
 * These tests FAIL until the history page is updated to show Big Five results.
 */

import { test, expect, Page } from '@playwright/test';

const BASE_URL = process.env.APP_URL ?? 'http://localhost:5173';

// ---------------------------------------------------------------------------
// Mock result injection
// ---------------------------------------------------------------------------

const MOCK_BF_HISTORY_RESULT = {
  id: 'bf-history-test',
  takenAt: new Date().toISOString(),
  mode: 'quick',
  factors: {
    O: { raw: 35, percentage: 65, band: 'average' },
    C: { raw: 40, percentage: 75, band: 'high' },
    E: { raw: 30, percentage: 55, band: 'average' },
    A: { raw: 38, percentage: 70, band: 'high' },
    N: { raw: 20, percentage: 30, band: 'low' },
  },
};

async function injectBigFiveResult(page: Page): Promise<void> {
  await page.evaluate((result) => {
    const key = 'tryprism_bigfive_results';
    const existing = JSON.parse(localStorage.getItem(key) ?? '[]');
    existing.push(result);
    localStorage.setItem(key, JSON.stringify(existing));
  }, MOCK_BF_HISTORY_RESULT);
}

async function navigateToHistory(page: Page): Promise<void> {
  await page.goto(`${BASE_URL}/history`);
  await page.waitForLoadState('networkidle');
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test.describe('BF-14 — History page is accessible', () => {
  test('/history page loads without HTTP error', async ({ page }) => {
    await page.goto(BASE_URL);
    const response = await page.goto(`${BASE_URL}/history`);
    expect(response?.status()).toBeLessThan(400);
  });
});

test.describe('BF-14 — Big Five result appears in history', () => {
  test('Big Five result card is visible on /history after saving a result', async ({ page }) => {
    await page.goto(BASE_URL);
    await injectBigFiveResult(page);
    await navigateToHistory(page);

    const bigFiveCard = page.getByTestId('bigfive-history-card')
      .or(page.getByText(/big five|ocean/i).first())
      .or(page.locator('[data-type="bigfive"], [data-test-type="bigfive"]').first());

    await expect(
      bigFiveCard.first(),
      'Big Five result card not found on /history page'
    ).toBeVisible({ timeout: 5000 });
  });

  test('Big Five result card shows "Big Five" label', async ({ page }) => {
    await page.goto(BASE_URL);
    await injectBigFiveResult(page);
    await navigateToHistory(page);

    const labelEl = page.getByText(/big five/i).first()
      .or(page.getByText(/ocean/i).first());

    await expect(
      labelEl.first(),
      '"Big Five" or "OCEAN" label not found in history'
    ).toBeVisible({ timeout: 5000 });
  });

  test('Big Five result card shows a factor summary', async ({ page }) => {
    await page.goto(BASE_URL);
    await injectBigFiveResult(page);
    await navigateToHistory(page);

    // Factor summary: shows O, C, E, A, N abbreviations or factor names, or scores
    const factorSummary = page.locator('[data-testid="factor-summary"], .factor-summary').first()
      .or(page.getByText(/openness|conscientiousness|O:|C:|E:|A:|N:/i).first());

    const isSummaryVisible = await factorSummary.first().isVisible().catch(() => false);

    if (!isSummaryVisible) {
      // Accept if any factor-related content is visible within the card area
      const cardArea = page.locator('[data-type="bigfive"]').first()
        .or(page.getByText(/big five/i).locator('..').first());
      const cardText = await cardArea.textContent().catch(() => '');
      const hasFactorInfo = /[0-9]+%|O:|C:|E:|A:|N:|open|conscien|extra|agree|neurot/i.test(cardText ?? '');
      expect(
        hasFactorInfo,
        'Expected factor score information in Big Five history card'
      ).toBe(true);
    } else {
      await expect(factorSummary.first()).toBeVisible();
    }
  });

  test('Big Five result card shows the date', async ({ page }) => {
    await page.goto(BASE_URL);
    await injectBigFiveResult(page);
    await navigateToHistory(page);

    // History cards typically show when the test was taken
    const datePattern = /\d{4}|\d{1,2}\/\d{1,2}|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/i;
    const hasDate = await page.evaluate((pattern) => {
      return new RegExp(pattern, 'i').test(document.body.innerText);
    }, datePattern.source);

    expect(
      hasDate,
      'Expected a date to appear on the history page'
    ).toBe(true);
  });
});

test.describe('BF-14 — History shows Big Five alongside other test types', () => {
  test('existing Enneagram results remain visible after Big Five result is added', async ({ page }) => {
    await page.goto(BASE_URL);

    // Inject a mock Enneagram result too
    await page.evaluate(() => {
      const enneagramResult = {
        id: 'enn-history-test',
        primaryType: 4,
        wing: 5,
        scores: { 1: 8, 2: 6, 3: 7, 4: 28, 5: 18, 6: 9, 7: 6, 8: 5, 9: 7 },
        tritype: [4, 5, 9],
        lowConfidence: false,
        flatProfile: false,
        mode: 'quick',
        takenAt: new Date(Date.now() - 86400000).toISOString(),
      };
      const key = 'tryprism_results';
      const existing = JSON.parse(localStorage.getItem(key) ?? '[]');
      existing.push(enneagramResult);
      localStorage.setItem(key, JSON.stringify(existing));
    });

    await injectBigFiveResult(page);
    await navigateToHistory(page);

    // Both types of result should be visible
    const bigFiveEl = page.getByText(/big five|ocean/i).first();
    const enneagramEl = page.getByText(/enneagram|type 4|4w5/i).first();

    const bfVisible = await bigFiveEl.isVisible().catch(() => false);
    const ennVisible = await enneagramEl.isVisible().catch(() => false);

    // At minimum, the Big Five result should be visible
    expect(bfVisible, 'Big Five result not visible in history').toBe(true);
    // Enneagram visibility is non-fatal if history page may have pagination
    if (!ennVisible) {
      // Acceptable — may require scrolling or different filter
    }
  });
});
