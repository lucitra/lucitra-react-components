import React from 'react'
import PropTypes from 'prop-types'
import Grid from './Grid'

export default {
  title: 'Layout/Grid',
  component: Grid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A flexible CSS Grid layout component that provides responsive grid layouts with customizable columns, gaps, and alignment options.'
      }
    }
  }
}

// Demo card component for examples
const DemoCard = ({ children, style = {} }) => (
  <div style={{
    padding: '16px',
    backgroundColor: '#f3f4f6',
    border: '1px solid #e5e7eb',
    textAlign: 'center',
    minHeight: '60px',
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
  <Grid {...args}>
    {Array.from({ length: 6 }, (_, i) => (
      <DemoCard key={i}>Item {i + 1}</DemoCard>
    ))}
  </Grid>
)

export const Default = Template.bind({})
Default.args = {
  columns: 3,
  gap: '16px'
}

export const TwoColumns = Template.bind({})
TwoColumns.args = {
  columns: 2,
  gap: '16px'
}

export const FourColumns = Template.bind({})
FourColumns.args = {
  columns: 4,
  gap: '16px'
}

export const CustomGaps = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
    <div>
      <h3 style={{ margin: '0 0 16px 0' }}>Small Gap (8px)</h3>
      <Grid columns={3} gap="8px">
        {Array.from({ length: 6 }, (_, i) => (
          <DemoCard key={i}>Item {i + 1}</DemoCard>
        ))}
      </Grid>
    </div>
    
    <div>
      <h3 style={{ margin: '0 0 16px 0' }}>Large Gap (32px)</h3>
      <Grid columns={3} gap="32px">
        {Array.from({ length: 6 }, (_, i) => (
          <DemoCard key={i}>Item {i + 1}</DemoCard>
        ))}
      </Grid>
    </div>
    
    <div>
      <h3 style={{ margin: '0 0 16px 0' }}>Different Column and Row Gaps</h3>
      <Grid columns={3} columnGap="32px" rowGap="8px">
        {Array.from({ length: 6 }, (_, i) => (
          <DemoCard key={i}>Item {i + 1}</DemoCard>
        ))}
      </Grid>
    </div>
  </div>
)

export const ResponsiveGrid = () => (
  <div>
    <h3 style={{ margin: '0 0 16px 0' }}>Responsive Grid (1 → 2 → 3 → 4 columns)</h3>
    <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#6b7280' }}>
      Resize your browser to see the grid adapt
    </p>
    <Grid 
      columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
      gap="16px"
    >
      {Array.from({ length: 8 }, (_, i) => (
        <DemoCard key={i}>Responsive Item {i + 1}</DemoCard>
      ))}
    </Grid>
  </div>
)

export const Alignment = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
    <div>
      <h3 style={{ margin: '0 0 16px 0' }}>Center Aligned Items</h3>
      <Grid columns={3} gap="16px" alignItems="center" justifyItems="center" style={{ minHeight: '120px' }}>
        <DemoCard style={{ height: '40px' }}>Short</DemoCard>
        <DemoCard style={{ height: '80px' }}>Medium</DemoCard>
        <DemoCard style={{ height: '60px' }}>Tall</DemoCard>
      </Grid>
    </div>
    
    <div>
      <h3 style={{ margin: '0 0 16px 0' }}>End Aligned Items</h3>
      <Grid columns={3} gap="16px" alignItems="end" style={{ minHeight: '120px' }}>
        <DemoCard style={{ height: '40px' }}>Short</DemoCard>
        <DemoCard style={{ height: '80px' }}>Medium</DemoCard>
        <DemoCard style={{ height: '60px' }}>Tall</DemoCard>
      </Grid>
    </div>
  </div>
)

export const CustomTemplates = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
    <div>
      <h3 style={{ margin: '0 0 16px 0' }}>Custom Column Sizes</h3>
      <Grid columns="200px 1fr 100px" gap="16px">
        <DemoCard>200px</DemoCard>
        <DemoCard>1fr (flexible)</DemoCard>
        <DemoCard>100px</DemoCard>
      </Grid>
    </div>
    
    <div>
      <h3 style={{ margin: '0 0 16px 0' }}>Fractional Units</h3>
      <Grid columns="1fr 2fr 1fr" gap="16px">
        <DemoCard>1fr</DemoCard>
        <DemoCard>2fr (twice as wide)</DemoCard>
        <DemoCard>1fr</DemoCard>
      </Grid>
    </div>
    
    <div>
      <h3 style={{ margin: '0 0 16px 0' }}>Auto-fit Pattern</h3>
      <Grid columns="repeat(auto-fit, minmax(200px, 1fr))" gap="16px">
        {Array.from({ length: 5 }, (_, i) => (
          <DemoCard key={i}>Auto-fit {i + 1}</DemoCard>
        ))}
      </Grid>
    </div>
  </div>
)

export const GridAreas = () => (
  <div>
    <h3 style={{ margin: '0 0 16px 0' }}>Grid Template Areas</h3>
    <Grid 
      columns="1fr 2fr 1fr"
      rows="auto 1fr auto"
      gap="16px"
      templateAreas={`
        "header header header"
        "sidebar main aside"
        "footer footer footer"
      `}
      style={{ minHeight: '300px' }}
    >
      <DemoCard style={{ gridArea: 'header' }}>Header</DemoCard>
      <DemoCard style={{ gridArea: 'sidebar' }}>Sidebar</DemoCard>
      <DemoCard style={{ gridArea: 'main' }}>Main Content</DemoCard>
      <DemoCard style={{ gridArea: 'aside' }}>Aside</DemoCard>
      <DemoCard style={{ gridArea: 'footer' }}>Footer</DemoCard>
    </Grid>
  </div>
)

export const SpanningItems = () => (
  <div>
    <h3 style={{ margin: '0 0 16px 0' }}>Items Spanning Multiple Columns</h3>
    <Grid columns={4} gap="16px">
      <DemoCard style={{ gridColumn: 'span 2' }}>Spans 2 columns</DemoCard>
      <DemoCard>Item 2</DemoCard>
      <DemoCard>Item 3</DemoCard>
      <DemoCard>Item 4</DemoCard>
      <DemoCard style={{ gridColumn: 'span 3' }}>Spans 3 columns</DemoCard>
      <DemoCard>Item 6</DemoCard>
      <DemoCard style={{ gridColumn: '1 / -1' }}>Spans full width</DemoCard>
    </Grid>
  </div>
)

export const DenseGrid = () => (
  <div>
    <h3 style={{ margin: '0 0 16px 0' }}>Dense Grid (auto-fill gaps)</h3>
    <Grid columns={4} gap="16px" autoFlow="row dense">
      <DemoCard style={{ gridColumn: 'span 2' }}>Wide Item</DemoCard>
      <DemoCard>Item 2</DemoCard>
      <DemoCard>Item 3</DemoCard>
      <DemoCard>Item 4</DemoCard>
      <DemoCard style={{ gridColumn: 'span 2' }}>Another Wide</DemoCard>
      <DemoCard>Item 6</DemoCard>
      <DemoCard>Item 7</DemoCard>
    </Grid>
  </div>
)

export const ContentWidthPatterns = () => {
  // Demo content components
  const BlogContent = ({ children, style = {} }) => (
    <div style={{
      maxWidth: '65ch', // ~65 characters for optimal reading
      margin: '0 auto',
      padding: '0 24px',
      lineHeight: '1.6',
      ...style
    }}>
      {children}
    </div>
  )
  
  BlogContent.propTypes = {
    children: PropTypes.node,
    style: PropTypes.object
  }
  
  const CodeBlock = ({ children }) => (
    <div style={{
      maxWidth: '80ch', // Wider for code
      margin: '24px auto',
      padding: '16px',
      backgroundColor: '#1f2937',
      color: '#f3f4f6',
      fontFamily: 'Monaco, Consolas, monospace',
      fontSize: '14px',
      overflow: 'auto',
      borderRadius: '8px'
    }}>
      {children}
    </div>
  )
  
  CodeBlock.propTypes = {
    children: PropTypes.node
  }
  
  const FullWidthSection = ({ children, style = {} }) => (
    <div style={{
      width: '100vw',
      position: 'relative',
      left: '50%',
      right: '50%',
      marginLeft: '-50vw',
      marginRight: '-50vw',
      padding: '32px 0',
      backgroundColor: '#f9fafb',
      borderTop: '1px solid #e5e7eb',
      borderBottom: '1px solid #e5e7eb',
      ...style
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {children}
      </div>
    </div>
  )
  
  FullWidthSection.propTypes = {
    children: PropTypes.node,
    style: PropTypes.object
  }
  
  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h2 style={{ margin: '0 0 32px 0', textAlign: 'center' }}>
        Content Width Patterns for Blogs
      </h2>
      
      {/* Regular blog content - centered, reading width */}
      <BlogContent>
        <h3>Introduction</h3>
        <p>
          This is regular blog content that should be easy to read. The optimal line length 
          for readability is around 45-75 characters, so we constrain this content to about 
          65 characters wide using the &apos;ch&apos; unit.
        </p>
        <p>
          This creates a comfortable reading experience that doesn&apos;t strain the eyes by 
          having lines that are too long or too short. The content is centered within 
          the page layout.
        </p>
      </BlogContent>
      
      {/* Code block - wider than text but not full width */}
      <CodeBlock>
{`// Code blocks can be slightly wider to accommodate longer lines
function calculateReadingTime(text) {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// This wider format works better for code
const blogPost = {
  title: "Understanding Content Width Patterns",
  content: "Your blog content here...",
  readingTime: calculateReadingTime(content)
};`}
      </CodeBlock>
      
      <BlogContent>
        <p>
          Notice how the code block above extends beyond the text width but isn&apos;t 
          full-width. This gives code more breathing room while maintaining visual 
          hierarchy and not overwhelming the reader.
        </p>
      </BlogContent>
      
      {/* Full width section */}
      <FullWidthSection>
        <h3 style={{ margin: '0 0 16px 0', textAlign: 'center' }}>
          Full Width Feature Section
        </h3>
        <Grid columns={{ xs: 1, sm: 2, md: 3 }} gap="24px">
          <DemoCard style={{ 
            backgroundColor: 'white', 
            border: '1px solid #e5e7eb',
            padding: '24px',
            textAlign: 'center'
          }}>
            <h4 style={{ margin: '0 0 8px 0' }}>Feature 1</h4>
            <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>
              Description of the first feature
            </p>
          </DemoCard>
          <DemoCard style={{ 
            backgroundColor: 'white', 
            border: '1px solid #e5e7eb',
            padding: '24px',
            textAlign: 'center'
          }}>
            <h4 style={{ margin: '0 0 8px 0' }}>Feature 2</h4>
            <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>
              Description of the second feature
            </p>
          </DemoCard>
          <DemoCard style={{ 
            backgroundColor: 'white', 
            border: '1px solid #e5e7eb',
            padding: '24px',
            textAlign: 'center'
          }}>
            <h4 style={{ margin: '0 0 8px 0' }}>Feature 3</h4>
            <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>
              Description of the third feature
            </p>
          </DemoCard>
        </Grid>
      </FullWidthSection>
      
      <BlogContent>
        <h3>Back to Regular Content</h3>
        <p>
          After the full-width section, we return to the comfortable reading width. 
          This pattern creates visual interest and hierarchy while maintaining readability 
          for the main content.
        </p>
        <p>
          You can mix and match these patterns throughout your blog posts to create 
          engaging layouts that highlight different types of content appropriately.
        </p>
      </BlogContent>
    </div>
  )
}

export const BlogLayoutSystem = () => {
  const ContentContainer = ({ width = 'reading', children, style = {} }) => {
    const widthStyles = {
      reading: { maxWidth: '65ch', margin: '0 auto', padding: '0 24px' },
      code: { maxWidth: '80ch', margin: '0 auto', padding: '0 24px' },
      wide: { maxWidth: '1000px', margin: '0 auto', padding: '0 24px' },
      full: { width: '100%', padding: '0 24px' }
    }
    
    return (
      <div style={{ ...widthStyles[width], ...style }}>
        {children}
      </div>
    )
  }
  
  ContentContainer.propTypes = {
    width: PropTypes.oneOf(['reading', 'code', 'wide', 'full']),
    children: PropTypes.node,
    style: PropTypes.object
  }
  
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif' }}>
      <h2 style={{ textAlign: 'center', margin: '0 0 48px 0' }}>
        Blog Layout System Components
      </h2>
      
      {/* Reading width example */}
      <ContentContainer width="reading">
        <div style={{ 
          padding: '24px', 
          backgroundColor: '#f0f9ff', 
          border: '2px dashed #0ea5e9',
          marginBottom: '32px'
        }}>
          <h4 style={{ margin: '0 0 8px 0' }}>Reading Width (65ch)</h4>
          <p style={{ margin: 0, fontSize: '14px' }}>
            Perfect for body text, paragraphs, and regular blog content. 
            Optimal for readability with 45-75 characters per line.
          </p>
        </div>
      </ContentContainer>
      
      {/* Code width example */}
      <ContentContainer width="code">
        <div style={{ 
          padding: '24px', 
          backgroundColor: '#f0fdf4', 
          border: '2px dashed #22c55e',
          marginBottom: '32px'
        }}>
          <h4 style={{ margin: '0 0 8px 0' }}>Code Width (80ch)</h4>
          <p style={{ margin: 0, fontSize: '14px' }}>
            Slightly wider for code blocks, allowing longer lines while maintaining readability. 
            Good for syntax highlighting and technical content.
          </p>
        </div>
      </ContentContainer>
      
      {/* Wide width example */}
      <ContentContainer width="wide">
        <div style={{ 
          padding: '24px', 
          backgroundColor: '#fef3c7', 
          border: '2px dashed #f59e0b',
          marginBottom: '32px'
        }}>
          <h4 style={{ margin: '0 0 8px 0' }}>Wide Width (1000px)</h4>
          <p style={{ margin: 0, fontSize: '14px' }}>
            For images, galleries, data tables, or content that benefits from more horizontal space 
            while still being contained and not overwhelming.
          </p>
        </div>
      </ContentContainer>
      
      {/* Full width example */}
      <ContentContainer width="full">
        <div style={{ 
          padding: '24px', 
          backgroundColor: '#fce7f3', 
          border: '2px dashed #ec4899',
          marginBottom: '32px'
        }}>
          <h4 style={{ margin: '0 0 8px 0' }}>Full Width</h4>
          <p style={{ margin: 0, fontSize: '14px' }}>
            Edge-to-edge content for hero sections, full-width images, or design elements 
            that should span the entire viewport width.
          </p>
        </div>
      </ContentContainer>
      
      <ContentContainer width="reading">
        <div style={{ 
          padding: '24px', 
          backgroundColor: '#f3f4f6', 
          border: '1px solid #e5e7eb'
        }}>
          <h4 style={{ margin: '0 0 16px 0' }}>Usage in Components</h4>
          <pre style={{ 
            fontSize: '12px', 
            backgroundColor: '#1f2937', 
            color: '#f3f4f6', 
            padding: '12px',
            overflow: 'auto',
            margin: 0
          }}>
{`// Usage example
<ContentContainer width="reading">
  <p>Regular blog text content</p>
</ContentContainer>

<ContentContainer width="code">
  <CodeBlock>...</CodeBlock>
</ContentContainer>

<ContentContainer width="full">
  <HeroSection />
</ContentContainer>`}
          </pre>
        </div>
      </ContentContainer>
    </div>
  )
}