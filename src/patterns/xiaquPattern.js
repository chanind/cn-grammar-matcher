const { and, pos, word } = require('../lib/tokenFilters');
const { regexMatchTokens } = require('../lib/matching/regexMatch');
const { mergeLocMatchGroups, locsFromTokens } = require('../lib/matching/utils');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASG1PTJX',
  name: 'AllSet Chinese Grammar Wiki',
};

// TODO: Add more to this matcher, specifically "going down"

module.exports = {
  id: 'xiaqu',
  structures: ['Subj. + Verb + 下去', 'Subj. + Verb + 不 + 下去'],
  description:
    '下去 (xiàqù) is one of the most often heard result complements. 下去 can be used as a result complement to talk about things continuing or carrying on. Think of it as a figurative way of "keeping the ball rolling" (downhill).',
  sources: [allSetSrc],
  match: sentence =>
    mergeLocMatchGroups([
      locsFromTokens(
        regexMatchTokens(sentence.tokens, ':verb::bu:?(:xiaqu:)', {
          verb: pos('VV'),
          bu: and(pos('AD'), word('不')),
          xiaqu: and(pos('VV'), word('下去')),
        })
      ),
    ]),
  examples: [
    {
      zh: '这个故事太无聊了，我听不下去了。',
      en: "This story is too boring, I can't keep listening to it.",
      src: allSetSrc,
    },
    {
      zh: '这个菜很难吃,我吃不下去。',
      en: "This food is disgusting, I can't keep eating it.",
      src: allSetSrc,
    },
    {
      zh: '这个电影画面太残忍了，我看不下去了！',
      en: "This scene in the movie is too cruel, I can't keep watching it.",
      src: allSetSrc,
    },
  ],
};
