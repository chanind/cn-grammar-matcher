import React from 'react';
import classNames from 'classnames';
import allsetUrls from '../../scripts/allset/urls';
import patterns from '../../src/patterns';

import classes from './ProgressPage.scss';

const extractAllsetId = url => url.replace(/^.*\//, '');

const importedPatternsMap = {};
for (const pattern of Object.values(patterns)) {
  for (const source of pattern.sources) {
    if (!source.url) continue;
    importedPatternsMap[extractAllsetId(source.url)] = true;
  }
}

const getCounts = urls => {
  const counts = {
    imported: 0,
    skipped: 0,
    remaining: 0,
  };
  for (const urlData of urls) {
    if (importedPatternsMap[extractAllsetId(urlData.url)]) {
      counts.imported += 1;
    } else if (urlData.skip) {
      counts.skipped += 1;
    } else {
      counts.remaining += 1;
    }
  }
  return counts;
};

const ProgressPage = () => {
  const renderProgress = urls => {
    const counts = getCounts(urls);
    const total = counts.remaining + counts.skipped + counts.imported;
    return (
      <div>
        <div>
          <span className={classes.label}>imported:</span>
          <span className={classes.count}>
            {counts.imported}
          </span>
          <span className={classes.percent}>
            ({Math.round(100 * counts.imported / total)}%)
          </span>
        </div>
        <div>
          <span className={classes.label}>skipped:</span>
          <span className={classes.count}>
            {counts.skipped}
          </span>
          <span className={classes.percent}>
            ({Math.round(100 * counts.skipped / total)}%)
          </span>
        </div>
        <div>
          <span className={classes.label}>remaining:</span>
          <span className={classes.count}>
            {counts.remaining}
          </span>
          <span className={classes.percent}>
            ({Math.round(100 * counts.remaining / total)}%)
          </span>
        </div>
        <div>
          <span className={classes.label}>total:</span>
          {total}
        </div>
      </div>
    );
  };

  const renderBlock = urls => {
    const urlsMarkup = urls.map(urlData => {
      const isImported = importedPatternsMap[extractAllsetId(urlData.url)];
      const isSkipped = !!urlData.skip;
      const blockClasses = classNames(classes.urlBlock, {
        [classes.imported]: isImported,
        [classes.skipped]: isSkipped,
        [classes.remaining]: !isImported && !isSkipped,
      });
      let icon;
      if (isImported) {
        icon = 'fa-check text-success';
      } else if (isSkipped) {
        icon = 'fa-circle-thin text-muted';
      } else {
        icon = 'fa-times text-danger';
      }
      return (
        <div className={blockClasses} key={urlData.url + urlData.label}>
          <a href={urlData.url} target="_blank">
            {urlData.label}
          </a>
          <div className={classNames('text-muted', classes.statusSkipped)}>
            Skipped: {urlData.skip}
          </div>
          <div className={classNames('text-success', classes.statusImported)}>
            Imported :D
          </div>
          <div className={classNames('text-danger', classes.statusRemaining)}>
            Remaining
          </div>
          <div className={classes.icon}>
            <i className={classNames('fa', icon)} aria-hidden="true" />
          </div>
        </div>
      );
    });

    return (
      <div>
        {renderProgress(urls)}
        <div className={classes.urlsContainer}>
          {urlsMarkup}
        </div>
        <div className={classes.clear} />
      </div>
    );
  };

  return (
    <div className="container">
      <h1>Allset Import Progress</h1>
      {renderProgress(allsetUrls.all)}

      <h2 className={classes.subheader}>By Level</h2>

      <h4>A1</h4>
      {renderBlock(allsetUrls.a1)}

      <h4>A2</h4>
      {renderBlock(allsetUrls.a2)}

      <h4>B1</h4>
      {renderBlock(allsetUrls.b1)}

      <h4>B2</h4>
      {renderBlock(allsetUrls.b2)}
    </div>
  );
};

export default ProgressPage;
