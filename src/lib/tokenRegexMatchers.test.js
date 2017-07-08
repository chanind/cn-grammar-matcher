'use strict';

const Token = require('./Token');
const tf = require('./tokenFilters');
const { regexMatchTokens, regexMatchTokensMulti } = require('./tokenRegexMatchers');


describe('regexMatchTokens', () => {
    test('it returns null if there are no matches', () => {
        const tokens = [
            new Token({ word: '你', pos: 'PN'}),
            new Token({ word: '好吗', pos: 'VA'}),
        ];
        const matchResult = regexMatchTokens(tokens, '(:yijing:):any:*(:le:)', {
            yijing: tf.word('已经'),
            le: tf.word('了'),
            any: tf.any,
        });
        expect(matchResult).toBeNull();
    });

    test('it returns empty array if there are matches but no captures', () => {
        const tokens = [
            new Token({ word: '你', pos: 'PN'}),
            new Token({ word: '好吗', pos: 'VA'}),
        ];
        const matchResult = regexMatchTokens(tokens, ':ni::any:*:hao:', {
            ni: tf.word('你'),
            hao: tf.word('好.'),
            any: tf.any,
        });
        expect(matchResult).toEqual([]);
    });

    test('it returns an array of captured tokens', () => {
        const tokens = [
            new Token({ word: '你', pos: 'PN'}),
            new Token({ word: '好吗', pos: 'VA'}),
        ];
        const matchResult = regexMatchTokens(tokens, '(:ni:):any:*(:hao:)', {
            ni: tf.word('你'),
            hao: tf.word('好.'),
            any: tf.any,
        });
        expect(matchResult).toEqual([tokens[0], tokens[1]]);
    });

    test('it can capture series of multiple tokens', () => {
        const tokens = [
            new Token({ word: '我们', pos: 'PN'}),
            new Token({ word: '饿死', pos: 'VA'}),
            new Token({ word: '了', pos: 'AS'}),
        ];
        const matchResult = regexMatchTokens(tokens, '(:wo::any:):le:', {
            wo: tf.word('我.?'),
            le: tf.word('了'),
            any: tf.any,
        });
        expect(matchResult).toEqual([tokens[0], tokens[1]]);
    });
});

describe('regexMatchTokensMulti', () => {
    test('it returns null if there are no matches', () => {
        const tokens = [
            new Token({ word: '你', pos: 'PN'}),
            new Token({ word: '好吗', pos: 'VA'}),
        ];
        const matchResult = regexMatchTokensMulti(tokens, '(:yijing:):any:*(:le:)', {
            yijing: tf.word('已经'),
            le: tf.word('了'),
            any: tf.any,
        });
        expect(matchResult).toBeNull();
    });

    test('it returns an array of empty arrays if there are matches but no captures', () => {
        const tokens = [
            new Token({ word: '你', pos: 'PN'}),
            new Token({ word: '好吗', pos: 'VA'}),
        ];
        const matchResult = regexMatchTokensMulti(tokens, ':ni::any:*:hao:', {
            ni: tf.word('你'),
            hao: tf.word('好.'),
            any: tf.any,
        });
        expect(matchResult).toEqual([[]]);
    });

    test('it returns an array of empty for each match without captures', () => {
        const tokens = [
            new Token({ word: '你', pos: 'PN'}),
            new Token({ word: '好吗', pos: 'VA'}),
            new Token({ word: '你', pos: 'PN'}),
            new Token({ word: '好吗', pos: 'VA'}),
        ];
        const matchResult = regexMatchTokensMulti(tokens, ':ni::any:?:hao:', {
            ni: tf.word('你'),
            hao: tf.word('好.'),
            any: tf.any,
        });
        expect(matchResult).toEqual([[], []]);
    });

    test('it returns an array of captures for each match', () => {
        const tokens = [
            new Token({ word: '你', pos: 'PN'}),
            new Token({ word: '好吗', pos: 'VA'}),
            new Token({ word: '你', pos: 'PN'}),
            new Token({ word: '我', pos: 'PN'}),
        ];
        const matchResult = regexMatchTokensMulti(tokens, '(:ni:)(:hao:)?', {
            ni: tf.word('你'),
            hao: tf.word('好.'),
            any: tf.any,
        });
        expect(matchResult).toEqual([[tokens[0] , tokens[1]], [tokens[2]]]);
    });

    test('it ignores the root node', () => {
        const tokens = [
            new Token({ word: '', pos: '', index: 0}),
            new Token({ word: '你', pos: 'PN', index: 1}),
            new Token({ word: '好吗', pos: 'VA', index: 2}),
        ];
        const matchResult = regexMatchTokensMulti(tokens, '(:any:+)', {
            any: tf.any,
        });
        expect(matchResult).toEqual([[tokens[1] , tokens[2]]]);
    });
});
