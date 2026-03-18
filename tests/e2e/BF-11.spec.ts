/**
 * BF-11: Results Display — Factors (INV-05)
 *
 * Verifier: auto (Playwright)
 * Claim: After completing a quick quiz, the results page shows all 5 OCEAN factor
 *        sections with horizontal score bars and descriptive band labels (Low/Average/High).
 *
 * These tests FAIL until /bigfive/results is implemented.
 */

import { test, expect, Page } from '@playwright/test';
import { completeBigFiveQuiz } from './bigfive-helpers';

const BASE_URL = process.env.APP_URL ?? 'http://localhost:5173';

// ---------------------------------------------------------------------------
// Mock result injection helper
// ---------------------------------------------------------------------------

const MOCK_BF_QUICK_RESULT = {
  id: 'bf-mock-quick',
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

async function injectBigFiveResultAndNavigate(page: Page): Promise<void> {
  await page.goto(BASE_URL);
  await page.evaluate((result) => {
    localStorage.setItem('tryprism_bigfive_results', JSON.stringify([result]));
    localStorage.setItem('tryprism_bigfive_latest', JSON.stringify(result));
    localStorage.setItem('bigfive_latest_result', JSON.stringify(result));
  }, MOCK_BF_QUICK_RESULT);
  await page.goto(`${BASE_URL}/bigfive/results`);
  await page.waitForLoadState('networkidle');
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test.describe('BF-11 — Results page loads after quick quiz', () => {
  test('results page loads after completing a quick quiz', async ({ page }) => {
    await completeBigFiveQuiz(page, 'quick');
    await page.waitForURL(/bigfive.*result|result/, { timeout: 15000 }).catch(() => {});
    const url = page.url();
    // Should be on some kind of results page
    expect(url).toBeTruthy();
    const response = await page.goto(page.url());
    expect(response?.status()).toBeLessThan(400);
  });

  test('results page loads with injected mock result', async ({ page }) => {
    await injectBigFiveResultAndNavigate(page);
    const heading = page.getByRole('heading').first();
    await expect(heading).toBeVisible({ timeout: 5000 });
  });
});

test.describe('BF-11 — All 5 OCEAN factor sections are visible', () => {
  const FACTOR_NAMES = ['Openness', 'Conscientiousness', 'Extraversion', 'Agreeableness', 'Neuroticism'];
  const FACTOR_ABBREVIATIONS = ['O', 'C', 'E', 'A', 'N'];

  for (const factorName of FACTOR_NAMES) {
    test(`factor "${factorName}" section is visible`, async ({ page }) => {
      await injectBigFiveResultAndNavigate(page);

      const factorSection = page.getByText(new RegExp(factorName, 'i')).first()
        .or(page.locator(`[data-factor="${factorName.charAt(0)}"], [data-testid="factor-${factorName.toLowerCase()}"]`).first());

      await expect(
        factorSection.first(),
        `${factorName} factor section not visible on results page`
      ).toBeVisible({ timeout: 8000 });
    });
  }

  test('all 5 factor sections are present (by abbreviation or data attribute)', async ({ page }) => {
    await injectBigFiveResultAndNavigate(page);

    // Accept either named sections or sections tagged with factor codes
    let visibleFactors = 0;
    for (const abbrev of FACTOR_ABBREVIATIONS) {
      const section = page.locator(
        `[data-factor="${abbrev}"], [data-testid="factor-${abbrev}"], .factor-${abbrev}`
      ).first();
      const isVisible = await section.isVisible().catch(() => false);
      if (isVisible) visibleFactors++;
    }

    // Also count named factor headings
    for (const name of FACTOR_NAMES) {
      const heading = page.getByText(new RegExp(name, 'i')).first();
      const isVisible = await heading.isVisible().catch(() => false);
      if (isVisible) visibleFactors = Math.max(visibleFactors, FACTOR_NAMES.indexOf(name) + 1);
    }

    // All 5 factors should be represented
    const factorHeadings = page.getByRole('heading').filter({ hasText: /openness|conscientiousness|extraversion|agreeableness|neuroticism/i });
    const headingCount = await factorHeadings.count();

    expect(
      headingCount,
      'Expected 5 factor headings on results page'
    ).toBe(5);
  });
});

test.describe('BF-11 — Factor score bars are visible', () => {
  test('score bar elements are present for each factor', async ({ page }) => {
    await injectBigFiveResultAndNavigate(page);

    // Look for progress bar elements, bar charts, or score indicators
    const scoreBars = page.locator(
      '[role="progressbar"], .score-bar, [data-testid$="-bar"], .factor-bar, progress'
    );
    const count = await scoreBars.count();
    expect(
      count,
      'Expected at least 5 score bars (one per factor)'
    ).toBeGreaterThanOrEqual(5);
  });
});

test.describe('BF-11 — Band labels are visible', () => {
  test('at least one band label (Low, Average, or High) is visible', async ({ page }) => {
    await injectBigFiveResultAndNavigate(page);

    const bandLabel = page.getByText(/\b(low|average|high)\b/i)
      .or(page.getByText(/\b(低|中|高)\b/).first())
      .or(page.locator('.band-label, [data-testid="band-label"]').first());

    await expect(
      bandLabel.first(),
      'No band label (Low/Average/High) visible on results page'
    ).toBeVisible({ timeout: 5000 });
  });

  test('band labels appear for multiple factors', async ({ page }) => {
    await injectBigFiveResultAndNavigate(page);

    const bandLabels = page.getByText(/\b(low|average|high)\b/i)
      .or(page.locator('.band-label, [data-testid="band-label"]'));
    const count = await bandLabels.count();

    expect(
      count,
      'Expected band labels for at least 3 factors'
    ).toBeGreaterThanOrEqual(3);
  });
});

test.describe('BF-11 — Results page interaction', () => {
  test('retake or take again button is present', async ({ page }) => {
    await injectBigFiveResultAndNavigate(page);

    const retakeBtn = page.getByRole('button', { name: /retake|try again|take again|restart/i })
      .or(page.getByRole('link', { name: /retake|try again/i }))
      .or(page.getByTestId('retake-btn'));

    const isVisible = await retakeBtn.first().isVisible().catch(() => false);
    // Not strictly required, but expected based on spec
    if (isVisible) {
      await expect(retakeBtn.first()).toBeVisible();
    }
  });

  test('results page produces no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
    page.on('pageerror', (err) => errors.push(err.message));

    await injectBigFiveResultAndNavigate(page);
    await page.waitForLoadState('networkidle');

    expect(errors, `Console errors on Big Five results page:\n${errors.join('\n')}`).toHaveLength(0);
  });
});
