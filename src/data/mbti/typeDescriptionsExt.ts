import type { MbtiTypeDescription } from '../../types/mbti';

export const mbtiTypeDescriptionsExt: Record<string, MbtiTypeDescription> = {
  ESTP: {
    type: 'ESTP',
    typeGroup: 'explorer',
    name: { en: 'The Entrepreneur', zh: '企业家' },
    title: { en: 'Entrepreneur', zh: '企业家' },
    tagline: {
      en: 'Bold, action-oriented doers who thrive in the moment',
      zh: '大胆、行动导向的实干家，在当下时刻大放异彩',
    },
    overview: {
      en: `ESTPs are energetic and perceptive individuals who possess an extraordinary ability to read situations and people with razor-sharp clarity. They are natural entrepreneurs who dive headfirst into challenges, preferring hands-on experience over theoretical study. In any room they enter, ESTPs quickly become the center of attention — not because they seek it, but because their magnetic energy and quick wit naturally draw others in.

At their core, ESTPs are realists who live firmly in the present. They trust what they can observe, touch, and directly engage with, making them supremely practical problem-solvers. When a crisis erupts, it is often the ESTP who keeps a cool head and finds an immediate, workable solution while others are still processing the situation. Their tolerance for risk and ambiguity is exceptionally high, and they often thrive in environments where others feel overwhelmed.

However, this same love of immediacy can lead ESTPs to overlook long-term consequences or dismiss the emotional undercurrents in a situation. They may find slow, methodical processes frustrating, and can come across as blunt or insensitive when they prioritize efficiency over feelings. Growth for ESTPs often involves developing patience, cultivating deeper emotional awareness, and learning to honor commitments even when new and exciting opportunities beckon.`,
      zh: `ESTP是精力充沛、洞察力敏锐的人，拥有以惊人的清晰度解读情境和他人的非凡能力。他们是天生的企业家，会毫不犹豫地投身于挑战之中，更喜欢亲身实践而非理论学习。无论走进哪个房间，ESTP都能迅速成为焦点——不是因为他们刻意追求，而是因为他们充满感染力的能量和机智的反应自然而然地吸引着他人。

从本质上看，ESTP是脚踏实地的现实主义者，牢牢地活在当下。他们信任自己能够观察、触碰和直接参与的事物，这使他们成为极其务实的问题解决者。当危机爆发时，往往是ESTP能保持冷静，在他人尚未理解局势之际便迅速找到切实可行的解决方案。他们对风险和模糊性的容忍度极高，常常在令他人感到不知所措的环境中如鱼得水。

然而，这种对即时性的热爱也可能导致ESTP忽视长远后果，或对情境中的情感暗流视而不见。他们可能会对缓慢而系统的流程感到沮丧，当将效率置于情感之上时，可能显得直率甚至不够体贴。ESTP的成长之路往往需要培养耐心、加深情感意识，并学会在新的令人兴奋的机会出现时也能信守承诺。`,
    },
    cognitive_functions: [
      {
        name: 'Se',
        role: 'dominant',
        label: { en: 'Extraverted Sensing', zh: '外倾感觉' },
        description: {
          en: 'Dominant Se gives ESTPs an acute awareness of the immediate physical environment, allowing them to react instantly and enjoy sensory experiences to the fullest.',
          zh: '主导的Se赋予ESTP对当前物理环境的敏锐感知，使他们能够即时反应并充分享受感官体验。',
        },
      },
      {
        name: 'Ti',
        role: 'auxiliary',
        label: { en: 'Introverted Thinking', zh: '内倾思维' },
        description: {
          en: 'Auxiliary Ti enables ESTPs to analyze situations with internal logical frameworks, helping them make precise, well-reasoned decisions under pressure.',
          zh: '辅助的Ti使ESTP能够用内部逻辑框架分析情境，帮助他们在压力下做出精确、有据可查的决策。',
        },
      },
      {
        name: 'Fe',
        role: 'tertiary',
        label: { en: 'Extraverted Feeling', zh: '外倾情感' },
        description: {
          en: 'Tertiary Fe allows ESTPs to charm and connect with others socially, though they rely on it less consciously than their dominant and auxiliary functions.',
          zh: '第三位的Fe使ESTP能够在社交上吸引他人并建立联系，尽管他们对它的依赖不如主导和辅助功能那么有意识。',
        },
      },
      {
        name: 'Ni',
        role: 'inferior',
        label: { en: 'Introverted Intuition', zh: '内倾直觉' },
        description: {
          en: 'Inferior Ni is ESTPs\' blind spot — long-range planning and abstract foresight are areas where they can struggle, especially under stress.',
          zh: '劣势的Ni是ESTP的盲点——长期规划和抽象预见是他们可能感到困难的领域，尤其是在压力下。',
        },
      },
    ],
    strengths: {
      en: [
        'Exceptional situational awareness and quick reactions',
        'Natural charisma and ability to motivate others',
        'Practical problem-solving under pressure',
        'High tolerance for risk and uncertainty',
        'Perceptive reader of people and social dynamics',
        'Resourceful and adaptable in changing circumstances',
        'Fearless approach to new challenges and experiences',
      ],
      zh: [
        '卓越的情境感知力和快速反应能力',
        '天生的魅力和激励他人的能力',
        '在压力下务实解决问题',
        '对风险和不确定性的高度容忍',
        '善于洞察人心和社交动态',
        '在变化的环境中足智多谋、适应能力强',
        '面对新挑战和新体验无所畏惧',
      ],
    },
    weaknesses: {
      en: [
        'Tendency to overlook long-term consequences for short-term gains',
        'Can be perceived as insensitive or blunt',
        'Difficulty with routine, structure, and follow-through',
        'May take unnecessary risks impulsively',
        'Prone to boredom when novelty fades',
        'Can struggle with deep emotional intimacy',
      ],
      zh: [
        '倾向于为短期利益忽视长远后果',
        '可能被认为不够体贴或直言不讳',
        '难以坚持常规、结构和后续跟进',
        '可能会冲动地承担不必要的风险',
        '当新鲜感消退时容易感到无聊',
        '在深层情感亲密方面可能存在困难',
      ],
    },
    growth_areas: {
      en: [
        {
          title: 'Developing Long-Term Vision',
          description: 'Practice pausing before major decisions to consider future implications beyond the immediate payoff. Journaling or structured reflection can help develop Ni.',
        },
        {
          title: 'Emotional Attunement',
          description: 'Work on acknowledging and validating others\' feelings before jumping to solutions, recognizing that emotional processing is not inefficiency but necessity.',
        },
        {
          title: 'Building Consistency',
          description: 'Cultivate habits and commitments that persist even when excitement fades. Reliability is a form of respect for both self and others.',
        },
        {
          title: 'Deepening Relationships',
          description: 'Invest time in relationships beyond surface-level engagement. Vulnerability and sustained attention allow for the deeper connections ESTPs privately crave.',
        },
      ],
      zh: [
        {
          title: '培养长远视野',
          description: '练习在重大决策前暂停，考虑超出即时回报的未来影响。写日记或有条理地反思有助于发展Ni功能。',
        },
        {
          title: '情感协调',
          description: '在跳到解决方案之前，努力承认和验证他人的感受，认识到情感处理不是低效而是必要的。',
        },
        {
          title: '建立一致性',
          description: '培养即使在兴奋消退后也能坚持的习惯和承诺。可靠性是对自己和他人的一种尊重。',
        },
        {
          title: '深化人际关系',
          description: '在表层互动之外投入时间建立关系。脆弱性和持续的关注使ESTP能够建立他们内心渴望的更深层连接。',
        },
      ],
    },
    career_paths: {
      en: [
        'Entrepreneur / Business Owner',
        'Sales and Marketing Executive',
        'Emergency Responder (Paramedic, Firefighter)',
        'Stockbroker / Financial Trader',
        'Detective / Law Enforcement',
        'Sports Coach or Athlete',
        'Real Estate Agent',
        'Military Officer',
      ],
      zh: [
        '企业家/公司创始人',
        '销售和市场营销主管',
        '急救人员（急救医生、消防员）',
        '股票经纪人/金融交易员',
        '侦探/执法人员',
        '体育教练或运动员',
        '房地产经纪人',
        '军事官员',
      ],
    },
    communication_style: {
      en: 'ESTPs communicate in a direct, energetic, and action-oriented way. They prefer brief, concrete exchanges over lengthy theoretical discussions and often use humor and storytelling to make their points land. They are skilled at reading the room and adjusting their tone accordingly, though they may inadvertently skip over emotional nuance in the rush to get to solutions.',
      zh: 'ESTP以直接、充满活力和行动导向的方式进行交流。他们更喜欢简短、具体的交流，而非冗长的理论讨论，并常用幽默和讲故事的方式传达观点。他们善于察言观色并相应调整语气，但在急于找到解决方案的过程中可能会无意中忽略情感的细微之处。',
    },
  },

  ESFP: {
    type: 'ESFP',
    typeGroup: 'explorer',
    name: { en: 'The Entertainer', zh: '表演者' },
    title: { en: 'Entertainer', zh: '表演者' },
    tagline: {
      en: 'Spontaneous, energetic entertainers who love to brighten others\' days',
      zh: '自发、充满活力的表演者，热爱为他人的生活增添光彩',
    },
    overview: {
      en: `ESFPs are vivacious, warm-hearted individuals who possess an irresistible zest for life. They are the natural entertainers of the world — people who genuinely delight in others and bring spontaneous joy wherever they go. ESFPs have an uncanny ability to sense the emotional atmosphere of a room and instinctively know how to lift the mood, making them beloved friends, coworkers, and partners.

Grounded in the present moment, ESFPs experience life through their senses with an intensity that others can find both inspiring and exhausting. They are extraordinarily observant of the world around them and take genuine pleasure in beauty, texture, taste, and sound. This makes them naturals in creative, performance, and people-facing roles where aesthetic sensibility and human connection are paramount.

Despite their light-hearted exterior, ESFPs carry deep feelings. They are intensely caring and loyal to those they love, but they may struggle to articulate their inner emotional world, preferring action and expression over introspection. Long-term planning and abstract reasoning can feel constraining to their free-spirited nature, and personal growth involves learning to sit with uncertainty and commit to future-oriented goals without losing their essential spontaneity.`,
      zh: `ESFP是充满活力、热心善良的人，拥有令人难以抗拒的生活热情。他们是世界上天生的表演者——真正喜欢与他人在一起，并将自发的快乐带到任何地方。ESFP拥有感知房间情感氛围的惊人能力，并本能地知道如何提振情绪，使他们成为深受喜爱的朋友、同事和伴侣。

ESFP立足于当下，以强烈的感官体验生活，这种强度有时令他人既感到鼓舞又感到耗费精力。他们对周围世界有着非凡的观察力，真正享受美感、质地、味道和声音带来的乐趣。这使他们天然适合创意、表演和面向人群的角色，在这些领域中审美敏感性和人际连接至关重要。

尽管外表轻松愉快，ESFP内心却有深厚的情感。他们对所爱之人极为关心和忠诚，但可能难以表达自己内心的情感世界，更倾向于行动和表达而非内省。长期规划和抽象推理对他们自由奔放的本性可能会感到束缚，个人成长需要学会接受不确定性，并致力于面向未来的目标，同时不失去本质的自发性。`,
    },
    cognitive_functions: [
      {
        name: 'Se',
        role: 'dominant',
        label: { en: 'Extraverted Sensing', zh: '外倾感觉' },
        description: {
          en: 'Dominant Se makes ESFPs supremely attuned to the present physical world, fueling their love of sensory experience, performance, and real-time engagement with others.',
          zh: '主导的Se使ESFP对当前物理世界极为敏感，激发了他们对感官体验、表演和与他人实时互动的热爱。',
        },
      },
      {
        name: 'Fi',
        role: 'auxiliary',
        label: { en: 'Introverted Feeling', zh: '内倾情感' },
        description: {
          en: 'Auxiliary Fi gives ESFPs a strong internal value system and deep empathy. They feel things intensely and are guided by personal authenticity and compassion.',
          zh: '辅助的Fi赋予ESFP强烈的内部价值体系和深刻的同理心。他们感受深切，并以个人真实性和同情心为指引。',
        },
      },
      {
        name: 'Te',
        role: 'tertiary',
        label: { en: 'Extraverted Thinking', zh: '外倾思维' },
        description: {
          en: 'Tertiary Te provides ESFPs with a practical, results-oriented lens, helping them organize their world and accomplish tasks, though they access this function less consistently.',
          zh: '第三位的Te为ESFP提供了实用、结果导向的视角，帮助他们组织生活并完成任务，尽管他们对这一功能的使用不那么稳定。',
        },
      },
      {
        name: 'Ni',
        role: 'inferior',
        label: { en: 'Introverted Intuition', zh: '内倾直觉' },
        description: {
          en: 'Inferior Ni represents the ESFP\'s underdeveloped capacity for abstract foresight and long-term pattern recognition, a source of stress and growth potential.',
          zh: '劣势的Ni代表ESFP在抽象预见和长期模式识别方面尚待发展的能力，是压力的来源，也是成长的潜力所在。',
        },
      },
    ],
    strengths: {
      en: [
        'Naturally warm, enthusiastic, and inclusive',
        'Exceptional ability to connect with others emotionally',
        'Highly observant and aesthetically sensitive',
        'Spontaneous and adaptable to changing situations',
        'Skilled at making others feel welcome and valued',
        'Practical and resourceful in the moment',
        'Genuine and authentic in expression',
      ],
      zh: [
        '天生热情、充满活力、包容待人',
        '与他人建立情感连接的卓越能力',
        '高度的观察力和审美敏感性',
        '自发性强，能适应变化的情境',
        '善于让他人感到受欢迎和被重视',
        '在当下务实而足智多谋',
        '表达真诚而真实',
      ],
    },
    weaknesses: {
      en: [
        'Difficulty with long-term planning and abstract thinking',
        'May avoid conflict and difficult conversations',
        'Can be easily distracted by exciting new possibilities',
        'Tendency to be overly sensitive to criticism',
        'May struggle with financial and practical discipline',
        'Can over-extend themselves trying to please everyone',
      ],
      zh: [
        '在长期规划和抽象思维方面存在困难',
        '可能回避冲突和困难的对话',
        '可能容易被令人兴奋的新可能性分散注意力',
        '倾向于对批评过于敏感',
        '可能在财务和实际纪律上有所困难',
        '可能因努力取悦所有人而过度消耗自己',
      ],
    },
    growth_areas: {
      en: [
        {
          title: 'Embracing Future Planning',
          description: 'Practice setting clear, realistic goals with timelines. Breaking long-term objectives into immediate action steps makes future orientation feel less overwhelming.',
        },
        {
          title: 'Developing Conflict Resilience',
          description: 'Learn that addressing discomfort directly, while challenging, leads to healthier and more authentic relationships than avoidance.',
        },
        {
          title: 'Building Financial Awareness',
          description: 'Work on establishing consistent financial habits that protect long-term security without eliminating the joy of present-moment experiences.',
        },
        {
          title: 'Tolerating Solitude and Reflection',
          description: 'Regular time alone for introspection helps ESFPs develop their inner world and make more deliberate, values-aligned decisions.',
        },
      ],
      zh: [
        {
          title: '接纳未来规划',
          description: '练习设定清晰、切实的目标和时间表。将长期目标分解为即时行动步骤，使面向未来感觉不那么令人不知所措。',
        },
        {
          title: '培养冲突应对韧性',
          description: '学习直接面对不适，尽管这具有挑战性，但比回避能带来更健康、更真实的关系。',
        },
        {
          title: '建立财务意识',
          description: '努力建立一致的财务习惯，在不消除当下体验之乐趣的同时保护长期安全。',
        },
        {
          title: '接受独处与反思',
          description: '定期独处进行内省，帮助ESFP发展内心世界，做出更加审慎、与价值观一致的决策。',
        },
      ],
    },
    career_paths: {
      en: [
        'Performer / Actor / Musician',
        'Event Planner',
        'Social Worker / Counselor',
        'Teacher (early childhood or arts)',
        'Healthcare Worker (nursing, therapy)',
        'Interior Designer / Stylist',
        'Public Relations Specialist',
        'Hospitality and Tourism Professional',
      ],
      zh: [
        '表演者/演员/音乐家',
        '活动策划师',
        '社会工作者/咨询师',
        '教师（幼儿或艺术方向）',
        '医疗工作者（护理、治疗）',
        '室内设计师/造型师',
        '公共关系专家',
        '酒店和旅游专业人员',
      ],
    },
    communication_style: {
      en: 'ESFPs communicate with warmth, humor, and animation, drawing on personal stories and shared experiences to connect with others. They are sensitive listeners who pick up on emotional cues and respond empathetically. In conflict, they may initially deflect or use humor to ease tension, though when pushed they can express deeply held values with surprising passion.',
      zh: 'ESFP以温暖、幽默和生动的方式进行交流，借助个人故事和共同经历与他人建立连接。他们是敏感的倾听者，能捕捉情感线索并以同理心回应。在冲突中，他们最初可能会转移话题或用幽默来缓解紧张，但当受到压力时，他们能以令人惊讶的激情表达深层价值观。',
    },
  },

  ENFP: {
    type: 'ENFP',
    typeGroup: 'diplomat',
    name: { en: 'The Campaigner', zh: '竞选者' },
    title: { en: 'Campaigner', zh: '竞选者' },
    tagline: {
      en: 'Enthusiastic, creative free spirits who champion human potential',
      zh: '热情、富有创造力的自由灵魂，倡导人类潜能的发展',
    },
    overview: {
      en: `ENFPs are free-spirited, imaginative individuals who see life as an adventure rich with possibility. They are driven by an infectious enthusiasm for ideas, people, and causes that matter to them. More than almost any other type, ENFPs have the rare gift of finding genuine meaning and potential in nearly everything they encounter — a talent that makes them inspiring leaders, passionate advocates, and deeply empathetic friends.

At the heart of the ENFP is a hunger for authentic connection and understanding. They are not satisfied with surface-level interactions; they want to know what makes people tick, what drives their dreams, and what lies beneath the ordinary. This curiosity makes them exceptional at building rapport across diverse groups, and their natural warmth ensures that people feel genuinely seen and valued in their presence.

ENFPs can struggle with the tension between their vast inner world and the demands of practical execution. While their imagination generates an endless stream of creative possibilities, follow-through can falter once the initial excitement wanes. They may also absorb the emotions of those around them to an exhausting degree. Growth for ENFPs lies in harnessing their abundant energy with structure, developing the discipline to see projects through to completion, and learning to protect their own emotional boundaries.`,
      zh: `ENFP是自由奔放、富有想象力的人，他们将生活视为充满可能性的冒险。他们被对想法、人和重要事业的传染性热情所驱动。比几乎任何其他类型都更甚，ENFP拥有在他们遇到的几乎所有事物中找到真正意义和潜力的罕见天赋——这种才能使他们成为鼓舞人心的领导者、充满激情的倡导者和深具同理心的朋友。

ENFP的核心是对真实连接和理解的渴望。他们对表面互动并不满足；他们想知道是什么驱动着人们，是什么推动着他们的梦想，以及普通表象之下隐藏着什么。这种好奇心使他们在跨越不同群体建立信任方面表现出色，而他们天生的温暖确保人们在他们的陪伴下真正感到被看见和被重视。

ENFP可能会在广阔内心世界与务实执行需求之间的张力中挣扎。虽然他们的想象力产生了无尽的创意可能性，但一旦最初的兴奋消退，后续执行可能会动摇。他们也可能会将周围人的情感吸收到令人筋疲力尽的程度。ENFP的成长在于用结构驾驭丰沛的能量，培养将项目贯彻到底的纪律性，并学会保护自己的情感边界。`,
    },
    cognitive_functions: [
      {
        name: 'Ne',
        role: 'dominant',
        label: { en: 'Extraverted Intuition', zh: '外倾直觉' },
        description: {
          en: 'Dominant Ne drives ENFPs to constantly explore new ideas, connections, and possibilities, fueling their creativity and enthusiasm for brainstorming and big-picture thinking.',
          zh: '主导的Ne驱动ENFP不断探索新想法、新连接和新可能性，激发了他们的创造力以及对头脑风暴和宏观思维的热情。',
        },
      },
      {
        name: 'Fi',
        role: 'auxiliary',
        label: { en: 'Introverted Feeling', zh: '内倾情感' },
        description: {
          en: 'Auxiliary Fi provides ENFPs with a rich inner value system that guides their choices and gives depth to their empathy, ensuring their enthusiasm is rooted in genuine care.',
          zh: '辅助的Fi为ENFP提供了丰富的内部价值体系，指导他们的选择并赋予同理心以深度，确保他们的热情根植于真诚的关怀。',
        },
      },
      {
        name: 'Te',
        role: 'tertiary',
        label: { en: 'Extraverted Thinking', zh: '外倾思维' },
        description: {
          en: 'Tertiary Te helps ENFPs organize their ideas and push for results, though they typically access this function later in development and may overuse it under stress.',
          zh: '第三位的Te帮助ENFP组织想法并推动结果，尽管他们通常在发展后期才能使用这一功能，并可能在压力下过度依赖它。',
        },
      },
      {
        name: 'Si',
        role: 'inferior',
        label: { en: 'Introverted Sensing', zh: '内倾感觉' },
        description: {
          en: 'Inferior Si represents ENFPs\' challenge with routine, detail, and drawing on past experience systematically — areas that can lead to disorganization and forgetting practical obligations.',
          zh: '劣势的Si代表ENFP在常规、细节和系统性借鉴过往经验方面的挑战——这些领域可能导致混乱和忘记实际义务。',
        },
      },
    ],
    strengths: {
      en: [
        'Exceptional creativity and open-mindedness',
        'Deep empathy and interpersonal warmth',
        'Ability to inspire and motivate others',
        'Versatile and adaptable across many domains',
        'Natural skill at reading people and situations',
        'Passionate advocacy for causes they believe in',
        'Ability to find unique connections between ideas',
        'Genuine curiosity that makes others feel understood',
      ],
      zh: [
        '卓越的创造力和开放性',
        '深刻的同理心和人际温暖',
        '激励和鼓舞他人的能力',
        '在多个领域的灵活性和适应性',
        '解读他人和情境的天赋',
        '对所信奉事业的热情倡导',
        '在想法之间发现独特连接的能力',
        '让他人感到被理解的真诚好奇心',
      ],
    },
    weaknesses: {
      en: [
        'Difficulty following through on projects long-term',
        'Tendency to overcommit and spread themselves thin',
        'May struggle with practical details and organization',
        'Can be overly idealistic or naive about people',
        'Emotional sensitivity can lead to overthinking',
        'Prone to losing focus when novelty wears off',
      ],
      zh: [
        '长期坚持项目到底的困难',
        '倾向于过度承诺并分散精力',
        '可能在实际细节和组织方面有所挣扎',
        '对人可能过于理想化或天真',
        '情感敏感可能导致过度思考',
        '当新鲜感消退时容易失去专注',
      ],
    },
    growth_areas: {
      en: [
        {
          title: 'Mastering Follow-Through',
          description: 'Develop systems that help maintain momentum after initial enthusiasm fades. Accountability partners and breaking projects into milestones can bridge the gap between inspiration and completion.',
        },
        {
          title: 'Setting and Honoring Limits',
          description: 'Practice saying no to protect time and energy for commitments that truly align with core values, rather than accepting every exciting invitation.',
        },
        {
          title: 'Grounding in Practical Reality',
          description: 'Engage regularly with concrete details and logistics. Understanding how visions translate into workable plans builds credibility and sustainable impact.',
        },
        {
          title: 'Emotional Self-Care',
          description: 'Create regular practices for processing emotions rather than absorbing others\' feelings indefinitely. Boundaries protect the ENFP\'s capacity for genuine empathy.',
        },
      ],
      zh: [
        {
          title: '掌握后续执行',
          description: '建立帮助在最初热情消退后保持动力的系统。问责伙伴和将项目分解为里程碑可以弥合灵感与完成之间的差距。',
        },
        {
          title: '设定并遵守边界',
          description: '练习拒绝，以保护时间和精力用于真正与核心价值观一致的承诺，而不是接受每一个令人兴奋的邀请。',
        },
        {
          title: '立足实际现实',
          description: '定期接触具体细节和后勤工作。了解愿景如何转化为可行计划可以建立可信度并产生可持续的影响力。',
        },
        {
          title: '情感自我关怀',
          description: '建立定期处理情绪的习惯，而不是无限期地吸收他人的感受。边界保护了ENFP真诚同理心的能力。',
        },
      ],
    },
    career_paths: {
      en: [
        'Counselor / Therapist / Life Coach',
        'Writer / Journalist / Content Creator',
        'Teacher / Professor / Trainer',
        'Marketing and Creative Director',
        'Nonprofit Leader / Activist',
        'Human Resources Manager',
        'Actor / Performer',
        'Entrepreneur / Startup Founder',
      ],
      zh: [
        '咨询师/治疗师/生活教练',
        '作家/记者/内容创作者',
        '教师/教授/培训师',
        '营销和创意总监',
        '非营利组织领导者/活动人士',
        '人力资源经理',
        '演员/表演者',
        '企业家/初创公司创始人',
      ],
    },
    communication_style: {
      en: 'ENFPs communicate with infectious enthusiasm, weaving together ideas, stories, and emotional insights to make their points vivid and memorable. They are intuitive listeners who tune into the feelings behind words and often articulate others\' inner states before those people have found the words themselves. They can be verbose in excitement but are capable of deep focus and precision when motivated by a topic that resonates with their values.',
      zh: 'ENFP以传染性的热情进行交流，将想法、故事和情感洞察交织在一起，使他们的观点生动而难忘。他们是直觉性的倾听者，能够感受到话语背后的情感，并常常在他人找到表达方式之前就能说出其内心状态。在兴奋时他们可能会滔滔不绝，但当被与价值观共鸣的话题所激励时，他们能够深度专注并精准表达。',
    },
  },

  ENTP: {
    type: 'ENTP',
    typeGroup: 'analyst',
    name: { en: 'The Debater', zh: '辩论家' },
    title: { en: 'Debater', zh: '辩论家' },
    tagline: {
      en: 'Smart and curious thinkers who love intellectual challenge above all',
      zh: '聪明而充满好奇心的思考者，最热爱智识上的挑战',
    },
    overview: {
      en: `ENTPs are among the most intellectually versatile and creatively restless personality types. They thrive on challenge, debate, and the relentless pursuit of new ideas, driven by an inner compulsion to understand how everything fits together. Where others see settled questions, ENTPs see unexplored angles and untested assumptions — a perspective that makes them invaluable innovators and occasionally exhausting conversation partners.

The ENTP mind operates at high speed, connecting disparate concepts and generating novel solutions at a pace that can dazzle or overwhelm those around them. They are natural devil's advocates who argue positions not always out of genuine conviction but to stress-test ideas and expose hidden weaknesses. This habit is rooted in a genuine love of truth, though it can come across as combative or disrespectful to those who value harmony over precision.

Despite their confident, debate-ready exterior, ENTPs have a rich emotional interior shaped by their auxiliary function. They care deeply about fairness, authenticity, and human potential. Their greatest professional and personal challenge is converting their boundless curiosity and idea generation into sustained execution. Growth for ENTPs involves developing the emotional intelligence to recognize when a debate has become a battlefield, the discipline to finish what they start, and the humility to value practicality alongside brilliance.`,
      zh: `ENTP是智识上最为多才多艺、创意上最为躁动不安的人格类型之一。他们在挑战、辩论和对新想法的不懈追求中茁壮成长，内在的冲动驱使他们理解所有事物是如何相互联系的。在他人眼中已有定论的问题，ENTP却看到了未被探索的角度和未经检验的假设——这种视角使他们成为宝贵的创新者，有时也成为令人精疲力竭的对话伙伴。

ENTP的思维以高速运转，以令周围人叹为观止甚至应接不暇的速度将不同的概念联系起来，产生新颖的解决方案。他们是天生的唱反调者，争辩某些立场并非总是出于真正的信念，而是为了压力测试想法并揭露隐藏的弱点。这种习惯根植于对真理的真诚热爱，尽管对于那些将和谐置于精确之上的人而言，这可能显得好争辩甚至不够尊重。

尽管外表自信、随时准备辩论，ENTP内心却有着深厚的情感世界，由辅助功能塑造。他们深切关心公平、真实性和人类潜能。他们最大的职业和个人挑战是将无限的好奇心和想法生成转化为持续的执行力。ENTP的成长涉及培养情商以识别辩论何时已变成战场，培养完成所开始之事的纪律性，以及培养在才华之外同样重视实际性的谦逊。`,
    },
    cognitive_functions: [
      {
        name: 'Ne',
        role: 'dominant',
        label: { en: 'Extraverted Intuition', zh: '外倾直觉' },
        description: {
          en: 'Dominant Ne gives ENTPs an insatiable appetite for new ideas and connections, driving their love of intellectual exploration, brainstorming, and challenging conventional assumptions.',
          zh: '主导的Ne赋予ENTP对新想法和新连接难以满足的渴望，驱动了他们对智识探索、头脑风暴和挑战传统假设的热爱。',
        },
      },
      {
        name: 'Ti',
        role: 'auxiliary',
        label: { en: 'Introverted Thinking', zh: '内倾思维' },
        description: {
          en: 'Auxiliary Ti provides ENTPs with rigorous internal logic, enabling them to analyze ideas deeply, spot inconsistencies, and build precise, well-structured arguments.',
          zh: '辅助的Ti为ENTP提供严谨的内部逻辑，使他们能够深入分析想法、发现不一致之处，并构建精确、结构良好的论点。',
        },
      },
      {
        name: 'Fe',
        role: 'tertiary',
        label: { en: 'Extraverted Feeling', zh: '外倾情感' },
        description: {
          en: 'Tertiary Fe connects ENTPs to the social and emotional dimensions of their interactions. When developed, it allows them to debate with tact and build genuine rapport; when underdeveloped, it can lead to social blind spots.',
          zh: '第三位的Fe将ENTP与互动的社交和情感维度连接起来。当发展良好时，它使他们能够有技巧地辩论并建立真诚的融洽关系；当发展不足时，可能导致社交盲点。',
        },
      },
      {
        name: 'Si',
        role: 'inferior',
        label: { en: 'Introverted Sensing', zh: '内倾感觉' },
        description: {
          en: 'Inferior Si is ENTPs\' weakest function — attention to routine, sensory detail, and consistent personal history is an ongoing challenge, often manifesting as disorganization or neglect of physical needs.',
          zh: '劣势的Si是ENTP最薄弱的功能——对常规、感官细节和一致个人经历的关注是一项持续的挑战，常常表现为混乱无序或忽视物质需求。',
        },
      },
    ],
    strengths: {
      en: [
        'Exceptional ability to generate innovative ideas',
        'Quick, sharp analytical and logical thinking',
        'Versatile and comfortable across many disciplines',
        'Natural talent for identifying flaws in arguments',
        'Charismatic and intellectually engaging presence',
        'Adaptive and thrives in complex, changing environments',
        'Fearless in challenging norms and conventional wisdom',
        'Energized by debate and collaborative intellectual exploration',
      ],
      zh: [
        '产生创新想法的卓越能力',
        '快速、敏锐的分析和逻辑思维',
        '在多个学科领域灵活自如',
        '识别论点缺陷的天赋',
        '充满魅力、引人入胜的智识存在感',
        '适应力强，在复杂、变化的环境中茁壮成长',
        '无畏地挑战规范和传统智慧',
        '从辩论和协作智识探索中获得活力',
      ],
    },
    weaknesses: {
      en: [
        'Can be argumentative or combative without constructive intent',
        'Difficulty following through on projects to completion',
        'May overlook emotional impact of blunt intellectual critique',
        'Tendency to overcommit to too many ideas simultaneously',
        'Can come across as arrogant or dismissive',
        'Struggles with routine and administrative detail',
      ],
      zh: [
        '可能在没有建设性意图的情况下好争辩或好斗',
        '将项目坚持到底的困难',
        '可能忽视直白智识批评的情感影响',
        '倾向于同时过度承诺太多想法',
        '可能显得傲慢或轻视他人',
        '在常规工作和行政细节上有所挣扎',
      ],
    },
    growth_areas: {
      en: [
        {
          title: 'Completing What You Start',
          description: 'Create accountability structures — deadlines, partners, public commitments — that help bridge the gap between ideation and delivery.',
        },
        {
          title: 'Developing Emotional Sensitivity',
          description: 'Practice pausing before responding in emotionally charged situations to consider the impact of words before deploying them.',
        },
        {
          title: 'Valuing Consistency',
          description: 'Recognize that reliable follow-through and predictability build the trust that enables your bold ideas to actually gain traction in the world.',
        },
        {
          title: 'Channeling Debate Constructively',
          description: 'Learn to distinguish when intellectual pushback serves shared understanding versus when it simply antagonizes. Reserve the full force of debate for ideas, not people.',
        },
      ],
      zh: [
        {
          title: '完成所开始之事',
          description: '建立问责结构——截止日期、伙伴、公开承诺——帮助弥合构思与交付之间的差距。',
        },
        {
          title: '培养情感敏感性',
          description: '练习在情绪激动的情况下回应前暂停，在使用语言之前考虑其影响。',
        },
        {
          title: '重视一致性',
          description: '认识到可靠的后续跟进和可预测性能建立信任，使你的大胆想法真正在世界上获得牵引力。',
        },
        {
          title: '有建设性地引导辩论',
          description: '学会区分智识上的反驳何时有助于共同理解，何时只是在激怒他人。将辩论的全部力量保留给想法，而不是人。',
        },
      ],
    },
    career_paths: {
      en: [
        'Entrepreneur / Startup Founder',
        'Lawyer / Trial Attorney',
        'Software Engineer / Systems Architect',
        'Investment Analyst / Venture Capitalist',
        'Scientist / Researcher',
        'Journalist / Commentator',
        'Consultant (Strategy, Innovation)',
        'Product Manager',
      ],
      zh: [
        '企业家/初创公司创始人',
        '律师/诉讼律师',
        '软件工程师/系统架构师',
        '投资分析师/风险投资家',
        '科学家/研究员',
        '记者/评论员',
        '顾问（战略、创新）',
        '产品经理',
      ],
    },
    communication_style: {
      en: 'ENTPs communicate in rapid-fire, idea-dense exchanges, often jumping between topics as new connections fire in their minds. They love debate as a form of intellectual respect and may not realize others find it draining or threatening. They are skilled at reframing problems and seeing multiple angles simultaneously, which makes them excellent brainstorming partners — provided the other party can keep pace and is comfortable with challenge.',
      zh: 'ENTP以快速、密集的想法交流方式进行沟通，当脑中产生新的联系时，他们常常在话题之间跳跃。他们将辩论视为一种智识尊重的形式，可能未意识到他人觉得这令人疲惫或感到威胁。他们善于重新定义问题，同时看到多个角度，这使他们成为出色的头脑风暴伙伴——前提是对方能够跟上节奏并能接受挑战。',
    },
  },

  ESTJ: {
    type: 'ESTJ',
    typeGroup: 'sentinel',
    name: { en: 'The Executive', zh: '总经理' },
    title: { en: 'Executive', zh: '总经理' },
    tagline: {
      en: 'Decisive, organized leaders who uphold tradition and drive results',
      zh: '果断、有条理的领导者，坚守传统并推动成果的实现',
    },
    overview: {
      en: `ESTJs are the pillars of structure, reliability, and competent leadership. They take great pride in doing things correctly — following established procedures, meeting commitments, and delivering measurable results. When organizations need someone to create order out of chaos, ensure accountability, and hold teams to high standards, it is almost always an ESTJ who rises to the challenge.

At their core, ESTJs are traditionalists who believe in time-tested systems and the power of clear expectations. They are deeply loyal to the institutions and communities they are part of, and they take personal responsibility for upholding standards seriously. This loyalty and dependability makes them trusted cornerstones in any team or family system. Their directness, while sometimes perceived as bluntness, comes from a genuine belief that honest, clear communication is a form of respect.

The ESTJ's growth edge lies in developing flexibility and emotional attunement. Their tendency to prioritize efficiency and established protocol can cause them to overlook the human factors in a situation — the feelings, motivations, and individual circumstances that don't fit neatly into their frameworks. Learning to value other perspectives, especially those rooted in emotion or imagination, and to adapt their leadership approach to the person rather than the process, allows ESTJs to reach their full potential as compassionate as well as competent leaders.`,
      zh: `ESTJ是结构、可靠性和称职领导力的支柱。他们以做事正确为荣——遵循既定程序、履行承诺并取得可衡量的成果。当组织需要有人从混乱中建立秩序、确保问责并将团队保持在高标准时，几乎总是ESTJ挺身而出迎接挑战。

从本质上看，ESTJ是传统主义者，相信经过时间检验的系统和明确期望的力量。他们对所在的机构和社区极为忠诚，并认真承担维护标准的个人责任。这种忠诚和可靠性使他们成为任何团队或家庭系统中值得信赖的基石。他们的直接，尽管有时被视为直言不讳，来自于真诚地相信诚实、清晰的沟通是一种尊重。

ESTJ的成长边界在于培养灵活性和情感协调能力。他们优先考虑效率和既定程序的倾向可能导致他们忽视情境中的人为因素——那些不能整齐地纳入其框架的感受、动机和个人情况。学会重视其他视角，尤其是那些根植于情感或想象力的视角，并根据人而非程序调整领导方式，使ESTJ能够成为既有能力又富有同情心的领导者，充分发挥其潜力。`,
    },
    cognitive_functions: [
      {
        name: 'Te',
        role: 'dominant',
        label: { en: 'Extraverted Thinking', zh: '外倾思维' },
        description: {
          en: 'Dominant Te drives ESTJs to organize, systematize, and enforce external standards of efficiency and correctness, making them natural managers and administrators.',
          zh: '主导的Te驱动ESTJ组织、系统化并执行外部效率和正确性标准，使他们成为天生的管理者和行政人员。',
        },
      },
      {
        name: 'Si',
        role: 'auxiliary',
        label: { en: 'Introverted Sensing', zh: '内倾感觉' },
        description: {
          en: 'Auxiliary Si grounds ESTJs in accumulated experience and established precedent, giving them a strong respect for tradition, procedure, and lessons learned from the past.',
          zh: '辅助的Si将ESTJ扎根于积累的经验和既定先例，使他们对传统、程序和从过去中吸取的教训抱有强烈的尊重。',
        },
      },
      {
        name: 'Ne',
        role: 'tertiary',
        label: { en: 'Extraverted Intuition', zh: '外倾直觉' },
        description: {
          en: 'Tertiary Ne allows ESTJs to occasionally brainstorm alternatives and see new possibilities, though they typically prefer proven approaches over untested innovation.',
          zh: '第三位的Ne使ESTJ偶尔能够集思广益、看到新的可能性，尽管他们通常更偏爱经过验证的方法而非未经测试的创新。',
        },
      },
      {
        name: 'Fi',
        role: 'inferior',
        label: { en: 'Introverted Feeling', zh: '内倾情感' },
        description: {
          en: 'Inferior Fi is the ESTJ\'s emotional blind spot — accessing and expressing personal feelings and values, and acknowledging others\' emotional needs, is a significant growth area.',
          zh: '劣势的Fi是ESTJ的情感盲点——获取和表达个人感受与价值观，以及承认他人的情感需求，是重要的成长领域。',
        },
      },
    ],
    strengths: {
      en: [
        'Exceptional organizational and administrative ability',
        'Reliable, dependable, and consistent follow-through',
        'Natural leadership and decisive decision-making',
        'High standards for quality and accountability',
        'Clear, direct, and honest communication',
        'Strong sense of duty and civic responsibility',
        'Skilled at creating efficient systems and processes',
      ],
      zh: [
        '卓越的组织和行政能力',
        '可靠、值得信赖且一贯的后续跟进',
        '天然的领导力和果断的决策',
        '对质量和问责制的高标准',
        '清晰、直接、诚实的沟通',
        '强烈的责任感和公民意识',
        '擅长建立高效的系统和流程',
      ],
    },
    weaknesses: {
      en: [
        'Can be inflexible and resistant to change',
        'May come across as harsh or judgmental',
        'Tendency to prioritize rules over individual circumstances',
        'Can struggle to acknowledge or express emotions',
        'May undervalue creative or unconventional approaches',
        'Can become overly controlling when stressed',
      ],
      zh: [
        '可能过于固执，抗拒变化',
        '可能显得苛刻或爱评判人',
        '倾向于将规则置于个人情况之上',
        '在承认或表达情感方面可能存在困难',
        '可能低估创意或非传统的方法',
        '在压力下可能变得过于控制',
      ],
    },
    growth_areas: {
      en: [
        {
          title: 'Cultivating Emotional Intelligence',
          description: 'Practice acknowledging the emotional dimensions of situations before jumping to solutions. People\'s feelings are data, not inefficiency.',
        },
        {
          title: 'Embracing Flexibility',
          description: 'Experiment with allowing exceptions to rules when context genuinely warrants it. Adaptability strengthens rather than undermines credibility.',
        },
        {
          title: 'Developing Active Listening',
          description: 'Prioritize understanding others\' perspectives fully before responding, especially in disagreements. Being heard precedes being persuaded.',
        },
        {
          title: 'Valuing Diverse Approaches',
          description: 'Actively seek input from people with different working styles. Innovation often comes from exactly the unconventional thinking ESTJs most resist.',
        },
      ],
      zh: [
        {
          title: '培养情商',
          description: '在跳到解决方案之前，练习承认情境中的情感维度。人们的感受是数据，而非低效。',
        },
        {
          title: '接纳灵活性',
          description: '尝试在情境确实需要时允许规则例外。适应性增强而非削弱可信度。',
        },
        {
          title: '培养积极倾听',
          description: '在回应之前，尤其是在分歧中，优先充分理解他人的观点。被倾听先于被说服。',
        },
        {
          title: '重视多样化方法',
          description: '主动寻求具有不同工作风格的人的意见。创新往往恰恰来自ESTJ最抗拒的非传统思维。',
        },
      ],
    },
    career_paths: {
      en: [
        'Business Manager / Operations Director',
        'Military Officer / Police Commander',
        'Judge / Lawyer',
        'School Principal / Academic Administrator',
        'Financial Manager / Auditor',
        'Project Manager',
        'Government Official / Civil Servant',
        'Supply Chain or Logistics Manager',
      ],
      zh: [
        '业务经理/运营总监',
        '军官/警察指挥官',
        '法官/律师',
        '校长/学术行政人员',
        '财务经理/审计师',
        '项目经理',
        '政府官员/公务员',
        '供应链或物流经理',
      ],
    },
    communication_style: {
      en: 'ESTJs communicate in a direct, structured, and authoritative manner. They state expectations clearly, get to the point quickly, and expect others to be equally precise. They are most comfortable in formal or clearly defined communication contexts and may find emotional or ambiguous conversations frustrating. Their feedback tends to be direct and honest, aimed at improvement rather than harm, though the delivery may not always land as kindly as intended.',
      zh: 'ESTJ以直接、有条理、权威的方式进行沟通。他们清楚地陈述期望，快速切入重点，并期望他人同样精确。他们在正式或明确定义的沟通情境中最为自在，对情感性或模糊的对话可能感到沮丧。他们的反馈往往直接而诚实，目的在于改进而非伤害，尽管表达方式并不总是如预期那样令人感到亲切。',
    },
  },

  ESFJ: {
    type: 'ESFJ',
    typeGroup: 'sentinel',
    name: { en: 'The Consul', zh: '执政官' },
    title: { en: 'Consul', zh: '执政官' },
    tagline: {
      en: 'Caring, sociable, and practical — the heartbeat of any community',
      zh: '关爱他人、善于社交且务实——任何社群的心跳',
    },
    overview: {
      en: `ESFJs are the natural caregivers and community builders of the personality world. Warm, conscientious, and deeply attuned to the needs and feelings of those around them, they derive genuine fulfillment from helping others and creating harmony in their environments. ESFJs tend to be highly organized, socially skilled, and genuinely invested in the wellbeing of their circles — traits that make them indispensable in roles requiring empathy, coordination, and people-centered leadership.

An ESFJ's social radar is extraordinarily finely tuned. They notice shifts in mood, sense unspoken tensions, and almost instinctively move to restore comfort and connection. This makes them outstanding hosts, coordinators, and community leaders, but it also means they can absorb others' emotional states deeply and may define their own worth through others' approval. The fear of letting someone down or creating conflict can lead ESFJs to suppress their own needs in service of maintaining relational peace.

Growth for ESFJs often involves developing a more secure sense of self-worth that is not entirely dependent on external validation, learning to advocate for their own needs as vigorously as they advocate for others', and cultivating the capacity to engage with differing worldviews without feeling personally destabilized. When ESFJs learn to extend the same unconditional care to themselves that they offer so freely to others, they become a truly powerful force for collective flourishing.`,
      zh: `ESFJ是人格世界中天生的照料者和社区建设者。温暖、尽责，对周围人的需求和感受高度敏感，他们从帮助他人、在环境中创造和谐中获得真正的满足感。ESFJ倾向于高度有组织性、社交技能娴熟，并真正投入于所在圈子的福祉——这些特质使他们在需要同理心、协调能力和以人为中心的领导力的角色中不可或缺。

ESFJ的社交雷达异常灵敏。他们注意到情绪的变化，感受到未言明的紧张，并几乎本能地采取行动以恢复舒适和连接。这使他们成为出色的主持人、协调员和社区领导者，但也意味着他们可能深深吸收他人的情感状态，并可能通过他人的认可来定义自己的价值。害怕让某人失望或制造冲突可能导致ESFJ压制自己的需求，以维护关系的和平。

ESFJ的成长之路往往涉及培养更安全的自我价值感，使之不完全依赖于外部认可；学会像为他人倡导那样有力地为自己的需求发声；以及培养在不感到个人不稳定的情况下接触不同世界观的能力。当ESFJ学会将他们如此慷慨地给予他人的无条件关爱延伸到自己身上时，他们便成为促进集体繁荣的真正强大力量。`,
    },
    cognitive_functions: [
      {
        name: 'Fe',
        role: 'dominant',
        label: { en: 'Extraverted Feeling', zh: '外倾情感' },
        description: {
          en: 'Dominant Fe makes ESFJs highly responsive to the emotional climate around them, driving a deep need to create harmony, care for others, and uphold social values.',
          zh: '主导的Fe使ESFJ对周围的情感氛围高度敏感，驱动着创造和谐、关爱他人和维护社会价值观的深层需求。',
        },
      },
      {
        name: 'Si',
        role: 'auxiliary',
        label: { en: 'Introverted Sensing', zh: '内倾感觉' },
        description: {
          en: 'Auxiliary Si provides ESFJs with a reliable memory for personal histories, traditions, and established ways of doing things, making them the keepers of community memory and continuity.',
          zh: '辅助的Si为ESFJ提供了对个人历史、传统和既定做事方式的可靠记忆，使他们成为社区记忆和延续性的守护者。',
        },
      },
      {
        name: 'Ne',
        role: 'tertiary',
        label: { en: 'Extraverted Intuition', zh: '外倾直觉' },
        description: {
          en: 'Tertiary Ne allows ESFJs to occasionally entertain new ideas and possibilities, though they typically feel more comfortable with the familiar than with radical novelty.',
          zh: '第三位的Ne使ESFJ偶尔能够接受新想法和新可能性，尽管他们通常对熟悉的事物比对激进的新奇事物感到更为自在。',
        },
      },
      {
        name: 'Ti',
        role: 'inferior',
        label: { en: 'Introverted Thinking', zh: '内倾思维' },
        description: {
          en: 'Inferior Ti is ESFJs\' underdeveloped function for detached, objective analysis. Under stress, it can manifest as harsh self-criticism or overly black-and-white thinking.',
          zh: '劣势的Ti是ESFJ在超然客观分析方面尚待发展的功能。在压力下，它可能表现为严苛的自我批评或过于非黑即白的思维。',
        },
      },
    ],
    strengths: {
      en: [
        'Deep empathy and emotional attunement',
        'Exceptional ability to build and sustain community',
        'Highly reliable, dutiful, and responsible',
        'Skilled at creating warm, inclusive environments',
        'Strong organizational and logistical ability',
        'Loyal and dedicated to those they care about',
        'Excellent at remembering important details about others',
        'Natural talent for bringing people together',
      ],
      zh: [
        '深刻的同理心和情感协调能力',
        '建立和维持社区的卓越能力',
        '极为可靠、尽职尽责',
        '善于创造温暖、包容的环境',
        '强大的组织和后勤能力',
        '对所关心的人忠诚而专注',
        '擅长记住关于他人的重要细节',
        '将人聚集在一起的天赋',
      ],
    },
    weaknesses: {
      en: [
        'Tendency to seek external validation and approval',
        'May suppress own needs to avoid conflict',
        'Can be resistant to unconventional or disruptive change',
        'Susceptible to taking criticism very personally',
        'May have difficulty with objective, detached analysis',
        'Can become controlling when anxious about outcomes',
      ],
      zh: [
        '倾向于寻求外部认可和赞许',
        '可能为避免冲突而压制自己的需求',
        '可能对非传统或颠覆性的变化产生抗拒',
        '容易将批评非常个人化',
        '在客观、超然的分析方面可能存在困难',
        '当对结果感到焦虑时可能变得过于控制',
      ],
    },
    growth_areas: {
      en: [
        {
          title: 'Building Internal Validation',
          description: 'Practice recognizing your own needs and worth independently of others\' responses. Self-approval is the foundation that allows your care for others to be sustainable.',
        },
        {
          title: 'Asserting Personal Boundaries',
          description: 'Develop the skill of communicating your own needs directly and without excessive guilt. Healthy relationships require reciprocity, not only service.',
        },
        {
          title: 'Embracing Constructive Conflict',
          description: 'Learn that navigating conflict honestly, rather than smoothing over it, produces deeper trust and more authentic relationships in the long run.',
        },
        {
          title: 'Developing Analytical Detachment',
          description: 'Practice evaluating situations and decisions on objective merits, not just through the lens of interpersonal harmony, to improve decision-making quality.',
        },
      ],
      zh: [
        {
          title: '建立内在认可',
          description: '练习独立于他人回应地认识自己的需求和价值。自我认可是使对他人的关怀可持续的基础。',
        },
        {
          title: '坚守个人边界',
          description: '培养直接表达自己需求而无需过度愧疚的技能。健康的关系需要相互性，而不仅仅是服务。',
        },
        {
          title: '接纳建设性冲突',
          description: '学习诚实地应对冲突，而不是掩盖它，从长远来看，这会产生更深的信任和更真实的关系。',
        },
        {
          title: '培养分析性超然',
          description: '练习基于客观优点而非仅仅通过人际和谐的视角来评估情境和决策，以提高决策质量。',
        },
      ],
    },
    career_paths: {
      en: [
        'Nurse / Healthcare Provider',
        'Teacher / School Counselor',
        'Human Resources Manager',
        'Social Worker',
        'Event Planner / Hospitality Manager',
        'Office Manager / Administrator',
        'Non-Profit Coordinator',
        'Religious or Community Leader',
      ],
      zh: [
        '护士/医疗服务提供者',
        '教师/学校辅导员',
        '人力资源经理',
        '社会工作者',
        '活动策划师/酒店经理',
        '办公室经理/行政人员',
        '非营利组织协调员',
        '宗教或社区领袖',
      ],
    },
    communication_style: {
      en: 'ESFJs communicate with warmth, attentiveness, and a clear awareness of the social context. They tailor their communication style to make others feel comfortable, often checking in on how messages are landing emotionally. They prefer direct, personal conversations to written or impersonal exchanges and tend to remember and reference personal details that make others feel genuinely known. In conflict, they may initially deflect but can become very direct when core values or loved ones are at stake.',
      zh: 'ESFJ以温暖、细心和对社交情境的清晰意识进行沟通。他们调整沟通风格以使他人感到舒适，经常检查信息在情感上的接收情况。他们更喜欢直接的个人对话，而非书面或非个人的交流，并倾向于记住和引用个人细节，使他人真正感到被了解。在冲突中，他们最初可能会转移话题，但当核心价值观或所爱之人处于危险之中时，他们能够变得非常直接。',
    },
  },

  ENFJ: {
    type: 'ENFJ',
    typeGroup: 'diplomat',
    name: { en: 'The Protagonist', zh: '主人公' },
    title: { en: 'Protagonist', zh: '主人公' },
    tagline: {
      en: 'Charismatic and inspiring leaders who draw out the best in others',
      zh: '充满魅力、鼓舞人心的领导者，激发他人最好的一面',
    },
    overview: {
      en: `ENFJs are natural-born leaders with an extraordinary gift for connecting with, inspiring, and elevating those around them. They possess a rare combination of warmth, vision, and persuasive ability that draws people toward them and makes others feel that their own potential is within reach. ENFJs are driven by a deep conviction that they can make the world better, and they pursue this mission with relentless energy and a genuine commitment to the flourishing of others.

At the heart of the ENFJ is a profound attunement to people — what they need, what they dream of, and what holds them back. ENFJs have a remarkable ability to see both who someone is today and who they could become, and they dedicate themselves with great patience and skill to helping close that gap. This makes them transformative teachers, therapists, coaches, and community leaders whose influence can last decades in the lives of those they touch.

The ENFJ's most significant challenge is managing the weight of being so deeply invested in others' outcomes. Taking on others' pain and struggles as their own responsibility can lead to burnout, resentment, and the loss of self. ENFJs must learn that their value does not depend on successfully transforming everyone they encounter, and that self-care is not a luxury but a prerequisite for the sustained, impactful service they were built to provide. Developing clear boundaries and a more self-directed inner compass allows ENFJs to be powerfully present for others without losing themselves.`,
      zh: `ENFJ是天生的领导者，拥有与周围人建立连接、激励他们并提升他们的非凡天赋。他们拥有温暖、远见和说服力的罕见组合，吸引人们靠近，并让他人感到自己的潜力触手可及。ENFJ被深刻的信念所驱动，相信他们能使世界变得更美好，并以不懈的精力和对他人成长的真诚承诺追求这一使命。

ENFJ的核心是对人的深刻感应——他们需要什么、梦想什么，以及什么阻碍了他们。ENFJ拥有非凡的能力，能看到一个人今天是谁，以及他们能成为谁，并以极大的耐心和技巧专注于帮助缩小这一差距。这使他们成为变革性的教师、治疗师、教练和社区领导者，其影响力能在所触及的人的生命中持续数十年。

ENFJ最重要的挑战是管理如此深入投入他人结果所带来的重量。将他人的痛苦和挣扎视为自己的责任可能导致倦怠、怨恨和自我迷失。ENFJ必须学习，他们的价值不依赖于成功改变他们遇到的每个人，自我关怀不是奢侈品，而是他们所应提供的持续、有影响力的服务的先决条件。培养清晰的边界和更加自我导向的内在指南针，使ENFJ能够强有力地为他人存在，而不迷失自我。`,
    },
    cognitive_functions: [
      {
        name: 'Fe',
        role: 'dominant',
        label: { en: 'Extraverted Feeling', zh: '外倾情感' },
        description: {
          en: 'Dominant Fe gives ENFJs an exceptional sensitivity to the emotional environment and social dynamics, fueling their drive to foster harmony, connection, and collective growth.',
          zh: '主导的Fe赋予ENFJ对情感环境和社会动态的卓越敏感性，激发了他们促进和谐、连接和集体成长的动力。',
        },
      },
      {
        name: 'Ni',
        role: 'auxiliary',
        label: { en: 'Introverted Intuition', zh: '内倾直觉' },
        description: {
          en: 'Auxiliary Ni provides ENFJs with deep insight into patterns, future trajectories, and hidden potential in people and situations, giving their leadership a visionary quality.',
          zh: '辅助的Ni为ENFJ提供了对人和情境中模式、未来轨迹和隐藏潜力的深刻洞察，赋予其领导力以远见卓识的特质。',
        },
      },
      {
        name: 'Se',
        role: 'tertiary',
        label: { en: 'Extraverted Sensing', zh: '外倾感觉' },
        description: {
          en: 'Tertiary Se helps ENFJs stay grounded in the practical, present-moment realities needed to act on their visions, though excessive Se focus under stress may manifest as over-indulgence.',
          zh: '第三位的Se帮助ENFJ立足于实现愿景所需的务实的当下现实，尽管在压力下过度关注Se可能表现为过度放纵。',
        },
      },
      {
        name: 'Ti',
        role: 'inferior',
        label: { en: 'Introverted Thinking', zh: '内倾思维' },
        description: {
          en: 'Inferior Ti represents the ENFJ\'s challenge with purely objective, detached logical analysis — an area they can develop to bring greater precision and self-directed critical thinking to their work.',
          zh: '劣势的Ti代表ENFJ在纯粹客观、超然逻辑分析方面的挑战——这是他们可以发展的领域，为工作带来更大的精确性和自主导向的批判性思维。',
        },
      },
    ],
    strengths: {
      en: [
        'Exceptional ability to inspire and motivate others',
        'Natural charisma and leadership presence',
        'Deep empathy and emotional intelligence',
        'Strategic vision combined with genuine people focus',
        'Outstanding communication and oratory skills',
        'Ability to perceive and develop others\' potential',
        'Persistent drive to create meaningful change',
        'Skilled at building consensus and unifying groups',
      ],
      zh: [
        '激励和鼓舞他人的卓越能力',
        '天生的魅力和领导存在感',
        '深刻的同理心和情商',
        '战略远见与真诚的以人为本相结合',
        '出色的沟通和演讲技巧',
        '感知和发展他人潜力的能力',
        '创造有意义变革的持久动力',
        '善于建立共识和凝聚团体',
      ],
    },
    weaknesses: {
      en: [
        'Tendency to absorb others\' emotional burdens as their own',
        'Can be overly idealistic about people and situations',
        'May struggle to maintain clear boundaries',
        'Susceptible to burnout from over-giving',
        'Can be overly sensitive to conflict and disapproval',
        'May be manipulative when convinced of what\'s best for others',
      ],
      zh: [
        '倾向于将他人的情感负担吸收为自己的',
        '对人和情况可能过于理想化',
        '可能难以维持清晰的边界',
        '容易因过度付出而倦怠',
        '可能对冲突和不认可过于敏感',
        '当确信什么对他人最好时，可能会有些操纵性',
      ],
    },
    growth_areas: {
      en: [
        {
          title: 'Maintaining Healthy Boundaries',
          description: 'Practice distinguishing between supporting others\' growth and taking on their struggles as your own responsibility. Compassionate detachment preserves your ability to help.',
        },
        {
          title: 'Prioritizing Self-Care',
          description: 'Establish non-negotiable practices that replenish your energy, recognizing that sustained service to others requires sustained care for yourself.',
        },
        {
          title: 'Developing Objective Analysis',
          description: 'Intentionally practice evaluating ideas and people based on evidence and logic alongside emotional and interpersonal factors, reducing blind spots.',
        },
        {
          title: 'Tolerating Others\' Autonomy',
          description: 'Cultivate acceptance that others may choose paths different from what you envision for them — their right to self-direction is more important than your vision of their potential.',
        },
      ],
      zh: [
        {
          title: '维持健康的边界',
          description: '练习区分支持他人成长与将他们的挣扎视为自己责任。富有同情心的超然保护了你帮助他人的能力。',
        },
        {
          title: '优先自我关怀',
          description: '建立不可妥协的补充能量的习惯，认识到对他人的持续服务需要对自己的持续关怀。',
        },
        {
          title: '培养客观分析',
          description: '有意识地练习基于证据和逻辑以及情感和人际因素来评估想法和人，减少盲点。',
        },
        {
          title: '接受他人的自主性',
          description: '培养接受他人可能选择与你为他们所设想的不同道路——他们自我决定的权利比你对其潜力的设想更为重要。',
        },
      ],
    },
    career_paths: {
      en: [
        'Teacher / Professor / Educator',
        'Life Coach / Therapist / Counselor',
        'Non-Profit Director / Community Organizer',
        'HR Director / Organizational Development',
        'Politician / Public Servant',
        'Corporate Trainer / L&D Specialist',
        'Religious / Spiritual Leader',
        'Social Entrepreneur',
      ],
      zh: [
        '教师/教授/教育工作者',
        '生活教练/治疗师/咨询师',
        '非营利组织主任/社区组织者',
        '人力资源总监/组织发展',
        '政治家/公务员',
        '企业培训师/学习与发展专家',
        '宗教/精神领袖',
        '社会企业家',
      ],
    },
    communication_style: {
      en: 'ENFJs communicate with warmth, eloquence, and a natural ability to make each person feel as though they are the most important person in the room. They are skilled at adapting their message to different audiences and excel at motivational and inspirational communication. They listen deeply and often reflect back what they hear in a way that makes speakers feel truly understood. In difficult conversations, they lead with empathy before logic, and they are highly attuned to the emotional impact their words have on others.',
      zh: 'ENFJ以温暖、雄辩和天生的能力进行沟通，让每个人都感到自己是房间里最重要的人。他们善于根据不同受众调整信息，在激励性和鼓舞人心的沟通方面表现出色。他们深入倾听，并常以使演讲者感到真正被理解的方式反映他们所听到的内容。在困难的对话中，他们在逻辑之前以同理心领导，并高度关注他们的话语对他人的情感影响。',
    },
  },

  ENTJ: {
    type: 'ENTJ',
    typeGroup: 'analyst',
    name: { en: 'The Commander', zh: '指挥官' },
    title: { en: 'Commander', zh: '指挥官' },
    tagline: {
      en: 'Bold, imaginative, and strong-willed leaders who always find a way',
      zh: '大胆、富有想象力且意志坚定的领导者，总能找到出路',
    },
    overview: {
      en: `ENTJs are the archetypal strategic leaders — bold, efficient, and relentlessly focused on achieving ambitious goals. They see the world as a series of challenges to be overcome and resources to be optimized, and they approach each with the same characteristic energy: decisive analysis, clear vision, and an unwillingness to accept mediocrity. In any group, ENTJs naturally assume leadership — not through formal authority alone, but because their confidence, competence, and forward-driving energy create a gravitational pull that others instinctively follow.

The ENTJ mind is oriented toward the long game. Where others see complexity or obstacles, ENTJs see opportunity and leverage points. They are exceptionally skilled at breaking down large, complex problems into actionable components, assembling the right people and resources, and driving execution with precision and discipline. This capacity for strategic thinking, combined with an intense intolerance for inefficiency, makes them formidable forces in business, government, and any domain requiring transformation at scale.

Yet the ENTJ's greatest strength is also the source of their deepest growth edges. Their demanding standards and low tolerance for incompetence can come across as harsh, cold, or dismissive to those who don't match their pace. Their focus on goals can blind them to the human costs of pursuit. The most powerful ENTJs are those who learn that their vision is more fully realized when they bring others with them — not by demanding performance, but by genuinely inspiring it. Cultivating emotional intelligence and humility allows the ENTJ to build not just organizations, but legacies.`,
      zh: `ENTJ是典型的战略领导者——大胆、高效，并以实现宏大目标为不懈追求。他们将世界视为一系列有待克服的挑战和有待优化的资源，并以同样的特征性能量面对每一个：果断的分析、清晰的愿景，以及不接受平庸的坚定意志。在任何群体中，ENTJ都自然而然地承担领导地位——不仅仅是通过正式权威，而是因为他们的自信、能力和向前驱动的能量产生了一种吸引力，使他人本能地跟随。

ENTJ的思维着眼于长远。在他人眼中是复杂性或障碍的地方，ENTJ看到的是机会和杠杆点。他们擅长将大型复杂问题分解为可操作的组成部分，集结合适的人才和资源，并以精确和纪律性推动执行。这种战略思维能力与对低效的强烈不容忍相结合，使他们在商业、政府以及任何需要大规模转型的领域成为令人敬畏的力量。

然而，ENTJ最大的优势也是其最深层成长边界的来源。他们严苛的标准和对不胜任的低容忍度对于那些跟不上其节奏的人来说可能显得苛刻、冷酷或轻视。他们对目标的专注可能使他们对追求的人力代价视而不见。最强大的ENTJ是那些学会通过带动他人而非要求表现而是真正激励表现来更充分实现愿景的人。培养情商和谦逊使ENTJ不仅能建立组织，更能留下遗产。`,
    },
    cognitive_functions: [
      {
        name: 'Te',
        role: 'dominant',
        label: { en: 'Extraverted Thinking', zh: '外倾思维' },
        description: {
          en: 'Dominant Te makes ENTJs natural strategists and organizers, driven to impose order, optimize systems, and measure results with clear, objective criteria.',
          zh: '主导的Te使ENTJ成为天生的战略家和组织者，驱动他们建立秩序、优化系统，并以清晰的客观标准衡量结果。',
        },
      },
      {
        name: 'Ni',
        role: 'auxiliary',
        label: { en: 'Introverted Intuition', zh: '内倾直觉' },
        description: {
          en: 'Auxiliary Ni provides ENTJs with powerful long-range vision and strategic foresight, allowing them to see patterns in complexity and anticipate future trajectories with remarkable accuracy.',
          zh: '辅助的Ni为ENTJ提供了强大的长远视野和战略预见能力，使他们能够在复杂性中看到模式，并以惊人的准确性预测未来轨迹。',
        },
      },
      {
        name: 'Se',
        role: 'tertiary',
        label: { en: 'Extraverted Sensing', zh: '外倾感觉' },
        description: {
          en: 'Tertiary Se helps ENTJs stay engaged with immediate realities and tactical details, giving them a practical grounding that complements their visionary big-picture thinking.',
          zh: '第三位的Se帮助ENTJ与即时现实和战术细节保持接触，为其提供与远见的宏观思维相补充的务实基础。',
        },
      },
      {
        name: 'Fi',
        role: 'inferior',
        label: { en: 'Introverted Feeling', zh: '内倾情感' },
        description: {
          en: 'Inferior Fi is the ENTJ\'s least developed function — access to personal values, emotional vulnerability, and authentic self-expression is a significant growth area and source of stress under pressure.',
          zh: '劣势的Fi是ENTJ最不发达的功能——获取个人价值观、情感脆弱性和真实自我表达是重要的成长领域，也是压力下的压力来源。',
        },
      },
    ],
    strengths: {
      en: [
        'Exceptional strategic thinking and long-range planning',
        'Bold, confident, and decisive leadership',
        'High drive for achievement and results',
        'Ability to inspire others through vision and competence',
        'Strong capacity for rational analysis and problem-solving',
        'Efficient and skilled at deploying resources',
        'Resilient and undaunted by major challenges',
        'Natural ability to identify and develop talent in others',
      ],
      zh: [
        '卓越的战略思维和长期规划',
        '大胆、自信、果断的领导力',
        '对成就和结果的强烈驱动',
        '通过愿景和能力激励他人的能力',
        '强大的理性分析和问题解决能力',
        '高效、善于调配资源',
        '具有韧性，面对重大挑战不屈不挠',
        '识别和发展他人才能的天赋',
      ],
    },
    weaknesses: {
      en: [
        'Can be perceived as arrogant, domineering, or cold',
        'Low tolerance for inefficiency or perceived incompetence',
        'May overlook emotional needs of self and others',
        'Tendency to override others\' input in pursuit of efficiency',
        'Can be impatient with slower processes or cautious thinkers',
        'May struggle to acknowledge vulnerability or ask for help',
      ],
      zh: [
        '可能被认为傲慢、专横或冷漠',
        '对低效或被认为不胜任的事物容忍度低',
        '可能忽视自己和他人的情感需求',
        '在追求效率的过程中倾向于凌驾于他人意见之上',
        '可能对较慢的过程或谨慎的思考者感到不耐烦',
        '可能难以承认脆弱或寻求帮助',
      ],
    },
    growth_areas: {
      en: [
        {
          title: 'Developing Emotional Intelligence',
          description: 'Invest in understanding the emotional landscapes of yourself and others. Leaders who connect emotionally generate loyalty that performance demands cannot.',
        },
        {
          title: 'Practicing Patience and Inclusion',
          description: 'Slow down sufficiently to bring others along in decision-making. The buy-in gained is worth the time spent, and diverse input strengthens outcomes.',
        },
        {
          title: 'Cultivating Intellectual Humility',
          description: 'Deliberately seek out perspectives that challenge your frameworks. Being wrong efficiently and updating your model quickly is a form of strategic strength.',
        },
        {
          title: 'Connecting with Personal Values',
          description: 'Create space for deeper introspection about what you genuinely value beyond achievement. Aligning your ambition with your authentic inner life produces more sustainable fulfillment.',
        },
      ],
      zh: [
        {
          title: '培养情商',
          description: '投入理解自己和他人的情感世界。在情感上与他人连接的领导者获得的忠诚是绩效要求所无法产生的。',
        },
        {
          title: '培养耐心和包容性',
          description: '充分放慢速度，在决策中带动他人。获得的认同值得所花费的时间，多元化的投入能加强结果。',
        },
        {
          title: '培养智识谦逊',
          description: '刻意寻找挑战你框架的观点。高效地认识到错误并快速更新模型是一种战略优势。',
        },
        {
          title: '连接个人价值观',
          description: '为更深层的内省创造空间，探究你在成就之外真正重视的是什么。将你的雄心与真实的内心生活对齐，产生更可持续的满足感。',
        },
      ],
    },
    career_paths: {
      en: [
        'CEO / Executive Director',
        'Management Consultant',
        'Entrepreneur / Venture Capitalist',
        'Attorney / Corporate Lawyer',
        'Investment Banker',
        'Military General / Senior Government Official',
        'University President / Academic Leader',
        'Chief Technology or Product Officer',
      ],
      zh: [
        '首席执行官/执行主任',
        '管理顾问',
        '企业家/风险投资家',
        '律师/公司律师',
        '投资银行家',
        '军事将领/高级政府官员',
        '大学校长/学术领导者',
        '首席技术官或产品官',
      ],
    },
    communication_style: {
      en: 'ENTJs communicate in a direct, structured, and commanding manner, leading with conclusions and evidence rather than preamble. They are most effective in high-stakes, results-oriented conversations and can become impatient with what they perceive as meandering or emotionally-driven dialogue. They respect confidence and intellectual rigor in others, respond well to direct challenge backed by evidence, and may need to consciously soften their directness in personal and team contexts where relationships are the primary currency.',
      zh: 'ENTJ以直接、有条理、有指挥力的方式进行沟通，以结论和证据而非铺垫开场。他们在高风险、结果导向的对话中最为有效，对他们认为迂回或情感驱动的对话可能感到不耐烦。他们尊重他人的自信和智识严谨，能够良好回应有证据支持的直接挑战，并且在人际关系是主要货币的个人和团队情境中可能需要有意识地软化其直接性。',
    },
  },
};
