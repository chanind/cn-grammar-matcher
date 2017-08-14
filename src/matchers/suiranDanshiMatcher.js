/* --- AUTOGENERATED FILE -----------------------------
* If you make changes to this file delete this comment.
* Otherwise the file may be overwritten in the future.
* --------------------------------------------------- */

const { mergeLocMatchGroups, regexMatchLocs } = require('../lib/regexMatchers');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGXI560',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'suiranDanshi',
  name: '虽然 + Subj. + 但是 + Contrary Reaction',
  description:
    'The grammar pattern "虽然⋯⋯ 但是⋯⋯" (suīrán... dànshì...) is one of the most common used patterns in Chinese, especially in written Chinese. You can think of it as meaning "although," but unlike in English, you still need to follow it with a "but" word in Chinese.',
  sources: [allSetSrc],
  match: sentence => {
    const text = sentence.original;
    return mergeLocMatchGroups([regexMatchLocs(text, /(虽然)[^但可]+(但是|可是)/)]);
  },
  examples: [
    {
      zh: '虽然他是美国人，但是他还没去过华盛顿。',
      en: "Although he's American, he still hasn't been to Washington D.C.",
      src: allSetSrc,
    },
    {
      zh: '虽然她说不太饿，但是她点了很多菜。',
      en: "Even though she said she isn't hungry, she ordered a lot of food.",
      src: allSetSrc,
    },
    {
      zh: '虽然他的家里很有钱，可是他从来不浪费钱。',
      en: 'Even though he‘s got a rich family, he never wastes money.',
      src: allSetSrc,
    },
  ],
};