'use strict';

/**
Utility functions for more consise filtering of tokens.
ex: sentence.tokens.filter(pos('AD'))
*/


// return a function which filters tokens with a matching pos
// pos is treated as a regex
const pos = exports.pos = (pos) => {
    return token => token.pos.match(new RegExp(pos, 'iu'));
};

// return a function which filters tokens with a matching word
// word is treated as a regex
const word = exports.word = (word) => {
    return token => token.word.match(new RegExp(word, 'iu'));
};

// return a new filter function that retuns the inverse of the input
const not = exports.not = (filter) => {
    return token => !filter(token);
};

// return a new filter function that is the or of all the input filters
const or = exports.or = (...filters) => {
    return (token) => {
        for (const filter of filters) {
            if (filter(token)) {
                return true;
            }
        }
        return false;
    };
};

const and = exports.and = (...filters) => {
    return (token) => {
        for (const filter of filters) {
            if (!filter(token)) {
                return false;
            }
        }
        return true;
    };
};

const any = exports.any = () => true;
const notRoot = exports.notRoot = (token) => token.index !== 0;

// helper filter to remove all punctuation tokens
exports.noPunct = not(pos('PU'));


