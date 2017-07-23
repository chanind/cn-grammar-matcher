import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main.jsx';
import GrammarMatcher from '../src/GrammarMatcher';

const nlpHost = process.env.NLP_HOST || 'http://localhost:9000';
GrammarMatcher.defaultNlpHost = nlpHost;

ReactDOM.render(React.createElement(Main), document.getElementById('root'));
