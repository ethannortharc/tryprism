/**
 * BF-18: Routes (INV-18)
 *
 * Verifier: auto (Playwright)
 * Claim: All three Big Five routes exist and render the correct components:
 *   /bigfive          → BigFiveHome (mode selection)
 *   /bigfive/quiz     → BigFiveQuiz (quiz interface)
 *   /bigfive/results  → BigFiveResults (results display)
 *
 * These tests FAIL until all three routes are added to the app router.
 */

import { test, expect, Page } from '@playwright/test';

const BASE_URL = process.env.APP_URL ?? 'http://localhost:5173';

// ---------------------------------------------------------------------------
// Mock result for results route
// ---------------------------------------------------------------------------

const MOCK_BF_RESULT = {
  id: 'bf-routes-test',
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
    localStorage.setItem('tryprism_bigfive_results', JSON.stringify([result]));
    localStorage.setItem('tryprism_bigfive_latest', JSON.stringify(result));
    localStorage.setItem('bigfive_latest_result', JSON.stringify(result));
  }, MOCK_BF_RESULT);
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test.describe('BF-18 — /bigfive route', () => {
  test('/bigfive renders (HTTP status < 400)', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/bigfive`);
    expect(response?.status(), '/bigfive returned an error status').toBeLessThan(400);
  });

  test('/bigfive renders a page (not a 404 message)', async ({ page }) => {
    await page.goto(`${BASE_URL}/bigfive`);
    await page.waitForLoadState('networkidle');

    // Should NOT show a 404 or "not found" message
    const notFoundText = await page.getByText(/404|not found|page not found/i).isVisible().catch(() => false);
    expect(notFoundText, '/bigfive shows a 404 message').toBe(false);

    // Should show some content
    const heading = page.getByRole('heading').first();
    await expect(heading, '/bigfive should have at least one heading').toBeVisible({ timeout: 5000 });
  });

  test('/bigfive renders the BigFiveHome component (mode selection)', async ({ page }) => {
    await page.goto(`${BASE_URL}/bigfive`);
    await page.waitForLoadState('networkidle');

    // The home page should show mode selection cards
    const quickOption = page.getByTestId('quick-mode-card')
      .or(page.getByRole('button', { name: /quick/i }))
      .or(page.getByText(/50 questions/i).first())
      .or(page.getByText(/quick/i).first());

    await expect(
      quickOption.first(),
      '/bigfive should show the Quick mode option (BigFiveHome component)'
    ).toBeVisible({ timeout: 5000 });
  });

  test('/bigfive does not render quiz questions', async ({ page }) => {
    await page.goto(`${BASE_URL}/bigfive`);
    await page.waitForLoadState('networkidle');

    // A Likert scale should NOT be present on the home page
    const likertOption = page.getByRole('radio').first();
    const isLikertVisible = await likertOption.isVisible().catch(() => false);
    expect(isLikertVisible, '/bigfive should not show Likert quiz options').toBe(false);
  });
});

test.describe('BF-18 — /bigfive/quiz route', () => {
  test('/bigfive/quiz?mode=quick renders (HTTP status < 400)', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/bigfive/quiz?mode=quick`);
    expect(response?.status(), '/bigfive/quiz returned an error status').toBeLessThan(400);
  });

  test('/bigfive/quiz?mode=quick renders the quiz page (not a 404)', async ({ page }) => {
    await page.goto(`${BASE_URL}/bigfive/quiz?mode=quick`);
    await page.waitForLoadState('networkidle');

    const notFoundText = await page.getByText(/404|not found|page not found/i).isVisible().catch(() => false);
    expect(notFoundText, '/bigfive/quiz shows a 404 message').toBe(false);
  });

  test('/bigfive/quiz renders the BigFiveQuiz component (shows question)', async ({ page }) => {
    await page.goto(`${BASE_URL}/bigfive/quiz?mode=quick`);
    await page.waitForLoadState('networkidle');
    await page.waitForSelector(
      '[data-testid="question-text"], .question-text, [role="radio"], [data-testid="likert-option"]',
      { timeout: 8000 }
    ).catch(() => {});

    const questionText = page.getByTestId('question-text')
      .or(page.locator('.question-text').first())
      .or(page.getByRole('radio').first());

    await expect(
      questionText.first(),
      '/bigfive/quiz should show a question or Likert options (BigFiveQuiz component)'
    ).toBeVisible({ timeout: 8000 });
  });

  test('/bigfive/quiz?mode=full also renders correctly', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/bigfive/quiz?mode=full`);
    expect(response?.status()).toBeLessThan(400);

    await page.waitForLoadState('networkidle');

    const notFoundText = await page.getByText(/404|not found/i).isVisible().catch(() => false);
    expect(notFoundText, '/bigfive/quiz?mode=full shows a 404').toBe(false);
  });
});

test.describe('BF-18 — /bigfive/results route', () => {
  test('/bigfive/results renders (HTTP status < 400)', async ({ page }) => {
    await page.goto(BASE_URL);
    await injectBigFiveResult(page);
    const response = await page.goto(`${BASE_URL}/bigfive/results`);
    expect(response?.status(), '/bigfive/results returned an error status').toBeLessThan(400);
  });

  test('/bigfive/results does not show 404', async ({ page }) => {
    await page.goto(BASE_URL);
    await injectBigFiveResult(page);
    await page.goto(`${BASE_URL}/bigfive/results`);
    await page.waitForLoadState('networkidle');

    const notFoundText = await page.getByText(/404|not found|page not found/i).isVisible().catch(() => false);
    expect(notFoundText, '/bigfive/results shows a 404 message').toBe(false);
  });

  test('/bigfive/results renders the BigFiveResults component', async ({ page }) => {
    await page.goto(BASE_URL);
    await injectBigFiveResult(page);
    await page.goto(`${BASE_URL}/bigfive/results`);
    await page.waitForLoadState('networkidle');

    // Results page should show factor names or score content
    const resultsContent = page.getByText(/openness|conscientiousness|extraversion|agreeableness|neuroticism|big five|ocean/i).first()
      .or(page.locator('[data-testid="results-page"], .results-page, [data-testid*="factor"]').first());

    await expect(
      resultsContent.first(),
      '/bigfive/results should show factor names or scores (BigFiveResults component)'
    ).toBeVisible({ timeout: 8000 });
  });

  test('/bigfive/results without data redirects or shows graceful fallback', async ({ page }) => {
    // Clear any stored results
    await page.goto(BASE_URL);
    await page.evaluate(() => {
      localStorage.removeItem('tryprism_bigfive_results');
      localStorage.removeItem('tryprism_bigfive_latest');
      localStorage.removeItem('bigfive_latest_result');
    });

    await page.goto(`${BASE_URL}/bigfive/results`);
    await page.waitForLoadState('networkidle');

    const url = page.url();
    const notFoundText = await page.getByText(/404|not found/i).isVisible().catch(() => false);

    // Either redirected away (graceful), or shows a "no results" message, or stays on results page
    // The key is: no crash and no 404
    expect(notFoundText, 'Should not show 404 when navigating to /bigfive/results without data').toBe(false);
  });
});

test.describe('BF-18 — All Big Five routes produce no console errors', () => {
  test('/bigfive produces no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
    page.on('pageerror', (err) => errors.push(err.message));

    await page.goto(`${BASE_URL}/bigfive`);
    await page.waitForLoadState('networkidle');

    expect(errors, `Console errors on /bigfive:\n${errors.join('\n')}`).toHaveLength(0);
  });

  test('/bigfive/quiz produces no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
    page.on('pageerror', (err) => errors.push(err.message));

    await page.goto(`${BASE_URL}/bigfive/quiz?mode=quick`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000); // Let quiz initialize

    expect(errors, `Console errors on /bigfive/quiz:\n${errors.join('\n')}`).toHaveLength(0);
  });

  test('/bigfive/results produces no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
    page.on('pageerror', (err) => errors.push(err.message));

    await page.goto(BASE_URL);
    await injectBigFiveResult(page);
    await page.goto(`${BASE_URL}/bigfive/results`);
    await page.waitForLoadState('networkidle');

    expect(errors, `Console errors on /bigfive/results:\n${errors.join('\n')}`).toHaveLength(0);
  });
});
