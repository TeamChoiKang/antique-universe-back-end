module.exports = {
  env: {
    browser: false,
    es6: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  plugins: ["prettier"],
  ignorePatterns: ["node_modules/"],
  rules: {
    "prettier/prettier": "error",
  },
};
