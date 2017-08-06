import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { StickyContainer, Sticky } from 'react-sticky';

import classes from './Result.scss';
import Sentence from './Sentence.jsx';
import Grammar from './Grammar.jsx';

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
    const grammar = this.props.result.grammar.map(grammarMatch => (
      <div className={classes.grammar} key={grammarMatch.id}>
        <Grammar
          onMouseEnter={() => this.setState({ highlightGrammar: [grammarMatch] })}
          onMouseLeave={() => this.setState({ highlightGrammar: [] })}
          isHighlighted={this.state.highlightGrammar.indexOf(grammarMatch) >= 0}
          {...grammarMatch}
        />
      </div>
    ));


    return (
      <StickyContainer className={classes.result}>
        <Sticky topOffset={-60} bottomOffset={60}>
          {
            ({ style }) => (
              <div style={{ ...style, top: style.top + 60 }} className={classes.headerPositioner}>
                <div className={classNames('container', classes.header)}>
                  <Sentence
                    text={this.props.result.text}
                    highlightLocations={this.getHighlightLocs()}
                  />
                </div>
              </div>
            )
          }
        </Sticky>
        <div className={classNames('container', classes.grammarResults)}>
          {grammar.length > 0 ? grammar : <p>No grammar matches found</p>}
        </div>
      </StickyContainer>
    );
  }
}

Result.propTypes = {
  result: PropTypes.shape({
    text: PropTypes.string.isRequired,
    grammar: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        examples: PropTypes.arrayOf(
          PropTypes.shape({
            zh: PropTypes.string,
            en: PropTypes.string,
          }),
        ),
        sources: PropTypes.arrayOf(
          PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({
              type: PropTypes.string,
              title: PropTypes.string,
              isbn13: PropTypes.string,
              isbn10: PropTypes.string,
              author: PropTypes.string,
              pages: PropTypes.number,
            }),
          ]),
        ),
      }),
    ).isRequired,
  }).isRequired,
};

export default Result;
