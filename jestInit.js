const SentenceParser = require('./src/lib/SentenceParser');

// need to set a long timeout since the first time the core NLP server loads very slowly
jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

global.CORE_NLP_HOST = process.env.CORE_NLP_HOST || 'http://localhost:9000';

expect.extend({
  toMatchSentence(received, sentence, tokens = null) {
    const pass = !!received.match(sentence);
    return {
      pass: pass,
      message: `expected ${received.name} ${this.isNot
        ? 'not '
        : ''}to match: ${sentence.original}`,
    };
  },
});
