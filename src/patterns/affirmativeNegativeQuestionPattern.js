const { regexMatchLocs } = require('../lib/matching/regexMatch');
const {
  mergeLocMatchGroups,
  stringsFromMatch,
  filterMatches,
} = require('../lib/matching/utils');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGZH7K3',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'affirmativenegativeQuestion',
  name: 'Verb + 不 + Verb',
  description: '',
  sources: [allSetSrc],
  match: sentence => {
    const text = sentence.original;
    // make sure the characters on both sides of 不 are the same
    const filterBothSidesAreSame = match => {
      const matchStrings = stringsFromMatch(text, match);
      for (const matchString of matchStrings) {
        const end = matchString.length;
        const mid = Math.floor(end / 2);
        if (matchString.slice(0, mid) !== matchString.slice(end - mid, end)) {
          return false;
        }
      }
      return true;
    };

    return mergeLocMatchGroups([
      filterMatches(regexMatchLocs(text, /(..不..)/), filterBothSidesAreSame),
      filterMatches(regexMatchLocs(text, /(.不.)/), filterBothSidesAreSame),
      regexMatchLocs(text, /(有没有)/),
    ]);
  },
  examples: [
    {
      zh: '是不是？',
      en: 'Is it (or not)?',
      src: allSetSrc,
    },
    {
      zh: '他们来不来？',
      en: 'Are they going to come or not?',
      src: allSetSrc,
    },
    {
      zh: '你想不想我？',
      en: 'Do you or do you not miss me?',
      src: allSetSrc,
    },
    {
      zh: '我们要去酒吧，你去不去？',
      en: 'We are going to the bar. Do you want to go?',
      src: allSetSrc,
    },
    {
      zh: '我去买咖啡，你要不要？',
      en: "I'm going to buy coffee. Do you want some?",
      src: allSetSrc,
    },
    {
      zh: '你回不回家？',
      en: 'Are you coming back home or not?',
      src: allSetSrc,
    },
    {
      zh: '她吃不吃鱼？',
      en: 'Does she eat fish?',
      src: allSetSrc,
    },
    {
      zh: '你们要不要米饭？',
      en: 'Do you want rice?',
      src: allSetSrc,
    },
    {
      zh: '你爸爸喝不喝酒？',
      en: 'Does your dad drink alcohol or not?',
      src: allSetSrc,
    },
    {
      zh: '今天老板来不来办公室？',
      en: 'Is the boss coming to the office today?',
      src: allSetSrc,
    },
    {
      zh: '好不好？',
      en: 'Is it good?',
      src: allSetSrc,
    },
    {
      zh: '热不热？',
      en: 'Is it hot?',
      src: allSetSrc,
    },
    {
      zh: '他帅不帅？',
      en: 'Is he handsome?',
      src: allSetSrc,
    },
    {
      zh: '这里的咖啡贵不贵？',
      en: 'Is the coffee expensive here?',
      src: allSetSrc,
    },
    {
      zh: '中国菜辣不辣？',
      en: 'Is Chinese food spicy?',
      src: allSetSrc,
    },
    {
      zh: '喜欢不喜欢？',
      en: 'Do you like it?',
      src: allSetSrc,
    },
    {
      zh: '喜不喜欢？',
      en: 'Do you like it?',
      src: allSetSrc,
    },
    {
      zh: '高兴不高兴？',
      en: 'Are you happy?',
      src: allSetSrc,
    },
    {
      zh: '高不高兴？',
      en: 'Are you happy?',
      src: allSetSrc,
    },
    {
      zh: '他女朋友漂亮不漂亮？',
      en: 'Is his girlfriend pretty?',
      src: allSetSrc,
    },
    {
      zh: '他女朋友漂不漂亮？',
      en: 'Is his girlfriend pretty?',
      src: allSetSrc,
    },
    {
      zh: '中国菜好吃不好吃？',
      en: 'Is Chinese food good?',
      src: allSetSrc,
    },
    {
      zh: '中国菜好不好吃？',
      en: 'Is Chinese food good?',
      src: allSetSrc,
    },
    {
      zh: '那个地方好玩不好玩？',
      en: 'Is that place fun?',
      src: allSetSrc,
    },
    {
      zh: '那个地方好不好玩？',
      en: 'Is that place fun?',
      src: allSetSrc,
    },
    {
      zh: '你哥哥有没有女朋友？',
      en: 'Does your older brother have a girlfriend?',
      src: allSetSrc,
    },
    {
      zh: '你们有没有孩子？',
      en: 'Do you have children?',
      src: allSetSrc,
    },
    {
      zh: '奶奶有没有坐过飞机？',
      en: 'Has grandma been on a plane?',
      src: allSetSrc,
    },
    {
      zh: '他有没有上过大学？',
      en: 'Has he been to college?',
      src: allSetSrc,
    },
  ],
};
