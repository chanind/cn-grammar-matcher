const { mergeLocMatchGroups } = require('../lib/matching/utils');
const { and, pos, word } = require('../lib/tokenFilters');
const { Node, Edge, graphMatch } = require('../lib/matching/graphMatch');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASG8ICO9',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'usingDuiWithVerbs',
  structures: ['对 + Obj. + Verb', '对 + Person + 来说'],
  description:
    'When using 对 (duì) as a preposition, it is used to indicate "to" or "towards" an object or target. As with all prepositions, some care should be taken when using this particle, as usage of 对 doesn\'t always totally "make sense" or correspond to English at all.',
  sources: [allSetSrc],
  match: sentence =>
    mergeLocMatchGroups([
      graphMatch(
        sentence.tokens,
        new Node({ filter: pos('PN|NN') }, [
          new Edge(
            { type: 'case' },
            new Node({ filter: and(pos('P'), word('对')), capture: true })
          ),
        ])
      ),
    ]),
  examples: [
    {
      zh: '宝宝对我笑了。',
      en: 'The baby smiled at me.',
      src: allSetSrc,
    },
    {
      zh: '小狗在对你叫。',
      en: 'The dog is barking at you.',
      src: allSetSrc,
    },
    {
      zh: '你不应该这样对我们说话。',
      en: "You shouldn't talk to us this way.",
      src: allSetSrc,
    },
    {
      zh: '你怎么能对你妈妈大喊大叫？',
      en: 'How could you shout at your mother?',
      src: allSetSrc,
    },
    {
      zh: '不要对孩子发脾气！',
      en: "Don't lose your temper at the child!",
      src: allSetSrc,
    },
    {
      zh: '对我来说，中文最难的语法是把字句。',
      en: 'To me, the most difficult Chinese grammar is Ba sentence.',
      src: allSetSrc,
    },
    {
      zh: '对他来说，家人比工作更重要。',
      en: 'To him, family is more important than work.',
      src: allSetSrc,
    },
    {
      zh: '对老板来说，赚钱是第一。',
      en: 'To the boss, making money comes first.',
      src: allSetSrc,
    },
    {
      zh: '穿这种衣服对我们来说太奢侈了。',
      en: "To us, it's too luxurious to wear this kind of clothes.",
      src: allSetSrc,
    },
    {
      zh: '这个问题对一个五岁的孩子来说太复杂了。',
      en: 'For a five-year-old kid, this question is too complicated.',
      src: allSetSrc,
    },
    {
      zh: '你要对自己的工作负责。',
      en: 'You need to be responsible for your job.',
      src: allSetSrc,
    },
    {
      zh: '老板好像对你不太满意。',
      en: 'The boss seems not very satisfied with you.',
      src: allSetSrc,
    },
    {
      zh: '这里的服务员都对顾客很热情。',
      en: 'The waiters here are all very friendly to the customers.',
      src: allSetSrc,
    },
    {
      zh: '这个App对我的英语学习很有帮助。',
      en: 'This method helps a lot with my English learning.',
      src: allSetSrc,
    },
    {
      zh: '这件事对他的影响很大。',
      en: 'This piece of matter has a big influence on him.',
      src: allSetSrc,
    },
  ],
};
