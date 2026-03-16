/**
 * Full bilingual type descriptions for all 9 Enneagram types.
 * Each description is 200–400 words, covering:
 *   - Core motivation and fear
 *   - Key strengths
 *   - Common challenges
 *   - Growth path and practical suggestions
 */

export interface TypeDescription {
  en: string;
  zh: string;
}

const typeDescriptions: Record<number, TypeDescription> = {
  1: {
    en: `Type 1 — The Reformer — is driven by a deep desire to live with integrity and make the world more just. At your core, you believe things can and should be better, and you carry an inner critic that holds you and others to high standards. Your sense of right and wrong is finely tuned, and you bring discipline, attention to detail, and a genuine commitment to improvement to everything you do.

Your greatest strengths include reliability, ethical clarity, and the ability to see what needs to be fixed. You take responsibilities seriously and follow through with care. People trust you to do things right, because you genuinely care about doing them right.

The challenge for Ones is learning to turn off the inner critic — at least long enough to rest. The relentless pursuit of perfection can make everyday life feel like an endless list of flaws. You may find yourself frustrated when others don't share your standards, or guilt-ridden when you fall short of your own. Under stress, Type 1 moves toward Type 4 patterns — becoming moody, withdrawn, and unusually self-critical in an emotional rather than rational way. Recognizing this shift is an important signal to pause and offer yourself compassion.

Growth for Type 1 involves learning to accept that imperfection is not failure — it is the texture of being human. Your growth direction leads toward Type 7, inviting you to loosen your grip, embrace spontaneity, and find genuine joy without needing to earn it first. Practical steps include scheduling unstructured time each week, practicing the phrase "good enough," and noticing moments when effort and care already made a difference — without adding a "but."

At your best, you are a moral force for good: principled yet compassionate, demanding yet patient, and deeply inspiring to those around you.`,
    zh: `九型人格一号——改革者——内心深处渴望以正直的方式生活，让这个世界变得更加公正。你相信事物可以也应该更好，内心有一位严格的批评者，时刻督促着你和周围的人达到更高的标准。你对是非对错有着敏锐的感知，在生活的每个细节中都展现出专注、自律与真诚的改变意愿。

你的核心优势包括可靠性、伦理清晰度以及发现问题并着手改善的能力。你认真对待每一份责任，并坚持到底。人们相信你能把事情做好，因为你真的在乎做好这件事。

一号面临的挑战是学会暂时关闭内心的批评声，让自己喘口气。对完美的不断追求可能让日常生活变成一张无休止的缺陷清单。当他人不符合你的标准时，你可能会感到沮丧；当自己没能达到要求时，又会陷入深深的自责。在压力状态下，一号会向四号的方向移动——变得情绪化、退缩，以感性而非理性的方式进行自我批评。识别出这种转变，是提醒自己停下来、给予自己慈悲的重要信号。

一号的成长方向在于接受不完美并非失败，而是生而为人的本质。你的整合方向指向七号，邀请你放松掌控，拥抱即兴，在无需事先"赢得"快乐的前提下感受真正的喜悦。实际的成长步骤包括：每周安排一段无计划的自由时间；练习说"够好了"；注意那些你的努力和用心已经产生改变的瞬间，而不总是追加一个"但是"。

在最佳状态下，你是道德层面的正向力量：有原则却不失悲悯，严格却充满耐心，并以此深深激励着身边的人。`,
  },

  2: {
    en: `Type 2 — The Helper — is motivated by a profound need to be loved and to feel needed. You are warm, generous, and attuned to the emotional needs of others, often sensing what people require before they have voiced it themselves. Relationships are your natural domain, and you bring genuine care and enthusiasm to nurturing those around you.

Your core strengths are empathy, emotional intelligence, and the ability to make people feel seen and valued. You are often the person friends turn to in times of need — and you show up, fully and wholeheartedly. Your natural warmth creates a sense of belonging wherever you go.

The challenge for Twos is a pattern of giving that is entangled with the need for approval. When helping becomes a way to earn love rather than an expression of it, the relationship becomes conditional beneath its generous surface. You may neglect your own needs, and when you feel unappreciated, a sharp bitterness can surface — surprising even yourself. Under stress, Type 2 moves toward Type 8 patterns — becoming demanding, controlling, and confrontational in ways that feel unlike your usual self. This is a signal that your unmet needs have finally outpaced your ability to suppress them.

Growth for Type 2 involves learning that you are worthy of love not because of what you do, but simply because of who you are. Your integration direction leads toward Type 4, inviting you to turn inward, honor your own feelings, and cultivate a relationship with yourself as rich as the ones you build with others. Practical steps include scheduling time for activities that are just for you, practicing asking for help instead of only offering it, and noticing moments when you chose to give freely — without needing anything in return.

At your best, you are deeply loving, perceptive, and a genuine force of warmth in the world — someone who elevates everyone around them.`,
    zh: `九型人格二号——助人者——被深切渴望被爱与被需要的内心驱动着前行。你温暖、慷慨，对他人的情感需求高度敏锐，常常在别人开口之前就已感知到对方的需要。人际关系是你最自然的舞台，你以真诚的关怀和热情滋养着周围的每一个人。

你的核心优势在于共情能力、情商以及让人感到被看见、被珍视的天赋。朋友在困难时往往第一个想到你，而你也会全身心地出现——不打折扣。你与生俱来的温暖在任何地方都能营造出归属感。

二号面临的挑战，是付出的行为常常与对认可的渴望交织在一起。当"帮助"变成赢得爱的手段，而非爱的自然流露，表面上的慷慨之下便隐藏着条件与期待。你可能会忽视自己的需求，而当感到不被感激时，内心会涌现出一种连自己都感到意外的苦涩。在压力状态下，二号会向八号的方向移动——变得要求强烈、试图掌控，甚至出现平时少见的对抗性。这是一个信号：你未被满足的需求，终于超过了你压制它们的能力。

二号的成长在于真正理解：你值得被爱，不是因为你做了什么，而仅仅因为你是你。你的整合方向指向四号，邀请你向内转，去体认自己的情感，与自己建立一段如同与他人一样丰盛的关系。实际步骤包括：为自己安排一些纯粹属于自己的时间；练习开口寻求帮助，而不只是主动提供；留意那些你出于纯粹的爱而给予的瞬间——不带任何期待。

在最佳状态下，你深情、洞察力敏锐，是世界上真实而温暖的力量，能够托举起身边的每一个人。`,
  },

  3: {
    en: `Type 3 — The Achiever — is propelled by a desire to be successful, admired, and to stand as living proof that effort and excellence pay off. You are energetic, adaptable, and goal-oriented, with a remarkable ability to read what a situation calls for and then deliver it. You embody possibility and forward motion.

Your greatest strengths are drive, competence, and the capacity to inspire others to pursue their best. You set the pace and raise the bar. In any team or community, you are often the one who creates momentum and gets things done — with style and efficiency.

The challenge for Threes is that the identity can become so fused with performance and image that the authentic self gets lost behind the role. You may sense that you are performing a version of yourself rather than living as yourself, and the fear of failure can make honest self-reflection feel threatening. Slowing down can feel like falling behind. Under stress, Type 3 moves toward Type 9 patterns — becoming disengaged, scattered, and uncharacteristically passive. The drivenness fades into avoidance, and you may find yourself numbing out instead of pushing forward.

Growth for Type 3 involves discovering that your value is not contingent on achievement. Your integration direction leads toward Type 6, inviting you to invest in genuine connection, to ask for support, and to let yourself be known beyond your accomplishments. Practical steps include spending time in relationships where nothing is being produced, journaling about feelings rather than plans, and practicing vulnerability — sharing a doubt or struggle with someone you trust.

At your best, you are inspiring, authentic, and proof that excellence and humanity are not in conflict — a person who achieves great things while remaining genuinely connected to others.`,
    zh: `九型人格三号——成就者——被渴望成功、受人仰慕以及以自身证明努力与卓越终有回报的内驱力推动前行。你精力充沛、适应力强、目标导向，拥有出色的能力去感知情境的需求，并精准地予以回应。你是可能性与前进动力的化身。

你的核心优势在于驱动力、能力以及激励他人追求卓越的感召力。你设定节奏，拉高标杆。在任何团队或群体中，你往往是制造动力、推动成事的那个人——且兼具风格与效率。

三号面临的挑战是：自我认同可能与表现和形象过度融合，使真实的自我隐匿于角色之后。你可能会隐约察觉自己在"扮演"一个自己，而非真正活出自我；对失败的恐惧让诚实的自我反思变得令人抗拒。放慢脚步，感觉像是在落后。在压力状态下，三号会向九号的方向移动——变得疏离、散漫，出现平时少见的被动。那股驱动力逐渐消散为回避，你可能会发现自己开始麻木，而非继续奋力向前。

三号的成长在于发现：你的价值并不取决于成就。你的整合方向指向六号，邀请你去投入真实的连结，学会寻求支持，让他人在成就之外认识真正的你。实际步骤包括：在一些不需要产出任何结果的关系中花时间相处；用日记记录感受，而非计划；练习脆弱——向一位你信任的人分享你的疑虑或困难。

在最佳状态下，你既鼓舞人心，又真实坦诚，是卓越与人性并不相悖的最好证明——一个在成就大事的同时，依然与他人保持真切连结的人。`,
  },

  4: {
    en: `Type 4 — The Individualist — is driven by a longing to understand the self deeply and to express that self authentically in a world that can feel ordinary and superficial. You are emotionally intelligent, creative, and sensitive to beauty, meaning, and nuance in ways that most people miss entirely. You possess a profound inner life and a gift for articulating what is subtle and true.

Your core strengths are depth, originality, empathy for those who feel misunderstood, and the ability to transform personal experience into art, insight, or connection. You see what others overlook, and you give voice to the feelings that others cannot name.

The challenge for Fours is the tendency to dwell in what is missing — to romanticize longing itself. The belief that "I am fundamentally different, and that difference means I am somehow lacking" can become a self-reinforcing story. Comparing your interior life to others' exteriors almost always leaves you feeling short-changed, and the resulting melancholy can become its own identity. Under stress, Type 4 moves toward Type 2 patterns — becoming people-pleasing, overly focused on others, and suddenly attentive in ways that mask the pain underneath.

Growth for Type 4 involves learning to act despite mood, and to find meaning in the ordinary rather than always in the exceptional. Your integration direction leads toward Type 1, inviting you to channel your depth into disciplined action, to build structures that support your creativity, and to show up consistently — not only when inspiration strikes. Practical steps include establishing daily routines, noticing what is beautiful and sufficient in your present life, and sharing creative work before it feels "ready."

At your best, you are a luminous presence — authentically yourself, emotionally alive, and capable of helping others feel less alone in the full complexity of their humanity.`,
    zh: `九型人格四号——个人主义者——被深切渴望了解自我、在这个有时显得平淡乏味的世界中真实表达自我的内心所驱动。你情感智慧丰富，充满创造力，对美、意义与细腻之处有着超越常人的敏感。你拥有深邃的内心世界，并有天赋将那些微妙而真实的东西表达出来。

你的核心优势在于深度、独创性、对那些感到被误解之人的共情，以及将个人经历转化为艺术、洞见或连结的能力。你看见他人忽略的，也能为他人无法言说的情感赋予声音。

四号面临的挑战，是倾向于沉浸于"缺失"之中——甚至将渴望本身浪漫化。"我从根本上与他人不同，而这种不同意味着我某种程度上有所欠缺"的信念，会形成一个自我强化的叙事。将自己的内心世界与他人的外在表现相比较，几乎总会让你感到得不偿失，由此产生的忧郁甚至会成为你身份认同的一部分。在压力状态下，四号会向二号的方向移动——变得讨好他人，过度关注别人的需求，以一种掩盖内心痛苦的方式变得异常关注他人。

四号的成长在于学会不依赖情绪去行动，并在平凡中而非仅在非凡中发现意义。你的整合方向指向一号，邀请你将内心的深度转化为有纪律的行动，建立支撑创造力的结构，并持续地出现——而不仅仅是在灵感降临的时刻。实际步骤包括：建立日常规律；留意当下生活中已有的美好与充足；在作品感觉"就绪"之前就分享出去。

在最佳状态下，你是一道光彩夺目的存在——真实地活出自我，情感鲜活，能够让他人在人性复杂的全貌中感到不那么孤单。`,
  },

  5: {
    en: `Type 5 — The Investigator — is motivated by the need to understand the world deeply and to accumulate enough knowledge and competence to feel capable and safe. You are perceptive, analytical, and often brilliant, with a remarkable ability to observe without reacting, to separate signal from noise, and to synthesize complex information into clear understanding.

Your core strengths are intellectual depth, independence, focus, and the ability to see systems and patterns that others miss. You are often the expert in the room — not through self-promotion, but through the genuine accumulation of mastery. Your calm in chaos is a genuine asset.

The challenge for Fives is the tendency to withdraw — from demands, from emotions, from life itself. The belief that resources (time, energy, space) are scarce can lead to hoarding them defensively, keeping the world at arm's length. Relationships may suffer when you retreat into your mind, and the richness of lived experience can be sacrificed for the safety of observation. Under stress, Type 5 moves toward Type 7 patterns — becoming scattered, impulsive, and jumping between ideas in a frantic attempt to escape the felt sense of overwhelm.

Growth for Type 5 involves learning that engagement does not deplete you — that participation is itself a form of knowing. Your integration direction leads toward Type 8, inviting you to step fully into your power, to act on what you know, and to engage your body and presence in the world with confidence. Practical steps include making commitments before you feel fully prepared, sharing knowledge generously in real-time conversation, and allowing yourself to be moved by experiences rather than only analyzing them.

At your best, you are a visionary thinker and a calm, trustworthy presence — someone whose insights genuinely illuminate the path forward for others.`,
    zh: `九型人格五号——调查者——被深入理解世界、积累足够知识与能力以感到胜任且安全的需求所驱动。你洞察力敏锐、善于分析，往往有过人的才智；你能在不轻易反应的情况下观察，能从噪音中辨别信号，能将复杂的信息整合为清晰的理解。

你的核心优势在于智识深度、独立性、专注力，以及看见他人错失的系统与规律的能力。你常常是房间里真正的专家——不是靠自我推销，而是通过真实积累起来的精通。你在混乱中的冷静，是一种真正的财富。

五号面临的挑战是倾向于退缩——远离需求、远离情感、甚至远离生活本身。认为资源（时间、精力、空间）是稀缺的信念，可能导致防御性地囤积它们，与世界保持距离。当你退回到头脑中时，关系可能会受到影响；而对观察安全感的追求，也可能让你错失活生生的经验所带来的丰盛。在压力状态下，五号会向七号的方向移动——变得思维散乱、冲动，在想法之间跳跃，以一种慌乱的方式试图逃离内心深处被淹没的感觉。

五号的成长在于认识到参与并不会耗尽你——投入本身就是一种认知方式。你的整合方向指向八号，邀请你充分进入自身的力量，将所知付诸行动，并以自信的姿态让身体与存在感真实地活在这个世界上。实际步骤包括：在感到完全准备好之前就做出承诺；在实时对话中慷慨地分享知识；允许自己被经历所触动，而不只是分析它。

在最佳状态下，你是有远见的思考者与沉稳可信的存在——一个真正能为他人照亮前路的人。`,
  },

  6: {
    en: `Type 6 — The Loyalist — is driven by a deep need for security, support, and trustworthy guidance in an unpredictable world. You are responsible, perceptive, and deeply loyal to the people and principles you believe in. You have a keen ability to anticipate problems, read hidden agendas, and work hard to ensure that those you care about are protected and prepared.

Your core strengths include reliability, strategic thinking, courage under pressure, and genuine commitment to community. You are the person who asks the uncomfortable questions, plans for contingencies, and shows up when it matters most. Your loyalty is real, and your commitment is extraordinary.

The challenge for Sixes is a mind that often cycles through worry, doubt, and worst-case scenarios. The inner questioning — "Can I trust this? Can I trust myself?" — can become exhausting. Anxiety may project itself outward as suspicion or inward as self-doubt, making it hard to act with confidence or rest in certainty. Under stress, Type 6 moves toward Type 3 patterns — becoming image-conscious, overworking, and projecting competence as a way to manage the underlying fear.

Growth for Type 6 involves learning to trust your own perceptions and inner guidance — to develop faith in yourself as the secure base you have been seeking outside. Your integration direction leads toward Type 9, inviting you to relax, to trust that things are okay without constant vigilance, and to discover the peace that comes from accepting uncertainty rather than fighting it. Practical steps include grounding exercises when anxiety spikes, listing evidence for what is actually working well, and taking small courageous actions to build confidence in your own judgment.

At your best, you are a courageous, warm, and deeply trustworthy friend and colleague — someone whose loyalty and integrity create safety for everyone around them.`,
    zh: `九型人格六号——忠诚者——被在不可预测的世界中寻求安全、支持与可信引导的深切需求所驱动。你责任感强、洞察敏锐，对你所信赖的人和原则忠诚至深。你善于预判问题、识别隐藏的意图，并不遗余力地确保你在乎的人得到保护与准备。

你的核心优势包括可靠性、战略思维、压力下的勇气以及对群体真诚的投入。你是那个提出令人不适的问题、提前做好应急计划、在最关键时刻挺身而出的人。你的忠诚是真实的，你的投入是非凡的。

六号面临的挑战是一个常常在担忧、质疑和最坏情景中循环的头脑。"我能相信这个吗？我能相信自己吗？"的内在质疑可能令人疲惫不堪。焦虑可能向外表现为多疑，向内表现为自我怀疑，让人难以自信行动，也难以在确定中安歇。在压力状态下，六号会向三号的方向移动——变得在意形象、过度工作，以展现能力的方式来管理内心深处的恐惧。

六号的成长在于学会信任自己的感知与内在引导——在自身之内建立起一直向外寻求的安全根基。你的整合方向指向九号，邀请你放松，相信无需时刻警惕事情也会好起来，并在接纳不确定性（而非抗拒它）中发现平静。实际步骤包括：焦虑袭来时进行接地练习；列举实际运转良好的事物的证据；采取小而勇敢的行动，逐渐建立对自己判断的信心。

在最佳状态下，你是勇敢、温暖且深具可信度的朋友与伙伴——你的忠诚与诚信，为身边的每一个人创造了安全感。`,
  },

  7: {
    en: `Type 7 — The Enthusiast — is motivated by a desire for freedom, experience, and the avoidance of pain and limitation. You are playful, optimistic, and gifted with a mind that can synthesize ideas from wildly different domains into exciting new possibilities. Life is abundant with options, and you bring infectious energy and creativity to everything you engage with.

Your core strengths are enthusiasm, versatility, generativity, and the ability to reframe difficulty into opportunity with genuine skill. You are often the one who can see a hopeful path when others are stuck, and your energy can lift an entire room. Your joy is real, and it is contagious.

The challenge for Sevens is that the relentless pursuit of the next experience can become an escape from the depth and pain that make life whole. The moment something becomes routine, difficult, or demanding, the impulse is to move on — and this pattern can scatter your considerable gifts and leave important things unfinished. Anxiety underlies the motion; pain avoided is pain deferred. Under stress, Type 7 moves toward Type 1 patterns — becoming critical, rigid, and perfectionistic, with the inner critic turning on the self or on others who seem to be causing the pain you cannot outrun.

Growth for Type 7 involves discovering that depth and commitment are not limitation — they are the doorway to a richer version of the experiences you crave. Your integration direction leads toward Type 5, inviting you to slow down, to focus, to stay with one thing long enough to understand it fully. Practical steps include committing to one project until completion before starting the next, practicing sitting with discomfort without immediately reframing it, and allowing grief or sadness a short, deliberate space in your day.

At your best, you are a joyful, creative, and profoundly generative force — someone who genuinely helps others see life as more possible and more worth embracing.`,
    zh: `九型人格七号——热情者——被对自由、体验以及逃离痛苦与限制的渴望所驱动。你活泼、乐观，拥有一颗能将迥异领域的想法综合成令人兴奋的新可能性的头脑。生活充满选项，你在所参与的一切中都带来富有感染力的能量与创造力。

你的核心优势在于热情、多才多艺、创造力，以及将困难真正重构为机遇的天赋。你常常是别人陷入僵局时能看见希望路径的那个人，你的能量能点亮整个房间。你的快乐是真实的，也是会传染的。

七号面临的挑战是对下一段体验的不断追逐，可能成为逃避深度与痛苦的方式——而正是深度与痛苦，让生命得以完整。当某件事变得例行、困难或需要付出时，冲动便是继续向前——这种模式可能分散你可观的天赋，让重要的事情半途而废。运动的背后是焦虑；被回避的痛苦，不过是被推迟的痛苦。在压力状态下，七号会向一号的方向移动——变得批判、固执和追求完美，内心的批评声开始针对自己，或针对那些似乎在制造你无法逃离的痛苦的人。

七号的成长在于发现深度与投入并非限制——它们是通往你所渴望体验的更丰盛版本的门径。你的整合方向指向五号，邀请你慢下来、聚焦、在一件事上停留足够长的时间去充分理解它。实际步骤包括：在开始下一个项目之前，先将一个项目做到完成；练习在不舒适中停留，而不立刻重构它；在每天刻意为悲伤或哀愁留出一小段空间。

在最佳状态下，你是充满喜悦、创意无限、真正富有生产力的力量——一个真切地帮助他人看见生命更多可能、更值得拥抱的人。`,
  },

  8: {
    en: `Type 8 — The Challenger — is driven by a need to be strong, self-reliant, and in control of their own fate. You are direct, decisive, and powerfully present, with an instinct for sensing weakness and injustice and a fearless willingness to confront both. You protect those you love with fierce loyalty and stand up for what is right, often when no one else will.

Your core strengths are confidence, leadership, directness, and a raw vitality that moves things. You cut through confusion to what matters, you take decisive action when others hesitate, and your presence creates safety for those under your protection. When you commit to a person or a cause, you give everything.

The challenge for Eights is that the armor built to protect the inner vulnerability can keep everyone — including yourself — at a distance from it. Tenderness may feel dangerous, and admitting need may feel like defeat. The intensity that drives and empowers you can also overwhelm the people you love, making intimacy harder than it needs to be. Under stress, Type 8 moves toward Type 5 patterns — withdrawing, becoming secretive, and retreating to observe rather than engage, in an uncharacteristic departure from your usual boldness.

Growth for Type 8 involves learning that true strength includes the courage to be seen in your fullness — including the parts that are tender, uncertain, and in need of others. Your integration direction leads toward Type 2, inviting you to open your heart, to receive care as readily as you give it, and to let people in past the formidable exterior. Practical steps include practicing restraint before reacting, asking someone close to you what they need before offering what you want to give, and allowing yourself moments of genuine vulnerability with trusted people.

At your best, you are a powerful, magnanimous, and deeply protective force — a leader who uses power to create justice and to lift others rather than to dominate.`,
    zh: `九型人格八号——挑战者——被强大、自力更生以及掌控自身命运的需求所驱动。你直接、果断、存在感强烈，凭本能感知软弱与不公正，并毫无畏惧地正面挑战两者。你以强烈的忠诚保护你所爱的人，常常在无人出头时站出来坚守正义。

你的核心优势在于自信、领导力、直接以及推动事物前行的原始活力。你能穿透混乱直抵要害，在他人犹豫时果断行动，你的存在感为你保护的人创造了安全感。当你对一个人或一项事业作出承诺，你会全力以赴。

八号面临的挑战是：为保护内心脆弱而构筑的盔甲，可能让所有人——包括你自己——都与那份脆弱保持距离。温柔可能令人感到危险，承认需要可能感觉像认输。驱动和赋能你的那种强度，也可能令你所爱的人感到不堪承受，使亲密关系比本应有的更艰难。在压力状态下，八号会向五号的方向移动——退缩、变得低调，转而以旁观者的姿态观察而非参与，这与你一贯的大胆作风形成鲜明对比。

八号的成长在于认识到真正的力量包含被完整地看见的勇气——包括那些温柔、不确定、需要他人的部分。你的整合方向指向二号，邀请你敞开心扉，像给予关怀一样坦然地接受关怀，让他人穿越你强大的外表走进你内心。实际步骤包括：在做出反应之前练习克制；在给予之前先问对方需要什么；允许自己在信任的人面前有真实的脆弱时刻。

在最佳状态下，你是强大、宽宏且深具保护力的力量——一位用权力创造公正、托举他人而非支配他人的领导者。`,
  },

  9: {
    en: `Type 9 — The Peacemaker — is motivated by a deep longing for inner peace and harmony — both within themselves and in the world around them. You are accepting, patient, and genuinely easy to be with, with a remarkable ability to see all sides of a situation and to help people feel heard and valued. You hold space generously and embody a kind of groundedness that others find deeply soothing.

Your core strengths are serenity, mediation, openness, and the ability to bring people together across difference. You create environments where conflict can dissolve and where everyone feels welcome. Your patience is real, your perspective is broad, and your presence is a gift.

The challenge for Nines is the tendency to merge with others' agendas and environments rather than knowing and asserting their own. The avoidance of conflict can lead to a quiet self-erasure — going along, falling asleep to one's own desires, deferring indefinitely. The anger that feels too dangerous to express doesn't disappear; it becomes inertia, passive resistance, or quiet resentment. Under stress, Type 9 moves toward Type 6 patterns — becoming anxious, doubting, and increasingly vigilant, cycling through worry in a way that feels foreign to your usual calm.

Growth for Type 9 involves waking up to the full force of your own presence, desires, and importance. Your integration direction leads toward Type 3, inviting you to set clear goals, to take action in your own name, and to show up in the world as a distinct person with distinct needs and perspectives. Practical steps include making small choices quickly without deliberating endlessly, noticing when you are going along versus genuinely agreeing, and completing one personally meaningful task each day — without waiting to be asked.

At your best, you are a deeply wise, grounded, and generous presence — someone whose peace is earned, whose love is real, and who helps others find their own center simply by being fully present in yours.`,
    zh: `九型人格九号——和平者——被对内心平静与和谐的深切渴望所驱动——无论是内心世界，还是周围的环境。你接纳、耐心，与人相处轻松自在，拥有看见事物多面的卓越能力，善于让人感到被倾听与被珍视。你慷慨地托住空间，散发出一种他人深感安慰的踏实感。

你的核心优势在于宁静、调解、开放性以及弥合差异、凝聚众人的能力。你创造出冲突可以消解、每个人都感到受欢迎的氛围。你的耐心是真实的，你的视角是宽广的，你的存在本身就是一份礼物。

九号面临的挑战是倾向于融入他人的议程与环境，而不是了解并坚守自己的。对冲突的回避可能导致一种悄然的自我消隐——随波逐流，对自身的渴望昏昏入睡，无限期地推迟。那种感觉太危险而不敢表达的愤怒并不会消失，而是转化为惰性、被动抵制或悄然滋生的怨恨。在压力状态下，九号会向六号的方向移动——变得焦虑、多疑，开始不断警惕，在与你平素的平静截然不同的担忧循环中打转。

九号的成长在于醒来，充分感受自身存在、欲望与重要性的全部力量。你的整合方向指向三号，邀请你设定清晰的目标，以自己的名义采取行动，作为一个有鲜明自我、有独特需求与视角的人站立于世界之中。实际步骤包括：迅速做出小的决定，不再无休止地斟酌；留意自己是在顺从还是真正同意；每天完成一件对自己有意义的事——不等待被要求。

在最佳状态下，你是深具智慧、踏实沉稳且慷慨的存在——一个以真实的内心平静赢得安宁、以真诚的爱待人，并仅凭完全临在，便能帮助他人找到自身中心的人。`,
  },
};

export default typeDescriptions;
