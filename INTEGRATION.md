# Integration Strategy - Drop-in Replacements

This document outlines the strategy for building components in isolation and integrating them as drop-in replacements for existing template markup.

## Development Workflow

### 1. Isolated Development
- Build and test components in this library using Storybook
- Ensure components work standalone without template dependencies
- Verify accessibility, theming, and i18n functionality

### 2. Component Testing
- Unit tests for all component functionality
- Visual regression tests via Storybook
- Accessibility testing with axe-core
- Cross-browser compatibility testing

### 3. Integration Testing
- Test components with actual template data
- Verify drop-in replacement compatibility
- Ensure styling matches existing design
- Test with real i18n configurations

### 4. Template Integration
- Replace existing components one-by-one
- Maintain backward compatibility
- Update import statements
- Verify no breaking changes

## Drop-in Replacement Requirements

### Current Template Components to Replace

#### 1. LanguageSwitcher
**Current Location:** `/src/components/molecules/LanguageSwitcher.jsx`

**Current Props:**
- No props (hardcoded configuration)
- Uses `useTranslation()` hook directly
- Hardcoded styling

**Replacement Requirements:**
```jsx
// Current usage in template
<LanguageSwitcher />

// Should become (with backward compatibility)
<LanguageSwitcher />

// Or with new enhanced API
<LanguageSwitcher
  currentLanguage={i18n.language}
  onLanguageChange={(lang) => i18n.changeLanguage(lang)}
  useI18next={true}
  i18nInstance={i18n}
/>
```

#### 2. RegionSwitcher
**Current Location:** `/src/components/molecules/RegionSwitcher.jsx`

**Current Props:**
- No props (hardcoded configuration)
- Direct DOM manipulation for RTL
- Hardcoded regions list

**Replacement Requirements:**
```jsx
// Current usage in template
<RegionSwitcher />

// Should become (with backward compatibility)
<RegionSwitcher />

// Or with new enhanced API
<RegionSwitcher
  syncWithLanguage={true}
  updateDocumentDirection={true}
  useI18next={true}
  i18nInstance={i18n}
/>
```

## Integration Steps

### Phase 1: Component Library Setup ✅
- [x] Create component library structure
- [x] Extract components with enhanced APIs
- [x] Set up build configuration
- [x] Initialize git repository

### Phase 2: Development Environment
- [ ] Set up Storybook for isolated development
- [ ] Configure testing with Vitest
- [ ] Set up build pipeline
- [ ] Create development scripts

### Phase 3: Component Development
- [ ] Refine LanguageSwitcher component
- [ ] Refine RegionSwitcher component  
- [ ] Add comprehensive prop validation
- [ ] Implement backward compatibility layer

### Phase 4: Testing & Documentation
- [ ] Write unit tests for components
- [ ] Create Storybook stories
- [ ] Document all component APIs
- [ ] Test integration scenarios

### Phase 5: Template Integration
- [ ] Install component library in template
- [ ] Replace LanguageSwitcher component
- [ ] Replace RegionSwitcher component
- [ ] Update imports and usage
- [ ] Verify no breaking changes

### Phase 6: Publishing
- [ ] Publish to npm registry
- [ ] Tag stable release
- [ ] Update template to use published version
- [ ] Document integration guide

## Backward Compatibility Strategy

### Option 1: Wrapper Components
Create wrapper components that maintain the current API while using the new enhanced components internally:

```jsx
// In template: LanguageSwitcherCompat.jsx
import { LanguageSwitcher } from '@lucitra/react-components'
import { useTranslation } from 'react-i18next'

export default function LanguageSwitcherCompat() {
  const { i18n } = useTranslation()
  
  return (
    <LanguageSwitcher
      useI18next={true}
      i18nInstance={i18n}
      currentLanguage={i18n.language}
    />
  )
}
```

### Option 2: Enhanced Components with Defaults
Make the enhanced components work without props (using sensible defaults) so they're drop-in compatible:

```jsx
// Components work with no props (current API)
<LanguageSwitcher />

// But also support enhanced API
<LanguageSwitcher currentLanguage="en" onLanguageChange={handler} />
```

### Option 3: Progressive Migration
1. Install library alongside existing components
2. Gradually replace components in different pages/sections
3. Test each replacement thoroughly
4. Remove old components once all are replaced

## Testing Strategy

### Isolated Testing (Component Library)
```bash
# In component library
npm test                    # Unit tests
npm run storybook          # Visual testing
npm run build              # Build verification
npm run lint               # Code quality
```

### Integration Testing (Template)
```bash
# In template project
npm run dev                # Test in development
npm run build              # Test production build
npm run test               # Test component integration
```

### Cross-Project Testing
1. Link component library locally during development
2. Test changes in real template environment
3. Verify no regressions in existing functionality
4. Test with actual production data

## Success Criteria

### Component Library
- [ ] All components build successfully
- [ ] Storybook stories render correctly  
- [ ] Unit tests pass with good coverage
- [ ] No accessibility violations
- [ ] Components work with/without optional dependencies

### Template Integration
- [ ] Drop-in replacement works without code changes
- [ ] Visual appearance matches existing components
- [ ] Functionality identical to original components
- [ ] No performance regressions
- [ ] All existing tests continue to pass

### Publishing
- [ ] Package builds and publishes to npm
- [ ] Documentation is complete and accurate
- [ ] Examples work in fresh projects
- [ ] TypeScript definitions are correct

## Benefits of This Approach

1. **Risk Mitigation** - Build and test components in isolation first
2. **Quality Assurance** - Comprehensive testing before integration
3. **Reusability** - Components can be used across multiple projects
4. **Maintainability** - Centralized component development and updates
5. **Documentation** - Better documentation through Storybook
6. **TypeScript Support** - Enhanced developer experience
7. **Backward Compatibility** - Existing templates continue to work