const theAllAdverbDouPattern = require('./theAllAdverbDouPattern');
const { assertAllExamplesMatch, assertNoneMatch } = require('../lib/testUtils');

test('matches all examples', async () => {
  await assertAllExamplesMatch(theAllAdverbDouPattern);
});

// TODO: Add more tests

test("doesn't match negative examples", async () => {
  await assertNoneMatch(theAllAdverbDouPattern, ['我们去成都玩儿。']);
});
