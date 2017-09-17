const Token = require('../Token');
const { locsFromTokens, mergeLocMatchGroups, matchAContainsMatchB } = require('./utils');

describe('matchAContainsMatchB', () => {
  test('it returns true if match A fully contains match B', () => {
    expect(matchAContainsMatchB([{ start: 0, end: 3 }], [{ start: 0, end: 2 }])).toEqual(
      true
    );
    expect(matchAContainsMatchB([{ start: 0, end: 2 }], [{ start: 0, end: 3 }])).toEqual(
      false
    );
    expect(matchAContainsMatchB([{ start: 1, end: 3 }], [{ start: 0, end: 2 }])).toEqual(
      false
    );
    expect(matchAContainsMatchB([{ start: 1, end: 3 }], [{ start: 7, end: 12 }])).toEqual(
      false
    );
    expect(
      matchAContainsMatchB(
        [{ start: 0, end: 2 }, { start: 4, end: 7 }],
        [{ start: 1, end: 2 }, { start: 4, end: 7 }]
      )
    ).toEqual(true);
    expect(
      matchAContainsMatchB(
        [{ start: 0, end: 2 }, { start: 4, end: 7 }],
        [{ start: 0, end: 2 }]
      )
    ).toEqual(true);
    expect(
      matchAContainsMatchB(
        [{ start: 1, end: 2 }, { start: 4, end: 7 }],
        [{ start: 0, end: 2 }, { start: 4, end: 7 }]
      )
    ).toEqual(false);
  });

  test('it returns false if A and B are identical', () => {
    expect(matchAContainsMatchB([{ start: 0, end: 2 }], [{ start: 0, end: 2 }])).toEqual(
      false
    );
    expect(
      matchAContainsMatchB(
        [{ start: 0, end: 2 }, { start: 4, end: 7 }],
        [{ start: 0, end: 2 }, { start: 4, end: 7 }]
      )
    ).toEqual(false);
  });
});

describe('locsFromTokens', () => {
  test('it returns null if there are no matches', () => {
    expect(locsFromTokens(null)).toBeNull();
  });

  test('it turns token matches into index matches', () => {
    const tokenMatches = [
      [
        new Token({
          word: '你',
          characterOffsetBegin: 1,
          characterOffsetEnd: 2,
        }),
      ],
      [
        new Token({
          word: '好',
          characterOffsetBegin: 6,
          characterOffsetEnd: 7,
        }),
      ],
    ];
    expect(locsFromTokens(tokenMatches)).toEqual([
      [{ start: 1, end: 2 }],
      [{ start: 6, end: 7 }],
    ]);
  });

  test('it collapses adjacent tokens into a single range', () => {
    const tokenMatches = [
      [
        new Token({
          word: '你',
          characterOffsetBegin: 1,
          characterOffsetEnd: 2,
        }),
        new Token({
          word: '你',
          characterOffsetBegin: 2,
          characterOffsetEnd: 4,
        }),
      ],
      [
        new Token({
          word: '好',
          characterOffsetBegin: 6,
          characterOffsetEnd: 7,
        }),
      ],
    ];
    expect(locsFromTokens(tokenMatches)).toEqual([
      [{ start: 1, end: 4 }],
      [{ start: 6, end: 7 }],
    ]);
  });

  test('it collapses overlapping tokens into a single range', () => {
    const tokenMatches = [
      [
        new Token({
          word: '你',
          characterOffsetBegin: 1,
          characterOffsetEnd: 3,
        }),
        new Token({
          word: '你',
          characterOffsetBegin: 2,
          characterOffsetEnd: 4,
        }),
      ],
      [
        new Token({
          word: '好',
          characterOffsetBegin: 6,
          characterOffsetEnd: 9,
        }),
        new Token({
          word: '好',
          characterOffsetBegin: 7,
          characterOffsetEnd: 8,
        }),
      ],
    ];
    expect(locsFromTokens(tokenMatches)).toEqual([
      [{ start: 1, end: 4 }],
      [{ start: 6, end: 9 }],
    ]);
  });

  test('it works with out-of-order token matches', () => {
    const tokenMatches = [
      [
        new Token({
          word: '你',
          characterOffsetBegin: 2,
          characterOffsetEnd: 4,
        }),
        new Token({
          word: '你',
          characterOffsetBegin: 1,
          characterOffsetEnd: 3,
        }),
      ],
      [
        new Token({
          word: '好',
          characterOffsetBegin: 7,
          characterOffsetEnd: 8,
        }),
        new Token({
          word: '好',
          characterOffsetBegin: 6,
          characterOffsetEnd: 9,
        }),
      ],
    ];
    expect(locsFromTokens(tokenMatches)).toEqual([
      [{ start: 1, end: 4 }],
      [{ start: 6, end: 9 }],
    ]);
  });

  test('it can use a regex to further filter match positions', () => {
    const tokenMatches = [
      [
        new Token({
          word: '你好',
          characterOffsetBegin: 2,
          characterOffsetEnd: 4,
        }),
      ],
      [
        new Token({
          word: '好',
          characterOffsetBegin: 7,
          characterOffsetEnd: 8,
        }),
      ],
    ];
    expect(locsFromTokens(tokenMatches, /好/)).toEqual([
      [{ start: 3, end: 4 }],
      [{ start: 7, end: 8 }],
    ]);
  });

  test("it removes matches if the regex doesn't match at all", () => {
    const tokenMatches = [
      [
        new Token({
          word: '你好',
          characterOffsetBegin: 2,
          characterOffsetEnd: 4,
        }),
      ],
      [
        new Token({
          word: '好',
          characterOffsetBegin: 7,
          characterOffsetEnd: 8,
        }),
      ],
    ];
    expect(locsFromTokens(tokenMatches, '你')).toEqual([[{ start: 2, end: 3 }], []]);
  });
});

describe('mergeLocMatchGroups', () => {
  it('appends matches together if they dont overlap', () => {
    const match1 = [[{ start: 3, end: 4 }]];
    const match2 = [[{ start: 8, end: 10 }, { start: 12, end: 15 }]];
    expect(mergeLocMatchGroups([match1, match2])).toEqual([match1[0], match2[0]]);
  });

  it('strips duplicate matches', () => {
    const match1 = [[{ start: 3, end: 4 }]];
    const match2 = [
      [{ start: 3, end: 4 }],
      [{ start: 8, end: 10 }, { start: 12, end: 15 }],
    ];
    expect(mergeLocMatchGroups([match1, match2])).toEqual([match1[0], match2[1]]);
  });

  it('ignores any nulls in the passed-in matches', () => {
    const match1 = [[{ start: 2, end: 4 }, { start: 17, end: 22 }]];
    const match2 = [
      [{ start: 3, end: 7 }],
      [{ start: 8, end: 10 }, { start: 12, end: 15 }],
    ];
    expect(mergeLocMatchGroups([match1, null, match2])).toEqual([
      [{ start: 3, end: 4 }],
      match2[1],
    ]);
  });

  it('returns null if no matches are passed in', () => {
    expect(mergeLocMatchGroups([null, null, null])).toBeNull();
  });

  it('returns null if null is passed in', () => {
    expect(mergeLocMatchGroups(null)).toBeNull();
  });

  it('uses the intersection of overlapping matches by default', () => {
    const match1 = [[{ start: 2, end: 4 }, { start: 17, end: 22 }]];
    const match2 = [
      [{ start: 3, end: 7 }],
      [{ start: 8, end: 10 }, { start: 12, end: 15 }],
    ];
    expect(mergeLocMatchGroups([match1, match2])).toEqual([
      [{ start: 3, end: 4 }],
      match2[1],
    ]);
  });

  it('uses the union of overlapping matches if conservative=false', () => {
    const match1 = [[{ start: 2, end: 4 }, { start: 17, end: 22 }]];
    const match2 = [
      [{ start: 3, end: 7 }],
      [{ start: 8, end: 10 }, { start: 12, end: 15 }],
    ];
    expect(mergeLocMatchGroups([match1, match2], false)).toEqual([
      [{ start: 2, end: 7 }, { start: 17, end: 22 }],
      match2[1],
    ]);
  });
});
