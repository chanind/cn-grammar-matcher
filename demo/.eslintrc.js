module.exports = {
  "extends": "airbnb",
  "env": {
    "jest": true,
    "browser": true,
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "import/extensions": ["error", {"js": "never"}],
    "jsx-a11y/href-no-hash": "off",
    "no-mixed-operators": "off",
    "no-restricted-syntax": "off",
    "max-len": [2, { code: 120, ignoreStrings: true }],
    "no-continue": "off",
    "class-methods-use-this": "off",
    "import/no-extraneous-dependencies": "off",
    "import/no-unresolved": ["error", { ignore: ['^react$','^react-dom$'] }],
    "no-return-assign": "off",
    "react/no-array-index-key": "off",
  }
};