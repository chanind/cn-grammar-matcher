const laoshiPattern = require('./laoshiPattern');
const { assertAllExamplesMatch, assertNoneMatch } = require('../lib/testUtils');

test('matches all examples', async () => {
  await assertAllExamplesMatch(laoshiPattern);
});

// TODO: Add more tests

test("doesn't match negative examples", async () => {
  await assertNoneMatch(laoshiPattern, [
    '他是个老人',
    '老问题。',
    '他很老。',
    '猫老了。',
    '谁是你老师？',
    '他是老师吗?',
    '老板在哪儿？',
    '老狗叫了。',
  ]);
});
