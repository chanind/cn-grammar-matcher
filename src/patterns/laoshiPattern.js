const { and, pos, word } = require('../lib/tokenFilters');
const { mergeLocMatchGroups } = require('../lib/matching/utils');
const { Node, Edge, graphMatch } = require('../lib/matching/graphMatch');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGII66E',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'laoshi',
  name: '老是 + Verb',
  description:
    'We have a few ways to say "always" in Chinese, and one of them is to use the word 老是 (lǎoshi).',
  sources: [allSetSrc],
  match: sentence => {
    const tokens = sentence.tokens;
    return mergeLocMatchGroups([
      graphMatch(
        tokens,
        new Edge(
          { type: 'advmod' },
          new Node({ filter: and(pos('AD'), word('老是?')), capture: '老是' })
        )
      ),
    ]);
  },
  examples: [
    {
      zh: '不要老是笑话别人。',
      en: "Don't laugh at other people all the time.",
      src: allSetSrc,
    },
    {
      zh: '他老是喜欢说脏话。',
      en: 'He always likes saying bad words.',
      src: allSetSrc,
    },
    {
      zh: '他老说脏话。',
      en: 'He always says bad words.',
      src: allSetSrc,
    },
    // {
    //   zh: '这个机器老出问题。',
    //   en: 'There is always something wrong with this machine.',
    //   src: allSetSrc,
    // },
    {
      zh: '老板老是让我们加班。',
      en: 'The boss always asks us to work overtime.',
      src: allSetSrc,
    },
    {
      zh: '他老不来参加培训。',
      en: 'He never comes to the training session.',
      src: allSetSrc,
    },
    {
      zh: '你老在别人面前说我的坏话。',
      en: 'You always like speaking evil of me in front of other people.',
      src: allSetSrc,
    },
    {
      zh: '你怎么老是不高兴？',
      en: 'How are you always unhappy?',
      src: allSetSrc,
    },
    {
      zh: '他对员工老是很严肃。',
      en: 'He is always serious with the employees.',
      src: allSetSrc,
    },
    {
      zh: '你们不要老是紧张。',
      en: "Don't always be so nervous.",
      src: allSetSrc,
    },
    {
      zh: '我楼上的邻居晚上老是很吵。',
      en: 'My neighbor upstairs is always noisy in the night.',
      src: allSetSrc,
    },
    {
      zh: '他老是对人不礼貌。',
      en: "He's always impolite to people.",
      src: allSetSrc,
    },
  ],
};
