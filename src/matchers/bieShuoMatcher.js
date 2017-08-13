/* --- AUTOGENERATED FILE -----------------------------
* If you make changes to this file delete this comment.
* Otherwise the file may be overwritten in the future.
* --------------------------------------------------- */

const { mergeLocMatchGroups, regexMatchLocs } = require('../lib/regexMatchers');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGR6Q2J',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'bieShuo',
  name: '别说 + A ， 连  / 就是+ B + 也 / 都 + Verb',
  description:
    '别说 (bié shuō) means something like "leaving aside" or "don\'t think about," and is used in the following way:',
  sources: [allSetSrc],
  match: sentence => {
    const text = sentence.original;
    return mergeLocMatchGroups([
      regexMatchLocs(text, /(别说)[^连就是]+((?:连|就是))[^也都]+((?:也|都))/),
    ]);
  },
  examples: [
    {
      zh: '别说一百，就是一块钱我也不给你。',
      en: "Don't think about one hundred, I won't even give you one kuai.",
      src: allSetSrc,
    },
    {
      zh: '别说白酒，连啤酒的味道我都受不了。',
      en: "Don't even mention baijiu, I can't even stand the taste of beer.",
      src: allSetSrc,
    },
    {
      zh: '这么难的问题，别说你，就是老师也不知道答案。',
      en:
        "Don't even mention you, the teacher can't even know the answer to such a difficult question.",
      src: allSetSrc,
    },
    {
      zh: '别说做菜了，他连怎么煮方便面都不知道。',
      en:
        "Don't even think about cooking. He doesn't even know how to boil instant noodles.",
      src: allSetSrc,
    },
  ],
};
