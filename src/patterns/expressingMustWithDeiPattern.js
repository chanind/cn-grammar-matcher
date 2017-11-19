const { and, pos, word } = require('../lib/tokenFilters');
const { regexMatchTokens } = require('../lib/matching/regexMatch');
const {
  mergeLocMatchGroups,
  locsFromTokens,
  filterMatches,
} = require('../lib/matching/utils');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGPXLP9',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'expressingMustWithDei',
  structures: ['Subj. + 得 + Verb + Obj.'],
  description:
    'Learning how to use 得 to mean "must" must be done by those wishing to master Chinese!',
  sources: [allSetSrc],
  match: sentence => {
    const matches = mergeLocMatchGroups([
      locsFromTokens(
        regexMatchTokens(sentence.tokens, '(:dei:):verb:', {
          dei: and(pos('VV'), word('得')),
          verb: pos('VV'),
        })
      ),
      locsFromTokens(
        regexMatchTokens(sentence.tokens, '(:deiInVerb:)', {
          deiInVerb: and(pos('VV'), word('得.+')),
        }),
        '得'
      ),
    ]);
    const newMatches = filterMatches(matches, match => {
      for (const loc of match) {
        if (sentence.text.slice(loc.start, loc.end + 1) === '得到') {
          return false;
        }
      }
      return true;
    });
    return newMatches;
  },
  examples: [
    {
      zh: '时间不早了，我得回家了。',
      en: "It's getting late. I have to go home.",
      src: allSetSrc,
    },
    {
      zh: '你病得太严重了，得去看医生。',
      en: 'You are badly ill. You need to go see a doctor.',
      src: allSetSrc,
    },
    {
      zh: '朋友们都在等，我们得走了。',
      en: 'Our friends are waiting, we need to go.',
      src: allSetSrc,
    },
    // {
    //   zh: '这个方法不行，你得换个方法。',
    //   en: 'This way doesn\'t work. You need to find another way.',
    //   src: allSetSrc,
    // },
    {
      zh: '我没带钥匙，你得回来帮我开门。',
      en: 'I forgot my keys. You need to come back to help me open the door.',
      src: allSetSrc,
    },
  ],
};
