import ResumeBuilder from '../components/Resume/ResumeBuilder.jsx';
import { ibraheemResumeData } from '../data/resumeData.js';

// Set premium mode globally for these stories
if (typeof window !== 'undefined') {
  window.__RESUME_PREMIUM_MODE__ = true;
}

export default {
  title: 'Resume/Ibraheem Resume (Premium)',
  component: ResumeBuilder,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Ibraheem\'s personal resume with full premium access and no restrictions. This showcases the complete resume builder experience without watermarks or feature limitations.',
      },
    },
  },
};

// Premium version with full access (for Ibraheem's personal use)
export const FullAccess = {
  args: {
    initialData: ibraheemResumeData,
    initialConfig: {
      showSummary: true,
      showSummaryInPrint: false, // Hide summary in print by default
      showPatents: true,
    },
    onDataChange: (data) => console.log('Resume data changed:', data),
    onExport: (format, data) => console.log('Export:', format, data),
    showControls: true,
    enableExport: true,
    useSerifFont: true,
    showATSTools: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete resume builder with full premium features, no watermarks, and unrestricted access to all functionality.',
      },
    },
  },
};

// Print-optimized version for PDF export  
export const PrintMode = {
  args: {
    initialData: ibraheemResumeData,
    initialConfig: {
      printMode: true,
      showSummary: true, // Keep summary available for online view
      showSummaryInPrint: false, // But hide it in print mode
      showPatents: true, // Show patents
      maxWorkBullets: null, // Show all bullets initially
      filterByVisibility: true,
    },
    onDataChange: (data) => console.log('Resume data changed:', data),
    onExport: (format, data) => console.log('Export:', format, data),
    showControls: true,
    enableExport: true,
    useSerifFont: true,
    showATSTools: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Print-optimized version of Ibraheem\'s resume with settings pre-configured for PDF export.',
      },
    },
  },
};

// Single column layout version
export const SingleColumn = {
  args: {
    initialData: ibraheemResumeData,
    onDataChange: (data) => console.log('Resume data changed:', data),
    onExport: (format, data) => console.log('Export:', format, data),
    showControls: true,
    enableExport: true,
    useSerifFont: true,
    showATSTools: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Single column layout version for ATS-optimized format.',
      },
    },
  },
};

// Clean preview version (no controls, just the resume)
export const CleanPreview = {
  args: {
    initialData: ibraheemResumeData,
    onDataChange: () => {},
    onExport: () => {},
    showControls: false,
    enableExport: false,
    useSerifFont: true,
    showATSTools: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Clean preview of Ibraheem\'s resume without any editing controls - perfect for showcasing the final result.',
      },
    },
  },
};