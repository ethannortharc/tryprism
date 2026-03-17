import type { MbtiTypeDescription } from '../../types/mbti';
import { mbtiTypeDescriptionsExt } from './typeDescriptionsExt';

const mbtiTypeDescriptionsBase: Record<string, MbtiTypeDescription> = {

  // -------------------------------------------------------------------------
  // ISTJ — The Inspector / 检查员
  // Cognitive stack: Si (dominant) - Te (auxiliary) - Fi (tertiary) - Ne (inferior)
  // Type group: sentinel
  // -------------------------------------------------------------------------
  ISTJ: {
    type: 'ISTJ',
    typeGroup: 'sentinel',
    name: { en: 'The Inspector', zh: '检查员' },
    title: { en: 'The Inspector', zh: '检查员' },
    tagline: {
      en: 'Responsible. Thorough. Dependable.',
      zh: '负责任。一丝不苟。值得信赖。',
    },
    overview: {
      en: `ISTJs are the bedrock of any organization or community they belong to. Driven by a deep sense of duty and an unwavering commitment to responsibility, they approach every task with systematic thoroughness. They honor obligations, follow through on commitments, and hold themselves to the highest standards of reliability. For an ISTJ, a promise is not merely a social nicety—it is a binding contract.

Rooted in introverted sensing, ISTJs draw heavily on past experience and established procedures. They trust what has been proven and tested over time, and they are skeptical of untested novelty. This gives them an exceptional memory for factual detail and an ability to apply lessons from the past with precision. They prefer clarity, structure, and order in both their environment and their relationships.

At work and in life, ISTJs tend to be reserved but quietly influential. They often occupy roles as guardians of procedure: auditors, administrators, military officers, and compliance professionals. They may appear stern or traditional to those who do not know them well, but beneath their composed exterior lies a genuine warmth and fierce loyalty toward those they care about. Their growth edge lies in embracing flexibility, allowing for emotional expression, and staying open to possibilities that fall outside familiar patterns.`,
      zh: `ISTJ是任何组织或社区的基石。他们具有强烈的责任感和坚定的义务承担意识，以系统而彻底的方式完成每项任务。他们信守诺言、履行承诺，并对自己的可靠性保持最高标准。对于ISTJ而言，一个承诺不仅仅是一种社交礼节，而是一份具有约束力的契约。

ISTJ以内倾感觉为主导，大量依靠过去的经验和既定的程序。他们信任经过时间检验的事物，对未经验证的新奇之物持谨慎态度。这赋予了他们对细节的出色记忆力，以及将过去的经验精准应用于当下的能力。他们在环境和人际关系中都倾向于追求清晰、结构和秩序。

在工作和生活中，ISTJ往往沉默寡言却影响深远。他们通常担任程序守护者的角色：审计员、行政人员、军官和合规专业人员。对于不了解他们的人来说，他们可能显得严肃或传统，但在沉稳的外表之下，他们对所关心的人怀有真诚的温情和强烈的忠诚。他们的成长方向在于接纳弹性、允许情感表达，以及对熟悉模式之外的可能性保持开放。`,
    },
    cognitive_functions: [
      {
        name: 'Si',
        role: 'dominant',
        label: { en: 'Introverted Sensing', zh: '内倾感觉' },
        description: {
          en: 'ISTJ\'s dominant function. They absorb detailed sensory data from the world and store it as rich internal references, drawing on past experience to guide present decisions.',
          zh: 'ISTJ的主导功能。他们从外部世界汲取详细的感官信息，并将其作为丰富的内部参照储存起来，依靠过去的经验指导当下的决策。',
        },
      },
      {
        name: 'Te',
        role: 'auxiliary',
        label: { en: 'Extraverted Thinking', zh: '外倾思维' },
        description: {
          en: 'The auxiliary function that drives ISTJs to organize, systematize, and execute in the external world. They impose logical structure on tasks and environments.',
          zh: '辅助功能，驱使ISTJ在外部世界中进行组织、系统化和执行。他们将逻辑结构强加于任务和环境之上。',
        },
      },
      {
        name: 'Fi',
        role: 'tertiary',
        label: { en: 'Introverted Feeling', zh: '内倾情感' },
        description: {
          en: 'The tertiary function that gives ISTJs a personal moral compass. Although less developed, it informs their sense of right and wrong and their quiet loyalty to loved ones.',
          zh: '第三功能，赋予ISTJ个人的道德指南针。虽然不够发达，但它塑造了他们的是非观以及对亲近之人的低调忠诚。',
        },
      },
      {
        name: 'Ne',
        role: 'inferior',
        label: { en: 'Extraverted Intuition', zh: '外倾直觉' },
        description: {
          en: 'The inferior function for ISTJs. Under stress they may catastrophize, imagining worst-case scenarios. When developed, it grants them the ability to see novel possibilities and challenge assumptions.',
          zh: 'ISTJ的劣势功能。压力下他们可能会灾难化思维，想象最坏的情况。当此功能发展成熟时，它赋予他们发现新可能性、质疑假设的能力。',
        },
      },
    ],
    strengths: {
      en: [
        'Exceptionally reliable and follow-through on commitments',
        'Highly organized and systematic in approach',
        'Strong attention to detail and accuracy',
        'Deep respect for rules, traditions, and established procedures',
        'Patient and persistent in completing tasks',
        'Calm and composed under pressure',
        'Loyal and dedicated to family and community',
      ],
      zh: [
        '极其可靠，能够兑现承诺',
        '做事高度有组织、有系统',
        '对细节和准确性有强烈的关注',
        '深度尊重规则、传统和既定程序',
        '在完成任务时耐心而坚持',
        '在压力下保持冷静沉着',
        '对家庭和社区忠诚奉献',
      ],
    },
    weaknesses: {
      en: [
        'Can be inflexible or resistant to change',
        'May struggle to express emotions openly',
        'Tendency to be overly critical of others who do not meet their standards',
        'Can become too focused on procedure at the expense of human needs',
        'May neglect to consider new or unconventional approaches',
        'Can come across as cold or unapproachable',
      ],
      zh: [
        '可能缺乏弹性或抗拒变化',
        '可能难以开放地表达情感',
        '倾向于对未达到其标准的人过度批评',
        '可能过于关注程序而忽视人的需求',
        '可能忽视新的或非传统的方法',
        '可能给人留下冷漠或难以接近的印象',
      ],
    },
    growth_areas: {
      en: [
        {
          title: 'Embrace Change',
          description: 'Practice stepping outside established routines deliberately. Experiment with small changes to build tolerance for uncertainty and new approaches.',
        },
        {
          title: 'Develop Emotional Expression',
          description: 'Cultivate the habit of sharing feelings and needs with trusted people. Recognize that vulnerability builds deeper connection rather than weakness.',
        },
        {
          title: 'Explore Possibilities',
          description: 'Dedicate time to brainstorming and imaginative thinking without immediately evaluating feasibility. This stretches the inferior Ne and expands creative range.',
        },
        {
          title: 'Balance Criticism with Compassion',
          description: 'When holding others accountable, consider the emotional impact of feedback and apply empathy alongside high standards.',
        },
      ],
      zh: [
        {
          title: '拥抱变化',
          description: '有意识地走出既定的日常模式。通过小变化的实验，培养对不确定性和新方法的容纳力。',
        },
        {
          title: '发展情感表达',
          description: '培养与信任之人分享感受和需求的习惯。认识到展示脆弱不是软弱，而是建立更深联系的方式。',
        },
        {
          title: '探索可能性',
          description: '留出时间进行头脑风暴和富有想象力的思考，不要立即评估可行性。这能拓展劣势的外倾直觉，扩大创造力的范围。',
        },
        {
          title: '在批评中融入慈悲',
          description: '在要求他人负责时，考虑反馈的情感影响，在保持高标准的同时运用同理心。',
        },
      ],
    },
    career_paths: {
      en: [
        'Accountant or Auditor',
        'Military Officer or NCO',
        'Civil Engineer',
        'Database Administrator',
        'Legal Professional',
        'Healthcare Administrator',
        'Project Manager',
        'Police Officer or Detective',
      ],
      zh: [
        '会计师或审计师',
        '军官或士官',
        '土木工程师',
        '数据库管理员',
        '法律专业人员',
        '医疗行政人员',
        '项目经理',
        '警察或侦探',
      ],
    },
    communication_style: {
      en: 'ISTJs communicate directly, factually, and without unnecessary embellishment. They favor precision and clarity over expressiveness, preferring to state what is known and proven rather than speculate. In conversations they listen carefully before responding, and they expect others to honor commitments made in discussion. They are not naturally inclined toward small talk and may prefer written communication where nuance can be recorded and referenced.',
      zh: 'ISTJ的沟通方式直接、基于事实，没有不必要的修饰。他们注重精确和清晰，而非情感表达，倾向于陈述已知和已证实的内容，而非进行推测。在交谈中，他们倾听在先，应答在后，并期望对方信守在讨论中做出的承诺。他们天生不善于闲聊，可能更偏好书面沟通，因为其中的细节可以被记录和引用。',
    },
  },

  // -------------------------------------------------------------------------
  // ISFJ — The Protector / 保护者
  // Cognitive stack: Si (dominant) - Fe (auxiliary) - Ti (tertiary) - Ne (inferior)
  // Type group: sentinel
  // -------------------------------------------------------------------------
  ISFJ: {
    type: 'ISFJ',
    typeGroup: 'sentinel',
    name: { en: 'The Protector', zh: '保护者' },
    title: { en: 'The Protector', zh: '保护者' },
    tagline: {
      en: 'Warm. Devoted. Quietly Courageous.',
      zh: '温暖。忠诚。默默勇敢。',
    },
    overview: {
      en: `ISFJs are among the most devoted and caring personalities in the MBTI spectrum. They are natural caretakers who derive deep fulfillment from nurturing and protecting the people they love. Their warmth is expressed through concrete actions—remembering a friend's preferences, preparing a home-cooked meal, or quietly handling the logistics of a difficult situation so that others need not worry. For ISFJs, care is demonstrated through service.

Guided by introverted sensing and extraverted feeling, ISFJs combine a rich memory for personal detail with a strong attunement to the emotional atmosphere around them. They are highly perceptive of others' needs and emotional states, and they take those needs seriously. Tradition and continuity matter deeply to them: they are the people who remember anniversaries, uphold family rituals, and ensure that the social fabric of their communities remains intact.

While ISFJs are gentle and accommodating, they possess a quiet inner strength that emerges in times of crisis. They will work tirelessly to ensure the wellbeing of those in their care. However, their tendency to suppress their own needs in favor of others can lead to burnout. Growth for ISFJs involves learning to set boundaries, articulate their own needs, and accept help when offered.`,
      zh: `ISFJ是MBTI中最忠诚、最关爱他人的人格类型之一。他们是天生的照料者，从养育和保护所爱之人中获得深深的满足感。他们的温暖通过具体行动表达出来——记住朋友的偏好、准备一顿家常饭、或悄悄处理困难情况的后勤事务，让他人无需担忧。对于ISFJ来说，关爱是通过服务来体现的。

在内倾感觉和外倾情感的引导下，ISFJ将对个人细节的丰富记忆与对周围情感氛围的强烈感知融为一体。他们对他人的需求和情绪状态高度敏感，并认真对待这些需求。传统和延续性对他们而言意义深重：他们是记住周年纪念日的人，是维系家庭仪式的人，也是确保社区社会凝聚力的人。

虽然ISFJ温和体贴，但他们内心具备一种在危机时刻会显现的安静力量。他们会不知疲倦地确保所关心之人的幸福。然而，他们倾向于压制自己的需求以满足他人，这可能导致精力耗尽。ISFJ的成长在于学会设定界限、表达自己的需求，并在他人提供帮助时坦然接受。`,
    },
    cognitive_functions: [
      {
        name: 'Si',
        role: 'dominant',
        label: { en: 'Introverted Sensing', zh: '内倾感觉' },
        description: {
          en: 'ISFJ\'s dominant function. They maintain detailed inner records of past experiences, especially those involving people and personal interactions, creating a rich tapestry of memory that informs how they care for others.',
          zh: 'ISFJ的主导功能。他们保存着过去经历的详细内部记录，尤其是涉及人际互动的经历，形成丰富的记忆网络，指导他们如何关爱他人。',
        },
      },
      {
        name: 'Fe',
        role: 'auxiliary',
        label: { en: 'Extraverted Feeling', zh: '外倾情感' },
        description: {
          en: 'The auxiliary function that orients ISFJs toward the emotional needs of those around them. They are highly attuned to group harmony and work to ensure everyone feels seen, valued, and included.',
          zh: '辅助功能，使ISFJ关注周围人的情感需求。他们对群体和谐高度敏感，致力于确保每个人都感到被看见、被重视、被接纳。',
        },
      },
      {
        name: 'Ti',
        role: 'tertiary',
        label: { en: 'Introverted Thinking', zh: '内倾思维' },
        description: {
          en: 'The tertiary function that provides ISFJs with an internal logical framework. It helps them analyze situations quietly and apply private reasoning, though it is less developed than their dominant and auxiliary functions.',
          zh: '第三功能，为ISFJ提供内部逻辑框架。它帮助他们悄悄分析情况并运用私下的推理，尽管其发展程度不及主导和辅助功能。',
        },
      },
      {
        name: 'Ne',
        role: 'inferior',
        label: { en: 'Extraverted Intuition', zh: '外倾直觉' },
        description: {
          en: 'The inferior function for ISFJs. When underdeveloped, it may cause anxiety about future uncertainties. When integrated, it allows them to see new possibilities and approach familiar situations with fresh eyes.',
          zh: 'ISFJ的劣势功能。未充分发展时，可能导致对未来不确定性的焦虑。整合后，它使他们能够看到新的可能性，以新鲜的眼光看待熟悉的情况。',
        },
      },
    ],
    strengths: {
      en: [
        'Deeply caring and empathetic toward others',
        'Highly reliable and consistent in fulfilling obligations',
        'Excellent memory for personal details and people\'s preferences',
        'Patient, kind, and supportive in relationships',
        'Hardworking and diligent in tasks they believe in',
        'Strong sense of tradition and social responsibility',
        'Observant of others\' emotional states',
        'Practical and grounded in their approach to problems',
      ],
      zh: [
        '对他人充满关怀和同理心',
        '在履行义务方面高度可靠且稳定',
        '对个人细节和他人偏好有出色的记忆力',
        '在关系中耐心、善良、支持他人',
        '对自己相信的任务勤奋努力',
        '强烈的传统观念和社会责任感',
        '善于观察他人的情绪状态',
        '处理问题时脚踏实地',
      ],
    },
    weaknesses: {
      en: [
        'Tendency to neglect their own needs in favor of others',
        'Can struggle with setting clear personal boundaries',
        'May suppress negative emotions rather than expressing them',
        'Resistance to change and new, unfamiliar methods',
        'Can take criticism very personally',
        'May feel unappreciated when their efforts go unnoticed',
      ],
      zh: [
        '倾向于忽视自身需求以满足他人',
        '可能难以设定清晰的个人界限',
        '可能压抑负面情绪而非表达出来',
        '抗拒变化和新的、不熟悉的方法',
        '可能对批评非常敏感',
        '当付出未被注意时，可能感到不被重视',
      ],
    },
    growth_areas: {
      en: [
        {
          title: 'Practice Setting Boundaries',
          description: 'Learn to say no without guilt and recognize that protecting your own energy allows you to serve others more sustainably over the long term.',
        },
        {
          title: 'Voice Your Own Needs',
          description: 'Practice communicating personal needs and feelings directly. Others cannot support you if they do not know what you require.',
        },
        {
          title: 'Embrace Adaptability',
          description: 'When routines are disrupted, treat it as an opportunity to discover new and potentially better ways of doing things rather than a threat to familiar comfort.',
        },
        {
          title: 'Cultivate Self-Compassion',
          description: 'Extend the same care and understanding to yourself that you readily offer others. Recognize your own worth independent of what you do for people.',
        },
      ],
      zh: [
        {
          title: '练习设定界限',
          description: '学会无愧疚地拒绝，认识到保护自己的精力能让你以更可持续的方式长期服务他人。',
        },
        {
          title: '表达自己的需求',
          description: '练习直接传达个人需求和感受。如果他人不知道你需要什么，就无法支持你。',
        },
        {
          title: '拥抱适应性',
          description: '当日常被打乱时，将其视为发现新的、潜在更好的做事方式的机会，而非对熟悉舒适感的威胁。',
        },
        {
          title: '培养自我慈悲',
          description: '将你乐于给予他人的同等关怀和理解也给予自己。认识到你的价值不依赖于你为他人所做的事。',
        },
      ],
    },
    career_paths: {
      en: [
        'Nurse or Healthcare Professional',
        'Elementary School Teacher',
        'Social Worker',
        'Administrative Assistant',
        'Counselor or Therapist',
        'Librarian',
        'Veterinarian',
        'Human Resources Specialist',
        'Interior Designer',
      ],
      zh: [
        '护士或医疗专业人员',
        '小学教师',
        '社会工作者',
        '行政助理',
        '顾问或治疗师',
        '图书管理员',
        '兽医',
        '人力资源专员',
        '室内设计师',
      ],
    },
    communication_style: {
      en: 'ISFJs communicate with warmth, tact, and attentiveness. They listen deeply to understand both the content and emotional subtext of what others share. They prefer gentle, considerate language and are careful not to cause unnecessary hurt. When conflict arises, they tend to seek harmony and may avoid direct confrontation. Their communications are often peppered with specific personal details—they remember what you said last time and weave it naturally into current conversations, making others feel truly heard.',
      zh: 'ISFJ的沟通方式温暖、得体且专注。他们深度倾听，理解他人分享内容的字面意思和情感潜台词。他们偏好温和、体贴的语言，注意不造成不必要的伤害。当冲突出现时，他们倾向于寻求和谐，可能回避直接对抗。他们的沟通中常穿插具体的个人细节——他们记得你上次说的话，并自然地融入当前对话，让他人感到真正被聆听。',
    },
  },

  // -------------------------------------------------------------------------
  // INFJ — The Advocate / 提倡者
  // Cognitive stack: Ni (dominant) - Fe (auxiliary) - Ti (tertiary) - Se (inferior)
  // Type group: diplomat
  // -------------------------------------------------------------------------
  INFJ: {
    type: 'INFJ',
    typeGroup: 'diplomat',
    name: { en: 'The Advocate', zh: '提倡者' },
    title: { en: 'The Advocate', zh: '提倡者' },
    tagline: {
      en: 'Visionary. Compassionate. Principled.',
      zh: '有远见。富有同情心。原则性强。',
    },
    overview: {
      en: `INFJs are the rarest of the sixteen personality types and among the most complex. They are idealistic visionaries who see deep patterns in the world around them and feel a profound calling to serve a meaningful purpose. They combine rare gifts: the ability to perceive the emotional undercurrents in a room while simultaneously holding a long-range vision of how things could be. This makes them simultaneously the most empathetic and the most strategic of the diplomatic types.

Driven by introverted intuition as their dominant function, INFJs work through insight rather than analysis. They receive sudden, synthesized understandings of complex situations—not through logical deduction but through an almost holistic pattern recognition that operates largely below conscious awareness. Their auxiliary extraverted feeling gives them a warm and genuine attunement to others, and they often serve as trusted confidants, counselors, and motivators.

INFJs carry an inner life of extraordinary richness. They are writers, artists, activists, and therapists who devote their lives to causes larger than themselves. Yet they can burn out when they give too much without replenishing themselves. They also struggle with perfectionism, hypersensitivity to criticism, and a tendency toward all-or-nothing thinking. The path of growth for INFJs involves learning to act on their vision without waiting for perfect conditions, to receive care as well as give it, and to allow themselves to be imperfectly human.`,
      zh: `INFJ是十六种人格类型中最罕见、也是最复杂的类型之一。他们是充满理想的远见者，能洞察周围世界的深层规律，感受到服务于有意义目标的深切使命。他们拥有罕见的天赋：既能感知一个空间中的情感暗流，同时又能把握事物未来走向的长远愿景。这使他们在外交型人格中既是最具同理心的，也是最具战略眼光的。

INFJ以内倾直觉为主导功能，通过洞察而非分析来认识世界。他们对复杂情况产生突然而综合的理解——不是通过逻辑演绎，而是通过一种几乎在意识之下运作的整体模式识别。他们的辅助功能外倾情感使他们对他人有温暖而真诚的感知，他们往往成为值得信赖的知己、顾问和激励者。

INFJ拥有极为丰富的内心世界。他们是作家、艺术家、活动人士和治疗师，将生命奉献给比自己更宏大的事业。然而，当他们给予太多而不自我补给时，可能会精力耗尽。他们也面临完美主义、对批评的过度敏感，以及全有或全无的思维倾向。INFJ的成长之路在于学会在条件并不完美时也能付诸行动，学会接受关爱也给予关爱，并允许自己做一个不完美的人。`,
    },
    cognitive_functions: [
      {
        name: 'Ni',
        role: 'dominant',
        label: { en: 'Introverted Intuition', zh: '内倾直觉' },
        description: {
          en: 'INFJ\'s dominant function. It operates as a deep pattern-recognition engine, synthesizing vast amounts of information into sudden holistic insights about where situations are heading and what lies beneath the surface.',
          zh: 'INFJ的主导功能。它作为深度模式识别引擎运作，将大量信息综合为关于情况走向和表象之下隐藏内容的突然整体洞察。',
        },
      },
      {
        name: 'Fe',
        role: 'auxiliary',
        label: { en: 'Extraverted Feeling', zh: '外倾情感' },
        description: {
          en: 'The auxiliary function that connects INFJs to the emotional world around them. They naturally read the emotional needs of groups and individuals, and they feel compelled to harmonize and uplift the collective.',
          zh: '辅助功能，将INFJ与周围的情感世界相连。他们天然地感知群体和个人的情感需求，感到有冲动去调和并提升集体的情感状态。',
        },
      },
      {
        name: 'Ti',
        role: 'tertiary',
        label: { en: 'Introverted Thinking', zh: '内倾思维' },
        description: {
          en: 'The tertiary function that provides INFJs with an internal logical framework for analyzing and categorizing their insights. It helps them structure their visionary ideas into coherent, communicable systems.',
          zh: '第三功能，为INFJ提供内部逻辑框架，用于分析和归类他们的洞察。它帮助他们将远见卓识的想法构建为连贯、可传达的体系。',
        },
      },
      {
        name: 'Se',
        role: 'inferior',
        label: { en: 'Extraverted Sensing', zh: '外倾感觉' },
        description: {
          en: 'The inferior function for INFJs. In its undeveloped state it may cause them to feel disconnected from the physical world or to swing between sensory deprivation and overindulgence. When integrated, it grounds their vision in present-moment reality.',
          zh: 'INFJ的劣势功能。未发展时可能使他们感到与物质世界脱节，或在感官剥夺与过度沉溺之间摇摆。整合后，它将他们的愿景扎根于当下现实。',
        },
      },
    ],
    strengths: {
      en: [
        'Deeply insightful and able to read between the lines',
        'Genuine empathy and compassion for others',
        'Strong personal integrity and moral conviction',
        'Inspiring and motivating to those around them',
        'Creative and imaginative thinker',
        'Decisive and purposeful when aligned with their values',
        'Excellent listener who makes others feel understood',
        'Long-range visionary thinking',
      ],
      zh: [
        '洞察力深刻，善于读懂言外之意',
        '对他人有真诚的同理心和慈悲心',
        '强烈的个人正直感和道德信念',
        '对周围的人有激励和鼓舞作用',
        '富有创意和想象力的思考者',
        '在与价值观一致时果断而有目的',
        '善于倾听，让他人感到被理解',
        '具备长远的远见思维',
      ],
    },
    weaknesses: {
      en: [
        'Prone to burnout from over-giving and absorbing others\' emotions',
        'Overly perfectionistic and self-critical',
        'Can be hypersensitive to criticism or conflict',
        'May keep emotions bottled up until they overflow',
        'Tendency toward all-or-nothing thinking',
        'Can be difficult to get to know due to their privacy',
        'May struggle to delegate or trust others with important tasks',
      ],
      zh: [
        '因过度给予和吸收他人情绪而容易精力耗尽',
        '过度追求完美，对自己过于苛责',
        '可能对批评或冲突过度敏感',
        '可能将情绪压抑至爆发',
        '倾向于全有或全无的思维方式',
        '由于注重隐私，可能让人难以了解',
        '可能难以委派任务或信任他人处理重要事务',
      ],
    },
    growth_areas: {
      en: [
        {
          title: 'Act Without Perfect Conditions',
          description: 'Resist the tendency to wait until vision and conditions are perfect. Start imperfect action—momentum creates clarity that waiting never does.',
        },
        {
          title: 'Receive Care Openly',
          description: 'Practice letting others care for you. Allow yourself to be vulnerable and to accept support without immediately reciprocating or deflecting.',
        },
        {
          title: 'Ground in the Present',
          description: 'Develop physical and sensory practices—exercise, cooking, crafting—that anchor your rich inner vision in present-moment experience.',
        },
        {
          title: 'Communicate Boundaries Early',
          description: 'Voice discomfort or limits before they accumulate to the breaking point. Early, gentle communication prevents the silent withdrawal that can damage relationships.',
        },
      ],
      zh: [
        {
          title: '在条件不完美时也要行动',
          description: '抵制等待愿景和条件都完美才行动的倾向。开始不完美的行动——动势能创造等待永远无法带来的清晰。',
        },
        {
          title: '坦然接受关爱',
          description: '练习让他人关爱你。允许自己展示脆弱，在不立即回报或转移话题的情况下接受支持。',
        },
        {
          title: '活在当下',
          description: '发展身体和感官的实践——运动、烹饪、手工制作——将你丰富的内心愿景扎根于当下时刻的体验。',
        },
        {
          title: '尽早传达界限',
          description: '在不适或界限累积到临界点之前就表达出来。早期、温和的沟通可以防止可能损害关系的沉默退缩。',
        },
      ],
    },
    career_paths: {
      en: [
        'Counselor or Psychotherapist',
        'Writer or Author',
        'Social Activist',
        'Teacher or Professor',
        'Healthcare Professional',
        'Nonprofit Director',
        'Art Therapist',
        'Human Resources Development Specialist',
        'Life Coach',
      ],
      zh: [
        '顾问或心理治疗师',
        '作家或著作者',
        '社会活动人士',
        '教师或教授',
        '医疗保健专业人员',
        '非营利机构主任',
        '艺术治疗师',
        '人力资源开发专员',
        '生活教练',
      ],
    },
    communication_style: {
      en: 'INFJs communicate with depth and intentionality. They choose their words carefully and prefer meaningful conversations over small talk. They have a gift for articulating complex emotional realities in ways that resonate deeply with others. In group settings they may be quiet observers who speak rarely but with impact. One-on-one, they are warm, attentive, and capable of creating a profound sense of connection. They tend to communicate their vision in narrative or metaphorical terms, and they respond poorly to dismissiveness or condescension.',
      zh: 'INFJ的沟通具有深度和目的性。他们仔细选择措辞，偏好有意义的对话而非闲聊。他们善于以能与他人产生深刻共鸣的方式表达复杂的情感现实。在群体中，他们可能是安静的观察者，话虽不多，却往往掷地有声。一对一时，他们温暖、专注，能够创造深厚的连接感。他们倾向于用叙事或隐喻的方式传达愿景，对轻视或居高临下的态度反应很差。',
    },
  },

  // -------------------------------------------------------------------------
  // INTJ — The Architect / 建筑师
  // Cognitive stack: Ni (dominant) - Te (auxiliary) - Fi (tertiary) - Se (inferior)
  // Type group: analyst
  // -------------------------------------------------------------------------
  INTJ: {
    type: 'INTJ',
    typeGroup: 'analyst',
    name: { en: 'The Architect', zh: '建筑师' },
    title: { en: 'The Architect', zh: '建筑师' },
    tagline: {
      en: 'Strategic. Independent. Relentlessly Improving.',
      zh: '富有战略性。独立。不断精进。',
    },
    overview: {
      en: `INTJs are among the most independent and analytically gifted of all types. Known as "The Architect," they are visionary strategists who see the world as a vast set of systems waiting to be understood, optimized, and redesigned. They are tireless in the pursuit of mastery and hold themselves—and everyone around them—to exceptionally high standards. Mediocrity is deeply unsatisfying to an INTJ; they want to understand the root of things and build the best possible solutions from first principles.

Powered by introverted intuition, INTJs develop rich, confident inner models of how the world works. They do not need external validation to feel certain—their trust is in the accuracy of their own vision. Their auxiliary extraverted thinking then executes that vision with ruthless efficiency, organizing external systems, people, and resources to reach their long-range goals. They are not interested in doing things the way things have always been done; they want to find the optimal way.

INTJs are often misunderstood as cold or arrogant. In reality they are intensely passionate about their domains and deeply loyal to the small number of people they allow inside their world. Their inner life—anchored in tertiary introverted feeling—holds a private moral code and genuine emotional depth that rarely surfaces in public. Growth for INTJs often involves developing emotional intelligence, learning to value relational process alongside outcomes, and discovering that imperfect action often beats waiting for the ideal strategy.`,
      zh: `INTJ是所有类型中最独立、分析能力最强的人格之一。被称为"建筑师"，他们是有远见的战略家，将世界视为一套等待被理解、优化和重新设计的庞大系统。他们孜孜不倦地追求精通，对自己和周围每个人都保持极高的标准。平庸对INTJ来说非常令人不满；他们希望理解事物的根源，从第一原理出发构建最佳解决方案。

在内倾直觉的驱动下，INTJ建立了关于世界运作方式的丰富而自信的内部模型。他们不需要外部验证来确立确定性——他们信任自己愿景的准确性。他们的辅助功能外倾思维以无情的效率执行该愿景，组织外部系统、人员和资源以实现长远目标。他们对按照惯例做事不感兴趣；他们想要找到最优的方式。

INTJ常被误解为冷漠或傲慢。实际上，他们对自己的领域充满激情，对进入他们世界的少数人怀有深厚的忠诚。他们的内心世界——以第三功能内倾情感为基础——持有私密的道德准则和真实的情感深度，这些很少在公开场合显现。INTJ的成长往往涉及发展情商、学会在结果之外珍视人际过程，以及发现不完美的行动往往胜过等待理想策略。`,
    },
    cognitive_functions: [
      {
        name: 'Ni',
        role: 'dominant',
        label: { en: 'Introverted Intuition', zh: '内倾直觉' },
        description: {
          en: 'INTJ\'s dominant function. It generates confident long-range visions and predictive frameworks, synthesizing information into a singular focused insight about where things are heading and what the optimal path forward looks like.',
          zh: 'INTJ的主导功能。它产生自信的长远愿景和预测框架，将信息综合为关于事物走向和最优前进路径的单一聚焦洞察。',
        },
      },
      {
        name: 'Te',
        role: 'auxiliary',
        label: { en: 'Extraverted Thinking', zh: '外倾思维' },
        description: {
          en: 'The auxiliary function that drives INTJs to systematically implement their vision. They excel at designing efficient structures, identifying logical flaws, and executing complex plans with precision.',
          zh: '辅助功能，驱使INTJ系统地实现他们的愿景。他们擅长设计高效结构、识别逻辑缺陷，以及精确执行复杂计划。',
        },
      },
      {
        name: 'Fi',
        role: 'tertiary',
        label: { en: 'Introverted Feeling', zh: '内倾情感' },
        description: {
          en: 'The tertiary function that provides INTJs with a private, deeply held value system. Although rarely expressed outwardly, it generates a strong inner moral compass and genuine emotional investments in causes and people they care about.',
          zh: '第三功能，为INTJ提供私密而根深蒂固的价值体系。虽然很少对外表达，但它产生强烈的内在道德指南针，以及对所关心事业和人的真实情感投入。',
        },
      },
      {
        name: 'Se',
        role: 'inferior',
        label: { en: 'Extraverted Sensing', zh: '外倾感觉' },
        description: {
          en: 'The inferior function for INTJs. In undeveloped form it may lead to obliviousness about the physical environment or impulsive sensory indulgences under stress. When integrated, it brings presence, adaptability, and enjoyment of physical mastery.',
          zh: 'INTJ的劣势功能。未发展形式下可能导致对物理环境的忽视，或在压力下的冲动感官放纵。整合后，它带来临场感、适应性以及对身体技能精通的享受。',
        },
      },
    ],
    strengths: {
      en: [
        'Exceptional strategic thinking and long-range planning',
        'High standards and relentless drive for improvement',
        'Independent and confident in their own judgment',
        'Ability to see complex systems and identify inefficiencies',
        'Highly focused and decisive',
        'Deep knowledge in chosen domains',
        'Innovative and original thinker',
        'Reliable and consistent in pursuit of goals',
      ],
      zh: [
        '卓越的战略思维和长远规划能力',
        '高标准和不懈的进步驱动力',
        '独立自主，对自己的判断充满信心',
        '能够洞察复杂系统并识别低效之处',
        '高度专注且果断',
        '在所选领域有深厚的知识积累',
        '具有创新性和原创性的思维',
        '在追求目标方面可靠而一贯',
      ],
    },
    weaknesses: {
      en: [
        'Can come across as arrogant or dismissive of others\' ideas',
        'Difficulty expressing emotions and connecting emotionally',
        'Tendency toward perfectionism that can impede progress',
        'May be overly critical and demanding of others',
        'Can be inflexible when their vision is challenged',
        'May neglect social and relational needs',
        'Can struggle with delegating due to high standards',
      ],
      zh: [
        '可能给人傲慢或轻视他人想法的印象',
        '难以表达情感和在情感上建立连接',
        '倾向于可能阻碍进步的完美主义',
        '可能对他人过于苛刻和要求过高',
        '当愿景受到挑战时可能过于固执',
        '可能忽视社交和人际关系的需求',
        '由于高标准可能难以授权委托',
      ],
    },
    growth_areas: {
      en: [
        {
          title: 'Develop Emotional Intelligence',
          description: 'Practice naming and sharing your own emotional states. Recognize that emotional engagement is not a weakness but a dimension of competence that enriches both relationships and decision-making.',
        },
        {
          title: 'Value Process Over Outcome',
          description: 'Learn to appreciate the relational journey, not just the endpoint. Collaboration often produces better results than individual mastery, even if the process is messier.',
        },
        {
          title: 'Accept Imperfect Execution',
          description: 'Release the tendency to wait for the perfect plan. Iterative, imperfect action generates the real-world data that refines vision better than extended planning.',
        },
        {
          title: 'Engage the Present Moment',
          description: 'Cultivate presence through physical activity, nature, or craftsmanship. Grounding in sensory experience balances the dominant focus on future possibility.',
        },
      ],
      zh: [
        {
          title: '发展情商',
          description: '练习命名和分享自己的情绪状态。认识到情感投入不是软弱，而是丰富关系和决策的能力维度。',
        },
        {
          title: '重视过程而非仅关注结果',
          description: '学会欣赏人际旅程，而不仅是终点。协作往往比个人精通产生更好的结果，即便过程更为凌乱。',
        },
        {
          title: '接受不完美的执行',
          description: '放弃等待完美计划的倾向。反复迭代的、不完美的行动所产生的现实世界数据，比延长计划更能完善愿景。',
        },
        {
          title: '活在当下',
          description: '通过体育活动、亲近自然或手工艺培养临场感。扎根于感官体验，平衡主导功能对未来可能性的专注。',
        },
      ],
    },
    career_paths: {
      en: [
        'Software Architect or Systems Engineer',
        'Research Scientist',
        'Strategic Consultant',
        'Entrepreneur or Startup Founder',
        'Financial Analyst',
        'Investment Strategist',
        'Professor or Academic Researcher',
        'Military Strategist',
        'Data Scientist',
      ],
      zh: [
        '软件架构师或系统工程师',
        '研究科学家',
        '战略顾问',
        '创业者或初创公司创始人',
        '金融分析师',
        '投资策略师',
        '教授或学术研究员',
        '军事战略家',
        '数据科学家',
      ],
    },
    communication_style: {
      en: 'INTJs communicate with precision, directness, and a preference for substance over pleasantry. They think before they speak and expect others to engage with the logical content of what they say rather than its emotional packaging. They dislike small talk and are impatient with vagueness or repetitive discussion. In written form they are often more expressive than in speech. When presenting ideas, they favor systematic explanations supported by evidence. They appreciate intellectual debate and can appear combative to those who mistake their critical questioning for personal attack.',
      zh: 'INTJ的沟通精确、直接，偏好实质内容胜于礼节。他们先思考再发言，期望他人回应其所说内容的逻辑，而非情感包装。他们不喜欢闲聊，对模糊或重复的讨论感到不耐烦。在书面表达中，他们往往比口语更为丰富。呈现想法时，他们倾向于有证据支持的系统性解释。他们欣赏智识辩论，对那些将其批判性提问误解为人身攻击的人来说，可能显得好辩。',
    },
  },

  // -------------------------------------------------------------------------
  // ISTP — The Virtuoso / 鉴赏家
  // Cognitive stack: Ti (dominant) - Se (auxiliary) - Ni (tertiary) - Fe (inferior)
  // Type group: explorer
  // -------------------------------------------------------------------------
  ISTP: {
    type: 'ISTP',
    typeGroup: 'explorer',
    name: { en: 'The Virtuoso', zh: '鉴赏家' },
    title: { en: 'The Virtuoso', zh: '鉴赏家' },
    tagline: {
      en: 'Analytical. Adaptable. Masterful Under Pressure.',
      zh: '分析性强。适应力强。压力下表现卓越。',
    },
    overview: {
      en: `ISTPs are coolly analytical observers who thrive on understanding how things work at a mechanical and structural level. Often called "The Virtuoso," they possess a rare combination of logical rigor and physical aptitude that makes them natural problem-solvers in concrete, real-world domains. They approach challenges with detached curiosity, dismantling problems piece by piece to expose their underlying mechanics. Whether the subject is a broken engine, a financial model, or a martial arts technique, the ISTP wants to understand it from the inside out.

Driven by introverted thinking, ISTPs develop rich internal frameworks for how systems operate. They are not interested in theories for their own sake but in how those theories explain observed reality. Their auxiliary extraverted sensing keeps them alert, responsive, and firmly grounded in the present moment—they notice what is happening in the physical environment and respond with swift, practical action. This combination makes them exceptional in emergency situations and skilled trades.

ISTPs tend to value independence and personal freedom above nearly all else. They resist being tied down by routine or obligation, preferring to live and work on their own terms. They are often private and can seem emotionally inaccessible, but they form strong bonds built on mutual respect and shared activity rather than verbal intimacy. Growth for ISTPs involves developing greater awareness of their impact on others' feelings, learning to sustain commitment beyond initial interest, and cultivating deeper long-term relationships.`,
      zh: `ISTP是冷静的分析性观察者，善于从机械和结构层面理解事物的运作方式。常被称为"鉴赏家"，他们拥有逻辑严谨性与身体能力的罕见结合，使他们成为具体现实领域中的天生解决问题者。他们以超然的好奇心面对挑战，逐块拆解问题以揭露其内在机理。无论主题是一台故障发动机、一个金融模型，还是一种武术技术，ISTP都想从内到外地理解它。

在内倾思维的驱动下，ISTP建立了关于系统运作方式的丰富内部框架。他们对纯粹为理论而理论的事物不感兴趣，而是关注这些理论如何解释观察到的现实。他们的辅助功能外倾感觉使他们保持警觉、反应灵敏，并牢牢扎根于当下时刻——他们注意到物理环境中正在发生的事情，并以迅速、实际的行动回应。这种结合使他们在紧急情况和技术性行业中表现卓越。

ISTP将独立和个人自由置于几乎一切之上。他们抵制被常规或义务束缚，倾向于按自己的条件生活和工作。他们通常比较私密，情感上似乎难以接触，但他们通过相互尊重和共同活动而非言语亲密来建立牢固的纽带。ISTP的成长涉及发展对自己对他人情感影响的更大意识、学会在初始兴趣消退后维持承诺，以及培养更深层的长期关系。`,
    },
    cognitive_functions: [
      {
        name: 'Ti',
        role: 'dominant',
        label: { en: 'Introverted Thinking', zh: '内倾思维' },
        description: {
          en: 'ISTP\'s dominant function. It drives them to build internal logical frameworks for understanding how systems work. They analyze, categorize, and seek precise understanding of cause-and-effect relationships.',
          zh: 'ISTP的主导功能。它驱使他们建立内部逻辑框架以理解系统的运作方式。他们分析、分类，寻求对因果关系的精确理解。',
        },
      },
      {
        name: 'Se',
        role: 'auxiliary',
        label: { en: 'Extraverted Sensing', zh: '外倾感觉' },
        description: {
          en: 'The auxiliary function that gives ISTPs acute awareness of their physical environment. They are highly attuned to sensory data and respond to changing conditions with rapid, practical action.',
          zh: '辅助功能，赋予ISTP对物理环境的敏锐意识。他们对感官数据高度敏感，能够对变化的条件做出迅速、实际的反应。',
        },
      },
      {
        name: 'Ni',
        role: 'tertiary',
        label: { en: 'Introverted Intuition', zh: '内倾直觉' },
        description: {
          en: 'The tertiary function that allows ISTPs to develop hunches and long-range forecasts, though it operates behind the scenes. When developed, it adds strategic depth to their otherwise tactical, present-focused approach.',
          zh: '第三功能，使ISTP能够发展直觉和长期预测，尽管这在幕后运作。当此功能发展成熟时，它为他们原本战术性、专注于当下的方法增添了战略深度。',
        },
      },
      {
        name: 'Fe',
        role: 'inferior',
        label: { en: 'Extraverted Feeling', zh: '外倾情感' },
        description: {
          en: 'The inferior function for ISTPs. In its undeveloped state, they may be unaware of or dismissive of emotional needs in themselves and others. Under extreme stress, suppressed emotions may erupt dramatically. When integrated, it enables genuine warmth and community connection.',
          zh: 'ISTP的劣势功能。未发展时，他们可能对自己和他人的情感需求缺乏意识或漠视。在极度压力下，被压抑的情绪可能剧烈爆发。整合后，它使真诚的温情和社群连接成为可能。',
        },
      },
    ],
    strengths: {
      en: [
        'Exceptional problem-solving in hands-on and technical domains',
        'Cool-headed and effective in crisis situations',
        'Deep analytical understanding of how systems function',
        'Highly adaptable and quick to respond to change',
        'Independent and self-sufficient',
        'Skilled with tools, technology, and physical systems',
        'Honest and direct—no hidden agenda',
      ],
      zh: [
        '在实践和技术领域解决问题能力卓越',
        '在危机情况下冷静且有效',
        '对系统运作方式有深刻的分析理解',
        '高度适应性强，能够快速回应变化',
        '独立自主，自给自足',
        '善于使用工具、技术和物理系统',
        '诚实直接——没有隐藏的动机',
      ],
    },
    weaknesses: {
      en: [
        'Can be insensitive to others\' emotional needs',
        'Difficulty with long-term commitment and sustained motivation',
        'May appear distant or emotionally unavailable',
        'Tendency to take unnecessary physical risks',
        'Can resist structure, rules, and authority',
        'May disengage once a problem is solved and novelty fades',
        'Private to the point of being hard to truly know',
      ],
      zh: [
        '可能对他人的情感需求不够敏感',
        '难以维持长期承诺和持续动力',
        '可能显得疏远或情感上不可及',
        '倾向于承担不必要的身体风险',
        '可能抵制结构、规则和权威',
        '一旦问题解决、新鲜感消退可能就脱离',
        '过于私密以至于难以真正了解',
      ],
    },
    growth_areas: {
      en: [
        {
          title: 'Cultivate Emotional Awareness',
          description: 'Develop the habit of checking in with your own emotional state and the feelings of those around you. Small gestures of acknowledgment can profoundly strengthen relationships.',
        },
        {
          title: 'Sustain Commitment',
          description: 'Practice maintaining engagement in projects and relationships beyond the phase of initial excitement. Discipline and follow-through build the deeper mastery and bonds you value.',
        },
        {
          title: 'Communicate Process',
          description: 'Share your reasoning and decision-making process with others. People who care about you want to understand how you think, even if your conclusions seem obvious to you.',
        },
        {
          title: 'Plan for the Long Term',
          description: 'Invest time in developing the tertiary Ni function by setting long-range goals and reflecting on future implications of current actions.',
        },
      ],
      zh: [
        {
          title: '培养情感意识',
          description: '养成关注自己情绪状态和周围人感受的习惯。小小的认可手势可以深刻地强化关系。',
        },
        {
          title: '维持承诺',
          description: '练习在最初的兴奋阶段之后，继续保持对项目和关系的投入。纪律性和坚持到底能建立你所珍视的更深层的精通和纽带。',
        },
        {
          title: '传达思维过程',
          description: '与他人分享你的推理和决策过程。关心你的人想理解你的思维方式，即便你的结论对你来说显而易见。',
        },
        {
          title: '为长远规划',
          description: '通过制定长远目标、反思当前行动的未来影响，投入时间发展第三功能内倾直觉。',
        },
      ],
    },
    career_paths: {
      en: [
        'Mechanical or Electrical Engineer',
        'Pilot or Aircraft Technician',
        'Forensic Scientist',
        'Computer Programmer or Systems Analyst',
        'Emergency Medical Technician',
        'Surgeon or Surgical Technologist',
        'Military Special Operations',
        'Financial Trader',
        'Race Car Driver or Athlete',
      ],
      zh: [
        '机械或电气工程师',
        '飞行员或航空技术员',
        '法医科学家',
        '计算机程序员或系统分析师',
        '急救医疗技术人员',
        '外科医生或外科技师',
        '军事特种作战人员',
        '金融交易员',
        '赛车手或运动员',
      ],
    },
    communication_style: {
      en: 'ISTPs communicate concisely and factually. They say exactly what they mean without embellishment and expect others to do the same. They are uncomfortable with excessive emotional expression and prefer problem-focused dialogue. They tend to think through responses carefully before speaking and dislike being pushed to share before they are ready. In group discussions they may be quiet observers who contribute brief, precise observations at critical moments. They respond well to direct, respectful communication and poorly to manipulation or emotional pressure.',
      zh: 'ISTP的沟通简洁而基于事实。他们不加修饰地表达本意，也期望他人如此。他们对过度情感表达感到不适，偏好以问题为中心的对话。他们倾向于在发言前仔细思考回应，不喜欢在准备好之前被迫分享。在群体讨论中，他们可能是安静的观察者，在关键时刻提出简短、精确的意见。他们对直接、尊重的沟通反应良好，对操纵或情感压力反应很差。',
    },
  },

  // -------------------------------------------------------------------------
  // ISFP — The Adventurer / 探险家
  // Cognitive stack: Fi (dominant) - Se (auxiliary) - Ni (tertiary) - Te (inferior)
  // Type group: explorer
  // -------------------------------------------------------------------------
  ISFP: {
    type: 'ISFP',
    typeGroup: 'explorer',
    name: { en: 'The Adventurer', zh: '探险家' },
    title: { en: 'The Adventurer', zh: '探险家' },
    tagline: {
      en: 'Authentic. Sensory. Free-Spirited.',
      zh: '真实。感官敏锐。自由精神。',
    },
    overview: {
      en: `ISFPs are gentle, sensitive, and deeply authentic individuals who live their values from the inside out. They are guided by a strong internal compass—introverted feeling—that tells them, with quiet but unshakeable certainty, what matters and what does not. They do not impose their values on others; they simply live by them with profound personal integrity. To the outside world, ISFPs may appear reserved or even mysterious, but internally they experience a rich emotional and aesthetic world that is intensely felt if rarely spoken.

Paired with extraverted sensing as their auxiliary function, ISFPs are deeply attuned to the beauty and texture of the physical world. They notice color, sound, movement, and sensation with an artist's sensitivity. Many ISFPs express themselves through creative and artistic work—photography, music, dance, fashion, or craftsmanship. Their creations often carry a quiet eloquence that communicates what words cannot. They live in and appreciate the present moment more naturally than almost any other type.

ISFPs are fiercely kind and fiercely independent in equal measure. They are deeply loyal to the people they love but require personal space and freedom to feel fully themselves. They can be remarkably flexible and spontaneous, embracing life as it comes. Their challenge lies in long-range planning, assertiveness, and navigating criticism, which they can experience as deep personal wounds. Growth for ISFPs involves developing confidence in their own voice, learning to plan and commit for the future, and standing firm in their values when externally pressured.`,
      zh: `ISFP是温柔、敏感且深度真实的个体，从内到外地活出自己的价值观。他们被一个强大的内部指南针——内倾情感——所引导，以安静却不可动摇的确定性告诉他们什么重要、什么不重要。他们不将自己的价值观强加于人；他们只是以深刻的个人诚信去践行它们。对外部世界而言，ISFP可能显得内敛甚至神秘，但内心深处他们体验着一个丰富的情感和审美世界，感受强烈却鲜少言说。

以外倾感觉为辅助功能，ISFP对物质世界的美丽和质感深度敏感。他们以艺术家的感知觉察色彩、声音、运动和感觉。许多ISFP通过创意和艺术工作来表达自己——摄影、音乐、舞蹈、时尚或手工艺。他们的创作往往带有一种安静的表达力，传递着语言无法表达的东西。他们比几乎任何其他类型都更自然地活在和欣赏当下时刻。

ISFP在强烈的善良和强烈的独立性之间保持平衡。他们对所爱之人深度忠诚，但需要个人空间和自由才能完全做自己。他们可以非常灵活和自发，顺应生活的本来样貌。他们的挑战在于长远规划、自我主张，以及面对批评——批评对他们来说可能是深刻的内心创伤。ISFP的成长涉及发展对自己声音的自信、学会规划和为未来承诺，以及在外部压力下坚守自己的价值观。`,
    },
    cognitive_functions: [
      {
        name: 'Fi',
        role: 'dominant',
        label: { en: 'Introverted Feeling', zh: '内倾情感' },
        description: {
          en: 'ISFP\'s dominant function. It creates a deep, personal value system that guides their every decision from within. ISFPs experience rich, private emotional lives and live with extraordinary authenticity to their inner truth.',
          zh: 'ISFP的主导功能。它建立深刻的个人价值体系，从内部引导他们的每一个决定。ISFP拥有丰富、私密的情感生活，以非凡的真实性活出内心的真理。',
        },
      },
      {
        name: 'Se',
        role: 'auxiliary',
        label: { en: 'Extraverted Sensing', zh: '外倾感觉' },
        description: {
          en: 'The auxiliary function that connects ISFPs to the sensory richness of the present moment. They are aesthetically sensitive, physically coordinated, and responsive to the beauty and energy of their immediate environment.',
          zh: '辅助功能，将ISFP与当下时刻的感官丰富性相连。他们在审美上敏感，身体协调，对周围环境的美丽和能量反应灵敏。',
        },
      },
      {
        name: 'Ni',
        role: 'tertiary',
        label: { en: 'Introverted Intuition', zh: '内倾直觉' },
        description: {
          en: 'The tertiary function that gives ISFPs occasional flashes of insight about underlying patterns or future directions. When developed, it helps them connect their present experiences to a longer-range personal vision.',
          zh: '第三功能，使ISFP偶尔对底层模式或未来方向产生洞察闪光。当此功能发展成熟时，它帮助他们将当下的体验与更长远的个人愿景相连接。',
        },
      },
      {
        name: 'Te',
        role: 'inferior',
        label: { en: 'Extraverted Thinking', zh: '外倾思维' },
        description: {
          en: 'The inferior function for ISFPs. When underdeveloped, they may struggle with organization, planning, and assertive decision-making. Under stress, it can manifest as harsh, all-or-nothing thinking. When integrated, it enables effective action and practical follow-through.',
          zh: 'ISFP的劣势功能。未充分发展时，他们可能在组织、规划和果断决策方面感到困难。压力下，它可能表现为苛刻的、全有或全无的思维。整合后，它使有效行动和实际执行成为可能。',
        },
      },
    ],
    strengths: {
      en: [
        'Deep authenticity and personal integrity',
        'Strong aesthetic sensibility and artistic talent',
        'Warm, kind, and genuinely caring toward others',
        'Highly adaptable and open to new experiences',
        'Present-focused and fully engaged in the moment',
        'Deeply empathetic and attuned to others\' emotions',
        'Gentle peacemaker who avoids unnecessary conflict',
        'Loyal and supportive in personal relationships',
      ],
      zh: [
        '深度的真实性和个人诚信',
        '强烈的审美感受力和艺术才能',
        '对他人温暖、善良且真诚关怀',
        '高度适应性强，对新体验开放',
        '专注于当下，充分投入于当下时刻',
        '深度同理心，与他人情绪高度共鸣',
        '温和的和平缔造者，避免不必要的冲突',
        '在个人关系中忠诚且支持他人',
      ],
    },
    weaknesses: {
      en: [
        'Difficulty with long-term planning and future-orientation',
        'Can avoid conflict to the point of not addressing important issues',
        'May struggle with assertiveness and speaking up for themselves',
        'Highly sensitive to criticism and can internalize it painfully',
        'May have difficulty with structure and follow-through on commitments',
        'Can be unpredictable or inconsistent in direction',
        'May suppress their own needs due to conflict avoidance',
      ],
      zh: [
        '难以进行长期规划和面向未来',
        '可能为了回避冲突而不处理重要问题',
        '可能在自我主张和为自己发声方面感到困难',
        '对批评高度敏感，可能痛苦地内化它',
        '可能难以保持结构和兑现承诺',
        '在方向上可能不可预测或不一致',
        '可能因回避冲突而压抑自己的需求',
      ],
    },
    growth_areas: {
      en: [
        {
          title: 'Develop Assertiveness',
          description: 'Practice expressing your needs and opinions clearly and directly, even when doing so creates temporary discomfort. Your voice and perspective are valuable and deserve to be heard.',
        },
        {
          title: 'Build Future Orientation',
          description: 'Develop simple planning habits—a weekly intention, a three-month goal. Connecting present actions to a meaningful future vision provides direction without sacrificing spontaneity.',
        },
        {
          title: 'Separate Feedback from Identity',
          description: 'Learn to receive criticism as information about a specific action or output, not as a judgment of your core worth. Constructive feedback is a tool for growth, not a condemnation.',
        },
        {
          title: 'Follow Through on Commitments',
          description: 'Practice completing projects from start to finish, even when initial enthusiasm fades. Finishing builds confidence, competence, and the trust of others.',
        },
      ],
      zh: [
        {
          title: '发展自我主张',
          description: '练习清晰直接地表达你的需求和意见，即使这样做会暂时造成不适。你的声音和观点有价值，值得被聆听。',
        },
        {
          title: '建立未来导向',
          description: '培养简单的规划习惯——每周的意图、三个月的目标。将当下的行动与有意义的未来愿景相连接，在不牺牲自发性的情况下提供方向感。',
        },
        {
          title: '将反馈与身份分离',
          description: '学会将批评视为关于某一具体行为或成果的信息，而非对你核心价值的判断。建设性的反馈是成长的工具，不是谴责。',
        },
        {
          title: '兑现承诺',
          description: '练习从头到尾完成项目，即使最初的热情消退。完成事情能建立信心、能力以及他人的信任。',
        },
      ],
    },
    career_paths: {
      en: [
        'Artist, Photographer, or Musician',
        'Fashion Designer',
        'Veterinarian or Animal Caretaker',
        'Physical Therapist',
        'Chef or Culinary Artist',
        'Interior Designer',
        'Nursing or Healthcare Provider',
        'Environmental Scientist',
        'Personal Trainer',
      ],
      zh: [
        '艺术家、摄影师或音乐家',
        '时装设计师',
        '兽医或动物看护员',
        '物理治疗师',
        '厨师或烹饪艺术家',
        '室内设计师',
        '护理或医疗服务提供者',
        '环境科学家',
        '私人教练',
      ],
    },
    communication_style: {
      en: 'ISFPs communicate with warmth, quiet thoughtfulness, and a preference for genuine personal exchange over abstract discussion. They tend to be listeners rather than talkers in groups and may share more in intimate one-on-one settings. They communicate their inner world largely through actions, creative expression, and thoughtful gestures rather than words. They value sincerity above all else in communication and can detect inauthenticity quickly. When their values are violated, they may withdraw silently rather than confront, a pattern that can create misunderstanding in close relationships.',
      zh: 'ISFP的沟通方式温暖、安静而体贴，偏好真诚的个人交流，而非抽象的讨论。在群体中，他们倾向于是倾听者而非话多者，在亲密的一对一环境中可能会分享更多。他们主要通过行动、创意表达和体贴的姿态而非言语来传达内心世界。在沟通中，他们最看重真诚，能够迅速察觉不真实的成分。当他们的价值观被侵犯时，他们可能会沉默地退缩而非直接对抗，这种模式可能在亲密关系中造成误解。',
    },
  },

  // -------------------------------------------------------------------------
  // INFP — The Mediator / 调停者
  // Cognitive stack: Fi (dominant) - Ne (auxiliary) - Si (tertiary) - Te (inferior)
  // Type group: diplomat
  // -------------------------------------------------------------------------
  INFP: {
    type: 'INFP',
    typeGroup: 'diplomat',
    name: { en: 'The Mediator', zh: '调停者' },
    title: { en: 'The Mediator', zh: '调停者' },
    tagline: {
      en: 'Idealistic. Empathetic. Endlessly Creative.',
      zh: '理想主义。富有同理心。无尽的创造力。',
    },
    overview: {
      en: `INFPs are dreamers, poets, and quiet revolutionaries who carry a universe of values, ideals, and imaginative possibility within them. Guided by introverted feeling as their dominant function, they experience the world through a deeply personal moral lens that prioritizes authenticity, compassion, and meaning. They hold their values not as abstract principles but as felt truths—they know what is right for them in a way that is intuitive and unshakeable, even if difficult to articulate to others.

Paired with extraverted intuition as their auxiliary function, INFPs have a remarkable capacity for creative synthesis and open-ended exploration. They see connections and possibilities others miss, and they are drawn to the novel, the symbolic, and the deeply human. Their imagination is their greatest gift. In writing, music, visual art, or any field that allows for personal expression, INFPs can produce work of profound emotional resonance and originality.

INFPs are among the most empathetic of all types—they feel the pain of others as if it were their own. This empathy drives them toward causes of justice, healing, and human potential. However, it can also leave them emotionally exhausted and prone to idealism that collides with the imperfections of the real world. Growth for INFPs involves learning to take practical action in service of their ideals rather than remaining paralyzed by perfectionism, developing resilience in the face of disappointment, and learning to receive rather than only give care.`,
      zh: `INFP是梦想者、诗人和安静的革命者，内心承载着宇宙般的价值观、理想和想象的可能性。以内倾情感为主导功能，他们通过深度个人化的道德视角体验世界，这种视角以真实性、慈悲和意义为优先。他们持有的价值观不是抽象的原则，而是被感受到的真理——他们以一种直觉性的、不可动摇的方式知道什么对自己是对的，即便难以向他人表达清楚。

以外倾直觉为辅助功能，INFP拥有非凡的创意综合能力和开放式探索能力。他们看到他人错过的联系和可能性，被新颖的、象征性的和深刻人文性的事物所吸引。他们的想象力是最大的天赋。在写作、音乐、视觉艺术，或任何允许个人表达的领域，INFP能够创作出具有深刻情感共鸣和原创性的作品。

INFP是所有类型中同理心最强的之一——他们感受他人的痛苦如同自身的痛苦。这种同理心驱使他们投身于正义、治愈和人类潜能的事业。然而，它也可能让他们情感耗尽，并倾向于理想主义，与现实世界的不完美碰撞。INFP的成长涉及学习为了理想而采取实际行动，而非在完美主义中陷入瘫痪；在面对失望时发展韧性；以及学会接受而不仅仅是给予关爱。`,
    },
    cognitive_functions: [
      {
        name: 'Fi',
        role: 'dominant',
        label: { en: 'Introverted Feeling', zh: '内倾情感' },
        description: {
          en: 'INFP\'s dominant function. It generates a rich inner value system that guides decisions from deep within. INFPs feel intensely and privately, holding profound convictions about authenticity, beauty, and human dignity.',
          zh: 'INFP的主导功能。它产生丰富的内部价值体系，从内心深处引导决策。INFP的情感强烈而私密，对真实性、美丽和人的尊严持有深刻的信念。',
        },
      },
      {
        name: 'Ne',
        role: 'auxiliary',
        label: { en: 'Extraverted Intuition', zh: '外倾直觉' },
        description: {
          en: 'The auxiliary function that fuels INFPs\' boundless creativity, curiosity, and love of exploration. It generates connections between ideas, reveals hidden possibilities, and drives their engagement with the imaginative and symbolic.',
          zh: '辅助功能，激发INFP无尽的创造力、好奇心和对探索的热爱。它在想法之间建立联系，揭示隐藏的可能性，并驱动他们对想象性和象征性事物的投入。',
        },
      },
      {
        name: 'Si',
        role: 'tertiary',
        label: { en: 'Introverted Sensing', zh: '内倾感觉' },
        description: {
          en: 'The tertiary function that grounds INFPs in personal memory, nostalgia, and cherished experiences from the past. When developed, it provides a stabilizing anchor and appreciation for meaningful traditions.',
          zh: '第三功能，将INFP扎根于个人记忆、怀旧情感和过去珍贵的体验中。当此功能发展成熟时，它提供稳定的锚点，以及对有意义传统的欣赏。',
        },
      },
      {
        name: 'Te',
        role: 'inferior',
        label: { en: 'Extraverted Thinking', zh: '外倾思维' },
        description: {
          en: 'The inferior function for INFPs. In its undeveloped state it may manifest as difficulty with organization, practicality, and assertive decision-making. Under stress, it can emerge as blunt, harsh criticism of self or others. When integrated, it empowers INFPs to take effective, structured action toward their ideals.',
          zh: 'INFP的劣势功能。未发展时可能表现为在组织、实用性和果断决策方面的困难。压力下，它可能以对自己或他人的尖刻、严厉批评的形式出现。整合后，它使INFP能够为实现理想而采取有效、有结构的行动。',
        },
      },
    ],
    strengths: {
      en: [
        'Deeply empathetic and compassionate toward others',
        'Extraordinary creativity and imaginative capacity',
        'Authentic and guided by strong personal values',
        'Open-minded and curious about the full range of human experience',
        'Passionate advocate for causes they believe in',
        'Insightful about human psychology and motivation',
        'Adaptable and resilient when aligned with meaningful purpose',
        'Gifted writer, storyteller, or artist',
      ],
      zh: [
        '对他人有深厚的同理心和慈悲心',
        '非凡的创造力和想象力',
        '真实，受强烈个人价值观引导',
        '思想开放，对人类体验的全部范围充满好奇',
        '热情地为所信仰的事业倡导',
        '对人类心理和动机有深刻洞察',
        '在与有意义的目标一致时，适应力强且具有韧性',
        '有天赋的作家、说故事者或艺术家',
      ],
    },
    weaknesses: {
      en: [
        'Can be overly idealistic and struggle with practical realities',
        'Tendency toward self-criticism and perfectionism',
        'May avoid conflict even when confrontation is necessary',
        'Can feel overwhelmed and paralyzed by too many possibilities',
        'Prone to emotional exhaustion from absorbing others\' pain',
        'May have difficulty with organization and practical follow-through',
        'Can isolate when overwhelmed rather than seeking support',
      ],
      zh: [
        '可能过于理想主义，难以应对实际现实',
        '倾向于自我批评和完美主义',
        '即使在必要时也可能回避冲突',
        '可能被太多可能性所压倒并陷入瘫痪',
        '因吸收他人的痛苦而容易情感耗尽',
        '可能在组织和实际执行方面有困难',
        '在不知所措时可能选择孤立而非寻求支持',
      ],
    },
    growth_areas: {
      en: [
        {
          title: 'Act on Imperfect Plans',
          description: 'Practice starting before everything is ready. Imperfect action toward a meaningful goal is infinitely better than perfect inaction. Done is often greater than perfect.',
        },
        {
          title: 'Develop Practical Skills',
          description: 'Invest in building concrete habits around planning, organization, and follow-through. These skills are learnable and they amplify the impact of your creative and empathetic gifts.',
        },
        {
          title: 'Set Healthy Emotional Boundaries',
          description: 'Learn to feel compassion for others without absorbing their pain as your own. You can care deeply while protecting the emotional space you need to thrive.',
        },
        {
          title: 'Engage in Productive Conflict',
          description: 'Practice expressing disagreement or disappointment honestly and early, before it festers. Healthy conflict, navigated with care, strengthens rather than damages relationships.',
        },
      ],
      zh: [
        {
          title: '在计划不完美时也要行动',
          description: '练习在一切就绪之前就开始。为有意义的目标而采取不完美的行动，无限优于完美的不行动。完成往往胜于完美。',
        },
        {
          title: '发展实践技能',
          description: '投入建立围绕规划、组织和执行到底的具体习惯。这些技能是可以习得的，它们会放大你的创造力和同理心天赋的影响。',
        },
        {
          title: '设定健康的情感界限',
          description: '学会对他人感同身受，而不把他们的痛苦当作自己的。你可以深切关怀，同时保护自己蓬勃发展所需的情感空间。',
        },
        {
          title: '进行有建设性的冲突',
          description: '练习在分歧或失望滋生之前，诚实而及早地表达出来。以关怀驾驭的健康冲突会强化而非损害关系。',
        },
      ],
    },
    career_paths: {
      en: [
        'Writer, Author, or Poet',
        'Counselor or Therapist',
        'Social Worker',
        'Graphic Designer or Illustrator',
        'Teacher or Special Education Specialist',
        'Musician or Composer',
        'Human Rights Activist',
        'Librarian',
        'Psychologist or Researcher',
        'UX Designer',
      ],
      zh: [
        '作家、著作者或诗人',
        '顾问或治疗师',
        '社会工作者',
        '平面设计师或插画家',
        '教师或特殊教育专家',
        '音乐家或作曲家',
        '人权活动人士',
        '图书管理员',
        '心理学家或研究员',
        '用户体验设计师',
      ],
    },
    communication_style: {
      en: 'INFPs communicate with emotional depth and a preference for authentic, personal connection. They express themselves most naturally through writing, where they can carefully craft their thoughts without the pressure of real-time response. In conversation, they are warm, reflective, and highly attuned to the emotional undercurrents of dialogue. They can be quietly articulate about complex emotional and philosophical subjects. They dislike small talk and performative interaction, and they will disengage if they sense inauthenticity. When hurt or criticized, they may withdraw internally before processing enough to communicate their feelings.',
      zh: 'INFP的沟通充满情感深度，偏好真实、个人的连接。他们通过写作最自然地表达自己，在那里他们可以仔细推敲思想，而不必承受实时回应的压力。在交谈中，他们温暖、沉思，对对话中的情感暗流高度敏感。他们能够安静而清晰地表达复杂的情感和哲学主题。他们不喜欢闲聊和表演性的互动，一旦察觉到不真实就会脱离。当受伤或被批评时，他们可能在内心退缩，先经过足够的处理才能表达自己的感受。',
    },
  },

  // -------------------------------------------------------------------------
  // INTP — The Logician / 逻辑学家
  // Cognitive stack: Ti (dominant) - Ne (auxiliary) - Si (tertiary) - Fe (inferior)
  // Type group: analyst
  // -------------------------------------------------------------------------
  INTP: {
    type: 'INTP',
    typeGroup: 'analyst',
    name: { en: 'The Logician', zh: '逻辑学家' },
    title: { en: 'The Logician', zh: '逻辑学家' },
    tagline: {
      en: 'Inventive. Precise. Endlessly Curious.',
      zh: '富有创造力。精确。无尽好奇。',
    },
    overview: {
      en: `INTPs are the architects of ideas—theoretical, analytical, and intellectually insatiable. They are driven by an internal need to understand everything at its most fundamental level, to find the underlying principles that explain observed phenomena, and to construct logically airtight frameworks that account for every variable. Where others see a finished product, the INTP sees a system full of assumptions waiting to be challenged and inefficiencies waiting to be corrected.

Powered by introverted thinking as their dominant function, INTPs are deeply private thinkers who process the world through a relentless internal analysis. They build elaborate mental models with extraordinary precision, and they take ideas seriously. Their auxiliary extraverted intuition ensures they never stop at the first answer—they generate possibilities, explore connections, follow tangents, and delight in intellectual complexity. The INTP mind is a playground of hypotheticals and thought experiments.

INTPs are often misread as aloof or absent-minded, but this misunderstands the sheer intensity of their intellectual engagement. Beneath their quiet exterior is a mind that is almost never still. They tend to struggle with the social and emotional dimensions of life—not out of indifference but out of a genuine difficulty in navigating them with the same precision they apply to abstract systems. Growth for INTPs involves learning to value and develop emotional intelligence, translating their internal knowledge into action and communication, and accepting that some human truths are not reducible to logic.`,
      zh: `INTP是思想的建筑师——理论性的、分析性的、智识上永不满足的。他们被一种内在的需求所驱使：在最基本的层面上理解一切，找到解释观察到的现象的基本原理，并构建在逻辑上无懈可击的框架，能够解释每一个变量。在他人看到成品的地方，INTP看到的是充满等待被质疑的假设和等待被纠正的低效问题的系统。

在内倾思维这一主导功能的驱动下，INTP是深度私密的思考者，通过不间断的内部分析来处理世界。他们以非凡的精确性建立精细的心理模型，并认真对待思想。他们的辅助功能外倾直觉确保他们永远不会止于第一个答案——他们产生可能性，探索联系，追随切线，并陶醉于智识的复杂性之中。INTP的思维是假设和思想实验的游乐场。

INTP常被误解为冷漠或心不在焉，但这误解了他们智识投入的纯粹强度。在他们安静的外表之下，是一个几乎从不静止的头脑。他们往往在生活的社会和情感维度上感到困难——不是出于漠不关心，而是出于在以与他们处理抽象系统相同的精确度驾驭这些维度时的真实困难。INTP的成长涉及学会珍视和发展情商、将内部知识转化为行动和沟通，以及接受某些人类真理无法归结为逻辑。`,
    },
    cognitive_functions: [
      {
        name: 'Ti',
        role: 'dominant',
        label: { en: 'Introverted Thinking', zh: '内倾思维' },
        description: {
          en: 'INTP\'s dominant function. It drives them to construct precise internal logical frameworks for understanding reality. INTPs analyze everything with relentless rigor, seeking coherent, comprehensive explanations.',
          zh: 'INTP的主导功能。它驱使他们构建精确的内部逻辑框架来理解现实。INTP以不懈的严谨性分析一切，寻求连贯、全面的解释。',
        },
      },
      {
        name: 'Ne',
        role: 'auxiliary',
        label: { en: 'Extraverted Intuition', zh: '外倾直觉' },
        description: {
          en: 'The auxiliary function that generates endless possibilities and connections. It propels INTPs through intellectual exploration, ensuring they consider multiple angles and remain open to paradigm-shifting perspectives.',
          zh: '辅助功能，产生无尽的可能性和联系。它推动INTP进行智识探索，确保他们考虑多个角度，并对改变范式的视角保持开放。',
        },
      },
      {
        name: 'Si',
        role: 'tertiary',
        label: { en: 'Introverted Sensing', zh: '内倾感觉' },
        description: {
          en: 'The tertiary function that anchors INTPs to established knowledge and personal experience. It provides a repository of learned information that informs their analysis and creates an appreciation for precision of detail.',
          zh: '第三功能，将INTP与已建立的知识和个人经验相连接。它提供一个学到的信息储存库，为他们的分析提供信息，并培养对细节精确性的欣赏。',
        },
      },
      {
        name: 'Fe',
        role: 'inferior',
        label: { en: 'Extraverted Feeling', zh: '外倾情感' },
        description: {
          en: 'The inferior function for INTPs. In its undeveloped state, social and emotional navigation can feel foreign and exhausting. Under stress, it may emerge as unexpected emotional outbursts or over-sensitivity. When integrated, it enables genuine warmth, social connection, and the ability to inspire others with their ideas.',
          zh: 'INTP的劣势功能。未发展时，社交和情感的驾驭可能感觉陌生且令人疲惫。压力下，它可能表现为意外的情绪爆发或过度敏感。整合后，它使真诚的温情、社交连接以及以想法激励他人成为可能。',
        },
      },
    ],
    strengths: {
      en: [
        'Exceptional analytical and logical reasoning ability',
        'Highly creative and original in generating ideas',
        'Objective and intellectually honest',
        'Deep thinker capable of profound insight',
        'Adaptable in intellectual domains',
        'Excellent at identifying flaws and logical inconsistencies',
        'Intellectually versatile across multiple disciplines',
        'Independent thinker who questions conventional wisdom',
      ],
      zh: [
        '卓越的分析和逻辑推理能力',
        '在产生想法方面高度创造性和原创性',
        '客观且在智识上诚实',
        '深度思考者，能够产生深刻洞察',
        '在智识领域具有适应性',
        '善于识别缺陷和逻辑不一致之处',
        '跨越多个学科的智识多面手',
        '独立思考者，质疑传统智慧',
      ],
    },
    weaknesses: {
      en: [
        'Difficulty expressing emotions and connecting emotionally with others',
        'Can be perceived as insensitive or dismissive of feelings',
        'Tendency to overthink and struggle with decision paralysis',
        'May procrastinate or abandon projects before completion',
        'Can be condescending when impatient with others\' reasoning',
        'May struggle with practical implementation and follow-through',
        'Can become isolated in their internal world',
      ],
      zh: [
        '难以表达情感，难以与他人在情感上建立连接',
        '可能被认为对感受不敏感或轻视',
        '倾向于过度思考，陷入决策瘫痪',
        '可能拖延或在完成之前放弃项目',
        '对他人的推理感到不耐烦时可能显得居高临下',
        '可能在实际执行和坚持到底方面感到困难',
        '可能在自己的内部世界中变得孤立',
      ],
    },
    growth_areas: {
      en: [
        {
          title: 'Translate Knowledge Into Action',
          description: 'Develop the discipline to move from analysis to execution. A perfect theory implemented imperfectly still has more real-world impact than an unimplemented masterpiece.',
        },
        {
          title: 'Develop Social and Emotional Skills',
          description: 'Approach social dynamics with the same curiosity you bring to abstract systems. Emotional intelligence is a learnable skill, not a fixed trait, and it dramatically expands your effectiveness.',
        },
        {
          title: 'Communicate to Connect, Not Just Inform',
          description: 'Practice sharing ideas in ways that account for the emotional and social needs of your audience. The best ideas lose impact if they are not communicated in ways people can receive.',
        },
        {
          title: 'Finish What You Start',
          description: 'Build the habit of completing projects from concept through delivery. Completion is where your insights meet the world and generate genuine impact.',
        },
      ],
      zh: [
        {
          title: '将知识转化为行动',
          description: '培养从分析转向执行的纪律。不完美地执行的完美理论，仍然比未付诸实施的杰作对现实世界有更多影响。',
        },
        {
          title: '发展社交和情感技能',
          description: '以你对抽象系统同样的好奇心来对待社交动态。情商是可以习得的技能，不是固定特质，它能极大地扩展你的影响力。',
        },
        {
          title: '为连接而沟通，不仅仅是传递信息',
          description: '练习以考虑受众情感和社交需求的方式分享想法。最好的想法如果不以人们能够接收的方式传达，就会失去影响力。',
        },
        {
          title: '完成你开始的事',
          description: '建立从概念到交付完成项目的习惯。完成是你的洞察遇见世界并产生真正影响的地方。',
        },
      ],
    },
    career_paths: {
      en: [
        'Software Engineer or Computer Scientist',
        'Research Scientist or Academic',
        'Mathematician or Statistician',
        'Philosopher or Ethicist',
        'Systems Analyst or Architect',
        'Economist or Quantitative Analyst',
        'Professor or Researcher',
        'Strategic Planner',
        'Cybersecurity Specialist',
        'Physicist or Chemist',
      ],
      zh: [
        '软件工程师或计算机科学家',
        '研究科学家或学者',
        '数学家或统计学家',
        '哲学家或伦理学家',
        '系统分析师或架构师',
        '经济学家或量化分析师',
        '教授或研究员',
        '战略规划师',
        '网络安全专家',
        '物理学家或化学家',
      ],
    },
    communication_style: {
      en: 'INTPs communicate with precision, intellectual rigor, and a love of nuance. They enjoy exploring ideas from multiple angles and can be remarkably articulate when discussing subjects they have thought deeply about. They tend to qualify statements carefully and dislike oversimplification. In casual social settings they can appear quiet and reserved, but in stimulating intellectual conversations they become animated and engaged. They are direct to the point of bluntness and have little patience for vague or illogical communication. They appreciate being challenged intellectually and respond poorly to appeals based solely on authority or emotion.',
      zh: 'INTP的沟通精确、具有智识严谨性，并热爱细微差别。他们喜欢从多个角度探索想法，在讨论深入思考过的主题时可以非常清晰地表达。他们倾向于仔细限定陈述，不喜欢过度简化。在随意的社交场合中，他们可能显得安静内敛，但在激励性的智识对话中，他们会变得生动投入。他们直接到近乎直白，对模糊或不合逻辑的沟通几乎没有耐心。他们欣赏智识上的挑战，对仅基于权威或情感的诉求反应很差。',
    },
  },
};

export const mbtiTypeDescriptions: Record<string, MbtiTypeDescription> = {
  ...mbtiTypeDescriptionsBase,
  ...mbtiTypeDescriptionsExt,
};
