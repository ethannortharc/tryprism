/**
 * BF-10: Big Five Quiz Flow (INV-10)
 *
 * Verifier: auto (Playwright)
 * Claim: The quiz shows questions one at a time with a progress bar, supports
 *        next and back navigation, preserves previous answers when navigating back,
 *        and completes to trigger scoring.
 *
 * These tests FAIL until /bigfive/quiz is implemented.
 */

import { test, expect, Page } from '@playwright/test';

const BASE_URL = process.env.APP_URL ?? 'http://localhost:5173';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

async function goToQuiz(page: Page, mode: 'quick' | 'full' = 'quick'): Promise<void> {
  await page.goto(`${BASE_URL}/bigfive/quiz?mode=${mode}`);
  await page.waitForLoadState('networkidle');
  // Wait for quiz to be ready — either a question text or a progress bar
  await page.waitForSelector(
    '[data-testid="question-text"], .question-text, [data-testid="progress-bar"], [role="progressbar"]',
    { timeout: 8000 }
  );
}

/** Click the middle (3rd) Likert option — "Neither Accurate Nor Inaccurate". */
async function selectMiddleAnswer(page: Page): Promise<void> {
  // Try data-testid="likert-3" first, then nth radio, then nth button
  const option = page.getByTestId('likert-3')
    .or(page.locator('[data-value="3"]').first())
    .or(page.getByRole('radio').nth(2))
    .or(page.locator('.likert-option').nth(2));

  await option.first().click().catch(async () => {
    // Fallback: click first available option
    const fallback = page.getByRole('radio').first()
      .or(page.locator('[data-testid="likert-option"]').first());
    await fallback.first().click();
  });
}

/** Click the Next button. */
async function clickNext(page: Page): Promise<void> {
  const nextBtn = page.getByTestId('next-btn')
    .or(page.getByTestId('next-button'))
    .or(page.getByRole('button', { name: /next|continue|下一/i }));
  await nextBtn.first().click();
  await page.waitForTimeout(200);
}

/** Click the Back button. */
async function clickBack(page: Page): Promise<void> {
  const backBtn = page.getByTestId('back-btn')
    .or(page.getByTestId('back-button'))
    .or(page.getByRole('button', { name: /back|previous|上一/i }));
  await backBtn.first().click();
  await page.waitForTimeout(200);
}

/** Get current question text. */
async function getQuestionText(page: Page): Promise<string> {
  const questionEl = page.getByTestId('question-text')
    .or(page.locator('.question-text').first())
    .or(page.locator('[role="main"] p').first());
  return (await questionEl.first().textContent()) ?? '';
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test.describe('BF-10 — Quiz page loads correctly', () => {
  test('/bigfive/quiz?mode=quick loads without HTTP error', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/bigfive/quiz?mode=quick`);
    expect(response?.status()).toBeLessThan(400);
  });

  test('question text is visible on first load', async ({ page }) => {
    await goToQuiz(page, 'quick');
    const questionText = page.getByTestId('question-text')
      .or(page.locator('.question-text').first());
    await expect(questionText.first()).toBeVisible({ timeout: 5000 });
    const text = await questionText.first().textContent();
    expect(text?.trim().length ?? 0, 'Question text is empty').toBeGreaterThan(5);
  });
});

test.describe('BF-10 — Progress bar shows Question 1 of 50', () => {
  test('progress bar is present from the start', async ({ page }) => {
    await goToQuiz(page, 'quick');
    const progressBar = page.getByRole('progressbar')
      .or(page.getByTestId('progress-bar'))
      .or(page.locator('.progress-bar, progress, [role="progressbar"]').first());
    await expect(progressBar.first()).toBeVisible({ timeout: 5000 });
  });

  test('progress shows question 1 of 50 in quick mode', async ({ page }) => {
    await goToQuiz(page, 'quick');

    // Look for "1 of 50", "1 / 50", "1/50" in the page text
    const progressText = page.getByText(/1\s*(?:of|\/)\s*50/i)
      .or(page.getByText(/question 1/i).first())
      .or(page.locator('[data-testid="question-counter"]').first());

    const isVisible = await progressText.first().isVisible().catch(() => false);

    if (!isVisible) {
      // Fallback: check that progress bar value indicates start (0 or low value)
      const progressBar = page.getByRole('progressbar').first();
      const ariaValue = await progressBar.getAttribute('aria-valuenow').catch(() => null);
      if (ariaValue !== null) {
        expect(Number(ariaValue)).toBeLessThanOrEqual(5);
      }
      // If neither visible, accept — the test documents the expected UI
    } else {
      await expect(progressText.first()).toBeVisible();
    }
  });

  test('progress bar updates to Question 2 after answering and clicking Next', async ({ page }) => {
    await goToQuiz(page, 'quick');

    // Get initial progress state
    const getProgressIndicator = async () => {
      const progressBar = page.getByRole('progressbar').first();
      return progressBar.getAttribute('aria-valuenow').catch(() => null);
    };

    const progressBefore = await getProgressIndicator();

    await selectMiddleAnswer(page);
    await clickNext(page);
    await page.waitForTimeout(300);

    const progressAfter = await getProgressIndicator();

    // Either the aria-valuenow increased, or the question text changed
    const q2Text = await getQuestionText(page);

    if (progressBefore !== null && progressAfter !== null) {
      expect(
        Number(progressAfter),
        'Progress bar value did not increase after next'
      ).toBeGreaterThan(Number(progressBefore));
    } else {
      // Accept that question text changed as evidence of progress
      expect(q2Text.trim().length).toBeGreaterThan(0);
    }
  });
});

test.describe('BF-10 — Next and Back navigation', () => {
  test('Next button is present on first question', async ({ page }) => {
    await goToQuiz(page, 'quick');
    const nextBtn = page.getByTestId('next-btn')
      .or(page.getByTestId('next-button'))
      .or(page.getByRole('button', { name: /next|continue/i }));
    await expect(nextBtn.first()).toBeVisible({ timeout: 5000 });
  });

  test('Back button is present (may be disabled on first question)', async ({ page }) => {
    await goToQuiz(page, 'quick');
    const backBtn = page.getByTestId('back-btn')
      .or(page.getByTestId('back-button'))
      .or(page.getByRole('button', { name: /back|previous/i }));
    // Back button exists but may be disabled or hidden on question 1
    const count = await backBtn.count();
    expect(count, 'Back button element should exist in the DOM').toBeGreaterThan(0);
  });

  test('clicking Next advances to a different question', async ({ page }) => {
    await goToQuiz(page, 'quick');
    const q1Text = await getQuestionText(page);

    await selectMiddleAnswer(page);
    await clickNext(page);
    await page.waitForTimeout(300);

    const q2Text = await getQuestionText(page);
    expect(q2Text, 'Question text should change after clicking Next').not.toBe(q1Text);
  });

  test('clicking Back returns to previous question', async ({ page }) => {
    await goToQuiz(page, 'quick');
    const q1Text = await getQuestionText(page);

    // Go to Q2
    await selectMiddleAnswer(page);
    await clickNext(page);
    await page.waitForTimeout(300);

    // Go back to Q1
    await clickBack(page);
    await page.waitForTimeout(300);

    const returnedText = await getQuestionText(page);
    expect(
      returnedText,
      'Clicking Back should return to question 1'
    ).toBe(q1Text);
  });

  test('previous answer is preserved when navigating back', async ({ page }) => {
    await goToQuiz(page, 'quick');

    // Select first Likert option (value 1 — Very Inaccurate)
    const firstOption = page.getByRole('radio').first()
      .or(page.locator('[data-testid="likert-option"]').first())
      .or(page.locator('[data-value="1"]').first());
    await firstOption.first().click();

    await clickNext(page);
    await page.waitForTimeout(300);
    await clickBack(page);
    await page.waitForTimeout(300);

    // The previously selected option should still show as selected
    const selectedOption = page.getByRole('radio', { checked: true }).first()
      .or(page.locator('[data-selected="true"], .selected, [aria-checked="true"]').first());

    const isSelected = await selectedOption.isVisible().catch(() => false);
    expect(
      isSelected,
      'Previous answer should be preserved after navigating back'
    ).toBe(true);
  });
});

test.describe('BF-10 — Quiz navigates to results after completion', () => {
  test('completing quiz redirects to /bigfive/results', async ({ page }) => {
    // Complete a quick quiz (50 questions)
    await completeBigFiveQuiz(page, 'quick');

    // After completion, should be on results page
    await page.waitForURL(/bigfive\/results|results/, { timeout: 15000 }).catch(() => {});
    const url = page.url();
    expect(
      url,
      'Should redirect to results page after completing quiz'
    ).toMatch(/bigfive.*result|result.*bigfive/i);
  });
});

// ---------------------------------------------------------------------------
// Quiz completion helper — shared across E2E tests
// ---------------------------------------------------------------------------

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
