const CoreNLPClient = require('./CoreNLPClient');
const Sentence = require('./Sentence');
const Token = require('./Token');

module.exports = class SentenceParser {
  constructor(nlpClient = new CoreNLPClient()) {
    this.nlpClient = nlpClient;
  }

  async parse(sentence) {
    const parsedSentence = await this.nlpClient.parse(sentence);
    const tokens = parsedSentence.sentences[0].tokens.map(tokenData => new Token(tokenData));
    const rootToken = new Token({
      index: 0,
      word: '',
      characterOffsetBegin: 0,
      characterOffsetEnd: 0,
      pos: '',
      ner: '',
    });
    tokens.unshift(rootToken);
    for (const dependency of parsedSentence.sentences[0].basicDependencies) {
      const governor = tokens[dependency.governor];
      const dependent = tokens[dependency.dependent];
      const dependencyType = dependency.dep;
      dependent.setGovernor(governor, dependencyType);
    }
    return new Sentence(sentence, tokens);
  }
};
