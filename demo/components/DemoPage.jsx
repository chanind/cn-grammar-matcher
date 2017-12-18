import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classes from './DemoPage.scss';

const samples = ['晚上六点以后，有的人下班了，有的人在加班。', '尽管实现这个目标不太容易，但是我们不能这么快就放弃。'];

const DemoPage = ({ history }) => {
  let input;

  const onSubmit = evt => {
    evt.preventDefault();
    const query = encodeURIComponent(input.value.replace(/\s+/gi, ''));
    const url = query ? `/query/${query}` : '/';
    history.push(url);
  };

  return (
    <div className={classes.introOuterContainer}>
      <div className={classes.introContainer}>
        <h1 className={classes.header}>Chinese Grammar Matcher</h1>
        <p className={classes.introDescription}>
          Enter a simplified Chinese sentence below and we&apos;ll explain the grammar
          rules.
        </p>
        <form className={classes.sentenceInputContainer} onSubmit={onSubmit}>
          <input className="form-control" ref={ref => (input = ref)} />
          <button type="submit" className="btn btn-primary">
            Go
          </button>
        </form>
        <div className={classes.samples}>
          <span>Need inspiration? Try a sample sentence:</span>
          {samples.map(sample =>
            <div key={sample} className={classes.sample}>
              <Link to={`/demo/query/${sample}`}>
                {sample}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

DemoPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.function,
  }).isRequired,
};

export default DemoPage;
