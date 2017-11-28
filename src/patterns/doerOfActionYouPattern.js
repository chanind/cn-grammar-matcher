const { regexMatchLocs } = require('../lib/matching/regexMatch');
const { and, pos, word } = require('../lib/tokenFilters');
const { mergeLocMatchGroups } = require('../lib/matching/utils');
const { Node, graphMatch } = require('../lib/matching/graphMatch');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGGNXVR',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'doerOfActionYou',
  structures: ['Topic + 由 + Person + Verb'],
  description:
    '由 (yóu)  is used to emphasize who is the doer or initiator of an action, a bit like in English where we might say: "Andy is the one who...."',
  sources: [allSetSrc],
  match: sentence => {
    const text = sentence.original;
    return mergeLocMatchGroups([
      regexMatchLocs(text, /(由)[你我他她]/),
      graphMatch(
        sentence.tokens,
        new Node({ filter: and(pos('P'), word('由')), capture: true })
      ),
    ]);
  },
  examples: [
    {
      zh: '这件事由我负责。',
      en: 'I am responsible for this.',
      src: allSetSrc,
    },
    {
      zh: '这是由他决定的，你就别干涉了。',
      en: "This is for him to decide, don't meddle.",
      src: allSetSrc,
    },
    {
      zh: '太悲剧了，会议由王总主持，肯定会很无聊！',
      en:
        "Oh no. This meeting is being led by the head manager. It's definitely going to be boring.",
      src: allSetSrc,
    },
  ],
};
