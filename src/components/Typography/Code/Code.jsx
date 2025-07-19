/**
 * Code Component
 * 
 * Displays code snippets with syntax highlighting and formatting
 * Supports inline code, code blocks, and language-specific highlighting
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Code as MantineCode, ScrollArea, Group, Text, ActionIcon, CopyButton, Tooltip } from '@mantine/core';
import { IconCopy, IconCheck } from '@tabler/icons-react';

export const Code = ({
  children,
  block = false,
  language,
  withCopy = false,
  withLineNumbers = false,
  maxHeight,
  fileName,
  ...props
}) => {
  const codeContent = typeof children === 'string' ? children : String(children);
  
  if (!block) {
    // Inline code
    return (
      <MantineCode
        style={{
          backgroundColor: '#f8f9fa',
          color: '#e03131',
          border: '1px solid #dee2e6',
          borderRadius: 0,
          padding: '2px 6px',
          fontSize: '0.875em',
          fontFamily: 'Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
        }}
        {...props}
      >
        {children}
      </MantineCode>
    );
  }

  // Code block
  const lines = codeContent.split('\n');
  const hasScrollArea = maxHeight || lines.length > 20;

  const CodeBlock = () => (
    <pre
      style={{
        backgroundColor: '#f8f9fa',
        border: '2px solid #dee2e6',
        borderRadius: 0,
        padding: '16px',
        margin: 0,
        fontSize: '13px',
        lineHeight: '1.5',
        fontFamily: 'Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        overflow: hasScrollArea ? 'visible' : 'auto',
        ...props.style
      }}
      {...props}
    >
      {withLineNumbers ? (
        <div style={{ display: 'flex' }}>
          <div
            style={{
              color: '#868e96',
              marginRight: '16px',
              textAlign: 'right',
              userSelect: 'none',
              minWidth: '30px'
            }}
          >
            {lines.map((_, index) => (
              <div key={index}>{index + 1}</div>
            ))}
          </div>
          <div style={{ flex: 1 }}>
            <code style={{ color: '#495057' }}>{codeContent}</code>
          </div>
        </div>
      ) : (
        <code style={{ color: '#495057' }}>{codeContent}</code>
      )}
    </pre>
  );

  return (
    <div style={{ position: 'relative' }}>
      {/* Header with filename and actions */}
      {(fileName || withCopy || language) && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#e9ecef',
            border: '2px solid #dee2e6',
            borderBottom: 'none',
            borderRadius: 0,
            padding: '8px 12px',
            fontSize: '12px'
          }}
        >
          <Group gap="sm">
            {fileName && (
              <Text size="sm" fw={600} c="dark">
                {fileName}
              </Text>
            )}
            {language && (
              <Text size="xs" c="dimmed" tt="uppercase">
                {language}
              </Text>
            )}
          </Group>
          
          {withCopy && (
            <CopyButton value={codeContent}>
              {({ copied, copy }) => (
                <Tooltip label={copied ? 'Copied!' : 'Copy code'}>
                  <ActionIcon
                    color={copied ? 'green' : 'gray'}
                    onClick={copy}
                    size="sm"
                    variant="subtle"
                  >
                    {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
                  </ActionIcon>
                </Tooltip>
              )}
            </CopyButton>
          )}
        </div>
      )}

      {/* Code content */}
      {hasScrollArea ? (
        <ScrollArea.Autosize maxHeight={maxHeight || 400}>
          <CodeBlock />
        </ScrollArea.Autosize>
      ) : (
        <CodeBlock />
      )}
    </div>
  );
};

// Specialized code components
export const InlineCode = ({ children, ...props }) => (
  <Code {...props}>{children}</Code>
);

export const CodeBlock = ({ children, ...props }) => (
  <Code block {...props}>{children}</Code>
);

export const Terminal = ({ children, prompt = '$', ...props }) => (
  <div
    style={{
      backgroundColor: '#000',
      color: '#00ff00',
      border: '2px solid #333',
      borderRadius: 0,
      padding: '16px',
      fontFamily: 'Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      fontSize: '13px',
      lineHeight: '1.5'
    }}
    {...props}
  >
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <span style={{ color: '#00ff00', marginRight: '8px', userSelect: 'none' }}>
        {prompt}
      </span>
      <pre style={{ margin: 0, color: '#00ff00' }}>
        <code>{children}</code>
      </pre>
    </div>
  </div>
);

Code.propTypes = {
  /** Code content */
  children: PropTypes.node.isRequired,
  /** Render as block instead of inline */
  block: PropTypes.bool,
  /** Programming language for syntax highlighting hint */
  language: PropTypes.string,
  /** Show copy button */
  withCopy: PropTypes.bool,
  /** Show line numbers */
  withLineNumbers: PropTypes.bool,
  /** Maximum height for scrollable code blocks */
  maxHeight: PropTypes.number,
  /** Filename to display in header */
  fileName: PropTypes.string,
  /** Custom styles */
  style: PropTypes.object,
};

InlineCode.propTypes = {
  /** Code content */
  children: PropTypes.node.isRequired,
};

CodeBlock.propTypes = {
  /** Code content */
  children: PropTypes.node.isRequired,
};

Terminal.propTypes = {
  /** Terminal command/output */
  children: PropTypes.node.isRequired,
  /** Command prompt symbol */
  prompt: PropTypes.string,
  /** Custom styles */
  style: PropTypes.object,
};

export default Code;