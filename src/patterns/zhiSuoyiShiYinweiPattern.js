/* --- AUTOGENERATED FILE -----------------------------
* If you make changes to this file delete this comment.
* Otherwise the file may be overwritten in the future.
* --------------------------------------------------- */

const { mergeLocMatchGroups } = require('../lib/matching/utils');
const { regexMatchLocs } = require('../lib/matching/regexMatch');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGTPGXK',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'zhiSuoyiShiYinwei',
  name: 'Subj.+ 之所以 + Effect + 是因为 + Cause',
  description:
    "之所以⋯⋯是因为 (zhī suǒyǐ... shì yīnwèi) can be translated as “the reason why... is because” and can be used if the speaker wishes to state the effect before the cause.  It's normally used in somewhat formal speech.",
  sources: [allSetSrc],
  match: sentence =>
    mergeLocMatchGroups([regexMatchLocs(sentence.text, /(之所以)[^是因为]+(是因为)/)]),
  examples: [
    {
      zh: '他之所以去希腊是因为想进一步了解西方文明。',
      en:
        'The reason he went to Greece was because he wanted to further understand Western culture.',
      src: allSetSrc,
    },
    {
      zh: '少数民族之所以受到人类学家的注意是因为他们至今还保留着许多传统文化。',
      en:
        'The reason minorities receive a lot of attention from anthropologists is because they maintain most of their traditional culture up until today.',
      src: allSetSrc,
    },
    {
      zh: '你之所以能够追求精神上的快乐是因为你已经有了稳定的物质基础。',
      en:
        'The reason you can pursue spiritual happiness is because you already have a stable material foundation.',
      src: allSetSrc,
    },
  ],
};
