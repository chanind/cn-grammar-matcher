const { pos, word } = require('../lib/tokenFilters');
const { regexMatchTokens } = require('../lib/matching/regexMatch');
const { mergeLocMatchGroups, locsFromTokens } = require('../lib/matching/utils');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASG68RBX',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'expressingForWithWei',
  structures: ['为 + [Some Part] + Verb'],
  description:
    'When you work for a company, or do other sorts of physical (and even mental) activities for another party, you\'re likely to use the Chinese preposition 为 (wèi), which is often translated into English as "for," a translation which is often unnatural or unnecessary, depending on the particular phrase.  The super common Mao-era phrase, 为人民服务 ("serve the people"), doesn\'t need the word "for" in English, for example.',
  sources: [allSetSrc],
  match: sentence =>
    mergeLocMatchGroups([
      locsFromTokens(
        regexMatchTokens(sentence.tokens, '(:wei:):noun:', {
          wei: word('为'),
          noun: pos('NN|PN|NR'),
        })
      ),
    ]),
  examples: [
    {
      zh: '他为我做了很多事。',
      en: "He's done a lot for me.",
      src: allSetSrc,
    },
    {
      zh: '我们都为你高兴。',
      en: 'We are all happy for you.',
      src: allSetSrc,
    },
    {
      zh: '你们可以来为我们加油。',
      en: 'You can come to cheer us up.',
      src: allSetSrc,
    },
    {
      zh: '她为美国政府工作。',
      en: 'She works for the United States government.',
      src: allSetSrc,
    },
    {
      zh: '为人民服务。',
      en: 'Serve the people.',
      src: allSetSrc,
    },
    {
      zh: '公司为她提供了很多资源。',
      en: 'The company provided her with many resources.',
      src: allSetSrc,
    },
  ],
};
