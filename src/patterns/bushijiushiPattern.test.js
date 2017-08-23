const bushijiushiPattern = require('./bushijiushiPattern');
const {
  assertAllExamplesMatch,
  assertNoneMatch,
  findLocsRegex,
  parseSentence,
} = require('../lib/testUtils');

test('matches all examples', async () => {
  await assertAllExamplesMatch(bushijiushiPattern);
});

test('sentence where 不是 parses as separate tokens', async () => {
  const sentence = await parseSentence('他整天不是打游戏就是睡觉。');
  expect(bushijiushiPattern.match(sentence)).toEqual(
    findLocsRegex(sentence, '(不是).*(就是)')
  );
});

test('sentence where 就是 parses as separate tokens', async () => {
  const sentence = await parseSentence('我买的衣服不是大就是小。');
  expect(bushijiushiPattern.match(sentence)).toEqual(
    findLocsRegex(sentence, '(不是).*(就是)')
  );
});

test("doesn't match negative examples", async () => {
  await assertNoneMatch(bushijiushiPattern, [
    '就是咖啡不好。',
    '那就是你，不是么？',
    '汤姆就是不懂。',
    '他要是不知道这个，就不会来了。',
  ]);
});
