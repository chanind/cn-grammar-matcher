const { pos, word } = require('../lib/tokenFilters');
const { regexMatchTokens } = require('../lib/matching/regexMatch');
const { mergeLocMatchGroups, locsFromTokens } = require('../lib/matching/utils');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASG3WTCJ',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'expressingLatenessWithCai',
  name: 'Subj. + Time + 才 + Verb + Obj.',
  description: 'One of the ways to express lateness in Chinese is with 才 (cái).',
  sources: [allSetSrc],
  match: sentence =>
    mergeLocMatchGroups([
      locsFromTokens(
        regexMatchTokens(sentence.tokens, ':time:.*(:cai:):verb:', {
          time: pos('NT|CD'),
          cai: word('才'),
          verb: pos('VV'),
        })
      ),
    ]),
  examples: [
    {
      zh: '我昨天十点才下班。',
      en: "I got off work at ten o'clock yesterday.",
      src: allSetSrc,
    },
    {
      zh: '他二十五岁才去上大学。',
      en: "He didn't go to college until he was 25.",
      src: allSetSrc,
    },
    {
      zh: '我们十点上课，可是他十点半才来。',
      en: "We have class at 10 o'clock, but he didn't come until 10:30.",
      src: allSetSrc,
    },
    {
      zh: '如果我晚上十二点半才回家，我妈会很不高兴。',
      en: "If I don't get home until 12:30 pm, my mother will be very unhappy.",
      src: allSetSrc,
    },
    {
      zh: '我等了十分钟，他才给我开门。',
      en: "He didn't open the door until I waited for ten minutes.",
      src: allSetSrc,
    },
  ],
};
