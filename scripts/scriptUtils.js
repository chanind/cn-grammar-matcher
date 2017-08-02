const fs = require('fs');
const path = require('path');
const escapeRegExp = require('lodash.escaperegexp');
const request = require('request-promise-native');
const crypto = require('crypto');

const hasHanzi = (string, exceptions = '') => {
  const hanziRegex = new RegExp(`[${escapeRegExp(exceptions)}\u3400-\u9FBF]`, 'giu');
  return !!string.match(hanziRegex);
};
const isOnlyHanzi = (string, exceptions = '') => {
  let searchStr = string;
  if (exceptions.length > 0) {
    const exceptionsRegexp = new RegExp(`[${escapeRegExp(exceptions)}]`, 'giu');
    searchStr = searchStr.replace(exceptionsRegexp, '');
  }
  return !searchStr.split('').find(char => !hasHanzi(char));
};
const trim = text => text.replace(/^\s+|\s+$/giu, '');
const fixNewlines = text => `${trim(text)}\n`;

const requestWithCache = async (url, cacheDir = path.resolve(__dirname, '../cache')) => {
  const md5 = crypto.createHash('md5').update(url).digest('hex');
  const cacheFile = path.join(cacheDir, md5);
  if (fs.existsSync(cacheFile)) {
    console.log('loaded from cache');
    return fs.readFileSync(cacheFile, 'utf-8');
  }
  const result = await request(url);
  fs.writeFileSync(cacheFile, result);
  return result;
};

const writeOutMatcher = (fullMatcherName, mainTemplate, testTemplate, force = false) => {
  const fileName = path.resolve(__dirname, `../src/matchers/${fullMatcherName}.js`);
  const testFileName = path.resolve(__dirname, `../src/matchers/${fullMatcherName}.test.js`);
  const matchersIndexFile = path.resolve(__dirname, '../src/matchers/index.js');

  if (fs.existsSync(fileName) && !force) {
    console.log(`${fileName} already exists. Skipping. Run with -- -f to overwrite this file.`);
  } else {
    console.log(`Writing ${fileName}`);
    fs.writeFileSync(fileName, fixNewlines(mainTemplate));
  }

  if (fs.existsSync(testFileName) && !force) {
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
};

module.exports = {
  hasHanzi,
  isOnlyHanzi,
  trim,
  fixNewlines,
  writeOutMatcher,
  requestWithCache,
};
