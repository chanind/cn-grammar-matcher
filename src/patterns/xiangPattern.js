const { and, pos, word } = require('../lib/tokenFilters');
const { locsFromTokens, mergeLocMatchGroups } = require('../lib/matching/utils');
const { regexMatchTokens } = require('../lib/matching/regexMatch');
const { Node, Edge, graphMatch } = require('../lib/matching/graphMatch');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGT97VF',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'xiang',
  structures: ['Subj. + 想 + Verb (+ Obj.)', 'Subj. + 不 + 想 + Verb + Obj.'],
  description:
    'If you want to express something that you "would like to do," 想 (xiǎng) will be a very helpful auxiliary verb to know. Although similar to 要 (yào), 想 (xiǎng) will give you another more tactful option when you want to articulate a desire.',
  sources: [allSetSrc],
  match: sentence =>
    mergeLocMatchGroups([
      graphMatch(
        sentence.tokens,
        new Node({ filter: and(pos('VV'), word('想.+')), capture: '想' })
      ),
      graphMatch(
        sentence.tokens,
        new Node({ filter: and(pos('VV'), word('想')), capture: '想' }, [
          new Edge({ type: 'ccomp', behind: true }, new Node({ filter: pos('VV') })),
        ])
      ),

      // the dependency map seems to sometimes get messed up, but POS and segmentation is successful
      locsFromTokens(
        regexMatchTokens(sentence.tokens, '(:xiang:):verb:', {
          xiang: and(word('想'), pos('VV')),
          verb: pos('VV'),
        })
      ),
    ]),
  examples: [
    {
      zh: '你想去吗？',
      en: 'Would you like to go?',
      src: allSetSrc,
    },
    {
      zh: '我想吃面。',
      en: 'I would like to eat noodles.',
      src: allSetSrc,
    },
    {
      zh: '你想喝水吗？',
      en: 'Would you like to drink some water?',
      src: allSetSrc,
    },
    {
      zh: '我们想看电视。',
      en: 'We would like to watch TV.',
      src: allSetSrc,
    },
    {
      zh: '他想买一个大房子。',
      en: 'He would like to buy a big apartment.',
      src: allSetSrc,
    },
    {
      zh: '他们不想去酒吧。',
      en: "They wouldn't like to go to the bar.",
      src: allSetSrc,
    },
    {
      zh: '你不想认识这个美女吗？',
      en: 'Would you not like to know this beautiful lady?',
      src: allSetSrc,
    },
    {
      zh: '我不想回家。',
      en: "I wouldn't like to return home.",
      src: allSetSrc,
    },
    {
      zh: '那个地方很近，我不想开车。',
      en: 'That place is so close. I would not like to drive.',
      src: allSetSrc,
    },
    {
      zh: '他不想花父母的钱。',
      en: "He would not like to spend his parents' money.",
      src: allSetSrc,
    },
  ],
};
