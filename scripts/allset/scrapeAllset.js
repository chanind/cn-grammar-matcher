const cheerio = require('cheerio');
const camelCase = require('lodash.camelcase');
const removeDiacritics = require('diacritics').remove;
const { requestWithCache } = require('../scriptUtils');
const regexFromRule = require('./regexFromRule');

const formatZh = text => (
  text
    .replace(/。.*$/, '。')
    .replace(/？.*$/, '？')
    .replace(/！.*$/, '！')
    .replace(/\s+/gi, '')
);

const getExampleFields = ($exampleElm) => {
  if ($exampleElm.find('.trans').length === 0) return null;
  return {
    zh: formatZh($exampleElm.text()),
    en: $exampleElm.find('.trans').text(),
  };
};

module.exports = async (allsetUrl) => {
  const content = await requestWithCache(allsetUrl);
  const $ = cheerio.load(content);
  let matcherId;

  const pinyinTextMatch = $('#ibox+ p').text().match(/\(([^)]*)\)/i);
  const rules = $('.jiegou p').map((i, elm) => $(elm).text()).toArray().filter(x => x);
  const regexes = rules.map(regexFromRule);

  if (pinyinTextMatch) {
    matcherId = camelCase(removeDiacritics(pinyinTextMatch[1]).replace(/\s+/, '_'));
  }
  if (!matcherId || matcherId.length <= 3) {
    matcherId = camelCase($('h1').text().replace(/[^\sa-z]+/giu, '').replace(/\s+/, '_'));
  }

  const examples = $('.liju li').map((i, li) => getExampleFields($(li))).toArray().filter(x => x);
  const description = $('#ibox+ p').text();
  const name = rules[0];

  return {
    url: allsetUrl,
    name,
    matcherId,
    regexes,
    description,
    examples,
  };
};
