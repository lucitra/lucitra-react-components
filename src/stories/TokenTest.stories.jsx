import React from 'react';
import { Container, Title, Text, Paper, Stack, Code } from '@mantine/core';

export default {
  title: 'Debug/Token Test',
};

export const BasicTokenTest = () => {
  // Get CSS variable values
  const getTokenValue = (token) => {
    if (typeof window === 'undefined') return 'N/A';
    return getComputedStyle(document.documentElement).getPropertyValue(token).trim() || 'Not found';
  };

  const tokens = [
    '--color-background-Primary',
    '--color-content-Primary',
    '--color-brand-500',
    '--font-family-sans',
    '--typography-lg-bold-font-size',
    '--spacing-md',
    '--radius-md',
  ];

  return (
    <Container size="md" py="xl">
      <Stack spacing="xl">
        <Title>Design Token Test</Title>
        
        <Paper p="md" withBorder>
          <Title order={3} mb="md">Token Values</Title>
          <Stack spacing="sm">
            {tokens.map(token => (
              <div key={token}>
                <Code>{token}</Code>: <Code color="blue">{getTokenValue(token)}</Code>
              </div>
            ))}
          </Stack>
        </Paper>

        <Paper p="md" withBorder>
          <Title order={3} mb="md">Applied Styles Test</Title>
          
          <div style={{ 
            backgroundColor: 'var(--color-surface-L1)', 
            padding: 'var(--spacing-lg)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border-Primary)'
          }}>
            <Text style={{ 
              fontSize: 'var(--typography-lg-bold-font-size)',
              fontWeight: 'var(--typography-lg-bold-font-weight)',
              color: 'var(--color-content-Primary)'
            }}>
              This text should use design tokens
            </Text>
            
            <Text style={{ 
              fontSize: 'var(--typography-sm-regular-font-size)',
              color: 'var(--color-content-Secondary)',
              marginTop: 'var(--spacing-sm)'
            }}>
              Secondary text with tokens
            </Text>
          </div>
        </Paper>

        <Paper p="md" withBorder>
          <Title order={3} mb="md">Utility Classes Test</Title>
          
          <h1 className="text-xl-bold">XL Bold Heading</h1>
          <p className="text-md-regular">Medium regular paragraph</p>
          <p className="text-sm-regular">Small regular text</p>
          
          <div className="p-md mt-lg" style={{ backgroundColor: 'var(--color-surface-L2)' }}>
            Div with padding and margin utilities
          </div>
        </Paper>
      </Stack>
    </Container>
  );
};