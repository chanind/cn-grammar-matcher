

const Token = require('./Token');
const tf = require('./tokenFilters');
const { regexMatchTokens, locsFromTokens } = require('./regexMatchers');

describe('regexMatchTokens', () => {
  test('it returns null if there are no matches', () => {
    const tokens = [
      new Token({ word: '你', pos: 'PN' }),
      new Token({ word: '好吗', pos: 'VA' }),
    ];
    const matchResult = regexMatchTokens(tokens, '(:yijing:):any:*(:le:)', {
      yijing: tf.word('已经'),
      le: tf.word('了'),
      any: tf.any,
    });
    expect(matchResult).toBeNull();
  });

  test('it returns an array of empty arrays if there are matches but no captures', () => {
    const tokens = [
      new Token({ word: '你', pos: 'PN' }),
      new Token({ word: '好吗', pos: 'VA' }),
    ];
    const matchResult = regexMatchTokens(tokens, ':ni::any:*:hao:', {
      ni: tf.word('你'),
      hao: tf.word('好.'),
      any: tf.any,
    });
    expect(matchResult).toEqual([[]]);
  });

  test('it returns an array of empty for each match without captures', () => {
    const tokens = [
      new Token({ word: '你', pos: 'PN' }),
      new Token({ word: '好吗', pos: 'VA' }),
      new Token({ word: '你', pos: 'PN' }),
      new Token({ word: '好吗', pos: 'VA' }),
    ];
    const matchResult = regexMatchTokens(tokens, ':ni::any:?:hao:', {
      ni: tf.word('你'),
      hao: tf.word('好.'),
      any: tf.any,
    });
    expect(matchResult).toEqual([[], []]);
  });

  test('it returns an array of captures for each match', () => {
    const tokens = [
      new Token({ word: '你', pos: 'PN' }),
      new Token({ word: '好吗', pos: 'VA' }),
      new Token({ word: '你', pos: 'PN' }),
      new Token({ word: '我', pos: 'PN' }),
    ];
    const matchResult = regexMatchTokens(tokens, '(:ni:)(:hao:)?', {
      ni: tf.word('你'),
      hao: tf.word('好.'),
      any: tf.any,
    });
    expect(matchResult).toEqual([[tokens[0], tokens[1]], [tokens[2]]]);
  });

  test('it ignores the root node', () => {
    const tokens = [
      new Token({ word: '', pos: '', index: 0 }),
      new Token({ word: '你', pos: 'PN', index: 1 }),
      new Token({ word: '好吗', pos: 'VA', index: 2 }),
    ];
    const matchResult = regexMatchTokens(tokens, '(:any:+)', {
      any: tf.any,
    });
    expect(matchResult).toEqual([[tokens[1], tokens[2]]]);
  });
});

describe('locsFromTokens', () => {
  test('it returns null if there are no matches', () => {
    expect(locsFromTokens(null)).toBeNull();
  });

  test('it turns token matches into index matches', () => {
    const tokenMatches = [
      [new Token({ word: '你', characterOffsetBegin: 1, characterOffsetEnd: 2 })],
      [new Token({ word: '好', characterOffsetBegin: 6, characterOffsetEnd: 7 })],
    ];
    expect(locsFromTokens(tokenMatches)).toEqual([
      [{ start: 1, end: 2 }],
      [{ start: 6, end: 7 }],
    ]);
  });

  test('it collapses adjacent tokens into a single range', () => {
    const tokenMatches = [
      [
        new Token({ word: '你', characterOffsetBegin: 1, characterOffsetEnd: 2 }),
        new Token({ word: '你', characterOffsetBegin: 2, characterOffsetEnd: 4 }),
      ],
      [new Token({ word: '好', characterOffsetBegin: 6, characterOffsetEnd: 7 })],
    ];
    expect(locsFromTokens(tokenMatches)).toEqual([
      [{ start: 1, end: 4 }],
      [{ start: 6, end: 7 }],
    ]);
  });
});
