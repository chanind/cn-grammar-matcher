const yijingLeMatcher = require('./yijingLeMatcher');
const {
  assertAllExamplesMatch,
  assertNoneMatch,
  findLocsRegex,
  parseSentence,
} = require('../lib/testUtils');

test('matches all examples', async () => {
  await assertAllExamplesMatch(yijingLeMatcher);
});

test('sentence with multiple occurrences', async () => {
  const sentence = await parseSentence('你已经点了的那杯咖啡已经凉了');
  expect(yijingLeMatcher.match(sentence)).toEqual(findLocsRegex(sentence, /(已经)[^了]+(了)/));
});

test("doesn't match negative examples", async () => {
  await assertNoneMatch(yijingLeMatcher, [
    '我们已了解。',
    '列车已经出发。',
    '现在已经七点。',
    '了我已经。',
  ]);
});
