const { mergeLocMatchGroups } = require('../lib/matching/utils');
const { and, pos, word } = require('../lib/tokenFilters');
const { Node, graphMatch } = require('../lib/matching/graphMatch');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASG9YK09',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'theAllAdverbDou',
  name: 'Subj. + 都 + [Verb Phrase]',
  description:
    'The adverb 都 (dōu) is used to express "all" in Chinese. It\'s common to use 都 (dōu) in a variety of sentences where it would seem unnecessary in English.',
  sources: [allSetSrc],
  match: sentence =>
    mergeLocMatchGroups([
      graphMatch(
        sentence.tokens,
        new Node({ filter: and(pos('AD'), word('都')), capture: true })
      ),
    ]),
  examples: [
    {
      zh: '你们都认识John吗？',
      en: 'Do you all know John?',
      src: allSetSrc,
    },
    {
      zh: '他们都在上海。',
      en: 'They are all in Shanghai.',
      src: allSetSrc,
    },
    {
      zh: '明天我们都可以去。',
      en: 'Tomorrow we all can go.',
      src: allSetSrc,
    },
    {
      zh: '你们都用wiki吗？',
      en: 'Do you all use the wiki?',
      src: allSetSrc,
    },
    {
      zh: '我们都要冰水。',
      en: 'We all want ice water.',
      src: allSetSrc,
    },
    {
      zh: '我们两个都爱你。',
      en: 'The two of us both love you.',
      src: allSetSrc,
    },
    {
      zh: '你爸爸和你妈妈都是美国人吗？',
      en: 'Are your father and your mother both Americans?',
      src: allSetSrc,
    },
    {
      zh: '我和我太太都不吃肉。',
      en: 'Neither my wife nor I eat meat.',
      src: allSetSrc,
    },
    {
      zh: '你们两个都喜欢中国菜吗？',
      en: 'Do you both like Chinese food?',
      src: allSetSrc,
    },
    {
      zh: '她和她老公都没有工作。',
      en: 'Neither she nor her husband has a job.',
      src: allSetSrc,
    },
  ],
};
