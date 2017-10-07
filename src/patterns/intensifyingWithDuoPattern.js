const { and, pos, word } = require('../lib/tokenFilters');
const { mergeLocMatchGroups } = require('../lib/matching/utils');
const { Node, Edge, graphMatch } = require('../lib/matching/graphMatch');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGGH7RR',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'intensifyingWithDuo',
  name: 'Subj. + 多 + Adj.',
  description:
    'One way to intensify a sentence is to make it an exclamation. To do this, you can use 多 (duō).',
  sources: [allSetSrc],
  match: sentence =>
    // TODO: this pattern has a lot of problems parsing properly, because 多 is often used in foreign names
    mergeLocMatchGroups([
      graphMatch(
        sentence.tokens,
        new Edge(
          { type: 'advmod', ahead: true },
          new Node({ filter: and(pos('AD'), word('多')), capture: true })
        )
      ),
    ]),
  examples: [
    // {
    //   zh: '一个人多好！',
    //   en: 'It\'s so nice being alone!',
    //   src: allSetSrc,
    // },
    {
      zh: '你女儿多聪明啊！',
      en: 'Your daughter is so smart!',
      src: allSetSrc,
    },
    {
      zh: '今天天气多舒服！',
      en: "Today's weather is so nice!",
      src: allSetSrc,
    },
    // {
    //   zh: '你看这个地方，多美啊！',
    //   en: 'Look at this place, it is so beautiful!',
    //   src: allSetSrc,
    // },
    {
      zh: '学中文多有意思啊！',
      en: 'Studying Chinese is so interesting!',
      src: allSetSrc,
    },
    // {
    //   zh: '坐地铁多方便！',
    //   en: 'How convenient it is to take the metro!',
    //   src: allSetSrc,
    // },
    // {
    //   zh: '你看这个小狗，多可爱！',
    //   en: 'Look at this puppy! It is so cute!',
    //   src: allSetSrc,
    // },
    // {
    //   zh: '这样做多麻烦！',
    //   en: 'Doing it this way is so troublesome!',
    //   src: allSetSrc,
    // },
    {
      zh: '这些菜多好吃啊！',
      en: 'These foods are so delicious!',
      src: allSetSrc,
    },
    {
      zh: '你男朋友多帅啊！',
      en: 'Your boyfriend is so handsome!',
      src: allSetSrc,
    },
  ],
};
