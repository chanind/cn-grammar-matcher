const program = require('commander');
const fs = require('fs');
const path = require('path');

const run = () => {
  program
    .usage('yarn run gen-matcher <matcher-name>')
    .option('-f, --force', 'Overwrite existing files')
    .parse(process.argv);

  const matcherName = program.args[0];

  if (matcherName.match(/matcher$/i)) {
    console.log('ERROR: Cannot have the word "matcher" in the matcher name');
    return;
  }

  const fullMatcherName = `${matcherName}Matcher`;

  const fileName = path.resolve(__dirname, `../src/matchers/${fullMatcherName}.js`);
  const testFileName = path.resolve(__dirname, `../src/matchers/${fullMatcherName}.test.js`);
  const matchersIndexFile = path.resolve(__dirname, '../src/matchers/index.js');

  const fixNewlines = text => `${text.replace(/^\s+/, '').replace(/\s+$/, '')}\n`;

  const mainTemplate = `
  const {
    and,
    pos,
    word,
  } = require('../lib/tokenFilters');
  const { regexMatchTokens, locsFromTokens } = require('../lib/regexMatchers');

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
    id: '${fullMatcherName}',
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

  if (fs.existsSync(fileName) && !program.force) {
    console.log(`${fileName} already exists. Skipping. Run with -- -f to overwrite this file.`);
  } else {
    console.log(`Writing ${fileName}`);
    fs.writeFileSync(fileName, fixNewlines(mainTemplate));
  }

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

  if (fs.existsSync(testFileName) && !program.force) {
    console.log(`${testFileName} already exists. Skipping. Run with -- -f to overwrite this file.`);
  } else {
    console.log(`Writing ${testFileName}`);
    fs.writeFileSync(testFileName, fixNewlines(testTemplate));
  }

  const matchersIndex = fs.readFileSync(matchersIndexFile, 'utf-8');
  if (matchersIndex.indexOf(fullMatcherName) >= 0) {
    console.log('Matcher already exists in index. Skipping.');
  } else {
    const requireStatement = `exports.${fullMatcherName} = require('./${fullMatcherName}');`;
    const updatedIndex = `${matchersIndex.replace(/\s+$/, '')}\n${requireStatement}`;
    console.log('Updating matchers/index.js');
    fs.writeFileSync(matchersIndexFile, fixNewlines(updatedIndex));
  }

  console.log('Done! :D');
};
run();
