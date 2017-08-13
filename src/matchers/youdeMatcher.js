/* --- AUTOGENERATED FILE -----------------------------
* If you make changes to this file delete this comment.
* Otherwise the file may be overwritten in the future.
* --------------------------------------------------- */

const { mergeLocMatchGroups, regexMatchLocs } = require('../lib/regexMatchers');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASG4NDHB',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'youde',
  name: '有的 + (Subj.) + Predicate， 有的 + (Subj.) + Predicate',
  description:
    'To refer to just certain members of group, you can use 有的 (yǒude). This usage is normally translated as "some" in English. It is often used multiple times in one sentence to refer to different groups.',
  sources: [allSetSrc],
  match: sentence => {
    const text = sentence.original;
    return mergeLocMatchGroups([
      regexMatchLocs(text, /(有的)[^的]+(有的)/),
      regexMatchLocs(text, /(有的)[^有]+(有的)/),
    ]);
  },
  examples: [
    {
      zh: '外国人有的很有钱，有的没钱。',
      en: "Some foreigners are rich, but some aren't.",
      src: allSetSrc,
    },
    {
      zh: '我们公司有一些电脑，有的是新的，有的是旧的。',
      en: 'Our company has some computers. Some are new, and some are old.',
      src: allSetSrc,
    },
    {
      zh: '他写了很多书，有的卖得很好，有的卖得不好。',
      en: "He has written a lot of books. Some sell well, but some don't.",
      src: allSetSrc,
    },
    {
      zh: '中国菜有的好吃，有的不好吃。',
      en: "Some Chinese foods are tasty, while some aren't.",
      src: allSetSrc,
    },
    {
      zh: '这家店的衣服有的贵，有的便宜。',
      en: 'In this shop, some of the clothes are expensive and some are cheap.',
      src: allSetSrc,
    },
    {
      zh: '他有很多房子，有的在国内，有的在国外。',
      en:
        'He has a lot of houses, some of them are within the country and some are abroad.',
      src: allSetSrc,
    },
    {
      zh: '晚上六点以后，有的人下班了，有的人在加班。',
      en: "After six o'clock some people are off work, while some are still working.",
      src: allSetSrc,
    },
    {
      zh: '我的大学老师有的很年轻，有的很老。',
      en: 'Some of my college teachers are young, some are old.',
      src: allSetSrc,
    },
    {
      zh: '酒吧里，有的人在喝酒，有的人在跳舞，还有的人在聊天。',
      en:
        'In the bar, some people are drinking, some are dancing, and some are chatting.',
      src: allSetSrc,
    },
    {
      zh: '因为工作，我认识了很多人，有的是大学老师，有的是CEO。',
      en:
        'I know a lot of people because of my work. Some are college teachers and some are CEOs.',
      src: allSetSrc,
    },
  ],
};
