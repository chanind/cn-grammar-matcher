const { regexMatchLocs } = require('../lib/matching/regexMatch');
const { and, pos, word } = require('../lib/tokenFilters');
const { mergeLocMatchGroups } = require('../lib/matching/utils');
const { Node, graphMatch } = require('../lib/matching/graphMatch');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASG8SI2K',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'basicComparisonsWithBi',
  name: 'Noun 1 + 比 + Noun 2 + Adj.',
  description:
    'One of the most common words when comparing things in Chinese is to use 比 (bǐ). 比 (bǐ) has similarities to the English word "than," but it requires a word order that\'s not so intuitive, so you\'ll want to practice it quite a bit.',
  sources: [allSetSrc],
  match: sentence => {
    const text = sentence.original;
    return mergeLocMatchGroups([
      graphMatch(
        sentence.tokens,
        new Node({ filter: and(pos('P'), word('比')), capture: true })
      ),
      regexMatchLocs(text, /(比)[^更]+(更)/),
    ]);
  },
  examples: [
    {
      zh: '小李比小张高。',
      en: 'Xiao Li is taller than Xiao Zhang.',
      src: allSetSrc,
    },
    {
      zh: '小张比小李矮。',
      en: 'Xiao Zhang is shorter than Xiao Li.',
      src: allSetSrc,
    },
    {
      zh: '他比老师聪明。',
      en: 'He is smarter than the teacher.',
      src: allSetSrc,
    },
    {
      zh: '上海比纽约大吗？',
      en: 'Is Shanghai bigger than New York?',
      src: allSetSrc,
    },
    {
      zh: '她比她妈妈漂亮。',
      en: 'She is prettier than her mother.',
      src: allSetSrc,
    },
    {
      zh: '星巴克的咖啡比这里的咖啡贵。',
      en: 'The coffee at Starbucks is more expensive than the coffee here.',
      src: allSetSrc,
    },
    {
      zh: '地铁比公交车方便。',
      en: 'The subway is more convenient than the bus.',
      src: allSetSrc,
    },
    {
      zh: '你比我聪明。',
      en: 'You are smarter than me.',
      src: allSetSrc,
    },
    {
      zh: '小李比小张更高。',
      en: 'Xiao Li is even taller than Xiao Zhang.',
      src: allSetSrc,
    },
    {
      zh: '我哥哥比我更高。',
      en: 'My big brother is even taller than me.',
      src: allSetSrc,
    },
    {
      zh: '你男朋友比我男朋友更帅。',
      en: 'Your boyfriend is even more handsome than mine.',
      src: allSetSrc,
    },
    {
      zh: '这里的冬天比纽约的冬天更冷。',
      en: 'The winter here is even colder than it is in New York.',
      src: allSetSrc,
    },
    {
      zh: '中文语法比汉字更好玩。',
      en: 'Chinese grammar is even more fun than Chinese characters.',
      src: allSetSrc,
    },
    {
      zh: '你的问题比我的问题更麻烦。',
      en: 'Your problem is even more troublesome than mine.',
      src: allSetSrc,
    },
  ],
};
