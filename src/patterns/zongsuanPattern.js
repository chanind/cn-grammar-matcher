/* --- AUTOGENERATED FILE -----------------------------
* If you make changes to this file delete this comment.
* Otherwise the file may be overwritten in the future.
* --------------------------------------------------- */

const { mergeLocMatchGroups } = require('../lib/matching/utils');
const { regexMatchLocs } = require('../lib/matching/regexMatch');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGT8AUA',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'zongsuan',
  name: 'Subj. + 总算 / 终于 + Verb',
  description:
    'One pair of confusing adverbs is 总算 (zǒngsuàn) and 终于 (zhōngyú). They both can be translated as "finally" or "in the end," but they subtly different in tone.',
  sources: [allSetSrc],
  match: sentence => mergeLocMatchGroups([regexMatchLocs(sentence.text, /((?:总算|终于))/)]),
  examples: [
    {
      zh: '你总算来了！',
      en: 'You finally came!',
      src: allSetSrc,
    },
    {
      zh: '我终于懂了。',
      en: 'I finally understood it.',
      src: allSetSrc,
    },
    {
      zh: '雨总算停了。',
      en: 'The rain finally stopped.',
      src: allSetSrc,
    },
    {
      zh: '我终于找到你了！',
      en: 'I finally found you!',
      src: allSetSrc,
    },
    {
      zh: '飞机总算起飞了！',
      en: 'The plane is finally taking off!',
      src: allSetSrc,
    },
    {
      zh: '谢天谢地，你总算来了。',
      en: 'Thank God, you finally came.',
      src: allSetSrc,
    },
    {
      zh: '总算没迟到。',
      en: "You finally didn't arrive late.",
      src: allSetSrc,
    },
    {
      zh: '她的感冒总算好了。',
      en: 'She finally got over her cold.',
      src: allSetSrc,
    },
    {
      zh: '你终于决定了！',
      en: 'You finally decided this!',
      src: allSetSrc,
    },
    {
      zh: '终于要放假了，开心吧？',
      en: "You finally have your holidays. You're happy about it, aren't you?",
      src: allSetSrc,
    },
    {
      zh: '你们合作的项目终于成功了!',
      en: "This project you've been working on together finally succeed!",
      src: allSetSrc,
    },
  ],
};
