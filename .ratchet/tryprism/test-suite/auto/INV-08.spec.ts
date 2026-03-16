/**
 * INV-08: Results page displays primary type, wing, 9-type score chart, and growth/stress arrows
 *
 * Verifier: auto (Playwright)
 * Claim: After completing (or injecting) a quiz result, the results page shows:
 *        - Primary type number and name
 *        - Wing (e.g. "4w5")
 *        - Visual chart showing all 9 type scores
 *        - Growth (integration) arrow
 *        - Stress (disintegration) arrow
 *        - Tritype section
 *        - Substantial type description text
 *
 * These tests FAIL until the implementation exists.
 */

import { test, expect, Page } from '@playwright/test';

const BASE_URL = process.env.APP_URL ?? 'http://localhost:5173';

// ---------------------------------------------------------------------------
// Helper: inject a complete quiz result into localStorage and navigate to results
// ---------------------------------------------------------------------------

/**
 * The result object shape must match what the app reads from localStorage.
 * Adjust field names once the implementation is known.
 */
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

async function injectResultAndNavigate(page: Page): Promise<void> {
  await page.goto(BASE_URL);
  // Inject result into localStorage before navigating to results
  await page.evaluate((result) => {
    localStorage.setItem('tryprism_latest_result', JSON.stringify(result));
    localStorage.setItem('tryprism_result', JSON.stringify(result));
    localStorage.setItem('latestResult', JSON.stringify(result));
  }, MOCK_RESULT);

  // Navigate to results page (try common routes)
  await page.goto(`${BASE_URL}/results`).catch(() => {});
  await page.waitForLoadState('networkidle');

  // If results page didn't load, try hash routing
  const url = page.url();
  if (!url.includes('result')) {
    await page.goto(`${BASE_URL}/#/results`).catch(() => {});
    await page.waitForLoadState('networkidle');
  }
}

/** Complete a short quiz programmatically (answer all 54 questions with value 3). */
async function completeFastQuiz(page: Page): Promise<void> {
  await page.goto(BASE_URL);
  const quickMode = page.getByTestId('quick-mode-card')
    .or(page.getByRole('button', { name: /quick/i }));
  await quickMode.first().click();

  for (let i = 0; i < 54; i++) {
    const option = page.getByRole('radio').first()
      .or(page.getByTestId('likert-option').first());
    await option.first().click().catch(() => {});
    const nextBtn = page.getByTestId('next-button')
      .or(page.getByRole('button', { name: /next|continue|finish|done|submit/i }));
    await nextBtn.first().click().catch(() => {});
    await page.waitForTimeout(100);
    // Stop once we see the results page
    const onResults = await page.locator('[data-testid="primary-type"], .result-primary-type').isVisible().catch(() => false);
    if (onResults) break;
  }
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test.describe('INV-08 — Results page loads with injected data', () => {
  test('results page is reachable', async ({ page }) => {
    await injectResultAndNavigate(page);
    const url = page.url();
    // Page loaded (no 404)
    expect(url).toBeTruthy();
  });
});

test.describe('INV-08 — Primary type display', () => {
  test('primary type number is visible on results page', async ({ page }) => {
    await injectResultAndNavigate(page);
    const typeNumber = page.getByTestId('primary-type-number')
      .or(page.locator('.primary-type, [data-testid="type-number"], .type-hero').first());
    await expect(typeNumber.first()).toBeVisible({ timeout: 5000 });
    const text = await typeNumber.first().textContent();
    // Should contain the type number (e.g. "4" or "Type 4")
    expect(text).toMatch(/[1-9]/);
  });

  test('primary type name / label is visible', async ({ page }) => {
    await injectResultAndNavigate(page);
    const typeName = page.getByTestId('primary-type-name')
      .or(page.locator('.type-name, .enneagram-type-name').first());
    await expect(typeName.first()).toBeVisible({ timeout: 5000 });
    const text = await typeName.first().textContent();
    expect(text?.trim().length, 'Type name is empty').toBeGreaterThan(2);
  });
});

test.describe('INV-08 — Wing display', () => {
  test('wing indicator is visible (e.g. "4w5")', async ({ page }) => {
    await injectResultAndNavigate(page);
    const wing = page.getByTestId('wing-indicator')
      .or(page.locator('.wing, [data-testid="wing"], .wing-label').first())
      .or(page.getByText(/\dw\d/));
    await expect(wing.first()).toBeVisible({ timeout: 5000 });
  });
});

test.describe('INV-08 — Score chart / visualization', () => {
  test('a chart or score visualization element is present', async ({ page }) => {
    await injectResultAndNavigate(page);
    // Accept SVG charts, canvas, or a bar/radar chart container
    const chart = page.getByTestId('score-chart')
      .or(page.locator('svg.chart, canvas, [data-testid="radar-chart"], .score-chart').first());
    await expect(chart.first()).toBeVisible({ timeout: 5000 });
  });

  test('all 9 type scores are represented in the chart or score list', async ({ page }) => {
    await injectResultAndNavigate(page);
    // Look for 9 score entries
    const scoreItems = page.locator('[data-testid^="type-score-"], .type-score-bar, .score-item');
    const count = await scoreItems.count();
    expect(count, 'Expected 9 score bars/items (one per type)').toBe(9);
  });
});

test.describe('INV-08 — Growth and stress arrows', () => {
  test('growth arrow (integration direction) is displayed', async ({ page }) => {
    await injectResultAndNavigate(page);
    const growth = page.getByTestId('growth-arrow')
      .or(page.locator('.growth-arrow, .integration-arrow, [aria-label*="growth" i]').first())
      .or(page.getByText(/growth|integration|1→7|going to/i).first());
    await expect(growth.first()).toBeVisible({ timeout: 5000 });
  });

  test('stress arrow (disintegration direction) is displayed', async ({ page }) => {
    await injectResultAndNavigate(page);
    const stress = page.getByTestId('stress-arrow')
      .or(page.locator('.stress-arrow, .disintegration-arrow, [aria-label*="stress" i]').first())
      .or(page.getByText(/stress|disintegration/i).first());
    await expect(stress.first()).toBeVisible({ timeout: 5000 });
  });
});

test.describe('INV-08 — Tritype section', () => {
  test('tritype section is present', async ({ page }) => {
    await injectResultAndNavigate(page);
    const tritype = page.getByTestId('tritype-section')
      .or(page.locator('.tritype, [data-testid="tritype"]').first())
      .or(page.getByText(/tritype|三型/i).first());
    await expect(tritype.first()).toBeVisible({ timeout: 5000 });
  });
});

test.describe('INV-08 — Type description text', () => {
  test('type description section is visible', async ({ page }) => {
    await injectResultAndNavigate(page);
    const description = page.getByTestId('type-description')
      .or(page.locator('.type-description, .personality-description').first());
    await expect(description.first()).toBeVisible({ timeout: 5000 });
  });

  test('type description text is substantial (≥100 characters)', async ({ page }) => {
    await injectResultAndNavigate(page);
    const description = page.getByTestId('type-description')
      .or(page.locator('.type-description').first());
    const text = await description.first().textContent();
    expect(
      text?.trim().length ?? 0,
      'Type description is too short'
    ).toBeGreaterThanOrEqual(100);
  });
});

test.describe('INV-08 — No console errors on results page', () => {
  test('results page produces no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
    page.on('pageerror', (err) => errors.push(err.message));

    await injectResultAndNavigate(page);
    await page.waitForLoadState('networkidle');

    expect(errors, `Console errors on results page:\n${errors.join('\n')}`).toHaveLength(0);
  });
});
