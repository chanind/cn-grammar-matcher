const { and, pos, word } = require('../lib/tokenFilters');
const { mergeLocMatchGroups } = require('../lib/matching/utils');
const { Node, graphMatch } = require('../lib/matching/graphMatch');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGW9737',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'expressingWillWithHui',
  name: 'Subj. + 会 + Verb + Obj.',
  description:
    '会 (huì) has multiple uses, but in this context, it is being used to express the possibility of an action happening in the future.',
  sources: [allSetSrc],
  match: sentence =>
    mergeLocMatchGroups([
      graphMatch(
        sentence.tokens,
        new Node({ filter: and(pos('VV'), word('会')), capture: true })
      ),
    ]),
  examples: [
    {
      zh: '明天你会来吗？',
      en: 'Will you come tomorrow?',
      src: allSetSrc,
    },
    {
      zh: '他会来看你吗？',
      en: 'Will he come to see you?',
      src: allSetSrc,
    },
    {
      zh: '明天会下雨吗？',
      en: 'Will it rain tomorrow?',
      src: allSetSrc,
    },
    {
      zh: '我出去一下，很快会回来。',
      en: "I'm going out for a little while. I'll come back very soon.",
      src: allSetSrc,
    },
    {
      zh: '老板会同意吗？',
      en: 'Will the boss agree?',
      src: allSetSrc,
    },
    {
      zh: '你女儿会听你的话。',
      en: 'Your daughter will listen to you.',
      src: allSetSrc,
    },
    {
      zh: '下班以后，我会给你打电话。',
      en: 'After getting off work, I will give you a call.',
      src: allSetSrc,
    },
    {
      zh: '我们不会告诉你。',
      en: "We won't tell you.",
      src: allSetSrc,
    },
    {
      zh: '他不会跟你结婚。',
      en: "He won't marry you.",
      src: allSetSrc,
    },
    {
      zh: '今晚我不会在外面吃饭。',
      en: 'Tonight I will not eat out.',
      src: allSetSrc,
    },
  ],
};
