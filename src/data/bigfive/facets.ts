/**
 * Facet and factor metadata for the Big Five (OCEAN) personality test.
 *
 * Exports:
 *   FACET_META  — names and parent factor for all 30 facets
 *   FACTOR_META — display names and accent colors for all 5 factors
 *   FACTOR_ORDER — standard display order for factors
 *   FACET_ORDER — standard display order of facets per factor
 */

import type { BigFiveFactor, BigFiveFacet } from '../../types/bigfive';

// ---------------------------------------------------------------------------
// Facet metadata
// ---------------------------------------------------------------------------

export const FACET_META: Record<BigFiveFacet, { factor: BigFiveFactor; name: { en: string; zh: string } }> = {
  // Neuroticism facets
  N1: { factor: 'N', name: { en: 'Anxiety',          zh: '焦虑' } },
  N2: { factor: 'N', name: { en: 'Anger',             zh: '愤怒' } },
  N3: { factor: 'N', name: { en: 'Depression',        zh: '抑郁' } },
  N4: { factor: 'N', name: { en: 'Self-Consciousness', zh: '自我意识' } },
  N5: { factor: 'N', name: { en: 'Immoderation',      zh: '无节制' } },
  N6: { factor: 'N', name: { en: 'Vulnerability',     zh: '脆弱' } },

  // Extraversion facets
  E1: { factor: 'E', name: { en: 'Friendliness',      zh: '友善' } },
  E2: { factor: 'E', name: { en: 'Gregariousness',    zh: '合群' } },
  E3: { factor: 'E', name: { en: 'Assertiveness',     zh: '果断' } },
  E4: { factor: 'E', name: { en: 'Activity Level',    zh: '活跃' } },
  E5: { factor: 'E', name: { en: 'Excitement-Seeking', zh: '寻求刺激' } },
  E6: { factor: 'E', name: { en: 'Cheerfulness',      zh: '乐观性' } },

  // Openness to Experience facets
  O1: { factor: 'O', name: { en: 'Imagination',       zh: '想象力' } },
  O2: { factor: 'O', name: { en: 'Artistic Interests', zh: '艺术兴趣' } },
  O3: { factor: 'O', name: { en: 'Emotionality',      zh: '情感丰富' } },
  O4: { factor: 'O', name: { en: 'Adventurousness',   zh: '冒险精神' } },
  O5: { factor: 'O', name: { en: 'Intellect',         zh: '智识' } },
  O6: { factor: 'O', name: { en: 'Liberalism',        zh: '开放价值观' } },

  // Agreeableness facets
  A1: { factor: 'A', name: { en: 'Trust',             zh: '信任' } },
  A2: { factor: 'A', name: { en: 'Morality',          zh: '道德' } },
  A3: { factor: 'A', name: { en: 'Altruism',          zh: '利他' } },
  A4: { factor: 'A', name: { en: 'Cooperation',       zh: '合作' } },
  A5: { factor: 'A', name: { en: 'Modesty',           zh: '谦逊' } },
  A6: { factor: 'A', name: { en: 'Sympathy',          zh: '同情' } },

  // Conscientiousness facets
  C1: { factor: 'C', name: { en: 'Self-Efficacy',          zh: '自我效能感' } },
  C2: { factor: 'C', name: { en: 'Orderliness',            zh: '条理' } },
  C3: { factor: 'C', name: { en: 'Dutifulness',            zh: '责任心' } },
  C4: { factor: 'C', name: { en: 'Achievement-Striving',   zh: '成就追求' } },
  C5: { factor: 'C', name: { en: 'Self-Discipline',        zh: '自律' } },
  C6: { factor: 'C', name: { en: 'Cautiousness',           zh: '谨慎' } },
};

// ---------------------------------------------------------------------------
// Factor metadata
// ---------------------------------------------------------------------------

export const FACTOR_META: Record<BigFiveFactor, { name: { en: string; zh: string }; color: string }> = {
  O: { name: { en: 'Openness to Experience', zh: '开放性' }, color: '#b07ee8' },
  C: { name: { en: 'Conscientiousness',      zh: '尽责性' }, color: '#4a9ee8' },
  E: { name: { en: 'Extraversion',           zh: '外向性' }, color: '#e8a45c' },
  A: { name: { en: 'Agreeableness',          zh: '宜人性' }, color: '#5ec8a0' },
  N: { name: { en: 'Neuroticism',            zh: '神经质' }, color: '#e86c8a' },
};

// ---------------------------------------------------------------------------
// Display order
// ---------------------------------------------------------------------------

/** Standard display order for factors */
export const FACTOR_ORDER: BigFiveFactor[] = ['O', 'C', 'E', 'A', 'N'];

/** Standard display order of facets per factor */
export const FACET_ORDER: Record<BigFiveFactor, BigFiveFacet[]> = {
  N: ['N1', 'N2', 'N3', 'N4', 'N5', 'N6'],
  E: ['E1', 'E2', 'E3', 'E4', 'E5', 'E6'],
  O: ['O1', 'O2', 'O3', 'O4', 'O5', 'O6'],
  A: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6'],
  C: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6'],
};
