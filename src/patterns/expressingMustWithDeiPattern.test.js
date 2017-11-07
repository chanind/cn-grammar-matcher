const expressingMustWithDeiPattern = require('./expressingMustWithDeiPattern');
const { assertAllExamplesMatch, assertNoneMatch } = require('../lib/testUtils');

test('matches all examples', async () => {
  await assertAllExamplesMatch(expressingMustWithDeiPattern);
});

// TODO: Add more tests

test("doesn't match negative examples", async () => {
  await assertNoneMatch(expressingMustWithDeiPattern, [
    '他学得很快，因为他很聪明。',
    '我告诉你多少次了，别一面躺在床上一面吃零食！弄得床上都是碎屑!',
    '自从1979年改革开放以来，中国人的生活水平得到了提高。',
    '大家都觉得累得不行了，要么休息一会儿吧。',
  ]);
});
