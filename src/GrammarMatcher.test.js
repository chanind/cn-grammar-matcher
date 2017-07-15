const GrammarMatcher = require('./GrammarMatcher');
const meiyouMatcher = require('./matchers/meiyouMatcher');

const matcher = new GrammarMatcher(global.CORE_NLP_HOST);

test('it returns matching grammar rules', async () => {
  const results = await matcher.matchGrammar('我没有问题。');
  expect(results).toHaveLength(1);
  expect(results[0].text).toBe('我没有问题。');
  expect(results[0].grammar).toHaveLength(1);
  expect(results[0].grammar[0].id).toBe(meiyouMatcher.id);
  expect(results[0].grammar[0].sources).toBe(meiyouMatcher.sources);
  expect(results[0].grammar[0].examples).toBe(meiyouMatcher.examples);
  expect(results[0].grammar[0].name).toBe(meiyouMatcher.name);
  expect(results[0].grammar[0].matches).toEqual([
    [{ start: 1, end: 3 }],
  ]);
});
