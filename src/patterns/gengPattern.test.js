const gengPattern = require('./gengPattern');
const { assertAllExamplesMatch, assertNoneMatch } = require('../lib/testUtils');

test('matches all examples', async () => {
  await assertAllExamplesMatch(gengPattern);
});

// TODO: Add more tests

test("doesn't match negative examples", async () => {
  await assertNoneMatch(gengPattern, ['我更改了我的文章。', '这个信息需要更改。', '系统需要更新。']);
});
