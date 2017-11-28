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
      sizerHeight: null,
    };
    this.resetSizerHeight = this.resetSizerHeight.bind(this);
    this.onShowMoreExamples = this.onShowMoreExamples.bind(this);
  }

  componentDidMount() {
    global.window.addEventListener('resize', this.resetSizerHeight);
  }

  componentWillUnmount() {
    global.window.removeEventListener('resize', this.resetSizerHeight);
  }

  onShowMoreExamples(evt) {
    evt.preventDefault();
    if (!this.state.sizerHeight) {
      this.resetSizerHeight();
    }
    this.setState({ isExpanded: !this.state.isExpanded });
  }

  resetSizerHeight() {
    this.setState({
      sizerHeight: this.exSizer.getBoundingClientRect().height + 5,
    });
  }

  render() {
    const {
      isHighlighted,
      onMouseEnter,
      onMouseLeave,
      structures,
      description,
      examples,
      sources,
    } = this.props;
    const { isExpanded } = this.state;

    const exampleElms = examples.map((example, i) =>
      <Example example={example} key={i} />
    );

    const examplesIconClasses = classNames(
      'fa',
      'fa-caret-right',
      classes.moreExamplesIcon,
      {
        [classes.expanded]: isExpanded,
      }
    );

    const exampleContainerStyle = {};
    if (isExpanded) {
      exampleContainerStyle.height = `${this.state.sizerHeight}px`;
    }

    return (
      <div
        className={classNames(classes.grammar, {
          [classes.highlight]: isHighlighted,
        })}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className={classes.headerInfo}>
          <div>
            <div className={classes.structures}>
              {structures.map(struct =>
                <span className={classNames(classes.structure, 'badge')} key={struct}>
                  {struct}
                </span>
              )}
            </div>
            <p>
              {description}
            </p>
          </div>
        </div>

        <div className={classes.examplesContainer}>
          <a
            onClick={this.onShowMoreExamples}
            className={classes.moreExamples}
            role="button"
            href
          >
            <i className={examplesIconClasses} aria-hidden="true" /> Examples
          </a>
          <div className={classes.examples} style={exampleContainerStyle}>
            <div ref={ref => (this.exSizer = ref)}>
              {exampleElms}
            </div>
          </div>
        </div>
        <div className={classes.sources}>
          <span className={classes.learnMoreLabel}>Learn more:</span>
          {sources.map((source, i) =>
            <span key={i} className={classes.source}>
              <Source {...source} />
            </span>
          )}
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
  structures: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  examples: PropTypes.arrayOf(
    PropTypes.shape({
      zh: PropTypes.string,
      en: PropTypes.string,
    })
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
    })
  ).isRequired,
};

export default Grammar;
