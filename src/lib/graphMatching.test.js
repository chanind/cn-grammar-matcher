const { Node, Edge, graphMatch } = require('./graphMatching');
const { pos, word } = require('./tokenFilters');
const Token = require('./Token');
const Sentence = require('./Sentence');

const fixtureTokens = [
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
fixtureTokens[1].setGovernor(fixtureTokens[4], 'amod');
fixtureTokens[2].setGovernor(fixtureTokens[1], 'mark');
fixtureTokens[3].setGovernor(fixtureTokens[4], 'compound:nn');
fixtureTokens[4].setGovernor(fixtureTokens[5], 'nsubj');
fixtureTokens[5].setGovernor(fixtureTokens[0], 'ROOT');
fixtureTokens[6].setGovernor(fixtureTokens[5], 'aux:asp');
fixtureTokens[7].setGovernor(fixtureTokens[9], 'amod');
fixtureTokens[8].setGovernor(fixtureTokens[7], 'mark');
fixtureTokens[9].setGovernor(fixtureTokens[5], 'dobj');
fixtureTokens[10].setGovernor(fixtureTokens[5], 'punct');

const fixtureRawSentence = '快速的棕色狐狸跳过了懒惰的狗。';
const fixtureSentence = new Sentence(fixtureRawSentence, fixtureTokens);

describe('graphMatch', () => {
  it('extracts matches from the NLP dependency graph', () => {
    const matchTree = new Node({ filter: pos('V.') }, [
      new Edge({ type: 'nsubj' }, new Node({ filter: word('狐狸'), capture: true })),
      new Edge({ type: 'dobj' }, new Node({ filter: word('狗'), capture: true })),
    ]);
    const matches = graphMatch(fixtureSentence.tokens, matchTree);
    expect(matches).toEqual([[{ start: 5, end: 7 }, { start: 13, end: 14 }]]);
  });

  it('can match edges coming ahead or behind their parent', () => {
    const matchingTree = new Node({ filter: pos('V.') }, [
      new Edge({ ahead: true }, new Node({ filter: word('狐狸'), capture: true })),
      new Edge({ behind: true }, new Node({ filter: word('狗'), capture: true })),
    ]);
    const matches = graphMatch(fixtureSentence.tokens, matchingTree);
    expect(matches).toEqual([[{ start: 5, end: 7 }, { start: 13, end: 14 }]]);

    const failingTree = new Node({ filter: pos('V.') }, [
      new Edge({ behind: true }, new Node({ filter: word('狐狸'), capture: true })),
      new Edge({ ahead: true }, new Node({ filter: word('狗'), capture: true })),
    ]);
    expect(graphMatch(fixtureSentence.tokens, failingTree)).toBeNull();
  });

  it('can still match with optional edges', () => {
    const matchTree = new Node({ filter: pos('V.') }, [
      new Edge({ type: 'nsubj' }, new Node({ filter: word('狐狸'), capture: true })),
      new Edge({ type: 'dobj' }, new Node({ filter: word('狗'), capture: true })),
      new Edge({ type: 'non-existent', optional: true }, new Node({ filter: word('猫') })),
    ]);
    const matches = graphMatch(fixtureSentence.tokens, matchTree);
    expect(matches).toEqual([[{ start: 5, end: 7 }, { start: 13, end: 14 }]]);
  });

  it('can includes optional matches if possible', () => {
    const matchTree = new Node({ filter: pos('V.') }, [
      new Edge({ type: 'nsubj' }, new Node({ filter: word('狐狸'), capture: true })),
      new Edge({ type: 'dobj' }, new Node({ filter: word('狗'), capture: true })),
      new Edge(
        { type: 'aux.*', optional: true },
        new Node({ filter: word('了'), capture: true })
      ),
    ]);
    const matches = graphMatch(fixtureSentence.tokens, matchTree);
    expect(matches).toEqual([
      [{ start: 5, end: 7 }, { start: 9, end: 10 }, { start: 13, end: 14 }],
    ]);
  });
});
