const { and, pos, word } = require('../lib/tokenFilters');
const { regexMatchTokens } = require('../lib/matching/regexMatch');
const { locsFromTokens } = require('../lib/matching/utils');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASG95AL1',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'auxiliaryVerbYaoAndItsMultipleMeanings',
  structures: ['Subj. + 要 + Noun', 'Subj. + 要 + Verb'],
  description:
    'You probably already know the basic meaning of 要 (yào) as "to want."  It is actually a quite versatile word, though, and can also take on the meanings of "to need" as well as "will (do something)."  In every case, context is crucial for figuring out which meaning someone is trying to express.',
  sources: [allSetSrc],
  match: sentence =>
    locsFromTokens(
      regexMatchTokens(sentence.tokens, '(:yao:)', {
        yao: and(word('要'), pos('VV')),
      }),
      '要'
    ),
  examples: [
    {
      zh: '你要什么？',
      en: 'What do you want?',
      src: allSetSrc,
    },
    {
      zh: '我要一杯水。',
      en: 'I want a cup of water.',
      src: allSetSrc,
    },
    {
      zh: '你们都要冰可乐吗？',
      en: 'Do you all want coke with ice?',
      src: allSetSrc,
    },
    {
      zh: '你要茶还是咖啡？',
      en: 'Do you want tea or coffee?',
      src: allSetSrc,
    },
    {
      zh: '我们要三碗米饭。',
      en: 'We want three bowls of rice.',
      src: allSetSrc,
    },
    {
      zh: '你要喝什么酒？',
      en: 'What kind of wine do you want to drink?',
      src: allSetSrc,
    },
    {
      zh: '爸爸要买一个新手机。',
      en: 'Dad wants to buy a new cell phone.',
      src: allSetSrc,
    },
    {
      zh: '我要跟你一起去。',
      en: 'I want to go with you.',
      src: allSetSrc,
    },
    {
      zh: '她要去大城市找工作。',
      en: 'She wants to go to a big city to find a job.',
      src: allSetSrc,
    },
    {
      zh: '周末你们要一起看电影吗？',
      en: 'Do you want to go see a movie together this weekend?',
      src: allSetSrc,
    },
    {
      zh: '你要早点睡觉。',
      en: 'You need to go to bed earlier.',
      src: allSetSrc,
    },
    {
      zh: '我们明天要上班。',
      en: 'We need to work tomorrow.',
      src: allSetSrc,
    },
    {
      zh: '老板今天要见一个新客户。',
      en: 'Today the boss needs to see a new client.',
      src: allSetSrc,
    },
    {
      zh: '老师太累了，要好好休息。',
      en: 'The teacher is too tired. She needs to rest well.',
      src: allSetSrc,
    },
    {
      zh: '明天下雨，你要带伞。',
      en: "It's going to rain tomorrow; you need to bring an umbrella.",
      src: allSetSrc,
    },
    {
      zh: '星期五我们要开会。',
      en: 'We are going to have a meeting on Friday.',
      src: allSetSrc,
    },
    {
      zh: '12点我要去吃饭。',
      en: "I am going to go eat at 12 o'clock.",
      src: allSetSrc,
    },
    {
      zh: '老板下周要出差吗？',
      en: 'Is the boss going on a business trip next week?',
      src: allSetSrc,
    },
    {
      zh: '他们明年要结婚了。',
      en: 'They are going to get married next year.',
      src: allSetSrc,
    },
    {
      zh: '今年你要回家过年吗？',
      en: 'Are you going to return home this year to celebrate the Chinese New Year?',
      src: allSetSrc,
    },
  ],
};
