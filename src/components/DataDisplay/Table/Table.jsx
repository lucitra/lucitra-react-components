/**
 * Table Component
 * 
 * Displays data in rows and columns with sorting, filtering, and selection
 * Built on top of Mantine's Table component with design system styling
 */

import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { 
  Table as MantineTable, 
  Checkbox, 
  Group, 
  Text,
  TextInput,
  Stack,
  Pagination
} from '@mantine/core';
import { 
  IconChevronUp, 
  IconChevronDown, 
  IconSearch
} from '@tabler/icons-react';

export const Table = ({ 
  data = [], 
  columns = [],
  sortable = false,
  filterable = false,
  selectable = false,
  pagination = false,
  pageSize = 10,
  striped = true,
  withBorder = true,
  onSelectionChange,
  onSort,
  onFilter,
  loading = false,
  emptyText = "No data available",
  ...props 
}) => {
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter data
  const filteredData = useMemo(() => {
    if (!filterable || !filter) return data;
    
    return data.filter(row => 
      columns.some(column => {
        const value = row[column.accessor];
        return value?.toString().toLowerCase().includes(filter.toLowerCase());
      })
    );
  }, [data, filter, filterable, columns]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortable || !sortBy) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      
      if (aVal === bVal) return 0;
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;
      
      const comparison = aVal < bVal ? -1 : 1;
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [filteredData, sortBy, sortOrder, sortable]);

  // Paginate data
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, pagination, currentPage, pageSize]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const handleSort = (accessor) => {
    if (!sortable) return;
    
    if (sortBy === accessor) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(accessor);
      setSortOrder('asc');
    }
    
    onSort?.(accessor, sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRows(new Set(paginatedData.map((_, index) => index)));
    } else {
      setSelectedRows(new Set());
    }
    onSelectionChange?.(checked ? paginatedData : []);
  };

  const handleSelectRow = (index, checked) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(index);
    } else {
      newSelected.delete(index);
    }
    setSelectedRows(newSelected);
    
    const selectedData = paginatedData.filter((_, i) => newSelected.has(i));
    onSelectionChange?.(selectedData);
  };

  const handleFilterChange = (value) => {
    setFilter(value);
    setCurrentPage(1); // Reset to first page when filtering
    onFilter?.(value);
  };

  return (
    <Stack gap="md">
      {/* Filter controls */}
      {filterable && (
        <Group gap="sm">
          <TextInput
            placeholder="Search in table..."
            leftSection={<IconSearch size={16} />}
            value={filter}
            onChange={(e) => handleFilterChange(e.target.value)}
            style={{ flex: 1, maxWidth: '300px' }}
          />
          {filter && (
            <Text size="sm" c="dimmed">
              {sortedData.length} of {data.length} rows
            </Text>
          )}
        </Group>
      )}

      {/* Table */}
      <div style={{ border: withBorder ? '2px solid #dee2e6' : 'none', borderRadius: 0 }}>
        <MantineTable
          striped={striped}
          style={{ 
            backgroundColor: 'white',
            border: 'none'
          }}
          {...props}
        >
          <MantineTable.Thead style={{ backgroundColor: '#f8f9fa' }}>
            <MantineTable.Tr>
              {selectable && (
                <MantineTable.Th style={{ width: '50px', padding: '12px' }}>
                  <Checkbox
                    checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                    indeterminate={selectedRows.size > 0 && selectedRows.size < paginatedData.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </MantineTable.Th>
              )}
              {columns.map((column) => (
                <MantineTable.Th 
                  key={column.accessor}
                  style={{ 
                    padding: '12px',
                    cursor: sortable && column.sortable !== false ? 'pointer' : 'default',
                    userSelect: 'none'
                  }}
                  onClick={() => sortable && column.sortable !== false && handleSort(column.accessor)}
                >
                  <Group gap="xs" justify="space-between">
                    <Text fw={600} size="sm">
                      {column.header}
                    </Text>
                    {sortable && column.sortable !== false && (
                      <div>
                        {sortBy === column.accessor ? (
                          sortOrder === 'asc' ? (
                            <IconChevronUp size={16} />
                          ) : (
                            <IconChevronDown size={16} />
                          )
                        ) : (
                          <div style={{ width: '16px', height: '16px' }} />
                        )}
                      </div>
                    )}
                  </Group>
                </MantineTable.Th>
              ))}
            </MantineTable.Tr>
          </MantineTable.Thead>
          <MantineTable.Tbody>
            {loading ? (
              <MantineTable.Tr>
                <MantineTable.Td 
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  style={{ textAlign: 'center', padding: '40px' }}
                >
                  <Text c="dimmed">Loading...</Text>
                </MantineTable.Td>
              </MantineTable.Tr>
            ) : paginatedData.length === 0 ? (
              <MantineTable.Tr>
                <MantineTable.Td 
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  style={{ textAlign: 'center', padding: '40px' }}
                >
                  <Text c="dimmed">{emptyText}</Text>
                </MantineTable.Td>
              </MantineTable.Tr>
            ) : (
              paginatedData.map((row, index) => (
                <MantineTable.Tr key={index}>
                  {selectable && (
                    <MantineTable.Td style={{ padding: '12px' }}>
                      <Checkbox
                        checked={selectedRows.has(index)}
                        onChange={(e) => handleSelectRow(index, e.target.checked)}
                      />
                    </MantineTable.Td>
                  )}
                  {columns.map((column) => (
                    <MantineTable.Td key={column.accessor} style={{ padding: '12px' }}>
                      {column.render ? 
                        column.render(row[column.accessor], row, index) : 
                        row[column.accessor]
                      }
                    </MantineTable.Td>
                  ))}
                </MantineTable.Tr>
              ))
            )}
          </MantineTable.Tbody>
        </MantineTable>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length} entries
          </Text>
          <Pagination
            value={currentPage}
            onChange={setCurrentPage}
            total={totalPages}
            size="sm"
          />
        </Group>
      )}
    </Stack>
  );
};

Table.propTypes = {
  /** Array of data objects */
  data: PropTypes.array.isRequired,
  /** Array of column definitions */
  columns: PropTypes.arrayOf(PropTypes.shape({
    accessor: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
    render: PropTypes.func,
    sortable: PropTypes.bool,
  })).isRequired,
  /** Enable sorting functionality */
  sortable: PropTypes.bool,
  /** Enable filtering functionality */
  filterable: PropTypes.bool,
  /** Enable row selection */
  selectable: PropTypes.bool,
  /** Enable pagination */
  pagination: PropTypes.bool,
  /** Number of rows per page */
  pageSize: PropTypes.number,
  /** Striped rows */
  striped: PropTypes.bool,
  /** Table border */
  withBorder: PropTypes.bool,
  /** Selection change callback */
  onSelectionChange: PropTypes.func,
  /** Sort change callback */
  onSort: PropTypes.func,
  /** Filter change callback */
  onFilter: PropTypes.func,
  /** Loading state */
  loading: PropTypes.bool,
  /** Empty state text */
  emptyText: PropTypes.string,
};

export default Table;