const { and, pos, word } = require('../lib/tokenFilters');
const { Node, Edge, graphMatch } = require('../lib/matching/graphMatch');
const { regexMatchTokens } = require('../lib/matching/regexMatch');
const { mergeLocMatchGroups, locsFromTokens } = require('../lib/matching/utils');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGGL59D',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'expressingWhenWithShi',
  structures: ['(Subj. +) Verb / Adj. + 时⋯⋯'],
  description:
    'By now you should now how to express "when" using "的时候" (de shíhou). But there\'s also a slightly shorter, more formal way to do it: simply use 时 (shí) all by itself. (No 的!)',
  sources: [allSetSrc],
  match: sentence =>
    mergeLocMatchGroups([
      graphMatch(
        sentence.tokens,
        new Edge(
          { type: 'case' },
          new Node({ filter: and(pos('LC'), word('时')), capture: true })
        )
      ),
      // manually overfitting to match examples, not ideal...
      locsFromTokens(
        regexMatchTokens(sentence.tokens, '(:shibu:)', {
          shibu: and(pos('AD'), word('时不')),
        }),
        '时'
      ),
    ]),
  examples: [
    {
      zh: '考试时不要说话。',
      en: "When you take a test, don't talk.",
      src: allSetSrc,
    },
    {
      zh: '面试时我经常会问这个问题。',
      en: 'I often ask this question in a job interview.',
      src: allSetSrc,
    },
    {
      zh: '会议结束时老板才来。',
      en: 'The boss showed up when the meeting was over.',
      src: allSetSrc,
    },
    {
      zh: '我生气时不想说话。',
      en: "I don't want to talk when I'm angry.",
      src: allSetSrc,
    },
    {
      zh: '他们结婚时什么都没有。',
      en: "They've got nothing when they got married.",
      src: allSetSrc,
    },
    {
      zh: '大学毕业时，他们分手了。',
      en: 'When they graduated, they broke up.',
      src: allSetSrc,
    },
    {
      zh: '飞机起飞时，他关了手机和电脑。',
      en: 'When the plane took off, he turned off his cell phone and computer.',
      src: allSetSrc,
    },
    {
      zh: '他去世时儿女都不在身边。',
      en: "His parents weren't home when he passed away.",
      src: allSetSrc,
    },
    {
      zh: '我们公司成立时只有三个人。',
      en: 'There were only three people when this company was founded.',
      src: allSetSrc,
    },
    {
      zh: '跟父母说话时不要玩手机。',
      en: 'Stop playing with your cell phone when you talk with your parents.',
      src: allSetSrc,
    },
  ],
};
