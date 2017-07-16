import React from 'react';

import classes from './Intro.scss';

const Intro = () => (
  <div className={classes.introContainer}>
    <h1>Chinese Grammar Matcher</h1>
    <p className={classes.introDescription}>
      Enter a simplified Chinese sentence below and we&apos;ll explain the grammar rules.
    </p>
    <form className={classes.sentenceInputContainer}>
      <input className="form-control" placeholder="已经很晚了，我们走吧。" />
      <button type="submit" className="btn btn-primary">Go</button>
    </form>
  </div>
);

export default Intro;
