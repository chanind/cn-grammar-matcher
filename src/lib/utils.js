'use strict';

// return the last element in an array
exports.last = arr => arr[arr.length - 1];

// from https://stackoverflow.com/questions/5366849/convert-1-to-0001-in-javascript
exports.padLeft = (target, n, padStr = '0') => {
    const padLen = Math.max(n - String(target).length + 1, 0);
    return Array(padLen).join(padStr) + target;
};
