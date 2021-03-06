/* --- AUTOGENERATED FILE -----------------------------
* If you make changes to this file delete this comment.
* Otherwise the file may be overwritten in the future.
* --------------------------------------------------- */

const { mergeLocMatchGroups } = require('../lib/matching/utils');
const { regexMatchLocs } = require('../lib/matching/regexMatch');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGUD25J',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'zhenghao',
  structures: ['Subj. + 正好', '正好 + Verb', 'Verb + 得 + 正好'],
  description:
    '正好 (zhènghǎo) can be used as an adjective or adverb to help express a coincidence, and it could be related to size, volume, quantity, degree, time, etc. This is similar to how we say in English “Oh, this shirt I grabbed was just the right size." or something like that. When used with a noun, use 正好 right after it. When used with a verb, the 正好 goes right before it. You can also use 正好 along with 得. This is usually a clause of its own.',
  sources: [allSetSrc],
  match: sentence =>
    mergeLocMatchGroups([
      regexMatchLocs(sentence.text, /(正好)/),
      regexMatchLocs(sentence.text, /(得正好)/),
    ]),
  examples: [
    {
      zh: '这件衣服的大小正好。',
      en: 'The size of these clothes is just right.',
      src: allSetSrc,
    },
    {
      zh: '两个人正好，一个说，一个演。',
      en: 'Two people is perfect. One to speak and one to act.',
      src: allSetSrc,
    },
    {
      zh: '水温正好，不冷也不热。',
      en: 'The temperature of the water is perfect, not too cold, not too hot.',
      src: allSetSrc,
    },
    {
      zh: '这个楼层正好，不高也不低。',
      en: 'The floor is perfect, not too high, not too low.',
      src: allSetSrc,
    },
    {
      zh: '两个房间正好，我一间，我爸妈一间。',
      en: 'Two rooms are perfect. One for me and one for my parents.',
      src: allSetSrc,
    },
    {
      zh: '我正好要出去，你要我帮你带什么东西吗？',
      en: "I'm just about to leave. What do you want me to bring for you?",
      src: allSetSrc,
    },
    {
      zh: '我现在正好没事做，可以帮你照顾一下宝宝。',
      en: 'I just happened to have nothing to do now so I can help you with the baby.',
      src: allSetSrc,
    },
    {
      zh: '我出门的时候正好下雨了。',
      en: 'I was going out the door just as it started to rain.',
      src: allSetSrc,
    },
    {
      zh: '你来了！我正好要给你打电话。',
      en: 'You are here! I was just going to call you.',
      src: allSetSrc,
    },
    {
      zh: '他正好是学这个专业的，也许可以帮你。',
      en: 'His major is just this. Maybe he could help you.',
      src: allSetSrc,
    },
    {
      zh: '你来得正好，不早也不晚。',
      en: 'You arrived at just the right time, not too early and not too late.',
      src: allSetSrc,
    },
    {
      zh: '米饭煮得正好，不硬也不软。',
      en: 'The rice was made perfectly, not too hard and not too soft.',
      src: allSetSrc,
    },
    {
      zh: '盐放得正好，不咸也不淡。',
      en: 'The amount of salt you put was just right, not too salty and not too bland.',
      src: allSetSrc,
    },
    {
      zh: '钱给得正好，不多也不少。',
      en: 'The money you gave was just right, not too much and not too little.',
      src: allSetSrc,
    },
    {
      zh: '这个地方你选得正好，离我们都很近。',
      en: 'The place you chose was perfect. It was close to both of us.',
      src: allSetSrc,
    },
  ],
};
