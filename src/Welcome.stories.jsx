export default {
  title: 'Welcome',
  parameters: {
    layout: 'fullscreen',
    options: {
      showPanel: false,
    },
  },
}

const WelcomeComponent = () => {
  return (
    <div style={{
      padding: '40px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      lineHeight: 1.6
    }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          color: '#1f2937',
          marginBottom: '16px',
          fontWeight: '700'
        }}>
          @lucitra/react-components
        </h1>
        <p style={{ 
          fontSize: '1.2rem', 
          color: '#6b7280',
          margin: 0
        }}>
          A comprehensive React component library for modern web applications
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
        marginBottom: '40px'
      }}>
        <div style={{
          padding: '24px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          backgroundColor: '#f9fafb'
        }}>
          <h3 style={{ color: '#1f2937', marginTop: 0 }}>🧭 Navigation Components</h3>
          <ul style={{ color: '#6b7280', paddingLeft: '20px' }}>
            <li><strong>LanguageSwitcher</strong> - Multi-language dropdown with RTL support</li>
            <li><strong>RegionSwitcher</strong> - Country/region selector with language integration</li>
          </ul>
        </div>

        <div style={{
          padding: '24px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          backgroundColor: '#f0f9ff'
        }}>
          <h3 style={{ color: '#1f2937', marginTop: 0 }}>📝 Form Components</h3>
          <ul style={{ color: '#6b7280', paddingLeft: '20px' }}>
            <li>Button - <em>Coming Soon</em></li>
            <li>Input - <em>Coming Soon</em></li>
            <li>Select - <em>Coming Soon</em></li>
            <li>Checkbox - <em>Coming Soon</em></li>
          </ul>
        </div>

        <div style={{
          padding: '24px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          backgroundColor: '#f0fdf4'
        }}>
          <h3 style={{ color: '#1f2937', marginTop: 0 }}>🎨 Layout Components</h3>
          <ul style={{ color: '#6b7280', paddingLeft: '20px' }}>
            <li>Container - <em>Coming Soon</em></li>
            <li>Grid - <em>Coming Soon</em></li>
            <li>Card - <em>Coming Soon</em></li>
            <li>Stack - <em>Coming Soon</em></li>
          </ul>
        </div>

        <div style={{
          padding: '24px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          backgroundColor: '#fefce8'
        }}>
          <h3 style={{ color: '#1f2937', marginTop: 0 }}>💬 Feedback Components</h3>
          <ul style={{ color: '#6b7280', paddingLeft: '20px' }}>
            <li>Alert - <em>Coming Soon</em></li>
            <li>Toast - <em>Coming Soon</em></li>
            <li>Modal - <em>Coming Soon</em></li>
            <li>Tooltip - <em>Coming Soon</em></li>
          </ul>
        </div>
      </div>

      <div style={{
        padding: '24px',
        backgroundColor: '#3b82f6',
        color: 'white',
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <h3 style={{ marginTop: 0, color: 'white' }}>✨ Features</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          textAlign: 'left'
        }}>
          <div>♿ Accessibility First</div>
          <div>🌍 Internationalization</div>
          <div>🎨 Themeable</div>
          <div>📱 Responsive</div>
          <div>🎯 TypeScript</div>
          <div>📦 Tree Shakeable</div>
        </div>
      </div>

      <div style={{ 
        marginTop: '40px', 
        textAlign: 'center',
        color: '#6b7280',
        fontSize: '0.9rem'
      }}>
        <p>
          Use the toolbar above to switch themes and locales. 
          Navigate the sidebar to explore individual components.
        </p>
        <p>
          <strong>Get started:</strong> Check out the Navigation components to see the working examples!
        </p>
      </div>
    </div>
  )
}

export const Welcome = {
  render: () => <WelcomeComponent />,
  parameters: {
    docs: {
      description: {
        story: 'Welcome to the @lucitra/react-components Storybook! This library provides a comprehensive set of React components for modern web applications.',
      },
    },
  },
}