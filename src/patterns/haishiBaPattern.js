const { mergeLocMatchGroups } = require('../lib/matching/utils');
const { and, pos, word } = require('../lib/tokenFilters');
const { regexMatchLocs } = require('../lib/matching/regexMatch');
const { Node, Edge, graphMatch } = require('../lib/matching/graphMatch');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGWAR65',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'haishiBa',
  name: 'Subj. + 还是 + [Verb Phrase] + 吧',
  description:
    'One of the ways to use 还是 (háishì) is to have it mean "you had better," similar to ' +
    'how in English we may say "I think you had better start on your homework." ' +
    "吧 is often placed after this structure, as it's a suggestion. " +
    "When the part after 还是 is a negative verb phrase, it's OK to drop the 吧 at the end.",
  sources: [allSetSrc],
  match: sentence => {
    const advHaishiEdge = new Edge(
      { ahead: true, type: 'advmod' },
      new Node({ filter: and(pos('AD'), word('还是')), capture: true })
    );
    const negativeModifierEdge = new Edge(
      { ahead: true, type: 'advmod' },
      // TODO: there are probably more negative modifiers here that I'm forgetting
      new Node({ filter: and(pos('AD'), word('.*(不|别).*')) })
    );

    return mergeLocMatchGroups([
      regexMatchLocs(sentence.original, /(还是)[^吧]+(吧)/),
      graphMatch(sentence.tokens, new Node({}, [advHaishiEdge, negativeModifierEdge])),
    ]);
  },
  examples: [
    {
      zh: '我们还是明天去吧。',
      en: "We'd better go tomorrow.",
      src: allSetSrc,
    },
    {
      zh: '还是让她走吧。',
      en: "We'd better let her go.",
      src: allSetSrc,
    },
    {
      zh: '你还是帮帮他吧。',
      en: "You'd better help him with this.",
      src: allSetSrc,
    },
    {
      zh: '还是别问了吧。',
      en: "We'd better not ask.",
      src: allSetSrc,
    },
    {
      zh: '太贵了，还是别买了吧。',
      en: "It's too expensive. You'd better not buy it.",
      src: allSetSrc,
    },
    {
      zh: '你还是现在就跟我说吧。',
      en: "You'd better talk with me now.",
      src: allSetSrc,
    },
    {
      zh: '我饿了，我们还是先吃饭吧。',
      en: "I'm hungry; we had better eat first.",
      src: allSetSrc,
    },
    {
      zh: '这里太脏了，我们还是走吧。',
      en: "It's too dirty here; we'd better leave.",
      src: allSetSrc,
    },
    {
      zh: '你做得太慢了，还是让他做吧。',
      en: "You did too slowly. We'd better ask him to do it.",
      src: allSetSrc,
    },
    {
      zh: '快迟到了，我们还是打车吧。',
      en: "We're running late. Let's take a taxi.",
      src: allSetSrc,
    },
    {
      zh: '太贵了，还是别买了。',
      en: "It's too expensive. You'd better not buy it.",
      src: allSetSrc,
    },
    {
      zh: '她不想说，还是不要再问了。',
      en: "She doesn't want to say anything. We'd better stop asking.",
      src: allSetSrc,
    },
    {
      zh: '他一定不同意，还是别跟他说了。',
      en: "He will definitely disagree. We'd better not tell him.",
      src: allSetSrc,
    },
  ],
};
