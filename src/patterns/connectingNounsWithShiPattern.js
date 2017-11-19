const { mergeLocMatchGroups } = require('../lib/matching/utils');
const { and, pos, word } = require('../lib/tokenFilters');
const { Node, Edge, graphMatch } = require('../lib/matching/graphMatch');
const { regexMatchLocs } = require('../lib/matching/regexMatch');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGUN7RX',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'connectingNounsWithShi',
  structures: ['Noun 1 + 是 + Noun 2'],
  description:
    'The verb to be is not used in Chinese the same way as it is in English. In Chinese, 是 (shì) is for connecting nouns, and is generally not used with adjectives.',
  sources: [allSetSrc],
  match: sentence => {
    const { tokens, text } = sentence;
    return mergeLocMatchGroups([
      regexMatchLocs(text, /(是)不(是)/),
      regexMatchLocs(text, /(是)吗/),
      graphMatch(
        tokens,
        new Edge(
          { type: 'cop', ahead: true },
          new Node({ filter: and(pos('VC'), word('是')), capture: true })
        )
      ),
    ]);
  },
  examples: [
    {
      zh: '我是学生。',
      en: 'I am a student.',
      src: allSetSrc,
    },
    {
      zh: '你是John吗？',
      en: 'Are you John?',
      src: allSetSrc,
    },
    {
      zh: '他们是有钱人。',
      en: 'They are rich people.',
      src: allSetSrc,
    },
    {
      zh: '你是老板吗？',
      en: 'Are you the boss?',
      src: allSetSrc,
    },
    {
      zh: '这是我男朋友。',
      en: 'This is my boyfriend.',
      src: allSetSrc,
    },
    {
      zh: '那是你们公司吗？',
      en: 'Is that your company?',
      src: allSetSrc,
    },
    {
      zh: '你妈妈是老师吗？',
      en: 'Is your mother a teacher?',
      src: allSetSrc,
    },
    {
      zh: '这都是你的钱。',
      en: 'This is all your money.',
      src: allSetSrc,
    },
    {
      zh: '那是什么菜？',
      en: 'What food is that?',
      src: allSetSrc,
    },
    {
      zh: '我也是他的朋友。',
      en: 'I am also his friend.',
      src: allSetSrc,
    },
    {
      zh: '他没听到，是不是？',
      en: "He didn't hear you, right?",
      src: allSetSrc,
    },
    {
      zh: '你是不是还没吃饭？',
      en: "Haven't you eaten yet?",
      src: allSetSrc,
    },
    {
      zh: '你们是不是中国人？',
      en: 'Are you Chinese?',
      src: allSetSrc,
    },
    {
      zh: '你到了，是吗？',
      en: 'You have arrived, yeah?',
      src: allSetSrc,
    },
    {
      zh: '你有两个孩子，是吗？',
      en: 'You have two kids, yeah?',
      src: allSetSrc,
    },
  ],
};
