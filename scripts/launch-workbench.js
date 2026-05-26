#!/usr/bin/env node
/**
 * Launch the Bodha Workbench GUI (standalone Vite app in sitemaster/seomaster/gui).
 * Supports both `npm run workbench` and the legacy `npm run seo:manager` alias.
 */

import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const guiDir = path.resolve(__dirname, '../sitemaster/seomaster/gui');

console.log('Starting Bodha Workbench...');
console.log(`GUI directory: ${guiDir}`);

const child = spawn('npx', ['vite', '--config', 'vite.config.ts'], {
  cwd: guiDir,
  stdio: 'inherit',
  shell: process.platform === 'win32'
});

child.on('exit', (code) => {
  process.exit(code ?? 0);
});
