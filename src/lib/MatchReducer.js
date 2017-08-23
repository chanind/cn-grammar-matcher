const { matchAContainsMatchB } = require('./matching/utils');

class MatchReducer {
  constructor(matchersMap) {
    this.matchersMap = matchersMap;
  }

  _formatMatches(matchesMap) {
    const grammarMatches = [];
    for (const matcherName of Object.keys(matchesMap)) {
      const matches = matchesMap[matcherName];
      const matcher = this.matchersMap[matcherName];
      grammarMatches.push({
        id: matcher.id,
        name: matcher.name,
        description: matcher.description,
        sources: matcher.sources,
        examples: matcher.examples,
        matches,
      });
    }
    return grammarMatches;
  }

  _mapMatches(sentence) {
    const matchesMap = {};
    for (const matcherName of Object.keys(this.matchersMap)) {
      const matches = this.matchersMap[matcherName].match(sentence);
      if (matches) {
        matchesMap[matcherName] = matches;
      }
    }
    return matchesMap;
  }

  _filterMatches(matchesMap) {
    const filteredMatchesMap = {};
    const allMatches = Object.values(matchesMap).reduce(
      (acc, matches) => acc.concat(matches),
      []
    );
    for (const matcherName of Object.keys(matchesMap)) {
      const filteredMatches = matchesMap[matcherName].filter(match => {
        for (const otherMatch of allMatches) {
          if (matchAContainsMatchB(otherMatch, match)) return false;
        }
        return true;
      });
      if (filteredMatches.length > 0) {
        filteredMatchesMap[matcherName] = filteredMatches;
      }
    }
    return filteredMatchesMap;
  }

  reduceAndFormat(sentence) {
    const matchesMap = this._filterMatches(this._mapMatches(sentence));
    const grammarMatches = this._formatMatches(matchesMap);
    return {
      text: sentence.original,
      tokens: sentence.tokens,
      grammar: grammarMatches,
    };
  }
}

module.exports = MatchReducer;
