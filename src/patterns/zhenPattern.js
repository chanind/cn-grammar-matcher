const { and, pos, word } = require('../lib/tokenFilters');
const { mergeLocMatchGroups } = require('../lib/matching/utils');
const { Node, Edge, graphMatch } = require('../lib/matching/graphMatch');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGC885D',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'zhen',
  structures: ['真 + Adj.', '真 + Verb'],
  description: 'As an adverb, the word 真 (zhēn) means "really" or "truly."',
  sources: [allSetSrc],
  match: sentence =>
    mergeLocMatchGroups([
      graphMatch(
        sentence.tokens,
        new Edge(
          { type: 'advmod', ahead: true },
          new Node({ filter: and(pos('AD'), word('真')), capture: true })
        )
      ),
    ]),
  examples: [
    {
      zh: '你女朋友真漂亮！',
      en: 'Your girlfriend is really pretty!',
      src: allSetSrc,
    },
    {
      zh: '他家真有钱！',
      en: 'His family is really rich!',
      src: allSetSrc,
    },
    {
      zh: '小狗真可爱！',
      en: 'This puppy is really cute!',
      src: allSetSrc,
    },
    {
      zh: '今天真热！',
      en: "It's truly hot today!",
      src: allSetSrc,
    },
    {
      zh: '我真喜欢住在中国！',
      en: 'I really like living in China!',
      src: allSetSrc,
    },
    {
      zh: '我真讨厌这种男人！',
      en: 'I really hate this kind of guy!',
      src: allSetSrc,
    },
    {
      zh: '你真会说话！',
      en: 'You are so good with words!',
      src: allSetSrc,
    },
    {
      zh: '你真能吃！',
      en: 'You ate so much!',
      src: allSetSrc,
    },
  ],
};
