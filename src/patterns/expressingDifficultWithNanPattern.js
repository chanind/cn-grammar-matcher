const { and, pos, word } = require('../lib/tokenFilters');
const { mergeLocMatchGroups } = require('../lib/matching/utils');
const { Node, Edge, graphMatch } = require('../lib/matching/graphMatch');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASG35T4H',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'expressingDifficultWithNan',
  structures: ['Subj. + (很) 难 + Verb', 'Subj. + (很) 难 + [Sense Verb]'],
  description:
    '难 (nán) is an adjective that means "difficult." When something is "hard to do" (as in difficult), the word 难 (nán) can be used before the verb.',
  sources: [allSetSrc],
  match: sentence =>
    mergeLocMatchGroups([
      graphMatch(
        sentence.tokens,
        new Node({ filter: and(pos('V.'), word('难.+')), capture: '难' })
      ),
      graphMatch(
        sentence.tokens,
        new Node({ filter: pos('VV') }, [
          new Edge(
            { type: 'advmod' },
            new Node({ filter: and(pos('AD'), word('难')), capture: true })
          ),
        ])
      ),
    ]),
  examples: [
    {
      zh: '这句话很难懂。',
      en: 'This sentence is hard to understand.',
      src: allSetSrc,
    },
    {
      zh: '汉语很难学。',
      en: 'Mandarin is hard to learn.',
      src: allSetSrc,
    },
    {
      zh: '中国菜很难做。',
      en: 'Chinese food is hard to make.',
      src: allSetSrc,
    },
    {
      zh: '这个东西现在很难买。',
      en: 'This thing is really difficult to purchase now.',
      src: allSetSrc,
    },
    {
      zh: '这个汉字很难写。',
      en: 'This character is very difficult to write.',
      src: allSetSrc,
    },
    {
      zh: '你做的菜很难吃。',
      en: 'The dishes you cook taste bad.',
      src: allSetSrc,
    },
    {
      zh: '这里的咖啡很难喝。',
      en: 'The coffee here tastes bad.',
      src: allSetSrc,
    },
    {
      zh: '这首歌很难听。',
      en: 'This song is terrible (hard to listen to).',
      src: allSetSrc,
    },
    {
      zh: '这种花很难闻。',
      en: 'This kind of flower smells bad.',
      src: allSetSrc,
    },
    {
      zh: '这件衣服很难看吗？',
      en: 'Is this article of clothing ugly?',
      src: allSetSrc,
    },
  ],
};
