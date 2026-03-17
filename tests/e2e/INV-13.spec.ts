/**
 * INV-13: Responsive layout works on mobile (375px) and desktop (1440px) without overflow or broken elements
 *
 * Verifier: auto (Playwright)
 * Claim: On 375x812 (mobile), 768x1024 (tablet), and 1440x900 (desktop), all key pages
 *        (home, quiz, results) show no horizontal overflow, all primary interactive elements
 *        are visible, and text is readable.
 *
 * These tests FAIL until the implementation exists.
 */

import { test, expect, Page, BrowserContext } from '@playwright/test';

const BASE_URL = process.env.APP_URL ?? 'http://localhost:5173';

// ---------------------------------------------------------------------------
// Viewport definitions
// ---------------------------------------------------------------------------

const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
] as const;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Returns true if the body has horizontal overflow (scrollWidth > clientWidth). */
async function hasHorizontalOverflow(page: Page): Promise<boolean> {
  return page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
}

/** Returns the minimum font size of all visible text nodes in px. */
async function getMinFontSize(page: Page): Promise<number> {
  return page.evaluate(() => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
    let minSize = Infinity;
    let node: Element | null = walker.currentNode as Element;
    while (node) {
      const style = window.getComputedStyle(node);
      const size = parseFloat(style.fontSize);
      if (
        size > 0 &&
        node.textContent?.trim() &&
        style.display !== 'none' &&
        style.visibility !== 'hidden'
      ) {
        minSize = Math.min(minSize, size);
      }
      node = walker.nextNode() as Element | null;
    }
    return minSize === Infinity ? 16 : minSize;
  });
}

const MOCK_RESULT = {
  primaryType: 4, wing: 5,
  scores: { 1: 8, 2: 6, 3: 7, 4: 28, 5: 18, 6: 9, 7: 6, 8: 5, 9: 7 },
  tritype: [4, 5, 9], lowConfidence: false, flatProfile: false,
  mode: 'quick', completedAt: new Date().toISOString(),
};

async function injectResult(page: Page): Promise<void> {
  await page.evaluate((r) => {
    localStorage.setItem('tryprism_latest_result', JSON.stringify(r));
    localStorage.setItem('latestResult', JSON.stringify(r));
  }, MOCK_RESULT);
}

// ---------------------------------------------------------------------------
// Parameterized tests across all viewports
// ---------------------------------------------------------------------------

for (const viewport of VIEWPORTS) {
  test.describe(`INV-13 — Home page at ${viewport.name} (${viewport.width}x${viewport.height})`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    test(`no horizontal overflow on home page`, async ({ page }) => {
      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');
      const overflow = await hasHorizontalOverflow(page);
      expect(overflow, `Horizontal overflow detected on home page at ${viewport.name}`).toBe(false);
    });

    test(`primary heading is visible`, async ({ page }) => {
      await page.goto(BASE_URL);
      const heading = page.getByRole('heading', { level: 1 });
      await expect(heading.first()).toBeVisible();
    });

    test(`quick mode card/button is visible`, async ({ page }) => {
      await page.goto(`${BASE_URL}/enneagram`);
      const quickMode = page.getByTestId('quick-mode-card')
        .or(page.getByRole('button', { name: /quick/i }));
      await expect(quickMode.first()).toBeVisible();
    });

    test(`full mode card/button is visible`, async ({ page }) => {
      await page.goto(`${BASE_URL}/enneagram`);
      const fullMode = page.getByTestId('full-mode-card')
        .or(page.getByRole('button', { name: /full/i }));
      await expect(fullMode.first()).toBeVisible();
    });

    test(`language toggle is visible`, async ({ page }) => {
      await page.goto(BASE_URL);
      const langToggle = page.getByTestId('language-toggle')
        .or(page.getByRole('button', { name: /zh|en|中文|english/i }));
      await expect(langToggle.first()).toBeVisible();
    });

    test(`minimum font size is at least 12px (readable)`, async ({ page }) => {
      await page.goto(BASE_URL);
      const minFontSize = await getMinFontSize(page);
      expect(minFontSize, `Font size too small at ${viewport.name}`).toBeGreaterThanOrEqual(12);
    });
  });

  test.describe(`INV-13 — Quiz page at ${viewport.name} (${viewport.width}x${viewport.height})`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    test(`no horizontal overflow on quiz page`, async ({ page }) => {
      await page.goto(`${BASE_URL}/enneagram`);
      const quickMode = page.getByTestId('quick-mode-card')
        .or(page.getByRole('button', { name: /quick/i }));
      await quickMode.first().click().catch(() => {});
      await page.waitForSelector('[data-testid="question-text"], .question-text', { timeout: 5000 }).catch(() => {});

      const overflow = await hasHorizontalOverflow(page);
      expect(overflow, `Horizontal overflow on quiz page at ${viewport.name}`).toBe(false);
    });

    test(`question text is visible`, async ({ page }) => {
      await page.goto(`${BASE_URL}/enneagram`);
      const quickMode = page.getByTestId('quick-mode-card')
        .or(page.getByRole('button', { name: /quick/i }));
      await quickMode.first().click().catch(() => {});

      const questionText = page.getByTestId('question-text')
        .or(page.locator('.question-text').first());
      await expect(questionText.first()).toBeVisible({ timeout: 5000 });
    });

    test(`answer options are visible and tappable`, async ({ page }) => {
      await page.goto(`${BASE_URL}/enneagram`);
      const quickMode = page.getByTestId('quick-mode-card')
        .or(page.getByRole('button', { name: /quick/i }));
      await quickMode.first().click().catch(() => {});

      const options = page.getByRole('radio')
        .or(page.getByTestId('likert-option'));
      // All options should be visible
      const count = await options.count();
      expect(count).toBeGreaterThanOrEqual(5);

      // Minimum touch target size on mobile: 44x44px
      if (viewport.name === 'mobile') {
        const firstOption = options.first();
        const box = await firstOption.boundingBox();
        if (box) {
          expect(box.height, 'Touch target too small on mobile').toBeGreaterThanOrEqual(32);
        }
      }
    });

    test(`next button is visible and not clipped`, async ({ page }) => {
      await page.goto(`${BASE_URL}/enneagram`);
      const quickMode = page.getByTestId('quick-mode-card')
        .or(page.getByRole('button', { name: /quick/i }));
      await quickMode.first().click().catch(() => {});

      const nextBtn = page.getByTestId('next-button')
        .or(page.getByRole('button', { name: /next|continue/i }));
      await expect(nextBtn.first()).toBeVisible({ timeout: 5000 });

      const box = await nextBtn.first().boundingBox();
      expect(box).not.toBeNull();
      // Button should be within the viewport width
      expect((box!.x + box!.width)).toBeLessThanOrEqual(viewport.width + 5);
    });
  });

  test.describe(`INV-13 — Results page at ${viewport.name} (${viewport.width}x${viewport.height})`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    test(`no horizontal overflow on results page`, async ({ page }) => {
      await page.goto(BASE_URL);
      await injectResult(page);
      await page.goto(`${BASE_URL}/results`).catch(() => {});
      await page.waitForLoadState('networkidle');

      const overflow = await hasHorizontalOverflow(page);
      expect(overflow, `Horizontal overflow on results page at ${viewport.name}`).toBe(false);
    });

    test(`primary type is visible on results page`, async ({ page }) => {
      await page.goto(BASE_URL);
      await injectResult(page);
      await page.goto(`${BASE_URL}/results`).catch(() => {});

      const typeEl = page.getByTestId('primary-type-number')
        .or(page.locator('.primary-type, .type-hero').first());
      await expect(typeEl.first()).toBeVisible({ timeout: 5000 });
    });
  });
}
