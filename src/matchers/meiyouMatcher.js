const { and, pos, word } = require('../lib/tokenFilters');
const { regexMatchTokens, locsFromTokens } = require('../lib/regexMatchers');

const allSetSrc = {
  type: 'website',
  url:
    'https://resources.allsetlearning.com/chinese/grammar/Negation_of_%22you%22_with_%22mei%22',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'meiyou',
  name: '没有 pattern',
  description: 'negation of 有, meaning to not have',
  sources: [allSetSrc],
  match: sentence => {
    const meiyou = and(pos('AD|VE'), word('没有?'));
    return locsFromTokens(
      regexMatchTokens(sentence.tokens, '(:meiyou:)', { meiyou }),
      /[没有]+/
    );
  },
  examples: [
    {
      zh: '我没有问题。',
      en: "I don't have any questions.",
      src: allSetSrc,
    },
    {
      zh: '我们现在没有钱。',
      en: "We don't have money now.",
      src: allSetSrc,
    },
    {
      zh: '他没有工作吗？',
      en: 'Does he not have a job? ',
      src: allSetSrc,
    },
    {
      zh: '他们没有爸爸妈妈。',
      en: "They don't have parents.",
      src: allSetSrc,
    },
    {
      zh: '我们在北京没有房子。',
      en: "We don't have a house in Beijing.",
      src: allSetSrc,
    },
    {
      zh: '你爸爸没有手机吗？',
      en: 'Does your dad not have a cell phone? ',
      src: allSetSrc,
    },
    {
      zh: '你们在上海没有朋友吗？',
      en: 'Do you not have friends in Shanghai?',
      src: allSetSrc,
    },
    {
      zh: '我的老师现在没有男朋友。',
      en: "My teacher doesn't have a boyfriend now.",
      src: allSetSrc,
    },
    {
      zh: '他们都没有电脑吗？',
      en: 'Do they all not have computers? ',
      src: allSetSrc,
    },
    {
      zh: '这个周末你们都没有时间吗？',
      en: 'Do you all not have time this weekend?',
      src: allSetSrc,
    },
    {
      zh: '我没有车。',
      en: "I don't have a car.",
      src: allSetSrc,
    },
    {
      zh: '我没钱。',
      en: "I don't have money.",
      src: allSetSrc,
    },
    {
      zh: '你没男朋友吗？',
      en: 'Do you not have a boyfriend?',
      src: allSetSrc,
    },
    {
      zh: '你们没车吗？',
      en: "You don't have a car?",
      src: allSetSrc,
    },
    {
      zh: '老板现在没时间。',
      en: "The boss doesn't have time right now.",
      src: allSetSrc,
    },
    {
      zh: '我没工作，我老公也没工作。',
      en: "I don't have a job. My husband doesn't have a job either.",
      src: allSetSrc,
    },
  ],
};
