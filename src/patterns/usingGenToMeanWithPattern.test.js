const usingGenToMeanWithPattern = require('./usingGenToMeanWithPattern');
const { assertAllExamplesMatch, assertNoneMatch } = require('../lib/testUtils');

test('matches all examples', async () => {
  await assertAllExamplesMatch(usingGenToMeanWithPattern);
});

// TODO: Add more tests

test("doesn't match negative examples", async () => {
  await assertNoneMatch(usingGenToMeanWithPattern, ['不要跟着我']);
});
