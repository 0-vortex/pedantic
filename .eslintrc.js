module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
  ],
  globals: {
    __PATH_PREFIX__: true,
    document: true,
  },
  ignorePatterns: [
    'dist/*',
    'build/*',
  ],
  env: {
    node: true,
    es2020: true,
    mocha: true,
  },
  rules: {
    // airbnb scope overrides
    'class-methods-use-this': 1,

    // prettier replacement rules
    'max-len': [2, 120, 2, {
      ignoreUrls: true,
      ignoreComments: false,
      comments: 300,
    }],
    'indent': [2, 2],
    'semi': [2, 'always'],
    'quotes': [2, 'single', {allowTemplateLiterals: true}],
    'comma-dangle': [2, 'always-multiline'],
    'arrow-parens': [2, 'as-needed'],
    'linebreak-style': 0,
    'array-bracket-spacing': [2, 'never'],
    'function-call-argument-newline': [2, 'consistent'],
    'function-paren-newline': [2, 'consistent'],
    'object-property-newline': 2,
    'no-param-reassign': 0,
    'consistent-return': 0,
    'no-restricted-globals': 0,
    'no-bitwise': [0, { "int32Hint": true }],

    // typescript safety
    'no-await-in-loop': 0,
    'import/prefer-default-export': 0,
    '@typescript-eslint/no-shadow': 1,
  },
};
