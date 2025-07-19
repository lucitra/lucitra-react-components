import React from 'react';
import { Stack, Text } from '@mantine/core';
import { Code, InlineCode, CodeBlock, Terminal } from './Code';

export default {
  title: 'Typography/Code',
  component: Code,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Code components display source code with proper formatting and optional features like syntax highlighting, line numbers, and copy functionality.

## Features
- Inline and block code display
- Copy to clipboard functionality
- Line numbers
- File names and language labels
- Terminal/command line styling
- Scrollable code blocks
- Consistent monospace styling
        `
      }
    }
  },
};

// Inline code examples
export const InlineCodeExamples = {
  render: () => (
    <Stack gap="md">
      <Text>
        Use the <InlineCode>useState</InlineCode> hook to manage component state in React.
      </Text>
      
      <Text>
        The <InlineCode>npm install</InlineCode> command will install all dependencies from <InlineCode>package.json</InlineCode>.
      </Text>
      
      <Text>
        Set the environment variable <InlineCode>NODE_ENV=production</InlineCode> for production builds.
      </Text>
    </Stack>
  )
};

// Basic code blocks
export const BasicCodeBlocks = {
  render: () => (
    <Stack gap="lg">
      <div>
        <Text size="sm" fw={600} mb="xs">JavaScript Function</Text>
        <CodeBlock language="javascript">
{`function greetUser(name) {
  if (!name) {
    return 'Hello, Guest!';
  }
  return \`Hello, \${name}!\`;
}`}
        </CodeBlock>
      </div>
      
      <div>
        <Text size="sm" fw={600} mb="xs">CSS Styles</Text>
        <CodeBlock language="css">
{`.button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
}

.button:hover {
  background-color: #0056b3;
}`}
        </CodeBlock>
      </div>
    </Stack>
  )
};

// Code blocks with features
export const FeaturedCodeBlocks = {
  render: () => (
    <Stack gap="lg">
      <div>
        <Text size="sm" fw={600} mb="xs">With Copy Button</Text>
        <CodeBlock language="jsx" withCopy>
{`import React from 'react';
import { Button } from '@lucitra/react-components';

export const MyComponent = () => {
  return (
    <Button onClick={() => alert('Hello!')}>
      Click me
    </Button>
  );
};`}
        </CodeBlock>
      </div>
      
      <div>
        <Text size="sm" fw={600} mb="xs">With Line Numbers</Text>
        <CodeBlock language="python" withLineNumbers>
{`def calculate_fibonacci(n):
    if n <= 1:
        return n
    return calculate_fibonacci(n-1) + calculate_fibonacci(n-2)

# Generate first 10 Fibonacci numbers
for i in range(10):
    print(f"F({i}) = {calculate_fibonacci(i)}")`}
        </CodeBlock>
      </div>
      
      <div>
        <Text size="sm" fw={600} mb="xs">With Filename and Copy</Text>
        <CodeBlock 
          language="typescript" 
          fileName="utils.ts"
          withCopy
        >
{`export interface User {
  id: number;
  name: string;
  email: string;
}

export const validateEmail = (email: string): boolean => {
  const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return regex.test(email);
};`}
        </CodeBlock>
      </div>
    </Stack>
  )
};

// Long code with scrolling
export const ScrollableCode = {
  render: () => (
    <div>
      <Text size="sm" fw={600} mb="xs">Scrollable Code Block (max height: 200px)</Text>
      <CodeBlock 
        language="json" 
        withCopy 
        withLineNumbers
        maxHeight={200}
        fileName="data.json"
      >
{`{
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "admin",
      "permissions": ["read", "write", "delete"],
      "profile": {
        "bio": "Software engineer with 10+ years experience",
        "location": "San Francisco, CA",
        "website": "https://johndoe.dev"
      }
    },
    {
      "id": 2,
      "name": "Jane Smith", 
      "email": "jane@example.com",
      "role": "user",
      "permissions": ["read", "write"],
      "profile": {
        "bio": "Frontend developer and UI/UX designer",
        "location": "New York, NY",
        "website": "https://janesmith.design"
      }
    },
    {
      "id": 3,
      "name": "Bob Johnson",
      "email": "bob@example.com", 
      "role": "moderator",
      "permissions": ["read", "write", "moderate"],
      "profile": {
        "bio": "Community manager and content moderator",
        "location": "Austin, TX",
        "website": "https://bobjohnson.com"
      }
    }
  ],
  "settings": {
    "theme": "dark",
    "notifications": true,
    "privacy": {
      "shareEmail": false,
      "shareProfile": true
    }
  }
}`}
      </CodeBlock>
    </div>
  )
};

// Terminal examples
export const TerminalExamples = {
  render: () => (
    <Stack gap="lg">
      <div>
        <Text size="sm" fw={600} mb="xs">Terminal Commands</Text>
        <Terminal>
{`npm install @lucitra/react-components
npm run dev`}
        </Terminal>
      </div>
      
      <div>
        <Text size="sm" fw={600} mb="xs">Git Commands</Text>
        <Terminal prompt="git">
{`add .
commit -m "feat: add new components"
push origin main`}
        </Terminal>
      </div>
      
      <div>
        <Text size="sm" fw={600} mb="xs">Custom Prompt</Text>
        <Terminal prompt="user@server:~$">
{`ls -la
total 64
drwxr-xr-x  8 user user 4096 Dec 15 10:30 .
drwxr-xr-x  3 root root 4096 Dec 10 09:15 ..
-rw-r--r--  1 user user  220 Dec 10 09:15 .bash_logout
-rw-r--r--  1 user user 3771 Dec 10 09:15 .bashrc
drwxr-xr-x  2 user user 4096 Dec 15 10:30 Documents`}
        </Terminal>
      </div>
    </Stack>
  )
};

// Different languages showcase
export const LanguageShowcase = {
  render: () => (
    <Stack gap="lg">
      <div>
        <Text size="sm" fw={600} mb="xs">HTML</Text>
        <CodeBlock language="html" withCopy>
{`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My App</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>`}
        </CodeBlock>
      </div>
      
      <div>
        <Text size="sm" fw={600} mb="xs">SQL</Text>
        <CodeBlock language="sql" withCopy>
{`SELECT u.name, u.email, COUNT(p.id) as post_count
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
WHERE u.active = true
GROUP BY u.id, u.name, u.email
ORDER BY post_count DESC
LIMIT 10;`}
        </CodeBlock>
      </div>
      
      <div>
        <Text size="sm" fw={600} mb="xs">Shell Script</Text>
        <CodeBlock language="bash" fileName="deploy.sh" withCopy>
{`#!/bin/bash

echo "Starting deployment..."

# Build the application
npm run build

# Copy files to server
rsync -avz dist/ user@server:/var/www/html/

# Restart nginx
ssh user@server 'sudo systemctl restart nginx'

echo "Deployment complete!"`}
        </CodeBlock>
      </div>
    </Stack>
  )
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
{`import { Code, CodeBlock, InlineCode, Terminal } from '@lucitra/react-components';

// Inline code
<p>Use the <InlineCode>useState</InlineCode> hook for state management.</p>

// Basic code block
<CodeBlock language="javascript">
  {\`const greeting = "Hello, World!";\`}
</CodeBlock>

// Advanced code block
<CodeBlock 
  language="typescript"
  fileName="example.ts"
  withCopy
  withLineNumbers
  maxHeight={300}
>
  {\`// Your code here\`}
</CodeBlock>

// Terminal
<Terminal prompt="$">
  npm install @lucitra/react-components
</Terminal>`}
        </pre>
      </div>
    </Stack>
  )
};