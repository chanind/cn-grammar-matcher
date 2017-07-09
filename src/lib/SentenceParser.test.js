

const SentenceParser = require('./SentenceParser');
const Sentence = require('./Sentence');
const Token = require('./Token');

const parser = new SentenceParser();

test('basic sentence parse', async () => {
  const inputSentence = '快速的棕色狐狸跳过了懒惰的狗。';
  const resultSentence = await parser.parse(inputSentence);

  const expectedTokens = [
    new Token({
      index: 0,
      word: '',
      characterOffsetBegin: 0,
      characterOffsetEnd: 0,
      pos: '',
      ner: '',
    }),
    new Token({
      index: 1,
      word: '快速',
      originalText: '',
      lemma: '快速',
      characterOffsetBegin: 0,
      characterOffsetEnd: 2,
      pos: 'VA',
      ner: 'O',
    }),
    new Token({
      index: 2,
      word: '的',
      originalText: '',
      lemma: '的',
      characterOffsetBegin: 2,
      characterOffsetEnd: 3,
      pos: 'DEC',
      ner: 'O',
    }),
    new Token({
      index: 3,
      word: '棕色',
      originalText: '',
      lemma: '棕色',
      characterOffsetBegin: 3,
      characterOffsetEnd: 5,
      pos: 'NN',
      ner: 'O',
    }),
    new Token({
      index: 4,
      word: '狐狸',
      originalText: '',
      lemma: '狐狸',
      characterOffsetBegin: 5,
      characterOffsetEnd: 7,
      pos: 'NN',
      ner: 'O',
    }),
    new Token({
      index: 5,
      word: '跳过',
      originalText: '',
      lemma: '跳过',
      characterOffsetBegin: 7,
      characterOffsetEnd: 9,
      pos: 'VV',
      ner: 'O',
    }),
    new Token({
      index: 6,
      word: '了',
      originalText: '',
      lemma: '了',
      characterOffsetBegin: 9,
      characterOffsetEnd: 10,
      pos: 'AS',
      ner: 'O',
    }),
    new Token({
      index: 7,
      word: '懒惰',
      originalText: '',
      lemma: '懒惰',
      characterOffsetBegin: 10,
      characterOffsetEnd: 12,
      pos: 'VA',
      ner: 'O',
    }),
    new Token({
      index: 8,
      word: '的',
      originalText: '',
      lemma: '的',
      characterOffsetBegin: 12,
      characterOffsetEnd: 13,
      pos: 'DEC',
      ner: 'O',
    }),
    new Token({
      index: 9,
      word: '狗',
      originalText: '',
      lemma: '狗',
      characterOffsetBegin: 13,
      characterOffsetEnd: 14,
      pos: 'NN',
      ner: 'O',
    }),
    new Token({
      index: 10,
      word: '。',
      originalText: '',
      lemma: '。',
      characterOffsetBegin: 14,
      characterOffsetEnd: 15,
      pos: 'PU',
      ner: 'O',
    }),
  ];
  expectedTokens[1].setGovernor(expectedTokens[4], 'amod');
  expectedTokens[2].setGovernor(expectedTokens[1], 'mark');
  expectedTokens[3].setGovernor(expectedTokens[4], 'compound:nn');
  expectedTokens[4].setGovernor(expectedTokens[5], 'nsubj');
  expectedTokens[5].setGovernor(expectedTokens[0], 'ROOT');
  expectedTokens[6].setGovernor(expectedTokens[5], 'aux:asp');
  expectedTokens[7].setGovernor(expectedTokens[9], 'amod');
  expectedTokens[8].setGovernor(expectedTokens[7], 'mark');
  expectedTokens[9].setGovernor(expectedTokens[5], 'dobj');
  expectedTokens[10].setGovernor(expectedTokens[5], 'punct');

  const expectedSentence = new Sentence(inputSentence, expectedTokens);

  expect(resultSentence).toEqual(expectedSentence);
  expect(resultSentence.text).toEqual(inputSentence);
  expect(resultSentence.original).toEqual(inputSentence);
});

test('Sentence parse with extra whitespace', async () => {
  const inputSentence = '你好    我     的朋友';
  const resultSentence = await parser.parse(inputSentence);

  const expectedTokens = [
    new Token({
      index: 0,
      word: '',
      characterOffsetBegin: 0,
      characterOffsetEnd: 0,
      pos: '',
      ner: '',
    }),
    new Token({
      index: 1,
      word: '你',
      originalText: '',
      lemma: '你',
      characterOffsetBegin: 0,
      characterOffsetEnd: 1,
      pos: 'PN',
      ner: 'O',
    }),
    new Token({
      index: 2,
      word: '好',
      originalText: '',
      lemma: '好',
      characterOffsetBegin: 1,
      characterOffsetEnd: 2,
      pos: 'VA',
      ner: 'O',
    }),
    new Token({
      index: 3,
      word: '我',
      originalText: '',
      lemma: '我',
      characterOffsetBegin: 6,
      characterOffsetEnd: 7,
      pos: 'PN',
      ner: 'O',
    }),
    new Token({
      index: 4,
      word: '的',
      originalText: '',
      lemma: '的',
      characterOffsetBegin: 12,
      characterOffsetEnd: 13,
      pos: 'DEG',
      ner: 'O',
    }),
    new Token({
      index: 5,
      word: '朋友',
      originalText: '',
      lemma: '朋友',
      characterOffsetBegin: 13,
      characterOffsetEnd: 15,
      pos: 'NN',
      ner: 'O',
    }),
  ];
  expectedTokens[1].setGovernor(expectedTokens[2], 'nsubj');
  expectedTokens[2].setGovernor(expectedTokens[0], 'ROOT');
  expectedTokens[3].setGovernor(expectedTokens[5], 'nmod:assmod');
  expectedTokens[4].setGovernor(expectedTokens[3], 'case');
  expectedTokens[5].setGovernor(expectedTokens[2], 'dobj');

  const expectedSentence = new Sentence(inputSentence, expectedTokens);

  expect(resultSentence).toEqual(expectedSentence);
  expect(resultSentence.text).toEqual('你好我的朋友');
  expect(resultSentence.original).toEqual(inputSentence);
});
