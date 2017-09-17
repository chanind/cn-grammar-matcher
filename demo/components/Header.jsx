import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import classes from './Header.scss';

const Header = props => {
  let input;

  const onSubmit = evt => {
    evt.preventDefault();
    const query = encodeURIComponent(input.value.replace(/\s+/gi, ''));
    const url = query ? `/query/${query}` : '/';
    props.history.push(url);
  };

  return (
    <nav className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <Link className={classNames('navbar-brand', classes.logoText)} to="/">
            Chinese Grammar Matcher
          </Link>
        </div>
        <div className="navbar-collapse collapse">
          <form
            className={classNames('navbar-form navbar-left', classes.grammarForm)}
            onSubmit={onSubmit}
          >
            <div className={classNames('form-group', classes.grammarFormGroup)}>
              <input
                defaultValue={props.query}
                type="text"
                className={classNames('form-control', classes.grammarInput)}
                placeholder="Enter a simplified Chinese sentence"
                ref={ref => (input = ref)}
              />
            </div>
            <button type="submit" className="btn btn-default">
              Go
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

Header.defaultProps = {
  query: null,
};

Header.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.function,
  }).isRequired,
  query: PropTypes.string,
};

export default withRouter(Header);
