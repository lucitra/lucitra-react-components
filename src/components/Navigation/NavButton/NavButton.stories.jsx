import NavButton from './NavButton'

export default {
  title: 'Components/Molecules/NavButton',
  component: NavButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onClick: { action: 'clicked' },
    onKeyDown: { action: 'key pressed' },
  },
}

export const Default = {
  args: {
    ariaLabel: 'Sample button',
    children: '🌐',
  },
}

export const WithIcon = {
  args: {
    ariaLabel: 'Language switcher',
    children: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
      </svg>
    ),
  },
}

export const Disabled = {
  args: {
    ariaLabel: 'Disabled button',
    children: '🚫',
    disabled: true,
  },
}

export const In48pxNavBar = {
  render: () => (
    <div style={{ 
      height: '48px',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      borderBottom: '1px solid #e9ecef',
      padding: '4px 0 2px 0',
      boxSizing: 'border-box',
      width: '400px',
      backgroundColor: '#f8f9fa'
    }}>
      <div style={{
        margin: 0,
        paddingLeft: '16px',
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: '42px'
      }}>
        Site Title
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 48px)', 
        height: '42px',
        gap: 0
      }}>
        <NavButton ariaLabel="Language">🌐</NavButton>
        <NavButton ariaLabel="Region">📍</NavButton>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'NavButton in a realistic 48px navigation bar environment with proper spacing and grid layout.'
      }
    }
  }
}

export const GridLayout = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(3, 48px)', 
      gap: 0, 
      border: '1px solid #e9ecef',
      padding: '4px 0 2px 0'
    }}>
      <NavButton ariaLabel="Language">🌐</NavButton>
      <NavButton ariaLabel="Region">📍</NavButton>
      <NavButton ariaLabel="Settings">⚙️</NavButton>
    </div>
  ),
}