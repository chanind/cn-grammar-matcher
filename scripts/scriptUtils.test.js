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
  it('should put hanzi into a capture group', () => {
    expect(regexFromAllsetPattern('差不多 ＋ [Quantity Phrase] / [Time Phrase]')).toEqual(/(差不多)/);
  });
  it('should collapse adjacent hanzi into one capture group', () => {
    expect(regexFromAllsetPattern('Subj. + 并 + 不 + Verb / Adj.\n')).toEqual(/(并不)/);
    expect(regexFromAllsetPattern('Subj. + 也 + Verb / [Verb Phrase]')).toEqual(/(也)/);
  });

  it('should enforce spaces between parts of the sentence', () => {
    expect(regexFromAllsetPattern('已经 + Verb / [Verb Phrase] + 了')).toEqual(/(已经)[^了]+(了)/);
  });

  it('should allow chinese question marks', () => {
    expect(regexFromAllsetPattern('Topic + 呢 ？')).toEqual(/(呢？)/);
  });

  it('should make hanzi in parenthesis optional', () => {
    expect(regexFromAllsetPattern('Adj. + 了（一）点儿\n')).toEqual(/(了一?点儿)/);
    expect(regexFromAllsetPattern('Adj. + 了（一个）点儿')).toEqual(/(了(?:一个)?点儿)/);
  });

  it('should replace x, y, and z with number matchers', () => {
    const nums = '[零一二三四五六七八九十百千万亿0-9]+';
    expect(regexFromAllsetPattern('x 年 + y 月 + z 号')).toEqual(new RegExp(`(${nums}年${nums}月${nums}号)`));
    expect(regexFromAllsetPattern('x 点 + 半')).toEqual(new RegExp(`(${nums}点半)`));
    expect(regexFromAllsetPattern('(Date and/or time of day +) x 点')).toEqual(new RegExp(`(${nums}点)`));
  });

  it('should use | for hanzi with a / between them', () => {
    expect(regexFromAllsetPattern('Subj. + 没有 / 没 + Verb')).toEqual(/((?:没有|没))/);
    expect(regexFromAllsetPattern('Subj.＋不 / 没＋全都＋Verb / Adj.')).toEqual(/((?:不|没)全都)/);
    expect(regexFromAllsetPattern('⋯⋯， 好 / 对 / 是 / 可以 + 吗？')).toEqual(/(，(?:好|对|是|可以)吗？)/);
  });

  it('should treat ... like a +', () => {
    expect(regexFromAllsetPattern('Time / Verb + 以后, ....')).toEqual(/(以后，)/);
  });

  it('should handle + inside parenthesis', () => {
    expect(regexFromAllsetPattern('已经 + (很 +) Adj. + 了')).toEqual(/(已经很?)[^了]+(了)/);
    expect(regexFromAllsetPattern('没 + 有 (+ Obj.)')).toEqual(/(没有)/);
    expect(regexFromAllsetPattern('Subj. + 也 (+ Adv.) + Adj.')).toEqual(/(也)/);
  });

  it("should raise an error if if can't find a pattern", () => {
    expect(() => regexFromAllsetPattern('Pronoun + Noun')).toThrow();
  });
});
