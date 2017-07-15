/**
Utility functions for more consise filtering of tokens.
ex: sentence.tokens.filter(pos('AD'))
*/


// return a function which filters tokens with a matching pos
// posStr is treated as a regex
const pos = posStr => token => token.pos.match(new RegExp(`^${posStr}$`, 'iu'));

// return a function which filters tokens with a matching word
// wordStr is treated as a regex
const word = wordStr => token => token.word.match(new RegExp(`^${wordStr}$`, 'iu'));

// return a new filter function that retuns the inverse of the input
const not = filter => token => !filter(token);

// return a new filter function that is the or of all the input filters
const or = (...filters) => (token) => {
  for (const filter of filters) {
    if (filter(token)) {
      return true;
    }
  }
  return false;
};

const and = (...filters) => (token) => {
  for (const filter of filters) {
    if (!filter(token)) {
      return false;
    }
  }
  return true;
};

const any = () => true;
const notRoot = token => token.index !== 0;

// helper filter to remove all punctuation tokens
const noPunct = not(pos('PU'));

module.exports = { pos, word, not, or, and, any, notRoot, noPunct };

