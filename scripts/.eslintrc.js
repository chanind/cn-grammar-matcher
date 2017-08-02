module.exports = {
  "extends": "airbnb",
  "env": {
    "jest": true
  },
  "rules": {
    "jsx-a11y/href-no-hash": "off",
    "no-mixed-operators": "off",
    "no-restricted-syntax": "off",
    "max-len": [2, { code: 120, ignoreStrings: true }],
    "no-continue": "off",
    "class-methods-use-this": "off",
    "no-console": "off",
    "import/no-extraneous-dependencies": "off",
    "no-await-in-loop": "off",
  }
};