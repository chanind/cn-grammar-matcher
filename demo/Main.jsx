import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import IntroPage from './components/IntroPage.jsx';
import ResultsPage from './components/ResultsPage.jsx';
import ProgressPage from './components/ProgressPage.jsx';

const Main = () =>
  <Router>
    <div>
      <Route exact path="/" component={IntroPage} />
      <Route path="/query/:query" component={ResultsPage} />
      <Route path="/progress" component={ProgressPage} />
    </div>
  </Router>;

export default Main;
