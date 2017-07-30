const { padLeft } = require('./utils');
const { notRoot } = require('./tokenFilters');
const MultiRegExp = require('../vendor/MultiRegExp');


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

const getCapturedLocsFromMatch = (multiMatchResults, startIndex) => {
  const matchingLocs = [];
  // the first result is the whole match, not captured groups
  for (const key of Object.keys(multiMatchResults)) {
    const matchData = multiMatchResults[key];
    // if there's an optional capture group that didn't match, it will have a value of null
    // ignore those matches here. Revisit later if we find we want to keep them null, or
    // keep grouping each match by capture group regardless
    if (matchData === null) continue;
    matchingLocs.push({
      start: matchData.index + startIndex,
      end: matchData.index + startIndex + matchData.text.length,
    });
  }
  return matchingLocs;
};

/**
* Given an array of locs, combine adject locs into 1 bigger index
*/
const combineAdjacentLocations = (locs) => {
  if (locs.length <= 1) {
    return locs;
  }

  const sortedLocs = [...locs];
  sortedLocs.sort((locA, locB) => locA.start - locB.start);
  const combinedIndices = [];
  let currentLoc = Object.assign({}, sortedLocs[0]);
  for (let i = 1; i < sortedLocs.length; i += 1) {
    const loc = sortedLocs[i];
    if (loc.start <= currentLoc.end && loc.end > currentLoc.end) {
      currentLoc.end = loc.end;
    } else if (loc.start > currentLoc.end) {
      combinedIndices.push(currentLoc);
      currentLoc = Object.assign({}, loc);
    }
  }
  combinedIndices.push(currentLoc);
  return combinedIndices;
};

/**
* Match patterns of tokens using a regex
* returns an array of tokens for each capture group match
* ex: regexMatchTokens(tokens, '(:adv:):noPunc:*(:yijing:)', {adv: pos('adv'), noPunc, yijing: word('已经')})
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
* Match a raw string and retun an array of locations of each capture group match
* ex: regexMatchLocs(text, /(已经).*(了)/)
*
* @returns {Tokens[][]|null} the capured match locations or null if no match was found
*/
exports.regexMatchLocs = (text, regex) => {
  const mainMatches = text.match(new RegExp(regex, 'gui'));
  if (!mainMatches) return null;
  const matchResults = [];
  let lastMatchEndIndex = 0;
  const multiRegex = new MultiRegExp(new RegExp(regex, 'ui'));
  for (const innerMatchStr of mainMatches) {
    const innerMatchStartPos = text.indexOf(innerMatchStr, lastMatchEndIndex);
    const innerMatch = multiRegex.exec(innerMatchStr);
    let locs = getCapturedLocsFromMatch(innerMatch, innerMatchStartPos);
    locs = combineAdjacentLocations(locs);
    matchResults.push(locs);
    lastMatchEndIndex = innerMatchStartPos + innerMatchStr.length;
  }
  return matchResults;
};

const locationFromToken = (token, matchRegex = null) => {
  const baseLocation = {
    start: token.characterOffsetBegin,
    end: token.characterOffsetEnd,
  };
  if (!matchRegex) return baseLocation;
  const matchData = token.word.match(new RegExp(matchRegex, 'ui'));
  if (!matchData) return null;
  baseLocation.start += matchData.index;
  baseLocation.end = baseLocation.start + matchData[0].length;
  return baseLocation;
};

/**
* Extract match locations from a returned list of token matches
*
* @param {Tokens[][]|null} the tokens representing the match
* @param {matchRegex} an optional regex to further filter the resulting locs.
*     Useful if tokens might contain extra characters besides just those we want to match
* @returns {Location[][]|null} The 
*/
exports.locsFromTokens = (tokenMatches, matchRegex = null) => {
  if (!tokenMatches) return null;
  const matches = [];
  for (const tokenMatch of tokenMatches) {
    let locations = [];
    for (const token of tokenMatch) {
      const location = locationFromToken(token, matchRegex);
      if (!location) continue;
      locations.push(location);
    }
    locations = combineAdjacentLocations(locations);
    matches.push(locations);
  }
  return matches;
};

const locsOverlap = (loc1, loc2) => {
  // loc2.start is inside of loc1
  if (loc1.start <= loc2.start && loc1.end > loc2.start) {
    return true;
  }
  // loc2.end is inside of loc1
  if (loc1.start < loc2.end && loc1.end >= loc2.end) {
    return true;
  }
  return false;
};

const matchesOverlap = (match1, match2) => {
  // NOTE: this has a bad big O. This can be improved if needed, but probably doesn't matter
  for (const loc1 of match1) {
    for (const loc2 of match2) {
      if (locsOverlap(loc1, loc2)) {
        return true;
      }
    }
  }
  return false;
};

const intersectMatches = (match1, match2) => {
  const allLocs = [...match1, ...match2].sort((locA, locB) => locA.start - locB.start);
  if (allLocs.length === 0) return [];
  const combinedMatch = [];
  while (allLocs.length > 1) {
    const curLoc = allLocs.shift();
    if (locsOverlap(curLoc, allLocs[0])) {
      combinedMatch.push({
        start: Math.max(curLoc.start, allLocs[0].start),
        end: Math.min(curLoc.end, allLocs[0].end),
      });
    }
  }
  return combinedMatch;
};

const unionMatches = (match1, match2) => {
  const allLocs = [...match1, ...match2].sort((locA, locB) => locA.start - locB.start);
  if (allLocs.length === 0) return [];
  const combinedMatch = [];
  while (allLocs.length > 1) {
    const curLoc = allLocs.shift();
    if (locsOverlap(curLoc, allLocs[0])) {
      const comboLoc = {
        start: Math.min(curLoc.start, allLocs[0].start),
        end: Math.max(curLoc.end, allLocs[0].end),
      };
      allLocs[0] = comboLoc;
    } else {
      combinedMatch.push(curLoc);
    }
  }
  combinedMatch.push(allLocs.pop());
  return combinedMatch;
};

const appendOrMergeMatch = (matchesList, match, conservative) => {
  const updatedMatchesList = matchesList.slice();
  for (let i = 0; i < updatedMatchesList.length; i += 1) {
    const existingMatch = updatedMatchesList[i];
    if (matchesOverlap(existingMatch, match)) {
      const combineMethod = conservative ? intersectMatches : unionMatches;
      const combinedMatch = combineMethod(existingMatch, match);
      updatedMatchesList[i] = combinedMatch;
      return updatedMatchesList;
    }
  }
  updatedMatchesList.push(match);
  return updatedMatchesList;
};

/**
* Merge multiple groups of matches together
*
* @param {locMatchGroups} the list of matches to merge together
* @param {conservative} a bool indicating whether in the event of overlapping matches
*                       to use the intersection (true) or union (false)
* @returns {Location[][]} The merged listed of matches
*/
exports.mergeLocMatchGroups = (locMatchGroups, conservative = true) => {
  if (!locMatchGroups) return null;
  let mergedMatches = [];
  // NOTE: this has a bad big O. This can be improved if needed, but probably doesn't matter
  for (const locMatchGroup of locMatchGroups.filter(x => x)) {
    for (const locMatch of locMatchGroup) {
      mergedMatches = appendOrMergeMatch(mergedMatches, locMatch, conservative);
    }
  }
  return mergedMatches.length > 0 ? mergedMatches : null;
};
