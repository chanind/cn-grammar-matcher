const measureWordGePattern = require('./measureWordGePattern');
const { assertAllExamplesMatch, assertNoneMatch } = require('../lib/testUtils');

test('matches all examples', async () => {
  await assertAllExamplesMatch(measureWordGePattern);
});

// TODO: Add more tests

test("doesn't match negative examples", async () => {
  await assertNoneMatch(measureWordGePattern, ['我个子矮', '他个性很强']);
});
