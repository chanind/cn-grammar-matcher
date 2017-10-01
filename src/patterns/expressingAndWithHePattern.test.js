const expressingAndWithHePattern = require('./expressingAndWithHePattern');
const { assertAllExamplesMatch, assertNoneMatch } = require('../lib/testUtils');

test('matches all examples', async () => {
  await assertAllExamplesMatch(expressingAndWithHePattern);
});

// TODO: Add more tests

test("doesn't match negative examples", async () => {
  await assertNoneMatch(expressingAndWithHePattern, ['我们都爱和平。', '那些和尚在做功课。', '现在他们和解了。']);
});
