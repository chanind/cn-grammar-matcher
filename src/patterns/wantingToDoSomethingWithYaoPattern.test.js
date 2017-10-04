const wantingToDoSomethingWithYaoPattern = require('./wantingToDoSomethingWithYaoPattern');
const { assertAllExamplesMatch, assertNoneMatch } = require('../lib/testUtils');

test('matches all examples', async () => {
  await assertAllExamplesMatch(wantingToDoSomethingWithYaoPattern);
});

// TODO: Add more tests

test("doesn't match negative examples", async () => {
  await assertNoneMatch(wantingToDoSomethingWithYaoPattern, [
    '这个星期天你要做什么？',
    '我们公司有很多外国人，所以我们要说英文。',
    '中秋节是中国最重要的传统节日之一。',
  ]);
});
