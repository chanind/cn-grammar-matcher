const program = require('commander');
const { writeOutPattern, formatFullPatternName } = require('./scriptUtils');

const run = () => {
  program
    .usage('yarn run gen-pattern <pattern-name>')
    .option('-f, --force', 'Overwrite existing files')
    .parse(process.argv);

  const patternNameInput = program.args[0];

  if (!patternNameInput) {
    console.log('ERROR: Missing pattern name parameter');
    return;
  }

  const fullPatternName = formatFullPatternName(patternNameInput);
  const patternName = fullPatternName.replace(/Pattern$/, '');

  const mainTemplate = `
const {
  and,
  pos,
  word,
} = require('../lib/tokenFilters');
const { regexMatchTokens } = require('../lib/matching/regexMatch');
const { locsFromTokens } = require('../lib/matching/utils');

const websiteSrc = {
  type: 'website',
  url: 'https://resources.allsetlearning.com/chinese/grammar/Negation_of_%22you%22_with_%22mei%22',
  name: 'AllSet Chinese Grammar Wiki',
};

const bookSrc = {
  type: 'book',
  title: 'Short-Term Spoken Chinese - Pre-Intermediate',
  isbn13: '9787301263761',
  isbn10: '7301263767',
  author: 'Jianfei Ma',
  pages: [],
};

module.exports = {
  id: '${patternName}',
  name: 'FILL ME IN',
  description: 'FILL ME IN',
  sources: [
    bookSrc,
    websiteSrc,
  ],
  match: (sentence) => {
    // SAMPLE IMPLEMENTATION: CHANGE THIS AS NEEDED
    const meiyou = and(pos('AD|VE'), word('没有?'));
    return locsFromTokens(
      regexMatchTokens(
        sentence.tokens,
        '(:meiyou:)',
        { meiyou },
      ),
      /[没有]+/,
    );
  },
  examples: [
    {
      zh: '我没有问题。',
      en: "I don't have any questions.",
      src: websiteSrc,
    },
  ],
};
  `;

  const testTemplate = `
const ${fullPatternName} = require('./${fullPatternName}');
const {
  assertAllExamplesMatch,
  assertNoneMatch,
  findLocsRegex,
  parseSentence,
} = require('../lib/testUtils');

test('matches all examples', async () => {
  await assertAllExamplesMatch(${fullPatternName});
});

test('sentence with multiple occurrences with just 没', async () => {
  const sentence = await parseSentence('我没工作，我老公也没工作');
  expect(${fullPatternName}.match(sentence)).toEqual(findLocsRegex(sentence, /(没)/));
});

test("doesn't match negative examples", async () => {
  await assertNoneMatch(${fullPatternName}, [
    '我不是你的爸爸。',
    'MORE NEGATIVE EXAMPLES HERE',
  ]);
});
  `;

  writeOutPattern(fullPatternName, mainTemplate, testTemplate, program.force);
  console.log('Done! :D');
};
run();
