const { and, pos, word } = require('../lib/tokenFilters');
const { mergeLocMatchGroups } = require('../lib/matching/utils');
const { Node, Edge, graphMatch } = require('../lib/matching/graphMatch');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGNQUC1',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'resultComplementWanForFinishing',
  name: 'Subj. + Verb + 完 (+ 了) + Obj.',
  // TODO: improve description
  description:
    'On its own, 完 (wán) means "to finish" or "to complete." Using it in this grammar structure, it expresses the idea of doing some action to completion.',
  sources: [allSetSrc],
  match: sentence =>
    mergeLocMatchGroups([
      graphMatch(
        sentence.tokens,
        new Node({ filter: and(pos('V.'), word('.+完')), capture: '完' })
      ),
      graphMatch(
        sentence.tokens,
        new Node({ filter: pos('VV') }, [
          new Edge({ type: 'dobj' }, new Node({ filter: word('完了'), capture: true })),
        ])
      ),
      graphMatch(
        sentence.tokens,
        new Node({ filter: pos('VV') }, [
          new Edge(
            { type: 'advmod:rcomp' },
            new Node({ filter: and(pos('VV'), word('完')), capture: true })
          ),
          // optionally capture 了 if it's there too
          new Edge(
            { type: 'aux:asp', optional: true },
            new Node({ filter: and(pos('AS'), word('了')), capture: true })
          ),
        ])
      ),
    ]),
  examples: [
    {
      zh: '我说完了。',
      en: 'I am finished talking.',
      src: allSetSrc,
    },
    {
      zh: '你吃完了吗？',
      en: 'Are you done eating?',
      src: allSetSrc,
    },
    {
      zh: '我想看完这个电影。',
      en: 'I want to finish watching the movie.',
      src: allSetSrc,
    },
    {
      zh: '你做完以后，就可以下班了。',
      en: 'After you finish doing it, you can get off work.',
      src: allSetSrc,
    },
    {
      zh: '你今天可以做完作业吗？',
      en: 'Can you finish doing your homework today?',
      src: allSetSrc,
    },
    {
      zh: '你什么时候可以看完这本书？',
      en: 'When can you finish reading this book?',
      src: allSetSrc,
    },
    {
      zh: '妈妈洗完衣服以后，就去做晚饭了。',
      en: 'After mom finished washing clothes, she went to cook dinner.',
      src: allSetSrc,
    },
    {
      zh: '做完这些作业需要两个小时。',
      en: 'To finish your homework you will need two hours.',
      src: allSetSrc,
    },
    {
      zh: '看完以后告诉我。',
      en: 'Tell me when you have finished watching.',
      src: allSetSrc,
    },
    {
      zh: '我们学完了一百个词。',
      en: 'We have finished learning 100 words.',
      src: allSetSrc,
    },
    {
      zh: '我看完了电影。',
      en: 'I finished watching the movie.',
      src: allSetSrc,
    },
  ],
};
