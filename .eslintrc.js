const rules = {
  'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
}

const parserOptions = {
  ecmaVersion: 2020
}

const defaultExtends = [
  'plugin:vue/vue3-recommended',
  'eslint:recommended',
  '@vue/prettier'
]

module.exports = {
  root: true,
  env: {
    node: true
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
      extends: [
        ...defaultExtends,
        '@vue/typescript/recommended',
        '@vue/prettier/@typescript-eslint'
      ],
      rules: {
        ...rules,
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off'
      },
      parserOptions
    },
    {
      files: ['**/*.js', '**/*.mjs', '**/*.jsx'],
      extends: defaultExtends,
      rules,
      parserOptions
    }
  ]
}
