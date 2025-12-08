import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import postgresql from 'eslint-plugin-postgresql';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  { ignores: ['dist', 'build', 'node_modules'] },

  {
    files: ['**/*.{ts,tsx}'],

    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },

    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },

    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended[1].rules,

      'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					args: 'after-used',
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					caughtErrors: 'all',
					caughtErrorsIgnorePattern: '^_',
					ignoreRestSiblings: true,
				},
			],

			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': true }],
    },
  },
	{
    files: ['**/*.sql'], // путь под себя, можно '**/*.sql'

    // рекомендуемый конфиг плагина
    ...postgresql.configs.recommended,

    // если хочешь явную настройку — так:
    languageOptions: {
      parser: postgresql.configs.recommended.languageOptions.parser,
    },
    plugins: {
      postgresql,
    },
    rules: {
      'postgresql/no-syntax-error': 'warn',
      'postgresql/require-limit': 'warn',
    },
  },
]);
