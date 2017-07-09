/* eslint-disable no-await-in-loop */

const SentenceParser = require('./SentenceParser');
const tf = require('./tokenFilters');


const parseSentence = async text => new SentenceParser().parse(text);

const assertAllExamplesMatch = async (matcher) => {
  for (const example of matcher.examples) {
    const sentence = await parseSentence(example.zh);
    expect(matcher).toMatchSentence(sentence);
  }
};

const assertNoneMatch = async (matcher, texts) => {
  for (const text of texts) {
    const sentence = await parseSentence(text);
    expect(matcher).not.toMatchSentence(sentence);
  }
};

const findTokens = (sentence, word) => sentence.tokens.filter(tf.word(word));

module.exports = { parseSentence, assertAllExamplesMatch, assertNoneMatch, findTokens };
