import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classes from './IntroPage.scss';

const samples = [
  '他女朋友漂亮是漂亮，就是有点矮。',
  '尽管实现这个目标不太容易，但是我们不能这么快就放弃。',
];

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
        <input className="form-control" ref={ref => input = ref} />
        <button type="submit" className="btn btn-primary">Go</button>
      </form>
      <div className={classes.samples}>
        <span>Or try a sample sentence:</span>
        {samples.map(sample => (
          <div key={sample} className={classes.sample}>
            <Link to={`/query/${sample}`}>{sample}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

IntroPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.function,
  }).isRequired,
};

export default IntroPage;
