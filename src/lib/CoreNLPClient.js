const request = require('request-promise-native');

module.exports = class CoreNLPClient {
  constructor(host, annotators = ['tokenize', 'ssplit', 'pos', 'ner', 'depparse']) {
    this.host = host;
    this.annotators = annotators;
  }

  async parse(text) {
    const annotatorsStr = this.annotators.join(',');
    const url = `${this.host}/?properties={"annotators": "${annotatorsStr}"}&pipelineLanguage=zh`;
    const response = await request({
      method: 'POST',
      uri: url,
      body: text,
    });
    return JSON.parse(response);
  }
};
