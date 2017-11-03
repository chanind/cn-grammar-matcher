const { and, pos, word } = require('../lib/tokenFilters');
const { regexMatchTokens } = require('../lib/matching/regexMatch');
const { mergeLocMatchGroups, locsFromTokens } = require('../lib/matching/utils');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGLKGZP',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'doingSomethingMoreWithDuo',
  name: '多 + Verb + Obj.',
  description:
    "In China, you often hear you should do this or that more (eat more, drink more water, wear more warm clothing etc.), and they often use the word 多 (duō). What's not intuitive to learners is that the word 多 should come before the verb.",
  sources: [allSetSrc],
  match: sentence =>
    mergeLocMatchGroups([
      locsFromTokens(
        regexMatchTokens(sentence.tokens, '(:duo:):verb:', {
          duo: and(pos('AD'), word('多')),
          verb: pos('VV'),
        })
      ),
      locsFromTokens(
        regexMatchTokens(sentence.tokens, '(:duoInVerb:)', {
          duoInVerb: and(pos('VV'), word('多.+')),
        }),
        '多'
      ),
    ]),
  examples: [
    {
      zh: '多吃点。',
      en: 'Eat a little more.',
      src: allSetSrc,
    },
    {
      zh: '多喝热水。',
      en: 'Drink more hot water.',
      src: allSetSrc,
    },
    {
      zh: '多喝啤酒吧！',
      en: 'Drink some more beer!',
      src: allSetSrc,
    },
    {
      zh: '我应该多运动。',
      en: 'I should exercise more.',
      src: allSetSrc,
    },
  ],
};
