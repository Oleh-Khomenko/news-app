import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import checkerPlugin from 'vite-plugin-checker';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import eslintPlugin from 'vite-plugin-eslint';
import stylelint from 'vite-plugin-stylelint';
import svgLoader from 'vite-svg-loader';
import { visualizer } from 'rollup-plugin-visualizer';

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
  visualizer({
    filename: 'dist/stats.html',
    gzipSize: true,
    brotliSize: true,
  }),
];

// https://vite.dev/config/
export default defineConfig({
  build: {
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router'],
          'query-vendor': ['@tanstack/vue-query'],
        },
      },
    },
  },
  plugins,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
