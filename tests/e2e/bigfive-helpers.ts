/**
 * Shared helpers for Big Five E2E tests.
 * Extracted from BF-10 to avoid Playwright's cross-test-file import restriction.
 */

import type { Page } from '@playwright/test';

const BASE_URL = process.env.APP_URL ?? 'http://localhost:5173';

/**
 * Completes a Big Five quiz by clicking the middle Likert option for every question.
 * Handles both auto-advance and manual Next/Finish button patterns.
 */
export async function completeBigFiveQuiz(page: Page, mode: 'quick' | 'full' = 'quick'): Promise<void> {
  await page.goto(`${BASE_URL}/bigfive/quiz?mode=${mode}`);
  await page.waitForLoadState('networkidle');

  const totalQuestions = mode === 'quick' ? 50 : 120;

  for (let i = 0; i < totalQuestions; i++) {
    // Wait for a question to be ready
    await page.waitForSelector(
      '[data-testid="question-text"], .question-text, [role="radio"], [data-testid="likert-option"]',
      { timeout: 5000 }
    ).catch(() => {});

    // Click the middle Likert option (position 3 of 5)
    const option = page.getByTestId('likert-3')
      .or(page.locator('[data-value="3"]').first())
      .or(page.getByRole('radio').nth(2))
      .or(page.locator('.likert-option').nth(2))
      .or(page.getByRole('radio').first());

    await option.first().click().catch(() => {});
    await page.waitForTimeout(100);

    // Check if already on results page
    const onResults = page.url().includes('result');
    if (onResults) break;

    if (i < totalQuestions - 1) {
      // Click Next
      const nextBtn = page.getByTestId('next-btn')
        .or(page.getByTestId('next-button'))
        .or(page.getByRole('button', { name: /next|continue|下一/i }));
      await nextBtn.first().click().catch(() => {});
    } else {
      // Last question — try Finish button, or last Next
      const finishBtn = page.getByTestId('finish-btn')
        .or(page.getByRole('button', { name: /finish|see results|submit|done|完成/i }));

      const finishVisible = await finishBtn.first().isVisible().catch(() => false);
      if (finishVisible) {
        await finishBtn.first().click();
      } else {
        // May auto-advance or have a regular Next on the last question
        const nextBtn = page.getByRole('button', { name: /next|submit|finish/i });
        await nextBtn.first().click().catch(() => {});
      }
    }

    await page.waitForTimeout(150);

    // Early exit if already redirected to results
    if (page.url().includes('result')) break;
  }
}
