const SentenceParser = require('./src/lib/SentenceParser');

expect.extend({
    toMatchSentence: (received, sentence, tokens = null) => {
        const pass = !!received.match(sentence);
        return {
            pass: pass,
            message: `expected ${received.name} ${this.isNot ? 'not ' : ''}to match: ${sentence.original}`,
        };
    },
});
