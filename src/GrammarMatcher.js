const patterns = require('./patterns');
const CoreNLPClient = require('./lib/CoreNLPClient');
const SentenceParser = require('./lib/SentenceParser');
const MatchReducer = require('./lib/MatchReducer');

class GrammarMatcher {
  constructor(nlpHost = null) {
    const nlpClient = new CoreNLPClient(nlpHost || GrammarMatcher.defaultNlpHost);
    this.sentenceParser = new SentenceParser(nlpClient);
    this.matchReducer = new MatchReducer(patterns);
  }

  async matchGrammar(text) {
    const sentences = await this.sentenceParser.parseMulti(text);
    return sentences.map(sentence => this.matchReducer.reduceAndFormat(sentence));
  }
}

GrammarMatcher.defaultNlpHost = process.env.NLP_HOST || 'http://localhost:9000';

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
