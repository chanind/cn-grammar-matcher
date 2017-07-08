'use strict';

const SentenceParser = require('./SentenceParser');
const tf = require('./tokenFilters');


const parseSentence = exports.parseSentence = async text => new SentenceParser().parse(text);

exports.assertAllExamplesMatch = async (matcher) => {
    for (const example of matcher.examples) {
        const sentence = await parseSentence(example.zh);
        expect(matcher).toMatchSentence(sentence);
    }
};

exports.assertNoneMatch = async (matcher, texts) => {
    for (const text of texts) {
        const sentence = await parseSentence(text);
        expect(matcher).not.toMatchSentence(sentence);
    }
};

exports.findTokens = (sentence, word) => {
    return sentence.tokens.filter(tf.word(word));
};