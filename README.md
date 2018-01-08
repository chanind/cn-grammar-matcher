![Build status](https://circleci.com/gh/chanind/cn-grammar-matcher/tree/master.svg?style=shield&circle-token=91c14be1d2232021ab3d7ee3908315a8456d9859)

# cn-grammar-matcher
A tool to find grammar patterns in Chinese text. Find a live demo at [chanind.github.io/cn-grammar-matcher](https://chanind.github.io/cn-grammar-matcher/)


## Installation

Installation is easiest via NPM: `npm install cn-grammar-matcher`

For most uses of Chinese Grammar Matcher that should be all you need to do!

## Basic usage
This library takes a string of chinese text as an input and analyzes it to find which Chinese grammar
patterns are present. Usage looks like the following:

```javascript
const GrammarMatcher = require('cn-grammar-matcher');
const matcher = new GrammarMatcher();
matcher.matchGrammar('中文太难了').then((results) => {
    // do something exciting with the results!
});
```

For the above example, results for `'中文太难了'` should look something like the following:

```javascript
/* results for '中文太难了' */
[{
    // all grammar patterns found in this sentence
    grammar: [{
        id: "expressingExcessivelyWithTai",
        structures: [
            "太 + Adj. + 了"
        ],
        description: " ... ", // A description of this grammar pattern
        // more examples of this grammar pattern
        examples: [
            {
                zh: "你太好了。",
                en: "You are so great.",
                src: {
                    type: "website",
                    url: "https://resources.allsetlearning.com/chinese/grammar/ASG8HVFN",
                    name: "AllSet Chinese Grammar Wiki"
                }
            },
            ...
        ],
        // More info on this grammar pattern
        sources: [
            {
                type: "website",
                url: "https://resources.allsetlearning.com/chinese/grammar/ASG8HVFN",
                name: "AllSet Chinese Grammar Wiki"
            }
        ],
        // where in the sentence this grammar pattern was found
        // You can use this to highlight words in the sentence
        matches: [
            [
                { start: 2, end: 3 },
                { start: 4, end: 5 }
            ]
        ]
    }],
    text: "中文太难了",
    tokens: [/* raw tokenization from Stanford Core NLP */]
}]
```

Most of the patterns this library can detect come from the [Allset Chinese Grammar Wiki](https://resources.allsetlearning.com/chinese/grammar). This library uses the Stanford CoreNLP server for Chinese.
By default the library will use a copy of the CoreNLP server hosted at https://core-nlp.cn-grammar-matcher.com, but
if you expect to have a lot of traffic it's best to run a copy of the server yourself.

# Contributing to Chinese Grammar Matcher
If you would like to help improve Chinese Grammar Matcher there's a number of ways that you can help! If
you find any bugs with the patterns being detected please [Open an Issue](https://github.com/chanind/cn-grammar-matcher/issues/new) in this repo. Don't be shy!

If you can code and want to add more grammar patterns or improve existing patterns, great! Pull requests
are always welcome and encouraged! If you have any questions or problems [Open an Issue](https://github.com/chanind/cn-grammar-matcher/issues/new) here.

## Running Chinese Grammar Matcher for development
If you want to contribute code to this repo you'll need to get the repo and tests running first. After you
clone this repo, run `yarn install` to get everything set up. 

This project requires the Stanford CoreNLP server to be running with Chinese enabled. The easiest way to do this is to use a pre-built docker image. The following command will bring up an Stanford CoreNLP server on port 9000 of your local computer: `docker run -p 9000:9000 --memory=4g skywidesoft/corenlp-chinese:3.7.0`

Once you have a Stanford CoreNLP server running locally, you can run tests with `yarn test`. If all tests pass you should be good to go! It might take 2 tries to get the tests to pass after starting the Core NLP server since it takes a few minutes to load everything the first run.

## Adding/editing grammar patterns
You can scaffold a new grammar pattern by running `yarn gen-pattern <pattern-name>`. This will add a shell of
a grammar pattern and a test to `src/patterns`. If you fix a bug or improve an existing grammar pattern make sure to update the corresponding test case for the patten too!

