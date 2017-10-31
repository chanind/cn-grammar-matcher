const { regexMatchLocs } = require('../lib/matching/regexMatch');
const { pos, word } = require('../lib/tokenFilters');
const { regexMatchTokens } = require('../lib/matching/regexMatch');
const { mergeLocMatchGroups, locsFromTokens } = require('../lib/matching/utils');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGQXARS',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'expressingTowardsWithXiang',
  name: '向 + Direction / Person + Verb',
  description:
    '向 (xiàng) is a preposition that means "towards," and is used often when expressing or referring to a certain point.',
  sources: [allSetSrc],
  match: sentence =>
    mergeLocMatchGroups([
      regexMatchLocs(sentence.text, /(向)[东北南西前后上下左右]/),
      locsFromTokens(
        regexMatchTokens(sentence.tokens, '(:xiang:):noun:', {
          xiang: word('.*向'),
          noun: pos('NN|NR|PN'),
        }),
        '向'
      ),
    ]),
  examples: [
    {
      zh: '向东走。',
      en: 'Walk towards east.',
      src: allSetSrc,
    },
    {
      zh: '向前看。',
      en: 'Look forward.',
      src: allSetSrc,
    },
    {
      zh: '向左转。',
      en: 'Turn left.',
      src: allSetSrc,
    },
    {
      zh: '老师正向我们走来。',
      en: 'The teacher is walking up towards us.',
      src: allSetSrc,
    },
    {
      zh: '火车已经开了，她还在向我招手。',
      en: 'The train already took off. She kept waving towards me.',
      src: allSetSrc,
    },
    {
      zh: '你必须向他道歉！',
      en: 'You must apologize to him!',
      src: allSetSrc,
    },
    {
      zh: '这件事你应该向老板汇报一下。',
      en: 'You should report this to the boss!',
      src: allSetSrc,
    },
    {
      zh: '向雷锋同志学习！',
      en: 'Learn from Comrade Lei Feng!',
      src: allSetSrc,
    },
    {
      zh: '我不喜欢向朋友借钱。',
      en: "I don't like to borrow money to my friends.",
      src: allSetSrc,
    },
    {
      zh: '你会向陌生人求助吗？',
      en: 'Would you ask strangers for help?',
      src: allSetSrc,
    },
    {
      zh: '我们都没经验，是来向你请教的。',
      en: "None of us have experience. We're here to ask you for advice.",
      src: allSetSrc,
    },
  ],
};
