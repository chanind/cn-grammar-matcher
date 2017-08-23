const genguobuquPattern = require('./genguobuquPattern');
const {
  assertAllExamplesMatch,
  assertNoneMatch,
  findLocsRegex,
  parseSentence,
} = require('../lib/testUtils');

test('matches all examples', async () => {
  await assertAllExamplesMatch(genguobuquPattern);
});

test('sentence where 过不去 parses as 3 separate tokens', async () => {
  const sentence = await parseSentence('别跟你的爸爸过不去。');
  expect(genguobuquPattern.match(sentence)).toEqual(
    findLocsRegex(sentence, '(跟).*(过不去)')
  );
});

test('sentence where 过不去 parses as 1 token', async () => {
  const sentence = await parseSentence('这是跟我过不去。');
  expect(genguobuquPattern.match(sentence)).toEqual(
    findLocsRegex(sentence, '(跟).*(过不去)')
  );
});

test('sentence with a person name', async () => {
  const sentence = await parseSentence('这是跟查尔斯过不去。');
  expect(genguobuquPattern.match(sentence)).toEqual(
    findLocsRegex(sentence, '(跟).*(过不去)')
  );
});

test('sentence with a type of person', async () => {
  const sentence = await parseSentence('这是跟爸爸过不去。');
  expect(genguobuquPattern.match(sentence)).toEqual(
    findLocsRegex(sentence, '(跟).*(过不去)')
  );
});

test("doesn't match negative examples", async () => {
  await assertNoneMatch(genguobuquPattern, [
    '我们大概去了，不过要看天气怎么样再决定',
    '不要担心过去。',
    '也许他不回去过春节。',
  ]);
});
