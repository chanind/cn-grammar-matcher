/* eslint-disable no-await-in-loop */

const SentenceParser = require('./SentenceParser');
const CoreNLPClient = require('./CoreNLPClient');
const { regexMatchLocs } = require('./regexMatchers');
const tf = require('./tokenFilters');

const nlpClient = new CoreNLPClient(global.CORE_NLP_HOST);

const parseSentence = async text => new SentenceParser(nlpClient).parse(text);

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

const findTokens = (sentence, word) => sentence.tokens.filter(tf.word(`.*${word}.*`));
const findLocsRegex = (sentence, regex) => regexMatchLocs(sentence.original, regex);

module.exports = {
  assertAllExamplesMatch,
  assertNoneMatch,
  findLocsRegex,
  findTokens,
  nlpClient,
  parseSentence,
};
