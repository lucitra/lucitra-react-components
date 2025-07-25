# Font Size Analysis Report

## Summary
This analysis identifies font size inconsistencies across all Resume components in the lucitra-react-components project.

## Design System Font Sizes (from resumeStyles.js)

### Typography Scale:
1. **nameText**: 
   - Print: 16pt
   - Screen: 20px

2. **headerText** (section headers):
   - Print: 12pt
   - Screen: 14px

3. **bodyText** (main content):
   - Print: 11pt
   - Screen: 12px

4. **smallText** (contact info only):
   - Print: 9pt
   - Screen: 10px

## Inconsistencies Found

### 1. ResumeThreeColumn.jsx
- **Line 49**: `.skills-category-title` uses hardcoded `10pt/10px` instead of design system
- Should likely use `bodyText` (11pt/12px) or `smallText` (9pt/10px) from design system

### 2. ResumeBuilder.jsx (Multiple inline styles)
- Line 338: `font-size: 11px` in print styles
- Line 350: `font-size: 8pt` in print styles (smaller than smallText)
- Line 565: `font-size: 24px` (larger than any design system size)
- Line 589, 648, 663, 711, 719: `font-size: 14px` (matches headerText screen size)
- Line 731: `font-size: 18px` (between headerText and nameText)
- Line 796: `font-size: 20px` (matches nameText screen size)
- Line 839: `font-size: 16px` (between headerText and nameText)
- Line 844, 857: `font-size: 12px` (matches bodyText screen size)
- Line 1059, 1413, 1425, 1438, 1449: `font-size: 13px` (not in design system)
- Line 1325, 1356: `fontSize: "14px"` (matches headerText screen size)
- Line 1409: `fontSize: '16px'` (between headerText and nameText)
- Line 1459: `fontSize: '12px'` (matches bodyText screen size)
- Line 1471: `fontSize: '11px'` (close to bodyText but not exact)

### 3. Other Components with Inline Styles

#### AIAssistant.jsx
- Line 357: `fontSize: '14px'` (matches headerText screen)
- Line 437: `fontSize: '12px'` (matches bodyText screen)

#### EducationEditor.jsx & WorkExperienceEditor.jsx
- Both use `fontSize: '14px'` for labels (matches headerText screen)

#### ATSDevTools.jsx
- Line 606, 617: `fontSize: '14px'` for headers (matches headerText screen)

#### AISettings.jsx
- Line 429: `fontSize: '16px'` (not in design system)

#### AITextOptimizer.jsx
- Line 269, 605: `fontSize: '12px'` (matches bodyText screen)
- Line 545: `fontSize: '11px'` (close to bodyText but not exact)

#### VersionDiffViewer.jsx
- Lines 509, 529, 548: `fontSize: '13px'` (not in design system)

#### ATSScoreCard.jsx
- Line 496: `fontSize: '24px'` (larger than any design system size)

## Recommendations

1. **Standardize on Design System**: Replace all hardcoded font sizes with references to `resumeDesignSystem.typography`

2. **New Size Needed**: Consider adding a size between bodyText (12px) and headerText (14px) for the frequently used 13px

3. **Print Mode Consistency**: Ensure all print mode sizes use pt units consistently

4. **Component-Specific Sizes**: For UI elements outside the resume content (like modals, settings), consider creating a separate UI typography scale

5. **Remove Inline Styles**: Move all inline font-size declarations to styled components or CSS classes that reference the design system

## Most Critical Issues
1. **ResumeThreeColumn.jsx line 49**: Hardcoded size doesn't match design system
2. **ResumeBuilder.jsx**: Multiple inconsistent inline styles throughout
3. **13px usage**: Frequently used but not defined in design system
4. **Large sizes (24px, 18px, 16px)**: Used for UI elements but not defined in design system