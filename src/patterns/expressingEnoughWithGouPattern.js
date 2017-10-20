const { and, pos, word } = require('../lib/tokenFilters');
const { regexMatchTokens, regexMatchLocs } = require('../lib/matching/regexMatch');
const { mergeLocMatchGroups, locsFromTokens } = require('../lib/matching/utils');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASG49BE6',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'expressingEnoughWithGou',
  name: 'Subj. + 够 + Verb (+ 了)',
  description: '',
  sources: [allSetSrc],
  match: sentence =>
    mergeLocMatchGroups([
      locsFromTokens(
        regexMatchTokens(sentence.tokens, '(:gou:):verb:(:le:)?', {
          gou: word('.*够'),
          verb: pos('VV'),
          le: and(pos('AS'), word('了')),
        }),
        '够了'
      ),
      locsFromTokens(
        regexMatchTokens(sentence.tokens, ':verb:(:gou:)(:le:)?', {
          verb: pos('VV'),
          gou: word('够.*'),
          le: and(pos('AS'), word('了')),
        }),
        '够了'
      ),
      regexMatchLocs(sentence.original, /不(够)/),
      regexMatchLocs(sentence.original, /(够了)/),
    ]),
  examples: [
    {
      zh: '我们买了很多菜，肯定够吃。',
      en: 'We bought a lot of food. It must be good enough to eat.',
      src: allSetSrc,
    },
    {
      zh: '他带了好多衣服，应该够换。',
      en: 'He brought a lot of clothes. It should be enough to change.',
      src: allSetSrc,
    },
    {
      zh: '我们只有三个人，你的车肯定够坐。',
      en: "We only have three people. I'm sure your car is big enough to sit in.",
      src: allSetSrc,
    },
    {
      zh: '这些菜够吃了，不要再买了。',
      en: "This food is enough to eat. Don't buy more.",
      src: allSetSrc,
    },
    {
      zh: '我带的钱够用了，你不用带了。',
      en: "I've brought enough money to spend. You don't need to  bring any.",
      src: allSetSrc,
    },
    {
      zh: '你家太小了，恐怕不够住。',
      en: "Your house is too small. I'm afraid it's not big enough to live in.",
      src: allSetSrc,
    },
    {
      zh: '你的包太小了，这些东西肯定不够放。',
      en: "You bag is too small. This stuff definitely can't fit in it.",
      src: allSetSrc,
    },
    {
      zh: '办公室的纸不够用了，你明天去买一些吧。',
      en:
        'The paper in the office is not enough to use. You should go buy some tomorrow.',
      src: allSetSrc,
    },
    {
      zh: '我这个月的钱不够花了，你能不能借我五百？',
      en:
        "I don't have enough money to spend this month. Could you lend me five hundred kuai?",
      src: allSetSrc,
    },
    {
      zh: '别说了！这些话我已经听够了！',
      en: "Stop talking! I've heard enough of it!",
      src: allSetSrc,
    },
    {
      zh: '你今天玩游戏已经玩了三个小时了，玩够了没有？！',
      en: "You've been playing games for three hours today. Are you not done yet?",
      src: allSetSrc,
    },
    {
      zh: '我受够了！我一定要跟他离婚！',
      en: "I had enough of him. I'm definitely going to divorce him.",
      src: allSetSrc,
    },
    {
      zh: '你天天都叫外卖，还没吃够吗？',
      en: "You order takeout every day. Haven't you gotten sick of eating it?",
      src: allSetSrc,
    },
  ],
};
