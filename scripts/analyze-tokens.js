#!/usr/bin/env node

/**
 * CLI script to analyze design token usage in the codebase
 */

import { runAnalyzer } from '../src/utils/tokenAnalyzer.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Default to analyzing the src directory
const targetPath = process.argv[2] || path.join(__dirname, '..', 'src');

// Run the analyzer
runAnalyzer(targetPath, {
  exclude: ['node_modules', 'dist', 'build', '.storybook', 'stories'],
  output: path.join(__dirname, '..', 'token-analysis-report.md')
});