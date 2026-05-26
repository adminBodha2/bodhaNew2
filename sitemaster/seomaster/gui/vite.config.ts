import { svelte, vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const guiRoot = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  root: guiRoot,
  plugins: [
    svelte({
      preprocess: vitePreprocess({
        sass: {
          syntax: 'indented'
        }
      }),
      compilerOptions: {
        runes: true
      }
    })
  ],
  resolve: {
    alias: {
      '@seomaster': path.resolve(guiRoot, '../src')
    }
  },
  server: {
    port: 4777,
    strictPort: true,
    open: true
  }
});
