const path = require('path');
const program = require('commander');
const scrapeAllset = require('./allset/scrapeAllset');
const extractMatcher = require('./allset/extractMatcher');
const urls = require('./allset/urls');
const { writeOutMatcher, hasHanzi, isMatcherFileWriteable } = require('./scriptUtils');

const isRegexWeak = (regex) => {
  const regexStr = regex.toString();
  const numHanzi = regexStr.split('').filter(hasHanzi).length;
  const hasMultiParts = regexStr.indexOf('[^') >= 0;
  return numHanzi <= 3 || (hasMultiParts && numHanzi <= 6);
};

const run = async () => {
  program
    .usage('yarn run allset-full-import')
    .option('-w, --write-weak-matchers', 'Write out poor quality matchers')
    .parse(process.argv);

  const results = {
    strong: [],
    weak: [],
    broken: [],
    empty: [],
    skipped: [],
  };

  for (const url of urls) {
    try {
      console.log('-----------------------');
      console.log(url.label);
      console.log(url.url);
      const scrapedFields = await scrapeAllset(url.url);
      if (url.id) scrapedFields.matcherId = url.id;

      if (scrapedFields.regexes.length === 0) {
        console.log('EMPTY');
        results.empty.push(url);
        continue;
      }

      let isWeak = false;
      for (const regex of scrapedFields.regexes) {
        if (isRegexWeak(regex)) {
          console.log(`Weak regex: ${regex}`);
          isWeak = true;
        } else {
          console.log(`Strong regex: ${regex}`);
        }
      }

      let skipped = false;
      const { mainTemplate, testTemplate, fullMatcherName } = extractMatcher(scrapedFields);
      const mainFile = path.resolve(__dirname, `../src/matchers/${fullMatcherName}.js`);
      if (!isMatcherFileWriteable(mainFile)) {
        skipped = true;
        results.skipped.push(url);
        console.log('SKIPPED');
      }
      if (program.writeWeak || !isWeak) {
        writeOutMatcher(fullMatcherName, mainTemplate, testTemplate);
      }

      if (!skipped) {
        console.log(isWeak ? 'WEAK' : 'STRONG');
        const target = isWeak ? results.weak : results.strong;
        target.push(url);
      }
    } catch (err) {
      console.log(err);
      results.broken.push(url);
    }
  }

  console.log('SUMMARY');
  console.log(`${results.strong.length} strong`);
  console.log(`${results.weak.length} weak`);
  console.log(`${results.empty.length} empty`);
  console.log(`${results.skipped.length} skipped`);
  console.log(`${results.broken.length} broken`);

  console.log('Done! :D');
};
run().catch((err) => {
  console.log(err);
  process.exit(1);
});
