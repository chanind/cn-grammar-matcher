module.exports = {
  extends: ['airbnb', 'prettier'],
  env: {
    jest: true,
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      { singleQuote: true, printWidth: 90, trailingComma: 'es5' },
    ],
    'jsx-a11y/href-no-hash': 'off',
    'no-mixed-operators': 'off',
    'no-restricted-syntax': 'off',
    'max-len': [2, { code: 120, ignoreStrings: true }],
    'no-continue': 'off',
    'class-methods-use-this': 'off',
    'no-underscore-dangle': 'off',
  },
};
