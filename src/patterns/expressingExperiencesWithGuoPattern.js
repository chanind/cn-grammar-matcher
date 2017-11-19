const { and, pos, word } = require('../lib/tokenFilters');
const { mergeLocMatchGroups } = require('../lib/matching/utils');
const { Node, Edge, graphMatch } = require('../lib/matching/graphMatch');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGQGV3P',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'expressingExperiencesWithGuo',
  structures: ['Subj. + Verb + 过 + Obj.', 'Subj. + 没 + Verb + 过 + Obj.'],
  description:
    'The aspect particle 过 (guo) is used to indicate that an action has been experienced in the past.',
  sources: [allSetSrc],
  match: sentence =>
    mergeLocMatchGroups([
      graphMatch(
        sentence.tokens,
        new Node({ filter: and(pos('VV'), word('.+过')), capture: '过' })
      ),
      graphMatch(
        sentence.tokens,
        new Node({ filter: pos('V.') }, [
          new Edge(
            { type: 'aux:asp', behind: true },
            new Node({ filter: and(pos('AS'), word('过')), capture: true })
          ),
        ])
      ),
    ]),
  examples: [
    {
      zh: '你学过中文吗？',
      en: 'Have you ever studied Chinese?',
      src: allSetSrc,
    },
    {
      zh: '你见过那个人吗？',
      en: 'Have you seen that person before?',
      src: allSetSrc,
    },
    {
      zh: '我们来过这个地方。',
      en: "We've been to this place before.",
      src: allSetSrc,
    },
    {
      zh: '我也吃过日本菜。',
      en: "I've also eaten Japanese food before.",
      src: allSetSrc,
    },
    {
      zh: '你看过这个电影吗？',
      en: 'Have you seen this movie?',
      src: allSetSrc,
    },
    {
      zh: '我没想过这个问题。',
      en: "I've never thought about this question before.",
      src: allSetSrc,
    },
    {
      zh: '我没学过这个词。',
      en: 'I have never studied this word before.',
      src: allSetSrc,
    },
    {
      zh: '妈妈没买过很贵的衣服。',
      en: 'Mom has never bought any expensive clothes before.',
      src: allSetSrc,
    },
    {
      zh: '我们都没坐过飞机。',
      en: 'None of us has ever been on a airplane before.',
      src: allSetSrc,
    },
    {
      zh: '你们没见过美女吗？',
      en: 'Have you never seen beautiful girls before?',
      src: allSetSrc,
    },
  ],
};
