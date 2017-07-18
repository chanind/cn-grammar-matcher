import React from 'react';
import PropTypes from 'prop-types';

import classes from './IntroPage.scss';

const IntroPage = ({ history }) => {
  let input;

  const onSubmit = (evt) => {
    evt.preventDefault();
    const query = encodeURIComponent(input.value.replace(/\s+/ig, ''));
    const url = query ? `/query/${query}` : '/';
    history.push(url);
  };

  return (
    <div className={classes.introContainer}>
      <h1>Chinese Grammar Matcher</h1>
      <p className={classes.introDescription}>
        Enter a simplified Chinese sentence below and we&apos;ll explain the grammar rules.
      </p>
      <form className={classes.sentenceInputContainer} onSubmit={onSubmit}>
        <input className="form-control" placeholder="已经很晚了，我们走吧。" ref={ref => input = ref} />
        <button type="submit" className="btn btn-primary">Go</button>
      </form>
    </div>
  );
};

IntroPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.function,
  }).isRequired,
};

export default IntroPage;
