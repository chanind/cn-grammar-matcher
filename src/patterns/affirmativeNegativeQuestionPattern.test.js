const affirmativeNegativeQuestionPattern = require('./affirmativeNegativeQuestionPattern');
const {
  assertAllExamplesMatch,
  assertNoneMatch,
  findLocsRegex,
  parseSentence,
} = require('../lib/testUtils');

test('matches all examples', async () => {
  await assertAllExamplesMatch(affirmativeNegativeQuestionPattern);
});

test('can match twice in the same sentence', async () => {
  const sentence = await parseSentence('是不是，这个贵不贵？');
  expect(affirmativeNegativeQuestionPattern.match(sentence)).toEqual([
    findLocsRegex(sentence, '(是不是)')[0],
    findLocsRegex(sentence, '(贵不贵)')[0],
  ]);
});

test("doesn't match negative examples", async () => {
  await assertNoneMatch(affirmativeNegativeQuestionPattern, ['怪不得', '贵没贵']);
});
