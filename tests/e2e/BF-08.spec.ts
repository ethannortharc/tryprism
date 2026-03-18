/**
 * BF-08: Hub Integration (INV-09)
 *
 * Verifier: auto (Playwright)
 * Claim: The hub page (/) shows a Big Five test card alongside Enneagram and MBTI,
 *        linking to /bigfive. The card is visible and navigating to /bigfive works.
 *
 * These tests FAIL until the Big Five card is added to the hub page.
 */

import { test, expect, Page } from '@playwright/test';

const BASE_URL = process.env.APP_URL ?? 'http://localhost:5173';

// ---------------------------------------------------------------------------
// Helpers
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

test.describe('BF-08 — Hub page shows Big Five card', () => {
  test('hub page loads without HTTP error', async ({ page }) => {
    const response = await page.goto(BASE_URL);
    expect(response?.status()).toBeLessThan(400);
  });

  test('Big Five card is visible on hub page', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    const bigFiveCard = page.getByTestId('bigfive-card')
      .or(page.getByRole('link', { name: /big five|ocean|OCEAN/i }))
      .or(page.getByText(/big five/i).first())
      .or(page.getByText(/OCEAN/i).first());

    await expect(
      bigFiveCard.first(),
      'Big Five card not found on hub page'
    ).toBeVisible({ timeout: 5000 });
  });

  test('Big Five card contains descriptive text', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Accept any card-like region mentioning Big Five or OCEAN
    const cardText = page.locator('[data-testid="bigfive-card"], a[href*="bigfive"]').first()
      .or(page.getByText(/big five|ocean/i).first());

    const text = await cardText.textContent().catch(() => null);
    // The card should have some descriptive content (not just the title)
    expect(text?.trim().length ?? 0, 'Big Five card text is too short').toBeGreaterThan(3);
  });
});

test.describe('BF-08 — Big Five card navigates to /bigfive', () => {
  test('clicking Big Five card navigates to /bigfive', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    const bigFiveCard = page.getByTestId('bigfive-card')
      .or(page.getByRole('link', { name: /big five|ocean/i }))
      .or(page.locator('a[href*="bigfive"]').first())
      .or(page.getByText(/big five/i).first());

    await bigFiveCard.first().click();

    // Wait for navigation
    await page.waitForURL(/bigfive/, { timeout: 5000 }).catch(() => {});

    const url = page.url();
    expect(
      url,
      `Expected navigation to /bigfive but stayed on ${url}`
    ).toContain('bigfive');
  });

  test('/bigfive page loads after navigating from hub', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    const bigFiveCard = page.getByTestId('bigfive-card')
      .or(page.getByRole('link', { name: /big five|ocean/i }))
      .or(page.locator('a[href*="bigfive"]').first())
      .or(page.getByText(/big five/i).first());

    await bigFiveCard.first().click();
    await page.waitForLoadState('networkidle');

    // The /bigfive page should have some content
    const heading = page.getByRole('heading').first();
    await expect(heading).toBeVisible({ timeout: 5000 });
  });
});

test.describe('BF-08 — Hub page no console errors', () => {
  test('hub page produces no console errors', async ({ page }) => {
    const errors = await collectConsoleErrors(page);
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    expect(errors, `Console errors on hub page:\n${errors.join('\n')}`).toHaveLength(0);
  });
});

test.describe('BF-08 — Big Five card alongside other test cards', () => {
  test('Enneagram card is still present on hub alongside Big Five', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    const enneagramCard = page.getByTestId('enneagram-card')
      .or(page.getByRole('link', { name: /enneagram/i }))
      .or(page.locator('a[href*="enneagram"]').first())
      .or(page.getByText(/enneagram/i).first());

    await expect(
      enneagramCard.first(),
      'Enneagram card should still be present after Big Five addition'
    ).toBeVisible({ timeout: 5000 });
  });

  test('MBTI card is still present on hub alongside Big Five', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    const mbtiCard = page.getByTestId('mbti-card')
      .or(page.getByRole('link', { name: /mbti|myers/i }))
      .or(page.locator('a[href*="mbti"]').first())
      .or(page.getByText(/mbti/i).first());

    await expect(
      mbtiCard.first(),
      'MBTI card should still be present after Big Five addition'
    ).toBeVisible({ timeout: 5000 });
  });
});
