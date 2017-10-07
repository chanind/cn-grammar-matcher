const { and, pos, word, any } = require('../lib/tokenFilters');
const { regexMatchLocs, regexMatchTokens } = require('../lib/matching/regexMatch');
const { mergeLocMatchGroups, locsFromTokens } = require('../lib/matching/utils');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASG69RR8',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'expressingOngoingDurationWithDoubleLe',
  name: 'Subj. + Verb + 了 + Duration + 了',
  description:
    'The 了 (le) particle is used in many different ways. In this article, we will explore how to use the double 了 (le) to express the duration of an activity that is ongoing.',
  sources: [allSetSrc],
  match: sentence => {
    const text = sentence.original;
    return mergeLocMatchGroups([
      // TODO: add more time-related words here as needed. This is hacky but can't find a better way
      regexMatchLocs(text, /(了)[^了]*(?:年|天|月|日|秒|分|小时|晚上)[^了]*(了)/),

      // Handle cases where the NLP is smart enough to tag times as NT
      locsFromTokens(
        regexMatchTokens(sentence.tokens, '(:firstLe:):any:*:time::any:*(:finalLe:)', {
          firstLe: word('.*了'),
          any,
          time: pos('NT'),
          finalLe: and(pos('SP'), word('了')),
        }),
        /了/
      ),
    ]);
  },
  examples: [
    {
      zh: '你睡了一天了。',
      en: 'You have been sleeping for the whole day.',
      src: allSetSrc,
    },
    {
      zh: '他在北京住了两年了。',
      en: 'He has been living in Beijing for two years.',
      src: allSetSrc,
    },
    {
      zh: '这个会，他们开了两个小时了。',
      en: "They've been holding this meeting for the past two hours.",
      src: allSetSrc,
    },
    {
      zh: '我在这儿等了半个小时了。',
      en: 'I have been waiting here for half an hour.',
      src: allSetSrc,
    },
    {
      zh: '他们在酒吧待了一个晚上了。',
      en: 'They have been staying at the bar for the whole evening.',
      src: allSetSrc,
    },
    {
      zh: '我学中文学了一年了。',
      en: 'I have been learning Chinese for a year.',
      src: allSetSrc,
    },
    {
      zh: '他打电话打了一个多小时了。',
      en: 'He has been on the phone for more than an hour.',
      src: allSetSrc,
    },
    {
      zh: '老板打游戏打了一个上午了。',
      en: 'The boss has been playing video games all morning.',
      src: allSetSrc,
    },
    {
      zh: '你洗澡洗了差不多一个小时了。',
      en: 'You have been showering for almost an hour.',
      src: allSetSrc,
    },
    {
      zh: '妈妈看电视看了一晚上了。',
      en: 'Mom has been watching TV all evening.',
      src: allSetSrc,
    },
  ],
};
