const program = require('commander');
const scrapeAllset = require('./allset/scrapeAllset');
const extractPattern = require('./allset/extractPattern');
const { writeOutPattern } = require('./scriptUtils');
const urls = require('./allset/urls').all;

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
    const exUrl = 'https://resources.allsetlearning.com/chinese/grammar/ASGP0KFF';
    console.log(`ERROR: Invalid allset url. Should be something like: ${exUrl}`);
  }

  let urlData;
  for (const url of urls) {
    if (url.url === allsetUrl) {
      urlData = url;
    }
  }
  if (!urlData) {
    console.log('ERROR: could not find that URL in the allset import list');
    return;
  }

  const scrapedFields = await scrapeAllset(allsetUrl);
  Object.assign(scrapedFields, urlData);

  if (program.matcherId) {
    scrapedFields.matcherId = program.matcherId;
  }
  const { mainTemplate, testTemplate, fullPatternName } = extractPattern(scrapedFields);

  writeOutPattern(fullPatternName, mainTemplate, testTemplate, program.force);

  console.log('Done! :D');
};
run().catch(err => {
  console.log(err);
  process.exit(1);
});
