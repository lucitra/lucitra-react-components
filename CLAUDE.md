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

## Resume Components

This library includes a comprehensive resume system with editing and export capabilities:

### Available Components

- **Resume**: Display-only resume component with print optimization
- **ResumeBuilder**: Full-featured resume builder with editing interface
- **ResumeHeader**: Personal info and contact details section
- **ResumeSummary**: Professional summary section
- **ResumeThreeColumn**: Skills, Education, and Patents in 3-column layout
- **ResumeExperience**: Work experience with career progression support

### Data and Utilities

- **sampleResumeData**: Complete sample resume data for testing/demos
- **defaultResumeData**: Empty resume structure for new resumes

### Usage Examples

```jsx
import { ResumeBuilder, Resume, sampleResumeData } from '@lucitra/react-components';

// Full resume builder with editing
<ResumeBuilder 
  initialData={sampleResumeData}
  onDataChange={(data) => saveResume(data)}
  onExport={(format, data) => handleExport(format, data)}
  enableExport={true}
/>

// Display-only resume
<Resume 
  data={resumeData}
  config={{
    printMode: true,
    maxWorkItems: 4,
    filterByVisibility: true
  }}
/>
```

### Features

- **Live Editing**: Real-time preview while editing
- **Export Options**: JSON and PDF export functionality
- **Print Optimization**: Single-page PDF-ready layouts
- **Responsive Design**: Works on desktop and mobile
- **Customizable**: Flexible configuration options
- **Professional Layout**: Based on modern resume standards

## Important Notes

- Component library using Mantine UI
- Exports ES modules for tree-shaking
- Includes Storybook for component development
- Pre-commit hooks enforce linting and commit message format
- Resume components use JSON Resume standard with extensions