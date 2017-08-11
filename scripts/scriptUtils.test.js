const { hasHanzi, isOnlyHanzi } = require('./scriptUtils');

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
