'use strict';

const { padLeft } = require('./utils');
const { notRoot } = require('./tokenFilters');


// This returns a 0-padded string representing this token ID which can be used in the token regex
const getTokenIdStr = (tokenId, tokens) => {
    const tokenIdDigits = Math.ceil(tokens.length / 10);
    return '#' + padLeft(tokenId, tokenIdDigits);
};

const constructRegexSubstitution = (matchFunc, tokens) => {
    const matchingTokenIds = [];
    for (let i = 0; i < tokens.length; i++) {
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
    for (let i = 0; i < tokens.length; i++) {
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
            matchingTokens.push(tokens[parseInt(tokenIndexStr, 10)])
        }
    }
    return matchingTokens;
}

/**
* Match patterns of tokens using a regex
* Only returns the first match found
* ex: regexMatchTokens(tokens, '(:adv:):noPunc:*(:yijing:)', {adv: pos('adv'), noPunc, yijing: word('已经')})
*
* @returns {Tokens[]|null} the capured tokens or null if no match was found
*/
exports.regexMatchTokens = (tokens, regexTemplate, matchParams) => {
    const filteredTokens = tokens.filter(notRoot); // remove the root node from matches
    const tokensStr = constructTokensStr(filteredTokens);
    const regexStr = constructRegexStr(filteredTokens, regexTemplate, matchParams);
    const matchResult = tokensStr.match(new RegExp(regexStr));
    return matchResult ? getCapturedTokensFromMatch(matchResult, filteredTokens) : null;
};


/**
* Multi-match version of regexMatchTokens
*
* @returns {Tokens[][]|null} the capured tokens or null if no match was found
*/
exports.regexMatchTokensMulti = (tokens, regexTemplate, matchParams) => {
    const filteredTokens = tokens.filter(notRoot); // remove the root node from matches
    const tokensStr = constructTokensStr(filteredTokens);
    const regexStr = constructRegexStr(filteredTokens, regexTemplate, matchParams);
    const mainMatches = tokensStr.match(new RegExp(regexStr, 'g'));
    if (!mainMatches) return null;
    const matchResults = [];
    for (const innerMatchStr of mainMatches) {
        const innerMatch = innerMatchStr.match(new RegExp(regexStr));
        matchResults.push(getCapturedTokensFromMatch(innerMatch, filteredTokens))
    }
    return matchResults;
};