const program = require('commander');
const fs = require('fs');
const path = require('path');
const osmosis = require('osmosis');

const run = () => {
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
    console.log(`ERROR: Invalid allset url. Should be something like: ${exUrl}`)
  }

  osmosis.get(allsetUrl).set({
    name: '.jiegou p',
    desc: '#ibox+ p',
  }).data(console.log);
};
run();
