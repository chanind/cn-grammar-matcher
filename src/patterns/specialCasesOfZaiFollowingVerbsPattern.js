const { mergeLocMatchGroups } = require('../lib/matching/utils');
const { and, pos, word } = require('../lib/tokenFilters');
const { regexMatchTokens } = require('../lib/matching/regexMatch');
const { locsFromTokens } = require('../lib/matching/utils');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASG90DXK',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'specialCasesOfZaiFollowingVerbs',
  name: 'Subj. + [Special Verb] + 在 + Location',
  description:
    'When used to indicate locations of actions, 在 (zài) is usually placed after the subject and before the verb. There are certain cases, however, when 在 (zài) goes after the verb.',
  sources: [allSetSrc],
  match: sentence => {
    const tokens = sentence.tokens;
    return mergeLocMatchGroups([
      locsFromTokens(
        regexMatchTokens(tokens, '(:zai:)', {
          zai: and(pos('VV'), word('.+在')),
        }),
        /在/
      ),
      locsFromTokens(
        regexMatchTokens(tokens, ':verb:(:zai:)', {
          verb: pos('VV'),
          zai: and(pos('P'), word('在')),
        }),
        /在/
      ),
    ]);
  },
  examples: [
    {
      zh: '你住在上海吗？',
      en: 'Do you live in Shanghai?',
      src: allSetSrc,
    },
    {
      zh: '他坐在老板的旁边。',
      en: 'He sits next to the boss.',
      src: allSetSrc,
    },
    {
      zh: '你应该站在我后面。',
      en: 'You should stand behind me.',
      src: allSetSrc,
    },
    {
      zh: '不要坐在我的床上。',
      en: "Don't sit on my bed.",
      src: allSetSrc,
    },
    {
      zh: '你的衣服不可以放在这里。',
      en: "You can't put your clothes here.",
      src: allSetSrc,
    },
    {
      zh: '不要站在路中间。',
      en: "Don't stand in the middle of the road.",
      src: allSetSrc,
    },
    {
      zh: '不要坐在地上。',
      en: "Don't sit on the ground.",
      src: allSetSrc,
    },
    {
      zh: '那本书我放在桌子上了。',
      en: 'I placed that book on the table.',
      src: allSetSrc,
    },
    {
      zh: '不要走在草地上。',
      en: "Don't walk on the grass.",
      src: allSetSrc,
    },
    {
      zh: '周末我不想待在家里。',
      en: "I don't want to stay at home on weekends.",
      src: allSetSrc,
    },
  ],
};
