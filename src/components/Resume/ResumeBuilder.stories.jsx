import ResumeBuilder from './ResumeBuilder';
import { sampleResumeData, defaultResumeData } from '../../data/resumeData.js';

export default {
  title: 'Resume/ResumeBuilder',
  component: ResumeBuilder,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A comprehensive Resume Builder component that provides editing capabilities, live preview, and export functionality. Perfect for creating professional resumes with real-time editing and PDF export.'
      }
    }
  },
  argTypes: {
    initialData: {
      description: 'Initial resume data to populate the builder',
      control: { type: 'object' }
    },
    onDataChange: {
      description: 'Callback fired when resume data changes',
      action: 'dataChanged'
    },
    onExport: {
      description: 'Callback fired when export is triggered',
      action: 'exported'
    },
    showControls: {
      description: 'Whether to show the header controls',
      control: { type: 'boolean' }
    },
    enableExport: {
      description: 'Whether to enable export functionality',
      control: { type: 'boolean' }
    }
  }
};

// Default builder with sample data
export const WithSampleData = {
  args: {
    initialData: sampleResumeData,
    showControls: true,
    enableExport: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Resume Builder loaded with sample professional data. Includes full editing capabilities and export options.'
      }
    }
  }
};

// Empty builder for new resumes
export const EmptyBuilder = {
  args: {
    initialData: defaultResumeData,
    showControls: true,
    enableExport: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty Resume Builder for creating a resume from scratch. All fields start blank and can be filled in through the editing interface.'
      }
    }
  }
};

// Minimal builder without controls
export const MinimalBuilder = {
  args: {
    initialData: sampleResumeData,
    showControls: false,
    enableExport: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal Resume Builder without header controls or export options. Focused purely on editing and preview.'
      }
    }
  }
};

// Builder with custom callbacks
export const WithCallbacks = {
  args: {
    initialData: sampleResumeData,
    showControls: true,
    enableExport: true,
    onDataChange: (data) => {
      console.log('Resume data changed:', data);
    },
    onExport: (format, data) => {
      console.log(`Exporting resume as ${format}:`, data);
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Resume Builder with custom callback handlers. Check the browser console to see data change and export events.'
      }
    }
  }
};

// Print-optimized builder for one-page layout
export const PrintOptimized = {
  args: {
    initialData: {
      ...sampleResumeData,
      // Override to show print-optimized data
      work: sampleResumeData.work.slice(0, 3) // Limit to 3 most recent for single page
    },
    showControls: true,
    enableExport: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Resume Builder optimized for single-page printing. Limited to 3 most recent work experiences to ensure the entire resume fits on one page.'
      }
    }
  }
};