![Build status](https://circleci.com/gh/chanind/cn-grammar-matcher/tree/master.svg?style=shield&circle-token=91c14be1d2232021ab3d7ee3908315a8456d9859)

# cn-grammar-matcher
A tool to find grammar patterns in Chinese text

# Running the Stanford server
This project requires the Stanford CoreNLP server to be running with Chinese enabled. The easiest way to do this is to use a pre-built docker image. The following command will bring up an Stanford CoreNLP server on port 9000 of your local computer: `docker run -p 9000:9000 --memory=4g skywidesoft/corenlp-chinese:3.7.0`

# Adding new matchers
There is a helper script to add new matchers which will generate the boilerplate files for you. You can run
this with `yarn run gen-matcher <matcherName>`.
