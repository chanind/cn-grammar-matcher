import React from 'react';
import PropTypes from 'prop-types';

import classes from './ResultsPage.scss';
import Sentence from './Sentence.jsx'
import Grammar from './Grammar.jsx'

class Result extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      highlightGrammar: [],
    };
  }

  getHighlightLocs() {
    locs = [];
    for (const grammar in this.highlightGrammar) {
      for (const match in grammar.matches) {
        for (const loc in match) {
          locs.push(loc);
        }
      }
    }
    return locs;
  }
  
  render() {
    const grammar = this.props.result.grammar.map((grammarMatch) => (
      <Grammar
        key={grammarMatch.id}
        onMouseEnter={() => this.setState({ highlightGrammar: [grammarMatch] })}
        onMouseLeave={() => this.setState({ highlightGrammar: [] })}
        {...grammarMatch}
      />
    ));


    return (
      <div className={classes.result}>
        <h5>Grammar results for</h5>
        <h2>
          <Sentence
            text={this.props.result.text}
            highlightLocations={this.getHighlightLocs()}
          />
        </h2>
        <div className={classes.grammarResults}>
          {grammar.length > 0 ? grammar : <p>No grammar matches found</p>}
        </div>
      </div>
    );
  }
};

export default Result;
