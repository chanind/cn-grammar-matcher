/* --- AUTOGENERATED FILE -----------------------------
* If you make changes to this file delete this comment.
* Otherwise the file may be overwritten in the future.
* --------------------------------------------------- */

const { mergeLocMatchGroups } = require('../lib/matching/utils');
const { regexMatchLocs } = require('../lib/matching/regexMatch');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASG9LLJU',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'askingAboutDegreeWithDuo',
  structures: ['Subj. + 多 + Adj. ?'],
  description:
    'How big? How busy? How cold? Ask questions like these regarding the degree of an adjective with 多 (duō). This is just one of the many uses of this word.',
  sources: [allSetSrc],
  match: sentence => mergeLocMatchGroups([regexMatchLocs(sentence.text, /(多).[吗]?[?？]/)]),
  examples: [
    {
      zh: '她多高？',
      en: 'How tall is she?',
      src: allSetSrc,
    },
    {
      zh: '你家多大？',
      en: 'How large is your house?',
      src: allSetSrc,
    },
    {
      zh: '你的孩子多大？',
      en: 'How old is your child?',
      src: allSetSrc,
    },
    {
      zh: '黄河多长？',
      en: 'How long is the Yellow River?',
      src: allSetSrc,
    },
    {
      zh: '你家离这儿多远？',
      en: 'How far is your house away from here?',
      src: allSetSrc,
    },
    {
      zh: '你要在美国待多久？',
      en: 'How long are you going to stay in the USA?',
      src: allSetSrc,
    },
    {
      zh: '这些东西多重？',
      en: 'How heavy are these things?',
      src: allSetSrc,
    },
    {
      zh: '你知道我们现在多胖吗？',
      en: 'Do you know how fat we are now?',
      src: allSetSrc,
    },
    {
      zh: '你知道这里的冬天多冷吗？',
      en: 'Do you know how cold it is here in winter?',
      src: allSetSrc,
    },
    {
      zh: '你知道上海的房子多贵吗？',
      en: 'Do you know how expensive housing is in Shanghai?',
      src: allSetSrc,
    },
  ],
};
