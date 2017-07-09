const genguobuquMatcher = require('./genguobuquMatcher');
const {
  assertAllExamplesMatch,
  assertNoneMatch,
  findTokens,
  parseSentence,
} = require('../lib/testUtils');

test('matches all examples', async () => {
  await assertAllExamplesMatch(genguobuquMatcher);
});

test('sentence where 过不去 parses as 3 separate tokens', async () => {
  const sentence = await parseSentence('别跟你的爸爸过不去。');
  expect(genguobuquMatcher.match(sentence)).toEqual([
    [
      findTokens(sentence, '跟')[0],
      findTokens(sentence, '过')[0],
      findTokens(sentence, '不')[0],
      findTokens(sentence, '去')[0],
    ],
  ]);
});

test('sentence where 过不去 parses as 1 token', async () => {
  const sentence = await parseSentence('这是跟我过不去。');
  expect(genguobuquMatcher.match(sentence)).toEqual([
    [
      findTokens(sentence, '跟')[0],
      findTokens(sentence, '过不去')[0],
    ],
  ]);
});

test('sentence with a person name', async () => {
  const sentence = await parseSentence('这是跟查尔斯过不去。');
  expect(genguobuquMatcher.match(sentence)).toEqual([
    [
      findTokens(sentence, '跟')[0],
      findTokens(sentence, '过不去')[0],
    ],
  ]);
});

test('sentence with a type of person', async () => {
  const sentence = await parseSentence('这是跟爸爸过不去。');
  expect(genguobuquMatcher.match(sentence)).toEqual([
    [
      findTokens(sentence, '跟')[0],
      findTokens(sentence, '过')[0],
      findTokens(sentence, '不')[0],
      findTokens(sentence, '去')[0],
    ],
  ]);
});

test("doesn't match negative examples", async () => {
  await assertNoneMatch(genguobuquMatcher, [
    '我们大概去了，不过要看天气怎么样再决定',
    '不要担心过去。',
    '也许他不回去过春节。',
  ]);
});
