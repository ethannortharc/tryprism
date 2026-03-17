/**
 * INV-03: Quiz page displays questions with Likert-scale options, progress bar, and back/next navigation
 *
 * Verifier: auto (Playwright)
 * Claim: After starting quick mode, the quiz shows question text, interactive Likert options,
 *        a progress bar reflecting the current position, functional back/next buttons,
 *        and no console errors throughout navigation.
 *
 * These tests FAIL until the implementation exists.
 */

import { test, expect, Page } from '@playwright/test';

const BASE_URL = process.env.APP_URL ?? 'http://localhost:5173';

// ---------------------------------------------------------------------------
// Helper: navigate to the quiz start (quick mode)
// ---------------------------------------------------------------------------

async function startQuickMode(page: Page): Promise<void> {
  await page.goto(`${BASE_URL}/enneagram`);
  const quickMode = page.getByTestId('quick-mode-card')
    .or(page.getByRole('button', { name: /quick/i }));
  await quickMode.first().click();
  // Wait for quiz page to settle
  await page.waitForSelector('[data-testid="question-text"], .question-text, [role="main"]', {
    timeout: 5000,
  });
}

/** Select the first available Likert answer option. */
async function selectFirstAnswer(page: Page): Promise<void> {
  const option = page.getByTestId('likert-option').first()
    .or(page.getByRole('radio').first())
    .or(page.locator('button.answer-option, .likert-option, [data-answer]').first());
  await option.click();
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test.describe('INV-03 — Question display', () => {
  test('question text is visible after starting quick mode', async ({ page }) => {
    await startQuickMode(page);
    const questionText = page.getByTestId('question-text')
      .or(page.locator('.question-text, [role="main"] p').first());
    await expect(questionText.first()).toBeVisible();
    const text = await questionText.first().textContent();
    expect(text?.trim().length, 'Question text is empty').toBeGreaterThan(5);
  });

  test('question number or position indicator is visible', async ({ page }) => {
    await startQuickMode(page);
    const questionNumber = page.getByTestId('question-number')
      .or(page.locator('[data-testid="question-counter"], .question-number, .q-number').first());
    // Either a numbered indicator or a progress bar, at least one must exist
    const progressBar = page.getByRole('progressbar')
      .or(page.locator('[data-testid="progress-bar"], .progress-bar, progress').first());
    const hasNumber = await questionNumber.first().isVisible().catch(() => false);
    const hasProgress = await progressBar.first().isVisible().catch(() => false);
    expect(hasNumber || hasProgress, 'No question number or progress bar visible').toBe(true);
  });
});

test.describe('INV-03 — Likert scale options', () => {
  test('at least 5 answer options are visible (5-point Likert)', async ({ page }) => {
    await startQuickMode(page);
    const options = page.getByTestId('likert-option')
      .or(page.getByRole('radio'))
      .or(page.locator('.answer-option, .likert-option, button[data-value]'));
    const count = await options.count();
    expect(count, 'Expected at least 5 Likert options').toBeGreaterThanOrEqual(5);
  });

  test('answer options are interactive (clickable)', async ({ page }) => {
    await startQuickMode(page);
    const firstOption = page.getByTestId('likert-option').first()
      .or(page.getByRole('radio').first())
      .or(page.locator('.answer-option').first());
    await expect(firstOption.first()).toBeEnabled();
  });

  test('selecting an answer marks it as selected', async ({ page }) => {
    await startQuickMode(page);
    const firstOption = page.getByRole('radio').first()
      .or(page.locator('[data-testid="likert-option"]').first());
    await firstOption.first().click();

    // After clicking, the option should show a selected state
    const isChecked = await firstOption.first().isChecked().catch(() => false);
    const hasSelectedClass = await firstOption.first().evaluate(
      (el) => el.classList.contains('selected') || el.getAttribute('aria-checked') === 'true' ||
               el.getAttribute('data-selected') === 'true'
    ).catch(() => false);
    expect(isChecked || hasSelectedClass, 'Option not marked as selected after click').toBe(true);
  });
});

test.describe('INV-03 — Progress bar', () => {
  test('progress bar is present on the quiz page', async ({ page }) => {
    await startQuickMode(page);
    const progressBar = page.getByRole('progressbar')
      .or(page.getByTestId('progress-bar'))
      .or(page.locator('.progress-bar, progress, [role="progressbar"]').first());
    await expect(progressBar.first()).toBeVisible();
  });

  test('progress bar advances after answering and clicking next', async ({ page }) => {
    await startQuickMode(page);

    // Get initial progress value
    const progressBar = page.getByRole('progressbar').first()
      .or(page.getByTestId('progress-bar').first());

    const getProgress = async () => {
      return progressBar.getAttribute('aria-valuenow')
        .catch(() => null)
        .then(async (v) => {
          if (v !== null) return Number(v);
          // Try value or style-based width
          return progressBar.evaluate((el) => {
            return (el as HTMLProgressElement).value ??
              parseFloat((el as HTMLElement).style.width ?? '0');
          }).catch(() => 0);
        });
    };

    const progressBefore = await getProgress();

    await selectFirstAnswer(page);

    const nextBtn = page.getByTestId('next-button')
      .or(page.getByRole('button', { name: /next|continue|下一题|→/i }));
    await nextBtn.first().click();
    await page.waitForTimeout(300);

    const progressAfter = await getProgress();
    expect(progressAfter, 'Progress did not advance after clicking next').toBeGreaterThan(progressBefore);
  });
});

test.describe('INV-03 — Navigation: next and back buttons', () => {
  test('next button is present', async ({ page }) => {
    await startQuickMode(page);
    const nextBtn = page.getByTestId('next-button')
      .or(page.getByRole('button', { name: /next|continue|下一题/i }));
    await expect(nextBtn.first()).toBeVisible();
  });

  test('back button is present', async ({ page }) => {
    await startQuickMode(page);
    const backBtn = page.getByTestId('back-button')
      .or(page.getByRole('button', { name: /back|previous|上一题|←/i }));
    await expect(backBtn.first()).toBeVisible();
  });

  test('next button advances to a different question', async ({ page }) => {
    await startQuickMode(page);
    const questionText = page.getByTestId('question-text')
      .or(page.locator('.question-text').first());
    const q1Text = await questionText.first().textContent();

    await selectFirstAnswer(page);
    const nextBtn = page.getByTestId('next-button')
      .or(page.getByRole('button', { name: /next|continue|下一题/i }));
    await nextBtn.first().click();
    await page.waitForTimeout(300);

    const q2Text = await questionText.first().textContent();
    expect(q2Text, 'Question text did not change after clicking next').not.toBe(q1Text);
  });

  test('back button returns to the previous question', async ({ page }) => {
    await startQuickMode(page);
    const questionText = page.getByTestId('question-text')
      .or(page.locator('.question-text').first());

    // Record Q1 text
    const q1Text = await questionText.first().textContent();

    // Advance to Q2
    await selectFirstAnswer(page);
    const nextBtn = page.getByTestId('next-button')
      .or(page.getByRole('button', { name: /next|continue/i }));
    await nextBtn.first().click();
    await page.waitForTimeout(300);

    // Go back to Q1
    const backBtn = page.getByTestId('back-button')
      .or(page.getByRole('button', { name: /back|previous/i }));
    await backBtn.first().click();
    await page.waitForTimeout(300);

    const currentText = await questionText.first().textContent();
    expect(currentText).toBe(q1Text);
  });

  test('navigating through several questions produces no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
    page.on('pageerror', (err) => errors.push(err.message));

    await startQuickMode(page);

    // Navigate through 5 questions
    for (let i = 0; i < 5; i++) {
      await selectFirstAnswer(page);
      const nextBtn = page.getByTestId('next-button')
        .or(page.getByRole('button', { name: /next|continue/i }));
      await nextBtn.first().click();
      await page.waitForTimeout(200);
    }

    expect(errors, `Console errors during navigation:\n${errors.join('\n')}`).toHaveLength(0);
  });
});
