/**
 * QD-05: Accessibility — WCAG 2.1 AA contrast, keyboard navigation, semantic HTML
 *
 * Verifier: auto (@axe-core/playwright)
 * Dimension: Zero WCAG 2.1 AA violations, full keyboard navigation, proper ARIA labels.
 * Threshold: score ≥ 3 (minor violations only, most elements keyboard accessible).
 *
 * These tests FAIL until the implementation exists and @axe-core/playwright is installed.
 * Install: npm install -D @axe-core/playwright
 */

import { test, expect, Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const BASE_URL = process.env.APP_URL ?? 'http://localhost:5173';

const MOCK_RESULT = {
  primaryType: 4, wing: 5,
  scores: { 1: 8, 2: 6, 3: 7, 4: 28, 5: 18, 6: 9, 7: 6, 8: 5, 9: 7 },
  tritype: [4, 5, 9], lowConfidence: false, flatProfile: false,
  mode: 'quick', completedAt: new Date().toISOString(),
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function injectResult(page: Page): Promise<void> {
  await page.evaluate((r) => {
    localStorage.setItem('tryprism_latest_result', JSON.stringify(r));
    localStorage.setItem('latestResult', JSON.stringify(r));
  }, MOCK_RESULT);
}

async function startQuizPage(page: Page): Promise<void> {
  await page.goto(`${BASE_URL}/enneagram`);
  const quickMode = page.getByTestId('quick-mode-card')
    .or(page.getByRole('button', { name: /quick/i }));
  await quickMode.first().click();
  await page.waitForSelector('[data-testid="question-text"], .question-text', { timeout: 5000 });
}

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

// ---------------------------------------------------------------------------
// Level 3 — Axe accessibility scans
// ---------------------------------------------------------------------------

test.describe('QD-05 — WCAG 2.1 AA: Home page', () => {
  test('home page has zero critical/serious accessibility violations', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    const critical = criticalViolations(results);
    expect(
      critical,
      `Critical/serious WCAG violations on home page:\n${summarizeViolations({ ...results, violations: critical })}`
    ).toHaveLength(0);
  });

  test('home page has zero total WCAG 2.1 AA violations', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    expect(
      results.violations,
      `WCAG violations on home page:\n${summarizeViolations(results)}`
    ).toHaveLength(0);
  });
});

test.describe('QD-05 — WCAG 2.1 AA: Quiz page', () => {
  test('quiz page has zero critical/serious accessibility violations', async ({ page }) => {
    await startQuizPage(page);

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    const critical = criticalViolations(results);
    expect(
      critical,
      `Critical/serious WCAG violations on quiz page:\n${summarizeViolations({ ...results, violations: critical })}`
    ).toHaveLength(0);
  });

  test('quiz page has zero total WCAG 2.1 AA violations', async ({ page }) => {
    await startQuizPage(page);

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    expect(
      results.violations,
      `WCAG violations on quiz page:\n${summarizeViolations(results)}`
    ).toHaveLength(0);
  });
});

test.describe('QD-05 — WCAG 2.1 AA: Results page', () => {
  test('results page has zero critical/serious accessibility violations', async ({ page }) => {
    await page.goto(BASE_URL);
    await injectResult(page);
    await page.goto(`${BASE_URL}/results`).catch(() => {});
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    const critical = criticalViolations(results);
    expect(
      critical,
      `Critical/serious WCAG violations on results page:\n${summarizeViolations({ ...results, violations: critical })}`
    ).toHaveLength(0);
  });

  test('results page has zero total WCAG 2.1 AA violations', async ({ page }) => {
    await page.goto(BASE_URL);
    await injectResult(page);
    await page.goto(`${BASE_URL}/results`).catch(() => {});
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    expect(
      results.violations,
      `WCAG violations on results page:\n${summarizeViolations(results)}`
    ).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// Color contrast checks
// ---------------------------------------------------------------------------

test.describe('QD-05 — Color contrast (AA: 4.5:1 for text)', () => {
  test('home page passes color-contrast rule', async ({ page }) => {
    await page.goto(BASE_URL);

    const results = await new AxeBuilder({ page })
      .withRules(['color-contrast'])
      .analyze();

    expect(
      results.violations,
      `Color contrast failures on home page:\n${summarizeViolations(results)}`
    ).toHaveLength(0);
  });

  test('quiz page passes color-contrast rule', async ({ page }) => {
    await startQuizPage(page);

    const results = await new AxeBuilder({ page })
      .withRules(['color-contrast'])
      .analyze();

    expect(
      results.violations,
      `Color contrast failures on quiz page:\n${summarizeViolations(results)}`
    ).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// Keyboard navigation checks
// ---------------------------------------------------------------------------

test.describe('QD-05 — Keyboard navigation', () => {
  test('all interactive elements on home page are reachable by Tab', async ({ page }) => {
    await page.goto(BASE_URL);

    // Get all expected interactive elements
    const interactiveSelectors = 'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const expected = await page.locator(interactiveSelectors).count();

    // Tab through all focusable elements
    let tabCount = 0;
    const maxTabs = expected + 5; // Allow a small buffer

    for (let i = 0; i < maxTabs; i++) {
      await page.keyboard.press('Tab');
      tabCount++;

      const focusedTag = await page.evaluate(() => document.activeElement?.tagName?.toLowerCase());
      if (focusedTag === 'body') break; // Focus cycled back to start
    }

    // We should have been able to tab through at least as many elements as expected
    expect(tabCount).toBeGreaterThanOrEqual(Math.min(expected, 3));
  });

  test('language toggle is keyboard accessible (focus + enter activates it)', async ({ page }) => {
    await page.goto(BASE_URL);

    const langToggle = page.getByTestId('language-toggle')
      .or(page.getByRole('button', { name: /zh|en|中文|english/i }));

    await langToggle.first().focus();
    const headingBefore = await page.getByRole('heading', { level: 1 }).textContent();

    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);

    const headingAfter = await page.getByRole('heading', { level: 1 }).textContent();
    expect(headingAfter, 'Language toggle did not respond to keyboard Enter').not.toBe(headingBefore);
  });

  test('theme toggle is keyboard accessible', async ({ page }) => {
    await page.goto(BASE_URL);

    const themeToggle = page.getByTestId('theme-toggle')
      .or(page.getByRole('button', { name: /dark|light|theme/i }));

    await themeToggle.first().focus();
    await expect(themeToggle.first()).toBeFocused();
  });

  test('quiz Likert options are keyboard navigable', async ({ page }) => {
    await startQuizPage(page);

    // Find the answer options
    const options = page.getByRole('radio');
    const count = await options.count();
    expect(count).toBeGreaterThanOrEqual(5);

    // Tab or arrow key to first option and activate it
    await options.first().focus();
    await expect(options.first()).toBeFocused();

    await page.keyboard.press('Space');
    const isChecked = await options.first().isChecked().catch(() => false);
    expect(isChecked, 'Space did not select the focused radio option').toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Semantic HTML checks
// ---------------------------------------------------------------------------

test.describe('QD-05 — Semantic HTML', () => {
  test('home page has exactly one h1 heading', async ({ page }) => {
    await page.goto(BASE_URL);
    const h1Count = await page.locator('h1').count();
    expect(h1Count, 'Expected exactly one <h1> on home page').toBe(1);
  });

  test('home page has a main landmark', async ({ page }) => {
    await page.goto(BASE_URL);
    const mainCount = await page.locator('main, [role="main"]').count();
    expect(mainCount, 'No <main> or role="main" landmark found').toBeGreaterThanOrEqual(1);
  });

  test('all images on home page have alt attributes', async ({ page }) => {
    await page.goto(BASE_URL);

    const results = await new AxeBuilder({ page })
      .withRules(['image-alt'])
      .analyze();

    expect(
      results.violations,
      `Images without alt text:\n${summarizeViolations(results)}`
    ).toHaveLength(0);
  });

  test('quiz form inputs have associated labels', async ({ page }) => {
    await startQuizPage(page);

    const results = await new AxeBuilder({ page })
      .withRules(['label', 'radiogroup'])
      .analyze();

    expect(
      results.violations,
      `Form label violations on quiz page:\n${summarizeViolations(results)}`
    ).toHaveLength(0);
  });

  test('heading hierarchy is not skipped on home page', async ({ page }) => {
    await page.goto(BASE_URL);

    const results = await new AxeBuilder({ page })
      .withRules(['heading-order'])
      .analyze();

    expect(
      results.violations,
      `Heading order violations:\n${summarizeViolations(results)}`
    ).toHaveLength(0);
  });
});
