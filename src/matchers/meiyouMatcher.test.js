const meiyouMatcher = require('./meiyouMatcher');
const tf = require('../lib/tokenFilters');
const {
    assertAllExamplesMatch,
    assertNoneMatch,
    findTokens,
    parseSentence,
} = require('../lib/testUtils');

test('matches all examples', async () => {
    await assertAllExamplesMatch(meiyouMatcher);
});

test('sentence with multiple occurrences with just 没', async () => {
    const sentence = await parseSentence('我没工作，我老公也没工作');
    const { tokens } = sentence;
    expect(meiyouMatcher.match(sentence)).toEqual([
        [findTokens(sentence, '没')[0]],
        [findTokens(sentence, '没')[1]],
    ]);
});

test('sentence with multiple occurrences with full 没有', async () => {
    const sentence = await parseSentence('我没有工作，我老公也没有工作');
    const { tokens } = sentence;
    expect(meiyouMatcher.match(sentence)).toEqual([
        [findTokens(sentence, '没有')[0]],
        [findTokens(sentence, '没有')[1]],
    ]);
});

test("doesn't match negative examples", async () => {
    await assertNoneMatch(meiyouMatcher, [
        '我不是你的爸爸。',
    ]);
});
