import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import classes from './Grammar.scss';
import Example from './Example.jsx';
import Source from './Source.jsx';

class Grammar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
    };
    this.onShowMoreExamples = this.onShowMoreExamples.bind(this);
  }

  onShowMoreExamples(evt) {
    evt.preventDefault();
    this.setState({ isExpanded: true });
  }

  render() {
    const { isHighlighted, onMouseEnter, onMouseLeave, name, description, examples, sources } = this.props;
    let visibleExamples = examples;
    if (!this.state.isExpanded) {
      visibleExamples = examples.slice(0, 3);
    }
    const exampleElms = visibleExamples.map((example, i) => (
      <Example example={example} key={i} />
    ));

    const hasMoreExamples = examples.length > visibleExamples.length;
    const moreExamplesLink = !hasMoreExamples ? null : (
      <a onClick={this.onShowMoreExamples} className={classes.moreExamples} role="button" href>
        More examples
      </a>
    );

    return (
      <div
        className={classNames(classes.grammar, { [classes.highlight]: isHighlighted })}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className={classes.headerInfo}>
          <div>
            <h4>{name}</h4>
            <p>{description}</p>
          </div>
          <div className={classes.sources}>
            <div><b>More info:</b></div>
            {sources.map((source, i) => (
              <div key={i}>
                <Source {...source} />
              </div>
            ))}
          </div>
        </div>

        <div className={classes.examples}>
          {exampleElms}
          {moreExamplesLink}
        </div>
      </div>
    );
  }
}

Grammar.defaultProps = {
  onMouseEnter: () => {},
  onMouseLeave: () => {},
};

Grammar.propTypes = {
  isHighlighted: PropTypes.bool.isRequired,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  name: PropTypes.string.isRequired,
  examples: PropTypes.arrayOf(
    PropTypes.shape({
      zh: PropTypes.string,
      en: PropTypes.string,
    }),
  ).isRequired,
  description: PropTypes.string.isRequired,
  sources: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      url: PropTypes.string,
      name: PropTypes.string,
      title: PropTypes.string,
      isbn13: PropTypes.string,
      isbn10: PropTypes.string,
      author: PropTypes.string,
      pages: PropTypes.number,
    }),
  ).isRequired,
};

export default Grammar;
