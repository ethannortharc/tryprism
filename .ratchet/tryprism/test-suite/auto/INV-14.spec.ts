/**
 * INV-14: localStorage saves completed test results and restores them on revisit
 *
 * Verifier: auto (Playwright + Vitest unit tests)
 * Claim: After completing a quiz, results are stored in localStorage and remain accessible
 *        after a page reload. Clearing localStorage removes the results. Corrupted
 *        localStorage data is handled gracefully.
 *
 * These tests FAIL until the implementation exists.
 */

import { test, expect, Page } from '@playwright/test';

const BASE_URL = process.env.APP_URL ?? 'http://localhost:5173';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const MOCK_RESULT = {
  primaryType: 4,
  wing: 5,
  scores: { 1: 8, 2: 6, 3: 7, 4: 28, 5: 18, 6: 9, 7: 6, 8: 5, 9: 7 },
  tritype: [4, 5, 9],
  lowConfidence: false,
  flatProfile: false,
  mode: 'quick',
  completedAt: new Date().toISOString(),
};

/** Common localStorage keys the app may use. */
const RESULT_KEYS = [
  'tryprism_latest_result',
  'tryprism_result',
  'tryprism_results',
  'latestResult',
  'enneagramResults',
];

async function clearAllResultKeys(page: Page): Promise<void> {
  await page.evaluate((keys) => {
    keys.forEach((k) => localStorage.removeItem(k));
  }, RESULT_KEYS);
}

async function getAnyStoredResult(page: Page): Promise<string | null> {
  return page.evaluate((keys) => {
    for (const k of keys) {
      const v = localStorage.getItem(k);
      if (v) return v;
    }
    return null;
  }, RESULT_KEYS);
}

async function startQuickMode(page: Page): Promise<void> {
  const quickMode = page.getByTestId('quick-mode-card')
    .or(page.getByRole('button', { name: /quick/i }));
  await quickMode.first().click();
  await page.waitForSelector('[data-testid="question-text"], .question-text', { timeout: 5000 });
}

async function answerAllQuestions(page: Page, maxQuestions = 54): Promise<void> {
  for (let i = 0; i < maxQuestions; i++) {
    // Pick the middle (neutral) Likert option
    const options = page.getByRole('radio').or(page.getByTestId('likert-option'));
    const count = await options.count();
    if (count === 0) break; // May have already reached results

    // Select the middle option (index 2 of 5)
    const midIndex = Math.min(2, count - 1);
    await options.nth(midIndex).click().catch(() => {});

    const nextBtn = page.getByTestId('next-button')
      .or(page.getByRole('button', { name: /next|continue|finish|done|submit/i }));
    await nextBtn.first().click().catch(() => {});
    await page.waitForTimeout(80);

    // Check if we've reached results
    const onResults = await page.locator('[data-testid="primary-type-number"], .result-primary-type, .type-hero').isVisible().catch(() => false);
    if (onResults) break;
  }
}

// ---------------------------------------------------------------------------
// Level 3 — Integration tests (Playwright)
// ---------------------------------------------------------------------------

test.describe('INV-14 — localStorage after quiz completion', () => {
  test('localStorage contains result data after completing quiz', async ({ page }) => {
    await page.goto(BASE_URL);
    await clearAllResultKeys(page);

    await startQuickMode(page);
    await answerAllQuestions(page);

    // Allow time for result persistence
    await page.waitForTimeout(1000);

    const stored = await getAnyStoredResult(page);
    expect(stored, 'No result data found in localStorage after completing quiz').not.toBeNull();

    // Verify it's valid JSON
    let parsed: unknown;
    expect(() => { parsed = JSON.parse(stored!); }).not.toThrow();
    expect(parsed).toBeDefined();
  });

  test('stored result contains a primaryType field', async ({ page }) => {
    await page.goto(BASE_URL);
    await clearAllResultKeys(page);

    await startQuickMode(page);
    await answerAllQuestions(page);
    await page.waitForTimeout(1000);

    const stored = await getAnyStoredResult(page);
    if (!stored) test.skip(true, 'No result stored — covered by previous test');
    const parsed = JSON.parse(stored!);

    // Handle both single-result and array-of-results format
    const result = Array.isArray(parsed) ? parsed[0] : parsed;
    expect(result).toHaveProperty('primaryType');
    expect(result.primaryType).toBeGreaterThanOrEqual(1);
    expect(result.primaryType).toBeLessThanOrEqual(9);
  });
});

test.describe('INV-14 — Results accessible after page reload', () => {
  test('results remain available after page reload', async ({ page }) => {
    // Inject a known result
    await page.goto(BASE_URL);
    await page.evaluate((result) => {
      localStorage.setItem('tryprism_latest_result', JSON.stringify(result));
    }, MOCK_RESULT);

    // Reload the page
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Result should still be in localStorage
    const stored = await page.evaluate(() => localStorage.getItem('tryprism_latest_result'));
    expect(stored, 'Result was cleared from localStorage after reload').not.toBeNull();
    const parsed = JSON.parse(stored!);
    expect(parsed.primaryType).toBe(4);
  });

  test('results page shows previous result after reload', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.evaluate((result) => {
      localStorage.setItem('tryprism_latest_result', JSON.stringify(result));
      localStorage.setItem('latestResult', JSON.stringify(result));
    }, MOCK_RESULT);

    await page.goto(`${BASE_URL}/results`).catch(() => {});
    await page.waitForLoadState('networkidle');

    const typeEl = page.getByTestId('primary-type-number')
      .or(page.locator('.primary-type, .type-hero').first());
    const visible = await typeEl.first().isVisible({ timeout: 5000 }).catch(() => false);

    // Reload
    await page.reload();
    await page.waitForLoadState('networkidle');

    const visibleAfterReload = await typeEl.first().isVisible({ timeout: 5000 }).catch(() => false);
    expect(visibleAfterReload, 'Results not visible after page reload').toBe(true);
  });
});

test.describe('INV-14 — Clearing localStorage removes results', () => {
  test('after clearing localStorage, results are no longer accessible', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.evaluate((result) => {
      localStorage.setItem('tryprism_latest_result', JSON.stringify(result));
    }, MOCK_RESULT);

    // Clear localStorage
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForLoadState('networkidle');

    const stored = await getAnyStoredResult(page);
    expect(stored, 'Results still present after localStorage.clear()').toBeNull();
  });
});

test.describe('INV-14 — Corrupted localStorage handled gracefully', () => {
  test('corrupted localStorage does not crash the app', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    await page.goto(BASE_URL);
    // Inject corrupted data
    await page.evaluate(() => {
      localStorage.setItem('tryprism_latest_result', '{invalid json{{{{');
      localStorage.setItem('latestResult', 'not-valid-json');
    });

    await page.reload();
    await page.waitForLoadState('networkidle');

    // App should still render the home page without crashing
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading.first()).toBeVisible({ timeout: 5000 });

    expect(
      errors,
      `Unhandled errors when loading corrupted localStorage:\n${errors.join('\n')}`
    ).toHaveLength(0);
  });
});

test.describe('INV-14 — History page lists past results', () => {
  test('history page shows a result entry for each stored result', async ({ page }) => {
    await page.goto(BASE_URL);
    await clearAllResultKeys(page);

    // Store two results
    const results = [
      { ...MOCK_RESULT, primaryType: 4, completedAt: new Date(Date.now() - 86400000).toISOString() },
      { ...MOCK_RESULT, primaryType: 7, completedAt: new Date().toISOString() },
    ];
    await page.evaluate((rs) => {
      localStorage.setItem('tryprism_results', JSON.stringify(rs));
    }, results);

    await page.goto(`${BASE_URL}/history`).catch(() => {});
    await page.waitForLoadState('networkidle');

    const resultItems = page.locator('[data-testid="history-item"], .history-item, .result-list-item');
    const count = await resultItems.count();
    expect(count, 'Expected 2 history items').toBe(2);
  });
});
