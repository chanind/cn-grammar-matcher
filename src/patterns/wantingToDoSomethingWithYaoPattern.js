const { and, pos, word } = require('../lib/tokenFilters');
const { regexMatchTokens } = require('../lib/matching/regexMatch');
const {
  mergeLocMatchGroups,
  excludeMatchesFromPattern,
  locsFromTokens,
} = require('../lib/matching/utils');
const expressingBeGoingToWithYaoPattern = require('./expressingBeGoingToWithYaoPattern');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGXVEAR',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'wantingToDoSomethingWithYao',
  name: 'Subj. + 要 + Verb + Obj.',
  description:
    'The auxiliary verb 要 (yào) has several different meanings, and here we\'ll tackle the "want to" meaning. To express "wanting to do" something, use 要 (yào) before the verb.',
  sources: [allSetSrc],
  match: sentence => {
    const matches = mergeLocMatchGroups([
      locsFromTokens(
        regexMatchTokens(sentence.tokens, '(:yao:):verb:', {
          yao: and(word('要'), pos('VV')),
          verb: pos('VV'),
        })
      ),
    ]);
    return excludeMatchesFromPattern(
      sentence,
      expressingBeGoingToWithYaoPattern,
      matches
    );
  },
  examples: [
    {
      zh: '他要学中文。',
      en: 'He wants to study Chinese.',
      src: allSetSrc,
    },
    {
      zh: '宝宝要睡觉。',
      en: 'The baby wants to sleep.',
      src: allSetSrc,
    },
    {
      zh: '早饭我要吃肉。',
      en: 'For breakfast I want to eat meat.',
      src: allSetSrc,
    },
    {
      zh: '今天很累，我要休息。',
      en: "Today I'm very tired. I want to rest.",
      src: allSetSrc,
    },
    {
      zh: '我要喝咖啡。',
      en: 'I want to drink coffee.',
      src: allSetSrc,
    },
    {
      zh: '你要吃什么？',
      en: 'What do you want to eat?',
      src: allSetSrc,
    },
  ],
};
