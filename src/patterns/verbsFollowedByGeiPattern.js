const { regexMatchLocs } = require('../lib/matching/regexMatch');
const { and, pos, word } = require('../lib/tokenFilters');
const { regexMatchTokens } = require('../lib/matching/regexMatch');
const { mergeLocMatchGroups, locsFromTokens } = require('../lib/matching/utils');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGMMHTQ',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'verbsFollowedByGei',
  structures: [
    'Subj. + Verb + 给 + [Recipient] + Obj.',
    'Subj. + 把 + Obj. + Verb + 给 + Somebody',
  ],
  description:
    "Although it's standard practice to put a word or phrase that modifies a verb before the verb, there are, of course, exceptions. 给 (gěi) is one of those exceptions; it sometimes comes before the verb, and sometimes after. This article is about when it comes after.",
  sources: [allSetSrc],
  match: sentence =>
    mergeLocMatchGroups([
      locsFromTokens(
        regexMatchTokens(sentence.tokens, '(:verbWithGei:)', {
          verbWithGei: and(pos('VV'), word('.给')),
        }),
        '给'
      ),
      // manual overfitting missed examples
      regexMatchLocs(sentence.text, /[还授](给)/),
    ]),
  examples: [
    {
      zh: '他送给了我一束花。',
      en: 'He gave me a bouquet of flowers.',
      src: allSetSrc,
    },
    {
      zh: '这个老板卖给了我一条死鱼。',
      en: 'This boss sold me a dead fish.',
      src: allSetSrc,
    },
    {
      zh: '我要还给你三十块钱。',
      en: 'I need to return 30rmb to you.',
      src: allSetSrc,
    },
    {
      zh: '房东租给了我一个很便宜的房子。',
      en: 'The landlord rented a very cheap house to me.',
      src: allSetSrc,
    },
    {
      zh: '我借给了他一本书。',
      en: 'I lent him a book.',
      src: allSetSrc,
    },
    {
      zh: '我要糖，他递给了我一瓶盐。',
      en: 'I wanted sugar, he handed me a bottle of salt.',
      src: allSetSrc,
    },
    {
      zh: '姐姐分给了我一块蛋糕。',
      en: 'Older sister gave me a piece of cake.',
      src: allSetSrc,
    },
    {
      zh: '老师传授给了学生很多经验。',
      en: 'The teacher passed on a lot of experience to us.',
      src: allSetSrc,
    },
    {
      zh: '我们献给了老师一首歌。',
      en: 'We dedicated a song to the teacher.',
      src: allSetSrc,
    },
    {
      zh: '这些校友捐给了学校二十万。',
      en: 'These alumni donated two hundred thousand to the school.',
      src: allSetSrc,
    },
    {
      zh: '主人赏给了小狗一块肉。',
      en: 'The owner rewarded his dog with a piece of meat.',
      src: allSetSrc,
    },
    {
      zh: '一个孩子交给了我一封信。',
      en: 'A child gave me a letter.',
      src: allSetSrc,
    },
    {
      zh: '他把一束花送给了我。',
      en: 'He gave me a bouquet of flowers.',
      src: allSetSrc,
    },
    {
      zh: '这个老板把一条死鱼卖给了我。',
      en: 'This boss sold me a dead fish.',
      src: allSetSrc,
    },
    {
      zh: '房东把一个很便宜的房子租给了我。',
      en: 'The landlord rented a very cheap house to me.',
      src: allSetSrc,
    },
    {
      zh: '我把书借给了他。',
      en: 'I lent him a book.',
      src: allSetSrc,
    },
    {
      zh: '我要糖，他把一瓶盐递给了我。',
      en: 'I wanted sugar, he handed me a bottle of salt.',
      src: allSetSrc,
    },
    {
      zh: '姐姐把一块蛋糕分给了我。',
      en: 'Older sister gave me a piece of cake.',
      src: allSetSrc,
    },
    {
      zh: '老师把很多经验都传授给了学生。',
      en: 'The teacher passed on a lot of experience to us.',
      src: allSetSrc,
    },
    {
      zh: '我们把一首歌献给了老师。',
      en: 'We dedicated a song to the teacher.',
      src: allSetSrc,
    },
    {
      zh: '这些校友把二十万捐给了学校。',
      en: 'These alumnus donated two hundred thousand to the school.',
      src: allSetSrc,
    },
    {
      zh: '主人把一块肉赏给了小狗。',
      en: 'The owner rewarded his dog with a piece of meat.',
      src: allSetSrc,
    },
    {
      zh: '一个孩子把一封信交给了我。',
      en: 'A child gave me a letter.',
      src: allSetSrc,
    },
  ],
};
