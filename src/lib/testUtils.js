/* eslint-disable no-await-in-loop */

const SentenceParser = require('./SentenceParser');
const CoreNLPClient = require('./CoreNLPClient');
const { regexMatchLocs } = require('./matching/regexMatch');
const tf = require('./tokenFilters');

const nlpClient = new CoreNLPClient(global.CORE_NLP_HOST);

const parseSentences = async text => new SentenceParser(nlpClient).parseMulti(text);
const parseSentence = async text => new SentenceParser(nlpClient).parse(text);

const assertAllExamplesMatch = async matcher => {
  for (const example of matcher.examples) {
    const sentences = await parseSentences(example.zh.replace(/[ABC]:/g, ''));
    expect(matcher).toMatchSentence(sentences);
  }
};

const assertAllMatch = async (matcher, texts) => {
  for (const text of texts) {
    const sentences = await parseSentences(text);
    expect(matcher).toMatchSentence(sentences);
  }
};

const assertNoneMatch = async (matcher, texts) => {
  for (const text of texts) {
    const sentences = await parseSentences(text);
    expect(matcher).not.toMatchSentence(sentences);
  }
};

const findTokens = (sentence, word) => sentence.tokens.filter(tf.word(`.*${word}.*`));
const findLocsRegex = (sentence, regex) => regexMatchLocs(sentence.original, regex);

module.exports = {
  assertAllExamplesMatch,
  assertNoneMatch,
  assertAllMatch,
  findLocsRegex,
  findTokens,
  nlpClient,
  parseSentence,
  parseSentences,
};
