const { regexMatchLocs } = require('../lib/matching/regexMatch');
const { mergeLocMatchGroups } = require('../lib/matching/utils');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASG6TB4J',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'expressingThatsAllWithEryi',
  name: 'Subj. + Verb + Obj. + 而已',
  description:
    '而已 expresses that something is merely what it is. It is like saying "it\'s only a test, that\'s all." 而已 is put at the end of the sentence to emphasis that something is just what it is.',
  sources: [allSetSrc],
  match: sentence => {
    const text = sentence.original;
    return mergeLocMatchGroups([regexMatchLocs(text, /(而已)/)]);
  },
  examples: [
    {
      zh: '他只是开个玩笑而已，不要当真。',
      en: "He's just making a joke, that's all, don't take it seriously",
      src: allSetSrc,
    },
    {
      zh: '这次会议没有达成具体的方案，仅仅是在这个问题上达成了共识而已。',
      en:
        "This conference hasn't reached a concrete plan, it's just been able to answer one question and that's all",
      src: allSetSrc,
    },
  ],
};
