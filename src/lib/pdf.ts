/**
 * PDF export for TryPrism results.
 *
 * Captures the rendered Results page DOM element with html2canvas,
 * then places the image in a jsPDF document. This approach:
 * - Supports CJK characters (uses browser's system fonts)
 * - Captures SVG radar chart correctly
 * - Preserves the styled layout as-is
 */

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import type { Locale } from './i18n';

// ---------------------------------------------------------------------------
// Type name maps (for filename only)
// ---------------------------------------------------------------------------

const TYPE_NAMES_EN: Record<number, string> = {
  1: 'The Reformer', 2: 'The Helper', 3: 'The Achiever',
  4: 'The Individualist', 5: 'The Investigator', 6: 'The Loyalist',
  7: 'The Enthusiast', 8: 'The Challenger', 9: 'The Peacemaker',
};

const TYPE_NAMES_ZH: Record<number, string> = {
  1: '改革者', 2: '助人者', 3: '成就者',
  4: '个人主义者', 5: '调查者', 6: '忠诚者',
  7: '热情者', 8: '挑战者', 9: '和平者',
};

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export interface PdfResultData {
  primaryType: number;
  wing: number;
  scores: Record<number, number>;
  lowConfidence?: boolean;
  flatProfile?: boolean;
  tritype?: number[];
  mode?: string;
  completedAt?: string;
}

/**
 * Capture a DOM element and generate a multi-page PDF from it.
 * The element is captured at 2x resolution for crisp text.
 */
export async function exportResultAsPdf(
  result: PdfResultData,
  locale: Locale,
  /** The DOM element to capture. If not provided, finds [data-pdf-content] or main. */
  element?: HTMLElement | null,
): Promise<void> {
  const isZh = locale === 'zh';

  // Find the element to capture
  const target = element
    ?? document.querySelector('[data-pdf-content]') as HTMLElement
    ?? document.querySelector('main') as HTMLElement;

  if (!target) {
    console.error('No element found to capture for PDF');
    return;
  }

  // Temporarily add print styles for cleaner capture
  target.classList.add('pdf-capture-mode');

  try {
    const canvas = await html2canvas(target, {
      backgroundColor: '#0c0c18',
      scale: 2,
      useCORS: true,
      logging: false,
      // Ensure SVGs are captured
      foreignObjectRendering: false,
    });

    // Create A4 PDF
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 8;
    const contentWidth = pageWidth - margin * 2;

    // Calculate scaled image dimensions
    const imgAspect = canvas.height / canvas.width;
    const imgWidth = contentWidth;
    const imgHeight = imgWidth * imgAspect;

    const imgData = canvas.toDataURL('image/png');

    if (imgHeight <= pageHeight - margin * 2) {
      // Single page
      doc.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight);
    } else {
      // Multi-page: slice canvas into page-sized chunks
      const pageContentHeight = pageHeight - margin * 2;
      const totalPages = Math.ceil(imgHeight / pageContentHeight);

      for (let page = 0; page < totalPages; page++) {
        if (page > 0) doc.addPage();

        const srcY = (page * pageContentHeight / imgHeight) * canvas.height;
        const srcHeight = (pageContentHeight / imgHeight) * canvas.height;
        const remainingHeight = canvas.height - srcY;
        const actualSrcHeight = Math.min(srcHeight, remainingHeight);

        // Create a canvas slice for this page
        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvas.width;
        pageCanvas.height = actualSrcHeight;
        const ctx = pageCanvas.getContext('2d');
        if (!ctx) continue;

        ctx.fillStyle = '#0c0c18';
        ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
        ctx.drawImage(
          canvas,
          0, srcY, canvas.width, actualSrcHeight,
          0, 0, canvas.width, actualSrcHeight,
        );

        const sliceData = pageCanvas.toDataURL('image/png');
        const sliceHeight = (actualSrcHeight / canvas.height) * imgHeight;
        doc.addImage(sliceData, 'PNG', margin, margin, imgWidth, sliceHeight);
      }
    }

    // Generate filename
    const typeNames = isZh ? TYPE_NAMES_ZH : TYPE_NAMES_EN;
    const typePart = isZh
      ? `type${result.primaryType}-${typeNames[result.primaryType] ?? ''}`
      : `type${result.primaryType}-${(typeNames[result.primaryType] ?? '').replace(/\s+/g, '-').toLowerCase()}`;
    doc.save(`tryprism-${typePart}.pdf`);
  } finally {
    target.classList.remove('pdf-capture-mode');
  }
}
