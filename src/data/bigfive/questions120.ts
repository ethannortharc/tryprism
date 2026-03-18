/**
 * IPIP-NEO-120 Question Bank — Johnson's (2014) IPIP-NEO-120
 *
 * Public domain. 120 bilingual items (English / Chinese).
 * 5 factors × 6 facets × 4 items = 120 items.
 *
 * Exported in INTERLEAVED administration order (not grouped by facet):
 *   - No two consecutive questions from the same facet
 *   - No three consecutive questions from the same factor
 *   - All 120 questions present
 *
 * Interleaving: 4 rounds × 30 facets. Each round picks item[round] from each facet.
 * Within each round, facets are ordered by cycling factors (N,E,O,A,C) with
 * a shifted start per round to break monotony.
 *   Round 1 starts: N
 *   Round 2 starts: E
 *   Round 3 starts: O
 *   Round 4 starts: A
 */

import type { BigFiveQuestion } from '../../types/bigfive';

// ---------------------------------------------------------------------------
// Raw items grouped by facet (4 items each)
// Each sub-array: [item1, item2, item3, item4] in facet order
// ---------------------------------------------------------------------------

// NEUROTICISM

const N1: BigFiveQuestion[] = [
  { id: 'neo120-1',  factor: 'N', facet: 'N1', key: '+', text: { en: 'Worry about things.',          zh: '我经常担心事情。' } },
  { id: 'neo120-2',  factor: 'N', facet: 'N1', key: '+', text: { en: 'Fear for the worst.',           zh: '我害怕最坏的情况发生。' } },
  { id: 'neo120-3',  factor: 'N', facet: 'N1', key: '+', text: { en: 'Am afraid of many things.',     zh: '我害怕很多事情。' } },
  { id: 'neo120-4',  factor: 'N', facet: 'N1', key: '+', text: { en: 'Get stressed out easily.',      zh: '我很容易感到压力。' } },
];

const N2: BigFiveQuestion[] = [
  { id: 'neo120-5',  factor: 'N', facet: 'N2', key: '+', text: { en: 'Get angry easily.',             zh: '我很容易生气。' } },
  { id: 'neo120-6',  factor: 'N', facet: 'N2', key: '+', text: { en: 'Get irritated easily.',         zh: '我很容易烦躁。' } },
  { id: 'neo120-7',  factor: 'N', facet: 'N2', key: '+', text: { en: 'Lose my temper.',               zh: '我会发脾气。' } },
  { id: 'neo120-8',  factor: 'N', facet: 'N2', key: '-', text: { en: 'Am not easily annoyed.',        zh: '我不容易被惹恼。' } },
];

const N3: BigFiveQuestion[] = [
  { id: 'neo120-9',  factor: 'N', facet: 'N3', key: '+', text: { en: 'Often feel blue.',              zh: '我经常感到忧郁。' } },
  { id: 'neo120-10', factor: 'N', facet: 'N3', key: '+', text: { en: 'Dislike myself.',               zh: '我不喜欢自己。' } },
  { id: 'neo120-11', factor: 'N', facet: 'N3', key: '+', text: { en: 'Am often down in the dumps.',   zh: '我经常情绪低落。' } },
  { id: 'neo120-12', factor: 'N', facet: 'N3', key: '-', text: { en: 'Feel comfortable with myself.', zh: '我对自己感到满意。' } },
];

const N4: BigFiveQuestion[] = [
  { id: 'neo120-13', factor: 'N', facet: 'N4', key: '+', text: { en: 'Find it difficult to approach others.',                  zh: '我觉得很难主动接近别人。' } },
  { id: 'neo120-14', factor: 'N', facet: 'N4', key: '+', text: { en: 'Am afraid to draw attention to myself.',                 zh: '我害怕引起别人的注意。' } },
  { id: 'neo120-15', factor: 'N', facet: 'N4', key: '+', text: { en: 'Only feel comfortable with friends.',                    zh: '我只有和朋友在一起才感到自在。' } },
  { id: 'neo120-16', factor: 'N', facet: 'N4', key: '-', text: { en: 'Am not bothered by difficult social situations.',        zh: '我不会被困难的社交场合所困扰。' } },
];

const N5: BigFiveQuestion[] = [
  { id: 'neo120-17', factor: 'N', facet: 'N5', key: '+', text: { en: 'Go on binges.',                 zh: '我会暴饮暴食。' } },
  { id: 'neo120-18', factor: 'N', facet: 'N5', key: '-', text: { en: 'Rarely overindulge.',           zh: '我很少过度放纵自己。' } },
  { id: 'neo120-19', factor: 'N', facet: 'N5', key: '-', text: { en: 'Easily resist temptations.',    zh: '我很容易抵制诱惑。' } },
  { id: 'neo120-20', factor: 'N', facet: 'N5', key: '-', text: { en: 'Am able to control my cravings.', zh: '我能控制自己的欲望。' } },
];

const N6: BigFiveQuestion[] = [
  { id: 'neo120-21', factor: 'N', facet: 'N6', key: '+', text: { en: 'Panic easily.',                           zh: '我很容易恐慌。' } },
  { id: 'neo120-22', factor: 'N', facet: 'N6', key: '+', text: { en: 'Become overwhelmed by events.',           zh: '我容易被事情压垮。' } },
  { id: 'neo120-23', factor: 'N', facet: 'N6', key: '+', text: { en: "Feel that I'm unable to deal with things.", zh: '我觉得自己无法应对事情。' } },
  { id: 'neo120-24', factor: 'N', facet: 'N6', key: '-', text: { en: 'Remain calm under pressure.',            zh: '我在压力下能保持冷静。' } },
];

// EXTRAVERSION

const E1: BigFiveQuestion[] = [
  { id: 'neo120-25', factor: 'E', facet: 'E1', key: '+', text: { en: 'Make friends easily.',         zh: '我很容易交到朋友。' } },
  { id: 'neo120-26', factor: 'E', facet: 'E1', key: '+', text: { en: 'Feel comfortable around people.', zh: '我在人群中感到自在。' } },
  { id: 'neo120-27', factor: 'E', facet: 'E1', key: '-', text: { en: 'Avoid contacts with others.',  zh: '我避免与他人接触。' } },
  { id: 'neo120-28', factor: 'E', facet: 'E1', key: '-', text: { en: 'Keep others at a distance.',   zh: '我和别人保持距离。' } },
];

const E2: BigFiveQuestion[] = [
  { id: 'neo120-29', factor: 'E', facet: 'E2', key: '+', text: { en: 'Love large parties.',                               zh: '我喜欢大型聚会。' } },
  { id: 'neo120-30', factor: 'E', facet: 'E2', key: '+', text: { en: 'Talk to a lot of different people at parties.',     zh: '我在聚会上和很多不同的人交谈。' } },
  { id: 'neo120-31', factor: 'E', facet: 'E2', key: '-', text: { en: 'Prefer to be alone.',                               zh: '我更喜欢独处。' } },
  { id: 'neo120-32', factor: 'E', facet: 'E2', key: '-', text: { en: 'Avoid crowds.',                                     zh: '我避开人群。' } },
];

const E3: BigFiveQuestion[] = [
  { id: 'neo120-33', factor: 'E', facet: 'E3', key: '+', text: { en: 'Take charge.',                   zh: '我主动承担责任。' } },
  { id: 'neo120-34', factor: 'E', facet: 'E3', key: '+', text: { en: 'Try to lead others.',            zh: '我尝试领导他人。' } },
  { id: 'neo120-35', factor: 'E', facet: 'E3', key: '+', text: { en: 'Take control of things.',        zh: '我掌控事情。' } },
  { id: 'neo120-36', factor: 'E', facet: 'E3', key: '-', text: { en: 'Wait for others to lead the way.', zh: '我等待别人来带头。' } },
];

const E4: BigFiveQuestion[] = [
  { id: 'neo120-37', factor: 'E', facet: 'E4', key: '+', text: { en: 'Am always busy.',               zh: '我总是很忙。' } },
  { id: 'neo120-38', factor: 'E', facet: 'E4', key: '+', text: { en: 'Am always on the go.',          zh: '我总是在忙碌。' } },
  { id: 'neo120-39', factor: 'E', facet: 'E4', key: '+', text: { en: 'Do a lot in my spare time.',    zh: '我在空闲时间做很多事情。' } },
  { id: 'neo120-40', factor: 'E', facet: 'E4', key: '-', text: { en: 'Like to take it easy.',         zh: '我喜欢放松。' } },
];

const E5: BigFiveQuestion[] = [
  { id: 'neo120-41', factor: 'E', facet: 'E5', key: '+', text: { en: 'Love excitement.',              zh: '我喜欢刺激。' } },
  { id: 'neo120-42', factor: 'E', facet: 'E5', key: '+', text: { en: 'Seek adventure.',               zh: '我寻求冒险。' } },
  { id: 'neo120-43', factor: 'E', facet: 'E5', key: '+', text: { en: 'Enjoy being reckless.',         zh: '我享受冒险的感觉。' } },
  { id: 'neo120-44', factor: 'E', facet: 'E5', key: '+', text: { en: 'Act wild and crazy.',           zh: '我行事疯狂大胆。' } },
];

const E6: BigFiveQuestion[] = [
  { id: 'neo120-45', factor: 'E', facet: 'E6', key: '+', text: { en: 'Radiate joy.',                  zh: '我散发着快乐。' } },
  { id: 'neo120-46', factor: 'E', facet: 'E6', key: '+', text: { en: 'Have a lot of fun.',            zh: '我有很多乐趣。' } },
  { id: 'neo120-47', factor: 'E', facet: 'E6', key: '+', text: { en: 'Love life.',                    zh: '我热爱生活。' } },
  { id: 'neo120-48', factor: 'E', facet: 'E6', key: '+', text: { en: 'Look at the bright side of life.', zh: '我看到生活光明的一面。' } },
];

// OPENNESS

const O1: BigFiveQuestion[] = [
  { id: 'neo120-49', factor: 'O', facet: 'O1', key: '+', text: { en: 'Have a vivid imagination.',          zh: '我有丰富的想象力。' } },
  { id: 'neo120-50', factor: 'O', facet: 'O1', key: '+', text: { en: 'Enjoy wild flights of fantasy.',     zh: '我喜欢天马行空的幻想。' } },
  { id: 'neo120-51', factor: 'O', facet: 'O1', key: '+', text: { en: 'Love to daydream.',                  zh: '我喜欢做白日梦。' } },
  { id: 'neo120-52', factor: 'O', facet: 'O1', key: '+', text: { en: 'Like to get lost in thought.',       zh: '我喜欢沉浸在思考中。' } },
];

const O2: BigFiveQuestion[] = [
  { id: 'neo120-53', factor: 'O', facet: 'O2', key: '+', text: { en: 'Believe in the importance of art.',                       zh: '我相信艺术的重要性。' } },
  { id: 'neo120-54', factor: 'O', facet: 'O2', key: '+', text: { en: 'See beauty in things that others might not notice.',      zh: '我能看到别人可能注意不到的美。' } },
  { id: 'neo120-55', factor: 'O', facet: 'O2', key: '-', text: { en: 'Do not like poetry.',                                     zh: '我不喜欢诗歌。' } },
  { id: 'neo120-56', factor: 'O', facet: 'O2', key: '-', text: { en: 'Do not enjoy going to art museums.',                      zh: '我不喜欢去美术馆。' } },
];

const O3: BigFiveQuestion[] = [
  { id: 'neo120-57', factor: 'O', facet: 'O3', key: '+', text: { en: 'Experience my emotions intensely.',       zh: '我强烈地体验自己的情感。' } },
  { id: 'neo120-58', factor: 'O', facet: 'O3', key: '+', text: { en: "Feel others' emotions.",                  zh: '我能感受到他人的情感。' } },
  { id: 'neo120-59', factor: 'O', facet: 'O3', key: '-', text: { en: 'Rarely notice my emotional reactions.',   zh: '我很少注意到自己的情绪反应。' } },
  { id: 'neo120-60', factor: 'O', facet: 'O3', key: '-', text: { en: "Don't understand people who get emotional.", zh: '我不理解容易情绪化的人。' } },
];

const O4: BigFiveQuestion[] = [
  { id: 'neo120-61', factor: 'O', facet: 'O4', key: '+', text: { en: 'Prefer variety to routine.',              zh: '我喜欢多样性胜过例行公事。' } },
  { id: 'neo120-62', factor: 'O', facet: 'O4', key: '-', text: { en: 'Prefer to stick with things that I know.', zh: '我更喜欢坚持我熟悉的事物。' } },
  { id: 'neo120-63', factor: 'O', facet: 'O4', key: '-', text: { en: 'Dislike changes.',                        zh: '我不喜欢变化。' } },
  { id: 'neo120-64', factor: 'O', facet: 'O4', key: '-', text: { en: 'Am attached to conventional ways.',       zh: '我依恋传统的方式。' } },
];

const O5: BigFiveQuestion[] = [
  { id: 'neo120-65', factor: 'O', facet: 'O5', key: '+', text: { en: 'Love to read challenging material.',          zh: '我喜欢阅读有挑战性的材料。' } },
  { id: 'neo120-66', factor: 'O', facet: 'O5', key: '-', text: { en: 'Avoid philosophical discussions.',            zh: '我避免哲学讨论。' } },
  { id: 'neo120-67', factor: 'O', facet: 'O5', key: '-', text: { en: 'Have difficulty understanding abstract ideas.', zh: '我难以理解抽象的概念。' } },
  { id: 'neo120-68', factor: 'O', facet: 'O5', key: '-', text: { en: 'Am not interested in theoretical discussions.', zh: '我对理论讨论不感兴趣。' } },
];

const O6: BigFiveQuestion[] = [
  { id: 'neo120-69', factor: 'O', facet: 'O6', key: '+', text: { en: 'Tend to vote for liberal political candidates.',   zh: '我倾向于投票给开明的政治候选人。' } },
  { id: 'neo120-70', factor: 'O', facet: 'O6', key: '+', text: { en: 'Believe that there is no absolute right and wrong.', zh: '我相信没有绝对的对与错。' } },
  { id: 'neo120-71', factor: 'O', facet: 'O6', key: '-', text: { en: 'Tend to vote for conservative political candidates.', zh: '我倾向于投票给保守的政治候选人。' } },
  { id: 'neo120-72', factor: 'O', facet: 'O6', key: '-', text: { en: 'Believe that we should be tough on crime.',        zh: '我认为应该严厉打击犯罪。' } },
];

// AGREEABLENESS

const A1: BigFiveQuestion[] = [
  { id: 'neo120-73', factor: 'A', facet: 'A1', key: '+', text: { en: 'Trust others.',                      zh: '我信任他人。' } },
  { id: 'neo120-74', factor: 'A', facet: 'A1', key: '+', text: { en: 'Believe that others have good intentions.', zh: '我相信他人出于好意。' } },
  { id: 'neo120-75', factor: 'A', facet: 'A1', key: '+', text: { en: 'Trust what people say.',             zh: '我相信别人说的话。' } },
  { id: 'neo120-76', factor: 'A', facet: 'A1', key: '-', text: { en: 'Distrust people.',                   zh: '我不信任别人。' } },
];

const A2: BigFiveQuestion[] = [
  { id: 'neo120-77', factor: 'A', facet: 'A2', key: '-', text: { en: 'Use others for my own ends.',        zh: '我利用他人来达到自己的目的。' } },
  { id: 'neo120-78', factor: 'A', facet: 'A2', key: '-', text: { en: 'Cheat to get ahead.',               zh: '我靠欺骗来获得优势。' } },
  { id: 'neo120-79', factor: 'A', facet: 'A2', key: '-', text: { en: 'Take advantage of others.',         zh: '我占别人的便宜。' } },
  { id: 'neo120-80', factor: 'A', facet: 'A2', key: '-', text: { en: "Obstruct others' plans.",           zh: '我阻碍他人的计划。' } },
];

const A3: BigFiveQuestion[] = [
  { id: 'neo120-81', factor: 'A', facet: 'A3', key: '+', text: { en: 'Am concerned about others.',               zh: '我关心他人。' } },
  { id: 'neo120-82', factor: 'A', facet: 'A3', key: '+', text: { en: 'Love to help others.',                     zh: '我乐于助人。' } },
  { id: 'neo120-83', factor: 'A', facet: 'A3', key: '-', text: { en: 'Am indifferent to the feelings of others.', zh: '我对他人的感受漠不关心。' } },
  { id: 'neo120-84', factor: 'A', facet: 'A3', key: '-', text: { en: 'Take no time for others.',                 zh: '我不花时间在他人身上。' } },
];

const A4: BigFiveQuestion[] = [
  { id: 'neo120-85', factor: 'A', facet: 'A4', key: '-', text: { en: 'Love a good fight.',    zh: '我喜欢争论。' } },
  { id: 'neo120-86', factor: 'A', facet: 'A4', key: '-', text: { en: 'Yell at people.',       zh: '我对别人大喊大叫。' } },
  { id: 'neo120-87', factor: 'A', facet: 'A4', key: '-', text: { en: 'Insult people.',        zh: '我侮辱别人。' } },
  { id: 'neo120-88', factor: 'A', facet: 'A4', key: '-', text: { en: 'Get back at others.',  zh: '我报复他人。' } },
];

const A5: BigFiveQuestion[] = [
  { id: 'neo120-89', factor: 'A', facet: 'A5', key: '-', text: { en: 'Believe that I am better than others.', zh: '我认为自己比别人优秀。' } },
  { id: 'neo120-90', factor: 'A', facet: 'A5', key: '-', text: { en: 'Think highly of myself.',              zh: '我对自己评价很高。' } },
  { id: 'neo120-91', factor: 'A', facet: 'A5', key: '-', text: { en: 'Have a high opinion of myself.',       zh: '我自视甚高。' } },
  { id: 'neo120-92', factor: 'A', facet: 'A5', key: '-', text: { en: 'Boast about my virtues.',              zh: '我吹嘘自己的优点。' } },
];

const A6: BigFiveQuestion[] = [
  { id: 'neo120-93', factor: 'A', facet: 'A6', key: '+', text: { en: 'Sympathize with the homeless.',                      zh: '我同情无家可归的人。' } },
  { id: 'neo120-94', factor: 'A', facet: 'A6', key: '+', text: { en: 'Feel sympathy for those who are worse off than myself.', zh: '我同情那些处境不如我的人。' } },
  { id: 'neo120-95', factor: 'A', facet: 'A6', key: '-', text: { en: "Am not interested in other people's problems.",      zh: '我对他人的问题不感兴趣。' } },
  { id: 'neo120-96', factor: 'A', facet: 'A6', key: '-', text: { en: 'Try not to think about the needy.',                  zh: '我尽量不去想那些需要帮助的人。' } },
];

// CONSCIENTIOUSNESS

const C1: BigFiveQuestion[] = [
  { id: 'neo120-97',  factor: 'C', facet: 'C1', key: '+', text: { en: 'Complete tasks successfully.', zh: '我成功地完成任务。' } },
  { id: 'neo120-98',  factor: 'C', facet: 'C1', key: '+', text: { en: 'Excel in what I do.',          zh: '我在所做的事情上表现出色。' } },
  { id: 'neo120-99',  factor: 'C', facet: 'C1', key: '+', text: { en: 'Handle tasks smoothly.',       zh: '我顺利地处理任务。' } },
  { id: 'neo120-100', factor: 'C', facet: 'C1', key: '+', text: { en: 'Know how to get things done.', zh: '我知道如何把事情做好。' } },
];

const C2: BigFiveQuestion[] = [
  { id: 'neo120-101', factor: 'C', facet: 'C2', key: '+', text: { en: 'Like to tidy up.',                                      zh: '我喜欢整理。' } },
  { id: 'neo120-102', factor: 'C', facet: 'C2', key: '-', text: { en: "Often forget to put things back in their proper place.", zh: '我经常忘记把东西放回原处。' } },
  { id: 'neo120-103', factor: 'C', facet: 'C2', key: '-', text: { en: 'Leave a mess in my room.',                              zh: '我把房间弄得很乱。' } },
  { id: 'neo120-104', factor: 'C', facet: 'C2', key: '-', text: { en: 'Leave my belongings around.',                           zh: '我把东西乱放。' } },
];

const C3: BigFiveQuestion[] = [
  { id: 'neo120-105', factor: 'C', facet: 'C3', key: '+', text: { en: 'Keep my promises.',   zh: '我信守承诺。' } },
  { id: 'neo120-106', factor: 'C', facet: 'C3', key: '+', text: { en: 'Tell the truth.',     zh: '我说实话。' } },
  { id: 'neo120-107', factor: 'C', facet: 'C3', key: '-', text: { en: 'Break rules.',        zh: '我违反规则。' } },
  { id: 'neo120-108', factor: 'C', facet: 'C3', key: '-', text: { en: 'Break my promises.',  zh: '我违背承诺。' } },
];

const C4: BigFiveQuestion[] = [
  { id: 'neo120-109', factor: 'C', facet: 'C4', key: '+', text: { en: "Do more than what's expected of me.", zh: '我做得比期望的更多。' } },
  { id: 'neo120-110', factor: 'C', facet: 'C4', key: '+', text: { en: 'Work hard.',                         zh: '我努力工作。' } },
  { id: 'neo120-111', factor: 'C', facet: 'C4', key: '-', text: { en: 'Put little time and effort into my work.', zh: '我在工作上投入很少的时间和精力。' } },
  { id: 'neo120-112', factor: 'C', facet: 'C4', key: '-', text: { en: 'Do just enough work to get by.',    zh: '我只做刚好够应付的工作。' } },
];

const C5: BigFiveQuestion[] = [
  { id: 'neo120-113', factor: 'C', facet: 'C5', key: '+', text: { en: 'Am always prepared.',          zh: '我总是做好准备。' } },
  { id: 'neo120-114', factor: 'C', facet: 'C5', key: '+', text: { en: 'Carry out my plans.',          zh: '我执行自己的计划。' } },
  { id: 'neo120-115', factor: 'C', facet: 'C5', key: '-', text: { en: 'Waste my time.',               zh: '我浪费时间。' } },
  { id: 'neo120-116', factor: 'C', facet: 'C5', key: '-', text: { en: 'Have difficulty starting tasks.', zh: '我难以开始执行任务。' } },
];

const C6: BigFiveQuestion[] = [
  { id: 'neo120-117', factor: 'C', facet: 'C6', key: '-', text: { en: 'Jump into things without thinking.', zh: '我不假思索就投入行动。' } },
  { id: 'neo120-118', factor: 'C', facet: 'C6', key: '-', text: { en: 'Make rash decisions.',              zh: '我做出仓促的决定。' } },
  { id: 'neo120-119', factor: 'C', facet: 'C6', key: '-', text: { en: 'Rush into things.',                 zh: '我急于行事。' } },
  { id: 'neo120-120', factor: 'C', facet: 'C6', key: '-', text: { en: 'Act without thinking.',             zh: '我不经思考就行动。' } },
];

// ---------------------------------------------------------------------------
// Interleaving
//
// 30 facets organized by factor, in factor-cycle order: N, E, O, A, C
// 6 facets per factor → 6 groups of 5 (one facet per factor per group)
//
// facetGroups[g] = [N(g+1), E(g+1), O(g+1), A(g+1), C(g+1)]  for g = 0..5
//
// Each round picks item[round] from each facet, cycling through facets with
// a factor-shifted starting point to avoid monotony across rounds.
//
// Round 1 (item[0]): start factor N  → order: N,E,O,A,C repeated 6 times
// Round 2 (item[1]): start factor E  → order: E,O,A,C,N repeated 6 times
// Round 3 (item[2]): start factor O  → order: O,A,C,N,E repeated 6 times
// Round 4 (item[3]): start factor A  → order: A,C,N,E,O repeated 6 times
// ---------------------------------------------------------------------------

// Group facets: index 0..5 corresponds to facet number 1..6 within each factor
const facetsByFactor: [
  BigFiveQuestion[], BigFiveQuestion[], BigFiveQuestion[],
  BigFiveQuestion[], BigFiveQuestion[], BigFiveQuestion[]
][] = [
  // N: [N1, N2, N3, N4, N5, N6]
  [N1, N2, N3, N4, N5, N6],
  // E: [E1, E2, E3, E4, E5, E6]
  [E1, E2, E3, E4, E5, E6],
  // O: [O1, O2, O3, O4, O5, O6]
  [O1, O2, O3, O4, O5, O6],
  // A: [A1, A2, A3, A4, A5, A6]
  [A1, A2, A3, A4, A5, A6],
  // C: [C1, C2, C3, C4, C5, C6]
  [C1, C2, C3, C4, C5, C6],
];

// Factor order indices into facetsByFactor: N=0, E=1, O=2, A=3, C=4
// Each round shifts the starting factor by 1
// roundFactorOrder[round] = ordered list of factor indices for that round
const roundFactorOrders: number[][] = [
  [0, 1, 2, 3, 4], // Round 1: N,E,O,A,C
  [1, 2, 3, 4, 0], // Round 2: E,O,A,C,N
  [2, 3, 4, 0, 1], // Round 3: O,A,C,N,E
  [3, 4, 0, 1, 2], // Round 4: A,C,N,E,O
];

// Build the interleaved array:
// For each round (0..3):
//   For each of the 6 facet-groups (facet index 0..5 within factor):
//     Iterate factors in the round's shifted order
//     Pick item[round] from that facet
const interleavedItems: BigFiveQuestion[] = [];

for (let round = 0; round < 4; round++) {
  const factorOrder = roundFactorOrders[round];
  for (let facetIdx = 0; facetIdx < 6; facetIdx++) {
    for (const factorIdx of factorOrder) {
      interleavedItems.push(facetsByFactor[factorIdx][facetIdx][round]);
    }
  }
}

// ---------------------------------------------------------------------------
// Exported arrays
// ---------------------------------------------------------------------------

/** All 120 IPIP-NEO-120 items in interleaved administration order */
export const questions120: BigFiveQuestion[] = interleavedItems;

/** Alias for explicit administered-order export (used by BF-07 tests) */
export const administeredOrder: BigFiveQuestion[] = interleavedItems;

export default questions120;
