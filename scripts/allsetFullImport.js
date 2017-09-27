const fs = require('fs');
const path = require('path');
const program = require('commander');
const shuffle = require('lodash.shuffle');
const scrapeAllset = require('./allset/scrapeAllset');
const extractPattern = require('./allset/extractPattern');
const urls = require('./allset/urls').all;
const { writeOutPattern, getNumHanzi, isPatternFileWriteable } = require('./scriptUtils');
const { mergeLocMatchGroups, regexMatchLocs } = require('../src/lib/matching/regexMatch');

const WEAK = 1;
const MEDIUM = 2;
const STRONG = 3;

const strengthLabel = strength => {
  if (strength === WEAK) return 'WEAK';
  if (strength === MEDIUM) return 'MEDIUM';
  if (strength === STRONG) return 'STRONG';
  return 'UNDEFINED';
};

const getRegexStrength = regex => {
  const regexStr = regex.toString();
  const numHanzi = getNumHanzi(regexStr);
  const hasMultiParts = regexStr.indexOf('[^') >= 0;
  if (numHanzi <= 1 || (hasMultiParts && numHanzi <= 2)) return WEAK;
  if (numHanzi <= 3 || (hasMultiParts && numHanzi <= 4)) return MEDIUM;
  return STRONG;
};

const run = async () => {
  program
    .usage('yarn run allset-full-import')
    .option('-w, --write-weak-patterns', 'Write out poor quality patterns')
    .option('-m, --write-medium-patterns', 'Write out medium quality patterns')
    .option('-n, --next <num>', 'Import the next [num] new patterns', parseInt)
    .parse(process.argv);

  const results = {
    strong: [],
    medium: [],
    weak: [],
    broken: [],
    empty: [],
    skipped: [],
  };

  const potentialNew = [];

  for (const url of urls) {
    try {
      console.log('-----------------------');
      console.log(url.label);
      console.log(url.url);

      if (url.skip) {
        results.skipped.push(url);
        console.log('SKIPPED');
        continue;
      }

      const scrapedFields = await scrapeAllset(url.url);

      Object.assign(scrapedFields, url);

      if (scrapedFields.regexes.length === 0) {
        console.log('EMPTY');
        results.empty.push(url);
        continue;
      }

      // filterExamples means exclude examples that this matcher does not match successfully
      if (url.filterExamples) {
        scrapedFields.examples = scrapedFields.examples.filter(example => {
          const regexMatches = scrapedFields.regexes.map(regex =>
            regexMatchLocs(example.zh, regex)
          );
          return mergeLocMatchGroups(regexMatches);
        });
      }

      let strength = STRONG;
      for (const regex of scrapedFields.regexes) {
        const regexStrength = getRegexStrength(regex);
        if (strength > regexStrength) {
          strength = regexStrength;
        }
        console.log(`${strengthLabel(regexStrength)} regex: ${regex}`);
      }

      let skipped = false;
      const { mainTemplate, testTemplate, fullPatternName } = extractPattern(
        scrapedFields
      );
      const mainFile = path.resolve(__dirname, `../src/patterns/${fullPatternName}.js`);
      if (!isPatternFileWriteable(mainFile)) {
        skipped = true;
        results.skipped.push(url);
        console.log('SKIPPED');
      }
      const isNewPattern = !fs.existsSync(mainFile);
      if (
        strength === STRONG ||
        (program.writeMediumPatterns && strength === MEDIUM) ||
        (program.writeWeakPatterns && strength === WEAK) ||
        !isNewPattern
      ) {
        writeOutPattern(fullPatternName, mainTemplate, testTemplate);
      } else if (isNewPattern) {
        potentialNew.push([fullPatternName, mainTemplate, testTemplate]);
      }

      if (!skipped) {
        console.log(strengthLabel(strength));
        if (strength === STRONG) results.strong.push(url);
        if (strength === MEDIUM) results.medium.push(url);
        if (strength === WEAK) results.weak.push(url);
      }
    } catch (err) {
      console.log(err);
      results.broken.push(url);
    }
  }

  if (program.next > 0) {
    const newPatterns = shuffle(potentialNew).slice(0, program.next);
    for (const params of newPatterns) {
      console.log(`NEW pattern: ${params[0]}`);
      writeOutPattern.apply(this, params);
    }
  }

  console.log('SUMMARY');
  console.log(`${results.strong.length} strong`);
  console.log(`${results.medium.length} medium`);
  console.log(`${results.weak.length} weak`);
  console.log(`${results.empty.length} empty`);
  console.log(`${results.skipped.length} skipped`);
  console.log(`${results.broken.length} broken`);

  console.log('Done! :D');
};
run().catch(err => {
  console.log(err);
  process.exit(1);
});
