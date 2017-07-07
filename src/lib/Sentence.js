module.exports = class Sentence {
    
    constructor(tokens) {
        this.tokens = tokens;
    }

    get text() {
        return this.tokens.map(token => token.word).join('');
    }

    toString() {
        return this.text;
    }

};
