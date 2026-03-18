/**
 * Big Five question loader — returns questions for a given test mode.
 *
 * 'quick' → IPIP-50 (50 items, factor-level only)
 * 'full'  → IPIP-NEO-120 (120 items, facet-level)
 */

import { questions50 } from '../../data/bigfive/questions50';
import { questions120 } from '../../data/bigfive/questions120';
import type { BigFiveQuestion } from '../../types/bigfive';

export function getBigFiveQuestions(mode: 'quick' | 'full'): BigFiveQuestion[] {
  return mode === 'quick' ? questions50 : questions120;
}
