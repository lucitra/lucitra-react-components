import React from 'react';
import { Container, Grid, Stack, Flex } from '@mantine/core';
import { withHubSpotModule } from './HubSpotModuleWrapper.jsx';

/**
 * HubSpot-ready Layout component with CMS field mappings
 */
const HubSpotLayoutComponent = ({
  // HubSpot fields
  layout_type,
  container_size,
  container_padding,
  grid_columns,
  grid_spacing,
  stack_spacing,
  flex_direction,
  flex_justify,
  flex_align,
  background_color,
  
  // Content
  children,
  ...props
}) => {
  const renderLayout = () => {
    const containerProps = {
      size: container_size || 'lg',
      py: container_padding || 'md',
      style: {
        backgroundColor: background_color?.color,
        ...props.style
      }
    };

    switch (layout_type) {
      case 'grid':
        return (
          <Container {...containerProps}>
            <Grid gutter={grid_spacing || 'md'}>
              {React.Children.map(children, (child, index) => (
                <Grid.Col span={12 / (grid_columns || 3)} key={index}>
                  {child}
                </Grid.Col>
              ))}
            </Grid>
          </Container>
        );

      case 'stack':
        return (
          <Container {...containerProps}>
            <Stack spacing={stack_spacing || 'md'}>
              {children}
            </Stack>
          </Container>
        );

      case 'flex':
        return (
          <Container {...containerProps}>
            <Flex
              direction={flex_direction || 'row'}
              justify={flex_justify || 'flex-start'}
              align={flex_align || 'stretch'}
              gap={grid_spacing || 'md'}
            >
              {children}
            </Flex>
          </Container>
        );

      default:
        return (
          <Container {...containerProps}>
            {children}
          </Container>
        );
    }
  };

  return renderLayout();
};

// HubSpot module configuration
HubSpotLayoutComponent.hubspotModule = {
  meta: {
    label: 'Lucitra Layout',
    icon: '@hubspot/layout',
    categories: ['layout', 'lucitra']
  },
  fields: [
    {
      type: 'choice',
      name: 'layout_type',
      label: 'Layout Type',
      display: 'select',
      choices: [
        ['container', 'Simple Container'],
        ['grid', 'Grid Layout'],
        ['stack', 'Stack Layout'], 
        ['flex', 'Flex Layout']
      ],
      default: 'container'
    },
    {
      type: 'choice',
      name: 'container_size',
      label: 'Container Size',
      display: 'select',
      choices: [
        ['xs', 'Extra Small'],
        ['sm', 'Small'],
        ['md', 'Medium'],
        ['lg', 'Large'],
        ['xl', 'Extra Large']
      ],
      default: 'lg'
    },
    {
      type: 'choice',
      name: 'container_padding',
      label: 'Container Padding',
      display: 'select',
      choices: [
        ['xs', 'Extra Small'],
        ['sm', 'Small'],
        ['md', 'Medium'],
        ['lg', 'Large'],
        ['xl', 'Extra Large']
      ],
      default: 'md'
    },
    {
      type: 'choice',
      name: 'grid_columns',
      label: 'Grid Columns',
      display: 'select',
      choices: [
        [1, '1 Column'],
        [2, '2 Columns'],
        [3, '3 Columns'],
        [4, '4 Columns'],
        [6, '6 Columns']
      ],
      default: 3,
      visibility: {
        controlling_field: 'layout_type',
        operator: 'EQUAL',
        controlling_value: 'grid'
      }
    },
    {
      type: 'choice',
      name: 'grid_spacing',
      label: 'Grid/Flex Spacing',
      display: 'select',
      choices: [
        ['xs', 'Extra Small'],
        ['sm', 'Small'],
        ['md', 'Medium'],
        ['lg', 'Large'],
        ['xl', 'Extra Large']
      ],
      default: 'md'
    },
    {
      type: 'choice',
      name: 'stack_spacing',
      label: 'Stack Spacing',
      display: 'select',
      choices: [
        ['xs', 'Extra Small'],
        ['sm', 'Small'],
        ['md', 'Medium'],
        ['lg', 'Large'],
        ['xl', 'Extra Large']
      ],
      default: 'md',
      visibility: {
        controlling_field: 'layout_type',
        operator: 'EQUAL',
        controlling_value: 'stack'
      }
    },
    {
      type: 'choice',
      name: 'flex_direction',
      label: 'Flex Direction',
      display: 'select',
      choices: [
        ['row', 'Row'],
        ['column', 'Column'],
        ['row-reverse', 'Row Reverse'],
        ['column-reverse', 'Column Reverse']
      ],
      default: 'row',
      visibility: {
        controlling_field: 'layout_type',
        operator: 'EQUAL',
        controlling_value: 'flex'
      }
    },
    {
      type: 'choice',
      name: 'flex_justify',
      label: 'Flex Justify',
      display: 'select',
      choices: [
        ['flex-start', 'Start'],
        ['center', 'Center'],
        ['flex-end', 'End'],
        ['space-between', 'Space Between'],
        ['space-around', 'Space Around']
      ],
      default: 'flex-start',
      visibility: {
        controlling_field: 'layout_type',
        operator: 'EQUAL',
        controlling_value: 'flex'
      }
    },
    {
      type: 'choice',
      name: 'flex_align',
      label: 'Flex Align',
      display: 'select',
      choices: [
        ['stretch', 'Stretch'],
        ['flex-start', 'Start'],
        ['center', 'Center'],
        ['flex-end', 'End']
      ],
      default: 'stretch',
      visibility: {
        controlling_field: 'layout_type',
        operator: 'EQUAL',
        controlling_value: 'flex'
      }
    },
    {
      type: 'color',
      name: 'background_color',
      label: 'Background Color'
    }
  ]
};

// Export the wrapped component
export const HubSpotLayout = withHubSpotModule(HubSpotLayoutComponent);