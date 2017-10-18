const { and, pos, word } = require('../lib/tokenFilters');
const { regexMatchTokens } = require('../lib/matching/regexMatch');
const { mergeLocMatchGroups, locsFromTokens } = require('../lib/matching/utils');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGVYIZT',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'buZenme',
  name: 'Subj. + 不怎么 + Adj.',
  description:
    'When you use 不怎么 (bù zěnme) before an adjective, it means "not very." This structure is similar to how English speakers may say something is "not very good."',
  sources: [allSetSrc],
  match: sentence =>
    mergeLocMatchGroups([
      locsFromTokens(
        regexMatchTokens(sentence.tokens, '(:buZenme:):adj:', {
          buZenme: and(pos('AD'), word('不怎么')),
          adj: pos('VA'),
        })
      ),
      locsFromTokens(
        regexMatchTokens(sentence.tokens, '(:bu::zenme:):adj:', {
          bu: and(pos('AD'), word('不')),
          zenme: and(pos('AD'), word('怎么')),
          adj: pos('VA'),
        })
      ),
    ]),
  examples: [
    {
      zh: '我觉得这个菜不怎么好吃。',
      en: "I think this food isn't very tasty.",
      src: allSetSrc,
    },
    {
      zh: '这个人不怎么大方。',
      en: "This person isn't very generous.",
      src: allSetSrc,
    },
    {
      zh: '这里的冬天不怎么冷。',
      en: "It's not very cold here in winter.",
      src: allSetSrc,
    },
    {
      zh: '他的工资不怎么高。',
      en: "His salary isn't very high.",
      src: allSetSrc,
    },
    {
      zh: '她家不怎么干净。',
      en: "Her house isn't very clean.",
      src: allSetSrc,
    },
    {
      zh: '这个词不怎么实用。',
      en: "This word isn't very practical.",
      src: allSetSrc,
    },
    {
      zh: '他工作的时候不怎么认真。',
      en: "He isn't very careful when he's at work.",
      src: allSetSrc,
    },
    {
      zh: '我的中文不怎么流利。',
      en: "My Chinese isn't very fluent.",
      src: allSetSrc,
    },
    {
      zh: '他们看起来不怎么高兴。',
      en: 'They seem not very happy.',
      src: allSetSrc,
    },
  ],
};
