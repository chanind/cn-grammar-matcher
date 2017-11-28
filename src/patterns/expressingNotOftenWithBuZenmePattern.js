const {
  mergeLocMatchGroups,
  excludeMatchesFromPattern,
} = require('../lib/matching/utils');
const { regexMatchLocs } = require('../lib/matching/regexMatch');
const expressingNotVeryWithBuZenmePattern = require('./expressingNotVeryWithBuZenmePattern');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASG5BOGP',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'expressingNotOftenWithBuZenme',
  structures: ['Subj. + 不怎么 + Verb'],
  description:
    'You might be tempted to conclude that 不怎么 (bù zěnme) seems to mean "not how," but it actually means "not often" when used together with a verb.',
  sources: [allSetSrc],
  match: sentence => {
    const matches = mergeLocMatchGroups([regexMatchLocs(sentence.text, /([不没]怎么)/)]);
    return excludeMatchesFromPattern(
      sentence,
      expressingNotVeryWithBuZenmePattern,
      matches
    );
  },
  examples: [
    {
      zh: '他不怎么喜欢说话。',
      en: "He doesn't like talking too much.",
      src: allSetSrc,
    },
    {
      zh: '我不怎么吃猪肉。',
      en: "I don't often eat pork.",
      src: allSetSrc,
    },
    {
      zh: '我老公不怎么做饭。',
      en: "My husband doesn't cook very often.",
      src: allSetSrc,
    },
    {
      zh: '我的室友不怎么去逛街。',
      en: "My roommates don't go shopping very often.",
      src: allSetSrc,
    },
    {
      zh: '我们不怎么看电视。',
      en: "We don't watch a lot of television.",
      src: allSetSrc,
    },
    {
      zh: '他没怎么说话。',
      en: "He didn't say much.",
      src: allSetSrc,
    },
    {
      zh: '昨天我没怎么复习。',
      en: "I didn't review much yesterday.",
      src: allSetSrc,
    },
    {
      zh: '我没怎么见过他。',
      en: "I haven't seen him much.",
      src: allSetSrc,
    },
    {
      zh: '我父母没怎么吃过西餐。',
      en: "My parents didn't eat western food much.",
      src: allSetSrc,
    },
    {
      zh: '我们没怎么讨论这件事。',
      en: "We didn't discuss this matter much.",
      src: allSetSrc,
    },
  ],
};
