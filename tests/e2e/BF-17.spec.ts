/**
 * BF-17: Accessibility — Big Five Pages (INV-17)
 *
 * Verifier: auto (Playwright + @axe-core/playwright)
 * Claim: /bigfive, /bigfive/quiz, and /bigfive/results all pass axe-core accessibility
 *        audit with no critical or serious violations.
 *
 * These tests FAIL until Big Five pages are implemented and @axe-core/playwright is installed.
 * Install: npm install -D @axe-core/playwright
 */

import { test, expect, Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const BASE_URL = process.env.APP_URL ?? 'http://localhost:5173';

// ---------------------------------------------------------------------------
// Mock result for results page
// ---------------------------------------------------------------------------

const MOCK_BF_RESULT = {
  id: 'bf-a11y-test',
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

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type AxeResults = Awaited<ReturnType<AxeBuilder['analyze']>>;

function criticalViolations(results: AxeResults) {
  return results.violations.filter(
    (v) => v.impact === 'critical' || v.impact === 'serious'
  );
}

function summarizeViolations(results: AxeResults): string {
  return results.violations
    .map((v) => `[${v.impact}] ${v.id}: ${v.description} (${v.nodes.length} node(s))`)
    .join('\n');
}

async function injectBigFiveResult(page: Page): Promise<void> {
  await page.evaluate((result) => {
    localStorage.setItem('tryprism_bigfive_results', JSON.stringify([result]));
    localStorage.setItem('tryprism_bigfive_latest', JSON.stringify(result));
    localStorage.setItem('bigfive_latest_result', JSON.stringify(result));
  }, MOCK_BF_RESULT);
}

// ---------------------------------------------------------------------------
// Tests: /bigfive home page
// ---------------------------------------------------------------------------

test.describe('BF-17 — Accessibility: /bigfive', () => {
  test('/bigfive has zero critical/serious accessibility violations', async ({ page }) => {
    await page.goto(`${BASE_URL}/bigfive`);
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    const critical = criticalViolations(results);
    expect(
      critical,
      `Critical/serious WCAG violations on /bigfive:\n${summarizeViolations({ ...results, violations: critical })}`
    ).toHaveLength(0);
  });

  test('/bigfive has zero total WCAG 2.1 AA violations', async ({ page }) => {
    await page.goto(`${BASE_URL}/bigfive`);
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    expect(
      results.violations,
      `WCAG violations on /bigfive:\n${summarizeViolations(results)}`
    ).toHaveLength(0);
  });

  test('/bigfive has exactly one h1 heading', async ({ page }) => {
    await page.goto(`${BASE_URL}/bigfive`);
    const h1Count = await page.locator('h1').count();
    expect(h1Count, 'Expected exactly one <h1> on /bigfive').toBe(1);
  });

  test('/bigfive has a main landmark', async ({ page }) => {
    await page.goto(`${BASE_URL}/bigfive`);
    const mainCount = await page.locator('main, [role="main"]').count();
    expect(mainCount, 'No <main> landmark found on /bigfive').toBeGreaterThanOrEqual(1);
  });
});

// ---------------------------------------------------------------------------
// Tests: /bigfive/quiz page
// ---------------------------------------------------------------------------

test.describe('BF-17 — Accessibility: /bigfive/quiz', () => {
  test('/bigfive/quiz has zero critical/serious accessibility violations', async ({ page }) => {
    await page.goto(`${BASE_URL}/bigfive/quiz?mode=quick`);
    await page.waitForLoadState('networkidle');
    await page.waitForSelector(
      '[data-testid="question-text"], .question-text, [role="radio"]',
      { timeout: 8000 }
    ).catch(() => {});

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    const critical = criticalViolations(results);
    expect(
      critical,
      `Critical/serious WCAG violations on /bigfive/quiz:\n${summarizeViolations({ ...results, violations: critical })}`
    ).toHaveLength(0);
  });

  test('/bigfive/quiz has zero total WCAG 2.1 AA violations', async ({ page }) => {
    await page.goto(`${BASE_URL}/bigfive/quiz?mode=quick`);
    await page.waitForLoadState('networkidle');
    await page.waitForSelector(
      '[data-testid="question-text"], .question-text, [role="radio"]',
      { timeout: 8000 }
    ).catch(() => {});

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    expect(
      results.violations,
      `WCAG violations on /bigfive/quiz:\n${summarizeViolations(results)}`
    ).toHaveLength(0);
  });

  test('Likert options on /bigfive/quiz have associated labels', async ({ page }) => {
    await page.goto(`${BASE_URL}/bigfive/quiz?mode=quick`);
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('[role="radio"], [data-testid="likert-option"]', { timeout: 8000 }).catch(() => {});

    const results = await new AxeBuilder({ page })
      .withRules(['label', 'radiogroup'])
      .analyze();

    expect(
      results.violations,
      `Form label violations on quiz:\n${summarizeViolations(results)}`
    ).toHaveLength(0);
  });

  test('quiz page passes color-contrast check', async ({ page }) => {
    await page.goto(`${BASE_URL}/bigfive/quiz?mode=quick`);
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withRules(['color-contrast'])
      .analyze();

    expect(
      results.violations,
      `Color contrast failures on /bigfive/quiz:\n${summarizeViolations(results)}`
    ).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// Tests: /bigfive/results page
// ---------------------------------------------------------------------------

test.describe('BF-17 — Accessibility: /bigfive/results', () => {
  test('/bigfive/results has zero critical/serious accessibility violations', async ({ page }) => {
    await page.goto(BASE_URL);
    await injectBigFiveResult(page);
    await page.goto(`${BASE_URL}/bigfive/results`);
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    const critical = criticalViolations(results);
    expect(
      critical,
      `Critical/serious WCAG violations on /bigfive/results:\n${summarizeViolations({ ...results, violations: critical })}`
    ).toHaveLength(0);
  });

  test('/bigfive/results has zero total WCAG 2.1 AA violations', async ({ page }) => {
    await page.goto(BASE_URL);
    await injectBigFiveResult(page);
    await page.goto(`${BASE_URL}/bigfive/results`);
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    expect(
      results.violations,
      `WCAG violations on /bigfive/results:\n${summarizeViolations(results)}`
    ).toHaveLength(0);
  });

  test('/bigfive/results passes color-contrast check', async ({ page }) => {
    await page.goto(BASE_URL);
    await injectBigFiveResult(page);
    await page.goto(`${BASE_URL}/bigfive/results`);
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withRules(['color-contrast'])
      .analyze();

    expect(
      results.violations,
      `Color contrast failures on /bigfive/results:\n${summarizeViolations(results)}`
    ).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// Keyboard navigation on Big Five quiz
// ---------------------------------------------------------------------------

test.describe('BF-17 — Keyboard navigation on /bigfive/quiz', () => {
  test('Likert options are navigable by keyboard', async ({ page }) => {
    await page.goto(`${BASE_URL}/bigfive/quiz?mode=quick`);
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('[role="radio"], [data-testid="likert-option"]', { timeout: 8000 }).catch(() => {});

    const firstOption = page.getByRole('radio').first()
      .or(page.locator('[data-testid="likert-option"]').first());

    await firstOption.first().focus();
    await expect(firstOption.first(), 'First Likert option should be focusable').toBeFocused({ timeout: 3000 });
  });

  test('theme toggle on /bigfive is keyboard accessible', async ({ page }) => {
    await page.goto(`${BASE_URL}/bigfive`);
    await page.waitForLoadState('networkidle');

    const themeToggle = page.getByTestId('theme-toggle')
      .or(page.getByRole('button', { name: /dark|light|theme/i }));

    await themeToggle.first().focus();
    await expect(themeToggle.first()).toBeFocused({ timeout: 3000 });
  });
});
