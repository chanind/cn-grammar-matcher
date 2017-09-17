const oClockPattern = require('./oClockPattern');
const {
  assertAllExamplesMatch,
  assertNoneMatch,
  assertAllMatch,
} = require('../lib/testUtils');

test('matches all examples', async () => {
  await assertAllExamplesMatch(oClockPattern);
});

test('一点 positive examples', async () => {
  await assertAllMatch(oClockPattern, ['上午一点', '星期三上午一点']);
});

test("doesn't match negative examples", async () => {
  await assertNoneMatch(oClockPattern, [
    '除了这个以外，还有一点也很重要。',
    '宝宝打针的时候一点都没哭。',
    '我的同事一点都不幽默。',
    '宝宝打针的时候一点都没哭。',
    '今天她一点也没吃东西。',
    '工作虽然很累，但他一点都没抱怨。',
    '他一点也不喜欢啤酒。',
  ]);
});
