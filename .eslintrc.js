module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true,
  },
  extends: [
    'plugin:vue/base',
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    './.eslintrc-auto-import.json',
  ],
  parserOptions: {
    ecmaVersion: 2021,
  },
  plugins: [],
  rules: {
    'vue/script-setup-uses-vars': 'error',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        tabWidth: 2,
        semi: true,
        bracketSpacing: true,
      },
    ],
  },
};
