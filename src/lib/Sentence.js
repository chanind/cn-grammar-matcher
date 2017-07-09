module.exports = class Sentence {
  constructor(original, tokens) {
    this.original = original;
    this.tokens = tokens;
  }

  get text() {
    return this.tokens.map(token => token.word).join('');
  }
};
