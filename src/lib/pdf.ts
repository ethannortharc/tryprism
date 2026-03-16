/**
 * PDF export for TryPrism results.
 *
 * Generates a professional PDF document from a ScoreResult using jsPDF.
 * Supports both English and Chinese locales.
 */

import { jsPDF } from 'jspdf';
import { GROWTH_ARROWS, STRESS_ARROWS } from './scoring';
import typeDescriptions from '../data/typeDescriptions';
import type { Locale } from './i18n';

// ---------------------------------------------------------------------------
// Type name maps
// ---------------------------------------------------------------------------

const TYPE_NAMES_EN: Record<number, string> = {
  1: 'The Reformer',
  2: 'The Helper',
  3: 'The Achiever',
  4: 'The Individualist',
  5: 'The Investigator',
  6: 'The Loyalist',
  7: 'The Enthusiast',
  8: 'The Challenger',
  9: 'The Peacemaker',
};

const TYPE_NAMES_ZH: Record<number, string> = {
  1: '改革者',
  2: '助人者',
  3: '成就者',
  4: '个人主义者',
  5: '调查者',
  6: '忠诚者',
  7: '热情者',
  8: '挑战者',
  9: '和平者',
};

// ---------------------------------------------------------------------------
// Color palette
// ---------------------------------------------------------------------------

const ACCENT = [126, 139, 232] as const;   // #7e8be8 purple
const TYPE_BAR_COLOR = [100, 120, 220] as const;

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
 * Generate a PDF from ScoreResult data and trigger a browser download.
 *
 * @param result   The score result data
 * @param locale   Current UI locale ('en' | 'zh')
 */
export function exportResultAsPdf(result: PdfResultData, locale: Locale): void {
  const isZh = locale === 'zh';
  const typeNames = isZh ? TYPE_NAMES_ZH : TYPE_NAMES_EN;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;

  let y = 0; // current Y cursor

  // ─── Helper functions ───────────────────────────────────────────────────

  function setColor(r: number, g: number, b: number): void {
    doc.setTextColor(r, g, b);
  }

  function setFillColor(r: number, g: number, b: number): void {
    doc.setFillColor(r, g, b);
  }

  function checkPageBreak(needed: number): void {
    if (y + needed > pageHeight - 20) {
      doc.addPage();
      y = 20;
    }
  }

  // ─── Header band ─────────────────────────────────────────────────────────

  // Dark header background
  setFillColor(18, 18, 30);
  doc.rect(0, 0, pageWidth, 45, 'F');

  // Brand title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  setColor(...ACCENT);
  doc.text('TryPrism', margin, 22);

  // Tagline
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  setColor(160, 160, 200);
  const tagline = isZh ? '九型人格测评报告' : 'Enneagram Personality Report';
  doc.text(tagline, margin, 32);

  // Date
  const dateStr = result.completedAt
    ? new Date(result.completedAt).toLocaleDateString(isZh ? 'zh-CN' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : new Date().toLocaleDateString(isZh ? 'zh-CN' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
  doc.setFontSize(9);
  setColor(120, 120, 160);
  doc.text(dateStr, pageWidth - margin, 32, { align: 'right' });

  y = 55;

  // ─── Primary type hero ────────────────────────────────────────────────────

  checkPageBreak(50);

  // Section background
  setFillColor(24, 24, 40);
  doc.roundedRect(margin, y, contentWidth, 48, 3, 3, 'F');

  // Type number (large)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(48);
  setColor(...ACCENT);
  doc.text(String(result.primaryType), margin + 14, y + 32);

  // Type name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  setColor(240, 240, 255);
  const typeName = typeNames[result.primaryType] ?? `Type ${result.primaryType}`;
  doc.text(typeName, margin + 32, y + 22);

  // Wing label
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(13);
  setColor(180, 180, 220);
  const wingLabel = isZh
    ? `翼型：${result.primaryType}w${result.wing}`
    : `Wing: ${result.primaryType}w${result.wing}`;
  doc.text(wingLabel, margin + 32, y + 35);

  // Mode badge
  if (result.mode) {
    doc.setFontSize(9);
    setColor(120, 120, 160);
    const modeLabel = result.mode === 'quick'
      ? (isZh ? '快速模式' : 'Quick Mode')
      : (isZh ? '完整模式' : 'Full Mode');
    doc.text(modeLabel, pageWidth - margin, y + 14, { align: 'right' });
  }

  y += 58;

  // ─── Score distribution ───────────────────────────────────────────────────

  checkPageBreak(70);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  setColor(180, 180, 220);
  const scoreTitle = isZh ? '得分分布' : 'Score Distribution';
  doc.text(scoreTitle, margin, y);
  y += 6;

  // Thin rule
  setFillColor(60, 60, 90);
  doc.rect(margin, y, contentWidth, 0.4, 'F');
  y += 6;

  const maxScore = Math.max(...Object.values(result.scores), 1);
  const barAreaWidth = contentWidth * 0.55;
  const labelWidth = 36;
  const scoreColX = margin + labelWidth + barAreaWidth + 4;

  for (let t = 1; t <= 9; t++) {
    checkPageBreak(9);
    const score = result.scores[t] ?? 0;
    const barWidth = (score / maxScore) * barAreaWidth;
    const name = typeNames[t] ?? `Type ${t}`;
    const isPrimary = t === result.primaryType;

    // Row background for primary type
    if (isPrimary) {
      setFillColor(30, 30, 55);
      doc.rect(margin - 2, y - 4, contentWidth + 4, 8, 'F');
    }

    // Type label
    doc.setFont('helvetica', isPrimary ? 'bold' : 'normal');
    doc.setFontSize(8.5);
    setColor(isPrimary ? 200 : 140, isPrimary ? 200 : 140, isPrimary ? 240 : 180);
    doc.text(`${t}. ${name}`, margin, y + 1);

    // Bar background
    setFillColor(40, 40, 65);
    doc.rect(margin + labelWidth, y - 3, barAreaWidth, 5, 'F');

    // Bar fill
    if (isPrimary) {
      setFillColor(...ACCENT);
    } else {
      setFillColor(...TYPE_BAR_COLOR);
    }
    if (barWidth > 0) {
      doc.rect(margin + labelWidth, y - 3, barWidth, 5, 'F');
    }

    // Score number
    doc.setFontSize(8);
    setColor(160, 160, 200);
    doc.text(`${score.toFixed(1)}`, scoreColX, y + 1);

    y += 8;
  }

  y += 6;

  // ─── Growth & stress directions ───────────────────────────────────────────

  checkPageBreak(40);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  setColor(180, 180, 220);
  const arrowsTitle = isZh ? '成长与压力方向' : 'Growth & Stress Directions';
  doc.text(arrowsTitle, margin, y);
  y += 6;

  setFillColor(60, 60, 90);
  doc.rect(margin, y, contentWidth, 0.4, 'F');
  y += 7;

  const growthType = GROWTH_ARROWS[result.primaryType];
  const stressType = STRESS_ARROWS[result.primaryType];

  const halfW = contentWidth / 2 - 4;

  // Growth box
  setFillColor(20, 40, 25);
  doc.roundedRect(margin, y, halfW, 22, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  setColor(100, 200, 120);
  const growthLabel = isZh ? '整合方向（成长）' : 'Growth Direction';
  doc.text(growthLabel, margin + 4, y + 8);
  doc.setFontSize(13);
  setColor(120, 220, 140);
  const growthText = `→ Type ${growthType}: ${typeNames[growthType] ?? ''}`;
  doc.text(growthText, margin + 4, y + 17);

  // Stress box
  setFillColor(40, 20, 20);
  doc.roundedRect(margin + halfW + 8, y, halfW, 22, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  setColor(200, 100, 100);
  const stressLabel = isZh ? '压力方向' : 'Stress Direction';
  doc.text(stressLabel, margin + halfW + 12, y + 8);
  doc.setFontSize(13);
  setColor(220, 120, 120);
  const stressText = `→ Type ${stressType}: ${typeNames[stressType] ?? ''}`;
  doc.text(stressText, margin + halfW + 12, y + 17);

  y += 32;

  // ─── Type description ─────────────────────────────────────────────────────

  checkPageBreak(30);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  setColor(180, 180, 220);
  const descTitle = isZh ? '类型描述' : 'Type Description';
  doc.text(descTitle, margin, y);
  y += 6;

  setFillColor(60, 60, 90);
  doc.rect(margin, y, contentWidth, 0.4, 'F');
  y += 7;

  const description = typeDescriptions[result.primaryType];
  if (description) {
    const descText = isZh ? description.zh : description.en;
    // Take the first paragraph only to keep PDF concise
    const firstParagraph = descText.split('\n\n')[0] ?? descText;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    setColor(180, 180, 210);

    const lines = doc.splitTextToSize(firstParagraph, contentWidth);
    const maxLines = 28; // cap to avoid overflow
    const cappedLines = lines.slice(0, maxLines) as string[];
    for (const line of cappedLines) {
      checkPageBreak(5.5);
      doc.text(line as string, margin, y);
      y += 5.2;
    }
    y += 4;
  }

  // ─── Footer ───────────────────────────────────────────────────────────────

  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    setFillColor(14, 14, 24);
    doc.rect(0, pageHeight - 14, pageWidth, 14, 'F');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    setColor(80, 80, 120);
    const footerLeft = isZh ? 'TryPrism · 九型人格测评' : 'TryPrism · Enneagram Assessment';
    doc.text(footerLeft, margin, pageHeight - 5);
    doc.text(`${i} / ${totalPages}`, pageWidth - margin, pageHeight - 5, { align: 'right' });
  }

  // ─── Download ─────────────────────────────────────────────────────────────

  const typePart = isZh
    ? `type${result.primaryType}-${(TYPE_NAMES_ZH[result.primaryType] ?? '').replace(/\s+/g, '-')}`
    : `type${result.primaryType}-${(TYPE_NAMES_EN[result.primaryType] ?? '').replace(/\s+/g, '-').toLowerCase()}`;
  const filename = `tryprism-${typePart}.pdf`;

  doc.save(filename);
}
