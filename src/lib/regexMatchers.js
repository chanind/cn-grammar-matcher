const { padLeft } = require('./utils');
const { notRoot } = require('./tokenFilters');


// This returns a 0-padded string representing this token ID which can be used in the token regex
const getTokenIdStr = (tokenId, tokens) => {
  const tokenIdDigits = Math.ceil(tokens.length / 10);
  return `#${padLeft(tokenId, tokenIdDigits)}`;
};

const constructRegexSubstitution = (matchFunc, tokens) => {
  const matchingTokenIds = [];
  for (let i = 0; i < tokens.length; i += 1) {
    const token = tokens[i];
    if (matchFunc(token)) {
      matchingTokenIds.push(getTokenIdStr(i, tokens));
    }
  }
  if (matchingTokenIds.length === 0) {
    // ensure there's never an empty (:?) group for conditions that match nothing
    matchingTokenIds.push('NONE');
  }
  return `(?:${matchingTokenIds.join('|')})`;
};

const constructRegexStr = (tokens, regexTemplate, matchParams) => {
  let regexStr = regexTemplate;
  for (const subName of Object.keys(matchParams)) {
    const matchFunc = matchParams[subName];
    const replacement = constructRegexSubstitution(matchFunc, tokens);
    regexStr = regexStr.replace(new RegExp(`:${subName}:`, 'g'), replacement);
  }
  return regexStr;
};

// used to match the generated regex template against
const constructTokensStr = (tokens) => {
  let tokensStr = '';
  for (let i = 0; i < tokens.length; i += 1) {
    tokensStr += getTokenIdStr(i, tokens);
  }
  return tokensStr;
};

const getCapturedTokensFromMatch = (matchResults, tokens) => {
  const matchingTokens = [];
  // the first result is the whole match, not captured groups
  for (const result of matchResults.slice(1)) {
    // if there's an optional capture group that didn't match, it will have a value of undefined
    // ignore those matches here. Revisit later if we find we want to keep the undefined, or
    // keep grouping each match by capture group regardless
    if (result === undefined) continue;
    const tokenIndexStrs = result.split('#').filter(index => index !== '');
    for (const tokenIndexStr of tokenIndexStrs) {
      matchingTokens.push(tokens[parseInt(tokenIndexStr, 10)]);
    }
  }
  return matchingTokens;
};


/**
* Multi-match version of regexMatchTokens
*
* @returns {Tokens[][]|null} the capured tokens or null if no match was found
*/
exports.regexMatchTokens = (tokens, regexTemplate, matchParams) => {
  const filteredTokens = tokens.filter(notRoot); // remove the root node from matches
  const tokensStr = constructTokensStr(filteredTokens);
  const regexStr = constructRegexStr(filteredTokens, regexTemplate, matchParams);
  const mainMatches = tokensStr.match(new RegExp(regexStr, 'g'));
  if (!mainMatches) return null;
  const matchResults = [];
  for (const innerMatchStr of mainMatches) {
    const innerMatch = innerMatchStr.match(new RegExp(regexStr));
    matchResults.push(getCapturedTokensFromMatch(innerMatch, filteredTokens));
  }
  return matchResults;
};

/**
* Given an array of locs, combine adject locs into 1 bigger index
*/
// TODO: make this smart enough to handle overlapping and out of order locs
const combineAdjacentLocations = (locs) => {
  if (locs.length <= 1) {
    return locs;
  }
  const combinedIndices = [];
  let currentLocation = Object.assign({}, locs[0]);
  for (let i = 1; i < locs.length; i += 1) {
    const index = locs[i];
    if (index.start === currentLocation.end) {
      currentLocation.end = index.end;
    } else {
      combinedIndices.push(currentLocation);
      currentLocation = Object.assign({}, index);
    }
  }
  combinedIndices.push(currentLocation);
  return combinedIndices;
};

/**
* Extract match locations from a returned list of token matches
*
* @param {Tokens[][]|null} the tokens representing the match
* @param {matchRegex} an optional regex to further filter the resulting locs.
*     Useful if tokens might contain extra characters inside of tokens
* @returns {Location[][]|null} The 
*/
exports.locsFromTokens = (tokenMatches) => {
  if (!tokenMatches) return null;
  const matches = [];
  for (const tokenMatch of tokenMatches) {
    let locations = [];
    for (const token of tokenMatch) {
      const location = {
        start: token.characterOffsetBegin,
        end: token.characterOffsetEnd,
      };
      locations.push(location);
    }
    locations = combineAdjacentLocations(locations);
    matches.push(locations);
  }
  return matches;
};
