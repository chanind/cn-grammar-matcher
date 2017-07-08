const yijingLeMatcher = require('./yijingLeMatcher');
const tf = require('../lib/tokenFilters');
const {
    assertAllExamplesMatch,
    assertNoneMatch,
    findTokens,
    parseSentence,
} = require('../lib/testUtils');

test('matches all examples', async () => {
    await assertAllExamplesMatch(yijingLeMatcher);
});

test('sentence with multiple occurrences', async () => {
    const sentence = await parseSentence('你已经点了的那杯咖啡已经凉了');
    const { tokens } = sentence;
    expect(yijingLeMatcher.match(sentence)).toEqual([
        [findTokens(sentence, '已经')[0], findTokens(sentence, '了')[0]],
        [findTokens(sentence, '已经')[1], findTokens(sentence, '了')[1]],
    ]);
});

test("doesn't match negative examples", async () => {
    await assertNoneMatch(yijingLeMatcher, [
        '我们已了解。',
        '列车已经出发。',
        '现在已经七点。',
        '了我已经。',
    ]);
});
