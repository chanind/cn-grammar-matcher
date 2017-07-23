const {
  and,
  pos,
  word,
  not,
} = require('../lib/tokenFilters');
const { regexMatchTokens, locsFromTokens } = require('../lib/regexMatchers');

const shortTermChineseSrc = {
  type: 'book',
  title: 'Short-Term Spoken Chinese - Pre-Intermediate',
  isbn13: '9787301263761',
  isbn10: '7301263767',
  author: 'Jianfei Ma',
  pages: [30],
};

const allSetSrc = 'https://resources.allsetlearning.com/chinese/grammar/Expressing_the_only_two_possibilities';


module.exports = {
  id: 'bushi_jiushi',
  name: '不是 ... 就是 ...',
  description: 'Pattern indicating there are only 2 possiblities, similar to "If it\'s not X then it must be Y".',
  sources: [
    shortTermChineseSrc,
    allSetSrc,
  ],
  match: sentence => (
    locsFromTokens(regexMatchTokens(sentence.tokens, '(:bushi:|:bu::shi:):notBushi:+(:jiushi:|:jiu::shi:)', {
      bu: and(pos('AD'), word('不')),
      shi: and(pos('V.'), word('是')),
      bushi: and(pos('AD'), word('不是')),
      jiushi: and(pos('AD'), word('就是')),
      jiu: and(pos('AD'), word('就')),
      notBushi: not(word('不|是')),
    }), /[不是就]+/)
  ),
  examples: [
    {
      zh: '他整天不是打游戏就是睡觉。',
      en: "All day, if he's not playing games, he's sleeping.",
      src: allSetSrc,
    },
    {
      zh: '他们约会不是去咖啡馆就是去电影院。',
      en: "When they go on dates, if it's not to a coffee shop, then it's to the movie theater.",
      src: allSetSrc,
    },
    {
      zh: '我买的衣服不是大就是小，都不能穿。',
      en: "The clothes that I bought are either too big or too small, I can't wear any of them.",
      src: allSetSrc,
    },
    {
      zh: '她穿的衣服不是LV就是Gucci！',
      en: "If the clothes that she wears aren't Louis Vuitton, then they're Gucci!",
      src: allSetSrc,
    },
    {
      zh: '他不是美国人，就是英国人。',
      en: "If he's not American then he's British.",
      src: shortTermChineseSrc,
    },
    {
      zh: '他们不是住八楼，就是住十楼。',
      en: "If they don't live in building 8, then they must live in building 10.",
      src: shortTermChineseSrc,
    },
    {
      zh: '我们班不是韩国人，就是日本人，没有欧美人。',
      en: 'our class is all Korean and Japanese, there are no Europeans or Americans.',
      src: shortTermChineseSrc,
    },
    {
      zh: '他每天不是读书就是写文章，不干别的。',
      en: "Every day if he's not studying then he's writing essays, he doesn't do anything else.",
      src: shortTermChineseSrc,
    },
  ],
};
