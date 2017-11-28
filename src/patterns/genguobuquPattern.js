const { and, pos, word, any } = require('../lib/tokenFilters');
const { regexMatchTokens } = require('../lib/matching/regexMatch');
const { locsFromTokens } = require('../lib/matching/utils');

const shortTermChineseSrc = {
  type: 'book',
  title: 'Short-Term Spoken Chinese - Pre-Intermediate',
  isbn13: '9787301263761',
  isbn10: '7301263767',
  author: 'Jianfei Ma',
  pages: [75],
};

const eChineseLearningSrc = {
  type: 'website',
  url: 'http://echineselearning2006.weebly.com/blog/what-does-mean1',
  name: 'eChineseLearning',
};

module.exports = {
  id: 'gen_guobuqu',
  structures: ['跟 ... 过不去'],
  description: `Pattern indicating that a person is made to intentionally feel uncomfortable.
    It is used in spoken language, and requires a person-word (ex 我) between 跟 and 过不去.
    和 can also be used instead of 跟.`,
  sources: [shortTermChineseSrc, eChineseLearningSrc],
  match: sentence =>
    locsFromTokens(
      regexMatchTokens(
        sentence.tokens,
        '(:gen:):any:*:person::any:*(:guobuqu:|:guo::bu::qu:)',
        {
          gen: and(pos('P'), word('跟|和')),
          guobuqu: and(pos('V.'), word('过不去')),
          guo: and(pos('A.|V.'), word('过')),
          bu: and(pos('A.'), word('不')),
          qu: and(pos('V.'), word('去')),
          person: pos('PN|NN|NR'),
          any,
        }
      ),
      '跟过不去'
    ),
  examples: [
    {
      zh: '别人迟到领导不批评，为什么专门批评我呢？这不是跟我过不去吗？',
      en:
        "Other people show up late and the boss doesn't criticize them, why does he just criticize me? He's intentionally picking on me, isn't he?",
      src: shortTermChineseSrc,
    },
    {
      zh: '这并不是你一个人的错，忘了它吧，别跟自己过不去。',
      en:
        "This isn't just your fault on your own. Forget about it. Don't beat yourself up.",
      src: shortTermChineseSrc,
    },
    {
      zh: '你干嘛总找我岔，总是跟我过不去啊！',
      en: 'Why are you always making difficulty for me?',
      src: eChineseLearningSrc,
    },
    {
      zh: '我没跟你过不去啊，是你跟我过不去吧！',
      en: 'I am not making difficulty for you, you are making difficulty for me instead!',
      src: eChineseLearningSrc,
    },
    {
      zh: '别提她妈妈的身体，你想跟她过不去吗？',
      en:
        "Don't talk about the health of her mother. Do you want to make difficulties for her?",
      src: eChineseLearningSrc,
    },
    {
      zh: '别跟我提那件事，否则你就是跟我过不去。',
      en: "Don't talk about this thing any more, or you will make a difficulty for me. ",
      src: eChineseLearningSrc,
    },
  ],
};
