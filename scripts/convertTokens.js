#!/usr/bin/env node

/**
 * Script to convert design tokens from JSON to CSS
 * Usage: node scripts/convertTokens.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { 
  generateCSSFromTokens, 
  generateTypographyUtilities 
} from '../src/utils/tokenConverter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read the JSON tokens file
const tokensPath = '/Users/ibraheem/Downloads/iLoveMerge.json';
const outputCSSPath = path.join(__dirname, '../src/styles/tokens.css');
const outputUtilitiesPath = path.join(__dirname, '../src/styles/typography-utilities.css');

try {
  // Read and parse the JSON tokens
  const tokensJSON = fs.readFileSync(tokensPath, 'utf8');
  const tokens = JSON.parse(tokensJSON);

  // Generate CSS from tokens
  const cssContent = generateCSSFromTokens(tokens);
  
  // Generate typography utilities
  const utilitiesContent = generateTypographyUtilities(tokens);

  // Write the CSS files
  fs.writeFileSync(outputCSSPath, cssContent);
  fs.writeFileSync(outputUtilitiesPath, utilitiesContent);

  console.log('✅ Successfully converted tokens to CSS!');
  console.log(`📄 Main tokens: ${outputCSSPath}`);
  console.log(`📄 Typography utilities: ${outputUtilitiesPath}`);

} catch (error) {
  console.error('❌ Error converting tokens:', error);
  process.exit(1);
}