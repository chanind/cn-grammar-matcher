const expressingExperiencesWithGuoPattern = require('./expressingExperiencesWithGuoPattern');
const { assertAllExamplesMatch, assertNoneMatch } = require('../lib/testUtils');

test('matches all examples', async () => {
  await assertAllExamplesMatch(expressingExperiencesWithGuoPattern);
});

// TODO: Add more tests

test("doesn't match negative examples", async () => {
  await assertNoneMatch(expressingExperiencesWithGuoPattern, ['他过去好堵。', '缩短制作过程。']);
});
