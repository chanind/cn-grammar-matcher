/* --- AUTOGENERATED FILE -----------------------------
* If you make changes to this file delete this comment.
* Otherwise the file may be overwritten in the future.
* --------------------------------------------------- */

const { mergeLocMatchGroups, regexMatchLocs } = require('../lib/regexMatchers');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGI96BQ',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'expressingDistanceWithLi',
  name: 'Place 1 + 离 + Place 2 + Adv. + 近 / 远',
  description:
    "Are we there yet? One of the ways to express distance is to use 离 (lí). The word order might seem a little tricky at first, but once you get it down, you'll be able to talk about distance with no problem.",
  sources: [allSetSrc],
  match: sentence => {
    const text = sentence.original;
    return mergeLocMatchGroups([
      regexMatchLocs(text, /(离)[^近远]+((?:近|远))/),
      regexMatchLocs(text, /(离)[^近远吗？]+((?:近|远)吗？)/),
      regexMatchLocs(text, /(离)[^有多远？]+(有?多远？)/),
    ]);
  },
  examples: [
    {
      zh: '我家离公司很近。',
      en: 'My house is close to my office.',
      src: allSetSrc,
    },
    {
      zh: '美国离中国很远。',
      en: 'The USA is far from China.',
      src: allSetSrc,
    },
    {
      zh: '这个酒店离火车站很近。',
      en: 'This hotel is very close to the train station.',
      src: allSetSrc,
    },
    {
      zh: '那个酒吧离这儿太远了，我不想去。',
      en: "That bar is too far away from here. I don't want to go.",
      src: allSetSrc,
    },
    {
      zh: '我不想去离家很远的地方工作。',
      en: "I don't want to go work at a place very far away from home.",
      src: allSetSrc,
    },
    {
      zh: '你家离超市远吗？',
      en: 'Is your house far away from the supermarket?',
      src: allSetSrc,
    },
    {
      zh: '你的大学离你老家很远吗？',
      en: 'Is your college very far away from your hometown?',
      src: allSetSrc,
    },
    {
      zh: '你们公司离地铁站近吗？',
      en: 'Is your company close to the metro station?',
      src: allSetSrc,
    },
    {
      zh: '你家离学校多远？',
      en: 'How far is it from your home to school?',
      src: allSetSrc,
    },
    {
      zh: '这个酒店离机场有多远？',
      en: 'How far is it from this hotel to the airport?',
      src: allSetSrc,
    },
    {
      zh: '你离我远点儿！',
      en: 'Stay away from me.',
      src: allSetSrc,
    },
  ],
};
