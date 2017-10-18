/* --- AUTOGENERATED FILE -----------------------------
* If you make changes to this file delete this comment.
* Otherwise the file may be overwritten in the future.
* --------------------------------------------------- */

const { mergeLocMatchGroups } = require('../lib/matching/utils');
const { regexMatchLocs } = require('../lib/matching/regexMatch');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGEM2VR',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'expressingNotOnlyButAlsoWithBujin',
  name: 'Noun + 不仅 + A，而且 + B',
  description:
    'There are a few ways to express "not only ... but also" in Chinese. One of them is:',
  sources: [allSetSrc],
  match: sentence =>
    mergeLocMatchGroups([regexMatchLocs(sentence.text, /(不仅)[^而且]+(而且)/)]),
  examples: [
    {
      zh: '他不仅很帅，而且很聪明。',
      en: 'He is not only handsome, but also intelligent.',
      src: allSetSrc,
    },
    {
      zh: '我们不仅完成了任务而且比规定日期提前了十天。',
      en: 'We not only completed the task, but we did so ten days ahead of schedule.',
      src: allSetSrc,
    },
    {
      zh: '这道菜不仅好吃而且很有营养。',
      en: 'This dish is not only tasty, but also nutritious.',
      src: allSetSrc,
    },
  ],
};
