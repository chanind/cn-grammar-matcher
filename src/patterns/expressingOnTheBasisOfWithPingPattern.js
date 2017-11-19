const { and, pos, word } = require('../lib/tokenFilters');
const { regexMatchLocs } = require('../lib/matching/regexMatch');
const { mergeLocMatchGroups } = require('../lib/matching/utils');
const { Node, Edge, graphMatch } = require('../lib/matching/graphMatch');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGGB3IV',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'expressingOnTheBasisOfWithPing',
  structures: [
    '凭 + Noun / Noun Phrase',
    '凭 + Verb Phrase / Subj.-Predicate',
    'Subj. + 凭什么 + Verb Phrase',
    '凭着 + Noun / Noun Phrase',
  ],
  description:
    '凭 is a  preposition that means "on the basis of" or "by virtue of." Usually the subject of a sentence with 凭 is a person.',
  sources: [allSetSrc],
  match: sentence => {
    const text = sentence.original;
    return mergeLocMatchGroups([
      regexMatchLocs(text, /(凭什么)/),
      regexMatchLocs(text, /(凭着)/),
      graphMatch(
        sentence.tokens,
        new Node({ filter: pos('V.') }, [
          new Edge(
            { type: 'advmod', ahead: true },
            new Node({ filter: and(pos('AD'), word('.?凭')), capture: '凭' })
          ),
          new Edge({ ahead: true }, new Node({ filter: pos('NN') })),
        ])
      ),
      graphMatch(
        sentence.tokens,
        new Node({}, [
          new Edge(
            { type: 'case', ahead: true },
            new Node({ filter: and(pos('P'), word('凭')), capture: '凭' })
          ),
        ])
      ),
    ]);
  },
  examples: [
    {
      zh: '凭护照，外国人可以买火车票。',
      en: 'With the help of a passport, foreigners can buy train tickets.',
      src: allSetSrc,
    },
    {
      zh: '他凭自己的努力学了三千多个汉字。',
      en: 'He studied more than three thousand Chinese characters on his own volition.',
      src: allSetSrc,
    },
    {
      zh: '我们凭学生证在电影院享受折扣优待。',
      en:
        'Since we have student ID cards, we enjoy a special discount at the movie theater.',
      src: allSetSrc,
    },
    {
      zh: '怪不得那个孩子的数学不好，他只凭计算器算。',
      en:
        "No wonder that kid's math is so bad. It's because he always uses a calculator.",
      src: allSetSrc,
    },
    {
      zh: '学好跳舞不能只凭看迈克尔·杰克逊的音乐录像带，还得凭自己的努力。',
      en:
        "Watching Michael Jackson music videos isn't enough to study how to dance. You also have to push yourself.",
      src: allSetSrc,
    },
    {
      zh: '凭老李在这一行做了二十年，他就有资格做你的师傅。',
      en:
        "On the basis of Old Li's twenty years of experience, he is qualified to be your teacher.",
      src: allSetSrc,
    },
    {
      zh: '凭我学中文的时间比你短但是说得比你好，我就可以说我比你聪明。',
      en:
        "From the fact that I have studied Chinese for a shorter time, but speak better than you, I can say that I'm more intelligent than you are.",
      src: allSetSrc,
    },
    {
      zh: '你凭什么怪我！',
      en: 'On what grounds are you blaming me?',
      src: allSetSrc,
    },
    {
      zh: '我没有做错，他凭什么骂我？',
      en: "I haven't done anything wrong. How can you scold me?",
      src: allSetSrc,
    },
    {
      zh: '她一直很忠诚，你凭什么怀疑她？',
      en: "She's always been honest, how can you mistrust her?",
      src: allSetSrc,
    },
    {
      zh: '小白凭着自己的努力致富。',
      en: 'Off of his own hard work, Little Bai was able to become rich.',
      src: allSetSrc,
    },
    {
      zh: '他凭着智慧战胜了很多的困难。',
      en: 'Using his intellect, he was able to overcome many challenges.',
      src: allSetSrc,
    },
  ],
};
