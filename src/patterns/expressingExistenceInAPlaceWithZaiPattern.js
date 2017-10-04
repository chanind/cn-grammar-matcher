const { pos, word } = require('../lib/tokenFilters');
const { regexMatchTokens, regexMatchLocs } = require('../lib/matching/regexMatch');
const { mergeLocMatchGroups, locsFromTokens } = require('../lib/matching/utils');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGLRWT8',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'expressingExistenceInAPlaceWithZai',
  name: 'Subj. + 在 + Place',
  description:
    'The verb 在 (zài) expresses existence in a location, similar to how we say in English, "to be at" or "to be in."',
  sources: [allSetSrc],
  match: sentence =>
    mergeLocMatchGroups([
      locsFromTokens(
        regexMatchTokens(sentence.tokens, '(:zai:):place:', {
          zai: word('在'),
          place: pos('N.'),
        })
      ),
      // manual overfitting...
      regexMatchLocs(sentence.original, /(在)家/),
    ]),
  examples: [
    {
      zh: '我在上海。',
      en: "I'm in Shanghai.",
      src: allSetSrc,
    },
    {
      zh: '他们在英国。',
      en: "They're in England.",
      src: allSetSrc,
    },
    {
      zh: '老板在外面。',
      en: 'The boss  is outside.',
      src: allSetSrc,
    },
    {
      zh: '他不在学校。',
      en: "He's not at school.",
      src: allSetSrc,
    },
    {
      zh: '她现在在家吗？',
      en: 'Is she at home now?',
      src: allSetSrc,
    },
    {
      zh: '你在公司吗？',
      en: 'Are you at the office?',
      src: allSetSrc,
    },
    {
      zh: '老师不在办公室吗？',
      en: 'Is the teacher not in the office?',
      src: allSetSrc,
    },
    {
      zh: '谁在楼上？',
      en: 'Who is upstairs?',
      src: allSetSrc,
    },
    {
      zh: '我和朋友在酒吧。',
      en: "I'm with a friend at a bar.",
      src: allSetSrc,
    },
    {
      zh: '你们明天在北京吗？',
      en: 'Are you in Beijing tomorrow?',
      src: allSetSrc,
    },
  ],
};
