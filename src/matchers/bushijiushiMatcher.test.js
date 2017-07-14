const bushijiushiMatcher = require('./bushijiushiMatcher');
const {
  assertAllExamplesMatch,
  assertNoneMatch,
  findTokens,
  parseSentence,
} = require('../lib/testUtils');

test('matches all examples', async () => {
  await assertAllExamplesMatch(bushijiushiMatcher);
});

test('sentence where 不是 parses as separate tokens', async () => {
  const sentence = await parseSentence('他整天不是打游戏就是睡觉。');
  expect(bushijiushiMatcher.match(sentence)).toEqual([
    [
      findTokens(sentence, '不')[0],
      findTokens(sentence, '是')[0],
      findTokens(sentence, '就是')[0],
    ],
  ]);
});

test('sentence where 就是 parses as separate tokens', async () => {
  const sentence = await parseSentence('我买的衣服不是大就是小。');
  expect(bushijiushiMatcher.match(sentence)).toEqual([
    [
      findTokens(sentence, '不')[0],
      findTokens(sentence, '是')[0],
      findTokens(sentence, '就')[0],
      findTokens(sentence, '是')[1],
    ],
  ]);
});

test("doesn't match negative examples", async () => {
  await assertNoneMatch(bushijiushiMatcher, [
    '就是咖啡不好。',
    '那就是你，不是么？',
    '汤姆就是不懂。',
    '他要是不知道这个，就不会来了。',
  ]);
});
