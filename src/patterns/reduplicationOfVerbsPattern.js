const { regexMatchLocs, regexMatchTokens } = require('../lib/matching/regexMatch');
const {
  mergeLocMatchGroups,
  filterMatches,
  stringsFromMatch,
  locsFromTokens,
} = require('../lib/matching/utils');
const { and, pos, word } = require('../lib/tokenFilters');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGYC77J',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'reduplicationOfVerbs',
  name: 'Subj. + Verb + Verb',
  description:
    'One of the fun things about Chinese is that when speaking, you can repeat a verb to express "a little bit" or "briefly." This is called reduplication. It creates a casual tone, and a sense that whatever the action is, it\'s not going to take long.',
  sources: [allSetSrc],
  match: sentence => {
    const text = sentence.original;

    const filterBothSidesAreSame = match => {
      const matchStrings = stringsFromMatch(text, match);
      for (const matchString of matchStrings) {
        const end = matchString.length;
        const mid = Math.floor(end / 2);
        if (matchString.slice(0, mid) !== matchString.slice(end - mid, end)) {
          return false;
        }
      }
      return true;
    };

    const wordIsSameAsPrevious = token =>
      token.index > 0 && token.word === sentence.tokens[token.index - 1].word;
    const wordIsDuplicated = token => token.word[0] === token.word[1];

    return mergeLocMatchGroups([
      filterMatches(regexMatchLocs(text, /.一./), filterBothSidesAreSame),
      locsFromTokens(
        regexMatchTokens(sentence.tokens, '(:duplicatedVerb:)', {
          duplicatedVerb: and(pos('VV'), word('..'), wordIsDuplicated),
        })
      ),
      locsFromTokens(
        regexMatchTokens(sentence.tokens, '(:verb1::verb1Again:)', {
          verb1: and(pos('VV'), word('..')),
          verb1Again: and(pos('VV'), wordIsSameAsPrevious),
        })
      ),
    ]);
  },
  examples: [
    {
      zh: '你看看。',
      en: 'Take a little look.',
      src: allSetSrc,
    },
    {
      zh: '我试试。',
      en: "I'll give it a try.",
      src: allSetSrc,
    },
    {
      zh: '说说你的想法。',
      en: 'Talk a little bit about your ideas.',
      src: allSetSrc,
    },
    {
      zh: '出去玩玩吧！',
      en: 'Go out and have fun!',
      src: allSetSrc,
    },
    {
      zh: '我想出去走走。',
      en: 'I want to go out and walk for a bit.',
      src: allSetSrc,
    },
    {
      zh: '别生气了，笑一笑！',
      en: "Don't be mad, gimme a smile!",
      src: allSetSrc,
    },
    {
      zh: '你去问一问他们厕所在哪里。',
      en: 'Go and ask them where the bathroom is.',
      src: allSetSrc,
    },
    {
      zh: '我可以用一用你的电脑吗？',
      en: 'Can I use your computer for a little bit?',
      src: allSetSrc,
    },
    {
      zh: '你现在有时间吗？我们聊一聊吧。',
      en: "Do you have a second? Let's chat for a bit.",
      src: allSetSrc,
    },
    {
      zh: '你想尝一尝我做的菜吗？',
      en: 'Do you want to taste the food that I cooked?',
      src: allSetSrc,
    },
    {
      zh: '考虑考虑',
      en: 'think it over',
      src: allSetSrc,
    },
    {
      zh: '讨论讨论',
      en: 'discuss it',
      src: allSetSrc,
    },
    {
      zh: '商量商量',
      en: 'talk it over',
      src: allSetSrc,
    },
    {
      zh: '打听打听',
      en: 'inquire about it',
      src: allSetSrc,
    },
  ],
};
