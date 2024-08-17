import eslint from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import tsEslint from 'typescript-eslint'

export default tsEslint.config(
    {
        ignores: ['**/*.*', '!src/**/*.*', '!types/**/*.*'],
    },

    eslint.configs.recommended,

    ...tsEslint.configs.strictTypeChecked,
    ...tsEslint.configs.stylisticTypeChecked,
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
            '@typescript-eslint/explicit-module-boundary-types': 'error',
            '@typescript-eslint/switch-exhaustiveness-check': 'error',
            '@typescript-eslint/restrict-template-expressions': 'off',
            '@typescript-eslint/no-misused-promises': [
                'error',
                {
                    checksVoidReturn: false,
                },
            ],
            '@typescript-eslint/no-empty-object-type': 'off',
            '@typescript-eslint/dot-notation': [
                'error',
                {
                    allowPrivateClassPropertyAccess: true,
                },
            ],
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    varsIgnorePattern: '^_',
                },
            ],
        },
    },

    eslintConfigPrettier,
)
