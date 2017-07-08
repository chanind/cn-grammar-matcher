'use strict';

const request = require('request-promise-native');
const { getConfigParam } = require('../../config');

const nlpHost = getConfigParam('CORE_NLP_HOST');

module.exports = class CoreNLPClient {
    constructor(annotators = ['tokenize','ssplit','pos','ner','depparse']) {
        this.annotators = annotators;
    }

    async parse(text) {
        const annotatorsStr = this.annotators.join(',');
        const url = `${nlpHost}/?properties={"annotators": "${annotatorsStr}"}&pipelineLanguage=zh`;
        const response = await request({
          method:'POST',
          uri: url,
          body:text
        });
        return JSON.parse(response);
    }
}
