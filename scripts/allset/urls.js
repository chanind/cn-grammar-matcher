/* eslint-disable */

const a1 = [
  // {
  //   label: "Negation of \"you\" with \"mei\"",
  //   url: "https://resources.allsetlearning.com/chinese/grammar/ASGPNV3Q",
  // },
  {
    label: 'The "all" adverb "dou"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG9YK09',
  },
  {
    label: 'The "also" adverb "ye"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGG25MD',
  },
  {
    label: 'Expressing "and" with "he"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGP0KFF',
  },
  {
    label: 'Offering choices with "haishi"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGA8NIB',
  },
  {
    label: 'Age with "sui"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGQUKJF',
    regexes: [/[零一二三四五六七八九十百千万亿两0-9]+(岁)/],
  },
  {
    label: 'Measure word "ge"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGI0T9S',
  },
  {
    label: 'Structure of dates',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGT3KF6',
    regexes: [
      /([零一二三四五六七八九十百千万亿0-9]+年)?([零一二三四五六七八九十百千万亿0-9]+月[零一二三四五六七八九十百千万亿0-9]+(?:号|日))/,
      /([零一二三四五六七八九十百千万亿0-9]+年[零一二三四五六七八九十百千万亿0-9]+月)([零一二三四五六七八九十百千万亿0-9]+(?:号|日))?/,
    ],
  },
  {
    label: 'Structure of days of the week',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGVH4Q5',
    skip: 'too vague',
  },
  {
    label: 'Structure of numbers',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGCRH6P',
    skip: 'too vague',
  },
  {
    label: 'Structure of times (basic)',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGN6BBU',
    matcherId: 'oClock',
  },
  {
    label: 'Expressing close possession without "de"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGCI0KG',
    skip: 'too hard',
  },
  {
    label: 'Expressing possession with "de"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGUHQD2',
    skip: 'too hard',
  },
  {
    label: 'Questions with "ne"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGMJHZO',
  },
  {
    label: 'Suggestions with "ba"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGMPZ6D',
  },
  {
    label: 'Expressing existence in a place with "zai"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGLRWT8',
  },
  {
    label: 'Expressing existence with "you"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG04ZCI',
    skip: 'too hard',
  },
  {
    label: 'Expressing possession with "you"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGOOCVO',
    skip: 'too hard',
  },
  {
    label: 'Using the verb "jiao"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGUGWVZ',
    skip: 'tricky without better segmentation, low pri, can be considered vocab',
  },
  {
    label: 'Using the verb "qu"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGFYNCL',
  },
  {
    label: 'Using the verb "xing"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGPS9NY',
    skip: 'could be considered vocab, low pri, skip for now',
  },
  {
    label: 'Expressing "be going to" with "yao"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGVT2KN',
  },
  {
    label: 'Expressing a learned skill with "hui"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGRHM0E',
    skip:
      'covered by ASGZL717, possibility delete ASGZL717 and use this and neng explicityly later',
  },
  {
    label: 'Expressing ability or possibility with "neng"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG9PQ40',
    skip:
      'covered by ASGZL717, possibility delete ASGZL717 and use this and hui explicityly later',
  },
  {
    label: 'Expressing permission with "keyi"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG6SPYK',
    regexes: [/(可以)/],
  },
  {
    label: 'Wanting to do something with "yao"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGXVEAR',
  },
  {
    label: 'How to do something with "zenme"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGH2MNO',
    regexes: [/(怎么)(?:[^样]|$)/],
  },
  // {
  //   label: "Negation of past actions with \"meiyou\"",
  //   url: "https://resources.allsetlearning.com/chinese/grammar/ASGAUCXK",
  // },
  {
    label: 'Negative commands with "buyao"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGIVZJU',
  },
  {
    label: 'Standard negation with "bu"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGIPYFV',
    filterExamples: true,
  },
  {
    label: 'Basic sentence order',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGETNCO',
    skip: 'too vague',
  },
  {
    label: 'Connecting nouns with "shi"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGUN7RX',
  },
  {
    label: 'Expressing "excessively" with "tai"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG8HVFN',
  },
  {
    label: 'Simple "noun + adjective" sentences',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG17BLH',
    skip: 'too vague',
  },
  {
    label: 'Affirmative-negative question',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGZH7K3',
    matcherId: 'affirmativeNegativeQuestion',
  },
  {
    label: 'Placement of question words',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGJQPSC',
    skip: 'too vague',
  },
  {
    label: 'Tag questions with "bu"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG4D8XB',
  },
  {
    label: 'Tag questions with "ma"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGSJYZ2',
    matcherId: 'duima',
  },
  {
    label: 'Yes-no questions with "ma"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGQ2AZA',
    skip: 'covered by ASGSJYZ2',
  },
  {
    label: 'Comparing "er" and "liang"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGJ46H1',
    skip: 'skipping comparisons for now, revisit later',
  },
];

const a2 = [
  {
    label: 'Negative adjectives with "-si le"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGLEVUV',
  },
  {
    label: 'Approximations with "chabuduo"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG1NAXO',
  },
  {
    label: 'Emphasizing quantity with "dou"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGWNEYM',
  },
  {
    label: 'Expressing "all along" with "yizhi"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGP000J',
  },
  // {
  //   label: "Expressing \"already\" with \"yijing\"",
  //   url: "https://resources.allsetlearning.com/chinese/grammar/ASGNXI27",
  // },
  {
    label: 'Expressing "always" with "zongshi"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGXJPJS',
  },
  {
    label: 'Expressing "and also" with "hai"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGJBZKC',
  },
  {
    label: 'Expressing "even more" with "geng"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG4NIPB',
    matcherId: 'geng',
  },
  {
    label: 'Expressing "just" with "gang"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGQJJYO',
    matcherId: 'ganggang',
    regexes: [/(刚刚?)/],
  },
  {
    label: 'Expressing "only" with "zhi"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGN8C8R',
    regexes: [/(只)/],
  },
  {
    label: 'Expressing actions in progress with "zai"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG846EA',
  },
  {
    label: 'Negative commands with "bie"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG9W0UX',
    matcherId: 'negativeCommandsWithBie',
  },
  {
    label: 'Simultaneous tasks with "yibian"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG2ZC5S',
    matcherId: 'yibianYibian',
    regexes: [/(一边)[^边]+(一边)/],
  },
  {
    label: 'Asking about degree with "duo"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG9LLJU',
    regexes: [/(多).[吗]?[?？]/],
  },
  {
    label: 'Basic comparisons with "yiyang"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGC06N0',
  },
  {
    label: 'Expressing "a little too" with "you dian"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGPM3MY',
  },
  {
    label: 'Expressing "both A and B" with "you"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGPFUM2',
    matcherId: 'bothWithYou',
  },
  {
    label: 'Expressing "not very" with "bu tai"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGUNMHU',
  },
  {
    label: 'Expressing "really" with "zhen"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGC885D',
  },
  {
    label: 'Expressing distance with "li"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGI96BQ',
  },
  {
    label: 'Intensifying with "duo"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGGH7RR',
  },
  {
    label: 'Moderating positive adjectives with "hai"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGAY164',
  },
  {
    label: 'Modifying nouns with adjective + "de"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGVUFKX',
    skip: 'too hard',
  },
  {
    label: 'Modifying nouns with phrase + "de"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGLQKD2',
    skip: 'too hard',
  },
  {
    label: 'Superlative "zui"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG3544U',
    matcherId: 'zui',
  },
  {
    label: 'Expressing "or" in statements',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG6HYOU',
    matcherId: 'huozhe',
  },
  {
    label: 'The filler word "neige"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG8VJM8',
    skip: 'too hard',
  },
  {
    label: 'Two words for "but"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGUD81S',
  },
  {
    label: 'Using "gen" to mean "with"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGSZ0HP',
  },
  {
    label: 'After a specific time with "yihou"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGRLQGY',
    matcherId: 'yihou',
    skip: 'covered by ASGC3SCN currently, may want to switch that with this.',
  },
  {
    label: 'Before a specific time with "yiqian"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGJ2OJC',
  },
  {
    label: 'Expressing "before" in general with "yiqian"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGVCWLU',
  },
  {
    label: 'Expressing "just now" with "gangcai"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGQ1KOY',
  },
  {
    label: 'Expressing "when" with "de shihou"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGWN185',
    regexes: [/(的时候)/],
  },
  {
    label: 'In the future in general with "yihou"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGPVFU1',
  },
  {
    label: 'Time words and word order',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG5RWKO',
    skip: 'too vague',
  },
  {
    label: 'Approximating with sequential numbers',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGOUD8U',
    skip: 'too vague',
  },
  {
    label: 'Big numbers in Chinese',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGIM3AX',
  },
  {
    label: 'Structure of times (advanced)',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGDTO07',
  },
  {
    label: 'Using "ji" to mean "several"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGHC9CA',
    skip: 'to hard to distinguish this from question usage, will figure out later',
  },
  {
    label: 'Change of state with "le"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGT185D',
    skip: 'too hard',
  },
  {
    label: 'Conceding with "ba"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGJIP2E',
  },
  {
    label: 'Expressing "already" with just "le"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGM055L',
    skip: 'too hard',
  },
  {
    label: 'Expressing "not anymore" with "le"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGFR96B',
    skip: 'too hard',
  },
  {
    label: 'Expressing "now" with "le"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGE5Q4J',
    skip: 'too hard',
  },
  {
    label: 'Expressing completion with "le"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGAGDCQ',
    skip: 'too hard',
  },
  {
    label: 'Expressing experiences with "guo"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGQGV3P',
  },
  {
    label: 'Sentence-final interjection "a"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGW66JM',
  },
  {
    label: 'Softening speech with "ba"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGDHC1H',
  },
  {
    label: 'Structural particle "de"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG5MOMM',
    skip: 'too hard',
  },
  {
    label: 'Using "guo" with "le"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGP69JD',
  },
  {
    label: 'Basic comparisons with "bi"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG8SI2K',
  },
  {
    label: 'Expressing "from… to…" with "cong… dao…"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGGGIW8',
  },
  {
    label: 'Basic comparisons with "meiyou"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGEAH5M',
    skip: 'too hard',
  },
  {
    label: 'Directional verbs "lai" and "qu"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGRBKSL',
  },
  {
    label: 'Auxiliary verb "yao" and its multiple meanings',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG95AL1',
  },
  {
    label: 'Expressing "should" with "yinggai"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGV01X9',
  },
  {
    label: 'Expressing "will" with "hui"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGW9737',
  },
  {
    label: 'Expressing "would like to" with "xiang"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGT97VF',
  },
  {
    label: 'Actions in a row',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGPRGAX',
    skip: 'too hard',
  },
  {
    label: 'Expressing "difficult" with "nan"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG35T4H',
  },
  {
    label: 'Expressing "never" with "conglai"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG8NM5E',
  },
  {
    label: 'Expressing "together" with "yiqi"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGNVE15',
  },
  {
    label: 'Expressing duration with "le"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGJ36VN',
    skip: 'too hard',
  },
  {
    label: 'Expressing ongoing duration with double "le"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG69RR8',
  },
  {
    label: 'Inability with "mei banfa"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGI2KHC',
  },
  {
    label: 'Indicating location with "zai" before verbs',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGX0Z0N',
  },
  {
    label: 'Reduplication of verbs',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGYC77J',
    skip: 'too hard',
  },
  {
    label: 'Special cases of "zai" following verbs',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG90DXK',
  },
  {
    label: 'Special verbs with "hen"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGID0E8',
  },
  {
    label: 'Using "dao" to mean "to go to"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGLFX54',
    skip: 'too hard',
  },
  {
    label: 'Using "hao" to mean "easy"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGJQU93',
  },
  {
    label: 'Verbing briefly with "yixia"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGWCESP',
  },
  {
    label: 'Verbs that take double objects',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGI2OAG',
    skip: 'too hard',
  },
  {
    label: 'Potential complement "-bu dong" for not understanding',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG8R2V8',
  },
  {
    label: 'Result complement "-wan" for finishing',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGNQUC1',
  },
  {
    label: 'Result complements "-dao" and "-jian"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGWNGEP',
  },
  {
    label: 'Expressing "some" with "yixie"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGWVZ0T',
  },
  {
    label: 'Using "youde" to mean "some"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG4NDHB',
    regexes: [/(有的)[^的]+(有的)/, /(有的)[^有]+(有的)/],
  },
  {
    label: 'Counting money',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGL6JOE',
    matcherId: 'duoshaoqian',
  },
  {
    label: 'Expressing "every" with "mei"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGB6L4M',
  },
  {
    label: 'Expressing "half" with "ban"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGAC1P9',
  },
  {
    label: 'Measure words for counting',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG64BTE',
    skip: 'too hard',
  },
  {
    label: 'Measure words in quantity questions',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGL9KQM',
  },
  {
    label: 'Measure words with "this" and "that"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGZC42B',
  },
  {
    label: 'Ordinal numbers with "di"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGK904U',
  },
  {
    label: 'Asking why with "zenme"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGD7NS3',
    skip: 'Roll this into the zenme pattern with ASGH2MNO',
  },
  {
    label: 'Questions with "le ma"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGYKDNF',
    skip: 'too hard',
  },
  {
    label: 'Cause and effect with "yinwei" and "suoyi"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGTDUJO',
    regexes: [/(因为)[^所以]+(所以)/, /(因为|所以)/],
  },
  {
    label: 'Expressing "about to happen" with "le"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGNGEU8',
  },
  {
    label: 'Expressing "everything" with "shenme dou"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGAQV6C',
  },
  {
    label: 'Expressing "stop doing" with "bie… le"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGZ8OIF',
  },
  {
    label: 'Expressing location with "zai... shang / xia / li"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGFBWZL',
  },
  {
    label: 'Comparing "bu" and "mei"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGRJ1BI',
  },
  {
    label: 'Comparing "yao" and "xiang"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGD88UO',
  },
];

const b1 = [
  {
    label: 'Adjectives with "name" and "zheme"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGNKKP6',
    matcherId: 'nameZheme',
  },
  {
    label: 'Expressing "not very" with "bu zenme"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGVYIZT',
  },
  {
    label: 'Indicating the whole with "quan"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGCPDSR',
  },
  {
    label: 'Positive adjectives with "-ji le"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGVME5V',
  },
  {
    label: 'Reduplication of adjectives',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGDHE8S',
    skip: 'too hard',
  },
  {
    label: 'Turning adjectives into adverbs',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGMAFSX',
    skip: 'too hard',
  },
  {
    label: 'Adding emphasis with "jiushi"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGK213C',
  },
  {
    label: 'Coincidence with "zhenghao"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGUD25J',
  },
  {
    label: 'Emphasis with "jiu"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGY21RK',
  },
  {
    label: 'Emphasizing negation with "you"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGD3C4S',
  },
  {
    label: 'Expressing "again" in the future with "zai"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGIZQJ2',
    regexes: [/(再)[^见]/],
  },
  {
    label: 'Expressing "again" in the past with "you"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGN1JR5',
  },
  {
    label: 'Expressing "all along" with "yuanlai"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGTKXFR',
  },
  {
    label: 'Expressing "all at once" with "yixiazi"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG06EA8',
    skip: 'too hard',
  },
  {
    label: 'Expressing "almost" using "chadian"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG6ESWW',
    regexes: [/(差点儿?)[^了]+(了)?/],
  },
  {
    label: 'Expressing "always" with "conglai"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG8KUHG',
  },
  {
    label: 'Expressing "as a result" with "jieguo"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG6B21A',
    matcherId: 'jieguo',
  },
  {
    label: 'Expressing "each other" with "huxiang"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGF00B7',
    matcherId: 'huxiang',
  },
  {
    label: 'Expressing "enough" with "gou"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG49BE6',
  },
  {
    label: 'Expressing "finally" with "zhongyu"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG700A5',
    matcherId: 'zhongyu',
  },
  {
    label: 'Expressing "had better" with "haishi"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGWAR65',
    matcherId: 'haishiBa',
  },
  {
    label: 'Expressing "had better" with "zuihao"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG35CD7',
    matcherId: 'zuihao',
  },
  {
    label: 'Expressing "in this way" with "zheyang"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG1F4D1',
  },
  {
    label: 'Expressing "nearly" with "jihu"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGVA70K',
  },
  {
    label: 'Expressing "never again" with "zai ye bu"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG7R8US',
  },
  {
    label: 'Expressing "no wonder"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGFPV2C',
  },
  {
    label: 'Expressing "one by one" with "yi"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGBC7A0',
  },
  {
    label: 'Expressing "quite" with "ting"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGDF1F7',
  },
  {
    label: 'Expressing "small quantity" with "jiu"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGPW8PP',
  },
  {
    label: 'Expressing concern with "kongpa"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGD4BA3',
  },
  {
    label: 'Expressing earliness with "jiu"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGKITRZ',
  },
  {
    label: 'Expressing good luck',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGOB1BF',
    regexes: [/((?:幸亏|幸好|还好))[^然]+(不然)?/],
  },
  {
    label: 'Expressing lateness with "cai"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG3WTCJ',
  },
  {
    label: 'The opposite of "cha hen duo" is "chabuduo"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGQAN74',
    matcherId: 'chahenduo',
  },
  {
    label: 'Using "always" as a complaint with "laoshi"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGII66E',
  },
  {
    label: 'Using "cai" for small numbers',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGYW5RS',
  },
  {
    label: 'Using "ye" and "dou" together',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG8GSXY',
  },
  {
    label: 'Continuation with "hai"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGIRILI',
  },
  {
    label: 'Expressing "much more" in comparisons',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG6KUS5',
    matcherId: 'biDuole',
  },
  {
    label: 'Expressing "rather" with "bijiao"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG72HKP',
  },
  {
    label: 'Ending a non-exhaustive list with "shenme de"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGDIDAC',
  },
  {
    label: 'Expressing "stuff like that" with "zhileide"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGPY23Z',
  },
  {
    label: 'Non-exhaustive lists with "dengdeng"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGF763H',
    regexes: [/(等等)/, /.+[,，、].+(等)/], // TODO: Improve this matcher
  },
  {
    label: 'A softer "but"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGA0S4T',
  },
  {
    label: 'Expressing "in addition" with "haiyou"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGHQRI1',
  },
  {
    label: 'Expressing "in addition" with "lingwai"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG2KQZI',
  },
  {
    label: 'Expressing "in addition" with "zaishuo"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGATDLX',
  },
  {
    label: 'Expressing "otherwise" with "yaobu"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGDFQP7',
  },
  {
    label: 'Expressing "then…" with "name"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGX298Z',
  },
  {
    label: 'Expressing "when" with "dengdao"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/NEEDFFFCODE',
    skip: 'broken',
  },
  {
    label: 'Using "lai" to connect two verb phrases',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGBZ578',
  },
  {
    label: 'Before and after with "zhiqian" and "zhihou"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGTD3L3',
  },
  {
    label: 'Expressing "when" with "shi"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGGL59D',
    matcherId: 'expressingWhenWithShi',
  },
  {
    label: 'Expressing fractions with "fenzhi"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG84RE9',
  },
  {
    label: 'Saying "ever since" with "yilai"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGNEMXP',
  },
  {
    label: 'Sequencing past events with "houlai"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGY0UDC',
  },
  {
    label: 'Advanced yes-no questions with "ma"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGI9WXT',
  },
  {
    label: 'Aspect particle "zhe"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGOIDEO',
  },
  {
    label: 'Expressing the self-evident with "ma"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGVMC4B',
    regexes: [/(嘛)/],
  },
  {
    label: 'Reviewing options with "ba"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGELOTT',
    matcherId: 'reviewOptionsBa',
  },
  {
    label: 'Defining scope',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG7AE5C',
    regexes: [/(以上|以下)/, /(以内|以外)/],
  },
  {
    label: 'Expressing "about" with "guanyu"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG49889',
  },
  {
    label: 'Expressing "age difference" with "da and xiao"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGE8810',
  },
  {
    label: 'Expressing "for" with "gei"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGLHAV3',
  },
  {
    label: 'Expressing "for" with "wei"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG68RBX',
  },
  {
    label: 'Expressing "less than" with "budao"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG10CAE',
  },
  {
    label: 'Expressing "toward" with "wang"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/NEEDFFFCODE',
    skip: 'too hard',
  },
  {
    label: 'Expressing purpose with "weile"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGQGJXT',
  },
  {
    label: 'Using "dui" with verbs',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG8ICO9',
  },
  {
    label: 'Using "xiang"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGQXARS',
  },
  {
    label: 'Verbs preceded by "gei"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG3ORNN',
    skip: 'combine with for with gei pattern',
  },
  {
    label: 'Expressing "double negation"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGEEA2D',
    skip: 'Too hard',
  },
  {
    label: 'Appearance with "kanqilai"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG9K0F8',
  },
  {
    label: 'Causative verbs',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG5T7XC',
    skip: 'too vague',
  },
  {
    label: 'Expressing "after" with "jingguo"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG11DA8',
  },
  {
    label: 'Expressing "compared with" with "gen"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG920B7',
  },
  {
    label: 'Expressing "don\'t need to" with "buyong"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGECD0E',
  },
  {
    label: 'Expressing "including" with "baokuo"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG50341',
    regexes: [/(包括)/, /(包括)[^共括]+((?:在内)?一共)/],
    description:
      '"包括" can be used to mean "including" in English. It can be used with "在内一共" or just "一共" to express "all together" or "in total"',
  },
  {
    label: 'Expressing "it seems" with "haoxiang"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG3ROPY',
  },
  {
    label: 'Expressing "not at all" with "yidianr ye bu"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGRURCZ',
    regexes: [/(一点(?:也|都)(?:不|没))/],
  },
  {
    label: 'Expressing "thanks to" somebody with "duokui"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG44TBS',
  },
  {
    label: 'Expressing "through" with "tongguo"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG9B1E3',
  },
  {
    label: 'Expressing comparable degree with "you"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG5DG95',
  },
  {
    label: 'Making judgments with "suan"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGWDWFN',
    skip: 'too hard',
  },
  {
    label: 'Mistakenly think that',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGRBC43',
  },
  {
    label: 'Using "lai" as a dummy verb',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG98FZK',
  },
  {
    label: 'Verbs followed by "gei"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGMMHTQ',
    skip: 'combine with for with gei pattern',
  },
  {
    label: 'Doing something less with "shao"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG9B0M8',
  },
  {
    label: 'Doing something more with "duo"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGLKGZP',
  },
  {
    label: 'Expressing "must" with "dei"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGPXLP9',
  },
  {
    label: 'Expressing "not often" with "bu zenme"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG5BOGP',
  },
  {
    label: 'Expressing actions in progress (full form)',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGEYQ9O',
    skip: 'too hard',
  },
  {
    label: 'Expressing duration of inaction',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGSVF28',
  },
  {
    label: 'Separable verb',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG4GVRX',
  },
  {
    label: 'Expressing "if…, then…" with "ruguo…, jiu…"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGGIVT0',
  },
  {
    label: 'Phrases using "laishuo"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGD60A6',
    skip: 'too hard',
  },
  {
    label: 'Degree complement',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG79STE',
    skip: 'too hard',
  },
  {
    label: 'Direction complement',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG8LWBJ',
    skip: 'too hard',
  },
  {
    label: 'Potential complements',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGCPJPQ',
    skip: 'too hard',
  },
  {
    label: 'Result complement "-qilai"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGBPXOB',
  },
  {
    label: 'Result complement "xiaqu"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG1PTJX',
  },
  {
    label: 'Result complements',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGNNMST',
    skip: 'too hard',
  },
  {
    label: 'Tricky uses of "dao"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGCUSIV',
  },
  {
    label: 'Expressing "one of" with "…zhi yi"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGMT1M1',
    description:
      'In order to express "one of the..." in Chinese, "之一" (zhī yī) can be used at the end of the sentence.',
  },
  {
    label: 'Indicating a number in excess',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG004ZK',
    regexes: [/[零一二三四五六七八九十百千万亿两0-9](多)/],
  },
  {
    label: 'Measure words for verbs',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG5AODR',
    skip: 'too hard',
  },
  {
    label: 'Conceding a point with "shi"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGT9Y8P',
  },
  {
    label: 'Events in quick succession with "yi... jiu..."',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGTFUD0',
  },
  {
    label: 'Expressing "about to" with "jiuyao"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG9B210',
  },
  {
    label: 'Expressing "already" with "dou"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGT1CIR',
  },
  {
    label: 'Expressing "although" with "suiran" and "danshi"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGXI560',
    regexes: [/(虽然)[^但可]+(但是|可是)/],
  },
  {
    label: 'Expressing "any" with "renhe"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGP8DXU',
  },
  {
    label: 'Expressing "as one likes" with "jiu"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGDUZ55',
  },
  {
    label: 'Expressing "even" with "lian" and "dou"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGNP0WV',
    skip: 'too hard',
  },
  {
    label: 'Expressing "every time" with "mei" and "dou"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGXHQEF',
  },
  {
    label: 'Expressing "every" with question words',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG13ALM',
    matcherId: 'everyDou',
  },
  {
    label: 'Expressing "except" and "in addition" with "chule… yiwai"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGHFPGG',
  },
  {
    label: 'Expressing "it depends" with "kan"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG765HD',
  },
  {
    label: 'Expressing "more and more" with "yuelaiyue"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG7UE4H',
  },
  {
    label: 'Expressing "not even one"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGUQ861',
  },
  {
    label: 'Expressing "not only... but also"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGTYJ3E',
  },
  {
    label: 'Expressing not knowing how to do something using "hao"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG0EQQJ',
  },
  {
    label: 'Expressing various aspects with "yi fangmian"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGCWHNF',
    matcherId: 'yiFangmian',
    regexes: [/(一方面)[^面]+(另?一方面)/, /(一方面)[^方]+(另?一方面)/],
  },
  {
    label: 'Giving perspective with "yaowoshuo"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGITYYM',
  },
  {
    label: 'Idiomatic phrases with "zai"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGH13JY',
  },
  {
    label: 'Indicating purpose or intent using "shi...de"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG0UFR4',
  },
  {
    label: 'Referring to "all" using "suoyou"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGOWBSL',
    regexes: [/(所有的?)[^都]+(都)?/],
  },
  {
    label: 'Sequencing with "xian" and "zai"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGLJM55',
  },
  {
    label: 'The "if" sandwich pattern',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGN4VUU',
  },
  {
    label: 'The pattern "it\'s not…, it\'s…"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGT9WYR',
  },
  {
    label: 'Topic-comment sentences',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG5KNWW',
    skip: 'too hard',
  },
  {
    label: 'Using "ba" sentences',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG2UB2B',
    skip: 'too hard',
  },
  {
    label: 'Using "bei" sentences',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGHF9F1',
  },
  {
    label: 'Using "de" (modal particle)',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG19S1M',
    skip: 'too hard',
  },
  {
    label: 'Using the "shi... de" construction',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG8YTSF',
  },
  {
    label: 'Expressing "either... or..." with "yaome"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG30A60',
  },
  {
    label: 'Comparing "cai" and "jiu"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGLOS9C',
    skip: 'should be covered by cai and jiu individually',
  },
  {
    label: 'Comparing "youdian" and "yidian"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGV55Y4',
  },
  {
    label: 'Comparing "zai" and "you"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGTBHBG',
  },
  {
    label: 'Comparing "hui" "neng" "keyi"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGZL717',
  },
  {
    label: 'Comparing "haishi" and "huozhe"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGQJ5IC',
    matcherId: 'expressingOrWithHaishiAndHuozhe',
  },
  {
    label: 'Comparing "weile" and "yinwei"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGMEC1P',
  },
  {
    label: 'Comparing "renjia" and “bieren"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGPINA4',
  },
  {
    label: 'Comparing "zhijian" and “zhongjian"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGN6O6J',
  },
  {
    label: 'Comparing "dui" and "duiyu"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG3JELV',
    skip: 'hold off on comparisons for now, revisit later',
  },
  {
    label: 'Comparing "li" and "cong"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG59C66',
    skip: 'hold off on comparison for now, revisit later',
  },
  {
    label: 'Comparing "gang" and "gangcai"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGJFFWG',
  },
  {
    label: 'Comparing "houlai" and "ranhou"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGA3RJD',
    skip: 'conflicting with houlaiPattern, revisit later',
  },
  {
    label: 'Comparing "yihou" and "de shihou"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGLNKZR',
    regexes: [/(以后|的时候)/],
  },
  {
    label: 'Comparing "yihou" and "houlai"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGNPJ7T',
  },
  {
    label: 'Comparing "yihou" and "zhihou"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGC3SCN',
  },
  {
    label: 'Comparing "xiande" and "kanqilai"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGKQEG9',
  },
];

const b2 = [
  {
    label: 'Adjectival complement "de budeliao"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGB8BWA',
  },
  {
    label: 'Adjectival complement "de hen"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGG1ZBL',
  },
  {
    label: 'Challenging an adjective with "shenme"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGNV2TZ',
  },
  {
    label: 'Expressing "a bit too"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGEHTV5',
  },
  {
    label: 'Saying "a lot" with "youdeshi"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGVACYB',
  },
  {
    label: 'Advanced use of "you"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGF08B6',
    regexes: [/(了又)[^还就终]+((?:还是|就是|终于))/],
  },
  {
    label: 'Advanced uses of "dou"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGQFW44',
  },
  {
    label: 'Advanced uses of "zong"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG8QS6H',
  },
  {
    label: 'An additional step with "jin yi bu"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGET76G',
  },
  {
    label: 'Assessing situations with "kanlai"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGJPQ0Q',
  },
  {
    label: 'Declaring the only option with "zhihao"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG767A2',
  },
  {
    label: 'Emphatic adverb "ke"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGSPAKW',
  },
  {
    label: 'Expressing "after all" with "bijing"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG4V36Q',
  },
  {
    label: 'Expressing "almost" using "chadian mei"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGGOUJB',
    regexes: [/(差点儿?没)/],
  },
  {
    label: 'Expressing "anyway" as "fanzheng"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGZVM27',
  },
  {
    label: 'Expressing "as much as possible" with "jinliang"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGINBWJ',
  },
  {
    label: 'Expressing "even" with "shenzhi"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGKWV6F',
  },
  {
    label: 'Expressing "have to" with budebu',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG0C825',
  },
  {
    label: 'Expressing "in the end" with "daodi"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGTVEHJ',
  },
  {
    label: 'Expressing "in the end" with "jiujing"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGDK0BR',
  },
  {
    label: 'Expressing "just" do it with "gancui"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGZ8MJM',
  },
  {
    label: 'Expressing "originally" with "benlai"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG6F157',
  },
  {
    label: 'Expressing "over and over again" with "zaisan"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGP6LVA',
  },
  {
    label: 'Expressing "simply" with "jianzhi"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG8OLAE',
  },
  {
    label: 'Expressing "since the beginning" with "yixiang"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGACMNQ',
  },
  {
    label: 'Expressing "while you\'re at it" with "shunbian"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG5334C',
  },
  {
    label: 'Expressing difficulty with "hao (bu) rongyi"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG81QV3',
  },
  {
    label: 'Expressing indifference with "jiu"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGL4O5E',
  },
  {
    label: 'Expressing wasted efforts with "bai"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGTIMTS',
  },
  {
    label: 'Rhetorical questions with "nandao"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGMCP9V',
  },
  // {
  //   label: "Listing things with \"a\"",
  //   url: "https://resources.allsetlearning.com/chinese/grammar/ASGGPG97",
  // },
  {
    label: 'Expressing "and" with "he" (advanced)',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGXN52R',
  },
  {
    label: 'Using "er" to explain contrasting ideas',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGMX0ZS',
    matcherId: 'contrastingIdeasEr',
  },
  {
    label: 'Expressing "among" with "dangzhong"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGS4DBY',
  },
  {
    label: 'Expressing "within (it/them)" with "qizhong"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGD1LNT',
  },
  {
    label: 'Name-calling with "zhege"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGNPO4V',
  },
  {
    label: 'Softening the tone of questions with "ne"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGW7YXP',
  },
  // {
  //   label: "Taiwanese \"you\"",
  //   url: "https://resources.allsetlearning.com/chinese/grammar/ASGY2D79",
  // },
  {
    label: 'Expressing "along with…" with "suizhe"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGHVFRA',
  },
  {
    label: 'Expressing "ever since" with "zicong"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGLI7GW',
  },
  {
    label: 'Expressing "on the basis of" with "ping"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGGB3IV',
  },
  {
    label: 'Expressing "with regards to" with "zhiyu"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGZRKTG',
  },
  {
    label: 'Expressing passive voice with "gei"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGEZ2HN',
  },
  {
    label: 'Limiting scope with "jiu"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG8RW47',
    skip: 'too hard',
  },
  {
    label: 'Opportune timing with "chen"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGI9PNV',
  },
  {
    label: 'Emphasizing a negation with "bing"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGUQUPG',
  },
  {
    label: 'Expressing "if it were not for" with "yaobushi"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG8F7D4',
  },
  {
    label: 'Expressing "that\'s all" with "eryi"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG6TB4J',
  },
  {
    label: 'Basic comparisons with "bu bi"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG8DVSO',
  },
  {
    label: 'Challenging a verb with "shenme"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGN3IGH',
  },
  {
    label: 'Comparing specifically with "xiang"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG1MD4N',
    matcherId: 'comparisonXiang',
    regexes: [/(不?像|没有?)[^一样]+(一样)/, /(不?像|没有?)[^么]*((?:这么|那么))/],
  },
  {
    label: 'Comparisons with "buru"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGWH1D5',
  },
  {
    label: 'Expressing "compared with" with "gen"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG920B7',
  },
  {
    label: 'Making "-ize" and "-ify" verbs with "hua"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGS6UKN',
  },
  {
    label: 'Using "nanguai" as a verb',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGYKH5G',
  },
  {
    label: 'Expressing future with "jiang"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGIQPUJ',
  },
  {
    label: 'Combining verbs with "bing"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG5C89R',
    matcherId: 'bingqie',
  },
  {
    label: 'Emphasizing the doer of an action with "you"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGGNXVR',
    matcherId: 'doerOfActionYou',
  },
  {
    label: 'Expressing "hard to avoid" with "nanmian"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGYDKT3',
  },
  {
    label: 'Expressing "to be worth" doing with "zhide"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGGJA6A',
  },
  {
    label: 'Facilitating an outcome with "yibian"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGXU2H4',
  },
  {
    label: 'Passive verbs with "shou"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG1DXUD',
  },
  {
    label: 'Using "zhe" when "verbing away"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG7AUNJ',
    regexes: [/(着)[^着就]+(着)[^就]*(就)[^了]+(了)/],
  },
  {
    label: 'Expressing "although" with "jinguan"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGW863F',
    regexes: [/(尽管)[^还是仍然]+((?:还是|仍然))?/],
  },
  {
    label: 'Expressing "not… but rather…" with "er shi"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGAJGJD',
  },
  {
    label: 'Expressing "on the contrary" with "fan\'er"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGX5QTV',
  },
  {
    label: 'Expressing contrariness with "dao"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG1RE80',
    skip: 'too hard',
  },
  {
    label: 'The "however" adverb "que"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGEG2QB',
  },
  {
    label: 'Expressing "even if…" with "jishi"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGBUXN7',
  },
  {
    label: 'Expressing "even if…" with "jiushi"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGF1TQ2',
  },
  {
    label: 'Expressing "even if…" with "jiusuan"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGLI513',
  },
  {
    label: 'Expressing "even if…" with "napa"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGXX3NY',
  },
  {
    label: 'Expressing "if… then…" with "jiaru"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGHNDX4',
  },
  {
    label: 'Expressing "if… then…" with "jiashi"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGVRGW2',
    regexes: [/(假使)[^就]+(就)?/],
  },
  {
    label: 'Expressing "if… then…" with "yaoshi"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGN4S8O',
  },
  {
    label: 'Marking a topic with "de hua"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGB0MXK',
  },
  {
    label: 'Expressing "no matter" with "buguan"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG0NDS6',
  },
  {
    label: 'Expressing "no matter" with "wulun"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG6ZI8L',
    regexes: [/(无论)[^都也，]+((?:都|也|，))/],
  },
  {
    label: 'Expressing "due to…" with "youyu"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGL90MR',
  },
  {
    label: 'Expressing "since" with "jiran"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGG4BX9',
    regexes: [/(既然)[^那就]+(那|就|那就)?/],
  },
  {
    label: 'Expressing "therefore" with "yinci"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGUEFAL',
  },
  {
    label: 'Stating the effect before the cause',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGTPGXK',
  },
  {
    label: 'Using "because" with "er" to indicate effect',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGL1V0A',
  },
  {
    label: 'Advanced potential complement',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG516F9',
  },
  {
    label: 'Resultative complement "chu(lai)"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGBYRLP',
  },
  {
    label: 'Resultative complement "kai"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGFV70R',
  },
  {
    label: 'Resultative complement "zhu"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG4OM4T',
  },
  {
    label: 'Using "lai" and "qu" when "verbing around"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGYJQAG',
  },
  {
    label: 'Using "zhao" as complement',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGM5ZAB',
  },
  {
    label: 'Expressing "as long as" with "zhiyao"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG98C1A',
  },
  {
    label: 'Expressing "once...then..." with "yidan...jiu..."',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGU3ZV1',
  },
  {
    label: 'Expressing "only if" with "zhiyou"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGJDV3Y',
  },
  {
    label: 'Expressing "unless" with "chufei"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGMD0YY',
    regexes: [/(除非)[^否然]+(否则|不然)?[^才]+(才)?/],
  },
  {
    label: 'Advanced uses of "ba"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGQRS3P',
  },
  {
    label: 'Conditions with "yao" and "jiu"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGXGADL',
  },
  {
    label: 'Expressing "both… and…" with "ji...you"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGZRPCK',
  },
  {
    label: 'Expressing "the more... the more..." with "yue… yue…"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGB44F6',
    regexes: [/(越)[^越]+(越)/],
  },
  {
    label: 'Expressing "would rather" with "ningke"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGF3F2Y',
  },
  {
    label: 'Expressing purpose with "haorang"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG18JOA',
  },
  {
    label: 'Expressing simultaneous actions with "yimian"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG1QB4K',
  },
  // {
  //   label: "Expressing the only two possibilities",
  //   url: "https://resources.allsetlearning.com/chinese/grammar/ASGEXR6R",
  // },
  {
    label: 'Occurring together with "shaobuliao"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG3IR71',
  },
  {
    label: 'Providing two options with double "huozhe"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGYXI5X',
    regexes: [/(或者)[^或者]+(或者)/],
  },
  {
    label: 'Expressing "let alone" with "bie shuo"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGR6Q2J',
  },
  {
    label: 'Expressing "let alone" with "geng buyong shuo"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGHOI8S',
    regexes: [/(连)?[^都也]+((?:都|也))?[^说]+(更不用说)[^了]+(了)/],
  },
  {
    label: 'Expressing "let alone" with "hekuang"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG3ZS9G',
    regexes: [/(连?)[^都]+(都(?:(?:不|没)?))?[^何况]+(何况)[^呢]+(呢)?/],
  },
  {
    label: 'Expressing "not only… but also" with "bujin"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGEM2VR',
  },
  {
    label: 'Many types of "not only... but also..."',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGJ1VZQ',
  },
  {
    label: 'Comparing "benlai" and "yuanlai"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG56QKW',
    matcherId: 'comparingBenlaiAndYuanLai',
    skip: 'already covered by benlai and yuanlai individually',
  },
  {
    label: 'Comparing "buduan" and "buting"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGIKHUH',
  },
  {
    label: 'Comparing "turan" and “huran"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGHKZP4',
  },
  {
    label: 'Comparing "zongsuan" and “zhongyu"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGT8AUA',
  },
  {
    label: 'Comparing "fan\'er" and “que"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG0K25S',
  },
  {
    label: 'Comparing "gen" and "dui"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGC5Y86',
    skip: 'too hard, too broad',
  },
  {
    label: 'Comparing "chao" "xiang" and "wang"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGIHS2L',
  },
  {
    label: 'Comparing "duiyu" and "zhiyu"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGC01S0',
  },
  {
    label: 'Comparing "guanyu" and "duiyu"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASG1HNBU',
  },
  {
    label: 'Comparing "fan\'er" and “xiangfan"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGFNS52',
    matcherId: 'comparingFanerAndXiangfan',
  },
  {
    label: 'Comparing "kending" "queding" and “yiding"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGDPS0J',
  },
  {
    label: 'Comparing "shihe" and "heshi"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGVDOXL',
  },
  {
    label: 'Comparing "changchang" and "jingchang"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGE8FLP',
  },
  {
    label: 'Comparing "pingshi" and "pingchang"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGJOGGG',
  },
  {
    label: 'Comparing "yizhi" and "yixiang"',
    url: 'https://resources.allsetlearning.com/chinese/grammar/ASGVEP8S',
  },
];

module.exports = {
  a1,
  a2,
  b1,
  b2,
  all: [...a1, ...a2, ...b1, ...b2],
};
