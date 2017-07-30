const { hasHanzi, isOnlyHanzi, regexFromAllsetPattern } = require('./scriptUtils');

describe('hasHanzi', () => {
  it('should return true if a string has hanzi in it', () => {
    expect(hasHanzi('你好')).toBe(true);
    expect(hasHanzi('ok你好blah')).toBe(true);
    expect(hasHanzi('好')).toBe(true);
    expect(hasHanzi('--  好 --')).toBe(true);
    expect(hasHanzi('--  hao --')).toBe(false);
    expect(hasHanzi('--')).toBe(false);
    expect(hasHanzi('+')).toBe(false);
    expect(hasHanzi(' ')).toBe(false);
  });
});

describe('isOnlyHanzi', () => {
  it('should return true if a string has only hanzi in it', () => {
    expect(isOnlyHanzi('你好')).toBe(true);
    expect(isOnlyHanzi('ok你好blah')).toBe(false);
    expect(isOnlyHanzi('好')).toBe(true);
    expect(isOnlyHanzi('--  好 --')).toBe(false);
    expect(isOnlyHanzi('--  hao --')).toBe(false);
    expect(isOnlyHanzi('--')).toBe(false);
    expect(isOnlyHanzi('+')).toBe(false);
    expect(isOnlyHanzi(' ')).toBe(false);
  });

  it('should allow whitelisted chars', () => {
    expect(isOnlyHanzi('你好ok', ['o', 'k'])).toBe(true);
    expect(isOnlyHanzi('ok你好blah', ['o', 'k'])).toBe(false);
    expect(isOnlyHanzi('好')).toBe(true);
    expect(isOnlyHanzi('(?:好)?', ['(', ')', '?', ':'])).toBe(true);
    expect(isOnlyHanzi('--  hao --', [])).toBe(false);
  });
});

describe('regexFromAllsetPattern', () => {
  it('should put collapse adjacent hanzi into one capture group', () => {
    expect(regexFromAllsetPattern('Subj. + 并 + 不 + Verb / Adj.\n')).toEqual(/(并不)/);
  });

  it('should enforce spaces between parts of the sentence', () => {
    expect(regexFromAllsetPattern('已经 + Verb / [Verb Phrase] + 了')).toEqual(/(已经)[^了]+(了)/);
  });

  it('should handle making hanzi in parenthesis optional', () => {
    expect(regexFromAllsetPattern('Adj. + 了（一）点儿\n')).toEqual(/(了一?点儿)/);
    expect(regexFromAllsetPattern('Adj. + 了（一个）点儿')).toEqual(/(了(?:一个)?点儿)/);
  });

  it('should handle + inside parenthesis', () => {
    expect(regexFromAllsetPattern('已经 + (很 +) Adj. + 了')).toEqual(/(已经很?)[^了]+(了)/);
  });
});
