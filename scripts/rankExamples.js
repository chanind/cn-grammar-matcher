const program = require('commander');
const patterns = require('../src/patterns');
const GrammarMatcher = require('../src/GrammarMatcher');

const grammarPattern = new GrammarMatcher(process.env.NLP_HOST);
const examples = Object.values(patterns)
  .reduce((acc, pattern) => acc.concat(pattern.examples), [])
  .map(ex => ex.zh);

program
  .usage('yarn run rank-examples')
  .option('-t, --top [value]', 'Print the top X examples, default 10')
  .parse(process.argv);

const top = parseInt(program.top || 10, 10);

const run = async () => {
  const exampleCounts = {};
  for (const example of examples) {
    const matches = await grammarPattern.matchGrammar(example);
    exampleCounts[example] = matches[0].grammar.length;
  }
  examples.sort((ex1, ex2) => exampleCounts[ex2] - exampleCounts[ex1]);

  for (const example of examples.slice(0, top).reverse()) {
    console.log(`${example}: ${exampleCounts[example]}`);
  }
  console.log('Done! :D');
};
run();
