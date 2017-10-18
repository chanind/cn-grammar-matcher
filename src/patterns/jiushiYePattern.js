/* --- AUTOGENERATED FILE -----------------------------
* If you make changes to this file delete this comment.
* Otherwise the file may be overwritten in the future.
* --------------------------------------------------- */

const { mergeLocMatchGroups } = require('../lib/matching/utils');
const { regexMatchLocs } = require('../lib/matching/regexMatch');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGF1TQ2',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'jiushiYe',
  name: '就是 + Hypothetical Statement + 也 + Action',
  description:
    '就是 (jiùshì) is one of the many "even ifs." Like 即使 , 就算 and 哪怕 it is used to introduce a hypothetical statement, which can then disregarded with 也.',
  sources: [allSetSrc],
  match: sentence => mergeLocMatchGroups([regexMatchLocs(sentence.text, /(就是)[^也]+(也)/)]),
  examples: [
    {
      zh: '就是这台电脑价格上万，我也会买。',
      en: "Even if this computer's price is over 10,000 yuan, I'm still going to buy it.",
      src: allSetSrc,
    },
    {
      zh: '就是降温了，我也要穿热裤，时尚嘛!',
      en:
        "Even if it's starting to get cooler, I'm still going to wear short shorts. It's the fad!",
      src: allSetSrc,
    },
    {
      zh: '就是他变成一个穷光蛋，我也愿意跟他在一起。',
      en: 'Even if he were penniless, I would still be willing to be with him.',
      src: allSetSrc,
    },
  ],
};
