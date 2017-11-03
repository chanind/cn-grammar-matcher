const { and, pos, word } = require('../lib/tokenFilters');
const { regexMatchTokens } = require('../lib/matching/regexMatch');
const { mergeLocMatchGroups, locsFromTokens } = require('../lib/matching/utils');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASG9B0M8',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'doingSomethingLessWithShao',
  name: 'Subj. + 少 + Verb + Obj.',
  description:
    'Often heard when scolding or giving advice (like when parents talk to children) is 少 (shǎo), which can mean "to do less of something."',
  sources: [allSetSrc],
  match: sentence =>
    mergeLocMatchGroups([
      locsFromTokens(
        regexMatchTokens(sentence.tokens, '(:shao:):verb:', {
          shao: and(pos('AD'), word('少')),
          verb: pos('VV'),
        })
      ),
      locsFromTokens(
        regexMatchTokens(sentence.tokens, '(:shaoInVerb:)', {
          shaoInVerb: and(pos('VV'), word('少.+')),
        }),
        '少'
      ),
    ]),
  examples: [
    {
      zh: '废话少说！',
      en: 'Speak less nonsense!',
      src: allSetSrc,
    },
    {
      zh: '你应该少抽烟！',
      en: 'You should smoke less!',
      src: allSetSrc,
    },
    {
      zh: '学中文的学生需要少说英文。',
      en: 'Students learning Chinese need to speak English less.',
      src: allSetSrc,
    },
  ],
};
