module.exports = {
  env: {
    browser: true,
  },
  rules: {
    'import/extensions': ['error', { js: 'never' }],
    'import/no-unresolved': ['error', { ignore: ['^react$', '^react-dom$'] }],
    'import/no-extraneous-dependencies': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/no-array-index-key': 'off',
  },
};
