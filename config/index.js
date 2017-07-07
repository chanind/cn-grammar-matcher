const baseConfig = require('./base');

module.exports = {
    getConfigParam: (param) => baseConfig[param],
};