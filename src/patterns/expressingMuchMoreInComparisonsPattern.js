const { regexMatchLocs } = require('../lib/matching/regexMatch');
const { pos, word } = require('../lib/tokenFilters');
const { regexMatchTokens } = require('../lib/matching/regexMatch');
const { mergeLocMatchGroups, locsFromTokens } = require('../lib/matching/utils');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASG6KUS5',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'biDuole',
  name: 'Noun 1 + 比 + Noun 2 + Adj. + 得多 / 多了 / 很多',
  description:
    'If you want to up the intensity of your comparisons, you might want to express "much more." You can do this using 多 (duō), but did you know there are actually three different ways to do it?',
  sources: [allSetSrc],
  match: sentence =>
    mergeLocMatchGroups([
      regexMatchLocs(sentence.text, /(比)[^多]+(得多|多了|很多)/),
      locsFromTokens(
        regexMatchTokens(sentence.tokens, '(:bi:).*(:hai:):adv:', {
          bi: word('比'),
          hai: word('还'),
          adv: pos('V.'),
        })
      ),
    ]),
  examples: [
    {
      zh: '上海比我老家贵多了。',
      en: "It's much more expensive in Shanghai than in my hometown.",
      src: allSetSrc,
    },
    {
      zh: '他打篮球比我厉害多了。',
      en: 'He plays basketball much better than I do.',
      src: allSetSrc,
    },
    {
      zh: '这个老师比那个老师严格得多。',
      en: 'This teacher is much more strict than that teacher.',
      src: allSetSrc,
    },
    {
      zh: '坐高铁比坐飞机方便很多。',
      en: "It's much more convenient to take the high-speed train than the airplane.",
      src: allSetSrc,
    },
    {
      zh: '韩国的整容技术比我们国家发达得多。',
      en: 'The cosmetic technology in Korea is more developed than our country.',
      src: allSetSrc,
    },
    {
      zh: '北京的人口比上海还多。',
      en: 'The population of Beijing is even bigger than Shanghai.',
      src: allSetSrc,
    },
    {
      zh: '这家店比那家店还贵。',
      en: 'This shop is even more expensive than that one.',
      src: allSetSrc,
    },
    {
      zh: '他比姚明还高。',
      en: 'He is even taller than Yao Ming.',
      src: allSetSrc,
    },
    {
      zh: '你比我还懒。',
      en: "You're even lazier than me.",
      src: allSetSrc,
    },
    {
      zh: '弟弟比哥哥还调皮。',
      en: 'The younger brother is even more naughty than the elder brother.',
      src: allSetSrc,
    },
  ],
};
