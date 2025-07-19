export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature
        'fix',      // Bug fix
        'docs',     // Documentation changes
        'style',    // Code style changes (formatting, etc.)
        'refactor', // Code refactoring
        'perf',     // Performance improvements
        'test',     // Test additions or modifications
        'build',    // Build system changes
        'ci',       // CI configuration changes
        'chore',    // Other changes that don't modify src or test files
        'revert'    // Revert previous commit
      ]
    ],
    'subject-case': [0],  // Disabled - too restrictive for filenames and proper nouns
    'subject-full-stop': [2, 'never', '.'],
    'subject-max-length': [2, 'always', 100],
    'header-max-length': [2, 'always', 100],
    'body-max-line-length': [2, 'always', 200]
  }
}