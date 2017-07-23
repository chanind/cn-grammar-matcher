import React from 'react';
import PropTypes from 'prop-types';

import classes from './Source.scss';

const Source = (props) => {
  const getUrl = () => {
    if (props.type === 'website') return props.url;
    if (props.type === 'book') return `https://isbnsearch.org/isbn/${props.isbn13 || props.isbn10}`;
    return null;
  };

  const getText = () => {
    if (props.type === 'website') return props.name;
    if (props.type === 'book') return props.title;
    return null;
  };

  return (
    <a className={classes.source} href={getUrl()} target="_blank">
      {getText()}
    </a>
  );
};

Source.defaultProps = {
  url: null,
  name: null,
  title: null,
  isbn13: null,
  isbn10: null,
};

Source.propTypes = {
  type: PropTypes.oneOf(['website', 'book']).isRequired,
  url: PropTypes.string,
  name: PropTypes.string,
  title: PropTypes.string,
  isbn13: PropTypes.string,
  isbn10: PropTypes.string,
};

export default Source;
