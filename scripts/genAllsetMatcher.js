const program = require('commander');
const scrapeAllset = require('./allset/scrapeAllset');
const extractMatcher = require('./allset/extractMatcher');
const { writeOutMatcher } = require('./scriptUtils');

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

  if (
    !allsetUrl.match(/https:\/\/resources\.allsetlearning\.com\/chinese\/grammar\/.*/)
  ) {
    const exUrl =
      'https://resources.allsetlearning.com/chinese/grammar/Adjectival_complement_%22de_budeliao%22';
    console.log(`ERROR: Invalid allset url. Should be something like: ${exUrl}`);
  }

  const scrapedFields = await scrapeAllset(allsetUrl);
  if (program.matcherId) {
    scrapedFields.matcherId = program.matcherId;
  }
  const { mainTemplate, testTemplate, fullMatcherName } = extractMatcher(scrapedFields);

  writeOutMatcher(fullMatcherName, mainTemplate, testTemplate, program.force);

  console.log('Done! :D');
};
run().catch(err => {
  console.log(err);
  process.exit(1);
});
