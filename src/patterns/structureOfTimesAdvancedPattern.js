/* --- AUTOGENERATED FILE -----------------------------
* If you make changes to this file delete this comment.
* Otherwise the file may be overwritten in the future.
* --------------------------------------------------- */

const { mergeLocMatchGroups } = require('../lib/matching/utils');
const { regexMatchLocs } = require('../lib/matching/regexMatch');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGDTO07',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'structureOfTimesAdvanced',
  name: 'x 点 y 分',
  description:
    'If you already know the basics of how to tell time in Chinese, you may want to get a little more specific or sophisticated, using words like 分 (fēn) and 刻 (kè).',
  sources: [allSetSrc],
  match: sentence =>
    mergeLocMatchGroups([
      regexMatchLocs(sentence.text, /([零一二三四五六七八九十百千万亿两0-9]+点[零一二三四五六七八九十百千万亿两0-9]+分)/),
      regexMatchLocs(sentence.text, /([零一二三四五六七八九十百千万亿两0-9]+点零[零一二三四五六七八九十百千万亿两0-9]+分)/),
      regexMatchLocs(sentence.text, /([零一二三四五六七八九十百千万亿两0-9]+点[零一二三四五六七八九十百千万亿两0-9]+刻)/),
      regexMatchLocs(sentence.text, /(差)[^分]+(分)[^点]+(点)/),
      regexMatchLocs(sentence.text, /(点差)[^分]+(分)/),
    ]),
  examples: [
    {
      zh: '一点四十分',
      en: '1:40',
      src: allSetSrc,
    },
    {
      zh: '两点十分',
      en: '2:10',
      src: allSetSrc,
    },
    {
      zh: '三点二十分',
      en: '3:20',
      src: allSetSrc,
    },
    {
      zh: '七点十五分',
      en: '7:15',
      src: allSetSrc,
    },
    {
      zh: '九点五十分',
      en: '9:50',
      src: allSetSrc,
    },
    {
      zh: '两点零九分',
      en: '2:09',
      src: allSetSrc,
    },
    {
      zh: '三点零八分',
      en: '3:08',
      src: allSetSrc,
    },
    {
      zh: '五点零三分',
      en: '5:03',
      src: allSetSrc,
    },
    {
      zh: '七点零一分',
      en: '7:01',
      src: allSetSrc,
    },
    {
      zh: '八点零五分',
      en: '8:05',
      src: allSetSrc,
    },
    {
      zh: '九点一刻',
      en: '9:15',
      src: allSetSrc,
    },
    {
      zh: '十二点一刻',
      en: '12:15',
      src: allSetSrc,
    },
    {
      zh: '六点三刻',
      en: '6:45',
      src: allSetSrc,
    },
    {
      zh: '差五分三点',
      en: "five minutes til 3 o'clock",
      src: allSetSrc,
    },
    {
      zh: '十二点差三分',
      en: "three minutes til 12 o'clock",
      src: allSetSrc,
    },
    {
      zh: '差五分八点半',
      en: 'five minutes til 8:30',
      src: allSetSrc,
    },
    {
      zh: '十点差两分',
      en: 'two minutes til 10:00',
      src: allSetSrc,
    },
  ],
};
