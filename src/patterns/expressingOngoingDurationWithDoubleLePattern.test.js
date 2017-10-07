const expressingOngoingDurationWithDoubleLePattern = require('./expressingOngoingDurationWithDoubleLePattern');
const { assertAllExamplesMatch, assertNoneMatch } = require('../lib/testUtils');

test('matches all examples', async () => {
  await assertAllExamplesMatch(expressingOngoingDurationWithDoubleLePattern);
});

// TODO: Add more tests

test("doesn't match negative examples", async () => {
  await assertNoneMatch(expressingOngoingDurationWithDoubleLePattern, [
    '她的感冒总算好了。',
    '爸爸妈妈已经了解他了。',
  ]);
});
