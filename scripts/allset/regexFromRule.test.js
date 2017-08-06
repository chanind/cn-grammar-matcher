const regexFromRule = require('./regexFromRule');

describe('regexFromRule', () => {
  it('should put hanzi into a capture group', () => {
    expect(regexFromRule('(Reason,) 恐怕 + Fact / Conclusion')).toEqual(/(恐怕)/);
    expect(regexFromRule('Subj. + 包括 + Obj.1 ( , + Obj.2, Obj.3 ... )')).toEqual(/(包括)/);
    expect(regexFromRule('差不多 ＋ [Quantity Phrase] / [Time Phrase]')).toEqual(/(差不多)/);
  });

  it('should collapse adjacent hanzi into one capture group', () => {
    expect(regexFromRule('Subj. + 并 + 不 + Verb / Adj.\n')).toEqual(/(并不)/);
    expect(regexFromRule('Subj. + 也 + Verb / [Verb Phrase]')).toEqual(/(也)/);
  });

  it('should correct missing + around the word Verb', () => {
    expect(regexFromRule('要 Verb 就 Verb')).toEqual(/(要)[^就]+(就)/);
  });

  it('should enforce spaces between parts of the sentence', () => {
    expect(regexFromRule('Verb + 了 + 又 + Verb，还是 / 就是 ……')).toEqual(/(了又)[^还是就是]+((?:还是|就是))/);
    expect(regexFromRule('已经 + Verb / [Verb Phrase] + 了')).toEqual(/(已经)[^了]+(了)/);
  });

  it('should allow chinese question marks', () => {
    expect(regexFromRule('Topic + 呢 ？')).toEqual(/(呢？)/);
  });

  it('should make hanzi in parenthesis optional', () => {
    expect(regexFromRule('Adj. + 了（一）点儿\n')).toEqual(/(了一?点儿)/);
    expect(regexFromRule('Adj. + 了（一个）点儿')).toEqual(/(了(?:一个)?点儿)/);
  });

  it('should treat A and B as +', () => {
    expect(regexFromRule('或者 A，或者 B')).toEqual(/(或者)[^或者]+(或者)/);
  });

  it('should replace x, y, and z with number matchers', () => {
    const nums = '[零一二三四五六七八九十百千万亿两0-9]+';
    expect(regexFromRule('x 年 + y 月 + z 号')).toEqual(new RegExp(`(${nums}年${nums}月${nums}号)`));
    expect(regexFromRule('x 点 + 半')).toEqual(new RegExp(`(${nums}点半)`));
    expect(regexFromRule('(Date and/or time of day +) x 点')).toEqual(new RegExp(`(${nums}点)`));
  });

  it('should use | for hanzi with a / between them', () => {
    expect(regexFromRule('Subj. + 没有 / 没 + Verb')).toEqual(/((?:没有|没))/);
    expect(regexFromRule('Subj.＋不 / 没＋全都＋Verb / Adj.')).toEqual(/((?:不|没)全都)/);
    expect(regexFromRule('⋯⋯， 好 / 对 / 是 / 可以 + 吗？')).toEqual(/((?:好|对|是|可以)吗？)/);
  });

  it('should treat ... like a +', () => {
    expect(regexFromRule('多亏（了）……')).toEqual(/(多亏了?)/);
    expect(regexFromRule('Time / Verb + 以后, ....')).toEqual(/(以后，)/);
  });

  it('should handle + inside parenthesis', () => {
    expect(regexFromRule('已经 + (很 +) Adj. + 了')).toEqual(/(已经很?)[^了]+(了)/);
    expect(regexFromRule('没 + 有 (+ Obj.)')).toEqual(/(没有)/);
    expect(regexFromRule('Subj. + 也 (+ Adv.) + Adj.')).toEqual(/(也)/);
  });

  it("should raise an error if if can't find a pattern", () => {
    expect(() => regexFromRule('Pronoun + Noun')).toThrow();
  });
});
