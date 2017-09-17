const { and, pos, word } = require('../lib/tokenFilters');
const { mergeLocMatchGroups } = require('../lib/matching/utils');
const { Node, Edge, graphMatch } = require('../lib/matching/graphMatch');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGZL717',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'comparingHuiNengKeyi',
  name: '会／能 + Verb',
  description:
    '会 (huì), 能 (néng), and 可以 (kěyǐ) are often translated as "can." Sometimes they are explained as: 会 means "know how to," 能 means "to be able to," and 可以 means "to have permission to." Actually, they overlap somewhat.',
  sources: [allSetSrc],
  match: sentence =>
    mergeLocMatchGroups([
      graphMatch(
        sentence.tokens,
        new Node({ filter: pos('V.') }, [
          new Edge(
            { type: 'aux:modal|advmod', ahead: true },
            new Node({ filter: and(pos('V.|AD'), word('不?(会|能|可以)')), capture: '会能可以' })
          ),
        ])
      ),
      graphMatch(
        sentence.tokens,
        new Node({ filter: and(pos('V.'), word('(会|能).')), capture: '会能' })
      ),
    ]),
  examples: [
    {
      zh: '他会修电脑。',
      en: 'He knows how to fix computers.',
      src: allSetSrc,
    },
    {
      zh: '我会跳舞。',
      en: 'I know how to dance.',
      src: allSetSrc,
    },
    {
      zh: '我学了两年才会说一点汉语。',
      en: 'I studied for two years before I knew how to speak a little Chinese.',
      src: allSetSrc,
    },
    {
      zh: '你真的能吃三碗米饭吗？',
      en: 'Are you really able to eat three bowls of rice?',
      src: allSetSrc,
    },
    {
      zh: '你能记住所有国家的名字吗？',
      en: 'Are you able to remember the names of all countries?',
      src: allSetSrc,
    },
    {
      zh: '三个月的小孩子不能走路。',
      en: 'Three month old children are unable to walk.',
      src: allSetSrc,
    },
    {
      zh: '我能进来吗？',
      en: 'Am I allowed to enter?',
      src: allSetSrc,
    },
    {
      zh: '我可以进来吗？',
      en: 'Am I allowed to enter?',
      src: allSetSrc,
    },
    {
      zh: '你可以帮我一下吗？',
      en: 'Could you help me a bit?',
      src: allSetSrc,
    },
    {
      zh: '你能帮我一下吗？',
      en: 'Could you help me a bit?',
      src: allSetSrc,
    },
    {
      zh: '不能带危险物品上车。',
      en: "You're not allowed to bring dangerous things in the car.",
      src: allSetSrc,
    },
    {
      zh: '不可以带危险物品上车。',
      en: "You're not allowed to bring dangerous things in the car.",
      src: allSetSrc,
    },
    {
      zh: '我能在这里抽烟吗？',
      en: 'Can I smoke here?',
      src: allSetSrc,
    },
    {
      zh: '下个月我们就要结婚了，你的父母能来中国吗？',
      en: "Next month we're getting married, can your parents come to China?",
      src: allSetSrc,
    },
    {
      zh: '下个月我们就要结婚了，你的父母可以来中国吗？',
      en: "Next month we're getting married, can your parents come to China?",
      src: allSetSrc,
    },
    {
      zh: '明天你会来吗？',
      en: 'Will you come tomorrow?',
      src: allSetSrc,
    },
    {
      zh: '你太过分了，没有人会这么做。',
      en: "You're too excessive. No one will do it like this.",
      src: allSetSrc,
    },
    {
      zh: '一会儿会下雨吗？',
      en: 'Will it rain in a minute?',
      src: allSetSrc,
    },
    {
      zh: '这个女孩子很会唱歌。',
      en: 'This girl can sing really well.',
      src: allSetSrc,
    },
    {
      zh: '我的妈妈很会做饭。',
      en: 'My mother really knows how to cook.',
      src: allSetSrc,
    },
    {
      zh: '他很会骗人。',
      en: 'He can really deceive people.',
      src: allSetSrc,
    },
    {
      zh: '你很会打羽毛球，以后应该当个专业羽毛球运动员。',
      en:
        'You can really play badminton well. You should be a professional badminton player when you grow up.',
      src: allSetSrc,
    },
    {
      zh: '你很能吃吗！',
      en: 'Wow, you really can eat!',
      src: allSetSrc,
    },
    {
      zh: '你很能睡。',
      en: 'You can really sleep.',
      src: allSetSrc,
    },
    {
      zh: '他今天会这么成功是因为他是一个很能吃苦的人。',
      en:
        'The reason he is so successful today is because he is a person who can handle a lot of burdens.',
      src: allSetSrc,
    },
    {
      zh: '我现在能跳舞了，我的脚伤好了。',
      en: 'I am able to dance now, my foot is better. (The condition changed)',
      src: allSetSrc,
    },
    {
      zh: '我现在会跳舞了，我学了两个月。',
      en: "I know how to dance now, I studied for two months. (It's a learned skill)",
      src: allSetSrc,
    },
    {
      zh: '我现在可以跳舞了，我爸爸同意了。',
      en: "I'm allowed to dance now, my dad agreed. (The dad gave permission)",
      src: allSetSrc,
    },
    {
      zh: '我们学了半年中文，现在我会说一点中文。',
      en:
        'We have learned half a year of Chinese, now I know how to speak a little bit of Chinese (The speaker now knows a new language)',
      src: allSetSrc,
    },
    {
      zh: '你能用中文演讲吗？',
      en:
        'Can you use Chinese to make a speech? (The speaker is asking if that person has the ability to)',
      src: allSetSrc,
    },
    {
      zh: '我们已经说了两个小时英文，现在可以说中文吗？',
      en:
        'We have already spoken two hours of English, can we speak Chinese now? (The speaker is asking for permission)',
      src: allSetSrc,
    },
    {
      zh: '我会做中国菜。',
      en: 'I know how to make Chinese food.',
      src: allSetSrc,
    },
    {
      zh: '你能吃辣的中国菜吗？',
      en: 'Can you eat (do you have the ability to) eat spicy Chinese food?',
      src: allSetSrc,
    },
    {
      zh: '我们可以去吃中国菜吗？',
      en: 'Can we go eat Chinese food? (Asking for permission)',
      src: allSetSrc,
    },
    {
      zh: 'A:我可以和他们一起踢足球吗？',
      en: 'Can I play soccer with them? (Am I allowed?)',
      src: allSetSrc,
    },
    {
      zh: 'B:你的腿还没好，现在你不能踢。',
      en: "Your foot still isn't better. You can't go right now. (His rule prohibits it)",
      src: allSetSrc,
    },
    {
      zh: 'A:它会好吗？',
      en: 'Will it get better? (会 indicates the future)',
      src: allSetSrc,
    },
    {
      zh: 'B:嗯，你放心吧，很快就会好的。',
      en: "Yes, don't worry, it will get better soon.",
      src: allSetSrc,
    },
  ],
};
