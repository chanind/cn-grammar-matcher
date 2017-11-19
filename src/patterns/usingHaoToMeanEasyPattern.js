const { and, pos, word } = require('../lib/tokenFilters');
const { mergeLocMatchGroups } = require('../lib/matching/utils');
const { Node, Edge, graphMatch } = require('../lib/matching/graphMatch');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGJQU93',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'usingHaoToMeanEasy',
  structures: ['好 + Verb', 'Subj. + (很) 好 + Verb'],
  description:
    'Of course 好 (hǎo) means "good." But it can also be used to express that something is "easy to do" or "good to do." And it is quite... easy to do! All you need to do is place a 好 (hǎo) before a verb.',
  sources: [allSetSrc],
  match: sentence =>
    mergeLocMatchGroups([
      graphMatch(
        sentence.tokens,
        new Node({ filter: and(pos('V.'), word('好.+')), capture: '好' })
      ),
      graphMatch(
        sentence.tokens,
        new Node({ filter: and(pos('VA|JJ'), word('好')), capture: true }, [
          new Edge({ type: 'compound:vc|conj' }, new Node({ filter: pos('VV') })),
        ])
      ),
    ]),
  examples: [
    {
      zh: '这个词的意思很好懂。',
      en: 'The meaning of this word is easy to understand.',
      src: allSetSrc,
    },
    {
      zh: '这个汉字很好写。',
      en: 'This Chinese character is easy to write.',
      src: allSetSrc,
    },
    {
      zh: '三明治很好做。',
      en: 'Sandwiches are easy to make.',
      src: allSetSrc,
    },
    {
      zh: '苹果手机现在很好买。',
      en: 'iPhones are easy to buy now.',
      src: allSetSrc,
    },
    {
      zh: '这个笔很好用。',
      en: 'This pen is easy to use.',
      src: allSetSrc,
    },
    {
      zh: '好吃',
      en: 'good to taste, good to eat, delicious',
      src: allSetSrc,
    },
    {
      zh: '好喝',
      en: 'good to taste, good to drink',
      src: allSetSrc,
    },
    {
      zh: '好看',
      en: 'good to look at, good-looking, attractive',
      src: allSetSrc,
    },
    {
      zh: '好听',
      en: 'good to listen to, pleasant to listen to, good-sounding',
      src: allSetSrc,
    },
    {
      zh: '好玩',
      en: 'fun',
      src: allSetSrc,
    },
    {
      zh: '这首歌很好听。',
      en: 'This song is great.',
      src: allSetSrc,
    },
    {
      zh: '这种茶很好闻。',
      en: 'This kind of tea smells good.',
      src: allSetSrc,
    },
    {
      zh: '你的新包很好看。',
      en: 'Your new bag looks good.',
      src: allSetSrc,
    },
    {
      zh: '妈妈做的菜很好吃。',
      en: 'The food mom makes is delicious.',
      src: allSetSrc,
    },
    {
      zh: '我觉得上海很好玩。',
      en: 'I think Shanghai is a lot of fun.',
      src: allSetSrc,
    },
  ],
};
