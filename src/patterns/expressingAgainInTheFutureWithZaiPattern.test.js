const expressingAgainInTheFutureWithZaiPattern = require('./expressingAgainInTheFutureWithZaiPattern');
const { assertAllExamplesMatch, assertNoneMatch } = require('../lib/testUtils');

test('matches all examples', async () => {
  await assertAllExamplesMatch(expressingAgainInTheFutureWithZaiPattern);
});

// TODO: Add more tests

test("doesn't match negative examples", async () => {
  await assertNoneMatch(expressingAgainInTheFutureWithZaiPattern, ['再见！']);
});
