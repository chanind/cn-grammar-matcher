const { and, pos, word } = require('../lib/tokenFilters');
const { mergeLocMatchGroups } = require('../lib/matching/utils');
const { Node, Edge, graphMatch } = require('../lib/matching/graphMatch');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGG25MD',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'theAlsoAdverbYe',
  structures: ['Subj. + 也 + Verb / [Verb Phrase]', 'Subj. + 也 (+ Adv.) + Adj.'],
  description:
    'The English adverb "too" or "also" is expressed in Chinese as 也 (yě). In Chinese, it always needs to come before the verb (or adjective).',
  sources: [allSetSrc],
  match: sentence =>
    mergeLocMatchGroups([
      graphMatch(
        sentence.tokens,
        new Edge(
          { type: 'advmod', ahead: true },
          new Node({ filter: and(pos('AD'), word('也是?')), capture: '也' })
        )
      ),
    ]),
  examples: [
    {
      zh: '我也喜欢。',
      en: 'I also like it.',
      src: allSetSrc,
    },
    {
      zh: '我也是学生。',
      en: 'I am a student too.',
      src: allSetSrc,
    },
    {
      zh: '她也有一个儿子。',
      en: 'She also has a son.',
      src: allSetSrc,
    },
    {
      zh: '他们也是法国人吗？',
      en: 'Are they also French?',
      src: allSetSrc,
    },
    {
      zh: '我也想学中文。',
      en: 'I also want to study Chinese.',
      src: allSetSrc,
    },
    {
      zh: '他们也会去吗？',
      en: 'Are they also going?',
      src: allSetSrc,
    },
    {
      zh: '我妈妈也喜欢吃饺子。',
      en: 'My mother likes to eat boiled dumplings too.',
      src: allSetSrc,
    },
    {
      zh: '孩子也可以喝酒吗？',
      en: 'Can kids drink alcohol too?',
      src: allSetSrc,
    },
    {
      zh: '你也想来我家吗？',
      en: 'Do you want to come to my house too?',
      src: allSetSrc,
    },
    {
      zh: '她也觉得这个老师不好。',
      en: "She also thinks this teacher isn't good.",
      src: allSetSrc,
    },
    {
      zh: '我也不喜欢。',
      en: "I don't like it either.",
      src: allSetSrc,
    },
    {
      zh: '我也不知道。',
      en: "I don't know either.",
      src: allSetSrc,
    },
    {
      zh: '他也没有。',
      en: "He doesn't have it either.",
      src: allSetSrc,
    },
    {
      zh: '你也不想来我家吗？',
      en: "You don't want to come to my house either?",
      src: allSetSrc,
    },
    {
      zh: '你也很高。',
      en: 'You are also tall.',
      src: allSetSrc,
    },
    {
      zh: '他也很胖。',
      en: 'He is also fat.',
      src: allSetSrc,
    },
    {
      zh: '我爸爸也很帅。',
      en: 'My dad is also handsome.',
      src: allSetSrc,
    },
    {
      zh: '湖南菜也很辣。',
      en: 'Hunan food is very spicy too.',
      src: allSetSrc,
    },
    {
      zh: '这种酒也很好喝。',
      en: 'This kind of alcohol is also good.',
      src: allSetSrc,
    },
    {
      zh: '这个地方也很漂亮。',
      en: 'This place is also pretty.',
      src: allSetSrc,
    },
    {
      zh: '昨天很冷，今天也很冷。',
      en: 'Yesterday was cold, and today is also cold.',
      src: allSetSrc,
    },
    {
      zh: '他生气了？我也很生气！',
      en: "He got angry? I'm also angry!",
      src: allSetSrc,
    },
    {
      zh: '这个问题也很麻烦。',
      en: 'This problem is also very troublesome.',
      src: allSetSrc,
    },
    {
      zh: '我觉得这个餐厅也很好。',
      en: 'I think that this restaurant is also good.',
      src: allSetSrc,
    },
    {
      zh: '我也是。',
      en: 'Me too. / I am too.',
      src: allSetSrc,
    },
  ],
};
