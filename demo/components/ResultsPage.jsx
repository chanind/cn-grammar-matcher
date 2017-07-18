import React from 'react';
import Spinner from 'react-spin';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import classes from './ResultsPage.scss';
import Header from './Header.jsx';
import GrammarMatcher from '../../src/GrammarMatcher';

class ResultsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      query: null,
      results: null,
      highlightGrammar: [],
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
    matcher.matchGrammar(query).then((results) => {
      // make sure there's no out-of-order results loading
      if (this.state.query !== query) return;
      this.setState({ loading: false, results, highlightGrammar: [] });
    }).catch((err) => {
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
    return (<Spinner config={{ width: 3, length: 30, radius: 30 }} />);
  }


  renderSentence(text) {
    const isCharHighlighted = (index) => {
      for (const grammar of this.state.highlightGrammar) {
        for (const match of grammar.matches) {
          for (const location of match) {
            if (location.start <= index && location.end > index) {
              return true;
            }
          }
        }
      }
      return false;
    };

    return text.split('').map((char, i) => (
      <span
        key={i}
        className={classNames(classes.char, { [classes.highlight]: isCharHighlighted(i) })}
      >
        {char}
      </span>
    ));
  }

  renderResults() {
    return this.state.results.map((result) => {
      const grammar = result.grammar.map((match) => {
        const examples = match.examples.slice(0, 3).map((example, i) => (
          <div className={classes.example} key={i}>
            <h6>{example.zh}</h6>
            <div>{example.en}</div>
          </div>
        ));

        const isHighlighted = this.state.highlightGrammar.indexOf(match) >= 0;

        return (
          <div
            className={classNames(classes.grammar, { [classes.highlight]: isHighlighted })}
            key={match.id}
            onMouseEnter={() => this.setState({ highlightGrammar: [match] })}
            onMouseLeave={() => this.setState({ highlightGrammar: [] })}
          >
            <h4>{match.name}</h4>
            <p>{match.description}</p>
            <div className={classes.examples}>{examples}</div>
          </div>
        );
      });

      return (
        <div className={classes.result}>
          <h5>Grammar results for</h5>
          <h2>{this.renderSentence(result.text)}</h2>
          <div className={classes.grammarResults}>
            {grammar.length > 0 ? grammar : <p>No grammar matches found</p>}
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <Header query={this.props.match.params.query} />
        <div className={classNames('container', classes.content)}>
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
