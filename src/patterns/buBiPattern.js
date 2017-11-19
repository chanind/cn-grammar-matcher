const { and, pos, word } = require('../lib/tokenFilters');
const { regexMatchTokens } = require('../lib/matching/regexMatch');
const { locsFromTokens } = require('../lib/matching/utils');
const { mergeLocMatchGroups } = require('../lib/matching/utils');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASG8DVSO',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'buBi',
  structures: ['Subj. + 不比 + Noun + Adj. / Verb'],
  description:
    'You might wonder why you have 不比 (bù bǐ) for negative comparisons when you already have 没有 (méiyǒu) for comparisons. The answer is that they\'re not exactly the same thing! 没有 should be your "go to word" for expressing "not as... as...," but there are cases where 不比 (in all of its subtle glory) is a better choice.',
  sources: [allSetSrc],
  match: sentence => {
    const tokens = sentence.tokens;
    return mergeLocMatchGroups([
      locsFromTokens(
        regexMatchTokens(tokens, '(:bu:)(:bi:)', {
          bu: and(word('不'), pos('AD')),
          bi: and(word('比'), pos('P')),
        })
      ),
    ]);
  },
  examples: [
    {
      zh: '这个老师不比他的学生聪明。',
      en: 'The teacher is not smarter than his students.',
      src: allSetSrc,
    },
    {
      zh: '明星的生活不比普通人容易。',
      en: "Those stars' life is not easier than the folks'.",
      src: allSetSrc,
    },
    {
      zh: '我不比你适应现代都市生活。',
      en: 'I am not more accustomed to the life in modern cities than you.',
      src: allSetSrc,
    },
    {
      zh: '我不比你翻译得好。',
      en: "I don't translate as well as you do.",
      src: allSetSrc,
    },
  ],
};
