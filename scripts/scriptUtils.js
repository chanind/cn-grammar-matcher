const fs = require('fs');
const path = require('path');
const escapeRegExp = require('lodash.escaperegexp');

const hasHanzi = string => !!string.match(/[\u3400-\u9FBF]/);
const isOnlyHanzi = (string, exceptions = []) => {
  let searchStr = string;
  if (exceptions.length > 0) {
    const exceptionsRegexp = new RegExp(`[${exceptions.map(escapeRegExp).join()}]`, 'giu');
    searchStr = searchStr.replace(exceptionsRegexp, '');
  }
  return !searchStr.split('').find(char => !hasHanzi(char));
};
const trim = text => text.replace(/^\s+|\s+$/giu, '');
const fixNewlines = text => `${trim(text)}\n`;

const collapseAdjacentHanzi = (allsetPatternParts) => {
  const collapsedParts = [];
  let currentPart;
  for (const part of allsetPatternParts) {
    const partIsHanzi = isOnlyHanzi(part, ['(', ')', '?', ':']);
    if (currentPart && partIsHanzi) {
      currentPart += part;
    } else if (partIsHanzi) {
      currentPart = part;
    } else if (currentPart) {
      collapsedParts.push(currentPart);
      currentPart = null;
    }
  }
  if (currentPart) {
    collapsedParts.push(currentPart);
  }
  return collapsedParts;
};

const generateRegex = (allsetPatternParts) => {
  const regexPieces = [];
  for (const part of allsetPatternParts) {
    if (regexPieces.length > 0) {
      regexPieces.push(`[^${part}]+`);
    }
    regexPieces.push(`(${part})`);
  }
  return new RegExp(regexPieces.join(''));
};


const makeParensOptional = (allsetPatternPart) => {
  const matchData = allsetPatternPart.match(/[(（]([^）]+)[)）]/ui);
  if (matchData) {
    const replacement = matchData[1].length > 1 ? `(?:${matchData[1]})?` : `${matchData[1]}?`;
    return allsetPatternPart.replace(matchData[0], replacement);
  }
  return allsetPatternPart;
};

const preprocessAllsetPattern = allsetPattern => (
  // remove any + from inside parens, ex (很 +)
  allsetPattern
    .replace(/\s*\+\s*[)）]/igu, ') +')
    .replace(/\s+/igu, '')
);

const regexFromAllsetPattern = (allsetPattern) => {
  let parts = preprocessAllsetPattern(allsetPattern).split(/\s*\+\s*/);
  parts = parts.map(makeParensOptional);
  const collapsedHanzi = collapseAdjacentHanzi(parts);
  return generateRegex(collapsedHanzi);
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

module.exports = { hasHanzi, isOnlyHanzi, regexFromAllsetPattern, trim, fixNewlines, writeOutMatcher };
