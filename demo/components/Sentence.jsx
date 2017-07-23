import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import classes from './Sentence.scss';

const Sentence = ({ text, highlightLocations }) => {
  const isCharHighlighted = (index) => {
    for (const location of highlightLocations) {
      if (location.start <= index && location.end > index) {
        return true;
      }
    }
    return false;
  };

  const chars = text.split('').map((char, i) => (
    <span
      key={i}
      className={classNames(classes.char, { [classes.highlight]: isCharHighlighted(i) })}
    >
      {char}
    </span>
  ));
  return (<h2>{chars}</h2>);
};

Sentence.propTypes = {
  text: PropTypes.string.isRequired,
  highlightLocations: PropTypes.arrayOf(
    PropTypes.shape({
      start: PropTypes.number,
      end: PropTypes.number,
    }),
  ).isRequired,
};

export default Sentence;
