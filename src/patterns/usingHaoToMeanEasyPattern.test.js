const usingHaoToMeanEasyPattern = require('./usingHaoToMeanEasyPattern');
const { assertAllExamplesMatch, assertNoneMatch } = require('../lib/testUtils');

test('matches all examples', async () => {
  await assertAllExamplesMatch(usingHaoToMeanEasyPattern);
});

// TODO: Add more tests

test("doesn't match negative examples", async () => {
  await assertNoneMatch(usingHaoToMeanEasyPattern, ['你说中文说得很好。']);
});
