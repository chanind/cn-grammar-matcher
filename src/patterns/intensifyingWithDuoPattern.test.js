const intensifyingWithDuoPattern = require('./intensifyingWithDuoPattern');
const {
  assertAllExamplesMatch,
  assertNoneMatch,
  assertAllMatch,
} = require('../lib/testUtils');

test('matches all examples', async () => {
  await assertAllExamplesMatch(intensifyingWithDuoPattern);
});

test.skip('TODO: get these to match', async () => {
  await assertAllMatch(intensifyingWithDuoPattern, [
    '一个人多好！',
    '你看这个地方，多美啊！',
    '这样做多麻烦！',
    '坐地铁多方便！',
    '你看这个小狗，多可爱！',
  ]);
});

test("doesn't match negative examples", async () => {
  await assertNoneMatch(
    intensifyingWithDuoPattern,
    [
      // TODO: add negative examples here
    ]
  );
});
