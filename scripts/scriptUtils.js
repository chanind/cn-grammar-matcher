const escapeRegExp = require('lodash.escaperegexp');

const hasHanzi = string => !!string.match(/[\u3400-\u9FBF]/);
const isOnlyHanzi = (string, exceptions=[]) => {
  let searchStr = string;
  if (exceptions.length > 0) {
    const exceptionsRegexp = new RegExp(`[${exceptions.map(escapeRegExp).join()}]`, 'giu');
    searchStr = searchStr.replace(exceptionsRegexp, '');
  }
  return !searchStr.split('').find(char => !hasHanzi(char));
};

const collapseAdjacentHanzi = (allsetPatternParts) => {
  const collapsedParts = [];
  let currentPart;
  for (const part of allsetPatternParts) {
    const partIsHanzi = isOnlyHanzi(part,['(', ')', '?', ':'])
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
  let hasStarted = false;
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

const preprocessAllsetPattern = (allsetPattern) => (
  // remove any + from inside parens, ex (很 +)
  allsetPattern.replace(/\s*\+\s*[)）]/igu, ') +')
);

const regexFromAllsetPattern = (allsetPattern) => {
  let parts = preprocessAllsetPattern(allsetPattern).split(/\s*\+\s*/);
  parts = parts.map(makeParensOptional);
  const collapsedHanzi = collapseAdjacentHanzi(parts);
  return generateRegex(collapsedHanzi);
};

module.exports = { hasHanzi, isOnlyHanzi, regexFromAllsetPattern };
