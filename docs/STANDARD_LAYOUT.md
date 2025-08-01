# Standard Layout System

The Standard Layout system provides a consistent page structure with precise padding, borders, and layout components for both @lucitra-react-components and @lucitra-privacy-components.

## Design Specifications

- **Padding**: 16px left/right, 12px top, 24px bottom
- **Border**: Grey border box around content area (optional)
- **Header**: Floating transparent navigation bar above content
- **Hero**: Video background support similar to thenewindustrials.com

## Components

### StandardPage

The main wrapper component that combines all layout elements.

```jsx
import { StandardPage } from '@lucitra/react-components';

<StandardPage
  header={{
    logo: <Logo />,
    navigationItems: [
      { label: 'Home', href: '#' },
      { label: 'About', href: '#' }
    ],
    actions: <Button>Sign In</Button>,
    transparent: true
  }}
  hero={{
    videoSrc: 'path/to/video.mp4',
    videoPoster: 'path/to/poster.jpg',
    title: 'Welcome',
    subtitle: 'Build amazing things',
    actions: <Button>Get Started</Button>
  }}
  showBorder={true}
>
  {/* Your page content */}
</StandardPage>
```

### StandardPageContainer

The container with consistent padding and optional border.

```jsx
import { StandardPageContainer } from '@lucitra/react-components';

<StandardPageContainer showBorder={true}>
  {/* Your content */}
</StandardPageContainer>
```

### StandardHeader

Floating header with logo, navigation, and actions.

```jsx
import { StandardHeader } from '@lucitra/react-components';

<StandardHeader
  logo={<Logo />}
  navigationItems={[
    { label: 'Home', href: '#' },
    { label: 'Products', href: '#' }
  ]}
  actions={<Button>Sign In</Button>}
  transparent={true}
/>
```

### StandardHeroSection

Hero section with video background support.

```jsx
import { StandardHeroSection } from '@lucitra/react-components';

<StandardHeroSection
  videoSrc="path/to/video.mp4"
  videoPoster="path/to/poster.jpg"
  title="Build Better Apps"
  subtitle="With our component library"
  actions={
    <>
      <Button>Get Started</Button>
      <Button variant="outline">Learn More</Button>
    </>
  }
  autoPlay={true}
  muted={true}
  loop={true}
/>
```

## Usage in HubSpot Themes

The Standard Layout components are designed to work seamlessly with HubSpot themes:

```jsx
// HubSpot Module Example
export const LandingPageModule = {
  meta: {
    label: 'Landing Page',
    icon: 'page'
  },
  fields: [
    {
      name: 'hero_video',
      label: 'Hero Video URL',
      type: 'text'
    },
    {
      name: 'hero_title',
      label: 'Hero Title',
      type: 'text'
    }
  ],
  component: ({ hero_video, hero_title }) => (
    <StandardPage
      hero={{
        videoSrc: hero_video,
        title: hero_title
      }}
    >
      {/* Module content */}
    </StandardPage>
  )
};
```

## Responsive Behavior

The layout system is fully responsive:

- **Mobile**: Navigation collapses, padding adjusts
- **Tablet**: Optimal spacing maintained
- **Desktop**: Full layout with all features

## Customization

While the layout enforces consistent spacing, you can customize:

- Colors via CSS variables
- Border visibility with `showBorder` prop
- Header transparency
- Hero section content

## Migration Guide

To migrate existing pages to Standard Layout:

1. Wrap your page in `StandardPage`
2. Move header content to `header` prop
3. Move hero content to `hero` prop
4. Place remaining content as children

Before:
```jsx
<div className="page">
  <Header />
  <Hero />
  <Content />
</div>
```

After:
```jsx
<StandardPage
  header={headerProps}
  hero={heroProps}
>
  <Content />
</StandardPage>
```