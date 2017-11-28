const GrammarMatcher = require('./GrammarMatcher');
const meiyouPattern = require('./patterns/meiyouPattern');

const matcher = new GrammarMatcher(global.CORE_NLP_HOST);

test('it returns matching grammar rules', async () => {
  const results = await matcher.matchGrammar('我没有问题。');
  expect(results).toHaveLength(1);
  expect(results[0].text).toBe('我没有问题。');
  expect(results[0].grammar).toHaveLength(1);
  expect(results[0].grammar[0].id).toBe(meiyouPattern.id);
  expect(results[0].grammar[0].sources).toBe(meiyouPattern.sources);
  expect(results[0].grammar[0].examples).toBe(meiyouPattern.examples);
  expect(results[0].grammar[0].strucutres).toBe(meiyouPattern.strucutres);
  expect(results[0].grammar[0].matches).toEqual([[{ start: 1, end: 3 }]]);
});
