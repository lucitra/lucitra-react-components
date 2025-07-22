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

## Resume System

This library includes a comprehensive resume builder with two layout options:

### Main Component

- **ResumeBuilder**: Complete resume builder with editing interface, live preview, and export capabilities

### Layout Options

1. **Three-Column Layout**: Skills, Education, and Patents in 3-column layout (default)
2. **Single-Column Layout**: Vertical layout optimized for single-page PDF output

### Data and Utilities

- **sampleResumeData**: Complete sample resume data for testing/demos
- **defaultResumeData**: Empty resume structure for new resumes

### Usage Examples

```jsx
import { ResumeBuilder, sampleResumeData } from '@lucitra/react-components';

// Full resume builder with editing and export
<ResumeBuilder 
  initialData={sampleResumeData}
  onDataChange={(data) => console.log('Data changed:', data)}
  onExport={(format, data) => console.log('Export:', format, data)}
  showControls={true}
  enableExport={true}
/>

// Minimal version without controls (for embedding)
<ResumeBuilder 
  initialData={sampleResumeData}
  showControls={false}
  enableExport={false}
/>
```

### PDF Printing - All Layout Options

**The Resume components support three layout options, all optimized for PDF printing:**

1. **Three-Column Layout** (default)
```jsx
<Resume data={resumeData} config={{ printMode: true }} />
// Or via ResumeBuilder: Select "Three Column" in layout dropdown + "Export PDF"
```

2. **Single-Column Layout** (original)
```jsx
<Resume data={resumeData} config={{ printMode: true, singleColumn: true }} />
// Or via ResumeBuilder: Select "Single Column" in layout dropdown + "Export PDF"
```

3. **Single-Column Layout** (new/improved)
```jsx
<Resume data={resumeData} config={{ printMode: true, singleColumn: 'new' }} />
// Or via ResumeBuilder: Select "Single Column (New)" in layout dropdown + "Export PDF"
```

### ResumeBuilder PDF Controls

The ResumeBuilder provides a unified interface to print all layout versions:

1. **Layout Selector**: Choose between "Three Column", "Single Column", or "Single Column (New)"
2. **Print Mode Toggle**: Enable/disable print-optimized styling
3. **Max Work Items**: Limit work experience (3-5 items recommended for single page)
4. **Export PDF Button**: Uses browser print dialog with optimized settings

**How to Print:**
1. Open ResumeBuilder in Storybook
2. Select desired layout from dropdown
3. Toggle "Print Mode ON" for optimal spacing
4. Set "Max Work Items" to 3-4 for single page
5. Click "Export PDF" button
6. Use browser print dialog to save as PDF

**All layouts use the same print controls and settings for consistency.**

### Typography System - Simplified & Consistent

**Only 4 Font Sizes Used:**
- **Name**: 16pt (uppercase, bold, black)
- **Section Headers**: 12pt (SKILLS, EDUCATION - uppercase, bold, black)
- **All Body Text**: 11pt (black - emphasis via bold/italic)
- **Contact Info**: 9pt (black)

**Text Emphasis (same font size, different styling):**
- **Company Names**: 11pt + **Bold**
- **Job Titles**: 11pt + *Italic*
- **Dates & Locations**: 11pt + *Italic*
- **Education**: Shows "Graduated [Year]" instead of date ranges
- **Descriptions**: 11pt + Regular
- **All text is pure black (#000000)**

This creates a clean, professional hierarchy using minimal font sizes with strategic emphasis.

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