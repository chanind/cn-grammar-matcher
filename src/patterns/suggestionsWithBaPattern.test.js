const suggestionsWithBaPattern = require('./suggestionsWithBaPattern');
const { assertAllExamplesMatch, assertNoneMatch } = require('../lib/testUtils');

test('matches all examples', async () => {
  await assertAllExamplesMatch(suggestionsWithBaPattern);
});

// TODO: Add more tests

test("doesn't match negative examples", async () => {
  await assertNoneMatch(suggestionsWithBaPattern, [
    '行吧。',
    '酒吧里，有的人在喝酒，有的人在跳舞，还有的人在聊天。',
    '昨天我跟朋友去吃饭了，之后，我们去了酒吧。',
  ]);
});
