const program = require('commander');
const cheerio = require('cheerio');
const request = require('request-promise-native');
const camelCase = require('lodash.camelcase');
const removeDiacritics = require('diacritics').remove;
const { trim, regexFromAllsetPattern, writeOutMatcher } = require('./scriptUtils');

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

  const content = await request(allsetUrl);
  const $ = cheerio.load(content);

  const matcherId = camelCase(removeDiacritics($('#ibox+ p').text().match(/\(([^)]*)\)/i)[1]).replace(/\s+/, '_'));
  const fullMatcherName = `${matcherId}Matcher`;

  const $rules = $('.jiegou p');
  const matchRegexes = $rules.map((i, elm) => regexFromAllsetPattern($(elm).text())).toArray();
  const matchRegexStrings = matchRegexes.map(regex => `regexMatchLocs(text, ${regex}),`);
  const matchString = trim(`
    const text = sentence.original;
    return mergeLocMatchGroups([
      ${matchRegexStrings.join('\n        ')}
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
  const name = $($rules[0]).text();

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
run();
