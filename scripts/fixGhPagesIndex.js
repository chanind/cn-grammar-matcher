const fs = require('fs');
const path = require('path');

console.log('Moving index.html and fixing asset paths for github pages');

const oldIndexPath = path.resolve(__dirname, '../assets/index.html');
const newIndexPath = path.resolve(__dirname, '../index.html');

fs.renameSync(oldIndexPath, newIndexPath);
const indexContents = fs.readFileSync(newIndexPath, 'utf-8');
fs.writeFileSync(
  newIndexPath,
  indexContents.replace(/="\//gi, '="/cn-grammar-matcher/assets/')
);
