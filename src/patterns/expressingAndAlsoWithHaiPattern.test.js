const expressingAndAlsoWithHaiPattern = require('./expressingAndAlsoWithHaiPattern');
const { assertAllExamplesMatch, assertNoneMatch } = require('../lib/testUtils');

test('matches all examples', async () => {
  await assertAllExamplesMatch(expressingAndAlsoWithHaiPattern);
});

// TODO: Add more tests

test("doesn't match negative examples", async () => {
  await assertNoneMatch(expressingAndAlsoWithHaiPattern, [
    '还好我没听他的话，不然我就输了。',
    '这个人我看了又看，还是觉得我不认识他。',
    '他找了又找，还是没找到他的钱包。',
    '尽管没人赞同他的观点，他还是坚持自己的看法。',
  ]);
});
