const { pos, word } = require('../lib/tokenFilters');
const { regexMatchTokens } = require('../lib/matching/regexMatch');
const { mergeLocMatchGroups, locsFromTokens } = require('../lib/matching/utils');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGBPXOB',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'qilai',
  structures: ['Verb + 起来', 'Verb / Adj. + 起来 +了', 'Subj. + Verb + 起来 + Adj.'],
  description:
    '起来 (qǐlái) comes up very frequently in Chinese and can be used both literally and figuratively. This is a little like the usage of "up" in English which can be used literally, as in "stand up," or figuratively, as in "add up."',
  sources: [allSetSrc],
  match: sentence =>
    mergeLocMatchGroups([
      locsFromTokens(
        regexMatchTokens(sentence.tokens, '(:prefixQilai:)', {
          prefixQilai: word('.起来'),
        }),
        '起来'
      ),
      locsFromTokens(
        regexMatchTokens(sentence.tokens, ':verb:(:qilai:)', {
          verb: pos('VV|VA'),
          qilai: word('起来'),
        }),
        '起来'
      ),
    ]),
  examples: [
    {
      zh: '请大家站起来。',
      en: 'Everyone, please stand up.',
      src: allSetSrc,
    },
    {
      zh: '快把地上的书捡起来。',
      en: 'Quickly pick up the books on the floor.',
      src: allSetSrc,
    },
    {
      zh: '你怎么不把老人扶起来？',
      en: "Why didn't you keep the old man upright?",
      src: allSetSrc,
    },
    {
      zh: '别动！把手举起来。',
      en: "Don't move! Put your hands up.",
      src: allSetSrc,
    },
    {
      zh: '大家笑起来了。',
      en: 'Everyone started laughing.',
      src: allSetSrc,
    },
    {
      zh: '宝宝哭起来了。',
      en: 'The baby started crying.',
      src: allSetSrc,
    },
    {
      zh: '两个大妈吵起来了。',
      en: 'Two middle-aged ladies started arguing.',
      src: allSetSrc,
    },
    // TODO: this is parsing incorrectly
    // {
    //   zh: '天气热起来了。',
    //   en: 'It\'s starting to get hot.',
    //   src: allSetSrc,
    // },
    {
      zh: '他的病好起来了。',
      en: 'His illness is starting to get better.',
      src: allSetSrc,
    },
    {
      zh: '他看起来很友好。',
      en: 'He looks very friendly.',
      src: allSetSrc,
    },
    {
      zh: '这件事情听起来有点复杂。',
      en: 'This matter sounds a little bit complex.',
      src: allSetSrc,
    },
    {
      zh: '你点的菜尝起来不错。',
      en: 'The dishes that you ordered taste good .',
      src: allSetSrc,
    },
    {
      zh: '这件衣服摸起来很舒服。',
      en: 'These clothes feel very comfortable.',
      src: allSetSrc,
    },
  ],
};
