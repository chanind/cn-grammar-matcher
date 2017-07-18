const matchers = require('./matchers');
const CoreNLPClient = require('./lib/CoreNLPClient');
const SentenceParser = require('./lib/SentenceParser');

const matchAndFormatGrammar = (sentence) => {
  const grammarMatches = [];
  for (const matcher of Object.values(matchers)) {
    const matches = matcher.match(sentence);
    if (matches) {
      grammarMatches.push({
        id: matcher.id,
        name: matcher.name,
        description: matcher.description,
        sources: matcher.sources,
        examples: matcher.examples,
        matches,
      });
    }
  }
  return {
    text: sentence.original,
    tokens: sentence.tokens,
    grammar: grammarMatches,
  };
};

let defaultNlpHost = 'http://localhost:9000';

class GrammarMatcher {
  static set defaultNlpHost(nlpHost) {
    defaultNlpHost = nlpHost;
  }

  constructor(nlpHost = null) {
    const nlpClient = new CoreNLPClient(nlpHost || defaultNlpHost);
    this.sentenceParser = new SentenceParser(nlpClient);
  }

  async matchGrammar(text) {
    const sentences = await this.sentenceParser.parseMulti(text);
    return sentences.map(matchAndFormatGrammar);
  }
}

// set up window.GrammarMatcher if we're in the browser
if (typeof window !== 'undefined') {
  // store whatever used to be called GrammarMatcher in case of a conflict
  const previousGrammarMatcher = window.GrammarMatcher; // eslint-disable-line no-undef

  // add a jQuery-esque noConflict method to restore the previous window.GrammarMatcher if necessary
  GrammarMatcher.noConflict = () => {
    window.GrammarMatcher = previousGrammarMatcher; // eslint-disable-line no-undef
    return GrammarMatcher;
  };

  window.GrammarMatcher = GrammarMatcher; // eslint-disable-line no-undef
}

// set up module.exports if we're in node/webpack
if (typeof module !== 'undefined') {
  module.exports = GrammarMatcher;
}
