const expressingNotEvenOnePattern = require('./expressingNotEvenOnePattern');
const { assertAllExamplesMatch, assertNoneMatch } = require('../lib/testUtils');

test('matches all examples', async () => {
  await assertAllExamplesMatch(expressingNotEvenOnePattern);
});

test("doesn't match negative examples", async () => {
  await assertNoneMatch(expressingNotEvenOnePattern, ['你一点也不性感。']);
});
