module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'prettier/@typescript-eslint',
    'prettier/standard',
    'prettier/react',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'import/extensions': [
      'error',
      {
        js: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'object-curly-newline': [
      'error',
      {
        ObjectPattern: {
          multiline: true,
        },
        ImportDeclaration: 'never',
        ExportDeclaration: {
          multiline: true,
        },
      },
    ],
    camelcase: ['off'],
    'class-methods-use-this': ['off'],
    '@typescript-eslint/no-var-requires': ['off'],
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    'max-len': ['error', { code: 120 }],
    'react/jsx-props-no-spreading': ['error', { html: 'ignore' }],
    'global-require': 'off',
    'newline-per-chained-call': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
    react: {
      version: 'detect',
    },
  },
};
