import React from 'react';
import PropTypes from 'prop-types';

import classes from './Result.scss';
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
    const locs = [];
    for (const grammar of this.state.highlightGrammar) {
      for (const match of grammar.matches) {
        for (const loc of match) {
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
        isHighlighted={this.state.highlightGrammar.indexOf(grammarMatch) >= 0}
        {...grammarMatch}
      />
    ));


    return (
      <div className={classes.result}>
        <h5>Grammar results for</h5>
        <Sentence
          text={this.props.result.text}
          highlightLocations={this.getHighlightLocs()}
        />
        <div className={classes.grammarResults}>
          {grammar.length > 0 ? grammar : <p>No grammar matches found</p>}
        </div>
      </div>
    );
  }
};

export default Result;
