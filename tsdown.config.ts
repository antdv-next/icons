import { defineConfig } from 'tsdown'

export default defineConfig({
  fromVite: true,
  dts: true,
  format: 'es',
  tsconfig: './tsconfig.app.json',
  entry: [
    'src/index.ts',
    'src/icons/index.tsx',
  ],
  external: [
    'vue',
  ],
  outExtensions() {
    return {
      'js': '.js',
      'dts': '.d.ts',
    }
  },
  unbundle: true,
  skipNodeModulesBundle: true,
})
