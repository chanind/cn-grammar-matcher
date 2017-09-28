const doerOfActionYouPattern = require('./doerOfActionYouPattern');
const { assertAllExamplesMatch, assertNoneMatch } = require('../lib/testUtils');

test('matches all examples', async () => {
  await assertAllExamplesMatch(doerOfActionYouPattern);
});

// TODO: Add more tests

test("doesn't match negative examples", async () => {
  await assertNoneMatch(doerOfActionYouPattern, ['自由有什么意思？']);
});
