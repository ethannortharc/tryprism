/**
 * IPIP-50 Question Bank — Goldberg's Big-Five Factor Markers
 *
 * Public domain. 50 bilingual items (English / Chinese).
 * Items cycle through factors in standard IPIP-50 order: E, A, C, N, O.
 * Factor IV (Emotional Stability) is mapped to N (Neuroticism) with inverted keys:
 *   items describing instability/neuroticism → key '+'
 *   items describing calm/stability          → key '-'
 */

import type { BigFiveQuestion } from '../../types/bigfive';

// ---------------------------------------------------------------------------
// Factor item arrays (10 items each, in within-factor order)
// ---------------------------------------------------------------------------

const extraversion: BigFiveQuestion[] = [
  {
    id: 'ipip50-e01',
    factor: 'E',
    key: '+',
    text: { en: 'Am the life of the party.', zh: '我是聚会的焦点。' },
  },
  {
    id: 'ipip50-e02',
    factor: 'E',
    key: '-',
    text: { en: "Don't talk a lot.", zh: '我话不多。' },
  },
  {
    id: 'ipip50-e03',
    factor: 'E',
    key: '+',
    text: { en: 'Feel comfortable around people.', zh: '我在人群中感到自在。' },
  },
  {
    id: 'ipip50-e04',
    factor: 'E',
    key: '-',
    text: { en: 'Keep in the background.', zh: '我喜欢待在人群的边缘。' },
  },
  {
    id: 'ipip50-e05',
    factor: 'E',
    key: '+',
    text: { en: 'Start conversations.', zh: '我主动发起对话。' },
  },
  {
    id: 'ipip50-e06',
    factor: 'E',
    key: '-',
    text: { en: 'Have little to say.', zh: '我没什么可说的。' },
  },
  {
    id: 'ipip50-e07',
    factor: 'E',
    key: '+',
    text: {
      en: 'Talk to a lot of different people at parties.',
      zh: '在聚会上，我会和很多不同的人交谈。',
    },
  },
  {
    id: 'ipip50-e08',
    factor: 'E',
    key: '-',
    text: {
      en: "Don't like to draw attention to myself.",
      zh: '我不喜欢引人注目。',
    },
  },
  {
    id: 'ipip50-e09',
    factor: 'E',
    key: '+',
    text: {
      en: "Don't mind being the center of attention.",
      zh: '我不介意成为关注的焦点。',
    },
  },
  {
    id: 'ipip50-e10',
    factor: 'E',
    key: '-',
    text: { en: 'Am quiet around strangers.', zh: '我在陌生人面前比较安静。' },
  },
];

const agreeableness: BigFiveQuestion[] = [
  {
    id: 'ipip50-a01',
    factor: 'A',
    key: '-',
    text: { en: 'Feel little concern for others.', zh: '我对他人很少感到关心。' },
  },
  {
    id: 'ipip50-a02',
    factor: 'A',
    key: '+',
    text: { en: 'Am interested in people.', zh: '我对他人感兴趣。' },
  },
  {
    id: 'ipip50-a03',
    factor: 'A',
    key: '-',
    text: { en: 'Insult people.', zh: '我会侮辱他人。' },
  },
  {
    id: 'ipip50-a04',
    factor: 'A',
    key: '+',
    text: {
      en: "Sympathize with others' feelings.",
      zh: '我能体会他人的感受。',
    },
  },
  {
    id: 'ipip50-a05',
    factor: 'A',
    key: '-',
    text: {
      en: "Am not interested in other people's problems.",
      zh: '我对别人的问题不感兴趣。',
    },
  },
  {
    id: 'ipip50-a06',
    factor: 'A',
    key: '+',
    text: { en: 'Have a soft heart.', zh: '我心地善良，富有同情心。' },
  },
  {
    id: 'ipip50-a07',
    factor: 'A',
    key: '-',
    text: {
      en: 'Am not really interested in others.',
      zh: '我对他人其实并不感兴趣。',
    },
  },
  {
    id: 'ipip50-a08',
    factor: 'A',
    key: '+',
    text: { en: 'Take time out for others.', zh: '我愿意花时间陪伴他人。' },
  },
  {
    id: 'ipip50-a09',
    factor: 'A',
    key: '+',
    text: { en: "Feel others' emotions.", zh: '我能感受到他人的情绪。' },
  },
  {
    id: 'ipip50-a10',
    factor: 'A',
    key: '+',
    text: { en: 'Make people feel at ease.', zh: '我能让人感到轻松自在。' },
  },
];

const conscientiousness: BigFiveQuestion[] = [
  {
    id: 'ipip50-c01',
    factor: 'C',
    key: '+',
    text: { en: 'Am always prepared.', zh: '我做事总是有备而来。' },
  },
  {
    id: 'ipip50-c02',
    factor: 'C',
    key: '-',
    text: {
      en: 'Leave my belongings around.',
      zh: '我的东西常常随手乱放。',
    },
  },
  {
    id: 'ipip50-c03',
    factor: 'C',
    key: '+',
    text: { en: 'Pay attention to details.', zh: '我注重细节。' },
  },
  {
    id: 'ipip50-c04',
    factor: 'C',
    key: '-',
    text: { en: 'Make a mess of things.', zh: '我常常把事情搞得一团糟。' },
  },
  {
    id: 'ipip50-c05',
    factor: 'C',
    key: '+',
    text: { en: 'Get chores done right away.', zh: '我会立即完成日常琐事。' },
  },
  {
    id: 'ipip50-c06',
    factor: 'C',
    key: '-',
    text: {
      en: 'Often forget to put things back in their proper place.',
      zh: '我经常忘记把东西放回原处。',
    },
  },
  {
    id: 'ipip50-c07',
    factor: 'C',
    key: '+',
    text: { en: 'Like order.', zh: '我喜欢井然有序。' },
  },
  {
    id: 'ipip50-c08',
    factor: 'C',
    key: '-',
    text: { en: 'Shirk my duties.', zh: '我会逃避自己的职责。' },
  },
  {
    id: 'ipip50-c09',
    factor: 'C',
    key: '+',
    text: { en: 'Follow a schedule.', zh: '我按照计划行事。' },
  },
  {
    id: 'ipip50-c10',
    factor: 'C',
    key: '+',
    text: { en: 'Am exacting in my work.', zh: '我对自己的工作要求严格。' },
  },
];

// Factor IV in IPIP-50 is Emotional Stability; we map it to N (Neuroticism).
// Keys are inverted: high ES (calm) → '-' for N; low ES (anxious) → '+' for N.
const neuroticism: BigFiveQuestion[] = [
  {
    id: 'ipip50-n01',
    factor: 'N',
    key: '+',
    text: { en: 'Get stressed out easily.', zh: '我很容易感到压力。' },
  },
  {
    id: 'ipip50-n02',
    factor: 'N',
    key: '-',
    text: {
      en: 'Am relaxed most of the time.',
      zh: '我大多数时候都很放松。',
    },
  },
  {
    id: 'ipip50-n03',
    factor: 'N',
    key: '+',
    text: { en: 'Worry about things.', zh: '我总是担心各种事情。' },
  },
  {
    id: 'ipip50-n04',
    factor: 'N',
    key: '-',
    text: { en: 'Seldom feel blue.', zh: '我很少感到情绪低落。' },
  },
  {
    id: 'ipip50-n05',
    factor: 'N',
    key: '+',
    text: { en: 'Am easily disturbed.', zh: '我很容易被打扰或心烦意乱。' },
  },
  {
    id: 'ipip50-n06',
    factor: 'N',
    key: '+',
    text: { en: 'Get upset easily.', zh: '我很容易感到沮丧。' },
  },
  {
    id: 'ipip50-n07',
    factor: 'N',
    key: '+',
    text: { en: 'Change my mood a lot.', zh: '我的情绪变化很大。' },
  },
  {
    id: 'ipip50-n08',
    factor: 'N',
    key: '+',
    text: { en: 'Have frequent mood swings.', zh: '我情绪波动频繁。' },
  },
  {
    id: 'ipip50-n09',
    factor: 'N',
    key: '+',
    text: { en: 'Get irritated easily.', zh: '我很容易感到烦躁。' },
  },
  {
    id: 'ipip50-n10',
    factor: 'N',
    key: '+',
    text: { en: 'Often feel blue.', zh: '我经常感到情绪低落。' },
  },
];

const openness: BigFiveQuestion[] = [
  {
    id: 'ipip50-o01',
    factor: 'O',
    key: '+',
    text: { en: 'Have a rich vocabulary.', zh: '我词汇丰富。' },
  },
  {
    id: 'ipip50-o02',
    factor: 'O',
    key: '-',
    text: {
      en: 'Have difficulty understanding abstract ideas.',
      zh: '我难以理解抽象概念。',
    },
  },
  {
    id: 'ipip50-o03',
    factor: 'O',
    key: '+',
    text: { en: 'Have a vivid imagination.', zh: '我有丰富的想象力。' },
  },
  {
    id: 'ipip50-o04',
    factor: 'O',
    key: '-',
    text: {
      en: 'Am not interested in abstract ideas.',
      zh: '我对抽象概念不感兴趣。',
    },
  },
  {
    id: 'ipip50-o05',
    factor: 'O',
    key: '+',
    text: { en: 'Have excellent ideas.', zh: '我能产生很好的想法。' },
  },
  {
    id: 'ipip50-o06',
    factor: 'O',
    key: '-',
    text: {
      en: 'Do not have a good imagination.',
      zh: '我的想象力不太丰富。',
    },
  },
  {
    id: 'ipip50-o07',
    factor: 'O',
    key: '+',
    text: {
      en: 'Am quick to understand things.',
      zh: '我理解事物的速度很快。',
    },
  },
  {
    id: 'ipip50-o08',
    factor: 'O',
    key: '+',
    text: { en: 'Use difficult words.', zh: '我会使用复杂的词汇。' },
  },
  {
    id: 'ipip50-o09',
    factor: 'O',
    key: '+',
    text: {
      en: 'Spend time reflecting on things.',
      zh: '我喜欢花时间思考和反省。',
    },
  },
  {
    id: 'ipip50-o10',
    factor: 'O',
    key: '+',
    text: { en: 'Am full of ideas.', zh: '我充满奇思妙想。' },
  },
];

// ---------------------------------------------------------------------------
// Interleave in standard IPIP-50 order: E, A, C, N, O (cycling 10 rounds)
// Position 1=E1, 2=A1, 3=C1, 4=N1, 5=O1, 6=E2, 7=A2, ... 50=O10
// ---------------------------------------------------------------------------

export const questions50: BigFiveQuestion[] = Array.from(
  { length: 10 },
  (_, round) => [
    { ...extraversion[round], id: `ipip50-${round * 5 + 1}` },
    { ...agreeableness[round], id: `ipip50-${round * 5 + 2}` },
    { ...conscientiousness[round], id: `ipip50-${round * 5 + 3}` },
    { ...neuroticism[round], id: `ipip50-${round * 5 + 4}` },
    { ...openness[round], id: `ipip50-${round * 5 + 5}` },
  ]
).flat();

export default questions50;
