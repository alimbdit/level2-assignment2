import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import ts from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';

const jsRules = pluginJs.configs.recommended.rules;
const tsRules = ts.configs.recommended.rules;
const prettierRules = prettier.rules;

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ['**/*.env/', '**/dist/', '**/node_modules/'],
  },
  {
    files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
  },
  // {
  //   extends: [
  //     'eslint:recommended',
  //     'plugin:@typescript-eslint/recommended',
  //     'prettier',
  //   ],
  // },
  {
    languageOptions: {
      parser: parser,
      globals: {
        ...globals.browser,
        process: 'readonly',
      },
    },
  },
  {
    plugins: {
      '@typescript-eslint': ts,
    },
  },
  {
    rules: {
      ...jsRules,
      ...tsRules,
      ...prettierRules,
      'no-unused-vars': 'error',
      'no-undef': 'error',
      'no-unused-expressions': 'error',
      'prefer-const': 'error',
      'no-console': 'warn',
    },
  },
];
