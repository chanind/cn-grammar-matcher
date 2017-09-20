/* --- AUTOGENERATED FILE -----------------------------
* If you make changes to this file delete this comment.
* Otherwise the file may be overwritten in the future.
* --------------------------------------------------- */

const { regexMatchLocs } = require('../lib/matching/regexMatch');
const { mergeLocMatchGroups } = require('../lib/matching/utils');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGXHQEF',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'meiDou',
  name: '每 + Verb + Number + Measure Word + Noun + 都 + Verb',
  description:
    '每⋯⋯都⋯⋯ (měi... dōu...) is a pattern used to express "every time," even though the phrase 每次 (měi cì) may not be explicitly used.',
  sources: [allSetSrc],
  match: sentence => {
    const text = sentence.original;
    return mergeLocMatchGroups([regexMatchLocs(text, /(每)[^都]+(都)/)]);
  },
  examples: [
    {
      zh: '他每遇到一个问题都要记下来。',
      en: 'Every time he comes across a problem, he needs to write it down.',
      src: allSetSrc,
    },
    {
      zh: '她每去一个地方都要拍照。',
      en: 'Every time she visits some place, she takes photos.',
      src: allSetSrc,
    },
    {
      zh: '他每拍完一部电影都要休息一个月。',
      en:
        'Every time he finishes shooting a movie, he needs to take a break for one month.',
      src: allSetSrc,
    },
    {
      zh: '记住，每写完一篇文章都要保存。',
      en: 'Remember, every time you finish writing an article, save it.',
      src: allSetSrc,
    },
    {
      zh: '他每换一个工作，都要搬家。',
      en: 'Every time he starts a new job, he moves.',
      src: allSetSrc,
    },
    {
      zh: '为什么我每说一件事，你都要问“真的吗”？',
      en: 'Why you have to ask "really" every time I say something?',
      src: allSetSrc,
    },
  ],
};