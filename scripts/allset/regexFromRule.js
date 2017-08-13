const { isOnlyHanzi, hasHanzi, getNumHanzi } = require('../scriptUtils');

const numRegex = '[零一二三四五六七八九十百千万亿两0-9]+';

const collapseAdjacentHanzi = allsetPatternParts => {
  const collapsedParts = [];
  let currentPart;
  for (const part of allsetPatternParts) {
    const partIsHanzi =
      isOnlyHanzi(part, 'xyzXYZ|()?，？:') &&
      hasHanzi(part, '，？') &&
      part !== '，)' &&
      part !== '(，';
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

const generateRegex = allsetPatternParts => {
  const regexPieces = [];
  for (const part of allsetPatternParts) {
    if (regexPieces.length > 0) {
      const negativePart = part.replace(/[?:|()]/gu, '');
      regexPieces.push(`[^${negativePart}]+`);
    }
    const processedPart = part.replace(/[xyz]/giu, numRegex);
    regexPieces.push(`(${processedPart})`);
  }
  return new RegExp(regexPieces.join(''));
};

const makeParensOptional = allsetPatternPart => {
  const matchData = allsetPatternPart.match(/[(（]([^）]+)[)）]/iu);
  if (matchData) {
    const replacement =
      matchData[1].length > 1 ? `(?:${matchData[1]})?` : `${matchData[1]}?`;
    return allsetPatternPart.replace(matchData[0], replacement);
  }
  return allsetPatternPart;
};

const wrapOr = allsetPattern =>
  allsetPattern.indexOf('|') >= 0 ? `(?:${allsetPattern})` : allsetPattern;

const preprocessAllsetPattern = allsetPattern => {
  let processedPattern = allsetPattern;
  const numHanzi = getNumHanzi(allsetPattern);
  if (numHanzi >= 4) {
    processedPattern = processedPattern.replace(/，/giu, '+');
  }
  return processedPattern
    .replace(/\s+/giu, '')
    .replace(/⋯+/giu, '+')
    .replace(/…+/giu, '+')
    .replace(/\.{3,4}/giu, '+')
    .replace(/？/giu, '+？+')
    .replace(/，/giu, '+，+')
    .replace(/,/giu, '+，+')
    .replace(/＋/giu, '+')
    .replace(/\ba\b/giu, '+')
    .replace(/\bb\b/giu, '+')
    .replace(/\+[)）]/giu, ') +')
    .replace(/[(（]\+/giu, '+ (') // remove any + from inside parens, ex (很 +)
    .replace(/[／/]/giu, '|')
    .replace(/[(（][^)）\u3400-\u9FBF]+[)）]/giu, '')
    .replace(/verb/giu, '+ verb +');
};

const regexFromRule = allsetPattern => {
  const parts = preprocessAllsetPattern(allsetPattern)
    .split(/\s*\+\s*/)
    .map(makeParensOptional)
    .map(wrapOr);
  const collapsedHanzi = collapseAdjacentHanzi(parts);
  if (collapsedHanzi.length === 0 || !hasHanzi(collapsedHanzi.join(''))) {
    throw new Error(`No regex could be generated from input: ${allsetPattern}`);
  }
  return generateRegex(collapsedHanzi);
};

module.exports = regexFromRule;
