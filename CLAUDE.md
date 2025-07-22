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
- **AI-Powered Optimization**: Granular AI suggestions for any text field with context-aware recommendations
- **Export Options**: JSON and PDF export functionality  
- **Print Optimization**: Single-page PDF-ready layouts
- **Responsive Design**: Works on desktop and mobile
- **Customizable**: Flexible configuration options
- **Professional Layout**: Based on modern resume standards

### AI Enhancement System

The resume builder includes a comprehensive AI optimization system:

#### Granular Text Optimization
- **Any Text Field**: Hover over any input field and click ✨ AI for smart suggestions
- **Context-Aware**: Provide job descriptions and target roles for tailored optimizations
- **Field-Specific Goals**: Different optimization strategies based on field type:
  - **Job Titles**: Impact, Technical Focus, Senior Role, Startup Ready
  - **Bullet Points**: Add Metrics, Show Impact, Strong Action Verbs, Technical Detail, Leadership
  - **Summary**: Executive Level, Technical Expert, Versatile Leader, Industry Expert
  - **Skills**: Trending Tech, Comprehensive, Specialized
  - **General**: Professional, Concise, Detailed, Impact-Focused

#### AI Components
- **AITextInput**: Smart wrapper for any input field with AI optimization
- **AITextOptimizer**: Standalone AI optimizer with contextual suggestions
- **AIAssistant**: High-level document optimization and cover letter generation

#### Usage Example
```jsx
import { AITextInput } from '@lucitra/react-components';

<AITextInput
  value={text}
  onChange={handleChange}
  fieldType="bullet-point"
  context={{ jobDescription: "..." }}
  userSubscription="free"
  remainingCredits={3}
  onUpgrade={handleUpgrade}
  onCreditUsed={handleCreditUsed}
/>
```

#### Business Model Integration
- **Freemium**: 3 AI optimizations per month free
- **Pro Subscription**: Unlimited AI optimizations
- **Context Optimization**: Job-specific suggestions based on provided context

### Version Control System

The resume builder includes comprehensive version control for tracking all changes, especially AI optimizations:

#### Features
- **Automatic Tracking**: Every AI optimization and manual edit is tracked
- **Undo/Redo**: Full undo/redo functionality with keyboard shortcuts (Ctrl+Z, Ctrl+Y)
- **Version History**: Complete history of all changes with timestamps
- **AI Change Detection**: Special tracking for AI-generated optimizations with confidence scores
- **Granular Reversion**: Click any version to revert instantly
- **Change Context**: Detailed information about what changed and why
- **Google Docs-Style Diff Viewer**: Click 👁️ on any version to see detailed before/after comparisons
- **Visual Change Tracking**: Color-coded additions, modifications, and deletions
- **AI Analysis Panel**: View confidence scores and reasoning for AI-generated changes

#### Change Types Tracked
- **AI Optimizations**: 🤖 AI suggestions applied to text fields
- **Manual Edits**: ✏️ User-made changes
- **Bullet Point Edits**: 🎯 Specific bullet point optimizations
- **Job Title Changes**: 💼 Job title optimizations
- **Summary Updates**: 📝 Professional summary changes
- **Bulk Operations**: 📊 Mass changes

#### Technical Implementation
```jsx
import { useResumeVersionControl } from '@lucitra/react-components';

const MyResumeBuilder = () => {
  const {
    currentData,
    versionHistory, 
    currentVersion,
    updateWithAI,
    updateManual,
    undo,
    redo,
    revertToVersion
  } = useResumeVersionControl(initialData);

  // Track AI optimizations
  const handleAIOptimization = (aiInfo) => {
    updateWithAI(newResumeData, {
      field: 'Job Title',
      originalValue: 'Developer',
      newValue: 'Senior Software Engineer',
      goal: 'impact',
      confidence: 92,
      reasoning: 'Added seniority and impact indicators',
      fieldType: 'job-title'
    });
  };

  return (
    <ResumeVersionControl
      versionHistory={versionHistory}
      currentVersion={currentVersion}
      onUndo={undo}
      onRedo={redo}
      onRevertToVersion={revertToVersion}
    />
  );
};
```

#### Data Flow & Architecture
The system uses a sophisticated field updating mechanism to ensure AI optimizations are properly applied:

1. **Field Path Resolution**: AI field names like "Microsoft - Job Title" are resolved to data paths like `work[0].positions[0].title`
2. **Direct Data Updates**: AI optimizations bypass normal form handling and directly update the resume data structure
3. **Version Tracking**: Every change is tracked with metadata (confidence, reasoning, goals)
4. **State Synchronization**: Version control system manages both data updates and UI re-rendering

```jsx
// Field updater resolves AI optimizations to precise data paths
const fieldInfo = getFieldPathWithContext('Microsoft - Bullet Point 1', resumeData);
// Returns: { path: 'work[0].positions[0].highlights[0]', context: {...} }

const updatedData = updateResumeField(resumeData, fieldInfo.path, newValue);
// Directly updates the nested data structure
```

#### Diff Viewer Interface
The version diff viewer provides Google Docs-style change tracking:

- **Summary Tab**: Overview of additions, modifications, and deletions with counts
- **Detailed Changes Tab**: Complete before/after comparison for every change
- **AI Analysis Tab**: AI confidence scores, optimization goals, and reasoning (for AI changes)
- **Color-Coded Changes**: 
  - 🟢 Green: Added content
  - 🟡 Yellow: Modified content  
  - 🔴 Red: Removed content
- **Interactive Actions**: View changes (👁️) or revert to version (↶) from any point

#### User Experience
```
Version History → Click 👁️ → See detailed diff → Understand changes → Decide to keep or revert
```

#### Benefits
- **Safe Experimentation**: Users can try AI suggestions without fear of losing work
- **Change Transparency**: Full visibility into what AI optimizations were applied
- **Professional Confidence**: Ability to revert any changes that don't feel right
- **Analytics Potential**: Track which AI optimizations are most commonly accepted/reverted
- **Reliable Updates**: Direct data structure updates ensure AI changes are always applied correctly
- **Professional Review Process**: Like Google Docs, see exactly what changed before accepting

## Important Notes

- Component library using Mantine UI
- Exports ES modules for tree-shaking
- Includes Storybook for component development
- Pre-commit hooks enforce linting and commit message format
- Resume components use JSON Resume standard with extensions