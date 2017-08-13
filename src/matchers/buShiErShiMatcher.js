/* --- AUTOGENERATED FILE -----------------------------
* If you make changes to this file delete this comment.
* Otherwise the file may be overwritten in the future.
* --------------------------------------------------- */

const { mergeLocMatchGroups, regexMatchLocs } = require('../lib/regexMatchers');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGAJGJD',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'buShiErShi',
  name: '不是 + A + 而是 + B',
  description:
    '不是⋯⋯而是⋯⋯ (bù shì... ér shì) means "not A, but rather B." This is a useful phrase to use in arguments to overturn a point of view and state the opposite.',
  sources: [allSetSrc],
  match: sentence => {
    const text = sentence.original;
    return mergeLocMatchGroups([
      regexMatchLocs(text, /(不是)[^而是]+(而是)/),
      regexMatchLocs(text, /(是)[^而不是]+(而不是)/),
    ]);
  },
  examples: [
    {
      zh: '我不是不想帮忙而是没有能力帮忙。',
      en: "It's not that I don't want to help, it's that I can't help.",
      src: allSetSrc,
    },
    {
      zh: '我认为有的人做慈善活动的目的不是为了帮助穷人而是为了提高他们的名誉。',
      en:
        'I think that some people do charitable things, not only to help poor people, but also to improve their reputation.',
      src: allSetSrc,
    },
  ],
};
