const { and, pos, word } = require('../lib/tokenFilters');
const { mergeLocMatchGroups } = require('../lib/matching/utils');
const { Node, Edge, graphMatch } = require('../lib/matching/graphMatch');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGRBKSL',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'directionalVerbsLaiAndQu',
  name: '来 / 去 + Place',
  description:
    '来 (lái) and 去 (qù) are both words that help to express direction from the perspective of the speaker. 来 (lái) means "come" (towards the speaker), while 去 (qù) means "go" (away from the speaker). For example, if you are in China, a local person might ask you: "When did you come to China?" using 来 (lái). Another example is if you want to go from China to Japan, your friends might ask you:  “When are you going to Japan?" using 去 (qù).',
  sources: [allSetSrc],
  match: sentence =>
    mergeLocMatchGroups([
      graphMatch(
        sentence.tokens,
        new Node({ filter: and(pos('VV'), word('.*[来去]')), capture: '来去' }, [
          new Edge({ type: 'dobj' }, new Node({ filter: pos('NR|NN') })),
        ])
      ),
    ]),
  examples: [
    {
      zh: '妈妈要去超市。',
      en: 'Mom will go to the supermarket.',
      src: allSetSrc,
    },
    {
      zh: '老板今天来公司吗？',
      en: 'Is the boss coming into the office today?',
      src: allSetSrc,
    },
    {
      zh: '你现在来南京路吧。',
      en: 'Come to Nanjing Road now.',
      src: allSetSrc,
    },
    {
      zh: '你不想来我们公司工作吗？',
      en: 'Do you not want to come to work for our company?',
      src: allSetSrc,
    },
    {
      zh: '去年她去美国工作了几个月。',
      en: 'Last year she went to work in the USA for a few months.',
      src: allSetSrc,
    },
    {
      zh: '你们想去Starbucks还是Costa？',
      en: 'Would you like to go to Starbucks or Costa?',
      src: allSetSrc,
    },
    {
      zh: '周末我喜欢去朋友家。',
      en: "I like to go to my friends' places on the weekends.",
      src: allSetSrc,
    },
    {
      zh: '爸爸明天去北京出差。',
      en: 'Dad will go to Beijing on a business trip tomorrow.',
      src: allSetSrc,
    },
    {
      zh: '我今天不上班，你们可以来我家吃饭。',
      en: "I don't have to go to work today. You can come to my home to eat dinner.",
      src: allSetSrc,
    },
  ],
};
