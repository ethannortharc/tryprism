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
// Per-type strengths and growth suggestions (bilingual)
// ---------------------------------------------------------------------------

interface TypeExtras {
  strengths: { en: string[]; zh: string[] };
  growthSuggestions: { en: string[]; zh: string[] };
}

const TYPE_EXTRAS: Record<number, TypeExtras> = {
  1: {
    strengths: {
      en: ['Reliability and follow-through', 'Ethical clarity and principled action', 'Attention to detail and quality', 'Genuine commitment to improvement'],
      zh: ['可靠、言出必行', '伦理清晰、原则坚定', '细心认真、追求品质', '真诚投入、持续改善'],
    },
    growthSuggestions: {
      en: ['Schedule unstructured free time each week — let yourself rest without earning it', 'Practice saying "good enough" and mean it', 'Notice moments where your effort already made a difference — before adding a "but"', 'When your inner critic speaks, ask: "Is this helping, or just criticizing?"'],
      zh: ['每周安排一段不设任何目标的自由时间，允许自己真正放松', '练习说"这已经足够好了"，并真心相信这句话', '在追加一个"但是"之前，先完整地看见自己努力已经带来的改变', '当内心的批评声响起时，问自己："这是在帮助我，还是只是在挑剔？"'],
    },
  },
  2: {
    strengths: {
      en: ['Deep empathy and emotional attunement', 'Natural warmth that creates belonging', 'Intuitive sense of what others need', 'Wholehearted care and generosity'],
      zh: ['深度共情与情感敏锐', '与生俱来的温暖，能营造归属感', '直觉性地感知他人的需求', '全心全意的关怀与慷慨付出'],
    },
    growthSuggestions: {
      en: ['Schedule time for activities that are purely for you — not about serving others', 'Practice asking for help instead of only offering it', 'Notice when you are giving freely versus giving to receive approval', 'Learn to name your own needs clearly and voice them to someone you trust'],
      zh: ['为自己安排纯粹属于自己的时间，而非为了服务他人', '练习主动开口寻求帮助，而不只是提供帮助', '留意自己是在出于爱自由给予，还是出于渴望认可而付出', '学会清晰地认识并说出自己的需求，向信任的人表达'],
    },
  },
  3: {
    strengths: {
      en: ['Drive, competence, and the ability to deliver results', 'Inspiring leadership that raises the bar for everyone', 'Adaptability — reading situations and responding effectively', 'Capacity to create momentum and get things done'],
      zh: ['强大的驱动力、能力与执行力', '鼓舞人心的领导力，能拉高整体水准', '适应力强，善于感知情境并有效回应', '制造动力、推动事成的天赋'],
    },
    growthSuggestions: {
      en: ['Spend time in relationships where nothing needs to be produced or performed', 'Journal about feelings rather than plans — let what is true surface', 'Practice sharing a doubt or struggle with someone you trust (vulnerability builds connection)', 'Pause before starting a new goal: ask yourself what you genuinely feel, not what you should feel'],
      zh: ['在一些不需要产出任何成果的关系中花时间相处', '用日记记录感受，而非计划——让真实的情绪浮现', '练习向信任的人分享一个疑虑或困境（脆弱能建立真实的连结）', '在开始下一个目标之前先停下来，问自己真正的感受是什么，而非应该有什么感受'],
    },
  },
  4: {
    strengths: {
      en: ['Emotional depth and richness of inner life', 'Originality and authentic creative expression', 'Empathy for those who feel misunderstood or marginalized', 'Ability to transform personal experience into art, insight, or meaning'],
      zh: ['情感深度与丰盈的内心世界', '独创性与真实的创意表达', '对感到被误解或边缘化之人的深切共情', '将个人经历转化为艺术、洞见或意义的能力'],
    },
    growthSuggestions: {
      en: ['Establish a daily routine and follow it even when you don\'t feel inspired — action creates momentum', 'Share creative work before it feels "ready" — perfectionism can be a way of hiding', 'Notice what is beautiful and sufficient in your present life, not only what is missing', 'When melancholy arises, acknowledge it briefly, then take one small action anyway'],
      zh: ['建立日常规律并坚持执行，即便没有灵感——行动本身会创造动力', '在作品感觉"就绪"之前就分享出去——追求完美有时是一种自我保护', '留意当下生活中已有的美好与充足，而不只是聚焦于缺失', '当忧郁升起时，短暂地承认它，然后无论如何还是采取一个小小的行动'],
    },
  },
  5: {
    strengths: {
      en: ['Intellectual depth and genuine mastery', 'Calm, analytical presence in complex or chaotic situations', 'Independent thinking that generates original insights', 'Focus and the ability to synthesize complex information'],
      zh: ['深厚的智识积累与真正的精通', '在复杂或混乱情况下的沉着与分析力', '独立思考，能产生原创性的洞见', '专注力与整合复杂信息的能力'],
    },
    growthSuggestions: {
      en: ['Make commitments before you feel fully prepared — readiness comes through action, not just preparation', 'Share knowledge in real-time conversation rather than only after you have fully processed it', 'Allow yourself to be moved by experiences, not only to analyze them', 'Notice when withdrawal is self-care versus when it is avoidance — and choose engagement intentionally'],
      zh: ['在感到完全准备好之前就做出承诺——准备好的感觉来自行动，而非无限的准备', '在实时对话中分享知识，而不只是在完全消化之后才开口', '允许自己被体验所触动，而不只是分析它', '留意什么时候独处是自我关怀，什么时候是在逃避——有意识地选择参与'],
    },
  },
  6: {
    strengths: {
      en: ['Deep loyalty and commitment to people and principles', 'Strategic thinking and ability to anticipate problems', 'Courage under pressure — showing up when it matters most', 'Genuine investment in community and shared purpose'],
      zh: ['对人和原则的深度忠诚与投入', '战略性思维与预判问题的能力', '压力下的勇气——在最关键的时刻挺身而出', '对群体与共同目标的真诚投入'],
    },
    growthSuggestions: {
      en: ['When anxiety spikes, try a grounding practice: slow breathing, naming five things you can see', 'List evidence for what is actually working well — counterbalance catastrophic thinking with data', 'Take small courageous actions to build confidence in your own judgment', 'Practice noticing when you trust yourself — and let that record grow'],
      zh: ['焦虑袭来时，尝试接地练习：缓慢呼吸，说出你能看见的五样事物', '列举实际运转良好的事物——用事实平衡灾难性的思维', '采取小而勇敢的行动，逐步建立对自己判断的信心', '留意自己信任自己的时刻——让这些记录慢慢积累'],
    },
  },
  7: {
    strengths: {
      en: ['Contagious enthusiasm and genuine joy in living', 'Versatility and ability to synthesize ideas across domains', 'Optimism that opens new possibilities for everyone', 'Generativity — bringing creative energy to any challenge'],
      zh: ['充满感染力的热情与对生命真实的喜悦', '多才多艺，能跨领域综合想法', '开启新可能性的乐观态度', '创造力——为任何挑战注入活力'],
    },
    growthSuggestions: {
      en: ['Commit to one project until completion before starting the next — depth rewards differently than breadth', 'Practice sitting with discomfort without immediately reframing or escaping it', 'Allow grief or sadness a short, deliberate space each day — emotions that are felt can be released', 'Ask: "What am I avoiding by keeping so busy?" — and sit with the answer honestly'],
      zh: ['在开始下一个项目之前，先将一个项目做到完成——深度带来与广度不同的收获', '练习在不舒适中停留，而不立刻重构或逃离', '每天为悲伤或哀愁留出一小段刻意的空间——被感受的情绪才能被释放', '问自己："我这么忙碌是在回避什么？"——诚实地坐在这个答案里'],
    },
  },
  8: {
    strengths: {
      en: ['Decisive leadership and the courage to act when others hesitate', 'Fierce loyalty and protection of those they care about', 'Directness that cuts through confusion to what matters', 'Raw vitality and the power to create real change'],
      zh: ['果断的领导力与在他人犹豫时勇于行动的勇气', '对所爱之人强烈的忠诚与保护欲', '能穿透混乱、直抵要害的直接风格', '推动真实改变的原始活力与力量'],
    },
    growthSuggestions: {
      en: ['Practice restraint before reacting — pause and ask: "What is the most effective response?"', 'Ask someone close to you what they need before offering what you want to give', 'Allow yourself moments of genuine vulnerability with one or two deeply trusted people', 'Notice when your strength is protecting others versus when it is protecting yourself from intimacy'],
      zh: ['在做出反应之前练习克制——停下来问自己："最有效的回应是什么？"', '在给予之前先问对方真正需要什么', '允许自己在一两位深度信任的人面前有真实的脆弱时刻', '留意你的力量何时是在保护他人，何时是在保护自己免于亲密'],
    },
  },
  9: {
    strengths: {
      en: ['Natural mediation and the ability to hold space for all sides', 'Genuine acceptance and patience that creates safety for others', 'Broad perspective that sees what each person contributes', 'Grounded, calming presence that others find deeply stabilizing'],
      zh: ['天然的调解能力与为各方托举空间的天赋', '真实的接纳与耐心，为他人创造安全感', '看见每个人贡献的宽广视角', '踏实沉稳的存在感，令他人深感安定'],
    },
    growthSuggestions: {
      en: ['Make small choices quickly without deliberating endlessly — action awakens your own voice', 'Notice when you are going along versus genuinely agreeing — and say so when they differ', 'Complete one personally meaningful task each day — not because someone asked, but because you chose it', 'Practice naming what you want clearly, even in small matters — your desires deserve a voice'],
      zh: ['迅速做出小的决定，不再无休止地斟酌——行动能唤醒你自己的声音', '留意自己是在顺从还是真正同意——当两者不同时，说出来', '每天完成一件对自己有意义的事——不因为有人要求，而是因为你自己选择了', '练习清晰地说出你想要什么，哪怕只是小事——你的渴望值得被听见'],
    },
  },
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

  // ─── Tritype ──────────────────────────────────────────────────────────────

  if (result.tritype && result.tritype.length > 0) {
    checkPageBreak(22);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    setColor(180, 180, 220);
    const tritypeTitle = isZh ? '三型组合' : 'Tritype';
    doc.text(tritypeTitle, margin, y);
    y += 6;

    setFillColor(60, 60, 90);
    doc.rect(margin, y, contentWidth, 0.4, 'F');
    y += 7;

    setFillColor(22, 22, 38);
    doc.roundedRect(margin, y, contentWidth, 14, 2, 2, 'F');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    setColor(200, 200, 240);
    const tritypeStr = result.tritype.join('-');
    doc.text(tritypeStr, margin + 6, y + 9);

    doc.setFontSize(8.5);
    setColor(140, 140, 180);
    const tritypeDesc = isZh
      ? `三个智慧中心（本能/情感/思维）的主导类型`
      : `Dominant type in each of the three centers (Gut · Heart · Head)`;
    doc.text(tritypeDesc, margin + 28, y + 9);

    y += 22;
  }

  // ─── Strengths ────────────────────────────────────────────────────────────

  const extras = TYPE_EXTRAS[result.primaryType];

  if (extras) {
    checkPageBreak(36);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    setColor(180, 180, 220);
    const strengthsTitle = isZh ? '核心优势' : 'Key Strengths';
    doc.text(strengthsTitle, margin, y);
    y += 6;

    setFillColor(60, 60, 90);
    doc.rect(margin, y, contentWidth, 0.4, 'F');
    y += 7;

    const strengths = isZh ? extras.strengths.zh : extras.strengths.en;
    for (const s of strengths) {
      checkPageBreak(7);
      // bullet dot
      setFillColor(...ACCENT);
      doc.circle(margin + 2, y - 1, 1, 'F');
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      setColor(190, 190, 230);
      doc.text(s, margin + 7, y + 1);
      y += 6.5;
    }
    y += 4;
  }

  // ─── Growth suggestions ───────────────────────────────────────────────────

  if (extras) {
    checkPageBreak(40);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    setColor(180, 180, 220);
    const suggestTitle = isZh ? '成长建议' : 'Growth Suggestions';
    doc.text(suggestTitle, margin, y);
    y += 6;

    setFillColor(60, 60, 90);
    doc.rect(margin, y, contentWidth, 0.4, 'F');
    y += 7;

    const suggestions = isZh ? extras.growthSuggestions.zh : extras.growthSuggestions.en;
    for (let i = 0; i < suggestions.length; i++) {
      checkPageBreak(12);
      const suggLines = doc.splitTextToSize(suggestions[i]!, contentWidth - 10) as string[];
      // Numbered circle
      setFillColor(40, 50, 80);
      doc.circle(margin + 3, y, 3, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      setColor(200, 200, 240);
      doc.text(String(i + 1), margin + 3, y + 1, { align: 'center' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      setColor(185, 185, 225);
      for (const line of suggLines) {
        checkPageBreak(5.5);
        doc.text(line, margin + 9, y + 1);
        y += 5.2;
      }
      y += 3;
    }
    y += 3;
  }

  // ─── Type description ─────────────────────────────────────────────────────

  checkPageBreak(30);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  setColor(180, 180, 220);
  const descTitle = isZh ? '类型详述' : 'Type Description';
  doc.text(descTitle, margin, y);
  y += 6;

  setFillColor(60, 60, 90);
  doc.rect(margin, y, contentWidth, 0.4, 'F');
  y += 7;

  const description = typeDescriptions[result.primaryType];
  if (description) {
    const descText = isZh ? description.zh : description.en;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    setColor(175, 175, 210);

    // Render full description paragraph by paragraph
    const paragraphs = descText.split('\n\n');
    for (const para of paragraphs) {
      const lines = doc.splitTextToSize(para.trim(), contentWidth) as string[];
      for (const line of lines) {
        checkPageBreak(5.5);
        doc.text(line, margin, y);
        y += 5.2;
      }
      y += 3; // inter-paragraph spacing
    }
    y += 2;
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
