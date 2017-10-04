const { and, pos, word } = require('../lib/tokenFilters');
const { mergeLocMatchGroups, filterMatches } = require('../lib/matching/utils');
const { Node, Edge, graphMatch } = require('../lib/matching/graphMatch');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGVT2KN',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'expressingBeGoingToWithYao',
  name: 'Subj. + Time + 要 + Verb',
  description:
    'The auxiliary verb 要 (yào) has several different meanings, and here we\'ll tackle the "be going to" meaning. You\'ll use this when you are discussing your plans with someone.',
  sources: [allSetSrc],
  match: sentence =>
    mergeLocMatchGroups([
      graphMatch(
        sentence.tokens,
        new Node({ filter: and(pos('VV'), word('要.?')), capture: '要' }, [
          new Edge({ type: 'nmod.*', ahead: true }, new Node({ filter: pos('NT') })),
        ])
      ),
      graphMatch(
        sentence.tokens,
        new Node({ filter: pos('VV') }, [
          new Edge({ type: 'nmod.*', ahead: true }, new Node({ filter: pos('NT') })),
          new Edge(
            { type: 'xcomp', ahead: true },
            new Node({ filter: and(pos('VV'), word('要')), capture: '要' })
          ),
        ])
      ),
      // Trying to correct for sentences involving times before 要, but where NLP
      // doesn't tag NT. Probably will need to improve these time-related regexes
      filterMatches(
        graphMatch(
          sentence.tokens,
          new Node({ filter: and(pos('VV'), word('要.?')), capture: '要' })
        ),
        () => sentence.original.match(/[后前月年周]|礼拜|星期/)
      ),
    ]),
  examples: [
    {
      zh: '我明天要买一个iPhone。',
      en: 'I am going to buy an iPhone tomorrow.',
      src: allSetSrc,
    },
    {
      zh: '你们现在要出去吗？',
      en: 'Are you all going out now?',
      src: allSetSrc,
    },
    {
      zh: '我们今年要去美国。',
      en: 'We are planning to go to the U.S. this year.',
      src: allSetSrc,
    },
    {
      zh: '他下个月要来中国工作。',
      en: 'He is coming to China to work next month.',
      src: allSetSrc,
    },
    {
      zh: '你下个星期要去她家吃晚饭吗？',
      en: 'Are you going to her place for dinner next week?',
      src: allSetSrc,
    },
    {
      zh: '这个星期天你要做什么？',
      en: 'What are you doing this Sunday?',
      src: allSetSrc,
    },
    {
      zh: '我晚上要给妈妈打电话。',
      en: 'I am going to call my mom this evening.',
      src: allSetSrc,
    },
    {
      zh: '下午老师要来我家。',
      en: 'The teacher is coming to my place this afternoon.',
      src: allSetSrc,
    },
    {
      zh: '老板明天要见他们吗？',
      en: 'Is the boss going to meet them tomorrow?',
      src: allSetSrc,
    },
    {
      zh: '下班以后你要回家吗？',
      en: 'Are you planning to go home after getting off work?',
      src: allSetSrc,
    },
  ],
};
