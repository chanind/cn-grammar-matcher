const program = require('commander');
const genMatcher = require('./allset/genMatcher');

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

  await genMatcher(allsetUrl, { force: program.force, matcherId: program.matcherId });

  console.log('Done! :D');
};
run().catch((err) => {
  console.log(err);
  process.exit(1);
});
