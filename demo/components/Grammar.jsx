import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import classes from './Grammar.scss';
import Example from './Example.jsx'

const Grammar = ({ isHighlighted, onMouseEnter, onMouseLeave, name, description, examples }) => {
  const exampleElms = examples.slice(0, 3).map((example, i) => (
    <Example example={example} key={i} />
  ));

  return (
    <div
      className={classNames(classes.grammar, { [classes.highlight]: isHighlighted })}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <h4>{name}</h4>
      <p>{description}</p>
      <div className={classes.examples}>
        {exampleElms}
      </div>
    </div>
  );
};

export default Grammar;
