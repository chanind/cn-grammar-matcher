const { mergeLocMatchGroups } = require('../lib/matching/utils');
const { pos, word } = require('../lib/tokenFilters');
const { Node, Edge, graphMatch } = require('../lib/matching/graphMatch');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGYW5RS',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'usingCaiForSmallNumbers',
  name: '才 + (Verb) + Number + Measure Word + Noun',
  description:
    'The character 才 (cái) can be used to emphasize that a number is small, or less than expected.',
  sources: [allSetSrc],
  match: sentence => {
    const counter = new Edge(
      { type: 'nummod|nmod:.*|dep' },
      new Node({ filter: pos('CD') }, [
        new Edge({ type: 'mark:clf' }, new Node({ filter: pos('M') })),
      ])
    );
    return mergeLocMatchGroups([
      graphMatch(
        sentence.tokens,
        new Node({ filter: pos('NN') }, [
          new Edge({ type: 'advmod' }, new Node({ filter: word('才'), capture: true })),
          counter,
        ])
      ),
      graphMatch(
        sentence.tokens,
        new Node({ filter: pos('CD') }, [
          new Edge({ type: 'advmod' }, new Node({ filter: word('才'), capture: true })),
        ])
      ),
      graphMatch(
        sentence.tokens,
        new Node({ filter: pos('VV') }, [
          new Edge({ type: 'advmod' }, new Node({ filter: word('才'), capture: true })),
          new Edge({ type: 'dobj' }, new Node({ filter: pos('NN') }, [counter])),
        ])
      ),
      graphMatch(
        sentence.tokens,
        new Node({ filter: pos('VV') }, [
          new Edge({ type: 'advmod' }, new Node({ filter: word('才'), capture: true })),
          counter,
        ])
      ),
    ]);
  },
  examples: [
    {
      zh: '你才二十岁？',
      en: "You're only twenty?",
      src: allSetSrc,
    },
    {
      zh: '这家公司才三个员工。',
      en: 'This company only has three employees.',
      src: allSetSrc,
    },
    {
      zh: '这个班才两个学生。',
      en: 'This class only has two students.',
      src: allSetSrc,
    },
    {
      zh: '我一个月工资才两千。',
      en: 'My monthly salary is only two thousand RMB.',
      src: allSetSrc,
    },
    {
      zh: '你才吃一个包子？',
      en: 'You only ate one baizi?',
      src: allSetSrc,
    },
    {
      zh: '她才来上海两个月。',
      en: "She's only been in Shanghai for two months.",
      src: allSetSrc,
    },
    {
      zh: '我们才看完一页。',
      en: 'We only finished reading one page.',
      src: allSetSrc,
    },
    {
      zh: '这顿饭才花了二十块。',
      en: 'This meal only cost twenty kuai.',
      src: allSetSrc,
    },
    {
      zh: '他们认识才三个星期就结婚了。',
      en: 'They only knew each other for three weeks before they got married.',
      src: allSetSrc,
    },
  ],
};
