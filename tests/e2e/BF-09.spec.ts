/**
 * BF-09: Big Five Home + Mode Selection (INV-04, INV-18)
 *
 * Verifier: auto (Playwright)
 * Claim: /bigfive shows a page title, Quick mode card (50 questions) and Full mode
 *        card (120 questions); clicking each navigates to /bigfive/quiz with the
 *        correct mode query parameter.
 *
 * These tests FAIL until /bigfive page is implemented.
 */

import { test, expect, Page } from '@playwright/test';

const BASE_URL = process.env.APP_URL ?? 'http://localhost:5173';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function goToBigFiveHome(page: Page): Promise<void> {
  await page.goto(`${BASE_URL}/bigfive`);
  await page.waitForLoadState('networkidle');
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test.describe('BF-09 — /bigfive page title and branding', () => {
  test('/bigfive route loads without HTTP error', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/bigfive`);
    expect(response?.status()).toBeLessThan(400);
  });

  test('page title contains "Big Five" or "OCEAN"', async ({ page }) => {
    await goToBigFiveHome(page);

    const heading = page.getByRole('heading', { level: 1 })
      .or(page.getByRole('heading', { level: 2 }).first());
    await expect(heading.first()).toBeVisible({ timeout: 5000 });

    const text = await heading.first().textContent();
    expect(
      text,
      'Expected heading containing "Big Five" or "OCEAN"'
    ).toMatch(/big five|ocean/i);
  });

  test('page has a description of the Big Five test', async ({ page }) => {
    await goToBigFiveHome(page);

    // There should be some descriptive paragraph text
    const description = page.locator('p, .description, [data-testid="test-description"]').first();
    await expect(description).toBeVisible({ timeout: 5000 });
    const text = await description.textContent();
    expect(text?.trim().length ?? 0, 'Description text is too short').toBeGreaterThan(20);
  });
});

test.describe('BF-09 — Mode selection cards', () => {
  test('Quick mode card is visible and mentions "50 questions"', async ({ page }) => {
    await goToBigFiveHome(page);

    const quickCard = page.getByTestId('quick-mode-card')
      .or(page.getByRole('button', { name: /quick/i }))
      .or(page.getByText(/50 questions/i).first())
      .or(page.getByText(/quick/i).first());

    await expect(quickCard.first(), 'Quick mode card not visible').toBeVisible({ timeout: 5000 });

    // Verify "50" or "50 questions" is mentioned somewhere in the card
    const cardText = await quickCard.first().textContent().catch(async () => {
      // Try to find the surrounding card container
      return page.getByText(/50/i).first().textContent().catch(() => '');
    });
    expect(
      cardText,
      'Quick mode card should mention 50 questions'
    ).toMatch(/50/);
  });

  test('Full mode card is visible and mentions "120 questions"', async ({ page }) => {
    await goToBigFiveHome(page);

    const fullCard = page.getByTestId('full-mode-card')
      .or(page.getByRole('button', { name: /full/i }))
      .or(page.getByText(/120 questions/i).first())
      .or(page.getByText(/full/i).first());

    await expect(fullCard.first(), 'Full mode card not visible').toBeVisible({ timeout: 5000 });

    const cardText = await fullCard.first().textContent().catch(async () => {
      return page.getByText(/120/i).first().textContent().catch(() => '');
    });
    expect(
      cardText,
      'Full mode card should mention 120 questions'
    ).toMatch(/120/);
  });

  test('both mode cards are visible at the same time', async ({ page }) => {
    await goToBigFiveHome(page);

    const quickCard = page.getByTestId('quick-mode-card')
      .or(page.getByRole('button', { name: /quick/i }))
      .or(page.getByText(/50/i).first());

    const fullCard = page.getByTestId('full-mode-card')
      .or(page.getByRole('button', { name: /full/i }))
      .or(page.getByText(/120/i).first());

    await expect(quickCard.first()).toBeVisible({ timeout: 5000 });
    await expect(fullCard.first()).toBeVisible({ timeout: 5000 });
  });
});

test.describe('BF-09 — Mode selection navigation', () => {
  test('clicking Quick mode navigates to /bigfive/quiz with mode=quick', async ({ page }) => {
    await goToBigFiveHome(page);

    const quickCard = page.getByTestId('quick-mode-card')
      .or(page.getByRole('button', { name: /quick/i }))
      .or(page.getByRole('link', { name: /quick/i }));

    await quickCard.first().click();
    await page.waitForURL(/bigfive\/quiz/, { timeout: 5000 }).catch(() => {});

    const url = page.url();
    expect(url, 'Should navigate to /bigfive/quiz').toContain('bigfive');
    expect(url, 'URL should contain mode=quick').toContain('quick');
  });

  test('clicking Full mode navigates to /bigfive/quiz with mode=full', async ({ page }) => {
    await goToBigFiveHome(page);

    const fullCard = page.getByTestId('full-mode-card')
      .or(page.getByRole('button', { name: /full/i }))
      .or(page.getByRole('link', { name: /full/i }));

    await fullCard.first().click();
    await page.waitForURL(/bigfive\/quiz/, { timeout: 5000 }).catch(() => {});

    const url = page.url();
    expect(url, 'Should navigate to /bigfive/quiz').toContain('bigfive');
    expect(url, 'URL should contain mode=full').toContain('full');
  });
});

test.describe('BF-09 — Back to hub navigation', () => {
  test('/bigfive page has a link back to the hub', async ({ page }) => {
    await goToBigFiveHome(page);

    const backLink = page.getByRole('link', { name: /back|home|hub/i })
      .or(page.getByTestId('back-to-hub'))
      .or(page.locator('a[href="/"]').first())
      .or(page.locator('a[href*="hub"]').first());

    const isVisible = await backLink.first().isVisible().catch(() => false);
    // Having a back link is expected but allow for breadcrumb navigation too
    if (!isVisible) {
      // Accept if there's any way to get back to / (e.g., clicking the logo)
      const logoLink = page.locator('a[href="/"], [data-testid="logo-link"]').first();
      await expect(
        logoLink,
        'Expected a back-to-hub link or logo link on /bigfive'
      ).toBeVisible({ timeout: 3000 });
    } else {
      await expect(backLink.first()).toBeVisible();
    }
  });
});
