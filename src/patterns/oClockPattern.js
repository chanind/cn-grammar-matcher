const { regexMatchLocs } = require('../lib/matching/regexMatch');
const { word, and, pos } = require('../lib/tokenFilters');
const {
  mergeLocMatchGroups,
  filterMatches,
  tokensFromMatch,
} = require('../lib/matching/utils');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGN6BBU',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'oClock',
  structures: ['(Date and/or time of day +) x 点', 'x 点 + 半'],
  description:
    'Time in Chinese, just like in English, is expressed by stating the hour first, and then the minute (big to small).',
  sources: [allSetSrc],
  match: sentence => {
    const text = sentence.original;
    const incorrectYiDianFilter = and(word('一?点'), pos('A.|M'));
    return filterMatches(
      mergeLocMatchGroups([
        regexMatchLocs(text, /([零一二三四五六七八九十百千万亿两0-9]+点)/),
        regexMatchLocs(text, /([零一二三四五六七八九十百千万亿两0-9]+点半)/),
      ]),
      match => {
        // handle corner-case of 一点
        for (const token of tokensFromMatch(sentence.tokens, match)) {
          if (incorrectYiDianFilter(token)) {
            return false;
          }
        }
        return true;
      }
    );
  },
  examples: [
    {
      zh: '九点',
      en: "9 o'clock",
      src: allSetSrc,
    },
    {
      zh: '上午七点',
      en: "7 o'clock a.m.",
      src: allSetSrc,
    },
    {
      zh: '下午四点',
      en: "4 o'clock p.m.",
      src: allSetSrc,
    },
    {
      zh: '中午十二点',
      en: "12 o'clock noon",
      src: allSetSrc,
    },
    {
      zh: '明天晚上七点',
      en: "7 o'clock p.m. tomorrow evening",
      src: allSetSrc,
    },
    {
      zh: '9月9号早上六点',
      en: "September 9th, 6 o'clock a.m.",
      src: allSetSrc,
    },
    {
      zh: '星期三上午九点',
      en: "Wednesday at 9 o'clock a.m.",
      src: allSetSrc,
    },
    {
      zh: '五点半',
      en: '5:30',
      src: allSetSrc,
    },
    {
      zh: '下午两点半',
      en: '2:30 p.m.',
      src: allSetSrc,
    },
    {
      zh: '星期天上午十点半',
      en: 'Sunday at 10:30 a.m.',
      src: allSetSrc,
    },
    {
      zh: '昨天晚上七点半',
      en: '7:30 yesterday evening',
      src: allSetSrc,
    },
    {
      zh: '今天下午四点半',
      en: '4:30 p.m. this afternoon.',
      src: allSetSrc,
    },
  ],
};
