const { and, pos, word } = require('../lib/tokenFilters');
const {
  mergeLocMatchGroups,
  excludeMatchesFromPattern,
} = require('../lib/matching/utils');
const { Node, graphMatch } = require('../lib/matching/graphMatch');
const concedingWithBaPattern = require('./concedingWithBaPattern');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGMPZ6D',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'suggestionsWithBa',
  structures: ['Command + 吧'],
  description:
    "The particle 吧 (ba) has a number of different uses. Here we'll talk about the simplest way to use 吧 (ba): making suggestions.",
  sources: [allSetSrc],
  match: sentence => {
    const matches = mergeLocMatchGroups([
      graphMatch(
        sentence.tokens,
        new Node({ filter: and(pos('V.'), word('.吧')), capture: '吧' })
      ),
      graphMatch(
        sentence.tokens,
        new Node({ filter: and(pos('SP'), word('吧')), capture: '吧' })
      ),
    ]);
    return excludeMatchesFromPattern(sentence, concedingWithBaPattern, matches);
  },
  examples: [
    {
      zh: '我们走吧。',
      en: "Let's go.",
      src: allSetSrc,
    },
    {
      zh: '你说吧。',
      en: 'You say it.',
      src: allSetSrc,
    },
    {
      zh: '快点吃吧。',
      en: 'Hurry up and eat.',
      src: allSetSrc,
    },
    {
      zh: '给我两个吧。',
      en: 'Give me two.',
      src: allSetSrc,
    },
    {
      zh: '喝水吧。',
      en: 'Have some water.',
      src: allSetSrc,
    },
    {
      zh: '我们去香港吧。',
      en: "Let's go to Hong Kong.",
      src: allSetSrc,
    },
    {
      zh: '我们六点去吧？',
      en: "We're going at 6 o'clock (right)?",
      src: allSetSrc,
    },
    {
      zh: '休息一下吧。',
      en: 'Take a break.',
      src: allSetSrc,
    },
    {
      zh: '我们结婚吧。',
      en: "Let's get married.",
      src: allSetSrc,
    },
    {
      zh: '老板，便宜一点吧。',
      en: 'Boss, can you make it cheaper?',
      src: allSetSrc,
    },
  ],
};
