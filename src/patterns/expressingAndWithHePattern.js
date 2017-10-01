const { mergeLocMatchGroups } = require('../lib/matching/utils');
const { and, pos, word } = require('../lib/tokenFilters');
const { regexMatchLocs } = require('../lib/matching/regexMatch');
const { Node, Edge, graphMatch } = require('../lib/matching/graphMatch');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGP0KFF',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'expressingAndWithHe',
  name: 'Noun 1 + 和 + Noun 2',
  description:
    'When listing out multiple nouns, 和 (hé) is there to help you out. Just remember that 和 (hé) isn\'t a word you can use to translate just any usage of the English word "and."',
  sources: [allSetSrc],
  match: sentence => {
    const text = sentence.original;
    return mergeLocMatchGroups([
      regexMatchLocs(text, /(和)[我他你她]/),
      graphMatch(
        sentence.tokens,
        new Edge(
          { type: 'cc' },
          new Node({ filter: and(pos('CC|P'), word('和')), capture: true })
        )
      ),
    ]);
  },
  examples: [
    {
      zh: '你和我',
      en: 'you and I',
      src: allSetSrc,
    },
    {
      zh: '老板喜欢咖啡和茶。',
      en: 'The boss likes coffee and tea.',
      src: allSetSrc,
    },
    {
      zh: '我的爷爷和奶奶都70岁。',
      en: 'My grandpa and grandma are both 70 years old.',
      src: allSetSrc,
    },
    {
      zh: '他和他女朋友都喜欢中国菜。',
      en: 'He and his girlfriend both like Chinese food.',
      src: allSetSrc,
    },
    {
      zh: '你爸爸和你妈妈都是美国人吗？',
      en: 'Are your father and your mother both Americans?',
      src: allSetSrc,
    },
    {
      zh: '手机和电脑都很贵。',
      en: 'Cell phones and computers are both expensive.',
      src: allSetSrc,
    },
    {
      zh: '德语和法语都很难吗？',
      en: 'Are both German and French difficult?',
      src: allSetSrc,
    },
    {
      zh: '今天和明天都可以吗？',
      en: 'Are today and tomorrow both OK?',
      src: allSetSrc,
    },
  ],
};
