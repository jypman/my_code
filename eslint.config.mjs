import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores(['node_modules/**', '.next/**', 'build/**', 'next-env.d.ts', '.vscode/**']),
  {
    rules: {
      'react-hooks/exhaustive-deps': 'off',
      'react/jsx-no-useless-fragment': 'warn',
      'import/no-duplicates': 'error',
      'jsx-a11y/alt-text': 'error',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'off',
        {
          argsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
]);

export default eslintConfig;
