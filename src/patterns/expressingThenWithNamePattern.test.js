const expressingThenWithNamePattern = require('./expressingThenWithNamePattern');
const { assertAllExamplesMatch, assertNoneMatch } = require('../lib/testUtils');

test('matches all examples', async () => {
  await assertAllExamplesMatch(expressingThenWithNamePattern);
});

// TODO: Add more tests

test("doesn't match negative examples", async () => {
  await assertNoneMatch(expressingThenWithNamePattern, [
    '原来你在骗我！我怎么那么傻？',
    '从那以后，我再也没见过他。',
    '那个地方不好找，我们最好查一下百度地图。',
    '晚饭最好不要吃那么多。',
    '科技那么发达，什么都是有可能的。',
    '你怎么那么忙？',
  ]);
});
