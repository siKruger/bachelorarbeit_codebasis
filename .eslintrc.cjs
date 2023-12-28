/* eslint-env node */
module.exports = {
    extends: ['airbnb-base', 'airbnb-typescript/base', 'eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    parserOptions: {
        project: "./tsconfig.json"
    },
    rules: {
        "no-await-in-loop": 0,
        "no-restricted-syntax": 0,
    },
    root: true,
};