const { pos, word } = require('../lib/tokenFilters');
const { regexMatchTokens } = require('../lib/matching/regexMatch');
const { mergeLocMatchGroups, locsFromTokens } = require('../lib/matching/utils');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGX298Z',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'expressingThenWithName',
  name: 'Context ，那么 + Result / Decision',
  description:
    'When expressing "Then...," you can use "那么" (nàme) or "那" (nà) in order to begin a judgment or result from previous context. An example of this in English would be "Then, what should we do?"',
  sources: [allSetSrc],
  match: sentence =>
    mergeLocMatchGroups([
      locsFromTokens(
        regexMatchTokens(sentence.tokens, '(:name:):punct:?:result:', {
          name: word('那么?'),
          punct: pos('PU'),
          result: pos('PN|AD|VV'),
        })
      ),
    ]),
  examples: [
    {
      zh: '大家都同意这个方案，那么，我们就开始实施吧。',
      en: "Everyone agrees on this plan, so we'll start to implement it.",
      src: allSetSrc,
    },
    {
      zh: '你认为这个想法行不通，那么，你有其他的想法吗？',
      en: 'You don’t think this idea is possible. Then have you got any other good idea?',
      src: allSetSrc,
    },
    {
      zh: '他不听，那我应该怎么办？',
      en: "He wouldn't listen. What shall I do then?",
      src: allSetSrc,
    },
    {
      zh: '你说得有道理，那么就这么办吧。',
      en: 'What you said makes sense to me, so just do it as you said.',
      src: allSetSrc,
    },
    {
      zh: '老板不同意，那你怎么办？',
      en: 'The boss is not very satisfied with the p, so you keep working on it.',
      src: allSetSrc,
    },
    {
      zh: '大家都到了，那么请开始表演吧。',
      en: 'Everybody is here, so let the performance begin.',
      src: allSetSrc,
    },
    {
      zh: '热身完了，那我们开始吧。',
      en: "The warmup is over. Now let't start.",
      src: allSetSrc,
    },
    {
      zh: '你认为这个办法不行，那你有别的办法吗？',
      en: "You don't think this idea is good. Then have you got any other good idea?",
      src: allSetSrc,
    },
    {
      zh: '他最近的表现不错，那么就让他通过吧。',
      en: 'His recent performance is not bad, so let him pass.',
      src: allSetSrc,
    },
    {
      zh: '你不让我管，那你会管吗？',
      en: "You don't let me take care of it. So will you take care of it?",
      src: allSetSrc,
    },
    {
      zh: '雨太大了，那你们今晚都留下来吧。',
      en: 'The rain is too heavy, so you should all stay here for tonight.',
      src: allSetSrc,
    },
    {
      zh: '客户确认了，那么我们就准备签合同了。',
      en: "The client has confirmed, so let's get prepared to sign the contract.",
      src: allSetSrc,
    },
  ],
};
