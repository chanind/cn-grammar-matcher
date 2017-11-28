const { regexMatchLocs } = require('../lib/matching/regexMatch');
const {
  mergeLocMatchGroups,
  excludeMatchesFromPattern,
} = require('../lib/matching/utils');
const yidianrYeBuPattern = require('./yidianrYeBuPattern');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGUQ861',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'expressingNotEvenOne',
  structures: [
    '一 + Measure Word + (Noun) + 也 / 都 + 不 / 没 + Verb',
    'Topic + Subj. + 一 + Measure Word + (Noun) + 也 / 都 + Verb',
  ],
  description:
    'In English we might want to say something like "I have absolutely no money, not even one penny." That "not even one" is the focus of this article.',
  sources: [allSetSrc],
  match: sentence => {
    const text = sentence.original;
    const matches = mergeLocMatchGroups([
      regexMatchLocs(text, /(一)[^也都不没]+((?:也|都)(?:不|没))/),
      regexMatchLocs(text, /(一)[^也都]+((?:也|都))/),
    ]);
    return excludeMatchesFromPattern(sentence, yidianrYeBuPattern, matches);
  },
  examples: [
    {
      zh: '我一口都没吃。',
      en: "I didn't take a single bite.",
      src: allSetSrc,
    },
    {
      zh: '他一句中文都不会说。',
      en: "He can't speak one sentence of Chinese.",
      src: allSetSrc,
    },
    {
      zh: '为什么这里一个人都没有？',
      en: "Why aren't there any people here?",
      src: allSetSrc,
    },
    {
      zh: '她一瓶酒也没喝。',
      en: "She didn't drink a bottle of wine.",
      src: allSetSrc,
    },
    {
      zh: '来上海以前，他一个外国朋友都没有。',
      en: "He didn't have a foreign friend before he came to Shanghai.",
      src: allSetSrc,
    },
    {
      zh: '这个人我一次都没见过。',
      en: "I haven't seen this person once.",
      src: allSetSrc,
    },
    {
      zh: '这样的菜我一次也没吃过。',
      en: "I've never eaten this kind of food before.",
      src: allSetSrc,
    },
    {
      zh: '这次活动我们公司一个人也没参加。',
      en: 'Not one person in our company has participated in this activity.',
      src: allSetSrc,
    },
  ],
};
