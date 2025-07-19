# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Lucitra React Components - A comprehensive React component library built with Mantine UI.

## Development Commands

```bash
# Install dependencies
npm install

# Start Storybook development server
npm run storybook

# Build component library
npm run build

# Run tests
npm test

# Lint code
npm run lint
```

## Commit Message Guidelines

**IMPORTANT**: All commit messages MUST follow these rules:

### Format
```
<type>: <subject>
```

### Rules
1. **Type**: Must be one of: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`
2. **Subject**: 
   - **MUST be all lowercase** (except proper nouns like React, GitHub, Mantine, etc.)
   - No period at the end
   - Max 100 characters
   - Imperative mood ("add" not "adds" or "added")

### Examples
✅ **Correct:**
```
feat: add new button component
fix: resolve tooltip positioning issue
docs: update component api documentation
refactor: simplify modal component logic
```

❌ **Incorrect:**
```
feat: Add new Button component     # Wrong: Capital 'A' and 'B'
fix: resolved tooltip issue.       # Wrong: Past tense and period
docs: Update README               # Wrong: Capital 'U'
```

## Important Notes

- Component library using Mantine UI
- Exports ES modules for tree-shaking
- Includes Storybook for component development
- Pre-commit hooks enforce linting and commit message format