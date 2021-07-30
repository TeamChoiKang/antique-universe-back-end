module.exports = {
  env: {
    browser: false,
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  ignorePatterns: ['node_modules/'],
  parserOptions: {
    ecmaVersion: 8,
  },
  rules: {
    'no-unused-vars': 1,
    'linebreak-style': ['error', require('os').EOL === '\r\n' ? 'windows' : 'unix'],
  },
};
