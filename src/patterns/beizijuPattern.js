const { and, pos, word } = require('../lib/tokenFilters');
const { mergeLocMatchGroups } = require('../lib/matching/utils');
const { Node, graphMatch } = require('../lib/matching/graphMatch');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGHF9F1',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'beiziju',
  name: 'Subj. + 被 + Doer + Verb Phrase',
  description:
    'Bei Sentences, which are called 被字句 (bèizìjù) in Chinese, are a key way to express the passive in modern Mandarin Chinese.  In passive sentences, the object of an action becomes the subject of the sentence, and what would have been the subject of the normal (active voice) sentence, the "doer" of the action, becomes secondary, and may or may not be included in the passive sentence.',
  sources: [allSetSrc],
  match: sentence =>
    mergeLocMatchGroups([
      graphMatch(
        sentence.tokens,
        new Node({ filter: and(pos('LB|SB'), word('被')), capture: true })
      ),
    ]),
  examples: [
    {
      zh: '他被开除了。',
      en: 'He got fired.',
      src: allSetSrc,
    },
    {
      zh: '他肯定会被开除。',
      en: 'He will definitely get fired.',
      src: allSetSrc,
    },
    {
      zh: '他被开除了。',
      en:
        "I have been fired (but I'm not saying who fired me, probably because it's obvious).",
      src: allSetSrc,
    },
    {
      zh: '你做的事被发现了。',
      en:
        "You got caught for what you did (but I'm not saying who found it, probably because it's obvious).",
      src: allSetSrc,
    },
    {
      zh: '热狗被男孩吃了。',
      en: 'The hot dog was eaten by the boy.',
      src: allSetSrc,
    },
    {
      zh: '热狗被吃了。',
      en: 'The hot dog was eaten.',
      src: allSetSrc,
    },
  ],
};
