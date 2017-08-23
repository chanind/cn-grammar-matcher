const fs = require('fs');
const program = require('commander');
const {
  formatFullPatternName,
  getPatternIndexRequireLine,
  getPatternFileName,
  rewritePatternIndex,
  rewriteFileContents,
  getPatternTestFileName,
} = require('./scriptUtils');

program.usage('yarn mv <old matcher name> <new matcher name>').parse(process.argv);

const run = () => {
  const oldName = formatFullPatternName(program.args[0]);
  const newName = formatFullPatternName(program.args[1]);

  const oldFile = getPatternFileName(oldName);
  const newFile = getPatternFileName(newName);

  const oldTestFile = getPatternTestFileName(oldName);
  const newTestFile = getPatternTestFileName(newName);

  if (!fs.existsSync(oldFile)) {
    console.log(`File does not exist ${oldFile}. Quitting`);
    return;
  }
  if (!fs.existsSync(oldTestFile)) {
    console.log(`File does not exist ${oldTestFile}. Quitting`);
    return;
  }

  if (fs.existsSync(newFile)) {
    console.log(
      `File already exists ${newFile}. Please delete this file first. Quitting`
    );
    return;
  }
  if (fs.existsSync(newTestFile)) {
    console.log(
      `File already exists ${newTestFile}. Please delete this file first. Quitting`
    );
    return;
  }

  const oldRequire = getPatternIndexRequireLine(oldName);
  const newRequire = getPatternIndexRequireLine(newName);

  console.log(`Moving ${oldFile} to ${newFile}`);
  fs.renameSync(oldFile, newFile);
  console.log(`Moving ${oldTestFile} to ${newTestFile}`);
  fs.renameSync(oldTestFile, newTestFile);
  console.log('Rewriting test contents');
  rewriteFileContents(newTestFile, testContents =>
    testContents.replace(new RegExp(oldName, 'gu'), newName)
  );
  console.log('Rewriting index');
  rewritePatternIndex(indexContents => indexContents.replace(oldRequire, newRequire));
};
run();
