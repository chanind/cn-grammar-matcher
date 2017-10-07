const resultComplementWanForFinishingPattern = require('./resultComplementWanForFinishingPattern');
const {
  assertAllExamplesMatch,
  assertNoneMatch,
  findLocsRegex,
  parseSentence,
} = require('../lib/testUtils');

test('matches all examples', async () => {
  await assertAllExamplesMatch(resultComplementWanForFinishingPattern);
});

test('also captures 了 if present', async () => {
  const sentence = await parseSentence('妈妈洗完了衣服以后，就去做晚饭了。');
  expect(resultComplementWanForFinishingPattern.match(sentence)).toEqual(
    findLocsRegex(sentence, '(完了)')
  );
});

test("doesn't match negative examples", async () => {
  await assertNoneMatch(resultComplementWanForFinishingPattern, ['他完全变了样']);
});
