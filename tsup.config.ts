import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/lib/index.tsx'],
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react'],
  format: ['cjs', 'esm'],
  dts: true,
  target: 'es2020',
  outDir: 'pkg_dist'
})