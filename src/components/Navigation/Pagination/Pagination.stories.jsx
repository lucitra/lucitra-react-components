import React, { useState } from 'react';
import { Stack, Text, Card, Group } from '@mantine/core';
import { Pagination, PaginationWithInfo, SimplePagination, CompactPagination } from './Pagination';

export default {
  title: 'Navigation/Pagination',
  component: Pagination,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Pagination components help users navigate through large sets of data by breaking content into pages.

## Features
- Multiple pagination styles (full, simple, compact)
- Customizable page information display
- Page size selection
- Configurable siblings and boundaries
- Loading and disabled states
- Responsive design
        `
      }
    }
  },
};

// Basic pagination story component
const BasicPaginationStory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 20;

  return (
    <Stack gap="lg">
      <div>
        <Text size="sm" fw={600} mb="xs">
          Current Page: {currentPage} of {totalPages}
        </Text>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </Stack>
  );
};

// Basic pagination
export const BasicPagination = {
  render: () => <BasicPaginationStory />
};

// Pagination sizes story component
const PaginationSizesStory = () => {
  const [pages, setPages] = useState({
    xs: 1,
    sm: 1,
    md: 1,
    lg: 1,
    xl: 1
  });
  
  const totalPages = 10;

  return (
    <Stack gap="lg">
      {['xs', 'sm', 'md', 'lg', 'xl'].map(size => (
        <div key={size}>
          <Text size="sm" fw={600} mb="xs" tt="uppercase">
            Size: {size}
          </Text>
          <Pagination
            currentPage={pages[size]}
            totalPages={totalPages}
            onPageChange={(page) => setPages(prev => ({ ...prev, [size]: page }))}
            size={size}
          />
        </div>
      ))}
    </Stack>
  );
};

// Different sizes
export const PaginationSizes = {
  render: () => <PaginationSizesStory />
};

// Pagination with information story component
const PaginationWithInfoExampleStory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const totalItems = 247;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageSizeChange = (newSize) => {
    setItemsPerPage(newSize);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  return (
    <Stack gap="lg">
      <Card withBorder p="md">
        <PaginationWithInfo
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          showPageSize
          onPageSizeChange={handlePageSizeChange}
        />
      </Card>
      
      <Card withBorder p="md">
        <Text size="sm" fw={600} mb="md">Without Page Size Selector</Text>
        <PaginationWithInfo
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </Card>
    </Stack>
  );
};

// Pagination with information
export const PaginationWithInfoExample = {
  render: () => <PaginationWithInfoExampleStory />
};

// Simple pagination story component
const SimplePaginationExampleStory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 15;

  return (
    <Stack gap="lg">
      <div>
        <Text size="sm" fw={600} mb="xs">With Labels</Text>
        <SimplePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          showLabels
        />
      </div>
      
      <div>
        <Text size="sm" fw={600} mb="xs">With Arrows Only</Text>
        <SimplePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          showLabels={false}
        />
      </div>
      
      <div>
        <Text size="sm" fw={600} mb="xs">Custom Labels</Text>
        <SimplePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          previousLabel="← Back"
          nextLabel="Forward →"
        />
      </div>
    </Stack>
  );
};

// Simple pagination
export const SimplePaginationExample = {
  render: () => <SimplePaginationExampleStory />
};

// Compact pagination story component
const CompactPaginationExampleStory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 25;

  return (
    <Stack gap="md">
      <Text size="sm" fw={600}>Compact Pagination (Space-Saving)</Text>
      <Group gap="lg">
        <CompactPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
        <Text size="sm" c="dimmed">← Perfect for mobile or tight spaces</Text>
      </Group>
    </Stack>
  );
};

// Compact pagination
export const CompactPaginationExample = {
  render: () => <CompactPaginationExampleStory />
};

// Configuration examples story component
const ConfigurationExamplesStory = () => {
  const [pages, setPages] = useState({
    default: 5,
    noSiblings: 5,
    moreSiblings: 5,
    noBoundaries: 5
  });
  
  const totalPages = 20;

  return (
    <Stack gap="lg">
      <div>
        <Text size="sm" fw={600} mb="xs">Default (siblings: 1, boundaries: 1)</Text>
        <Pagination
          currentPage={pages.default}
          totalPages={totalPages}
          onPageChange={(page) => setPages(prev => ({ ...prev, default: page }))}
        />
      </div>
      
      <div>
        <Text size="sm" fw={600} mb="xs">No Siblings (siblings: 0)</Text>
        <Pagination
          currentPage={pages.noSiblings}
          totalPages={totalPages}
          onPageChange={(page) => setPages(prev => ({ ...prev, noSiblings: page }))}
          siblings={0}
        />
      </div>
      
      <div>
        <Text size="sm" fw={600} mb="xs">More Siblings (siblings: 2)</Text>
        <Pagination
          currentPage={pages.moreSiblings}
          totalPages={totalPages}
          onPageChange={(page) => setPages(prev => ({ ...prev, moreSiblings: page }))}
          siblings={2}
        />
      </div>
      
      <div>
        <Text size="sm" fw={600} mb="xs">No Boundaries (boundaries: 0)</Text>
        <Pagination
          currentPage={pages.noBoundaries}
          totalPages={totalPages}
          onPageChange={(page) => setPages(prev => ({ ...prev, noBoundaries: page }))}
          boundaries={0}
        />
      </div>
    </Stack>
  );
};

// Different configurations
export const ConfigurationExamples = {
  render: () => <ConfigurationExamplesStory />
};

// Pagination states story component
const PaginationStatesStory = () => {
  const [currentPage, setCurrentPage] = useState(3);
  const totalPages = 10;

  return (
    <Stack gap="lg">
      <div>
        <Text size="sm" fw={600} mb="xs">Normal State</Text>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
      
      <div>
        <Text size="sm" fw={600} mb="xs">Disabled State</Text>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          disabled
        />
      </div>
      
      <div>
        <Text size="sm" fw={600} mb="xs">Single Page (No Pagination)</Text>
        <Pagination
          currentPage={1}
          totalPages={1}
          onPageChange={() => {}}
        />
      </div>
    </Stack>
  );
};

// States
export const PaginationStates = {
  render: () => <PaginationStatesStory />
};

// Real-world examples story component
const RealWorldExamplesStory = () => {
  const [tablePage, setTablePage] = useState(1);
  const [searchPage, setSearchPage] = useState(1);
  const [blogPage, setBlogPage] = useState(1);

  return (
    <Stack gap="xl">
      {/* Data Table Pagination */}
      <Card withBorder p="md">
        <Text fw={600} mb="md">Data Table Pagination</Text>
        <PaginationWithInfo
          currentPage={tablePage}
          totalPages={12}
          totalItems={115}
          itemsPerPage={10}
          onPageChange={setTablePage}
          showPageSize
          onPageSizeChange={() => setTablePage(1)}
        />
      </Card>

      {/* Search Results */}
      <Card withBorder p="md">
        <Text fw={600} mb="md">Search Results</Text>
        <Stack gap="sm">
          <Text size="sm" c="dimmed">Found 1,247 results for &quot;react components&quot;</Text>
          <SimplePagination
            currentPage={searchPage}
            totalPages={125}
            onPageChange={setSearchPage}
            previousLabel="← Previous"
            nextLabel="Next →"
          />
        </Stack>
      </Card>

      {/* Blog Posts */}
      <Card withBorder p="md">
        <Group justify="space-between" align="center">
          <Text fw={600}>Blog Posts</Text>
          <CompactPagination
            currentPage={blogPage}
            totalPages={8}
            onPageChange={setBlogPage}
          />
        </Group>
      </Card>

      {/* Mobile Pagination */}
      <Card withBorder p="md">
        <Text fw={600} mb="md">Mobile-Friendly Pagination</Text>
        <Group justify="center">
          <Pagination
            currentPage={searchPage}
            totalPages={25}
            onPageChange={setSearchPage}
            size="sm"
            siblings={0}
            boundaries={1}
          />
        </Group>
      </Card>
    </Stack>
  );
};

// Real-world examples
export const RealWorldExamples = {
  render: () => <RealWorldExamplesStory />
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
{`import { 
  Pagination, 
  PaginationWithInfo, 
  SimplePagination, 
  CompactPagination 
} from '@lucitra/react-components';

// Basic pagination
const [currentPage, setCurrentPage] = useState(1);
const totalPages = 20;

<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
  size="md"
  siblings={1}
  boundaries={1}
/>

// Pagination with information
<PaginationWithInfo
  currentPage={currentPage}
  totalPages={totalPages}
  totalItems={200}
  itemsPerPage={10}
  onPageChange={setCurrentPage}
  showPageSize
  onPageSizeChange={setItemsPerPage}
/>

// Simple pagination
<SimplePagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
  previousLabel="← Previous"
  nextLabel="Next →"
/>

// Compact pagination
<CompactPagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
/>`}
        </pre>
      </div>
    </Stack>
  )
};