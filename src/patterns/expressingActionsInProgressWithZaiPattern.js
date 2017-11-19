const { regexMatchLocs } = require('../lib/matching/regexMatch');
const { mergeLocMatchGroups } = require('../lib/matching/utils');
const { and, pos, word } = require('../lib/tokenFilters');
const { Node, Edge, graphMatch } = require('../lib/matching/graphMatch');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASG846EA',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'expressingActionsInProgressWithZai',
  structures: ['Subj. + 在 + Verb + Obj.', 'Subj. + 正在 + Verb + Obj.'],
  description:
    '在 (zài) and 正在 (zhèngzài) can be used as auxiliary verbs to express that an action is ongoing or in progress. This is often the equivalent of present continuous in English, which is how we express that an activity is happening now.',
  sources: [allSetSrc],
  match: sentence => {
    const text = sentence.original;
    return mergeLocMatchGroups([
      graphMatch(
        sentence.tokens,
        new Node({ filter: pos('V.') }, [
          new Edge(
            { type: 'case|advmod', ahead: true },
            new Node({ filter: and(pos('AD|P'), word('在')), capture: true })
          ),
        ])
      ),
      regexMatchLocs(text, /(正在)/),
    ]);
  },
  examples: [
    {
      zh: '她在看书。',
      en: 'She is reading.',
      src: allSetSrc,
    },
    {
      zh: '妈妈在打电话。',
      en: 'Mom is making a phone call.',
      src: allSetSrc,
    },
    {
      zh: '阿姨正在打扫我们的房间。',
      en: 'The cleaning lady is cleaning our room right now.',
      src: allSetSrc,
    },
    {
      zh: '昨天晚上七点，我们在吃饭。',
      en: 'Yesterday at 7pm, we were eating dinner.',
      src: allSetSrc,
    },
    {
      zh: '我现在在上班，不方便离开。',
      en: "I am working now. It's not convenient for me to leave.",
      src: allSetSrc,
    },
    {
      zh: '我们正在上课，请你等一会儿。',
      en: 'We are in class right now; please wait a moment.',
      src: allSetSrc,
    },
    {
      zh: '你正在开车，不可以玩手机。',
      en: "You're driving right now; you can't play with your cell phone.",
      src: allSetSrc,
    },
    {
      zh: '你给我打电话的时候，我正在跟朋友打游戏。',
      en: 'When you called me, I was playing video games with friends.',
      src: allSetSrc,
    },
  ],
};
