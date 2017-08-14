const program = require('commander');
const { writeOutMatcher, formatFullMatcherName } = require('./scriptUtils');

const run = () => {
  program
    .usage('yarn run gen-matcher <matcher-name>')
    .option('-f, --force', 'Overwrite existing files')
    .parse(process.argv);

  const matcherNameInput = program.args[0];

  if (!matcherNameInput) {
    console.log('ERROR: Missing matcher name parameter');
    return;
  }

  if (matcherNameInput.match(/matcher$/i)) {
    console.log('ERROR: Cannot have the word "matcher" in the matcher name');
    return;
  }

  const fullMatcherName = formatFullMatcherName(matcherNameInput);
  const matcherName = fullMatcherName.replace(/Matcher$/, '');

  const mainTemplate = `
const {
  and,
  pos,
  word,
} = require('../lib/tokenFilters');
const { regexMatchTokens, locsFromTokens } = require('../lib/matchingHelpers');

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
  id: '${matcherName}',
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
const ${fullMatcherName} = require('./${fullMatcherName}');
const {
  assertAllExamplesMatch,
  assertNoneMatch,
  findLocsRegex,
  parseSentence,
} = require('../lib/testUtils');

test('matches all examples', async () => {
  await assertAllExamplesMatch(${fullMatcherName});
});

test('sentence with multiple occurrences with just 没', async () => {
  const sentence = await parseSentence('我没工作，我老公也没工作');
  expect(${fullMatcherName}.match(sentence)).toEqual(findLocsRegex(sentence, /(没)/));
});

test("doesn't match negative examples", async () => {
  await assertNoneMatch(${fullMatcherName}, [
    '我不是你的爸爸。',
    'MORE NEGATIVE EXAMPLES HERE',
  ]);
});
  `;

  writeOutMatcher(fullMatcherName, mainTemplate, testTemplate, program.force);
  console.log('Done! :D');
};
run();
