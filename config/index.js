const baseConfig = require('./base');

module.exports = {
  getConfigParam: (param) => {
    return process.env[param] || baseConfig[param];
  },
};