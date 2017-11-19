const { mergeLocMatchGroups } = require('../lib/matching/utils');
const { regexMatchLocs } = require('../lib/matching/regexMatch');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGJIP2E',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'concedingWithBa',
  structures: ['Statement + 吧'],
  description:
    'The particle 吧 (ba) can also be used to concede a point. That is, 吧 (ba) can be used to accept or agree with something that you\'re not particularly happy about, the way we might use "all right" or "fine then" in English.',
  sources: [allSetSrc],
  match: sentence => mergeLocMatchGroups([regexMatchLocs(sentence.original, /^[行好](吧)/)]),
  examples: [
    {
      zh: 'A:太贵了！B:好吧，我们可以看看别的。',
      en: "A: That's too expensive! B: All right, we can take a look at something else.",
      src: allSetSrc,
    },
    {
      zh: 'A:下午我不在家，你可以晚上来吗？ B:行吧。',
      en:
        "A: This afternoon I won't be home. Can you come by this evening? B: All right.",
      src: allSetSrc,
    },
    {
      zh: 'A:雨太大了，明天再去买吧。B:好吧，但是明天一定要买到。',
      en:
        "A: It's raining heavily. Let's go buy it tomorrow. B: Fine, but tomorrow we definitely have to buy it.",
      src: allSetSrc,
    },
    {
      zh: 'A:可以带朋友吗？ B:行吧，但是不能带女孩。',
      en: "A: Can I bring friends? B: All right, but you can't bring girls.",
      src: allSetSrc,
    },
    {
      zh: 'A:我今天不太舒服，你可以自己去吗？ B:好吧，那你好好休息。',
      en:
        "A: I'm not feeling well today. Can you go by yourself? B: All right, rest well then.",
      src: allSetSrc,
    },
  ],
};
