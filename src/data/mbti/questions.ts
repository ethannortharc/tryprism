/**
 * MBTI question bank — bilingual (English / Chinese).
 *
 * Structure:
 *   - 96 total questions across 4 dichotomies (24 per dichotomy)
 *   - 12 per dichotomy with mode "both"  → appear in both quick (48) and full (96) modes
 *   - 12 per dichotomy with mode "full"  → appear only in full mode
 *
 * Quick mode: filter mode === 'both'       → 48 questions
 * Full  mode: all questions               → 96 questions
 *
 * Questions probe cognitive PREFERENCES, not surface behaviors.
 * Likert scale: 1 = strongly disagree … 5 = strongly agree.
 */

import type { MbtiQuestion } from '../../types/mbti';

// ---------------------------------------------------------------------------
// E/I — Extraversion vs Introversion (24 questions)
// Energy direction: outer world vs inner world
// ---------------------------------------------------------------------------

const eiQuestions: MbtiQuestion[] = [
  // --- mode: 'both' (12) ---
  {
    id: 'ei-b01',
    dichotomy: 'EI',
    pole: 'E',
    mode: 'both',
    text: {
      en: 'I feel energized after spending extended time in lively group discussions.',
      zh: '在热烈的集体讨论中待上较长时间后，我会感到精力充沛。',
    },
  },
  {
    id: 'ei-b02',
    dichotomy: 'EI',
    pole: 'I',
    mode: 'both',
    text: {
      en: 'I prefer to think through my ideas carefully before sharing them with others.',
      zh: '我更喜欢在与他人分享想法之前，先独自仔细思考清楚。',
    },
  },
  {
    id: 'ei-b03',
    dichotomy: 'EI',
    pole: 'E',
    mode: 'both',
    text: {
      en: 'I tend to think out loud and find that talking helps me clarify my thoughts.',
      zh: '我倾向于大声思考，发现与人交谈有助于我厘清自己的想法。',
    },
  },
  {
    id: 'ei-b04',
    dichotomy: 'EI',
    pole: 'I',
    mode: 'both',
    text: {
      en: 'After a busy day with many people, I need time alone to recover my energy.',
      zh: '忙碌了一整天与各种人打交道之后，我需要独处时间来恢复精力。',
    },
  },
  {
    id: 'ei-b05',
    dichotomy: 'EI',
    pole: 'E',
    mode: 'both',
    text: {
      en: 'I enjoy being the person who gets conversations started in a group.',
      zh: '我喜欢在群体中做那个主动打开话题、带动交流的人。',
    },
  },
  {
    id: 'ei-b06',
    dichotomy: 'EI',
    pole: 'I',
    mode: 'both',
    text: {
      en: 'I prefer deep one-on-one conversations to large group socializing.',
      zh: '比起大型社交聚会，我更喜欢与一个人深入地交流。',
    },
  },
  {
    id: 'ei-b07',
    dichotomy: 'EI',
    pole: 'E',
    mode: 'both',
    text: {
      en: 'I find it easy to strike up conversations with strangers.',
      zh: '我觉得和陌生人开口交谈并不困难。',
    },
  },
  {
    id: 'ei-b08',
    dichotomy: 'EI',
    pole: 'I',
    mode: 'both',
    text: {
      en: 'I am selective about the people I open up to and take time before doing so.',
      zh: '我在选择向谁敞开心扉这件事上很谨慎，需要一段时间才能真正放下戒备。',
    },
  },
  {
    id: 'ei-b09',
    dichotomy: 'EI',
    pole: 'E',
    mode: 'both',
    text: {
      en: 'Working through challenges in a team feels more stimulating to me than solving them alone.',
      zh: '与团队共同应对挑战，对我来说比独自解决问题更有活力、更令人振奋。',
    },
  },
  {
    id: 'ei-b10',
    dichotomy: 'EI',
    pole: 'I',
    mode: 'both',
    text: {
      en: 'I do my best thinking when I have uninterrupted solitude.',
      zh: '当我有不受打扰的独处时间时，思维才能发挥到最佳状态。',
    },
  },
  {
    id: 'ei-b11',
    dichotomy: 'EI',
    pole: 'E',
    mode: 'both',
    text: {
      en: 'I welcome unexpected visitors and spontaneous social plans.',
      zh: '我欢迎突然到访的朋友和临时起意的社交安排。',
    },
  },
  {
    id: 'ei-b12',
    dichotomy: 'EI',
    pole: 'I',
    mode: 'both',
    text: {
      en: 'I find that my inner world of ideas and reflection is where I feel most at home.',
      zh: '在由想法与沉思构成的内心世界里，我感到最自在、最踏实。',
    },
  },
  // --- mode: 'full' (12) ---
  {
    id: 'ei-f01',
    dichotomy: 'EI',
    pole: 'E',
    mode: 'full',
    text: {
      en: 'I feel comfortable being the center of attention in a social setting.',
      zh: '在社交场合成为众人关注的焦点，我并不感到不自在。',
    },
  },
  {
    id: 'ei-f02',
    dichotomy: 'EI',
    pole: 'I',
    mode: 'full',
    text: {
      en: 'I often feel drained even after enjoyable social events.',
      zh: '即便是令我愉快的社交活动，结束后我往往也会感到有些疲惫。',
    },
  },
  {
    id: 'ei-f03',
    dichotomy: 'EI',
    pole: 'E',
    mode: 'full',
    text: {
      en: 'I process my emotions by talking about them with people I trust.',
      zh: '我习惯通过与信任的人倾诉来处理自己的情绪。',
    },
  },
  {
    id: 'ei-f04',
    dichotomy: 'EI',
    pole: 'I',
    mode: 'full',
    text: {
      en: 'I process my emotions by reflecting on them privately before sharing.',
      zh: '我倾向于先独自消化和思考自己的情绪，然后再选择是否分享。',
    },
  },
  {
    id: 'ei-f05',
    dichotomy: 'EI',
    pole: 'E',
    mode: 'full',
    text: {
      en: 'A quiet evening alone at home can quickly start to feel lonely to me.',
      zh: '独自在家度过一个安静的夜晚，很快就会让我感到孤单。',
    },
  },
  {
    id: 'ei-f06',
    dichotomy: 'EI',
    pole: 'I',
    mode: 'full',
    text: {
      en: 'I value having a private mental space that few people have access to.',
      zh: '我珍视那个属于自己、几乎没有人能进入的内心私密空间。',
    },
  },
  {
    id: 'ei-f07',
    dichotomy: 'EI',
    pole: 'E',
    mode: 'full',
    text: {
      en: 'I gravitate toward roles that put me in front of people rather than behind the scenes.',
      zh: '我天生倾向于选择那些需要与人打交道的角色，而不是默默在幕后工作。',
    },
  },
  {
    id: 'ei-f08',
    dichotomy: 'EI',
    pole: 'I',
    mode: 'full',
    text: {
      en: 'I prefer to observe and understand a new social situation before actively participating.',
      zh: '在积极参与一个新的社交场合之前，我倾向于先旁观、先摸清情况。',
    },
  },
  {
    id: 'ei-f09',
    dichotomy: 'EI',
    pole: 'E',
    mode: 'full',
    text: {
      en: 'I get excited at the prospect of meeting new people and expanding my social circle.',
      zh: '想到能认识新朋友、拓展社交圈，我就会感到兴奋。',
    },
  },
  {
    id: 'ei-f10',
    dichotomy: 'EI',
    pole: 'I',
    mode: 'full',
    text: {
      en: 'I find small talk at social gatherings more exhausting than rewarding.',
      zh: '在社交聚会上进行闲聊，对我来说更多是一种消耗而非享受。',
    },
  },
  {
    id: 'ei-f11',
    dichotomy: 'EI',
    pole: 'E',
    mode: 'full',
    text: {
      en: 'I naturally reach out to friends and colleagues to stay connected and share news.',
      zh: '我会主动联系朋友和同事，保持联络、分享近况，这对我来说很自然。',
    },
  },
  {
    id: 'ei-f12',
    dichotomy: 'EI',
    pole: 'I',
    mode: 'full',
    text: {
      en: 'When I am working on something important, I strongly prefer minimal interruptions.',
      zh: '当我在专注做一件重要的事情时，我非常不喜欢被打断。',
    },
  },
];

// ---------------------------------------------------------------------------
// S/N — Sensing vs Intuition (24 questions)
// Information gathering: concrete/present vs abstract/future
// ---------------------------------------------------------------------------

const snQuestions: MbtiQuestion[] = [
  // --- mode: 'both' (12) ---
  {
    id: 'sn-b01',
    dichotomy: 'SN',
    pole: 'S',
    mode: 'both',
    text: {
      en: 'I pay close attention to concrete details and facts in my surroundings.',
      zh: '我会认真关注周围环境中的具体细节和事实。',
    },
  },
  {
    id: 'sn-b02',
    dichotomy: 'SN',
    pole: 'N',
    mode: 'both',
    text: {
      en: 'I am drawn to exploring abstract theories and future possibilities.',
      zh: '我对探索抽象理论和未来的各种可能性有着天然的兴趣。',
    },
  },
  {
    id: 'sn-b03',
    dichotomy: 'SN',
    pole: 'S',
    mode: 'both',
    text: {
      en: 'I trust information that comes directly from my own senses and lived experience.',
      zh: '我更信任直接来自感官体验和亲身经历的信息。',
    },
  },
  {
    id: 'sn-b04',
    dichotomy: 'SN',
    pole: 'N',
    mode: 'both',
    text: {
      en: 'I often see patterns and connections between things that seem unrelated on the surface.',
      zh: '我常常能在表面上毫无关联的事物之间发现规律和联系。',
    },
  },
  {
    id: 'sn-b05',
    dichotomy: 'SN',
    pole: 'S',
    mode: 'both',
    text: {
      en: 'I prefer learning through hands-on practice rather than reading about concepts.',
      zh: '比起阅读理论概念，我更喜欢通过实际动手操作来学习。',
    },
  },
  {
    id: 'sn-b06',
    dichotomy: 'SN',
    pole: 'N',
    mode: 'both',
    text: {
      en: 'I find myself thinking more about where things could go than where they are right now.',
      zh: '比起事物的现状，我更多地在思考它们将来可能发展的方向。',
    },
  },
  {
    id: 'sn-b07',
    dichotomy: 'SN',
    pole: 'S',
    mode: 'both',
    text: {
      en: 'I focus on what is real and present rather than speculating about what might be.',
      zh: '我更专注于眼前真实存在的事物，而不是去推测可能发生的情况。',
    },
  },
  {
    id: 'sn-b08',
    dichotomy: 'SN',
    pole: 'N',
    mode: 'both',
    text: {
      en: 'I enjoy brainstorming novel ideas even when there is no immediate practical use for them.',
      zh: '我享受头脑风暴、构想新颖想法的过程，即便这些想法暂时没有实际用途。',
    },
  },
  {
    id: 'sn-b09',
    dichotomy: 'SN',
    pole: 'S',
    mode: 'both',
    text: {
      en: 'I value proven methods and established procedures over untested new approaches.',
      zh: '比起未经验证的新方法，我更看重那些经过实践检验的方法和既有程序。',
    },
  },
  {
    id: 'sn-b10',
    dichotomy: 'SN',
    pole: 'N',
    mode: 'both',
    text: {
      en: 'Metaphors and symbolic language come naturally to me when I explain my thinking.',
      zh: '在解释自己的想法时，我会自然而然地使用比喻和象征性的语言。',
    },
  },
  {
    id: 'sn-b11',
    dichotomy: 'SN',
    pole: 'S',
    mode: 'both',
    text: {
      en: 'I notice small physical changes in my environment that others often miss.',
      zh: '我能注意到环境中细微的物理变化，而这些往往是别人容易忽略的。',
    },
  },
  {
    id: 'sn-b12',
    dichotomy: 'SN',
    pole: 'N',
    mode: 'both',
    text: {
      en: 'I am more interested in the big picture and long-term vision than in immediate details.',
      zh: '比起眼前的细节，我对宏观图景和长远愿景更感兴趣。',
    },
  },
  // --- mode: 'full' (12) ---
  {
    id: 'sn-f01',
    dichotomy: 'SN',
    pole: 'S',
    mode: 'full',
    text: {
      en: 'I prefer instructions that are concrete and step-by-step rather than vague and general.',
      zh: '比起模糊笼统的说明，我更喜欢具体明确、按步骤来的指导。',
    },
  },
  {
    id: 'sn-f02',
    dichotomy: 'SN',
    pole: 'N',
    mode: 'full',
    text: {
      en: 'I often get absorbed in imagining how things could be different from how they currently are.',
      zh: '我常常会不自觉地沉浸在想象事物与现状不同的种种可能中。',
    },
  },
  {
    id: 'sn-f03',
    dichotomy: 'SN',
    pole: 'S',
    mode: 'full',
    text: {
      en: 'I prefer working with tangible, measurable outcomes rather than open-ended goals.',
      zh: '比起开放性的目标，我更喜欢有具体可衡量结果的工作方式。',
    },
  },
  {
    id: 'sn-f04',
    dichotomy: 'SN',
    pole: 'N',
    mode: 'full',
    text: {
      en: 'I am more excited by what a new project could become than by its current state.',
      zh: '比起项目的现状，我对它未来可能成为什么样子更感到兴奋。',
    },
  },
  {
    id: 'sn-f05',
    dichotomy: 'SN',
    pole: 'S',
    mode: 'full',
    text: {
      en: 'I rely heavily on past experience when making decisions about the present.',
      zh: '在做当下的决定时，我会大量参考过去的经验。',
    },
  },
  {
    id: 'sn-f06',
    dichotomy: 'SN',
    pole: 'N',
    mode: 'full',
    text: {
      en: 'I feel most alive when I am exploring a new idea or making an unexpected connection.',
      zh: '当我正在探索一个新想法或发现意想不到的关联时，我感到最有活力。',
    },
  },
  {
    id: 'sn-f07',
    dichotomy: 'SN',
    pole: 'S',
    mode: 'full',
    text: {
      en: 'I find abstract discussions without real-world application hard to stay engaged with.',
      zh: '与现实应用脱节的纯抽象讨论，很难让我长时间保持专注和兴趣。',
    },
  },
  {
    id: 'sn-f08',
    dichotomy: 'SN',
    pole: 'N',
    mode: 'full',
    text: {
      en: 'I trust my gut sense that something has potential even before I can prove it logically.',
      zh: '即便还无法从逻辑上证明，我也会信任那种感觉某事很有潜力的直觉。',
    },
  },
  {
    id: 'sn-f09',
    dichotomy: 'SN',
    pole: 'S',
    mode: 'full',
    text: {
      en: 'I take pleasure in activities that engage my physical senses — touch, taste, sound.',
      zh: '我从那些能调动感官——触觉、味觉、听觉——的活动中获得乐趣。',
    },
  },
  {
    id: 'sn-f10',
    dichotomy: 'SN',
    pole: 'N',
    mode: 'full',
    text: {
      en: 'I find that I often read deeper meanings into everyday events and conversations.',
      zh: '我常常会从日常事件和对话中读出更深层的含义。',
    },
  },
  {
    id: 'sn-f11',
    dichotomy: 'SN',
    pole: 'S',
    mode: 'full',
    text: {
      en: 'I become uncomfortable when plans are vague or lack specific details.',
      zh: '当计划模糊不清、缺乏具体细节时，我会感到不安。',
    },
  },
  {
    id: 'sn-f12',
    dichotomy: 'SN',
    pole: 'N',
    mode: 'full',
    text: {
      en: 'I am drawn to questions that have no clear answer and enjoy sitting with uncertainty.',
      zh: '我对那些没有明确答案的问题充满兴趣，并且能够安然与不确定性共处。',
    },
  },
];

// ---------------------------------------------------------------------------
// T/F — Thinking vs Feeling (24 questions)
// Decision-making: logic/analysis vs values/relationships
// ---------------------------------------------------------------------------

const tfQuestions: MbtiQuestion[] = [
  // --- mode: 'both' (12) ---
  {
    id: 'tf-b01',
    dichotomy: 'TF',
    pole: 'T',
    mode: 'both',
    text: {
      en: 'When making decisions, I prioritize logical consistency over personal feelings.',
      zh: '做决定时，我更看重逻辑一致性，而不是个人情感。',
    },
  },
  {
    id: 'tf-b02',
    dichotomy: 'TF',
    pole: 'F',
    mode: 'both',
    text: {
      en: 'I consider how my decisions will affect others\' feelings and wellbeing.',
      zh: '做决定时，我会考虑这个决定将如何影响他人的感受和幸福。',
    },
  },
  {
    id: 'tf-b03',
    dichotomy: 'TF',
    pole: 'T',
    mode: 'both',
    text: {
      en: 'I find it easier to give critical feedback than to sugarcoat the truth.',
      zh: '比起给真相"加糖"，我觉得直接给出批评性的反馈更为自然。',
    },
  },
  {
    id: 'tf-b04',
    dichotomy: 'TF',
    pole: 'F',
    mode: 'both',
    text: {
      en: 'Maintaining harmony in my relationships is an important driver of my choices.',
      zh: '维护人际关系中的和谐，是影响我做选择的一个重要因素。',
    },
  },
  {
    id: 'tf-b05',
    dichotomy: 'TF',
    pole: 'T',
    mode: 'both',
    text: {
      en: 'I believe the most compassionate thing to do is often to be honest, even when it is hard.',
      zh: '我认为最具善意的做法，往往是诚实，即便这在当下很难开口。',
    },
  },
  {
    id: 'tf-b06',
    dichotomy: 'TF',
    pole: 'F',
    mode: 'both',
    text: {
      en: 'I tune in to the emotional atmosphere of a room and am affected by how others feel.',
      zh: '我能感知到房间里的情绪氛围，并且会受到他人情绪状态的影响。',
    },
  },
  {
    id: 'tf-b07',
    dichotomy: 'TF',
    pole: 'T',
    mode: 'both',
    text: {
      en: 'I tend to analyze problems objectively, separating my personal feelings from the facts.',
      zh: '我倾向于客观分析问题，将个人情感与事实分开来看。',
    },
  },
  {
    id: 'tf-b08',
    dichotomy: 'TF',
    pole: 'F',
    mode: 'both',
    text: {
      en: 'When someone is upset, my first instinct is to offer empathy rather than solutions.',
      zh: '当有人情绪低落时，我的第一反应是给予共情，而不是直接提供解决方案。',
    },
  },
  {
    id: 'tf-b09',
    dichotomy: 'TF',
    pole: 'T',
    mode: 'both',
    text: {
      en: 'I hold firm to my position when I believe the logic is sound, regardless of social pressure.',
      zh: '当我认为自己的逻辑站得住脚时，即便面对社会压力，我也会坚持自己的立场。',
    },
  },
  {
    id: 'tf-b10',
    dichotomy: 'TF',
    pole: 'F',
    mode: 'both',
    text: {
      en: 'I am deeply affected when someone I care about is in pain.',
      zh: '当我在乎的人正在经历痛苦时，我会深受影响。',
    },
  },
  {
    id: 'tf-b11',
    dichotomy: 'TF',
    pole: 'T',
    mode: 'both',
    text: {
      en: 'I prefer debates where ideas are tested rigorously rather than conversations that prioritize comfort.',
      zh: '比起以舒适为先的闲聊，我更喜欢能够严格检验观点的辩论。',
    },
  },
  {
    id: 'tf-b12',
    dichotomy: 'TF',
    pole: 'F',
    mode: 'both',
    text: {
      en: 'I make better decisions when I consider my personal values alongside the facts.',
      zh: '在考虑事实的同时兼顾个人价值观，往往能帮助我做出更好的决定。',
    },
  },
  // --- mode: 'full' (12) ---
  {
    id: 'tf-f01',
    dichotomy: 'TF',
    pole: 'T',
    mode: 'full',
    text: {
      en: 'I feel most competent when I can solve problems through clear reasoning.',
      zh: '当我能够通过清晰的推理解决问题时，我感到最有能力。',
    },
  },
  {
    id: 'tf-f02',
    dichotomy: 'TF',
    pole: 'F',
    mode: 'full',
    text: {
      en: 'I find it hard to enforce a rule that I believe will cause unnecessary suffering.',
      zh: '我很难去执行一条我认为会造成不必要痛苦的规定。',
    },
  },
  {
    id: 'tf-f03',
    dichotomy: 'TF',
    pole: 'T',
    mode: 'full',
    text: {
      en: 'I am comfortable pointing out flaws in someone\'s reasoning even if it creates tension.',
      zh: '即便会造成紧张气氛，我也能坦然地指出别人推理中的漏洞。',
    },
  },
  {
    id: 'tf-f04',
    dichotomy: 'TF',
    pole: 'F',
    mode: 'full',
    text: {
      en: 'A decision that is logically correct but hurts people important to me still feels wrong.',
      zh: '一个逻辑上正确、却会伤害重要的人的决定，在我心里仍然觉得是错的。',
    },
  },
  {
    id: 'tf-f05',
    dichotomy: 'TF',
    pole: 'T',
    mode: 'full',
    text: {
      en: 'I evaluate people\'s arguments on their merit rather than the emotion behind them.',
      zh: '我根据论点本身的质量来评判，而不是看说话人背后的情绪。',
    },
  },
  {
    id: 'tf-f06',
    dichotomy: 'TF',
    pole: 'F',
    mode: 'full',
    text: {
      en: 'Receiving criticism from someone I care about affects me more deeply than criticism from a stranger.',
      zh: '来自我在乎的人的批评，比陌生人的批评对我的影响要深刻得多。',
    },
  },
  {
    id: 'tf-f07',
    dichotomy: 'TF',
    pole: 'T',
    mode: 'full',
    text: {
      en: 'I tend to be skeptical of arguments that rely mainly on appeals to emotion.',
      zh: '我倾向于对那些主要依赖情感诉求的论点保持怀疑。',
    },
  },
  {
    id: 'tf-f08',
    dichotomy: 'TF',
    pole: 'F',
    mode: 'full',
    text: {
      en: 'I take it personally when there is conflict in my close relationships.',
      zh: '当亲密关系中出现矛盾时，我会很容易往自己身上想。',
    },
  },
  {
    id: 'tf-f09',
    dichotomy: 'TF',
    pole: 'T',
    mode: 'full',
    text: {
      en: 'Fairness, to me, means applying the same rules consistently to everyone.',
      zh: '对我来说，公平意味着将同样的规则一致地适用于所有人。',
    },
  },
  {
    id: 'tf-f10',
    dichotomy: 'TF',
    pole: 'F',
    mode: 'full',
    text: {
      en: 'Fairness, to me, means recognizing that different people have different needs.',
      zh: '对我来说，公平意味着承认不同的人有不同的需求，而非一刀切。',
    },
  },
  {
    id: 'tf-f11',
    dichotomy: 'TF',
    pole: 'T',
    mode: 'full',
    text: {
      en: 'I find that emotions often cloud judgment and prefer to set them aside when analyzing a problem.',
      zh: '我认为情绪常常会干扰判断，在分析问题时我倾向于将情绪搁置一旁。',
    },
  },
  {
    id: 'tf-f12',
    dichotomy: 'TF',
    pole: 'F',
    mode: 'full',
    text: {
      en: 'I notice when someone feels left out or undervalued and feel compelled to include them.',
      zh: '我能察觉到某人是否感到被冷落或不被重视，并会自然地想将他们纳入其中。',
    },
  },
];

// ---------------------------------------------------------------------------
// J/P — Judging vs Perceiving (24 questions)
// Lifestyle orientation: structured/planned vs flexible/open
// ---------------------------------------------------------------------------

const jpQuestions: MbtiQuestion[] = [
  // --- mode: 'both' (12) ---
  {
    id: 'jp-b01',
    dichotomy: 'JP',
    pole: 'J',
    mode: 'both',
    text: {
      en: 'I feel most comfortable when my days are planned and structured.',
      zh: '当我的日程有计划、有条理时，我感到最自在。',
    },
  },
  {
    id: 'jp-b02',
    dichotomy: 'JP',
    pole: 'P',
    mode: 'both',
    text: {
      en: 'I prefer to keep my options open and adapt to whatever comes up.',
      zh: '我倾向于保持灵活性，随时根据情况做出调整。',
    },
  },
  {
    id: 'jp-b03',
    dichotomy: 'JP',
    pole: 'J',
    mode: 'both',
    text: {
      en: 'I work best when I have a clear deadline and a defined plan to meet it.',
      zh: '有明确的截止日期和清晰的执行计划时，我能发挥出最好的状态。',
    },
  },
  {
    id: 'jp-b04',
    dichotomy: 'JP',
    pole: 'P',
    mode: 'both',
    text: {
      en: 'I find last-minute changes to plans interesting rather than stressful.',
      zh: '计划在最后一刻发生变化，对我来说更多是新鲜感而非压力。',
    },
  },
  {
    id: 'jp-b05',
    dichotomy: 'JP',
    pole: 'J',
    mode: 'both',
    text: {
      en: 'I feel uncomfortable when decisions are left open-ended for too long.',
      zh: '当决定长时间悬而未决时，我会感到不舒服。',
    },
  },
  {
    id: 'jp-b06',
    dichotomy: 'JP',
    pole: 'P',
    mode: 'both',
    text: {
      en: 'I enjoy starting new projects more than following through to their completion.',
      zh: '我更享受开启新项目的过程，而不是将已有项目坚持推进到最后完成。',
    },
  },
  {
    id: 'jp-b07',
    dichotomy: 'JP',
    pole: 'J',
    mode: 'both',
    text: {
      en: 'Making and sticking to plans gives me a sense of control and security.',
      zh: '制定计划并严格执行，让我感到掌控感和安全感。',
    },
  },
  {
    id: 'jp-b08',
    dichotomy: 'JP',
    pole: 'P',
    mode: 'both',
    text: {
      en: 'I tend to gather more information before making a final decision.',
      zh: '在做最终决定之前，我倾向于继续收集更多信息。',
    },
  },
  {
    id: 'jp-b09',
    dichotomy: 'JP',
    pole: 'J',
    mode: 'both',
    text: {
      en: 'I find it satisfying to complete tasks and check them off my list.',
      zh: '完成任务并将其从清单上划掉，对我来说是一种满足感。',
    },
  },
  {
    id: 'jp-b10',
    dichotomy: 'JP',
    pole: 'P',
    mode: 'both',
    text: {
      en: 'I do my best work under pressure when a deadline is approaching.',
      zh: '当截止日期临近、压力倍增时，我往往能发挥出最佳水平。',
    },
  },
  {
    id: 'jp-b11',
    dichotomy: 'JP',
    pole: 'J',
    mode: 'both',
    text: {
      en: 'I prefer to have a place for everything and everything in its place.',
      zh: '我喜欢所有东西都各有其位、井然有序的状态。',
    },
  },
  {
    id: 'jp-b12',
    dichotomy: 'JP',
    pole: 'P',
    mode: 'both',
    text: {
      en: 'I am energized by unexpected opportunities even when they disrupt my existing plans.',
      zh: '意外的机会会让我充满活力，即便它打乱了我原有的计划。',
    },
  },
  // --- mode: 'full' (12) ---
  {
    id: 'jp-f01',
    dichotomy: 'JP',
    pole: 'J',
    mode: 'full',
    text: {
      en: 'I rarely leave tasks until the last minute if I can help it.',
      zh: '只要条件允许，我很少把任务拖到最后一刻。',
    },
  },
  {
    id: 'jp-f02',
    dichotomy: 'JP',
    pole: 'P',
    mode: 'full',
    text: {
      en: 'I resist making final commitments because I want to stay open to better options.',
      zh: '我抗拒做出最终承诺，因为我想保持对更好选择的开放性。',
    },
  },
  {
    id: 'jp-f03',
    dichotomy: 'JP',
    pole: 'J',
    mode: 'full',
    text: {
      en: 'I feel genuinely unsettled when my living or working space is disorganized.',
      zh: '当我的生活或工作空间杂乱无序时，我会感到真正的不安。',
    },
  },
  {
    id: 'jp-f04',
    dichotomy: 'JP',
    pole: 'P',
    mode: 'full',
    text: {
      en: 'Rigid routines feel suffocating to me and I make a point to break them up.',
      zh: '一成不变的固定程序让我感到窒息，我会刻意打破它们。',
    },
  },
  {
    id: 'jp-f05',
    dichotomy: 'JP',
    pole: 'J',
    mode: 'full',
    text: {
      en: 'I prefer to resolve ambiguities quickly rather than sit with open questions.',
      zh: '比起让问题悬着，我更倾向于尽快澄清模糊之处、做出决定。',
    },
  },
  {
    id: 'jp-f06',
    dichotomy: 'JP',
    pole: 'P',
    mode: 'full',
    text: {
      en: 'I find that the most interesting part of a project is the exploration phase, not the execution.',
      zh: '我发现一个项目中最有趣的部分是探索阶段，而不是执行阶段。',
    },
  },
  {
    id: 'jp-f07',
    dichotomy: 'JP',
    pole: 'J',
    mode: 'full',
    text: {
      en: 'Once I have made a decision, I commit to it and rarely second-guess myself.',
      zh: '一旦做出决定，我就会全力执行，很少再反复质疑自己。',
    },
  },
  {
    id: 'jp-f08',
    dichotomy: 'JP',
    pole: 'P',
    mode: 'full',
    text: {
      en: 'I often have several things going on at once and switch between them as my interest dictates.',
      zh: '我经常同时推进好几件事，按照当下的兴趣在它们之间随意切换。',
    },
  },
  {
    id: 'jp-f09',
    dichotomy: 'JP',
    pole: 'J',
    mode: 'full',
    text: {
      en: 'I plan leisure time and vacations well in advance to make sure everything goes smoothly.',
      zh: '我会提前很久规划休闲时间和假期，以确保一切顺利进行。',
    },
  },
  {
    id: 'jp-f10',
    dichotomy: 'JP',
    pole: 'P',
    mode: 'full',
    text: {
      en: 'I prefer a loose agenda to a detailed schedule when attending a meeting or event.',
      zh: '参加会议或活动时，我更喜欢宽松的议程，而不是详细的时间表。',
    },
  },
  {
    id: 'jp-f11',
    dichotomy: 'JP',
    pole: 'J',
    mode: 'full',
    text: {
      en: 'I feel most productive when I have a clear sense of what needs to be done today.',
      zh: '当我清楚地知道今天需要完成哪些事情时，我感到效率最高。',
    },
  },
  {
    id: 'jp-f12',
    dichotomy: 'JP',
    pole: 'P',
    mode: 'full',
    text: {
      en: 'I prefer to improvise and see where things go rather than following a predetermined script.',
      zh: '比起遵循预先设定的脚本，我更喜欢即兴发挥、随机应变。',
    },
  },
];

// ---------------------------------------------------------------------------
// Combine and export
// ---------------------------------------------------------------------------

export const mbtiQuestions: MbtiQuestion[] = [
  ...eiQuestions,
  ...snQuestions,
  ...tfQuestions,
  ...jpQuestions,
];

export function getQuestionsByMode(mode: 'quick' | 'full'): MbtiQuestion[] {
  if (mode === 'full') return mbtiQuestions;
  return mbtiQuestions.filter((q) => q.mode === 'both');
}

export default mbtiQuestions;
