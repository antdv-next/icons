import type { Linter } from 'eslint'
import antfu from '@antfu/eslint-config'

const config = antfu(
  {
    markdown: false,
    // formatters: fa
    pnpm: true,
    rules: {
      'jsdoc/empty-tags': 0,
      'node/prefer-global/process': 0,
      'regexp/no-unused-capturing-group': 0,
      'no-template-curly-in-string': 0,
      'vue/no-template-shadow': 0,
      'vue/one-component-per-file': 0,
      'style/quote-props': 0,
    },
    ignores: [
      'src/icons/**/*',
    ],
  },
) as Linter.Config

export default config
