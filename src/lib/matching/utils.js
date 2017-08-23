/**
* Given an array of locs, combine adject locs into 1 bigger index
*/
const combineAdjacentLocs = locs => {
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
exports.combineAdjacentLocs = combineAdjacentLocs;

const locFromToken = (token, matchCharsStr = null) => {
  const baseLocation = {
    start: token.characterOffsetBegin,
    end: token.characterOffsetEnd,
  };
  if (!matchCharsStr) return baseLocation;
  const matchData = token.word.match(new RegExp(`[${matchCharsStr}]+`, 'ui'));
  if (!matchData) return null;
  baseLocation.start += matchData.index;
  baseLocation.end = baseLocation.start + matchData[0].length;
  return baseLocation;
};
exports.locFromToken = locFromToken;

/**
* Extract match locations from a returned list of token matches
*
* @param {Tokens[][]|null} the tokens representing the match
* @param {matchCharsStr} an optional string containing characters to further filter the resulting locs.
*     Useful if tokens might contain extra characters besides just those we want to match
* @returns {Location[][]|null} The 
*/
exports.locsFromTokens = (tokenMatches, matchCharsStr = null) => {
  if (!tokenMatches) return null;
  const matches = [];
  for (const tokenMatch of tokenMatches) {
    let locations = [];
    for (const token of tokenMatch) {
      const location = locFromToken(token, matchCharsStr);
      if (!location) continue;
      locations.push(location);
    }
    locations = combineAdjacentLocs(locations);
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

const matchesEqual = (match1, match2) => {
  if (match1.length !== match2.length) return false;
  for (let i = 0; i < match1.length; i += 1) {
    const loc1 = match1[i];
    const loc2 = match2[i];
    if (loc1.start !== loc2.start || loc1.end !== loc2.end) return false;
  }
  return true;
};

// Helper to filter match results
exports.filterMatches = (matches, filterFunc) => {
  if (!matches) return matches;
  const filteredMatches = matches.filter(filterFunc);
  return filteredMatches.length === 0 ? null : filteredMatches;
};

/**
* Does match A include all of match B?
*
* Returns true if B is completely contained by A, but false if the matches are identical
*/
exports.matchAContainsMatchB = (matchA, matchB) => {
  const intersection = intersectMatches(matchA, matchB);
  return matchesEqual(intersection, matchB) && !matchesEqual(intersection, matchA);
};

exports.tokensFromMatch = (allTokens, match) =>
  allTokens.filter(token => {
    const tokenLoc = locFromToken(token);
    for (const loc of match) {
      if (locsOverlap(tokenLoc, loc)) return true;
    }
    return false;
  });

exports.stringsFromMatch = (originalSentence, match) =>
  match.map(loc => originalSentence.slice(loc.start, loc.end - loc.start));

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
