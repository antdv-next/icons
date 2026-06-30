import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { tsxResolveTypes } from 'vite-plugin-tsx-resolve-types'
import { defineProject } from 'vitest/config'

export default defineProject({
  plugins: [
    vue(),
    tsxResolveTypes(),
    vueJsx(),
  ],
  test: {
    include: [
      '**/tests/**/*.test.ts',
    ],
    environment: 'jsdom',
  },
})
