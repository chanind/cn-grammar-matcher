const expressingBeGoingToWithYaoPattern = require('./expressingBeGoingToWithYaoPattern');
const {
  assertAllExamplesMatch,
  assertNoneMatch,
  assertAllMatch,
} = require('../lib/testUtils');

test('matches all examples', async () => {
  await assertAllExamplesMatch(expressingBeGoingToWithYaoPattern);
});

test('extra examples', async () => {
  await assertAllMatch(expressingBeGoingToWithYaoPattern, [
    '今天晚上老板要和我们一起加班。',
    '我要先回家把东西放下，之后去咖啡店找你。',
  ]);
});

test("doesn't match negative examples", async () => {
  await assertNoneMatch(expressingBeGoingToWithYaoPattern, [
    '我们公司有很多外国人，所以我们要说英文。',
    '中秋节是中国最重要的传统节日之一。',
    '终于要放假了，开心吧？',
  ]);
});
