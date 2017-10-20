const { pos, word } = require('../lib/tokenFilters');
const { Node, Edge, graphMatch } = require('../lib/matching/graphMatch');
const { regexMatchTokens } = require('../lib/matching/regexMatch');
const { mergeLocMatchGroups, locsFromTokens } = require('../lib/matching/utils');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGPW8PP',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'expressingSmallQuantityWithJiu',
  name: '就 + [Single Subject] + Verb',
  description:
    '就 (jiù) is often translated simply as "just" or "only," but there are some nuances to how it is used.',
  sources: [allSetSrc],
  match: sentence =>
    mergeLocMatchGroups([
      graphMatch(
        sentence.tokens,
        new Node({ filter: pos('VV') }, [
          new Edge({ type: 'advmod' }, new Node({ filter: word('就'), capture: true })),
          new Edge(
            { type: 'dobj' },
            new Node({ filter: pos('NN') }, [
              new Edge({ type: 'nummod|det' }, new Node({ filter: pos('CD|DT') })),
            ])
          ),
        ])
      ),
      graphMatch(
        sentence.tokens,
        new Node({ filter: pos('VV') }, [
          new Edge({ type: 'advmod' }, new Node({ filter: word('就'), capture: true })),
          new Edge({ type: 'dep' }, new Node({ filter: pos('CD') })),
        ])
      ),
      locsFromTokens(
        regexMatchTokens(sentence.tokens, '(:jiu:):nounOrCounter:', {
          jiu: word('就'),
          nounOrCounter: pos('NN|PN|DT|CD'),
        })
      ),
    ]),
  examples: [
    {
      zh: '这件事就我一个人知道。',
      en: "I'm the only person that knows about this.",
      src: allSetSrc,
    },
    {
      zh: '我们都忘了，就他还记得。',
      en: 'We all forgot. Only he still remembers it.',
      src: allSetSrc,
    },
    {
      zh: '所有的菜都很好吃，就这个菜有点咸。',
      en: 'All the food is delicious. Just this one dish is a little salty.',
      src: allSetSrc,
    },
    {
      zh: '大家都下班了，就老板还在办公室。',
      en: 'Everyone finished work and left. Only the boss is still in the office.',
      src: allSetSrc,
    },
    {
      zh: '你觉得别人都是傻子吗？就你聪明？',
      en: 'Do you think everyone is an idiot? That only you are smart?',
      src: allSetSrc,
    },
    {
      zh: '这家公司我就认识一个人。',
      en: 'I only know one person in this company.',
      src: allSetSrc,
    },
    {
      zh: '这家餐厅我就来过一次。',
      en: "I've only been to this restaurant once.",
      src: allSetSrc,
    },
    {
      zh: '她在我们公司就工作了两个月。',
      en: 'She has worked at our company for only two months.',
      src: allSetSrc,
    },
    {
      zh: '我老板就会说几句英文。',
      en: 'My boss can only speak a few sentences of English.',
      src: allSetSrc,
    },
    {
      zh: '你怎么就点了这几个菜？',
      en: 'How could you order just these few dishes?',
      src: allSetSrc,
    },
    {
      zh: '为什么这里就一个厕所？',
      en: 'Why does this place only have one bathroom?',
      src: allSetSrc,
    },
    {
      zh: '你们家就一个孩子吗？',
      en: 'Does your family only have one child?',
      src: allSetSrc,
    },
    {
      zh: '我就一个哥哥。',
      en: 'I only have one brother.',
      src: allSetSrc,
    },
    {
      zh: '他在上海就一个朋友。',
      en: 'He only has one friend in Shanghai.',
      src: allSetSrc,
    },
    {
      zh: '我们公司就三个员工。',
      en: 'There are only three employees in our company.',
      src: allSetSrc,
    },
  ],
};
