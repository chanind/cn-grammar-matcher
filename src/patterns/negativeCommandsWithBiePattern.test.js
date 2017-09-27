const negativeCommandsWithBiePattern = require('./negativeCommandsWithBiePattern');
const { assertAllExamplesMatch, assertNoneMatch } = require('../lib/testUtils');

test('matches all examples', async () => {
  await assertAllExamplesMatch(negativeCommandsWithBiePattern);
});

// TODO: Add more tests

test("doesn't match negative examples", async () => {
  await assertNoneMatch(negativeCommandsWithBiePattern, [
    '大有区别',
    '不分年龄和性别',
    '有很大的性别差异',
    '性别歧视语言',
  ]);
});
