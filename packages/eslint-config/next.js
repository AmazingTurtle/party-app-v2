import { defineConfig, globalIgnores } from 'eslint/config';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypeScript from 'eslint-config-next/typescript';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import unicorn from 'eslint-plugin-unicorn';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

const sourceFiles = ['**/*.{js,jsx,ts,tsx,mjs,mts,cjs,cts}'];
const typeScriptFiles = ['**/*.{ts,tsx,mts,cts}'];
const testFiles = [
  '**/*.{spec,test}.{ts,tsx}',
  '**/tests/**/*.{ts,tsx}',
  '**/test/**/*.{ts,tsx}',
];

export default defineConfig(
  globalIgnores([
    '.next/**',
    '.turbo/**',
    'coverage/**',
    'node_modules/**',
    'playwright-report/**',
    'public/sw.js',
    'test-results/**',
    'tsconfig.tsbuildinfo',
  ]),
  ...nextCoreWebVitals,
  ...nextTypeScript,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    files: sourceFiles,
    plugins: {
      'no-relative-import-paths': noRelativeImportPaths,
      unicorn,
      'unused-imports': unusedImports,
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          fixStyle: 'inline-type-imports',
          prefer: 'type-imports',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/prefer-readonly-parameter-types': 'off',
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowBoolean: true,
          allowNumber: true,
        },
      ],
      'no-console': [
        'error',
        {
          allow: ['error', 'warn'],
        },
      ],
      'no-relative-import-paths/no-relative-import-paths': [
        'error',
        {
          allowSameFolder: true,
        },
      ],
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'function-declaration',
        },
      ],
      'react/jsx-no-bind': [
        'error',
        {
          allowFunctions: true,
          ignoreRefs: true,
        },
      ],
      'unicorn/prefer-node-protocol': 'error',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          vars: 'all',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: typeScriptFiles,
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
  {
    files: testFiles,
    rules: {
      '@typescript-eslint/no-confusing-void-expression': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/unbound-method': 'off',
    },
  },
  {
    ...tseslint.configs.disableTypeChecked,
    files: ['**/*.{js,mjs,cjs}'],
  },
  prettierRecommended,
);
