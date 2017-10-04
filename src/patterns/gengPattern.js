const { and, pos, word } = require('../lib/tokenFilters');
const { mergeLocMatchGroups } = require('../lib/matching/utils');
const { Node, graphMatch } = require('../lib/matching/graphMatch');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASG4NIPB',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'geng',
  name: '更 + Adj.',
  description:
    'To express "even more," (as in "even more expensive," "even more ridiculous," "even more badass"), you can use 更 (gèng). 更 (gèng) generally comes before adjectives.',
  sources: [allSetSrc],
  match: sentence =>
    mergeLocMatchGroups([
      graphMatch(
        sentence.tokens,
        new Node({ filter: and(pos('AD'), word('更')), capture: true })
      ),
    ]),
  examples: [
    {
      zh: '这两个银行哪个更近？',
      en: 'Between these two banks, which one is closer?',
      src: allSetSrc,
    },
    {
      zh: '我想找一个更帅的男朋友。',
      en: 'I want to find a more handsome boyfriend.',
      src: allSetSrc,
    },
    {
      zh: '我喜欢在网上买书，因为更便宜。',
      en: "I like buying books online because it's cheaper.",
      src: allSetSrc,
    },
    {
      zh: '不要太高兴，我们还有更多的工作要做。',
      en: "Don't get too excited. We still have more work to do.",
      src: allSetSrc,
    },
    {
      zh: '结婚以后，她变得更漂亮了。',
      en: "She's become more beautiful after she got married.",
      src: allSetSrc,
    },
    {
      zh: '北京的房子比上海更贵。',
      en: 'The houses in Beijing are even more expensive than those in Shanghai.',
      src: allSetSrc,
    },
    {
      zh: '春节比中秋节更热闹。',
      en: 'Spring Festival is even more boisterous than Mid-autumn Festival.',
      src: allSetSrc,
    },
    {
      zh: '汉字比声调更难。',
      en: 'Chinese characters are even more difficult than tones.',
      src: allSetSrc,
    },
    {
      zh: '他现在的女朋友比以前的更漂亮。',
      en: 'His current girlfriend is even more beautiful than his previous one.',
      src: allSetSrc,
    },
    {
      zh: '中国的高铁比飞机更方便。',
      en: "China's high-speed trains are even more convenient than airplanes.",
      src: allSetSrc,
    },
  ],
};
