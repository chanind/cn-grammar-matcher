const reduplicationOfVerbsPattern = require('./reduplicationOfVerbsPattern');
const { assertAllExamplesMatch, assertNoneMatch } = require('../lib/testUtils');

test('matches all examples', async () => {
  await assertAllExamplesMatch(reduplicationOfVerbsPattern);
});

// TODO: Add more tests

test("doesn't match negative examples", async () => {
  await assertNoneMatch(reduplicationOfVerbsPattern, ['学习复习', '每个个性']);
});
