const { and, pos, word } = require('../lib/tokenFilters');
const { mergeLocMatchGroups } = require('../lib/matching/utils');
const { Node, Edge, graphMatch } = require('../lib/matching/graphMatch');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASG9W0UX',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'buyao',
  structures: ['别 + Verb (+ Obj.)'],
  description:
    'Instead of saying "do not" with 不要 (bùyào), we can say "don\'t" a little more quickly and forcefully by using 别 (bié).',
  sources: [allSetSrc],
  match: sentence =>
    mergeLocMatchGroups([
      graphMatch(
        sentence.tokens,
        new Node({ filter: and(pos('VV'), word('别.+')), capture: true })
      ),
      graphMatch(
        sentence.tokens,
        new Edge(
          { ahead: true, type: 'advmod' },
          new Node({ filter: and(pos('AD'), word('别')), capture: true })
        )
      ),
    ]),
  examples: [
    {
      zh: '别走。',
      en: "Don't leave.",
      src: allSetSrc,
    },
    {
      zh: '别说话！',
      en: "Don't speak!",
      src: allSetSrc,
    },
    {
      zh: '别笑！',
      en: "Don't laugh!",
      src: allSetSrc,
    },
    {
      zh: '别动！',
      en: "Don't move!",
      src: allSetSrc,
    },
    {
      zh: '别过来！',
      en: "Don't come over here!",
      src: allSetSrc,
    },
    {
      zh: '别打孩子！',
      en: "Don't hit the child!",
      src: allSetSrc,
    },
    {
      zh: '别喝太多。',
      en: "Don't drink too much.",
      src: allSetSrc,
    },
    {
      zh: '喝酒以后别开车。',
      en: "After drinking alcohol, don't drive.",
      src: allSetSrc,
    },
    {
      zh: '吃饭的时候别玩手机。',
      en: "When eating, don't play with your cell phone.",
      src: allSetSrc,
    },
    {
      zh: '上课的时候别说英文。',
      en: "Don't speak English in class.",
      src: allSetSrc,
    },
  ],
};
