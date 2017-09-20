const { and, pos, word } = require('../lib/tokenFilters');
const { mergeLocMatchGroups } = require('../lib/matching/utils');
const { Node, graphMatch } = require('../lib/matching/graphMatch');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASG56QKW',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'benlai',
  name: 'Subj. + 本来',
  description:
    'If something was originally a certain way, or "should be" a certain way, the Chinese words used are often 本来 (běnlái) and 原来 (yuánlái). 本来 (běnlái) is usually an adverb while 原来 (yuánlái) could be either and adjective or an adverb. However, they are used in different ways and different circumstances, so this article will help you distinguish when and where to use them.',
  sources: [allSetSrc],
  match: sentence => {
    const tokens = sentence.tokens;
    return mergeLocMatchGroups([
      graphMatch(tokens, new Node({ filter: and(pos('AD'), word('本来')), capture: true })),
    ]);
  },
  examples: [
    {
      zh: '我本来是要去的，不过后来不太舒服，就没去。',
      en: "I was originally going, but I didn't go because I didn't feel very well.",
      src: allSetSrc,
    },
    {
      zh: '他本来是应该考得更好的，可是那天他生病了。',
      en: 'He would have done better on the test, but he was sick that day.',
      src: allSetSrc,
    },
    {
      zh: '我们本来想去找他帮忙的，可是他那么忙，就没去。',
      en: "We were going to ask him for help, but we didn't because he was so busy.",
      src: allSetSrc,
    },
    {
      zh: '这些工作本来是要今天做完的，不过明天做也可以。',
      en: "This work needs to be done by today. But it's OK to leave it to tomorrow.",
      src: allSetSrc,
    },
    {
      zh: '我本来要跟他结婚的，可是后来发现了我们真的不合适。',
      en:
        'I was originally going to marry him, but then I found that we are just not meant for each other.',
      src: allSetSrc,
    },
    {
      zh: '你本来就够瘦了，还要减肥吗？',
      en: 'You are already so thin and you still want to lose weight?',
      src: allSetSrc,
    },
    {
      zh: '他讲得本来就不对，为什么还要我听他的？',
      en:
        'What he says has always been wrong, so why do you still want me to listen to him?',
      src: allSetSrc,
    },
    {
      zh: '她本来就很有钱，当然买得起了。',
      en: 'She is rich. Of course she can afford it.',
      src: allSetSrc,
    },
    {
      zh: '她本来就不喜欢你，你别再追她了。',
      en: 'She never liked you in the first place, so stop pursuing her.',
      src: allSetSrc,
    },
    {
      zh: '他本来就很喜欢开玩笑，你别介意。',
      en: "He has always liked joking around, so don't take it personally.",
      src: allSetSrc,
    },
    {
      zh: '照顾孩子本来就是父母的责任。',
      en: 'Taking care of children is supposed to be the responsibility of parents.',
      src: allSetSrc,
    },
    {
      zh: '老师本来就应该好好备课。',
      en: 'Teachers are supposed to prepare their lessons well.',
      src: allSetSrc,
    },
    {
      zh: '美国人本来就会说流利的英文。',
      en: 'Well, of course Americans speak fluent English.',
      src: allSetSrc,
    },
    {
      zh: '搬家本来就很麻烦。',
      en: 'Moving is always a pain.',
      src: allSetSrc,
    },
    {
      zh: '生活本来就很不容易。',
      en: 'No one ever said life was easy.',
      src: allSetSrc,
    },
  ],
};
