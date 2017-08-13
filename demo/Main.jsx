import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import IntroPage from './components/IntroPage.jsx';
import ResultsPage from './components/ResultsPage.jsx';

const Main = () =>
  <Router>
    <div>
      <Route exact path="/" component={IntroPage} />
      <Route path="/query/:query" component={ResultsPage} />
    </div>
  </Router>;

export default Main;
