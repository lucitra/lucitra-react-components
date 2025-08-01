# Changelog

## [0.25.1](https://github.com/lucitra/lucitra-react-components/compare/react-components-v0.25.0...react-components-v0.25.1) (2025-08-01)


### Miscellaneous Chores

* update package.json to use caret (^) for versioning of dependencies ([1cc4d03](https://github.com/lucitra/lucitra-react-components/commit/1cc4d03145d848e3d114a6800f6db71de2e9e4bd))

## [0.25.0](https://github.com/lucitra/lucitra-react-components/compare/react-components-v0.24.0...react-components-v0.25.0) (2025-08-01)


### Features

* add animation system and ui components from privacy-components ([c439024](https://github.com/lucitra/lucitra-react-components/commit/c439024eba20a1a098fe7e0cd2f9b575fe194564))


### Bug Fixes

* resolve build issues for v0.25.0 ([95251eb](https://github.com/lucitra/lucitra-react-components/commit/95251ebb830b3695fee2eb35b685e409ebe3cf91))
* update story imports for renamed components ([d9d1e02](https://github.com/lucitra/lucitra-react-components/commit/d9d1e029dde2bef55b23cdf0621713566156f029))

## [0.25.0] - 2024-08-01

### Added

- **Animation System**: Complete scroll-based animation components
  - `ScrollAnimationWrapper` - Trigger animations on scroll (fade, slide, scale, rotate, blur)
  - `ParallaxWrapper` - Create parallax depth effects
  - `LenisScrollProvider` - Smooth scrolling using Lenis library
  - `StickySection` - Pin elements during scroll with progress tracking
  - `ScrollProgress` - Visual scroll progress indicator
  - Animation hooks: `useScrollAnimation`, `useParallax`, `useScrollProgress`, `useStickyScroll`

- **UI Components**: Modular design system components from privacy-components
  - `ModularCard` - Flexible card component with variants
  - `ModularButton` - Button with multiple variants and states
  - `ModularBadge` - Badge/tag component
  - `AlertBox` - Alert/notification component
  - `ProgressBar` - Progress indicator with animations
  - `StatusIndicator` - Status display with color coding
  - `CodeBlock` - Code display component
  - `TabButton` - Tab navigation component

### Dependencies

- Added `lenis` v1.3.8 for smooth scrolling functionality

### Documentation

- Added comprehensive Storybook stories for animation components
- Updated component exports to include new additions

## [0.24.0] - Previous version

- Resume builder enhancements
- i18n improvements
- Design system updates
