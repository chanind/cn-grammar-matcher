import React from 'react';
import Spinner from 'react-spin';
import PropTypes from 'prop-types';

import classes from './ResultsPage.scss';
import Header from './Header.jsx';
import Result from './Result.jsx';

import GrammarMatcher from '../../src/GrammarMatcher';

class ResultsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      query: null,
      results: null,
    };
  }

  componentWillMount() {
    this.runQuery(this.props.match.params.query);
  }

  componentWillReceiveProps({ match }) {
    const { query } = match.params;
    if (this.state.query !== query) {
      this.runQuery(query);
    }
  }

  runQuery(query) {
    this.setState({ query, loading: true, error: null, results: null });
    const matcher = new GrammarMatcher();
    matcher
      .matchGrammar(query)
      .then(results => {
        // make sure there's no out-of-order results loading
        if (this.state.query !== query) return;
        this.setState({ loading: false, results, highlightGrammar: [] });
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(err);
        this.setState({ loading: false, error: err, results: null });
      });
  }

  renderError() {
    return (
      <div className={classes.error}>
        <h2>OH NO!</h2>
        <p>Something went wrong</p>
      </div>
    );
  }

  renderSpinner() {
    return <Spinner config={{ width: 3, length: 30, radius: 30 }} />;
  }

  renderResults() {
    return this.state.results.map((result, i) =>
      <Result result={result} key={`${i}-${result.text}`} />
    );
  }

  render() {
    return (
      <div>
        <Header query={this.props.match.params.query} />
        <div className={classes.content}>
          {this.state.loading ? this.renderSpinner() : null}
          {this.state.results ? this.renderResults() : null}
          {this.state.error ? this.renderError() : null}
        </div>
      </div>
    );
  }
}

ResultsPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      query: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ResultsPage;
