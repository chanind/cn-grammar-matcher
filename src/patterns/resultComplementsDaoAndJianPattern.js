const { and, pos, word } = require('../lib/tokenFilters');
const { mergeLocMatchGroups } = require('../lib/matching/utils');
const { Node, graphMatch } = require('../lib/matching/graphMatch');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGWNGEP',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'resultComplementsDaoAndJian',
  // TODO: improve description
  structures: [
    'Subj. + Verb + 到 + Obj.',
    'Subj. + Verb + 见 + Obj.',
    'Subj. + 没 + Verb + 到 / 见 + Obj.',
  ],
  description:
    'Two of the most common result complements in Chinese are 到 (dào) and 见 (jiàn). On this page we\'re only going to be talking about verbs related to the senses ("see," "hear," etc.), and for this usage, the two are interchangeable.',
  sources: [allSetSrc],
  match: sentence =>
    mergeLocMatchGroups([
      graphMatch(
        sentence.tokens,
        new Node({ filter: and(pos('V.'), word('.+[到见]')), capture: '到见' })
      ),
    ]),
  examples: [
    {
      zh: '你看到那个帅哥了吗？',
      en: 'Did you see that handsome guy?',
      src: allSetSrc,
    },
    {
      zh: '我看到了。',
      en: 'I saw it.',
      src: allSetSrc,
    },
    {
      zh: '你听到了吗？',
      en: 'Did you hear it?',
      src: allSetSrc,
    },
    {
      zh: '你没看见那个帅哥吗？',
      en: "You didn't see that handsome guy?",
      src: allSetSrc,
    },
    {
      zh: '我没有看见。',
      en: "I didn't see it.",
      src: allSetSrc,
    },
    {
      zh: '你没听见吗？',
      en: "You didn't hear it?",
      src: allSetSrc,
    },
  ],
};
