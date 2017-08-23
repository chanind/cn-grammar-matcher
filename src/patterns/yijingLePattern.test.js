const yijingLePattern = require('./yijingLePattern');
const {
  assertAllExamplesMatch,
  assertNoneMatch,
  findLocsRegex,
  parseSentence,
} = require('../lib/testUtils');

test('matches all examples', async () => {
  await assertAllExamplesMatch(yijingLePattern);
});

test('sentence with multiple occurrences', async () => {
  const sentence = await parseSentence('你已经点了的那杯咖啡已经凉了');
  expect(yijingLePattern.match(sentence)).toEqual(
    findLocsRegex(sentence, /(已经)[^了]+(了)/)
  );
});

test('extra sentences', async () => {
  const sentence = await parseSentence('我们已经到了。');
  expect(yijingLePattern.match(sentence)).toEqual(
    findLocsRegex(sentence, /(已经)[^了]+(了)/)
  );
});

test("doesn't match negative examples", async () => {
  await assertNoneMatch(yijingLePattern, ['我们已了解。', '列车已经出发。', '现在已经七点。', '了我已经。']);
});
