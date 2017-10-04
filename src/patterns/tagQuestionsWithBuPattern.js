const { regexMatchLocs } = require('../lib/matching/regexMatch');
const {
  mergeLocMatchGroups,
  stringsFromMatch,
  filterMatches,
} = require('../lib/matching/utils');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASG4D8XB',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'tagQuestionsWithBu',
  name: 'Verb + 不 + Verb',
  description:
    'In the same way you can tag questions with 吗 (ma), tag questions can also be formed using 不 (bù). This is done by putting an affirmative-negative question at the end of a sentence.',
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
      filterMatches(regexMatchLocs(text, /(.不.)[？?]?$/), filterBothSidesAreSame),
      regexMatchLocs(text, /(有没有)/),
    ]);
  },
  examples: [
    {
      zh: '你会说中文，对不对？',
      en: 'You speak Chinese, right?',
      src: allSetSrc,
    },
    {
      zh: '他是你的老板，对不对？',
      en: "He's your boss, right?",
      src: allSetSrc,
    },
    {
      zh: '我们是好朋友，对不对？',
      en: 'We are good friends, right?',
      src: allSetSrc,
    },
    {
      zh: '你昨天没回家，对不对？',
      en: "You didn't come back home yesterday, right?",
      src: allSetSrc,
    },
    {
      zh: '你有新女朋友了，是不是？',
      en: 'You have a new girlfriend, right?',
      src: allSetSrc,
    },
    {
      zh: '九点开会，是不是？',
      en: 'We are going to hold a meeting at 9, right?',
      src: allSetSrc,
    },
    {
      zh: '你姓王，是不是？',
      en: 'Your last name is Wang, is it not?',
      src: allSetSrc,
    },
    {
      zh: '我们回家吧，好不好？',
      en: "Let's go home, OK?",
      src: allSetSrc,
    },
    {
      zh: '周末去看电影，好不好？',
      en: "Let's go to a movie this weekend, OK?",
      src: allSetSrc,
    },
    {
      zh: '你们明天来，好不好？',
      en: 'You come here tomorrow, OK?',
      src: allSetSrc,
    },
  ],
};
