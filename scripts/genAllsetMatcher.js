const program = require('commander');
const cheerio = require('cheerio');
const camelCase = require('lodash.camelcase');
const removeDiacritics = require('diacritics').remove;
const { trim, regexFromAllsetPattern, writeOutMatcher, requestWithCache } = require('./scriptUtils');

const formatZh = text => (
  text
    .replace(/。.*$/, '。')
    .replace(/？.*$/, '？')
    .replace(/！.*$/, '！')
    .replace(/\s+/gi, '')
);

const formatStr = str => (
  JSON.stringify(trim(str))
    .replace(/\\"/g, '"')
    .replace(/'/g, "\\'")
    .replace(/^"|"$/g, '')
);

const run = async () => {
  program
    .usage('yarn run gen-allset-matcher <allset url>')
    .option('-f, --force', 'Overwrite existing files')
    .option('-i, --matcher-id [value]', 'filename to use for this matcher')
    .parse(process.argv);

  const allsetUrl = program.args[0];

  if (!allsetUrl) {
    console.log('ERROR: Missing allset url parameter');
    return;
  }

  if (!allsetUrl.match(/https:\/\/resources\.allsetlearning\.com\/chinese\/grammar\/.*/)) {
    const exUrl = 'https://resources.allsetlearning.com/chinese/grammar/Adjectival_complement_%22de_budeliao%22';
    console.log(`ERROR: Invalid allset url. Should be something like: ${exUrl}`);
  }

  const content = await requestWithCache(allsetUrl);
  const $ = cheerio.load(content);

  let matcherId = program.matcherId;
  if (!matcherId) {
    const pinyinTextMatch = $('#ibox+ p').text().match(/\(([^)]*)\)/i);
    if (pinyinTextMatch) {
      matcherId = camelCase(removeDiacritics(pinyinTextMatch[1]).replace(/\s+/, '_'));
    }

    if (!matcherId || matcherId.length <= 3) {
      matcherId = camelCase($('h1').text().replace(/[^\sa-z]+/giu, '').replace(/\s+/, '_'));
    }
  }
  const fullMatcherName = `${matcherId}Matcher`;

  const rules = $('.jiegou p').map((i, elm) => $(elm).text()).toArray().filter(x => x);
  if (rules.length === 0) {
    console.log('Error: No rules found!');
    return;
  }
  const matchRegexes = rules.map(regexFromAllsetPattern);
  const matchRegexStrings = matchRegexes.map(regex => `regexMatchLocs(text, ${regex}),`);
  const matchString = trim(`
    const text = sentence.original;
    return mergeLocMatchGroups([
      ${matchRegexStrings.join('\n      ')}
    ]);
  `);

  const getExampleFields = ($exampleElm) => {
    if ($exampleElm.find('.trans').length === 0) return null;
    return {
      zh: formatZh($exampleElm.text()),
      en: $exampleElm.find('.trans').text(),
    };
  };

  const getExamplesString = (exampleFields) => {
    const strings = exampleFields.map(field => trim(`
    {
      zh: '${formatStr(field.zh)}',
      en: '${formatStr(field.en)}',
      src: allSetSrc,
    },
    `));
    return strings.join('\n    ');
  };

  const exampleFields = $('.liju li').map((i, li) => getExampleFields($(li))).toArray().filter(x => x);
  const examplesString = getExamplesString(exampleFields);

  const description = $('#ibox+ p').text();
  const name = rules[0];

  const mainTemplate = `
const { mergeLocMatchGroups, regexMatchLocs } = require('../lib/regexMatchers');

const allSetSrc = {
  type: 'website',
  url: '${formatStr(allsetUrl)}',
  name: 'AllSet Chinese Grammar Wiki',
};


module.exports = {
  id: '${formatStr(matcherId)}',
  name: '${formatStr(name)}',
  description: '${formatStr(trim(description))}',
  sources: [
    allSetSrc,
  ],
  match: (sentence) => {
    ${trim(matchString)}
  },
  examples: [
    ${trim(examplesString)}
  ],
};
  `;

  const testTemplate = `
const ${fullMatcherName} = require('./${fullMatcherName}');
const {
  assertAllExamplesMatch,
  assertNoneMatch,
} = require('../lib/testUtils');

test('matches all examples', async () => {
  await assertAllExamplesMatch(${fullMatcherName});
});

// TODO: Add more tests

test("doesn't match negative examples", async () => {
  await assertNoneMatch(${fullMatcherName}, [
    // TODO: add negative examples here
  ]);
});
  `;
  writeOutMatcher(fullMatcherName, mainTemplate, testTemplate, program.force);
  console.log('Done! :D');
};
run().catch((err) => {
  console.log(err);
  process.exit(1);
});
