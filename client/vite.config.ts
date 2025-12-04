import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import path from 'path';

import tsconfig from './tsconfig.json';

const SRC_PATH = path.resolve(__dirname, 'src');

const parseTsConfigPaths = (paths: Record<string, string[]>): Record<string, string> => {
  const webpackConfigAliases: Record<string, string> = {};

  Object.entries(paths).forEach(([alias, paths]) => {
    const aliasPath = paths[0].replace(/[^a-zA-Z]/g, '');

    webpackConfigAliases[alias] = path.join(SRC_PATH, aliasPath);
  });

  return webpackConfigAliases;
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
	// test: {
  //   environment: "jsdom",           // нужно для DOM в тестах
  //   globals: true,                  // чтобы можно было писать describe/it/expect без импорта
  //   setupFiles: "./src/setupTests.ts", // файл, который подключается перед тестами
  // },
// @ts-ignore 
	test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/tests/**']
    },
  },
  resolve: {
    alias: parseTsConfigPaths(tsconfig.compilerOptions.paths),
  },

})