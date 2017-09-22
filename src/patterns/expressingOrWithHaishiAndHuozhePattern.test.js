const expressingOrWithHaishiAndHuozhePattern = require('./expressingOrWithHaishiAndHuozhePattern');
const { assertAllExamplesMatch, assertNoneMatch } = require('../lib/testUtils');

test('matches all examples', async () => {
  await assertAllExamplesMatch(expressingOrWithHaishiAndHuozhePattern);
});

// TODO: Add more tests

test("doesn't match negative examples", async () => {
  await assertNoneMatch(expressingOrWithHaishiAndHuozhePattern, [
    '这里太脏了，我们还是走吧。',
    '太贵了，还是别买了。',
    '我听说这部电影不好看，我们还是看其他的吧。',
  ]);
});
