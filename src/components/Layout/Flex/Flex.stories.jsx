import React from 'react'
import PropTypes from 'prop-types'
import Flex, { FlexItem } from './Flex'

export default {
  title: 'Layout/Flex',
  component: Flex,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A comprehensive flexbox layout component with full control over flex properties. Provides more granular control than Stack for complex layouts.'
      }
    }
  }
}

// Demo components for examples
const DemoCard = ({ children, style = {} }) => (
  <div style={{
    padding: '12px 16px',
    backgroundColor: '#f3f4f6',
    border: '1px solid #e5e7eb',
    textAlign: 'center',
    minHeight: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...style
  }}>
    {children}
  </div>
)

DemoCard.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
}

const Template = (args) => (
  <Flex {...args}>
    <DemoCard>Item 1</DemoCard>
    <DemoCard>Item 2</DemoCard>
    <DemoCard>Item 3</DemoCard>
  </Flex>
)

export const Default = Template.bind({})
Default.args = {
  direction: 'row',
  gap: '16px'
}

export const Directions = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
    <div>
      <h3 style={{ margin: '0 0 16px 0' }}>Row (default)</h3>
      <Flex direction="row" gap="16px">
        <DemoCard>Item 1</DemoCard>
        <DemoCard>Item 2</DemoCard>
        <DemoCard>Item 3</DemoCard>
      </Flex>
    </div>
    
    <div>
      <h3 style={{ margin: '0 0 16px 0' }}>Column</h3>
      <Flex direction="column" gap="16px">
        <DemoCard>Item 1</DemoCard>
        <DemoCard>Item 2</DemoCard>
        <DemoCard>Item 3</DemoCard>
      </Flex>
    </div>
    
    <div>
      <h3 style={{ margin: '0 0 16px 0' }}>Row Reverse</h3>
      <Flex direction="row-reverse" gap="16px">
        <DemoCard>Item 1 (shows last)</DemoCard>
        <DemoCard>Item 2</DemoCard>
        <DemoCard>Item 3 (shows first)</DemoCard>
      </Flex>
    </div>
    
    <div>
      <h3 style={{ margin: '0 0 16px 0' }}>Column Reverse</h3>
      <Flex direction="column-reverse" gap="16px">
        <DemoCard>Item 1 (shows last)</DemoCard>
        <DemoCard>Item 2</DemoCard>
        <DemoCard>Item 3 (shows first)</DemoCard>
      </Flex>
    </div>
  </div>
)

export const JustifyContent = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
    {[
      'flex-start',
      'flex-end', 
      'center',
      'space-between',
      'space-around',
      'space-evenly'
    ].map(justify => (
      <div key={justify}>
        <h3 style={{ margin: '0 0 16px 0' }}>{justify}</h3>
        <div style={{ border: '2px dashed #d1d5db', padding: '16px' }}>
          <Flex direction="row" gap="8px" justify={justify}>
            <DemoCard style={{ minWidth: '80px' }}>A</DemoCard>
            <DemoCard style={{ minWidth: '80px' }}>B</DemoCard>
            <DemoCard style={{ minWidth: '80px' }}>C</DemoCard>
          </Flex>
        </div>
      </div>
    ))}
  </div>
)

export const AlignItems = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
    {[
      'stretch',
      'flex-start',
      'flex-end',
      'center',
      'baseline'
    ].map(align => (
      <div key={align}>
        <h3 style={{ margin: '0 0 16px 0' }}>{align}</h3>
        <div style={{ border: '2px dashed #d1d5db', padding: '16px', height: '120px' }}>
          <Flex direction="row" gap="16px" align={align} style={{ height: '100%' }}>
            <DemoCard style={{ height: '40px' }}>Short</DemoCard>
            <DemoCard style={{ height: '60px' }}>Medium</DemoCard>
            <DemoCard style={{ height: '80px' }}>Tall</DemoCard>
          </Flex>
        </div>
      </div>
    ))}
  </div>
)

export const FlexItemProperties = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
    <div>
      <h3 style={{ margin: '0 0 16px 0' }}>Flex Grow</h3>
      <Flex direction="row" gap="16px" style={{ width: '400px' }}>
        <FlexItem grow={0}>
          <DemoCard>grow: 0</DemoCard>
        </FlexItem>
        <FlexItem grow={1}>
          <DemoCard>grow: 1</DemoCard>
        </FlexItem>
        <FlexItem grow={2}>
          <DemoCard>grow: 2</DemoCard>
        </FlexItem>
      </Flex>
    </div>
    
    <div>
      <h3 style={{ margin: '0 0 16px 0' }}>Flex Shrink</h3>
      <div style={{ width: '200px', border: '2px dashed #d1d5db', padding: '16px' }}>
        <Flex direction="row" gap="8px">
          <FlexItem shrink={0} basis="100px">
            <DemoCard>no shrink</DemoCard>
          </FlexItem>
          <FlexItem shrink={1} basis="100px">
            <DemoCard>shrink: 1</DemoCard>
          </FlexItem>
          <FlexItem shrink={2} basis="100px">
            <DemoCard>shrink: 2</DemoCard>
          </FlexItem>
        </Flex>
      </div>
    </div>
    
    <div>
      <h3 style={{ margin: '0 0 16px 0' }}>Flex Basis</h3>
      <Flex direction="row" gap="16px">
        <FlexItem basis="100px">
          <DemoCard>100px</DemoCard>
        </FlexItem>
        <FlexItem basis="200px">
          <DemoCard>200px</DemoCard>
        </FlexItem>
        <FlexItem basis="auto">
          <DemoCard>auto</DemoCard>
        </FlexItem>
      </Flex>
    </div>
    
    <div>
      <h3 style={{ margin: '0 0 16px 0' }}>Align Self</h3>
      <div style={{ border: '2px dashed #d1d5db', padding: '16px', height: '120px' }}>
        <Flex direction="row" gap="16px" style={{ height: '100%' }}>
          <FlexItem align="flex-start">
            <DemoCard>start</DemoCard>
          </FlexItem>
          <FlexItem align="center">
            <DemoCard>center</DemoCard>
          </FlexItem>
          <FlexItem align="flex-end">
            <DemoCard>end</DemoCard>
          </FlexItem>
          <FlexItem align="stretch">
            <DemoCard>stretch</DemoCard>
          </FlexItem>
        </Flex>
      </div>
    </div>
  </div>
)

export const Wrapping = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
    <div>
      <h3 style={{ margin: '0 0 16px 0' }}>No Wrap (default)</h3>
      <div style={{ border: '2px dashed #d1d5db', padding: '16px', width: '300px' }}>
        <Flex direction="row" gap="8px" wrap="nowrap">
          {Array.from({ length: 6 }, (_, i) => (
            <DemoCard key={i} style={{ minWidth: '80px' }}>Item {i + 1}</DemoCard>
          ))}
        </Flex>
      </div>
    </div>
    
    <div>
      <h3 style={{ margin: '0 0 16px 0' }}>Wrap</h3>
      <div style={{ border: '2px dashed #d1d5db', padding: '16px', width: '300px' }}>
        <Flex direction="row" gap="8px" wrap="wrap">
          {Array.from({ length: 6 }, (_, i) => (
            <DemoCard key={i} style={{ minWidth: '80px' }}>Item {i + 1}</DemoCard>
          ))}
        </Flex>
      </div>
    </div>
    
    <div>
      <h3 style={{ margin: '0 0 16px 0' }}>Wrap Reverse</h3>
      <div style={{ border: '2px dashed #d1d5db', padding: '16px', width: '300px' }}>
        <Flex direction="row" gap="8px" wrap="wrap-reverse">
          {Array.from({ length: 6 }, (_, i) => (
            <DemoCard key={i} style={{ minWidth: '80px' }}>Item {i + 1}</DemoCard>
          ))}
        </Flex>
      </div>
    </div>
  </div>
)

export const Gaps = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
    <div>
      <h3 style={{ margin: '0 0 16px 0' }}>Uniform Gap</h3>
      <Flex direction="row" gap="24px" wrap="wrap" style={{ width: '300px' }}>
        {Array.from({ length: 6 }, (_, i) => (
          <DemoCard key={i} style={{ minWidth: '60px' }}>Item {i + 1}</DemoCard>
        ))}
      </Flex>
    </div>
    
    <div>
      <h3 style={{ margin: '0 0 16px 0' }}>Different Row and Column Gaps</h3>
      <Flex direction="row" rowGap="8px" columnGap="24px" wrap="wrap" style={{ width: '300px' }}>
        {Array.from({ length: 6 }, (_, i) => (
          <DemoCard key={i} style={{ minWidth: '60px' }}>Item {i + 1}</DemoCard>
        ))}
      </Flex>
    </div>
  </div>
)

export const CommonPatterns = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
    <div>
      <h3 style={{ margin: '0 0 16px 0' }}>Header Layout</h3>
      <Flex justify="space-between" align="center" style={{ 
        padding: '16px', 
        backgroundColor: '#f9fafb', 
        border: '1px solid #e5e7eb' 
      }}>
        <div style={{ fontWeight: '600' }}>Logo</div>
        <Flex gap="16px">
          <span>Home</span>
          <span>About</span>
          <span>Contact</span>
        </Flex>
        <button style={{ padding: '8px 16px', backgroundColor: '#3b82f6', color: 'white', border: 'none' }}>
          Sign In
        </button>
      </Flex>
    </div>
    
    <div>
      <h3 style={{ margin: '0 0 16px 0' }}>Card with Action</h3>
      <div style={{ border: '1px solid #e5e7eb', padding: '16px', maxWidth: '400px' }}>
        <Flex direction="column" gap="12px">
          <h4 style={{ margin: 0 }}>Card Title</h4>
          <p style={{ margin: 0, color: '#6b7280' }}>Some description text that explains the content.</p>
          <Flex justify="flex-end" gap="8px">
            <button style={{ padding: '8px 16px', backgroundColor: '#6b7280', color: 'white', border: 'none' }}>
              Cancel
            </button>
            <button style={{ padding: '8px 16px', backgroundColor: '#3b82f6', color: 'white', border: 'none' }}>
              Confirm
            </button>
          </Flex>
        </Flex>
      </div>
    </div>
    
    <div>
      <h3 style={{ margin: '0 0 16px 0' }}>Sidebar Layout</h3>
      <Flex gap="16px" style={{ height: '200px', border: '1px solid #e5e7eb' }}>
        <div style={{ 
          width: '200px', 
          backgroundColor: '#f3f4f6', 
          padding: '16px',
          borderRight: '1px solid #e5e7eb'
        }}>
          Sidebar
        </div>
        <FlexItem grow={1}>
          <div style={{ padding: '16px' }}>
            Main Content Area
          </div>
        </FlexItem>
      </Flex>
    </div>
    
    <div>
      <h3 style={{ margin: '0 0 16px 0' }}>Form Row</h3>
      <Flex gap="16px" align="flex-end">
        <FlexItem grow={1}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Name</label>
            <input 
              type="text" 
              style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db' }}
            />
          </div>
        </FlexItem>
        <FlexItem grow={1}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Email</label>
            <input 
              type="email" 
              style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db' }}
            />
          </div>
        </FlexItem>
        <button style={{ 
          padding: '8px 16px', 
          backgroundColor: '#3b82f6', 
          color: 'white', 
          border: 'none',
          height: 'fit-content'
        }}>
          Submit
        </button>
      </Flex>
    </div>
  </div>
)

export const InlineFlex = () => (
  <div>
    <h3 style={{ margin: '0 0 16px 0' }}>Inline Flex</h3>
    <p>This is some text with an <Flex inline gap="4px" align="center"><span>inline</span><span style={{ backgroundColor: '#3b82f6', color: 'white', padding: '2px 6px', fontSize: '12px' }}>badge</span></Flex> flex container inside it.</p>
  </div>
)