/**
 * Enneagram question bank — bilingual (English / Chinese).
 *
 * Structure:
 *   - 108 total questions across 9 types (12 per type)
 *   - 6 per type with mode "both"  → appear in both quick (54) and full (108) modes
 *   - 6 per type with mode "full"  → appear only in full mode (108)
 *
 * Quick mode: filter mode === 'quick' | 'both'  → 54 questions
 * Full  mode: filter mode === 'full'  | 'both'  → 108 questions
 *
 * Questions probe core MOTIVATIONS and FEARS, not surface behaviors.
 * Likert scale: 1 = strongly disagree … 5 = strongly agree.
 */

export interface QuestionEntry {
  id: string;
  type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  mode: 'quick' | 'full' | 'both';
  text: { en: string; zh: string };
  weight?: {
    primary: number;
    secondary?: { type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9; weight: number };
  };
}

// ---------------------------------------------------------------------------
// TYPE 1 — The Reformer: core need to be good/right, fear of being wrong/bad
// ---------------------------------------------------------------------------

const type1Both: QuestionEntry[] = [
  {
    id: 'q1-b01',
    type: 1,
    mode: 'both',
    text: {
      en: 'I feel a persistent inner pressure to do things the right way, even for small tasks.',
      zh: '我内心深处有一种持续的压力，无论多小的事情，都必须以正确的方式来完成。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q1-b02',
    type: 1,
    mode: 'both',
    text: {
      en: 'I find it difficult to rest when I know something could be improved.',
      zh: '当我知道某件事还可以做得更好时，我很难真正放松下来。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q1-b03',
    type: 1,
    mode: 'both',
    text: {
      en: 'Making a mistake feels deeply threatening to my sense of integrity.',
      zh: '犯错对我来说是一种深刻的威胁，会动摇我对自身品行的认同感。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q1-b04',
    type: 1,
    mode: 'both',
    text: {
      en: 'I feel a quiet but persistent sense of being flawed or not quite good enough, no matter how well I perform.',
      zh: '无论我做得多好，内心深处总有一种低沉而持续的感觉，觉得自己还不够好，还有缺陷。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q1-b05',
    type: 1,
    mode: 'both',
    text: {
      en: 'The awareness of everything that could be better makes it hard for me to enjoy what is already good.',
      zh: '对"一切都还可以更好"的清醒认知，让我很难真正享受那些已经足够好的事物。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q1-b06',
    type: 1,
    mode: 'both',
    text: {
      en: 'I feel resentful when people take shortcuts instead of doing things properly.',
      zh: '当别人为了省事而走捷径、不按规矩来时，我会感到不满。',
    },
    weight: { primary: 1.0 },
  },
];

const type1Full: QuestionEntry[] = [
  {
    id: 'q1-f01',
    type: 1,
    mode: 'full',
    text: {
      en: 'I suppress or control my anger because expressing it feels improper.',
      zh: '我会压制或克制自己的愤怒，因为在我看来，流露愤怒是不得体的。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q1-f02',
    type: 1,
    mode: 'full',
    text: {
      en: 'I hold myself to a higher standard than I apply to most people around me.',
      zh: '我对自己的要求，往往比对周围大多数人的要求都要严苛得多。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q1-f03',
    type: 1,
    mode: 'full',
    text: {
      en: 'The thought of being seen as irresponsible or careless is deeply uncomfortable for me.',
      zh: '被他人视为不负责任或粗心大意，对我来说是一件非常难以接受的事。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q1-f04',
    type: 1,
    mode: 'full',
    text: {
      en: 'I have a strong sense that there is a correct way to handle most situations.',
      zh: '我坚信，面对大多数情况都存在一种正确的处理方式。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q1-f05',
    type: 1,
    mode: 'full',
    text: {
      en: 'I feel guilty when I relax before finishing everything I consider important.',
      zh: '在完成所有我认为重要的事情之前，一旦我选择放松，就会感到内疚。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q1-f06',
    type: 1,
    mode: 'full',
    text: {
      en: 'I believe most problems could be avoided if people simply followed the rules.',
      zh: '我认为，如果人们能够遵守规则，大多数问题本可以避免。',
    },
    weight: { primary: 1.0 },
  },
];

// ---------------------------------------------------------------------------
// TYPE 2 — The Helper: core need to be loved/wanted, fear of being unwanted
// ---------------------------------------------------------------------------

const type2Both: QuestionEntry[] = [
  {
    id: 'q2-b01',
    type: 2,
    mode: 'both',
    text: {
      en: 'I feel most alive and valued when I am needed by the people I care about.',
      zh: '当我被在乎的人所需要时，我感到最有活力、最有价值。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q2-b02',
    type: 2,
    mode: 'both',
    text: {
      en: 'I find it easier to give help than to ask for it.',
      zh: '给予别人帮助，对我来说远比开口求助更自然、更容易。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q2-b03',
    type: 2,
    mode: 'both',
    text: {
      en: 'The fear of being unloved or unwanted deeply motivates how I relate to others.',
      zh: '对不被爱、不被需要的恐惧，深刻地影响着我与他人相处的方式。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q2-b04',
    type: 2,
    mode: 'both',
    text: {
      en: 'I tend to intuitively sense what other people need before they say it.',
      zh: '我往往能在别人开口之前，就直觉地感知到对方的需求。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q2-b05',
    type: 2,
    mode: 'both',
    text: {
      en: 'I sometimes feel resentful when my efforts to help go unacknowledged.',
      zh: '当我付出的帮助没有得到认可时，我有时会感到一丝委屈或怨怼。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q2-b06',
    type: 2,
    mode: 'both',
    text: {
      en: 'I shape myself to meet the needs and expectations of the people I care about.',
      zh: '为了满足我在乎的人的需求和期待，我常常会调整自己的言行。',
    },
    weight: { primary: 1.0 },
  },
];

const type2Full: QuestionEntry[] = [
  {
    id: 'q2-f01',
    type: 2,
    mode: 'full',
    text: {
      en: 'I find it hard to acknowledge my own needs directly, especially to those I am closest to.',
      zh: '我很难直接向他人表达自己的需求，尤其是对最亲近的人。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q2-f02',
    type: 2,
    mode: 'full',
    text: {
      en: 'I worry that if I stopped being helpful, people would no longer want me around.',
      zh: '我担心，如果我不再那么有用、那么乐于助人，别人就不再需要我了。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q2-f03',
    type: 2,
    mode: 'full',
    text: {
      en: 'When I am not helping anyone, I sometimes struggle to feel that I have a valid reason to take up space.',
      zh: '当我没有在帮助任何人的时候，我有时会难以感受到自己存在的理由。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q2-f04',
    type: 2,
    mode: 'full',
    text: {
      en: 'I feel a deep satisfaction when I help someone navigate a difficult situation.',
      zh: '当我帮助他人渡过困境时，我会感到内心深处的满足与充实。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q2-f05',
    type: 2,
    mode: 'full',
    text: {
      en: 'I adapt how I present myself depending on what I believe each person needs from me.',
      zh: '我会根据每个人对我的期待，调整自己展现出来的一面。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q2-f06',
    type: 2,
    mode: 'full',
    text: {
      en: 'Feeling rejected or pushed away is one of my deepest fears.',
      zh: '被拒绝或被推开，是我内心最深处的恐惧之一。',
    },
    weight: { primary: 1.0 },
  },
];

// ---------------------------------------------------------------------------
// TYPE 3 — The Achiever: core need to be valuable/admired, fear of worthlessness
// ---------------------------------------------------------------------------

const type3Both: QuestionEntry[] = [
  {
    id: 'q3-b01',
    type: 3,
    mode: 'both',
    text: {
      en: 'I am deeply motivated by achieving goals that others will recognize and admire.',
      zh: '追求能被他人认可和赞赏的目标，是驱动我前进的重要动力。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q3-b02',
    type: 3,
    mode: 'both',
    text: {
      en: 'I feel anxious when I am not making visible progress toward a meaningful goal.',
      zh: '当我没有朝着有意义的目标取得明显进展时，我会感到焦虑不安。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q3-b03',
    type: 3,
    mode: 'both',
    text: {
      en: 'I worry that my worth as a person depends on what I achieve and accomplish.',
      zh: '我担心，自身的价值取决于我取得了什么成就。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q3-b04',
    type: 3,
    mode: 'both',
    text: {
      en: 'I naturally adapt my image or presentation to be more impressive in different situations.',
      zh: '我会自然地根据场合调整自己的形象或表达方式，以便给人留下更好的印象。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q3-b05',
    type: 3,
    mode: 'both',
    text: {
      en: 'I find it difficult to slow down and be still because I feel I should always be doing something.',
      zh: '我很难慢下来、静下来，因为我总觉得自己应该一直在做些什么。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q3-b06',
    type: 3,
    mode: 'both',
    text: {
      en: 'Being seen as a failure or underachiever is one of my biggest fears.',
      zh: '被人视为失败者或没有出息的人，是我最深的恐惧之一。',
    },
    weight: { primary: 1.0 },
  },
];

const type3Full: QuestionEntry[] = [
  {
    id: 'q3-f01',
    type: 3,
    mode: 'full',
    text: {
      en: 'I sometimes lose touch with what I genuinely feel because I am focused on what I should appear to feel.',
      zh: '我有时会脱离自己真实的感受，因为我更在意的是应该表现出什么样的状态。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q3-f02',
    type: 3,
    mode: 'full',
    text: {
      en: 'I curate my self-presentation carefully so others see me as competent and successful.',
      zh: '我非常注重塑造自己的形象，希望别人看到的是一个能干、成功的我。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q3-f03',
    type: 3,
    mode: 'full',
    text: {
      en: 'I measure my own value largely by how much I accomplish compared to others.',
      zh: '我在很大程度上通过与他人的比较来衡量自身的价值。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q3-f04',
    type: 3,
    mode: 'full',
    text: {
      en: 'I feel an urgency to fill my time with productive activity.',
      zh: '我时常感到一种迫切感，想要用富有成效的事情填满每一段时间。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q3-f05',
    type: 3,
    mode: 'full',
    text: {
      en: 'Without an audience or recognition, I sometimes wonder whether the effort is even worth it.',
      zh: '没有观众或认可的时候，我有时会怀疑付出究竟是否值得。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q3-f06',
    type: 3,
    mode: 'full',
    text: {
      en: 'I find it hard to rest without feeling I should be doing something more productive.',
      zh: '我很难真正休息，因为总觉得应该用这段时间做些更有意义的事情。',
    },
    weight: { primary: 1.0 },
  },
];

// ---------------------------------------------------------------------------
// TYPE 4 — The Individualist: core need for authenticity/uniqueness, fear of insignificance
// ---------------------------------------------------------------------------

const type4Both: QuestionEntry[] = [
  {
    id: 'q4-b01',
    type: 4,
    mode: 'both',
    text: {
      en: 'I feel a deep longing to be understood as someone truly unique and individual.',
      zh: '我内心深处渴望被他人理解和接受，作为一个真实而独特的个体。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q4-b02',
    type: 4,
    mode: 'both',
    text: {
      en: 'I sometimes feel that something essential is missing from my life that others seem to have.',
      zh: '我有时会感到，生命中缺失了某种根本性的东西，而别人似乎都拥有它。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q4-b03',
    type: 4,
    mode: 'both',
    text: {
      en: 'I am drawn to explore the full range of human emotion rather than stay on the surface.',
      zh: '比起停留在表面，我更想深入探索人类情感的全部深度与广度。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q4-b04',
    type: 4,
    mode: 'both',
    text: {
      en: 'Being ordinary or blending into the crowd feels like a kind of personal failure to me.',
      zh: '对我来说，平凡普通或淹没在人群中，感觉像是一种个人上的失败。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q4-b05',
    type: 4,
    mode: 'both',
    text: {
      en: 'I often compare myself to others and feel that I come up lacking in some way.',
      zh: '我常常拿自己与他人相比，感到自己在某方面有所欠缺。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q4-b06',
    type: 4,
    mode: 'both',
    text: {
      en: 'Expressing my inner world through creative or aesthetic forms feels essential to who I am.',
      zh: '通过创意或审美的形式表达内心世界，对我来说是自身存在不可或缺的一部分。',
    },
    weight: { primary: 1.0 },
  },
];

const type4Full: QuestionEntry[] = [
  {
    id: 'q4-f01',
    type: 4,
    mode: 'full',
    text: {
      en: 'I hold on to melancholy or longing because it feels like an authentic part of who I am.',
      zh: '我会留住那些忧郁与向往的情绪，因为它们让我感到是真实自我的一部分。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q4-f02',
    type: 4,
    mode: 'full',
    text: {
      en: 'I feel envious when others seem to effortlessly have what I deeply want.',
      zh: '当别人似乎毫不费力地拥有我深深渴望的东西时，我会感到嫉妒。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q4-f03',
    type: 4,
    mode: 'full',
    text: {
      en: 'I seek relationships in which I can be fully known, including my darker or more complex sides.',
      zh: '我追求那种能被完全了解的关系——包括我更阴暗、更复杂的那一面。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q4-f04',
    type: 4,
    mode: 'full',
    text: {
      en: 'I often sense a gap between my ideal self and who I actually am.',
      zh: '我经常感受到理想中的自我与现实中的自己之间的落差。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q4-f05',
    type: 4,
    mode: 'full',
    text: {
      en: 'I find meaning and depth in experiences that many people would consider too painful to dwell on.',
      zh: '我能在许多人觉得太痛苦、不愿回味的经历中，发现意义与深度。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q4-f06',
    type: 4,
    mode: 'full',
    text: {
      en: 'I fear that if people truly knew me, they would find something fundamentally flawed or unlovable.',
      zh: '我担心，如果别人真正了解我，他们会发现我有某种根本上的缺陷，是不值得被爱的。',
    },
    weight: { primary: 1.0 },
  },
];

// ---------------------------------------------------------------------------
// TYPE 5 — The Investigator: core need for competence/capability, fear of being overwhelmed
// ---------------------------------------------------------------------------

const type5Both: QuestionEntry[] = [
  {
    id: 'q5-b01',
    type: 5,
    mode: 'both',
    text: {
      en: 'I need time alone to replenish my energy; too much social interaction drains me.',
      zh: '我需要独处来恢复精力；过多的社交互动会让我感到精疲力竭。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q5-b02',
    type: 5,
    mode: 'both',
    text: {
      en: 'I protect my privacy and personal space carefully because intrusions feel violating.',
      zh: '我会认真守护自己的隐私和个人空间，因为被侵扰的感觉令我非常不舒适。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q5-b03',
    type: 5,
    mode: 'both',
    text: {
      en: 'Before speaking or acting, I prefer to understand something thoroughly.',
      zh: '在发言或行动之前，我更倾向于先对事物有深入、透彻的了解。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q5-b04',
    type: 5,
    mode: 'both',
    text: {
      en: 'I fear being overwhelmed by the demands and emotions of other people.',
      zh: '我担心被他人的需求和情绪所淹没，这让我感到恐惧。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q5-b05',
    type: 5,
    mode: 'both',
    text: {
      en: 'I tend to detach emotionally and observe rather than participate in intense situations.',
      zh: '在高度情绪化的场合，我倾向于情感上抽离，以旁观者的姿态观察，而非投入其中。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q5-b06',
    type: 5,
    mode: 'both',
    text: {
      en: 'Mastering a subject deeply feels more important to me than having broad but shallow knowledge.',
      zh: '对我来说，深入掌握一个领域比广泛但浅尝的知识更有意义。',
    },
    weight: { primary: 1.0 },
  },
];

const type5Full: QuestionEntry[] = [
  {
    id: 'q5-f01',
    type: 5,
    mode: 'full',
    text: {
      en: 'I feel uncomfortable when others make unexpected demands on my time or energy.',
      zh: '当他人对我的时间或精力提出意外要求时，我会感到不自在。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q5-f02',
    type: 5,
    mode: 'full',
    text: {
      en: 'I minimize my needs and wants to remain as self-sufficient as possible.',
      zh: '我会尽量减少自己的需求和欲望，以便尽可能地保持自给自足。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q5-f03',
    type: 5,
    mode: 'full',
    text: {
      en: 'I prefer to think through a situation privately before sharing my conclusions.',
      zh: '我倾向于先在脑海中独自思考一个问题，再把结论分享给他人。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q5-f04',
    type: 5,
    mode: 'full',
    text: {
      en: 'I feel most capable and confident when I have had time to prepare thoroughly.',
      zh: '当我有充足的时间做好充分准备时，我感到最有能力、最有信心。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q5-f05',
    type: 5,
    mode: 'full',
    text: {
      en: 'I struggle to be present and engaged when I feel emotionally unprepared.',
      zh: '当情感上没有准备好时，我很难真正投入当下、全身心参与其中。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q5-f06',
    type: 5,
    mode: 'full',
    text: {
      en: 'I find it easier to connect with ideas and concepts than with the feelings of others.',
      zh: '对我来说，与思想和概念产生连接，比理解他人的情感感受更为自然。',
    },
    weight: { primary: 1.0 },
  },
];

// ---------------------------------------------------------------------------
// TYPE 6 — The Loyalist: core need for security/support, fear of being without support
// ---------------------------------------------------------------------------

const type6Both: QuestionEntry[] = [
  {
    id: 'q6-b01',
    type: 6,
    mode: 'both',
    text: {
      en: 'I often scan for potential problems or dangers that others haven\'t considered.',
      zh: '我经常会去设想别人还没考虑到的潜在问题或危险。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q6-b02',
    type: 6,
    mode: 'both',
    text: {
      en: 'Having trustworthy people and systems I can rely on is essential to my sense of safety.',
      zh: '拥有值得信赖的人和可以依靠的系统，对我的安全感至关重要。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q6-b03',
    type: 6,
    mode: 'both',
    text: {
      en: 'I find it difficult to fully trust people until they have consistently shown their reliability.',
      zh: '在别人持续证明自己的可靠性之前，我很难完全信任他们。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q6-b04',
    type: 6,
    mode: 'both',
    text: {
      en: 'I question authority and want to understand the reasoning behind rules and decisions.',
      zh: '我会质疑权威，想要了解规则与决定背后的逻辑与理由。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q6-b05',
    type: 6,
    mode: 'both',
    text: {
      en: 'Uncertainty about the future makes me uneasy in a way that is hard to shake.',
      zh: '对未来的不确定性让我感到一种难以消散的不安。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q6-b06',
    type: 6,
    mode: 'both',
    text: {
      en: 'Once I commit to a person or a cause, I am fiercely loyal even when things get difficult.',
      zh: '一旦我认定了某个人或某件事，即便面临困难，我也会保持坚定的忠诚。',
    },
    weight: { primary: 1.0 },
  },
];

const type6Full: QuestionEntry[] = [
  {
    id: 'q6-f01',
    type: 6,
    mode: 'full',
    text: {
      en: 'I replay worst-case scenarios in my mind as a way of preparing for what could go wrong.',
      zh: '我会在脑海中反复推演最坏的情况，以此准备应对可能出现的问题。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q6-f02',
    type: 6,
    mode: 'full',
    text: {
      en: 'I often second-guess my own decisions, worrying that I have missed something important.',
      zh: '我经常会对自己的决定产生怀疑，担心自己忽略了某些重要的事情。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q6-f03',
    type: 6,
    mode: 'full',
    text: {
      en: 'I am deeply aware that my sense of security depends on having trustworthy people or structures I can lean on.',
      zh: '我深刻意识到，自己的安全感取决于是否有可以依靠的可信赖之人或稳固的结构。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q6-f04',
    type: 6,
    mode: 'full',
    text: {
      en: 'I look for hidden motives when someone offers unexpected help or kindness.',
      zh: '当有人意外地提供帮助或表示善意时，我会想探究其背后是否有隐藏的动机。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q6-f05',
    type: 6,
    mode: 'full',
    text: {
      en: 'I feel a strong pull toward identifying with a group or community that shares my values.',
      zh: '我感到一种强烈的归属驱动，想要找到与我价值观相同的群体或社区。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q6-f06',
    type: 6,
    mode: 'full',
    text: {
      en: 'I would rather over-prepare and be wrong about a threat than be caught off guard.',
      zh: '比起被突如其来的事情打个措手不及，我宁愿过度准备，即便最终证明威胁是虚惊一场。',
    },
    weight: { primary: 1.0 },
  },
];

// ---------------------------------------------------------------------------
// TYPE 7 — The Enthusiast: core need to be satisfied/content, fear of deprivation/being trapped
// ---------------------------------------------------------------------------

const type7Both: QuestionEntry[] = [
  {
    id: 'q7-b01',
    type: 7,
    mode: 'both',
    text: {
      en: 'I seek out new experiences and variety because routine quickly begins to feel like a trap.',
      zh: '我不断寻求新体验和变化，因为一成不变的生活很快就会让我感到像是被困住了。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q7-b02',
    type: 7,
    mode: 'both',
    text: {
      en: 'I keep my options open because committing to one path means closing off others.',
      zh: '我倾向于保留多种可能性，因为一旦选定一条路，就意味着放弃了其他选择。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q7-b03',
    type: 7,
    mode: 'both',
    text: {
      en: 'When I feel pain or anxiety, I tend to redirect my attention toward something more pleasant.',
      zh: '当我感到痛苦或焦虑时，我倾向于将注意力转移到更令人愉快的事物上。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q7-b04',
    type: 7,
    mode: 'both',
    text: {
      en: 'I am energized by plans and possibilities more than by the execution of existing commitments.',
      zh: '计划和可能性比实际执行现有承诺更能让我充满活力。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q7-b05',
    type: 7,
    mode: 'both',
    text: {
      en: 'I fear being stuck in circumstances that limit my freedom or choices.',
      zh: '我害怕被困在限制我自由和选择的处境中。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q7-b06',
    type: 7,
    mode: 'both',
    text: {
      en: 'I use humor and optimism as tools to reframe difficult situations.',
      zh: '我会用幽默和乐观的态度来重新解读困难的处境。',
    },
    weight: { primary: 1.0 },
  },
];

const type7Full: QuestionEntry[] = [
  {
    id: 'q7-f01',
    type: 7,
    mode: 'full',
    text: {
      en: 'I become restless or irritable when I have to sit with unresolved discomfort.',
      zh: '当我不得不承受未解决的不适时，我会变得坐立不安甚至有些烦躁。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q7-f02',
    type: 7,
    mode: 'full',
    text: {
      en: 'I tend to see the silver lining even in genuinely bad situations.',
      zh: '即便在真正糟糕的处境中，我也倾向于去寻找和看到积极的一面。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q7-f03',
    type: 7,
    mode: 'full',
    text: {
      en: 'I often have many projects running simultaneously and switch between them easily.',
      zh: '我通常同时推进许多项目，并能在它们之间轻松切换。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q7-f04',
    type: 7,
    mode: 'full',
    text: {
      en: 'I fear that if I stop pursuing new things, I will miss out on what life has to offer.',
      zh: '我担心，一旦停止追求新事物，我就会错过生命中最精彩的部分。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q7-f05',
    type: 7,
    mode: 'full',
    text: {
      en: 'I find it easier to make other people feel good than to sit with my own sadness.',
      zh: '让别人高兴起来，对我来说比直面自己的悲伤要容易得多。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q7-f06',
    type: 7,
    mode: 'full',
    text: {
      en: 'Deep down, I believe that life should be an adventure, not a series of obligations.',
      zh: '在我内心深处，我相信生活应该是一场冒险，而不是一连串的义务和责任。',
    },
    weight: { primary: 1.0 },
  },
];

// ---------------------------------------------------------------------------
// TYPE 8 — The Challenger: core need for independence/strength, fear of being controlled/weak
// ---------------------------------------------------------------------------

const type8Both: QuestionEntry[] = [
  {
    id: 'q8-b01',
    type: 8,
    mode: 'both',
    text: {
      en: 'I need to feel in control of my own life and refuse to be dominated by anyone.',
      zh: '我需要掌控自己的生活，绝不允许任何人凌驾于我之上。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q8-b02',
    type: 8,
    mode: 'both',
    text: {
      en: 'I confront problems and conflicts head-on rather than avoiding them.',
      zh: '面对问题和冲突，我选择正面迎击，而非回避。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q8-b03',
    type: 8,
    mode: 'both',
    text: {
      en: 'Showing vulnerability feels dangerous because it could allow others to take advantage of me.',
      zh: '展现脆弱对我来说是危险的，因为这可能让别人趁虚而入。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q8-b04',
    type: 8,
    mode: 'both',
    text: {
      en: 'I feel a strong internal drive to protect those around me, even when they haven\'t asked for it.',
      zh: '我内心有一股强烈的冲动，想要保护身边的人，即便他们并没有开口请求。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q8-b05',
    type: 8,
    mode: 'both',
    text: {
      en: 'I can tell almost immediately whether someone is being genuine or trying to manipulate me.',
      zh: '我几乎能立刻感知到一个人是真诚的，还是在试图操控我。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q8-b06',
    type: 8,
    mode: 'both',
    text: {
      en: 'I prefer a direct challenge over subtle or passive-aggressive behavior.',
      zh: '我更喜欢直接的对抗，而非含糊其辞或暗中较劲的方式。',
    },
    weight: { primary: 1.0 },
  },
];

const type8Full: QuestionEntry[] = [
  {
    id: 'q8-f01',
    type: 8,
    mode: 'full',
    text: {
      en: 'I become intensely reactive when someone tries to control or restrict my choices.',
      zh: '当有人试图控制或限制我的选择时，我会有强烈的反应。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q8-f02',
    type: 8,
    mode: 'full',
    text: {
      en: 'I test people\'s loyalty and strength before I allow myself to trust them fully.',
      zh: '在我完全信任一个人之前，我会先试探他们的忠诚和实力。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q8-f03',
    type: 8,
    mode: 'full',
    text: {
      en: 'I pursue what I want with intensity and rarely wait for permission.',
      zh: '我会全力以赴地追求我想要的东西，很少等待别人的许可。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q8-f04',
    type: 8,
    mode: 'full',
    text: {
      en: 'I am deeply protective of the people I care about and will fight fiercely on their behalf.',
      zh: '对于我在乎的人，我有强烈的保护欲，会为他们奋力抗争。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q8-f05',
    type: 8,
    mode: 'full',
    text: {
      en: 'I find it difficult to show tenderness or emotional need to most people.',
      zh: '对大多数人，我很难表露出温柔或情感上的需求。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q8-f06',
    type: 8,
    mode: 'full',
    text: {
      en: 'I would rather be feared than pitied, and rather respected than liked.',
      zh: '我宁愿被人敬畏也不愿被同情，宁愿被人尊重也不愿只是被喜欢。',
    },
    weight: { primary: 1.0 },
  },
];

// ---------------------------------------------------------------------------
// TYPE 9 — The Peacemaker: core need for peace/harmony, fear of loss/separation
// ---------------------------------------------------------------------------

const type9Both: QuestionEntry[] = [
  {
    id: 'q9-b01',
    type: 9,
    mode: 'both',
    text: {
      en: 'I prioritize harmony in my relationships above expressing my own desires or opinions.',
      zh: '在表达自己的愿望或意见与维护关系中的和谐之间，我会优先选择后者。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q9-b02',
    type: 9,
    mode: 'both',
    text: {
      en: 'I find it difficult to identify what I truly want, separate from what others want.',
      zh: '我很难独立于他人的意愿之外，清晰地辨认出自己真正想要的是什么。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q9-b03',
    type: 9,
    mode: 'both',
    text: {
      en: 'Conflict feels threatening and I go to great lengths to avoid or smooth it over.',
      zh: '冲突让我感到威胁，我会竭尽所能地回避或化解它。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q9-b04',
    type: 9,
    mode: 'both',
    text: {
      en: 'I drift into a comfortable numbness or inertia when I don\'t want to deal with something.',
      zh: '当我不想处理某件事时，我会陷入一种舒适的麻木或惰性之中。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q9-b05',
    type: 9,
    mode: 'both',
    text: {
      en: 'I feel a quiet but persistent fear of being separated from or disconnected from those I love.',
      zh: '我内心深处有一种低沉但持续的恐惧，害怕与爱的人分离或失去联系。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q9-b06',
    type: 9,
    mode: 'both',
    text: {
      en: 'I can see multiple perspectives so well that I struggle to take a firm personal position.',
      zh: '我太能理解各方的立场，以至于很难形成并坚持自己明确的观点。',
    },
    weight: { primary: 1.0 },
  },
];

const type9Full: QuestionEntry[] = [
  {
    id: 'q9-f01',
    type: 9,
    mode: 'full',
    text: {
      en: 'I procrastinate on important personal goals while attending to others\' needs instead.',
      zh: '我常常把自己的重要目标一拖再拖，却优先去照顾别人的需求。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q9-f02',
    type: 9,
    mode: 'full',
    text: {
      en: 'The thought of someone being upset with me is enough to make me change my position or give way.',
      zh: '仅仅想到有人因为我而不高兴，就足以让我改变立场或让步。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q9-f03',
    type: 9,
    mode: 'full',
    text: {
      en: 'I sometimes wake up without a strong sense of what I want for myself today.',
      zh: '我有时醒来时，对于今天自己想做什么，并没有强烈清晰的感受。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q9-f04',
    type: 9,
    mode: 'full',
    text: {
      en: 'I lose myself in the priorities of others and neglect my own personal development.',
      zh: '我常常迷失在他人的事务中，而忽略了自己的个人成长与发展。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q9-f05',
    type: 9,
    mode: 'full',
    text: {
      en: 'I merge with those closest to me, taking on their concerns as my own.',
      zh: '我会与身边最亲近的人融为一体，将他们的忧虑当作自己的事来承担。',
    },
    weight: { primary: 1.0 },
  },
  {
    id: 'q9-f06',
    type: 9,
    mode: 'full',
    text: {
      en: 'I suppress my own anger and desires in order to maintain a sense of inner calm.',
      zh: '我会压制自己的愤怒和欲望，以维持内心的平静感。',
    },
    weight: { primary: 1.0 },
  },
];

// ---------------------------------------------------------------------------
// Combine and export
// ---------------------------------------------------------------------------

export const questions: QuestionEntry[] = [
  ...type1Both, ...type1Full,
  ...type2Both, ...type2Full,
  ...type3Both, ...type3Full,
  ...type4Both, ...type4Full,
  ...type5Both, ...type5Full,
  ...type6Both, ...type6Full,
  ...type7Both, ...type7Full,
  ...type8Both, ...type8Full,
  ...type9Both, ...type9Full,
];

export default questions;
