const Sentence = require('./Sentence');
const Token = require('./Token');

const SENTENCE_SPLIT_REGEX_BASE = '[.](?!\\d)|[!?]+|[。]|[！？]+';
const SENTENCE_SPLIT_REGEX = new RegExp(`(${SENTENCE_SPLIT_REGEX_BASE})`, 'gui');
const SENTENCE_PUNCT_MATCH_REGEX = new RegExp(`^${SENTENCE_SPLIT_REGEX_BASE}$`, 'gui');

const preprocess = text => text.replace(/\s+/giu, '');

module.exports = class SentenceParser {
  constructor(nlpClient) {
    this.nlpClient = nlpClient;
  }

  async parse(text) {
    const preprocessedText = preprocess(text);
    const parsedText = await this.nlpClient.parse(preprocessedText);
    const tokens = parsedText.sentences[0].tokens.map(tokenData => new Token(tokenData));
    const rootToken = new Token({
      index: 0,
      word: '',
      characterOffsetBegin: 0,
      characterOffsetEnd: 0,
      pos: '',
      ner: '',
    });
    tokens.unshift(rootToken);
    for (const dependency of parsedText.sentences[0].basicDependencies) {
      const governor = tokens[dependency.governor];
      const dependent = tokens[dependency.dependent];
      const dependencyType = dependency.dep;
      dependent.setGovernor(governor, dependencyType);
    }
    return new Sentence(preprocessedText, tokens);
  }

  async parseMulti(text) {
    const sentenceTexts = this.splitTextSentences(text);
    return Promise.all(sentenceTexts.map(sentenceText => this.parse(sentenceText)));
  }

  /**
  * Given a string of text, split into an array of sentences in the text
  */
  splitTextSentences(text) {
    const sentences = [];
    const splitText = text.split(SENTENCE_SPLIT_REGEX);
    let currentSentence = splitText[0].replace(/^\s+/, '');
    for (let i = 1; i < splitText.length; i += 1) {
      const chunk = splitText[i].replace(/^\s+/, '');
      if (!chunk) continue;
      if (chunk.match(SENTENCE_PUNCT_MATCH_REGEX)) {
        currentSentence += chunk;
      } else {
        sentences.push(currentSentence);
        currentSentence = chunk;
      }
    }
    sentences.push(currentSentence);
    return sentences;
  }
};
