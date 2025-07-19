/**
 * Breadcrumb Component
 * 
 * Navigation breadcrumbs showing the current page's location within a hierarchy
 * Supports custom separators, icons, and click handlers
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumbs, Anchor, Text } from '@mantine/core';
import { IconChevronRight, IconHome } from '@tabler/icons-react';

export const Breadcrumb = ({
  items = [],
  separator,
  showHomeIcon = false,
  maxItems,
  onClick,
  ...props
}) => {
  const handleClick = (item, index) => {
    if (onClick && !item.disabled) {
      onClick(item, index);
    }
  };

  const renderItem = (item, index) => {
    const isLast = index === items.length - 1;
    const isHome = index === 0 && showHomeIcon;
    
    if (isLast || item.disabled) {
      return (
        <Text 
          key={index}
          c={isLast ? 'dark' : 'dimmed'}
          fw={isLast ? 600 : 400}
          size="sm"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          {isHome && <IconHome size={14} />}
          {item.label}
        </Text>
      );
    }

    return (
      <Anchor
        key={index}
        onClick={() => handleClick(item, index)}
        size="sm"
        style={{
          color: '#228be6',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.target.style.textDecoration = 'underline';
        }}
        onMouseLeave={(e) => {
          e.target.style.textDecoration = 'none';
        }}
      >
        {isHome && <IconHome size={14} />}
        {item.label}
      </Anchor>
    );
  };

  const defaultSeparator = separator || <IconChevronRight size={12} style={{ color: '#868e96' }} />;

  return (
    <Breadcrumbs
      separator={defaultSeparator}
      separatorMargin="xs"
      style={{
        fontSize: '14px'
      }}
      {...props}
    >
      {items.slice(0, maxItems).map(renderItem)}
    </Breadcrumbs>
  );
};

// Specialized breadcrumb components
export const SimpleBreadcrumb = ({ path, onClick }) => {
  const items = path.split('/').filter(Boolean).map((segment, index, array) => ({
    label: segment.charAt(0).toUpperCase() + segment.slice(1),
    href: '/' + array.slice(0, index + 1).join('/'),
    disabled: false
  }));

  return (
    <Breadcrumb 
      items={items} 
      showHomeIcon 
      onClick={(item) => onClick?.(item.href)}
    />
  );
};

export const PageBreadcrumb = ({ pages, currentPage, onNavigate }) => {
  const items = [
    ...pages.map(page => ({
      label: page.title,
      href: page.path,
      disabled: false
    })),
    {
      label: currentPage,
      disabled: true
    }
  ];

  return (
    <Breadcrumb 
      items={items}
      onClick={(item) => onNavigate?.(item.href)}
    />
  );
};

Breadcrumb.propTypes = {
  /** Array of breadcrumb items */
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    href: PropTypes.string,
    disabled: PropTypes.bool,
  })).isRequired,
  /** Custom separator component */
  separator: PropTypes.node,
  /** Show home icon for first item */
  showHomeIcon: PropTypes.bool,
  /** Maximum number of items to show */
  maxItems: PropTypes.number,
  /** Click handler for breadcrumb items */
  onClick: PropTypes.func,
};

SimpleBreadcrumb.propTypes = {
  /** URL path string */
  path: PropTypes.string.isRequired,
  /** Click handler receiving href */
  onClick: PropTypes.func,
};

PageBreadcrumb.propTypes = {
  /** Array of parent pages */
  pages: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  })).isRequired,
  /** Current page title */
  currentPage: PropTypes.string.isRequired,
  /** Navigation handler */
  onNavigate: PropTypes.func,
};

export default Breadcrumb;