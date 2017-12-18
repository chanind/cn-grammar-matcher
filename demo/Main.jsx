import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import IntroPage from './components/IntroPage.jsx';
import DemoPage from './components/DemoPage.jsx';
import ResultsPage from './components/ResultsPage.jsx';
import ProgressPage from './components/ProgressPage.jsx';

const Main = () =>
  <Router>
    <div>
      <Route exact path="/" component={IntroPage} />
      <Route exact path="/demo" component={DemoPage} />
      <Route path="/demo/query/:query" component={ResultsPage} />
      <Route path="/progress" component={ProgressPage} />
    </div>
  </Router>;

export default Main;
