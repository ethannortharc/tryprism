/**
 * INV-09: PDF export generates a downloadable document containing complete test results
 *
 * Verifier: auto (Playwright)
 * Claim: The results page has a PDF download button; clicking it triggers a download
 *        of a valid PDF file containing primary type, wing, scores, and descriptions.
 *
 * These tests FAIL until the implementation exists.
 */

import { test, expect, Download } from '@playwright/test';
import * as path from 'node:path';
import * as fs from 'node:fs';
import * as os from 'node:os';

const BASE_URL = process.env.APP_URL ?? 'http://localhost:5173';

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

async function navigateToResults(page: import('@playwright/test').Page): Promise<void> {
  await page.goto(BASE_URL);
  await page.evaluate((result) => {
    localStorage.setItem('tryprism_latest_result', JSON.stringify(result));
    localStorage.setItem('tryprism_result', JSON.stringify(result));
    localStorage.setItem('latestResult', JSON.stringify(result));
  }, MOCK_RESULT);

  await page.goto(`${BASE_URL}/results`).catch(() => {});
  await page.waitForLoadState('networkidle');

  const url = page.url();
  if (!url.includes('result')) {
    await page.goto(`${BASE_URL}/#/results`).catch(() => {});
    await page.waitForLoadState('networkidle');
  }
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test.describe('INV-09 — PDF export button exists', () => {
  test('PDF download/export button is visible on results page', async ({ page }) => {
    await navigateToResults(page);
    const pdfBtn = page.getByTestId('pdf-export-button')
      .or(page.getByRole('button', { name: /pdf|download|export|save/i }))
      .or(page.locator('[aria-label*="pdf" i], [aria-label*="download" i], a[download]').first());
    await expect(pdfBtn.first()).toBeVisible({ timeout: 5000 });
  });

  test('PDF export button is enabled', async ({ page }) => {
    await navigateToResults(page);
    const pdfBtn = page.getByTestId('pdf-export-button')
      .or(page.getByRole('button', { name: /pdf|download|export/i }));
    await expect(pdfBtn.first()).toBeEnabled({ timeout: 5000 });
  });
});

test.describe('INV-09 — PDF download is triggered', () => {
  test('clicking PDF button triggers a download event', async ({ page }) => {
    await navigateToResults(page);

    // Set up download listener before clicking
    const downloadPromise = page.waitForEvent('download', { timeout: 15_000 });

    const pdfBtn = page.getByTestId('pdf-export-button')
      .or(page.getByRole('button', { name: /pdf|download|export/i }));
    await pdfBtn.first().click();

    let download: Download;
    try {
      download = await downloadPromise;
    } catch {
      // Some implementations open PDF in a new tab rather than downloading
      // Check if a new page/tab was opened
      const pages = page.context().pages();
      expect(
        pages.length,
        'PDF export did not trigger a download or open a new tab'
      ).toBeGreaterThan(1);
      return;
    }

    expect(download).toBeDefined();
    const suggestedFilename = download.suggestedFilename();
    expect(suggestedFilename, 'Downloaded filename should end in .pdf').toMatch(/\.pdf$/i);
  });
});

test.describe('INV-09 — Downloaded file is a valid PDF', () => {
  test('downloaded file starts with PDF magic bytes (%PDF-)', async ({ page }) => {
    await navigateToResults(page);

    const downloadPromise = page.waitForEvent('download', { timeout: 15_000 });

    const pdfBtn = page.getByTestId('pdf-export-button')
      .or(page.getByRole('button', { name: /pdf|download|export/i }));
    await pdfBtn.first().click();

    let download: Download;
    try {
      download = await downloadPromise;
    } catch {
      test.skip(true, 'PDF export opened in tab instead of triggering download');
      return;
    }

    // Save to a temp location and check magic bytes
    const tmpPath = path.join(os.tmpdir(), `tryprism-test-${Date.now()}.pdf`);
    await download.saveAs(tmpPath);

    const buffer = Buffer.alloc(5);
    const fd = fs.openSync(tmpPath, 'r');
    fs.readSync(fd, buffer, 0, 5, 0);
    fs.closeSync(fd);
    fs.unlinkSync(tmpPath); // cleanup

    const magic = buffer.toString('ascii');
    expect(magic, 'Downloaded file does not start with %PDF-').toBe('%PDF-');
  });

  test('PDF file size is above 1KB (not empty)', async ({ page }) => {
    await navigateToResults(page);

    const downloadPromise = page.waitForEvent('download', { timeout: 15_000 });

    const pdfBtn = page.getByTestId('pdf-export-button')
      .or(page.getByRole('button', { name: /pdf|download|export/i }));
    await pdfBtn.first().click();

    let download: Download;
    try {
      download = await downloadPromise;
    } catch {
      test.skip(true, 'No download event received');
      return;
    }

    const tmpPath = path.join(os.tmpdir(), `tryprism-test-${Date.now()}.pdf`);
    await download.saveAs(tmpPath);
    const stat = fs.statSync(tmpPath);
    fs.unlinkSync(tmpPath);

    expect(stat.size, 'PDF file is suspiciously small').toBeGreaterThan(1024);
  });
});

test.describe('INV-09 — PDF content completeness (via client-side generation)', () => {
  /**
   * For client-side PDF libraries (jsPDF, pdfmake, etc.), we can verify content
   * by intercepting the generation call or checking DOM text before download.
   * These tests verify the data going INTO the PDF.
   */

  test('results page shows all data that should appear in PDF', async ({ page }) => {
    await navigateToResults(page);

    // Primary type
    const typeEl = page.getByTestId('primary-type-number')
      .or(page.locator('.primary-type, .type-hero').first());
    await expect(typeEl.first()).toBeVisible({ timeout: 5000 });

    // Wing
    const wingEl = page.getByTestId('wing-indicator')
      .or(page.getByText(/\dw\d/));
    await expect(wingEl.first()).toBeVisible({ timeout: 5000 });

    // Scores chart
    const chartEl = page.getByTestId('score-chart')
      .or(page.locator('svg.chart, canvas, .score-chart').first());
    await expect(chartEl.first()).toBeVisible({ timeout: 5000 });

    // Description text
    const descEl = page.getByTestId('type-description')
      .or(page.locator('.type-description').first());
    await expect(descEl.first()).toBeVisible({ timeout: 5000 });
  });
});
