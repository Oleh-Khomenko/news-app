import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import checkerPlugin from 'vite-plugin-checker';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import eslintPlugin from 'vite-plugin-eslint';
import stylelint from 'vite-plugin-stylelint';
import svgLoader from 'vite-svg-loader';

const plugins = [
  vue(),
  svgLoader(),
  eslintPlugin({ failOnWarning: true }),
  checkerPlugin({
    typescript: true,
    vueTsc: { tsconfigPath: 'tsconfig.app.json' },
  }),
  stylelint({
    emitError: true,
    fix: false,
    cache: true,
    include: 'src/**/*.{vue,css,scss}',
    lintInWorker: true,
  }),
];

// https://vite.dev/config/
export default defineConfig({
  build: {
    minify: 'esbuild',
  },
  plugins,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
