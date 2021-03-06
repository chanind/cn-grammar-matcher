/* --- AUTOGENERATED FILE -----------------------------
* If you make changes to this file delete this comment.
* Otherwise the file may be overwritten in the future.
* --------------------------------------------------- */

const { mergeLocMatchGroups } = require('../lib/matching/utils');
const { regexMatchLocs } = require('../lib/matching/regexMatch');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGIRILI',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'continuationWithHai',
  structures: [
    'Subj. + 还在 + Verb',
    'Subj. + 还是 + Verb',
    'Subj. + 还 + 不 / 没 + Verb + Obj.',
  ],
  description:
    'If you "still" need help on how to use 还 (hái), then this is the page for you.',
  sources: [allSetSrc],
  match: sentence =>
    mergeLocMatchGroups([
      regexMatchLocs(sentence.text, /(还在)/),
      regexMatchLocs(sentence.text, /(还是)/),
      regexMatchLocs(sentence.text, /(还(?:不|没))/),
    ]),
  examples: [
    {
      zh: '他还在看书。',
      en: 'He is still reading.',
      src: allSetSrc,
    },
    {
      zh: '我还在加班。',
      en: 'I am still working overtime.',
      src: allSetSrc,
    },
    {
      zh: '十点了，你还在睡？',
      en: "It's ten o'clock, are you still sleeping?",
      src: allSetSrc,
    },
    {
      zh: '你还在生气吗？',
      en: 'Are you still mad?',
      src: allSetSrc,
    },
    {
      zh: '你还在用那个旧手机啊？',
      en: 'Are you still using that old cell phone?',
      src: allSetSrc,
    },
    {
      zh: '我看了好几遍，还是记不住。',
      en: "I read several times, but I still can't remember it.",
      src: allSetSrc,
    },
    {
      zh: '父母不同意他去，可是他还是去了。',
      en: 'He still went there although his patents disagreed.',
      src: allSetSrc,
    },
    {
      zh: '医生不让她喝酒，但她还是天天喝。',
      en:
        'The doctor told her to stop drinking alcohol, but she still drinks it everyday.',
      src: allSetSrc,
    },
    {
      zh: '老师虽然生病了，但还是来上课了。',
      en: 'The teacher still made it to the class although she got sick.',
      src: allSetSrc,
    },
    {
      zh: '他在美国住了十年，可是口语还是很差。',
      en: 'He lived in the USA for 10 years. But his spoken English is still not good.',
      src: allSetSrc,
    },
    {
      zh: '他还没到。',
      en: "He hasn't arrived yet.",
      src: allSetSrc,
    },
    {
      zh: '你还没吃饭？',
      en: "You still haven't eaten?",
      src: allSetSrc,
    },
    {
      zh: '你们还不走？',
      en: "You have't left yet?",
      src: allSetSrc,
    },
    {
      zh: '我还没下班。',
      en: "I haven't finished work yet.",
      src: allSetSrc,
    },
    {
      zh: '我对你那么好，你还不满意？',
      en: "I'm so good to you, you're still not satisfied?",
      src: allSetSrc,
    },
  ],
};
