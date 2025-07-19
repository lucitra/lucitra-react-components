import React, { useState } from 'react';
import { Stack, Button, Group, Badge, ActionIcon, Text } from '@mantine/core';
import { IconEdit, IconTrash, IconEye } from '@tabler/icons-react';
import { Table } from './Table';

export default {
  title: 'DataDisplay/Table',
  component: Table,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Table component displays data in rows and columns with advanced features like sorting, filtering, and selection.

## Features
- Sortable columns (click headers to sort)
- Global search/filtering
- Row selection with callbacks
- Pagination support
- Loading states
- Custom cell rendering
- Responsive design
- Empty state handling
        `
      }
    }
  },
};

// Sample data
const sampleUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', age: 28 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active', age: 34 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'inactive', age: 45 },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'pending', age: 29 },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'active', age: 52 },
  { id: 6, name: 'Diana Prince', email: 'diana@example.com', role: 'Editor', status: 'active', age: 31 },
  { id: 7, name: 'Frank Miller', email: 'frank@example.com', role: 'User', status: 'inactive', age: 38 },
  { id: 8, name: 'Grace Lee', email: 'grace@example.com', role: 'Admin', status: 'active', age: 26 },
  { id: 9, name: 'Henry Davis', email: 'henry@example.com', role: 'User', status: 'pending', age: 41 },
  { id: 10, name: 'Ivy Chen', email: 'ivy@example.com', role: 'Editor', status: 'active', age: 33 },
];

const basicColumns = [
  { accessor: 'name', header: 'Name' },
  { accessor: 'email', header: 'Email' },
  { accessor: 'role', header: 'Role' },
  { accessor: 'age', header: 'Age' },
];

// Basic table
export const BasicTable = {
  render: () => (
    <Table 
      data={sampleUsers.slice(0, 5)} 
      columns={basicColumns}
    />
  )
};

// Sortable table
export const SortableTable = {
  render: () => (
    <Table 
      data={sampleUsers} 
      columns={basicColumns}
      sortable
    />
  )
};

// Filterable table
export const FilterableTable = {
  render: () => (
    <Table 
      data={sampleUsers} 
      columns={basicColumns}
      filterable
    />
  )
};

// Selectable table
const SelectableExample = () => {
  const [selectedData, setSelectedData] = useState([]);

  return (
    <Stack gap="md">
      <Table 
        data={sampleUsers.slice(0, 6)} 
        columns={basicColumns}
        selectable
        onSelectionChange={setSelectedData}
      />
      
      {selectedData.length > 0 && (
        <div style={{ padding: '12px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}>
          <Text size="sm" fw={600}>Selected ({selectedData.length}):</Text>
          <Text size="sm">
            {selectedData.map(row => row.name).join(', ')}
          </Text>
        </div>
      )}
    </Stack>
  );
};

export const SelectableTable = {
  render: () => <SelectableExample />
};

// Paginated table
export const PaginatedTable = {
  render: () => (
    <Table 
      data={sampleUsers} 
      columns={basicColumns}
      pagination
      pageSize={5}
    />
  )
};

// Full-featured table
export const FullFeaturedTable = {
  render: () => (
    <Table 
      data={sampleUsers} 
      columns={basicColumns}
      sortable
      filterable
      selectable
      pagination
      pageSize={5}
    />
  )
};

// Custom rendering
const customColumns = [
  { accessor: 'name', header: 'Name' },
  { accessor: 'email', header: 'Email' },
  { 
    accessor: 'role', 
    header: 'Role',
    render: (value) => (
      <Badge 
        variant={value === 'Admin' ? 'error' : value === 'Editor' ? 'warning' : 'neutral'}
        size="sm"
      >
        {value}
      </Badge>
    )
  },
  { 
    accessor: 'status', 
    header: 'Status',
    render: (value) => (
      <Badge 
        variant={value === 'active' ? 'success' : value === 'pending' ? 'warning' : 'neutral'}
        size="sm"
      >
        {value.charAt(0).toUpperCase() + value.slice(1)}
      </Badge>
    )
  },
  { 
    accessor: 'actions', 
    header: 'Actions',
    sortable: false,
    render: (_value, _row) => (
      <Group gap="xs">
        <ActionIcon size="sm" variant="subtle" color="blue">
          <IconEye size={16} />
        </ActionIcon>
        <ActionIcon size="sm" variant="subtle" color="orange">
          <IconEdit size={16} />
        </ActionIcon>
        <ActionIcon size="sm" variant="subtle" color="red">
          <IconTrash size={16} />
        </ActionIcon>
      </Group>
    )
  },
];

export const CustomRendering = {
  render: () => (
    <Table 
      data={sampleUsers.slice(0, 6)} 
      columns={customColumns}
      sortable
      filterable
    />
  )
};

// Loading state
export const LoadingState = {
  render: () => (
    <Table 
      data={[]} 
      columns={basicColumns}
      loading
    />
  )
};

// Empty state
export const EmptyState = {
  render: () => (
    <Stack gap="md">
      <Table 
        data={[]} 
        columns={basicColumns}
        emptyText="No users found"
      />
      
      <Table 
        data={[]} 
        columns={basicColumns}
        filterable
        emptyText="Try adjusting your search criteria"
      />
    </Stack>
  )
};

// Interactive example
const InteractiveExample = () => {
  const [tableData, setTableData] = useState(sampleUsers);
  const [selectedRows, setSelectedRows] = useState([]);

  const deleteSelected = () => {
    const selectedIds = selectedRows.map(row => row.id);
    setTableData(prev => prev.filter(item => !selectedIds.includes(item.id)));
    setSelectedRows([]);
  };

  const addUser = () => {
    const newUser = {
      id: Math.max(...tableData.map(u => u.id)) + 1,
      name: 'New User',
      email: 'new@example.com',
      role: 'User',
      status: 'pending',
      age: 25
    };
    setTableData(prev => [...prev, newUser]);
  };

  return (
    <Stack gap="md">
      <Group gap="sm">
        <Button onClick={addUser} size="sm">
          Add User
        </Button>
        <Button 
          onClick={deleteSelected} 
          color="red" 
          size="sm"
          disabled={selectedRows.length === 0}
        >
          Delete Selected ({selectedRows.length})
        </Button>
      </Group>
      
      <Table 
        data={tableData} 
        columns={customColumns}
        sortable
        filterable
        selectable
        pagination
        pageSize={6}
        onSelectionChange={setSelectedRows}
      />
    </Stack>
  );
};

export const InteractiveTableExample = {
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
{`import { Table } from '@lucitra/react-components';

const columns = [
  { accessor: 'name', header: 'Name' },
  { accessor: 'email', header: 'Email' },
  { 
    accessor: 'status', 
    header: 'Status',
    render: (value) => <Badge>{value}</Badge>
  },
];

const data = [
  { name: 'John', email: 'john@example.com', status: 'active' },
  { name: 'Jane', email: 'jane@example.com', status: 'pending' },
];

<Table 
  data={data} 
  columns={columns}
  sortable
  filterable
  selectable
  pagination
  pageSize={10}
  onSelectionChange={(selected) => console.log(selected)}
/>`}
        </pre>
      </div>
    </Stack>
  )
};