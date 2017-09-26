const beizijuPattern = require('./beizijuPattern');
const { assertAllExamplesMatch, assertNoneMatch } = require('../lib/testUtils');

test('matches all examples', async () => {
  await assertAllExamplesMatch(beizijuPattern);
});

// TODO: Add more tests

test("doesn't match negative examples", async () => {
  await assertNoneMatch(beizijuPattern, ['拉起被单钻进去', '单个被单', '被迫承认错误']);
});
