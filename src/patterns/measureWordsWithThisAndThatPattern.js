const { and, pos, word } = require('../lib/tokenFilters');
const { mergeLocMatchGroups } = require('../lib/matching/utils');
const { Node, Edge, graphMatch } = require('../lib/matching/graphMatch');
const { regexMatchLocs } = require('../lib/matching/regexMatch');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGZC42B',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'measureWordsWithThisAndThat',
  structures: ['这 / 那 + Measure Word + Noun'],
  description:
    'In English, when you refer to "this table" or "that girl" you only need two words: "this" or "that" plus the noun you\'re referring to.  In Chinese, though, you also need a measure word in the middle between the two.  In the very beginning you can get away with using 个 (gè) for everything, but pretty soon you\'re going to have to start using other measure words in these simple phrases.',
  sources: [allSetSrc],
  match: sentence =>
    mergeLocMatchGroups([
      graphMatch(
        sentence.tokens,
        new Node({ filter: and(pos('DT'), word('这|那')), capture: '这那' }, [
          new Edge({ type: 'mark:clf' }, new Node({ filter: pos('M') })),
        ])
      ),
      // manually overfitting for common measure words
      regexMatchLocs(sentence.original, /([这那])[个件本条]/),
    ]),
  examples: [
    {
      zh: '那个人',
      en: 'that person',
      src: allSetSrc,
    },
    {
      zh: '这本书',
      en: 'this book',
      src: allSetSrc,
    },
    {
      zh: '那件事',
      en: 'that matter (in the sense of business, affair, or thing)',
      src: allSetSrc,
    },
    {
      zh: '这瓶啤酒',
      en: 'this bottle of beer',
      src: allSetSrc,
    },
    {
      zh: '那个房间',
      en: 'that room',
      src: allSetSrc,
    },
    {
      zh: '那台电脑',
      en: 'that new computer',
      src: allSetSrc,
    },
    {
      zh: '这只猫',
      en: 'that cat',
      src: allSetSrc,
    },
    {
      zh: '那条河',
      en: 'that river',
      src: allSetSrc,
    },
    {
      zh: '这件衣服',
      en: 'this piece of clothing',
      src: allSetSrc,
    },
  ],
};
