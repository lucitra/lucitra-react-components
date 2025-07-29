/**
 * Token Usage Analyzer
 * Analyzes components and CSS files to identify hardcoded values that should use design tokens
 */

import fs from 'fs';
import path from 'path';

// Patterns to detect hardcoded values
const HARDCODED_PATTERNS = {
  colors: {
    hex: /#[0-9a-fA-F]{3,8}/g,
    rgb: /rgba?\([^)]+\)/g,
    hsl: /hsla?\([^)]+\)/g,
    named: /\b(red|blue|green|yellow|orange|purple|pink|gray|grey|black|white)\b/gi,
  },
  spacing: {
    pixels: /\b\d+px\b/g,
    rem: /\b\d+(\.\d+)?rem\b/g,
    em: /\b\d+(\.\d+)?em\b/g,
  },
  fonts: {
    fontSize: /font-size:\s*\d+/g,
    fontWeight: /font-weight:\s*\d+/g,
    fontFamily: /font-family:\s*[^;]+/g,
  },
  borders: {
    radius: /border-radius:\s*\d+/g,
    width: /border(-\w+)?:\s*\d+px/g,
  },
};

// Token mappings for suggestions
const TOKEN_SUGGESTIONS = {
  colors: {
    '#0056b3': 'var(--color-blue-600)',
    '#004494': 'var(--color-blue-700)',
    '#dc3545': 'var(--color-red-500)',
    '#28a745': 'var(--color-green-500)',
    '#ffc107': 'var(--color-yellow-500)',
    '#17a2b8': 'var(--color-cyan-500)',
    'rgba(0, 0, 0, 0.1)': 'var(--color-overlay-10)',
    'white': 'var(--color-primary-White)',
    'black': 'var(--color-primary-Black)',
  },
  spacing: {
    '4px': 'var(--spacing-8xs)',
    '8px': 'var(--spacing-7xs)',
    '12px': 'var(--spacing-6xs)',
    '16px': 'var(--spacing-md)',
    '24px': 'var(--spacing-lg)',
    '32px': 'var(--spacing-xl)',
    '48px': 'var(--spacing-2xl)',
    '64px': 'var(--spacing-3xl)',
  },
  fontSize: {
    '12px': 'var(--font-size-4xs)',
    '14px': 'var(--font-size-3xs)',
    '16px': 'var(--font-size-2xs)',
    '18px': 'var(--font-size-xs)',
    '20px': 'var(--font-size-sm)',
    '24px': 'var(--font-size-md)',
  },
  fontWeight: {
    '400': 'var(--font-weight-regular)',
    '500': 'var(--font-weight-medium)',
    '600': 'var(--font-weight-semi-bold)',
    '700': 'var(--font-weight-bold)',
  },
  borderRadius: {
    '2px': 'var(--radius-xs)',
    '4px': 'var(--radius-sm)',
    '8px': 'var(--radius-md)',
    '16px': 'var(--radius-lg)',
    '24px': 'var(--radius-xl)',
  },
};

/**
 * Get token suggestion based on category and value
 * @param {string} category - The category (colors, spacing, etc.)
 * @param {string} type - The type within category
 * @param {string} value - The hardcoded value
 * @returns {string} Suggested token or generic message
 */
function getSuggestion(category, type, value) {
  const categoryMap = {
    colors: TOKEN_SUGGESTIONS.colors,
    spacing: TOKEN_SUGGESTIONS.spacing,
    fonts: type === 'fontSize' ? TOKEN_SUGGESTIONS.fontSize : TOKEN_SUGGESTIONS.fontWeight,
    borders: type === 'radius' ? TOKEN_SUGGESTIONS.borderRadius : TOKEN_SUGGESTIONS.spacing,
  };
  
  const suggestionMap = categoryMap[category];
  if (suggestionMap) {
    const suggestion = suggestionMap[value.toLowerCase()] || suggestionMap[value];
    if (suggestion) return suggestion;
  }
  
  return `Use ${category} token`;
}

/**
 * Analyze a single file for hardcoded values
 * @param {string} filePath - Path to the file
 * @returns {Object} Analysis results
 */
export function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const findings = [];
  const fileExt = path.extname(filePath);
  
  // Skip non-style files
  if (!['.css', '.scss', '.less', '.jsx', '.tsx', '.js', '.ts'].includes(fileExt)) {
    return { filePath, findings };
  }
  
  // Check for inline styles in JS/JSX/TS/TSX files
  if (['.jsx', '.tsx', '.js', '.ts'].includes(fileExt)) {
    const inlineStylePattern = /style\s*=\s*\{?\{([^}]+)\}?\}/g;
    let match;
    
    while ((match = inlineStylePattern.exec(content)) !== null) {
      const styleContent = match[1];
      const lineNumber = content.substring(0, match.index).split('\n').length;
      
      // Check for hardcoded values in inline styles
      Object.entries(HARDCODED_PATTERNS).forEach(([category, patterns]) => {
        Object.entries(patterns).forEach(([type, pattern]) => {
          const matches = styleContent.match(pattern);
          if (matches) {
            matches.forEach(value => {
              const suggestion = getSuggestion(category, type, value);
              findings.push({
                line: lineNumber,
                type: `${category}-${type}`,
                value,
                suggestion,
                context: match[0].substring(0, 100) + '...',
              });
            });
          }
        });
      });
    }
  }
  
  // Check CSS files and style blocks
  if (['.css', '.scss', '.less'].includes(fileExt) || content.includes('<style')) {
    const lines = content.split('\n');
    
    lines.forEach((line, index) => {
      Object.entries(HARDCODED_PATTERNS).forEach(([category, patterns]) => {
        Object.entries(patterns).forEach(([type, pattern]) => {
          const matches = line.match(pattern);
          if (matches) {
            matches.forEach(value => {
              // Skip values that are already using CSS variables
              if (!line.includes('var(--')) {
                const suggestion = getSuggestion(category, type, value);
                findings.push({
                  line: index + 1,
                  type: `${category}-${type}`,
                  value,
                  suggestion,
                  context: line.trim(),
                });
              }
            });
          }
        });
      });
    });
  }
  
  return { filePath, findings };
}

/**
 * Analyze a directory recursively
 * @param {string} dirPath - Directory path
 * @param {Array} excludePaths - Paths to exclude
 * @returns {Array} Analysis results for all files
 */
export function analyzeDirectory(dirPath, excludePaths = []) {
  const results = [];
  
  function walkDir(currentPath) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);
      
      // Skip excluded paths
      if (excludePaths.some(exclude => fullPath.includes(exclude))) {
        continue;
      }
      
      if (entry.isDirectory()) {
        // Skip common directories to ignore
        if (['node_modules', 'dist', 'build', '.git', 'coverage'].includes(entry.name)) {
          continue;
        }
        walkDir(fullPath);
      } else if (entry.isFile()) {
        const result = analyzeFile(fullPath);
        if (result.findings.length > 0) {
          results.push(result);
        }
      }
    }
  }
  
  walkDir(dirPath);
  return results;
}

/**
 * Generate a report from analysis results
 * @param {Array} results - Analysis results
 * @returns {string} Formatted report
 */
export function generateReport(results) {
  let report = '# Design Token Usage Analysis Report\n\n';
  
  // Summary
  const totalFindings = results.reduce((sum, r) => sum + r.findings.length, 0);
  const findingsByType = {};
  
  results.forEach(result => {
    result.findings.forEach(finding => {
      findingsByType[finding.type] = (findingsByType[finding.type] || 0) + 1;
    });
  });
  
  report += `## Summary\n`;
  report += `- Total files with hardcoded values: ${results.length}\n`;
  report += `- Total hardcoded values found: ${totalFindings}\n\n`;
  
  report += `### Findings by Type\n`;
  Object.entries(findingsByType)
    .sort(([, a], [, b]) => b - a)
    .forEach(([type, count]) => {
      report += `- ${type}: ${count}\n`;
    });
  
  report += '\n## Detailed Findings\n\n';
  
  // Detailed findings by file
  results.forEach(({ filePath, findings }) => {
    report += `### ${filePath}\n\n`;
    
    findings.forEach(finding => {
      report += `- **Line ${finding.line}**: ${finding.type}\n`;
      report += `  - Value: \`${finding.value}\`\n`;
      report += `  - Suggestion: \`${finding.suggestion}\`\n`;
      report += `  - Context: \`${finding.context}\`\n\n`;
    });
  });
  
  // Recommendations
  report += `## Recommendations\n\n`;
  report += `1. Replace all hardcoded color values with design tokens\n`;
  report += `2. Use spacing tokens for consistent spacing throughout the app\n`;
  report += `3. Leverage typography tokens for font properties\n`;
  report += `4. Update border radius values to use radius tokens\n`;
  report += `5. Consider creating additional tokens for frequently used values\n\n`;
  
  report += `## Next Steps\n\n`;
  report += `1. Review the findings above\n`;
  report += `2. Update components to use design tokens\n`;
  report += `3. Run this analyzer again to verify changes\n`;
  report += `4. Add linting rules to prevent future hardcoded values\n`;
  
  return report;
}

/**
 * CLI interface for the analyzer
 */
export function runAnalyzer(targetPath, options = {}) {
  console.log('🔍 Analyzing design token usage...\n');
  
  const excludePaths = options.exclude || [];
  const outputPath = options.output || './token-analysis-report.md';
  
  try {
    const stats = fs.statSync(targetPath);
    let results = [];
    
    if (stats.isDirectory()) {
      results = analyzeDirectory(targetPath, excludePaths);
    } else if (stats.isFile()) {
      const result = analyzeFile(targetPath);
      if (result.findings.length > 0) {
        results = [result];
      }
    }
    
    if (results.length === 0) {
      console.log('✅ No hardcoded values found! All files are using design tokens properly.');
      return;
    }
    
    const report = generateReport(results);
    
    // Write report to file
    fs.writeFileSync(outputPath, report);
    console.log(`📄 Report generated: ${outputPath}`);
    
    // Print summary to console
    const totalFindings = results.reduce((sum, r) => sum + r.findings.length, 0);
    console.log(`\n📊 Summary:`);
    console.log(`   - Files with issues: ${results.length}`);
    console.log(`   - Total issues: ${totalFindings}`);
    console.log(`\n💡 Run 'cat ${outputPath}' to see the full report`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Export for use as a module
export default {
  analyzeFile,
  analyzeDirectory,
  generateReport,
  runAnalyzer,
};