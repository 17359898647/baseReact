module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    // 'eslint:recommended',
    // 'plugin:@typescript-eslint/recommended',
    '@antfu',
    '@unocss',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react-refresh', 'react'],
  rules: {
    'react-refresh/only-export-components': 'off',
    'import/order': [
      'error',
      {
        'newlines-between': 'never',
        'alphabetize': {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    '@typescript-eslint/no-namespace': 'off',
    'vue/one-component-per-file': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/consistent-type-assertions': 0,
    'prefer-promise-reject-errors': 'off',
    'no-console': 'off',
    '@typescript-eslint/indent': 'off',
    'react/jsx-max-props-per-line': [1, { maximum: 1, when: 'always' }],
    'react/jsx-wrap-multilines': [1, {
      declaration: 'parens',
      assignment: 'parens',
      return: 'parens',
      arrow: 'parens',
      condition: 'ignore',
      logical: 'ignore',
      prop: 'ignore',
    }],
    'react/jsx-sort-props': [
      1,
      {
        callbacksLast: true,
        shorthandFirst: true,
        shorthandLast: false,
        ignoreCase: false,
        noSortAlphabetically: false,
        reservedFirst: true,
      },
    ],
    'react-hooks/rules-of-hooks': false,
  },
}
