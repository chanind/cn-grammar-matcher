const {
  and,
  not,
  or,
  pos,
  word,
} = require('../lib/tokenFilters');
const { regexMatchTokens, locsFromTokens } = require('../lib/regexMatchers');

const allSetSrc = 'https://resources.allsetlearning.com/chinese/grammar/Expressing_%22already%22_with_%22yijing%22';


module.exports = {
  id: 'yijing_le',
  name: '已经 ... 了 pattern',
  description: 'Pattern used to express something has already happened.',
  sources: [
    allSetSrc,
  ],
  match: (sentence) => {
    const yijing = and(pos('AD'), word('已经?'));
    return locsFromTokens(regexMatchTokens(sentence.tokens, '(:yijing:):notYijing:*(:le:)', {
      yijing,
      notYijing: not(yijing),
      le: or(word('了'), and(word('.+了'), pos('V.|P'))),
    }), /[已经了]+/);
  },
  examples: [
    {
      zh: '他们已经走了。',
      en: "They've already left.",
      src: allSetSrc,
    },
    {
      zh: '我已经有男朋友了。',
      en: 'I already have a boyfriend.',
      src: allSetSrc,
    },
    {
      zh: '宝宝已经会说话了。',
      en: 'The baby can already speak.',
      src: allSetSrc,
    },
    {
      zh: '妈妈已经回来了。',
      en: 'Mom has already come back.',
      src: allSetSrc,
    },
    {
      zh: '爸爸妈妈已经老了。',
      en: 'Mom and dad are already old.',
      src: allSetSrc,
    },
    {
      zh: '已经很晚了，我们走吧。',
      en: "It's already really late. Let's go.",
      src: allSetSrc,
    },
    {
      zh: '爷爷已经八十五岁了。',
      en: 'Grandpa is already eighty-five years old.',
      src: allSetSrc,
    },
    {
      zh: '已经9点了。',
      en: "It's already nine o'clock.",
      src: 'https://tatoeba.org/eng/sentences/search?from=cmn&to=eng&query=%E5%B7%B2%E7%BB%8F',
    },
  ],
};
