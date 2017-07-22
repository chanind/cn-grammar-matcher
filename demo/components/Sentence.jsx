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

  return text.split('').map((char, i) => (
    <span
      key={i}
      className={classNames(classes.char, { [classes.highlight]: isCharHighlighted(i) })}
    >
      {char}
    </span>
  ));
};

export default Sentence;
