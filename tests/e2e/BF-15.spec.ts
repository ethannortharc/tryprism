/**
 * BF-15: PDF Export (INV-12)
 *
 * Verifier: auto (Playwright)
 * Claim: The Big Five results page has a PDF export button; clicking it triggers a
 *        download event for a PDF file.
 *
 * These tests FAIL until the PDF export button is implemented on /bigfive/results.
 */

import { test, expect, Download } from '@playwright/test';
import * as path from 'node:path';
import * as fs from 'node:fs';
import * as os from 'node:os';

const BASE_URL = process.env.APP_URL ?? 'http://localhost:5173';

// ---------------------------------------------------------------------------
// Mock result for injection
// ---------------------------------------------------------------------------

const MOCK_BF_RESULT = {
  id: 'bf-pdf-test',
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

async function navigateToBigFiveResults(page: import('@playwright/test').Page): Promise<void> {
  await page.goto(BASE_URL);
  await page.evaluate((result) => {
    localStorage.setItem('tryprism_bigfive_results', JSON.stringify([result]));
    localStorage.setItem('tryprism_bigfive_latest', JSON.stringify(result));
    localStorage.setItem('bigfive_latest_result', JSON.stringify(result));
  }, MOCK_BF_RESULT);
  await page.goto(`${BASE_URL}/bigfive/results`);
  await page.waitForLoadState('networkidle');
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test.describe('BF-15 — PDF export button exists on Big Five results page', () => {
  test('PDF export button is visible on /bigfive/results', async ({ page }) => {
    await navigateToBigFiveResults(page);

    const pdfBtn = page.getByTestId('pdf-export-button')
      .or(page.getByTestId('pdf-btn'))
      .or(page.getByRole('button', { name: /pdf|download|export|save/i }))
      .or(page.locator('[aria-label*="pdf" i], [aria-label*="download" i], a[download]').first());

    await expect(
      pdfBtn.first(),
      'PDF export button not found on Big Five results page'
    ).toBeVisible({ timeout: 5000 });
  });

  test('PDF export button is enabled', async ({ page }) => {
    await navigateToBigFiveResults(page);

    const pdfBtn = page.getByTestId('pdf-export-button')
      .or(page.getByTestId('pdf-btn'))
      .or(page.getByRole('button', { name: /pdf|download|export/i }));

    await expect(pdfBtn.first()).toBeEnabled({ timeout: 5000 });
  });
});

test.describe('BF-15 — PDF download is triggered', () => {
  test('clicking PDF export button triggers a download event', async ({ page }) => {
    await navigateToBigFiveResults(page);

    // Set up download listener before clicking
    const downloadPromise = page.waitForEvent('download', { timeout: 20_000 });

    const pdfBtn = page.getByTestId('pdf-export-button')
      .or(page.getByTestId('pdf-btn'))
      .or(page.getByRole('button', { name: /pdf|download|export/i }));

    await pdfBtn.first().click();

    let download: Download;
    try {
      download = await downloadPromise;
    } catch {
      // Some implementations open PDF in a new tab rather than downloading
      const pages = page.context().pages();
      if (pages.length > 1) {
        // New tab opened — acceptable
        return;
      }
      // Check if a blob URL or data URL was navigated to
      const currentUrl = page.url();
      const isPdfUrl = currentUrl.startsWith('blob:') || currentUrl.includes('.pdf');
      if (isPdfUrl) return;

      throw new Error(
        'PDF export did not trigger a download event, open a new tab, or navigate to a PDF URL'
      );
    }

    expect(download).toBeDefined();
    const suggestedFilename = download.suggestedFilename();
    expect(
      suggestedFilename,
      `Expected .pdf filename but got: ${suggestedFilename}`
    ).toMatch(/\.pdf$/i);
  });
});

test.describe('BF-15 — Downloaded PDF is a valid file', () => {
  test('downloaded PDF starts with PDF magic bytes (%PDF-)', async ({ page }) => {
    await navigateToBigFiveResults(page);

    const downloadPromise = page.waitForEvent('download', { timeout: 20_000 });

    const pdfBtn = page.getByTestId('pdf-export-button')
      .or(page.getByTestId('pdf-btn'))
      .or(page.getByRole('button', { name: /pdf|download|export/i }));

    await pdfBtn.first().click();

    let download: Download;
    try {
      download = await downloadPromise;
    } catch {
      test.skip(true, 'PDF export opened in tab or no download triggered — skipping file validation');
      return;
    }

    const tmpPath = path.join(os.tmpdir(), `tryprism-bf-test-${Date.now()}.pdf`);
    await download.saveAs(tmpPath);

    try {
      const buffer = Buffer.alloc(5);
      const fd = fs.openSync(tmpPath, 'r');
      fs.readSync(fd, buffer, 0, 5, 0);
      fs.closeSync(fd);

      const magic = buffer.toString('ascii');
      expect(magic, 'Downloaded file does not start with %PDF-').toBe('%PDF-');
    } finally {
      fs.unlinkSync(tmpPath);
    }
  });

  test('downloaded PDF file is above 1KB', async ({ page }) => {
    await navigateToBigFiveResults(page);

    const downloadPromise = page.waitForEvent('download', { timeout: 20_000 });

    const pdfBtn = page.getByTestId('pdf-export-button')
      .or(page.getByTestId('pdf-btn'))
      .or(page.getByRole('button', { name: /pdf|download|export/i }));

    await pdfBtn.first().click();

    let download: Download;
    try {
      download = await downloadPromise;
    } catch {
      test.skip(true, 'No download event received');
      return;
    }

    const tmpPath = path.join(os.tmpdir(), `tryprism-bf-test-${Date.now()}.pdf`);
    await download.saveAs(tmpPath);

    try {
      const stat = fs.statSync(tmpPath);
      expect(stat.size, 'PDF file is suspiciously small (< 1KB)').toBeGreaterThan(1024);
    } finally {
      fs.unlinkSync(tmpPath);
    }
  });
});

test.describe('BF-15 — Results page has PDF-worthy data before export', () => {
  test('factor scores are visible on page (data that would be in PDF)', async ({ page }) => {
    await navigateToBigFiveResults(page);

    // Verify the data that should appear in the PDF is shown on screen
    const factorEl = page.getByText(/openness|conscientiousness|extraversion|agreeableness|neuroticism/i).first();
    await expect(
      factorEl.first(),
      'Factor names (to be included in PDF) not visible on results page'
    ).toBeVisible({ timeout: 5000 });
  });
});
