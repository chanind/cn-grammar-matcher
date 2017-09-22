const { regexMatchLocs } = require('../lib/matching/regexMatch');
const {
  mergeLocMatchGroups,
  excludeMatchesFromPattern,
} = require('../lib/matching/utils');
const haishiBaPattern = require('./haishiBaPattern');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGQJ5IC',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'expressingOrWithHaishiAndHuozhe',
  name: 'Subj. + Verb + Option A + 还是 + Option B',
  description:
    'Both 还是 (háishì) and  或者 (huòzhě) mean “or” and are used to present a choice.  However, 还是 is normally used when asking a question, and 或者 is mostly for declarative sentences.',
  sources: [allSetSrc],
  match: sentence => {
    const text = sentence.original;
    const matches = mergeLocMatchGroups([
      regexMatchLocs(text, /(还是)/),
      regexMatchLocs(text, /(或者)/),
      regexMatchLocs(text, /(或者)[^或者]+(或者)/),
    ]);
    return excludeMatchesFromPattern(sentence, haishiBaPattern, matches);
  },
  examples: [
    {
      zh: '她喜欢你还是他？',
      en: 'Does she like you or him?',
      src: allSetSrc,
    },
    {
      zh: '你喝茶还是喝咖啡？',
      en: 'Do you drink tea or coffee?',
      src: allSetSrc,
    },
    {
      zh: '你中午出去吃还是叫外卖？',
      en: 'Are you going out for lunch or order take-out?',
      src: allSetSrc,
    },
    {
      zh: '明天或者后天都行。',
      en: 'Either tomorrow or the day after is fine.',
      src: allSetSrc,
    },
    {
      zh: '周末我想在家看书或者看电影。',
      en: "I'd like to stay at home reading or watching some movies.",
      src: allSetSrc,
    },
    {
      zh: '我不知道这本书是他的还是我的。',
      en: "I don't know if this book is his or mine.",
      src: allSetSrc,
    },
    {
      zh: '我不知道是自己跟他说还是让别人帮我跟他说。',
      en:
        "I don't know if I should talk to him myself or ask someone else to talk to him for me.",
      src: allSetSrc,
    },
    {
      zh: '我不清楚是我们先走还是等他们一起走。',
      en: "I'm not sure if we should leave first, or wait for them and leave together.",
      src: allSetSrc,
    },
    {
      zh: '只有一块蛋糕，或者你吃或者我吃。',
      en: "There's only one piece of cake. Either you eat it, or I do.",
      src: allSetSrc,
    },
    {
      zh: '你或者学汉语，或者学法律，别的就别学了。',
      en: "Either study Chinese or law, don't study anything else.",
      src: allSetSrc,
    },
  ],
};
