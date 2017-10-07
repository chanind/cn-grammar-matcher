const expressingDifficultWithNanPattern = require('./expressingDifficultWithNanPattern');
const { assertAllExamplesMatch, assertNoneMatch } = require('../lib/testUtils');

test('matches all examples', async () => {
  await assertAllExamplesMatch(expressingDifficultWithNanPattern);
});

// TODO: Add more tests

test("doesn't match negative examples", async () => {
  await assertNoneMatch(expressingDifficultWithNanPattern, ['中文很难。']);
});
