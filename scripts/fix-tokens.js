#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tokensPath = path.join(__dirname, '..', 'src', 'styles', 'tokens.css');

// Read the current tokens file
let content = fs.readFileSync(tokensPath, 'utf8');

// Fix 1: Add px to spacing-unit values
content = content.replace(/--spacing-unit-([^:]+):\s*(\d+(?:\.\d+)?);/g, '--spacing-unit-$1: $2px;');

// Fix 2: Remove px from var() references that already have px outside
content = content.replace(/var\(--spacing-unit-[^)]+\)px/g, (match) => {
  return match.replace(')px', ')');
});

// Fix 3: Fix font sizes that use spacing units
content = content.replace(/--font-size-([^:]+):\s*var\(--spacing-unit-[^)]+\);/g, (match) => {
  return match; // Keep as is, the unit values now have px
});

// Write the fixed content back
fs.writeFileSync(tokensPath, content);

console.log('✅ Fixed spacing units in tokens.css');
console.log('✅ All spacing-unit values now have px units');
console.log('✅ Removed redundant px from var() references');