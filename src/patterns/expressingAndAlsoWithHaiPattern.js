const { and, pos, word } = require('../lib/tokenFilters');
const { mergeLocMatchGroups } = require('../lib/matching/utils');
const { Node, Edge, graphMatch } = require('../lib/matching/graphMatch');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGJBZKC',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'expressingAndAlsoWithHai',
  structures: ['Subj. + Verb + Obj. 1， 还 + Verb + Obj. 2'],
  description:
    'In English we use "and also" when we want to connect separate and different thoughts. We can do the same thing in Chinese by using 还 (hái).',
  sources: [allSetSrc],
  match: sentence =>
    mergeLocMatchGroups([
      // main match, looking for 2 clauses with 还 in the second clause
      graphMatch(
        sentence.tokens,
        new Node({ filter: pos('V.') }, [
          new Edge(
            { type: 'ccomp|conj', behind: true },
            new Node({ filter: pos('V.') }, [
              new Edge(
                { type: 'advmod', ahead: true },
                new Node({ filter: and(pos('AD'), word('还')), capture: true })
              ),
            ])
          ),
        ])
      ),
      // manual overfitting, fixing case where 还有 parses as a single entity
      graphMatch(
        sentence.tokens,
        new Node({ filter: pos('NN') }, [
          new Edge(
            { type: 'cc', ahead: true },
            new Node({ filter: and(pos('CC'), word('还有')), capture: '还' })
          ),
        ])
      ),
    ]),
  examples: [
    {
      zh: '她有一个弟弟，还有一个妹妹。',
      en: 'She has a younger brother and also has a younger sister.',
      src: allSetSrc,
    },
    {
      zh: '我老板会说法语，还会说日语。',
      en: 'My boss can speak French and can also speak Japanese.',
      src: allSetSrc,
    },
    {
      zh: '你要一杯咖啡，还要什么？',
      en: 'You want a cup of coffee, and what else do you want?',
      src: allSetSrc,
    },
    {
      zh: '我想吃冰淇淋，还想吃汉堡。',
      en: 'I want to eat ice cream and I also want to eat a hamburger.',
      src: allSetSrc,
    },
    {
      zh: '爸爸有一个小米手机，还有一个iPhone。',
      en: 'Dad has a Xiaomi phone and also has an iPhone.',
      src: allSetSrc,
    },
    {
      zh: '你晚上在家做了作业，还做了什么？',
      en: 'You did your homework at home tonight, and what else did you do?',
      src: allSetSrc,
    },
    {
      zh: '他结婚的时候，请了同事，还请了谁？',
      en: 'When he got married, he invited his co-workers. Who else did he invite?',
      src: allSetSrc,
    },
    {
      zh: '生日的时候，我们会吃蛋糕，还要送礼物。',
      en: 'During a birthday, we eat cake and also give presents.',
      src: allSetSrc,
    },
    {
      zh: '去美国要带钱、护照，还要带什么？',
      en:
        'To go to the USA, you need to take money and a passport. What else do you need to take with you?',
      src: allSetSrc,
    },
    {
      zh: '他做了饭，还洗了碗。',
      en: 'He fixed dinner and also washed the dishes.',
      src: allSetSrc,
    },
    {
      zh: '我洗了澡，还洗了衣服。',
      en: 'I took a shower and also did my laundry.',
      src: allSetSrc,
    },
    {
      zh: '我们今天晚上出去吃饭了，还看了电影。',
      en: 'We went out for dinner tonight and also watched a movie.',
      src: allSetSrc,
    },
  ],
};
