const program = require('commander');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const request = require('request-promise-native');
const removeDiacritics = require('diacritics').remove;

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
  const $ = cheerio(content);

  const matcherId = removeDiacritics($('#ibox+ p').text().match(/\(([^\)]*)\)/i)[1]).replace(/\s+/, '_');

  const ruleGroups = $('.jiegou');
};
run();
