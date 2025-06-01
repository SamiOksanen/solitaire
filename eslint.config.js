import { defineConfig, globalIgnores } from 'eslint/config'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import prettier from 'eslint-plugin-prettier'
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths'
import tsParser from '@typescript-eslint/parser'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
})

export default defineConfig([
    globalIgnores(['**/next.config.js', '**/postcss.config.js']),
    {
        extends: compat.extends(
            'next/core-web-vitals',
            'eslint:recommended',
            'plugin:@typescript-eslint/recommended',
            'plugin:@typescript-eslint/recommended-requiring-type-checking',
            'plugin:prettier/recommended'
        ),

        plugins: {
            '@typescript-eslint': typescriptEslint,
            prettier,
            'no-relative-import-paths': noRelativeImportPaths,
        },

        languageOptions: {
            parser: tsParser,
            ecmaVersion: 5,
            sourceType: 'script',

            parserOptions: { project: 'tsconfig.json' },
        },

        rules: {
            'prettier/prettier': ['error', { semi: false }],

            '@typescript-eslint/require-await': 'off',

            'no-relative-import-paths/no-relative-import-paths': [
                'error',
                { allowSameFolder: false },
            ],

            'import/order': [
                'error',
                {
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        'parent',
                        'sibling',
                        'index',
                    ],
                    'newlines-between': 'never',
                },
            ],

            'no-restricted-imports': [
                'error',
                { patterns: ['.*', '..*', '@/*'] },
            ],
        },
    },
])
