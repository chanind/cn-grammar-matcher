const expressingExistenceInAPlaceWithZaiPattern = require('./expressingExistenceInAPlaceWithZaiPattern');
const { assertAllExamplesMatch, assertNoneMatch } = require('../lib/testUtils');

test('matches all examples', async () => {
  await assertAllExamplesMatch(expressingExistenceInAPlaceWithZaiPattern);
});

// TODO: Add more tests

test("doesn't match negative examples", async () => {
  await assertNoneMatch(expressingExistenceInAPlaceWithZaiPattern, [
    '昨天晚上我一直在做作业。',
    '以前他是一个服务员，现在是老板。',
  ]);
});
