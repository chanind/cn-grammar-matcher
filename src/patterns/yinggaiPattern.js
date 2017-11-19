const { regexMatchLocs } = require('../lib/matching/regexMatch');
const { mergeLocMatchGroups } = require('../lib/matching/utils');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGV01X9',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'yinggai',
  structures: ['Subj. + 应该 + Verb + Obj.', 'Subj. + 不 + 应该 + Verb + Obj.'],
  description:
    '应该 (yīnggāi) translates to the English word "should," and is an essential word to know for your conversaitonal Chinese. You should definitely get comfortable using 应该 (yīnggāi) right away!',
  sources: [allSetSrc],
  match: sentence => {
    const text = sentence.original;
    return mergeLocMatchGroups([regexMatchLocs(text, /(应该)/)]);
  },
  examples: [
    {
      zh: '在中国，你应该喝白酒。',
      en: 'In China, you should drink baijiu.',
      src: allSetSrc,
    },
    {
      zh: '我应该给你多少钱？',
      en: 'How much money should I give you?',
      src: allSetSrc,
    },
    {
      zh: '感冒的时候应该喝热水。',
      en: 'You should drink hot water when you have a cold.',
      src: allSetSrc,
    },
    {
      zh: '明天你应该八点半来公司。',
      en: 'You should come to the office tomorrow at 8:30.',
      src: allSetSrc,
    },
    {
      zh: '他太累了，应该回家休息。',
      en: "He's too tired. He should go home and rest.",
      src: allSetSrc,
    },
    {
      zh: '你不应该告诉他。',
      en: 'You should not tell him.',
      src: allSetSrc,
    },
    {
      zh: '他不应该打人。',
      en: 'He should not hit people.',
      src: allSetSrc,
    },
    {
      zh: '我们不应该迟到。',
      en: "We shouldn't be late.",
      src: allSetSrc,
    },
    {
      zh: '你们不应该笑她。',
      en: "You shouldn't laugh at her.",
      src: allSetSrc,
    },
    {
      zh: '你们不应该拿别人的东西。',
      en: "You should not take other people's stuff.",
      src: allSetSrc,
    },
  ],
};
