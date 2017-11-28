const { and, pos, word } = require('../lib/tokenFilters');
const { mergeLocMatchGroups } = require('../lib/matching/utils');
const { Node, Edge, graphMatch } = require('../lib/matching/graphMatch');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGWCESP',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'yixia',
  // TODO: improve description
  structures: ['Subj. + Verb + 一下 + Obj.'],
  description:
    'After briefly reading this article, you will know how to use 一下 (yīxià) to express a brief action!',
  sources: [allSetSrc],
  match: sentence =>
    mergeLocMatchGroups([
      graphMatch(
        sentence.tokens,
        new Node({ filter: pos('V.') }, [
          new Edge(
            { type: 'advmod' },
            new Node({ filter: and(pos('AD'), word('一下')), capture: true })
          ),
        ])
      ),
    ]),
  examples: [
    {
      zh: '请你等一下。',
      en: 'Please wait a little bit.',
      src: allSetSrc,
    },
    {
      zh: '你看一下。',
      en: 'Take a look.',
      src: allSetSrc,
    },
    {
      zh: '试一下吧。',
      en: 'Try it.',
      src: allSetSrc,
    },
    {
      zh: '我要想一下。',
      en: 'I want to think a little.',
      src: allSetSrc,
    },
    {
      zh: '开一下门吧。',
      en: 'Please open the door.',
      src: allSetSrc,
    },
    {
      zh: '请你说一下为什么。',
      en: 'Please say why.',
      src: allSetSrc,
    },
    {
      zh: '不要生气了，笑一下！',
      en: "Don't be mad, laugh!",
      src: allSetSrc,
    },
    {
      zh: '宝宝，亲一下爸爸。',
      en: 'Baby, give your dad a kiss.',
      src: allSetSrc,
    },
    {
      zh: '你可以来一下我的办公室吗？',
      en: 'Could you please come to my office?',
      src: allSetSrc,
    },
    {
      zh: '你能介绍一下自己吗？',
      en: 'Could you introduce yourself briefly?',
      src: allSetSrc,
    },
  ],
};
