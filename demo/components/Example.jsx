import React from 'react';
import PropTypes from 'prop-types';

import classes from './Example.scss';

const Example = ({ example }) => (
  <div className={classes.example}>
    <h6>{example.zh}</h6>
    <div>{example.en}</div>
  </div>
);

Example.propTypes = {
  example: PropTypes.shape({
    zh: PropTypes.string,
    en: PropTypes.string,
  }).isRequired,
};

export default Example;
