import React from 'react';
import { Stack, Text } from '@mantine/core';
import { IconDots } from '@tabler/icons-react';
import { Breadcrumb, SimpleBreadcrumb, PageBreadcrumb } from './Breadcrumb';

export default {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Breadcrumb navigation shows users their current location within a website hierarchy and provides an easy way to navigate back to parent pages.

## Features
- Customizable separators
- Home icon support
- Click handlers for navigation
- Disabled states for current page
- Maximum items limit
- Specialized components for common patterns
        `
      }
    }
  },
};

// Basic breadcrumbs
export const BasicBreadcrumbs = {
  render: () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Electronics', href: '/products/electronics' },
      { label: 'Smartphones', href: '/products/electronics/smartphones' },
      { label: 'iPhone 15 Pro', disabled: true }
    ];

    return (
      <Breadcrumb 
        items={items}
        onClick={(item, index) => console.log('Clicked:', item, 'at index:', index)}
      />
    );
  }
};

// With home icon
export const WithHomeIcon = {
  render: () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Analytics', href: '/dashboard/analytics' },
      { label: 'Reports', disabled: true }
    ];

    return (
      <Breadcrumb 
        items={items}
        showHomeIcon
        onClick={(item) => console.log('Navigating to:', item.href)}
      />
    );
  }
};

// Custom separator
export const CustomSeparator = {
  render: () => {
    const items = [
      { label: 'Docs', href: '/docs' },
      { label: 'Components', href: '/docs/components' },
      { label: 'Navigation', href: '/docs/components/navigation' },
      { label: 'Breadcrumb', disabled: true }
    ];

    return (
      <Stack gap="lg">
        <div>
          <Text size="sm" fw={600} mb="xs">Slash Separator</Text>
          <Breadcrumb 
            items={items}
            separator="/"
          />
        </div>
        
        <div>
          <Text size="sm" fw={600} mb="xs">Dots Separator</Text>
          <Breadcrumb 
            items={items}
            separator={<IconDots size={12} style={{ color: '#868e96' }} />}
          />
        </div>
        
        <div>
          <Text size="sm" fw={600} mb="xs">Text Separator</Text>
          <Breadcrumb 
            items={items}
            separator=" → "
          />
        </div>
      </Stack>
    );
  }
};

// Simple breadcrumb from path
export const SimplePathBreadcrumb = {
  render: () => (
    <Stack gap="lg">
      <div>
        <Text size="sm" fw={600} mb="xs">From URL Path</Text>
        <SimpleBreadcrumb 
          path="/products/electronics/smartphones"
          onClick={(href) => console.log('Navigate to:', href)}
        />
      </div>
      
      <div>
        <Text size="sm" fw={600} mb="xs">Documentation Path</Text>
        <SimpleBreadcrumb 
          path="/docs/components/navigation/breadcrumb"
          onClick={(href) => console.log('Navigate to:', href)}
        />
      </div>
      
      <div>
        <Text size="sm" fw={600} mb="xs">Admin Dashboard Path</Text>
        <SimpleBreadcrumb 
          path="/admin/users/profile/settings"
          onClick={(href) => console.log('Navigate to:', href)}
        />
      </div>
    </Stack>
  )
};

// Page breadcrumb
export const PageBreadcrumbExample = {
  render: () => {
    const pages = [
      { title: 'Home', path: '/' },
      { title: 'User Management', path: '/admin/users' },
      { title: 'User Profile', path: '/admin/users/123' },
    ];

    return (
      <Stack gap="lg">
        <div>
          <Text size="sm" fw={600} mb="xs">User Profile Page</Text>
          <PageBreadcrumb 
            pages={pages}
            currentPage="Edit Profile"
            onNavigate={(path) => console.log('Navigate to:', path)}
          />
        </div>
        
        <div>
          <Text size="sm" fw={600} mb="xs">Settings Page</Text>
          <PageBreadcrumb 
            pages={[
              { title: 'Dashboard', path: '/dashboard' },
              { title: 'Account', path: '/dashboard/account' },
            ]}
            currentPage="Privacy Settings"
            onNavigate={(path) => console.log('Navigate to:', path)}
          />
        </div>
      </Stack>
    );
  }
};

// Limited items
export const LimitedItems = {
  render: () => {
    const manyItems = [
      { label: 'Home', href: '/' },
      { label: 'Category 1', href: '/cat1' },
      { label: 'Subcategory 1', href: '/cat1/sub1' },
      { label: 'Subcategory 2', href: '/cat1/sub1/sub2' },
      { label: 'Subcategory 3', href: '/cat1/sub1/sub2/sub3' },
      { label: 'Subcategory 4', href: '/cat1/sub1/sub2/sub3/sub4' },
      { label: 'Current Page', disabled: true }
    ];

    return (
      <Stack gap="lg">
        <div>
          <Text size="sm" fw={600} mb="xs">All Items (7 total)</Text>
          <Breadcrumb items={manyItems} />
        </div>
        
        <div>
          <Text size="sm" fw={600} mb="xs">Limited to 5 Items</Text>
          <Breadcrumb items={manyItems} maxItems={5} />
        </div>
        
        <div>
          <Text size="sm" fw={600} mb="xs">Limited to 3 Items</Text>
          <Breadcrumb items={manyItems} maxItems={3} />
        </div>
      </Stack>
    );
  }
};

// Interactive example
const InteractiveExample = () => {
  const [currentPath, setCurrentPath] = React.useState('/products/electronics/smartphones/iphone');
  
  const pathSegments = currentPath.split('/').filter(Boolean);
  const items = pathSegments.map((segment, index) => ({
    label: segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' '),
    href: '/' + pathSegments.slice(0, index + 1).join('/'),
    disabled: index === pathSegments.length - 1
  }));

  const handleNavigate = (href) => {
    setCurrentPath(href);
  };

  return (
    <Stack gap="md">
      <div>
        <Text size="sm" fw={600} mb="xs">Current Path: {currentPath}</Text>
        <Breadcrumb 
          items={[{ label: 'Home', href: '/' }, ...items]}
          showHomeIcon
          onClick={(item) => handleNavigate(item.href)}
        />
      </div>
      
      <div>
        <Text size="sm" fw={600} mb="xs">Quick Navigation</Text>
        <Stack gap="xs">
          {[
            '/products',
            '/products/electronics', 
            '/products/electronics/laptops',
            '/admin/users/profile/settings'
          ].map(path => (
            <button
              key={path}
              onClick={() => setCurrentPath(path)}
              style={{
                padding: '8px 12px',
                background: 'none',
                border: '1px solid #dee2e6',
                borderRadius: '4px',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '14px'
              }}
            >
              {path}
            </button>
          ))}
        </Stack>
      </div>
    </Stack>
  );
};

export const InteractiveBreadcrumbExample = {
  render: () => <InteractiveExample />
};

// Usage examples
export const UsageExamples = {
  render: () => (
    <Stack gap="lg">
      <div>
        <h3>Basic Usage</h3>
        <pre style={{ 
          background: '#f8f9fa', 
          padding: '12px', 
          borderRadius: '4px',
          fontSize: '13px',
          overflow: 'auto'
        }}>
{`import { Breadcrumb, SimpleBreadcrumb, PageBreadcrumb } from '@lucitra/react-components';

// Basic breadcrumb with items
const items = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Current Page', disabled: true }
];

<Breadcrumb 
  items={items}
  showHomeIcon
  onClick={(item) => navigate(item.href)}
/>

// Simple breadcrumb from URL path
<SimpleBreadcrumb 
  path="/products/electronics/smartphones"
  onClick={(href) => navigate(href)}
/>

// Page breadcrumb with parent pages
<PageBreadcrumb 
  pages={[
    { title: 'Dashboard', path: '/dashboard' },
    { title: 'Settings', path: '/settings' }
  ]}
  currentPage="Privacy"
  onNavigate={(path) => navigate(path)}
/>`}
        </pre>
      </div>
    </Stack>
  )
};