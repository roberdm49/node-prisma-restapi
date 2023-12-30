module.exports = {
  extends: ['./node_modules/ts-standard/eslintrc.json'],
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    // TODO: find a better whay to handle the async methods on express functions (get, post, etc)
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off'
  }
}
