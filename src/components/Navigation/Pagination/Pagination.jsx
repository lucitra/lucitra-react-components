/**
 * Pagination Component
 * 
 * Navigation for paginated content with customizable appearance and behavior
 * Built on top of Mantine's Pagination with design system styling
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Pagination as MantinePagination, Group, Text, Select } from '@mantine/core';

export const Pagination = ({
  currentPage = 1,
  totalPages,
  onPageChange,
  size = 'md',
  siblings = 1,
  boundaries = 1,
  disabled = false,
  withControls = true,
  ...props
}) => {
  return (
    <MantinePagination
      value={currentPage}
      total={totalPages}
      onChange={onPageChange}
      size={size}
      siblings={siblings}
      boundaries={boundaries}
      disabled={disabled}
      withControls={withControls}
      style={{
        '.mantine-Pagination-control': {
          border: '2px solid #dee2e6',
          borderRadius: 0,
          backgroundColor: 'white',
        },
        '.mantine-Pagination-control[data-active]': {
          backgroundColor: '#228be6',
          borderColor: '#228be6',
          color: 'white',
        }
      }}
      {...props}
    />
  );
};

export const PaginationWithInfo = ({
  currentPage = 1,
  totalPages,
  totalItems,
  itemsPerPage = 10,
  onPageChange,
  showPageSize = false,
  pageSizeOptions = [10, 25, 50, 100],
  onPageSizeChange,
  ...props
}) => {
  const startItem = ((currentPage - 1) * itemsPerPage) + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <Group justify="space-between" align="center">
      <Group gap="md">
        <Text size="sm" c="dimmed">
          Showing {startItem} to {endItem} of {totalItems} entries
        </Text>
        
        {showPageSize && (
          <Group gap="xs" align="center">
            <Text size="sm" c="dimmed">Show:</Text>
            <Select
              value={itemsPerPage.toString()}
              onChange={(value) => onPageSizeChange?.(parseInt(value))}
              data={pageSizeOptions.map(size => ({ value: size.toString(), label: size.toString() }))}
              size="xs"
              style={{ width: '80px' }}
            />
            <Text size="sm" c="dimmed">per page</Text>
          </Group>
        )}
      </Group>
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        {...props}
      />
    </Group>
  );
};

export const SimplePagination = ({
  currentPage = 1,
  totalPages,
  onPageChange,
  showLabels = true,
  previousLabel = 'Previous',
  nextLabel = 'Next',
  disabled = false
}) => {
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <Group gap="md" justify="center" align="center">
      <button
        onClick={() => canGoPrevious && onPageChange(currentPage - 1)}
        disabled={disabled || !canGoPrevious}
        style={{
          padding: '8px 16px',
          border: '2px solid #dee2e6',
          borderRadius: 0,
          backgroundColor: 'white',
          color: disabled || !canGoPrevious ? '#adb5bd' : '#495057',
          cursor: disabled || !canGoPrevious ? 'not-allowed' : 'pointer',
          fontSize: '14px'
        }}
      >
        {showLabels ? previousLabel : '‹'}
      </button>
      
      <Text size="sm" c="dimmed">
        Page {currentPage} of {totalPages}
      </Text>
      
      <button
        onClick={() => canGoNext && onPageChange(currentPage + 1)}
        disabled={disabled || !canGoNext}
        style={{
          padding: '8px 16px',
          border: '2px solid #dee2e6',
          borderRadius: 0,
          backgroundColor: 'white',
          color: disabled || !canGoNext ? '#adb5bd' : '#495057',
          cursor: disabled || !canGoNext ? 'not-allowed' : 'pointer',
          fontSize: '14px'
        }}
      >
        {showLabels ? nextLabel : '›'}
      </button>
    </Group>
  );
};

export const CompactPagination = ({
  currentPage = 1,
  totalPages,
  onPageChange,
  disabled = false
}) => {
  return (
    <Group gap="xs" align="center">
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={disabled || currentPage <= 1}
        style={{
          padding: '4px 8px',
          border: '1px solid #dee2e6',
          borderRadius: 0,
          backgroundColor: 'white',
          color: disabled || currentPage <= 1 ? '#adb5bd' : '#495057',
          cursor: disabled || currentPage <= 1 ? 'not-allowed' : 'pointer',
          fontSize: '12px'
        }}
      >
        ‹
      </button>
      
      <Text size="xs" c="dimmed" style={{ minWidth: '60px', textAlign: 'center' }}>
        {currentPage} / {totalPages}
      </Text>
      
      <button
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={disabled || currentPage >= totalPages}
        style={{
          padding: '4px 8px',
          border: '1px solid #dee2e6',
          borderRadius: 0,
          backgroundColor: 'white',
          color: disabled || currentPage >= totalPages ? '#adb5bd' : '#495057',
          cursor: disabled || currentPage >= totalPages ? 'not-allowed' : 'pointer',
          fontSize: '12px'
        }}
      >
        ›
      </button>
    </Group>
  );
};

Pagination.propTypes = {
  /** Current active page */
  currentPage: PropTypes.number.isRequired,
  /** Total number of pages */
  totalPages: PropTypes.number.isRequired,
  /** Page change handler */
  onPageChange: PropTypes.func.isRequired,
  /** Pagination size */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  /** Show edge pages */
  showEdges: PropTypes.bool,
  /** Number of siblings on each side of current page */
  siblings: PropTypes.number,
  /** Number of boundaries on each side */
  boundaries: PropTypes.number,
  /** Disabled state */
  disabled: PropTypes.bool,
  /** Show prev/next controls */
  withControls: PropTypes.bool,
};

PaginationWithInfo.propTypes = {
  /** Current active page */
  currentPage: PropTypes.number.isRequired,
  /** Total number of pages */
  totalPages: PropTypes.number.isRequired,
  /** Total number of items */
  totalItems: PropTypes.number.isRequired,
  /** Items per page */
  itemsPerPage: PropTypes.number,
  /** Page change handler */
  onPageChange: PropTypes.func.isRequired,
  /** Show page size selector */
  showPageSize: PropTypes.bool,
  /** Available page size options */
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
  /** Page size change handler */
  onPageSizeChange: PropTypes.func,
};

SimplePagination.propTypes = {
  /** Current active page */
  currentPage: PropTypes.number.isRequired,
  /** Total number of pages */
  totalPages: PropTypes.number.isRequired,
  /** Page change handler */
  onPageChange: PropTypes.func.isRequired,
  /** Show text labels instead of arrows */
  showLabels: PropTypes.bool,
  /** Previous button label */
  previousLabel: PropTypes.string,
  /** Next button label */
  nextLabel: PropTypes.string,
  /** Disabled state */
  disabled: PropTypes.bool,
};

CompactPagination.propTypes = {
  /** Current active page */
  currentPage: PropTypes.number.isRequired,
  /** Total number of pages */
  totalPages: PropTypes.number.isRequired,
  /** Page change handler */
  onPageChange: PropTypes.func.isRequired,
  /** Disabled state */
  disabled: PropTypes.bool,
};

export default Pagination;