const { regexMatchLocs } = require('../lib/matching/regexMatch');
const { mergeLocMatchGroups } = require('../lib/matching/utils');

const allSetSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/ASGLI7GW',
  name: 'AllSet Chinese Grammar Wiki',
};

module.exports = {
  id: 'expressingEverSinceWithZicong',
  structures: ['自从 + [Starting Point]'],
  description:
    '自从 means "ever since" in English, and is used to express the starting point of an action in the past. It can be followed by phrases using the markers 起 and 以后',
  sources: [allSetSrc],
  match: sentence => {
    const text = sentence.original;
    return mergeLocMatchGroups([regexMatchLocs(text, /(自从)/)]);
  },
  examples: [
    {
      zh: '自从来到湖南，我越来越能吃辣了。',
      en: "Ever since arriving in Hunan, I've been more and more able to eat spicy food.",
      src: allSetSrc,
    },
    {
      zh: '自从金融危机爆发，就业市场变得越来越不景气了。',
      en:
        'Ever since the economic crisis, the job market has been growing less and less.',
      src: allSetSrc,
    },
    {
      zh: '自从他跟我分手后，他就没有联系过我。',
      en: "Ever since he broke up with me, he hasn't contacted me.",
      src: allSetSrc,
    },
  ],
};
