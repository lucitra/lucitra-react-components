import Resume from './Resume.jsx';
import { sampleResumeData } from '../../data/resumeData.js';

export default {
  title: 'Resume/Single Column Layout',
  component: Resume,
  parameters: {
    layout: 'fullscreen',
  },
};

export const PrintOptimizedSingleColumn = {
  args: {
    data: sampleResumeData,
    config: {
      printMode: true,
      singleColumn: true,
      filterByVisibility: true
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Single-column layout optimized for single-page printing. Uses vertical layout for Skills, Education, and Patents sections.'
      }
    }
  }
};

export const ScreenSingleColumn = {
  args: {
    data: sampleResumeData,
    config: {
      printMode: false,
      singleColumn: true,
      filterByVisibility: false
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Single-column layout for screen viewing with all content visible.'
      }
    }
  }
};