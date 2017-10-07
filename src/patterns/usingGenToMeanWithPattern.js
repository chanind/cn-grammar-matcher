const { regexMatchLocs } = require('../lib/matching/regexMatch');
const { mergeLocMatchGroups } = require('../lib/matching/utils');
const { and, pos, word } = require('../lib/tokenFilters');
const { Node, Edge, graphMatch } = require('../lib/matching/graphMatch');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGSZ0HP',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'usingGenToMeanWith',
  name: 'Subj. + 跟 + Person + Verb + Obj.',
  description:
    'Using 跟 (gēn) to express "with" is so simple and helpful, after studying it briefly, it will always be with you! 跟 (gēn) is a very common word that will help complete many other sentence structures.',
  sources: [allSetSrc],
  match: sentence => {
    const text = sentence.original;
    return mergeLocMatchGroups([
      graphMatch(
        sentence.tokens,
        new Edge(
          { type: 'case', ahead: true },
          new Node({ filter: and(pos('P'), word('跟')), capture: true })
        )
      ),
      regexMatchLocs(text, /(跟)[^起]+一起/),
      // overfitting - NLP seems to think 跟X is one word frequently
      regexMatchLocs(text, /(跟)[你她他它我]/),
    ]);
  },
  examples: [
    {
      zh: '我昨天跟朋友去海滩了。',
      en: 'I went to the beach with friends yesterday.',
      src: allSetSrc,
    },
    {
      zh: '不要跟我说话！',
      en: "Don't talk to me!",
      src: allSetSrc,
    },
    {
      zh: '我明天要跟新客户见面。',
      en: "I'm going to meet new clients tomorrow.",
      src: allSetSrc,
    },
    {
      zh: '你什么时候跟你女朋友结婚？',
      en: 'When are you gonna marry your girlfriend?',
      src: allSetSrc,
    },
    {
      zh: '你喜欢跟你父母聊天吗？',
      en: 'Do you like to talk with your parents?',
      src: allSetSrc,
    },
    {
      zh: '你想跟我一起去吗？',
      en: 'Do you want to go with me?',
      src: allSetSrc,
    },
    {
      zh: '请你们跟老师一起读。',
      en: 'Please read together with the teacher.',
      src: allSetSrc,
    },
    {
      zh: '下周谁跟老板一起出差？',
      en: 'Who is going on a business trip together with the boss next week?',
      src: allSetSrc,
    },
    {
      zh: '结婚以后，你想跟父母一起住吗？',
      en: 'Do you want live together with your parents after you get married?',
      src: allSetSrc,
    },
    {
      zh: '今年中秋节你会跟家人一起过吗？',
      en: 'Are you going to spend this Mid-Autumn Festival with your family?',
      src: allSetSrc,
    },
    {
      zh: '我要跟你见面。',
      en: 'I want to meet with you.',
      src: allSetSrc,
    },
    {
      zh: '我昨天跟他见面了。',
      en: 'I met with him yesterday.',
      src: allSetSrc,
    },
    {
      zh: '你什么时候跟她见面？',
      en: 'When are you going to meet with her?',
      src: allSetSrc,
    },
    {
      zh: '明天我要跟我男朋友的家人见面。',
      en: "Tomorrow I am going to meet my boyfriend's family.",
      src: allSetSrc,
    },
    {
      zh: '你有没有跟Obama见过面？',
      en: 'Have you ever met Obama?',
      src: allSetSrc,
    },
    {
      zh: '跟我读。',
      en: 'Read after me.',
      src: allSetSrc,
    },
    {
      zh: '跟我一起读。',
      en: 'Read with me.',
      src: allSetSrc,
    },
  ],
};
