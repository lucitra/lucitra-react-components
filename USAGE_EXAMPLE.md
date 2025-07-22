# OfficialResume Usage Example

## For Integration into ibraheem4.github.io

Here's how you would integrate the `OfficialResume` component into your main project:

### 1. Install the Component Library

```bash
npm install @lucitra/react-components
# or for local development
yalc add @lucitra/react-components
```

### 2. Create a Resume Page Component

```jsx
// src/pages/resume.jsx
import React from 'react';
import { OfficialResume } from '@lucitra/react-components';

const ResumePage = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f5f5f5',
      padding: '20px 0'
    }}>
      <OfficialResume />
    </div>
  );
};

export default ResumePage;
```

### 3. Add Route (if using React Router)

```jsx
// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResumePage from './pages/resume';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/resume" element={<ResumePage />} />
        {/* other routes */}
      </Routes>
    </Router>
  );
}
```

### 4. Navigation Link

```jsx
// Add to your navigation
<Link to="/resume">Resume</Link>
```

## Benefits of This Approach

1. **Clean Separation**: Resume data and logic stay in the component library
2. **Easy Updates**: Update resume content by rebuilding the component library
3. **Reusable**: Same component works for both your site and as a product demo
4. **Production Ready**: Optimized for both web display and PDF generation
5. **No Builder UI**: Just the clean resume without editing controls

## Print/PDF Generation

The component automatically optimizes for print. Users can simply:
1. Visit the resume page
2. Use browser's Print function (Cmd+P / Ctrl+P)
3. Save as PDF

The print styles ensure it fits perfectly on one page.

## Customization

You can override the default data by passing custom resume data:

```jsx
import { OfficialResume } from '@lucitra/react-components';
import myResumeData from './data/my-resume.json';

<OfficialResume data={myResumeData} />
```