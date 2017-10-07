const expressingActionsInProgressWithZaiPattern = require('./expressingActionsInProgressWithZaiPattern');
const {
  assertAllExamplesMatch,
  assertNoneMatch,
  assertAllMatch,
} = require('../lib/testUtils');

test('matches all examples', async () => {
  await assertAllExamplesMatch(expressingActionsInProgressWithZaiPattern);
});

test('TODO: get these to match', async () => {
  await assertAllMatch(
    expressingActionsInProgressWithZaiPattern,
    [
      // '老板在开会，没有时间见你。',
    ]
  );
});

test("doesn't match negative examples", async () => {
  await assertNoneMatch(expressingActionsInProgressWithZaiPattern, [
    '在中国，你应该喝白酒。',
    '我告诉你多少次了，别一面躺在床上一面吃零食！弄得床上都是碎屑!',
  ]);
});
