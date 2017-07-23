import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main.jsx';
import GrammarMatcher from '../src/GrammarMatcher';

const nlpPath = process.env.NLP_PATH || 'http://localhost:9000';
GrammarMatcher.defaultNlpPath = nlpPath;

ReactDOM.render(React.createElement(Main), document.getElementById('root'));
