import React, { useEffect, useState } from 'react';
import { Container, Title, Text, Paper, Stack, Code, Button, Badge } from '@mantine/core';

export default {
  title: 'Debug/Token Debug',
};

export const CSSVariableDebugger = () => {
  const [cssVars, setCssVars] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Wait for CSS to load
    const timer = setTimeout(() => {
      const computedStyle = getComputedStyle(document.documentElement);
      const variables = {};
      
      // Get all CSS custom properties
      for (let i = 0; i < computedStyle.length; i++) {
        const prop = computedStyle[i];
        if (prop.startsWith('--')) {
          variables[prop] = computedStyle.getPropertyValue(prop).trim();
        }
      }
      
      setCssVars(variables);
      setLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const tokenCategories = {
    colors: Object.keys(cssVars).filter(k => k.includes('color')),
    typography: Object.keys(cssVars).filter(k => k.includes('typography') || k.includes('font')),
    spacing: Object.keys(cssVars).filter(k => k.includes('spacing')),
    radius: Object.keys(cssVars).filter(k => k.includes('radius')),
    other: Object.keys(cssVars).filter(k => 
      !k.includes('color') && 
      !k.includes('typography') && 
      !k.includes('font') && 
      !k.includes('spacing') && 
      !k.includes('radius')
    ),
  };

  return (
    <Container size="xl" py="xl">
      <Stack spacing="xl">
        <div>
          <Title>CSS Variable Debugger</Title>
          <Text c="dimmed">
            Found {Object.keys(cssVars).length} CSS variables
          </Text>
        </div>

        {!loaded ? (
          <Text>Loading CSS variables...</Text>
        ) : (
          <Stack spacing="xl">
            {Object.entries(tokenCategories).map(([category, tokens]) => (
              <Paper key={category} p="md" withBorder>
                <Title order={3} mb="md">
                  {category.charAt(0).toUpperCase() + category.slice(1)} 
                  <Badge ml="sm" size="sm">{tokens.length}</Badge>
                </Title>
                
                <Stack spacing="xs">
                  {tokens.slice(0, 10).map(token => (
                    <div key={token}>
                      <Code>{token}</Code>: <Code color="blue">{cssVars[token] || 'undefined'}</Code>
                    </div>
                  ))}
                  {tokens.length > 10 && (
                    <Text size="sm" c="dimmed">...and {tokens.length - 10} more</Text>
                  )}
                </Stack>
              </Paper>
            ))}
          </Stack>
        )}

        <Paper p="md" withBorder>
          <Title order={3} mb="md">Live Style Test</Title>
          
          <Stack spacing="md">
            <div
              style={{
                padding: '16px',
                backgroundColor: '#f0f0f0',
                border: '1px solid #ccc',
                borderRadius: '8px',
              }}
            >
              <Text fw={600}>Hardcoded styles (should always work)</Text>
              <Text>Background: #f0f0f0, Border: #ccc</Text>
            </div>

            <div
              style={{
                padding: 'var(--spacing-md, 16px)',
                backgroundColor: 'var(--color-surface-L1, #f8f8f8)',
                border: '1px solid var(--color-border-Primary, #ddd)',
                borderRadius: 'var(--radius-md, 8px)',
              }}
            >
              <Text fw={600}>Token styles with fallbacks</Text>
              <Text>If tokens work, this should look different from above</Text>
            </div>

            <Button
              onClick={() => window.location.reload()}
            >
              Reload Page
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
};