const { regexMatchLocs } = require('../lib/matching/regexMatch');
const { mergeLocMatchGroups } = require('../lib/matching/utils');
const { and, pos, word } = require('../lib/tokenFilters');
const { Node, Edge, graphMatch } = require('../lib/matching/graphMatch');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGI0T9S',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'measureWordGe',
  structures: ['Number + 个 + Noun', 'Verb + 个 + Noun'],
  description:
    "个 (gè) is the most commonly used measure word. It can be used in a pinch for any noun if you can't think of a more precise measure word. (Although you might not sound quite as smart, you'll still get your point across). Also, for many nouns, 个 (gè) is the only correct measure word.",
  sources: [allSetSrc],
  match: sentence => {
    const text = sentence.original;
    return mergeLocMatchGroups([
      regexMatchLocs(text, /[零一二三四五六七八九十百千万亿两0-9](个)/),
      graphMatch(
        sentence.tokens,
        new Edge(
          { type: 'nummod' },
          new Node({ filter: and(pos('M'), word('个')), capture: true })
        )
      ),
    ]);
  },
  examples: [
    {
      zh: '一个人',
      en: 'one person',
      src: allSetSrc,
    },
    {
      zh: '四个朋友',
      en: 'four friends',
      src: allSetSrc,
    },
    {
      zh: '三个苹果手机',
      en: 'three iPhones',
      src: allSetSrc,
    },
    {
      zh: '五个星期',
      en: 'five weeks',
      src: allSetSrc,
    },
    {
      zh: '六个月',
      en: 'six months',
      src: allSetSrc,
    },
    {
      zh: '两个老婆',
      en: 'two wives',
      src: allSetSrc,
    },
    {
      zh: '十个男人，七个傻，八个坏。',
      en: 'Ten men: seven are fools, and eight are bad.',
      src: allSetSrc,
    },
    {
      zh: '他是个老外。',
      en: 'He is a foreigner.',
      src: allSetSrc,
    },
    {
      zh: '我有个儿子。',
      en: 'I have a son.',
      src: allSetSrc,
    },
    {
      zh: '她是个好老师。',
      en: 'She is a good teacher.',
      src: allSetSrc,
    },
    {
      zh: '你想吃个包子吗？',
      en: 'Would you like to eat a stuffed steamed bun?',
      src: allSetSrc,
    },
    {
      zh: '老师，我有个问题。',
      en: 'Teacher, I have a question.',
      src: allSetSrc,
    },
  ],
};
