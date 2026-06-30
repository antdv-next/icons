import { defineConfig } from 'tsdown'

export default defineConfig({
  fromVite: true,
  dts: true,
  format: 'es',
  tsconfig: './tsconfig.app.json',
  entry: [
    'src/index.ts',
    'src/all.ts',
    'src/icons/index.tsx',
    'src/extra-icons/index.tsx',
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
