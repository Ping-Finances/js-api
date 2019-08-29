module.exports = {
    'parser': '@typescript-eslint/parser',
    'plugins': ['@typescript-eslint/eslint-plugin'],
    'extends': [
        'airbnb-typescript/base',
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended'
    ],
    'parserOptions': {
        'ecmaVersion': 6,
        'sourceType': 'module'
    },
    'env': {
        'node': true,
        'es6': true
    },
    'rules': {
        'comma-dangle': ['off'],
        'class-methods-use-this': 'warn',
        'import/prefer-default-emport': 0,
        '@typescript-eslint/indent': ['error', 4],
        'quotes': ['error', 'single', { 'allowTemplateLiterals': true }]
    }
}